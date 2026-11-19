const { test, expect } = require('@playwright/test');

async function prepare(page) {
  await page.route('**/api/**', route => {
    const url = route.request().url();
    const body = url.includes('/api/defaults') ? {} : url.includes('/api/settings') ? {ok:true,settings:{}} : {available:false};
    return route.fulfill({json:body});
  });
  await page.goto('/#dashboard');
  await page.waitForFunction(() => typeof renderGoalPanel === 'function' && state.activePage === 'dashboard');
  await openDisplayPanel(page);
}

// Tasks, RTDL and Executor live in the Display Panel, which starts closed on
// every load.
async function openDisplayPanel(page, view) {
  const panel = page.locator('#dashboardSidebar');
  if (!/\bopen\b/.test(await panel.getAttribute('class') || '')) await page.locator('#toggleInspector').click();
  await expect(panel).toHaveClass(/\bopen\b/);
  if (view) await page.locator(`[data-sidebar-view="${view}"]`).click();
}

async function populate(page, count = 12) {
  await page.evaluate(count => {
    state.taskState = {taskId:'T12',goal:'向后移动2米',status:'in_progress',tasks:Array.from({length:count},(_,i)=>({
      taskId:`T${i+1}`,goal:'确认厨房在当前场景中的位置（地图坐标系下的区域/目标点）'.repeat(3),status:i===0?'superseded':i===count-1?'in_progress':'done',planIds:i===count-1?['fixture-plan']:[],
    }))};
    state.executorPlansReady = true;
    state.executorPlans = [{planId:'fixture-plan',ops:[{op_id:'fixture-op',kind:'do',description:'向后移动2米并验证位移',state:'running'}]}];
    renderGoalPanel();
  }, count);
}

test('long task lists scroll without overlapping the executor card or status', async ({page}) => {
  await prepare(page);
  await populate(page);
  const geometry = await page.evaluate(() => {
    const header = document.querySelector('.current-goal-panel > .panel-header').getBoundingClientRect();
    const list = document.querySelector('#taskList').getBoundingClientRect();
    // The Executor card sits in its own Display Panel tab, so the list only
    // has to stay inside its own panel.
    const panel = document.querySelector('.current-goal-panel').getBoundingClientRect();
    const rows = [...document.querySelectorAll('.task-list-row')];
    const first = rows[0].getBoundingClientRect();
    return {
      separated:first.top >= header.bottom && list.bottom <= panel.bottom,
      scrollable:document.querySelector('#taskList').scrollHeight > document.querySelector('#taskList').clientHeight,
      statusSeparated:rows.every(row=>row.querySelector('.task-list-goal').getBoundingClientRect().right <= row.querySelector('.task-list-status').getBoundingClientRect().left),
      ordered:rows.every((row,i)=>!i || row.getBoundingClientRect().top >= rows[i-1].getBoundingClientRect().bottom),
      activeColor:getComputedStyle(rows[0].querySelector('.task-list-dot')).backgroundColor,
    };
  });
  expect(geometry).toEqual({separated:true,scrollable:true,statusSeparated:true,ordered:true,activeColor:'rgb(245, 158, 11)'});
  const rowHeights = await page.locator('.task-list-row').evaluateAll(rows => rows.map(row => row.getBoundingClientRect().height));
  expect(new Set(rowHeights).size).toBe(1);
  expect(rowHeights[0]).toBe(24);
  await page.locator('.task-list-row').last().scrollIntoViewIfNeeded();
  await expect(page.locator('.task-list-row').last()).toBeInViewport();
  await page.screenshot({path:test.info().outputPath('tasks-scrolled.png')});
  await page.evaluate(()=>window.RobonixI18N.setLang('zh'));
  await expect(page.locator('.task-list-status').last()).toHaveText('已替代');
  await populate(page,1);
  await expect(page.locator('.task-list-row')).toHaveCount(1);
});

test('task snapshots survive reload and conversation switching; new events replace them', async ({page}) => {
  await prepare(page);
  await populate(page,3);
  await page.evaluate(()=>{
    state.messages=[{id:'m1',role:'user',text:'测试任务'}];
    rememberLastSession(state.sessionId);
    persistCurrentConversation();
  });
  await page.reload();
  await openDisplayPanel(page);
  await expect(page.locator('.task-list-row')).toHaveCount(3);
  const id = await page.evaluate(()=>state.sessionId);
  await page.evaluate(()=>newSession());
  await expect(page.locator('#taskList')).toBeHidden();
  await page.evaluate(id=>openConversation(id), id);
  await expect(page.locator('.task-list-row')).toHaveCount(3);
  await page.evaluate(()=>handlePilotEvent({kind:'task_state',taskState:{...state.taskState,status:'done',tasks:state.taskState.tasks.map(t=>({...t,status:'done'}))}}));
  await expect(page.locator('.task-list-status').last()).toHaveText('done');
  await page.reload();
  await openDisplayPanel(page);
  await expect(page.locator('.task-list-status').last()).toHaveText('done');
});

test('other active tasks retain controls and abort updates every active row', async ({page}) => {
  await prepare(page);
  await page.evaluate(()=>handlePilotEvent({kind:'task_state',sessionId:'test-session',taskState:{taskId:'T2',goal:'second',status:'done',tasks:[{taskId:'T1',goal:'first',status:'in_progress'},{taskId:'T2',goal:'second',status:'done'}]}}));
  await expect(page.locator('#sendButton')).toHaveText(/Steer/);
  await expect(page.locator('#stopButton')).toBeVisible();
  await page.evaluate(()=>completeStopState());
  await expect(page.locator('[data-task-id="T1"] .task-list-status')).toHaveText('canceled');
  await expect(page.locator('[data-task-id="T2"] .task-list-status')).toHaveText('done');
  await expect(page.locator('#stopButton')).toBeHidden();
});



test('active-task controls stay inside the composer when the display panel is open', async ({page}, testInfo) => {
  await page.setViewportSize({width: testInfo.project.name === 'mobile' ? 390 : 1000, height: 850});
  await prepare(page);
  await page.evaluate(() => setBusy(true));
  await expect(page.locator('#stopButton')).toBeVisible();

  for (const lang of ['en', 'zh']) {
    await page.evaluate(lang => window.RobonixI18N.setLang(lang), lang);
    for (const width of testInfo.project.name === 'mobile' ? [390] : [1440, 1120, 1000, 861]) {
      await page.setViewportSize({width, height: 850});
      await openDisplayPanel(page);
      await page.waitForTimeout(350);
      const bounds = await page.evaluate(() => {
        const box = (selector) => document.querySelector(selector).getBoundingClientRect();
        const composer = box('#composer');
        const panel = box('#dashboardSidebar');
        const buttons = ['.voice-inline', '#stopButton', '#sendButton'].map(box);
        const mobile = matchMedia('(max-width: 860px)').matches;
        return {
          inside: buttons.every((button) => button.left >= composer.left - 1 && button.right <= composer.right + 1),
          separated: mobile || buttons.every((button) => button.right <= panel.left + 1),
          overlap: buttons.some((button, index) => buttons.slice(index + 1).some((other) =>
            button.left < other.right && button.right > other.left &&
            button.top < other.bottom && button.bottom > other.top)),
        };
      });
      expect(bounds, `${lang} at ${width}px`).toEqual({inside: true, separated: true, overlap: false});
    }
  }
});

test('running leaf takes precedence over active loop and sequence operators', async ({page}) => {
  await prepare(page);
  const active = await page.evaluate(() => {
    const plan = {
      rootIndex: 0,
      nodes: [
        {index: 0, kind: 'sequence', children: [1]},
        {index: 1, kind: 'while', children: [2]},
        {index: 2, kind: 'do', call: {callId: 'loop-body'}, children: []},
      ],
    };
    const states = new Map([
      [0, {state: 'RUNNING'}],
      [1, {state: 'RUNNING'}],
      [2, {state: 'RUNNING'}],
    ]);
    return pickRunningIndex(plan, states);
  });
  expect(active).toBe(2);
});

test('offline Connect fits the shared phone top bar', async ({page}) => {
  await page.route('**/api/**', route => {
    const path = new URL(route.request().url()).pathname;
    const body = path === '/api/defaults' ? {robotHost: 'robot-with-a-long-hostname.local', atlasPort: 50051}
      : path === '/api/system' ? {error: 'offline'} : {available: false};
    return route.fulfill({json: body});
  });
  await page.goto('/#dashboard');
  const connect = page.locator('#connectNow');
  await expect(page.locator('#refreshSystem')).toHaveClass(/offline/);
  for (const width of [320, 390]) {
    await page.setViewportSize({width, height: 844});
    for (const lang of ['en', 'zh']) {
      await page.evaluate(lang => window.RobonixI18N.setLang(lang), lang);
      for (const name of ['dashboard', 'vitals', 'audio', 'settings', 'perception', 'studio']) {
        await page.evaluate(name => activatePage(name), name);
        await expect(connect).toHaveText(lang === 'en' ? 'Connect' : '连接');
        await expect(connect).toBeInViewport({ratio: 1});
        await expect(page.locator('#handsfreeToggle')).toBeInViewport({ratio: 1});
        expect(await page.locator('.command-bar').evaluate(bar => bar.scrollWidth)).toBe(width);
      }
    }
  }
});

test('compact hands-free control visibly distinguishes recording from off', async ({page}) => {
  await page.setViewportSize({width: 320, height: 700});
  await page.route('**/api/**', route => route.fulfill({json: {available: false}}));
  await page.goto('/#dashboard');
  await page.evaluate(() => window.RobonixI18N.setLang('en'));
  const button = page.locator('#handsfreeToggle');
  const mic = button.locator('.handsfree-icon:not(.handsfree-recording-icon)');
  const recording = button.locator('.handsfree-recording-icon');
  const setStatus = (status) => page.evaluate(status => {
    Object.assign(state.handsfree, {state: status, enabled: status === 'suspended', busy: false});
    renderHandsfree();
  }, status);
  await setStatus('off');
  await expect(button).toHaveAccessibleName('Hands-free off');
  await expect(mic).toBeVisible();
  await expect(recording).toBeHidden();
  await setStatus('suspended');
  await expect(button).toHaveAccessibleName('Recording');
  await expect(mic).toBeHidden();
  await expect(recording).toBeInViewport({ratio: 1});
});

test('clear sessions is reachable in a short phone drawer', async ({page}) => {
  await page.setViewportSize({width: 568, height: 210});
  await page.route('**/api/**', route => route.fulfill({json: {available: false}}));
  await page.goto('/#dashboard');
  await page.evaluate(() => {
    state.messages = [{id:'m1', role:'user', text:'Original task'}];
    persistCurrentConversation();
  });
  await page.locator('#mobileNavToggle').click();
  await page.locator('#sessionListActionsTrigger').click();
  await page.locator('#clearHistory').click({timeout: 3000});
  await expect(page.locator('#sessionDialog')).toBeVisible();
});

test('settings sections show headings and keep the sidebar selection', async ({page}) => {
  await page.route('**/api/**', route => route.fulfill({json: {available: false}}));
  await page.goto('/#dashboard');
  await expect(page.locator('.workspace')).toHaveAttribute('data-active-page', 'dashboard');
  await page.evaluate(() => window.RobonixI18N.setLang('zh'));
  const trigger = page.locator('#settingsTriggerBtn');
  const openNavigation = async () => {
    const toggle = page.locator('#mobileNavToggle');
    if (await toggle.isVisible() && (await toggle.getAttribute('aria-expanded')) !== 'true') await toggle.click();
  };
  await openNavigation();
  await trigger.click();
  await page.locator('#settingsMenuAudio').click();
  await expect(page.locator('#audioTitle')).toHaveText('音频');
  await expect(page.locator('#audioTitle')).toBeVisible();
  await expect(page.getByText('输入原语', {exact: true})).toBeVisible();
  await expect(trigger).toHaveClass(/current-section/);
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await openNavigation();
  await trigger.click();
  await expect(page.locator('#settingsMenuAudio')).toHaveAttribute('aria-current', 'page');
  await page.locator('#settingsMenuSettings').click();
  await expect(page.locator('#connectionTitle')).toHaveText('连接');
  await expect(page.locator('#connectionTitle')).toBeVisible();
  await expect(trigger).toHaveClass(/current-section/);
  await page.evaluate(() => activatePage('dashboard'));
  await expect(trigger).not.toHaveClass(/current-section/);
});

test('session list collapses, remembers state, and session dialogs are custom', async ({page}, testInfo) => {
  test.skip(testInfo.project.name === 'mobile', 'session list and conversation controls are in the desktop navigation');
  await page.setViewportSize({width: 1000, height: 850});
  await prepare(page);
  const toggle = page.locator('#sessionListToggle');
  const section = page.locator('#sessionListSection');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(section).toHaveClass(/collapsed/);
  await expect(page.locator('#historyList')).toBeHidden();
  await expect.poll(() => toggle.locator('svg').evaluate(el => getComputedStyle(el).transform)).toBe('matrix(1, 0, 0, 1, 0, 0)');
  await page.reload();
  await openDisplayPanel(page);
  await expect(page.locator('#sessionListToggle')).toHaveAttribute('aria-expanded', 'false');
  await page.locator('#sessionListToggle').click();
  await expect(page.locator('#historyList')).toBeVisible();

  await page.evaluate(() => {
    state.messages = [{id:'m1', role:'user', text:'Original task'}];
    persistCurrentConversation();
  });
  const renameTrigger = page.locator('#renameSession');
  await renameTrigger.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#sessionDialog')).toBeVisible();
  await expect(page.locator('#sessionDialogInput')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('#sessionDialogClose')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('#sessionDialogSubmit')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('#sessionDialogClose')).toBeFocused();
  await page.locator('#sessionDialogInput').fill('Renamed task');
  await page.locator('#sessionDialogSubmit').click();
  await expect(page.locator('#sessionTitleDisplay')).toHaveText('Renamed task');
  await expect(page.locator('#renameSession')).toBeFocused();
  await page.evaluate(() => window.RobonixI18N.setLang('zh'));
  await expect(page.locator('.conversation-header #clearHistory')).toHaveCount(0);
  await expect(page.locator('.history-item.active .history-rename')).toHaveCount(0);
  const actions = page.locator('#sessionListActionsTrigger');
  await expect(actions).toHaveAccessibleName('会话列表操作');
  await actions.click();
  await page.locator('#clearHistory').click();
  await expect(page.locator('#sessionDialog')).toBeVisible();
  await expect(page.locator('#sessionDialogDescription')).toHaveText('确定要清空所有会话记录吗？此操作无法撤销。');
  await page.keyboard.press('Escape');
  await expect(page.locator('#sessionDialog')).toBeHidden();
  await expect(page.locator('#dashboardSidebar')).toHaveClass(/open/);
  await expect(actions).toBeFocused();
  await actions.click();
  await page.locator('#clearHistory').click();
  await page.locator('#sessionDialogSubmit').click();
  await expect(page.locator('#historyList .history-item')).toHaveCount(0);
  await expect(actions).toBeFocused();
});

test('executor updates keep panel and tree positions stable', async ({page}) => {
  await prepare(page);
  await page.waitForFunction(() => {
    const sidebar = document.querySelector('#dashboardSidebar');
    const width = sidebar.getBoundingClientRect().width;
    const previous = Number(sidebar.dataset.testStableWidth || 0);
    sidebar.dataset.testStableWidth = String(width);
    return width === previous && width > 0;
  });
  await page.waitForTimeout(350);
  await populate(page,12);
  const positions = () => page.evaluate(() => ['.current-goal-panel', '#taskList', '#sidebarMenu'].map(s => {
    const r=document.querySelector(s).getBoundingClientRect(); return [r.top,r.height];
  }));
  const before=await positions();
  await page.locator('#taskList').evaluate(e=>e.scrollTop=60);
  await page.evaluate(()=>{state.executorPlans[0].ops[0].description='A very long operation description '.repeat(30); renderGoalPanel();});
  await expect.poll(positions).toEqual(before);
  expect(await page.locator('#taskList').evaluate(e=>e.scrollTop)).toBe(0);
  await page.evaluate(()=>{state.executorPlans=[];renderGoalPanel();});
  expect(await positions()).toEqual(before);
  // The task panel sizes to its rows (capped), so a shorter task list may
  // shrink it; only Executor updates must leave the layout alone.
  await populate(page,1);
  await openDisplayPanel(page, 'executor');
  await page.getByRole("button", {name:"View call details",exact:true}).click();
  await page.evaluate(()=>renderGoalPanel());
  await expect(page.locator("#callDetailModal")).toBeVisible();
  await expect(page.locator("#callDetailBody")).toContainText("fixture-plan");
  await page.keyboard.press("Escape");
  await expect(page.locator("#callDetailModal")).not.toBeVisible();
  await page.locator(".current-goal-panel").scrollIntoViewIfNeeded();
  await page.screenshot({path:test.info().outputPath('stable-panel.png')});
});

async function ownershipFixture(page) {
  await prepare(page);
  await page.evaluate(() => {
    const plan = id => ({planId:id,round:1,nodes:[{index:0,opId:id,description:id,call:{callId:`call-${id}`,name:id,args:{}}}]});
    state.messages=[{id:'fixture-message',role:'user',text:'Task ownership experiment'}];
    state.taskState={taskId:'A',goal:'Task A',status:'done',tasks:[
      {taskId:'A',goal:'Task A',status:'done',planIds:['plan-a','plan-a-old']},
      {taskId:'B',goal:'Task B',status:'done',planIds:['plan-b']},
      {taskId:'C',goal:'Task C',status:'done',planIds:[]}]};
    state.planRecords=['plan-b','plan-a','plan-a-old','unknown'].map(id=>({key:`${id}:1`,plan:plan(id),nodeStates:{},batches:id==='plan-a-old'?[{results:[]}]:[]}));
    state.executorPlansReady=true;
    state.executorPlans=['foreign','plan-b','plan-a'].map(id=>({planId:id,ops:[{op_id:id,description:id,state:'running'}]}));
    state.executorPlanIds=new Set(state.executorPlans.map(p=>p.planId));
    renderPlan();
  });
}

test('task selection scopes tree, history and Executor, with no foreign fallback', async ({page}) => {
  await ownershipFixture(page);
  await expect(page.locator('[data-plan-tree]').first()).toContainText('plan-a');
  expect(await page.evaluate(()=>currentExecutionContext().plan.planId)).toBe('plan-a');
  await expect(page.locator('.goal-card > strong')).toHaveText('plan-a');
  await expect(page.locator('#rtdlHistoryTrees')).toContainText('plan-a-old');
  await expect(page.locator('#rtdlHistoryTrees')).not.toContainText('plan-b');
  const follow = page.locator('.task-scope-button');
  await expect(follow).toHaveCount(1);
  await expect(follow).toHaveAttribute('aria-pressed','true');
  await page.locator('[data-task-id="B"]').click();
  await expect(follow).toHaveAttribute('aria-pressed','false');
  await expect(page.locator('[data-plan-tree]').first()).toContainText('plan-b');
  expect(await page.evaluate(()=>currentExecutionContext().plan.planId)).toBe('plan-b');
  await expect(page.locator('.goal-card > strong')).toHaveText('plan-b');
  await page.screenshot({path:test.info().outputPath('task-first-selected.png')});
  await page.evaluate(()=>handlePilotEvent({kind:'task_state',taskState:{...state.taskState,taskId:'C'}}));
  await expect(page.locator('[data-task-id="B"]')).toHaveAttribute('aria-pressed','true');
  await page.reload();
  await openDisplayPanel(page);
  await expect(page.locator('[data-task-id="B"]')).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button',{name:'Follow latest task',exact:true}).click();
  await expect(follow).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('[data-task-id="C"]')).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('[data-plan-tree]').first()).toContainText('has not produced');
  expect(await page.evaluate(()=>currentExecutionContext())).toBeNull();
  await expect(page.getByRole("button",{name:"Unassigned plans",exact:true})).toHaveCount(0);
  await expect(page.locator("[data-plan-tree]").first()).not.toContainText("Plan unknown");
  await page.locator('.current-goal-panel').scrollIntoViewIfNeeded();
  await page.screenshot({path:test.info().outputPath('task-selection.png')});
});

test('ownership and tree arrival order never assigns a plan by timing', async ({page}) => {
  await ownershipFixture(page);
  await page.evaluate(()=>{
    state.taskState.tasks[2].planIds=['late']; selectTask('C');
    updatePlanRecordResult('late', record=>{record.nodeStates['0']={nodeIndex:0,state:'FAILED'};});
  });
  await expect(page.locator('[data-plan-tree]').first()).toContainText('tree details have not been received');
  expect(await page.evaluate(()=>state.planRecords.every(r=>!r.nodeStates['0']))).toBe(true);
  await page.evaluate(()=>{
    upsertPlanRecord({planId:'late',round:2,nodes:[{index:0,opId:'late',description:'Late tree'}]});
    renderPlan();
  });
  expect(await page.evaluate(()=>state.planRecords.find(r=>r.plan.planId==='late').nodeStates['0'].state)).toBe('FAILED');
  await expect(page.locator('[data-plan-tree]').first()).toContainText('Plan late');
  await page.evaluate(()=>{state.taskState.tasks[2].planIds=[];renderPlan();});
  await expect(page.locator('[data-plan-tree]').first()).not.toContainText('Plan late');
  await page.evaluate(()=>{delete state.taskState.tasks[2].planIds;renderPlan();});
  await expect(page.locator('[data-plan-tree]').first()).toContainText('Waiting for task ownership information');
});


test('saved conversations load with or without task state and old prompt history still migrates', async ({page}) => {
  await prepare(page);
  const result = await page.evaluate(() => {
    const base = {messages:[{role:'user',text:'saved'}]};
    const oldHistory = JSON.stringify([{text:'prompt only',at:1}, {text:'  '}]);
    localStorage.setItem('robonix.conversations', JSON.stringify([
      {...base,id:'old'},
      {...base,id:'missing',taskState:{tasks:[{taskId:'T1'}]}},
      {...base,id:'current',taskState:{tasks:[{taskId:'T2',planIds:[]}]}}
    ]));
    localStorage.setItem('robonix.history', oldHistory);
    const kept = loadConversations().map(c=>c.id);
    const historyKept = localStorage.getItem('robonix.history') === oldHistory;
    localStorage.setItem('robonix.conversations', '{not json');
    const migrated = loadConversations().map(c=>({text:c.messages[0].text, updatedAt:c.updatedAt}));
    return {kept, historyKept, migrated};
  });
  expect(result).toEqual({
    kept:['old','missing','current'],
    historyKept:true,
    migrated:[{text:'prompt only', updatedAt:1}],
  });
});


test('Executor metadata prefers authoritative active-plan fields', async ({page}) => {
  await ownershipFixture(page);
  await page.evaluate(() => {
    state.executorPlans = [{planId:'plan-a',ops:[{op_id:'plan-a',description:'camera query',provider_id:'tiago_camera',contract_id:'robonix/primitive/camera/snapshot',state:'running'}]}];
    state.executorPlanIds = new Set(['plan-a']);
    renderGoalPanel();
  });
  await expect(page.locator('.goal-call-grid')).toContainText('tiago_camera');
  await expect(page.locator('.goal-call-grid')).toContainText('robonix/primitive/camera/snapshot');
});

test('execution summary retains completed calls and keeps details accessible', async ({page}) => {
  await ownershipFixture(page);
  await openDisplayPanel(page, 'executor');
  await expect(page.locator('.executor-label')).toHaveText('Executor');
  const headingSizes = await page.evaluate(() => ({
    task: getComputedStyle(document.querySelector('.current-goal-panel h2')).fontSize,
    executor: getComputedStyle(document.querySelector('.executor-label')).fontSize,
    call: getComputedStyle(document.querySelector('.goal-card > strong')).fontSize,
  }));
  expect(headingSizes).toEqual({task:'14px',executor:'14px',call:'12px'});
  await expect(page.locator('.goal-call-grid')).toContainText('Contract');
  await expect(page.locator('.goal-call-grid')).toContainText('Plan / node');
  await expect(page.locator('.executor-label')).toHaveText('Executor');
  await expect(page.locator('.execution-summary-status')).toHaveText('Executing now');
  const layout = await page.evaluate(() => {
    const status = document.querySelector('.execution-summary-status').getBoundingClientRect();
    const button = document.querySelector('.call-detail-trigger').getBoundingClientRect();
    const title = document.querySelector('.goal-card > strong').getBoundingClientRect();
    return { right: button.left >= status.right, sameRow: Math.abs((status.top + status.bottom) / 2 - (button.top + button.bottom) / 2) < 1, below: title.top >= button.bottom };
  });
  expect(layout).toEqual({right:true,sameRow:true,below:true});
  await page.evaluate(()=>{
    state.executorPlans=[];
    state.executorPlanIds=new Set();
    renderGoalPanel();
  });
  await expect(page.locator('.execution-summary-status')).toHaveText('Live status unconfirmed');
  await expect(page.locator('.goal-card > strong')).toHaveText('plan-a');
  await page.evaluate(()=>{
    updatePlanRecordResult('plan-a', record=>{record.nodeStates['0']={nodeIndex:0,state:'SUCCEEDED'};});
    renderGoalPanel();
  });
  await expect(page.locator('.execution-summary-status')).toHaveText('completed');
  await page.getByRole('button',{name:'View call details',exact:true}).click();
  await expect(page.locator('#callDetailBody')).toContainText('SUCCEEDED');
  await page.keyboard.press('Escape');
  await openDisplayPanel(page, 'rtdl');
  await page.locator('[data-task-id="C"]').click();
  await expect(page.locator('.goal-card > strong')).not.toHaveText('plan-a');
  await page.locator('[data-task-id="A"]').click();
  await expect(page.locator('.execution-summary-status')).toHaveText('completed');
  await page.evaluate(()=>{
    updatePlanRecordResult('plan-a', record=>{record.nodeStates['0']={nodeIndex:0,state:'FAILED'};});
    renderGoalPanel();
  });
  await expect(page.locator('.execution-summary-status')).toHaveText('failed');
  await openDisplayPanel(page, 'executor');
  await expect(page.locator('.executor-label')).toBeVisible();
});


test('plan header shows one summary and does not label a failed plan completed', async ({page}) => {
  await ownershipFixture(page);
  await page.evaluate(() => {
    state.executorPlans = [];
    state.executorPlanIds = new Set();
    updatePlanRecordResult('plan-a', record => {
      record.batches = [{anyFailed:true,results:[]}];
    });
    renderPlan();
  });
  const tree = page.locator('[data-plan-tree]').first();
  await expect(page.locator('[data-plan-summary]')).toBeHidden();
  await expect(tree.locator('.plan-record-label')).toHaveText('Plan plan-a · round 1 · 1 call(s) · failed');
  await expect(tree).not.toContainText('completed');
  await page.evaluate(() => window.RobonixI18N.setLang('zh'));
  await expect(tree.locator('.plan-record-label')).toHaveText('计划 plan-a · 第 1 轮 · 1 次调用 · 失败');
  await page.locator('[data-task-id="C"]').click();
  await expect(page.locator('[data-sidebar-panel="rtdl"] .plan-empty')).toHaveCount(1);
  await expect(page.locator('[data-plan-summary]')).toHaveCount(0);
});


test('RTDL viewport fills the panel', async ({page}) => {
  await ownershipFixture(page);
  const checkFill = async () => {
    const geometry = await page.evaluate(() => {
      const panel = document.querySelector('[data-sidebar-panel="rtdl"]').getBoundingClientRect();
      const table = document.querySelector('[data-sidebar-panel="rtdl"] .execution-table').getBoundingClientRect();
      const viewport = document.querySelector('[data-sidebar-panel="rtdl"] .bt-tree-viewport').getBoundingClientRect();
      return {topGap:table.top-panel.top, bottomGap:panel.bottom-viewport.bottom, height:viewport.height, panelHeight:panel.height};
    });
    expect(geometry.topGap).toBeLessThan(4);
    expect(geometry.bottomGap).toBeLessThan(12);
    expect(geometry.height).toBeGreaterThan(geometry.panelHeight-100);
  };
  await checkFill();
  await page.locator('[data-task-id="C"]').click();
  await expect(page.locator('[data-sidebar-panel="rtdl"] .plan-empty')).toHaveCount(1);
  await page.locator('[data-task-id="B"]').click();
  await checkFill();
  await page.screenshot({path:test.info().outputPath('rtdl-filled.png')});
});


test('empty task and missing tree messages appear only once', async ({page}) => {
  await ownershipFixture(page);
  await page.evaluate(() => window.RobonixI18N.setLang('zh'));
  await page.locator('[data-task-id="C"]').click();
  await expect(page.locator('[data-sidebar-panel="rtdl"] .plan-empty')).toHaveCount(1);
  await page.evaluate(() => {
    state.taskState.tasks[2].planIds = ['late'];
    state.executorPlans = [{planId:'late',ops:[{op_id:'late',state:'running'}]}];
    renderPlan();
  });
  await expect(page.locator('[data-sidebar-panel="rtdl"] .plan-empty')).toHaveCount(1);
  await expect(page.locator('[data-sidebar-panel="rtdl"] .plan-empty')).toContainText('late');
  await expect(page.locator('[data-plan-summary]')).toHaveCount(0);
});


// The Executor tab is tall enough to show two call cards without scrolling;
// cap the list so scroll handling is still exercised.
async function limitPreviewHeight(page) {
  await page.locator('.goal-preview').evaluate(el => {
    el.style.flex = '0 0 auto';
    el.style.height = '160px';
  });
  expect(await page.locator('.goal-preview').evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true);
}

async function parallelCallsFixture(page) {
  await ownershipFixture(page);
  await page.evaluate(() => {
    state.lastExecutionByTask.clear();
    const record = state.planRecords.find(record => record.plan.planId === 'plan-a');
    record.plan.nodes = [
      {index:0,opId:'parent',kind:'parallel',children:[1,2],description:'Composite description'},
      {index:1,opId:'camera',call:{callId:'camera-call',name:'snapshot',providerId:'camera-provider',contractId:'camera/snapshot'}},
      {index:2,opId:'nav',call:{callId:'nav-call',name:'navigate',providerId:'base-provider',contractId:'base/navigate'}}
    ];
    state.executorPlans = [{planId:'plan-a',ops:[
      {op_id:'parent',kind:'parallel',state:'running',description:'Composite description'},
      {op_id:'camera',kind:'do',state:'running'},
      {op_id:'nav',kind:'do',state:'running'}
    ]}];
    state.executorPlanIds = new Set(['plan-a']);
    renderPlan();
  });
}

test('parallel calls retain individual results without mixing tasks or changing layout', async ({page}) => {
  await parallelCallsFixture(page);
  const cards = page.locator('.goal-preview .goal-card');
  await expect(cards).toHaveCount(2);
  await expect(cards.nth(0)).toContainText('camera-provider');
  await expect(cards.nth(0)).toContainText('plan-a / camera');
  await expect(cards.nth(1)).toContainText('base-provider');
  await expect(cards.nth(1)).toContainText('plan-a / nav');
  await expect(page.locator('.goal-preview')).not.toContainText('Composite description');
  const panelHeight = await page.locator('.current-goal-panel').evaluate(el => el.getBoundingClientRect().height);
  await openDisplayPanel(page, 'executor');
  await limitPreviewHeight(page);
  await page.locator('.goal-preview').evaluate(el => el.scrollTop = 35);
  await page.evaluate(() => renderGoalPanel());
  expect(await page.locator('.goal-preview').evaluate(el => el.scrollTop)).toBe(35);
  await cards.nth(1).getByRole('button', {name:'View call details',exact:true}).click();
  await expect(page.locator('#callDetailBody')).toContainText('nav-call');
  await expect(page.locator('#callDetailBody')).not.toContainText('camera-call');
  await page.keyboard.press('Escape');
  await page.evaluate(() => {
    state.executorPlans[0].ops[1].state = 'succeeded';
    renderGoalPanel();
  });
  await expect(cards.nth(0).locator('.execution-summary-status')).toHaveText('Executing now');
  await expect(cards.nth(1).locator('.execution-summary-status')).toHaveText('completed');
  await page.evaluate(() => {
    updatePlanRecordResult('plan-a', record => {
      record.nodeStates = {'1':{nodeIndex:1,state:'SUCCEEDED'},'2':{nodeIndex:2,state:'CANCELED'}};
      record.batches = [{anyFailed:false,results:[]}];
    });
    state.executorPlans = [];
    state.executorPlanIds = new Set();
    renderPlan();
    persistCurrentConversation();
    rememberLastSession(state.sessionId);
  });
  await expect(cards.filter({hasText:'base-provider'}).locator('.execution-summary-status')).toHaveText('canceled');
  await openDisplayPanel(page, 'rtdl');
  await page.locator('[data-task-id="C"]').click();
  await expect(page.locator('.goal-preview')).not.toContainText('camera-provider');
  await page.locator('[data-task-id="A"]').click();
  await expect(cards).toHaveCount(2);
  expect(await page.locator('.current-goal-panel').evaluate(el => el.getBoundingClientRect().height)).toBe(panelHeight);
  await page.reload();
  await openDisplayPanel(page);
  await expect(cards).toHaveCount(2);
  await expect(cards.nth(0).locator('.execution-summary-status')).toHaveText('completed');
  await expect(cards.filter({hasText:'base-provider'}).locator('.execution-summary-status')).toHaveText('canceled');
  await page.locator('.current-goal-panel').scrollIntoViewIfNeeded();
  await page.screenshot({path:test.info().outputPath('executor-parallel.png')});
});

test('current RTDL keeps pending children without borrowing composite or unmapped status', async ({page}) => {
  await parallelCallsFixture(page);
  await page.evaluate(() => {
    state.lastExecutionByTask.clear();
    state.executorPlans[0].ops.slice(1).forEach(op => op.state = 'pending');
    renderGoalPanel();
  });
  await expect(page.locator('.execution-summary-status')).toHaveText(['pending', 'pending']);
  await expect(page.locator('.goal-preview .goal-call-grid')).toHaveCount(2);
  await page.evaluate(() => {
    state.executorPlans[0].ops.push({op_id:'tree-not-arrived',kind:'do',state:'running',description:'unmapped call'});
    renderGoalPanel();
  });
  await expect(page.locator('.goal-preview')).not.toContainText('unmapped call');
  await expect(page.locator('.goal-preview')).toContainText('camera-provider');
  await page.evaluate(() => {
    state.executorPlans = [];
    updatePlanRecordResult('plan-a', record => record.batches = [{anyFailed:false,results:[]}]);
    renderGoalPanel();
  });
  await expect(page.locator('.execution-summary-status')).toHaveText(['Live status unconfirmed', 'Live status unconfirmed']);
});

test('only a new owned RTDL replaces the complete Executor group', async ({page}) => {
  await parallelCallsFixture(page);
  await page.evaluate(() => {
    state.executorPlans = [];
    renderGoalPanel();
  });
  await expect(page.locator('.goal-preview .goal-card > strong')).toHaveText(['snapshot', 'navigate']);
  await page.evaluate(() => {
    upsertPlanRecord({planId:'foreign-new', round:2, nodes:[{index:0,opId:'foreign',call:{name:'foreign'}}]});
    renderGoalPanel();
  });
  await expect(page.locator('.goal-preview .goal-card > strong')).toHaveText(['snapshot', 'navigate']);
  await page.evaluate(() => {
    state.taskState.tasks.find(task => task.taskId === 'A').planIds.push('next');
    upsertPlanRecord({planId:'next',round:2,nodes:[{index:0,opId:'next',call:{name:'new call'}}]});
    renderGoalPanel();
  });
  await expect(page.locator('.goal-preview .goal-card > strong')).toHaveText(['new call']);
  await expect(page.locator('.execution-summary-status')).toHaveText('pending');
  await page.evaluate(() => {
    updatePlanRecordResult('plan-a', record => {record.nodeStates['1']={nodeIndex:1,state:'SUCCEEDED'};});
    renderGoalPanel();
    rememberLastSession(state.sessionId);
    persistCurrentConversation();
  });
  await expect(page.locator('.goal-preview .goal-card > strong')).toHaveText(['new call']);
  await page.reload();
  await openDisplayPanel(page);
  await expect(page.locator('.goal-preview .goal-card > strong')).toHaveText(['new call']);
});


test('newest tasks lead and follow scrolls to top while pinned selection stays put', async ({page}) => {
  await prepare(page);
  await populate(page);
  await expect(page.locator('.task-list-row').first()).toHaveAttribute('data-task-id','T12');
  await page.evaluate(() => selectTask('T5'));
  await page.locator('#taskList').evaluate(el => el.scrollTop = 80);
  await page.evaluate(() => {
    state.taskState.tasks.push({taskId:'T13',goal:'new',status:'in_progress',planIds:[]});
    state.taskState.taskId = 'T13';
    renderPlan();
  });
  expect(await page.locator('#taskList').evaluate(el => el.scrollTop)).toBe(80);
  await expect(page.locator('[data-task-id="T5"]')).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button',{name:'Follow latest task',exact:true}).click();
  expect(await page.locator('#taskList').evaluate(el => el.scrollTop)).toBe(0);
  await page.locator('#taskList').evaluate(el => el.scrollTop = 80);
  await page.evaluate(() => {
    state.taskState.tasks.push({taskId:'T14',goal:'newer',status:'in_progress',planIds:[]});
    state.taskState.taskId = 'T14';
    renderPlan();
  });
  await expect(page.locator('.task-list-row').first()).toHaveAttribute('data-task-id','T14');
  await expect(page.locator('.task-list-row').first()).toHaveAttribute('aria-pressed','true');
  expect(await page.locator('#taskList').evaluate(el => el.scrollTop)).toBe(0);
});

test('overview retains every owned round across tasks when Executor is empty or unavailable', async ({page}) => {
  await ownershipFixture(page);
  await page.evaluate(() => {
    state.executorPlans = [];
    state.planRecords.push({...state.planRecords[1],key:'plan-a:2',plan:{...state.planRecords[1].plan,round:2}});
    openActiveRtdl();
    renderActivePlans();
  });
  const saved = page.locator('#savedRtdlList');
  await expect(saved.locator('summary')).toHaveCount(4);
  await expect(saved).toContainText('plan-a · round 2');
  await expect(saved).toContainText('plan-b');
  await expect(saved).not.toContainText('unknown');
  await expect(page.locator('#activeRtdlList')).toContainText('no active RTDL plans');
  await saved.locator('summary').filter({hasText:'Plan plan-b'}).click();
  await page.evaluate(() => renderPlan());
  await expect(saved.locator('details[open]')).toHaveCount(1);
  await saved.getByRole('button',{name:'View call details'}).first().click();
  await expect(page.locator('#callDetailBody')).toContainText('plan-b');
  await page.keyboard.press('Escape');
  await page.evaluate(() => renderActivePlans('offline'));
  await expect(saved.locator('summary')).toHaveCount(4);
  await page.screenshot({path:test.info().outputPath('plan-overview.png')});
});

test('unavailable Executor query names the failed hop and hides the raw gRPC error', async ({page}) => {
  await prepare(page);
  await page.route('**/api/executor/active-plans', route => route.fulfill({json:{
    available:false,count:0,plans:[],reason:'atlas_unreachable',endpoint:'10.0.0.5:50051',error:'gRPC DEADLINE_EXCEEDED: Deadline Exceeded',
  }}));
  await page.evaluate(async () => {
    $('robotHost').value = '10.0.0.5';
    openActiveRtdl();
    await refreshActivePlans();
  });
  const notice = page.locator('#activeRtdlList .active-rtdl-empty.error');
  await expect(notice.locator('strong')).toHaveText('Cannot reach Atlas at 10.0.0.5:50051.');
  await expect(notice.locator('details code')).toBeHidden();
  await notice.locator('details summary').click();
  await expect(notice.locator('details code')).toHaveText('gRPC DEADLINE_EXCEEDED: Deadline Exceeded');
  await expect(notice).not.toContainText('AioRpcError');
});

test('overview polls keep saved-plan nodes and scroll while nothing changes', async ({page}) => {
  await prepare(page);
  const result = await page.evaluate(() => {
    const plan = i => ({planId:`p${i}`,round:1,rootIndex:0,nodes:[{index:0,opId:`o${i}`,description:`call ${i}`,call:{name:'x'}}]});
    state.taskState = {taskId:'T',tasks:[{taskId:'T',goal:'g',status:'done',planIds:Array.from({length:40},(_,i)=>`p${i}`)}]};
    state.planRecords = Array.from({length:40},(_,i)=>({key:`p${i}:1`,plan:plan(i),nodeStates:{},batches:[{}]}));
    openActiveRtdl();
    document.querySelectorAll('#savedRtdlList details').forEach(d => { d.open = true; });
    const body = document.querySelector('.active-rtdl-modal-body');
    body.scrollTop = 600;
    const node = document.querySelector('#savedRtdlList .saved-plan-node');
    renderPlan();
    const kept = node.isConnected;
    state.planRecords[5].nodeStates = {0:{nodeIndex:0,state:'FAILED'}};
    renderPlan();
    return {kept, scroll: body.scrollTop, changed: !node.isConnected, open: document.querySelectorAll('#savedRtdlList details[open]').length};
  });
  expect(result).toEqual({kept:true, scroll:600, changed:true, open:40});
});

test('without task ownership the tree and Executor card show the same plan', async ({page}) => {
  await prepare(page);
  await page.evaluate(() => {
    state.taskState = null;
    state.planRecords = [{key:'L:1',plan:{planId:'L',round:1,rootIndex:0,nodes:[{index:0,opId:'L',call:{name:'legacy call'}}]},nodeStates:{},batches:[]}];
    state.executorPlansReady = true;
    state.executorPlans = [{planId:'L',ops:[{op_id:'L',kind:'do',state:'running'}]},{planId:'foreign',ops:[{op_id:'f',kind:'do',state:'running'}]}];
    state.executorPlanIds = new Set(['L','foreign']);
    renderPlan();
  });
  await expect(page.locator('[data-plan-tree]').first()).toContainText('Plan L');
  await expect(page.locator('.goal-preview .goal-card > strong')).toHaveText(['legacy call']);
  await expect(page.locator('.goal-preview .execution-summary-status')).toHaveText(['Executing now']);
  await expect(page.locator('.goal-preview .call-detail-trigger')).toHaveCount(1);
});

test('Executor card follows the running plan when it is not the newest', async ({page}) => {
  await prepare(page);
  await page.evaluate(() => {
    const plan = id => ({planId:id,round:1,rootIndex:0,nodes:[{index:0,opId:id,call:{name:`${id} call`}}]});
    state.taskState = {taskId:'T',tasks:[{taskId:'T',goal:'g',status:'in_progress',planIds:['NEW','OLD']}]};
    state.planRecords = [{key:'NEW:1',plan:plan('NEW'),nodeStates:{},batches:[{}]},{key:'OLD:1',plan:plan('OLD'),nodeStates:{},batches:[]}];
    state.executorPlansReady = true;
    state.executorPlans = [{planId:'OLD',ops:[{op_id:'OLD',kind:'do',state:'running'}]}];
    state.executorPlanIds = new Set(['OLD']);
    renderPlan();
  });
  await expect(page.locator('[data-plan-tree]').first()).toContainText('Plan OLD');
  await expect(page.locator('.goal-preview .goal-card > strong')).toHaveText(['OLD call']);
  await expect(page.locator('.goal-preview .execution-summary-status')).toHaveText(['Executing now']);
});

test('saved plans without task information get their own group', async ({page}) => {
  await prepare(page);
  await page.evaluate(() => {
    state.taskState = {tasks:[]};
    state.planRecords = [{key:'legacy:1',plan:{planId:'legacy',round:1,rootIndex:0,nodes:[{index:0,opId:'o',description:'move',call:{name:'move'}}]},nodeStates:{0:{state:'SUCCEEDED'}},batches:[{}]}];
    openActiveRtdl();
  });
  const group = page.locator('#savedRtdlList .saved-plan-task');
  await expect(group).toHaveCount(1);
  await expect(group.locator('h4')).toHaveText('Plans without task information');
  await expect(group.locator('.saved-plan-record > summary')).toContainText('legacy');
});


test('Executor heading stays fixed while calls scroll and refresh', async ({page}) => {
  await parallelCallsFixture(page);
  await openDisplayPanel(page, 'executor');
  await limitPreviewHeight(page);
  const heading = page.locator('#executorHeading');
  const preview = page.locator('.goal-preview');
  await heading.scrollIntoViewIfNeeded();
  const before = await heading.boundingBox();
  for (const scrollTop of [5, 15, 40, 10000, 0]) {
    await preview.evaluate((el, top) => el.scrollTop = top, scrollTop);
    expect(await heading.boundingBox()).toEqual(before);
    await page.evaluate(() => renderGoalPanel());
    expect(await heading.boundingBox()).toEqual(before);
  }
  await preview.hover();
  await page.mouse.wheel(0, 80);
  await expect.poll(() => preview.evaluate(el => el.scrollTop)).toBeGreaterThan(0);
  expect(await heading.boundingBox()).toEqual(before);
  await page.evaluate(() => renderGoalPanel());
  expect(await heading.boundingBox()).toEqual(before);
  await page.screenshot({path:test.info().outputPath('fixed-executor-heading.png')});
});

test('completed calls advance the summary without an observed running poll', async ({page}) => {
  await prepare(page);
  const snapshots = await page.evaluate(() => {
    state.taskState = {taskId:'T',tasks:[{taskId:'T',goal:'fast calls',planIds:['A','B']}]};
    state.executorPlansReady = true;
    state.executorPlans = [];
    state.planRecords = [];
    state.lastExecutionByTask.clear();
    const add = id => {
      upsertPlanRecord({planId:id,round:1,nodes:[{index:0,opId:id,call:{callId:id,name:id}}]});
      updatePlanRecordResult(id, record => {
        record.nodeStates = {'0':{nodeIndex:0,state:'SUCCEEDED'}};
        record.batches = [{anyFailed:false,results:[]}];
      });
    };
    add('A');
    const first = executionSummaries().map(item => item.context.plan.planId);
    add('B');
    const second = executionSummaries().map(item => item.context.plan.planId);
    renderGoalPanel();
    return {first,second};
  });
  expect(snapshots).toEqual({first:['A'],second:['B']});
  await expect(page.locator('.goal-preview .goal-card')).toHaveCount(1);
  await expect(page.locator('.execution-summary-status')).toHaveText('completed');
});

test('Executor orders returned calls and preserves order through verification, batch and reload', async ({page}) => {
  await parallelCallsFixture(page);
  await page.evaluate(() => {
    state.executorPlans = [];
    state.executorPlanIds = new Set();
    const emit = (nodeIndex, opId, callId, status) => handlePilotEvent({kind:'node_state',nodeState:{planId:'plan-a',nodeIndex,opId,state:status,leafResult:{callId,success:true}}});
    emit(2,'nav','nav-call','VERIFYING');
    emit(1,'camera','camera-call','SUCCEEDED');
    emit(2,'nav','nav-call','SUCCEEDED');
  });
  const titles = page.locator('.goal-preview .goal-card > strong');
  await expect(titles).toHaveText(['snapshot','navigate']);
  await page.evaluate(() => {
    handlePilotEvent({kind:'batch_result',batchResult:{planId:'plan-a',round:1,anyFailed:false,results:[
      {nodeIndex:1,opId:'camera',state:'SUCCEEDED',leafResult:{callId:'camera-call',success:true}},
      {nodeIndex:2,opId:'nav',state:'SUCCEEDED',leafResult:{callId:'nav-call',success:true}},
    ]}});
    rememberLastSession(state.sessionId);
  });
  await expect(titles).toHaveText(['snapshot','navigate']);
  await page.reload();
  await openDisplayPanel(page);
  await expect(titles).toHaveText(['snapshot','navigate']);
});

test('canceled plans are not labeled completed when anyFailed is false', async ({page}) => {
  await parallelCallsFixture(page);
  await page.evaluate(() => {
    state.executorPlans = [];
    state.executorPlanIds = new Set();
    updatePlanRecordResult('plan-a', record => {
      record.nodeStates = {'0':{nodeIndex:0,state:'CANCELED'},'1':{nodeIndex:1,state:'SUCCEEDED'},'2':{nodeIndex:2,state:'CANCELED'}};
      record.batches = [{anyFailed:false,results:Object.values(record.nodeStates)}];
    });
    renderPlan();
  });
  await expect(page.locator('[data-plan-tree] .plan-record-label').first()).toHaveText('Plan plan-a · round 1 · 2 call(s) · canceled');
  await page.evaluate(() => window.RobonixI18N.setLang('zh'));
  await expect(page.locator('[data-plan-tree] .plan-record-label').first()).toContainText('已取消');
});

test('Escape closes call details before the underlying plan overview', async ({page}) => {
  await ownershipFixture(page);
  await page.evaluate(() => {
    document.querySelector('#activeRtdlModal').hidden = false;
    renderSavedPlans();
  });
  const saved = page.locator('#savedRtdlList');
  await saved.locator('summary').filter({hasText:'Plan plan-b'}).click();
  await saved.getByRole('button',{name:'View call details'}).first().click();
  await expect(page.locator('#callDetailModal')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#callDetailModal')).not.toBeVisible();
  await expect(page.locator('#activeRtdlModal')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#activeRtdlModal')).not.toBeVisible();
});


test('Executor retains metadata and respects terminal and verification states over stale polls', async ({page}) => {
  await parallelCallsFixture(page);
  await page.evaluate(() => {
    state.executorPlans[0].ops[1].provider_id = 'resolved-camera';
    handlePilotEvent({kind:'node_state',nodeState:{planId:'plan-a',nodeIndex:1,state:'VERIFYING',leafResult:{success:true}}});
  });
  const camera = page.locator('.goal-preview .goal-card').filter({hasText:'snapshot'});
  await expect(camera.locator('.execution-summary-status')).toHaveText('verifying');
  await page.evaluate(() => {
    handlePilotEvent({kind:'node_state',nodeState:{planId:'plan-a',nodeIndex:1,state:'CANCELED'}});
    state.executorPlans = [];
    renderGoalPanel();
  });
  await expect(camera.locator('.execution-summary-status')).toHaveText('canceled');
  await expect(camera).toContainText('resolved-camera');
  await page.evaluate(() => {
    state.executorPlansReady = false;
    state.taskStateStale = true;
    state.executorPlans = [{planId:'plan-a',ops:[{op_id:'nav',kind:'do',state:'running'}]}];
    renderGoalPanel();
  });
  await expect(page.locator('.goal-preview .goal-card').filter({hasText:'navigate'}).locator('.execution-summary-status')).toHaveText('Live status unconfirmed');
});


test('Executor preserves polled outcomes and does not finish calls still being verified', async ({page}) => {
  await parallelCallsFixture(page);
  const camera = page.locator('.goal-preview .goal-card').filter({hasText:'snapshot'});
  await page.evaluate(() => {
    const record = state.planRecords.find(item => item.plan.planId === 'plan-a');
    record.nodeStates['1'] = {nodeIndex:1,state:'RUNNING',leafResult:{success:true}};
    state.executorPlans[0].ops[1].state = 'verifying';
    renderGoalPanel();
  });
  await expect(camera.locator('.execution-summary-status')).toHaveText('verifying');
  await page.evaluate(() => {
    state.executorPlans[0].ops[1].state = 'failed';
    renderGoalPanel();
    state.executorPlans = [];
    renderGoalPanel();
  });
  await expect(camera.locator('.execution-summary-status')).toHaveText('failed');
  await page.evaluate(() => {
    selectTask('C');
    selectTask('A');
  });
  await expect(camera.locator('.execution-summary-status')).toHaveText('failed');
});
