(()=>{var Bi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ki={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},mh=0,Pc=1,gh=2;var qr=1,So=2,js=3,_n=0,qt=1,un=2,ii=0,es=1,Ic=2,Lc=3,Nc=4,xh=5;var Li=100,_h=101,yh=102,vh=103,bh=104,Sh=200,Mh=201,Th=202,wh=203,Ya=204,Ka=205,Ah=206,Eh=207,Ch=208,Rh=209,Ph=210,Ih=211,Lh=212,Nh=213,Dh=214,Za=0,ja=1,Ja=2,ts=3,$a=4,Qa=5,eo=6,to=7,Yr=0,Uh=1,Fh=2,Hn=0,Dc=1,Uc=2,Fc=3,Kr=4,Oc=5,Bc=6,kc=7,pc="attached",Oh="detached",zc=300,zi=301,hs=302,Mo=303,To=304,Zr=306,yn=1e3,Gt=1001,Us=1002,wt=1003,wo=1004;var ds=1005;var mt=1006,Js=1007;var fn=1008;var hn=1009,Hc=1010,Vc=1011,$s=1012,Ao=1013,Vn=1014,Tn=1015,si=1016,Eo=1017,Co=1018,Qs=1020,Gc=35902,Wc=35899,Xc=1021,qc=1022,wn=1023,Kn=1026,Hi=1027,Ro=1028,Po=1029,Vi=1030,Io=1031;var Lo=1033,jr=33776,Jr=33777,$r=33778,Qr=33779,No=35840,Do=35841,Uo=35842,Fo=35843,Oo=36196,Bo=37492,ko=37496,zo=37488,Ho=37489,ea=37490,Vo=37491,Go=37808,Wo=37809,Xo=37810,qo=37811,Yo=37812,Ko=37813,Zo=37814,jo=37815,Jo=37816,$o=37817,Qo=37818,el=37819,tl=37820,nl=37821,il=36492,sl=36494,rl=36495,al=36283,ol=36284,ta=36285,ll=36286;var mi=2300,ns=2301,qa=2302,_r=2303,mc=2400,gc=2401,xc=2402,Bh=2500;var Yc=0,na=1,er=2,kh=3200;var tr=0,zh=1,Si="",Ke="srgb",sn="srgb-linear",yr="linear",$e="srgb";var $i=7680;var _c=519,Hh=512,Vh=513,Gh=514,cl=515,Wh=516,Xh=517,ul=518,qh=519,no=35044;var Kc="300 es",On=2e3,Fs=2001;function sp(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function rp(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Os(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Yh(){let s=Os("canvas");return s.style.display="block",s}var Cf={},Bs=null;function vr(...s){let e="THREE."+s.shift();Bs?Bs("log",e,...s):console.log(e,...s)}function Kh(s){let e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ae(...s){s=Kh(s);let e="THREE."+s.shift();if(Bs)Bs("warn",e,...s);else{let t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function De(...s){s=Kh(s);let e="THREE."+s.shift();if(Bs)Bs("error",e,...s);else{let t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function Qi(...s){let e=s.join(" ");e in Cf||(Cf[e]=!0,Ae(...s))}function Zh(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var jh={[Za]:ja,[Ja]:eo,[$a]:to,[ts]:Qa,[ja]:Za,[eo]:Ja,[to]:$a,[Qa]:ts},kn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}},Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Rf=1234567,Ns=Math.PI/180,is=180/Math.PI;function Bn(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Kt[s&255]+Kt[s>>8&255]+Kt[s>>16&255]+Kt[s>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]).toLowerCase()}function Xe(s,e,t){return Math.max(e,Math.min(t,s))}function Zc(s,e){return(s%e+e)%e}function ap(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function op(s,e,t){return s!==e?(t-s)/(e-s):0}function xr(s,e,t){return(1-t)*s+t*e}function lp(s,e,t,n){return xr(s,e,1-Math.exp(-t*n))}function cp(s,e=1){return e-Math.abs(Zc(s,e*2)-e)}function up(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function fp(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function hp(s,e){return s+Math.floor(Math.random()*(e-s+1))}function dp(s,e){return s+Math.random()*(e-s)}function pp(s){return s*(.5-Math.random())}function mp(s){s!==void 0&&(Rf=s);let e=Rf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function gp(s){return s*Ns}function xp(s){return s*is}function _p(s){return(s&s-1)===0&&s!==0}function yp(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function vp(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function bp(s,e,t,n,i){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),f=a((e-n)/2),d=r((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":s.set(o*u,c*h,c*f,o*l);break;case"YZY":s.set(c*f,o*u,c*h,o*l);break;case"ZXZ":s.set(c*h,c*f,o*u,o*l);break;case"XZX":s.set(o*u,c*g,c*d,o*l);break;case"YXY":s.set(c*d,o*u,c*g,o*l);break;case"ZYZ":s.set(c*g,c*d,o*u,o*l);break;default:Ae("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Un(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function et(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var $t={DEG2RAD:Ns,RAD2DEG:is,generateUUID:Bn,clamp:Xe,euclideanModulo:Zc,mapLinear:ap,inverseLerp:op,lerp:xr,damp:lp,pingpong:cp,smoothstep:up,smootherstep:fp,randInt:hp,randFloat:dp,randFloatSpread:pp,seededRandom:mp,degToRad:gp,radToDeg:xp,isPowerOfTwo:_p,ceilPowerOfTwo:yp,floorPowerOfTwo:vp,setQuaternionFromProperEuler:bp,normalize:et,denormalize:Un},eu=class eu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Xe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};eu.prototype.isVector2=!0;var Te=eu,ut=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3],f=r[a+0],d=r[a+1],g=r[a+2],_=r[a+3];if(h!==_||c!==f||l!==d||u!==g){let m=c*f+l*d+u*g+h*_;m<0&&(f=-f,d=-d,g=-g,_=-_,m=-m);let p=1-o;if(m<.9995){let b=Math.acos(m),M=Math.sin(b);p=Math.sin(p*b)/M,o=Math.sin(o*b)/M,c=c*p+f*o,l=l*p+d*o,u=u*p+g*o,h=h*p+_*o}else{c=c*p+f*o,l=l*p+d*o,u=u*p+g*o,h=h*p+_*o;let b=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=b,l*=b,u*=b,h*=b}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,a){let o=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return e[t]=o*g+u*h+c*d-l*f,e[t+1]=c*g+u*f+l*h-o*d,e[t+2]=l*g+u*d+o*f-c*h,e[t+3]=u*g-o*h-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(i/2),h=o(r/2),f=c(n/2),d=c(i/2),g=c(r/2);switch(a){case"XYZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"YZX":this._x=f*u*h+l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h-f*d*g;break;case"XZY":this._x=f*u*h-l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h+f*d*g;break;default:Ae("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=n+o+h;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(a-i)*d}else if(n>o&&n>h){let d=2*Math.sqrt(1+n-o-h);this._w=(u-c)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(r+l)/d}else if(o>h){let d=2*Math.sqrt(1+o-n-h);this._w=(r-l)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(c+u)/d}else{let d=2*Math.sqrt(1+h-n-o);this._w=(a-i)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xe(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+i*l-r*c,this._y=i*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-i*o,this._w=a*u-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},tu=class tu{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Pf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Pf.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),u=2*(o*t-r*i),h=2*(r*n-a*t);return this.x=t+c*l+a*h-o*u,this.y=n+c*u+o*l-r*h,this.z=i+c*h+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Hl.copy(this).projectOnVector(e),this.sub(Hl)}reflect(e){return this.sub(Hl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Xe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};tu.prototype.isVector3=!0;var L=tu,Hl=new L,Pf=new ut,nu=class nu{constructor(e,t,n,i,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){let u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],_=i[0],m=i[3],p=i[6],b=i[1],M=i[4],y=i[7],T=i[2],w=i[5],E=i[8];return r[0]=a*_+o*b+c*T,r[3]=a*m+o*M+c*w,r[6]=a*p+o*y+c*E,r[1]=l*_+u*b+h*T,r[4]=l*m+u*M+h*w,r[7]=l*p+u*y+h*E,r[2]=f*_+d*b+g*T,r[5]=f*m+d*M+g*w,r[8]=f*p+d*y+g*E,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+i*r*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*a-o*l,f=o*c-u*r,d=l*r-a*c,g=t*h+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=h*_,e[1]=(i*l-u*n)*_,e[2]=(o*n-i*a)*_,e[3]=f*_,e[4]=(u*t-i*c)*_,e[5]=(i*r-o*t)*_,e[6]=d*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Qi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Vl.makeScale(e,t)),this}rotate(e){return Qi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Vl.makeRotation(-e)),this}translate(e,t){return Qi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Vl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};nu.prototype.isMatrix3=!0;var ke=nu,Vl=new ke,If=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Lf=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Sp(){let s={enabled:!0,workingColorSpace:sn,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===$e&&(i.r=pi(i.r),i.g=pi(i.g),i.b=pi(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===$e&&(i.r=Ds(i.r),i.g=Ds(i.g),i.b=Ds(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Si?yr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Qi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Qi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[sn]:{primaries:e,whitePoint:n,transfer:yr,toXYZ:If,fromXYZ:Lf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ke},outputColorSpaceConfig:{drawingBufferColorSpace:Ke}},[Ke]:{primaries:e,whitePoint:n,transfer:$e,toXYZ:If,fromXYZ:Lf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ke}}}),s}var Be=Sp();function pi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ds(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var ys,io=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ys===void 0&&(ys=Os("canvas")),ys.width=e.width,ys.height=e.height;let i=ys.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ys}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Os("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=pi(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(pi(t[n]/255)*255):t[n]=pi(t[n]);return{data:t,width:e.width,height:e.height}}else return Ae("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Mp=0,ks=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mp++}),this.uuid=Bn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Gl(i[a].image)):r.push(Gl(i[a]))}else r=Gl(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function Gl(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?io.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ae("Texture: Unable to serialize Texture."),{})}var Tp=0,Wl=new L,kt=class s extends kn{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Gt,i=Gt,r=mt,a=fn,o=wn,c=hn,l=s.DEFAULT_ANISOTROPY,u=Si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Tp++}),this.uuid=Bn(),this.name="",this.source=new ks(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Te(0,0),this.repeat=new Te(1,1),this.center=new Te(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Wl).x}get height(){return this.source.getSize(Wl).y}get depth(){return this.source.getSize(Wl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ae(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Ae(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==zc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case yn:e.x=e.x-Math.floor(e.x);break;case Gt:e.x=e.x<0?0:1;break;case Us:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case yn:e.y=e.y-Math.floor(e.y);break;case Gt:e.y=e.y<0?0:1;break;case Us:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};kt.DEFAULT_IMAGE=null;kt.DEFAULT_MAPPING=zc;kt.DEFAULT_ANISOTROPY=1;var iu=class iu{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(l+1)/2,y=(d+1)/2,T=(p+1)/2,w=(u+f)/4,E=(h+_)/4,x=(g+m)/4;return M>y&&M>T?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=w/n,r=E/n):y>T?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=w/i,r=x/i):T<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(T),n=E/r,i=x/r),this.set(n,i,r,t),this}let b=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(h-_)/b,this.z=(f-u)/b,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this.w=Xe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this.w=Xe(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};iu.prototype.isVector4=!0;var tt=iu,so=class extends kn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new tt(0,0,e,t),this.scissorTest=!1,this.viewport=new tt(0,0,e,t),this.textures=[];let i={width:e,height:t,depth:n.depth},r=new kt(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:mt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new ks(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},vn=class extends so{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},br=class extends kt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=wt,this.minFilter=wt,this.wrapR=Gt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ro=class extends kt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=wt,this.minFilter=wt,this.wrapR=Gt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var bo=class bo{constructor(e,t,n,i,r,a,o,c,l,u,h,f,d,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,u,h,f,d,g,_,m)}set(e,t,n,i,r,a,o,c,l,u,h,f,d,g,_,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new bo().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/vs.setFromMatrixColumn(e,0).length(),r=1/vs.setFromMatrixColumn(e,1).length(),a=1/vs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let f=a*u,d=a*h,g=o*u,_=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=d+g*l,t[5]=f-_*l,t[9]=-o*c,t[2]=_-f*l,t[6]=g+d*l,t[10]=a*c}else if(e.order==="YXZ"){let f=c*u,d=c*h,g=l*u,_=l*h;t[0]=f+_*o,t[4]=g*o-d,t[8]=a*l,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=d*o-g,t[6]=_+f*o,t[10]=a*c}else if(e.order==="ZXY"){let f=c*u,d=c*h,g=l*u,_=l*h;t[0]=f-_*o,t[4]=-a*h,t[8]=g+d*o,t[1]=d+g*o,t[5]=a*u,t[9]=_-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let f=a*u,d=a*h,g=o*u,_=o*h;t[0]=c*u,t[4]=g*l-d,t[8]=f*l+_,t[1]=c*h,t[5]=_*l+f,t[9]=d*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let f=a*c,d=a*l,g=o*c,_=o*l;t[0]=c*u,t[4]=_-f*h,t[8]=g*h+d,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=d*h+g,t[10]=f-_*h}else if(e.order==="XZY"){let f=a*c,d=a*l,g=o*c,_=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+_,t[5]=a*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=o*u,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(wp,e,Ap)}lookAt(e,t,n){let i=this.elements;return gn.subVectors(e,t),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),Ai.crossVectors(n,gn),Ai.lengthSq()===0&&(Math.abs(n.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),Ai.crossVectors(n,gn)),Ai.normalize(),ma.crossVectors(gn,Ai),i[0]=Ai.x,i[4]=ma.x,i[8]=gn.x,i[1]=Ai.y,i[5]=ma.y,i[9]=gn.y,i[2]=Ai.z,i[6]=ma.z,i[10]=gn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],b=n[3],M=n[7],y=n[11],T=n[15],w=i[0],E=i[4],x=i[8],S=i[12],R=i[1],C=i[5],I=i[9],F=i[13],V=i[2],O=i[6],N=i[10],H=i[14],q=i[3],K=i[7],ie=i[11],ne=i[15];return r[0]=a*w+o*R+c*V+l*q,r[4]=a*E+o*C+c*O+l*K,r[8]=a*x+o*I+c*N+l*ie,r[12]=a*S+o*F+c*H+l*ne,r[1]=u*w+h*R+f*V+d*q,r[5]=u*E+h*C+f*O+d*K,r[9]=u*x+h*I+f*N+d*ie,r[13]=u*S+h*F+f*H+d*ne,r[2]=g*w+_*R+m*V+p*q,r[6]=g*E+_*C+m*O+p*K,r[10]=g*x+_*I+m*N+p*ie,r[14]=g*S+_*F+m*H+p*ne,r[3]=b*w+M*R+y*V+T*q,r[7]=b*E+M*C+y*O+T*K,r[11]=b*x+M*I+y*N+T*ie,r[15]=b*S+M*F+y*H+T*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15],b=c*d-l*f,M=o*d-l*h,y=o*f-c*h,T=a*d-l*u,w=a*f-c*u,E=a*h-o*u;return t*(_*b-m*M+p*y)-n*(g*b-m*T+p*w)+i*(g*M-_*T+p*E)-r*(g*y-_*w+m*E)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-n*(r*u-o*c)+i*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],b=t*o-n*a,M=t*c-i*a,y=t*l-r*a,T=n*c-i*o,w=n*l-r*o,E=i*l-r*c,x=u*_-h*g,S=u*m-f*g,R=u*p-d*g,C=h*m-f*_,I=h*p-d*_,F=f*p-d*m,V=b*F-M*I+y*C+T*R-w*S+E*x;if(V===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/V;return e[0]=(o*F-c*I+l*C)*O,e[1]=(i*I-n*F-r*C)*O,e[2]=(_*E-m*w+p*T)*O,e[3]=(f*w-h*E-d*T)*O,e[4]=(c*R-a*F-l*S)*O,e[5]=(t*F-i*R+r*S)*O,e[6]=(m*y-g*E-p*M)*O,e[7]=(u*E-f*y+d*M)*O,e[8]=(a*I-o*R+l*x)*O,e[9]=(n*R-t*I-r*x)*O,e[10]=(g*w-_*y+p*b)*O,e[11]=(h*y-u*w-d*b)*O,e[12]=(o*S-a*C-c*x)*O,e[13]=(t*C-n*S+i*x)*O,e[14]=(_*M-g*T-m*b)*O,e[15]=(u*T-h*M+f*b)*O,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,u*o+n,u*c-i*a,0,l*c-i*o,u*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,h=o+o,f=r*l,d=r*u,g=r*h,_=a*u,m=a*h,p=o*h,b=c*l,M=c*u,y=c*h,T=n.x,w=n.y,E=n.z;return i[0]=(1-(_+p))*T,i[1]=(d+y)*T,i[2]=(g-M)*T,i[3]=0,i[4]=(d-y)*w,i[5]=(1-(f+p))*w,i[6]=(m+b)*w,i[7]=0,i[8]=(g+M)*E,i[9]=(m-b)*E,i[10]=(1-(f+_))*E,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=vs.set(i[0],i[1],i[2]).length(),o=vs.set(i[4],i[5],i[6]).length(),c=vs.set(i[8],i[9],i[10]).length();r<0&&(a=-a),Ln.copy(this);let l=1/a,u=1/o,h=1/c;return Ln.elements[0]*=l,Ln.elements[1]*=l,Ln.elements[2]*=l,Ln.elements[4]*=u,Ln.elements[5]*=u,Ln.elements[6]*=u,Ln.elements[8]*=h,Ln.elements[9]*=h,Ln.elements[10]*=h,t.setFromRotationMatrix(Ln),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,i,r,a,o=On,c=!1){let l=this.elements,u=2*r/(t-e),h=2*r/(n-i),f=(t+e)/(t-e),d=(n+i)/(n-i),g,_;if(c)g=r/(a-r),_=a*r/(a-r);else if(o===On)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Fs)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=On,c=!1){let l=this.elements,u=2/(t-e),h=2/(n-i),f=-(t+e)/(t-e),d=-(n+i)/(n-i),g,_;if(c)g=1/(a-r),_=a/(a-r);else if(o===On)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===Fs)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=h,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};bo.prototype.isMatrix4=!0;var Ee=bo,vs=new L,Ln=new Ee,wp=new L(0,0,0),Ap=new L(1,1,1),Ai=new L,ma=new L,gn=new L,Nf=new Ee,Df=new ut,rn=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Xe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Xe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Ae("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Nf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Nf,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Df.setFromEuler(this),this.setFromQuaternion(Df,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};rn.DEFAULT_ORDER="XYZ";var zs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Ep=0,Uf=new L,bs=new ut,li=new Ee,ga=new L,lr=new L,Cp=new L,Rp=new ut,Ff=new L(1,0,0),Of=new L(0,1,0),Bf=new L(0,0,1),kf={type:"added"},Pp={type:"removed"},Ss={type:"childadded",child:null},Xl={type:"childremoved",child:null},dt=class s extends kn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ep++}),this.uuid=Bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new L,t=new rn,n=new ut,i=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ee},normalMatrix:{value:new ke}}),this.matrix=new Ee,this.matrixWorld=new Ee,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return bs.setFromAxisAngle(e,t),this.quaternion.multiply(bs),this}rotateOnWorldAxis(e,t){return bs.setFromAxisAngle(e,t),this.quaternion.premultiply(bs),this}rotateX(e){return this.rotateOnAxis(Ff,e)}rotateY(e){return this.rotateOnAxis(Of,e)}rotateZ(e){return this.rotateOnAxis(Bf,e)}translateOnAxis(e,t){return Uf.copy(e).applyQuaternion(this.quaternion),this.position.add(Uf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ff,e)}translateY(e){return this.translateOnAxis(Of,e)}translateZ(e){return this.translateOnAxis(Bf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(li.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ga.copy(e):ga.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),lr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?li.lookAt(lr,ga,this.up):li.lookAt(ga,lr,this.up),this.quaternion.setFromRotationMatrix(li),i&&(li.extractRotation(i.matrixWorld),bs.setFromRotationMatrix(li),this.quaternion.premultiply(bs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(De("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(kf),Ss.child=e,this.dispatchEvent(Ss),Ss.child=null):De("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Pp),Xl.child=e,this.dispatchEvent(Xl),Xl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),li.multiply(e.parent.matrixWorld)),e.applyMatrix4(li),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(kf),Ss.child=e,this.dispatchEvent(Ss),Ss.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,e,Cp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,Rp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),d=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){let c=[];for(let l in o){let u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};dt.DEFAULT_UP=new L(0,1,0);dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var it=class extends dt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Ip={type:"move"},Hs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new it,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new it,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new it,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ip)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new it;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Jh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ei={h:0,s:0,l:0},xa={h:0,s:0,l:0};function ql(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var de=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ke){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Be.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Be.workingColorSpace){return this.r=e,this.g=t,this.b=n,Be.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Be.workingColorSpace){if(e=Zc(e,1),t=Xe(t,0,1),n=Xe(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ql(a,r,e+1/3),this.g=ql(a,r,e),this.b=ql(a,r,e-1/3)}return Be.colorSpaceToWorking(this,i),this}setStyle(e,t=Ke){function n(r){r!==void 0&&parseFloat(r)<1&&Ae("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ae("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ae("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ke){let n=Jh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ae("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=pi(e.r),this.g=pi(e.g),this.b=pi(e.b),this}copyLinearToSRGB(e){return this.r=Ds(e.r),this.g=Ds(e.g),this.b=Ds(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ke){return Be.workingToColorSpace(Zt.copy(this),e),Math.round(Xe(Zt.r*255,0,255))*65536+Math.round(Xe(Zt.g*255,0,255))*256+Math.round(Xe(Zt.b*255,0,255))}getHexString(e=Ke){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Be.workingColorSpace){Be.workingToColorSpace(Zt.copy(this),t);let n=Zt.r,i=Zt.g,r=Zt.b,a=Math.max(n,i,r),o=Math.min(n,i,r),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(i-r)/h+(i<r?6:0);break;case i:c=(r-n)/h+2;break;case r:c=(n-i)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Be.workingColorSpace){return Be.workingToColorSpace(Zt.copy(this),t),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=Ke){Be.workingToColorSpace(Zt.copy(this),e);let t=Zt.r,n=Zt.g,i=Zt.b;return e!==Ke?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Ei),this.setHSL(Ei.h+e,Ei.s+t,Ei.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ei),e.getHSL(xa);let n=xr(Ei.h,xa.h,t),i=xr(Ei.s,xa.s,t),r=xr(Ei.l,xa.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Zt=new de;de.NAMES=Jh;var Sr=class s{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new de(e),this.near=t,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},ss=class extends dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new rn,this.environmentIntensity=1,this.environmentRotation=new rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Nn=new L,ci=new L,Yl=new L,ui=new L,Ms=new L,Ts=new L,zf=new L,Kl=new L,Zl=new L,jl=new L,Jl=new tt,$l=new tt,Ql=new tt,Fn=class s{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Nn.subVectors(e,t),i.cross(Nn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Nn.subVectors(i,t),ci.subVectors(n,t),Yl.subVectors(e,t);let a=Nn.dot(Nn),o=Nn.dot(ci),c=Nn.dot(Yl),l=ci.dot(ci),u=ci.dot(Yl),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;let f=1/h,d=(l*c-o*u)*f,g=(a*u-o*c)*f;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ui)===null?!1:ui.x>=0&&ui.y>=0&&ui.x+ui.y<=1}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,ui)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ui.x),c.addScaledVector(a,ui.y),c.addScaledVector(o,ui.z),c)}static getInterpolatedAttribute(e,t,n,i,r,a){return Jl.setScalar(0),$l.setScalar(0),Ql.setScalar(0),Jl.fromBufferAttribute(e,t),$l.fromBufferAttribute(e,n),Ql.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Jl,r.x),a.addScaledVector($l,r.y),a.addScaledVector(Ql,r.z),a}static isFrontFacing(e,t,n,i){return Nn.subVectors(n,t),ci.subVectors(e,t),Nn.cross(ci).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Nn.subVectors(this.c,this.b),ci.subVectors(this.a,this.b),Nn.cross(ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,a,o;Ms.subVectors(i,n),Ts.subVectors(r,n),Kl.subVectors(e,n);let c=Ms.dot(Kl),l=Ts.dot(Kl);if(c<=0&&l<=0)return t.copy(n);Zl.subVectors(e,i);let u=Ms.dot(Zl),h=Ts.dot(Zl);if(u>=0&&h<=u)return t.copy(i);let f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(Ms,a);jl.subVectors(e,r);let d=Ms.dot(jl),g=Ts.dot(jl);if(g>=0&&d<=g)return t.copy(r);let _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(Ts,o);let m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return zf.subVectors(r,i),o=(h-u)/(h-u+(d-g)),t.copy(i).addScaledVector(zf,o);let p=1/(m+_+f);return a=_*p,o=f*p,t.copy(n).addScaledVector(Ms,a).addScaledVector(Ts,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Wt=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Dn):Dn.fromBufferAttribute(r,a),Dn.applyMatrix4(e.matrixWorld),this.expandByPoint(Dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),_a.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),_a.copy(n.boundingBox)),_a.applyMatrix4(e.matrixWorld),this.union(_a)}let i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Dn),Dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(cr),ya.subVectors(this.max,cr),ws.subVectors(e.a,cr),As.subVectors(e.b,cr),Es.subVectors(e.c,cr),Ci.subVectors(As,ws),Ri.subVectors(Es,As),Ki.subVectors(ws,Es);let t=[0,-Ci.z,Ci.y,0,-Ri.z,Ri.y,0,-Ki.z,Ki.y,Ci.z,0,-Ci.x,Ri.z,0,-Ri.x,Ki.z,0,-Ki.x,-Ci.y,Ci.x,0,-Ri.y,Ri.x,0,-Ki.y,Ki.x,0];return!ec(t,ws,As,Es,ya)||(t=[1,0,0,0,1,0,0,0,1],!ec(t,ws,As,Es,ya))?!1:(va.crossVectors(Ci,Ri),t=[va.x,va.y,va.z],ec(t,ws,As,Es,ya))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},fi=[new L,new L,new L,new L,new L,new L,new L,new L],Dn=new L,_a=new Wt,ws=new L,As=new L,Es=new L,Ci=new L,Ri=new L,Ki=new L,cr=new L,ya=new L,va=new L,Zi=new L;function ec(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Zi.fromArray(s,r);let o=i.x*Math.abs(Zi.x)+i.y*Math.abs(Zi.y)+i.z*Math.abs(Zi.z),c=e.dot(Zi),l=t.dot(Zi),u=n.dot(Zi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var Rt=new L,ba=new Te,Lp=0,gt=class extends kn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Lp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=no,this.updateRanges=[],this.gpuType=Tn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ba.fromBufferAttribute(this,t),ba.applyMatrix3(e),this.setXY(t,ba.x,ba.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Un(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=et(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Un(t,this.array)),t}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Un(t,this.array)),t}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Un(t,this.array)),t}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Un(t,this.array)),t}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array),r=et(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==no&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var Mr=class extends gt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Tr=class extends gt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ve=class extends gt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Np=new Wt,ur=new L,tc=new L,on=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Np.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ur.subVectors(e,this.center);let t=ur.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ur,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(tc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ur.copy(e.center).add(tc)),this.expandByPoint(ur.copy(e.center).sub(tc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Dp=0,En=new Ee,nc=new dt,Cs=new L,xn=new Wt,fr=new Wt,Bt=new L,pt=class s extends kn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dp++}),this.uuid=Bn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(sp(e)?Tr:Mr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return En.makeRotationFromQuaternion(e),this.applyMatrix4(En),this}rotateX(e){return En.makeRotationX(e),this.applyMatrix4(En),this}rotateY(e){return En.makeRotationY(e),this.applyMatrix4(En),this}rotateZ(e){return En.makeRotationZ(e),this.applyMatrix4(En),this}translate(e,t,n){return En.makeTranslation(e,t,n),this.applyMatrix4(En),this}scale(e,t,n){return En.makeScale(e,t,n),this.applyMatrix4(En),this}lookAt(e){return nc.lookAt(e),nc.updateMatrix(),this.applyMatrix4(nc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Cs).negate(),this.translate(Cs.x,Cs.y,Cs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ve(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&Ae("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){De("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];xn.setFromBufferAttribute(r),this.morphTargetsRelative?(Bt.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(Bt),Bt.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(Bt)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&De('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new on);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){De("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){let n=this.boundingSphere.center;if(xn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];fr.setFromBufferAttribute(o),this.morphTargetsRelative?(Bt.addVectors(xn.min,fr.min),xn.expandByPoint(Bt),Bt.addVectors(xn.max,fr.max),xn.expandByPoint(Bt)):(xn.expandByPoint(fr.min),xn.expandByPoint(fr.max))}xn.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)Bt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Bt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Bt.fromBufferAttribute(o,l),c&&(Cs.fromBufferAttribute(e,l),Bt.add(Cs)),i=Math.max(i,n.distanceToSquared(Bt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&De('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){De("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new gt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let x=0;x<n.count;x++)o[x]=new L,c[x]=new L;let l=new L,u=new L,h=new L,f=new Te,d=new Te,g=new Te,_=new L,m=new L;function p(x,S,R){l.fromBufferAttribute(n,x),u.fromBufferAttribute(n,S),h.fromBufferAttribute(n,R),f.fromBufferAttribute(r,x),d.fromBufferAttribute(r,S),g.fromBufferAttribute(r,R),u.sub(l),h.sub(l),d.sub(f),g.sub(f);let C=1/(d.x*g.y-g.x*d.y);isFinite(C)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(C),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(C),o[x].add(_),o[S].add(_),o[R].add(_),c[x].add(m),c[S].add(m),c[R].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let x=0,S=b.length;x<S;++x){let R=b[x],C=R.start,I=R.count;for(let F=C,V=C+I;F<V;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let M=new L,y=new L,T=new L,w=new L;function E(x){T.fromBufferAttribute(i,x),w.copy(T);let S=o[x];M.copy(S),M.sub(T.multiplyScalar(T.dot(S))).normalize(),y.crossVectors(w,S);let C=y.dot(c[x])<0?-1:1;a.setXYZW(x,M.x,M.y,M.z,C)}for(let x=0,S=b.length;x<S;++x){let R=b[x],C=R.start,I=R.count;for(let F=C,V=C+I;F<V;F+=3)E(e.getX(F+0)),E(e.getX(F+1)),E(e.getX(F+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new gt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let i=new L,r=new L,a=new L,o=new L,c=new L,l=new L,u=new L,h=new L;if(e)for(let f=0,d=e.count;f<d;f+=3){let g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)i.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Bt.fromBufferAttribute(e,t),Bt.normalize(),e.setXYZ(t,Bt.x,Bt.y,Bt.z)}toNonIndexed(){function e(o,c){let l=o.array,u=o.itemSize,h=o.normalized,f=new l.constructor(c.length*u),d=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?d=c[_]*o.data.stride+o.offset:d=c[_]*u;for(let p=0;p<u;p++)f[g++]=l[d++]}return new gt(f,u,h)}if(this.index===null)return Ae("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let o in i){let c=i[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){let f=l[u],d=e(f,n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){let d=l[h];u.push(d.toJSON(e.data))}u.length>0&&(i[c]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let u=i[l];this.setAttribute(l,u.clone(t))}let r=e.morphAttributes;for(let l in r){let u=[],h=r[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,u=a.length;l<u;l++){let h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Vs=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=no,this.updateRanges=[],this.version=0,this.uuid=Bn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},nn=new L,Gs=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix4(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyNormalMatrix(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.transformDirection(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Un(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=et(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Un(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Un(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Un(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Un(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array),r=et(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){vr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new gt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){vr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Up=0,jt=class extends kn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Up++}),this.uuid=Bn(),this.name="",this.type="Material",this.blending=es,this.side=_n,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ya,this.blendDst=Ka,this.blendEquation=Li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new de(0,0,0),this.blendAlpha=0,this.depthFunc=ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_c,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$i,this.stencilZFail=$i,this.stencilZPass=$i,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ae(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Ae(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==es&&(n.blending=this.blending),this.side!==_n&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ya&&(n.blendSrc=this.blendSrc),this.blendDst!==Ka&&(n.blendDst=this.blendDst),this.blendEquation!==Li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ts&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_c&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$i&&(n.stencilFail=this.stencilFail),this.stencilZFail!==$i&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==$i&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new de().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Te().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Te().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var hi=new L,ic=new L,Sa=new L,Pi=new L,sc=new L,Ma=new L,rc=new L,Zn=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=hi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hi.copy(this.origin).addScaledVector(this.direction,t),hi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ic.copy(e).add(t).multiplyScalar(.5),Sa.copy(t).sub(e).normalize(),Pi.copy(this.origin).sub(ic);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Sa),o=Pi.dot(this.direction),c=-Pi.dot(Sa),l=Pi.lengthSq(),u=Math.abs(1-a*a),h,f,d,g;if(u>0)if(h=a*c-o,f=a*o-c,g=r*u,h>=0)if(f>=-g)if(f<=g){let _=1/u;h*=_,f*=_,d=h*(h+a*f+2*o)+f*(a*h+f+2*c)+l}else f=r,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;else f=-r,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-a*r+o)),f=h>0?-r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(h=Math.max(0,-(a*r+o)),f=h>0?r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l);else f=a>0?-r:r,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(ic).addScaledVector(Sa,f),d}intersectSphere(e,t){hi.subVectors(e.center,this.origin);let n=hi.dot(this.direction),i=hi.dot(hi)-n*n,r=e.radius*e.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c,l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,i=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,i=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,hi)!==null}intersectTriangle(e,t,n,i,r){sc.subVectors(t,e),Ma.subVectors(n,e),rc.crossVectors(sc,Ma);let a=this.direction.dot(rc),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Pi.subVectors(this.origin,e);let c=o*this.direction.dot(Ma.crossVectors(Pi,Ma));if(c<0)return null;let l=o*this.direction.dot(sc.cross(Pi));if(l<0||c+l>a)return null;let u=-o*Pi.dot(rc);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Jt=class extends jt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new de(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=Yr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Hf=new Ee,ji=new Zn,Ta=new on,Vf=new L,wa=new L,Aa=new L,Ea=new L,ac=new L,Ca=new L,Gf=new L,Ra=new L,st=class extends dt{constructor(e=new pt,t=new Jt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(r&&o){Ca.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=o[c],h=r[c];u!==0&&(ac.fromBufferAttribute(h,e),a?Ca.addScaledVector(ac,u):Ca.addScaledVector(ac.sub(t),u))}t.add(Ca)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ta.copy(n.boundingSphere),Ta.applyMatrix4(r),ji.copy(e.ray).recast(e.near),!(Ta.containsPoint(ji.origin)===!1&&(ji.intersectSphere(Ta,Vf)===null||ji.origin.distanceToSquared(Vf)>(e.far-e.near)**2))&&(Hf.copy(r).invert(),ji.copy(e.ray).applyMatrix4(Hf),!(n.boundingBox!==null&&ji.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ji)))}_computeIntersections(e,t,n){let i,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=a[m.materialIndex],b=Math.max(m.start,d.start),M=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let y=b,T=M;y<T;y+=3){let w=o.getX(y),E=o.getX(y+1),x=o.getX(y+2);i=Pa(this,p,e,n,l,u,h,w,E,x),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let b=o.getX(m),M=o.getX(m+1),y=o.getX(m+2);i=Pa(this,a,e,n,l,u,h,b,M,y),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=a[m.materialIndex],b=Math.max(m.start,d.start),M=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let y=b,T=M;y<T;y+=3){let w=y,E=y+1,x=y+2;i=Pa(this,p,e,n,l,u,h,w,E,x),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let b=m,M=m+1,y=m+2;i=Pa(this,a,e,n,l,u,h,b,M,y),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};function Fp(s,e,t,n,i,r,a,o){let c;if(e.side===qt?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===_n,o),c===null)return null;Ra.copy(o),Ra.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(Ra);return l<t.near||l>t.far?null:{distance:l,point:Ra.clone(),object:s}}function Pa(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,wa),s.getVertexPosition(c,Aa),s.getVertexPosition(l,Ea);let u=Fp(s,e,t,n,wa,Aa,Ea,Gf);if(u){let h=new L;Fn.getBarycoord(Gf,wa,Aa,Ea,h),i&&(u.uv=Fn.getInterpolatedAttribute(i,o,c,l,h,new Te)),r&&(u.uv1=Fn.getInterpolatedAttribute(r,o,c,l,h,new Te)),a&&(u.normal=Fn.getInterpolatedAttribute(a,o,c,l,h,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let f={a:o,b:c,c:l,normal:new L,materialIndex:0};Fn.getNormal(wa,Aa,Ea,f.normal),u.face=f,u.barycoord=h}return u}var hr=new tt,Wf=new tt,Xf=new tt,Op=new tt,qf=new Ee,Ia=new L,oc=new on,Yf=new Ee,lc=new Zn,rs=class extends st{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=pc,this.bindMatrix=new Ee,this.bindMatrixInverse=new Ee,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Wt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ia),this.boundingBox.expandByPoint(Ia)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new on),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ia),this.boundingSphere.expandByPoint(Ia)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),oc.copy(this.boundingSphere),oc.applyMatrix4(i),e.ray.intersectsSphere(oc)!==!1&&(Yf.copy(i).invert(),lc.copy(e.ray).applyMatrix4(Yf),!(this.boundingBox!==null&&lc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,lc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new tt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===pc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Oh?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ae("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Wf.fromBufferAttribute(i.attributes.skinIndex,e),Xf.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(hr.copy(t),t.set(0,0,0,0)):(hr.set(...t,1),t.set(0,0,0)),hr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=Xf.getComponent(r);if(a!==0){let o=Wf.getComponent(r);qf.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Op.copy(hr).applyMatrix4(qf),a)}}return t.isVector4&&(t.w=hr.w),t.applyMatrix4(this.bindMatrixInverse)}},Ni=class extends dt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Di=class extends kt{constructor(e=null,t=1,n=1,i,r,a,o,c,l=wt,u=wt,h,f){super(null,a,o,c,l,u,i,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Kf=new Ee,Bp=new Ee,as=class s{constructor(e=[],t=[]){this.uuid=Bn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ae("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ee)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ee;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:Bp;Kf.multiplyMatrices(o,t[r]),Kf.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Di(t,e,e,wn,Tn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],a=t[r];a===void 0&&(Ae("Skeleton: No bone found with UUID:",r),a=new Ni),this.bones.push(a),this.boneInverses.push(new Ee().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},Ui=class extends gt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Rs=new Ee,Zf=new Ee,La=[],jf=new Wt,kp=new Ee,dr=new st,pr=new on,wr=class extends st{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ui(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,kp)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Wt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Rs),jf.copy(e.boundingBox).applyMatrix4(Rs),this.boundingBox.union(jf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new on),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Rs),pr.copy(e.boundingSphere).applyMatrix4(Rs),this.boundingSphere.union(pr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(dr.geometry=this.geometry,dr.material=this.material,dr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),pr.copy(this.boundingSphere),pr.applyMatrix4(n),e.ray.intersectsSphere(pr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Rs),Zf.multiplyMatrices(n,Rs),dr.matrixWorld=Zf,dr.raycast(e,La);for(let a=0,o=La.length;a<o;a++){let c=La[a];c.instanceId=r,c.object=this,t.push(c)}La.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ui(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Di(new Float32Array(i*this.count),i,this.count,Ro,Tn));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},cc=new L,zp=new L,Hp=new ke,Cn=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=cc.subVectors(n,t).cross(zp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(cc),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Hp.getNormalMatrix(e),i=this.coplanarPoint(cc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ji=new on,Vp=new Te(.5,.5),Na=new L,Ws=class{constructor(e=new Cn,t=new Cn,n=new Cn,i=new Cn,r=new Cn,a=new Cn){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=On,n=!1){let i=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],h=r[5],f=r[6],d=r[7],g=r[8],_=r[9],m=r[10],p=r[11],b=r[12],M=r[13],y=r[14],T=r[15];if(i[0].setComponents(l-a,d-u,p-g,T-b).normalize(),i[1].setComponents(l+a,d+u,p+g,T+b).normalize(),i[2].setComponents(l+o,d+h,p+_,T+M).normalize(),i[3].setComponents(l-o,d-h,p-_,T-M).normalize(),n)i[4].setComponents(c,f,m,y).normalize(),i[5].setComponents(l-c,d-f,p-m,T-y).normalize();else if(i[4].setComponents(l-c,d-f,p-m,T-y).normalize(),t===On)i[5].setComponents(l+c,d+f,p+m,T+y).normalize();else if(t===Fs)i[5].setComponents(c,f,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ji.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ji.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ji)}intersectsSprite(e){Ji.center.set(0,0,0);let t=Vp.distanceTo(e.center);return Ji.radius=.7071067811865476+t,Ji.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ji)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Na.x=i.normal.x>0?e.max.x:e.min.x,Na.y=i.normal.y>0?e.max.y:e.min.y,Na.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Na)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Rn=class extends jt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new de(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ao=new L,oo=new L,Jf=new Ee,mr=new Zn,Da=new on,uc=new L,$f=new L,gi=class extends dt{constructor(e=new pt,t=new Rn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)ao.fromBufferAttribute(t,i-1),oo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=ao.distanceTo(oo);e.setAttribute("lineDistance",new Ve(n,1))}else Ae("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Da.copy(n.boundingSphere),Da.applyMatrix4(i),Da.radius+=r,e.ray.intersectsSphere(Da)===!1)return;Jf.copy(i).invert(),mr.copy(e.ray).applyMatrix4(Jf);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){let d=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=l){let p=u.getX(_),b=u.getX(_+1),M=Ua(this,e,mr,c,p,b,_);M&&t.push(M)}if(this.isLineLoop){let _=u.getX(g-1),m=u.getX(d),p=Ua(this,e,mr,c,_,m,g-1);p&&t.push(p)}}else{let d=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=l){let p=Ua(this,e,mr,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){let _=Ua(this,e,mr,c,g-1,d,g-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ua(s,e,t,n,i,r,a){let o=s.geometry.attributes.position;if(ao.fromBufferAttribute(o,i),oo.fromBufferAttribute(o,r),t.distanceSqToSegment(ao,oo,uc,$f)>n)return;uc.applyMatrix4(s.matrixWorld);let l=e.ray.origin.distanceTo(uc);if(!(l<e.near||l>e.far))return{distance:l,point:$f.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var Qf=new L,eh=new L,jn=class extends gi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Qf.fromBufferAttribute(t,i),eh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Qf.distanceTo(eh);e.setAttribute("lineDistance",new Ve(n,1))}else Ae("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Ar=class extends gi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Xs=class extends jt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new de(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},th=new Ee,yc=new Zn,Fa=new on,Oa=new L,Er=class extends dt{constructor(e=new pt,t=new Xs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fa.copy(n.boundingSphere),Fa.applyMatrix4(i),Fa.radius+=r,e.ray.intersectsSphere(Fa)===!1)return;th.copy(i).invert(),yc.copy(e.ray).applyMatrix4(th);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){let f=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);for(let g=f,_=d;g<_;g++){let m=l.getX(g);Oa.fromBufferAttribute(h,m),nh(Oa,m,c,i,e,t,this)}}else{let f=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);for(let g=f,_=d;g<_;g++)Oa.fromBufferAttribute(h,g),nh(Oa,g,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function nh(s,e,t,n,i,r,a){let o=yc.distanceSqToPoint(s);if(o<t){let c=new L;yc.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Cr=class extends kt{constructor(e=[],t=zi,n,i,r,a,o,c,l,u){super(e,t,n,i,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var xi=class extends kt{constructor(e,t,n=Vn,i,r,a,o=wt,c=wt,l,u=Kn,h=1){if(u!==Kn&&u!==Hi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:h};super(f,i,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ks(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},lo=class extends xi{constructor(e,t=Vn,n=zi,i,r,a=wt,o=wt,c,l=Kn){let u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,n,i,r,a,o,c,l),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Rr=class extends kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Pt=class s extends pt{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],u=[],h=[],f=0,d=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Ve(l,3)),this.setAttribute("normal",new Ve(u,3)),this.setAttribute("uv",new Ve(h,2));function g(_,m,p,b,M,y,T,w,E,x,S){let R=y/E,C=T/x,I=y/2,F=T/2,V=w/2,O=E+1,N=x+1,H=0,q=0,K=new L;for(let ie=0;ie<N;ie++){let ne=ie*C-F;for(let re=0;re<O;re++){let ye=re*R-I;K[_]=ye*b,K[m]=ne*M,K[p]=V,l.push(K.x,K.y,K.z),K[_]=0,K[m]=0,K[p]=w>0?1:-1,u.push(K.x,K.y,K.z),h.push(re/E),h.push(1-ie/x),H+=1}}for(let ie=0;ie<x;ie++)for(let ne=0;ne<E;ne++){let re=f+ne+O*ie,ye=f+ne+O*(ie+1),ve=f+(ne+1)+O*(ie+1),oe=f+(ne+1)+O*ie;c.push(re,ye,oe),c.push(ye,ve,oe),q+=6}o.addGroup(d,q,S),d+=q,f+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},os=class s extends pt{constructor(e=1,t=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));let a=[],o=[],c=[],l=[],u=t/2,h=Math.PI/2*e,f=t,d=2*h+f,g=n*2+r,_=i+1,m=new L,p=new L;for(let b=0;b<=g;b++){let M=0,y=0,T=0,w=0;if(b<=n){let S=b/n,R=S*Math.PI/2;y=-u-e*Math.cos(R),T=e*Math.sin(R),w=-e*Math.cos(R),M=S*h}else if(b<=n+r){let S=(b-n)/r;y=-u+S*t,T=e,w=0,M=h+S*f}else{let S=(b-n-r)/n,R=S*Math.PI/2;y=u+e*Math.sin(R),T=e*Math.cos(R),w=e*Math.sin(R),M=h+f+S*h}let E=Math.max(0,Math.min(1,M/d)),x=0;b===0?x=.5/i:b===g&&(x=-.5/i);for(let S=0;S<=i;S++){let R=S/i,C=R*Math.PI*2,I=Math.sin(C),F=Math.cos(C);p.x=-T*F,p.y=y,p.z=T*I,o.push(p.x,p.y,p.z),m.set(-T*F,w,T*I),m.normalize(),c.push(m.x,m.y,m.z),l.push(R+x,E)}if(b>0){let S=(b-1)*_;for(let R=0;R<i;R++){let C=S+R,I=S+R+1,F=b*_+R,V=b*_+R+1;a.push(C,I,F),a.push(I,V,F)}}}this.setIndex(a),this.setAttribute("position",new Ve(o,3)),this.setAttribute("normal",new Ve(c,3)),this.setAttribute("uv",new Ve(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}};var zt=class s extends pt{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),r=Math.floor(r);let u=[],h=[],f=[],d=[],g=0,_=[],m=n/2,p=0;b(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new Ve(h,3)),this.setAttribute("normal",new Ve(f,3)),this.setAttribute("uv",new Ve(d,2));function b(){let y=new L,T=new L,w=0,E=(t-e)/n;for(let x=0;x<=r;x++){let S=[],R=x/r,C=R*(t-e)+e;for(let I=0;I<=i;I++){let F=I/i,V=F*c+o,O=Math.sin(V),N=Math.cos(V);T.x=C*O,T.y=-R*n+m,T.z=C*N,h.push(T.x,T.y,T.z),y.set(O,E,N).normalize(),f.push(y.x,y.y,y.z),d.push(F,1-R),S.push(g++)}_.push(S)}for(let x=0;x<i;x++)for(let S=0;S<r;S++){let R=_[S][x],C=_[S+1][x],I=_[S+1][x+1],F=_[S][x+1];(e>0||S!==0)&&(u.push(R,C,F),w+=3),(t>0||S!==r-1)&&(u.push(C,I,F),w+=3)}l.addGroup(p,w,0),p+=w}function M(y){let T=g,w=new Te,E=new L,x=0,S=y===!0?e:t,R=y===!0?1:-1;for(let I=1;I<=i;I++)h.push(0,m*R,0),f.push(0,R,0),d.push(.5,.5),g++;let C=g;for(let I=0;I<=i;I++){let V=I/i*c+o,O=Math.cos(V),N=Math.sin(V);E.x=S*N,E.y=m*R,E.z=S*O,h.push(E.x,E.y,E.z),f.push(0,R,0),w.x=O*.5+.5,w.y=N*.5*R+.5,d.push(w.x,w.y),g++}for(let I=0;I<i;I++){let F=T+I,V=C+I;y===!0?u.push(V,V+1,F):u.push(V+1,V,F),x+=3}l.addGroup(p,x,y===!0?1:2),p+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Ba=new L,ka=new L,fc=new L,za=new Fn,Pr=class extends pt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),r=Math.cos(Ns*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],u=["a","b","c"],h=new Array(3),f={},d=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:_,b:m,c:p}=za;if(_.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),p.fromBufferAttribute(o,l[2]),za.getNormal(fc),h[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,h[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,h[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let b=0;b<3;b++){let M=(b+1)%3,y=h[b],T=h[M],w=za[u[b]],E=za[u[M]],x=`${y}_${T}`,S=`${T}_${y}`;S in f&&f[S]?(fc.dot(f[S].normal)<=r&&(d.push(w.x,w.y,w.z),d.push(E.x,E.y,E.z)),f[S]=null):x in f||(f[x]={index0:l[b],index1:l[M],normal:fc.clone()})}}for(let g in f)if(f[g]){let{index0:_,index1:m}=f[g];Ba.fromBufferAttribute(o,_),ka.fromBufferAttribute(o,m),d.push(Ba.x,Ba.y,Ba.z),d.push(ka.x,ka.y,ka.z)}this.setAttribute("position",new Ve(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Gp(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=$h(s,0,i,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=Kp(s,e,r,t)),s.length>80*t){o=s[0],c=s[1];let u=o,h=c;for(let f=t;f<i;f+=t){let d=s[f],g=s[f+1];d<o&&(o=d),g<c&&(c=g),d>u&&(u=d),g>h&&(h=g)}l=Math.max(u-o,h-c),l=l!==0?32767/l:0}return Ir(r,a,t,o,c,l,0),a}function $h(s,e,t,n,i){let r;if(i===rm(s,e,t,n)>0)for(let a=e;a<t;a+=n)r=ih(a/n|0,s[a],s[a+1],r);else for(let a=t-n;a>=e;a-=n)r=ih(a/n|0,s[a],s[a+1],r);return r&&qs(r,r.next)&&(Nr(r),r=r.next),r}function ls(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(qs(t,t.next)||_t(t.prev,t,t.next)===0)){if(Nr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Ir(s,e,t,n,i,r,a){if(!s)return;!a&&r&&Qp(s,n,i,r);let o=s;for(;s.prev!==s.next;){let c=s.prev,l=s.next;if(r?Xp(s,n,i,r):Wp(s)){e.push(c.i,s.i,l.i),Nr(s),s=l.next,o=l.next;continue}if(s=l,s===o){a?a===1?(s=qp(ls(s),e),Ir(s,e,t,n,i,r,2)):a===2&&Yp(s,e,t,n,i,r):Ir(ls(s),e,t,n,i,r,1);break}}}function Wp(s){let e=s.prev,t=s,n=s.next;if(_t(e,t,n)>=0)return!1;let i=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,u=Math.min(i,r,a),h=Math.min(o,c,l),f=Math.max(i,r,a),d=Math.max(o,c,l),g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=f&&g.y>=h&&g.y<=d&&gr(i,o,r,c,a,l,g.x,g.y)&&_t(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Xp(s,e,t,n){let i=s.prev,r=s,a=s.next;if(_t(i,r,a)>=0)return!1;let o=i.x,c=r.x,l=a.x,u=i.y,h=r.y,f=a.y,d=Math.min(o,c,l),g=Math.min(u,h,f),_=Math.max(o,c,l),m=Math.max(u,h,f),p=vc(d,g,e,t,n),b=vc(_,m,e,t,n),M=s.prevZ,y=s.nextZ;for(;M&&M.z>=p&&y&&y.z<=b;){if(M.x>=d&&M.x<=_&&M.y>=g&&M.y<=m&&M!==i&&M!==a&&gr(o,u,c,h,l,f,M.x,M.y)&&_t(M.prev,M,M.next)>=0||(M=M.prevZ,y.x>=d&&y.x<=_&&y.y>=g&&y.y<=m&&y!==i&&y!==a&&gr(o,u,c,h,l,f,y.x,y.y)&&_t(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;M&&M.z>=p;){if(M.x>=d&&M.x<=_&&M.y>=g&&M.y<=m&&M!==i&&M!==a&&gr(o,u,c,h,l,f,M.x,M.y)&&_t(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;y&&y.z<=b;){if(y.x>=d&&y.x<=_&&y.y>=g&&y.y<=m&&y!==i&&y!==a&&gr(o,u,c,h,l,f,y.x,y.y)&&_t(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function qp(s,e){let t=s;do{let n=t.prev,i=t.next.next;!qs(n,i)&&ed(n,t,t.next,i)&&Lr(n,i)&&Lr(i,n)&&(e.push(n.i,t.i,i.i),Nr(t),Nr(t.next),t=s=i),t=t.next}while(t!==s);return ls(t)}function Yp(s,e,t,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&nm(a,o)){let c=td(a,o);a=ls(a,a.next),c=ls(c,c.next),Ir(a,e,t,n,i,r,0),Ir(c,e,t,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function Kp(s,e,t,n){let i=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,c=r<a-1?e[r+1]*n:s.length,l=$h(s,o,c,n,!1);l===l.next&&(l.steiner=!0),i.push(tm(l))}i.sort(Zp);for(let r=0;r<i.length;r++)t=jp(i[r],t);return t}function Zp(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function jp(s,e){let t=Jp(s,e);if(!t)return e;let n=td(t,s);return ls(n,n.next),ls(t,t.next)}function Jp(s,e){let t=e,n=s.x,i=s.y,r=-1/0,a;if(qs(s,t))return t;do{if(qs(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let h=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>r&&(r=h,a=t.x<t.next.x?t:t.next,h===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,c=a.x,l=a.y,u=1/0;t=a;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Qh(i<l?n:r,i,c,l,i<l?r:n,i,t.x,t.y)){let h=Math.abs(i-t.y)/(n-t.x);Lr(t,s)&&(h<u||h===u&&(t.x>a.x||t.x===a.x&&$p(a,t)))&&(a=t,u=h)}t=t.next}while(t!==o);return a}function $p(s,e){return _t(s.prev,s,e.prev)<0&&_t(e.next,s,s.next)<0}function Qp(s,e,t,n){let i=s;do i.z===0&&(i.z=vc(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,em(i)}function em(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,c--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,t*=2}while(e>1);return s}function vc(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function tm(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Qh(s,e,t,n,i,r,a,o){return(i-a)*(e-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(i-a)*(n-o)}function gr(s,e,t,n,i,r,a,o){return!(s===a&&e===o)&&Qh(s,e,t,n,i,r,a,o)}function nm(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!im(s,e)&&(Lr(s,e)&&Lr(e,s)&&sm(s,e)&&(_t(s.prev,s,e.prev)||_t(s,e.prev,e))||qs(s,e)&&_t(s.prev,s,s.next)>0&&_t(e.prev,e,e.next)>0)}function _t(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function qs(s,e){return s.x===e.x&&s.y===e.y}function ed(s,e,t,n){let i=Va(_t(s,e,t)),r=Va(_t(s,e,n)),a=Va(_t(t,n,s)),o=Va(_t(t,n,e));return!!(i!==r&&a!==o||i===0&&Ha(s,t,e)||r===0&&Ha(s,n,e)||a===0&&Ha(t,s,n)||o===0&&Ha(t,e,n))}function Ha(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Va(s){return s>0?1:s<0?-1:0}function im(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&ed(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function Lr(s,e){return _t(s.prev,s,s.next)<0?_t(s,e,s.next)>=0&&_t(s,s.prev,e)>=0:_t(s,e,s.prev)<0||_t(s,s.next,e)<0}function sm(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function td(s,e){let t=bc(s.i,s.x,s.y),n=bc(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function ih(s,e,t,n){let i=bc(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Nr(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function bc(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function rm(s,e,t,n){let i=0;for(let r=e,a=t-n;r<t;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}var Sc=class{static triangulate(e,t,n=2){return Gp(e,t,n)}},Ys=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];sh(e),rh(n,e);let a=e.length;t.forEach(sh);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,rh(n,t[c]);let o=Sc.triangulate(n,i);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function sh(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function rh(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var cs=class s extends pt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,u=c+1,h=e/o,f=t/c,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){let b=p*f-a;for(let M=0;M<l;M++){let y=M*h-r;g.push(y,-b,0),_.push(0,0,1),m.push(M/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<o;b++){let M=b+l*p,y=b+l*(p+1),T=b+1+l*(p+1),w=b+1+l*p;d.push(M,y,w),d.push(y,T,w)}this.setIndex(d),this.setAttribute("position",new Ve(g,3)),this.setAttribute("normal",new Ve(_,3)),this.setAttribute("uv",new Ve(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}};var Jn=class s extends pt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,u=[],h=new L,f=new L,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){let b=[],M=p/n,y=a+M*o,T=e*Math.cos(y),w=Math.sqrt(e*e-T*T),E=0;p===0&&a===0?E=.5/t:p===n&&c===Math.PI&&(E=-.5/t);for(let x=0;x<=t;x++){let S=x/t,R=i+S*r;h.x=-w*Math.cos(R),h.y=T,h.z=w*Math.sin(R),g.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),m.push(S+E,1-M),b.push(l++)}u.push(b)}for(let p=0;p<n;p++)for(let b=0;b<t;b++){let M=u[p][b+1],y=u[p][b],T=u[p+1][b],w=u[p+1][b+1];(p!==0||a>0)&&d.push(M,y,w),(p!==n-1||c<Math.PI)&&d.push(y,T,w)}this.setIndex(d),this.setAttribute("position",new Ve(g,3)),this.setAttribute("normal",new Ve(_,3)),this.setAttribute("uv",new Ve(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Dr=class s extends pt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);let c=[],l=[],u=[],h=[],f=new L,d=new L,g=new L;for(let _=0;_<=n;_++){let m=a+_/n*o;for(let p=0;p<=i;p++){let b=p/i*r;d.x=(e+t*Math.cos(m))*Math.cos(b),d.y=(e+t*Math.cos(m))*Math.sin(b),d.z=t*Math.sin(m),l.push(d.x,d.y,d.z),f.x=e*Math.cos(b),f.y=e*Math.sin(b),g.subVectors(d,f).normalize(),u.push(g.x,g.y,g.z),h.push(p/i),h.push(_/n)}}for(let _=1;_<=n;_++)for(let m=1;m<=i;m++){let p=(i+1)*_+m-1,b=(i+1)*(_-1)+m-1,M=(i+1)*(_-1)+m,y=(i+1)*_+m;c.push(p,b,y),c.push(b,M,y)}this.setIndex(c),this.setAttribute("position",new Ve(l,3)),this.setAttribute("normal",new Ve(u,3)),this.setAttribute("uv",new Ve(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};function ps(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];if(ah(i))i.isRenderTargetTexture?(Ae("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(ah(i[0])){let r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Qt(s){let e={};for(let t=0;t<s.length;t++){let n=ps(s[t]);for(let i in n)e[i]=n[i]}return e}function ah(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function am(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function jc(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Be.workingColorSpace}var nd={clone:ps,merge:Qt},om=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,bn=class extends jt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=om,this.fragmentShader=lm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ps(e.uniforms),this.uniformsGroups=am(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new de().setHex(i.value);break;case"v2":this.uniforms[n].value=new Te().fromArray(i.value);break;case"v3":this.uniforms[n].value=new L().fromArray(i.value);break;case"v4":this.uniforms[n].value=new tt().fromArray(i.value);break;case"m3":this.uniforms[n].value=new ke().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Ee().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},co=class extends bn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},$n=class extends jt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new de(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new de(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tr,this.normalScale=new Te(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ln=class extends $n{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Te(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Xe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new de(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new de(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new de(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Qn=class extends jt{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new de(16777215),this.specular=new de(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new de(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tr,this.normalScale=new Te(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=Yr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Ur=class extends jt{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new de(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new de(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tr,this.normalScale=new Te(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=Yr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},uo=class extends jt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=kh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},fo=class extends jt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ga(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function cm(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function oh(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function um(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}var ei=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ho=class extends ei{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:mc,endingEnd:mc}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case gc:r=e,o=2*t-n;break;case xc:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case gc:a=e,c=2*n-t;break;case xc:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,p=-f*m+2*f*_-f*g,b=(1+f)*m+(-1.5-2*f)*_+(-.5+f)*g+1,M=(-1-d)*m+(1.5+d)*_+.5*g,y=d*m-d*_;for(let T=0;T!==o;++T)r[T]=p*a[u+T]+b*a[l+T]+M*a[c+T]+y*a[h+T];return r}},po=class extends ei{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(i-t),h=1-u;for(let f=0;f!==o;++f)r[f]=a[l+f]*h+a[c+f]*u;return r}},mo=class extends ei{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},go=class extends ei{interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this.inTangents,h=this.outTangents;if(!u||!h){let g=(n-t)/(i-t),_=1-g;for(let m=0;m!==o;++m)r[m]=a[l+m]*_+a[c+m]*g;return r}let f=o*2,d=e-1;for(let g=0;g!==o;++g){let _=a[l+g],m=a[c+g],p=d*f+g*2,b=h[p],M=h[p+1],y=e*f+g*2,T=u[y],w=u[y+1],E=(n-t)/(i-t),x,S,R,C,I;for(let F=0;F<8;F++){x=E*E,S=x*E,R=1-E,C=R*R,I=C*R;let O=I*t+3*C*E*b+3*R*x*T+S*i-n;if(Math.abs(O)<1e-10)break;let N=3*C*(b-t)+6*R*E*(T-b)+3*x*(i-T);if(Math.abs(N)<1e-10)break;E=E-O/N,E=Math.max(0,Math.min(1,E))}r[g]=I*_+3*C*E*M+3*R*x*w+S*m}return r}},cn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ga(t,this.TimeBufferType),this.values=Ga(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ga(e.times,Array),values:Ga(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new mo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new po(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ho(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new go(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case mi:t=this.InterpolantFactoryMethodDiscrete;break;case ns:t=this.InterpolantFactoryMethodLinear;break;case qa:t=this.InterpolantFactoryMethodSmooth;break;case _r:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ae("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return mi;case this.InterpolantFactoryMethodLinear:return ns;case this.InterpolantFactoryMethodSmooth:return qa;case this.InterpolantFactoryMethodBezier:return _r}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(De("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(De("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){De("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){De("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&rp(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){De("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===qa,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(i)c=!0;else{let h=o*n,f=h-n,d=h+n;for(let g=0;g!==n;++g){let _=t[h+g];if(_!==t[f+g]||_!==t[d+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,f=a*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};cn.prototype.ValueTypeName="";cn.prototype.TimeBufferType=Float32Array;cn.prototype.ValueBufferType=Float32Array;cn.prototype.DefaultInterpolation=ns;var _i=class extends cn{constructor(e,t,n){super(e,t,n)}};_i.prototype.ValueTypeName="bool";_i.prototype.ValueBufferType=Array;_i.prototype.DefaultInterpolation=mi;_i.prototype.InterpolantFactoryMethodLinear=void 0;_i.prototype.InterpolantFactoryMethodSmooth=void 0;var Fr=class extends cn{constructor(e,t,n,i){super(e,t,n,i)}};Fr.prototype.ValueTypeName="color";var yi=class extends cn{constructor(e,t,n,i){super(e,t,n,i)}};yi.prototype.ValueTypeName="number";var xo=class extends ei{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let u=l+o;l!==u;l+=4)ut.slerpFlat(r,0,a,l-o,a,l,c);return r}},Sn=class extends cn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new xo(this.times,this.values,this.getValueSize(),e)}};Sn.prototype.ValueTypeName="quaternion";Sn.prototype.InterpolantFactoryMethodSmooth=void 0;var vi=class extends cn{constructor(e,t,n){super(e,t,n)}};vi.prototype.ValueTypeName="string";vi.prototype.ValueBufferType=Array;vi.prototype.DefaultInterpolation=mi;vi.prototype.InterpolantFactoryMethodLinear=void 0;vi.prototype.InterpolantFactoryMethodSmooth=void 0;var Lt=class extends cn{constructor(e,t,n,i){super(e,t,n,i)}};Lt.prototype.ValueTypeName="vector";var Fi=class{constructor(e="",t=-1,n=[],i=Bh){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Bn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(hm(n[a]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(cn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let u=cm(c);c=oh(c,1,u),l=oh(l,1,u),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new yi(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],u=l.name.match(r);if(u&&u.length>1){let h=u[1],f=i[h];f||(i[h]=f=[]),f.push(l)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function fm(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return yi;case"vector":case"vector2":case"vector3":case"vector4":return Lt;case"color":return Fr;case"quaternion":return Sn;case"bool":case"boolean":return _i;case"string":return vi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function hm(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=fm(s.type);if(s.times===void 0){let t=[],n=[];um(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}var Yn={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(lh(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!lh(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function lh(s){try{let e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Ks=class{constructor(e,t,n){let i=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&i.onStart!==void 0&&i.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){let h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){let d=l[h],g=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},fl=new Ks,Xt=class{constructor(e){this.manager=e!==void 0?e:fl,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Xt.DEFAULT_MATERIAL_NAME="__DEFAULT";var di={},Mc=class extends Error{constructor(e,t){super(e),this.response=t}},zn=class extends Xt{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Yn.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(di[e]!==void 0){di[e].push({onLoad:t,onProgress:n,onError:i});return}di[e]=[],di[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ae("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=di[e],h=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,g=d!==0,_=0,m=new ReadableStream({start(p){b();function b(){h.read().then(({done:M,value:y})=>{if(M)p.close();else{_+=y.byteLength;let T=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:d});for(let w=0,E=u.length;w<E;w++){let x=u[w];x.onProgress&&x.onProgress(T)}p.enqueue(y),b()}},M=>{p.error(M)})}}});return new Response(m)}else throw new Mc(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o==="")return l.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(g=>d.decode(g))}}}).then(l=>{Yn.add(`file:${e}`,l);let u=di[e];delete di[e];for(let h=0,f=u.length;h<f;h++){let d=u[h];d.onLoad&&d.onLoad(l)}}).catch(l=>{let u=di[e];if(u===void 0)throw this.manager.itemError(e),l;delete di[e];for(let h=0,f=u.length;h<f;h++){let d=u[h];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Ps=new WeakMap,_o=class extends Xt{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Yn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let h=Ps.get(a);h===void 0&&(h=[],Ps.set(a,h)),h.push({onLoad:t,onError:i})}return a}let o=Os("img");function c(){u(),t&&t(this);let h=Ps.get(this)||[];for(let f=0;f<h.length;f++){let d=h[f];d.onLoad&&d.onLoad(this)}Ps.delete(this),r.manager.itemEnd(e)}function l(h){u(),i&&i(h),Yn.remove(`image:${e}`);let f=Ps.get(this)||[];for(let d=0;d<f.length;d++){let g=f[d];g.onError&&g.onError(h)}Ps.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Yn.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var Or=class extends Xt{constructor(e){super(e)}load(e,t,n,i){let r=this,a=new Di,o=new zn(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(r.withCredentials),o.load(e,function(c){let l;try{l=r.parse(c)}catch(u){i!==void 0?i(u):De(u);return}r._applyTexData(a,l),t&&t(a,l)},n,i),a}createDataTexture(e){let t=new Di;return this._applyTexData(t,this.parse(e)),t}_applyTexData(e,t){t.image!==void 0?e.image=t.image:t.data!==void 0&&(e.image.width=t.width,e.image.height=t.height,e.image.data=t.data),e.wrapS=t.wrapS!==void 0?t.wrapS:Gt,e.wrapT=t.wrapT!==void 0?t.wrapT:Gt,e.magFilter=t.magFilter!==void 0?t.magFilter:mt,e.minFilter=t.minFilter!==void 0?t.minFilter:mt,e.anisotropy=t.anisotropy!==void 0?t.anisotropy:1,t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.mipmaps!==void 0&&(e.mipmaps=t.mipmaps,e.minFilter=fn),t.mipmapCount===1&&(e.minFilter=mt),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),e.needsUpdate=!0}},bi=class extends Xt{constructor(e){super(e)}load(e,t,n,i){let r=new kt,a=new _o(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},Oi=class extends dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new de(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Br=class extends Oi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new de(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},hc=new Ee,ch=new L,uh=new L,kr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Te(512,512),this.mapType=hn,this.map=null,this.mapPass=null,this.matrix=new Ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ws,this._frameExtents=new Te(1,1),this._viewportCount=1,this._viewports=[new tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;ch.setFromMatrixPosition(e.matrixWorld),t.position.copy(ch),uh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(uh),t.updateMatrixWorld(),hc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(hc,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Fs||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(hc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Wa=new L,Xa=new ut,qn=new L,zr=class extends dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ee,this.projectionMatrix=new Ee,this.projectionMatrixInverse=new Ee,this.coordinateSystem=On,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Wa,Xa,qn),qn.x===1&&qn.y===1&&qn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wa,Xa,qn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Wa,Xa,qn),qn.x===1&&qn.y===1&&qn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wa,Xa,qn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ii=new L,fh=new Te,hh=new Te,xt=class extends zr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=is*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ns*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return is*2*Math.atan(Math.tan(Ns*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ii.x,Ii.y).multiplyScalar(-e/Ii.z),Ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ii.x,Ii.y).multiplyScalar(-e/Ii.z)}getViewSize(e,t){return this.getViewBounds(e,fh,hh),t.subVectors(hh,fh)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ns*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Tc=class extends kr{constructor(){super(new xt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=is*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},us=class extends Oi{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Tc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},wc=class extends kr{constructor(){super(new xt(90,1,.5,500)),this.isPointLightShadow=!0}},fs=class extends Oi{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new wc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},ti=class extends zr{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ac=class extends kr{constructor(){super(new ti(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ni=class extends Oi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.shadow=new Ac}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Hr=class extends Oi{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var Mn=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var dc=new WeakMap,Vr=class extends Xt{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ae("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ae("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Yn.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{dc.has(a)===!0?(i&&i(dc.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){Yn.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e)}).catch(function(l){i&&i(l),dc.set(c,l),Yn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Yn.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Is=-90,Ls=1,yo=class extends dt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new xt(Is,Ls,e,t);i.layers=this.layers,this.add(i);let r=new xt(Is,Ls,e,t);r.layers=this.layers,this.add(r);let a=new xt(Is,Ls,e,t);a.layers=this.layers,this.add(a);let o=new xt(Is,Ls,e,t);o.layers=this.layers,this.add(o);let c=new xt(Is,Ls,e,t);c.layers=this.layers,this.add(c);let l=new xt(Is,Ls,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===On)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Fs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},vo=class extends xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Jc="\\[\\]\\.:\\/",dm=new RegExp("["+Jc+"]","g"),$c="[^"+Jc+"]",pm="[^"+Jc.replace("\\.","")+"]",mm=/((?:WC+[\/:])*)/.source.replace("WC",$c),gm=/(WCOD+)?/.source.replace("WCOD",pm),xm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",$c),_m=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",$c),ym=new RegExp("^"+mm+gm+xm+_m+"$"),vm=["material","materials","bones","map"],Ec=class{constructor(e,t,n){let i=n||ct.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ct=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(dm,"")}static parseTrackName(e){let t=ym.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);vm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ae("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){De("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){De("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){De("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){De("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){De("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){De("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){De("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;De("PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){De("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){De("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ct.Composite=Ec;ct.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ct.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ct.prototype.GetterByBindingType=[ct.prototype._getValue_direct,ct.prototype._getValue_array,ct.prototype._getValue_arrayElement,ct.prototype._getValue_toArray];ct.prototype.SetterByBindingTypeAndVersioning=[[ct.prototype._setValue_direct,ct.prototype._setValue_direct_setNeedsUpdate,ct.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_array,ct.prototype._setValue_array_setNeedsUpdate,ct.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_arrayElement,ct.prototype._setValue_arrayElement_setNeedsUpdate,ct.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_fromArray,ct.prototype._setValue_fromArray_setNeedsUpdate,ct.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var By=new Float32Array(1);var dh=new Ee,Gr=class{constructor(e,t,n=0,i=1/0){this.ray=new Zn(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new zs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):De("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return dh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(dh),this}intersectObject(e,t=!0,n=[]){return Cc(e,this,n,t),n.sort(ph),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Cc(e[i],this,n,t);return n.sort(ph),n}};function ph(s,e){return s.distance-e.distance}function Cc(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let a=0,o=r.length;a<o;a++)Cc(r[a],e,t,!0)}}var Zs=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Xe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Xe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var su=class su{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}};su.prototype.isMatrix2=!0;var Rc=su;var Wr=class extends jn{constructor(e=10,t=10,n=4473924,i=8947848){n=new de(n),i=new de(i);let r=t/2,a=e/t,o=e/2,c=[],l=[];for(let f=0,d=0,g=-o;f<=t;f++,g+=a){c.push(-o,0,g,o,0,g),c.push(g,0,-o,g,0,o);let _=f===r?n:i;_.toArray(l,d),d+=3,_.toArray(l,d),d+=3,_.toArray(l,d),d+=3,_.toArray(l,d),d+=3}let u=new pt;u.setAttribute("position",new Ve(c,3)),u.setAttribute("color",new Ve(l,3));let h=new Rn({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var Xr=class extends kn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ae("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Qc(s,e,t,n){let i=bm(n);switch(t){case Xc:return s*e;case Ro:return s*e/i.components*i.byteLength;case Po:return s*e/i.components*i.byteLength;case Vi:return s*e*2/i.components*i.byteLength;case Io:return s*e*2/i.components*i.byteLength;case qc:return s*e*3/i.components*i.byteLength;case wn:return s*e*4/i.components*i.byteLength;case Lo:return s*e*4/i.components*i.byteLength;case jr:case Jr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case $r:case Qr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Do:case Fo:return Math.max(s,16)*Math.max(e,8)/4;case No:case Uo:return Math.max(s,8)*Math.max(e,8)/2;case Oo:case Bo:case zo:case Ho:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ko:case ea:case Vo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Go:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Wo:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Xo:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case qo:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Yo:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Ko:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Zo:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case jo:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Jo:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case $o:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Qo:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case el:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case tl:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case nl:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case il:case sl:case rl:return Math.ceil(s/4)*Math.ceil(e/4)*16;case al:case ol:return Math.ceil(s/4)*Math.ceil(e/4)*8;case ta:case ll:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function bm(s){switch(s){case hn:case Hc:return{byteLength:1,components:1};case $s:case Vc:case si:return{byteLength:2,components:1};case Eo:case Co:return{byteLength:2,components:4};case Vn:case Ao:case Tn:return{byteLength:4,components:1};case Gc:case Wc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?Ae("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function wd(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Mm(s){let e=new WeakMap;function t(o,c){let l=o.array,u=o.usage,h=l.byteLength,f=s.createBuffer();s.bindBuffer(c,f),s.bufferData(c,l,u),o.onUploadCallback();let d;if(l instanceof Float32Array)d=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=s.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=s.SHORT;else if(l instanceof Uint32Array)d=s.UNSIGNED_INT;else if(l instanceof Int32Array)d=s.INT;else if(l instanceof Int8Array)d=s.BYTE;else if(l instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){let u=c.array,h=c.updateRanges;if(s.bindBuffer(l,o),h.length===0)s.bufferSubData(l,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){let g=h[f],_=h[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,h[f]=_)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){let _=h[d];s.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(s.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}var Tm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Am=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Em=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Cm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Rm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Pm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Im=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Lm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Nm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Dm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Um=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Om=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Bm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,km=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,zm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Hm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Vm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Wm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Xm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,qm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Ym=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Km=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Zm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,jm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$m=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Qm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,eg="gl_FragColor = linearToOutputTexel( gl_FragColor );",tg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ng=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,ig=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,sg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,rg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ag=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,og=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,lg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ug=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,hg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,mg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,gg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,xg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_g=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Sg=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Mg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Tg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,wg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ag=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Eg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Cg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ig=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Lg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ng=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Dg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ug=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Fg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Og=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Bg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,kg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Hg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Gg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Wg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Yg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Kg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Jg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$g=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Qg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,ex=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,nx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ix=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ax=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,ox=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,lx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,cx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ux=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,hx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,dx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,px=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,_x=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,yx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,vx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Mx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Tx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ax=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ex=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Px=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ix=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Lx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Nx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Dx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ux=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ox=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,kx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Gx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Xx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,qx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Zx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$x=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Qx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,e0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,t0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,n0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,i0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ge={alphahash_fragment:Tm,alphahash_pars_fragment:wm,alphamap_fragment:Am,alphamap_pars_fragment:Em,alphatest_fragment:Cm,alphatest_pars_fragment:Rm,aomap_fragment:Pm,aomap_pars_fragment:Im,batching_pars_vertex:Lm,batching_vertex:Nm,begin_vertex:Dm,beginnormal_vertex:Um,bsdfs:Fm,iridescence_fragment:Om,bumpmap_pars_fragment:Bm,clipping_planes_fragment:km,clipping_planes_pars_fragment:zm,clipping_planes_pars_vertex:Hm,clipping_planes_vertex:Vm,color_fragment:Gm,color_pars_fragment:Wm,color_pars_vertex:Xm,color_vertex:qm,common:Ym,cube_uv_reflection_fragment:Km,defaultnormal_vertex:Zm,displacementmap_pars_vertex:jm,displacementmap_vertex:Jm,emissivemap_fragment:$m,emissivemap_pars_fragment:Qm,colorspace_fragment:eg,colorspace_pars_fragment:tg,envmap_fragment:ng,envmap_common_pars_fragment:ig,envmap_pars_fragment:sg,envmap_pars_vertex:rg,envmap_physical_pars_fragment:gg,envmap_vertex:ag,fog_vertex:og,fog_pars_vertex:lg,fog_fragment:cg,fog_pars_fragment:ug,gradientmap_pars_fragment:fg,lightmap_pars_fragment:hg,lights_lambert_fragment:dg,lights_lambert_pars_fragment:pg,lights_pars_begin:mg,lights_toon_fragment:xg,lights_toon_pars_fragment:_g,lights_phong_fragment:yg,lights_phong_pars_fragment:vg,lights_physical_fragment:bg,lights_physical_pars_fragment:Sg,lights_fragment_begin:Mg,lights_fragment_maps:Tg,lights_fragment_end:wg,lightprobes_pars_fragment:Ag,logdepthbuf_fragment:Eg,logdepthbuf_pars_fragment:Cg,logdepthbuf_pars_vertex:Rg,logdepthbuf_vertex:Pg,map_fragment:Ig,map_pars_fragment:Lg,map_particle_fragment:Ng,map_particle_pars_fragment:Dg,metalnessmap_fragment:Ug,metalnessmap_pars_fragment:Fg,morphinstance_vertex:Og,morphcolor_vertex:Bg,morphnormal_vertex:kg,morphtarget_pars_vertex:zg,morphtarget_vertex:Hg,normal_fragment_begin:Vg,normal_fragment_maps:Gg,normal_pars_fragment:Wg,normal_pars_vertex:Xg,normal_vertex:qg,normalmap_pars_fragment:Yg,clearcoat_normal_fragment_begin:Kg,clearcoat_normal_fragment_maps:Zg,clearcoat_pars_fragment:jg,iridescence_pars_fragment:Jg,opaque_fragment:$g,packing:Qg,premultiplied_alpha_fragment:ex,project_vertex:tx,dithering_fragment:nx,dithering_pars_fragment:ix,roughnessmap_fragment:sx,roughnessmap_pars_fragment:rx,shadowmap_pars_fragment:ax,shadowmap_pars_vertex:ox,shadowmap_vertex:lx,shadowmask_pars_fragment:cx,skinbase_vertex:ux,skinning_pars_vertex:fx,skinning_vertex:hx,skinnormal_vertex:dx,specularmap_fragment:px,specularmap_pars_fragment:mx,tonemapping_fragment:gx,tonemapping_pars_fragment:xx,transmission_fragment:_x,transmission_pars_fragment:yx,uv_pars_fragment:vx,uv_pars_vertex:bx,uv_vertex:Sx,worldpos_vertex:Mx,background_vert:Tx,background_frag:wx,backgroundCube_vert:Ax,backgroundCube_frag:Ex,cube_vert:Cx,cube_frag:Rx,depth_vert:Px,depth_frag:Ix,distance_vert:Lx,distance_frag:Nx,equirect_vert:Dx,equirect_frag:Ux,linedashed_vert:Fx,linedashed_frag:Ox,meshbasic_vert:Bx,meshbasic_frag:kx,meshlambert_vert:zx,meshlambert_frag:Hx,meshmatcap_vert:Vx,meshmatcap_frag:Gx,meshnormal_vert:Wx,meshnormal_frag:Xx,meshphong_vert:qx,meshphong_frag:Yx,meshphysical_vert:Kx,meshphysical_frag:Zx,meshtoon_vert:jx,meshtoon_frag:Jx,points_vert:$x,points_frag:Qx,shadow_vert:e0,shadow_frag:t0,sprite_vert:n0,sprite_frag:i0},me={common:{diffuse:{value:new de(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new Te(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new de(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new de(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new de(16777215)},opacity:{value:1},center:{value:new Te(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},ai={basic:{uniforms:Qt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Qt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new de(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Qt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new de(0)},specular:{value:new de(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Qt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new de(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Qt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new de(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Qt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Qt([me.points,me.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Qt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Qt([me.common,me.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Qt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Qt([me.sprite,me.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:Qt([me.common,me.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:Qt([me.lights,me.fog,{color:{value:new de(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};ai.physical={uniforms:Qt([ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new Te(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new de(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new Te},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new de(0)},specularColor:{value:new de(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new Te},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};var hl={r:0,b:0,g:0},s0=new Ee,Ad=new ke;Ad.set(-1,0,0,0,1,0,0,0,1);function r0(s,e,t,n,i,r){let a=new de(0),o=i===!0?0:1,c,l,u=null,h=0,f=null;function d(b){let M=b.isScene===!0?b.background:null;if(M&&M.isTexture){let y=b.backgroundBlurriness>0;M=e.get(M,y)}return M}function g(b){let M=!1,y=d(b);y===null?m(a,o):y&&y.isColor&&(m(y,1),M=!0);let T=s.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(b,M){let y=d(M);y&&(y.isCubeTexture||y.mapping===Zr)?(l===void 0&&(l=new st(new Pt(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:ps(ai.backgroundCube.uniforms),vertexShader:ai.backgroundCube.vertexShader,fragmentShader:ai.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(T,w,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(s0.makeRotationFromEuler(M.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Ad),l.material.toneMapped=Be.getTransfer(y.colorSpace)!==$e,(u!==y||h!==y.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,u=y,h=y.version,f=s.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new st(new cs(2,2),new bn({name:"BackgroundMaterial",uniforms:ps(ai.background.uniforms),vertexShader:ai.background.vertexShader,fragmentShader:ai.background.fragmentShader,side:_n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Be.getTransfer(y.colorSpace)!==$e,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||h!==y.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=y,h=y.version,f=s.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function m(b,M){b.getRGB(hl,jc(s)),t.buffers.color.setClear(hl.r,hl.g,hl.b,M,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,M=1){a.set(b),o=M,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,m(a,o)},render:g,addToRenderList:_,dispose:p}}function a0(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null),r=i,a=!1;function o(C,I,F,V,O){let N=!1,H=h(C,V,F,I);r!==H&&(r=H,l(r.object)),N=d(C,V,F,O),N&&g(C,V,F,O),O!==null&&e.update(O,s.ELEMENT_ARRAY_BUFFER),(N||a)&&(a=!1,y(C,I,F,V),O!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function c(){return s.createVertexArray()}function l(C){return s.bindVertexArray(C)}function u(C){return s.deleteVertexArray(C)}function h(C,I,F,V){let O=V.wireframe===!0,N=n[I.id];N===void 0&&(N={},n[I.id]=N);let H=C.isInstancedMesh===!0?C.id:0,q=N[H];q===void 0&&(q={},N[H]=q);let K=q[F.id];K===void 0&&(K={},q[F.id]=K);let ie=K[O];return ie===void 0&&(ie=f(c()),K[O]=ie),ie}function f(C){let I=[],F=[],V=[];for(let O=0;O<t;O++)I[O]=0,F[O]=0,V[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:F,attributeDivisors:V,object:C,attributes:{},index:null}}function d(C,I,F,V){let O=r.attributes,N=I.attributes,H=0,q=F.getAttributes();for(let K in q)if(q[K].location>=0){let ne=O[K],re=N[K];if(re===void 0&&(K==="instanceMatrix"&&C.instanceMatrix&&(re=C.instanceMatrix),K==="instanceColor"&&C.instanceColor&&(re=C.instanceColor)),ne===void 0||ne.attribute!==re||re&&ne.data!==re.data)return!0;H++}return r.attributesNum!==H||r.index!==V}function g(C,I,F,V){let O={},N=I.attributes,H=0,q=F.getAttributes();for(let K in q)if(q[K].location>=0){let ne=N[K];ne===void 0&&(K==="instanceMatrix"&&C.instanceMatrix&&(ne=C.instanceMatrix),K==="instanceColor"&&C.instanceColor&&(ne=C.instanceColor));let re={};re.attribute=ne,ne&&ne.data&&(re.data=ne.data),O[K]=re,H++}r.attributes=O,r.attributesNum=H,r.index=V}function _(){let C=r.newAttributes;for(let I=0,F=C.length;I<F;I++)C[I]=0}function m(C){p(C,0)}function p(C,I){let F=r.newAttributes,V=r.enabledAttributes,O=r.attributeDivisors;F[C]=1,V[C]===0&&(s.enableVertexAttribArray(C),V[C]=1),O[C]!==I&&(s.vertexAttribDivisor(C,I),O[C]=I)}function b(){let C=r.newAttributes,I=r.enabledAttributes;for(let F=0,V=I.length;F<V;F++)I[F]!==C[F]&&(s.disableVertexAttribArray(F),I[F]=0)}function M(C,I,F,V,O,N,H){H===!0?s.vertexAttribIPointer(C,I,F,O,N):s.vertexAttribPointer(C,I,F,V,O,N)}function y(C,I,F,V){_();let O=V.attributes,N=F.getAttributes(),H=I.defaultAttributeValues;for(let q in N){let K=N[q];if(K.location>=0){let ie=O[q];if(ie===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(ie=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(ie=C.instanceColor)),ie!==void 0){let ne=ie.normalized,re=ie.itemSize,ye=e.get(ie);if(ye===void 0)continue;let ve=ye.buffer,oe=ye.type,k=ye.bytesPerElement,J=oe===s.INT||oe===s.UNSIGNED_INT||ie.gpuType===Ao;if(ie.isInterleavedBufferAttribute){let ee=ie.data,Re=ee.stride,Oe=ie.offset;if(ee.isInstancedInterleavedBuffer){for(let Ue=0;Ue<K.locationSize;Ue++)p(K.location+Ue,ee.meshPerAttribute);C.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let Ue=0;Ue<K.locationSize;Ue++)m(K.location+Ue);s.bindBuffer(s.ARRAY_BUFFER,ve);for(let Ue=0;Ue<K.locationSize;Ue++)M(K.location+Ue,re/K.locationSize,oe,ne,Re*k,(Oe+re/K.locationSize*Ue)*k,J)}else{if(ie.isInstancedBufferAttribute){for(let ee=0;ee<K.locationSize;ee++)p(K.location+ee,ie.meshPerAttribute);C.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let ee=0;ee<K.locationSize;ee++)m(K.location+ee);s.bindBuffer(s.ARRAY_BUFFER,ve);for(let ee=0;ee<K.locationSize;ee++)M(K.location+ee,re/K.locationSize,oe,ne,re*k,re/K.locationSize*ee*k,J)}}else if(H!==void 0){let ne=H[q];if(ne!==void 0)switch(ne.length){case 2:s.vertexAttrib2fv(K.location,ne);break;case 3:s.vertexAttrib3fv(K.location,ne);break;case 4:s.vertexAttrib4fv(K.location,ne);break;default:s.vertexAttrib1fv(K.location,ne)}}}}b()}function T(){S();for(let C in n){let I=n[C];for(let F in I){let V=I[F];for(let O in V){let N=V[O];for(let H in N)u(N[H].object),delete N[H];delete V[O]}}delete n[C]}}function w(C){if(n[C.id]===void 0)return;let I=n[C.id];for(let F in I){let V=I[F];for(let O in V){let N=V[O];for(let H in N)u(N[H].object),delete N[H];delete V[O]}}delete n[C.id]}function E(C){for(let I in n){let F=n[I];for(let V in F){let O=F[V];if(O[C.id]===void 0)continue;let N=O[C.id];for(let H in N)u(N[H].object),delete N[H];delete O[C.id]}}}function x(C){for(let I in n){let F=n[I],V=C.isInstancedMesh===!0?C.id:0,O=F[V];if(O!==void 0){for(let N in O){let H=O[N];for(let q in H)u(H[q].object),delete H[q];delete O[N]}delete F[V],Object.keys(F).length===0&&delete n[I]}}}function S(){R(),a=!0,r!==i&&(r=i,l(r.object))}function R(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:S,resetDefaultState:R,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfObject:x,releaseStatesOfProgram:E,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function o0(s,e,t){let n;function i(c){n=c}function r(c,l){s.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,u){u!==0&&(s.drawArraysInstanced(n,c,l,u),t.update(l,n,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let f=0;for(let d=0;d<u;d++)f+=l[d];t.update(f,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function l0(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let E=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(E){return!(E!==wn&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){let x=E===si&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==hn&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Tn&&!x)}function c(E){if(E==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(Ae("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let h=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&Ae("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),b=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),T=s.getParameter(s.MAX_SAMPLES),w=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:M,maxFragmentUniforms:y,maxSamples:T,samples:w}}function c0(s){let e=this,t=null,n=0,i=!1,r=!1,a=new Cn,o=new ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){let d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){let g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=s.get(h);if(!i||g===null||g.length===0||r&&!m)r?u(null):l();else{let b=r?0:n,M=b*4,y=p.clippingState||null;c.value=y,y=u(g,f,M,d);for(let T=0;T!==M;++T)y[T]=t[T];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,g){let _=h!==null?h.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let p=d+_*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,y=d;M!==_;++M,y+=4)a.copy(h[M]).applyMatrix4(b,o),a.normal.toArray(m,y),m[y+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}var Gi=4,id=[.125,.215,.35,.446,.526,.582],ms=20,u0=256,ia=new ti,sd=new de,ru=null,au=0,ou=0,lu=!1,f0=new L,pl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){let{size:a=256,position:o=f0}=r;ru=this._renderer.getRenderTarget(),au=this._renderer.getActiveCubeFace(),ou=this._renderer.getActiveMipmapLevel(),lu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=od(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ad(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ru,au,ou),this._renderer.xr.enabled=lu,e.scissorTest=!1,nr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===zi||e.mapping===hs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ru=this._renderer.getRenderTarget(),au=this._renderer.getActiveCubeFace(),ou=this._renderer.getActiveMipmapLevel(),lu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:mt,minFilter:mt,generateMipmaps:!1,type:si,format:wn,colorSpace:sn,depthBuffer:!1},i=rd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=rd(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=h0(r)),this._blurMaterial=p0(r,e,t),this._ggxMaterial=d0(r,e,t)}return i}_compileMaterial(e){let t=new st(new pt,e);this._renderer.compile(t,ia)}_sceneToCubeUV(e,t,n,i,r){let c=new xt(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(sd),h.toneMapping=Hn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(i),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new st(new Pt,new Jt({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,m=_.material,p=!1,b=e.background;b?b.isColor&&(m.color.copy(b),e.background=null,p=!0):(m.color.copy(sd),p=!0);for(let M=0;M<6;M++){let y=M%3;y===0?(c.up.set(0,l[M],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[M],r.y,r.z)):y===1?(c.up.set(0,0,l[M]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[M],r.z)):(c.up.set(0,l[M],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[M]));let T=this._cubeSize;nr(i,y*T,M>2?T:0,T,T),h.setRenderTarget(i),p&&h.render(_,c),h.render(e,c)}h.toneMapping=d,h.autoClear=f,e.background=b}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===zi||e.mapping===hs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=od()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ad());let r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;nr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,ia)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(l*l-u*u),f=0+l*1.25,d=h*f,{_lodMax:g}=this,_=this._sizeLods[n],m=3*_*(n>g-Gi?n-g+Gi:0),p=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=d,c.mipInt.value=g-t,nr(r,m,p,3*_,2*_),i.setRenderTarget(r),i.render(o,ia),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-n,nr(e,m,p,3*_,2*_),i.setRenderTarget(e),i.render(o,ia)}_blur(e,t,n,i,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&De("blur direction must be either latitudinal or longitudinal!");let u=3,h=this._lodMeshes[i];h.material=l;let f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*ms-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):ms;m>ms&&Ae(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ms}`);let p=[],b=0;for(let E=0;E<ms;++E){let x=E/_,S=Math.exp(-x*x/2);p.push(S),E===0?b+=S:E<m&&(b+=2*S)}for(let E=0;E<p.length;E++)p[E]=p[E]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-n;let y=this._sizeLods[i],T=3*y*(i>M-Gi?i-M+Gi:0),w=4*(this._cubeSize-y);nr(t,T,w,3*y,2*y),c.setRenderTarget(t),c.render(h,ia)}};function h0(s){let e=[],t=[],n=[],i=s,r=s-Gi+1+id.length;for(let a=0;a<r;a++){let o=Math.pow(2,i);e.push(o);let c=1/o;a>s-Gi?c=id[a-s+Gi-1]:a===0&&(c=0),t.push(c);let l=1/(o-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*d),M=new Float32Array(m*g*d),y=new Float32Array(p*g*d);for(let w=0;w<d;w++){let E=w%3*2/3-1,x=w>2?0:-1,S=[E,x,0,E+2/3,x,0,E+2/3,x+1,0,E,x,0,E+2/3,x+1,0,E,x+1,0];b.set(S,_*g*w),M.set(f,m*g*w);let R=[w,w,w,w,w,w];y.set(R,p*g*w)}let T=new pt;T.setAttribute("position",new gt(b,_)),T.setAttribute("uv",new gt(M,m)),T.setAttribute("faceIndex",new gt(y,p)),n.push(new st(T,null)),i>Gi&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function rd(s,e,t){let n=new vn(s,e,t);return n.texture.mapping=Zr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function nr(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function d0(s,e,t){return new bn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:u0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:xl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function p0(s,e,t){let n=new Float32Array(ms),i=new L(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:ms,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function ad(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function od(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function xl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var ml=class extends vn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Cr(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Pt(5,5,5),r=new bn({name:"CubemapFromEquirect",uniforms:ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qt,blending:ii});r.uniforms.tEquirect.value=t;let a=new st(i,r),o=t.minFilter;return t.minFilter===fn&&(t.minFilter=mt),new yo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}};function m0(s){let e=new WeakMap,t=new WeakMap,n=null;function i(f,d=!1){return f==null?null:d?a(f):r(f)}function r(f){if(f&&f.isTexture){let d=f.mapping;if(d===Mo||d===To)if(e.has(f)){let g=e.get(f).texture;return o(g,f.mapping)}else{let g=f.image;if(g&&g.height>0){let _=new ml(g.height);return _.fromEquirectangularTexture(s,f),e.set(f,_),f.addEventListener("dispose",l),o(_.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){let d=f.mapping,g=d===Mo||d===To,_=d===zi||d===hs;if(g||_){let m=t.get(f),p=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return n===null&&(n=new pl(s)),m=g?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{let b=f.image;return g&&b&&b.height>0||_&&b&&c(b)?(n===null&&(n=new pl(s)),m=g?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",u),m.texture):null}}}return f}function o(f,d){return d===Mo?f.mapping=zi:d===To&&(f.mapping=hs),f}function c(f){let d=0,g=6;for(let _=0;_<g;_++)f[_]!==void 0&&d++;return d===g}function l(f){let d=f.target;d.removeEventListener("dispose",l);let g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function u(f){let d=f.target;d.removeEventListener("dispose",u);let g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function h(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:h}}function g0(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Qi("WebGLRenderer: "+n+" extension not supported."),i}}}function x0(s,e,t,n){let i={},r=new WeakMap;function a(h){let f=h.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete i[f.id];let d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,t.memory.geometries++),f}function c(h){let f=h.attributes;for(let d in f)e.update(f[d],s.ARRAY_BUFFER)}function l(h){let f=[],d=h.index,g=h.attributes.position,_=0;if(g===void 0)return;if(d!==null){let b=d.array;_=d.version;for(let M=0,y=b.length;M<y;M+=3){let T=b[M+0],w=b[M+1],E=b[M+2];f.push(T,w,w,E,E,T)}}else{let b=g.array;_=g.version;for(let M=0,y=b.length/3-1;M<y;M+=3){let T=M+0,w=M+1,E=M+2;f.push(T,w,w,E,E,T)}}let m=new(g.count>=65535?Tr:Mr)(f,1);m.version=_;let p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){let f=r.get(h);if(f){let d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function _0(s,e,t){let n;function i(h){n=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function c(h,f){s.drawElements(n,f,r,h*a),t.update(f,n,1)}function l(h,f,d){d!==0&&(s.drawElementsInstanced(n,f,r,h*a,d),t.update(f,n,d))}function u(h,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,h,0,d);let _=0;for(let m=0;m<d;m++)_+=f[m];t.update(_,n,1)}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function y0(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:De("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function v0(s,e,t){let n=new WeakMap,i=new tt;function r(a,o,c){let l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0,f=n.get(o);if(f===void 0||f.count!==h){let S=function(){E.dispose(),n.delete(o),o.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();let d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],b=o.morphAttributes.color||[],M=0;d===!0&&(M=1),g===!0&&(M=2),_===!0&&(M=3);let y=o.attributes.position.count*M,T=1;y>e.maxTextureSize&&(T=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let w=new Float32Array(y*T*4*h),E=new br(w,y,T,h);E.type=Tn,E.needsUpdate=!0;let x=M*4;for(let R=0;R<h;R++){let C=m[R],I=p[R],F=b[R],V=y*T*4*R;for(let O=0;O<C.count;O++){let N=O*x;d===!0&&(i.fromBufferAttribute(C,O),w[V+N+0]=i.x,w[V+N+1]=i.y,w[V+N+2]=i.z,w[V+N+3]=0),g===!0&&(i.fromBufferAttribute(I,O),w[V+N+4]=i.x,w[V+N+5]=i.y,w[V+N+6]=i.z,w[V+N+7]=0),_===!0&&(i.fromBufferAttribute(F,O),w[V+N+8]=i.x,w[V+N+9]=i.y,w[V+N+10]=i.z,w[V+N+11]=F.itemSize===4?i.w:1)}}f={count:h,texture:E,size:new Te(y,T)},n.set(o,f),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];let g=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(s,"morphTargetBaseInfluence",g),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function b0(s,e,t,n,i){let r=new WeakMap;function a(l){let u=i.render.frame,h=l.geometry,f=e.get(l,h);if(r.get(f)!==u&&(e.update(f),r.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return f}function o(){r=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var S0={[Dc]:"LINEAR_TONE_MAPPING",[Uc]:"REINHARD_TONE_MAPPING",[Fc]:"CINEON_TONE_MAPPING",[Kr]:"ACES_FILMIC_TONE_MAPPING",[Bc]:"AGX_TONE_MAPPING",[kc]:"NEUTRAL_TONE_MAPPING",[Oc]:"CUSTOM_TONE_MAPPING"};function M0(s,e,t,n,i,r){let a=new vn(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,depthTexture:i?new xi(e,t):void 0}),o=new vn(e,t,{type:si,depthBuffer:!1,stencilBuffer:!1}),c=new pt;c.setAttribute("position",new Ve([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ve([0,2,0,0,2,0],2));let l=new co({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new st(c,l),h=new ti(-1,1,1,-1,0,1),f=null,d=null,g=!1,_,m=null,p=[],b=!1;this.setSize=function(M,y){a.setSize(M,y),o.setSize(M,y);for(let T=0;T<p.length;T++){let w=p[T];w.setSize&&w.setSize(M,y)}},this.setEffects=function(M){p=M,b=p.length>0&&p[0].isRenderPass===!0;let y=a.width,T=a.height;for(let w=0;w<p.length;w++){let E=p[w];E.setSize&&E.setSize(y,T)}},this.begin=function(M,y){if(g||M.toneMapping===Hn&&p.length===0)return!1;if(m=y,y!==null){let T=y.width,w=y.height;(a.width!==T||a.height!==w)&&this.setSize(T,w)}return b===!1&&M.setRenderTarget(a),_=M.toneMapping,M.toneMapping=Hn,!0},this.hasRenderPass=function(){return b},this.end=function(M,y){M.toneMapping=_,g=!0;let T=a,w=o;for(let E=0;E<p.length;E++){let x=p[E];if(x.enabled!==!1&&(x.render(M,w,T,y),x.needsSwap!==!1)){let S=T;T=w,w=S}}if(f!==M.outputColorSpace||d!==M.toneMapping){f=M.outputColorSpace,d=M.toneMapping,l.defines={},Be.getTransfer(f)===$e&&(l.defines.SRGB_TRANSFER="");let E=S0[d];E&&(l.defines[E]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=T.texture,M.setRenderTarget(m),M.render(u,h),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}var Ed=new kt,fu=new xi(1,1),Cd=new br,Rd=new ro,Pd=new Cr,ld=[],cd=[],ud=new Float32Array(16),fd=new Float32Array(9),hd=new Float32Array(4);function sr(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=ld[i];if(r===void 0&&(r=new Float32Array(i),ld[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Nt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Dt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function _l(s,e){let t=cd[e];t===void 0&&(t=new Int32Array(e),cd[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function T0(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function w0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;s.uniform2fv(this.addr,e),Dt(t,e)}}function A0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;s.uniform3fv(this.addr,e),Dt(t,e)}}function E0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;s.uniform4fv(this.addr,e),Dt(t,e)}}function C0(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Dt(t,e)}else{if(Nt(t,n))return;hd.set(n),s.uniformMatrix2fv(this.addr,!1,hd),Dt(t,n)}}function R0(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Dt(t,e)}else{if(Nt(t,n))return;fd.set(n),s.uniformMatrix3fv(this.addr,!1,fd),Dt(t,n)}}function P0(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Dt(t,e)}else{if(Nt(t,n))return;ud.set(n),s.uniformMatrix4fv(this.addr,!1,ud),Dt(t,n)}}function I0(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function L0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;s.uniform2iv(this.addr,e),Dt(t,e)}}function N0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;s.uniform3iv(this.addr,e),Dt(t,e)}}function D0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;s.uniform4iv(this.addr,e),Dt(t,e)}}function U0(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function F0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;s.uniform2uiv(this.addr,e),Dt(t,e)}}function O0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;s.uniform3uiv(this.addr,e),Dt(t,e)}}function B0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;s.uniform4uiv(this.addr,e),Dt(t,e)}}function k0(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(fu.compareFunction=t.isReversedDepthBuffer()?ul:cl,r=fu):r=Ed,t.setTexture2D(e||r,i)}function z0(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Rd,i)}function H0(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Pd,i)}function V0(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Cd,i)}function G0(s){switch(s){case 5126:return T0;case 35664:return w0;case 35665:return A0;case 35666:return E0;case 35674:return C0;case 35675:return R0;case 35676:return P0;case 5124:case 35670:return I0;case 35667:case 35671:return L0;case 35668:case 35672:return N0;case 35669:case 35673:return D0;case 5125:return U0;case 36294:return F0;case 36295:return O0;case 36296:return B0;case 35678:case 36198:case 36298:case 36306:case 35682:return k0;case 35679:case 36299:case 36307:return z0;case 35680:case 36300:case 36308:case 36293:return H0;case 36289:case 36303:case 36311:case 36292:return V0}}function W0(s,e){s.uniform1fv(this.addr,e)}function X0(s,e){let t=sr(e,this.size,2);s.uniform2fv(this.addr,t)}function q0(s,e){let t=sr(e,this.size,3);s.uniform3fv(this.addr,t)}function Y0(s,e){let t=sr(e,this.size,4);s.uniform4fv(this.addr,t)}function K0(s,e){let t=sr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Z0(s,e){let t=sr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function j0(s,e){let t=sr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function J0(s,e){s.uniform1iv(this.addr,e)}function $0(s,e){s.uniform2iv(this.addr,e)}function Q0(s,e){s.uniform3iv(this.addr,e)}function e_(s,e){s.uniform4iv(this.addr,e)}function t_(s,e){s.uniform1uiv(this.addr,e)}function n_(s,e){s.uniform2uiv(this.addr,e)}function i_(s,e){s.uniform3uiv(this.addr,e)}function s_(s,e){s.uniform4uiv(this.addr,e)}function r_(s,e,t){let n=this.cache,i=e.length,r=_l(t,i);Nt(n,r)||(s.uniform1iv(this.addr,r),Dt(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=fu:a=Ed;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,r[o])}function a_(s,e,t){let n=this.cache,i=e.length,r=_l(t,i);Nt(n,r)||(s.uniform1iv(this.addr,r),Dt(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Rd,r[a])}function o_(s,e,t){let n=this.cache,i=e.length,r=_l(t,i);Nt(n,r)||(s.uniform1iv(this.addr,r),Dt(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Pd,r[a])}function l_(s,e,t){let n=this.cache,i=e.length,r=_l(t,i);Nt(n,r)||(s.uniform1iv(this.addr,r),Dt(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Cd,r[a])}function c_(s){switch(s){case 5126:return W0;case 35664:return X0;case 35665:return q0;case 35666:return Y0;case 35674:return K0;case 35675:return Z0;case 35676:return j0;case 5124:case 35670:return J0;case 35667:case 35671:return $0;case 35668:case 35672:return Q0;case 35669:case 35673:return e_;case 5125:return t_;case 36294:return n_;case 36295:return i_;case 36296:return s_;case 35678:case 36198:case 36298:case 36306:case 35682:return r_;case 35679:case 36299:case 36307:return a_;case 35680:case 36300:case 36308:case 36293:return o_;case 36289:case 36303:case 36311:case 36292:return l_}}var hu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=G0(t.type)}},du=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=c_(t.type)}},pu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(e,t[o.id],n)}}},cu=/(\w+)(\])?(\[|\.)?/g;function dd(s,e){s.seq.push(e),s.map[e.id]=e}function u_(s,e,t){let n=s.name,i=n.length;for(cu.lastIndex=0;;){let r=cu.exec(n),a=cu.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){dd(t,l===void 0?new hu(o,s,e):new du(o,s,e));break}else{let h=t.map[o];h===void 0&&(h=new pu(o),dd(t,h)),t=h}}}var ir=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);u_(o,c,this)}let i=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function pd(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var f_=37297,h_=0;function d_(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var md=new ke;function p_(s){Be._getMatrix(md,Be.workingColorSpace,s);let e=`mat3( ${md.elements.map(t=>t.toFixed(4))} )`;switch(Be.getTransfer(s)){case yr:return[e,"LinearTransferOETF"];case $e:return[e,"sRGBTransferOETF"];default:return Ae("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function gd(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+d_(s.getShaderSource(e),o)}else return r}function m_(s,e){let t=p_(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var g_={[Dc]:"Linear",[Uc]:"Reinhard",[Fc]:"Cineon",[Kr]:"ACESFilmic",[Bc]:"AgX",[kc]:"Neutral",[Oc]:"Custom"};function x_(s,e){let t=g_[e];return t===void 0?(Ae("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var dl=new L;function __(){Be.getLuminanceCoefficients(dl);let s=dl.x.toFixed(4),e=dl.y.toFixed(4),t=dl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function y_(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ra).join(`
`)}function v_(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function b_(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function ra(s){return s!==""}function xd(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function _d(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var S_=/^[ \t]*#include +<([\w\d./]+)>/gm;function mu(s){return s.replace(S_,T_)}var M_=new Map;function T_(s,e){let t=Ge[e];if(t===void 0){let n=M_.get(e);if(n!==void 0)t=Ge[n],Ae('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return mu(t)}var w_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yd(s){return s.replace(w_,A_)}function A_(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function vd(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var E_={[qr]:"SHADOWMAP_TYPE_PCF",[js]:"SHADOWMAP_TYPE_VSM"};function C_(s){return E_[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var R_={[zi]:"ENVMAP_TYPE_CUBE",[hs]:"ENVMAP_TYPE_CUBE",[Zr]:"ENVMAP_TYPE_CUBE_UV"};function P_(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":R_[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var I_={[hs]:"ENVMAP_MODE_REFRACTION"};function L_(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":I_[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var N_={[Yr]:"ENVMAP_BLENDING_MULTIPLY",[Uh]:"ENVMAP_BLENDING_MIX",[Fh]:"ENVMAP_BLENDING_ADD"};function D_(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":N_[s.combine]||"ENVMAP_BLENDING_NONE"}function U_(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function F_(s,e,t,n){let i=s.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=C_(t),l=P_(t),u=L_(t),h=D_(t),f=U_(t),d=y_(t),g=v_(r),_=i.createProgram(),m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ra).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ra).join(`
`),p.length>0&&(p+=`
`)):(m=[vd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ra).join(`
`),p=[vd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Hn?"#define TONE_MAPPING":"",t.toneMapping!==Hn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==Hn?x_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,m_("linearToOutputTexel",t.outputColorSpace),__(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ra).join(`
`)),a=mu(a),a=xd(a,t),a=_d(a,t),o=mu(o),o=xd(o,t),o=_d(o,t),a=yd(a),o=yd(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Kc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Kc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let M=b+m+a,y=b+p+o,T=pd(i,i.VERTEX_SHADER,M),w=pd(i,i.FRAGMENT_SHADER,y);i.attachShader(_,T),i.attachShader(_,w),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function E(C){if(s.debug.checkShaderErrors){let I=i.getProgramInfoLog(_)||"",F=i.getShaderInfoLog(T)||"",V=i.getShaderInfoLog(w)||"",O=I.trim(),N=F.trim(),H=V.trim(),q=!0,K=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(q=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,T,w);else{let ie=gd(i,T,"vertex"),ne=gd(i,w,"fragment");De("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+O+`
`+ie+`
`+ne)}else O!==""?Ae("WebGLProgram: Program Info Log:",O):(N===""||H==="")&&(K=!1);K&&(C.diagnostics={runnable:q,programLog:O,vertexShader:{log:N,prefix:m},fragmentShader:{log:H,prefix:p}})}i.deleteShader(T),i.deleteShader(w),x=new ir(i,_),S=b_(i,_)}let x;this.getUniforms=function(){return x===void 0&&E(this),x};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=i.getProgramParameter(_,f_)),R},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=h_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=w,this}var O_=0,gu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new xu(e),t.set(e,n)),n}},xu=class{constructor(e){this.id=O_++,this.code=e,this.usedTimes=0}};function B_(s){return s===Vi||s===ea||s===ta}function k_(s,e,t,n,i,r){let a=new zs,o=new gu,c=new Set,l=[],u=new Map,h=n.logarithmicDepthBuffer,f=n.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return c.add(x),x===0?"uv":`uv${x}`}function _(x,S,R,C,I,F){let V=C.fog,O=I.geometry,N=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?C.environment:null,H=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,q=e.get(x.envMap||N,H),K=q&&q.mapping===Zr?q.image.height:null,ie=d[x.type];x.precision!==null&&(f=n.getMaxPrecision(x.precision),f!==x.precision&&Ae("WebGLProgram.getParameters:",x.precision,"not supported, using",f,"instead."));let ne=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,re=ne!==void 0?ne.length:0,ye=0;O.morphAttributes.position!==void 0&&(ye=1),O.morphAttributes.normal!==void 0&&(ye=2),O.morphAttributes.color!==void 0&&(ye=3);let ve,oe,k,J;if(ie){let Me=ai[ie];ve=Me.vertexShader,oe=Me.fragmentShader}else{ve=x.vertexShader,oe=x.fragmentShader;let Me=o.getVertexShaderStage(x),vt=o.getFragmentShaderStage(x);o.update(x,Me,vt),k=Me.id,J=vt.id}let ee=s.getRenderTarget(),Re=s.state.buffers.depth.getReversed(),Oe=I.isInstancedMesh===!0,Ue=I.isBatchedMesh===!0,St=!!x.map,Ye=!!x.matcap,at=!!q,Je=!!x.aoMap,Ze=!!x.lightMap,Et=!!x.bumpMap&&x.wireframe===!1,It=!!x.normalMap,Ot=!!x.displacementMap,Vt=!!x.emissiveMap,yt=!!x.metalnessMap,Ct=!!x.roughnessMap,U=x.anisotropy>0,an=x.clearcoat>0,Qe=x.dispersion>0,P=x.iridescence>0,v=x.sheen>0,z=x.transmission>0,X=U&&!!x.anisotropyMap,Z=an&&!!x.clearcoatMap,ae=an&&!!x.clearcoatNormalMap,ce=an&&!!x.clearcoatRoughnessMap,j=P&&!!x.iridescenceMap,Q=P&&!!x.iridescenceThicknessMap,ue=v&&!!x.sheenColorMap,Pe=v&&!!x.sheenRoughnessMap,pe=!!x.specularMap,fe=!!x.specularColorMap,Ne=!!x.specularIntensityMap,Fe=z&&!!x.transmissionMap,ze=z&&!!x.thicknessMap,D=!!x.gradientMap,le=!!x.alphaMap,$=x.alphaTest>0,he=!!x.alphaHash,_e=!!x.extensions,te=Hn;x.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(te=s.toneMapping);let Ce={shaderID:ie,shaderType:x.type,shaderName:x.name,vertexShader:ve,fragmentShader:oe,defines:x.defines,customVertexShaderID:k,customFragmentShaderID:J,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:f,batching:Ue,batchingColor:Ue&&I._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&I.instanceColor!==null,instancingMorph:Oe&&I.morphTexture!==null,outputColorSpace:ee===null?s.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Be.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:St,matcap:Ye,envMap:at,envMapMode:at&&q.mapping,envMapCubeUVHeight:K,aoMap:Je,lightMap:Ze,bumpMap:Et,normalMap:It,displacementMap:Ot,emissiveMap:Vt,normalMapObjectSpace:It&&x.normalMapType===zh,normalMapTangentSpace:It&&x.normalMapType===tr,packedNormalMap:It&&x.normalMapType===tr&&B_(x.normalMap.format),metalnessMap:yt,roughnessMap:Ct,anisotropy:U,anisotropyMap:X,clearcoat:an,clearcoatMap:Z,clearcoatNormalMap:ae,clearcoatRoughnessMap:ce,dispersion:Qe,iridescence:P,iridescenceMap:j,iridescenceThicknessMap:Q,sheen:v,sheenColorMap:ue,sheenRoughnessMap:Pe,specularMap:pe,specularColorMap:fe,specularIntensityMap:Ne,transmission:z,transmissionMap:Fe,thicknessMap:ze,gradientMap:D,opaque:x.transparent===!1&&x.blending===es&&x.alphaToCoverage===!1,alphaMap:le,alphaTest:$,alphaHash:he,combine:x.combine,mapUv:St&&g(x.map.channel),aoMapUv:Je&&g(x.aoMap.channel),lightMapUv:Ze&&g(x.lightMap.channel),bumpMapUv:Et&&g(x.bumpMap.channel),normalMapUv:It&&g(x.normalMap.channel),displacementMapUv:Ot&&g(x.displacementMap.channel),emissiveMapUv:Vt&&g(x.emissiveMap.channel),metalnessMapUv:yt&&g(x.metalnessMap.channel),roughnessMapUv:Ct&&g(x.roughnessMap.channel),anisotropyMapUv:X&&g(x.anisotropyMap.channel),clearcoatMapUv:Z&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:ae&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&g(x.sheenRoughnessMap.channel),specularMapUv:pe&&g(x.specularMap.channel),specularColorMapUv:fe&&g(x.specularColorMap.channel),specularIntensityMapUv:Ne&&g(x.specularIntensityMap.channel),transmissionMapUv:Fe&&g(x.transmissionMap.channel),thicknessMapUv:ze&&g(x.thicknessMap.channel),alphaMapUv:le&&g(x.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(It||U),vertexNormals:!!O.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!O.attributes.uv&&(St||le),fog:!!V,useFog:x.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||O.attributes.normal===void 0&&It===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Re,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:ye,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:te,decodeVideoTexture:St&&x.map.isVideoTexture===!0&&Be.getTransfer(x.map.colorSpace)===$e,decodeVideoTextureEmissive:Vt&&x.emissiveMap.isVideoTexture===!0&&Be.getTransfer(x.emissiveMap.colorSpace)===$e,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===un,flipSided:x.side===qt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:_e&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&x.extensions.multiDraw===!0||Ue)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ce.vertexUv1s=c.has(1),Ce.vertexUv2s=c.has(2),Ce.vertexUv3s=c.has(3),c.clear(),Ce}function m(x){let S=[];if(x.shaderID?S.push(x.shaderID):(S.push(x.customVertexShaderID),S.push(x.customFragmentShaderID)),x.defines!==void 0)for(let R in x.defines)S.push(R),S.push(x.defines[R]);return x.isRawShaderMaterial===!1&&(p(S,x),b(S,x),S.push(s.outputColorSpace)),S.push(x.customProgramCacheKey),S.join()}function p(x,S){x.push(S.precision),x.push(S.outputColorSpace),x.push(S.envMapMode),x.push(S.envMapCubeUVHeight),x.push(S.mapUv),x.push(S.alphaMapUv),x.push(S.lightMapUv),x.push(S.aoMapUv),x.push(S.bumpMapUv),x.push(S.normalMapUv),x.push(S.displacementMapUv),x.push(S.emissiveMapUv),x.push(S.metalnessMapUv),x.push(S.roughnessMapUv),x.push(S.anisotropyMapUv),x.push(S.clearcoatMapUv),x.push(S.clearcoatNormalMapUv),x.push(S.clearcoatRoughnessMapUv),x.push(S.iridescenceMapUv),x.push(S.iridescenceThicknessMapUv),x.push(S.sheenColorMapUv),x.push(S.sheenRoughnessMapUv),x.push(S.specularMapUv),x.push(S.specularColorMapUv),x.push(S.specularIntensityMapUv),x.push(S.transmissionMapUv),x.push(S.thicknessMapUv),x.push(S.combine),x.push(S.fogExp2),x.push(S.sizeAttenuation),x.push(S.morphTargetsCount),x.push(S.morphAttributeCount),x.push(S.numDirLights),x.push(S.numPointLights),x.push(S.numSpotLights),x.push(S.numSpotLightMaps),x.push(S.numHemiLights),x.push(S.numRectAreaLights),x.push(S.numDirLightShadows),x.push(S.numPointLightShadows),x.push(S.numSpotLightShadows),x.push(S.numSpotLightShadowsWithMaps),x.push(S.numLightProbes),x.push(S.shadowMapType),x.push(S.toneMapping),x.push(S.numClippingPlanes),x.push(S.numClipIntersection),x.push(S.depthPacking)}function b(x,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function M(x){let S=d[x.type],R;if(S){let C=ai[S];R=nd.clone(C.uniforms)}else R=x.uniforms;return R}function y(x,S){let R=u.get(S);return R!==void 0?++R.usedTimes:(R=new F_(s,S,x,i),l.push(R),u.set(S,R)),R}function T(x){if(--x.usedTimes===0){let S=l.indexOf(x);l[S]=l[l.length-1],l.pop(),u.delete(x.cacheKey),x.destroy()}}function w(x){o.remove(x)}function E(){o.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:M,acquireProgram:y,releaseProgram:T,releaseShaderCache:w,programs:l,dispose:E}}function z_(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function H_(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function bd(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Sd(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function o(f,d,g,_,m,p){let b=s[e];return b===void 0?(b={id:f.id,object:f,geometry:d,material:g,materialVariant:a(f),groupOrder:_,renderOrder:f.renderOrder,z:m,group:p},s[e]=b):(b.id=f.id,b.object=f,b.geometry=d,b.material=g,b.materialVariant=a(f),b.groupOrder=_,b.renderOrder=f.renderOrder,b.z=m,b.group=p),e++,b}function c(f,d,g,_,m,p){let b=o(f,d,g,_,m,p);g.transmission>0?n.push(b):g.transparent===!0?i.push(b):t.push(b)}function l(f,d,g,_,m,p){let b=o(f,d,g,_,m,p);g.transmission>0?n.unshift(b):g.transparent===!0?i.unshift(b):t.unshift(b)}function u(f,d,g){t.length>1&&t.sort(f||H_),n.length>1&&n.sort(d||bd),i.length>1&&i.sort(d||bd),g&&(t.reverse(),n.reverse(),i.reverse())}function h(){for(let f=e,d=s.length;f<d;f++){let g=s[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:c,unshift:l,finish:h,sort:u}}function V_(){let s=new WeakMap;function e(n,i){let r=s.get(n),a;return r===void 0?(a=new Sd,s.set(n,[a])):i>=r.length?(a=new Sd,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function G_(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new de};break;case"SpotLight":t={position:new L,direction:new L,color:new de,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new de,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new de,groundColor:new de};break;case"RectAreaLight":t={color:new de,position:new L,halfWidth:new L,halfHeight:new L};break}return s[e.id]=t,t}}}function W_(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var X_=0;function q_(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Y_(s){let e=new G_,t=W_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);let i=new L,r=new Ee,a=new Ee;function o(l){let u=0,h=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,b=0,M=0,y=0,T=0,w=0,E=0;l.sort(q_);for(let S=0,R=l.length;S<R;S++){let C=l[S],I=C.color,F=C.intensity,V=C.distance,O=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Vi?O=C.shadow.map.texture:O=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)u+=I.r*F,h+=I.g*F,f+=I.b*F;else if(C.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(C.sh.coefficients[N],F);E++}else if(C.isDirectionalLight){let N=e.get(C);if(N.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let H=C.shadow,q=t.get(C);q.shadowIntensity=H.intensity,q.shadowBias=H.bias,q.shadowNormalBias=H.normalBias,q.shadowRadius=H.radius,q.shadowMapSize=H.mapSize,n.directionalShadow[d]=q,n.directionalShadowMap[d]=O,n.directionalShadowMatrix[d]=C.shadow.matrix,b++}n.directional[d]=N,d++}else if(C.isSpotLight){let N=e.get(C);N.position.setFromMatrixPosition(C.matrixWorld),N.color.copy(I).multiplyScalar(F),N.distance=V,N.coneCos=Math.cos(C.angle),N.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),N.decay=C.decay,n.spot[_]=N;let H=C.shadow;if(C.map&&(n.spotLightMap[T]=C.map,T++,H.updateMatrices(C),C.castShadow&&w++),n.spotLightMatrix[_]=H.matrix,C.castShadow){let q=t.get(C);q.shadowIntensity=H.intensity,q.shadowBias=H.bias,q.shadowNormalBias=H.normalBias,q.shadowRadius=H.radius,q.shadowMapSize=H.mapSize,n.spotShadow[_]=q,n.spotShadowMap[_]=O,y++}_++}else if(C.isRectAreaLight){let N=e.get(C);N.color.copy(I).multiplyScalar(F),N.halfWidth.set(C.width*.5,0,0),N.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=N,m++}else if(C.isPointLight){let N=e.get(C);if(N.color.copy(C.color).multiplyScalar(C.intensity),N.distance=C.distance,N.decay=C.decay,C.castShadow){let H=C.shadow,q=t.get(C);q.shadowIntensity=H.intensity,q.shadowBias=H.bias,q.shadowNormalBias=H.normalBias,q.shadowRadius=H.radius,q.shadowMapSize=H.mapSize,q.shadowCameraNear=H.camera.near,q.shadowCameraFar=H.camera.far,n.pointShadow[g]=q,n.pointShadowMap[g]=O,n.pointShadowMatrix[g]=C.shadow.matrix,M++}n.point[g]=N,g++}else if(C.isHemisphereLight){let N=e.get(C);N.skyColor.copy(C.color).multiplyScalar(F),N.groundColor.copy(C.groundColor).multiplyScalar(F),n.hemi[p]=N,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;let x=n.hash;(x.directionalLength!==d||x.pointLength!==g||x.spotLength!==_||x.rectAreaLength!==m||x.hemiLength!==p||x.numDirectionalShadows!==b||x.numPointShadows!==M||x.numSpotShadows!==y||x.numSpotMaps!==T||x.numLightProbes!==E)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=y+T-w,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=E,x.directionalLength=d,x.pointLength=g,x.spotLength=_,x.rectAreaLength=m,x.hemiLength=p,x.numDirectionalShadows=b,x.numPointShadows=M,x.numSpotShadows=y,x.numSpotMaps=T,x.numLightProbes=E,n.version=X_++)}function c(l,u){let h=0,f=0,d=0,g=0,_=0,m=u.matrixWorldInverse;for(let p=0,b=l.length;p<b;p++){let M=l[p];if(M.isDirectionalLight){let y=n.directional[h];y.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),h++}else if(M.isSpotLight){let y=n.spot[d];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),d++}else if(M.isRectAreaLight){let y=n.rectArea[g];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){let y=n.point[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){let y=n.hemi[_];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:n}}function Md(s){let e=new Y_(s),t=[],n=[],i=[];function r(f){h.camera=f,t.length=0,n.length=0,i.length=0}function a(f){t.push(f)}function o(f){n.push(f)}function c(f){i.push(f)}function l(){e.setup(t)}function u(f){e.setupView(t,f)}let h={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function K_(s){let e=new WeakMap;function t(i,r=0){let a=e.get(i),o;return a===void 0?(o=new Md(s),e.set(i,[o])):r>=a.length?(o=new Md(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var Z_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,j_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,J_=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],$_=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],Td=new Ee,sa=new L,uu=new L;function Q_(s,e,t){let n=new Ws,i=new Te,r=new Te,a=new tt,o=new uo,c=new fo,l={},u=t.maxTextureSize,h={[_n]:qt,[qt]:_n,[un]:un},f=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Te},radius:{value:4}},vertexShader:Z_,fragmentShader:j_}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let g=new pt;g.setAttribute("position",new gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new st(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qr;let p=this.type;this.render=function(w,E,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===So&&(Ae("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=qr);let S=s.getRenderTarget(),R=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),I=s.state;I.setBlending(ii),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let F=p!==this.type;F&&E.traverse(function(V){V.material&&(Array.isArray(V.material)?V.material.forEach(O=>O.needsUpdate=!0):V.material.needsUpdate=!0)});for(let V=0,O=w.length;V<O;V++){let N=w[V],H=N.shadow;if(H===void 0){Ae("WebGLShadowMap:",N,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);let q=H.getFrameExtents();i.multiply(q),r.copy(H.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/q.x),i.x=r.x*q.x,H.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/q.y),i.y=r.y*q.y,H.mapSize.y=r.y));let K=s.state.buffers.depth.getReversed();if(H.camera._reversedDepth=K,H.map===null||F===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===js){if(N.isPointLight){Ae("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new vn(i.x,i.y,{format:Vi,type:si,minFilter:mt,magFilter:mt,generateMipmaps:!1}),H.map.texture.name=N.name+".shadowMap",H.map.depthTexture=new xi(i.x,i.y,Tn),H.map.depthTexture.name=N.name+".shadowMapDepth",H.map.depthTexture.format=Kn,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=wt,H.map.depthTexture.magFilter=wt}else N.isPointLight?(H.map=new ml(i.x),H.map.depthTexture=new lo(i.x,Vn)):(H.map=new vn(i.x,i.y),H.map.depthTexture=new xi(i.x,i.y,Vn)),H.map.depthTexture.name=N.name+".shadowMap",H.map.depthTexture.format=Kn,this.type===qr?(H.map.depthTexture.compareFunction=K?ul:cl,H.map.depthTexture.minFilter=mt,H.map.depthTexture.magFilter=mt):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=wt,H.map.depthTexture.magFilter=wt);H.camera.updateProjectionMatrix()}let ie=H.map.isWebGLCubeRenderTarget?6:1;for(let ne=0;ne<ie;ne++){if(H.map.isWebGLCubeRenderTarget)s.setRenderTarget(H.map,ne),s.clear();else{ne===0&&(s.setRenderTarget(H.map),s.clear());let re=H.getViewport(ne);a.set(r.x*re.x,r.y*re.y,r.x*re.z,r.y*re.w),I.viewport(a)}if(N.isPointLight){let re=H.camera,ye=H.matrix,ve=N.distance||re.far;ve!==re.far&&(re.far=ve,re.updateProjectionMatrix()),sa.setFromMatrixPosition(N.matrixWorld),re.position.copy(sa),uu.copy(re.position),uu.add(J_[ne]),re.up.copy($_[ne]),re.lookAt(uu),re.updateMatrixWorld(),ye.makeTranslation(-sa.x,-sa.y,-sa.z),Td.multiplyMatrices(re.projectionMatrix,re.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Td,re.coordinateSystem,re.reversedDepth)}else H.updateMatrices(N);n=H.getFrustum(),y(E,x,H.camera,N,this.type)}H.isPointLightShadow!==!0&&this.type===js&&b(H,x),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(S,R,C)};function b(w,E){let x=e.update(_);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new vn(i.x,i.y,{format:Vi,type:si})),f.uniforms.shadow_pass.value=w.map.depthTexture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(E,null,x,f,_,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(E,null,x,d,_,null)}function M(w,E,x,S){let R=null,C=x.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)R=C;else if(R=x.isPointLight===!0?c:o,s.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){let I=R.uuid,F=E.uuid,V=l[I];V===void 0&&(V={},l[I]=V);let O=V[F];O===void 0&&(O=R.clone(),V[F]=O,E.addEventListener("dispose",T)),R=O}if(R.visible=E.visible,R.wireframe=E.wireframe,S===js?R.side=E.shadowSide!==null?E.shadowSide:E.side:R.side=E.shadowSide!==null?E.shadowSide:h[E.side],R.alphaMap=E.alphaMap,R.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,R.map=E.map,R.clipShadows=E.clipShadows,R.clippingPlanes=E.clippingPlanes,R.clipIntersection=E.clipIntersection,R.displacementMap=E.displacementMap,R.displacementScale=E.displacementScale,R.displacementBias=E.displacementBias,R.wireframeLinewidth=E.wireframeLinewidth,R.linewidth=E.linewidth,x.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let I=s.properties.get(R);I.light=x}return R}function y(w,E,x,S,R){if(w.visible===!1)return;if(w.layers.test(E.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&R===js)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,w.matrixWorld);let F=e.update(w),V=w.material;if(Array.isArray(V)){let O=F.groups;for(let N=0,H=O.length;N<H;N++){let q=O[N],K=V[q.materialIndex];if(K&&K.visible){let ie=M(w,K,S,R);w.onBeforeShadow(s,w,E,x,F,ie,q),s.renderBufferDirect(x,null,F,ie,w,q),w.onAfterShadow(s,w,E,x,F,ie,q)}}}else if(V.visible){let O=M(w,V,S,R);w.onBeforeShadow(s,w,E,x,F,O,null),s.renderBufferDirect(x,null,F,O,w,null),w.onAfterShadow(s,w,E,x,F,O,null)}}let I=w.children;for(let F=0,V=I.length;F<V;F++)y(I[F],E,x,S,R)}function T(w){w.target.removeEventListener("dispose",T);for(let x in l){let S=l[x],R=w.target.uuid;R in S&&(S[R].dispose(),delete S[R])}}}function ey(s,e){function t(){let D=!1,le=new tt,$=null,he=new tt(0,0,0,0);return{setMask:function(_e){$!==_e&&!D&&(s.colorMask(_e,_e,_e,_e),$=_e)},setLocked:function(_e){D=_e},setClear:function(_e,te,Ce,Me,vt){vt===!0&&(_e*=Me,te*=Me,Ce*=Me),le.set(_e,te,Ce,Me),he.equals(le)===!1&&(s.clearColor(_e,te,Ce,Me),he.copy(le))},reset:function(){D=!1,$=null,he.set(-1,0,0,0)}}}function n(){let D=!1,le=!1,$=null,he=null,_e=null;return{setReversed:function(te){if(le!==te){let Ce=e.get("EXT_clip_control");te?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT),le=te;let Me=_e;_e=null,this.setClear(Me)}},getReversed:function(){return le},setTest:function(te){te?ee(s.DEPTH_TEST):Re(s.DEPTH_TEST)},setMask:function(te){$!==te&&!D&&(s.depthMask(te),$=te)},setFunc:function(te){if(le&&(te=jh[te]),he!==te){switch(te){case Za:s.depthFunc(s.NEVER);break;case ja:s.depthFunc(s.ALWAYS);break;case Ja:s.depthFunc(s.LESS);break;case ts:s.depthFunc(s.LEQUAL);break;case $a:s.depthFunc(s.EQUAL);break;case Qa:s.depthFunc(s.GEQUAL);break;case eo:s.depthFunc(s.GREATER);break;case to:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}he=te}},setLocked:function(te){D=te},setClear:function(te){_e!==te&&(_e=te,le&&(te=1-te),s.clearDepth(te))},reset:function(){D=!1,$=null,he=null,_e=null,le=!1}}}function i(){let D=!1,le=null,$=null,he=null,_e=null,te=null,Ce=null,Me=null,vt=null;return{setTest:function(ft){D||(ft?ee(s.STENCIL_TEST):Re(s.STENCIL_TEST))},setMask:function(ft){le!==ft&&!D&&(s.stencilMask(ft),le=ft)},setFunc:function(ft,Gn,Wn){($!==ft||he!==Gn||_e!==Wn)&&(s.stencilFunc(ft,Gn,Wn),$=ft,he=Gn,_e=Wn)},setOp:function(ft,Gn,Wn){(te!==ft||Ce!==Gn||Me!==Wn)&&(s.stencilOp(ft,Gn,Wn),te=ft,Ce=Gn,Me=Wn)},setLocked:function(ft){D=ft},setClear:function(ft){vt!==ft&&(s.clearStencil(ft),vt=ft)},reset:function(){D=!1,le=null,$=null,he=null,_e=null,te=null,Ce=null,Me=null,vt=null}}}let r=new t,a=new n,o=new i,c=new WeakMap,l=new WeakMap,u={},h={},f={},d=new WeakMap,g=[],_=null,m=!1,p=null,b=null,M=null,y=null,T=null,w=null,E=null,x=new de(0,0,0),S=0,R=!1,C=null,I=null,F=null,V=null,O=null,N=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,q=0,K=s.getParameter(s.VERSION);K.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(K)[1]),H=q>=1):K.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),H=q>=2);let ie=null,ne={},re=s.getParameter(s.SCISSOR_BOX),ye=s.getParameter(s.VIEWPORT),ve=new tt().fromArray(re),oe=new tt().fromArray(ye);function k(D,le,$,he){let _e=new Uint8Array(4),te=s.createTexture();s.bindTexture(D,te),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ce=0;Ce<$;Ce++)D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY?s.texImage3D(le,0,s.RGBA,1,1,he,0,s.RGBA,s.UNSIGNED_BYTE,_e):s.texImage2D(le+Ce,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,_e);return te}let J={};J[s.TEXTURE_2D]=k(s.TEXTURE_2D,s.TEXTURE_2D,1),J[s.TEXTURE_CUBE_MAP]=k(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[s.TEXTURE_2D_ARRAY]=k(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),J[s.TEXTURE_3D]=k(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ee(s.DEPTH_TEST),a.setFunc(ts),Et(!1),It(Pc),ee(s.CULL_FACE),Je(ii);function ee(D){u[D]!==!0&&(s.enable(D),u[D]=!0)}function Re(D){u[D]!==!1&&(s.disable(D),u[D]=!1)}function Oe(D,le){return f[D]!==le?(s.bindFramebuffer(D,le),f[D]=le,D===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=le),D===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=le),!0):!1}function Ue(D,le){let $=g,he=!1;if(D){$=d.get(le),$===void 0&&($=[],d.set(le,$));let _e=D.textures;if($.length!==_e.length||$[0]!==s.COLOR_ATTACHMENT0){for(let te=0,Ce=_e.length;te<Ce;te++)$[te]=s.COLOR_ATTACHMENT0+te;$.length=_e.length,he=!0}}else $[0]!==s.BACK&&($[0]=s.BACK,he=!0);he&&s.drawBuffers($)}function St(D){return _!==D?(s.useProgram(D),_=D,!0):!1}let Ye={[Li]:s.FUNC_ADD,[_h]:s.FUNC_SUBTRACT,[yh]:s.FUNC_REVERSE_SUBTRACT};Ye[vh]=s.MIN,Ye[bh]=s.MAX;let at={[Sh]:s.ZERO,[Mh]:s.ONE,[Th]:s.SRC_COLOR,[Ya]:s.SRC_ALPHA,[Ph]:s.SRC_ALPHA_SATURATE,[Ch]:s.DST_COLOR,[Ah]:s.DST_ALPHA,[wh]:s.ONE_MINUS_SRC_COLOR,[Ka]:s.ONE_MINUS_SRC_ALPHA,[Rh]:s.ONE_MINUS_DST_COLOR,[Eh]:s.ONE_MINUS_DST_ALPHA,[Ih]:s.CONSTANT_COLOR,[Lh]:s.ONE_MINUS_CONSTANT_COLOR,[Nh]:s.CONSTANT_ALPHA,[Dh]:s.ONE_MINUS_CONSTANT_ALPHA};function Je(D,le,$,he,_e,te,Ce,Me,vt,ft){if(D===ii){m===!0&&(Re(s.BLEND),m=!1);return}if(m===!1&&(ee(s.BLEND),m=!0),D!==xh){if(D!==p||ft!==R){if((b!==Li||T!==Li)&&(s.blendEquation(s.FUNC_ADD),b=Li,T=Li),ft)switch(D){case es:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ic:s.blendFunc(s.ONE,s.ONE);break;case Lc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Nc:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:De("WebGLState: Invalid blending: ",D);break}else switch(D){case es:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ic:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Lc:De("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Nc:De("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:De("WebGLState: Invalid blending: ",D);break}M=null,y=null,w=null,E=null,x.set(0,0,0),S=0,p=D,R=ft}return}_e=_e||le,te=te||$,Ce=Ce||he,(le!==b||_e!==T)&&(s.blendEquationSeparate(Ye[le],Ye[_e]),b=le,T=_e),($!==M||he!==y||te!==w||Ce!==E)&&(s.blendFuncSeparate(at[$],at[he],at[te],at[Ce]),M=$,y=he,w=te,E=Ce),(Me.equals(x)===!1||vt!==S)&&(s.blendColor(Me.r,Me.g,Me.b,vt),x.copy(Me),S=vt),p=D,R=!1}function Ze(D,le){D.side===un?Re(s.CULL_FACE):ee(s.CULL_FACE);let $=D.side===qt;le&&($=!$),Et($),D.blending===es&&D.transparent===!1?Je(ii):Je(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let he=D.stencilWrite;o.setTest(he),he&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Vt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ee(s.SAMPLE_ALPHA_TO_COVERAGE):Re(s.SAMPLE_ALPHA_TO_COVERAGE)}function Et(D){C!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),C=D)}function It(D){D!==mh?(ee(s.CULL_FACE),D!==I&&(D===Pc?s.cullFace(s.BACK):D===gh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Re(s.CULL_FACE),I=D}function Ot(D){D!==F&&(H&&s.lineWidth(D),F=D)}function Vt(D,le,$){D?(ee(s.POLYGON_OFFSET_FILL),(V!==le||O!==$)&&(V=le,O=$,a.getReversed()&&(le=-le),s.polygonOffset(le,$))):Re(s.POLYGON_OFFSET_FILL)}function yt(D){D?ee(s.SCISSOR_TEST):Re(s.SCISSOR_TEST)}function Ct(D){D===void 0&&(D=s.TEXTURE0+N-1),ie!==D&&(s.activeTexture(D),ie=D)}function U(D,le,$){$===void 0&&(ie===null?$=s.TEXTURE0+N-1:$=ie);let he=ne[$];he===void 0&&(he={type:void 0,texture:void 0},ne[$]=he),(he.type!==D||he.texture!==le)&&(ie!==$&&(s.activeTexture($),ie=$),s.bindTexture(D,le||J[D]),he.type=D,he.texture=le)}function an(){let D=ne[ie];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Qe(){try{s.compressedTexImage2D(...arguments)}catch(D){De("WebGLState:",D)}}function P(){try{s.compressedTexImage3D(...arguments)}catch(D){De("WebGLState:",D)}}function v(){try{s.texSubImage2D(...arguments)}catch(D){De("WebGLState:",D)}}function z(){try{s.texSubImage3D(...arguments)}catch(D){De("WebGLState:",D)}}function X(){try{s.compressedTexSubImage2D(...arguments)}catch(D){De("WebGLState:",D)}}function Z(){try{s.compressedTexSubImage3D(...arguments)}catch(D){De("WebGLState:",D)}}function ae(){try{s.texStorage2D(...arguments)}catch(D){De("WebGLState:",D)}}function ce(){try{s.texStorage3D(...arguments)}catch(D){De("WebGLState:",D)}}function j(){try{s.texImage2D(...arguments)}catch(D){De("WebGLState:",D)}}function Q(){try{s.texImage3D(...arguments)}catch(D){De("WebGLState:",D)}}function ue(D){return h[D]!==void 0?h[D]:s.getParameter(D)}function Pe(D,le){h[D]!==le&&(s.pixelStorei(D,le),h[D]=le)}function pe(D){ve.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),ve.copy(D))}function fe(D){oe.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),oe.copy(D))}function Ne(D,le){let $=l.get(le);$===void 0&&($=new WeakMap,l.set(le,$));let he=$.get(D);he===void 0&&(he=s.getUniformBlockIndex(le,D.name),$.set(D,he))}function Fe(D,le){let he=l.get(le).get(D);c.get(le)!==he&&(s.uniformBlockBinding(le,he,D.__bindingPointIndex),c.set(le,he))}function ze(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),u={},h={},ie=null,ne={},f={},d=new WeakMap,g=[],_=null,m=!1,p=null,b=null,M=null,y=null,T=null,w=null,E=null,x=new de(0,0,0),S=0,R=!1,C=null,I=null,F=null,V=null,O=null,ve.set(0,0,s.canvas.width,s.canvas.height),oe.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ee,disable:Re,bindFramebuffer:Oe,drawBuffers:Ue,useProgram:St,setBlending:Je,setMaterial:Ze,setFlipSided:Et,setCullFace:It,setLineWidth:Ot,setPolygonOffset:Vt,setScissorTest:yt,activeTexture:Ct,bindTexture:U,unbindTexture:an,compressedTexImage2D:Qe,compressedTexImage3D:P,texImage2D:j,texImage3D:Q,pixelStorei:Pe,getParameter:ue,updateUBOMapping:Ne,uniformBlockBinding:Fe,texStorage2D:ae,texStorage3D:ce,texSubImage2D:v,texSubImage3D:z,compressedTexSubImage2D:X,compressedTexSubImage3D:Z,scissor:pe,viewport:fe,reset:ze}}function ty(s,e,t,n,i,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Te,u=new WeakMap,h=new Set,f,d=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,v){return g?new OffscreenCanvas(P,v):Os("canvas")}function m(P,v,z){let X=1,Z=Qe(P);if((Z.width>z||Z.height>z)&&(X=z/Math.max(Z.width,Z.height)),X<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let ae=Math.floor(X*Z.width),ce=Math.floor(X*Z.height);f===void 0&&(f=_(ae,ce));let j=v?_(ae,ce):f;return j.width=ae,j.height=ce,j.getContext("2d").drawImage(P,0,0,ae,ce),Ae("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+ae+"x"+ce+")."),j}else return"data"in P&&Ae("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),P;return P}function p(P){return P.generateMipmaps}function b(P){s.generateMipmap(P)}function M(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(P,v,z,X,Z,ae=!1){if(P!==null){if(s[P]!==void 0)return s[P];Ae("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ce;X&&(ce=e.get("EXT_texture_norm16"),ce||Ae("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=v;if(v===s.RED&&(z===s.FLOAT&&(j=s.R32F),z===s.HALF_FLOAT&&(j=s.R16F),z===s.UNSIGNED_BYTE&&(j=s.R8),z===s.UNSIGNED_SHORT&&ce&&(j=ce.R16_EXT),z===s.SHORT&&ce&&(j=ce.R16_SNORM_EXT)),v===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(j=s.R8UI),z===s.UNSIGNED_SHORT&&(j=s.R16UI),z===s.UNSIGNED_INT&&(j=s.R32UI),z===s.BYTE&&(j=s.R8I),z===s.SHORT&&(j=s.R16I),z===s.INT&&(j=s.R32I)),v===s.RG&&(z===s.FLOAT&&(j=s.RG32F),z===s.HALF_FLOAT&&(j=s.RG16F),z===s.UNSIGNED_BYTE&&(j=s.RG8),z===s.UNSIGNED_SHORT&&ce&&(j=ce.RG16_EXT),z===s.SHORT&&ce&&(j=ce.RG16_SNORM_EXT)),v===s.RG_INTEGER&&(z===s.UNSIGNED_BYTE&&(j=s.RG8UI),z===s.UNSIGNED_SHORT&&(j=s.RG16UI),z===s.UNSIGNED_INT&&(j=s.RG32UI),z===s.BYTE&&(j=s.RG8I),z===s.SHORT&&(j=s.RG16I),z===s.INT&&(j=s.RG32I)),v===s.RGB_INTEGER&&(z===s.UNSIGNED_BYTE&&(j=s.RGB8UI),z===s.UNSIGNED_SHORT&&(j=s.RGB16UI),z===s.UNSIGNED_INT&&(j=s.RGB32UI),z===s.BYTE&&(j=s.RGB8I),z===s.SHORT&&(j=s.RGB16I),z===s.INT&&(j=s.RGB32I)),v===s.RGBA_INTEGER&&(z===s.UNSIGNED_BYTE&&(j=s.RGBA8UI),z===s.UNSIGNED_SHORT&&(j=s.RGBA16UI),z===s.UNSIGNED_INT&&(j=s.RGBA32UI),z===s.BYTE&&(j=s.RGBA8I),z===s.SHORT&&(j=s.RGBA16I),z===s.INT&&(j=s.RGBA32I)),v===s.RGB&&(z===s.UNSIGNED_SHORT&&ce&&(j=ce.RGB16_EXT),z===s.SHORT&&ce&&(j=ce.RGB16_SNORM_EXT),z===s.UNSIGNED_INT_5_9_9_9_REV&&(j=s.RGB9_E5),z===s.UNSIGNED_INT_10F_11F_11F_REV&&(j=s.R11F_G11F_B10F)),v===s.RGBA){let Q=ae?yr:Be.getTransfer(Z);z===s.FLOAT&&(j=s.RGBA32F),z===s.HALF_FLOAT&&(j=s.RGBA16F),z===s.UNSIGNED_BYTE&&(j=Q===$e?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT&&ce&&(j=ce.RGBA16_EXT),z===s.SHORT&&ce&&(j=ce.RGBA16_SNORM_EXT),z===s.UNSIGNED_SHORT_4_4_4_4&&(j=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(j=s.RGB5_A1)}return(j===s.R16F||j===s.R32F||j===s.RG16F||j===s.RG32F||j===s.RGBA16F||j===s.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function T(P,v){let z;return P?v===null||v===Vn||v===Qs?z=s.DEPTH24_STENCIL8:v===Tn?z=s.DEPTH32F_STENCIL8:v===$s&&(z=s.DEPTH24_STENCIL8,Ae("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Vn||v===Qs?z=s.DEPTH_COMPONENT24:v===Tn?z=s.DEPTH_COMPONENT32F:v===$s&&(z=s.DEPTH_COMPONENT16),z}function w(P,v){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==wt&&P.minFilter!==mt?Math.log2(Math.max(v.width,v.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?v.mipmaps.length:1}function E(P){let v=P.target;v.removeEventListener("dispose",E),S(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&h.delete(v)}function x(P){let v=P.target;v.removeEventListener("dispose",x),C(v)}function S(P){let v=n.get(P);if(v.__webglInit===void 0)return;let z=P.source,X=d.get(z);if(X){let Z=X[v.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&R(P),Object.keys(X).length===0&&d.delete(z)}n.remove(P)}function R(P){let v=n.get(P);s.deleteTexture(v.__webglTexture);let z=P.source,X=d.get(z);delete X[v.__cacheKey],a.memory.textures--}function C(P){let v=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(v.__webglFramebuffer[X]))for(let Z=0;Z<v.__webglFramebuffer[X].length;Z++)s.deleteFramebuffer(v.__webglFramebuffer[X][Z]);else s.deleteFramebuffer(v.__webglFramebuffer[X]);v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer[X])}else{if(Array.isArray(v.__webglFramebuffer))for(let X=0;X<v.__webglFramebuffer.length;X++)s.deleteFramebuffer(v.__webglFramebuffer[X]);else s.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&s.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let X=0;X<v.__webglColorRenderbuffer.length;X++)v.__webglColorRenderbuffer[X]&&s.deleteRenderbuffer(v.__webglColorRenderbuffer[X]);v.__webglDepthRenderbuffer&&s.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let z=P.textures;for(let X=0,Z=z.length;X<Z;X++){let ae=n.get(z[X]);ae.__webglTexture&&(s.deleteTexture(ae.__webglTexture),a.memory.textures--),n.remove(z[X])}n.remove(P)}let I=0;function F(){I=0}function V(){return I}function O(P){I=P}function N(){let P=I;return P>=i.maxTextures&&Ae("WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),I+=1,P}function H(P){let v=[];return v.push(P.wrapS),v.push(P.wrapT),v.push(P.wrapR||0),v.push(P.magFilter),v.push(P.minFilter),v.push(P.anisotropy),v.push(P.internalFormat),v.push(P.format),v.push(P.type),v.push(P.generateMipmaps),v.push(P.premultiplyAlpha),v.push(P.flipY),v.push(P.unpackAlignment),v.push(P.colorSpace),v.join()}function q(P,v){let z=n.get(P);if(P.isVideoTexture&&U(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&z.__version!==P.version){let X=P.image;if(X===null)Ae("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Ae("WebGLRenderer: Texture marked for update but image is incomplete");else{Re(z,P,v);return}}else P.isExternalTexture&&(z.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+v)}function K(P,v){let z=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){Re(z,P,v);return}else P.isExternalTexture&&(z.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+v)}function ie(P,v){let z=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){Re(z,P,v);return}t.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+v)}function ne(P,v){let z=n.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&z.__version!==P.version){Oe(z,P,v);return}t.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+v)}let re={[yn]:s.REPEAT,[Gt]:s.CLAMP_TO_EDGE,[Us]:s.MIRRORED_REPEAT},ye={[wt]:s.NEAREST,[wo]:s.NEAREST_MIPMAP_NEAREST,[ds]:s.NEAREST_MIPMAP_LINEAR,[mt]:s.LINEAR,[Js]:s.LINEAR_MIPMAP_NEAREST,[fn]:s.LINEAR_MIPMAP_LINEAR},ve={[Hh]:s.NEVER,[qh]:s.ALWAYS,[Vh]:s.LESS,[cl]:s.LEQUAL,[Gh]:s.EQUAL,[ul]:s.GEQUAL,[Wh]:s.GREATER,[Xh]:s.NOTEQUAL};function oe(P,v){if(v.type===Tn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===mt||v.magFilter===Js||v.magFilter===ds||v.magFilter===fn||v.minFilter===mt||v.minFilter===Js||v.minFilter===ds||v.minFilter===fn)&&Ae("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,re[v.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,re[v.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,re[v.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,ye[v.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,ye[v.minFilter]),v.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,ve[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===wt||v.minFilter!==ds&&v.minFilter!==fn||v.type===Tn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let z=e.get("EXT_texture_filter_anisotropic");s.texParameterf(P,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function k(P,v){let z=!1;P.__webglInit===void 0&&(P.__webglInit=!0,v.addEventListener("dispose",E));let X=v.source,Z=d.get(X);Z===void 0&&(Z={},d.set(X,Z));let ae=H(v);if(ae!==P.__cacheKey){Z[ae]===void 0&&(Z[ae]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,z=!0),Z[ae].usedTimes++;let ce=Z[P.__cacheKey];ce!==void 0&&(Z[P.__cacheKey].usedTimes--,ce.usedTimes===0&&R(v)),P.__cacheKey=ae,P.__webglTexture=Z[ae].texture}return z}function J(P,v,z){return Math.floor(Math.floor(P/z)/v)}function ee(P,v,z,X){let ae=P.updateRanges;if(ae.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,v.width,v.height,z,X,v.data);else{ae.sort((Pe,pe)=>Pe.start-pe.start);let ce=0;for(let Pe=1;Pe<ae.length;Pe++){let pe=ae[ce],fe=ae[Pe],Ne=pe.start+pe.count,Fe=J(fe.start,v.width,4),ze=J(pe.start,v.width,4);fe.start<=Ne+1&&Fe===ze&&J(fe.start+fe.count-1,v.width,4)===Fe?pe.count=Math.max(pe.count,fe.start+fe.count-pe.start):(++ce,ae[ce]=fe)}ae.length=ce+1;let j=t.getParameter(s.UNPACK_ROW_LENGTH),Q=t.getParameter(s.UNPACK_SKIP_PIXELS),ue=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,v.width);for(let Pe=0,pe=ae.length;Pe<pe;Pe++){let fe=ae[Pe],Ne=Math.floor(fe.start/4),Fe=Math.ceil(fe.count/4),ze=Ne%v.width,D=Math.floor(Ne/v.width),le=Fe,$=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,ze),t.pixelStorei(s.UNPACK_SKIP_ROWS,D),t.texSubImage2D(s.TEXTURE_2D,0,ze,D,le,$,z,X,v.data)}P.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,j),t.pixelStorei(s.UNPACK_SKIP_PIXELS,Q),t.pixelStorei(s.UNPACK_SKIP_ROWS,ue)}}function Re(P,v,z){let X=s.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(X=s.TEXTURE_2D_ARRAY),v.isData3DTexture&&(X=s.TEXTURE_3D);let Z=k(P,v),ae=v.source;t.bindTexture(X,P.__webglTexture,s.TEXTURE0+z);let ce=n.get(ae);if(ae.version!==ce.__version||Z===!0){if(t.activeTexture(s.TEXTURE0+z),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let $=Be.getPrimaries(Be.workingColorSpace),he=v.colorSpace===Si?null:Be.getPrimaries(v.colorSpace),_e=v.colorSpace===Si||$===he?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e)}t.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment);let Q=m(v.image,!1,i.maxTextureSize);Q=an(v,Q);let ue=r.convert(v.format,v.colorSpace),Pe=r.convert(v.type),pe=y(v.internalFormat,ue,Pe,v.normalized,v.colorSpace,v.isVideoTexture);oe(X,v);let fe,Ne=v.mipmaps,Fe=v.isVideoTexture!==!0,ze=ce.__version===void 0||Z===!0,D=ae.dataReady,le=w(v,Q);if(v.isDepthTexture)pe=T(v.format===Hi,v.type),ze&&(Fe?t.texStorage2D(s.TEXTURE_2D,1,pe,Q.width,Q.height):t.texImage2D(s.TEXTURE_2D,0,pe,Q.width,Q.height,0,ue,Pe,null));else if(v.isDataTexture)if(Ne.length>0){Fe&&ze&&t.texStorage2D(s.TEXTURE_2D,le,pe,Ne[0].width,Ne[0].height);for(let $=0,he=Ne.length;$<he;$++)fe=Ne[$],Fe?D&&t.texSubImage2D(s.TEXTURE_2D,$,0,0,fe.width,fe.height,ue,Pe,fe.data):t.texImage2D(s.TEXTURE_2D,$,pe,fe.width,fe.height,0,ue,Pe,fe.data);v.generateMipmaps=!1}else Fe?(ze&&t.texStorage2D(s.TEXTURE_2D,le,pe,Q.width,Q.height),D&&ee(v,Q,ue,Pe)):t.texImage2D(s.TEXTURE_2D,0,pe,Q.width,Q.height,0,ue,Pe,Q.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Fe&&ze&&t.texStorage3D(s.TEXTURE_2D_ARRAY,le,pe,Ne[0].width,Ne[0].height,Q.depth);for(let $=0,he=Ne.length;$<he;$++)if(fe=Ne[$],v.format!==wn)if(ue!==null)if(Fe){if(D)if(v.layerUpdates.size>0){let _e=Qc(fe.width,fe.height,v.format,v.type);for(let te of v.layerUpdates){let Ce=fe.data.subarray(te*_e/fe.data.BYTES_PER_ELEMENT,(te+1)*_e/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,te,fe.width,fe.height,1,ue,Ce)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,0,fe.width,fe.height,Q.depth,ue,fe.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,$,pe,fe.width,fe.height,Q.depth,0,fe.data,0,0);else Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?D&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,0,fe.width,fe.height,Q.depth,ue,Pe,fe.data):t.texImage3D(s.TEXTURE_2D_ARRAY,$,pe,fe.width,fe.height,Q.depth,0,ue,Pe,fe.data)}else{Fe&&ze&&t.texStorage2D(s.TEXTURE_2D,le,pe,Ne[0].width,Ne[0].height);for(let $=0,he=Ne.length;$<he;$++)fe=Ne[$],v.format!==wn?ue!==null?Fe?D&&t.compressedTexSubImage2D(s.TEXTURE_2D,$,0,0,fe.width,fe.height,ue,fe.data):t.compressedTexImage2D(s.TEXTURE_2D,$,pe,fe.width,fe.height,0,fe.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?D&&t.texSubImage2D(s.TEXTURE_2D,$,0,0,fe.width,fe.height,ue,Pe,fe.data):t.texImage2D(s.TEXTURE_2D,$,pe,fe.width,fe.height,0,ue,Pe,fe.data)}else if(v.isDataArrayTexture)if(Fe){if(ze&&t.texStorage3D(s.TEXTURE_2D_ARRAY,le,pe,Q.width,Q.height,Q.depth),D)if(v.layerUpdates.size>0){let $=Qc(Q.width,Q.height,v.format,v.type);for(let he of v.layerUpdates){let _e=Q.data.subarray(he*$/Q.data.BYTES_PER_ELEMENT,(he+1)*$/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,he,Q.width,Q.height,1,ue,Pe,_e)}v.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ue,Pe,Q.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,pe,Q.width,Q.height,Q.depth,0,ue,Pe,Q.data);else if(v.isData3DTexture)Fe?(ze&&t.texStorage3D(s.TEXTURE_3D,le,pe,Q.width,Q.height,Q.depth),D&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ue,Pe,Q.data)):t.texImage3D(s.TEXTURE_3D,0,pe,Q.width,Q.height,Q.depth,0,ue,Pe,Q.data);else if(v.isFramebufferTexture){if(ze)if(Fe)t.texStorage2D(s.TEXTURE_2D,le,pe,Q.width,Q.height);else{let $=Q.width,he=Q.height;for(let _e=0;_e<le;_e++)t.texImage2D(s.TEXTURE_2D,_e,pe,$,he,0,ue,Pe,null),$>>=1,he>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in s){let $=s.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),Q.parentNode!==$){$.appendChild(Q),h.add(v),$.onpaint=he=>{let _e=he.changedElements;for(let te of h)_e.includes(te.image)&&(te.needsUpdate=!0)},$.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,Q);else{let _e=s.RGBA,te=s.RGBA,Ce=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,_e,te,Ce,Q)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Ne.length>0){if(Fe&&ze){let $=Qe(Ne[0]);t.texStorage2D(s.TEXTURE_2D,le,pe,$.width,$.height)}for(let $=0,he=Ne.length;$<he;$++)fe=Ne[$],Fe?D&&t.texSubImage2D(s.TEXTURE_2D,$,0,0,ue,Pe,fe):t.texImage2D(s.TEXTURE_2D,$,pe,ue,Pe,fe);v.generateMipmaps=!1}else if(Fe){if(ze){let $=Qe(Q);t.texStorage2D(s.TEXTURE_2D,le,pe,$.width,$.height)}D&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ue,Pe,Q)}else t.texImage2D(s.TEXTURE_2D,0,pe,ue,Pe,Q);p(v)&&b(X),ce.__version=ae.version,v.onUpdate&&v.onUpdate(v)}P.__version=v.version}function Oe(P,v,z){if(v.image.length!==6)return;let X=k(P,v),Z=v.source;t.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+z);let ae=n.get(Z);if(Z.version!==ae.__version||X===!0){t.activeTexture(s.TEXTURE0+z);let ce=Be.getPrimaries(Be.workingColorSpace),j=v.colorSpace===Si?null:Be.getPrimaries(v.colorSpace),Q=v.colorSpace===Si||ce===j?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let ue=v.isCompressedTexture||v.image[0].isCompressedTexture,Pe=v.image[0]&&v.image[0].isDataTexture,pe=[];for(let te=0;te<6;te++)!ue&&!Pe?pe[te]=m(v.image[te],!0,i.maxCubemapSize):pe[te]=Pe?v.image[te].image:v.image[te],pe[te]=an(v,pe[te]);let fe=pe[0],Ne=r.convert(v.format,v.colorSpace),Fe=r.convert(v.type),ze=y(v.internalFormat,Ne,Fe,v.normalized,v.colorSpace),D=v.isVideoTexture!==!0,le=ae.__version===void 0||X===!0,$=Z.dataReady,he=w(v,fe);oe(s.TEXTURE_CUBE_MAP,v);let _e;if(ue){D&&le&&t.texStorage2D(s.TEXTURE_CUBE_MAP,he,ze,fe.width,fe.height);for(let te=0;te<6;te++){_e=pe[te].mipmaps;for(let Ce=0;Ce<_e.length;Ce++){let Me=_e[Ce];v.format!==wn?Ne!==null?D?$&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,0,0,Me.width,Me.height,Ne,Me.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,ze,Me.width,Me.height,0,Me.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?$&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,0,0,Me.width,Me.height,Ne,Fe,Me.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,ze,Me.width,Me.height,0,Ne,Fe,Me.data)}}}else{if(_e=v.mipmaps,D&&le){_e.length>0&&he++;let te=Qe(pe[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,he,ze,te.width,te.height)}for(let te=0;te<6;te++)if(Pe){D?$&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,pe[te].width,pe[te].height,Ne,Fe,pe[te].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,ze,pe[te].width,pe[te].height,0,Ne,Fe,pe[te].data);for(let Ce=0;Ce<_e.length;Ce++){let vt=_e[Ce].image[te].image;D?$&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,0,0,vt.width,vt.height,Ne,Fe,vt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,ze,vt.width,vt.height,0,Ne,Fe,vt.data)}}else{D?$&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ne,Fe,pe[te]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,ze,Ne,Fe,pe[te]);for(let Ce=0;Ce<_e.length;Ce++){let Me=_e[Ce];D?$&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,0,0,Ne,Fe,Me.image[te]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,ze,Ne,Fe,Me.image[te])}}}p(v)&&b(s.TEXTURE_CUBE_MAP),ae.__version=Z.version,v.onUpdate&&v.onUpdate(v)}P.__version=v.version}function Ue(P,v,z,X,Z,ae){let ce=r.convert(z.format,z.colorSpace),j=r.convert(z.type),Q=y(z.internalFormat,ce,j,z.normalized,z.colorSpace),ue=n.get(v),Pe=n.get(z);if(Pe.__renderTarget=v,!ue.__hasExternalTextures){let pe=Math.max(1,v.width>>ae),fe=Math.max(1,v.height>>ae);Z===s.TEXTURE_3D||Z===s.TEXTURE_2D_ARRAY?t.texImage3D(Z,ae,Q,pe,fe,v.depth,0,ce,j,null):t.texImage2D(Z,ae,Q,pe,fe,0,ce,j,null)}t.bindFramebuffer(s.FRAMEBUFFER,P),Ct(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,X,Z,Pe.__webglTexture,0,yt(v)):(Z===s.TEXTURE_2D||Z>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,X,Z,Pe.__webglTexture,ae),t.bindFramebuffer(s.FRAMEBUFFER,null)}function St(P,v,z){if(s.bindRenderbuffer(s.RENDERBUFFER,P),v.depthBuffer){let X=v.depthTexture,Z=X&&X.isDepthTexture?X.type:null,ae=T(v.stencilBuffer,Z),ce=v.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;Ct(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,yt(v),ae,v.width,v.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,yt(v),ae,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,ae,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,ce,s.RENDERBUFFER,P)}else{let X=v.textures;for(let Z=0;Z<X.length;Z++){let ae=X[Z],ce=r.convert(ae.format,ae.colorSpace),j=r.convert(ae.type),Q=y(ae.internalFormat,ce,j,ae.normalized,ae.colorSpace);Ct(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,yt(v),Q,v.width,v.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,yt(v),Q,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,Q,v.width,v.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ye(P,v,z){let X=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,P),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Z=n.get(v.depthTexture);if(Z.__renderTarget=v,(!Z.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),X){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,v.depthTexture.addEventListener("dispose",E)),Z.__webglTexture===void 0){Z.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,Z.__webglTexture),oe(s.TEXTURE_CUBE_MAP,v.depthTexture);let ue=r.convert(v.depthTexture.format),Pe=r.convert(v.depthTexture.type),pe;v.depthTexture.format===Kn?pe=s.DEPTH_COMPONENT24:v.depthTexture.format===Hi&&(pe=s.DEPTH24_STENCIL8);for(let fe=0;fe<6;fe++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,pe,v.width,v.height,0,ue,Pe,null)}}else q(v.depthTexture,0);let ae=Z.__webglTexture,ce=yt(v),j=X?s.TEXTURE_CUBE_MAP_POSITIVE_X+z:s.TEXTURE_2D,Q=v.depthTexture.format===Hi?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(v.depthTexture.format===Kn)Ct(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Q,j,ae,0,ce):s.framebufferTexture2D(s.FRAMEBUFFER,Q,j,ae,0);else if(v.depthTexture.format===Hi)Ct(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Q,j,ae,0,ce):s.framebufferTexture2D(s.FRAMEBUFFER,Q,j,ae,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function at(P){let v=n.get(P),z=P.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==P.depthTexture){let X=P.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),X){let Z=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,X.removeEventListener("dispose",Z)};X.addEventListener("dispose",Z),v.__depthDisposeCallback=Z}v.__boundDepthTexture=X}if(P.depthTexture&&!v.__autoAllocateDepthBuffer)if(z)for(let X=0;X<6;X++)Ye(v.__webglFramebuffer[X],P,X);else{let X=P.texture.mipmaps;X&&X.length>0?Ye(v.__webglFramebuffer[0],P,0):Ye(v.__webglFramebuffer,P,0)}else if(z){v.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[X]),v.__webglDepthbuffer[X]===void 0)v.__webglDepthbuffer[X]=s.createRenderbuffer(),St(v.__webglDepthbuffer[X],P,!1);else{let Z=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ae=v.__webglDepthbuffer[X];s.bindRenderbuffer(s.RENDERBUFFER,ae),s.framebufferRenderbuffer(s.FRAMEBUFFER,Z,s.RENDERBUFFER,ae)}}else{let X=P.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=s.createRenderbuffer(),St(v.__webglDepthbuffer,P,!1);else{let Z=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ae=v.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ae),s.framebufferRenderbuffer(s.FRAMEBUFFER,Z,s.RENDERBUFFER,ae)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Je(P,v,z){let X=n.get(P);v!==void 0&&Ue(X.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&at(P)}function Ze(P){let v=P.texture,z=n.get(P),X=n.get(v);P.addEventListener("dispose",x);let Z=P.textures,ae=P.isWebGLCubeRenderTarget===!0,ce=Z.length>1;if(ce||(X.__webglTexture===void 0&&(X.__webglTexture=s.createTexture()),X.__version=v.version,a.memory.textures++),ae){z.__webglFramebuffer=[];for(let j=0;j<6;j++)if(v.mipmaps&&v.mipmaps.length>0){z.__webglFramebuffer[j]=[];for(let Q=0;Q<v.mipmaps.length;Q++)z.__webglFramebuffer[j][Q]=s.createFramebuffer()}else z.__webglFramebuffer[j]=s.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){z.__webglFramebuffer=[];for(let j=0;j<v.mipmaps.length;j++)z.__webglFramebuffer[j]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(ce)for(let j=0,Q=Z.length;j<Q;j++){let ue=n.get(Z[j]);ue.__webglTexture===void 0&&(ue.__webglTexture=s.createTexture(),a.memory.textures++)}if(P.samples>0&&Ct(P)===!1){z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let j=0;j<Z.length;j++){let Q=Z[j];z.__webglColorRenderbuffer[j]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[j]);let ue=r.convert(Q.format,Q.colorSpace),Pe=r.convert(Q.type),pe=y(Q.internalFormat,ue,Pe,Q.normalized,Q.colorSpace,P.isXRRenderTarget===!0),fe=yt(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,fe,pe,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+j,s.RENDERBUFFER,z.__webglColorRenderbuffer[j])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),St(z.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ae){t.bindTexture(s.TEXTURE_CUBE_MAP,X.__webglTexture),oe(s.TEXTURE_CUBE_MAP,v);for(let j=0;j<6;j++)if(v.mipmaps&&v.mipmaps.length>0)for(let Q=0;Q<v.mipmaps.length;Q++)Ue(z.__webglFramebuffer[j][Q],P,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Q);else Ue(z.__webglFramebuffer[j],P,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);p(v)&&b(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let j=0,Q=Z.length;j<Q;j++){let ue=Z[j],Pe=n.get(ue),pe=s.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(pe=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(pe,Pe.__webglTexture),oe(pe,ue),Ue(z.__webglFramebuffer,P,ue,s.COLOR_ATTACHMENT0+j,pe,0),p(ue)&&b(pe)}t.unbindTexture()}else{let j=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(j=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(j,X.__webglTexture),oe(j,v),v.mipmaps&&v.mipmaps.length>0)for(let Q=0;Q<v.mipmaps.length;Q++)Ue(z.__webglFramebuffer[Q],P,v,s.COLOR_ATTACHMENT0,j,Q);else Ue(z.__webglFramebuffer,P,v,s.COLOR_ATTACHMENT0,j,0);p(v)&&b(j),t.unbindTexture()}P.depthBuffer&&at(P)}function Et(P){let v=P.textures;for(let z=0,X=v.length;z<X;z++){let Z=v[z];if(p(Z)){let ae=M(P),ce=n.get(Z).__webglTexture;t.bindTexture(ae,ce),b(ae),t.unbindTexture()}}}let It=[],Ot=[];function Vt(P){if(P.samples>0){if(Ct(P)===!1){let v=P.textures,z=P.width,X=P.height,Z=s.COLOR_BUFFER_BIT,ae=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ce=n.get(P),j=v.length>1;if(j)for(let ue=0;ue<v.length;ue++)t.bindFramebuffer(s.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,ce.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);let Q=P.texture.mipmaps;Q&&Q.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let ue=0;ue<v.length;ue++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(Z|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(Z|=s.STENCIL_BUFFER_BIT)),j){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ce.__webglColorRenderbuffer[ue]);let Pe=n.get(v[ue]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Pe,0)}s.blitFramebuffer(0,0,z,X,0,0,z,X,Z,s.NEAREST),c===!0&&(It.length=0,Ot.length=0,It.push(s.COLOR_ATTACHMENT0+ue),P.depthBuffer&&P.resolveDepthBuffer===!1&&(It.push(ae),Ot.push(ae),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Ot)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,It))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),j)for(let ue=0;ue<v.length;ue++){t.bindFramebuffer(s.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.RENDERBUFFER,ce.__webglColorRenderbuffer[ue]);let Pe=n.get(v[ue]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,ce.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.TEXTURE_2D,Pe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){let v=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[v])}}}function yt(P){return Math.min(i.maxSamples,P.samples)}function Ct(P){let v=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function U(P){let v=a.render.frame;u.get(P)!==v&&(u.set(P,v),P.update())}function an(P,v){let z=P.colorSpace,X=P.format,Z=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||z!==sn&&z!==Si&&(Be.getTransfer(z)===$e?(X!==wn||Z!==hn)&&Ae("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):De("WebGLTextures: Unsupported texture color space:",z)),v}function Qe(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=N,this.resetTextureUnits=F,this.getTextureUnits=V,this.setTextureUnits=O,this.setTexture2D=q,this.setTexture2DArray=K,this.setTexture3D=ie,this.setTextureCube=ne,this.rebindTextures=Je,this.setupRenderTarget=Ze,this.updateRenderTargetMipmap=Et,this.updateMultisampleRenderTarget=Vt,this.setupDepthRenderbuffer=at,this.setupFrameBufferTexture=Ue,this.useMultisampledRTT=Ct,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function ny(s,e){function t(n,i=Si){let r,a=Be.getTransfer(i);if(n===hn)return s.UNSIGNED_BYTE;if(n===Eo)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Co)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Gc)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Wc)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Hc)return s.BYTE;if(n===Vc)return s.SHORT;if(n===$s)return s.UNSIGNED_SHORT;if(n===Ao)return s.INT;if(n===Vn)return s.UNSIGNED_INT;if(n===Tn)return s.FLOAT;if(n===si)return s.HALF_FLOAT;if(n===Xc)return s.ALPHA;if(n===qc)return s.RGB;if(n===wn)return s.RGBA;if(n===Kn)return s.DEPTH_COMPONENT;if(n===Hi)return s.DEPTH_STENCIL;if(n===Ro)return s.RED;if(n===Po)return s.RED_INTEGER;if(n===Vi)return s.RG;if(n===Io)return s.RG_INTEGER;if(n===Lo)return s.RGBA_INTEGER;if(n===jr||n===Jr||n===$r||n===Qr)if(a===$e)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===jr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===$r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===jr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===$r)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Qr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===No||n===Do||n===Uo||n===Fo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===No)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Do)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Uo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Fo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Oo||n===Bo||n===ko||n===zo||n===Ho||n===ea||n===Vo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Oo||n===Bo)return a===$e?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ko)return a===$e?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===zo)return r.COMPRESSED_R11_EAC;if(n===Ho)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ea)return r.COMPRESSED_RG11_EAC;if(n===Vo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Go||n===Wo||n===Xo||n===qo||n===Yo||n===Ko||n===Zo||n===jo||n===Jo||n===$o||n===Qo||n===el||n===tl||n===nl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Go)return a===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Wo)return a===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Xo)return a===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===qo)return a===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Yo)return a===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ko)return a===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Zo)return a===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===jo)return a===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Jo)return a===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===$o)return a===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Qo)return a===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===el)return a===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===tl)return a===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===nl)return a===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===il||n===sl||n===rl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===il)return a===$e?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===sl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===rl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===al||n===ol||n===ta||n===ll)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===al)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ol)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ta)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ll)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Qs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var iy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,sy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,_u=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Rr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new bn({vertexShader:iy,fragmentShader:sy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new st(new cs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},yu=class extends kn{constructor(e,t){super();let n=this,i=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,g=null,_=typeof XRWebGLBinding<"u",m=new _u,p={},b=t.getContextAttributes(),M=null,y=null,T=[],w=[],E=new Te,x=null,S=new xt;S.viewport=new tt;let R=new xt;R.viewport=new tt;let C=[S,R],I=new vo,F=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let J=T[k];return J===void 0&&(J=new Hs,T[k]=J),J.getTargetRaySpace()},this.getControllerGrip=function(k){let J=T[k];return J===void 0&&(J=new Hs,T[k]=J),J.getGripSpace()},this.getHand=function(k){let J=T[k];return J===void 0&&(J=new Hs,T[k]=J),J.getHandSpace()};function O(k){let J=w.indexOf(k.inputSource);if(J===-1)return;let ee=T[J];ee!==void 0&&(ee.update(k.inputSource,k.frame,l||a),ee.dispatchEvent({type:k.type,data:k.inputSource}))}function N(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",N),i.removeEventListener("inputsourceschange",H);for(let k=0;k<T.length;k++){let J=w[k];J!==null&&(w[k]=null,T[k].disconnect(J))}F=null,V=null,m.reset();for(let k in p)delete p[k];e.setRenderTarget(M),d=null,f=null,h=null,i=null,y=null,oe.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){r=k,n.isPresenting===!0&&Ae("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){o=k,n.isPresenting===!0&&Ae("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(k){l=k},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(i,t)),h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(k){if(i=k,i!==null){if(M=e.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",N),i.addEventListener("inputsourceschange",H),b.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(E),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,Re=null,Oe=null;b.depth&&(Oe=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=b.stencil?Hi:Kn,Re=b.stencil?Qs:Vn);let Ue={colorFormat:t.RGBA8,depthFormat:Oe,scaleFactor:r};h=this.getBinding(),f=h.createProjectionLayer(Ue),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),y=new vn(f.textureWidth,f.textureHeight,{format:wn,type:hn,depthTexture:new xi(f.textureWidth,f.textureHeight,Re,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let ee={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,t,ee),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new vn(d.framebufferWidth,d.framebufferHeight,{format:wn,type:hn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),oe.setContext(i),oe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function H(k){for(let J=0;J<k.removed.length;J++){let ee=k.removed[J],Re=w.indexOf(ee);Re>=0&&(w[Re]=null,T[Re].disconnect(ee))}for(let J=0;J<k.added.length;J++){let ee=k.added[J],Re=w.indexOf(ee);if(Re===-1){for(let Ue=0;Ue<T.length;Ue++)if(Ue>=w.length){w.push(ee),Re=Ue;break}else if(w[Ue]===null){w[Ue]=ee,Re=Ue;break}if(Re===-1)break}let Oe=T[Re];Oe&&Oe.connect(ee)}}let q=new L,K=new L;function ie(k,J,ee){q.setFromMatrixPosition(J.matrixWorld),K.setFromMatrixPosition(ee.matrixWorld);let Re=q.distanceTo(K),Oe=J.projectionMatrix.elements,Ue=ee.projectionMatrix.elements,St=Oe[14]/(Oe[10]-1),Ye=Oe[14]/(Oe[10]+1),at=(Oe[9]+1)/Oe[5],Je=(Oe[9]-1)/Oe[5],Ze=(Oe[8]-1)/Oe[0],Et=(Ue[8]+1)/Ue[0],It=St*Ze,Ot=St*Et,Vt=Re/(-Ze+Et),yt=Vt*-Ze;if(J.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(yt),k.translateZ(Vt),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),Oe[10]===-1)k.projectionMatrix.copy(J.projectionMatrix),k.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let Ct=St+Vt,U=Ye+Vt,an=It-yt,Qe=Ot+(Re-yt),P=at*Ye/U*Ct,v=Je*Ye/U*Ct;k.projectionMatrix.makePerspective(an,Qe,P,v,Ct,U),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function ne(k,J){J===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(J.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(i===null)return;let J=k.near,ee=k.far;m.texture!==null&&(m.depthNear>0&&(J=m.depthNear),m.depthFar>0&&(ee=m.depthFar)),I.near=R.near=S.near=J,I.far=R.far=S.far=ee,(F!==I.near||V!==I.far)&&(i.updateRenderState({depthNear:I.near,depthFar:I.far}),F=I.near,V=I.far),I.layers.mask=k.layers.mask|6,S.layers.mask=I.layers.mask&-5,R.layers.mask=I.layers.mask&-3;let Re=k.parent,Oe=I.cameras;ne(I,Re);for(let Ue=0;Ue<Oe.length;Ue++)ne(Oe[Ue],Re);Oe.length===2?ie(I,S,R):I.projectionMatrix.copy(S.projectionMatrix),re(k,I,Re)};function re(k,J,ee){ee===null?k.matrix.copy(J.matrixWorld):(k.matrix.copy(ee.matrixWorld),k.matrix.invert(),k.matrix.multiply(J.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(J.projectionMatrix),k.projectionMatrixInverse.copy(J.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=is*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(k){c=k,f!==null&&(f.fixedFoveation=k),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=k)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(k){return p[k]};let ye=null;function ve(k,J){if(u=J.getViewerPose(l||a),g=J,u!==null){let ee=u.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let Re=!1;ee.length!==I.cameras.length&&(I.cameras.length=0,Re=!0);for(let Ye=0;Ye<ee.length;Ye++){let at=ee[Ye],Je=null;if(d!==null)Je=d.getViewport(at);else{let Et=h.getViewSubImage(f,at);Je=Et.viewport,Ye===0&&(e.setRenderTargetTextures(y,Et.colorTexture,Et.depthStencilTexture),e.setRenderTarget(y))}let Ze=C[Ye];Ze===void 0&&(Ze=new xt,Ze.layers.enable(Ye),Ze.viewport=new tt,C[Ye]=Ze),Ze.matrix.fromArray(at.transform.matrix),Ze.matrix.decompose(Ze.position,Ze.quaternion,Ze.scale),Ze.projectionMatrix.fromArray(at.projectionMatrix),Ze.projectionMatrixInverse.copy(Ze.projectionMatrix).invert(),Ze.viewport.set(Je.x,Je.y,Je.width,Je.height),Ye===0&&(I.matrix.copy(Ze.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Re===!0&&I.cameras.push(Ze)}let Oe=i.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){h=n.getBinding();let Ye=h.getDepthInformation(ee[0]);Ye&&Ye.isValid&&Ye.texture&&m.init(Ye,i.renderState)}if(Oe&&Oe.includes("camera-access")&&_){e.state.unbindTexture(),h=n.getBinding();for(let Ye=0;Ye<ee.length;Ye++){let at=ee[Ye].camera;if(at){let Je=p[at];Je||(Je=new Rr,p[at]=Je);let Ze=h.getCameraImage(at);Je.sourceTexture=Ze}}}}for(let ee=0;ee<T.length;ee++){let Re=w[ee],Oe=T[ee];Re!==null&&Oe!==void 0&&Oe.update(Re,J,l||a)}ye&&ye(k,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}let oe=new wd;oe.setAnimationLoop(ve),this.setAnimationLoop=function(k){ye=k},this.dispose=function(){}}},ry=new Ee,Id=new ke;Id.set(-1,0,0,0,1,0,0,0,1);function ay(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,jc(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,b,M,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,b,M):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===qt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===qt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let b=e.get(p),M=b.envMap,y=b.envMapRotation;M&&(m.envMap.value=M,m.envMapRotation.value.setFromMatrix4(ry.makeRotationFromEuler(y)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Id),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,b,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=M*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===qt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function oy(s,e,t,n){let i={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,T){let w=T.program;n.uniformBlockBinding(y,w)}function l(y,T){let w=i[y.id];w===void 0&&(m(y),w=u(y),i[y.id]=w,y.addEventListener("dispose",b));let E=T.program;n.updateUBOMapping(y,E);let x=e.render.frame;r[y.id]!==x&&(f(y),r[y.id]=x)}function u(y){let T=h();y.__bindingPointIndex=T;let w=s.createBuffer(),E=y.__size,x=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,w),s.bufferData(s.UNIFORM_BUFFER,E,x),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,T,w),w}function h(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return De("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){let T=i[y.id],w=y.uniforms,E=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,T);for(let x=0,S=w.length;x<S;x++){let R=w[x];if(Array.isArray(R))for(let C=0,I=R.length;C<I;C++)d(R[C],x,C,E);else d(R,x,0,E)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(y,T,w,E){if(_(y,T,w,E)===!0){let x=y.__offset,S=y.value;if(Array.isArray(S)){let R=0;for(let C=0;C<S.length;C++){let I=S[C],F=p(I);g(I,y.__data,R),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(R+=F.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(S,y.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,x,y.__data)}}function g(y,T,w){typeof y=="number"||typeof y=="boolean"?T[0]=y:y.isMatrix3?(T[0]=y.elements[0],T[1]=y.elements[1],T[2]=y.elements[2],T[3]=0,T[4]=y.elements[3],T[5]=y.elements[4],T[6]=y.elements[5],T[7]=0,T[8]=y.elements[6],T[9]=y.elements[7],T[10]=y.elements[8],T[11]=0):ArrayBuffer.isView(y)?T.set(new y.constructor(y.buffer,y.byteOffset,T.length)):y.toArray(T,w)}function _(y,T,w,E){let x=y.value,S=T+"_"+w;if(E[S]===void 0)return typeof x=="number"||typeof x=="boolean"?E[S]=x:ArrayBuffer.isView(x)?E[S]=x.slice():E[S]=x.clone(),!0;{let R=E[S];if(typeof x=="number"||typeof x=="boolean"){if(R!==x)return E[S]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(R.equals(x)===!1)return R.copy(x),!0}}return!1}function m(y){let T=y.uniforms,w=0,E=16;for(let S=0,R=T.length;S<R;S++){let C=Array.isArray(T[S])?T[S]:[T[S]];for(let I=0,F=C.length;I<F;I++){let V=C[I],O=Array.isArray(V.value)?V.value:[V.value];for(let N=0,H=O.length;N<H;N++){let q=O[N],K=p(q),ie=w%E,ne=ie%K.boundary,re=ie+ne;w+=ne,re!==0&&E-re<K.storage&&(w+=E-re),V.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=w,w+=K.storage}}}let x=w%E;return x>0&&(w+=E-x),y.__size=w,y.__cache={},this}function p(y){let T={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(T.boundary=4,T.storage=4):y.isVector2?(T.boundary=8,T.storage=8):y.isVector3||y.isColor?(T.boundary=16,T.storage=12):y.isVector4?(T.boundary=16,T.storage=16):y.isMatrix3?(T.boundary=48,T.storage=48):y.isMatrix4?(T.boundary=64,T.storage=64):y.isTexture?Ae("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(T.boundary=16,T.storage=y.byteLength):Ae("WebGLRenderer: Unsupported uniform value type.",y),T}function b(y){let T=y.target;T.removeEventListener("dispose",b);let w=a.indexOf(T.__bindingPointIndex);a.splice(w,1),s.deleteBuffer(i[T.id]),delete i[T.id],delete r[T.id]}function M(){for(let y in i)s.deleteBuffer(i[y]);a=[],i={},r={}}return{bind:c,update:l,dispose:M}}var ly=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ri=null;function cy(){return ri===null&&(ri=new Di(ly,16,16,Vi,si),ri.name="DFG_LUT",ri.minFilter=mt,ri.magFilter=mt,ri.wrapS=Gt,ri.wrapT=Gt,ri.generateMipmaps=!1,ri.needsUpdate=!0),ri}var gl=class{constructor(e={}){let{canvas:t=Yh(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1,outputBufferType:d=hn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let _=d,m=new Set([Lo,Io,Po]),p=new Set([hn,Vn,$s,Qs,Eo,Co]),b=new Uint32Array(4),M=new Int32Array(4),y=new L,T=null,w=null,E=[],x=[],S=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,C=!1,I=null,F=null,V=null,O=null;this._outputColorSpace=Ke;let N=0,H=0,q=null,K=-1,ie=null,ne=new tt,re=new tt,ye=null,ve=new de(0),oe=0,k=t.width,J=t.height,ee=1,Re=null,Oe=null,Ue=new tt(0,0,k,J),St=new tt(0,0,k,J),Ye=!1,at=new Ws,Je=!1,Ze=!1,Et=new Ee,It=new L,Ot=new tt,Vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},yt=!1;function Ct(){return q===null?ee:1}let U=n;function an(A,B){return t.getContext(A,B)}try{let A={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",vt,!1),t.addEventListener("webglcontextrestored",ft,!1),t.addEventListener("webglcontextcreationerror",Gn,!1),U===null){let B="webgl2";if(U=an(B,A),U===null)throw an(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(A){throw De("WebGLRenderer: "+A.message),A}let Qe,P,v,z,X,Z,ae,ce,j,Q,ue,Pe,pe,fe,Ne,Fe,ze,D,le,$,he,_e,te;function Ce(){Qe=new g0(U),Qe.init(),he=new ny(U,Qe),P=new l0(U,Qe,e,he),v=new ey(U,Qe),P.reversedDepthBuffer&&f&&v.buffers.depth.setReversed(!0),F=U.createFramebuffer(),V=U.createFramebuffer(),O=U.createFramebuffer(),z=new y0(U),X=new z_,Z=new ty(U,Qe,v,X,P,he,z),ae=new m0(R),ce=new Mm(U),_e=new a0(U,ce),j=new x0(U,ce,z,_e),Q=new b0(U,j,ce,_e,z),D=new v0(U,P,Z),Ne=new c0(X),ue=new k_(R,ae,Qe,P,_e,Ne),Pe=new ay(R,X),pe=new V_,fe=new K_(Qe),ze=new r0(R,ae,v,Q,g,c),Fe=new Q_(R,Q,P),te=new oy(U,z,P,v),le=new o0(U,Qe,z),$=new _0(U,Qe,z),z.programs=ue.programs,R.capabilities=P,R.extensions=Qe,R.properties=X,R.renderLists=pe,R.shadowMap=Fe,R.state=v,R.info=z}Ce(),_!==hn&&(S=new M0(_,t.width,t.height,o,i,r));let Me=new yu(R,U);this.xr=Me,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let A=Qe.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=Qe.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(A){A!==void 0&&(ee=A,this.setSize(k,J,!1))},this.getSize=function(A){return A.set(k,J)},this.setSize=function(A,B,Y=!0){if(Me.isPresenting){Ae("WebGLRenderer: Can't change size while VR device is presenting.");return}k=A,J=B,t.width=Math.floor(A*ee),t.height=Math.floor(B*ee),Y===!0&&(t.style.width=A+"px",t.style.height=B+"px"),S!==null&&S.setSize(t.width,t.height),this.setViewport(0,0,A,B)},this.getDrawingBufferSize=function(A){return A.set(k*ee,J*ee).floor()},this.setDrawingBufferSize=function(A,B,Y){k=A,J=B,ee=Y,t.width=Math.floor(A*Y),t.height=Math.floor(B*Y),this.setViewport(0,0,A,B)},this.setEffects=function(A){if(_===hn){De("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let B=0;B<A.length;B++)if(A[B].isOutputPass===!0){Ae("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(ne)},this.getViewport=function(A){return A.copy(Ue)},this.setViewport=function(A,B,Y,G){A.isVector4?Ue.set(A.x,A.y,A.z,A.w):Ue.set(A,B,Y,G),v.viewport(ne.copy(Ue).multiplyScalar(ee).round())},this.getScissor=function(A){return A.copy(St)},this.setScissor=function(A,B,Y,G){A.isVector4?St.set(A.x,A.y,A.z,A.w):St.set(A,B,Y,G),v.scissor(re.copy(St).multiplyScalar(ee).round())},this.getScissorTest=function(){return Ye},this.setScissorTest=function(A){v.setScissorTest(Ye=A)},this.setOpaqueSort=function(A){Re=A},this.setTransparentSort=function(A){Oe=A},this.getClearColor=function(A){return A.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor(...arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha(...arguments)},this.clear=function(A=!0,B=!0,Y=!0){let G=0;if(A){let W=!1;if(q!==null){let xe=q.texture.format;W=m.has(xe)}if(W){let xe=q.texture.type,Se=p.has(xe),ge=ze.getClearColor(),we=ze.getClearAlpha(),Ie=ge.r,He=ge.g,We=ge.b;Se?(b[0]=Ie,b[1]=He,b[2]=We,b[3]=we,U.clearBufferuiv(U.COLOR,0,b)):(M[0]=Ie,M[1]=He,M[2]=We,M[3]=we,U.clearBufferiv(U.COLOR,0,M))}else G|=U.COLOR_BUFFER_BIT}B&&(G|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(G|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&U.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),I=A},this.dispose=function(){t.removeEventListener("webglcontextlost",vt,!1),t.removeEventListener("webglcontextrestored",ft,!1),t.removeEventListener("webglcontextcreationerror",Gn,!1),ze.dispose(),pe.dispose(),fe.dispose(),X.dispose(),ae.dispose(),Q.dispose(),_e.dispose(),te.dispose(),ue.dispose(),Me.dispose(),Me.removeEventListener("sessionstart",vf),Me.removeEventListener("sessionend",bf),Yi.stop()};function vt(A){A.preventDefault(),vr("WebGLRenderer: Context Lost."),C=!0}function ft(){vr("WebGLRenderer: Context Restored."),C=!1;let A=z.autoReset,B=Fe.enabled,Y=Fe.autoUpdate,G=Fe.needsUpdate,W=Fe.type;Ce(),z.autoReset=A,Fe.enabled=B,Fe.autoUpdate=Y,Fe.needsUpdate=G,Fe.type=W}function Gn(A){De("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Wn(A){let B=A.target;B.removeEventListener("dispose",Wn),Jd(B)}function Jd(A){$d(A),X.remove(A)}function $d(A){let B=X.get(A).programs;B!==void 0&&(B.forEach(function(Y){ue.releaseProgram(Y)}),A.isShaderMaterial&&ue.releaseShaderCache(A))}this.renderBufferDirect=function(A,B,Y,G,W,xe){B===null&&(B=Vt);let Se=W.isMesh&&W.matrixWorld.determinantAffine()<0,ge=tp(A,B,Y,G,W);v.setMaterial(G,Se);let we=Y.index,Ie=1;if(G.wireframe===!0){if(we=j.getWireframeAttribute(Y),we===void 0)return;Ie=2}let He=Y.drawRange,We=Y.attributes.position,Le=He.start*Ie,nt=(He.start+He.count)*Ie;xe!==null&&(Le=Math.max(Le,xe.start*Ie),nt=Math.min(nt,(xe.start+xe.count)*Ie)),we!==null?(Le=Math.max(Le,0),nt=Math.min(nt,we.count)):We!=null&&(Le=Math.max(Le,0),nt=Math.min(nt,We.count));let Mt=nt-Le;if(Mt<0||Mt===1/0)return;_e.setup(W,G,ge,Y,we);let bt,ot=le;if(we!==null&&(bt=ce.get(we),ot=$,ot.setIndex(bt)),W.isMesh)G.wireframe===!0?(v.setLineWidth(G.wireframeLinewidth*Ct()),ot.setMode(U.LINES)):ot.setMode(U.TRIANGLES);else if(W.isLine){let Yt=G.linewidth;Yt===void 0&&(Yt=1),v.setLineWidth(Yt*Ct()),W.isLineSegments?ot.setMode(U.LINES):W.isLineLoop?ot.setMode(U.LINE_LOOP):ot.setMode(U.LINE_STRIP)}else W.isPoints?ot.setMode(U.POINTS):W.isSprite&&ot.setMode(U.TRIANGLES);if(W.isBatchedMesh)if(Qe.get("WEBGL_multi_draw"))ot.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let Yt=W._multiDrawStarts,be=W._multiDrawCounts,mn=W._multiDrawCount,je=we?ce.get(we).bytesPerElement:1,An=X.get(G).currentProgram.getUniforms();for(let Xn=0;Xn<mn;Xn++)An.setValue(U,"_gl_DrawID",Xn),ot.render(Yt[Xn]/je,be[Xn])}else if(W.isInstancedMesh)ot.renderInstances(Le,Mt,W.count);else if(Y.isInstancedBufferGeometry){let Yt=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,be=Math.min(Y.instanceCount,Yt);ot.renderInstances(Le,Mt,be)}else ot.render(Le,Mt)};function yf(A,B,Y){A.transparent===!0&&A.side===un&&A.forceSinglePass===!1?(A.side=qt,A.needsUpdate=!0,pa(A,B,Y),A.side=_n,A.needsUpdate=!0,pa(A,B,Y),A.side=un):pa(A,B,Y)}this.compile=function(A,B,Y=null){Y===null&&(Y=A),w=fe.get(Y),w.init(B),x.push(w),Y.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(w.pushLight(W),W.castShadow&&w.pushShadow(W))}),A!==Y&&A.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(w.pushLight(W),W.castShadow&&w.pushShadow(W))}),w.setupLights();let G=new Set;return A.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let xe=W.material;if(xe)if(Array.isArray(xe))for(let Se=0;Se<xe.length;Se++){let ge=xe[Se];yf(ge,Y,W),G.add(ge)}else yf(xe,Y,W),G.add(xe)}),w=x.pop(),G},this.compileAsync=function(A,B,Y=null){let G=this.compile(A,B,Y);return new Promise(W=>{function xe(){if(G.forEach(function(Se){X.get(Se).currentProgram.isReady()&&G.delete(Se)}),G.size===0){W(A);return}setTimeout(xe,10)}Qe.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let kl=null;function Qd(A){kl&&kl(A)}function vf(){Yi.stop()}function bf(){Yi.start()}let Yi=new wd;Yi.setAnimationLoop(Qd),typeof self<"u"&&Yi.setContext(self),this.setAnimationLoop=function(A){kl=A,Me.setAnimationLoop(A),A===null?Yi.stop():Yi.start()},Me.addEventListener("sessionstart",vf),Me.addEventListener("sessionend",bf),this.render=function(A,B){if(B!==void 0&&B.isCamera!==!0){De("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;I!==null&&I.renderStart(A,B);let Y=Me.enabled===!0&&Me.isPresenting===!0,G=S!==null&&(q===null||Y)&&S.begin(R,q);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Me.enabled===!0&&Me.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(Me.cameraAutoUpdate===!0&&Me.updateCamera(B),B=Me.getCamera()),A.isScene===!0&&A.onBeforeRender(R,A,B,q),w=fe.get(A,x.length),w.init(B),w.state.textureUnits=Z.getTextureUnits(),x.push(w),Et.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),at.setFromProjectionMatrix(Et,On,B.reversedDepth),Ze=this.localClippingEnabled,Je=Ne.init(this.clippingPlanes,Ze),T=pe.get(A,E.length),T.init(),E.push(T),Me.enabled===!0&&Me.isPresenting===!0){let Se=R.xr.getDepthSensingMesh();Se!==null&&zl(Se,B,-1/0,R.sortObjects)}zl(A,B,0,R.sortObjects),T.finish(),R.sortObjects===!0&&T.sort(Re,Oe,B.reversedDepth),yt=Me.enabled===!1||Me.isPresenting===!1||Me.hasDepthSensing()===!1,yt&&ze.addToRenderList(T,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Je===!0&&Ne.beginShadows();let W=w.state.shadowsArray;if(Fe.render(W,A,B),Je===!0&&Ne.endShadows(),(G&&S.hasRenderPass())===!1){let Se=T.opaque,ge=T.transmissive;if(w.setupLights(),B.isArrayCamera){let we=B.cameras;if(ge.length>0)for(let Ie=0,He=we.length;Ie<He;Ie++){let We=we[Ie];Mf(Se,ge,A,We)}yt&&ze.render(A);for(let Ie=0,He=we.length;Ie<He;Ie++){let We=we[Ie];Sf(T,A,We,We.viewport)}}else ge.length>0&&Mf(Se,ge,A,B),yt&&ze.render(A),Sf(T,A,B)}q!==null&&H===0&&(Z.updateMultisampleRenderTarget(q),Z.updateRenderTargetMipmap(q)),G&&S.end(R),A.isScene===!0&&A.onAfterRender(R,A,B),_e.resetDefaultState(),K=-1,ie=null,x.pop(),x.length>0?(w=x[x.length-1],Z.setTextureUnits(w.state.textureUnits),Je===!0&&Ne.setGlobalState(R.clippingPlanes,w.state.camera)):w=null,E.pop(),E.length>0?T=E[E.length-1]:T=null,I!==null&&I.renderEnd()};function zl(A,B,Y,G){if(A.visible===!1)return;if(A.layers.test(B.layers)){if(A.isGroup)Y=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(B);else if(A.isLightProbeGrid)w.pushLightProbeGrid(A);else if(A.isLight)w.pushLight(A),A.castShadow&&w.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||at.intersectsSprite(A)){G&&Ot.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Et);let Se=Q.update(A),ge=A.material;ge.visible&&T.push(A,Se,ge,Y,Ot.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||at.intersectsObject(A))){let Se=Q.update(A),ge=A.material;if(G&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ot.copy(A.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),Ot.copy(Se.boundingSphere.center)),Ot.applyMatrix4(A.matrixWorld).applyMatrix4(Et)),Array.isArray(ge)){let we=Se.groups;for(let Ie=0,He=we.length;Ie<He;Ie++){let We=we[Ie],Le=ge[We.materialIndex];Le&&Le.visible&&T.push(A,Se,Le,Y,Ot.z,We)}}else ge.visible&&T.push(A,Se,ge,Y,Ot.z,null)}}let xe=A.children;for(let Se=0,ge=xe.length;Se<ge;Se++)zl(xe[Se],B,Y,G)}function Sf(A,B,Y,G){let{opaque:W,transmissive:xe,transparent:Se}=A;w.setupLightsView(Y),Je===!0&&Ne.setGlobalState(R.clippingPlanes,Y),G&&v.viewport(ne.copy(G)),W.length>0&&da(W,B,Y),xe.length>0&&da(xe,B,Y),Se.length>0&&da(Se,B,Y),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Mf(A,B,Y,G){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[G.id]===void 0){let Le=Qe.has("EXT_color_buffer_half_float")||Qe.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[G.id]=new vn(1,1,{generateMipmaps:!0,type:Le?si:hn,minFilter:fn,samples:Math.max(4,P.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Be.workingColorSpace})}let xe=w.state.transmissionRenderTarget[G.id],Se=G.viewport||ne;xe.setSize(Se.z*R.transmissionResolutionScale,Se.w*R.transmissionResolutionScale);let ge=R.getRenderTarget(),we=R.getActiveCubeFace(),Ie=R.getActiveMipmapLevel();R.setRenderTarget(xe),R.getClearColor(ve),oe=R.getClearAlpha(),oe<1&&R.setClearColor(16777215,.5),R.clear(),yt&&ze.render(Y);let He=R.toneMapping;R.toneMapping=Hn;let We=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),w.setupLightsView(G),Je===!0&&Ne.setGlobalState(R.clippingPlanes,G),da(A,Y,G),Z.updateMultisampleRenderTarget(xe),Z.updateRenderTargetMipmap(xe),Qe.has("WEBGL_multisampled_render_to_texture")===!1){let Le=!1;for(let nt=0,Mt=B.length;nt<Mt;nt++){let bt=B[nt],{object:ot,geometry:Yt,material:be,group:mn}=bt;if(be.side===un&&ot.layers.test(G.layers)){let je=be.side;be.side=qt,be.needsUpdate=!0,Tf(ot,Y,G,Yt,be,mn),be.side=je,be.needsUpdate=!0,Le=!0}}Le===!0&&(Z.updateMultisampleRenderTarget(xe),Z.updateRenderTargetMipmap(xe))}R.setRenderTarget(ge,we,Ie),R.setClearColor(ve,oe),We!==void 0&&(G.viewport=We),R.toneMapping=He}function da(A,B,Y){let G=B.isScene===!0?B.overrideMaterial:null;for(let W=0,xe=A.length;W<xe;W++){let Se=A[W],{object:ge,geometry:we,group:Ie}=Se,He=Se.material;He.allowOverride===!0&&G!==null&&(He=G),ge.layers.test(Y.layers)&&Tf(ge,B,Y,we,He,Ie)}}function Tf(A,B,Y,G,W,xe){A.onBeforeRender(R,B,Y,G,W,xe),A.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),W.onBeforeRender(R,B,Y,G,A,xe),W.transparent===!0&&W.side===un&&W.forceSinglePass===!1?(W.side=qt,W.needsUpdate=!0,R.renderBufferDirect(Y,B,G,W,A,xe),W.side=_n,W.needsUpdate=!0,R.renderBufferDirect(Y,B,G,W,A,xe),W.side=un):R.renderBufferDirect(Y,B,G,W,A,xe),A.onAfterRender(R,B,Y,G,W,xe)}function pa(A,B,Y){B.isScene!==!0&&(B=Vt);let G=X.get(A),W=w.state.lights,xe=w.state.shadowsArray,Se=W.state.version,ge=ue.getParameters(A,W.state,xe,B,Y,w.state.lightProbeGridArray),we=ue.getProgramCacheKey(ge),Ie=G.programs;G.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?B.environment:null,G.fog=B.fog;let He=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;G.envMap=ae.get(A.envMap||G.environment,He),G.envMapRotation=G.environment!==null&&A.envMap===null?B.environmentRotation:A.envMapRotation,Ie===void 0&&(A.addEventListener("dispose",Wn),Ie=new Map,G.programs=Ie);let We=Ie.get(we);if(We!==void 0){if(G.currentProgram===We&&G.lightsStateVersion===Se)return Af(A,ge),We}else ge.uniforms=ue.getUniforms(A),I!==null&&A.isNodeMaterial&&I.build(A,Y,ge),A.onBeforeCompile(ge,R),We=ue.acquireProgram(ge,we),Ie.set(we,We),G.uniforms=ge.uniforms;let Le=G.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Le.clippingPlanes=Ne.uniform),Af(A,ge),G.needsLights=ip(A),G.lightsStateVersion=Se,G.needsLights&&(Le.ambientLightColor.value=W.state.ambient,Le.lightProbe.value=W.state.probe,Le.directionalLights.value=W.state.directional,Le.directionalLightShadows.value=W.state.directionalShadow,Le.spotLights.value=W.state.spot,Le.spotLightShadows.value=W.state.spotShadow,Le.rectAreaLights.value=W.state.rectArea,Le.ltc_1.value=W.state.rectAreaLTC1,Le.ltc_2.value=W.state.rectAreaLTC2,Le.pointLights.value=W.state.point,Le.pointLightShadows.value=W.state.pointShadow,Le.hemisphereLights.value=W.state.hemi,Le.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Le.spotLightMatrix.value=W.state.spotLightMatrix,Le.spotLightMap.value=W.state.spotLightMap,Le.pointShadowMatrix.value=W.state.pointShadowMatrix),G.lightProbeGrid=w.state.lightProbeGridArray.length>0,G.currentProgram=We,G.uniformsList=null,We}function wf(A){if(A.uniformsList===null){let B=A.currentProgram.getUniforms();A.uniformsList=ir.seqWithValue(B.seq,A.uniforms)}return A.uniformsList}function Af(A,B){let Y=X.get(A);Y.outputColorSpace=B.outputColorSpace,Y.batching=B.batching,Y.batchingColor=B.batchingColor,Y.instancing=B.instancing,Y.instancingColor=B.instancingColor,Y.instancingMorph=B.instancingMorph,Y.skinning=B.skinning,Y.morphTargets=B.morphTargets,Y.morphNormals=B.morphNormals,Y.morphColors=B.morphColors,Y.morphTargetsCount=B.morphTargetsCount,Y.numClippingPlanes=B.numClippingPlanes,Y.numIntersection=B.numClipIntersection,Y.vertexAlphas=B.vertexAlphas,Y.vertexTangents=B.vertexTangents,Y.toneMapping=B.toneMapping}function ep(A,B){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;y.setFromMatrixPosition(B.matrixWorld);for(let Y=0,G=A.length;Y<G;Y++){let W=A[Y];if(W.texture!==null&&W.boundingBox.containsPoint(y))return W}return null}function tp(A,B,Y,G,W){B.isScene!==!0&&(B=Vt),Z.resetTextureUnits();let xe=B.fog,Se=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?B.environment:null,ge=q===null?R.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:Be.workingColorSpace,we=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Ie=ae.get(G.envMap||Se,we),He=G.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,We=!!Y.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Le=!!Y.morphAttributes.position,nt=!!Y.morphAttributes.normal,Mt=!!Y.morphAttributes.color,bt=Hn;G.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(bt=R.toneMapping);let ot=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Yt=ot!==void 0?ot.length:0,be=X.get(G),mn=w.state.lights;if(Je===!0&&(Ze===!0||A!==ie)){let ht=A===ie&&G.id===K;Ne.setState(G,A,ht)}let je=!1;G.version===be.__version?(be.needsLights&&be.lightsStateVersion!==mn.state.version||be.outputColorSpace!==ge||W.isBatchedMesh&&be.batching===!1||!W.isBatchedMesh&&be.batching===!0||W.isBatchedMesh&&be.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&be.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&be.instancing===!1||!W.isInstancedMesh&&be.instancing===!0||W.isSkinnedMesh&&be.skinning===!1||!W.isSkinnedMesh&&be.skinning===!0||W.isInstancedMesh&&be.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&be.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&be.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&be.instancingMorph===!1&&W.morphTexture!==null||be.envMap!==Ie||G.fog===!0&&be.fog!==xe||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==Ne.numPlanes||be.numIntersection!==Ne.numIntersection)||be.vertexAlphas!==He||be.vertexTangents!==We||be.morphTargets!==Le||be.morphNormals!==nt||be.morphColors!==Mt||be.toneMapping!==bt||be.morphTargetsCount!==Yt||!!be.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(je=!0):(je=!0,be.__version=G.version);let An=be.currentProgram;je===!0&&(An=pa(G,B,W),I&&G.isNodeMaterial&&I.onUpdateProgram(G,An,be));let Xn=!1,Mi=!1,xs=!1,lt=An.getUniforms(),Tt=be.uniforms;if(v.useProgram(An.program)&&(Xn=!0,Mi=!0,xs=!0),G.id!==K&&(K=G.id,Mi=!0),be.needsLights){let ht=ep(w.state.lightProbeGridArray,W);be.lightProbeGrid!==ht&&(be.lightProbeGrid=ht,Mi=!0)}if(Xn||ie!==A){v.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),lt.setValue(U,"projectionMatrix",A.projectionMatrix),lt.setValue(U,"viewMatrix",A.matrixWorldInverse);let wi=lt.map.cameraPosition;wi!==void 0&&wi.setValue(U,It.setFromMatrixPosition(A.matrixWorld)),P.logarithmicDepthBuffer&&lt.setValue(U,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&lt.setValue(U,"isOrthographic",A.isOrthographicCamera===!0),ie!==A&&(ie=A,Mi=!0,xs=!0)}if(be.needsLights&&(mn.state.directionalShadowMap.length>0&&lt.setValue(U,"directionalShadowMap",mn.state.directionalShadowMap,Z),mn.state.spotShadowMap.length>0&&lt.setValue(U,"spotShadowMap",mn.state.spotShadowMap,Z),mn.state.pointShadowMap.length>0&&lt.setValue(U,"pointShadowMap",mn.state.pointShadowMap,Z)),W.isSkinnedMesh){lt.setOptional(U,W,"bindMatrix"),lt.setOptional(U,W,"bindMatrixInverse");let ht=W.skeleton;ht&&(ht.boneTexture===null&&ht.computeBoneTexture(),lt.setValue(U,"boneTexture",ht.boneTexture,Z))}W.isBatchedMesh&&(lt.setOptional(U,W,"batchingTexture"),lt.setValue(U,"batchingTexture",W._matricesTexture,Z),lt.setOptional(U,W,"batchingIdTexture"),lt.setValue(U,"batchingIdTexture",W._indirectTexture,Z),lt.setOptional(U,W,"batchingColorTexture"),W._colorsTexture!==null&&lt.setValue(U,"batchingColorTexture",W._colorsTexture,Z));let Ti=Y.morphAttributes;if((Ti.position!==void 0||Ti.normal!==void 0||Ti.color!==void 0)&&D.update(W,Y,An),(Mi||be.receiveShadow!==W.receiveShadow)&&(be.receiveShadow=W.receiveShadow,lt.setValue(U,"receiveShadow",W.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&B.environment!==null&&(Tt.envMapIntensity.value=B.environmentIntensity),Tt.dfgLUT!==void 0&&(Tt.dfgLUT.value=cy()),Mi){if(lt.setValue(U,"toneMappingExposure",R.toneMappingExposure),be.needsLights&&np(Tt,xs),xe&&G.fog===!0&&Pe.refreshFogUniforms(Tt,xe),Pe.refreshMaterialUniforms(Tt,G,ee,J,w.state.transmissionRenderTarget[A.id]),be.needsLights&&be.lightProbeGrid){let ht=be.lightProbeGrid;Tt.probesSH.value=ht.texture,Tt.probesMin.value.copy(ht.boundingBox.min),Tt.probesMax.value.copy(ht.boundingBox.max),Tt.probesResolution.value.copy(ht.resolution)}ir.upload(U,wf(be),Tt,Z)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(ir.upload(U,wf(be),Tt,Z),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&lt.setValue(U,"center",W.center),lt.setValue(U,"modelViewMatrix",W.modelViewMatrix),lt.setValue(U,"normalMatrix",W.normalMatrix),lt.setValue(U,"modelMatrix",W.matrixWorld),G.uniformsGroups!==void 0){let ht=G.uniformsGroups;for(let wi=0,_s=ht.length;wi<_s;wi++){let Ef=ht[wi];te.update(Ef,An),te.bind(Ef,An)}}return An}function np(A,B){A.ambientLightColor.needsUpdate=B,A.lightProbe.needsUpdate=B,A.directionalLights.needsUpdate=B,A.directionalLightShadows.needsUpdate=B,A.pointLights.needsUpdate=B,A.pointLightShadows.needsUpdate=B,A.spotLights.needsUpdate=B,A.spotLightShadows.needsUpdate=B,A.rectAreaLights.needsUpdate=B,A.hemisphereLights.needsUpdate=B}function ip(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return q},this.setRenderTargetTextures=function(A,B,Y){let G=X.get(A);G.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),X.get(A.texture).__webglTexture=B,X.get(A.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:Y,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,B){let Y=X.get(A);Y.__webglFramebuffer=B,Y.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(A,B=0,Y=0){q=A,N=B,H=Y;let G=null,W=!1,xe=!1;if(A){let ge=X.get(A);if(ge.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(U.FRAMEBUFFER,ge.__webglFramebuffer),ne.copy(A.viewport),re.copy(A.scissor),ye=A.scissorTest,v.viewport(ne),v.scissor(re),v.setScissorTest(ye),K=-1;return}else if(ge.__webglFramebuffer===void 0)Z.setupRenderTarget(A);else if(ge.__hasExternalTextures)Z.rebindTextures(A,X.get(A.texture).__webglTexture,X.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let He=A.depthTexture;if(ge.__boundDepthTexture!==He){if(He!==null&&X.has(He)&&(A.width!==He.image.width||A.height!==He.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(A)}}let we=A.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(xe=!0);let Ie=X.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ie[B])?G=Ie[B][Y]:G=Ie[B],W=!0):A.samples>0&&Z.useMultisampledRTT(A)===!1?G=X.get(A).__webglMultisampledFramebuffer:Array.isArray(Ie)?G=Ie[Y]:G=Ie,ne.copy(A.viewport),re.copy(A.scissor),ye=A.scissorTest}else ne.copy(Ue).multiplyScalar(ee).floor(),re.copy(St).multiplyScalar(ee).floor(),ye=Ye;if(Y!==0&&(G=F),v.bindFramebuffer(U.FRAMEBUFFER,G)&&v.drawBuffers(A,G),v.viewport(ne),v.scissor(re),v.setScissorTest(ye),W){let ge=X.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+B,ge.__webglTexture,Y)}else if(xe){let ge=B;for(let we=0;we<A.textures.length;we++){let Ie=X.get(A.textures[we]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+we,Ie.__webglTexture,Y,ge)}}else if(A!==null&&Y!==0){let ge=X.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ge.__webglTexture,Y)}K=-1},this.readRenderTargetPixels=function(A,B,Y,G,W,xe,Se,ge=0){if(!(A&&A.isWebGLRenderTarget)){De("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=X.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Se!==void 0&&(we=we[Se]),we){v.bindFramebuffer(U.FRAMEBUFFER,we);try{let Ie=A.textures[ge],He=Ie.format,We=Ie.type;if(A.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ge),!P.textureFormatReadable(He)){De("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!P.textureTypeReadable(We)){De("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=A.width-G&&Y>=0&&Y<=A.height-W&&U.readPixels(B,Y,G,W,he.convert(He),he.convert(We),xe)}finally{let Ie=q!==null?X.get(q).__webglFramebuffer:null;v.bindFramebuffer(U.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(A,B,Y,G,W,xe,Se,ge=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=X.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Se!==void 0&&(we=we[Se]),we)if(B>=0&&B<=A.width-G&&Y>=0&&Y<=A.height-W){v.bindFramebuffer(U.FRAMEBUFFER,we);let Ie=A.textures[ge],He=Ie.format,We=Ie.type;if(A.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ge),!P.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!P.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Le=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Le),U.bufferData(U.PIXEL_PACK_BUFFER,xe.byteLength,U.STREAM_READ),U.readPixels(B,Y,G,W,he.convert(He),he.convert(We),0);let nt=q!==null?X.get(q).__webglFramebuffer:null;v.bindFramebuffer(U.FRAMEBUFFER,nt);let Mt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Zh(U,Mt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Le),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,xe),U.deleteBuffer(Le),U.deleteSync(Mt),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,B=null,Y=0){let G=Math.pow(2,-Y),W=Math.floor(A.image.width*G),xe=Math.floor(A.image.height*G),Se=B!==null?B.x:0,ge=B!==null?B.y:0;Z.setTexture2D(A,0),U.copyTexSubImage2D(U.TEXTURE_2D,Y,0,0,Se,ge,W,xe),v.unbindTexture()},this.copyTextureToTexture=function(A,B,Y=null,G=null,W=0,xe=0){let Se,ge,we,Ie,He,We,Le,nt,Mt,bt=A.isCompressedTexture?A.mipmaps[xe]:A.image;if(Y!==null)Se=Y.max.x-Y.min.x,ge=Y.max.y-Y.min.y,we=Y.isBox3?Y.max.z-Y.min.z:1,Ie=Y.min.x,He=Y.min.y,We=Y.isBox3?Y.min.z:0;else{let Tt=Math.pow(2,-W);Se=Math.floor(bt.width*Tt),ge=Math.floor(bt.height*Tt),A.isDataArrayTexture?we=bt.depth:A.isData3DTexture?we=Math.floor(bt.depth*Tt):we=1,Ie=0,He=0,We=0}G!==null?(Le=G.x,nt=G.y,Mt=G.z):(Le=0,nt=0,Mt=0);let ot=he.convert(B.format),Yt=he.convert(B.type),be;B.isData3DTexture?(Z.setTexture3D(B,0),be=U.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Z.setTexture2DArray(B,0),be=U.TEXTURE_2D_ARRAY):(Z.setTexture2D(B,0),be=U.TEXTURE_2D),v.activeTexture(U.TEXTURE0),v.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,B.flipY),v.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),v.pixelStorei(U.UNPACK_ALIGNMENT,B.unpackAlignment);let mn=v.getParameter(U.UNPACK_ROW_LENGTH),je=v.getParameter(U.UNPACK_IMAGE_HEIGHT),An=v.getParameter(U.UNPACK_SKIP_PIXELS),Xn=v.getParameter(U.UNPACK_SKIP_ROWS),Mi=v.getParameter(U.UNPACK_SKIP_IMAGES);v.pixelStorei(U.UNPACK_ROW_LENGTH,bt.width),v.pixelStorei(U.UNPACK_IMAGE_HEIGHT,bt.height),v.pixelStorei(U.UNPACK_SKIP_PIXELS,Ie),v.pixelStorei(U.UNPACK_SKIP_ROWS,He),v.pixelStorei(U.UNPACK_SKIP_IMAGES,We);let xs=A.isDataArrayTexture||A.isData3DTexture,lt=B.isDataArrayTexture||B.isData3DTexture;if(A.isDepthTexture){let Tt=X.get(A),Ti=X.get(B),ht=X.get(Tt.__renderTarget),wi=X.get(Ti.__renderTarget);v.bindFramebuffer(U.READ_FRAMEBUFFER,ht.__webglFramebuffer),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,wi.__webglFramebuffer);for(let _s=0;_s<we;_s++)xs&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,X.get(A).__webglTexture,W,We+_s),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,X.get(B).__webglTexture,xe,Mt+_s)),U.blitFramebuffer(Ie,He,Se,ge,Le,nt,Se,ge,U.DEPTH_BUFFER_BIT,U.NEAREST);v.bindFramebuffer(U.READ_FRAMEBUFFER,null),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(W!==0||A.isRenderTargetTexture||X.has(A)){let Tt=X.get(A),Ti=X.get(B);v.bindFramebuffer(U.READ_FRAMEBUFFER,V),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,O);for(let ht=0;ht<we;ht++)xs?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Tt.__webglTexture,W,We+ht):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Tt.__webglTexture,W),lt?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ti.__webglTexture,xe,Mt+ht):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ti.__webglTexture,xe),W!==0?U.blitFramebuffer(Ie,He,Se,ge,Le,nt,Se,ge,U.COLOR_BUFFER_BIT,U.NEAREST):lt?U.copyTexSubImage3D(be,xe,Le,nt,Mt+ht,Ie,He,Se,ge):U.copyTexSubImage2D(be,xe,Le,nt,Ie,He,Se,ge);v.bindFramebuffer(U.READ_FRAMEBUFFER,null),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else lt?A.isDataTexture||A.isData3DTexture?U.texSubImage3D(be,xe,Le,nt,Mt,Se,ge,we,ot,Yt,bt.data):B.isCompressedArrayTexture?U.compressedTexSubImage3D(be,xe,Le,nt,Mt,Se,ge,we,ot,bt.data):U.texSubImage3D(be,xe,Le,nt,Mt,Se,ge,we,ot,Yt,bt):A.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,xe,Le,nt,Se,ge,ot,Yt,bt.data):A.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,xe,Le,nt,bt.width,bt.height,ot,bt.data):U.texSubImage2D(U.TEXTURE_2D,xe,Le,nt,Se,ge,ot,Yt,bt);v.pixelStorei(U.UNPACK_ROW_LENGTH,mn),v.pixelStorei(U.UNPACK_IMAGE_HEIGHT,je),v.pixelStorei(U.UNPACK_SKIP_PIXELS,An),v.pixelStorei(U.UNPACK_SKIP_ROWS,Xn),v.pixelStorei(U.UNPACK_SKIP_IMAGES,Mi),xe===0&&B.generateMipmaps&&U.generateMipmap(be),v.unbindTexture()},this.initRenderTarget=function(A){X.get(A).__webglFramebuffer===void 0&&Z.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?Z.setTextureCube(A,0):A.isData3DTexture?Z.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?Z.setTexture2DArray(A,0):Z.setTexture2D(A,0),v.unbindTexture()},this.resetState=function(){N=0,H=0,q=null,v.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Be._getDrawingBufferColorSpace(e),t.unpackColorSpace=Be._getUnpackColorSpace()}};var Nd={type:"change"},bu={type:"start"},Ud={type:"end"},yl=new Zn,Dd=new Cn,uy=Math.cos(70*$t.DEG2RAD),Ut=new L,dn=2*Math.PI,rt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},vu=1e-6,vl=class extends Xr{constructor(e,t=null){super(e,t),this.state=rt.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Bi.ROTATE,MIDDLE:Bi.DOLLY,RIGHT:Bi.PAN},this.touches={ONE:ki.ROTATE,TWO:ki.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new ut,this._lastTargetPosition=new L,this._quat=new ut().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Zs,this._sphericalDelta=new Zs,this._scale=1,this._panOffset=new L,this._rotateStart=new Te,this._rotateEnd=new Te,this._rotateDelta=new Te,this._panStart=new Te,this._panEnd=new Te,this._panDelta=new Te,this._dollyStart=new Te,this._dollyEnd=new Te,this._dollyDelta=new Te,this._dollyDirection=new L,this._mouse=new Te,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=hy.bind(this),this._onPointerDown=fy.bind(this),this._onPointerUp=dy.bind(this),this._onContextMenu=vy.bind(this),this._onMouseWheel=gy.bind(this),this._onKeyDown=xy.bind(this),this._onTouchStart=_y.bind(this),this._onTouchMove=yy.bind(this),this._onMouseDown=py.bind(this),this._onMouseMove=my.bind(this),this._interceptControlDown=by.bind(this),this._interceptControlUp=Sy.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Nd),this.update(),this.state=rt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Ut.copy(t).sub(this.target),Ut.applyQuaternion(this._quat),this._spherical.setFromVector3(Ut),this.autoRotate&&this.state===rt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=dn:n>Math.PI&&(n-=dn),i<-Math.PI?i+=dn:i>Math.PI&&(i-=dn),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ut.setFromSpherical(this._spherical),Ut.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ut),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Ut.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new L(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Ut.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(yl.origin.copy(this.object.position),yl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(yl.direction))<uy?this.object.lookAt(this.target):(Dd.setFromNormalAndCoplanarPoint(this.object.up,this.target),yl.intersectPlane(Dd,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>vu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>vu||this._lastTargetPosition.distanceToSquared(this.target)>vu?(this.dispatchEvent(Nd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?dn/60*this.autoRotateSpeed*e:dn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ut.setFromMatrixColumn(t,0),Ut.multiplyScalar(-e),this._panOffset.add(Ut)}_panUp(e,t){this.screenSpacePanning===!0?Ut.setFromMatrixColumn(t,1):(Ut.setFromMatrixColumn(t,0),Ut.crossVectors(this.object.up,Ut)),Ut.multiplyScalar(e),this._panOffset.add(Ut)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let i=this.object.position;Ut.copy(i).sub(this.target);let r=Ut.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),i=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=i/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(dn*this._rotateDelta.x/t.clientHeight),this._rotateUp(dn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(dn*this._rotateDelta.x/t.clientHeight),this._rotateUp(dn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Te,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function fy(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function hy(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function dy(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ud),this.state=rt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function py(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Bi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=rt.DOLLY;break;case Bi.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=rt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=rt.ROTATE}break;case Bi.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=rt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=rt.PAN}break;default:this.state=rt.NONE}this.state!==rt.NONE&&this.dispatchEvent(bu)}function my(s){switch(this.state){case rt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case rt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case rt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function gy(s){this.enabled===!1||this.enableZoom===!1||this.state!==rt.NONE||(s.preventDefault(),this.dispatchEvent(bu),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Ud))}function xy(s){this.enabled!==!1&&this._handleKeyDown(s)}function _y(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case ki.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=rt.TOUCH_ROTATE;break;case ki.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=rt.TOUCH_PAN;break;default:this.state=rt.NONE}break;case 2:switch(this.touches.TWO){case ki.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=rt.TOUCH_DOLLY_PAN;break;case ki.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=rt.TOUCH_DOLLY_ROTATE;break;default:this.state=rt.NONE}break;default:this.state=rt.NONE}this.state!==rt.NONE&&this.dispatchEvent(bu)}function yy(s){switch(this._trackPointer(s),this.state){case rt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case rt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case rt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case rt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=rt.NONE}}function vy(s){this.enabled!==!1&&s.preventDefault()}function by(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Sy(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Su(s,e){if(e===Yc)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===er||e===na){let t=s.getIndex();if(t===null){let a=[],o=s.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===er)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}function Fd(s){let e=new Map,t=new Map,n=s.clone();return Od(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Od(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)Od(s.children[n],e.children[n],t)}var bl=class extends Xt{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Ru(t)}),this.register(function(t){return new Pu(t)}),this.register(function(t){return new ku(t)}),this.register(function(t){return new zu(t)}),this.register(function(t){return new Hu(t)}),this.register(function(t){return new Lu(t)}),this.register(function(t){return new Nu(t)}),this.register(function(t){return new Du(t)}),this.register(function(t){return new Uu(t)}),this.register(function(t){return new Cu(t)}),this.register(function(t){return new Fu(t)}),this.register(function(t){return new Iu(t)}),this.register(function(t){return new Bu(t)}),this.register(function(t){return new Ou(t)}),this.register(function(t){return new Au(t)}),this.register(function(t){return new Sl(t,qe.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Sl(t,qe.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Vu(t)})}load(e,t,n,i){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=Mn.extractUrlBase(e);a=Mn.resolveURL(l,this.path)}else a=Mn.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new zn(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Vd){try{a[qe.KHR_BINARY_GLTF]=new Gu(e)}catch(h){i&&i(h);return}r=JSON.parse(a[qe.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new ju(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let h=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(h){case qe.KHR_MATERIALS_UNLIT:a[h]=new Eu;break;case qe.KHR_DRACO_MESH_COMPRESSION:a[h]=new Wu(r,this.dracoLoader);break;case qe.KHR_TEXTURE_TRANSFORM:a[h]=new Xu;break;case qe.KHR_MESH_QUANTIZATION:a[h]=new qu;break;default:f.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function My(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function At(s,e,t){let n=s.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Au=class{constructor(e){this.parser=e,this.name=qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,u=new de(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],sn);let h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new ni(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new fs(u),l.distance=h;break;case"spot":l=new us(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),oi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},Eu=class{constructor(){this.name=qe.KHR_MATERIALS_UNLIT}getMaterialType(){return Jt}extendParams(e,t,n){let i=[];e.color=new de(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],sn),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Ke))}return Promise.all(i)}},Cu=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Ru=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return At(this.parser,e,this.name)!==null?ln:null}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Te(r,r)}return Promise.all(i)}},Pu=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_DISPERSION}getMaterialType(e){return At(this.parser,e,this.name)!==null?ln:null}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Iu=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return At(this.parser,e,this.name)!==null?ln:null}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}},Lu=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SHEEN}getMaterialType(e){return At(this.parser,e,this.name)!==null?ln:null}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(t.sheenColor=new de(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],sn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Ke)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}},Nu=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return At(this.parser,e,this.name)!==null?ln:null}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}},Du=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_VOLUME}getMaterialType(e){return At(this.parser,e,this.name)!==null?ln:null}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new de().setRGB(r[0],r[1],r[2],sn),Promise.all(i)}},Uu=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IOR}getMaterialType(e){return At(this.parser,e,this.name)!==null?ln:null}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},Fu=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){return At(this.parser,e,this.name)!==null?ln:null}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new de().setRGB(r[0],r[1],r[2],sn),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Ke)),Promise.all(i)}},Ou=class{constructor(e){this.parser=e,this.name=qe.EXT_MATERIALS_BUMP}getMaterialType(e){return At(this.parser,e,this.name)!==null?ln:null}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}},Bu=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return At(this.parser,e,this.name)!==null?ln:null}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}},ku=class{constructor(e){this.parser=e,this.name=qe.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},zu=class{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},Hu=class{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},Sl=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=i.byteOffset||0,l=i.byteLength||0,u=i.count,h=i.byteStride,f=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,f,i.mode,i.filter).then(function(d){return d.buffer}):a.ready.then(function(){let d=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(d),u,h,f,i.mode,i.filter),d})})}else return null}},Vu=class{constructor(e){this.name=qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==Pn.TRIANGLES&&l.mode!==Pn.TRIANGLE_STRIP&&l.mode!==Pn.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,d=[];for(let g of h){let _=new Ee,m=new L,p=new ut,b=new L(1,1,1),M=new wr(g.geometry,g.material,f);for(let y=0;y<f;y++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,y),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,y),c.SCALE&&b.fromBufferAttribute(c.SCALE,y),M.setMatrixAt(y,_.compose(m,p,b));for(let y in c)if(y==="_COLOR_0"){let T=c[y];M.instanceColor=new Ui(T.array,T.itemSize,T.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&g.geometry.setAttribute(y,c[y]);dt.prototype.copy.call(M,g),this.parser.assignFinalMaterial(M),d.push(M)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}},Vd="glTF",aa=12,Bd={JSON:1313821514,BIN:5130562},Gu=class{constructor(e){this.name=qe.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,aa),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Vd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-aa,r=new DataView(e,aa),a=0;for(;a<i;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===Bd.JSON){let l=new Uint8Array(e,aa+a,o);this.content=n.decode(l)}else if(c===Bd.BIN){let l=aa+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Wu=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let u in a){let h=Ku[u]||u.toLowerCase();o[h]=a[u]}for(let u in e.attributes){let h=Ku[u]||u.toLowerCase();if(a[u]!==void 0){let f=n.accessors[e.attributes[u]],d=rr[f.componentType];l[h]=d.name,c[h]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,f){i.decodeDracoFile(u,function(d){for(let g in d.attributes){let _=d.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}h(d)},o,l,sn,f)})})}},Xu=class{constructor(){this.name=qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},qu=class{constructor(){this.name=qe.KHR_MESH_QUANTIZATION}},Ml=class extends ei{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=i-t,h=(n-t)/u,f=h*h,d=f*h,g=e*l,_=g-l,m=-2*d+3*f,p=d-f,b=1-m,M=p-f+h;for(let y=0;y!==o;y++){let T=a[_+y+o],w=a[_+y+c]*u,E=a[g+y+o],x=a[g+y]*u;r[y]=b*T+M*w+m*E+p*x}return r}},Ty=new ut,Yu=class extends Ml{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return Ty.fromArray(r).normalize().toArray(r),r}},Pn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},rr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},kd={9728:wt,9729:mt,9984:wo,9985:Js,9986:ds,9987:fn},zd={33071:Gt,33648:Us,10497:yn},Mu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ku={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Wi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},wy={CUBICSPLINE:void 0,LINEAR:ns,STEP:mi},Tu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Ay(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new $n({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:_n})),s.DefaultMaterial}function gs(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function oi(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Ey(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,u=e.length;l<u;l++){let h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){let h=e[l];if(n){let f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):s.attributes.position;a.push(f)}if(i){let f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):s.attributes.normal;o.push(f)}if(r){let f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):s.attributes.color;c.push(f)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let u=l[0],h=l[1],f=l[2];return n&&(s.morphAttributes.position=u),i&&(s.morphAttributes.normal=h),r&&(s.morphAttributes.color=f),s.morphTargetsRelative=!0,s})}function Cy(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Ry(s){let e,t=s.extensions&&s.extensions[qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+wu(t.attributes):e=s.indices+":"+wu(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+wu(s.targets[n]);return e}function wu(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Zu(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Py(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Iy=new Ee,ju=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new My,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new bi(this.options.manager):this.textureLoader=new Vr(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new zn(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return gs(r,o,i),oi(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,u]of a.children.entries())r(u,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[qe.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,a){n.load(Mn.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=Mu[i.type],o=rr[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new gt(l,a,c))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=Mu[i.type],l=rr[i.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0,_,m;if(d&&d!==h){let p=Math.floor(f/d),b="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count,M=t.cache.get(b);M||(_=new l(o,p*d,i.count*d/u),M=new Vs(_,d/u),t.cache.add(b,M)),m=new Gs(M,c,f%d/u,g)}else o===null?_=new l(i.count*c):_=new l(o,f,i.count*c),m=new gt(_,c,g);if(i.sparse!==void 0){let p=Mu.SCALAR,b=rr[i.sparse.indices.componentType],M=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,T=new b(a[1],M,i.sparse.count*p),w=new l(a[2],y,i.sparse.count*c);o!==null&&(m=new gt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let E=0,x=T.length;E<x;E++){let S=T[E];if(m.setX(S,w[E*c]),c>=2&&m.setY(S,w[E*c+1]),c>=3&&m.setZ(S,w[E*c+2]),c>=4&&m.setW(S,w[E*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);let f=(r.samplers||{})[a.sampler]||{};return u.magFilter=kd[f.magFilter]||mt,u.minFilter=kd[f.minFilter]||fn,u.wrapS=zd[f.wrapS]||yn,u.wrapT=zd[f.wrapT]||yn,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==wt&&u.minFilter!==mt,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let a=i.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(h){l=!0;let f=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(f),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(h){return new Promise(function(f,d){let g=f;t.isImageBitmapLoader===!0&&(g=function(_){let m=new kt(_);m.needsUpdate=!0,f(m)}),t.load(Mn.resolveURL(h,r.path),g,void 0,d)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),oi(h,a),h.userData.mimeType=a.mimeType||Py(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[qe.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[qe.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[qe.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Xs,jt.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Rn,jt.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return $n}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[qe.KHR_MATERIALS_UNLIT]){let h=i[qe.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),l.push(h.extendParams(o,r,t))}else{let h=r.pbrMetallicRoughness||{};if(o.color=new de(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){let f=h.baseColorFactor;o.color.setRGB(f[0],f[1],f[2],sn),o.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",h.baseColorTexture,Ke)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=un);let u=r.alphaMode||Tu.OPAQUE;if(u===Tu.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Tu.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Jt&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Te(1,1),r.normalTexture.scale!==void 0)){let h=r.normalTexture.scale;o.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&a!==Jt&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Jt){let h=r.emissiveFactor;o.emissive=new de().setRGB(h[0],h[1],h[2],sn)}return r.emissiveTexture!==void 0&&a!==Jt&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Ke)),Promise.all(l).then(function(){let h=new a(o);return r.name&&(h.name=r.name),oi(h,r),t.associations.set(h,{materials:e}),r.extensions&&gs(i,h,r),h})}createUniqueName(e){let t=ct.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Hd(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],u=Ry(l),h=i[u];if(h)a.push(h.promise);else{let f;l.extensions&&l.extensions[qe.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Hd(new pt,l,t),i[u]={primitive:l,promise:f},a.push(f)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let u=a[c].material===void 0?Ay(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let d=0,g=u.length;d<g;d++){let _=u[d],m=a[d],p,b=l[d];if(m.mode===Pn.TRIANGLES||m.mode===Pn.TRIANGLE_STRIP||m.mode===Pn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new rs(_,b):new st(_,b),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Pn.TRIANGLE_STRIP?p.geometry=Su(p.geometry,na):m.mode===Pn.TRIANGLE_FAN&&(p.geometry=Su(p.geometry,er));else if(m.mode===Pn.LINES)p=new jn(_,b);else if(m.mode===Pn.LINE_STRIP)p=new gi(_,b);else if(m.mode===Pn.LINE_LOOP)p=new Ar(_,b);else if(m.mode===Pn.POINTS)p=new Er(_,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&Cy(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),oi(p,r),m.extensions&&gs(i,p,m),t.assignFinalMaterial(p),h.push(p)}for(let d=0,g=h.length;d<g;d++)t.associations.set(h[d],{meshes:e,primitives:d});if(h.length===1)return r.extensions&&gs(i,h[0],r),h[0];let f=new it;r.extensions&&gs(i,f,r),t.associations.set(f,{meshes:e});for(let d=0,g=h.length;d<g;d++)f.add(h[d]);return f})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new xt($t.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new ti(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),oi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),a=i,o=[],c=[];for(let l=0,u=a.length;l<u;l++){let h=a[l];if(h){o.push(h);let f=new Ee;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new as(o,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let h=0,f=i.channels.length;h<f;h++){let d=i.channels[h],g=i.samplers[d.sampler],_=d.target,m=_.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,b=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",b)),l.push(g),u.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){let f=h[0],d=h[1],g=h[2],_=h[3],m=h[4],p=[];for(let M=0,y=f.length;M<y;M++){let T=f[M],w=d[M],E=g[M],x=_[M],S=m[M];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();let R=n._createAnimationTracks(T,w,E,x,S);if(R)for(let C=0;C<R.length;C++)p.push(R[C])}let b=new Fi(r,void 0,p);return oi(b,i),b})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(f,Iy)});for(let d=0,g=h.length;d<g;d++)u.add(h[d]);if(u.userData.pivot!==void 0&&h.length>0){let d=u.userData.pivot,g=h[0];u.pivot=new L().fromArray(d),u.position.x-=d[0],u.position.y-=d[1],u.position.z-=d[2],g.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new Ni:l.length>1?u=new it:l.length===1?u=l[0]:u=new dt,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=a),oi(u,r),r.extensions&&gs(n,u,r),r.matrix!==void 0){let h=new Ee;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){let h=i.associations.get(u);i.associations.set(u,{...h})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new it;n.name&&(r.name=i.createUniqueName(n.name)),oi(r,n),n.extensions&&gs(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,h=c.length;u<h;u++){let f=c[u];f.parent!==null?r.add(Fd(f)):r.add(f)}let l=u=>{let h=new Map;for(let[f,d]of i.associations)(f instanceof jt||f instanceof kt)&&h.set(f,d);return u.traverse(f=>{let d=i.associations.get(f);d!=null&&h.set(f,d)}),h};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let a=[],o=e.name?e.name:e.uuid,c=[];function l(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}Wi[r.path]===Wi.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let u;switch(Wi[r.path]){case Wi.weights:u=yi;break;case Wi.rotation:u=Sn;break;case Wi.translation:case Wi.scale:u=Lt;break;default:n.itemSize===1?u=yi:u=Lt;break}let h=i.interpolation!==void 0?wy[i.interpolation]:ns,f=this._getArrayFromAccessor(n);for(let d=0,g=c.length;d<g;d++){let _=new u(c[d]+"."+Wi[r.path],t.array,f,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),a.push(_)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Zu(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Sn?Yu:Ml;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Ly(s,e,t){let n=e.attributes,i=new Wt;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new L(c[0],c[1],c[2]),new L(l[0],l[1],l[2])),o.normalized){let u=Zu(rr[o.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new L,c=new L;for(let l=0,u=r.length;l<u;l++){let h=r[l];if(h.POSITION!==void 0){let f=t.json.accessors[h.POSITION],d=f.min,g=f.max;if(d!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),f.normalized){let _=Zu(rr[f.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;let a=new on;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function Hd(s,e,t){let n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(let a in n){let o=Ku[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){let a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return Be.workingColorSpace!==sn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Be.workingColorSpace}" not supported.`),oi(s,e),Ly(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Ey(s,e.targets,t):s})}var Tl=class extends Xt{constructor(e){super(e)}load(e,t,n,i){let r=this,a=new zn(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(r.parse(o))}catch(c){i?i(c):console.error(c),r.manager.itemError(e)}},n,i)}parse(e){function t(l){let u=new DataView(l),h=32/8*3+32/8*3*3+16/8,f=u.getUint32(80,!0);if(80+32/8+f*h===u.byteLength)return!0;let g=[115,111,108,105,100];for(let _=0;_<5;_++)if(n(g,u,_))return!1;return!0}function n(l,u,h){for(let f=0,d=l.length;f<d;f++)if(l[f]!==u.getUint8(h+f))return!1;return!0}function i(l){let u=new DataView(l),h=u.getUint32(80,!0),f,d,g,_=!1,m,p,b,M,y;for(let C=0;C<70;C++)u.getUint32(C,!1)==1129270351&&u.getUint8(C+4)==82&&u.getUint8(C+5)==61&&(_=!0,m=new Float32Array(h*3*3),p=u.getUint8(C+6)/255,b=u.getUint8(C+7)/255,M=u.getUint8(C+8)/255,y=u.getUint8(C+9)/255);let T=84,w=50,E=new pt,x=new Float32Array(h*3*3),S=new Float32Array(h*3*3),R=new de;for(let C=0;C<h;C++){let I=T+C*w,F=u.getFloat32(I,!0),V=u.getFloat32(I+4,!0),O=u.getFloat32(I+8,!0);if(_){let N=u.getUint16(I+48,!0);(N&32768)===0?(f=(N&31)/31,d=(N>>5&31)/31,g=(N>>10&31)/31):(f=p,d=b,g=M)}for(let N=1;N<=3;N++){let H=I+N*12,q=C*3*3+(N-1)*3;x[q]=u.getFloat32(H,!0),x[q+1]=u.getFloat32(H+4,!0),x[q+2]=u.getFloat32(H+8,!0),S[q]=F,S[q+1]=V,S[q+2]=O,_&&(R.setRGB(f,d,g,Ke),m[q]=R.r,m[q+1]=R.g,m[q+2]=R.b)}}return E.setAttribute("position",new gt(x,3)),E.setAttribute("normal",new gt(S,3)),_&&(E.setAttribute("color",new gt(m,3)),E.hasColors=!0,E.alpha=y),E}function r(l){let u=new pt,h=/solid([\s\S]*?)endsolid/g,f=/facet([\s\S]*?)endfacet/g,d=/solid\s(.+)/,g=0,_=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,m=new RegExp("vertex"+_+_+_,"g"),p=new RegExp("normal"+_+_+_,"g"),b=[],M=[],y=[],T=new L,w,E=0,x=0,S=0;for(;(w=h.exec(l))!==null;){x=S;let R=w[0],C=(w=d.exec(R))!==null?w[1]:"";for(y.push(C);(w=f.exec(R))!==null;){let V=0,O=0,N=w[0];for(;(w=p.exec(N))!==null;)T.x=parseFloat(w[1]),T.y=parseFloat(w[2]),T.z=parseFloat(w[3]),O++;for(;(w=m.exec(N))!==null;)b.push(parseFloat(w[1]),parseFloat(w[2]),parseFloat(w[3])),M.push(T.x,T.y,T.z),V++,S++;O!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+g),V!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+g),g++}let I=x,F=S-x;u.userData.groupNames=y,u.addGroup(I,F,E),E++}return u.setAttribute("position",new Ve(b,3)),u.setAttribute("normal",new Ve(M,3)),u}function a(l){return typeof l!="string"?new TextDecoder().decode(l):l}function o(l){if(typeof l=="string"){let u=new Uint8Array(l.length);for(let h=0;h<l.length;h++)u[h]=l.charCodeAt(h)&255;return u.buffer||u}else return l}let c=o(e);return t(c)?i(c):r(a(e))}};var oa=class extends Or{constructor(e){super(e)}parse(e){function t(N){switch(N.image_type){case f:case _:if(N.colormap_length>256||N.colormap_size!==24||N.colormap_type!==1)throw new Error("THREE.TGALoader: Invalid type colormap data for indexed type.");break;case d:case g:case m:case p:if(N.colormap_type)throw new Error("THREE.TGALoader: Invalid type colormap data for colormap type.");break;case h:throw new Error("THREE.TGALoader: No data.");default:throw new Error("THREE.TGALoader: Invalid type "+N.image_type)}if(N.width<=0||N.height<=0)throw new Error("THREE.TGALoader: Invalid image size.");if(N.pixel_size!==8&&N.pixel_size!==16&&N.pixel_size!==24&&N.pixel_size!==32)throw new Error("THREE.TGALoader: Invalid pixel size "+N.pixel_size)}function n(N,H,q,K,ie){let ne,re,ye=q.pixel_size>>3,ve=q.width*q.height*ye;if(H&&(re=ie.subarray(K,K+=q.colormap_length*(q.colormap_size>>3))),N){ne=new Uint8Array(ve);let oe,k,J,ee=0,Re=new Uint8Array(ye);for(;ee<ve;)if(oe=ie[K++],k=(oe&127)+1,oe&128){for(J=0;J<ye;++J)Re[J]=ie[K++];for(J=0;J<k;++J)ne.set(Re,ee+J*ye);ee+=ye*k}else{for(k*=ye,J=0;J<k;++J)ne[ee+J]=ie[K++];ee+=k}}else ne=ie.subarray(K,K+=H?q.width*q.height:ve);return{pixel_data:ne,palettes:re}}function i(N,H,q,K,ie,ne,re,ye,ve){let oe=ve,k,J=0,ee,Re,Oe=R.width;for(Re=H;Re!==K;Re+=q)for(ee=ie;ee!==re;ee+=ne,J++)k=ye[J],N[(ee+Oe*Re)*4+3]=255,N[(ee+Oe*Re)*4+2]=oe[k*3+0],N[(ee+Oe*Re)*4+1]=oe[k*3+1],N[(ee+Oe*Re)*4+0]=oe[k*3+2];return N}function r(N,H,q,K,ie,ne,re,ye){let ve,oe=0,k,J,ee=R.width;for(J=H;J!==K;J+=q)for(k=ie;k!==re;k+=ne,oe+=2)ve=ye[oe+0]+(ye[oe+1]<<8),N[(k+ee*J)*4+0]=(ve&31744)>>7,N[(k+ee*J)*4+1]=(ve&992)>>2,N[(k+ee*J)*4+2]=(ve&31)<<3,N[(k+ee*J)*4+3]=ve&32768?0:255;return N}function a(N,H,q,K,ie,ne,re,ye){let ve=0,oe,k,J=R.width;for(k=H;k!==K;k+=q)for(oe=ie;oe!==re;oe+=ne,ve+=3)N[(oe+J*k)*4+3]=255,N[(oe+J*k)*4+2]=ye[ve+0],N[(oe+J*k)*4+1]=ye[ve+1],N[(oe+J*k)*4+0]=ye[ve+2];return N}function o(N,H,q,K,ie,ne,re,ye){let ve=0,oe,k,J=R.width;for(k=H;k!==K;k+=q)for(oe=ie;oe!==re;oe+=ne,ve+=4)N[(oe+J*k)*4+2]=ye[ve+0],N[(oe+J*k)*4+1]=ye[ve+1],N[(oe+J*k)*4+0]=ye[ve+2],N[(oe+J*k)*4+3]=ye[ve+3];return N}function c(N,H,q,K,ie,ne,re,ye){let ve,oe=0,k,J,ee=R.width;for(J=H;J!==K;J+=q)for(k=ie;k!==re;k+=ne,oe++)ve=ye[oe],N[(k+ee*J)*4+0]=ve,N[(k+ee*J)*4+1]=ve,N[(k+ee*J)*4+2]=ve,N[(k+ee*J)*4+3]=255;return N}function l(N,H,q,K,ie,ne,re,ye){let ve=0,oe,k,J=R.width;for(k=H;k!==K;k+=q)for(oe=ie;oe!==re;oe+=ne,ve+=2)N[(oe+J*k)*4+0]=ye[ve+0],N[(oe+J*k)*4+1]=ye[ve+0],N[(oe+J*k)*4+2]=ye[ve+0],N[(oe+J*k)*4+3]=ye[ve+1];return N}function u(N,H,q,K,ie){let ne,re,ye,ve,oe,k;switch((R.flags&b)>>M){default:case w:ne=0,ye=1,oe=H,re=0,ve=1,k=q;break;case y:ne=0,ye=1,oe=H,re=q-1,ve=-1,k=-1;break;case E:ne=H-1,ye=-1,oe=-1,re=0,ve=1,k=q;break;case T:ne=H-1,ye=-1,oe=-1,re=q-1,ve=-1,k=-1;break}if(F)switch(R.pixel_size){case 8:c(N,re,ve,k,ne,ye,oe,K);break;case 16:l(N,re,ve,k,ne,ye,oe,K);break;default:throw new Error("THREE.TGALoader: Format not supported.")}else switch(R.pixel_size){case 8:i(N,re,ve,k,ne,ye,oe,K,ie);break;case 16:r(N,re,ve,k,ne,ye,oe,K);break;case 24:a(N,re,ve,k,ne,ye,oe,K);break;case 32:o(N,re,ve,k,ne,ye,oe,K);break;default:throw new Error("THREE.TGALoader: Format not supported.")}return N}let h=0,f=1,d=2,g=3,_=9,m=10,p=11,b=48,M=4,y=0,T=1,w=2,E=3;if(e.length<19)throw new Error("THREE.TGALoader: Not enough data to contain header.");let x=0,S=new Uint8Array(e),R={id_length:S[x++],colormap_type:S[x++],image_type:S[x++],colormap_index:S[x++]|S[x++]<<8,colormap_length:S[x++]|S[x++]<<8,colormap_size:S[x++],origin:[S[x++]|S[x++]<<8,S[x++]|S[x++]<<8],width:S[x++]|S[x++]<<8,height:S[x++]|S[x++]<<8,pixel_size:S[x++],flags:S[x++]};if(t(R),R.id_length+x>e.length)throw new Error("THREE.TGALoader: No data.");x+=R.id_length;let C=!1,I=!1,F=!1;switch(R.image_type){case _:C=!0,I=!0;break;case f:I=!0;break;case m:C=!0;break;case d:break;case p:C=!0,F=!0;break;case g:F=!0;break}let V=new Uint8Array(R.width*R.height*4),O=n(C,I,R,x,S);return u(V,R.width,R.height,O.pixel_data,O.palettes),{data:V,width:R.width,height:R.height,flipY:!0,generateMipmaps:!0,minFilter:fn}}};function pn(s,e){let t=[],n=s.childNodes;for(let i=0,r=n.length;i<r;i++){let a=n[i];a.nodeName===e&&t.push(a)}return t}function Ny(s){return s.length===0?[]:s.trim().split(/\s+/)}function en(s){return s.length===0?[]:s.trim().split(/\s+/).map(parseFloat)}function wl(s){return s.length===0?[]:s.trim().split(/\s+/).map(e=>parseInt(e))}function Ht(s){return s.substring(1)}var Al=class{constructor(){this.count=0}generateId(){return"three_default_"+this.count++}parse(e){if(e.length===0)return null;let t=new DOMParser().parseFromString(e,"application/xml"),n=pn(t,"COLLADA")[0],i=t.getElementsByTagName("parsererror")[0];if(i!==void 0){let c=pn(i,"div")[0],l;return c?l=c.textContent:l=this.parserErrorToText(i),console.error(`THREE.ColladaLoader: Failed to parse collada file.
`,l),null}let r=n.getAttribute("version");console.debug("THREE.ColladaLoader: File version",r);let a=this.parseAsset(pn(n,"asset")[0]),o={animations:{},clips:{},controllers:{},images:{},effects:{},materials:{},cameras:{},lights:{},geometries:{},nodes:{},visualScenes:{},kinematicsModels:{},physicsModels:{},kinematicsScenes:{},joints:{}};return this.library=o,this.collada=n,this.parseLibrary(n,"library_animations","animation",this.parseAnimation.bind(this)),this.parseLibrary(n,"library_animation_clips","animation_clip",this.parseAnimationClip.bind(this)),this.parseLibrary(n,"library_controllers","controller",this.parseController.bind(this)),this.parseLibrary(n,"library_images","image",this.parseImage.bind(this)),this.parseLibrary(n,"library_effects","effect",this.parseEffect.bind(this)),this.parseLibrary(n,"library_materials","material",this.parseMaterial.bind(this)),this.parseLibrary(n,"library_cameras","camera",this.parseCamera.bind(this)),this.parseLibrary(n,"library_lights","light",this.parseLight.bind(this)),this.parseLibrary(n,"library_geometries","geometry",this.parseGeometry.bind(this)),this.parseLibrary(n,"library_nodes","node",this.parseNode.bind(this)),this.parseLibrary(n,"library_visual_scenes","visual_scene",this.parseVisualScene.bind(this)),this.parseLibrary(n,"library_joints","joint",this.parseLibraryJoint.bind(this)),this.parseLibrary(n,"library_kinematics_models","kinematics_model",this.parseKinematicsModel.bind(this)),this.parseLibrary(n,"library_physics_models","physics_model",this.parsePhysicsModel.bind(this)),this.parseLibrary(n,"scene","instance_kinematics_scene",this.parseKinematicsScene.bind(this)),{library:o,asset:a,collada:n}}parserErrorToText(e){let t=[],n=[e];for(;n.length;){let i=n.shift();i.nodeType===Node.TEXT_NODE?t.push(i.textContent):(t.push(`
`),n.push(...i.childNodes))}return t.join("").trim()}parseAsset(e){return{unit:this.parseAssetUnit(pn(e,"unit")[0]),upAxis:this.parseAssetUpAxis(pn(e,"up_axis")[0])}}parseAssetUnit(e){return e!==void 0&&e.hasAttribute("meter")===!0?parseFloat(e.getAttribute("meter")):1}parseAssetUpAxis(e){return e!==void 0?e.textContent:"Y_UP"}parseLibrary(e,t,n,i){let r=pn(e,t)[0];if(r!==void 0){let a=pn(r,n);for(let o=0;o<a.length;o++)i(a[o])}}parseAnimation(e){let t={sources:{},samplers:{},channels:{}},n=!1;for(let i=0,r=e.childNodes.length;i<r;i++){let a=e.childNodes[i];if(a.nodeType!==1)continue;let o;switch(a.nodeName){case"source":o=a.getAttribute("id"),t.sources[o]=this.parseSource(a);break;case"sampler":o=a.getAttribute("id"),t.samplers[o]=this.parseAnimationSampler(a);break;case"channel":o=a.getAttribute("target"),t.channels[o]=this.parseAnimationChannel(a);break;case"animation":this.parseAnimation(a),n=!0;break;default:}}n===!1&&(this.library.animations[e.getAttribute("id")||$t.generateUUID()]=t)}parseAnimationSampler(e){let t={inputs:{}};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];if(r.nodeType===1&&r.nodeName==="input"){let a=Ht(r.getAttribute("source")),o=r.getAttribute("semantic");t.inputs[o]=a}}return t}parseAnimationChannel(e){let t={},i=e.getAttribute("target").split("/"),r=i.shift(),a=i.shift(),o=a.indexOf("(")!==-1,c=a.indexOf(".")!==-1;if(c)i=a.split("."),a=i.shift(),t.member=i.shift();else if(o){let l=a.split("(");a=l.shift();for(let u=0;u<l.length;u++)l[u]=parseInt(l[u].replace(/\)/,""));t.indices=l}return t.id=r,t.sid=a,t.arraySyntax=o,t.memberSyntax=c,t.sampler=Ht(e.getAttribute("source")),t}parseAnimationClip(e){let t={name:e.getAttribute("id")||"default",start:parseFloat(e.getAttribute("start")||0),end:parseFloat(e.getAttribute("end")||0),animations:[]};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];r.nodeType===1&&r.nodeName==="instance_animation"&&t.animations.push(Ht(r.getAttribute("url")))}this.library.clips[e.getAttribute("id")]=t}parseController(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];if(r.nodeType===1)switch(r.nodeName){case"skin":t.id=Ht(r.getAttribute("source")),t.skin=this.parseSkin(r);break;case"morph":t.id=Ht(r.getAttribute("source")),console.warn("THREE.ColladaLoader: Morph target animation not supported yet.");break}}this.library.controllers[e.getAttribute("id")]=t}parseSkin(e){let t={sources:{}};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];if(r.nodeType===1)switch(r.nodeName){case"bind_shape_matrix":t.bindShapeMatrix=en(r.textContent);break;case"source":let a=r.getAttribute("id");t.sources[a]=this.parseSource(r);break;case"joints":t.joints=this.parseJoints(r);break;case"vertex_weights":t.vertexWeights=this.parseVertexWeights(r);break}}return t}parseJoints(e){let t={inputs:{}};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];if(r.nodeType===1&&r.nodeName==="input"){let a=r.getAttribute("semantic"),o=Ht(r.getAttribute("source"));t.inputs[a]=o}}return t}parseVertexWeights(e){let t={inputs:{}};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];if(r.nodeType===1)switch(r.nodeName){case"input":let a=r.getAttribute("semantic"),o=Ht(r.getAttribute("source")),c=parseInt(r.getAttribute("offset"));t.inputs[a]={id:o,offset:c};break;case"vcount":t.vcount=wl(r.textContent);break;case"v":t.v=wl(r.textContent);break}}return t}parseImage(e){let t={init_from:pn(e,"init_from")[0].textContent};this.library.images[e.getAttribute("id")]=t}parseEffect(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];r.nodeType===1&&r.nodeName==="profile_COMMON"&&(t.profile=this.parseEffectProfileCOMMON(r))}this.library.effects[e.getAttribute("id")]=t}parseEffectProfileCOMMON(e){let t={surfaces:{},samplers:{}};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];if(r.nodeType===1)switch(r.nodeName){case"newparam":this.parseEffectNewparam(r,t);break;case"technique":t.technique=this.parseEffectTechnique(r);break;case"extra":t.extra=this.parseEffectExtra(r);break}}return t}parseEffectNewparam(e,t){let n=e.getAttribute("sid");for(let i=0,r=e.childNodes.length;i<r;i++){let a=e.childNodes[i];if(a.nodeType===1)switch(a.nodeName){case"surface":t.surfaces[n]=this.parseEffectSurface(a);break;case"sampler2D":t.samplers[n]=this.parseEffectSampler(a);break}}}parseEffectSurface(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];r.nodeType===1&&r.nodeName==="init_from"&&(t.init_from=r.textContent)}return t}parseEffectSampler(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];r.nodeType===1&&r.nodeName==="source"&&(t.source=r.textContent)}return t}parseEffectTechnique(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];if(r.nodeType===1)switch(r.nodeName){case"constant":case"lambert":case"blinn":case"phong":t.type=r.nodeName,t.parameters=this.parseEffectParameters(r);break;case"extra":t.extra=this.parseEffectExtra(r);break}}return t}parseEffectParameters(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];if(r.nodeType===1)switch(r.nodeName){case"emission":case"diffuse":case"specular":case"bump":case"ambient":case"shininess":case"transparency":t[r.nodeName]=this.parseEffectParameter(r);break;case"transparent":t[r.nodeName]={opaque:r.hasAttribute("opaque")?r.getAttribute("opaque"):"A_ONE",data:this.parseEffectParameter(r)};break}}return t}parseEffectParameter(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];if(r.nodeType===1)switch(r.nodeName){case"color":t[r.nodeName]=en(r.textContent);break;case"float":t[r.nodeName]=parseFloat(r.textContent);break;case"texture":t[r.nodeName]={id:r.getAttribute("texture"),extra:this.parseEffectParameterTexture(r)};break}}return t}parseEffectParameterTexture(e){let t={technique:{}};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];r.nodeType===1&&r.nodeName==="extra"&&this.parseEffectParameterTextureExtra(r,t)}return t}parseEffectParameterTextureExtra(e,t){for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];r.nodeType===1&&r.nodeName==="technique"&&this.parseEffectParameterTextureExtraTechnique(r,t)}}parseEffectParameterTextureExtraTechnique(e,t){for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];if(r.nodeType===1)switch(r.nodeName){case"repeatU":case"repeatV":case"offsetU":case"offsetV":t.technique[r.nodeName]=parseFloat(r.textContent);break;case"wrapU":case"wrapV":r.textContent.toUpperCase()==="TRUE"?t.technique[r.nodeName]=1:r.textContent.toUpperCase()==="FALSE"?t.technique[r.nodeName]=0:t.technique[r.nodeName]=parseInt(r.textContent);break;case"bump":t[r.nodeName]=this.parseEffectExtraTechniqueBump(r);break}}}parseEffectExtra(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];r.nodeType===1&&r.nodeName==="technique"&&(t.technique=this.parseEffectExtraTechnique(r))}return t}parseEffectExtraTechnique(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];if(r.nodeType===1)switch(r.nodeName){case"double_sided":t[r.nodeName]=parseInt(r.textContent);break;case"bump":t[r.nodeName]=this.parseEffectExtraTechniqueBump(r);break}}return t}parseEffectExtraTechniqueBump(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];r.nodeType===1&&r.nodeName==="texture"&&(t[r.nodeName]={id:r.getAttribute("texture"),texcoord:r.getAttribute("texcoord"),extra:this.parseEffectParameterTexture(r)})}return t}parseMaterial(e){let t={name:e.getAttribute("name")};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];r.nodeType===1&&r.nodeName==="instance_effect"&&(t.url=Ht(r.getAttribute("url")))}this.library.materials[e.getAttribute("id")]=t}parseCamera(e){let t={name:e.getAttribute("name")};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];r.nodeType===1&&r.nodeName==="optics"&&(t.optics=this.parseCameraOptics(r))}this.library.cameras[e.getAttribute("id")]=t}parseCameraOptics(e){for(let t=0;t<e.childNodes.length;t++){let n=e.childNodes[t];if(n.nodeName==="technique_common")return this.parseCameraTechnique(n)}return{}}parseCameraTechnique(e){let t={};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];switch(i.nodeName){case"perspective":case"orthographic":t.technique=i.nodeName,t.parameters=this.parseCameraParameters(i);break}}return t}parseCameraParameters(e){let t={};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];switch(i.nodeName){case"xfov":case"yfov":case"xmag":case"ymag":case"znear":case"zfar":case"aspect_ratio":t[i.nodeName]=parseFloat(i.textContent);break}}return t}parseLight(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];r.nodeType===1&&r.nodeName==="technique_common"&&(t=this.parseLightTechnique(r))}this.library.lights[e.getAttribute("id")]=t}parseLightTechnique(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];if(r.nodeType===1)switch(r.nodeName){case"directional":case"point":case"spot":case"ambient":t.technique=r.nodeName,t.parameters=this.parseLightParameters(r);break}}return t}parseLightParameters(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];if(r.nodeType===1)switch(r.nodeName){case"color":let a=en(r.textContent);t.color=new de().fromArray(a),Be.colorSpaceToWorking(t.color,Ke);break;case"falloff_angle":t.falloffAngle=parseFloat(r.textContent);break;case"quadratic_attenuation":let o=parseFloat(r.textContent);t.distance=o?Math.sqrt(1/o):0;break}}return t}parseGeometry(e){let t={name:e.getAttribute("name"),sources:{},vertices:{},primitives:[]},n=pn(e,"mesh")[0];if(n!==void 0){for(let i=0;i<n.childNodes.length;i++){let r=n.childNodes[i];if(r.nodeType!==1)continue;let a=r.getAttribute("id");switch(r.nodeName){case"source":t.sources[a]=this.parseSource(r);break;case"vertices":t.vertices=this.parseGeometryVertices(r);break;case"polygons":case"lines":case"linestrips":case"polylist":case"triangles":t.primitives.push(this.parseGeometryPrimitive(r));break;default:}}this.library.geometries[e.getAttribute("id")]=t}}parseSource(e){let t={array:[],stride:3};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];if(i.nodeType===1)switch(i.nodeName){case"float_array":t.array=en(i.textContent);break;case"Name_array":t.array=Ny(i.textContent);break;case"technique_common":let r=pn(i,"accessor")[0];r!==void 0&&(t.stride=parseInt(r.getAttribute("stride")));break}}return t}parseGeometryVertices(e){let t={};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];i.nodeType===1&&(t[i.getAttribute("semantic")]=Ht(i.getAttribute("source")))}return t}parseGeometryPrimitive(e){let t={type:e.nodeName,material:e.getAttribute("material"),count:parseInt(e.getAttribute("count")),inputs:{},stride:0,hasUV:!1};for(let n=0,i=e.childNodes.length;n<i;n++){let r=e.childNodes[n];if(r.nodeType===1)switch(r.nodeName){case"input":let a=Ht(r.getAttribute("source")),o=r.getAttribute("semantic"),c=parseInt(r.getAttribute("offset")),l=parseInt(r.getAttribute("set")),u=l>0?o+l:o;t.inputs[u]={id:a,offset:c},t.stride=Math.max(t.stride,c+1),o==="TEXCOORD"&&(t.hasUV=!0);break;case"vcount":t.vcount=wl(r.textContent);break;case"p":t.p=wl(r.textContent);break}}return t.type==="polygons"&&(t.vcount=[t.p.length/t.stride]),t}parseLibraryJoint(e){this.library.joints[e.getAttribute("id")]=this.parseKinematicsJoint(e)}parseKinematicsModel(e){let t={name:e.getAttribute("name")||"",joints:{},links:[]};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];i.nodeType===1&&i.nodeName==="technique_common"&&this.parseKinematicsTechniqueCommon(i,t)}this.library.kinematicsModels[e.getAttribute("id")]=t}parseKinematicsTechniqueCommon(e,t){for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];if(i.nodeType===1)switch(i.nodeName){case"joint":t.joints[i.getAttribute("sid")]=this.parseKinematicsJoint(i);break;case"instance_joint":t.joints[i.getAttribute("sid")]=this.library.joints[Ht(i.getAttribute("url"))];break;case"link":t.links.push(this.parseKinematicsLink(i));break}}}parseKinematicsJoint(e){let t;for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];if(i.nodeType===1)switch(i.nodeName){case"prismatic":case"revolute":t=this.parseKinematicsJointParameter(i);break}}return t}parseKinematicsJointParameter(e){let t={sid:e.getAttribute("sid"),name:e.getAttribute("name")||"",axis:new L,limits:{min:0,max:0},type:e.nodeName,static:!1,zeroPosition:0,middlePosition:0};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];if(i.nodeType===1)switch(i.nodeName){case"axis":let r=en(i.textContent);t.axis.fromArray(r);break;case"limits":let a=i.getElementsByTagName("max")[0],o=i.getElementsByTagName("min")[0];t.limits.max=parseFloat(a.textContent),t.limits.min=parseFloat(o.textContent);break}}return t.limits.min>=t.limits.max&&(t.static=!0),t.middlePosition=(t.limits.min+t.limits.max)/2,t}parseKinematicsLink(e){let t={sid:e.getAttribute("sid"),name:e.getAttribute("name")||"",attachments:[],transforms:[]};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];if(i.nodeType===1)switch(i.nodeName){case"attachment_full":t.attachments.push(this.parseKinematicsAttachment(i));break;case"matrix":case"translate":case"rotate":t.transforms.push(this.parseKinematicsTransform(i));break}}return t}parseKinematicsAttachment(e){let t={joint:e.getAttribute("joint").split("/").pop(),transforms:[],links:[]};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];if(i.nodeType===1)switch(i.nodeName){case"link":t.links.push(this.parseKinematicsLink(i));break;case"matrix":case"translate":case"rotate":t.transforms.push(this.parseKinematicsTransform(i));break}}return t}parseKinematicsTransform(e){let t={type:e.nodeName},n=en(e.textContent);switch(t.type){case"matrix":t.obj=new Ee,t.obj.fromArray(n).transpose();break;case"translate":t.obj=new L,t.obj.fromArray(n);break;case"rotate":t.obj=new L,t.obj.fromArray(n),t.angle=$t.degToRad(n[3]);break}return t}parsePhysicsModel(e){let t={name:e.getAttribute("name")||"",rigidBodies:{}};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];i.nodeType===1&&i.nodeName==="rigid_body"&&(t.rigidBodies[i.getAttribute("name")]={},this.parsePhysicsRigidBody(i,t.rigidBodies[i.getAttribute("name")]))}this.library.physicsModels[e.getAttribute("id")]=t}parsePhysicsRigidBody(e,t){for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];i.nodeType===1&&i.nodeName==="technique_common"&&this.parsePhysicsTechniqueCommon(i,t)}}parsePhysicsTechniqueCommon(e,t){for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];if(i.nodeType===1)switch(i.nodeName){case"inertia":t.inertia=en(i.textContent);break;case"mass":t.mass=en(i.textContent)[0];break}}}parseKinematicsScene(e){let t={bindJointAxis:[]};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];i.nodeType===1&&i.nodeName==="bind_joint_axis"&&t.bindJointAxis.push(this.parseKinematicsBindJointAxis(i))}this.library.kinematicsScenes[Ht(e.getAttribute("url"))]=t}parseKinematicsBindJointAxis(e){let t={target:e.getAttribute("target").split("/").pop()};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];if(i.nodeType===1&&i.nodeName==="axis"){let r=i.getElementsByTagName("param")[0];t.axis=r.textContent;let a=t.axis.split("inst_").pop().split("axis")[0];t.jointIndex=a.substring(0,a.length-1)}}return t}prepareNodes(e){let t=e.getElementsByTagName("node");for(let n=0;n<t.length;n++){let i=t[n];i.hasAttribute("id")===!1&&i.setAttribute("id",this.generateId())}}parseNode(e){let t=new Ee,n=new L,i={name:e.getAttribute("name")||"",type:e.getAttribute("type"),id:e.getAttribute("id"),sid:e.getAttribute("sid"),matrix:new Ee,nodes:[],instanceCameras:[],instanceControllers:[],instanceLights:[],instanceGeometries:[],instanceNodes:[],transforms:{},transformData:{},transformOrder:[]};for(let r=0;r<e.childNodes.length;r++){let a=e.childNodes[r];if(a.nodeType!==1)continue;let o;switch(a.nodeName){case"node":i.nodes.push(a.getAttribute("id")),this.parseNode(a);break;case"instance_camera":i.instanceCameras.push(Ht(a.getAttribute("url")));break;case"instance_controller":i.instanceControllers.push(this.parseNodeInstance(a));break;case"instance_light":i.instanceLights.push(Ht(a.getAttribute("url")));break;case"instance_geometry":i.instanceGeometries.push(this.parseNodeInstance(a));break;case"instance_node":i.instanceNodes.push(Ht(a.getAttribute("url")));break;case"matrix":o=en(a.textContent),i.matrix.multiply(t.fromArray(o).transpose());{let c=a.getAttribute("sid");i.transforms[c]=a.nodeName,i.transformData[c]={type:"matrix",array:o},i.transformOrder.push(c)}break;case"translate":o=en(a.textContent),n.fromArray(o),i.matrix.multiply(t.makeTranslation(n.x,n.y,n.z));{let c=a.getAttribute("sid");i.transforms[c]=a.nodeName,i.transformData[c]={type:"translate",x:o[0],y:o[1],z:o[2]},i.transformOrder.push(c)}break;case"rotate":o=en(a.textContent);{let c=$t.degToRad(o[3]);i.matrix.multiply(t.makeRotationAxis(n.fromArray(o),c));let l=a.getAttribute("sid");i.transforms[l]=a.nodeName,i.transformData[l]={type:"rotate",axis:[o[0],o[1],o[2]],angle:o[3]},i.transformOrder.push(l)}break;case"scale":o=en(a.textContent),i.matrix.scale(n.fromArray(o));{let c=a.getAttribute("sid");i.transforms[c]=a.nodeName,i.transformData[c]={type:"scale",x:o[0],y:o[1],z:o[2]},i.transformOrder.push(c)}break;case"extra":break;default:}}return this.hasNode(i.id)?console.warn("THREE.ColladaLoader: There is already a node with ID %s. Exclude current node from further processing.",i.id):this.library.nodes[i.id]=i,i}parseNodeInstance(e){let t={id:Ht(e.getAttribute("url")),materials:{},skeletons:[]};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];switch(i.nodeName){case"bind_material":let r=i.getElementsByTagName("instance_material");for(let a=0;a<r.length;a++){let o=r[a],c=o.getAttribute("symbol"),l=o.getAttribute("target");t.materials[c]=Ht(l)}break;case"skeleton":t.skeletons.push(Ht(i.textContent));break;default:break}}return t}parseVisualScene(e){let t={name:e.getAttribute("name"),children:[]};this.prepareNodes(e);let n=pn(e,"node");for(let i=0;i<n.length;i++)t.children.push(this.parseNode(n[i]));this.library.visualScenes[e.getAttribute("id")]=t}hasNode(e){return this.library.nodes[e]!==void 0}};var El=class{constructor(e,t,n,i){this.library=e,this.collada=t,this.textureLoader=n,this.tgaLoader=i,this.tempColor=new de,this.animations=[],this.kinematics={},this.position=new L,this.scale=new L,this.quaternion=new ut,this.matrix=new Ee,this.deferredPivotAnimations={},this.transformNodes={}}compose(){let e=this.library;this.buildLibrary(e.animations,this.buildAnimation.bind(this)),this.buildLibrary(e.clips,this.buildAnimationClip.bind(this)),this.buildLibrary(e.controllers,this.buildController.bind(this)),this.buildLibrary(e.images,this.buildImage.bind(this)),this.buildLibrary(e.effects,this.buildEffect.bind(this)),this.buildLibrary(e.materials,this.buildMaterial.bind(this)),this.buildLibrary(e.cameras,this.buildCamera.bind(this)),this.buildLibrary(e.lights,this.buildLight.bind(this)),this.buildLibrary(e.geometries,this.buildGeometry.bind(this)),this.buildLibrary(e.visualScenes,this.buildVisualScene.bind(this)),this.setupAnimations(),this.setupKinematics();let t=this.parseScene(pn(this.collada,"scene")[0]);return t.animations=this.animations,{scene:t,animations:this.animations,kinematics:this.kinematics}}buildLibrary(e,t){for(let n in e){let i=e[n];i.build=t(e[n])}}getBuild(e,t){return e.build!==void 0||(e.build=t(e)),e.build}isEmpty(e){return Object.keys(e).length===0}buildAnimation(e){let t=[],n=e.channels,i=e.samplers,r=e.sources,a=this.aggregateAnimationChannels(n,i,r);for(let o in a){let c=this.library.nodes[o];if(!c)continue;let l=a[o];if(this.hasPivotTransforms(c))this.collectDeferredPivotAnimation(o,l);else{let u=this.getNode(o),h=!1;for(let f in l){let d=c.transforms[f],g=c.transformData[f],_=l[f];switch(d){case"matrix":this.buildMatrixTracks(u,_,c,t);break;case"translate":this.buildTranslateTrack(u,_,g,t);break;case"rotate":h||(this.buildRotateTrack(u,f,_,g,c,t),h=!0);break;case"scale":this.buildScaleTrack(u,_,g,t);break}}}}return t}collectDeferredPivotAnimation(e,t){this.deferredPivotAnimations[e]||(this.deferredPivotAnimations[e]={});let n=this.deferredPivotAnimations[e];for(let i in t){n[i]||(n[i]={});for(let r in t[i])n[i][r]=t[i][r]}}hasPivotTransforms(e){let t=["rotatePivot","rotatePivotInverse","rotatePivotTranslation","scalePivot","scalePivotInverse","scalePivotTranslation"];for(let n of t)if(e.transforms[n]!==void 0)return!0;return!1}getAnimation(e){return this.getBuild(this.library.animations[e],this.buildAnimation.bind(this))}aggregateAnimationChannels(e,t,n){let i={};for(let r in e){if(!e.hasOwnProperty(r))continue;let a=e[r],o=t[a.sampler],c=o.inputs.INPUT,l=o.inputs.OUTPUT,u=n[c],h=n[l],f=o.inputs.INTERPOLATION,d=o.inputs.IN_TANGENT,g=o.inputs.OUT_TANGENT,_=f?n[f]:null,m=d?n[d]:null,p=g?n[g]:null,b=a.id,M=a.sid,y=a.member||"default";i[b]||(i[b]={}),i[b][M]||(i[b][M]={}),i[b][M][y]={times:u.array,values:h.array,stride:h.stride,arraySyntax:a.arraySyntax,indices:a.indices,interpolation:_?_.array:null,inTangent:m?m.array:null,outTangent:p?p.array:null,inTangentStride:m?m.stride:0,outTangentStride:p?p.stride:0}}return i}buildMatrixTracks(e,t,n,i){let r=n.matrix.clone().transpose(),a={};for(let l in t){let u=t[l],h=u.times,f=u.values,d=u.stride;for(let g=0,_=h.length;g<_;g++){let m=h[g],p=g*d;if(a[m]===void 0&&(a[m]={}),u.arraySyntax===!0){let b=f[p],M=u.indices[0]+4*u.indices[1];a[m][M]=b}else for(let b=0;b<d;b++)a[m][b]=f[p+b]}}let o=this.prepareAnimationData(a,r),c={name:e.uuid,keyframes:o};this.createKeyframeTracks(c,i)}buildTranslateTrack(e,t,n,i){if(t.default&&t.default.stride===3){let l=t.default,u=Array.from(l.times),h=Array.from(l.values),f=new Lt(e.uuid+".position",u,h),d=this.getInterpolationInfo(t);this.applyInterpolation(f,d,t),i.push(f);return}let r=this.getTimesForAllAxes(t);if(r.length===0)return;let a=[],o=this.getInterpolationInfo(t);for(let l=0;l<r.length;l++){let u=r[l],h=this.getValueAtTime(t.X,u,n.x),f=this.getValueAtTime(t.Y,u,n.y),d=this.getValueAtTime(t.Z,u,n.z);a.push(h,f,d)}let c=new Lt(e.uuid+".position",r,a);this.applyInterpolation(c,o),i.push(c)}buildRotateTrack(e,t,n,i,r,a){let o=n.ANGLE||n.default;if(!o)return;let c=Array.from(o.times);if(c.length===0)return;let l=[];for(let m of r.transformOrder)if(r.transforms[m]==="rotate"){let b=r.transformData[m];l.push({sid:m,axis:new L(b.axis[0],b.axis[1],b.axis[2]),defaultAngle:b.angle})}let u=new ut,h=new ut,f=new ut,d=[],g=this.getInterpolationInfo(n);for(let m=0;m<c.length;m++){let p=c[m];u.identity();for(let b of l){let M;b.sid===t?M=this.getValueAtTime(o,p,b.defaultAngle):M=b.defaultAngle;let y=$t.degToRad(M);f.setFromAxisAngle(b.axis,y),u.multiply(f)}m>0&&h.dot(u)<0&&(u.x=-u.x,u.y=-u.y,u.z=-u.z,u.w=-u.w),h.copy(u),d.push(u.x,u.y,u.z,u.w)}let _=new Sn(e.uuid+".quaternion",c,d);this.applyInterpolation(_,g),a.push(_)}buildScaleTrack(e,t,n,i){if(t.default&&t.default.stride===3){let l=t.default,u=Array.from(l.times),h=Array.from(l.values),f=new Lt(e.uuid+".scale",u,h),d=this.getInterpolationInfo(t);this.applyInterpolation(f,d,t),i.push(f);return}let r=this.getTimesForAllAxes(t);if(r.length===0)return;let a=[],o=this.getInterpolationInfo(t);for(let l=0;l<r.length;l++){let u=r[l],h=this.getValueAtTime(t.X,u,n.x),f=this.getValueAtTime(t.Y,u,n.y),d=this.getValueAtTime(t.Z,u,n.z);a.push(h,f,d)}let c=new Lt(e.uuid+".scale",r,a);this.applyInterpolation(c,o),i.push(c)}getTimesForAllAxes(e){let t=[];return e.X&&(t=t.concat(Array.from(e.X.times))),e.Y&&(t=t.concat(Array.from(e.Y.times))),e.Z&&(t=t.concat(Array.from(e.Z.times))),e.ANGLE&&(t=t.concat(Array.from(e.ANGLE.times))),e.default&&(t=t.concat(Array.from(e.default.times))),t=[...new Set(t)].sort((n,i)=>n-i),t}getValueAtTime(e,t,n){if(!e)return n;let i=e.times,r=e.values,a=e.interpolation;for(let o=0;o<i.length;o++){if(i[o]===t)return r[o];if(i[o]>t){if(o===0)return r[0];let c=o-1,l=o,u=i[c],h=i[l],f=r[c],d=r[l],g=a?a[c]:"LINEAR";if(g==="STEP")return f;if(g==="BEZIER"&&e.inTangent&&e.outTangent)return this.evaluateBezierComponent(e,c,l,u,h,t);{let _=(t-u)/(h-u);return f+_*(d-f)}}}return r[r.length-1]}evaluateBezierComponent(e,t,n,i,r,a){let o=e.values,c=e.inTangent,l=e.outTangent,u=e.inTangentStride||1,h=o[t],f=o[n],d,g,_,m;u===2?(d=l[t*2],g=l[t*2+1],_=c[n*2],m=c[n*2+1]):(d=i+(r-i)/3,g=l[t],_=r-(r-i)/3,m=c[n]);let p=(a-i)/(r-i);for(let E=0;E<8;E++){let x=p*p,S=x*p,R=1-p,C=R*R,F=C*R*i+3*C*p*d+3*R*x*_+S*r,V=3*C*(d-i)+6*R*p*(_-d)+3*x*(r-_);if(Math.abs(V)<1e-10)break;let O=F-a;if(Math.abs(O)<1e-10)break;p=p-O/V,p=Math.max(0,Math.min(1,p))}let b=p*p,M=b*p,y=1-p,T=y*y;return T*y*h+3*T*p*g+3*y*b*m+M*f}getInterpolationInfo(e){let t=["X","Y","Z","ANGLE","default"],n=null,i=!0;for(let r of t){let a=e[r];if(!a||!a.interpolation)continue;let o=a.interpolation;for(let c=0;c<o.length;c++){let l=o[c];n===null?n=l:l!==n&&(i=!1)}}return{type:n||"LINEAR",uniform:i}}applyInterpolation(e,t,n=null){if(t.type==="STEP"&&t.uniform)e.setInterpolation(mi);else if(t.type==="BEZIER"&&t.uniform&&n){let i=n.default;i&&i.inTangent&&i.outTangent&&(e.setInterpolation(_r),e.settings={inTangents:new Float32Array(i.inTangent),outTangents:new Float32Array(i.outTangent)})}}prepareAnimationData(e,t){let n=[];for(let i in e)n.push({time:parseFloat(i),value:e[i]});n.sort((i,r)=>i.time-r.time);for(let i=0;i<16;i++)this.transformAnimationData(n,i,t.elements[i]);return n}createKeyframeTracks(e,t){let n=e.keyframes,i=e.name,r=[],a=[],o=[],c=[],l=this.position,u=this.quaternion,h=this.scale,f=this.matrix;for(let d=0,g=n.length;d<g;d++){let _=n[d],m=_.time,p=_.value;f.fromArray(p).transpose(),f.decompose(l,u,h),r.push(m),a.push(l.x,l.y,l.z),o.push(u.x,u.y,u.z,u.w),c.push(h.x,h.y,h.z)}return a.length>0&&t.push(new Lt(i+".position",r,a)),o.length>0&&t.push(new Sn(i+".quaternion",r,o)),c.length>0&&t.push(new Lt(i+".scale",r,c)),t}transformAnimationData(e,t,n){let i,r=!0,a,o;for(a=0,o=e.length;a<o;a++)i=e[a],i.value[t]===void 0?i.value[t]=null:r=!1;if(r===!0)for(a=0,o=e.length;a<o;a++)i=e[a],i.value[t]=n;else this.createMissingKeyframes(e,t)}createMissingKeyframes(e,t){let n,i;for(let r=0,a=e.length;r<a;r++){let o=e[r];if(o.value[t]===null){if(n=this.getPrev(e,r,t),i=this.getNext(e,r,t),n===null){o.value[t]=i.value[t];continue}if(i===null){o.value[t]=n.value[t];continue}this.interpolate(o,n,i,t)}}}getPrev(e,t,n){for(;t>=0;){let i=e[t];if(i.value[n]!==null)return i;t--}return null}getNext(e,t,n){for(;t<e.length;){let i=e[t];if(i.value[n]!==null)return i;t++}return null}interpolate(e,t,n,i){if(n.time-t.time===0){e.value[i]=t.value[i];return}e.value[i]=(e.time-t.time)*(n.value[i]-t.value[i])/(n.time-t.time)+t.value[i]}buildAnimationClip(e){let t=[],n=e.name,i=e.end-e.start||-1,r=e.animations;for(let a=0,o=r.length;a<o;a++){let c=this.getAnimation(r[a]);for(let l=0,u=c.length;l<u;l++)t.push(c[l])}return new Fi(n,i,t)}getAnimationClip(e){return this.getBuild(this.library.clips[e],this.buildAnimationClip.bind(this))}buildController(e){let t={id:e.id},n=this.library.geometries[t.id];return e.skin!==void 0&&(t.skin=this.buildSkin(e.skin),n.sources.skinIndices=t.skin.indices,n.sources.skinWeights=t.skin.weights),t}buildSkin(e){let n={joints:[],indices:{array:[],stride:4},weights:{array:[],stride:4}},i=e.sources,r=e.vertexWeights,a=r.vcount,o=r.v,c=r.inputs.JOINT.offset,l=r.inputs.WEIGHT.offset,u=e.sources[e.joints.inputs.JOINT],h=e.sources[e.joints.inputs.INV_BIND_MATRIX],f=i[r.inputs.WEIGHT.id].array,d=0,g,_,m;for(g=0,m=a.length;g<m;g++){let b=a[g],M=[];for(_=0;_<b;_++){let y=o[d+c],T=o[d+l],w=f[T];M.push({index:y,weight:w}),d+=2}for(M.sort(p),_=0;_<4;_++){let y=M[_];y!==void 0?(n.indices.array.push(y.index),n.weights.array.push(y.weight)):(n.indices.array.push(0),n.weights.array.push(0))}}for(e.bindShapeMatrix?n.bindMatrix=new Ee().fromArray(e.bindShapeMatrix).transpose():n.bindMatrix=new Ee().identity(),g=0,m=u.array.length;g<m;g++){let b=u.array[g],M=new Ee().fromArray(h.array,g*h.stride).transpose();n.joints.push({name:b,boneInverse:M})}return n;function p(b,M){return M.weight-b.weight}}getController(e){return this.getBuild(this.library.controllers[e],this.buildController.bind(this))}buildImage(e){return e.build!==void 0?e.build:e.init_from}getImage(e){let t=this.library.images[e];return t!==void 0?this.getBuild(t,this.buildImage.bind(this)):(console.warn("THREE.ColladaLoader: Couldn't find image with ID:",e),null)}buildEffect(e){return e}getEffect(e){return this.getBuild(this.library.effects[e],this.buildEffect.bind(this))}getTextureLoader(e){let t,n=e.slice((e.lastIndexOf(".")-1>>>0)+2);return n=n.toLowerCase(),n==="tga"?t=this.tgaLoader:t=this.textureLoader,t}buildMaterial(e){let t=this.getEffect(e.url),n=t.profile.technique,i;switch(n.type){case"phong":case"blinn":i=new Qn;break;case"lambert":i=new Ur;break;default:i=new Jt;break}i.name=e.name||"";let r=this;function a(u,h=null){let f=t.profile.samplers[u.id],d=null;if(f!==void 0){let g=t.profile.surfaces[f.source];d=r.getImage(g.init_from)}else console.warn("THREE.ColladaLoader: Undefined sampler. Access image directly (see #12530)."),d=r.getImage(u.id);if(d!==null){let g=r.getTextureLoader(d);if(g!==void 0){let _=g.load(d),m=u.extra;if(m!==void 0&&m.technique!==void 0&&r.isEmpty(m.technique)===!1){let p=m.technique;_.wrapS=p.wrapU?yn:Gt,_.wrapT=p.wrapV?yn:Gt,_.offset.set(p.offsetU||0,p.offsetV||0),_.repeat.set(p.repeatU||1,p.repeatV||1)}else _.wrapS=yn,_.wrapT=yn;return h!==null&&(_.colorSpace=h),_}else return console.warn("THREE.ColladaLoader: Loader for texture %s not found.",d),null}else return console.warn("THREE.ColladaLoader: Couldn't create texture with ID:",u.id),null}let o=n.parameters;for(let u in o){let h=o[u];switch(u){case"diffuse":h.color&&i.color.fromArray(h.color),h.texture&&(i.map=a(h.texture,Ke));break;case"specular":h.color&&i.specular&&i.specular.fromArray(h.color),h.texture&&(i.specularMap=a(h.texture));break;case"bump":h.texture&&(i.normalMap=a(h.texture));break;case"ambient":h.texture&&(i.lightMap=a(h.texture,Ke));break;case"shininess":h.float&&i.shininess&&(i.shininess=h.float);break;case"emission":h.color&&i.emissive&&i.emissive.fromArray(h.color),h.texture&&(i.emissiveMap=a(h.texture,Ke));break}}Be.colorSpaceToWorking(i.color,Ke),i.specular&&Be.colorSpaceToWorking(i.specular,Ke),i.emissive&&Be.colorSpaceToWorking(i.emissive,Ke);let c=o.transparent,l=o.transparency;if(l===void 0&&c&&(l={float:1}),c===void 0&&l&&(c={opaque:"A_ONE",data:{color:[1,1,1,1]}}),c&&l)if(c.data.texture)i.transparent=!0;else{let u=c.data.color;switch(c.opaque){case"A_ONE":i.opacity=u[3]*l.float;break;case"RGB_ZERO":i.opacity=1-u[0]*l.float;break;case"A_ZERO":i.opacity=1-u[3]*l.float;break;case"RGB_ONE":i.opacity=u[0]*l.float;break;default:console.warn('THREE.ColladaLoader: Invalid opaque type "%s" of transparent tag.',c.opaque)}i.opacity<1&&(i.transparent=!0)}if(n.extra!==void 0&&n.extra.technique!==void 0){let u=n.extra.technique;for(let h in u){let f=u[h];switch(h){case"double_sided":i.side=f===1?un:_n;break;case"bump":i.normalMap=a(f.texture),i.normalScale=new Te(1,1);break}}}return i}getMaterial(e){return this.getBuild(this.library.materials[e],this.buildMaterial.bind(this))}buildCamera(e){let t;switch(e.optics.technique){case"perspective":t=new xt(e.optics.parameters.yfov,e.optics.parameters.aspect_ratio,e.optics.parameters.znear,e.optics.parameters.zfar);break;case"orthographic":let n=e.optics.parameters.ymag,i=e.optics.parameters.xmag,r=e.optics.parameters.aspect_ratio;i=i===void 0?n*r:i,n=n===void 0?i/r:n,i*=.5,n*=.5,t=new ti(-i,i,n,-n,e.optics.parameters.znear,e.optics.parameters.zfar);break;default:t=new xt;break}return t.name=e.name||"",t}getCamera(e){let t=this.library.cameras[e];return t!==void 0?this.getBuild(t,this.buildCamera.bind(this)):(console.warn("THREE.ColladaLoader: Couldn't find camera with ID:",e),null)}buildLight(e){let t;switch(e.technique){case"directional":t=new ni;break;case"point":t=new fs;break;case"spot":t=new us;break;case"ambient":t=new Hr;break}return e.parameters.color&&t.color.copy(e.parameters.color),e.parameters.distance&&(t.distance=e.parameters.distance),e.parameters.falloffAngle&&(t.angle=$t.degToRad(e.parameters.falloffAngle)),t}getLight(e){let t=this.library.lights[e];return t!==void 0?this.getBuild(t,this.buildLight.bind(this)):(console.warn("THREE.ColladaLoader: Couldn't find light with ID:",e),null)}groupPrimitives(e){let t={};for(let n=0;n<e.length;n++){let i=e[n];t[i.type]===void 0&&(t[i.type]=[]),t[i.type].push(i)}return t}checkUVCoordinates(e){let t=0;for(let n=0,i=e.length;n<i;n++)e[n].hasUV===!0&&t++;t>0&&t<e.length&&(e.uvsNeedsFix=!0)}buildGeometry(e){let t={},n=e.sources,i=e.vertices,r=e.primitives;if(r.length===0)return{};let a=this.groupPrimitives(r);for(let o in a){let c=a[o];this.checkUVCoordinates(c),t[o]=this.buildGeometryType(c,n,i)}return t}buildGeometryType(e,t,n){let i={},r={array:[],stride:0},a={array:[],stride:0},o={array:[],stride:0},c={array:[],stride:0},l={array:[],stride:0},u={array:[],stride:4},h={array:[],stride:4},f=new pt,d=[],g=0;for(let _=0;_<e.length;_++){let m=e[_],p=m.inputs,b=0;switch(m.type){case"lines":case"linestrips":b=m.count*2;break;case"triangles":b=m.count*3;break;case"polygons":case"polylist":for(let M=0;M<m.count;M++){let y=m.vcount[M];switch(y){case 3:b+=3;break;case 4:b+=6;break;default:b+=(y-2)*3;break}}break;default:console.warn("THREE.ColladaLoader: Unknown primitive type:",m.type)}f.addGroup(g,b,_),g+=b,m.material&&d.push(m.material);for(let M in p){let y=p[M];switch(M){case"VERTEX":for(let T in n){let w=n[T];switch(T){case"POSITION":let E=r.array.length;if(this.buildGeometryData(m,t[w],y.offset,r.array),r.stride=t[w].stride,t.skinWeights&&t.skinIndices&&(this.buildGeometryData(m,t.skinIndices,y.offset,u.array),this.buildGeometryData(m,t.skinWeights,y.offset,h.array)),m.hasUV===!1&&e.uvsNeedsFix===!0){let x=(r.array.length-E)/r.stride;for(let S=0;S<x;S++)o.array.push(0,0)}break;case"NORMAL":this.buildGeometryData(m,t[w],y.offset,a.array),a.stride=t[w].stride;break;case"COLOR":this.buildGeometryData(m,t[w],y.offset,l.array),l.stride=t[w].stride;break;case"TEXCOORD":this.buildGeometryData(m,t[w],y.offset,o.array),o.stride=t[w].stride;break;case"TEXCOORD1":this.buildGeometryData(m,t[w],y.offset,c.array),o.stride=t[w].stride;break;default:console.warn('THREE.ColladaLoader: Semantic "%s" not handled in geometry build process.',T)}}break;case"NORMAL":this.buildGeometryData(m,t[y.id],y.offset,a.array),a.stride=t[y.id].stride;break;case"COLOR":this.buildGeometryData(m,t[y.id],y.offset,l.array,!0),l.stride=t[y.id].stride;break;case"TEXCOORD":this.buildGeometryData(m,t[y.id],y.offset,o.array),o.stride=t[y.id].stride;break;case"TEXCOORD1":this.buildGeometryData(m,t[y.id],y.offset,c.array),c.stride=t[y.id].stride;break}}}return r.array.length>0&&f.setAttribute("position",new Ve(r.array,r.stride)),a.array.length>0&&f.setAttribute("normal",new Ve(a.array,a.stride)),l.array.length>0&&f.setAttribute("color",new Ve(l.array,l.stride)),o.array.length>0&&f.setAttribute("uv",new Ve(o.array,o.stride)),c.array.length>0&&f.setAttribute("uv1",new Ve(c.array,c.stride)),u.array.length>0&&f.setAttribute("skinIndex",new Ve(u.array,u.stride)),h.array.length>0&&f.setAttribute("skinWeight",new Ve(h.array,h.stride)),i.data=f,i.type=e[0].type,i.materialKeys=d,i}buildGeometryData(e,t,n,i,r=!1){let a=e.p,o=e.stride,c=e.vcount,l=this.tempColor;function u(d){let g=a[d+n]*f,_=g+f;for(;g<_;g++)i.push(h[g]);if(r){let m=i.length-f-1;l.setRGB(i[m+0],i[m+1],i[m+2],Ke),i[m+0]=l.r,i[m+1]=l.g,i[m+2]=l.b}}let h=t.array,f=t.stride;if(e.vcount!==void 0){let d=0;for(let g=0,_=c.length;g<_;g++){let m=c[g];if(m===4){let p=d+o*0,b=d+o*1,M=d+o*2,y=d+o*3;u(p),u(b),u(y),u(b),u(M),u(y)}else if(m===3){let p=d+o*0,b=d+o*1,M=d+o*2;u(p),u(b),u(M)}else if(m>4){let p=[];for(let E=0;E<m;E++){let x=d+o*E,S=a[x]*f,R=h[S],C=h[S+1],I=h[S+2];p.push(new L(R,C,I))}let b=new L,M=new Fn;M.a=p[0],M.b=p[1],M.c=p[2],M.getNormal(b);let y=[];if(Math.abs(b.x)>Math.abs(b.y)&&Math.abs(b.x)>Math.abs(b.z))for(let E=0;E<m;E++)y.push(new Te(p[E].y,p[E].z));else if(Math.abs(b.y)>Math.abs(b.z))for(let E=0;E<m;E++)y.push(new Te(p[E].x,p[E].z));else for(let E=0;E<m;E++)y.push(new Te(p[E].x,p[E].y));let T=Ys.isClockWise(y);T===!0&&y.reverse();let w=Ys.triangulateShape(y,[]);for(let E=0;E<w.length;E++){let x=w[E],S,R,C;T===!1?(S=x[0],R=x[1],C=x[2]):(S=m-1-x[0],R=m-1-x[2],C=m-1-x[1]);let I=d+o*S,F=d+o*R,V=d+o*C;u(I),u(F),u(V)}}d+=o*m}}else for(let d=0,g=a.length;d<g;d+=o)u(d)}getGeometry(e){return this.getBuild(this.library.geometries[e],this.buildGeometry.bind(this))}buildKinematicsModel(e){return e.build!==void 0?e.build:e}getKinematicsModel(e){return this.getBuild(this.library.kinematicsModels[e],this.buildKinematicsModel.bind(this))}buildKinematicsScene(e){return e.build!==void 0?e.build:e}getKinematicsScene(e){return this.getBuild(this.library.kinematicsScenes[e],this.buildKinematicsScene.bind(this))}setupKinematics(){let e=Object.keys(this.library.kinematicsModels)[0],t=Object.keys(this.library.kinematicsScenes)[0],n=Object.keys(this.library.visualScenes)[0];if(e===void 0||t===void 0)return;let i=this.getKinematicsModel(e),r=this.getKinematicsScene(t),a=this.getVisualScene(n),o=r.bindJointAxis,c={},l=this.collada,u=this;for(let g=0,_=o.length;g<_;g++){let m=o[g],p=l.querySelector('[sid="'+m.target+'"]');if(p){let b=p.parentElement;h(m.jointIndex,b)}}function h(g,_){let m=_.getAttribute("name"),p=i.joints[g],b=u.buildTransformList(_);a.traverse(function(M){M.name===m&&(c[g]={object:M,transforms:b,joint:p,position:p.zeroPosition})})}let f=new Ee,d=this.matrix;this.kinematics={joints:i&&i.joints,getJointValue:function(g){let _=c[g];if(_)return _.position;console.warn("THREE.ColladaLoader: Joint "+g+" doesn't exist.")},setJointValue:function(g,_){let m=c[g];if(m){let p=m.joint;if(_>p.limits.max||_<p.limits.min)console.warn("THREE.ColladaLoader: Joint "+g+" value "+_+" outside of limits (min: "+p.limits.min+", max: "+p.limits.max+").");else if(p.static)console.warn("THREE.ColladaLoader: Joint "+g+" is static.");else{let b=m.object,M=p.axis,y=m.transforms;d.identity();for(let T=0;T<y.length;T++){let w=y[T];if(w.sid&&w.sid.indexOf(g)!==-1)switch(p.type){case"revolute":d.multiply(f.makeRotationAxis(M,$t.degToRad(_)));break;case"prismatic":d.multiply(f.makeTranslation(M.x*_,M.y*_,M.z*_));break;default:console.warn("THREE.ColladaLoader: Unknown joint type: "+p.type);break}else switch(w.type){case"matrix":d.multiply(w.obj);break;case"translate":d.multiply(f.makeTranslation(w.obj.x,w.obj.y,w.obj.z));break;case"scale":d.scale(w.obj);break;case"rotate":d.multiply(f.makeRotationAxis(w.obj,w.angle));break}}b.matrix.copy(d),b.matrix.decompose(b.position,b.quaternion,b.scale),c[g].position=_}}else console.warn("THREE.ColladaLoader: Joint "+g+" does not exist.")}}}buildTransformList(e){let t=[],n=this.collada.querySelector('[id="'+e.id+'"]');for(let i=0;i<n.childNodes.length;i++){let r=n.childNodes[i];if(r.nodeType!==1)continue;let a,o;switch(r.nodeName){case"matrix":a=en(r.textContent);let c=new Ee().fromArray(a).transpose();t.push({sid:r.getAttribute("sid"),type:r.nodeName,obj:c});break;case"translate":case"scale":a=en(r.textContent),o=new L().fromArray(a),t.push({sid:r.getAttribute("sid"),type:r.nodeName,obj:o});break;case"rotate":a=en(r.textContent),o=new L().fromArray(a);let l=$t.degToRad(a[3]);t.push({sid:r.getAttribute("sid"),type:r.nodeName,obj:o,angle:l});break}}return t}buildSkeleton(e,t){let n=[],i=[],r,a,o;for(r=0;r<e.length;r++){let u=e[r],h;if(this.hasNode(u))h=this.getNode(u),this.buildBoneHierarchy(h,t,n);else if(this.hasVisualScene(u)){let d=this.library.visualScenes[u].children;for(let g=0;g<d.length;g++){let _=d[g];if(_.type==="JOINT"){let m=this.getNode(_.id);this.buildBoneHierarchy(m,t,n)}}}else console.error("THREE.ColladaLoader: Unable to find root bone of skeleton with ID:",u)}for(r=0;r<t.length;r++)for(a=0;a<n.length;a++)if(o=n[a],o.bone.name===t[r].name){i[r]=o,o.processed=!0;break}for(r=0;r<n.length;r++)o=n[r],o.processed===!1&&(i.push(o),o.processed=!0);let c=[],l=[];for(r=0;r<i.length;r++)o=i[r],c.push(o.bone),l.push(o.boneInverse);return new as(c,l)}buildBoneHierarchy(e,t,n){e.traverse(function(i){if(i.isBone===!0){let r;for(let a=0;a<t.length;a++){let o=t[a];if(o.name===i.name){r=o.boneInverse;break}}r===void 0&&(r=new Ee),n.push({bone:i,boneInverse:r,processed:!1})}})}buildNode(e){let t=[],n=e.matrix,i=e.nodes,r=e.type,a=e.instanceCameras,o=e.instanceControllers,c=e.instanceLights,l=e.instanceGeometries,u=e.instanceNodes;for(let f=0,d=i.length;f<d;f++)t.push(this.getNode(i[f]));for(let f=0,d=a.length;f<d;f++){let g=this.getCamera(a[f]);g!==null&&t.push(g.clone())}for(let f=0,d=o.length;f<d;f++){let g=o[f],_=this.getController(g.id),m=this.getGeometry(_.id),p=this.buildObjects(m,g.materials),b=g.skeletons,M=_.skin.joints,y=this.buildSkeleton(b,M);for(let T=0,w=p.length;T<w;T++){let E=p[T];E.isSkinnedMesh&&(E.bind(y,_.skin.bindMatrix),E.normalizeSkinWeights()),t.push(E)}}for(let f=0,d=c.length;f<d;f++){let g=this.getLight(c[f]);g!==null&&t.push(g.clone())}for(let f=0,d=l.length;f<d;f++){let g=l[f],_=this.getGeometry(g.id),m=this.buildObjects(_,g.materials);for(let p=0,b=m.length;p<b;p++)t.push(m[p])}for(let f=0,d=u.length;f<d;f++)t.push(this.getNode(u[f]).clone());let h;if(i.length===0&&t.length===1)h=t[0];else{h=r==="JOINT"?new Ni:new it;for(let f=0;f<t.length;f++)h.add(t[f])}return h.name=r==="JOINT"?e.sid:e.name,r!=="JOINT"&&this.hasPivotTransforms(e)?this.wrapWithTransformHierarchy(h,e):(h.matrix.copy(n),h.matrix.decompose(h.position,h.quaternion,h.scale),h)}wrapWithTransformHierarchy(e,t){let n=t.id;this.transformNodes[n]={};let i=t.transformOrder,r=t.transformData,a=new it;a.name=t.name;let o=a;for(let c=0;c<i.length;c++){let l=i[c],u=r[l],h=new it;switch(h.name=t.name+"_"+l,u.type){case"translate":h.position.set(u.x,u.y,u.z);break;case"rotate":{let f=new L(u.axis[0],u.axis[1],u.axis[2]),d=$t.degToRad(u.angle);h.quaternion.setFromAxisAngle(f,d),h.userData.rotationAxis=f;break}case"scale":h.scale.set(u.x,u.y,u.z);break;case"matrix":{new Ee().fromArray(u.array).transpose().decompose(h.position,h.quaternion,h.scale);break}}this.transformNodes[n][l]=h,o.add(h),o=h}return o.add(e),a}resolveMaterialBinding(e,t){let n=[];for(let i=0,r=e.length;i<r;i++){let a=t[e[i]];a===void 0?(console.warn("THREE.ColladaLoader: Material with key %s not found. Apply fallback material.",e[i]),n.push(this.fallbackMaterial)):n.push(this.getMaterial(a))}return n}get fallbackMaterial(){return this._fallbackMaterial===void 0&&(this._fallbackMaterial=new Jt({name:Xt.DEFAULT_MATERIAL_NAME,color:16711935})),this._fallbackMaterial}buildObjects(e,t){let n=[];for(let i in e){let r=e[i],a=this.resolveMaterialBinding(r.materialKeys,t);if(a.length===0&&(i==="lines"||i==="linestrips"?a.push(new Rn):a.push(new Qn)),i==="lines"||i==="linestrips")for(let u=0,h=a.length;u<h;u++){let f=a[u];if(f.isMeshPhongMaterial===!0||f.isMeshLambertMaterial===!0){let d=new Rn;d.color.copy(f.color),d.opacity=f.opacity,d.transparent=f.transparent,a[u]=d}}let o=r.data.attributes.skinIndex!==void 0,c=a.length===1?a[0]:a,l;switch(i){case"lines":l=new jn(r.data,c);break;case"linestrips":l=new gi(r.data,c);break;case"triangles":case"polygons":case"polylist":o?l=new rs(r.data,c):l=new st(r.data,c);break}n.push(l)}return n}hasNode(e){return this.library.nodes[e]!==void 0}getNode(e){return this.getBuild(this.library.nodes[e],this.buildNode.bind(this))}buildVisualScene(e){let t=new it;t.name=e.name;let n=e.children;for(let i=0;i<n.length;i++){let r=n[i];t.add(this.getNode(r.id))}return t}hasVisualScene(e){return this.library.visualScenes[e]!==void 0}getVisualScene(e){return this.getBuild(this.library.visualScenes[e],this.buildVisualScene.bind(this))}parseScene(e){let t=pn(e,"instance_visual_scene")[0];return this.getVisualScene(this.parseId(t.getAttribute("url")))}parseId(e){return e.substring(1)}setupAnimations(){let e=this.library.clips;if(this.isEmpty(e)===!0){if(this.isEmpty(this.library.animations)===!1){let t=[];for(let n in this.library.animations){let i=this.getAnimation(n);for(let r=0,a=i.length;r<a;r++)t.push(i[r])}this.buildDeferredPivotAnimationTracks(t),this.animations.push(new Fi("default",-1,t))}}else for(let t in e)this.animations.push(this.getAnimationClip(t))}buildDeferredPivotAnimationTracks(e){for(let t in this.deferredPivotAnimations){let n=this.library.nodes[t];if(!n)continue;let i=this.deferredPivotAnimations[t];this.buildTransformHierarchyTracks(t,i,n,e)}}buildTransformHierarchyTracks(e,t,n,i){let r=this.transformNodes[e];if(!r){console.warn("THREE.ColladaLoader: Transform hierarchy not found for node:",e);return}for(let a in t){let o=r[a];if(!o)continue;let c=n.transforms[a],l=n.transformData[a],u=t[a];switch(c){case"translate":this.buildHierarchyTranslateTrack(o,u,l,i);break;case"rotate":this.buildHierarchyRotateTrack(o,u,l,i);break;case"scale":this.buildHierarchyScaleTrack(o,u,l,i);break}}}buildHierarchyTranslateTrack(e,t,n,i){if(t.default&&t.default.stride===3){let l=t.default,u=new Lt(e.uuid+".position",Array.from(l.times),Array.from(l.values)),h=this.getInterpolationInfo(t);this.applyInterpolation(u,h,t),i.push(u);return}let r=this.getTimesForAllAxes(t);if(r.length===0)return;let a=[],o=this.getInterpolationInfo(t);for(let l=0;l<r.length;l++){let u=r[l],h=this.getValueAtTime(t.X,u,n.x),f=this.getValueAtTime(t.Y,u,n.y),d=this.getValueAtTime(t.Z,u,n.z);a.push(h,f,d)}let c=new Lt(e.uuid+".position",r,a);this.applyInterpolation(c,o),i.push(c)}buildHierarchyRotateTrack(e,t,n,i){let r=t.ANGLE||t.default;if(!r)return;let a=Array.from(r.times);if(a.length===0)return;let o=e.userData.rotationAxis||new L(n.axis[0],n.axis[1],n.axis[2]),c=new ut,l=new ut,u=[],h=this.getInterpolationInfo(t);for(let d=0;d<a.length;d++){let g=a[d],_=this.getValueAtTime(r,g,n.angle),m=$t.degToRad(_);c.setFromAxisAngle(o,m),d>0&&l.dot(c)<0&&(c.x=-c.x,c.y=-c.y,c.z=-c.z,c.w=-c.w),l.copy(c),u.push(c.x,c.y,c.z,c.w)}let f=new Sn(e.uuid+".quaternion",a,u);this.applyInterpolation(f,h),i.push(f)}buildHierarchyScaleTrack(e,t,n,i){if(t.default&&t.default.stride===3){let l=t.default,u=new Lt(e.uuid+".scale",Array.from(l.times),Array.from(l.values)),h=this.getInterpolationInfo(t);this.applyInterpolation(u,h,t),i.push(u);return}let r=this.getTimesForAllAxes(t);if(r.length===0)return;let a=[],o=this.getInterpolationInfo(t);for(let l=0;l<r.length;l++){let u=r[l],h=this.getValueAtTime(t.X,u,n.x),f=this.getValueAtTime(t.Y,u,n.y),d=this.getValueAtTime(t.Z,u,n.z);a.push(h,f,d)}let c=new Lt(e.uuid+".scale",r,a);this.applyInterpolation(c,o),i.push(c)}};var Cl=class extends Xt{load(e,t,n,i){let r=this,a=r.path===""?Mn.extractUrlBase(e):r.path,o=new zn(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(c){try{t(r.parse(c,a))}catch(l){i?i(l):console.error(l),r.manager.itemError(e)}},n,i)}parse(e,t){if(e.length===0)return{scene:new ss};let i=new Al().parse(e);if(i===null)return null;let{library:r,asset:a,collada:o}=i,c=new bi(this.manager);c.setPath(this.resourcePath||t).setCrossOrigin(this.crossOrigin);let l;oa&&(l=new oa(this.manager),l.setPath(this.resourcePath||t));let u=new El(r,o,c,l),{scene:h,animations:f,kinematics:d}=u.compose();return h.animations=f,a.upAxis==="Z_UP"&&(console.warn("THREE.ColladaLoader: You are loading an asset with a Z-UP coordinate system. The loader just rotates the asset to transform it into Y-UP. The vertex data are not converted, see #24289."),h.rotation.set(-Math.PI/2,0,0)),h.scale.multiplyScalar(a.unit),{get animations(){return console.warn("THREE.ColladaLoader: Please access animations over scene.animations now."),f},kinematics:d,library:r,scene:h}}};var Gd=new L,Dy=new rn,Rl=new Ee,Xi=new Ee,Pl=new ut,Il=new L(1,1,1),Ll=new L,ar=class extends dt{constructor(...e){super(...e),this.urdfNode=null,this.urdfName=""}copy(e,t){return super.copy(e,t),this.urdfNode=e.urdfNode,this.urdfName=e.urdfName,this}},Nl=class extends ar{constructor(...e){super(...e),this.isURDFCollider=!0,this.type="URDFCollider"}},Dl=class extends ar{constructor(...e){super(...e),this.isURDFVisual=!0,this.type="URDFVisual"}},la=class extends ar{constructor(...e){super(...e),this.isURDFLink=!0,this.type="URDFLink",this.name="",this.inertial={mass:0,origin:{xyz:[0,0,0],rpy:[0,0,0]},inertia:{ixx:0,ixy:0,ixz:0,iyy:0,iyz:0,izz:0}}}copy(e,t){return super.copy(e,t),this.inertial={mass:e.inertial.mass,origin:{xyz:[...e.inertial.origin.xyz],rpy:[...e.inertial.origin.rpy]},inertia:{...e.inertial.inertia}},this}},ca=class extends ar{get jointType(){return this._jointType}set jointType(e){if(this.jointType!==e)switch(this._jointType=e,this.matrixWorldNeedsUpdate=!0,e){case"fixed":this.jointValue=[];break;case"continuous":case"revolute":case"prismatic":this.jointValue=new Array(1).fill(0);break;case"planar":this.jointValue=new Array(3).fill(0),this.axis=new L(0,0,1);break;case"floating":this.jointValue=new Array(6).fill(0);break}}get angle(){return this.jointValue[0]}constructor(...e){super(...e),this.isURDFJoint=!0,this.type="URDFJoint",this.name="",this.jointValue=null,this.jointType="fixed",this.axis=new L(1,0,0),this.limit={lower:0,upper:0,effort:0,velocity:0},this.ignoreLimits=!1,this.origPosition=null,this.origQuaternion=null,this.mimicJoints=[]}copy(e,t){return super.copy(e,t),this.jointType=e.jointType,this.axis=e.axis.clone(),this.limit.lower=e.limit.lower,this.limit.upper=e.limit.upper,this.limit.effort=e.limit.effort,this.limit.velocity=e.limit.velocity,this.ignoreLimits=!1,this.jointValue=[...e.jointValue],this.origPosition=e.origPosition?e.origPosition.clone():null,this.origQuaternion=e.origQuaternion?e.origQuaternion.clone():null,this.mimicJoints=[...e.mimicJoints],this}setJointValue(...e){e=e.map(n=>n===null?null:parseFloat(n)),(!this.origPosition||!this.origQuaternion)&&(this.origPosition=this.position.clone(),this.origQuaternion=this.quaternion.clone());let t=!1;switch(this.mimicJoints.forEach(n=>{t=n.updateFromMimickedJoint(...e)||t}),this.jointType){case"fixed":return t;case"continuous":case"revolute":{let n=e[0];return n==null||n===this.jointValue[0]?t:(!this.ignoreLimits&&this.jointType==="revolute"&&(n=Math.min(this.limit.upper,n),n=Math.max(this.limit.lower,n)),this.quaternion.setFromAxisAngle(this.axis,n).premultiply(this.origQuaternion),this.jointValue[0]!==n?(this.jointValue[0]=n,this.matrixWorldNeedsUpdate=!0,!0):t)}case"prismatic":{let n=e[0];return n==null||n===this.jointValue[0]?t:(this.ignoreLimits||(n=Math.min(this.limit.upper,n),n=Math.max(this.limit.lower,n)),this.position.copy(this.origPosition),Gd.copy(this.axis).applyEuler(this.rotation),this.position.addScaledVector(Gd,n),this.jointValue[0]!==n?(this.jointValue[0]=n,this.matrixWorldNeedsUpdate=!0,!0):t)}case"floating":return this.jointValue.every((n,i)=>e[i]===n||e[i]===null)?t:(this.jointValue[0]=e[0]!==null?e[0]:this.jointValue[0],this.jointValue[1]=e[1]!==null?e[1]:this.jointValue[1],this.jointValue[2]=e[2]!==null?e[2]:this.jointValue[2],this.jointValue[3]=e[3]!==null?e[3]:this.jointValue[3],this.jointValue[4]=e[4]!==null?e[4]:this.jointValue[4],this.jointValue[5]=e[5]!==null?e[5]:this.jointValue[5],Xi.compose(this.origPosition,this.origQuaternion,Il),Pl.setFromEuler(Dy.set(this.jointValue[3],this.jointValue[4],this.jointValue[5],"XYZ")),Ll.set(this.jointValue[0],this.jointValue[1],this.jointValue[2]),Rl.compose(Ll,Pl,Il),Xi.premultiply(Rl),this.position.setFromMatrixPosition(Xi),this.rotation.setFromRotationMatrix(Xi),this.matrixWorldNeedsUpdate=!0,!0);case"planar":return this.jointValue.every((n,i)=>e[i]===n||e[i]===null)?t:(this.jointValue[0]=e[0]!==null?e[0]:this.jointValue[0],this.jointValue[1]=e[1]!==null?e[1]:this.jointValue[1],this.jointValue[2]=e[2]!==null?e[2]:this.jointValue[2],Xi.compose(this.origPosition,this.origQuaternion,Il),Pl.setFromAxisAngle(this.axis,this.jointValue[2]),Ll.set(this.jointValue[0],this.jointValue[1],0),Rl.compose(Ll,Pl,Il),Xi.premultiply(Rl),this.position.setFromMatrixPosition(Xi),this.rotation.setFromRotationMatrix(Xi),this.matrixWorldNeedsUpdate=!0,!0)}return t}},ua=class extends ca{constructor(...e){super(...e),this.type="URDFMimicJoint",this.mimicJoint=null,this.offset=0,this.multiplier=1}updateFromMimickedJoint(...e){let t=e.map(n=>n===null?null:n*this.multiplier+this.offset);return super.setJointValue(...t)}copy(e,t){return super.copy(e,t),this.mimicJoint=e.mimicJoint,this.offset=e.offset,this.multiplier=e.multiplier,this}},Ul=class extends la{constructor(...e){super(...e),this.isURDFRobot=!0,this.urdfNode=null,this.urdfRobotNode=null,this.robotName=null,this.links=null,this.joints=null,this.colliders=null,this.visual=null,this.frames=null}copy(e,t){super.copy(e,t),this.urdfRobotNode=e.urdfRobotNode,this.robotName=e.robotName,this.links={},this.joints={},this.colliders={},this.visual={},this.traverse(n=>{n.isURDFJoint&&n.urdfName in e.joints&&(this.joints[n.urdfName]=n),n.isURDFLink&&n.urdfName in e.links&&(this.links[n.urdfName]=n),n.isURDFCollider&&n.urdfName in e.colliders&&(this.colliders[n.urdfName]=n),n.isURDFVisual&&n.urdfName in e.visual&&(this.visual[n.urdfName]=n)});for(let n in this.joints)this.joints[n].mimicJoints=this.joints[n].mimicJoints.map(i=>this.joints[i.name]);return this.frames={...this.colliders,...this.visual,...this.links,...this.joints},this}getFrame(e){return this.frames[e]}setJointValue(e,...t){let n=this.joints[e];return n?n.setJointValue(...t):!1}setJointValues(e){let t=!1;for(let n in e){let i=e[n];Array.isArray(i)?t=this.setJointValue(n,...i)||t:t=this.setJointValue(n,i)||t}return t}};var Ju=new ut,Wd=new rn;function qi(s){return s?s.trim().split(/\s+/g).map(e=>parseFloat(e)):[0,0,0]}function Xd(s,e,t=!1){t||s.rotation.set(0,0,0),Wd.set(e[0],e[1],e[2],"ZYX"),Ju.setFromEuler(Wd),Ju.multiply(s.quaternion),s.quaternion.copy(Ju)}var $u=class{constructor(e){this.manager=e||fl,this.loadMeshCb=this.defaultMeshLoader.bind(this),this.parseVisual=!0,this.parseCollision=!1,this.packages="",this.workingPath="",this.fetchOptions={}}loadAsync(e){return new Promise((t,n)=>{this.load(e,t,null,n)})}load(e,t,n,i){let r=this.manager,a=Mn.extractUrlBase(e),o=this.manager.resolveURL(e);r.itemStart(o),fetch(o,this.fetchOptions).then(c=>{if(c.ok)return n&&n(null),c.text();throw new Error(`URDFLoader: Failed to load url '${o}' with error code ${c.status} : ${c.statusText}.`)}).then(c=>{let l=this.parse(c,this.workingPath||a);t(l),r.itemEnd(o)}).catch(c=>{i?i(c):console.error("URDFLoader: Error loading file.",c),r.itemError(o),r.itemEnd(o)})}parse(e,t=this.workingPath){let n=this.packages,i=this.loadMeshCb,r=this.parseVisual,a=this.parseCollision,o=this.manager,c={},l={},u={};function h(b){if(!/^package:\/\//.test(b))return t?t+b:b;let[M,y]=b.replace(/^package:\/\//,"").split(/\/(.+)/);if(typeof n=="string")return n.endsWith(M)?n+"/"+y:n+"/"+M+"/"+y;if(typeof n=="function")return n(M)+"/"+y;if(typeof n=="object")return M in n?n[M]+"/"+y:(console.error(`URDFLoader : ${M} not found in provided package list.`),null)}function f(b){let M;b instanceof Document?M=[...b.children]:b instanceof Element?M=[b]:M=[...new DOMParser().parseFromString(b,"text/xml").children];let y=M.filter(T=>T.nodeName==="robot").pop();return d(y)}function d(b){let M=[...b.children],y=M.filter(C=>C.nodeName.toLowerCase()==="link"),T=M.filter(C=>C.nodeName.toLowerCase()==="joint"),w=M.filter(C=>C.nodeName.toLowerCase()==="material"),E=new Ul;E.robotName=b.getAttribute("name"),E.urdfRobotNode=b,w.forEach(C=>{let I=C.getAttribute("name");u[I]=m(C)});let x={},S={};y.forEach(C=>{let I=C.getAttribute("name"),F=b.querySelector(`child[link="${I}"]`)===null;c[I]=_(C,x,S,F?E:null)}),T.forEach(C=>{let I=C.getAttribute("name");l[I]=g(C)}),E.joints=l,E.links=c,E.colliders=S,E.visual=x;let R=Object.values(l);return R.forEach(C=>{C instanceof ua&&l[C.mimicJoint].mimicJoints.push(C)}),R.forEach(C=>{let I=new Set,F=V=>{if(I.has(V))throw new Error("URDFLoader: Detected an infinite loop of mimic joints.");I.add(V),V.mimicJoints.forEach(O=>{F(O)})};F(C)}),E.frames={...S,...x,...c,...l},E}function g(b){let M=[...b.children],y=b.getAttribute("type"),T,w=M.find(I=>I.nodeName.toLowerCase()==="mimic");w?(T=new ua,T.mimicJoint=w.getAttribute("joint"),T.multiplier=parseFloat(w.getAttribute("multiplier")||1),T.offset=parseFloat(w.getAttribute("offset")||0)):T=new ca,T.urdfNode=b,T.name=b.getAttribute("name"),T.urdfName=T.name,T.jointType=y;let E=null,x=null,S=[0,0,0],R=[0,0,0];M.forEach(I=>{let F=I.nodeName.toLowerCase();F==="origin"?(S=qi(I.getAttribute("xyz")),R=qi(I.getAttribute("rpy"))):F==="child"?x=c[I.getAttribute("link")]:F==="parent"?E=c[I.getAttribute("link")]:F==="limit"&&(T.limit.lower=parseFloat(I.getAttribute("lower")||T.limit.lower),T.limit.upper=parseFloat(I.getAttribute("upper")||T.limit.upper),T.limit.effort=parseFloat(I.getAttribute("effort")||T.limit.effort),T.limit.velocity=parseFloat(I.getAttribute("velocity")||T.limit.velocity))}),E.add(T),T.add(x),Xd(T,R),T.position.set(S[0],S[1],S[2]);let C=M.filter(I=>I.nodeName.toLowerCase()==="axis")[0];if(C){let I=C.getAttribute("xyz").split(/\s+/g).map(F=>parseFloat(F));T.axis=new L(I[0],I[1],I[2]),T.axis.normalize()}return T}function _(b,M,y,T=null){T===null&&(T=new la);let w=[...b.children];T.name=b.getAttribute("name"),T.urdfName=T.name,T.urdfNode=b;let E=w.find(x=>x.nodeName.toLowerCase()==="inertial");return E&&[...E.children].forEach(x=>{let S=x.nodeName.toLowerCase();S==="origin"?(T.inertial.origin.xyz=qi(x.getAttribute("xyz")),T.inertial.origin.rpy=qi(x.getAttribute("rpy"))):S==="mass"?T.inertial.mass=parseFloat(x.getAttribute("value"))||0:S==="inertia"&&(T.inertial.inertia.ixx=parseFloat(x.getAttribute("ixx"))||0,T.inertial.inertia.ixy=parseFloat(x.getAttribute("ixy"))||0,T.inertial.inertia.ixz=parseFloat(x.getAttribute("ixz"))||0,T.inertial.inertia.iyy=parseFloat(x.getAttribute("iyy"))||0,T.inertial.inertia.iyz=parseFloat(x.getAttribute("iyz"))||0,T.inertial.inertia.izz=parseFloat(x.getAttribute("izz"))||0)}),r&&w.filter(S=>S.nodeName.toLowerCase()==="visual").forEach(S=>{let R=p(S,u);if(T.add(R),S.hasAttribute("name")){let C=S.getAttribute("name");R.name=C,R.urdfName=C,M[C]=R}}),a&&w.filter(S=>S.nodeName.toLowerCase()==="collision").forEach(S=>{let R=p(S);if(T.add(R),S.hasAttribute("name")){let C=S.getAttribute("name");R.name=C,R.urdfName=C,y[C]=R}}),T}function m(b){let M=[...b.children],y=new Qn;return y.name=b.getAttribute("name")||"",M.forEach(T=>{let w=T.nodeName.toLowerCase();if(w==="color"){let E=T.getAttribute("rgba").split(/\s/g).map(x=>parseFloat(x));y.color.setRGB(E[0],E[1],E[2]),y.opacity=E[3],y.transparent=E[3]<1,y.depthWrite=!y.transparent}else if(w==="texture"){let E=T.getAttribute("filename");if(E){let x=new bi(o),S=h(E);y.map=x.load(S),y.map.colorSpace=Ke}}}),y}function p(b,M={}){let y=b.nodeName.toLowerCase()==="collision",T=[...b.children],w=null,E=T.filter(S=>S.nodeName.toLowerCase()==="material")[0];if(E){let S=E.getAttribute("name");S&&S in M?w=M[S]:w=m(E)}else w=new Qn;let x=y?new Nl:new Dl;return x.urdfNode=b,T.forEach(S=>{let R=S.nodeName.toLowerCase();if(R==="geometry"){let C=S.children[0].nodeName.toLowerCase();if(C==="mesh"){let I=S.children[0].getAttribute("filename"),F=h(I);if(F!==null){let V=S.children[0].getAttribute("scale");if(V){let O=qi(V);x.scale.set(O[0],O[1],O[2])}i(F,o,w,(O,N)=>{N?console.error("URDFLoader: Error loading mesh.",N):O&&(O.position.set(0,0,0),O.quaternion.identity(),x.add(O))})}}else if(C==="box"){let I=new st;I.geometry=new Pt(1,1,1),I.material=w;let F=qi(S.children[0].getAttribute("size"));I.scale.set(F[0],F[1],F[2]),x.add(I)}else if(C==="sphere"){let I=new st;I.geometry=new Jn(1,30,30),I.material=w;let F=parseFloat(S.children[0].getAttribute("radius"))||0;I.scale.set(F,F,F),x.add(I)}else if(C==="cylinder"){let I=new st;I.geometry=new zt(1,1,1,30),I.material=w;let F=parseFloat(S.children[0].getAttribute("radius"))||0,V=parseFloat(S.children[0].getAttribute("length"))||0;I.scale.set(F,V,F),I.rotation.set(Math.PI/2,0,0),x.add(I)}}else if(R==="origin"){let C=qi(S.getAttribute("xyz")),I=qi(S.getAttribute("rpy"));x.position.set(C[0],C[1],C[2]),x.rotation.set(0,0,0),Xd(x,I)}}),x}return f(e)}defaultMeshLoader(e,t,n,i){/\.stl$/i.test(e)?new Tl(t).load(e,a=>{let o=new st(a,n||new Qn);i(o)},null,a=>i(null,a)):/\.dae$/i.test(e)?new Cl(t).load(e,a=>i(a.scene),null,a=>i(null,a)):console.warn(`URDFLoader: Could not load model at ${e}.
No loader available`)}},qd=$u;var Yd={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var Kd=([s,e,t])=>{let n=document.createElementNS("http://www.w3.org/2000/svg",s);return Object.keys(e).forEach(i=>{n.setAttribute(i,String(e[i]))}),t?.length&&t.forEach(i=>{let r=Kd(i);n.appendChild(r)}),n},Qu=(s,e={})=>{let n={...Yd,...e};return Kd(["svg",n,s])};var ef=[["path",{d:"M2 10v3"}],["path",{d:"M6 6v11"}],["path",{d:"M10 3v18"}],["path",{d:"M14 8v7"}],["path",{d:"M18 5v13"}],["path",{d:"M22 10v3"}]];var tf=[["path",{d:"M 22 14 L 22 10"}],["rect",{x:"2",y:"6",width:"16",height:"12",rx:"2"}]];var nf=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"}]];var sf=[["path",{d:"M12 8V4H8"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2"}],["path",{d:"M2 14h2"}],["path",{d:"M20 14h2"}],["path",{d:"M15 13v2"}],["path",{d:"M9 13v2"}]];var rf=[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],["path",{d:"m3.3 7 8.7 5 8.7-5"}],["path",{d:"M12 22V12"}]];var af=[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"}],["circle",{cx:"12",cy:"13",r:"3"}]];var Fl=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];var Ol=[["path",{d:"M15.6 2.7a10 10 0 1 0 5.7 5.7"}],["circle",{cx:"12",cy:"12",r:"2"}],["path",{d:"M13.4 10.6 19 5"}]];var of=[["path",{d:"M12 20v2"}],["path",{d:"M12 2v2"}],["path",{d:"M17 20v2"}],["path",{d:"M17 2v2"}],["path",{d:"M2 12h2"}],["path",{d:"M2 17h2"}],["path",{d:"M2 7h2"}],["path",{d:"M20 12h2"}],["path",{d:"M20 17h2"}],["path",{d:"M20 7h2"}],["path",{d:"M7 20v2"}],["path",{d:"M7 2v2"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1"}]];var lf=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M6 12c0-1.7.7-3.2 1.8-4.2"}],["circle",{cx:"12",cy:"12",r:"2"}],["path",{d:"M18 12c0 1.7-.7 3.2-1.8 4.2"}]];var cf=[["path",{d:"M16.247 7.761a6 6 0 0 1 0 8.478"}],["path",{d:"M19.075 4.933a10 10 0 0 1 0 14.134"}],["path",{d:"M4.925 19.067a10 10 0 0 1 0-14.134"}],["path",{d:"M7.753 16.239a6 6 0 0 1 0-8.478"}],["circle",{cx:"12",cy:"12",r:"2"}]];var uf=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];var ff=[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}],["path",{d:"M7 12h10"}]];var fa=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];var hf=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];var gf={unknown:0,ok:1,stale:2,warn:3,error:4},Bl={unknown:new de(0),ok:new de(3115605),stale:new de(6648183),warn:new de(14195505),error:new de(14240578)},Uy={soma:"Soma",hardware:"Hardware",modules:"Modules",atlas:"Atlas",client:"Client"},se=s=>document.getElementById(s);function ha(s){s&&s.replaceChildren()}function Ft(s){return Object.hasOwn(gf,s)?s:"unknown"}function Fy(s){return s.reduce((e,t)=>gf[Ft(t)]>gf[e]?Ft(t):e,"unknown")}function df(s,e){if(!s)return;let t=Ft(e);s.className=`health-label ${t}`,s.textContent=t}function or(s,e=16){return Qu(s,{width:String(e),height:String(e),"stroke-width":"1.8","aria-hidden":"true"})}function Oy(s){let e=String(s||"").toLowerCase();return e.includes("battery")||e.includes("power")?tf:e.includes("camera")||e.includes("vision")?af:e.includes("lidar")||e.includes("laser")?ff:e.includes("audio")||e.includes("speaker")||e.includes("mic")?ef:e.includes("wheel")||e.includes("drive")?lf:e.includes("base")||e.includes("chassis")?Ol:e.includes("sensor")||e.includes("radio")?cf:e.includes("robot")||e.includes("body")?sf:e.includes("compute")||e.includes("controller")?of:rf}function Zd(s){if(!s)return"--";let e=Math.max(0,Math.floor((Date.now()-s)/1e3));return e<2?"now":e<60?`${e}s ago`:`${Math.floor(e/60)}m ago`}function pf(s){return s?new Intl.DateTimeFormat(void 0,{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(new Date(s)):"--"}function mf(s,e){let t=Number(s?.total||0);if(!t)return`0 ${e}`;let n=Number(s.error||0)+Number(s.warn||0)+Number(s.stale||0);if(n)return`${n} attention / ${t}`;let i=Number(s.unknown||0);return i?`${i} unknown / ${t}`:`${t} healthy`}function tn(s,e=.28,t=.5){return new $n({color:s,metalness:e,roughness:t})}function In(s,e,t,n){let i=Number(s);return Math.min(n,Math.max(t,Number.isFinite(i)?i:e))}var xf=class{constructor(e,t){this.container=e,this.onSelect=t,this.scene=new ss,this.scene.background=new de(528661),this.scene.fog=new Sr(528661,5.5,12),this.camera=new xt(38,1,.02,100),this.renderer=new gl({antialias:!0,alpha:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.outputColorSpace=Ke,this.renderer.toneMapping=Kr,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=So,this.renderer.domElement.tabIndex=0,this.container.appendChild(this.renderer.domElement),this.controls=new vl(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.enablePan=!1,this.controls.minDistance=.7,this.controls.maxDistance=10,this.controls.maxPolarAngle=Math.PI*.49,this.controls.addEventListener("change",()=>this.renderOnce()),this.scene.add(new Br(14214627,1516328,2.2));let n=new ni(16777215,3.3);n.position.set(3.5,5.5,4.5),n.castShadow=!0,n.shadow.mapSize.set(1024,1024),n.shadow.camera.near=.1,n.shadow.camera.far=16,this.scene.add(n);let i=new ni(6801360,1.8);i.position.set(-4,2.4,-3),this.scene.add(i),this.floor=new st(new cs(8,8),new $n({color:726296,roughness:.9,metalness:.05})),this.floor.rotation.x=-Math.PI/2,this.floor.receiveShadow=!0,this.scene.add(this.floor),this.grid=new Wr(8,32,3232346,1585209),this.grid.position.y=.003,this.grid.material.transparent=!0,this.grid.material.opacity=.36,this.scene.add(this.grid),this.robotRoot=new it,this.scene.add(this.robotRoot),this.componentObjects=new Map,this.componentHealth=new Map,this.selectedComponentId="body",this.selectionHelper=null,this.modelToken=0,this.active=!1,this.frame=0,this.raycaster=new Gr,this.pointer=new Te,this.renderer.domElement.addEventListener("pointerup",r=>this.pick(r)),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.container),this.modelStats={source:"",meshCount:0,linkCount:0,jointCount:0,mappedComponents:0,fallbackReason:""},this.resize()}setActive(e){this.active=!!e,this.active&&!this.frame&&this.animate(),!this.active&&this.frame&&(cancelAnimationFrame(this.frame),this.frame=0),this.active&&this.resize()}animate(){if(!this.active){this.frame=0;return}if(this.controls.update(),this.selectionHelper){this.updateSelectionHelper();let e=(Math.sin(performance.now()/260)+1)/2;this.selectionHelper.userData.fill.material.opacity=.06+e*.07,this.selectionHelper.userData.edges.material.opacity=.72+e*.28}this.renderer.render(this.scene,this.camera),this.frame=requestAnimationFrame(()=>this.animate())}renderOnce(){!this.container.clientWidth||!this.container.clientHeight||this.renderer.render(this.scene,this.camera)}resize(){let e=Math.max(1,this.container.clientWidth),t=Math.max(1,this.container.clientHeight);this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderOnce()}clearRobot(){for(this.disposeSelectionHelper();this.robotRoot.children.length;){let e=this.robotRoot.children.at(-1);this.robotRoot.remove(e),e.traverse(t=>{t.geometry?.dispose?.(),Array.isArray(t.material)?t.material.forEach(n=>n.dispose()):t.material?.dispose?.()})}this.componentObjects.clear()}registerComponent(e,t){if(!e||!t)return;let n=this.componentObjects.get(e)||[];n.includes(t)||n.push(t),this.componentObjects.set(e,n),t.traverse(i=>{if(!i.isMesh)return;let r=String(i.userData.componentId||""),a=r?r.split("/").length:0;e.split("/").length>=a&&(i.userData.componentId=e)})}prepareMaterials(e){e.traverse(t=>{if(!t.isMesh)return;t.castShadow=!0,t.receiveShadow=!0,Array.isArray(t.material)?t.material=t.material.map(i=>i.clone()):t.material&&(t.material=t.material.clone()),(Array.isArray(t.material)?t.material:[t.material]).filter(Boolean).forEach(i=>{i.userData.vitalsBaseColor=i.color?.clone?.()||new de(16777215),i.userData.vitalsBaseEmissive=i.emissive?.clone?.()||new de(0),i.userData.vitalsBaseIntensity=Number(i.emissiveIntensity||0)})})}async loadUrdfXml(e,t=""){let n=[],i=!1,r,a=new Promise(u=>{r=u}),o=new Ks;o.onStart=()=>{i=!0},o.onLoad=()=>r(),o.onError=u=>n.push(u);let l=new qd(o).parse(e,t);if(i&&await a,n.length)throw new Error(`failed to load ${n.length} URDF asset(s)`);return l}async loadUrdfDescription(e){return this.loadUrdfXml(String(e?.urdfXml||""),String(e?.urdfAssetBaseUrl||""))}async loadDescription(e){let t=++this.modelToken;this.clearRobot(),this.proceduralKind="",this.modelStats={source:"",meshCount:0,linkCount:0,jointCount:0,mappedComponents:0,fallbackReason:""};let n=null,i="procedural",r=e?.render||{},a=[],o=(l,u)=>{let h=u instanceof Error?u.message:String(u);a.push(`${l}: ${h}`),console.warn(`Vitals model source "${l}" failed; using the next available renderer.`,u)};if(r.modelUrl)try{let l=await new bl().loadAsync(r.modelUrl);if(t!==this.modelToken)return"superseded";n=l.scene,i="asset",this.registerComponent("body",n),this.modelStats={source:`asset:${r.modelUrl}`,meshCount:n.getObjectsByProperty("isMesh",!0).length,linkCount:0,jointCount:0,mappedComponents:1,fallbackReason:""}}catch(l){o("modelUrl",l)}let c=!!(e?.urdfXml&&r.mode==="urdf");if(!n&&c){let l="soma:urdf";try{let u=await this.loadUrdfDescription(e);if(t!==this.modelToken)return"superseded";u.rotation.x=-Math.PI/2,u.updateMatrixWorld(!0);let h=u.getObjectsByProperty("isMesh",!0).length;if(!h)throw new Error("URDF contains no renderable visual geometry");n=u,i="urdf",this.registerComponent("body",n);let f=0;(e.components||[]).forEach(d=>{let g=u.links?.[d.urdfLink]||u.joints?.[d.urdfJoint];g&&(this.registerComponent(d.id,g),f+=1)}),this.modelStats={source:l,meshCount:h,linkCount:Object.keys(u.links||{}).length,jointCount:Object.keys(u.joints||{}).length,mappedComponents:f,fallbackReason:a.join("; ")}}catch(u){o(l,u),n=null}}return n||(n=this.buildProcedural(e||{}),i="procedural",this.modelStats={source:"procedural",meshCount:n.getObjectsByProperty("isMesh",!0).length,linkCount:0,jointCount:0,mappedComponents:this.componentObjects.size,fallbackReason:a.join("; ")}),t!==this.modelToken?"superseded":(this.prepareMaterials(n),this.robotRoot.add(n),this.placeOnFloor(n),this.fitCamera(n),this.setComponentHealth(this.componentHealth),this.selectComponent(this.selectedComponentId),this.renderOnce(),i)}placeOnFloor(e){e.updateMatrixWorld(!0);let t=new Wt().setFromObject(e);t.isEmpty()||(e.position.y-=t.min.y),e.updateMatrixWorld(!0)}fitCamera(e){let t=new Wt().setFromObject(e);if(t.isEmpty())return;let n=t.getSize(new L),i=t.getCenter(new L),r=Math.max(n.x,n.y,n.z,.6);this.camera.position.set(i.x+r*1.55,i.y+r*.85,i.z+r*1.85),this.camera.near=Math.max(.01,r/100),this.camera.far=Math.max(30,r*30),this.camera.updateProjectionMatrix(),this.controls.target.set(i.x,i.y+n.y*.04,i.z),this.controls.minDistance=r*.65,this.controls.maxDistance=r*8,this.controls.update()}buildProcedural(e){let n=(e.components||[]).map(o=>String(o.type||"").toLowerCase()),i=String(e.family||"").toLowerCase(),r=i.includes("arm")||i.includes("manipulator")||n.some(o=>o.includes("gripper")||o.includes("arm")),a=i.includes("mobile")||n.some(o=>o.includes("wheel")||o.includes("mobile_base"));return i.includes("humanoid")?(this.proceduralKind="humanoid",this.buildHumanoid(e)):r&&a?(this.proceduralKind="mobile_manipulator",this.buildMobileManipulator(e)):r?(this.proceduralKind="arm",this.buildArm(e)):a?(this.proceduralKind="mobile_robot",this.buildMobileRobot(e)):(this.proceduralKind="generic",this.buildGenericRobot(e))}component(e,t,n="body"){return(e.components||[]).find(t)?.id||n}makeMesh(e,t,n){let i=new st(e,t);return i.castShadow=!0,i.receiveShadow=!0,n&&this.registerComponent(n,i),i}buildMobileRobot(e){let t=e.dimensions||{},n=In(t.widthM,.58,.35,2.2),i=In(t.lengthM,.68,.35,2.8),r=In(t.heightM,1,.45,3.2),a=new it,o=new it,c="body",l=this.component(e,K=>String(K.type).includes("base")),u=this.component(e,K=>String(K.localId).includes("left_wheel"),l),h=this.component(e,K=>String(K.localId).includes("right_wheel"),l),f=this.component(e,K=>String(K.type).includes("battery"),l),d=this.component(e,K=>String(K.type).includes("camera"),c),g=this.component(e,K=>String(K.type).includes("lidar"),c),_=this.component(e,K=>String(K.type).includes("audio"),c),m=tn(12108741,.62,.3),p=tn(2503224,.42,.44),b=tn(1186334,.25,.58),M=tn(3840163,.34,.38),y=this.makeMesh(new zt(Math.max(n,i)*.46,Math.max(n,i)*.5,r*.23,48),m,l);y.position.y=r*.19,o.add(y);let T=this.makeMesh(new Dr(Math.max(n,i)*.47,Math.max(n,i)*.025,12,48),p,l);T.rotation.x=Math.PI/2,T.position.y=r*.13,o.add(T);let w=Math.max(.09,Math.min(r*.14,i*.21)),E=Math.max(.055,n*.12),x=this.makeMesh(new zt(w,w,E,28),b.clone(),u);x.rotation.z=Math.PI/2,x.position.set(-n*.49,w,0),o.add(x);let S=this.makeMesh(new zt(w,w,E,28),b.clone(),h);S.rotation.z=Math.PI/2,S.position.set(n*.49,w,0),o.add(S);let R=this.makeMesh(new Pt(n*.42,r*.07,i*.3),tn(4751188,.18,.55),f);R.position.set(0,r*.31,-i*.12),o.add(R),a.add(o);let C=Math.max(r*.46,.24),I=this.makeMesh(new zt(n*.11,n*.15,C,32),p.clone(),l);I.position.y=r*.34+C/2,a.add(I);let F=this.makeMesh(new Jn(n*.18,30,20),m.clone(),c);F.scale.y=.7,F.position.y=r*.34+C,a.add(F);let V=new it,O=this.makeMesh(new Pt(n*.42,r*.17,i*.26),m.clone(),d);O.geometry.translate(0,0,0),V.add(O);let N=this.makeMesh(new zt(n*.055,n*.055,i*.03,24),M.clone(),d);N.rotation.x=Math.PI/2,N.position.set(0,0,i*.145),V.add(N),V.position.y=r*.88,a.add(V);let H=this.makeMesh(new zt(n*.13,n*.13,r*.055,32),b.clone(),g);H.position.y=r*.985,a.add(H);let q=this.makeMesh(new zt(n*.135,n*.135,r*.018,32),M.clone(),g);return q.position.y=r*.99,a.add(q),[-1,1].forEach(K=>{let ie=this.makeMesh(new zt(n*.045,n*.045,n*.018,20),b.clone(),_);ie.rotation.z=Math.PI/2,ie.position.set(K*n*.23,r*.8,0),a.add(ie)}),this.registerComponent(c,a),this.registerComponent(l,o),a}buildMobileManipulator(e){let t=e.dimensions||{},n=In(t.widthM,.68,.35,2.2),i=In(t.lengthM,.68,.35,2.8),r=In(t.heightM,1.1,.6,3.2),a=this.buildMobileRobot(e),o=e.components||[],l=o.find(E=>String(E.type||"").toLowerCase()==="arm")?.id||"body",u=o.filter(E=>E.parentId===l&&String(E.type||"").toLowerCase()==="joint").map(E=>E.id),h=this.component(e,E=>String(E.type||"").toLowerCase().includes("gripper"),l),f=tn(12371912,.58,.32),d=tn(2568760,.42,.43),g=tn(4103589,.32,.4),_=new it;_.position.set(-n*.3,r*.7,i*.01);let m=this.makeMesh(new Pt(n*.18,r*.12,i*.17),d,l);_.add(m);let p=[r*.19,r*.18,r*.13],b=[.18,-.5,.62],M=_;p.forEach((E,x)=>{let S=new it,R=u[x*2]||l,C=u[x*2+1]||R,I=this.makeMesh(new Jn(n*.075,24,16),g.clone(),R);S.add(I);let F=this.makeMesh(new os(n*.055,E,8,16),f.clone(),C);F.position.y=-E*.55,S.add(F),S.position.y=x===0?-r*.07:-p[x-1],S.rotation.z=b[x],M.add(S),M=S});let y=u[6]||u.at(-1)||l,T=this.makeMesh(new zt(n*.06,n*.06,n*.16,24),d.clone(),y);T.rotation.z=Math.PI/2,T.position.y=-p.at(-1),M.add(T);let w=this.makeMesh(new Pt(n*.2,r*.055,i*.12),f.clone(),h);return w.position.y=-p.at(-1)-r*.07,M.add(w),[-1,1].forEach(E=>{let x=this.makeMesh(new Pt(n*.035,r*.13,i*.05),d.clone(),h);x.position.set(E*n*.07,-p.at(-1)-r*.15,i*.015),M.add(x)}),this.registerComponent(l,_),a.add(_),a}buildArm(e){let t=e.dimensions||{},n=In(t.widthM,.5,.25,1.8),i=In(t.heightM,1.1,.6,3.2),r=new it,a=(e.components||[]).filter(b=>b.id!=="body"),o=tn(12371912,.58,.32),c=tn(2568760,.42,.43),l=tn(4103589,.32,.4),u=a[0]?.id||"body",h=this.makeMesh(new zt(n*.42,n*.48,i*.18,40),c,u);h.position.y=i*.09,r.add(h);let f=a.slice(1).map(b=>b.id),d=[i*.29,i*.27,i*.2],g=r,_=i*.18;d.forEach((b,M)=>{let y=f[M]||u,T=new it,w=this.makeMesh(new Jn(n*.13,28,18),l.clone(),y);T.add(w);let E=this.makeMesh(new Pt(n*.18,b,n*.18),o.clone(),y);E.position.y=b/2,T.add(E),T.position.set(M===1?n*.12:0,_,M===2?n*.08:0),T.rotation.z=M===1?-.42:M===2?.58:.1,g.add(T),g=T,_=b});let m=this.component(e,b=>String(b.type).includes("gripper"),f.at(-1)||u),p=this.makeMesh(new zt(n*.09,n*.09,n*.2,24),c.clone(),m);return p.rotation.z=Math.PI/2,p.position.y=d.at(-1),g.add(p),[-1,1].forEach(b=>{let M=this.makeMesh(new Pt(n*.045,n*.2,n*.06),o.clone(),m);M.position.set(b*n*.09,d.at(-1)+n*.13,0),g.add(M)}),this.registerComponent("body",r),r}buildHumanoid(e){let t=In(e.dimensions?.heightM,1.6,.8,3.2),n=new it,i=this.component(e,f=>String(f.type).includes("torso")),r=this.component(e,f=>String(f.type).includes("head")||String(f.type).includes("camera")),a=tn(12371912,.52,.34),o=tn(2503224,.4,.46),c=tn(4299684,.3,.4),l=this.makeMesh(new Pt(t*.28,t*.34,t*.16),a,i);l.position.y=t*.58,n.add(l);let u=this.makeMesh(new Jn(t*.12,32,22),a.clone(),r);u.scale.z=.82,u.position.y=t*.84,n.add(u);let h=this.makeMesh(new Pt(t*.14,t*.035,t*.025),c,r);return h.position.set(0,t*.85,t*.095),n.add(h),[[-1,"left"],[1,"right"]].forEach(([f,d])=>{let g=this.component(e,b=>String(b.localId).includes(`${d}_arm`),i),_=this.makeMesh(new os(t*.045,t*.3,8,16),o.clone(),g);_.position.set(f*t*.2,t*.54,0),_.rotation.z=f*-.12,n.add(_);let m=this.component(e,b=>String(b.localId).includes(`${d}_leg`),i),p=this.makeMesh(new os(t*.055,t*.38,8,16),o.clone(),m);p.position.set(f*t*.085,t*.23,0),n.add(p)}),this.registerComponent("body",n),n}buildGenericRobot(e){let t=e.dimensions||{},n=In(t.widthM,.6,.3,2.4),i=In(t.lengthM,.7,.3,2.8),r=In(t.heightM,1,.4,3.2),a=new it,o=this.makeMesh(new Pt(n*.72,r*.66,i*.62),tn(12108997,.56,.34),"body");o.position.y=r*.38,a.add(o);let c=(e.components||[]).filter(u=>u.id!=="body"),l=Math.max(n,i)*.46;return c.slice(0,10).forEach((u,h)=>{let f=h/Math.max(c.length,1)*Math.PI*2,d=this.makeMesh(new zt(n*.07,n*.07,r*.09,20),tn(h%2?2832188:4102304,.35,.44),u.id);d.position.set(Math.cos(f)*l,r*(.25+h%3*.17),Math.sin(f)*l),a.add(d)}),this.registerComponent("body",a),a}setComponentHealth(e){if(this.componentHealth=e instanceof Map?e:new Map(Object.entries(e||{})),[...this.componentHealth.entries()].sort(([n],[i])=>n.split("/").length-i.split("/").length).forEach(([n,i])=>{let r=Ft(i);(this.componentObjects.get(n)||[]).forEach(o=>o.traverse(c=>{if(!c.isMesh)return;(Array.isArray(c.material)?c.material:[c.material]).filter(Boolean).forEach(u=>{if(u.emissive&&(u.color?.copy?.(u.userData.vitalsBaseColor||new de(16777215)),u.emissive.copy(u.userData.vitalsBaseEmissive||new de(0)),u.emissiveIntensity=u.userData.vitalsBaseIntensity||0,["warn","error","stale"].includes(r))){let h=r==="error"?.72:r==="warn"?.46:.32;u.color?.lerp?.(Bl[r],h),u.emissive.lerp(Bl[r],r==="error"?.94:.76),u.emissiveIntensity=r==="error"?.9:r==="warn"?.58:.34}})}))}),this.selectionHelper){let n=Ft(this.componentHealth.get(this.selectedComponentId)),i=n==="unknown"||n==="ok"?new de(6278616):Bl[n];this.selectionHelper.userData.fill.material.color.copy(i),this.selectionHelper.userData.edges.material.color.copy(i)}this.renderOnce()}disposeSelectionHelper(){if(!this.selectionHelper)return;this.scene.remove(this.selectionHelper);let{fill:e,edges:t}=this.selectionHelper.userData;e.geometry.dispose(),e.material.dispose(),t.geometry.dispose(),t.material.dispose(),this.selectionHelper=null}updateSelectionHelper(){if(!this.selectionHelper)return;let e=(this.componentObjects.get(this.selectedComponentId)||[]).at(-1);if(!e)return;let t=new Wt().setFromObject(e);if(t.isEmpty())return;let n=t.getSize(new L),i=t.getCenter(new L),r=Math.max(n.x,n.y,n.z,.1)*.055,a=n.addScalar(r*2);this.selectionHelper.position.copy(i),this.selectionHelper.userData.fill.scale.copy(a),this.selectionHelper.userData.edges.scale.copy(a).multiplyScalar(1.012)}selectComponent(e){if(this.selectedComponentId=e||"body",this.disposeSelectionHelper(),!(this.componentObjects.get(this.selectedComponentId)||[]).at(-1))return;let n=Ft(this.componentHealth.get(this.selectedComponentId)),i=n==="unknown"||n==="ok"?6278616:Bl[n],r=new Pt(1,1,1),a=new st(r,new Jt({color:i,transparent:!0,opacity:.1,depthWrite:!1,side:qt})),o=new jn(new Pr(r),new Rn({color:i,transparent:!0,opacity:.9,depthTest:!1}));a.renderOrder=18,o.renderOrder=19,this.selectionHelper=new it,this.selectionHelper.userData.fill=a,this.selectionHelper.userData.edges=o,this.selectionHelper.add(a,o),this.scene.add(this.selectionHelper),this.updateSelectionHelper(),this.renderOnce()}pick(e){let t=this.renderer.domElement.getBoundingClientRect();if(!t.width||!t.height)return;this.pointer.x=(e.clientX-t.left)/t.width*2-1,this.pointer.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.camera);let n=this.raycaster.intersectObject(this.robotRoot,!0).find(i=>i.object.userData.componentId);n&&this.onSelect(n.object.userData.componentId)}canvasStats(){this.resize(),this.renderer.render(this.scene,this.camera);let e=this.renderer.getContext(),t=this.renderer.domElement.width,n=this.renderer.domElement.height,i=new Uint8Array(4),r=new Set,a=0,o=0;for(let c=1;c<=12;c+=1)for(let l=1;l<=12;l+=1){let u=Math.min(t-1,Math.floor(l/13*t)),h=Math.min(n-1,Math.floor(c/13*n));e.readPixels(u,h,1,1,e.RGBA,e.UNSIGNED_BYTE,i);let f=`${i[0]}:${i[1]}:${i[2]}:${i[3]}`;r.add(f),Math.abs(i[0]-8)+Math.abs(i[1]-17)+Math.abs(i[2]-21)>24&&(a+=1),o+=1}return{width:t,height:n,samples:o,foregroundSamples:a,distinctColors:r.size}}componentVisualStats(e){let t=[];return(this.componentObjects.get(e)||[]).forEach(n=>n.traverse(i=>{if(!i.isMesh)return;let r=Array.isArray(i.material)?i.material:[i.material];t.push(...r.filter(Boolean))})),{materialCount:t.length,maxRedDominance:t.reduce((n,i)=>Math.max(n,Number(i.color?.r||0)-Math.max(Number(i.color?.g||0),Number(i.color?.b||0))),0),maxEmissiveIntensity:t.reduce((n,i)=>Math.max(n,Number(i.emissiveIntensity||0)),0)}}selectionStats(){let e=this.selectionHelper?.userData?.fill;return{componentId:this.selectedComponentId,visible:!!(this.selectionHelper&&e),opacity:Number(e?.material?.opacity||0),volume:e?e.scale.x*e.scale.y*e.scale.z:0}}},_f=class{constructor(e){this.root=e,this.description=null,this.hardware=null,this.modules=null,this.providers=null,this.alerts=[],this.alertHistory=[],this.alertSummary={open:0,active:0,recovered:0},this.alertMode="open",this.alertsInitialized=!1,this.notifiedAlertIds=new Set,this.alertQueue=[],this.currentAlert=null,this.sources=new Map([["soma",{state:"connecting",error:""}],["hardware",{state:"connecting",error:""}],["modules",{state:"connecting",error:""}],["atlas",{state:"connecting",error:""}]]),this.selectedComponentId="body",this.softwareMode="modules",this.socket=null,this.reconnectTimer=0,this.active=!1,this.everActivated=!1,this.renderMode="procedural",this.viewport=null;let t=se("vitalsReconnectIcon");t&&t.appendChild(or(uf,17)),se("vitalsAlertsIcon")?.appendChild(or(nf,15)),se("vitalsAlertsCloseIcon")?.appendChild(or(hf,17)),se("vitalsWarningIcon")?.appendChild(or(fa,24));try{this.viewport=new xf(se("vitalsCanvas"),n=>this.selectComponent(n))}catch(n){let i=document.createElement("div");i.className="vitals-empty vitals-canvas-fallback",i.textContent=`3D renderer unavailable: ${n}`,se("vitalsCanvas")?.appendChild(i),this.sources.set("client",{state:"error",error:String(n)})}se("vitalsReconnect")?.addEventListener("click",()=>this.connect(!0)),se("vitalsAlertsOpen")?.addEventListener("click",()=>this.openAlertPanel()),se("vitalsAlertsClose")?.addEventListener("click",()=>this.closeAlertPanel()),se("vitalsAlertPanelScrim")?.addEventListener("click",()=>this.closeAlertPanel()),se("vitalsOpenAlertsTab")?.addEventListener("click",()=>this.setAlertMode("open")),se("vitalsAlertHistoryTab")?.addEventListener("click",()=>this.setAlertMode("history")),se("vitalsClearAlertHistory")?.addEventListener("click",()=>this.clearAlertHistory()),se("vitalsWarningDismiss")?.addEventListener("click",()=>this.closeWarning()),se("vitalsWarningInspect")?.addEventListener("click",()=>this.inspectCurrentAlert()),se("vitalsModulesTab")?.addEventListener("click",()=>this.setSoftwareMode("modules")),se("vitalsProvidersTab")?.addEventListener("click",()=>this.setSoftwareMode("providers")),window.addEventListener("robonix:page",n=>this.setActive(n.detail?.name==="vitals")),window.addEventListener("robonix:settings",()=>{this.active&&this.connect(!0)}),document.addEventListener("visibilitychange",()=>{this.viewport?.setActive(this.active&&!document.hidden)}),document.addEventListener("keydown",n=>{n.key==="Escape"&&(se("vitalsWarningLayer")?.hidden?se("vitalsAlertPanelLayer")?.hidden||this.closeAlertPanel():this.closeWarning())}),window.addEventListener("beforeunload",()=>this.disconnect()),this.ageTimer=window.setInterval(()=>this.renderUpdatedAt(),1e3),this.renderAll(),this.setActive(document.querySelector("[data-page-panel='vitals']")?.classList.contains("active"))}settings(){if(typeof window.collectSettings=="function")return window.collectSettings();let e=se("robotHost")?.value?.trim()||"",t=Number.parseInt(se("atlasPort")?.value||"50051",10)||50051;return{robotHost:e,atlasPort:t,atlasEndpoint:e?`${e}:${t}`:""}}setActive(e){this.active=!!e,this.viewport?.setActive(this.active&&!document.hidden),this.active&&(this.everActivated=!0,(!this.socket||this.socket.readyState>WebSocket.OPEN)&&this.connect())}disconnect(){this.reconnectTimer&&window.clearTimeout(this.reconnectTimer),this.reconnectTimer=0;let e=this.socket;this.socket=null,e?.close(1e3,"Vitals page closed")}connect(e=!1){if(!this.everActivated&&!e)return;this.reconnectTimer&&window.clearTimeout(this.reconnectTimer),this.reconnectTimer=0;let t=this.socket;this.socket=null,t?.close(1e3,"Vitals reconnect"),this.sources.forEach((i,r)=>this.sources.set(r,{state:"connecting",error:""})),se("vitalsReconnect")?.classList.add("busy"),this.renderSources();let n=new WebSocket(this.websocketUrl("/ws/vitals"));this.socket=n,n.onopen=()=>n.send(JSON.stringify({settings:this.settings()})),n.onmessage=i=>{try{this.handleEvent(JSON.parse(i.data))}catch(r){this.sources.set("client",{state:"error",error:String(r)}),this.renderSources()}},n.onerror=()=>{this.sources.set("client",{state:"error",error:"Vitals WebSocket failed"}),this.renderSources()},n.onclose=()=>{this.socket===n&&(this.socket=null,se("vitalsReconnect")?.classList.remove("busy"),this.active&&(this.reconnectTimer=window.setTimeout(()=>{this.reconnectTimer=0,this.connect()},1800)))}}websocketUrl(e){return`${location.protocol==="https:"?"wss:":"ws:"}//${location.host}${e}`}handleEvent(e){if(!(!e||typeof e!="object")){if(e.type==="accepted"){se("vitalsReconnect")?.classList.remove("busy");return}if(e.type==="description"){this.description=e.data,this.selectedComponent()||(this.selectedComponentId="body"),this.viewport?.loadDescription(this.description).then(t=>{t&&t!=="superseded"&&(this.renderMode=t,this.renderStage(),this.viewport?.setComponentHealth(this.componentVisualHealthMap()),this.viewport?.selectComponent(this.selectedComponentId))}),this.renderDescription();return}if(e.type==="hardware"){this.hardware=e.data,this.viewport?.setComponentHealth(this.componentVisualHealthMap()),this.renderHardware();return}if(e.type==="modules"){this.modules=e.data,this.renderOverview(),this.renderSoftware();return}if(e.type==="providers"){this.providers=e.data,this.renderOverview(),this.renderSoftware();return}if(e.type==="alerts"){this.handleAlerts(e.data||{});return}if(e.type==="source"){this.sources.set(e.source,{state:e.state,error:e.error||""}),this.renderSources();return}e.type==="error"&&(this.sources.set("client",{state:"error",error:e.error||"Vitals stream error"}),this.renderSources())}}componentHealthMap(){return new Map((this.hardware?.componentHealth||[]).map(e=>[e.componentId,Ft(e.health)]))}componentVisualHealthMap(){return new Map((this.hardware?.componentHealth||[]).map(e=>[e.componentId,Ft(e.directHealth||e.health)]))}selectedComponent(){return(this.description?.components||[]).find(e=>e.id===this.selectedComponentId)||null}selectedHealth(){return(this.hardware?.componentHealth||[]).find(e=>e.componentId===this.selectedComponentId)||null}selectComponent(e){(this.description?.components||[]).some(t=>t.id===e)&&(this.selectedComponentId=e,this.viewport?.selectComponent(e),se("vitalsStageSelection")&&(se("vitalsStageSelection").textContent=this.selectedComponent()?.label||e),this.renderComponents(),this.renderInspector())}handleAlerts(e){this.alerts=Array.isArray(e.alerts)?e.alerts:[],this.alertSummary=e.summary||{open:this.alerts.length,active:this.alerts.filter(i=>i.conditionActive).length,recovered:this.alerts.filter(i=>!i.conditionActive).length};let t=Array.isArray(e.notifyAlertIds)?e.notifyAlertIds:[],n=this.alertsInitialized?t:this.alerts.filter(i=>i.conditionActive).map(i=>i.id);this.alertsInitialized=!0,n.forEach(i=>{let r=Number(i);!r||this.notifiedAlertIds.has(r)||(this.notifiedAlertIds.add(r),this.alertQueue.push(r))}),this.renderAlerts(),this.showNextWarning()}openAlertPanel(){let e=se("vitalsAlertPanelLayer");e&&(e.hidden=!1),this.renderAlerts()}closeAlertPanel(){let e=se("vitalsAlertPanelLayer");e&&(e.hidden=!0)}async setAlertMode(e){this.alertMode=e==="history"?"history":"open";let t=se("vitalsOpenAlertsTab"),n=se("vitalsAlertHistoryTab"),i=se("vitalsClearAlertHistory");if(t?.classList.toggle("active",this.alertMode==="open"),n?.classList.toggle("active",this.alertMode==="history"),t?.setAttribute("aria-selected",String(this.alertMode==="open")),n?.setAttribute("aria-selected",String(this.alertMode==="history")),i&&(i.hidden=this.alertMode!=="history"),this.alertMode==="history")try{let r=await fetch("/api/vitals/alerts?include_resolved=true");if(!r.ok)throw new Error(`Alert history request failed (${r.status})`);let a=await r.json();this.alertHistory=(a.alerts||[]).filter(o=>o.status==="resolved")}catch(r){se("vitalsAlertSummary")&&(se("vitalsAlertSummary").textContent=String(r))}this.renderAlerts()}renderAlerts(){let e=Number(this.alertSummary.open||this.alerts.length||0);se("vitalsAlertCount")&&(se("vitalsAlertCount").textContent=String(e)),se("vitalsAlertsOpen")?.classList.toggle("has-alerts",e>0);let t=this.alertMode==="history"?this.alertHistory:this.alerts,n=se("vitalsClearAlertHistory");n&&(n.hidden=this.alertMode!=="history",n.disabled=this.alertMode==="history"&&t.length===0),se("vitalsAlertSummary")&&(se("vitalsAlertSummary").textContent=this.alertMode==="history"?`${t.length} resolved incidents`:e?`${this.alertSummary.active||0} active \xB7 ${this.alertSummary.recovered||0} awaiting confirmation`:"No open alerts");let i=se("vitalsAlertList");if(ha(i),!t.length){let r=document.createElement("div");r.className="vitals-empty vitals-alert-empty",r.textContent=this.alertMode==="history"?"No resolved incidents":"No open incidents",i?.appendChild(r);return}t.forEach(r=>i?.appendChild(this.alertRow(r)))}alertRow(e){let t=document.createElement("article");t.className=`vitals-alert-row ${Ft(e.severity)}`,t.dataset.alertId=String(e.id);let n=document.createElement("span");n.className="vitals-alert-marker";let i=document.createElement("div");i.className="vitals-alert-copy";let r=document.createElement("header"),a=document.createElement("strong");a.textContent=e.label||e.sourceId||"Health alert";let o=document.createElement("span");o.textContent=`${e.sourceType||"source"} \xB7 ${e.status||"active"}`,r.append(a,o);let c=document.createElement("p");c.textContent=e.detail||"Health anomaly reported";let l=document.createElement("div");l.className="vitals-alert-meta";let u=document.createElement("span");u.textContent=`Opened ${pf(e.firstSeenAtMs)}`;let h=document.createElement("span");h.textContent=e.conditionActive?`Last seen ${Zd(e.lastSeenAtMs)}`:`Recovered ${pf(e.recoveredAtMs)}`,l.append(u,h),i.append(r,c,l);let f;if(e.status==="resolved")f=document.createElement("span"),f.className="health-label ok vitals-alert-action",f.textContent="Resolved";else{f=document.createElement("button"),f.type="button",f.className="secondary-button vitals-alert-action",f.disabled=!!e.conditionActive,f.appendChild(or(e.conditionActive?fa:Fl,14));let d=document.createElement("span");d.textContent=e.conditionActive?"Still active":"Confirm resolved",f.appendChild(d),f.addEventListener("click",g=>{g.stopPropagation(),this.resolveAlert(e.id,f)})}return e.sourceType==="component"&&(t.classList.add("selectable"),t.addEventListener("click",()=>{this.selectComponent(e.sourceId),this.closeAlertPanel()})),t.append(n,i,f),t}async resolveAlert(e,t){t.disabled=!0;try{let n=this.settings(),i=await fetch(`/api/vitals/alerts/${e}/resolve`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({operator:n.userId||"operator"})}),r=await i.json();if(!i.ok)throw new Error(r.detail||`Resolve failed (${i.status})`);this.handleAlerts({...r,notifyAlertIds:[]}),this.alertMode==="history"&&await this.setAlertMode("history")}catch(n){t.disabled=!1,se("vitalsAlertSummary")&&(se("vitalsAlertSummary").textContent=String(n))}}async clearAlertHistory(){if(this.alertMode!=="history")return;let e=this.alertHistory.length;if(!e||!window.confirm(`Delete ${e} resolved incident${e===1?"":"s"} from local history? Open alerts are kept.`))return;let n=se("vitalsClearAlertHistory");n&&(n.disabled=!0);try{let i=this.settings(),r=await fetch("/api/vitals/alerts/history/clear",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({operator:i.userId||"operator"})}),a=await r.json();if(!r.ok)throw new Error(a.detail||`Clear history failed (${r.status})`);this.handleAlerts({...a,notifyAlertIds:[]}),await this.setAlertMode("history")}catch(i){n&&(n.disabled=!1),se("vitalsAlertSummary")&&(se("vitalsAlertSummary").textContent=String(i))}}showNextWarning(){let e=se("vitalsWarningLayer");if(!(!e?.hidden||this.currentAlert))for(;this.alertQueue.length;){let t=this.alertQueue.shift(),n=this.alerts.find(r=>Number(r.id)===Number(t));if(!n?.conditionActive)continue;this.currentAlert=n,e.querySelector(".vitals-warning-dialog")?.setAttribute("data-severity",Ft(n.severity)),se("vitalsWarningSeverity")&&(se("vitalsWarningSeverity").textContent=Ft(n.severity).toUpperCase()),se("vitalsWarningTitle")&&(se("vitalsWarningTitle").textContent=n.label||"Robot alert"),se("vitalsWarningDetail")&&(se("vitalsWarningDetail").textContent=n.detail||"A health anomaly requires attention."),se("vitalsWarningSource")&&(se("vitalsWarningSource").textContent=`${n.sourceType}: ${n.sourceId}`),se("vitalsWarningTime")&&(se("vitalsWarningTime").textContent=pf(n.firstSeenAtMs)),se("vitalsWarningInspect")&&(se("vitalsWarningInspect").textContent=n.sourceType==="component"?"Inspect component":"Open alert center"),e.hidden=!1,se("vitalsWarningDismiss")?.focus();return}}closeWarning(){let e=se("vitalsWarningLayer");e&&(e.hidden=!0),this.currentAlert=null,window.setTimeout(()=>this.showNextWarning(),120)}inspectCurrentAlert(){let e=this.currentAlert;e?.sourceType==="component"?this.selectComponent(e.sourceId):this.openAlertPanel(),this.closeWarning()}setSoftwareMode(e){this.softwareMode=e==="providers"?"providers":"modules";let t=se("vitalsModulesTab"),n=se("vitalsProvidersTab");t?.classList.toggle("active",this.softwareMode==="modules"),n?.classList.toggle("active",this.softwareMode==="providers"),t?.setAttribute("aria-selected",String(this.softwareMode==="modules")),n?.setAttribute("aria-selected",String(this.softwareMode==="providers")),this.renderSoftware()}renderAll(){this.renderDescription(),this.renderHardware(),this.renderSoftware(),this.renderSources(),this.renderAlerts()}renderDescription(){let e=this.description;se("vitalsRobotName")&&(se("vitalsRobotName").textContent=e?.displayName||"Robot"),se("vitalsRobotMeta")&&(se("vitalsRobotMeta").textContent=e?`${e.id} \xB7 ${e.family||"generic"}`:"Waiting for Soma"),se("vitalsStageName")&&(se("vitalsStageName").textContent=e?.displayName||"Robot"),se("vitalsStageSelection")&&(se("vitalsStageSelection").textContent=this.selectedComponent()?.label||e?.displayName||"Robot");let t=e?.dimensions;se("vitalsStageDimensions")&&(se("vitalsStageDimensions").textContent=t?`${Number(t.lengthM).toFixed(2)} \xD7 ${Number(t.widthM).toFixed(2)} \xD7 ${Number(t.heightM).toFixed(2)} m`:"--");let n=e?.components?.length||0;se("vitalsComponentCount")&&(se("vitalsComponentCount").textContent=`${n} components`),this.renderComponents(),this.renderInspector(),this.renderStage(),this.renderOverview()}renderHardware(){this.renderComponents(),this.renderInspector(),this.renderOverview()}renderOverview(){let e=Ft(this.hardware?.summary?.overall),t=Ft(this.modules?.summary?.overall),n=Ft(this.providers?.summary?.overall),i=Fy([e,t,n]);df(se("vitalsOverallHealth"),i),df(se("vitalsInspectorHealth"),this.selectedHealth()?.health||"unknown"),se("vitalsHardwareSummary")&&(se("vitalsHardwareSummary").textContent=mf(this.hardware?.summary,"components")),se("vitalsSoftwareSummary")&&(se("vitalsSoftwareSummary").textContent=mf(this.modules?.summary,"modules"));let r=this.hardware?.power;se("vitalsBatterySummary")&&(se("vitalsBatterySummary").textContent=r?`${Math.round(r.socPercent)}% \xB7 ${Number(r.voltage).toFixed(1)} V${r.charging?" \xB7 charging":""}`:"--"),this.renderUpdatedAt()}renderUpdatedAt(){let e=Math.max(Number(this.hardware?.updatedAtMs||0),Number(this.modules?.updatedAtMs||0),Number(this.providers?.updatedAtMs||0));se("vitalsUpdatedAt")&&(se("vitalsUpdatedAt").textContent=Zd(e))}renderSources(){let e=se("vitalsSourceStrip");ha(e),this.sources.forEach((t,n)=>{let i=document.createElement("span");i.className=`vitals-source ${t.state||"connecting"}`,i.textContent=Uy[n]||n,t.error&&(i.title=t.error),e?.appendChild(i)})}renderStage(){se("vitalsRenderMode")&&(se("vitalsRenderMode").textContent=`${this.renderMode} model`)}renderComponents(){let e=se("vitalsComponentList");ha(e);let t=this.componentHealthMap(),n=this.description?.components||[];if(!n.length){let i=document.createElement("div");i.className="vitals-empty",i.textContent="Waiting for robot description",e?.appendChild(i);return}n.forEach(i=>{let r=document.createElement("button");r.type="button",r.className="vitals-component-row",r.classList.toggle("active",i.id===this.selectedComponentId),r.style.setProperty("--component-depth",String(Math.max(0,i.id.split("/").length-1))),r.title=i.id;let a=document.createElement("span");a.className="vitals-component-icon",a.appendChild(or(Oy(i.type),15));let o=document.createElement("span");o.className="vitals-component-copy";let c=document.createElement("strong");c.textContent=i.label||i.localId||i.id;let l=document.createElement("span");l.textContent=i.type||"component",o.append(c,l);let u=document.createElement("span");u.className=`vitals-status-dot ${Ft(t.get(i.id))}`,u.title=Ft(t.get(i.id)),r.append(a,o,u),r.addEventListener("click",()=>this.selectComponent(i.id)),e?.appendChild(r)})}detailRow(e,t){let n=document.createElement("div");n.className="vitals-detail-row";let i=document.createElement("span");i.textContent=e;let r=document.createElement("strong");return r.textContent=t||"--",n.append(i,r),n}inspectorSection(e){let t=document.createElement("section");t.className="vitals-inspector-section";let n=document.createElement("h4");return n.textContent=e,t.appendChild(n),t}renderInspector(){let e=this.selectedComponent(),t=this.selectedHealth(),n=se("vitalsInspectorBody");if(ha(n),se("vitalsInspectorTitle")&&(se("vitalsInspectorTitle").textContent=e?.label||"Robot"),se("vitalsInspectorPath")&&(se("vitalsInspectorPath").textContent=e?.id||"body"),df(se("vitalsInspectorHealth"),t?.health||"unknown"),!e){let l=document.createElement("div");l.className="vitals-empty",l.textContent="Waiting for component data",n?.appendChild(l);return}let i=this.inspectorSection("Identity");i.append(this.detailRow("Type",e.type),this.detailRow("Parent",e.parentId||"root"),this.detailRow("Providers",(e.providers||[]).join(", ")),this.detailRow("URDF link",e.urdfLink),this.detailRow("URDF joint",e.urdfJoint)),n?.appendChild(i);let r=this.inspectorSection("Status");r.append(this.detailRow("Aggregate",t?.health||"unknown"),this.detailRow("Direct",t?.directHealth||"unknown"),this.detailRow("Signals",String(t?.signalCount||0)),this.detailRow("Source",t?.sourceComponentId||e.id)),t?.detail&&r.appendChild(this.detailRow("Detail",t.detail)),n?.appendChild(r);let a=this.inspectorSection("Signals"),o=new Set(t?.signalKeys||[]),c=(this.hardware?.signals||[]).filter(l=>o.has(l.key));if(c.length)c.forEach(l=>{let u=document.createElement("div");u.className="vitals-signal-row";let h=document.createElement("span");h.className=`vitals-status-dot ${Ft(l.health)}`;let f=document.createElement("span");f.className="vitals-signal-copy";let d=document.createElement("strong");d.textContent=l.key;let g=document.createElement("span");g.textContent=l.detail||`${l.observedValue} / ${l.referenceValue}`,f.append(d,g),u.append(h,f),a.appendChild(u)});else{let l=document.createElement("div");l.className="vitals-empty",l.textContent="No direct health signals",a.appendChild(l)}n?.appendChild(a)}renderSoftware(){let e=se("vitalsSoftwareList");ha(e);let t=this.modules?.modules||[],n=this.providers?.providers||[],i=this.softwareMode==="modules",r=i?t:n,a=i?this.modules?.summary:this.providers?.summary;se("vitalsSoftwareDetail")&&(se("vitalsSoftwareDetail").textContent=mf(a,i?"modules":"providers"));let o=i?["Module","Health","State / reason","Source","TTL"]:["Provider","Health","State","Namespace","Capabilities"],c=document.createElement("div");if(c.className="vitals-software-head",o.forEach(l=>{let u=document.createElement("span");u.textContent=l,c.appendChild(u)}),e?.appendChild(c),!r.length){let l=document.createElement("div");l.className="vitals-empty",l.style.padding="14px 12px",l.textContent=i?"No module health reports":"No Atlas providers",e?.appendChild(l);return}r.forEach(l=>{let u=document.createElement("div");u.className="vitals-software-row";let h=document.createElement("strong");h.textContent=i?l.moduleId||l.moduleKey:l.id,h.title=h.textContent;let f=document.createElement("span");f.className="vitals-software-state";let d=document.createElement("span");d.className=`vitals-status-dot ${Ft(l.health)}`;let g=document.createElement("span");g.textContent=Ft(l.health),f.append(d,g);let _=document.createElement("span");_.textContent=i?[l.state,l.reasonCode].filter(Boolean).join(" \xB7 "):l.state||"unknown",_.title=i?l.detail||_.textContent:l.stateDetail||_.textContent;let m=document.createElement("span");m.textContent=i?l.source||l.providerId||"--":l.namespace||"--",m.title=m.textContent;let p=document.createElement("span");p.textContent=i?`${l.ttlMs||0} ms`:String(l.capabilities?.length||0),u.append(h,f,_,m,p),e?.appendChild(u)})}},jd=se("vitalsRoot");if(jd){let s=new _f(jd);window.__robonixVitalsDebug={canvasStats:()=>s.viewport?.canvasStats()||null,componentVisualStats:e=>s.viewport?.componentVisualStats(e)||null,selectionStats:()=>s.viewport?.selectionStats()||null,state:()=>({active:s.active,robotId:s.description?.id||"",components:s.description?.components?.length||0,hardwareSignals:s.hardware?.signals?.length||0,modules:s.modules?.modules?.length||0,providers:s.providers?.providers?.length||0,alerts:s.alerts?.length||0,selectedComponentId:s.selectedComponentId,renderMode:s.renderMode,proceduralKind:s.viewport?.proceduralKind||"",modelStats:{...s.viewport?.modelStats||{}}})}}})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

lucide/dist/esm/defaultAttributes.mjs:
lucide/dist/esm/createElement.mjs:
lucide/dist/esm/icons/audio-lines.mjs:
lucide/dist/esm/icons/battery.mjs:
lucide/dist/esm/icons/bell.mjs:
lucide/dist/esm/icons/bot.mjs:
lucide/dist/esm/icons/box.mjs:
lucide/dist/esm/icons/camera.mjs:
lucide/dist/esm/icons/circle-check.mjs:
lucide/dist/esm/icons/circle-gauge.mjs:
lucide/dist/esm/icons/cpu.mjs:
lucide/dist/esm/icons/disc-3.mjs:
lucide/dist/esm/icons/radio.mjs:
lucide/dist/esm/icons/refresh-cw.mjs:
lucide/dist/esm/icons/scan-line.mjs:
lucide/dist/esm/icons/triangle-alert.mjs:
lucide/dist/esm/icons/x.mjs:
lucide/dist/esm/lucide.mjs:
  (**
   * @license lucide v1.24.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
