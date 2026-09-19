var E$=Object.defineProperty;var P$=(e,t,n)=>t in e?E$(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var qd=(e,t,n)=>P$(e,typeof t!="symbol"?t+"":t,n);/*!
 * ONNX Runtime Web v1.30.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var A$=Object.create,Yi=Object.defineProperty,k$=Object.getOwnPropertyDescriptor,D$=Object.getOwnPropertyNames,N$=Object.getPrototypeOf,C$=Object.prototype.hasOwnProperty,as=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),N=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(s){throw n=[s],s}},re=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}},Xr=(e,t)=>{for(var n in t)Yi(e,n,{get:t[n],enumerable:!0})},Xg=(e,t,n,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let u of D$(t))!C$.call(e,u)&&u!==n&&Yi(e,u,{get:()=>t[u],enumerable:!(s=k$(t,u))||s.enumerable});return e},ce=(e,t,n)=>(n=e!=null?A$(N$(e)):{},Xg(!e||!e.__esModule?Yi(n,"default",{value:e,enumerable:!0}):n,e)),ln=e=>Xg(Yi({},"__esModule",{value:!0}),e),xn,er,Vr,Gd,Zg,Jg=N(()=>{"use strict";xn=new Map,er=[],Vr=(e,t,n)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let s=xn.get(e);if(s===void 0)xn.set(e,{backend:t,priority:n});else{if(s.priority>n)return;if(s.priority===n&&s.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let u=er.indexOf(e);u!==-1&&er.splice(u,1);for(let l=0;l<er.length;l++)if(xn.get(er[l]).priority<=n){er.splice(l,0,e);return}er.push(e)}return}throw new TypeError("not a valid backend")},Gd=async e=>{let t=xn.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{return n||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(s){return n||(t.error=`${s}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Zg=async e=>{let t=e.executionProviders||[],n=t.map(o=>typeof o=="string"?o:o.name),s=n.length===0?er:n,u,l=[],d=new Set;for(let o of s){let r=await Gd(o);typeof r=="string"?l.push({name:o,err:r}):(u||(u=r),u===r&&d.add(o))}if(!u)throw new Error(`no available backend found. ERR: ${l.map(o=>`[${o.name}] ${o.err}`).join(", ")}`);for(let{name:o,err:r}of l)n.includes(o)&&console.warn(`removing requested execution provider "${o}" from session options because it is not available: ${r}`);let p=t.filter(o=>d.has(typeof o=="string"?o:o.name));return[u,new Proxy(e,{get:(o,r)=>r==="executionProviders"?p:Reflect.get(o,r)})]}}),z$=N(()=>{"use strict";Jg()}),Yg,R$=N(()=>{"use strict";Yg="1.30.0"}),Po,Xe,Qg=N(()=>{"use strict";R$(),Po="warning",Xe={wasm:{},webgl:{},webgpu:{},versions:{common:Yg},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Po=e}},get logLevel(){return Po}},Object.defineProperty(Xe,"logLevel",{enumerable:!0})}),ge,B$=N(()=>{"use strict";Qg(),ge=Xe}),eb,tb,M$=N(()=>{"use strict";eb=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let s=n.getContext("2d");if(s!=null){let u,l;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(u=e.dims[2],l=e.dims[3]):(u=e.dims[3],l=e.dims[2]);let d=(t==null?void 0:t.format)!==void 0?t.format:"RGB",p=t==null?void 0:t.norm,o,r;p===void 0||p.mean===void 0?o=[255,255,255,255]:typeof p.mean=="number"?o=[p.mean,p.mean,p.mean,p.mean]:(o=[p.mean[0],p.mean[1],p.mean[2],0],p.mean[3]!==void 0&&(o[3]=p.mean[3])),p===void 0||p.bias===void 0?r=[0,0,0,0]:typeof p.bias=="number"?r=[p.bias,p.bias,p.bias,p.bias]:(r=[p.bias[0],p.bias[1],p.bias[2],0],p.bias[3]!==void 0&&(r[3]=p.bias[3]));let i=l*u,a=0,c=i,h=i*2,m=-1;d==="RGBA"?(a=0,c=i,h=i*2,m=i*3):d==="RGB"?(a=0,c=i,h=i*2):d==="RBG"&&(a=0,h=i,c=i*2);for(let b=0;b<l;b++)for(let x=0;x<u;x++){let v=(e.data[a++]-r[0])*o[0],w=(e.data[c++]-r[1])*o[1],S=(e.data[h++]-r[2])*o[2],O=m===-1?255:(e.data[m++]-r[3])*o[3];s.fillStyle="rgba("+v+","+w+","+S+","+O+")",s.fillRect(x,b,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},tb=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),s;if(n!=null){let u,l,d;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(u=e.dims[2],l=e.dims[1],d=e.dims[3]):(u=e.dims[3],l=e.dims[2],d=e.dims[1]);let p=t!==void 0&&t.format!==void 0?t.format:"RGB",o=t==null?void 0:t.norm,r,i;o===void 0||o.mean===void 0?r=[255,255,255,255]:typeof o.mean=="number"?r=[o.mean,o.mean,o.mean,o.mean]:(r=[o.mean[0],o.mean[1],o.mean[2],255],o.mean[3]!==void 0&&(r[3]=o.mean[3])),o===void 0||o.bias===void 0?i=[0,0,0,0]:typeof o.bias=="number"?i=[o.bias,o.bias,o.bias,o.bias]:(i=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(i[3]=o.bias[3]));let a=l*u;if(t!==void 0&&(t.format!==void 0&&d===4&&t.format!=="RGBA"||d===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let c=4,h=0,m=1,b=2,x=3,v=0,w=a,S=a*2,O=-1;p==="RGBA"?(v=0,w=a,S=a*2,O=a*3):p==="RGB"?(v=0,w=a,S=a*2):p==="RBG"&&(v=0,S=a,w=a*2),s=n.createImageData(u,l);for(let E=0;E<l*u;h+=c,m+=c,b+=c,x+=c,E++)s.data[h]=(e.data[v++]-i[0])*r[0],s.data[m]=(e.data[w++]-i[1])*r[1],s.data[b]=(e.data[S++]-i[2])*r[2],s.data[x]=O===-1?255:(e.data[O++]-i[3])*r[3]}else throw new Error("Can not access image data");return s}}),_i,rb,nb,ib,ob,ab,j$=N(()=>{"use strict";cu(),_i=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:s}=t,u=t.norm??{mean:255,bias:0},l,d;typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:l=[u.mean[0],u.mean[1],u.mean[2],u.mean[3]??255],typeof u.bias=="number"?d=[u.bias,u.bias,u.bias,u.bias]:d=[u.bias[0],u.bias[1],u.bias[2],u.bias[3]??0];let p=t.format!==void 0?t.format:"RGBA",o=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",r=n*s,i=o==="RGBA"?new Float32Array(r*4):new Float32Array(r*3),a=4,c=0,h=1,m=2,b=3,x=0,v=r,w=r*2,S=-1;p==="RGB"&&(a=3,c=0,h=1,m=2,b=-1),o==="RGBA"?S=r*3:o==="RBG"?(x=0,w=r,v=r*2):o==="BGR"&&(w=0,v=r,x=r*2);for(let O=0;O<r;O++,c+=a,m+=a,h+=a,b+=a)i[x++]=(e[c]+d[0])/l[0],i[v++]=(e[h]+d[1])/l[1],i[w++]=(e[m]+d[2])/l[2],S!==-1&&b!==-1&&(i[S++]=(e[b]+d[3])/l[3]);return o==="RGBA"?new pt("float32",i,[1,4,n,s]):new pt("float32",i,[1,3,n,s])},rb=async(e,t)=>{let n=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,s=typeof ImageData<"u"&&e instanceof ImageData,u=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,l=typeof e=="string",d,p=t??{},o=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},r=i=>typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||i instanceof OffscreenCanvas?i.getContext("2d"):null;if(n){let i=o();i.width=e.width,i.height=e.height;let a=r(i);if(a!=null){let c=e.height,h=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(c=t.resizedHeight,h=t.resizedWidth),t!==void 0){if(p=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");p.tensorFormat="RGBA",p.height=c,p.width=h}else p.tensorFormat="RGBA",p.height=c,p.width=h;a.drawImage(e,0,0),d=a.getImageData(0,0,h,c).data}else throw new Error("Can not access image data")}else if(s){let i,a;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(i=t.resizedHeight,a=t.resizedWidth):(i=e.height,a=e.width),t!==void 0&&(p=t),p.format="RGBA",p.height=i,p.width=a,t!==void 0){let c=o();c.width=a,c.height=i;let h=r(c);if(h!=null)h.putImageData(e,0,0),d=h.getImageData(0,0,a,i).data;else throw new Error("Can not access image data")}else d=e.data}else if(u){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let i=o();i.width=e.width,i.height=e.height;let a=r(i);if(a!=null){let c=e.height,h=e.width;return a.drawImage(e,0,0,h,c),d=a.getImageData(0,0,h,c).data,p.height=c,p.width=h,_i(d,p)}else throw new Error("Can not access image data")}else{if(l)return new Promise((i,a)=>{let c=o(),h=r(c);if(!e||!h)return a();let m=new Image;m.crossOrigin="Anonymous",m.src=e,m.onload=()=>{c.width=m.width,c.height=m.height,h.drawImage(m,0,0,c.width,c.height);let b=h.getImageData(0,0,c.width,c.height);p.height=c.height,p.width=c.width,i(_i(b.data,p))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(d!==void 0)return _i(d,p);throw new Error("Input data provided is not supported - aborted tensor creation")},nb=(e,t)=>{let{width:n,height:s,download:u,dispose:l}=t,d=[1,s,n,4];return new pt({location:"texture",type:"float32",texture:e,dims:d,download:u,dispose:l})},ib=(e,t)=>{let{dataType:n,dims:s,download:u,dispose:l}=t;return new pt({location:"gpu-buffer",type:n??"float32",gpuBuffer:e,dims:s,download:u,dispose:l})},ob=(e,t)=>{let{dataType:n,dims:s,download:u,dispose:l}=t;return new pt({location:"ml-tensor",type:n??"float32",mlTensor:e,dims:s,download:u,dispose:l})},ab=(e,t,n)=>new pt({location:"cpu-pinned",type:e,data:t,dims:n??[t.length]})}),Br,jn,Ao,sb,F$=N(()=>{"use strict";Br=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),jn=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Ao=!1,sb=()=>{if(!Ao){Ao=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,n=globalThis.Float16Array,s=typeof n<"u"&&n.from;e&&(Br.set("int64",BigInt64Array),jn.set(BigInt64Array,"int64")),t&&(Br.set("uint64",BigUint64Array),jn.set(BigUint64Array,"uint64")),s?(Br.set("float16",n),jn.set(n,"float16")):Br.set("float16",Uint16Array)}}}),ub,lb,L$=N(()=>{"use strict";cu(),ub=e=>{let t=1;for(let n=0;n<e.length;n++){let s=e[n];if(typeof s!="number"||!Number.isSafeInteger(s))throw new TypeError(`dims[${n}] must be an integer, got: ${s}`);if(s<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${s}`);t*=s}return t},lb=(e,t)=>{switch(e.location){case"cpu":return new pt(e.type,e.data,t);case"cpu-pinned":return new pt({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new pt({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new pt({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new pt({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),pt,cu=N(()=>{"use strict";M$(),j$(),F$(),L$(),pt=class{constructor(e,t,n){sb();let s,u;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,s=e.type,u=e.dims,e.location){case"cpu-pinned":{let d=Br.get(s);if(!d)throw new TypeError(`unsupported type "${s}" to create tensor from pinned buffer`);if(!(e.data instanceof d))throw new TypeError(`buffer should be of type ${d.name}`);this.cpuData=e.data;break}case"texture":{if(s!=="float32")throw new TypeError(`unsupported type "${s}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(s!=="float32"&&s!=="float16"&&s!=="int32"&&s!=="int64"&&s!=="uint32"&&s!=="uint8"&&s!=="bool"&&s!=="uint4"&&s!=="int4")throw new TypeError(`unsupported type "${s}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(s!=="float32"&&s!=="float16"&&s!=="int32"&&s!=="int64"&&s!=="uint32"&&s!=="uint64"&&s!=="int8"&&s!=="uint8"&&s!=="bool"&&s!=="uint4"&&s!=="int4")throw new TypeError(`unsupported type "${s}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let d,p;if(typeof e=="string")if(s=e,p=n,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");d=t}else{let o=Br.get(e);if(o===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&o===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${o.name} as data.`);e==="uint64"||e==="int64"?d=o.from(t,BigInt):d=o.from(t)}else if(t instanceof o)d=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")d=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&o!==Uint16Array)d=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${s} tensor's data must be type of ${o}`)}else if(p=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let o=typeof e[0];if(o==="string")s="string",d=e;else if(o==="boolean")s="bool",d=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${o}.`)}else if(e instanceof Uint8ClampedArray)s="uint8",d=Uint8Array.from(e);else{let o=jn.get(e.constructor);if(o===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);s=o,d=e}if(p===void 0)p=[d.length];else if(!Array.isArray(p))throw new TypeError("A tensor's dims must be a number array");u=p,this.cpuData=d,this.dataLocation="cpu"}let l=ub(u);if(this.cpuData&&l!==this.cpuData.length&&!((s==="uint4"||s==="int4")&&Math.ceil(l/2)===this.cpuData.length))throw new Error(`Tensor's size(${l}) does not match data length(${this.cpuData.length}).`);this.type=s,this.dims=u,this.size=l}static async fromImage(e,t){return rb(e,t)}static fromTexture(e,t){return nb(e,t)}static fromGpuBuffer(e,t){return ib(e,t)}static fromMLTensor(e,t){return ob(e,t)}static fromPinnedBuffer(e,t,n){return ab(e,t,n)}toDataURL(e){return eb(this,e)}toImageData(e){return tb(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return lb(this,e)}}}),Pt,db=N(()=>{"use strict";cu(),Pt=pt}),Li,ko,Mt,At,Ur,qr,pb=N(()=>{"use strict";Qg(),Li=(e,t)=>{(typeof Xe.trace>"u"?!Xe.wasm.trace:!Xe.trace)||console.timeStamp(`${e}::ORT::${t}`)},ko=(e,t)=>{var u;let n=((u=new Error().stack)==null?void 0:u.split(/\r\n|\r|\n/g))||[],s=!1;for(let l=0;l<n.length;l++){if(s&&!n[l].includes("TRACE_FUNC")){let d=`FUNC_${e}::${n[l].trim().split(" ")[1]}`;t&&(d+=`::${t}`),Li("CPU",d);return}n[l].includes("TRACE_FUNC")&&(s=!0)}},Mt=e=>{(typeof Xe.trace>"u"?!Xe.wasm.trace:!Xe.trace)||ko("BEGIN",e)},At=e=>{(typeof Xe.trace>"u"?!Xe.wasm.trace:!Xe.trace)||ko("END",e)},Ur=e=>{(typeof Xe.trace>"u"?!Xe.wasm.trace:!Xe.trace)||console.time(`ORT::${e}`)},qr=e=>{(typeof Xe.trace>"u"?!Xe.wasm.trace:!Xe.trace)||console.timeEnd(`ORT::${e}`)}}),cb,V$=N(()=>{"use strict";Jg(),db(),pb(),cb=class hb{constructor(t){this.handler=t}async run(t,n,s){Mt(),Ur("InferenceSession.run");let u={},l={};if(typeof t!="object"||t===null||t instanceof Pt||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let d=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof Pt)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");d=!1;for(let r of n){if(typeof r!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(r)===-1)throw new RangeError(`'fetches' contains invalid output name: ${r}.`);u[r]=null}if(typeof s=="object"&&s!==null)l=s;else if(typeof s<"u")throw new TypeError("'options' must be an object.")}else{let r=!1,i=Object.getOwnPropertyNames(n);for(let a of this.outputNames)if(i.indexOf(a)!==-1){let c=n[a];(c===null||c instanceof Pt)&&(r=!0,d=!1,u[a]=c)}if(r){if(typeof s=="object"&&s!==null)l=s;else if(typeof s<"u")throw new TypeError("'options' must be an object.")}else l=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let r of this.inputNames)if(typeof t[r]>"u")throw new Error(`input '${r}' is missing in 'feeds'.`);if(d)for(let r of this.outputNames)u[r]=null;let p=await this.handler.run(t,u,l),o={};for(let r in p)if(Object.hasOwnProperty.call(p,r)){let i=p[r];i instanceof Pt?o[r]=i:o[r]=new Pt(i.type,i.data,i.dims)}return qr("InferenceSession.run"),At(),o}async release(){return this.handler.dispose()}static async create(t,n,s,u){Mt(),Ur("InferenceSession.create");let l,d={};if(typeof t=="string"){if(l=t,typeof n=="object"&&n!==null)d=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(l=t,typeof n=="object"&&n!==null)d=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let i=t,a=0,c=t.byteLength;if(typeof n=="object"&&n!==null)d=n;else if(typeof n=="number"){if(a=n,!Number.isSafeInteger(a))throw new RangeError("'byteOffset' must be an integer.");if(a<0||a>=i.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${i.byteLength}).`);if(c=t.byteLength-a,typeof s=="number"){if(c=s,!Number.isSafeInteger(c))throw new RangeError("'byteLength' must be an integer.");if(c<=0||a+c>i.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${i.byteLength-a}].`);if(typeof u=="object"&&u!==null)d=u;else if(typeof u<"u")throw new TypeError("'options' must be an object.")}else if(typeof s<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");l=new Uint8Array(i,a,c)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[p,o]=await Zg(d),r=await p.createInferenceSessionHandler(l,o);return qr("InferenceSession.create"),At(),new hb(r)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),fb,U$=N(()=>{"use strict";V$(),fb=cb}),q$=N(()=>{"use strict"}),G$=N(()=>{"use strict"}),H$=N(()=>{"use strict"}),W$=N(()=>{"use strict"}),mb={};Xr(mb,{InferenceSession:()=>fb,TRACE:()=>Li,TRACE_EVENT_BEGIN:()=>Ur,TRACE_EVENT_END:()=>qr,TRACE_FUNC_BEGIN:()=>Mt,TRACE_FUNC_END:()=>At,Tensor:()=>Pt,env:()=>ge,registerBackend:()=>Vr});var Qe=N(()=>{"use strict";z$(),B$(),U$(),db(),q$(),G$(),pb(),H$(),W$()});function Mr(e,t,n,s){if(t===void 0)return K$(e);if(n===void 0)wi(e,t);else if(typeof n=="number"&&s===void 0)wi(e,t);else if(typeof n=="string"&&s===void 0)wi(e,n,1,t);else if(typeof n=="string"&&typeof s=="number")wi(e,n,s,t);else throw new TypeError("input is valid")}function K$(e){return{verbose:Mr.verbose.bind(null,e),info:Mr.info.bind(null,e),warning:Mr.warning.bind(null,e),error:Mr.error.bind(null,e),fatal:Mr.fatal.bind(null,e)}}function wi(e,t,n,s){let u=sn[s||""]||sn[""];ss[e]<ss[u.minimalSeverity]||(u.logDateTime&&(t=`${new Date().toISOString()}|${t}`),u.logSourceLocation,gb[u.provider].log(e,t,s))}var Hd,Wd,ss,gb,Do,sn,Ue,No,Co,bb,$n,kt=N(()=>{"use strict";Hd=class{log(e,t,n){}},Wd=class{log(e,t,n){console.log(`${this.color(e)} ${n?"\x1B[35m"+n+"\x1B[0m ":""}${t}`)}color(e){switch(e){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${e}`)}}},ss={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},gb={none:new Hd,console:new Wd},Do={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},sn={"":Do},(e=>{function t(r,i){e("verbose",r,i)}e.verbose=t;function n(r,i){e("info",r,i)}e.info=n;function s(r,i){e("warning",r,i)}e.warning=s;function u(r,i){e("error",r,i)}e.error=u;function l(r,i){e("fatal",r,i)}e.fatal=l;function d(r){sn={},p("",r||{})}e.reset=d;function p(r,i){if(r==="*")d(i);else{let a=sn[r]||Do;sn[r]={provider:i.provider||a.provider,minimalSeverity:i.minimalSeverity||a.minimalSeverity,logDateTime:i.logDateTime===void 0?a.logDateTime:i.logDateTime,logSourceLocation:i.logSourceLocation===void 0?a.logSourceLocation:i.logSourceLocation}}}e.set=p;function o(r){let i={};r.logLevel&&(i.minimalSeverity=r.logLevel),p("",i)}e.setWithEnv=o})(Mr||(Mr={})),Ue=Mr,No=class{constructor(e,t,n,s,u,l){this.category=e,this.name=t,this.startTime=n,this.endCallback=s,this.timer=u,this.ctx=l}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},Co=class{constructor(e,t,n,s){this.category=e,this.name=t,this.startTime=n,this.endTime=s}},bb=class{constructor(e,t,n){this._started=!1,this._flushPointer=0,this._started=!1,this._maxNumberEvents=e===void 0?1e4:e,this._flushBatchSize=t===void 0?10:t,this._flushIntervalInMilliseconds=n===void 0?5e3:n}static create(e){return e===void 0?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=$n(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,t,n,s){let u=this._started?this.begin(e,t,s):void 0,l=!1,d=n();if(d&&typeof d.then=="function")return l=!0,new Promise((p,o)=>{d.then(async r=>{u&&await u.end(),p(r)},async r=>{u&&await u.end(),o(r)})});if(!l&&u){let p=u.end();if(p&&typeof p.then=="function")return new Promise((o,r)=>{p.then(()=>{o(d)},i=>{r(i)})})}return d}begin(e,t,n){if(!this._started)throw new Error("profiler is not started yet");if(n===void 0){let s=$n();return this.flush(s),new No(e,t,s,u=>this.endSync(u))}else{let s=n.beginTimer();return new No(e,t,0,async u=>this.end(u),s,n)}}async end(e){let t=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new Co(e.category,e.name,e.startTime,t)),this.flush(t))}endSync(e){let t=$n();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new Co(e.category,e.name,e.startTime,t)),this.flush(t))}logOneEvent(e){Ue.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let t=this._flushPointer;this._flushPointer<t+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=$n()}}get started(){return this._started}},$n=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function X$(e,t,n){for(let s of n){let u=s[0],l=s[1],d=s[2],p=s[3],o=s[4];if(e.opType===u){for(let r of t)if((r.domain===l||r.domain==="ai.onnx"&&l==="")&&Z$(r.version,d))return{opImpl:p,opInit:o}}}throw new TypeError(`cannot resolve operator '${e.opType}' with opsets: ${t.map(s=>`${s.domain||"ai.onnx"} v${s.version}`).join(", ")}`)}function Z$(e,t){if(t.endsWith("+")){let n=Number.parseInt(t.substring(0,t.length-1),10);return!isNaN(n)&&n<=e}else if(t.split("-").length===2){let n=t.split("-"),s=Number.parseInt(n[0],10),u=Number.parseInt(n[1],10);return!isNaN(s)&&!isNaN(u)&&s<=e&&e<=u}else return Number.parseInt(t,10)===e}var J$=N(()=>{"use strict"}),Y$=re(e=>{"use strict";e.__esModule=!0;var t=(function(){function n(s){if(!s)throw new TypeError("Invalid argument; `value` has no value.");this.value=n.EMPTY,s&&n.isGuid(s)&&(this.value=s)}return n.isGuid=function(s){var u=s.toString();return s&&(s instanceof n||n.validator.test(u))},n.create=function(){return new n([n.gen(2),n.gen(1),n.gen(1),n.gen(1),n.gen(3)].join("-"))},n.createEmpty=function(){return new n("emptyguid")},n.parse=function(s){return new n(s)},n.raw=function(){return[n.gen(2),n.gen(1),n.gen(1),n.gen(1),n.gen(3)].join("-")},n.gen=function(s){for(var u="",l=0;l<s;l++)u+=((1+Math.random())*65536|0).toString(16).substring(1);return u},n.prototype.equals=function(s){return n.isGuid(s)&&this.value===s.toString()},n.prototype.isEmpty=function(){return this.value===n.EMPTY},n.prototype.toString=function(){return this.value},n.prototype.toJSON=function(){return{value:this.value}},n.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),n.EMPTY="00000000-0000-0000-0000-000000000000",n})();e.Guid=t});function Ne(e,t,n){this.low=e|0,this.high=t|0,this.unsigned=!!n}function Ye(e){return(e&&e.__isLong__)===!0}function Kd(e){var t=Math.clz32(e&-e);return e?31-t:t}function _r(e,t){var n,s,u;return t?(e>>>=0,(u=0<=e&&e<256)&&(s=ls[e],s)?s:(n=Oe(e,0,!0),u&&(ls[e]=n),n)):(e|=0,(u=-128<=e&&e<128)&&(s=us[e],s)?s:(n=Oe(e,e<0?-1:0,!1),u&&(us[e]=n),n))}function _t(e,t){if(isNaN(e))return t?Rt:yt;if(t){if(e<0)return Rt;if(e>=ds)return hs}else{if(e<=-ps)return tt;if(e+1>=ps)return cs}return e<0?_t(-e,t).neg():Oe(e%jr|0,e/jr|0,t)}function Oe(e,t,n){return new Ne(e,t,n)}function hu(e,t,n){if(e.length===0)throw Error("empty string");if(typeof t=="number"?(n=t,t=!1):t=!!t,e==="NaN"||e==="Infinity"||e==="+Infinity"||e==="-Infinity")return t?Rt:yt;if(n=n||10,n<2||36<n)throw RangeError("radix");var s;if((s=e.indexOf("-"))>0)throw Error("interior hyphen");if(s===0)return hu(e.substring(1),t,n).neg();for(var u=_t(Wn(n,8)),l=yt,d=0;d<e.length;d+=8){var p=Math.min(8,e.length-d),o=parseInt(e.substring(d,d+p),n);if(p<8){var r=_t(Wn(n,p));l=l.mul(r).add(_t(o))}else l=l.mul(u),l=l.add(_t(o))}return l.unsigned=t,l}function mt(e,t){return typeof e=="number"?_t(e,t):typeof e=="string"?hu(e,t):Oe(e.low,e.high,typeof t=="boolean"?t:e.unsigned)}var st,us,ls,Wn,zo,Xd,jr,ds,ps,Ro,yt,Rt,wr,Bo,vi,cs,hs,tt,H,Gr,yb=N(()=>{st=null;try{st=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}Ne.prototype.__isLong__,Object.defineProperty(Ne.prototype,"__isLong__",{value:!0}),Ne.isLong=Ye,us={},ls={},Ne.fromInt=_r,Ne.fromNumber=_t,Ne.fromBits=Oe,Wn=Math.pow,Ne.fromString=hu,Ne.fromValue=mt,zo=65536,Xd=1<<24,jr=zo*zo,ds=jr*jr,ps=ds/2,Ro=_r(Xd),yt=_r(0),Ne.ZERO=yt,Rt=_r(0,!0),Ne.UZERO=Rt,wr=_r(1),Ne.ONE=wr,Bo=_r(1,!0),Ne.UONE=Bo,vi=_r(-1),Ne.NEG_ONE=vi,cs=Oe(-1,2147483647,!1),Ne.MAX_VALUE=cs,hs=Oe(-1,-1,!0),Ne.MAX_UNSIGNED_VALUE=hs,tt=Oe(0,-2147483648,!1),Ne.MIN_VALUE=tt,H=Ne.prototype,H.toInt=function(){return this.unsigned?this.low>>>0:this.low},H.toNumber=function(){return this.unsigned?(this.high>>>0)*jr+(this.low>>>0):this.high*jr+(this.low>>>0)},H.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(tt)){var t=_t(e),n=this.div(t),s=n.mul(t).sub(this);return n.toString(e)+s.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var u=_t(Wn(e,6),this.unsigned),l=this,d="";;){var p=l.div(u),o=l.sub(p.mul(u)).toInt()>>>0,r=o.toString(e);if(l=p,l.isZero())return r+d;for(;r.length<6;)r="0"+r;d=""+r+d}},H.getHighBits=function(){return this.high},H.getHighBitsUnsigned=function(){return this.high>>>0},H.getLowBits=function(){return this.low},H.getLowBitsUnsigned=function(){return this.low>>>0},H.getNumBitsAbs=function(){if(this.isNegative())return this.eq(tt)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,t=31;t>0&&(e&1<<t)==0;t--);return this.high!=0?t+33:t+1},H.isSafeInteger=function(){var e=this.high>>21;return e?this.unsigned?!1:e===-1&&!(this.low===0&&this.high===-2097152):!0},H.isZero=function(){return this.high===0&&this.low===0},H.eqz=H.isZero,H.isNegative=function(){return!this.unsigned&&this.high<0},H.isPositive=function(){return this.unsigned||this.high>=0},H.isOdd=function(){return(this.low&1)===1},H.isEven=function(){return(this.low&1)===0},H.equals=function(e){return Ye(e)||(e=mt(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low},H.eq=H.equals,H.notEquals=function(e){return!this.eq(e)},H.neq=H.notEquals,H.ne=H.notEquals,H.lessThan=function(e){return this.comp(e)<0},H.lt=H.lessThan,H.lessThanOrEqual=function(e){return this.comp(e)<=0},H.lte=H.lessThanOrEqual,H.le=H.lessThanOrEqual,H.greaterThan=function(e){return this.comp(e)>0},H.gt=H.greaterThan,H.greaterThanOrEqual=function(e){return this.comp(e)>=0},H.gte=H.greaterThanOrEqual,H.ge=H.greaterThanOrEqual,H.compare=function(e){if(Ye(e)||(e=mt(e)),this.eq(e))return 0;var t=this.isNegative(),n=e.isNegative();return t&&!n?-1:!t&&n?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1},H.comp=H.compare,H.negate=function(){return!this.unsigned&&this.eq(tt)?tt:this.not().add(wr)},H.neg=H.negate,H.add=function(e){Ye(e)||(e=mt(e));var t=this.high>>>16,n=this.high&65535,s=this.low>>>16,u=this.low&65535,l=e.high>>>16,d=e.high&65535,p=e.low>>>16,o=e.low&65535,r=0,i=0,a=0,c=0;return c+=u+o,a+=c>>>16,c&=65535,a+=s+p,i+=a>>>16,a&=65535,i+=n+d,r+=i>>>16,i&=65535,r+=t+l,r&=65535,Oe(a<<16|c,r<<16|i,this.unsigned)},H.subtract=function(e){return Ye(e)||(e=mt(e)),this.add(e.neg())},H.sub=H.subtract,H.multiply=function(e){if(this.isZero())return this;if(Ye(e)||(e=mt(e)),st){var t=st.mul(this.low,this.high,e.low,e.high);return Oe(t,st.get_high(),this.unsigned)}if(e.isZero())return this.unsigned?Rt:yt;if(this.eq(tt))return e.isOdd()?tt:yt;if(e.eq(tt))return this.isOdd()?tt:yt;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Ro)&&e.lt(Ro))return _t(this.toNumber()*e.toNumber(),this.unsigned);var n=this.high>>>16,s=this.high&65535,u=this.low>>>16,l=this.low&65535,d=e.high>>>16,p=e.high&65535,o=e.low>>>16,r=e.low&65535,i=0,a=0,c=0,h=0;return h+=l*r,c+=h>>>16,h&=65535,c+=u*r,a+=c>>>16,c&=65535,c+=l*o,a+=c>>>16,c&=65535,a+=s*r,i+=a>>>16,a&=65535,a+=u*o,i+=a>>>16,a&=65535,a+=l*p,i+=a>>>16,a&=65535,i+=n*r+s*o+u*p+l*d,i&=65535,Oe(c<<16|h,i<<16|a,this.unsigned)},H.mul=H.multiply,H.divide=function(e){if(Ye(e)||(e=mt(e)),e.isZero())throw Error("division by zero");if(st){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var t=(this.unsigned?st.div_u:st.div_s)(this.low,this.high,e.low,e.high);return Oe(t,st.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?Rt:yt;var n,s,u;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return Rt;if(e.gt(this.shru(1)))return Bo;u=Rt}else{if(this.eq(tt)){if(e.eq(wr)||e.eq(vi))return tt;if(e.eq(tt))return wr;var l=this.shr(1);return n=l.div(e).shl(1),n.eq(yt)?e.isNegative()?wr:vi:(s=this.sub(e.mul(n)),u=n.add(s.div(e)),u)}else if(e.eq(tt))return this.unsigned?Rt:yt;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();u=yt}for(s=this;s.gte(e);){n=Math.max(1,Math.floor(s.toNumber()/e.toNumber()));for(var d=Math.ceil(Math.log(n)/Math.LN2),p=d<=48?1:Wn(2,d-48),o=_t(n),r=o.mul(e);r.isNegative()||r.gt(s);)n-=p,o=_t(n,this.unsigned),r=o.mul(e);o.isZero()&&(o=wr),u=u.add(o),s=s.sub(r)}return u},H.div=H.divide,H.modulo=function(e){if(Ye(e)||(e=mt(e)),st){var t=(this.unsigned?st.rem_u:st.rem_s)(this.low,this.high,e.low,e.high);return Oe(t,st.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))},H.mod=H.modulo,H.rem=H.modulo,H.not=function(){return Oe(~this.low,~this.high,this.unsigned)},H.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32},H.clz=H.countLeadingZeros,H.countTrailingZeros=function(){return this.low?Kd(this.low):Kd(this.high)+32},H.ctz=H.countTrailingZeros,H.and=function(e){return Ye(e)||(e=mt(e)),Oe(this.low&e.low,this.high&e.high,this.unsigned)},H.or=function(e){return Ye(e)||(e=mt(e)),Oe(this.low|e.low,this.high|e.high,this.unsigned)},H.xor=function(e){return Ye(e)||(e=mt(e)),Oe(this.low^e.low,this.high^e.high,this.unsigned)},H.shiftLeft=function(e){return Ye(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Oe(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):Oe(0,this.low<<e-32,this.unsigned)},H.shl=H.shiftLeft,H.shiftRight=function(e){return Ye(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Oe(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):Oe(this.high>>e-32,this.high>=0?0:-1,this.unsigned)},H.shr=H.shiftRight,H.shiftRightUnsigned=function(e){return Ye(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Oe(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):e===32?Oe(this.high,0,this.unsigned):Oe(this.high>>>e-32,0,this.unsigned)},H.shru=H.shiftRightUnsigned,H.shr_u=H.shiftRightUnsigned,H.rotateLeft=function(e){var t;return Ye(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Oe(this.high,this.low,this.unsigned):e<32?(t=32-e,Oe(this.low<<e|this.high>>>t,this.high<<e|this.low>>>t,this.unsigned)):(e-=32,t=32-e,Oe(this.high<<e|this.low>>>t,this.low<<e|this.high>>>t,this.unsigned))},H.rotl=H.rotateLeft,H.rotateRight=function(e){var t;return Ye(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Oe(this.high,this.low,this.unsigned):e<32?(t=32-e,Oe(this.high<<t|this.low>>>e,this.low<<t|this.high>>>e,this.unsigned)):(e-=32,t=32-e,Oe(this.low<<t|this.high>>>e,this.high<<t|this.low>>>e,this.unsigned))},H.rotr=H.rotateRight,H.toSigned=function(){return this.unsigned?Oe(this.low,this.high,!1):this},H.toUnsigned=function(){return this.unsigned?this:Oe(this.low,this.high,!0)},H.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()},H.toBytesLE=function(){var e=this.high,t=this.low;return[t&255,t>>>8&255,t>>>16&255,t>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]},H.toBytesBE=function(){var e=this.high,t=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,t>>>24,t>>>16&255,t>>>8&255,t&255]},Ne.fromBytes=function(e,t,n){return n?Ne.fromBytesLE(e,t):Ne.fromBytesBE(e,t)},Ne.fromBytesLE=function(e,t){return new Ne(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,t)},Ne.fromBytesBE=function(e,t){return new Ne(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],t)},typeof BigInt=="function"&&(Ne.fromBigInt=function(e,t){var n=Number(BigInt.asIntN(32,e)),s=Number(BigInt.asIntN(32,e>>BigInt(32)));return Oe(n,s,t)},Ne.fromValue=function(e,t){return typeof e=="bigint"?Ne.fromBigInt(e,t):mt(e,t)},H.toBigInt=function(){var e=BigInt(this.low>>>0),t=BigInt(this.unsigned?this.high>>>0:this.high);return t<<BigInt(32)|e}),Gr=Ne}),_b=re(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ArgType=void 0;var t;(function(n){n[n.INPUT=0]="INPUT",n[n.OUTPUT=1]="OUTPUT"})(t||(e.ArgType=t={}))}),fu=re(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SIZE_PREFIX_LENGTH=e.FILE_IDENTIFIER_LENGTH=e.SIZEOF_INT=e.SIZEOF_SHORT=void 0,e.SIZEOF_SHORT=2,e.SIZEOF_INT=4,e.FILE_IDENTIFIER_LENGTH=4,e.SIZE_PREFIX_LENGTH=4}),wb=re(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isLittleEndian=e.float64=e.float32=e.int32=void 0,e.int32=new Int32Array(2),e.float32=new Float32Array(e.int32.buffer),e.float64=new Float64Array(e.int32.buffer),e.isLittleEndian=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1}),vb=re(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Encoding=void 0;var t;(function(n){n[n.UTF8_BYTES=1]="UTF8_BYTES",n[n.UTF16_STRING=2]="UTF16_STRING"})(t||(e.Encoding=t={}))}),xb=re(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ByteBuffer=void 0;var t=fu(),n=vb(),s=wb(),u=class $b{constructor(d){this.bytes_=d,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(d){return new $b(new Uint8Array(d))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(d){this.position_=d}capacity(){return this.bytes_.length}readInt8(d){return this.readUint8(d)<<24>>24}readUint8(d){return this.bytes_[d]}readInt16(d){return this.readUint16(d)<<16>>16}readUint16(d){return this.bytes_[d]|this.bytes_[d+1]<<8}readInt32(d){return this.bytes_[d]|this.bytes_[d+1]<<8|this.bytes_[d+2]<<16|this.bytes_[d+3]<<24}readUint32(d){return this.readInt32(d)>>>0}readInt64(d){return BigInt.asIntN(64,BigInt(this.readUint32(d))+(BigInt(this.readUint32(d+4))<<BigInt(32)))}readUint64(d){return BigInt.asUintN(64,BigInt(this.readUint32(d))+(BigInt(this.readUint32(d+4))<<BigInt(32)))}readFloat32(d){return s.int32[0]=this.readInt32(d),s.float32[0]}readFloat64(d){return s.int32[s.isLittleEndian?0:1]=this.readInt32(d),s.int32[s.isLittleEndian?1:0]=this.readInt32(d+4),s.float64[0]}writeInt8(d,p){this.bytes_[d]=p}writeUint8(d,p){this.bytes_[d]=p}writeInt16(d,p){this.bytes_[d]=p,this.bytes_[d+1]=p>>8}writeUint16(d,p){this.bytes_[d]=p,this.bytes_[d+1]=p>>8}writeInt32(d,p){this.bytes_[d]=p,this.bytes_[d+1]=p>>8,this.bytes_[d+2]=p>>16,this.bytes_[d+3]=p>>24}writeUint32(d,p){this.bytes_[d]=p,this.bytes_[d+1]=p>>8,this.bytes_[d+2]=p>>16,this.bytes_[d+3]=p>>24}writeInt64(d,p){this.writeInt32(d,Number(BigInt.asIntN(32,p))),this.writeInt32(d+4,Number(BigInt.asIntN(32,p>>BigInt(32))))}writeUint64(d,p){this.writeUint32(d,Number(BigInt.asUintN(32,p))),this.writeUint32(d+4,Number(BigInt.asUintN(32,p>>BigInt(32))))}writeFloat32(d,p){s.float32[0]=p,this.writeInt32(d,s.int32[0])}writeFloat64(d,p){s.float64[0]=p,this.writeInt32(d,s.int32[s.isLittleEndian?0:1]),this.writeInt32(d+4,s.int32[s.isLittleEndian?1:0])}getBufferIdentifier(){if(this.bytes_.length<this.position_+t.SIZEOF_INT+t.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let d="";for(let p=0;p<t.FILE_IDENTIFIER_LENGTH;p++)d+=String.fromCharCode(this.readInt8(this.position_+t.SIZEOF_INT+p));return d}__offset(d,p){let o=d-this.readInt32(d);return p<this.readInt16(o)?this.readInt16(o+p):0}__union(d,p){return d.bb_pos=p+this.readInt32(p),d.bb=this,d}__string(d,p){d+=this.readInt32(d);let o=this.readInt32(d);d+=t.SIZEOF_INT;let r=this.bytes_.subarray(d,d+o);return p===n.Encoding.UTF8_BYTES?r:this.text_decoder_.decode(r)}__union_with_string(d,p){return typeof d=="string"?this.__string(p):this.__union(d,p)}__indirect(d){return d+this.readInt32(d)}__vector(d){return d+this.readInt32(d)+t.SIZEOF_INT}__vector_len(d){return this.readInt32(d+this.readInt32(d))}__has_identifier(d){if(d.length!=t.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+t.FILE_IDENTIFIER_LENGTH);for(let p=0;p<t.FILE_IDENTIFIER_LENGTH;p++)if(d.charCodeAt(p)!=this.readInt8(this.position()+t.SIZEOF_INT+p))return!1;return!0}createScalarList(d,p){let o=[];for(let r=0;r<p;++r){let i=d(r);i!==null&&o.push(i)}return o}createObjList(d,p){let o=[];for(let r=0;r<p;++r){let i=d(r);i!==null&&o.push(i.unpack())}return o}};e.ByteBuffer=u}),Q$=re(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Builder=void 0;var t=xb(),n=fu(),s=class Tb{constructor(l){this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder;let d;l?d=l:d=1024,this.bb=t.ByteBuffer.allocate(d),this.space=d}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(l){this.force_defaults=l}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(l,d){l>this.minalign&&(this.minalign=l);let p=~(this.bb.capacity()-this.space+d)+1&l-1;for(;this.space<p+l+d;){let o=this.bb.capacity();this.bb=Tb.growByteBuffer(this.bb),this.space+=this.bb.capacity()-o}this.pad(p)}pad(l){for(let d=0;d<l;d++)this.bb.writeInt8(--this.space,0)}writeInt8(l){this.bb.writeInt8(this.space-=1,l)}writeInt16(l){this.bb.writeInt16(this.space-=2,l)}writeInt32(l){this.bb.writeInt32(this.space-=4,l)}writeInt64(l){this.bb.writeInt64(this.space-=8,l)}writeFloat32(l){this.bb.writeFloat32(this.space-=4,l)}writeFloat64(l){this.bb.writeFloat64(this.space-=8,l)}addInt8(l){this.prep(1,0),this.writeInt8(l)}addInt16(l){this.prep(2,0),this.writeInt16(l)}addInt32(l){this.prep(4,0),this.writeInt32(l)}addInt64(l){this.prep(8,0),this.writeInt64(l)}addFloat32(l){this.prep(4,0),this.writeFloat32(l)}addFloat64(l){this.prep(8,0),this.writeFloat64(l)}addFieldInt8(l,d,p){(this.force_defaults||d!=p)&&(this.addInt8(d),this.slot(l))}addFieldInt16(l,d,p){(this.force_defaults||d!=p)&&(this.addInt16(d),this.slot(l))}addFieldInt32(l,d,p){(this.force_defaults||d!=p)&&(this.addInt32(d),this.slot(l))}addFieldInt64(l,d,p){(this.force_defaults||d!==p)&&(this.addInt64(d),this.slot(l))}addFieldFloat32(l,d,p){(this.force_defaults||d!=p)&&(this.addFloat32(d),this.slot(l))}addFieldFloat64(l,d,p){(this.force_defaults||d!=p)&&(this.addFloat64(d),this.slot(l))}addFieldOffset(l,d,p){(this.force_defaults||d!=p)&&(this.addOffset(d),this.slot(l))}addFieldStruct(l,d,p){d!=p&&(this.nested(d),this.slot(l))}nested(l){if(l!=this.offset())throw new TypeError("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw new TypeError("FlatBuffers: object serialization must not be nested.")}slot(l){this.vtable!==null&&(this.vtable[l]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(l){let d=l.capacity();if(d&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");let p=d<<1,o=t.ByteBuffer.allocate(p);return o.setPosition(p-d),o.bytes().set(l.bytes(),p-d),o}addOffset(l){this.prep(n.SIZEOF_INT,0),this.writeInt32(this.offset()-l+n.SIZEOF_INT)}startObject(l){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=l;for(let d=0;d<l;d++)this.vtable[d]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);let l=this.offset(),d=this.vtable_in_use-1;for(;d>=0&&this.vtable[d]==0;d--);let p=d+1;for(;d>=0;d--)this.addInt16(this.vtable[d]!=0?l-this.vtable[d]:0);let o=2;this.addInt16(l-this.object_start);let r=(p+o)*n.SIZEOF_SHORT;this.addInt16(r);let i=0,a=this.space;e:for(d=0;d<this.vtables.length;d++){let c=this.bb.capacity()-this.vtables[d];if(r==this.bb.readInt16(c)){for(let h=n.SIZEOF_SHORT;h<r;h+=n.SIZEOF_SHORT)if(this.bb.readInt16(a+h)!=this.bb.readInt16(c+h))continue e;i=this.vtables[d];break}}return i?(this.space=this.bb.capacity()-l,this.bb.writeInt32(this.space,i-l)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-l,this.offset()-l)),this.isNested=!1,l}finish(l,d,p){let o=p?n.SIZE_PREFIX_LENGTH:0;if(d){let r=d;if(this.prep(this.minalign,n.SIZEOF_INT+n.FILE_IDENTIFIER_LENGTH+o),r.length!=n.FILE_IDENTIFIER_LENGTH)throw new TypeError("FlatBuffers: file identifier must be length "+n.FILE_IDENTIFIER_LENGTH);for(let i=n.FILE_IDENTIFIER_LENGTH-1;i>=0;i--)this.writeInt8(r.charCodeAt(i))}this.prep(this.minalign,n.SIZEOF_INT+o),this.addOffset(l),o&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(l,d){this.finish(l,d,!0)}requiredField(l,d){let p=this.bb.capacity()-l,o=p-this.bb.readInt32(p);if(!(d<this.bb.readInt16(o)&&this.bb.readInt16(o+d)!=0))throw new TypeError("FlatBuffers: field "+d+" must be set")}startVector(l,d,p){this.notNested(),this.vector_num_elems=d,this.prep(n.SIZEOF_INT,l*d),this.prep(p,l*d)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(l){if(!l)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(l))return this.string_maps.get(l);let d=this.createString(l);return this.string_maps.set(l,d),d}createString(l){if(l==null)return 0;let d;return l instanceof Uint8Array?d=l:d=this.text_encoder.encode(l),this.addInt8(0),this.startVector(1,d.length,1),this.bb.setPosition(this.space-=d.length),this.bb.bytes().set(d,this.space),this.endVector()}createByteVector(l){return l==null?0:(this.startVector(1,l.length,1),this.bb.setPosition(this.space-=l.length),this.bb.bytes().set(l,this.space),this.endVector())}createObjectOffset(l){return l===null?0:typeof l=="string"?this.createString(l):l.pack(this)}createObjectOffsetList(l){let d=[];for(let p=0;p<l.length;++p){let o=l[p];if(o!==null)d.push(this.createObjectOffset(o));else throw new TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return d}createStructOffsetList(l,d){return d(this,l.length),this.createObjectOffsetList(l.slice().reverse()),this.endVector()}};e.Builder=s}),Ae=re(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Encoding=e.ByteBuffer=e.Builder=e.isLittleEndian=e.int32=e.float64=e.float32=e.SIZE_PREFIX_LENGTH=e.SIZEOF_SHORT=e.SIZEOF_INT=e.FILE_IDENTIFIER_LENGTH=void 0;var t=fu();Object.defineProperty(e,"FILE_IDENTIFIER_LENGTH",{enumerable:!0,get:function(){return t.FILE_IDENTIFIER_LENGTH}}),Object.defineProperty(e,"SIZEOF_INT",{enumerable:!0,get:function(){return t.SIZEOF_INT}}),Object.defineProperty(e,"SIZEOF_SHORT",{enumerable:!0,get:function(){return t.SIZEOF_SHORT}}),Object.defineProperty(e,"SIZE_PREFIX_LENGTH",{enumerable:!0,get:function(){return t.SIZE_PREFIX_LENGTH}});var n=wb();Object.defineProperty(e,"float32",{enumerable:!0,get:function(){return n.float32}}),Object.defineProperty(e,"float64",{enumerable:!0,get:function(){return n.float64}}),Object.defineProperty(e,"int32",{enumerable:!0,get:function(){return n.int32}}),Object.defineProperty(e,"isLittleEndian",{enumerable:!0,get:function(){return n.isLittleEndian}});var s=Q$();Object.defineProperty(e,"Builder",{enumerable:!0,get:function(){return s.Builder}});var u=xb();Object.defineProperty(e,"ByteBuffer",{enumerable:!0,get:function(){return u.ByteBuffer}});var l=vb();Object.defineProperty(e,"Encoding",{enumerable:!0,get:function(){return l.Encoding}})}),Ib=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var a=Object.getOwnPropertyDescriptor(o,r);(!a||("get"in a?!o.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,a)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),s=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(i[i.length]=a);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),a=0;a<i.length;a++)i[a]!=="default"&&t(r,o,i[a]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.ArgTypeAndIndex=void 0;var u=s(Ae()),l=_b(),d=class Sr{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsArgTypeAndIndex(o,r){return(r||new Sr).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsArgTypeAndIndex(o,r){return o.setPosition(o.position()+u.SIZE_PREFIX_LENGTH),(r||new Sr).__init(o.readInt32(o.position())+o.position(),o)}argType(){let o=this.bb.__offset(this.bb_pos,4);return o?this.bb.readInt8(this.bb_pos+o):l.ArgType.INPUT}index(){let o=this.bb.__offset(this.bb_pos,6);return o?this.bb.readUint32(this.bb_pos+o):0}static startArgTypeAndIndex(o){o.startObject(2)}static addArgType(o,r){o.addFieldInt8(0,r,l.ArgType.INPUT)}static addIndex(o,r){o.addFieldInt32(1,r,0)}static endArgTypeAndIndex(o){return o.endObject()}static createArgTypeAndIndex(o,r,i){return Sr.startArgTypeAndIndex(o),Sr.addArgType(o,r),Sr.addIndex(o,i),Sr.endArgTypeAndIndex(o)}};e.ArgTypeAndIndex=d}),Sb=re(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.AttributeType=void 0;var t;(function(n){n[n.UNDEFINED=0]="UNDEFINED",n[n.FLOAT=1]="FLOAT",n[n.INT=2]="INT",n[n.STRING=3]="STRING",n[n.TENSOR=4]="TENSOR",n[n.GRAPH=5]="GRAPH",n[n.FLOATS=6]="FLOATS",n[n.INTS=7]="INTS",n[n.STRINGS=8]="STRINGS",n[n.TENSORS=9]="TENSORS",n[n.GRAPHS=10]="GRAPHS",n[n.SPARSE_TENSOR=11]="SPARSE_TENSOR",n[n.SPARSE_TENSORS=12]="SPARSE_TENSORS"})(t||(e.AttributeType=t={}))}),Ob=re(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.NodeType=void 0;var t;(function(n){n[n.Primitive=0]="Primitive",n[n.Fused=1]="Fused"})(t||(e.NodeType=t={}))}),Eb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(o,r,i,a){a===void 0&&(a=i);var c=Object.getOwnPropertyDescriptor(r,i);(!c||("get"in c?!r.__esModule:c.writable||c.configurable))&&(c={enumerable:!0,get:function(){return r[i]}}),Object.defineProperty(o,a,c)}:function(o,r,i,a){a===void 0&&(a=i),o[a]=r[i]}),n=e&&e.__setModuleDefault||(Object.create?function(o,r){Object.defineProperty(o,"default",{enumerable:!0,value:r})}:function(o,r){o.default=r}),s=e&&e.__importStar||(function(){var o=function(r){return o=Object.getOwnPropertyNames||function(i){var a=[];for(var c in i)Object.prototype.hasOwnProperty.call(i,c)&&(a[a.length]=c);return a},o(r)};return function(r){if(r&&r.__esModule)return r;var i={};if(r!=null)for(var a=o(r),c=0;c<a.length;c++)a[c]!=="default"&&t(i,r,a[c]);return n(i,r),i}})();Object.defineProperty(e,"__esModule",{value:!0}),e.Node=void 0;var u=s(Ae()),l=Gb(),d=Ob(),p=class Ke{constructor(){this.bb=null,this.bb_pos=0}__init(r,i){return this.bb_pos=r,this.bb=i,this}static getRootAsNode(r,i){return(i||new Ke).__init(r.readInt32(r.position())+r.position(),r)}static getSizePrefixedRootAsNode(r,i){return r.setPosition(r.position()+u.SIZE_PREFIX_LENGTH),(i||new Ke).__init(r.readInt32(r.position())+r.position(),r)}name(r){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.__string(this.bb_pos+i,r):null}docString(r){let i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__string(this.bb_pos+i,r):null}domain(r){let i=this.bb.__offset(this.bb_pos,8);return i?this.bb.__string(this.bb_pos+i,r):null}sinceVersion(){let r=this.bb.__offset(this.bb_pos,10);return r?this.bb.readInt32(this.bb_pos+r):0}index(){let r=this.bb.__offset(this.bb_pos,12);return r?this.bb.readUint32(this.bb_pos+r):0}opType(r){let i=this.bb.__offset(this.bb_pos,14);return i?this.bb.__string(this.bb_pos+i,r):null}type(){let r=this.bb.__offset(this.bb_pos,16);return r?this.bb.readInt32(this.bb_pos+r):d.NodeType.Primitive}executionProviderType(r){let i=this.bb.__offset(this.bb_pos,18);return i?this.bb.__string(this.bb_pos+i,r):null}inputs(r,i){let a=this.bb.__offset(this.bb_pos,20);return a?this.bb.__string(this.bb.__vector(this.bb_pos+a)+r*4,i):null}inputsLength(){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.__vector_len(this.bb_pos+r):0}outputs(r,i){let a=this.bb.__offset(this.bb_pos,22);return a?this.bb.__string(this.bb.__vector(this.bb_pos+a)+r*4,i):null}outputsLength(){let r=this.bb.__offset(this.bb_pos,22);return r?this.bb.__vector_len(this.bb_pos+r):0}attributes(r,i){let a=this.bb.__offset(this.bb_pos,24);return a?(i||new l.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+a)+r*4),this.bb):null}attributesLength(){let r=this.bb.__offset(this.bb_pos,24);return r?this.bb.__vector_len(this.bb_pos+r):0}inputArgCounts(r){let i=this.bb.__offset(this.bb_pos,26);return i?this.bb.readInt32(this.bb.__vector(this.bb_pos+i)+r*4):0}inputArgCountsLength(){let r=this.bb.__offset(this.bb_pos,26);return r?this.bb.__vector_len(this.bb_pos+r):0}inputArgCountsArray(){let r=this.bb.__offset(this.bb_pos,26);return r?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+r),this.bb.__vector_len(this.bb_pos+r)):null}implicitInputs(r,i){let a=this.bb.__offset(this.bb_pos,28);return a?this.bb.__string(this.bb.__vector(this.bb_pos+a)+r*4,i):null}implicitInputsLength(){let r=this.bb.__offset(this.bb_pos,28);return r?this.bb.__vector_len(this.bb_pos+r):0}static startNode(r){r.startObject(13)}static addName(r,i){r.addFieldOffset(0,i,0)}static addDocString(r,i){r.addFieldOffset(1,i,0)}static addDomain(r,i){r.addFieldOffset(2,i,0)}static addSinceVersion(r,i){r.addFieldInt32(3,i,0)}static addIndex(r,i){r.addFieldInt32(4,i,0)}static addOpType(r,i){r.addFieldOffset(5,i,0)}static addType(r,i){r.addFieldInt32(6,i,d.NodeType.Primitive)}static addExecutionProviderType(r,i){r.addFieldOffset(7,i,0)}static addInputs(r,i){r.addFieldOffset(8,i,0)}static createInputsVector(r,i){r.startVector(4,i.length,4);for(let a=i.length-1;a>=0;a--)r.addOffset(i[a]);return r.endVector()}static startInputsVector(r,i){r.startVector(4,i,4)}static addOutputs(r,i){r.addFieldOffset(9,i,0)}static createOutputsVector(r,i){r.startVector(4,i.length,4);for(let a=i.length-1;a>=0;a--)r.addOffset(i[a]);return r.endVector()}static startOutputsVector(r,i){r.startVector(4,i,4)}static addAttributes(r,i){r.addFieldOffset(10,i,0)}static createAttributesVector(r,i){r.startVector(4,i.length,4);for(let a=i.length-1;a>=0;a--)r.addOffset(i[a]);return r.endVector()}static startAttributesVector(r,i){r.startVector(4,i,4)}static addInputArgCounts(r,i){r.addFieldOffset(11,i,0)}static createInputArgCountsVector(r,i){r.startVector(4,i.length,4);for(let a=i.length-1;a>=0;a--)r.addInt32(i[a]);return r.endVector()}static startInputArgCountsVector(r,i){r.startVector(4,i,4)}static addImplicitInputs(r,i){r.addFieldOffset(12,i,0)}static createImplicitInputsVector(r,i){r.startVector(4,i.length,4);for(let a=i.length-1;a>=0;a--)r.addOffset(i[a]);return r.endVector()}static startImplicitInputsVector(r,i){r.startVector(4,i,4)}static endNode(r){return r.endObject()}static createNode(r,i,a,c,h,m,b,x,v,w,S,O,E,A){return Ke.startNode(r),Ke.addName(r,i),Ke.addDocString(r,a),Ke.addDomain(r,c),Ke.addSinceVersion(r,h),Ke.addIndex(r,m),Ke.addOpType(r,b),Ke.addType(r,x),Ke.addExecutionProviderType(r,v),Ke.addInputs(r,w),Ke.addOutputs(r,S),Ke.addAttributes(r,O),Ke.addInputArgCounts(r,E),Ke.addImplicitInputs(r,A),Ke.endNode(r)}};e.Node=p}),Pb=re(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.EdgeEnd=void 0;var t=class{constructor(){this.bb=null,this.bb_pos=0}__init(n,s){return this.bb_pos=n,this.bb=s,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static sizeOf(){return 12}static createEdgeEnd(n,s,u,l){return n.prep(4,12),n.writeInt32(l),n.writeInt32(u),n.writeInt32(s),n.offset()}};e.EdgeEnd=t}),Ab=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var a=Object.getOwnPropertyDescriptor(o,r);(!a||("get"in a?!o.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,a)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),s=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(i[i.length]=a);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),a=0;a<i.length;a++)i[a]!=="default"&&t(r,o,i[a]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.NodeEdge=void 0;var u=s(Ae()),l=Pb(),d=class or{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsNodeEdge(o,r){return(r||new or).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsNodeEdge(o,r){return o.setPosition(o.position()+u.SIZE_PREFIX_LENGTH),(r||new or).__init(o.readInt32(o.position())+o.position(),o)}nodeIndex(){let o=this.bb.__offset(this.bb_pos,4);return o?this.bb.readUint32(this.bb_pos+o):0}inputEdges(o,r){let i=this.bb.__offset(this.bb_pos,6);return i?(r||new l.EdgeEnd).__init(this.bb.__vector(this.bb_pos+i)+o*12,this.bb):null}inputEdgesLength(){let o=this.bb.__offset(this.bb_pos,6);return o?this.bb.__vector_len(this.bb_pos+o):0}outputEdges(o,r){let i=this.bb.__offset(this.bb_pos,8);return i?(r||new l.EdgeEnd).__init(this.bb.__vector(this.bb_pos+i)+o*12,this.bb):null}outputEdgesLength(){let o=this.bb.__offset(this.bb_pos,8);return o?this.bb.__vector_len(this.bb_pos+o):0}static startNodeEdge(o){o.startObject(3)}static addNodeIndex(o,r){o.addFieldInt32(0,r,0)}static addInputEdges(o,r){o.addFieldOffset(1,r,0)}static startInputEdgesVector(o,r){o.startVector(12,r,4)}static addOutputEdges(o,r){o.addFieldOffset(2,r,0)}static startOutputEdgesVector(o,r){o.startVector(12,r,4)}static endNodeEdge(o){return o.endObject()}static createNodeEdge(o,r,i,a){return or.startNodeEdge(o),or.addNodeIndex(o,r),or.addInputEdges(o,i),or.addOutputEdges(o,a),or.endNodeEdge(o)}};e.NodeEdge=d}),kb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(d,p,o,r){r===void 0&&(r=o);var i=Object.getOwnPropertyDescriptor(p,o);(!i||("get"in i?!p.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return p[o]}}),Object.defineProperty(d,r,i)}:function(d,p,o,r){r===void 0&&(r=o),d[r]=p[o]}),n=e&&e.__setModuleDefault||(Object.create?function(d,p){Object.defineProperty(d,"default",{enumerable:!0,value:p})}:function(d,p){d.default=p}),s=e&&e.__importStar||(function(){var d=function(p){return d=Object.getOwnPropertyNames||function(o){var r=[];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(r[r.length]=i);return r},d(p)};return function(p){if(p&&p.__esModule)return p;var o={};if(p!=null)for(var r=d(p),i=0;i<r.length;i++)r[i]!=="default"&&t(o,p,r[i]);return n(o,p),o}})();Object.defineProperty(e,"__esModule",{value:!0}),e.NodesToOptimizeIndices=void 0;var u=s(Ae()),l=class gt{constructor(){this.bb=null,this.bb_pos=0}__init(p,o){return this.bb_pos=p,this.bb=o,this}static getRootAsNodesToOptimizeIndices(p,o){return(o||new gt).__init(p.readInt32(p.position())+p.position(),p)}static getSizePrefixedRootAsNodesToOptimizeIndices(p,o){return p.setPosition(p.position()+u.SIZE_PREFIX_LENGTH),(o||new gt).__init(p.readInt32(p.position())+p.position(),p)}nodeIndices(p){let o=this.bb.__offset(this.bb_pos,4);return o?this.bb.readUint32(this.bb.__vector(this.bb_pos+o)+p*4):0}nodeIndicesLength(){let p=this.bb.__offset(this.bb_pos,4);return p?this.bb.__vector_len(this.bb_pos+p):0}nodeIndicesArray(){let p=this.bb.__offset(this.bb_pos,4);return p?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+p),this.bb.__vector_len(this.bb_pos+p)):null}numInputs(){let p=this.bb.__offset(this.bb_pos,6);return p?this.bb.readUint32(this.bb_pos+p):0}numOutputs(){let p=this.bb.__offset(this.bb_pos,8);return p?this.bb.readUint32(this.bb_pos+p):0}hasVariadicInput(){let p=this.bb.__offset(this.bb_pos,10);return p?!!this.bb.readInt8(this.bb_pos+p):!1}hasVariadicOutput(){let p=this.bb.__offset(this.bb_pos,12);return p?!!this.bb.readInt8(this.bb_pos+p):!1}numVariadicInputs(){let p=this.bb.__offset(this.bb_pos,14);return p?this.bb.readUint32(this.bb_pos+p):0}numVariadicOutputs(){let p=this.bb.__offset(this.bb_pos,16);return p?this.bb.readUint32(this.bb_pos+p):0}static startNodesToOptimizeIndices(p){p.startObject(7)}static addNodeIndices(p,o){p.addFieldOffset(0,o,0)}static createNodeIndicesVector(p,o){p.startVector(4,o.length,4);for(let r=o.length-1;r>=0;r--)p.addInt32(o[r]);return p.endVector()}static startNodeIndicesVector(p,o){p.startVector(4,o,4)}static addNumInputs(p,o){p.addFieldInt32(1,o,0)}static addNumOutputs(p,o){p.addFieldInt32(2,o,0)}static addHasVariadicInput(p,o){p.addFieldInt8(3,+o,0)}static addHasVariadicOutput(p,o){p.addFieldInt8(4,+o,0)}static addNumVariadicInputs(p,o){p.addFieldInt32(5,o,0)}static addNumVariadicOutputs(p,o){p.addFieldInt32(6,o,0)}static endNodesToOptimizeIndices(p){return p.endObject()}static createNodesToOptimizeIndices(p,o,r,i,a,c,h,m){return gt.startNodesToOptimizeIndices(p),gt.addNodeIndices(p,o),gt.addNumInputs(p,r),gt.addNumOutputs(p,i),gt.addHasVariadicInput(p,a),gt.addHasVariadicOutput(p,c),gt.addNumVariadicInputs(p,h),gt.addNumVariadicOutputs(p,m),gt.endNodesToOptimizeIndices(p)}};e.NodesToOptimizeIndices=l}),Db=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var a=Object.getOwnPropertyDescriptor(o,r);(!a||("get"in a?!o.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,a)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),s=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(i[i.length]=a);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),a=0;a<i.length;a++)i[a]!=="default"&&t(r,o,i[a]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizationRecord=void 0;var u=s(Ae()),l=kb(),d=class fs{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsRuntimeOptimizationRecord(o,r){return(r||new fs).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsRuntimeOptimizationRecord(o,r){return o.setPosition(o.position()+u.SIZE_PREFIX_LENGTH),(r||new fs).__init(o.readInt32(o.position())+o.position(),o)}actionId(o){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,o):null}nodesToOptimizeIndices(o){let r=this.bb.__offset(this.bb_pos,6);return r?(o||new l.NodesToOptimizeIndices).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}producedOpIds(o,r){let i=this.bb.__offset(this.bb_pos,10);return i?this.bb.__string(this.bb.__vector(this.bb_pos+i)+o*4,r):null}producedOpIdsLength(){let o=this.bb.__offset(this.bb_pos,10);return o?this.bb.__vector_len(this.bb_pos+o):0}static startRuntimeOptimizationRecord(o){o.startObject(4)}static addActionId(o,r){o.addFieldOffset(0,r,0)}static addNodesToOptimizeIndices(o,r){o.addFieldOffset(1,r,0)}static addProducedOpIds(o,r){o.addFieldOffset(3,r,0)}static createProducedOpIdsVector(o,r){o.startVector(4,r.length,4);for(let i=r.length-1;i>=0;i--)o.addOffset(r[i]);return o.endVector()}static startProducedOpIdsVector(o,r){o.startVector(4,r,4)}static endRuntimeOptimizationRecord(o){return o.endObject()}};e.RuntimeOptimizationRecord=d}),Nb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var a=Object.getOwnPropertyDescriptor(o,r);(!a||("get"in a?!o.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,a)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),s=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(i[i.length]=a);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),a=0;a<i.length;a++)i[a]!=="default"&&t(r,o,i[a]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizationRecordContainerEntry=void 0;var u=s(Ae()),l=Db(),d=class Or{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsRuntimeOptimizationRecordContainerEntry(o,r){return(r||new Or).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsRuntimeOptimizationRecordContainerEntry(o,r){return o.setPosition(o.position()+u.SIZE_PREFIX_LENGTH),(r||new Or).__init(o.readInt32(o.position())+o.position(),o)}optimizerName(o){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,o):null}runtimeOptimizationRecords(o,r){let i=this.bb.__offset(this.bb_pos,6);return i?(r||new l.RuntimeOptimizationRecord).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+o*4),this.bb):null}runtimeOptimizationRecordsLength(){let o=this.bb.__offset(this.bb_pos,6);return o?this.bb.__vector_len(this.bb_pos+o):0}static startRuntimeOptimizationRecordContainerEntry(o){o.startObject(2)}static addOptimizerName(o,r){o.addFieldOffset(0,r,0)}static addRuntimeOptimizationRecords(o,r){o.addFieldOffset(1,r,0)}static createRuntimeOptimizationRecordsVector(o,r){o.startVector(4,r.length,4);for(let i=r.length-1;i>=0;i--)o.addOffset(r[i]);return o.endVector()}static startRuntimeOptimizationRecordsVector(o,r){o.startVector(4,r,4)}static endRuntimeOptimizationRecordContainerEntry(o){let r=o.endObject();return o.requiredField(r,4),r}static createRuntimeOptimizationRecordContainerEntry(o,r,i){return Or.startRuntimeOptimizationRecordContainerEntry(o),Or.addOptimizerName(o,r),Or.addRuntimeOptimizationRecords(o,i),Or.endRuntimeOptimizationRecordContainerEntry(o)}};e.RuntimeOptimizationRecordContainerEntry=d}),Cb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var a=Object.getOwnPropertyDescriptor(o,r);(!a||("get"in a?!o.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,a)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),s=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(i[i.length]=a);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),a=0;a<i.length;a++)i[a]!=="default"&&t(r,o,i[a]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizations=void 0;var u=s(Ae()),l=Nb(),d=class rn{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsRuntimeOptimizations(o,r){return(r||new rn).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsRuntimeOptimizations(o,r){return o.setPosition(o.position()+u.SIZE_PREFIX_LENGTH),(r||new rn).__init(o.readInt32(o.position())+o.position(),o)}records(o,r){let i=this.bb.__offset(this.bb_pos,4);return i?(r||new l.RuntimeOptimizationRecordContainerEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+o*4),this.bb):null}recordsLength(){let o=this.bb.__offset(this.bb_pos,4);return o?this.bb.__vector_len(this.bb_pos+o):0}static startRuntimeOptimizations(o){o.startObject(1)}static addRecords(o,r){o.addFieldOffset(0,r,0)}static createRecordsVector(o,r){o.startVector(4,r.length,4);for(let i=r.length-1;i>=0;i--)o.addOffset(r[i]);return o.endVector()}static startRecordsVector(o,r){o.startVector(4,r,4)}static endRuntimeOptimizations(o){return o.endObject()}static createRuntimeOptimizations(o,r){return rn.startRuntimeOptimizations(o),rn.addRecords(o,r),rn.endRuntimeOptimizations(o)}};e.RuntimeOptimizations=d}),Qi=re(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TensorDataType=void 0;var t;(function(n){n[n.UNDEFINED=0]="UNDEFINED",n[n.FLOAT=1]="FLOAT",n[n.UINT8=2]="UINT8",n[n.INT8=3]="INT8",n[n.UINT16=4]="UINT16",n[n.INT16=5]="INT16",n[n.INT32=6]="INT32",n[n.INT64=7]="INT64",n[n.STRING=8]="STRING",n[n.BOOL=9]="BOOL",n[n.FLOAT16=10]="FLOAT16",n[n.DOUBLE=11]="DOUBLE",n[n.UINT32=12]="UINT32",n[n.UINT64=13]="UINT64",n[n.COMPLEX64=14]="COMPLEX64",n[n.COMPLEX128=15]="COMPLEX128",n[n.BFLOAT16=16]="BFLOAT16",n[n.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",n[n.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",n[n.FLOAT8E5M2=19]="FLOAT8E5M2",n[n.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"})(t||(e.TensorDataType=t={}))}),eo=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var a=Object.getOwnPropertyDescriptor(o,r);(!a||("get"in a?!o.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,a)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),s=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(i[i.length]=a);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),a=0;a<i.length;a++)i[a]!=="default"&&t(r,o,i[a]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.Tensor=void 0;var u=s(Ae()),l=Qi(),d=class bt{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsTensor(o,r){return(r||new bt).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsTensor(o,r){return o.setPosition(o.position()+u.SIZE_PREFIX_LENGTH),(r||new bt).__init(o.readInt32(o.position())+o.position(),o)}name(o){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,o):null}docString(o){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,o):null}dims(o){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+o*8):BigInt(0)}dimsLength(){let o=this.bb.__offset(this.bb_pos,8);return o?this.bb.__vector_len(this.bb_pos+o):0}dataType(){let o=this.bb.__offset(this.bb_pos,10);return o?this.bb.readInt32(this.bb_pos+o):l.TensorDataType.UNDEFINED}rawData(o){let r=this.bb.__offset(this.bb_pos,12);return r?this.bb.readUint8(this.bb.__vector(this.bb_pos+r)+o):0}rawDataLength(){let o=this.bb.__offset(this.bb_pos,12);return o?this.bb.__vector_len(this.bb_pos+o):0}rawDataArray(){let o=this.bb.__offset(this.bb_pos,12);return o?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+o),this.bb.__vector_len(this.bb_pos+o)):null}stringData(o,r){let i=this.bb.__offset(this.bb_pos,14);return i?this.bb.__string(this.bb.__vector(this.bb_pos+i)+o*4,r):null}stringDataLength(){let o=this.bb.__offset(this.bb_pos,14);return o?this.bb.__vector_len(this.bb_pos+o):0}externalDataOffset(){let o=this.bb.__offset(this.bb_pos,16);return o?this.bb.readInt64(this.bb_pos+o):BigInt("-1")}static startTensor(o){o.startObject(7)}static addName(o,r){o.addFieldOffset(0,r,0)}static addDocString(o,r){o.addFieldOffset(1,r,0)}static addDims(o,r){o.addFieldOffset(2,r,0)}static createDimsVector(o,r){o.startVector(8,r.length,8);for(let i=r.length-1;i>=0;i--)o.addInt64(r[i]);return o.endVector()}static startDimsVector(o,r){o.startVector(8,r,8)}static addDataType(o,r){o.addFieldInt32(3,r,l.TensorDataType.UNDEFINED)}static addRawData(o,r){o.addFieldOffset(4,r,0)}static createRawDataVector(o,r){o.startVector(1,r.length,1);for(let i=r.length-1;i>=0;i--)o.addInt8(r[i]);return o.endVector()}static startRawDataVector(o,r){o.startVector(1,r,1)}static addStringData(o,r){o.addFieldOffset(5,r,0)}static createStringDataVector(o,r){o.startVector(4,r.length,4);for(let i=r.length-1;i>=0;i--)o.addOffset(r[i]);return o.endVector()}static startStringDataVector(o,r){o.startVector(4,r,4)}static addExternalDataOffset(o,r){o.addFieldInt64(6,r,BigInt("-1"))}static endTensor(o){return o.endObject()}static createTensor(o,r,i,a,c,h,m,b){return bt.startTensor(o),bt.addName(o,r),bt.addDocString(o,i),bt.addDims(o,a),bt.addDataType(o,c),bt.addRawData(o,h),bt.addStringData(o,m),bt.addExternalDataOffset(o,b),bt.endTensor(o)}};e.Tensor=d}),zb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var a=Object.getOwnPropertyDescriptor(o,r);(!a||("get"in a?!o.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,a)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),s=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(i[i.length]=a);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),a=0;a<i.length;a++)i[a]!=="default"&&t(r,o,i[a]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.SparseTensor=void 0;var u=s(Ae()),l=eo(),d=class ms{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsSparseTensor(o,r){return(r||new ms).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsSparseTensor(o,r){return o.setPosition(o.position()+u.SIZE_PREFIX_LENGTH),(r||new ms).__init(o.readInt32(o.position())+o.position(),o)}values(o){let r=this.bb.__offset(this.bb_pos,4);return r?(o||new l.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}indices(o){let r=this.bb.__offset(this.bb_pos,6);return r?(o||new l.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}dims(o){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+o*8):BigInt(0)}dimsLength(){let o=this.bb.__offset(this.bb_pos,8);return o?this.bb.__vector_len(this.bb_pos+o):0}static startSparseTensor(o){o.startObject(3)}static addValues(o,r){o.addFieldOffset(0,r,0)}static addIndices(o,r){o.addFieldOffset(1,r,0)}static addDims(o,r){o.addFieldOffset(2,r,0)}static createDimsVector(o,r){o.startVector(8,r.length,8);for(let i=r.length-1;i>=0;i--)o.addInt64(r[i]);return o.endVector()}static startDimsVector(o,r){o.startVector(8,r,8)}static endSparseTensor(o){return o.endObject()}};e.SparseTensor=d}),Rb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(o,r,i,a){a===void 0&&(a=i);var c=Object.getOwnPropertyDescriptor(r,i);(!c||("get"in c?!r.__esModule:c.writable||c.configurable))&&(c={enumerable:!0,get:function(){return r[i]}}),Object.defineProperty(o,a,c)}:function(o,r,i,a){a===void 0&&(a=i),o[a]=r[i]}),n=e&&e.__setModuleDefault||(Object.create?function(o,r){Object.defineProperty(o,"default",{enumerable:!0,value:r})}:function(o,r){o.default=r}),s=e&&e.__importStar||(function(){var o=function(r){return o=Object.getOwnPropertyNames||function(i){var a=[];for(var c in i)Object.prototype.hasOwnProperty.call(i,c)&&(a[a.length]=c);return a},o(r)};return function(r){if(r&&r.__esModule)return r;var i={};if(r!=null)for(var a=o(r),c=0;c<a.length;c++)a[c]!=="default"&&t(i,r,a[c]);return n(i,r),i}})();Object.defineProperty(e,"__esModule",{value:!0}),e.MapType=void 0;var u=s(Ae()),l=Qi(),d=to(),p=class gs{constructor(){this.bb=null,this.bb_pos=0}__init(r,i){return this.bb_pos=r,this.bb=i,this}static getRootAsMapType(r,i){return(i||new gs).__init(r.readInt32(r.position())+r.position(),r)}static getSizePrefixedRootAsMapType(r,i){return r.setPosition(r.position()+u.SIZE_PREFIX_LENGTH),(i||new gs).__init(r.readInt32(r.position())+r.position(),r)}keyType(){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.readInt32(this.bb_pos+r):l.TensorDataType.UNDEFINED}valueType(r){let i=this.bb.__offset(this.bb_pos,6);return i?(r||new d.TypeInfo).__init(this.bb.__indirect(this.bb_pos+i),this.bb):null}static startMapType(r){r.startObject(2)}static addKeyType(r,i){r.addFieldInt32(0,i,l.TensorDataType.UNDEFINED)}static addValueType(r,i){r.addFieldOffset(1,i,0)}static endMapType(r){return r.endObject()}};e.MapType=p}),Bb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var a=Object.getOwnPropertyDescriptor(o,r);(!a||("get"in a?!o.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,a)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),s=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(i[i.length]=a);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),a=0;a<i.length;a++)i[a]!=="default"&&t(r,o,i[a]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.SequenceType=void 0;var u=s(Ae()),l=to(),d=class nn{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsSequenceType(o,r){return(r||new nn).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsSequenceType(o,r){return o.setPosition(o.position()+u.SIZE_PREFIX_LENGTH),(r||new nn).__init(o.readInt32(o.position())+o.position(),o)}elemType(o){let r=this.bb.__offset(this.bb_pos,4);return r?(o||new l.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startSequenceType(o){o.startObject(1)}static addElemType(o,r){o.addFieldOffset(0,r,0)}static endSequenceType(o){return o.endObject()}static createSequenceType(o,r){return nn.startSequenceType(o),nn.addElemType(o,r),nn.endSequenceType(o)}};e.SequenceType=d}),Mb=re(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.DimensionValueType=void 0;var t;(function(n){n[n.UNKNOWN=0]="UNKNOWN",n[n.VALUE=1]="VALUE",n[n.PARAM=2]="PARAM"})(t||(e.DimensionValueType=t={}))}),jb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var a=Object.getOwnPropertyDescriptor(o,r);(!a||("get"in a?!o.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,a)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),s=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(i[i.length]=a);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),a=0;a<i.length;a++)i[a]!=="default"&&t(r,o,i[a]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.DimensionValue=void 0;var u=s(Ae()),l=Mb(),d=class ar{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsDimensionValue(o,r){return(r||new ar).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsDimensionValue(o,r){return o.setPosition(o.position()+u.SIZE_PREFIX_LENGTH),(r||new ar).__init(o.readInt32(o.position())+o.position(),o)}dimType(){let o=this.bb.__offset(this.bb_pos,4);return o?this.bb.readInt8(this.bb_pos+o):l.DimensionValueType.UNKNOWN}dimValue(){let o=this.bb.__offset(this.bb_pos,6);return o?this.bb.readInt64(this.bb_pos+o):BigInt("0")}dimParam(o){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,o):null}static startDimensionValue(o){o.startObject(3)}static addDimType(o,r){o.addFieldInt8(0,r,l.DimensionValueType.UNKNOWN)}static addDimValue(o,r){o.addFieldInt64(1,r,BigInt("0"))}static addDimParam(o,r){o.addFieldOffset(2,r,0)}static endDimensionValue(o){return o.endObject()}static createDimensionValue(o,r,i,a){return ar.startDimensionValue(o),ar.addDimType(o,r),ar.addDimValue(o,i),ar.addDimParam(o,a),ar.endDimensionValue(o)}};e.DimensionValue=d}),Fb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var a=Object.getOwnPropertyDescriptor(o,r);(!a||("get"in a?!o.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,a)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),s=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(i[i.length]=a);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),a=0;a<i.length;a++)i[a]!=="default"&&t(r,o,i[a]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.Dimension=void 0;var u=s(Ae()),l=jb(),d=class Er{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsDimension(o,r){return(r||new Er).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsDimension(o,r){return o.setPosition(o.position()+u.SIZE_PREFIX_LENGTH),(r||new Er).__init(o.readInt32(o.position())+o.position(),o)}value(o){let r=this.bb.__offset(this.bb_pos,4);return r?(o||new l.DimensionValue).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}denotation(o){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,o):null}static startDimension(o){o.startObject(2)}static addValue(o,r){o.addFieldOffset(0,r,0)}static addDenotation(o,r){o.addFieldOffset(1,r,0)}static endDimension(o){return o.endObject()}static createDimension(o,r,i){return Er.startDimension(o),Er.addValue(o,r),Er.addDenotation(o,i),Er.endDimension(o)}};e.Dimension=d}),Lb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var a=Object.getOwnPropertyDescriptor(o,r);(!a||("get"in a?!o.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,a)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),s=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(i[i.length]=a);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),a=0;a<i.length;a++)i[a]!=="default"&&t(r,o,i[a]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.Shape=void 0;var u=s(Ae()),l=Fb(),d=class on{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsShape(o,r){return(r||new on).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsShape(o,r){return o.setPosition(o.position()+u.SIZE_PREFIX_LENGTH),(r||new on).__init(o.readInt32(o.position())+o.position(),o)}dim(o,r){let i=this.bb.__offset(this.bb_pos,4);return i?(r||new l.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+o*4),this.bb):null}dimLength(){let o=this.bb.__offset(this.bb_pos,4);return o?this.bb.__vector_len(this.bb_pos+o):0}static startShape(o){o.startObject(1)}static addDim(o,r){o.addFieldOffset(0,r,0)}static createDimVector(o,r){o.startVector(4,r.length,4);for(let i=r.length-1;i>=0;i--)o.addOffset(r[i]);return o.endVector()}static startDimVector(o,r){o.startVector(4,r,4)}static endShape(o){return o.endObject()}static createShape(o,r){return on.startShape(o),on.addDim(o,r),on.endShape(o)}};e.Shape=d}),Vb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(o,r,i,a){a===void 0&&(a=i);var c=Object.getOwnPropertyDescriptor(r,i);(!c||("get"in c?!r.__esModule:c.writable||c.configurable))&&(c={enumerable:!0,get:function(){return r[i]}}),Object.defineProperty(o,a,c)}:function(o,r,i,a){a===void 0&&(a=i),o[a]=r[i]}),n=e&&e.__setModuleDefault||(Object.create?function(o,r){Object.defineProperty(o,"default",{enumerable:!0,value:r})}:function(o,r){o.default=r}),s=e&&e.__importStar||(function(){var o=function(r){return o=Object.getOwnPropertyNames||function(i){var a=[];for(var c in i)Object.prototype.hasOwnProperty.call(i,c)&&(a[a.length]=c);return a},o(r)};return function(r){if(r&&r.__esModule)return r;var i={};if(r!=null)for(var a=o(r),c=0;c<a.length;c++)a[c]!=="default"&&t(i,r,a[c]);return n(i,r),i}})();Object.defineProperty(e,"__esModule",{value:!0}),e.TensorTypeAndShape=void 0;var u=s(Ae()),l=Lb(),d=Qi(),p=class bs{constructor(){this.bb=null,this.bb_pos=0}__init(r,i){return this.bb_pos=r,this.bb=i,this}static getRootAsTensorTypeAndShape(r,i){return(i||new bs).__init(r.readInt32(r.position())+r.position(),r)}static getSizePrefixedRootAsTensorTypeAndShape(r,i){return r.setPosition(r.position()+u.SIZE_PREFIX_LENGTH),(i||new bs).__init(r.readInt32(r.position())+r.position(),r)}elemType(){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.readInt32(this.bb_pos+r):d.TensorDataType.UNDEFINED}shape(r){let i=this.bb.__offset(this.bb_pos,6);return i?(r||new l.Shape).__init(this.bb.__indirect(this.bb_pos+i),this.bb):null}static startTensorTypeAndShape(r){r.startObject(2)}static addElemType(r,i){r.addFieldInt32(0,i,d.TensorDataType.UNDEFINED)}static addShape(r,i){r.addFieldOffset(1,i,0)}static endTensorTypeAndShape(r){return r.endObject()}};e.TensorTypeAndShape=p}),Ub=re(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TypeInfoValue=void 0,e.unionToTypeInfoValue=l,e.unionListToTypeInfoValue=d;var t=Rb(),n=Bb(),s=Vb(),u;(function(p){p[p.NONE=0]="NONE",p[p.tensor_type=1]="tensor_type",p[p.sequence_type=2]="sequence_type",p[p.map_type=3]="map_type"})(u||(e.TypeInfoValue=u={}));function l(p,o){switch(u[p]){case"NONE":return null;case"tensor_type":return o(new s.TensorTypeAndShape);case"sequence_type":return o(new n.SequenceType);case"map_type":return o(new t.MapType);default:return null}}function d(p,o,r){switch(u[p]){case"NONE":return null;case"tensor_type":return o(r,new s.TensorTypeAndShape);case"sequence_type":return o(r,new n.SequenceType);case"map_type":return o(r,new t.MapType);default:return null}}}),to=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var a=Object.getOwnPropertyDescriptor(o,r);(!a||("get"in a?!o.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,a)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),s=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(i[i.length]=a);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),a=0;a<i.length;a++)i[a]!=="default"&&t(r,o,i[a]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.TypeInfo=void 0;var u=s(Ae()),l=Ub(),d=class sr{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsTypeInfo(o,r){return(r||new sr).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsTypeInfo(o,r){return o.setPosition(o.position()+u.SIZE_PREFIX_LENGTH),(r||new sr).__init(o.readInt32(o.position())+o.position(),o)}denotation(o){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,o):null}valueType(){let o=this.bb.__offset(this.bb_pos,6);return o?this.bb.readUint8(this.bb_pos+o):l.TypeInfoValue.NONE}value(o){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__union(o,this.bb_pos+r):null}static startTypeInfo(o){o.startObject(3)}static addDenotation(o,r){o.addFieldOffset(0,r,0)}static addValueType(o,r){o.addFieldInt8(1,r,l.TypeInfoValue.NONE)}static addValue(o,r){o.addFieldOffset(2,r,0)}static endTypeInfo(o){return o.endObject()}static createTypeInfo(o,r,i,a){return sr.startTypeInfo(o),sr.addDenotation(o,r),sr.addValueType(o,i),sr.addValue(o,a),sr.endTypeInfo(o)}};e.TypeInfo=d}),qb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var a=Object.getOwnPropertyDescriptor(o,r);(!a||("get"in a?!o.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,a)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),s=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(i[i.length]=a);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),a=0;a<i.length;a++)i[a]!=="default"&&t(r,o,i[a]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.ValueInfo=void 0;var u=s(Ae()),l=to(),d=class ys{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsValueInfo(o,r){return(r||new ys).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsValueInfo(o,r){return o.setPosition(o.position()+u.SIZE_PREFIX_LENGTH),(r||new ys).__init(o.readInt32(o.position())+o.position(),o)}name(o){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,o):null}docString(o){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,o):null}type(o){let r=this.bb.__offset(this.bb_pos,8);return r?(o||new l.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startValueInfo(o){o.startObject(3)}static addName(o,r){o.addFieldOffset(0,r,0)}static addDocString(o,r){o.addFieldOffset(1,r,0)}static addType(o,r){o.addFieldOffset(2,r,0)}static endValueInfo(o){return o.endObject()}};e.ValueInfo=d}),mu=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(c,h,m,b){b===void 0&&(b=m);var x=Object.getOwnPropertyDescriptor(h,m);(!x||("get"in x?!h.__esModule:x.writable||x.configurable))&&(x={enumerable:!0,get:function(){return h[m]}}),Object.defineProperty(c,b,x)}:function(c,h,m,b){b===void 0&&(b=m),c[b]=h[m]}),n=e&&e.__setModuleDefault||(Object.create?function(c,h){Object.defineProperty(c,"default",{enumerable:!0,value:h})}:function(c,h){c.default=h}),s=e&&e.__importStar||(function(){var c=function(h){return c=Object.getOwnPropertyNames||function(m){var b=[];for(var x in m)Object.prototype.hasOwnProperty.call(m,x)&&(b[b.length]=x);return b},c(h)};return function(h){if(h&&h.__esModule)return h;var m={};if(h!=null)for(var b=c(h),x=0;x<b.length;x++)b[x]!=="default"&&t(m,h,b[x]);return n(m,h),m}})();Object.defineProperty(e,"__esModule",{value:!0}),e.Graph=void 0;var u=s(Ae()),l=Eb(),d=Ab(),p=Cb(),o=zb(),r=eo(),i=qb(),a=class _s{constructor(){this.bb=null,this.bb_pos=0}__init(h,m){return this.bb_pos=h,this.bb=m,this}static getRootAsGraph(h,m){return(m||new _s).__init(h.readInt32(h.position())+h.position(),h)}static getSizePrefixedRootAsGraph(h,m){return h.setPosition(h.position()+u.SIZE_PREFIX_LENGTH),(m||new _s).__init(h.readInt32(h.position())+h.position(),h)}initializers(h,m){let b=this.bb.__offset(this.bb_pos,4);return b?(m||new r.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+b)+h*4),this.bb):null}initializersLength(){let h=this.bb.__offset(this.bb_pos,4);return h?this.bb.__vector_len(this.bb_pos+h):0}nodeArgs(h,m){let b=this.bb.__offset(this.bb_pos,6);return b?(m||new i.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+b)+h*4),this.bb):null}nodeArgsLength(){let h=this.bb.__offset(this.bb_pos,6);return h?this.bb.__vector_len(this.bb_pos+h):0}nodes(h,m){let b=this.bb.__offset(this.bb_pos,8);return b?(m||new l.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+b)+h*4),this.bb):null}nodesLength(){let h=this.bb.__offset(this.bb_pos,8);return h?this.bb.__vector_len(this.bb_pos+h):0}maxNodeIndex(){let h=this.bb.__offset(this.bb_pos,10);return h?this.bb.readUint32(this.bb_pos+h):0}nodeEdges(h,m){let b=this.bb.__offset(this.bb_pos,12);return b?(m||new d.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+b)+h*4),this.bb):null}nodeEdgesLength(){let h=this.bb.__offset(this.bb_pos,12);return h?this.bb.__vector_len(this.bb_pos+h):0}inputs(h,m){let b=this.bb.__offset(this.bb_pos,14);return b?this.bb.__string(this.bb.__vector(this.bb_pos+b)+h*4,m):null}inputsLength(){let h=this.bb.__offset(this.bb_pos,14);return h?this.bb.__vector_len(this.bb_pos+h):0}outputs(h,m){let b=this.bb.__offset(this.bb_pos,16);return b?this.bb.__string(this.bb.__vector(this.bb_pos+b)+h*4,m):null}outputsLength(){let h=this.bb.__offset(this.bb_pos,16);return h?this.bb.__vector_len(this.bb_pos+h):0}sparseInitializers(h,m){let b=this.bb.__offset(this.bb_pos,18);return b?(m||new o.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+b)+h*4),this.bb):null}sparseInitializersLength(){let h=this.bb.__offset(this.bb_pos,18);return h?this.bb.__vector_len(this.bb_pos+h):0}runtimeOptimizations(h){let m=this.bb.__offset(this.bb_pos,20);return m?(h||new p.RuntimeOptimizations).__init(this.bb.__indirect(this.bb_pos+m),this.bb):null}static startGraph(h){h.startObject(9)}static addInitializers(h,m){h.addFieldOffset(0,m,0)}static createInitializersVector(h,m){h.startVector(4,m.length,4);for(let b=m.length-1;b>=0;b--)h.addOffset(m[b]);return h.endVector()}static startInitializersVector(h,m){h.startVector(4,m,4)}static addNodeArgs(h,m){h.addFieldOffset(1,m,0)}static createNodeArgsVector(h,m){h.startVector(4,m.length,4);for(let b=m.length-1;b>=0;b--)h.addOffset(m[b]);return h.endVector()}static startNodeArgsVector(h,m){h.startVector(4,m,4)}static addNodes(h,m){h.addFieldOffset(2,m,0)}static createNodesVector(h,m){h.startVector(4,m.length,4);for(let b=m.length-1;b>=0;b--)h.addOffset(m[b]);return h.endVector()}static startNodesVector(h,m){h.startVector(4,m,4)}static addMaxNodeIndex(h,m){h.addFieldInt32(3,m,0)}static addNodeEdges(h,m){h.addFieldOffset(4,m,0)}static createNodeEdgesVector(h,m){h.startVector(4,m.length,4);for(let b=m.length-1;b>=0;b--)h.addOffset(m[b]);return h.endVector()}static startNodeEdgesVector(h,m){h.startVector(4,m,4)}static addInputs(h,m){h.addFieldOffset(5,m,0)}static createInputsVector(h,m){h.startVector(4,m.length,4);for(let b=m.length-1;b>=0;b--)h.addOffset(m[b]);return h.endVector()}static startInputsVector(h,m){h.startVector(4,m,4)}static addOutputs(h,m){h.addFieldOffset(6,m,0)}static createOutputsVector(h,m){h.startVector(4,m.length,4);for(let b=m.length-1;b>=0;b--)h.addOffset(m[b]);return h.endVector()}static startOutputsVector(h,m){h.startVector(4,m,4)}static addSparseInitializers(h,m){h.addFieldOffset(7,m,0)}static createSparseInitializersVector(h,m){h.startVector(4,m.length,4);for(let b=m.length-1;b>=0;b--)h.addOffset(m[b]);return h.endVector()}static startSparseInitializersVector(h,m){h.startVector(4,m,4)}static addRuntimeOptimizations(h,m){h.addFieldOffset(8,m,0)}static endGraph(h){return h.endObject()}};e.Graph=a}),Gb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(r,i,a,c){c===void 0&&(c=a);var h=Object.getOwnPropertyDescriptor(i,a);(!h||("get"in h?!i.__esModule:h.writable||h.configurable))&&(h={enumerable:!0,get:function(){return i[a]}}),Object.defineProperty(r,c,h)}:function(r,i,a,c){c===void 0&&(c=a),r[c]=i[a]}),n=e&&e.__setModuleDefault||(Object.create?function(r,i){Object.defineProperty(r,"default",{enumerable:!0,value:i})}:function(r,i){r.default=i}),s=e&&e.__importStar||(function(){var r=function(i){return r=Object.getOwnPropertyNames||function(a){var c=[];for(var h in a)Object.prototype.hasOwnProperty.call(a,h)&&(c[c.length]=h);return c},r(i)};return function(i){if(i&&i.__esModule)return i;var a={};if(i!=null)for(var c=r(i),h=0;h<c.length;h++)c[h]!=="default"&&t(a,i,c[h]);return n(a,i),a}})();Object.defineProperty(e,"__esModule",{value:!0}),e.Attribute=void 0;var u=s(Ae()),l=Sb(),d=mu(),p=eo(),o=class ws{constructor(){this.bb=null,this.bb_pos=0}__init(i,a){return this.bb_pos=i,this.bb=a,this}static getRootAsAttribute(i,a){return(a||new ws).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsAttribute(i,a){return i.setPosition(i.position()+u.SIZE_PREFIX_LENGTH),(a||new ws).__init(i.readInt32(i.position())+i.position(),i)}name(i){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__string(this.bb_pos+a,i):null}docString(i){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__string(this.bb_pos+a,i):null}type(){let i=this.bb.__offset(this.bb_pos,8);return i?this.bb.readInt32(this.bb_pos+i):l.AttributeType.UNDEFINED}f(){let i=this.bb.__offset(this.bb_pos,10);return i?this.bb.readFloat32(this.bb_pos+i):0}i(){let i=this.bb.__offset(this.bb_pos,12);return i?this.bb.readInt64(this.bb_pos+i):BigInt("0")}s(i){let a=this.bb.__offset(this.bb_pos,14);return a?this.bb.__string(this.bb_pos+a,i):null}t(i){let a=this.bb.__offset(this.bb_pos,16);return a?(i||new p.Tensor).__init(this.bb.__indirect(this.bb_pos+a),this.bb):null}g(i){let a=this.bb.__offset(this.bb_pos,18);return a?(i||new d.Graph).__init(this.bb.__indirect(this.bb_pos+a),this.bb):null}floats(i){let a=this.bb.__offset(this.bb_pos,20);return a?this.bb.readFloat32(this.bb.__vector(this.bb_pos+a)+i*4):0}floatsLength(){let i=this.bb.__offset(this.bb_pos,20);return i?this.bb.__vector_len(this.bb_pos+i):0}floatsArray(){let i=this.bb.__offset(this.bb_pos,20);return i?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+i),this.bb.__vector_len(this.bb_pos+i)):null}ints(i){let a=this.bb.__offset(this.bb_pos,22);return a?this.bb.readInt64(this.bb.__vector(this.bb_pos+a)+i*8):BigInt(0)}intsLength(){let i=this.bb.__offset(this.bb_pos,22);return i?this.bb.__vector_len(this.bb_pos+i):0}strings(i,a){let c=this.bb.__offset(this.bb_pos,24);return c?this.bb.__string(this.bb.__vector(this.bb_pos+c)+i*4,a):null}stringsLength(){let i=this.bb.__offset(this.bb_pos,24);return i?this.bb.__vector_len(this.bb_pos+i):0}tensors(i,a){let c=this.bb.__offset(this.bb_pos,26);return c?(a||new p.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+c)+i*4),this.bb):null}tensorsLength(){let i=this.bb.__offset(this.bb_pos,26);return i?this.bb.__vector_len(this.bb_pos+i):0}graphs(i,a){let c=this.bb.__offset(this.bb_pos,28);return c?(a||new d.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+c)+i*4),this.bb):null}graphsLength(){let i=this.bb.__offset(this.bb_pos,28);return i?this.bb.__vector_len(this.bb_pos+i):0}static startAttribute(i){i.startObject(13)}static addName(i,a){i.addFieldOffset(0,a,0)}static addDocString(i,a){i.addFieldOffset(1,a,0)}static addType(i,a){i.addFieldInt32(2,a,l.AttributeType.UNDEFINED)}static addF(i,a){i.addFieldFloat32(3,a,0)}static addI(i,a){i.addFieldInt64(4,a,BigInt("0"))}static addS(i,a){i.addFieldOffset(5,a,0)}static addT(i,a){i.addFieldOffset(6,a,0)}static addG(i,a){i.addFieldOffset(7,a,0)}static addFloats(i,a){i.addFieldOffset(8,a,0)}static createFloatsVector(i,a){i.startVector(4,a.length,4);for(let c=a.length-1;c>=0;c--)i.addFloat32(a[c]);return i.endVector()}static startFloatsVector(i,a){i.startVector(4,a,4)}static addInts(i,a){i.addFieldOffset(9,a,0)}static createIntsVector(i,a){i.startVector(8,a.length,8);for(let c=a.length-1;c>=0;c--)i.addInt64(a[c]);return i.endVector()}static startIntsVector(i,a){i.startVector(8,a,8)}static addStrings(i,a){i.addFieldOffset(10,a,0)}static createStringsVector(i,a){i.startVector(4,a.length,4);for(let c=a.length-1;c>=0;c--)i.addOffset(a[c]);return i.endVector()}static startStringsVector(i,a){i.startVector(4,a,4)}static addTensors(i,a){i.addFieldOffset(11,a,0)}static createTensorsVector(i,a){i.startVector(4,a.length,4);for(let c=a.length-1;c>=0;c--)i.addOffset(a[c]);return i.endVector()}static startTensorsVector(i,a){i.startVector(4,a,4)}static addGraphs(i,a){i.addFieldOffset(12,a,0)}static createGraphsVector(i,a){i.startVector(4,a.length,4);for(let c=a.length-1;c>=0;c--)i.addOffset(a[c]);return i.endVector()}static startGraphsVector(i,a){i.startVector(4,a,4)}static endAttribute(i){return i.endObject()}};e.Attribute=o}),Hb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(d,p,o,r){r===void 0&&(r=o);var i=Object.getOwnPropertyDescriptor(p,o);(!i||("get"in i?!p.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return p[o]}}),Object.defineProperty(d,r,i)}:function(d,p,o,r){r===void 0&&(r=o),d[r]=p[o]}),n=e&&e.__setModuleDefault||(Object.create?function(d,p){Object.defineProperty(d,"default",{enumerable:!0,value:p})}:function(d,p){d.default=p}),s=e&&e.__importStar||(function(){var d=function(p){return d=Object.getOwnPropertyNames||function(o){var r=[];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(r[r.length]=i);return r},d(p)};return function(p){if(p&&p.__esModule)return p;var o={};if(p!=null)for(var r=d(p),i=0;i<r.length;i++)r[i]!=="default"&&t(o,p,r[i]);return n(o,p),o}})();Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedKernelCreateInfos=void 0;var u=s(Ae()),l=class Pr{constructor(){this.bb=null,this.bb_pos=0}__init(p,o){return this.bb_pos=p,this.bb=o,this}static getRootAsDeprecatedKernelCreateInfos(p,o){return(o||new Pr).__init(p.readInt32(p.position())+p.position(),p)}static getSizePrefixedRootAsDeprecatedKernelCreateInfos(p,o){return p.setPosition(p.position()+u.SIZE_PREFIX_LENGTH),(o||new Pr).__init(p.readInt32(p.position())+p.position(),p)}nodeIndices(p){let o=this.bb.__offset(this.bb_pos,4);return o?this.bb.readUint32(this.bb.__vector(this.bb_pos+o)+p*4):0}nodeIndicesLength(){let p=this.bb.__offset(this.bb_pos,4);return p?this.bb.__vector_len(this.bb_pos+p):0}nodeIndicesArray(){let p=this.bb.__offset(this.bb_pos,4);return p?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+p),this.bb.__vector_len(this.bb_pos+p)):null}kernelDefHashes(p){let o=this.bb.__offset(this.bb_pos,6);return o?this.bb.readUint64(this.bb.__vector(this.bb_pos+o)+p*8):BigInt(0)}kernelDefHashesLength(){let p=this.bb.__offset(this.bb_pos,6);return p?this.bb.__vector_len(this.bb_pos+p):0}static startDeprecatedKernelCreateInfos(p){p.startObject(2)}static addNodeIndices(p,o){p.addFieldOffset(0,o,0)}static createNodeIndicesVector(p,o){p.startVector(4,o.length,4);for(let r=o.length-1;r>=0;r--)p.addInt32(o[r]);return p.endVector()}static startNodeIndicesVector(p,o){p.startVector(4,o,4)}static addKernelDefHashes(p,o){p.addFieldOffset(1,o,0)}static createKernelDefHashesVector(p,o){p.startVector(8,o.length,8);for(let r=o.length-1;r>=0;r--)p.addInt64(o[r]);return p.endVector()}static startKernelDefHashesVector(p,o){p.startVector(8,o,8)}static endDeprecatedKernelCreateInfos(p){return p.endObject()}static createDeprecatedKernelCreateInfos(p,o,r){return Pr.startDeprecatedKernelCreateInfos(p),Pr.addNodeIndices(p,o),Pr.addKernelDefHashes(p,r),Pr.endDeprecatedKernelCreateInfos(p)}};e.DeprecatedKernelCreateInfos=l}),eT=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(d,p,o,r){r===void 0&&(r=o);var i=Object.getOwnPropertyDescriptor(p,o);(!i||("get"in i?!p.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return p[o]}}),Object.defineProperty(d,r,i)}:function(d,p,o,r){r===void 0&&(r=o),d[r]=p[o]}),n=e&&e.__setModuleDefault||(Object.create?function(d,p){Object.defineProperty(d,"default",{enumerable:!0,value:p})}:function(d,p){d.default=p}),s=e&&e.__importStar||(function(){var d=function(p){return d=Object.getOwnPropertyNames||function(o){var r=[];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(r[r.length]=i);return r},d(p)};return function(p){if(p&&p.__esModule)return p;var o={};if(p!=null)for(var r=d(p),i=0;i<r.length;i++)r[i]!=="default"&&t(o,p,r[i]);return n(o,p),o}})();Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedNodeIndexAndKernelDefHash=void 0;var u=s(Ae()),l=class Ar{constructor(){this.bb=null,this.bb_pos=0}__init(p,o){return this.bb_pos=p,this.bb=o,this}static getRootAsDeprecatedNodeIndexAndKernelDefHash(p,o){return(o||new Ar).__init(p.readInt32(p.position())+p.position(),p)}static getSizePrefixedRootAsDeprecatedNodeIndexAndKernelDefHash(p,o){return p.setPosition(p.position()+u.SIZE_PREFIX_LENGTH),(o||new Ar).__init(p.readInt32(p.position())+p.position(),p)}nodeIndex(){let p=this.bb.__offset(this.bb_pos,4);return p?this.bb.readUint32(this.bb_pos+p):0}kernelDefHash(){let p=this.bb.__offset(this.bb_pos,6);return p?this.bb.readUint64(this.bb_pos+p):BigInt("0")}static startDeprecatedNodeIndexAndKernelDefHash(p){p.startObject(2)}static addNodeIndex(p,o){p.addFieldInt32(0,o,0)}static addKernelDefHash(p,o){p.addFieldInt64(1,o,BigInt("0"))}static endDeprecatedNodeIndexAndKernelDefHash(p){return p.endObject()}static createDeprecatedNodeIndexAndKernelDefHash(p,o,r){return Ar.startDeprecatedNodeIndexAndKernelDefHash(p),Ar.addNodeIndex(p,o),Ar.addKernelDefHash(p,r),Ar.endDeprecatedNodeIndexAndKernelDefHash(p)}};e.DeprecatedNodeIndexAndKernelDefHash=l}),Wb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var a=Object.getOwnPropertyDescriptor(o,r);(!a||("get"in a?!o.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,a)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),s=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(i[i.length]=a);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),a=0;a<i.length;a++)i[a]!=="default"&&t(r,o,i[a]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedSubGraphSessionState=void 0;var u=s(Ae()),l=Kb(),d=class vs{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsDeprecatedSubGraphSessionState(o,r){return(r||new vs).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsDeprecatedSubGraphSessionState(o,r){return o.setPosition(o.position()+u.SIZE_PREFIX_LENGTH),(r||new vs).__init(o.readInt32(o.position())+o.position(),o)}graphId(o){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,o):null}sessionState(o){let r=this.bb.__offset(this.bb_pos,6);return r?(o||new l.DeprecatedSessionState).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startDeprecatedSubGraphSessionState(o){o.startObject(2)}static addGraphId(o,r){o.addFieldOffset(0,r,0)}static addSessionState(o,r){o.addFieldOffset(1,r,0)}static endDeprecatedSubGraphSessionState(o){let r=o.endObject();return o.requiredField(r,4),r}};e.DeprecatedSubGraphSessionState=d}),Kb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(o,r,i,a){a===void 0&&(a=i);var c=Object.getOwnPropertyDescriptor(r,i);(!c||("get"in c?!r.__esModule:c.writable||c.configurable))&&(c={enumerable:!0,get:function(){return r[i]}}),Object.defineProperty(o,a,c)}:function(o,r,i,a){a===void 0&&(a=i),o[a]=r[i]}),n=e&&e.__setModuleDefault||(Object.create?function(o,r){Object.defineProperty(o,"default",{enumerable:!0,value:r})}:function(o,r){o.default=r}),s=e&&e.__importStar||(function(){var o=function(r){return o=Object.getOwnPropertyNames||function(i){var a=[];for(var c in i)Object.prototype.hasOwnProperty.call(i,c)&&(a[a.length]=c);return a},o(r)};return function(r){if(r&&r.__esModule)return r;var i={};if(r!=null)for(var a=o(r),c=0;c<a.length;c++)a[c]!=="default"&&t(i,r,a[c]);return n(i,r),i}})();Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedSessionState=void 0;var u=s(Ae()),l=Hb(),d=Wb(),p=class kr{constructor(){this.bb=null,this.bb_pos=0}__init(r,i){return this.bb_pos=r,this.bb=i,this}static getRootAsDeprecatedSessionState(r,i){return(i||new kr).__init(r.readInt32(r.position())+r.position(),r)}static getSizePrefixedRootAsDeprecatedSessionState(r,i){return r.setPosition(r.position()+u.SIZE_PREFIX_LENGTH),(i||new kr).__init(r.readInt32(r.position())+r.position(),r)}kernels(r){let i=this.bb.__offset(this.bb_pos,4);return i?(r||new l.DeprecatedKernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+i),this.bb):null}subGraphSessionStates(r,i){let a=this.bb.__offset(this.bb_pos,6);return a?(i||new d.DeprecatedSubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+a)+r*4),this.bb):null}subGraphSessionStatesLength(){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__vector_len(this.bb_pos+r):0}static startDeprecatedSessionState(r){r.startObject(2)}static addKernels(r,i){r.addFieldOffset(0,i,0)}static addSubGraphSessionStates(r,i){r.addFieldOffset(1,i,0)}static createSubGraphSessionStatesVector(r,i){r.startVector(4,i.length,4);for(let a=i.length-1;a>=0;a--)r.addOffset(i[a]);return r.endVector()}static startSubGraphSessionStatesVector(r,i){r.startVector(4,i,4)}static endDeprecatedSessionState(r){return r.endObject()}static createDeprecatedSessionState(r,i,a){return kr.startDeprecatedSessionState(r),kr.addKernels(r,i),kr.addSubGraphSessionStates(r,a),kr.endDeprecatedSessionState(r)}};e.DeprecatedSessionState=p}),Xb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var a=Object.getOwnPropertyDescriptor(o,r);(!a||("get"in a?!o.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,a)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),s=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(i[i.length]=a);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),a=0;a<i.length;a++)i[a]!=="default"&&t(r,o,i[a]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.KernelTypeStrArgsEntry=void 0;var u=s(Ae()),l=Ib(),d=class Dr{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsKernelTypeStrArgsEntry(o,r){return(r||new Dr).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsKernelTypeStrArgsEntry(o,r){return o.setPosition(o.position()+u.SIZE_PREFIX_LENGTH),(r||new Dr).__init(o.readInt32(o.position())+o.position(),o)}kernelTypeStr(o){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,o):null}args(o,r){let i=this.bb.__offset(this.bb_pos,6);return i?(r||new l.ArgTypeAndIndex).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+o*4),this.bb):null}argsLength(){let o=this.bb.__offset(this.bb_pos,6);return o?this.bb.__vector_len(this.bb_pos+o):0}static startKernelTypeStrArgsEntry(o){o.startObject(2)}static addKernelTypeStr(o,r){o.addFieldOffset(0,r,0)}static addArgs(o,r){o.addFieldOffset(1,r,0)}static createArgsVector(o,r){o.startVector(4,r.length,4);for(let i=r.length-1;i>=0;i--)o.addOffset(r[i]);return o.endVector()}static startArgsVector(o,r){o.startVector(4,r,4)}static endKernelTypeStrArgsEntry(o){let r=o.endObject();return o.requiredField(r,4),r}static createKernelTypeStrArgsEntry(o,r,i){return Dr.startKernelTypeStrArgsEntry(o),Dr.addKernelTypeStr(o,r),Dr.addArgs(o,i),Dr.endKernelTypeStrArgsEntry(o)}};e.KernelTypeStrArgsEntry=d}),Zb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var a=Object.getOwnPropertyDescriptor(o,r);(!a||("get"in a?!o.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,a)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),s=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(i[i.length]=a);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),a=0;a<i.length;a++)i[a]!=="default"&&t(r,o,i[a]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.OpIdKernelTypeStrArgsEntry=void 0;var u=s(Ae()),l=Xb(),d=class Nr{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsOpIdKernelTypeStrArgsEntry(o,r){return(r||new Nr).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsOpIdKernelTypeStrArgsEntry(o,r){return o.setPosition(o.position()+u.SIZE_PREFIX_LENGTH),(r||new Nr).__init(o.readInt32(o.position())+o.position(),o)}opId(o){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,o):null}kernelTypeStrArgs(o,r){let i=this.bb.__offset(this.bb_pos,6);return i?(r||new l.KernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+o*4),this.bb):null}kernelTypeStrArgsLength(){let o=this.bb.__offset(this.bb_pos,6);return o?this.bb.__vector_len(this.bb_pos+o):0}static startOpIdKernelTypeStrArgsEntry(o){o.startObject(2)}static addOpId(o,r){o.addFieldOffset(0,r,0)}static addKernelTypeStrArgs(o,r){o.addFieldOffset(1,r,0)}static createKernelTypeStrArgsVector(o,r){o.startVector(4,r.length,4);for(let i=r.length-1;i>=0;i--)o.addOffset(r[i]);return o.endVector()}static startKernelTypeStrArgsVector(o,r){o.startVector(4,r,4)}static endOpIdKernelTypeStrArgsEntry(o){let r=o.endObject();return o.requiredField(r,4),r}static createOpIdKernelTypeStrArgsEntry(o,r,i){return Nr.startOpIdKernelTypeStrArgsEntry(o),Nr.addOpId(o,r),Nr.addKernelTypeStrArgs(o,i),Nr.endOpIdKernelTypeStrArgsEntry(o)}};e.OpIdKernelTypeStrArgsEntry=d}),Jb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var a=Object.getOwnPropertyDescriptor(o,r);(!a||("get"in a?!o.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,a)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),s=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(i[i.length]=a);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),a=0;a<i.length;a++)i[a]!=="default"&&t(r,o,i[a]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.KernelTypeStrResolver=void 0;var u=s(Ae()),l=Zb(),d=class an{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsKernelTypeStrResolver(o,r){return(r||new an).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsKernelTypeStrResolver(o,r){return o.setPosition(o.position()+u.SIZE_PREFIX_LENGTH),(r||new an).__init(o.readInt32(o.position())+o.position(),o)}opKernelTypeStrArgs(o,r){let i=this.bb.__offset(this.bb_pos,4);return i?(r||new l.OpIdKernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+o*4),this.bb):null}opKernelTypeStrArgsLength(){let o=this.bb.__offset(this.bb_pos,4);return o?this.bb.__vector_len(this.bb_pos+o):0}static startKernelTypeStrResolver(o){o.startObject(1)}static addOpKernelTypeStrArgs(o,r){o.addFieldOffset(0,r,0)}static createOpKernelTypeStrArgsVector(o,r){o.startVector(4,r.length,4);for(let i=r.length-1;i>=0;i--)o.addOffset(r[i]);return o.endVector()}static startOpKernelTypeStrArgsVector(o,r){o.startVector(4,r,4)}static endKernelTypeStrResolver(o){return o.endObject()}static createKernelTypeStrResolver(o,r){return an.startKernelTypeStrResolver(o),an.addOpKernelTypeStrArgs(o,r),an.endKernelTypeStrResolver(o)}};e.KernelTypeStrResolver=d}),Yb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(d,p,o,r){r===void 0&&(r=o);var i=Object.getOwnPropertyDescriptor(p,o);(!i||("get"in i?!p.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return p[o]}}),Object.defineProperty(d,r,i)}:function(d,p,o,r){r===void 0&&(r=o),d[r]=p[o]}),n=e&&e.__setModuleDefault||(Object.create?function(d,p){Object.defineProperty(d,"default",{enumerable:!0,value:p})}:function(d,p){d.default=p}),s=e&&e.__importStar||(function(){var d=function(p){return d=Object.getOwnPropertyNames||function(o){var r=[];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(r[r.length]=i);return r},d(p)};return function(p){if(p&&p.__esModule)return p;var o={};if(p!=null)for(var r=d(p),i=0;i<r.length;i++)r[i]!=="default"&&t(o,p,r[i]);return n(o,p),o}})();Object.defineProperty(e,"__esModule",{value:!0}),e.OperatorSetId=void 0;var u=s(Ae()),l=class Cr{constructor(){this.bb=null,this.bb_pos=0}__init(p,o){return this.bb_pos=p,this.bb=o,this}static getRootAsOperatorSetId(p,o){return(o||new Cr).__init(p.readInt32(p.position())+p.position(),p)}static getSizePrefixedRootAsOperatorSetId(p,o){return p.setPosition(p.position()+u.SIZE_PREFIX_LENGTH),(o||new Cr).__init(p.readInt32(p.position())+p.position(),p)}domain(p){let o=this.bb.__offset(this.bb_pos,4);return o?this.bb.__string(this.bb_pos+o,p):null}version(){let p=this.bb.__offset(this.bb_pos,6);return p?this.bb.readInt64(this.bb_pos+p):BigInt("0")}static startOperatorSetId(p){p.startObject(2)}static addDomain(p,o){p.addFieldOffset(0,o,0)}static addVersion(p,o){p.addFieldInt64(1,o,BigInt("0"))}static endOperatorSetId(p){return p.endObject()}static createOperatorSetId(p,o,r){return Cr.startOperatorSetId(p),Cr.addDomain(p,o),Cr.addVersion(p,r),Cr.endOperatorSetId(p)}};e.OperatorSetId=l}),Qb=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(d,p,o,r){r===void 0&&(r=o);var i=Object.getOwnPropertyDescriptor(p,o);(!i||("get"in i?!p.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return p[o]}}),Object.defineProperty(d,r,i)}:function(d,p,o,r){r===void 0&&(r=o),d[r]=p[o]}),n=e&&e.__setModuleDefault||(Object.create?function(d,p){Object.defineProperty(d,"default",{enumerable:!0,value:p})}:function(d,p){d.default=p}),s=e&&e.__importStar||(function(){var d=function(p){return d=Object.getOwnPropertyNames||function(o){var r=[];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(r[r.length]=i);return r},d(p)};return function(p){if(p&&p.__esModule)return p;var o={};if(p!=null)for(var r=d(p),i=0;i<r.length;i++)r[i]!=="default"&&t(o,p,r[i]);return n(o,p),o}})();Object.defineProperty(e,"__esModule",{value:!0}),e.StringStringEntry=void 0;var u=s(Ae()),l=class zr{constructor(){this.bb=null,this.bb_pos=0}__init(p,o){return this.bb_pos=p,this.bb=o,this}static getRootAsStringStringEntry(p,o){return(o||new zr).__init(p.readInt32(p.position())+p.position(),p)}static getSizePrefixedRootAsStringStringEntry(p,o){return p.setPosition(p.position()+u.SIZE_PREFIX_LENGTH),(o||new zr).__init(p.readInt32(p.position())+p.position(),p)}key(p){let o=this.bb.__offset(this.bb_pos,4);return o?this.bb.__string(this.bb_pos+o,p):null}value(p){let o=this.bb.__offset(this.bb_pos,6);return o?this.bb.__string(this.bb_pos+o,p):null}static startStringStringEntry(p){p.startObject(2)}static addKey(p,o){p.addFieldOffset(0,o,0)}static addValue(p,o){p.addFieldOffset(1,o,0)}static endStringStringEntry(p){return p.endObject()}static createStringStringEntry(p,o,r){return zr.startStringStringEntry(p),zr.addKey(p,o),zr.addValue(p,r),zr.endStringStringEntry(p)}};e.StringStringEntry=l}),ey=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(r,i,a,c){c===void 0&&(c=a);var h=Object.getOwnPropertyDescriptor(i,a);(!h||("get"in h?!i.__esModule:h.writable||h.configurable))&&(h={enumerable:!0,get:function(){return i[a]}}),Object.defineProperty(r,c,h)}:function(r,i,a,c){c===void 0&&(c=a),r[c]=i[a]}),n=e&&e.__setModuleDefault||(Object.create?function(r,i){Object.defineProperty(r,"default",{enumerable:!0,value:i})}:function(r,i){r.default=i}),s=e&&e.__importStar||(function(){var r=function(i){return r=Object.getOwnPropertyNames||function(a){var c=[];for(var h in a)Object.prototype.hasOwnProperty.call(a,h)&&(c[c.length]=h);return c},r(i)};return function(i){if(i&&i.__esModule)return i;var a={};if(i!=null)for(var c=r(i),h=0;h<c.length;h++)c[h]!=="default"&&t(a,i,c[h]);return n(a,i),a}})();Object.defineProperty(e,"__esModule",{value:!0}),e.Model=void 0;var u=s(Ae()),l=mu(),d=Yb(),p=Qb(),o=class xs{constructor(){this.bb=null,this.bb_pos=0}__init(i,a){return this.bb_pos=i,this.bb=a,this}static getRootAsModel(i,a){return(a||new xs).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsModel(i,a){return i.setPosition(i.position()+u.SIZE_PREFIX_LENGTH),(a||new xs).__init(i.readInt32(i.position())+i.position(),i)}irVersion(){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.readInt64(this.bb_pos+i):BigInt("0")}opsetImport(i,a){let c=this.bb.__offset(this.bb_pos,6);return c?(a||new d.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+c)+i*4),this.bb):null}opsetImportLength(){let i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__vector_len(this.bb_pos+i):0}producerName(i){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__string(this.bb_pos+a,i):null}producerVersion(i){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.__string(this.bb_pos+a,i):null}domain(i){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.__string(this.bb_pos+a,i):null}modelVersion(){let i=this.bb.__offset(this.bb_pos,14);return i?this.bb.readInt64(this.bb_pos+i):BigInt("0")}docString(i){let a=this.bb.__offset(this.bb_pos,16);return a?this.bb.__string(this.bb_pos+a,i):null}graph(i){let a=this.bb.__offset(this.bb_pos,18);return a?(i||new l.Graph).__init(this.bb.__indirect(this.bb_pos+a),this.bb):null}graphDocString(i){let a=this.bb.__offset(this.bb_pos,20);return a?this.bb.__string(this.bb_pos+a,i):null}metadataProps(i,a){let c=this.bb.__offset(this.bb_pos,22);return c?(a||new p.StringStringEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+c)+i*4),this.bb):null}metadataPropsLength(){let i=this.bb.__offset(this.bb_pos,22);return i?this.bb.__vector_len(this.bb_pos+i):0}static startModel(i){i.startObject(10)}static addIrVersion(i,a){i.addFieldInt64(0,a,BigInt("0"))}static addOpsetImport(i,a){i.addFieldOffset(1,a,0)}static createOpsetImportVector(i,a){i.startVector(4,a.length,4);for(let c=a.length-1;c>=0;c--)i.addOffset(a[c]);return i.endVector()}static startOpsetImportVector(i,a){i.startVector(4,a,4)}static addProducerName(i,a){i.addFieldOffset(2,a,0)}static addProducerVersion(i,a){i.addFieldOffset(3,a,0)}static addDomain(i,a){i.addFieldOffset(4,a,0)}static addModelVersion(i,a){i.addFieldInt64(5,a,BigInt("0"))}static addDocString(i,a){i.addFieldOffset(6,a,0)}static addGraph(i,a){i.addFieldOffset(7,a,0)}static addGraphDocString(i,a){i.addFieldOffset(8,a,0)}static addMetadataProps(i,a){i.addFieldOffset(9,a,0)}static createMetadataPropsVector(i,a){i.startVector(4,a.length,4);for(let c=a.length-1;c>=0;c--)i.addOffset(a[c]);return i.endVector()}static startMetadataPropsVector(i,a){i.startVector(4,a,4)}static endModel(i){return i.endObject()}};e.Model=o}),tT=re(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(o,r,i,a){a===void 0&&(a=i);var c=Object.getOwnPropertyDescriptor(r,i);(!c||("get"in c?!r.__esModule:c.writable||c.configurable))&&(c={enumerable:!0,get:function(){return r[i]}}),Object.defineProperty(o,a,c)}:function(o,r,i,a){a===void 0&&(a=i),o[a]=r[i]}),n=e&&e.__setModuleDefault||(Object.create?function(o,r){Object.defineProperty(o,"default",{enumerable:!0,value:r})}:function(o,r){o.default=r}),s=e&&e.__importStar||(function(){var o=function(r){return o=Object.getOwnPropertyNames||function(i){var a=[];for(var c in i)Object.prototype.hasOwnProperty.call(i,c)&&(a[a.length]=c);return a},o(r)};return function(r){if(r&&r.__esModule)return r;var i={};if(r!=null)for(var a=o(r),c=0;c<a.length;c++)a[c]!=="default"&&t(i,r,a[c]);return n(i,r),i}})();Object.defineProperty(e,"__esModule",{value:!0}),e.InferenceSession=void 0;var u=s(Ae()),l=Jb(),d=ey(),p=class $s{constructor(){this.bb=null,this.bb_pos=0}__init(r,i){return this.bb_pos=r,this.bb=i,this}static getRootAsInferenceSession(r,i){return(i||new $s).__init(r.readInt32(r.position())+r.position(),r)}static getSizePrefixedRootAsInferenceSession(r,i){return r.setPosition(r.position()+u.SIZE_PREFIX_LENGTH),(i||new $s).__init(r.readInt32(r.position())+r.position(),r)}static bufferHasIdentifier(r){return r.__has_identifier("ORTM")}ortVersion(r){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.__string(this.bb_pos+i,r):null}model(r){let i=this.bb.__offset(this.bb_pos,6);return i?(r||new d.Model).__init(this.bb.__indirect(this.bb_pos+i),this.bb):null}kernelTypeStrResolver(r){let i=this.bb.__offset(this.bb_pos,10);return i?(r||new l.KernelTypeStrResolver).__init(this.bb.__indirect(this.bb_pos+i),this.bb):null}static startInferenceSession(r){r.startObject(4)}static addOrtVersion(r,i){r.addFieldOffset(0,i,0)}static addModel(r,i){r.addFieldOffset(1,i,0)}static addKernelTypeStrResolver(r,i){r.addFieldOffset(3,i,0)}static endInferenceSession(r){return r.endObject()}static finishInferenceSessionBuffer(r,i){r.finish(i,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(r,i){r.finish(i,"ORTM",!0)}};e.InferenceSession=p}),rT,nT,Ts,Ot,iT,oT,aT,sT,uT,lT,dT,pT,ty,ry,cT,hT,fT,mT,ny,gT,bT,yT,_T,wT,vT,xT,$T,TT,IT,ST,OT,ET,Bi,iy,PT,oy,AT,kT=N(()=>{"use strict";rT=ce(_b()),nT=ce(Ib()),Ts=ce(Gb()),Ot=ce(Sb()),iT=ce(Hb()),oT=ce(eT()),aT=ce(Kb()),sT=ce(Wb()),uT=ce(Fb()),lT=ce(jb()),dT=ce(Mb()),pT=ce(Pb()),ty=ce(mu()),ry=ce(tT()),cT=ce(Xb()),hT=ce(Jb()),fT=ce(Rb()),mT=ce(ey()),ny=ce(Eb()),gT=ce(Ab()),bT=ce(Ob()),yT=ce(kb()),_T=ce(Zb()),wT=ce(Yb()),vT=ce(Db()),xT=ce(Nb()),$T=ce(Cb()),TT=ce(Bb()),IT=ce(Lb()),ST=ce(zb()),OT=ce(Qb()),ET=ce(eo()),Bi=ce(Qi()),iy=ce(Vb()),PT=ce(to()),oy=ce(Ub()),AT=ce(qb())}),ro=N(()=>{"use strict";kT()}),DT=re((e,t)=>{"use strict";t.exports=n;function n(s,u){for(var l=new Array(arguments.length-1),d=0,p=2,o=!0;p<arguments.length;)l[d++]=arguments[p++];return new Promise(function(r,i){l[d]=function(a){if(o)if(o=!1,a)i(a);else{for(var c=new Array(arguments.length-1),h=0;h<c.length;)c[h++]=arguments[h];r.apply(null,c)}};try{s.apply(u||null,l)}catch(a){o&&(o=!1,i(a))}})}}),NT=re(e=>{"use strict";var t=e;t.length=function(d){var p=d.length;if(!p)return 0;for(var o=0;--p%4>1&&d.charAt(p)==="=";)++o;return Math.ceil(d.length*3)/4-o};var n=new Array(64),s=new Array(123);for(u=0;u<64;)s[n[u]=u<26?u+65:u<52?u+71:u<62?u-4:u-59|43]=u++;var u;t.encode=function(d,p,o){for(var r=null,i=[],a=0,c=0,h;p<o;){var m=d[p++];switch(c){case 0:i[a++]=n[m>>2],h=(m&3)<<4,c=1;break;case 1:i[a++]=n[h|m>>4],h=(m&15)<<2,c=2;break;case 2:i[a++]=n[h|m>>6],i[a++]=n[m&63],c=0;break}a>8191&&((r||(r=[])).push(String.fromCharCode.apply(String,i)),a=0)}return c&&(i[a++]=n[h],i[a++]=61,c===1&&(i[a++]=61)),r?(a&&r.push(String.fromCharCode.apply(String,i.slice(0,a))),r.join("")):String.fromCharCode.apply(String,i.slice(0,a))};var l="invalid encoding";t.decode=function(d,p,o){for(var r=o,i=0,a,c=0;c<d.length;){var h=d.charCodeAt(c++);if(h===61&&i>1)break;if((h=s[h])===void 0)throw Error(l);switch(i){case 0:a=h,i=1;break;case 1:p[o++]=a<<2|(h&48)>>4,a=h,i=2;break;case 2:p[o++]=(a&15)<<4|(h&60)>>2,a=h,i=3;break;case 3:p[o++]=(a&3)<<6|h,i=0;break}}if(i===1)throw Error(l);return o-r},t.test=function(d){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(d)}}),CT=re((e,t)=>{"use strict";t.exports=n;function n(){this._listeners=Object.create(null)}n.prototype.on=function(s,u,l){return(this._listeners[s]||(this._listeners[s]=[])).push({fn:u,ctx:l||this}),this},n.prototype.off=function(s,u){if(s===void 0)this._listeners=Object.create(null);else if(u===void 0)this._listeners[s]=[];else{var l=this._listeners[s];if(!l)return this;for(var d=0;d<l.length;)l[d].fn===u?l.splice(d,1):++d}return this},n.prototype.emit=function(s){var u=this._listeners[s];if(u){for(var l=[],d=1;d<arguments.length;)l.push(arguments[d++]);for(d=0;d<u.length;)u[d].fn.apply(u[d++].ctx,l)}return this}}),zT=re((e,t)=>{"use strict";t.exports=n(n);function n(p){return typeof Float32Array<"u"?(function(){var o=new Float32Array([-0]),r=new Uint8Array(o.buffer),i=r[3]===128;function a(b,x,v){o[0]=b,x[v]=r[0],x[v+1]=r[1],x[v+2]=r[2],x[v+3]=r[3]}function c(b,x,v){o[0]=b,x[v]=r[3],x[v+1]=r[2],x[v+2]=r[1],x[v+3]=r[0]}p.writeFloatLE=i?a:c,p.writeFloatBE=i?c:a;function h(b,x){return r[0]=b[x],r[1]=b[x+1],r[2]=b[x+2],r[3]=b[x+3],o[0]}function m(b,x){return r[3]=b[x],r[2]=b[x+1],r[1]=b[x+2],r[0]=b[x+3],o[0]}p.readFloatLE=i?h:m,p.readFloatBE=i?m:h})():(function(){function o(i,a,c,h){var m=a<0?1:0;if(m&&(a=-a),a===0)i(1/a>0?0:2147483648,c,h);else if(isNaN(a))i(2143289344,c,h);else if(a>34028234663852886e22)i((m<<31|2139095040)>>>0,c,h);else if(a<11754943508222875e-54)i((m<<31|Math.round(a/1401298464324817e-60))>>>0,c,h);else{var b=Math.floor(Math.log(a)/Math.LN2),x=Math.round(a*Math.pow(2,-b)*8388608)&8388607;i((m<<31|b+127<<23|x)>>>0,c,h)}}p.writeFloatLE=o.bind(null,s),p.writeFloatBE=o.bind(null,u);function r(i,a,c){var h=i(a,c),m=(h>>31)*2+1,b=h>>>23&255,x=h&8388607;return b===255?x?NaN:m*(1/0):b===0?m*1401298464324817e-60*x:m*Math.pow(2,b-150)*(x+8388608)}p.readFloatLE=r.bind(null,l),p.readFloatBE=r.bind(null,d)})(),typeof Float64Array<"u"?(function(){var o=new Float64Array([-0]),r=new Uint8Array(o.buffer),i=r[7]===128;function a(b,x,v){o[0]=b,x[v]=r[0],x[v+1]=r[1],x[v+2]=r[2],x[v+3]=r[3],x[v+4]=r[4],x[v+5]=r[5],x[v+6]=r[6],x[v+7]=r[7]}function c(b,x,v){o[0]=b,x[v]=r[7],x[v+1]=r[6],x[v+2]=r[5],x[v+3]=r[4],x[v+4]=r[3],x[v+5]=r[2],x[v+6]=r[1],x[v+7]=r[0]}p.writeDoubleLE=i?a:c,p.writeDoubleBE=i?c:a;function h(b,x){return r[0]=b[x],r[1]=b[x+1],r[2]=b[x+2],r[3]=b[x+3],r[4]=b[x+4],r[5]=b[x+5],r[6]=b[x+6],r[7]=b[x+7],o[0]}function m(b,x){return r[7]=b[x],r[6]=b[x+1],r[5]=b[x+2],r[4]=b[x+3],r[3]=b[x+4],r[2]=b[x+5],r[1]=b[x+6],r[0]=b[x+7],o[0]}p.readDoubleLE=i?h:m,p.readDoubleBE=i?m:h})():(function(){function o(i,a,c,h,m,b){var x=h<0?1:0;if(x&&(h=-h),h===0)i(0,m,b+a),i(1/h>0?0:2147483648,m,b+c);else if(isNaN(h))i(0,m,b+a),i(2146959360,m,b+c);else if(h>17976931348623157e292)i(0,m,b+a),i((x<<31|2146435072)>>>0,m,b+c);else{var v;if(h<22250738585072014e-324)v=h/5e-324,i(v>>>0,m,b+a),i((x<<31|v/4294967296)>>>0,m,b+c);else{var w=Math.floor(Math.log(h)/Math.LN2);w===1024&&(w=1023),v=h*Math.pow(2,-w),i(v*4503599627370496>>>0,m,b+a),i((x<<31|w+1023<<20|v*1048576&1048575)>>>0,m,b+c)}}}p.writeDoubleLE=o.bind(null,s,0,4),p.writeDoubleBE=o.bind(null,u,4,0);function r(i,a,c,h,m){var b=i(h,m+a),x=i(h,m+c),v=(x>>31)*2+1,w=x>>>20&2047,S=4294967296*(x&1048575)+b;return w===2047?S?NaN:v*(1/0):w===0?v*5e-324*S:v*Math.pow(2,w-1075)*(S+4503599627370496)}p.readDoubleLE=r.bind(null,l,0,4),p.readDoubleBE=r.bind(null,d,4,0)})(),p}function s(p,o,r){o[r]=p&255,o[r+1]=p>>>8&255,o[r+2]=p>>>16&255,o[r+3]=p>>>24}function u(p,o,r){o[r]=p>>>24,o[r+1]=p>>>16&255,o[r+2]=p>>>8&255,o[r+3]=p&255}function l(p,o){return(p[o]|p[o+1]<<8|p[o+2]<<16|p[o+3]<<24)>>>0}function d(p,o){return(p[o]<<24|p[o+1]<<16|p[o+2]<<8|p[o+3])>>>0}}),RT=re((e,t)=>{"use strict";t.exports=n;function n(s){try{if(typeof as!="function")return null;var u=as(s);return u&&(u.length||Object.keys(u).length)?u:null}catch{return null}}}),BT=re(e=>{"use strict";var t=e,n="�";t.length=function(s){for(var u=0,l=0,d=0;d<s.length;++d)l=s.charCodeAt(d),l<128?u+=1:l<2048?u+=2:(l&64512)===55296&&(s.charCodeAt(d+1)&64512)===56320?(++d,u+=4):u+=3;return u},t.read=function(s,u,l){if(l-u<1)return"";for(var d="",p=u;p<l;){var o=s[p++];if(o<=127)d+=String.fromCharCode(o);else if(o>=192&&o<224){var r=(o&31)<<6|s[p++]&63;d+=r>=128?String.fromCharCode(r):n}else if(o>=224&&o<240){var i=(o&15)<<12|(s[p++]&63)<<6|s[p++]&63;d+=i>=2048?String.fromCharCode(i):n}else if(o>=240){var a=(o&7)<<18|(s[p++]&63)<<12|(s[p++]&63)<<6|s[p++]&63;a<65536||a>1114111?d+=n:(a-=65536,d+=String.fromCharCode(55296+(a>>10)),d+=String.fromCharCode(56320+(a&1023)))}}return d},t.write=function(s,u,l){for(var d=l,p,o,r=0;r<s.length;++r)p=s.charCodeAt(r),p<128?u[l++]=p:p<2048?(u[l++]=p>>6|192,u[l++]=p&63|128):(p&64512)===55296&&((o=s.charCodeAt(r+1))&64512)===56320?(p=65536+((p&1023)<<10)+(o&1023),++r,u[l++]=p>>18|240,u[l++]=p>>12&63|128,u[l++]=p>>6&63|128,u[l++]=p&63|128):(u[l++]=p>>12|224,u[l++]=p>>6&63|128,u[l++]=p&63|128);return l-d}}),MT=re((e,t)=>{"use strict";t.exports=n;function n(s,u,l){var d=l||8192,p=d>>>1,o=null,r=d;return function(i){if(i<1||i>p)return s(i);r+i>d&&(o=s(d),r=0);var a=u.call(o,r,r+=i);return r&7&&(r=(r|7)+1),a}}}),jT=re((e,t)=>{"use strict";t.exports=s;var n=Zr();function s(p,o){this.lo=p>>>0,this.hi=o>>>0}var u=s.zero=new s(0,0);u.toNumber=function(){return 0},u.zzEncode=u.zzDecode=function(){return this},u.length=function(){return 1};var l=s.zeroHash="\0\0\0\0\0\0\0\0";s.fromNumber=function(p){if(p===0)return u;var o=p<0;o&&(p=-p);var r=p>>>0,i=(p-r)/4294967296>>>0;return o&&(i=~i>>>0,r=~r>>>0,++r>4294967295&&(r=0,++i>4294967295&&(i=0))),new s(r,i)},s.from=function(p){if(typeof p=="number")return s.fromNumber(p);if(n.isString(p))if(n.Long)p=n.Long.fromString(p);else return s.fromNumber(parseInt(p,10));return p.low||p.high?new s(p.low>>>0,p.high>>>0):u},s.prototype.toNumber=function(p){if(!p&&this.hi>>>31){var o=~this.lo+1>>>0,r=~this.hi>>>0;return o||(r=r+1>>>0),-(o+r*4294967296)}return this.lo+this.hi*4294967296},s.prototype.toLong=function(p){return n.Long?new n.Long(this.lo|0,this.hi|0,!!p):{low:this.lo|0,high:this.hi|0,unsigned:!!p}};var d=String.prototype.charCodeAt;s.fromHash=function(p){return p===l?u:new s((d.call(p,0)|d.call(p,1)<<8|d.call(p,2)<<16|d.call(p,3)<<24)>>>0,(d.call(p,4)|d.call(p,5)<<8|d.call(p,6)<<16|d.call(p,7)<<24)>>>0)},s.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)},s.prototype.zzEncode=function(){var p=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^p)>>>0,this.lo=(this.lo<<1^p)>>>0,this},s.prototype.zzDecode=function(){var p=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^p)>>>0,this.hi=(this.hi>>>1^p)>>>0,this},s.prototype.length=function(){var p=this.lo,o=(this.lo>>>28|this.hi<<4)>>>0,r=this.hi>>>24;return r===0?o===0?p<16384?p<128?1:2:p<2097152?3:4:o<16384?o<128?5:6:o<2097152?7:8:r<128?9:10}}),FT=re((e,t)=>{(function(n,s){function u(l){return l.default||l}typeof define=="function"&&define.amd?define([],function(){var l={};return s(l),u(l)}):typeof e=="object"?(s(e),typeof t=="object"&&(t.exports=u(e))):(function(){var l={};s(l),n.Long=u(l)})()})(typeof globalThis<"u"?globalThis:typeof self<"u"?self:e,function(n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=null;try{s=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}function u($,z,G){this.low=$|0,this.high=z|0,this.unsigned=!!G}u.prototype.__isLong__,Object.defineProperty(u.prototype,"__isLong__",{value:!0});function l($){return($&&$.__isLong__)===!0}function d($){var z=Math.clz32($&-$);return $?31-z:z}u.isLong=l;var p={},o={};function r($,z){var G,oe,U;return z?($>>>=0,(U=0<=$&&$<256)&&(oe=o[$],oe)?oe:(G=a($,0,!0),U&&(o[$]=G),G)):($|=0,(U=-128<=$&&$<128)&&(oe=p[$],oe)?oe:(G=a($,$<0?-1:0,!1),U&&(p[$]=G),G))}u.fromInt=r;function i($,z){if(isNaN($))return z?A:E;if(z){if($<0)return A;if($>=w)return J}else{if($<=-S)return K;if($+1>=S)return q}return $<0?i(-$,z).neg():a($%v|0,$/v|0,z)}u.fromNumber=i;function a($,z,G){return new u($,z,G)}u.fromBits=a;var c=Math.pow;function h($,z,G){if($.length===0)throw Error("empty string");if(typeof z=="number"?(G=z,z=!1):z=!!z,$==="NaN"||$==="Infinity"||$==="+Infinity"||$==="-Infinity")return z?A:E;if(G=G||10,G<2||36<G)throw RangeError("radix");var oe;if((oe=$.indexOf("-"))>0)throw Error("interior hyphen");if(oe===0)return h($.substring(1),z,G).neg();for(var U=i(c(G,8)),ie=E,V=0;V<$.length;V+=8){var W=Math.min(8,$.length-V),X=parseInt($.substring(V,V+W),G);if(W<8){var L=i(c(G,W));ie=ie.mul(L).add(i(X))}else ie=ie.mul(U),ie=ie.add(i(X))}return ie.unsigned=z,ie}u.fromString=h;function m($,z){return typeof $=="number"?i($,z):typeof $=="string"?h($,z):a($.low,$.high,typeof z=="boolean"?z:$.unsigned)}u.fromValue=m;var b=65536,x=1<<24,v=b*b,w=v*v,S=w/2,O=r(x),E=r(0);u.ZERO=E;var A=r(0,!0);u.UZERO=A;var k=r(1);u.ONE=k;var I=r(1,!0);u.UONE=I;var M=r(-1);u.NEG_ONE=M;var q=a(-1,2147483647,!1);u.MAX_VALUE=q;var J=a(-1,-1,!0);u.MAX_UNSIGNED_VALUE=J;var K=a(0,-2147483648,!1);u.MIN_VALUE=K;var C=u.prototype;C.toInt=function(){return this.unsigned?this.low>>>0:this.low},C.toNumber=function(){return this.unsigned?(this.high>>>0)*v+(this.low>>>0):this.high*v+(this.low>>>0)},C.toString=function($){if($=$||10,$<2||36<$)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(K)){var z=i($),G=this.div(z),oe=G.mul(z).sub(this);return G.toString($)+oe.toInt().toString($)}else return"-"+this.neg().toString($);for(var U=i(c($,6),this.unsigned),ie=this,V="";;){var W=ie.div(U),X=ie.sub(W.mul(U)).toInt()>>>0,L=X.toString($);if(ie=W,ie.isZero())return L+V;for(;L.length<6;)L="0"+L;V=""+L+V}},C.getHighBits=function(){return this.high},C.getHighBitsUnsigned=function(){return this.high>>>0},C.getLowBits=function(){return this.low},C.getLowBitsUnsigned=function(){return this.low>>>0},C.getNumBitsAbs=function(){if(this.isNegative())return this.eq(K)?64:this.neg().getNumBitsAbs();for(var $=this.high!=0?this.high:this.low,z=31;z>0&&($&1<<z)==0;z--);return this.high!=0?z+33:z+1},C.isSafeInteger=function(){var $=this.high>>21;return $?this.unsigned?!1:$===-1&&!(this.low===0&&this.high===-2097152):!0},C.isZero=function(){return this.high===0&&this.low===0},C.eqz=C.isZero,C.isNegative=function(){return!this.unsigned&&this.high<0},C.isPositive=function(){return this.unsigned||this.high>=0},C.isOdd=function(){return(this.low&1)===1},C.isEven=function(){return(this.low&1)===0},C.equals=function($){return l($)||($=m($)),this.unsigned!==$.unsigned&&this.high>>>31===1&&$.high>>>31===1?!1:this.high===$.high&&this.low===$.low},C.eq=C.equals,C.notEquals=function($){return!this.eq($)},C.neq=C.notEquals,C.ne=C.notEquals,C.lessThan=function($){return this.comp($)<0},C.lt=C.lessThan,C.lessThanOrEqual=function($){return this.comp($)<=0},C.lte=C.lessThanOrEqual,C.le=C.lessThanOrEqual,C.greaterThan=function($){return this.comp($)>0},C.gt=C.greaterThan,C.greaterThanOrEqual=function($){return this.comp($)>=0},C.gte=C.greaterThanOrEqual,C.ge=C.greaterThanOrEqual,C.compare=function($){if(l($)||($=m($)),this.eq($))return 0;var z=this.isNegative(),G=$.isNegative();return z&&!G?-1:!z&&G?1:this.unsigned?$.high>>>0>this.high>>>0||$.high===this.high&&$.low>>>0>this.low>>>0?-1:1:this.sub($).isNegative()?-1:1},C.comp=C.compare,C.negate=function(){return!this.unsigned&&this.eq(K)?K:this.not().add(k)},C.neg=C.negate,C.add=function($){l($)||($=m($));var z=this.high>>>16,G=this.high&65535,oe=this.low>>>16,U=this.low&65535,ie=$.high>>>16,V=$.high&65535,W=$.low>>>16,X=$.low&65535,L=0,de=0,Pe=0,ve=0;return ve+=U+X,Pe+=ve>>>16,ve&=65535,Pe+=oe+W,de+=Pe>>>16,Pe&=65535,de+=G+V,L+=de>>>16,de&=65535,L+=z+ie,L&=65535,a(Pe<<16|ve,L<<16|de,this.unsigned)},C.subtract=function($){return l($)||($=m($)),this.add($.neg())},C.sub=C.subtract,C.multiply=function($){if(this.isZero())return this;if(l($)||($=m($)),s){var z=s.mul(this.low,this.high,$.low,$.high);return a(z,s.get_high(),this.unsigned)}if($.isZero())return this.unsigned?A:E;if(this.eq(K))return $.isOdd()?K:E;if($.eq(K))return this.isOdd()?K:E;if(this.isNegative())return $.isNegative()?this.neg().mul($.neg()):this.neg().mul($).neg();if($.isNegative())return this.mul($.neg()).neg();if(this.lt(O)&&$.lt(O))return i(this.toNumber()*$.toNumber(),this.unsigned);var G=this.high>>>16,oe=this.high&65535,U=this.low>>>16,ie=this.low&65535,V=$.high>>>16,W=$.high&65535,X=$.low>>>16,L=$.low&65535,de=0,Pe=0,ve=0,Ge=0;return Ge+=ie*L,ve+=Ge>>>16,Ge&=65535,ve+=U*L,Pe+=ve>>>16,ve&=65535,ve+=ie*X,Pe+=ve>>>16,ve&=65535,Pe+=oe*L,de+=Pe>>>16,Pe&=65535,Pe+=U*X,de+=Pe>>>16,Pe&=65535,Pe+=ie*W,de+=Pe>>>16,Pe&=65535,de+=G*L+oe*X+U*W+ie*V,de&=65535,a(ve<<16|Ge,de<<16|Pe,this.unsigned)},C.mul=C.multiply,C.divide=function($){if(l($)||($=m($)),$.isZero())throw Error("division by zero");if(s){if(!this.unsigned&&this.high===-2147483648&&$.low===-1&&$.high===-1)return this;var z=(this.unsigned?s.div_u:s.div_s)(this.low,this.high,$.low,$.high);return a(z,s.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?A:E;var G,oe,U;if(this.unsigned){if($.unsigned||($=$.toUnsigned()),$.gt(this))return A;if($.gt(this.shru(1)))return I;U=A}else{if(this.eq(K)){if($.eq(k)||$.eq(M))return K;if($.eq(K))return k;var ie=this.shr(1);return G=ie.div($).shl(1),G.eq(E)?$.isNegative()?k:M:(oe=this.sub($.mul(G)),U=G.add(oe.div($)),U)}else if($.eq(K))return this.unsigned?A:E;if(this.isNegative())return $.isNegative()?this.neg().div($.neg()):this.neg().div($).neg();if($.isNegative())return this.div($.neg()).neg();U=E}for(oe=this;oe.gte($);){G=Math.max(1,Math.floor(oe.toNumber()/$.toNumber()));for(var V=Math.ceil(Math.log(G)/Math.LN2),W=V<=48?1:c(2,V-48),X=i(G),L=X.mul($);L.isNegative()||L.gt(oe);)G-=W,X=i(G,this.unsigned),L=X.mul($);X.isZero()&&(X=k),U=U.add(X),oe=oe.sub(L)}return U},C.div=C.divide,C.modulo=function($){if(l($)||($=m($)),s){var z=(this.unsigned?s.rem_u:s.rem_s)(this.low,this.high,$.low,$.high);return a(z,s.get_high(),this.unsigned)}return this.sub(this.div($).mul($))},C.mod=C.modulo,C.rem=C.modulo,C.not=function(){return a(~this.low,~this.high,this.unsigned)},C.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32},C.clz=C.countLeadingZeros,C.countTrailingZeros=function(){return this.low?d(this.low):d(this.high)+32},C.ctz=C.countTrailingZeros,C.and=function($){return l($)||($=m($)),a(this.low&$.low,this.high&$.high,this.unsigned)},C.or=function($){return l($)||($=m($)),a(this.low|$.low,this.high|$.high,this.unsigned)},C.xor=function($){return l($)||($=m($)),a(this.low^$.low,this.high^$.high,this.unsigned)},C.shiftLeft=function($){return l($)&&($=$.toInt()),($&=63)===0?this:$<32?a(this.low<<$,this.high<<$|this.low>>>32-$,this.unsigned):a(0,this.low<<$-32,this.unsigned)},C.shl=C.shiftLeft,C.shiftRight=function($){return l($)&&($=$.toInt()),($&=63)===0?this:$<32?a(this.low>>>$|this.high<<32-$,this.high>>$,this.unsigned):a(this.high>>$-32,this.high>=0?0:-1,this.unsigned)},C.shr=C.shiftRight,C.shiftRightUnsigned=function($){return l($)&&($=$.toInt()),($&=63)===0?this:$<32?a(this.low>>>$|this.high<<32-$,this.high>>>$,this.unsigned):$===32?a(this.high,0,this.unsigned):a(this.high>>>$-32,0,this.unsigned)},C.shru=C.shiftRightUnsigned,C.shr_u=C.shiftRightUnsigned,C.rotateLeft=function($){var z;return l($)&&($=$.toInt()),($&=63)===0?this:$===32?a(this.high,this.low,this.unsigned):$<32?(z=32-$,a(this.low<<$|this.high>>>z,this.high<<$|this.low>>>z,this.unsigned)):($-=32,z=32-$,a(this.high<<$|this.low>>>z,this.low<<$|this.high>>>z,this.unsigned))},C.rotl=C.rotateLeft,C.rotateRight=function($){var z;return l($)&&($=$.toInt()),($&=63)===0?this:$===32?a(this.high,this.low,this.unsigned):$<32?(z=32-$,a(this.high<<z|this.low>>>$,this.low<<z|this.high>>>$,this.unsigned)):($-=32,z=32-$,a(this.low<<z|this.high>>>$,this.high<<z|this.low>>>$,this.unsigned))},C.rotr=C.rotateRight,C.toSigned=function(){return this.unsigned?a(this.low,this.high,!1):this},C.toUnsigned=function(){return this.unsigned?this:a(this.low,this.high,!0)},C.toBytes=function($){return $?this.toBytesLE():this.toBytesBE()},C.toBytesLE=function(){var $=this.high,z=this.low;return[z&255,z>>>8&255,z>>>16&255,z>>>24,$&255,$>>>8&255,$>>>16&255,$>>>24]},C.toBytesBE=function(){var $=this.high,z=this.low;return[$>>>24,$>>>16&255,$>>>8&255,$&255,z>>>24,z>>>16&255,z>>>8&255,z&255]},u.fromBytes=function($,z,G){return G?u.fromBytesLE($,z):u.fromBytesBE($,z)},u.fromBytesLE=function($,z){return new u($[0]|$[1]<<8|$[2]<<16|$[3]<<24,$[4]|$[5]<<8|$[6]<<16|$[7]<<24,z)},u.fromBytesBE=function($,z){return new u($[4]<<24|$[5]<<16|$[6]<<8|$[7],$[0]<<24|$[1]<<16|$[2]<<8|$[3],z)},typeof BigInt=="function"&&(u.fromBigInt=function($,z){var G=Number(BigInt.asIntN(32,$)),oe=Number(BigInt.asIntN(32,$>>BigInt(32)));return a(G,oe,z)},u.fromValue=function($,z){return typeof $=="bigint"?u.fromBigInt($,z):m($,z)},C.toBigInt=function(){var $=BigInt(this.low>>>0),z=BigInt(this.unsigned?this.high>>>0:this.high);return z<<BigInt(32)|$});var B=n.default=u})}),Zr=re(e=>{"use strict";var t=e;t.asPromise=DT(),t.base64=NT(),t.EventEmitter=CT(),t.float=zT(),t.inquire=RT(),t.utf8=BT(),t.pool=MT(),t.LongBits=jT();function n(l){return l==="__proto__"||l==="prototype"||l==="constructor"}t.isUnsafeProperty=n,t.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node),t.global=t.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||e,t.emptyArray=Object.freeze?Object.freeze([]):[],t.emptyObject=Object.freeze?Object.freeze({}):{},t.isInteger=Number.isInteger||function(l){return typeof l=="number"&&isFinite(l)&&Math.floor(l)===l},t.isString=function(l){return typeof l=="string"||l instanceof String},t.isObject=function(l){return l&&typeof l=="object"},t.isset=t.isSet=function(l,d){var p=l[d];return p!=null&&Object.hasOwnProperty.call(l,d)?typeof p!="object"||(Array.isArray(p)?p.length:Object.keys(p).length)>0:!1},t.Buffer=(function(){try{var l=t.global.Buffer;return l.prototype.utf8Write?l:null}catch{return null}})(),t._Buffer_from=null,t._Buffer_allocUnsafe=null,t.newBuffer=function(l){return typeof l=="number"?t.Buffer?t._Buffer_allocUnsafe(l):new t.Array(l):t.Buffer?t._Buffer_from(l):typeof Uint8Array>"u"?l:new Uint8Array(l)},t.Array=typeof Uint8Array<"u"?Uint8Array:Array,t.Long=t.global.dcodeIO&&t.global.dcodeIO.Long||t.global.Long||(function(){try{var l=FT();return l&&l.isLong?l:null}catch{return null}})(),t.key2Re=/^true|false|0|1$/,t.key32Re=/^-?(?:0|[1-9][0-9]*)$/,t.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/,t.longToHash=function(l){return l?t.LongBits.from(l).toHash():t.LongBits.zeroHash},t.longFromHash=function(l,d){var p=t.LongBits.fromHash(l);return t.Long?t.Long.fromBits(p.lo,p.hi,d):p.toNumber(!!d)};function s(l){var d=typeof arguments[arguments.length-1]=="boolean",p=d?arguments.length-1:arguments.length;d=d&&arguments[arguments.length-1];for(var o=1;o<p;++o){var r=arguments[o];if(r)for(var i=Object.keys(r),a=0;a<i.length;++a)!n(i[a])&&(l[i[a]]===void 0||!d)&&(l[i[a]]=r[i[a]])}return l}t.merge=s,t.nestingLimit=32,t.recursionLimit=100,t.makeProp=function(l,d){Object.defineProperty(l,d,{enumerable:!0,configurable:!0,writable:!0})},t.lcFirst=function(l){return l.charAt(0).toLowerCase()+l.substring(1)};function u(l){function d(p,o){if(!(this instanceof d))return new d(p,o);Object.defineProperty(this,"message",{get:function(){return p}}),Error.captureStackTrace?Error.captureStackTrace(this,d):Object.defineProperty(this,"stack",{value:new Error().stack||""}),o&&s(this,o)}return d.prototype=Object.create(Error.prototype,{constructor:{value:d,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return l},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),d}t.newError=u,t.ProtocolError=u("ProtocolError"),t.oneOfGetter=function(l){for(var d={},p=0;p<l.length;++p)d[l[p]]=1;return function(){for(var o=Object.keys(this),r=o.length-1;r>-1;--r)if(d[o[r]]===1&&this[o[r]]!==void 0&&this[o[r]]!==null)return o[r]}},t.oneOfSetter=function(l){return function(d){for(var p=0;p<l.length;++p)l[p]!==d&&delete this[l[p]]}},t.toJSONOptions={longs:String,enums:String,bytes:String,json:!0},t._configure=function(){var l=t.Buffer;if(!l){t._Buffer_from=t._Buffer_allocUnsafe=null;return}t._Buffer_from=l.from!==Uint8Array.from&&l.from||function(d,p){return new l(d,p)},t._Buffer_allocUnsafe=l.allocUnsafe||function(d){return new l(d)}}}),ay=re((e,t)=>{"use strict";t.exports=i;var n=Zr(),s,u=n.LongBits,l=n.base64,d=n.utf8;function p(w,S,O){this.fn=w,this.len=S,this.next=void 0,this.val=O}function o(){}function r(w){this.head=w.head,this.tail=w.tail,this.len=w.len,this.next=w.states}function i(){this.len=0,this.head=new p(o,0,0),this.tail=this.head,this.states=null}var a=function(){return n.Buffer?function(){return(i.create=function(){return new s})()}:function(){return new i}};i.create=a(),i.alloc=function(w){return new n.Array(w)},n.Array!==Array&&(i.alloc=n.pool(i.alloc,n.Array.prototype.subarray)),i.prototype._push=function(w,S,O){return this.tail=this.tail.next=new p(w,S,O),this.len+=S,this};function c(w,S,O){S[O]=w&255}function h(w,S,O){for(;w>127;)S[O++]=w&127|128,w>>>=7;S[O]=w}function m(w,S){this.len=w,this.next=void 0,this.val=S}m.prototype=Object.create(p.prototype),m.prototype.fn=h,i.prototype.uint32=function(w){return this.len+=(this.tail=this.tail.next=new m((w=w>>>0)<128?1:w<16384?2:w<2097152?3:w<268435456?4:5,w)).len,this},i.prototype.int32=function(w){return(w|=0)<0?this._push(b,10,u.fromNumber(w)):this.uint32(w)},i.prototype.sint32=function(w){return this.uint32((w<<1^w>>31)>>>0)};function b(w,S,O){for(var E=w.lo,A=w.hi;A;)S[O++]=E&127|128,E=(E>>>7|A<<25)>>>0,A>>>=7;for(;E>127;)S[O++]=E&127|128,E=E>>>7;S[O++]=E}i.prototype.uint64=function(w){var S=u.from(w);return this._push(b,S.length(),S)},i.prototype.int64=i.prototype.uint64,i.prototype.sint64=function(w){var S=u.from(w).zzEncode();return this._push(b,S.length(),S)},i.prototype.bool=function(w){return this._push(c,1,w?1:0)};function x(w,S,O){S[O]=w&255,S[O+1]=w>>>8&255,S[O+2]=w>>>16&255,S[O+3]=w>>>24}i.prototype.fixed32=function(w){return this._push(x,4,w>>>0)},i.prototype.sfixed32=i.prototype.fixed32,i.prototype.fixed64=function(w){var S=u.from(w);return this._push(x,4,S.lo)._push(x,4,S.hi)},i.prototype.sfixed64=i.prototype.fixed64,i.prototype.float=function(w){return this._push(n.float.writeFloatLE,4,w)},i.prototype.double=function(w){return this._push(n.float.writeDoubleLE,8,w)};var v=n.Array.prototype.set?function(w,S,O){S.set(w,O)}:function(w,S,O){for(var E=0;E<w.length;++E)S[O+E]=w[E]};i.prototype.bytes=function(w){var S=w.length>>>0;if(!S)return this._push(c,1,0);if(n.isString(w)){var O=i.alloc(S=l.length(w));l.decode(w,O,0),w=O}return this.uint32(S)._push(v,S,w)},i.prototype.string=function(w){var S=d.length(w);return S?this.uint32(S)._push(d.write,S,w):this._push(c,1,0)},i.prototype.fork=function(){return this.states=new r(this),this.head=this.tail=new p(o,0,0),this.len=0,this},i.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new p(o,0,0),this.len=0),this},i.prototype.ldelim=function(){var w=this.head,S=this.tail,O=this.len;return this.reset().uint32(O),O&&(this.tail.next=w.next,this.tail=S,this.len+=O),this},i.prototype.finish=function(){for(var w=this.head.next,S=this.constructor.alloc(this.len),O=0;w;)w.fn(w.val,S,O),O+=w.len,w=w.next;return S},i._configure=function(w){s=w,i.create=a(),s._configure()}}),LT=re((e,t)=>{"use strict";t.exports=u;var n=ay();(u.prototype=Object.create(n.prototype)).constructor=u;var s=Zr();function u(){n.call(this)}u._configure=function(){u.alloc=s._Buffer_allocUnsafe,u.writeBytesBuffer=s.Buffer&&s.Buffer.prototype instanceof Uint8Array&&s.Buffer.prototype.set.name==="set"?function(d,p,o){p.set(d,o)}:function(d,p,o){if(d.copy)d.copy(p,o,0,d.length);else for(var r=0;r<d.length;)p[o++]=d[r++]}},u.prototype.bytes=function(d){s.isString(d)&&(d=s._Buffer_from(d,"base64"));var p=d.length>>>0;return this.uint32(p),p&&this._push(u.writeBytesBuffer,p,d),this};function l(d,p,o){d.length<40?s.utf8.write(d,p,o):p.utf8Write?p.utf8Write(d,o):p.write(d,o)}u.prototype.string=function(d){var p=s.Buffer.byteLength(d);return this.uint32(p),p&&this._push(l,p,d),this},u._configure()}),sy=re((e,t)=>{"use strict";t.exports=p;var n=Zr(),s,u=n.LongBits,l=n.utf8;function d(h,m){return RangeError("index out of range: "+h.pos+" + "+(m||1)+" > "+h.len)}function p(h){this.buf=h,this.pos=0,this.len=h.length}var o=typeof Uint8Array<"u"?function(h){if(h instanceof Uint8Array||Array.isArray(h))return new p(h);throw Error("illegal buffer")}:function(h){if(Array.isArray(h))return new p(h);throw Error("illegal buffer")},r=function(){return n.Buffer?function(h){return(p.create=function(m){return n.Buffer.isBuffer(m)?new s(m):o(m)})(h)}:o};p.create=r(),p.prototype._slice=n.Array.prototype.subarray||n.Array.prototype.slice,p.prototype.uint32=(function(){var h=4294967295;return function(){if(h=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(h=(h|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(h=(h|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(h=(h|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(h=(h|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return h;if((this.pos+=5)>this.len)throw this.pos=this.len,d(this,10);return h}})(),p.prototype.int32=function(){return this.uint32()|0},p.prototype.sint32=function(){var h=this.uint32();return h>>>1^-(h&1)|0};function i(){var h=new u(0,0),m=0;if(this.len-this.pos>4){for(;m<4;++m)if(h.lo=(h.lo|(this.buf[this.pos]&127)<<m*7)>>>0,this.buf[this.pos++]<128)return h;if(h.lo=(h.lo|(this.buf[this.pos]&127)<<28)>>>0,h.hi=(h.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return h;m=0}else{for(;m<3;++m){if(this.pos>=this.len)throw d(this);if(h.lo=(h.lo|(this.buf[this.pos]&127)<<m*7)>>>0,this.buf[this.pos++]<128)return h}return h.lo=(h.lo|(this.buf[this.pos++]&127)<<m*7)>>>0,h}if(this.len-this.pos>4){for(;m<5;++m)if(h.hi=(h.hi|(this.buf[this.pos]&127)<<m*7+3)>>>0,this.buf[this.pos++]<128)return h}else for(;m<5;++m){if(this.pos>=this.len)throw d(this);if(h.hi=(h.hi|(this.buf[this.pos]&127)<<m*7+3)>>>0,this.buf[this.pos++]<128)return h}throw Error("invalid varint encoding")}p.prototype.bool=function(){return this.uint32()!==0};function a(h,m){return(h[m-4]|h[m-3]<<8|h[m-2]<<16|h[m-1]<<24)>>>0}p.prototype.fixed32=function(){if(this.pos+4>this.len)throw d(this,4);return a(this.buf,this.pos+=4)},p.prototype.sfixed32=function(){if(this.pos+4>this.len)throw d(this,4);return a(this.buf,this.pos+=4)|0};function c(){if(this.pos+8>this.len)throw d(this,8);return new u(a(this.buf,this.pos+=4),a(this.buf,this.pos+=4))}p.prototype.float=function(){if(this.pos+4>this.len)throw d(this,4);var h=n.float.readFloatLE(this.buf,this.pos);return this.pos+=4,h},p.prototype.double=function(){if(this.pos+8>this.len)throw d(this,4);var h=n.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,h},p.prototype.bytes=function(){var h=this.uint32(),m=this.pos,b=this.pos+h;if(b>this.len)throw d(this,h);if(this.pos+=h,Array.isArray(this.buf))return this.buf.slice(m,b);if(m===b){var x=n.Buffer;return x?x.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,m,b)},p.prototype.string=function(){var h=this.bytes();return l.read(h,0,h.length)},p.prototype.skip=function(h){if(typeof h=="number"){if(this.pos+h>this.len)throw d(this,h);this.pos+=h}else do if(this.pos>=this.len)throw d(this);while(this.buf[this.pos++]&128);return this},p.recursionLimit=n.recursionLimit,p.prototype.skipType=function(h,m){if(m===void 0&&(m=0),m>p.recursionLimit)throw Error("maximum nesting depth exceeded");switch(h){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(h=this.uint32()&7)!==4;)this.skipType(h,m+1);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+h+" at offset "+this.pos)}return this},p._configure=function(h){s=h,p.create=r(),s._configure();var m=n.Long?"toLong":"toNumber";n.merge(p.prototype,{int64:function(){return i.call(this)[m](!1)},uint64:function(){return i.call(this)[m](!0)},sint64:function(){return i.call(this).zzDecode()[m](!1)},fixed64:function(){return c.call(this)[m](!0)},sfixed64:function(){return c.call(this)[m](!1)}})}}),VT=re((e,t)=>{"use strict";t.exports=u;var n=sy();(u.prototype=Object.create(n.prototype)).constructor=u;var s=Zr();function u(l){n.call(this,l)}u._configure=function(){s.Buffer&&(u.prototype._slice=s.Buffer.prototype.slice)},u.prototype.string=function(){var l=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+l,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+l,this.len))},u._configure()}),UT=re((e,t)=>{"use strict";t.exports=s;var n=Zr();(s.prototype=Object.create(n.EventEmitter.prototype)).constructor=s;function s(u,l,d){if(typeof u!="function")throw TypeError("rpcImpl must be a function");n.EventEmitter.call(this),this.rpcImpl=u,this.requestDelimited=!!l,this.responseDelimited=!!d}s.prototype.rpcCall=function u(l,d,p,o,r){if(!o)throw TypeError("request must be specified");var i=this;if(!r)return n.asPromise(u,i,l,d,p,o);if(!i.rpcImpl){setTimeout(function(){r(Error("already ended"))},0);return}try{return i.rpcImpl(l,d[i.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(a,c){if(a)return i.emit("error",a,l),r(a);if(c===null){i.end(!0);return}if(!(c instanceof p))try{c=p[i.responseDelimited?"decodeDelimited":"decode"](c)}catch(h){return i.emit("error",h,l),r(h)}return i.emit("data",c,l),r(null,c)})}catch(a){i.emit("error",a,l),setTimeout(function(){r(a)},0);return}},s.prototype.end=function(u){return this.rpcImpl&&(u||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}}),qT=re(e=>{"use strict";var t=e;t.Service=UT()}),GT=re((e,t)=>{"use strict";t.exports=Object.create(null)}),HT=re(e=>{"use strict";var t=e;t.build="minimal",t.Writer=ay(),t.BufferWriter=LT(),t.Reader=sy(),t.BufferReader=VT(),t.util=Zr(),t.rpc=qT(),t.roots=GT(),t.configure=n;function n(){t.util._configure(),t.Writer._configure(t.BufferWriter),t.Reader._configure(t.BufferReader)}n()}),WT=re((e,t)=>{"use strict";t.exports=HT()}),ri=re((e,t)=>{"use strict";var n=WT(),s=n.Reader,u=n.Writer,l=n.util,d=n.roots.default||(n.roots.default={});d.onnx=(function(){var p={};return p.Version=(function(){var o={},r=Object.create(o);return r[o[0]="_START_VERSION"]=0,r[o[1]="IR_VERSION_2017_10_10"]=1,r[o[2]="IR_VERSION_2017_10_30"]=2,r[o[3]="IR_VERSION_2017_11_3"]=3,r[o[4]="IR_VERSION_2019_1_22"]=4,r[o[5]="IR_VERSION_2019_3_18"]=5,r[o[6]="IR_VERSION_2019_9_19"]=6,r[o[7]="IR_VERSION_2020_5_8"]=7,r[o[8]="IR_VERSION_2021_7_30"]=8,r[o[9]="IR_VERSION"]=9,r})(),p.AttributeProto=(function(){function o(r){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],r)for(var i=Object.keys(r),a=0;a<i.length;++a)r[i[a]]!=null&&(this[i[a]]=r[i[a]])}return o.prototype.name="",o.prototype.refAttrName="",o.prototype.docString="",o.prototype.type=0,o.prototype.f=0,o.prototype.i=l.Long?l.Long.fromBits(0,0,!1):0,o.prototype.s=l.newBuffer([]),o.prototype.t=null,o.prototype.g=null,o.prototype.sparseTensor=null,o.prototype.tp=null,o.prototype.floats=l.emptyArray,o.prototype.ints=l.emptyArray,o.prototype.strings=l.emptyArray,o.prototype.tensors=l.emptyArray,o.prototype.graphs=l.emptyArray,o.prototype.sparseTensors=l.emptyArray,o.prototype.typeProtos=l.emptyArray,o.create=function(r){return new o(r)},o.encode=function(r,i){if(i||(i=u.create()),r.name!=null&&Object.hasOwnProperty.call(r,"name")&&i.uint32(10).string(r.name),r.f!=null&&Object.hasOwnProperty.call(r,"f")&&i.uint32(21).float(r.f),r.i!=null&&Object.hasOwnProperty.call(r,"i")&&i.uint32(24).int64(r.i),r.s!=null&&Object.hasOwnProperty.call(r,"s")&&i.uint32(34).bytes(r.s),r.t!=null&&Object.hasOwnProperty.call(r,"t")&&d.onnx.TensorProto.encode(r.t,i.uint32(42).fork()).ldelim(),r.g!=null&&Object.hasOwnProperty.call(r,"g")&&d.onnx.GraphProto.encode(r.g,i.uint32(50).fork()).ldelim(),r.floats!=null&&r.floats.length){i.uint32(58).fork();for(var a=0;a<r.floats.length;++a)i.float(r.floats[a]);i.ldelim()}if(r.ints!=null&&r.ints.length){i.uint32(66).fork();for(var a=0;a<r.ints.length;++a)i.int64(r.ints[a]);i.ldelim()}if(r.strings!=null&&r.strings.length)for(var a=0;a<r.strings.length;++a)i.uint32(74).bytes(r.strings[a]);if(r.tensors!=null&&r.tensors.length)for(var a=0;a<r.tensors.length;++a)d.onnx.TensorProto.encode(r.tensors[a],i.uint32(82).fork()).ldelim();if(r.graphs!=null&&r.graphs.length)for(var a=0;a<r.graphs.length;++a)d.onnx.GraphProto.encode(r.graphs[a],i.uint32(90).fork()).ldelim();if(r.docString!=null&&Object.hasOwnProperty.call(r,"docString")&&i.uint32(106).string(r.docString),r.tp!=null&&Object.hasOwnProperty.call(r,"tp")&&d.onnx.TypeProto.encode(r.tp,i.uint32(114).fork()).ldelim(),r.typeProtos!=null&&r.typeProtos.length)for(var a=0;a<r.typeProtos.length;++a)d.onnx.TypeProto.encode(r.typeProtos[a],i.uint32(122).fork()).ldelim();if(r.type!=null&&Object.hasOwnProperty.call(r,"type")&&i.uint32(160).int32(r.type),r.refAttrName!=null&&Object.hasOwnProperty.call(r,"refAttrName")&&i.uint32(170).string(r.refAttrName),r.sparseTensor!=null&&Object.hasOwnProperty.call(r,"sparseTensor")&&d.onnx.SparseTensorProto.encode(r.sparseTensor,i.uint32(178).fork()).ldelim(),r.sparseTensors!=null&&r.sparseTensors.length)for(var a=0;a<r.sparseTensors.length;++a)d.onnx.SparseTensorProto.encode(r.sparseTensors[a],i.uint32(186).fork()).ldelim();return i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof s||(r=s.create(r));for(var a=i===void 0?r.len:r.pos+i,c=new d.onnx.AttributeProto;r.pos<a;){var h=r.uint32();switch(h>>>3){case 1:{c.name=r.string();break}case 21:{c.refAttrName=r.string();break}case 13:{c.docString=r.string();break}case 20:{c.type=r.int32();break}case 2:{c.f=r.float();break}case 3:{c.i=r.int64();break}case 4:{c.s=r.bytes();break}case 5:{c.t=d.onnx.TensorProto.decode(r,r.uint32());break}case 6:{c.g=d.onnx.GraphProto.decode(r,r.uint32());break}case 22:{c.sparseTensor=d.onnx.SparseTensorProto.decode(r,r.uint32());break}case 14:{c.tp=d.onnx.TypeProto.decode(r,r.uint32());break}case 7:{if(c.floats&&c.floats.length||(c.floats=[]),(h&7)===2)for(var m=r.uint32()+r.pos;r.pos<m;)c.floats.push(r.float());else c.floats.push(r.float());break}case 8:{if(c.ints&&c.ints.length||(c.ints=[]),(h&7)===2)for(var m=r.uint32()+r.pos;r.pos<m;)c.ints.push(r.int64());else c.ints.push(r.int64());break}case 9:{c.strings&&c.strings.length||(c.strings=[]),c.strings.push(r.bytes());break}case 10:{c.tensors&&c.tensors.length||(c.tensors=[]),c.tensors.push(d.onnx.TensorProto.decode(r,r.uint32()));break}case 11:{c.graphs&&c.graphs.length||(c.graphs=[]),c.graphs.push(d.onnx.GraphProto.decode(r,r.uint32()));break}case 23:{c.sparseTensors&&c.sparseTensors.length||(c.sparseTensors=[]),c.sparseTensors.push(d.onnx.SparseTensorProto.decode(r,r.uint32()));break}case 15:{c.typeProtos&&c.typeProtos.length||(c.typeProtos=[]),c.typeProtos.push(d.onnx.TypeProto.decode(r,r.uint32()));break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof s||(r=new s(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.name!=null&&r.hasOwnProperty("name")&&!l.isString(r.name))return"name: string expected";if(r.refAttrName!=null&&r.hasOwnProperty("refAttrName")&&!l.isString(r.refAttrName))return"refAttrName: string expected";if(r.docString!=null&&r.hasOwnProperty("docString")&&!l.isString(r.docString))return"docString: string expected";if(r.type!=null&&r.hasOwnProperty("type"))switch(r.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(r.f!=null&&r.hasOwnProperty("f")&&typeof r.f!="number")return"f: number expected";if(r.i!=null&&r.hasOwnProperty("i")&&!l.isInteger(r.i)&&!(r.i&&l.isInteger(r.i.low)&&l.isInteger(r.i.high)))return"i: integer|Long expected";if(r.s!=null&&r.hasOwnProperty("s")&&!(r.s&&typeof r.s.length=="number"||l.isString(r.s)))return"s: buffer expected";if(r.t!=null&&r.hasOwnProperty("t")){var i=d.onnx.TensorProto.verify(r.t);if(i)return"t."+i}if(r.g!=null&&r.hasOwnProperty("g")){var i=d.onnx.GraphProto.verify(r.g);if(i)return"g."+i}if(r.sparseTensor!=null&&r.hasOwnProperty("sparseTensor")){var i=d.onnx.SparseTensorProto.verify(r.sparseTensor);if(i)return"sparseTensor."+i}if(r.tp!=null&&r.hasOwnProperty("tp")){var i=d.onnx.TypeProto.verify(r.tp);if(i)return"tp."+i}if(r.floats!=null&&r.hasOwnProperty("floats")){if(!Array.isArray(r.floats))return"floats: array expected";for(var a=0;a<r.floats.length;++a)if(typeof r.floats[a]!="number")return"floats: number[] expected"}if(r.ints!=null&&r.hasOwnProperty("ints")){if(!Array.isArray(r.ints))return"ints: array expected";for(var a=0;a<r.ints.length;++a)if(!l.isInteger(r.ints[a])&&!(r.ints[a]&&l.isInteger(r.ints[a].low)&&l.isInteger(r.ints[a].high)))return"ints: integer|Long[] expected"}if(r.strings!=null&&r.hasOwnProperty("strings")){if(!Array.isArray(r.strings))return"strings: array expected";for(var a=0;a<r.strings.length;++a)if(!(r.strings[a]&&typeof r.strings[a].length=="number"||l.isString(r.strings[a])))return"strings: buffer[] expected"}if(r.tensors!=null&&r.hasOwnProperty("tensors")){if(!Array.isArray(r.tensors))return"tensors: array expected";for(var a=0;a<r.tensors.length;++a){var i=d.onnx.TensorProto.verify(r.tensors[a]);if(i)return"tensors."+i}}if(r.graphs!=null&&r.hasOwnProperty("graphs")){if(!Array.isArray(r.graphs))return"graphs: array expected";for(var a=0;a<r.graphs.length;++a){var i=d.onnx.GraphProto.verify(r.graphs[a]);if(i)return"graphs."+i}}if(r.sparseTensors!=null&&r.hasOwnProperty("sparseTensors")){if(!Array.isArray(r.sparseTensors))return"sparseTensors: array expected";for(var a=0;a<r.sparseTensors.length;++a){var i=d.onnx.SparseTensorProto.verify(r.sparseTensors[a]);if(i)return"sparseTensors."+i}}if(r.typeProtos!=null&&r.hasOwnProperty("typeProtos")){if(!Array.isArray(r.typeProtos))return"typeProtos: array expected";for(var a=0;a<r.typeProtos.length;++a){var i=d.onnx.TypeProto.verify(r.typeProtos[a]);if(i)return"typeProtos."+i}}return null},o.fromObject=function(r){if(r instanceof d.onnx.AttributeProto)return r;var i=new d.onnx.AttributeProto;switch(r.name!=null&&(i.name=String(r.name)),r.refAttrName!=null&&(i.refAttrName=String(r.refAttrName)),r.docString!=null&&(i.docString=String(r.docString)),r.type){default:if(typeof r.type=="number"){i.type=r.type;break}break;case"UNDEFINED":case 0:i.type=0;break;case"FLOAT":case 1:i.type=1;break;case"INT":case 2:i.type=2;break;case"STRING":case 3:i.type=3;break;case"TENSOR":case 4:i.type=4;break;case"GRAPH":case 5:i.type=5;break;case"SPARSE_TENSOR":case 11:i.type=11;break;case"TYPE_PROTO":case 13:i.type=13;break;case"FLOATS":case 6:i.type=6;break;case"INTS":case 7:i.type=7;break;case"STRINGS":case 8:i.type=8;break;case"TENSORS":case 9:i.type=9;break;case"GRAPHS":case 10:i.type=10;break;case"SPARSE_TENSORS":case 12:i.type=12;break;case"TYPE_PROTOS":case 14:i.type=14;break}if(r.f!=null&&(i.f=Number(r.f)),r.i!=null&&(l.Long?(i.i=l.Long.fromValue(r.i)).unsigned=!1:typeof r.i=="string"?i.i=parseInt(r.i,10):typeof r.i=="number"?i.i=r.i:typeof r.i=="object"&&(i.i=new l.LongBits(r.i.low>>>0,r.i.high>>>0).toNumber())),r.s!=null&&(typeof r.s=="string"?l.base64.decode(r.s,i.s=l.newBuffer(l.base64.length(r.s)),0):r.s.length>=0&&(i.s=r.s)),r.t!=null){if(typeof r.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");i.t=d.onnx.TensorProto.fromObject(r.t)}if(r.g!=null){if(typeof r.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");i.g=d.onnx.GraphProto.fromObject(r.g)}if(r.sparseTensor!=null){if(typeof r.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");i.sparseTensor=d.onnx.SparseTensorProto.fromObject(r.sparseTensor)}if(r.tp!=null){if(typeof r.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");i.tp=d.onnx.TypeProto.fromObject(r.tp)}if(r.floats){if(!Array.isArray(r.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");i.floats=[];for(var a=0;a<r.floats.length;++a)i.floats[a]=Number(r.floats[a])}if(r.ints){if(!Array.isArray(r.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");i.ints=[];for(var a=0;a<r.ints.length;++a)l.Long?(i.ints[a]=l.Long.fromValue(r.ints[a])).unsigned=!1:typeof r.ints[a]=="string"?i.ints[a]=parseInt(r.ints[a],10):typeof r.ints[a]=="number"?i.ints[a]=r.ints[a]:typeof r.ints[a]=="object"&&(i.ints[a]=new l.LongBits(r.ints[a].low>>>0,r.ints[a].high>>>0).toNumber())}if(r.strings){if(!Array.isArray(r.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");i.strings=[];for(var a=0;a<r.strings.length;++a)typeof r.strings[a]=="string"?l.base64.decode(r.strings[a],i.strings[a]=l.newBuffer(l.base64.length(r.strings[a])),0):r.strings[a].length>=0&&(i.strings[a]=r.strings[a])}if(r.tensors){if(!Array.isArray(r.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");i.tensors=[];for(var a=0;a<r.tensors.length;++a){if(typeof r.tensors[a]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");i.tensors[a]=d.onnx.TensorProto.fromObject(r.tensors[a])}}if(r.graphs){if(!Array.isArray(r.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");i.graphs=[];for(var a=0;a<r.graphs.length;++a){if(typeof r.graphs[a]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");i.graphs[a]=d.onnx.GraphProto.fromObject(r.graphs[a])}}if(r.sparseTensors){if(!Array.isArray(r.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");i.sparseTensors=[];for(var a=0;a<r.sparseTensors.length;++a){if(typeof r.sparseTensors[a]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");i.sparseTensors[a]=d.onnx.SparseTensorProto.fromObject(r.sparseTensors[a])}}if(r.typeProtos){if(!Array.isArray(r.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");i.typeProtos=[];for(var a=0;a<r.typeProtos.length;++a){if(typeof r.typeProtos[a]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");i.typeProtos[a]=d.onnx.TypeProto.fromObject(r.typeProtos[a])}}return i},o.toObject=function(r,i){i||(i={});var a={};if((i.arrays||i.defaults)&&(a.floats=[],a.ints=[],a.strings=[],a.tensors=[],a.graphs=[],a.typeProtos=[],a.sparseTensors=[]),i.defaults){if(a.name="",a.f=0,l.Long){var c=new l.Long(0,0,!1);a.i=i.longs===String?c.toString():i.longs===Number?c.toNumber():c}else a.i=i.longs===String?"0":0;i.bytes===String?a.s="":(a.s=[],i.bytes!==Array&&(a.s=l.newBuffer(a.s))),a.t=null,a.g=null,a.docString="",a.tp=null,a.type=i.enums===String?"UNDEFINED":0,a.refAttrName="",a.sparseTensor=null}if(r.name!=null&&r.hasOwnProperty("name")&&(a.name=r.name),r.f!=null&&r.hasOwnProperty("f")&&(a.f=i.json&&!isFinite(r.f)?String(r.f):r.f),r.i!=null&&r.hasOwnProperty("i")&&(typeof r.i=="number"?a.i=i.longs===String?String(r.i):r.i:a.i=i.longs===String?l.Long.prototype.toString.call(r.i):i.longs===Number?new l.LongBits(r.i.low>>>0,r.i.high>>>0).toNumber():r.i),r.s!=null&&r.hasOwnProperty("s")&&(a.s=i.bytes===String?l.base64.encode(r.s,0,r.s.length):i.bytes===Array?Array.prototype.slice.call(r.s):r.s),r.t!=null&&r.hasOwnProperty("t")&&(a.t=d.onnx.TensorProto.toObject(r.t,i)),r.g!=null&&r.hasOwnProperty("g")&&(a.g=d.onnx.GraphProto.toObject(r.g,i)),r.floats&&r.floats.length){a.floats=[];for(var h=0;h<r.floats.length;++h)a.floats[h]=i.json&&!isFinite(r.floats[h])?String(r.floats[h]):r.floats[h]}if(r.ints&&r.ints.length){a.ints=[];for(var h=0;h<r.ints.length;++h)typeof r.ints[h]=="number"?a.ints[h]=i.longs===String?String(r.ints[h]):r.ints[h]:a.ints[h]=i.longs===String?l.Long.prototype.toString.call(r.ints[h]):i.longs===Number?new l.LongBits(r.ints[h].low>>>0,r.ints[h].high>>>0).toNumber():r.ints[h]}if(r.strings&&r.strings.length){a.strings=[];for(var h=0;h<r.strings.length;++h)a.strings[h]=i.bytes===String?l.base64.encode(r.strings[h],0,r.strings[h].length):i.bytes===Array?Array.prototype.slice.call(r.strings[h]):r.strings[h]}if(r.tensors&&r.tensors.length){a.tensors=[];for(var h=0;h<r.tensors.length;++h)a.tensors[h]=d.onnx.TensorProto.toObject(r.tensors[h],i)}if(r.graphs&&r.graphs.length){a.graphs=[];for(var h=0;h<r.graphs.length;++h)a.graphs[h]=d.onnx.GraphProto.toObject(r.graphs[h],i)}if(r.docString!=null&&r.hasOwnProperty("docString")&&(a.docString=r.docString),r.tp!=null&&r.hasOwnProperty("tp")&&(a.tp=d.onnx.TypeProto.toObject(r.tp,i)),r.typeProtos&&r.typeProtos.length){a.typeProtos=[];for(var h=0;h<r.typeProtos.length;++h)a.typeProtos[h]=d.onnx.TypeProto.toObject(r.typeProtos[h],i)}if(r.type!=null&&r.hasOwnProperty("type")&&(a.type=i.enums===String?d.onnx.AttributeProto.AttributeType[r.type]===void 0?r.type:d.onnx.AttributeProto.AttributeType[r.type]:r.type),r.refAttrName!=null&&r.hasOwnProperty("refAttrName")&&(a.refAttrName=r.refAttrName),r.sparseTensor!=null&&r.hasOwnProperty("sparseTensor")&&(a.sparseTensor=d.onnx.SparseTensorProto.toObject(r.sparseTensor,i)),r.sparseTensors&&r.sparseTensors.length){a.sparseTensors=[];for(var h=0;h<r.sparseTensors.length;++h)a.sparseTensors[h]=d.onnx.SparseTensorProto.toObject(r.sparseTensors[h],i)}return a},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.AttributeProto"},o.AttributeType=(function(){var r={},i=Object.create(r);return i[r[0]="UNDEFINED"]=0,i[r[1]="FLOAT"]=1,i[r[2]="INT"]=2,i[r[3]="STRING"]=3,i[r[4]="TENSOR"]=4,i[r[5]="GRAPH"]=5,i[r[11]="SPARSE_TENSOR"]=11,i[r[13]="TYPE_PROTO"]=13,i[r[6]="FLOATS"]=6,i[r[7]="INTS"]=7,i[r[8]="STRINGS"]=8,i[r[9]="TENSORS"]=9,i[r[10]="GRAPHS"]=10,i[r[12]="SPARSE_TENSORS"]=12,i[r[14]="TYPE_PROTOS"]=14,i})(),o})(),p.ValueInfoProto=(function(){function o(r){if(r)for(var i=Object.keys(r),a=0;a<i.length;++a)r[i[a]]!=null&&(this[i[a]]=r[i[a]])}return o.prototype.name="",o.prototype.type=null,o.prototype.docString="",o.create=function(r){return new o(r)},o.encode=function(r,i){return i||(i=u.create()),r.name!=null&&Object.hasOwnProperty.call(r,"name")&&i.uint32(10).string(r.name),r.type!=null&&Object.hasOwnProperty.call(r,"type")&&d.onnx.TypeProto.encode(r.type,i.uint32(18).fork()).ldelim(),r.docString!=null&&Object.hasOwnProperty.call(r,"docString")&&i.uint32(26).string(r.docString),i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof s||(r=s.create(r));for(var a=i===void 0?r.len:r.pos+i,c=new d.onnx.ValueInfoProto;r.pos<a;){var h=r.uint32();switch(h>>>3){case 1:{c.name=r.string();break}case 2:{c.type=d.onnx.TypeProto.decode(r,r.uint32());break}case 3:{c.docString=r.string();break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof s||(r=new s(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.name!=null&&r.hasOwnProperty("name")&&!l.isString(r.name))return"name: string expected";if(r.type!=null&&r.hasOwnProperty("type")){var i=d.onnx.TypeProto.verify(r.type);if(i)return"type."+i}return r.docString!=null&&r.hasOwnProperty("docString")&&!l.isString(r.docString)?"docString: string expected":null},o.fromObject=function(r){if(r instanceof d.onnx.ValueInfoProto)return r;var i=new d.onnx.ValueInfoProto;if(r.name!=null&&(i.name=String(r.name)),r.type!=null){if(typeof r.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");i.type=d.onnx.TypeProto.fromObject(r.type)}return r.docString!=null&&(i.docString=String(r.docString)),i},o.toObject=function(r,i){i||(i={});var a={};return i.defaults&&(a.name="",a.type=null,a.docString=""),r.name!=null&&r.hasOwnProperty("name")&&(a.name=r.name),r.type!=null&&r.hasOwnProperty("type")&&(a.type=d.onnx.TypeProto.toObject(r.type,i)),r.docString!=null&&r.hasOwnProperty("docString")&&(a.docString=r.docString),a},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.ValueInfoProto"},o})(),p.NodeProto=(function(){function o(r){if(this.input=[],this.output=[],this.attribute=[],r)for(var i=Object.keys(r),a=0;a<i.length;++a)r[i[a]]!=null&&(this[i[a]]=r[i[a]])}return o.prototype.input=l.emptyArray,o.prototype.output=l.emptyArray,o.prototype.name="",o.prototype.opType="",o.prototype.domain="",o.prototype.attribute=l.emptyArray,o.prototype.docString="",o.create=function(r){return new o(r)},o.encode=function(r,i){if(i||(i=u.create()),r.input!=null&&r.input.length)for(var a=0;a<r.input.length;++a)i.uint32(10).string(r.input[a]);if(r.output!=null&&r.output.length)for(var a=0;a<r.output.length;++a)i.uint32(18).string(r.output[a]);if(r.name!=null&&Object.hasOwnProperty.call(r,"name")&&i.uint32(26).string(r.name),r.opType!=null&&Object.hasOwnProperty.call(r,"opType")&&i.uint32(34).string(r.opType),r.attribute!=null&&r.attribute.length)for(var a=0;a<r.attribute.length;++a)d.onnx.AttributeProto.encode(r.attribute[a],i.uint32(42).fork()).ldelim();return r.docString!=null&&Object.hasOwnProperty.call(r,"docString")&&i.uint32(50).string(r.docString),r.domain!=null&&Object.hasOwnProperty.call(r,"domain")&&i.uint32(58).string(r.domain),i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof s||(r=s.create(r));for(var a=i===void 0?r.len:r.pos+i,c=new d.onnx.NodeProto;r.pos<a;){var h=r.uint32();switch(h>>>3){case 1:{c.input&&c.input.length||(c.input=[]),c.input.push(r.string());break}case 2:{c.output&&c.output.length||(c.output=[]),c.output.push(r.string());break}case 3:{c.name=r.string();break}case 4:{c.opType=r.string();break}case 7:{c.domain=r.string();break}case 5:{c.attribute&&c.attribute.length||(c.attribute=[]),c.attribute.push(d.onnx.AttributeProto.decode(r,r.uint32()));break}case 6:{c.docString=r.string();break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof s||(r=new s(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.input!=null&&r.hasOwnProperty("input")){if(!Array.isArray(r.input))return"input: array expected";for(var i=0;i<r.input.length;++i)if(!l.isString(r.input[i]))return"input: string[] expected"}if(r.output!=null&&r.hasOwnProperty("output")){if(!Array.isArray(r.output))return"output: array expected";for(var i=0;i<r.output.length;++i)if(!l.isString(r.output[i]))return"output: string[] expected"}if(r.name!=null&&r.hasOwnProperty("name")&&!l.isString(r.name))return"name: string expected";if(r.opType!=null&&r.hasOwnProperty("opType")&&!l.isString(r.opType))return"opType: string expected";if(r.domain!=null&&r.hasOwnProperty("domain")&&!l.isString(r.domain))return"domain: string expected";if(r.attribute!=null&&r.hasOwnProperty("attribute")){if(!Array.isArray(r.attribute))return"attribute: array expected";for(var i=0;i<r.attribute.length;++i){var a=d.onnx.AttributeProto.verify(r.attribute[i]);if(a)return"attribute."+a}}return r.docString!=null&&r.hasOwnProperty("docString")&&!l.isString(r.docString)?"docString: string expected":null},o.fromObject=function(r){if(r instanceof d.onnx.NodeProto)return r;var i=new d.onnx.NodeProto;if(r.input){if(!Array.isArray(r.input))throw TypeError(".onnx.NodeProto.input: array expected");i.input=[];for(var a=0;a<r.input.length;++a)i.input[a]=String(r.input[a])}if(r.output){if(!Array.isArray(r.output))throw TypeError(".onnx.NodeProto.output: array expected");i.output=[];for(var a=0;a<r.output.length;++a)i.output[a]=String(r.output[a])}if(r.name!=null&&(i.name=String(r.name)),r.opType!=null&&(i.opType=String(r.opType)),r.domain!=null&&(i.domain=String(r.domain)),r.attribute){if(!Array.isArray(r.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");i.attribute=[];for(var a=0;a<r.attribute.length;++a){if(typeof r.attribute[a]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");i.attribute[a]=d.onnx.AttributeProto.fromObject(r.attribute[a])}}return r.docString!=null&&(i.docString=String(r.docString)),i},o.toObject=function(r,i){i||(i={});var a={};if((i.arrays||i.defaults)&&(a.input=[],a.output=[],a.attribute=[]),i.defaults&&(a.name="",a.opType="",a.docString="",a.domain=""),r.input&&r.input.length){a.input=[];for(var c=0;c<r.input.length;++c)a.input[c]=r.input[c]}if(r.output&&r.output.length){a.output=[];for(var c=0;c<r.output.length;++c)a.output[c]=r.output[c]}if(r.name!=null&&r.hasOwnProperty("name")&&(a.name=r.name),r.opType!=null&&r.hasOwnProperty("opType")&&(a.opType=r.opType),r.attribute&&r.attribute.length){a.attribute=[];for(var c=0;c<r.attribute.length;++c)a.attribute[c]=d.onnx.AttributeProto.toObject(r.attribute[c],i)}return r.docString!=null&&r.hasOwnProperty("docString")&&(a.docString=r.docString),r.domain!=null&&r.hasOwnProperty("domain")&&(a.domain=r.domain),a},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.NodeProto"},o})(),p.TrainingInfoProto=(function(){function o(r){if(this.initializationBinding=[],this.updateBinding=[],r)for(var i=Object.keys(r),a=0;a<i.length;++a)r[i[a]]!=null&&(this[i[a]]=r[i[a]])}return o.prototype.initialization=null,o.prototype.algorithm=null,o.prototype.initializationBinding=l.emptyArray,o.prototype.updateBinding=l.emptyArray,o.create=function(r){return new o(r)},o.encode=function(r,i){if(i||(i=u.create()),r.initialization!=null&&Object.hasOwnProperty.call(r,"initialization")&&d.onnx.GraphProto.encode(r.initialization,i.uint32(10).fork()).ldelim(),r.algorithm!=null&&Object.hasOwnProperty.call(r,"algorithm")&&d.onnx.GraphProto.encode(r.algorithm,i.uint32(18).fork()).ldelim(),r.initializationBinding!=null&&r.initializationBinding.length)for(var a=0;a<r.initializationBinding.length;++a)d.onnx.StringStringEntryProto.encode(r.initializationBinding[a],i.uint32(26).fork()).ldelim();if(r.updateBinding!=null&&r.updateBinding.length)for(var a=0;a<r.updateBinding.length;++a)d.onnx.StringStringEntryProto.encode(r.updateBinding[a],i.uint32(34).fork()).ldelim();return i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof s||(r=s.create(r));for(var a=i===void 0?r.len:r.pos+i,c=new d.onnx.TrainingInfoProto;r.pos<a;){var h=r.uint32();switch(h>>>3){case 1:{c.initialization=d.onnx.GraphProto.decode(r,r.uint32());break}case 2:{c.algorithm=d.onnx.GraphProto.decode(r,r.uint32());break}case 3:{c.initializationBinding&&c.initializationBinding.length||(c.initializationBinding=[]),c.initializationBinding.push(d.onnx.StringStringEntryProto.decode(r,r.uint32()));break}case 4:{c.updateBinding&&c.updateBinding.length||(c.updateBinding=[]),c.updateBinding.push(d.onnx.StringStringEntryProto.decode(r,r.uint32()));break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof s||(r=new s(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.initialization!=null&&r.hasOwnProperty("initialization")){var i=d.onnx.GraphProto.verify(r.initialization);if(i)return"initialization."+i}if(r.algorithm!=null&&r.hasOwnProperty("algorithm")){var i=d.onnx.GraphProto.verify(r.algorithm);if(i)return"algorithm."+i}if(r.initializationBinding!=null&&r.hasOwnProperty("initializationBinding")){if(!Array.isArray(r.initializationBinding))return"initializationBinding: array expected";for(var a=0;a<r.initializationBinding.length;++a){var i=d.onnx.StringStringEntryProto.verify(r.initializationBinding[a]);if(i)return"initializationBinding."+i}}if(r.updateBinding!=null&&r.hasOwnProperty("updateBinding")){if(!Array.isArray(r.updateBinding))return"updateBinding: array expected";for(var a=0;a<r.updateBinding.length;++a){var i=d.onnx.StringStringEntryProto.verify(r.updateBinding[a]);if(i)return"updateBinding."+i}}return null},o.fromObject=function(r){if(r instanceof d.onnx.TrainingInfoProto)return r;var i=new d.onnx.TrainingInfoProto;if(r.initialization!=null){if(typeof r.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");i.initialization=d.onnx.GraphProto.fromObject(r.initialization)}if(r.algorithm!=null){if(typeof r.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");i.algorithm=d.onnx.GraphProto.fromObject(r.algorithm)}if(r.initializationBinding){if(!Array.isArray(r.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");i.initializationBinding=[];for(var a=0;a<r.initializationBinding.length;++a){if(typeof r.initializationBinding[a]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");i.initializationBinding[a]=d.onnx.StringStringEntryProto.fromObject(r.initializationBinding[a])}}if(r.updateBinding){if(!Array.isArray(r.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");i.updateBinding=[];for(var a=0;a<r.updateBinding.length;++a){if(typeof r.updateBinding[a]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");i.updateBinding[a]=d.onnx.StringStringEntryProto.fromObject(r.updateBinding[a])}}return i},o.toObject=function(r,i){i||(i={});var a={};if((i.arrays||i.defaults)&&(a.initializationBinding=[],a.updateBinding=[]),i.defaults&&(a.initialization=null,a.algorithm=null),r.initialization!=null&&r.hasOwnProperty("initialization")&&(a.initialization=d.onnx.GraphProto.toObject(r.initialization,i)),r.algorithm!=null&&r.hasOwnProperty("algorithm")&&(a.algorithm=d.onnx.GraphProto.toObject(r.algorithm,i)),r.initializationBinding&&r.initializationBinding.length){a.initializationBinding=[];for(var c=0;c<r.initializationBinding.length;++c)a.initializationBinding[c]=d.onnx.StringStringEntryProto.toObject(r.initializationBinding[c],i)}if(r.updateBinding&&r.updateBinding.length){a.updateBinding=[];for(var c=0;c<r.updateBinding.length;++c)a.updateBinding[c]=d.onnx.StringStringEntryProto.toObject(r.updateBinding[c],i)}return a},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.TrainingInfoProto"},o})(),p.ModelProto=(function(){function o(r){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],r)for(var i=Object.keys(r),a=0;a<i.length;++a)r[i[a]]!=null&&(this[i[a]]=r[i[a]])}return o.prototype.irVersion=l.Long?l.Long.fromBits(0,0,!1):0,o.prototype.opsetImport=l.emptyArray,o.prototype.producerName="",o.prototype.producerVersion="",o.prototype.domain="",o.prototype.modelVersion=l.Long?l.Long.fromBits(0,0,!1):0,o.prototype.docString="",o.prototype.graph=null,o.prototype.metadataProps=l.emptyArray,o.prototype.trainingInfo=l.emptyArray,o.prototype.functions=l.emptyArray,o.create=function(r){return new o(r)},o.encode=function(r,i){if(i||(i=u.create()),r.irVersion!=null&&Object.hasOwnProperty.call(r,"irVersion")&&i.uint32(8).int64(r.irVersion),r.producerName!=null&&Object.hasOwnProperty.call(r,"producerName")&&i.uint32(18).string(r.producerName),r.producerVersion!=null&&Object.hasOwnProperty.call(r,"producerVersion")&&i.uint32(26).string(r.producerVersion),r.domain!=null&&Object.hasOwnProperty.call(r,"domain")&&i.uint32(34).string(r.domain),r.modelVersion!=null&&Object.hasOwnProperty.call(r,"modelVersion")&&i.uint32(40).int64(r.modelVersion),r.docString!=null&&Object.hasOwnProperty.call(r,"docString")&&i.uint32(50).string(r.docString),r.graph!=null&&Object.hasOwnProperty.call(r,"graph")&&d.onnx.GraphProto.encode(r.graph,i.uint32(58).fork()).ldelim(),r.opsetImport!=null&&r.opsetImport.length)for(var a=0;a<r.opsetImport.length;++a)d.onnx.OperatorSetIdProto.encode(r.opsetImport[a],i.uint32(66).fork()).ldelim();if(r.metadataProps!=null&&r.metadataProps.length)for(var a=0;a<r.metadataProps.length;++a)d.onnx.StringStringEntryProto.encode(r.metadataProps[a],i.uint32(114).fork()).ldelim();if(r.trainingInfo!=null&&r.trainingInfo.length)for(var a=0;a<r.trainingInfo.length;++a)d.onnx.TrainingInfoProto.encode(r.trainingInfo[a],i.uint32(162).fork()).ldelim();if(r.functions!=null&&r.functions.length)for(var a=0;a<r.functions.length;++a)d.onnx.FunctionProto.encode(r.functions[a],i.uint32(202).fork()).ldelim();return i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof s||(r=s.create(r));for(var a=i===void 0?r.len:r.pos+i,c=new d.onnx.ModelProto;r.pos<a;){var h=r.uint32();switch(h>>>3){case 1:{c.irVersion=r.int64();break}case 8:{c.opsetImport&&c.opsetImport.length||(c.opsetImport=[]),c.opsetImport.push(d.onnx.OperatorSetIdProto.decode(r,r.uint32()));break}case 2:{c.producerName=r.string();break}case 3:{c.producerVersion=r.string();break}case 4:{c.domain=r.string();break}case 5:{c.modelVersion=r.int64();break}case 6:{c.docString=r.string();break}case 7:{c.graph=d.onnx.GraphProto.decode(r,r.uint32());break}case 14:{c.metadataProps&&c.metadataProps.length||(c.metadataProps=[]),c.metadataProps.push(d.onnx.StringStringEntryProto.decode(r,r.uint32()));break}case 20:{c.trainingInfo&&c.trainingInfo.length||(c.trainingInfo=[]),c.trainingInfo.push(d.onnx.TrainingInfoProto.decode(r,r.uint32()));break}case 25:{c.functions&&c.functions.length||(c.functions=[]),c.functions.push(d.onnx.FunctionProto.decode(r,r.uint32()));break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof s||(r=new s(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.irVersion!=null&&r.hasOwnProperty("irVersion")&&!l.isInteger(r.irVersion)&&!(r.irVersion&&l.isInteger(r.irVersion.low)&&l.isInteger(r.irVersion.high)))return"irVersion: integer|Long expected";if(r.opsetImport!=null&&r.hasOwnProperty("opsetImport")){if(!Array.isArray(r.opsetImport))return"opsetImport: array expected";for(var i=0;i<r.opsetImport.length;++i){var a=d.onnx.OperatorSetIdProto.verify(r.opsetImport[i]);if(a)return"opsetImport."+a}}if(r.producerName!=null&&r.hasOwnProperty("producerName")&&!l.isString(r.producerName))return"producerName: string expected";if(r.producerVersion!=null&&r.hasOwnProperty("producerVersion")&&!l.isString(r.producerVersion))return"producerVersion: string expected";if(r.domain!=null&&r.hasOwnProperty("domain")&&!l.isString(r.domain))return"domain: string expected";if(r.modelVersion!=null&&r.hasOwnProperty("modelVersion")&&!l.isInteger(r.modelVersion)&&!(r.modelVersion&&l.isInteger(r.modelVersion.low)&&l.isInteger(r.modelVersion.high)))return"modelVersion: integer|Long expected";if(r.docString!=null&&r.hasOwnProperty("docString")&&!l.isString(r.docString))return"docString: string expected";if(r.graph!=null&&r.hasOwnProperty("graph")){var a=d.onnx.GraphProto.verify(r.graph);if(a)return"graph."+a}if(r.metadataProps!=null&&r.hasOwnProperty("metadataProps")){if(!Array.isArray(r.metadataProps))return"metadataProps: array expected";for(var i=0;i<r.metadataProps.length;++i){var a=d.onnx.StringStringEntryProto.verify(r.metadataProps[i]);if(a)return"metadataProps."+a}}if(r.trainingInfo!=null&&r.hasOwnProperty("trainingInfo")){if(!Array.isArray(r.trainingInfo))return"trainingInfo: array expected";for(var i=0;i<r.trainingInfo.length;++i){var a=d.onnx.TrainingInfoProto.verify(r.trainingInfo[i]);if(a)return"trainingInfo."+a}}if(r.functions!=null&&r.hasOwnProperty("functions")){if(!Array.isArray(r.functions))return"functions: array expected";for(var i=0;i<r.functions.length;++i){var a=d.onnx.FunctionProto.verify(r.functions[i]);if(a)return"functions."+a}}return null},o.fromObject=function(r){if(r instanceof d.onnx.ModelProto)return r;var i=new d.onnx.ModelProto;if(r.irVersion!=null&&(l.Long?(i.irVersion=l.Long.fromValue(r.irVersion)).unsigned=!1:typeof r.irVersion=="string"?i.irVersion=parseInt(r.irVersion,10):typeof r.irVersion=="number"?i.irVersion=r.irVersion:typeof r.irVersion=="object"&&(i.irVersion=new l.LongBits(r.irVersion.low>>>0,r.irVersion.high>>>0).toNumber())),r.opsetImport){if(!Array.isArray(r.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");i.opsetImport=[];for(var a=0;a<r.opsetImport.length;++a){if(typeof r.opsetImport[a]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");i.opsetImport[a]=d.onnx.OperatorSetIdProto.fromObject(r.opsetImport[a])}}if(r.producerName!=null&&(i.producerName=String(r.producerName)),r.producerVersion!=null&&(i.producerVersion=String(r.producerVersion)),r.domain!=null&&(i.domain=String(r.domain)),r.modelVersion!=null&&(l.Long?(i.modelVersion=l.Long.fromValue(r.modelVersion)).unsigned=!1:typeof r.modelVersion=="string"?i.modelVersion=parseInt(r.modelVersion,10):typeof r.modelVersion=="number"?i.modelVersion=r.modelVersion:typeof r.modelVersion=="object"&&(i.modelVersion=new l.LongBits(r.modelVersion.low>>>0,r.modelVersion.high>>>0).toNumber())),r.docString!=null&&(i.docString=String(r.docString)),r.graph!=null){if(typeof r.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");i.graph=d.onnx.GraphProto.fromObject(r.graph)}if(r.metadataProps){if(!Array.isArray(r.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");i.metadataProps=[];for(var a=0;a<r.metadataProps.length;++a){if(typeof r.metadataProps[a]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");i.metadataProps[a]=d.onnx.StringStringEntryProto.fromObject(r.metadataProps[a])}}if(r.trainingInfo){if(!Array.isArray(r.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");i.trainingInfo=[];for(var a=0;a<r.trainingInfo.length;++a){if(typeof r.trainingInfo[a]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");i.trainingInfo[a]=d.onnx.TrainingInfoProto.fromObject(r.trainingInfo[a])}}if(r.functions){if(!Array.isArray(r.functions))throw TypeError(".onnx.ModelProto.functions: array expected");i.functions=[];for(var a=0;a<r.functions.length;++a){if(typeof r.functions[a]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");i.functions[a]=d.onnx.FunctionProto.fromObject(r.functions[a])}}return i},o.toObject=function(r,i){i||(i={});var a={};if((i.arrays||i.defaults)&&(a.opsetImport=[],a.metadataProps=[],a.trainingInfo=[],a.functions=[]),i.defaults){if(l.Long){var c=new l.Long(0,0,!1);a.irVersion=i.longs===String?c.toString():i.longs===Number?c.toNumber():c}else a.irVersion=i.longs===String?"0":0;if(a.producerName="",a.producerVersion="",a.domain="",l.Long){var c=new l.Long(0,0,!1);a.modelVersion=i.longs===String?c.toString():i.longs===Number?c.toNumber():c}else a.modelVersion=i.longs===String?"0":0;a.docString="",a.graph=null}if(r.irVersion!=null&&r.hasOwnProperty("irVersion")&&(typeof r.irVersion=="number"?a.irVersion=i.longs===String?String(r.irVersion):r.irVersion:a.irVersion=i.longs===String?l.Long.prototype.toString.call(r.irVersion):i.longs===Number?new l.LongBits(r.irVersion.low>>>0,r.irVersion.high>>>0).toNumber():r.irVersion),r.producerName!=null&&r.hasOwnProperty("producerName")&&(a.producerName=r.producerName),r.producerVersion!=null&&r.hasOwnProperty("producerVersion")&&(a.producerVersion=r.producerVersion),r.domain!=null&&r.hasOwnProperty("domain")&&(a.domain=r.domain),r.modelVersion!=null&&r.hasOwnProperty("modelVersion")&&(typeof r.modelVersion=="number"?a.modelVersion=i.longs===String?String(r.modelVersion):r.modelVersion:a.modelVersion=i.longs===String?l.Long.prototype.toString.call(r.modelVersion):i.longs===Number?new l.LongBits(r.modelVersion.low>>>0,r.modelVersion.high>>>0).toNumber():r.modelVersion),r.docString!=null&&r.hasOwnProperty("docString")&&(a.docString=r.docString),r.graph!=null&&r.hasOwnProperty("graph")&&(a.graph=d.onnx.GraphProto.toObject(r.graph,i)),r.opsetImport&&r.opsetImport.length){a.opsetImport=[];for(var h=0;h<r.opsetImport.length;++h)a.opsetImport[h]=d.onnx.OperatorSetIdProto.toObject(r.opsetImport[h],i)}if(r.metadataProps&&r.metadataProps.length){a.metadataProps=[];for(var h=0;h<r.metadataProps.length;++h)a.metadataProps[h]=d.onnx.StringStringEntryProto.toObject(r.metadataProps[h],i)}if(r.trainingInfo&&r.trainingInfo.length){a.trainingInfo=[];for(var h=0;h<r.trainingInfo.length;++h)a.trainingInfo[h]=d.onnx.TrainingInfoProto.toObject(r.trainingInfo[h],i)}if(r.functions&&r.functions.length){a.functions=[];for(var h=0;h<r.functions.length;++h)a.functions[h]=d.onnx.FunctionProto.toObject(r.functions[h],i)}return a},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.ModelProto"},o})(),p.StringStringEntryProto=(function(){function o(r){if(r)for(var i=Object.keys(r),a=0;a<i.length;++a)r[i[a]]!=null&&(this[i[a]]=r[i[a]])}return o.prototype.key="",o.prototype.value="",o.create=function(r){return new o(r)},o.encode=function(r,i){return i||(i=u.create()),r.key!=null&&Object.hasOwnProperty.call(r,"key")&&i.uint32(10).string(r.key),r.value!=null&&Object.hasOwnProperty.call(r,"value")&&i.uint32(18).string(r.value),i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof s||(r=s.create(r));for(var a=i===void 0?r.len:r.pos+i,c=new d.onnx.StringStringEntryProto;r.pos<a;){var h=r.uint32();switch(h>>>3){case 1:{c.key=r.string();break}case 2:{c.value=r.string();break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof s||(r=new s(r)),this.decode(r,r.uint32())},o.verify=function(r){return typeof r!="object"||r===null?"object expected":r.key!=null&&r.hasOwnProperty("key")&&!l.isString(r.key)?"key: string expected":r.value!=null&&r.hasOwnProperty("value")&&!l.isString(r.value)?"value: string expected":null},o.fromObject=function(r){if(r instanceof d.onnx.StringStringEntryProto)return r;var i=new d.onnx.StringStringEntryProto;return r.key!=null&&(i.key=String(r.key)),r.value!=null&&(i.value=String(r.value)),i},o.toObject=function(r,i){i||(i={});var a={};return i.defaults&&(a.key="",a.value=""),r.key!=null&&r.hasOwnProperty("key")&&(a.key=r.key),r.value!=null&&r.hasOwnProperty("value")&&(a.value=r.value),a},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.StringStringEntryProto"},o})(),p.TensorAnnotation=(function(){function o(r){if(this.quantParameterTensorNames=[],r)for(var i=Object.keys(r),a=0;a<i.length;++a)r[i[a]]!=null&&(this[i[a]]=r[i[a]])}return o.prototype.tensorName="",o.prototype.quantParameterTensorNames=l.emptyArray,o.create=function(r){return new o(r)},o.encode=function(r,i){if(i||(i=u.create()),r.tensorName!=null&&Object.hasOwnProperty.call(r,"tensorName")&&i.uint32(10).string(r.tensorName),r.quantParameterTensorNames!=null&&r.quantParameterTensorNames.length)for(var a=0;a<r.quantParameterTensorNames.length;++a)d.onnx.StringStringEntryProto.encode(r.quantParameterTensorNames[a],i.uint32(18).fork()).ldelim();return i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof s||(r=s.create(r));for(var a=i===void 0?r.len:r.pos+i,c=new d.onnx.TensorAnnotation;r.pos<a;){var h=r.uint32();switch(h>>>3){case 1:{c.tensorName=r.string();break}case 2:{c.quantParameterTensorNames&&c.quantParameterTensorNames.length||(c.quantParameterTensorNames=[]),c.quantParameterTensorNames.push(d.onnx.StringStringEntryProto.decode(r,r.uint32()));break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof s||(r=new s(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.tensorName!=null&&r.hasOwnProperty("tensorName")&&!l.isString(r.tensorName))return"tensorName: string expected";if(r.quantParameterTensorNames!=null&&r.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(r.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var i=0;i<r.quantParameterTensorNames.length;++i){var a=d.onnx.StringStringEntryProto.verify(r.quantParameterTensorNames[i]);if(a)return"quantParameterTensorNames."+a}}return null},o.fromObject=function(r){if(r instanceof d.onnx.TensorAnnotation)return r;var i=new d.onnx.TensorAnnotation;if(r.tensorName!=null&&(i.tensorName=String(r.tensorName)),r.quantParameterTensorNames){if(!Array.isArray(r.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");i.quantParameterTensorNames=[];for(var a=0;a<r.quantParameterTensorNames.length;++a){if(typeof r.quantParameterTensorNames[a]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");i.quantParameterTensorNames[a]=d.onnx.StringStringEntryProto.fromObject(r.quantParameterTensorNames[a])}}return i},o.toObject=function(r,i){i||(i={});var a={};if((i.arrays||i.defaults)&&(a.quantParameterTensorNames=[]),i.defaults&&(a.tensorName=""),r.tensorName!=null&&r.hasOwnProperty("tensorName")&&(a.tensorName=r.tensorName),r.quantParameterTensorNames&&r.quantParameterTensorNames.length){a.quantParameterTensorNames=[];for(var c=0;c<r.quantParameterTensorNames.length;++c)a.quantParameterTensorNames[c]=d.onnx.StringStringEntryProto.toObject(r.quantParameterTensorNames[c],i)}return a},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.TensorAnnotation"},o})(),p.GraphProto=(function(){function o(r){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],r)for(var i=Object.keys(r),a=0;a<i.length;++a)r[i[a]]!=null&&(this[i[a]]=r[i[a]])}return o.prototype.node=l.emptyArray,o.prototype.name="",o.prototype.initializer=l.emptyArray,o.prototype.sparseInitializer=l.emptyArray,o.prototype.docString="",o.prototype.input=l.emptyArray,o.prototype.output=l.emptyArray,o.prototype.valueInfo=l.emptyArray,o.prototype.quantizationAnnotation=l.emptyArray,o.create=function(r){return new o(r)},o.encode=function(r,i){if(i||(i=u.create()),r.node!=null&&r.node.length)for(var a=0;a<r.node.length;++a)d.onnx.NodeProto.encode(r.node[a],i.uint32(10).fork()).ldelim();if(r.name!=null&&Object.hasOwnProperty.call(r,"name")&&i.uint32(18).string(r.name),r.initializer!=null&&r.initializer.length)for(var a=0;a<r.initializer.length;++a)d.onnx.TensorProto.encode(r.initializer[a],i.uint32(42).fork()).ldelim();if(r.docString!=null&&Object.hasOwnProperty.call(r,"docString")&&i.uint32(82).string(r.docString),r.input!=null&&r.input.length)for(var a=0;a<r.input.length;++a)d.onnx.ValueInfoProto.encode(r.input[a],i.uint32(90).fork()).ldelim();if(r.output!=null&&r.output.length)for(var a=0;a<r.output.length;++a)d.onnx.ValueInfoProto.encode(r.output[a],i.uint32(98).fork()).ldelim();if(r.valueInfo!=null&&r.valueInfo.length)for(var a=0;a<r.valueInfo.length;++a)d.onnx.ValueInfoProto.encode(r.valueInfo[a],i.uint32(106).fork()).ldelim();if(r.quantizationAnnotation!=null&&r.quantizationAnnotation.length)for(var a=0;a<r.quantizationAnnotation.length;++a)d.onnx.TensorAnnotation.encode(r.quantizationAnnotation[a],i.uint32(114).fork()).ldelim();if(r.sparseInitializer!=null&&r.sparseInitializer.length)for(var a=0;a<r.sparseInitializer.length;++a)d.onnx.SparseTensorProto.encode(r.sparseInitializer[a],i.uint32(122).fork()).ldelim();return i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof s||(r=s.create(r));for(var a=i===void 0?r.len:r.pos+i,c=new d.onnx.GraphProto;r.pos<a;){var h=r.uint32();switch(h>>>3){case 1:{c.node&&c.node.length||(c.node=[]),c.node.push(d.onnx.NodeProto.decode(r,r.uint32()));break}case 2:{c.name=r.string();break}case 5:{c.initializer&&c.initializer.length||(c.initializer=[]),c.initializer.push(d.onnx.TensorProto.decode(r,r.uint32()));break}case 15:{c.sparseInitializer&&c.sparseInitializer.length||(c.sparseInitializer=[]),c.sparseInitializer.push(d.onnx.SparseTensorProto.decode(r,r.uint32()));break}case 10:{c.docString=r.string();break}case 11:{c.input&&c.input.length||(c.input=[]),c.input.push(d.onnx.ValueInfoProto.decode(r,r.uint32()));break}case 12:{c.output&&c.output.length||(c.output=[]),c.output.push(d.onnx.ValueInfoProto.decode(r,r.uint32()));break}case 13:{c.valueInfo&&c.valueInfo.length||(c.valueInfo=[]),c.valueInfo.push(d.onnx.ValueInfoProto.decode(r,r.uint32()));break}case 14:{c.quantizationAnnotation&&c.quantizationAnnotation.length||(c.quantizationAnnotation=[]),c.quantizationAnnotation.push(d.onnx.TensorAnnotation.decode(r,r.uint32()));break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof s||(r=new s(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.node!=null&&r.hasOwnProperty("node")){if(!Array.isArray(r.node))return"node: array expected";for(var i=0;i<r.node.length;++i){var a=d.onnx.NodeProto.verify(r.node[i]);if(a)return"node."+a}}if(r.name!=null&&r.hasOwnProperty("name")&&!l.isString(r.name))return"name: string expected";if(r.initializer!=null&&r.hasOwnProperty("initializer")){if(!Array.isArray(r.initializer))return"initializer: array expected";for(var i=0;i<r.initializer.length;++i){var a=d.onnx.TensorProto.verify(r.initializer[i]);if(a)return"initializer."+a}}if(r.sparseInitializer!=null&&r.hasOwnProperty("sparseInitializer")){if(!Array.isArray(r.sparseInitializer))return"sparseInitializer: array expected";for(var i=0;i<r.sparseInitializer.length;++i){var a=d.onnx.SparseTensorProto.verify(r.sparseInitializer[i]);if(a)return"sparseInitializer."+a}}if(r.docString!=null&&r.hasOwnProperty("docString")&&!l.isString(r.docString))return"docString: string expected";if(r.input!=null&&r.hasOwnProperty("input")){if(!Array.isArray(r.input))return"input: array expected";for(var i=0;i<r.input.length;++i){var a=d.onnx.ValueInfoProto.verify(r.input[i]);if(a)return"input."+a}}if(r.output!=null&&r.hasOwnProperty("output")){if(!Array.isArray(r.output))return"output: array expected";for(var i=0;i<r.output.length;++i){var a=d.onnx.ValueInfoProto.verify(r.output[i]);if(a)return"output."+a}}if(r.valueInfo!=null&&r.hasOwnProperty("valueInfo")){if(!Array.isArray(r.valueInfo))return"valueInfo: array expected";for(var i=0;i<r.valueInfo.length;++i){var a=d.onnx.ValueInfoProto.verify(r.valueInfo[i]);if(a)return"valueInfo."+a}}if(r.quantizationAnnotation!=null&&r.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(r.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var i=0;i<r.quantizationAnnotation.length;++i){var a=d.onnx.TensorAnnotation.verify(r.quantizationAnnotation[i]);if(a)return"quantizationAnnotation."+a}}return null},o.fromObject=function(r){if(r instanceof d.onnx.GraphProto)return r;var i=new d.onnx.GraphProto;if(r.node){if(!Array.isArray(r.node))throw TypeError(".onnx.GraphProto.node: array expected");i.node=[];for(var a=0;a<r.node.length;++a){if(typeof r.node[a]!="object")throw TypeError(".onnx.GraphProto.node: object expected");i.node[a]=d.onnx.NodeProto.fromObject(r.node[a])}}if(r.name!=null&&(i.name=String(r.name)),r.initializer){if(!Array.isArray(r.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");i.initializer=[];for(var a=0;a<r.initializer.length;++a){if(typeof r.initializer[a]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");i.initializer[a]=d.onnx.TensorProto.fromObject(r.initializer[a])}}if(r.sparseInitializer){if(!Array.isArray(r.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");i.sparseInitializer=[];for(var a=0;a<r.sparseInitializer.length;++a){if(typeof r.sparseInitializer[a]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");i.sparseInitializer[a]=d.onnx.SparseTensorProto.fromObject(r.sparseInitializer[a])}}if(r.docString!=null&&(i.docString=String(r.docString)),r.input){if(!Array.isArray(r.input))throw TypeError(".onnx.GraphProto.input: array expected");i.input=[];for(var a=0;a<r.input.length;++a){if(typeof r.input[a]!="object")throw TypeError(".onnx.GraphProto.input: object expected");i.input[a]=d.onnx.ValueInfoProto.fromObject(r.input[a])}}if(r.output){if(!Array.isArray(r.output))throw TypeError(".onnx.GraphProto.output: array expected");i.output=[];for(var a=0;a<r.output.length;++a){if(typeof r.output[a]!="object")throw TypeError(".onnx.GraphProto.output: object expected");i.output[a]=d.onnx.ValueInfoProto.fromObject(r.output[a])}}if(r.valueInfo){if(!Array.isArray(r.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");i.valueInfo=[];for(var a=0;a<r.valueInfo.length;++a){if(typeof r.valueInfo[a]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");i.valueInfo[a]=d.onnx.ValueInfoProto.fromObject(r.valueInfo[a])}}if(r.quantizationAnnotation){if(!Array.isArray(r.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");i.quantizationAnnotation=[];for(var a=0;a<r.quantizationAnnotation.length;++a){if(typeof r.quantizationAnnotation[a]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");i.quantizationAnnotation[a]=d.onnx.TensorAnnotation.fromObject(r.quantizationAnnotation[a])}}return i},o.toObject=function(r,i){i||(i={});var a={};if((i.arrays||i.defaults)&&(a.node=[],a.initializer=[],a.input=[],a.output=[],a.valueInfo=[],a.quantizationAnnotation=[],a.sparseInitializer=[]),i.defaults&&(a.name="",a.docString=""),r.node&&r.node.length){a.node=[];for(var c=0;c<r.node.length;++c)a.node[c]=d.onnx.NodeProto.toObject(r.node[c],i)}if(r.name!=null&&r.hasOwnProperty("name")&&(a.name=r.name),r.initializer&&r.initializer.length){a.initializer=[];for(var c=0;c<r.initializer.length;++c)a.initializer[c]=d.onnx.TensorProto.toObject(r.initializer[c],i)}if(r.docString!=null&&r.hasOwnProperty("docString")&&(a.docString=r.docString),r.input&&r.input.length){a.input=[];for(var c=0;c<r.input.length;++c)a.input[c]=d.onnx.ValueInfoProto.toObject(r.input[c],i)}if(r.output&&r.output.length){a.output=[];for(var c=0;c<r.output.length;++c)a.output[c]=d.onnx.ValueInfoProto.toObject(r.output[c],i)}if(r.valueInfo&&r.valueInfo.length){a.valueInfo=[];for(var c=0;c<r.valueInfo.length;++c)a.valueInfo[c]=d.onnx.ValueInfoProto.toObject(r.valueInfo[c],i)}if(r.quantizationAnnotation&&r.quantizationAnnotation.length){a.quantizationAnnotation=[];for(var c=0;c<r.quantizationAnnotation.length;++c)a.quantizationAnnotation[c]=d.onnx.TensorAnnotation.toObject(r.quantizationAnnotation[c],i)}if(r.sparseInitializer&&r.sparseInitializer.length){a.sparseInitializer=[];for(var c=0;c<r.sparseInitializer.length;++c)a.sparseInitializer[c]=d.onnx.SparseTensorProto.toObject(r.sparseInitializer[c],i)}return a},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.GraphProto"},o})(),p.TensorProto=(function(){function o(r){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],r)for(var i=Object.keys(r),a=0;a<i.length;++a)r[i[a]]!=null&&(this[i[a]]=r[i[a]])}return o.prototype.dims=l.emptyArray,o.prototype.dataType=0,o.prototype.segment=null,o.prototype.floatData=l.emptyArray,o.prototype.int32Data=l.emptyArray,o.prototype.stringData=l.emptyArray,o.prototype.int64Data=l.emptyArray,o.prototype.name="",o.prototype.docString="",o.prototype.rawData=l.newBuffer([]),o.prototype.externalData=l.emptyArray,o.prototype.dataLocation=0,o.prototype.doubleData=l.emptyArray,o.prototype.uint64Data=l.emptyArray,o.create=function(r){return new o(r)},o.encode=function(r,i){if(i||(i=u.create()),r.dims!=null&&r.dims.length){i.uint32(10).fork();for(var a=0;a<r.dims.length;++a)i.int64(r.dims[a]);i.ldelim()}if(r.dataType!=null&&Object.hasOwnProperty.call(r,"dataType")&&i.uint32(16).int32(r.dataType),r.segment!=null&&Object.hasOwnProperty.call(r,"segment")&&d.onnx.TensorProto.Segment.encode(r.segment,i.uint32(26).fork()).ldelim(),r.floatData!=null&&r.floatData.length){i.uint32(34).fork();for(var a=0;a<r.floatData.length;++a)i.float(r.floatData[a]);i.ldelim()}if(r.int32Data!=null&&r.int32Data.length){i.uint32(42).fork();for(var a=0;a<r.int32Data.length;++a)i.int32(r.int32Data[a]);i.ldelim()}if(r.stringData!=null&&r.stringData.length)for(var a=0;a<r.stringData.length;++a)i.uint32(50).bytes(r.stringData[a]);if(r.int64Data!=null&&r.int64Data.length){i.uint32(58).fork();for(var a=0;a<r.int64Data.length;++a)i.int64(r.int64Data[a]);i.ldelim()}if(r.name!=null&&Object.hasOwnProperty.call(r,"name")&&i.uint32(66).string(r.name),r.rawData!=null&&Object.hasOwnProperty.call(r,"rawData")&&i.uint32(74).bytes(r.rawData),r.doubleData!=null&&r.doubleData.length){i.uint32(82).fork();for(var a=0;a<r.doubleData.length;++a)i.double(r.doubleData[a]);i.ldelim()}if(r.uint64Data!=null&&r.uint64Data.length){i.uint32(90).fork();for(var a=0;a<r.uint64Data.length;++a)i.uint64(r.uint64Data[a]);i.ldelim()}if(r.docString!=null&&Object.hasOwnProperty.call(r,"docString")&&i.uint32(98).string(r.docString),r.externalData!=null&&r.externalData.length)for(var a=0;a<r.externalData.length;++a)d.onnx.StringStringEntryProto.encode(r.externalData[a],i.uint32(106).fork()).ldelim();return r.dataLocation!=null&&Object.hasOwnProperty.call(r,"dataLocation")&&i.uint32(112).int32(r.dataLocation),i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof s||(r=s.create(r));for(var a=i===void 0?r.len:r.pos+i,c=new d.onnx.TensorProto;r.pos<a;){var h=r.uint32();switch(h>>>3){case 1:{if(c.dims&&c.dims.length||(c.dims=[]),(h&7)===2)for(var m=r.uint32()+r.pos;r.pos<m;)c.dims.push(r.int64());else c.dims.push(r.int64());break}case 2:{c.dataType=r.int32();break}case 3:{c.segment=d.onnx.TensorProto.Segment.decode(r,r.uint32());break}case 4:{if(c.floatData&&c.floatData.length||(c.floatData=[]),(h&7)===2)for(var m=r.uint32()+r.pos;r.pos<m;)c.floatData.push(r.float());else c.floatData.push(r.float());break}case 5:{if(c.int32Data&&c.int32Data.length||(c.int32Data=[]),(h&7)===2)for(var m=r.uint32()+r.pos;r.pos<m;)c.int32Data.push(r.int32());else c.int32Data.push(r.int32());break}case 6:{c.stringData&&c.stringData.length||(c.stringData=[]),c.stringData.push(r.bytes());break}case 7:{if(c.int64Data&&c.int64Data.length||(c.int64Data=[]),(h&7)===2)for(var m=r.uint32()+r.pos;r.pos<m;)c.int64Data.push(r.int64());else c.int64Data.push(r.int64());break}case 8:{c.name=r.string();break}case 12:{c.docString=r.string();break}case 9:{c.rawData=r.bytes();break}case 13:{c.externalData&&c.externalData.length||(c.externalData=[]),c.externalData.push(d.onnx.StringStringEntryProto.decode(r,r.uint32()));break}case 14:{c.dataLocation=r.int32();break}case 10:{if(c.doubleData&&c.doubleData.length||(c.doubleData=[]),(h&7)===2)for(var m=r.uint32()+r.pos;r.pos<m;)c.doubleData.push(r.double());else c.doubleData.push(r.double());break}case 11:{if(c.uint64Data&&c.uint64Data.length||(c.uint64Data=[]),(h&7)===2)for(var m=r.uint32()+r.pos;r.pos<m;)c.uint64Data.push(r.uint64());else c.uint64Data.push(r.uint64());break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof s||(r=new s(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.dims!=null&&r.hasOwnProperty("dims")){if(!Array.isArray(r.dims))return"dims: array expected";for(var i=0;i<r.dims.length;++i)if(!l.isInteger(r.dims[i])&&!(r.dims[i]&&l.isInteger(r.dims[i].low)&&l.isInteger(r.dims[i].high)))return"dims: integer|Long[] expected"}if(r.dataType!=null&&r.hasOwnProperty("dataType")&&!l.isInteger(r.dataType))return"dataType: integer expected";if(r.segment!=null&&r.hasOwnProperty("segment")){var a=d.onnx.TensorProto.Segment.verify(r.segment);if(a)return"segment."+a}if(r.floatData!=null&&r.hasOwnProperty("floatData")){if(!Array.isArray(r.floatData))return"floatData: array expected";for(var i=0;i<r.floatData.length;++i)if(typeof r.floatData[i]!="number")return"floatData: number[] expected"}if(r.int32Data!=null&&r.hasOwnProperty("int32Data")){if(!Array.isArray(r.int32Data))return"int32Data: array expected";for(var i=0;i<r.int32Data.length;++i)if(!l.isInteger(r.int32Data[i]))return"int32Data: integer[] expected"}if(r.stringData!=null&&r.hasOwnProperty("stringData")){if(!Array.isArray(r.stringData))return"stringData: array expected";for(var i=0;i<r.stringData.length;++i)if(!(r.stringData[i]&&typeof r.stringData[i].length=="number"||l.isString(r.stringData[i])))return"stringData: buffer[] expected"}if(r.int64Data!=null&&r.hasOwnProperty("int64Data")){if(!Array.isArray(r.int64Data))return"int64Data: array expected";for(var i=0;i<r.int64Data.length;++i)if(!l.isInteger(r.int64Data[i])&&!(r.int64Data[i]&&l.isInteger(r.int64Data[i].low)&&l.isInteger(r.int64Data[i].high)))return"int64Data: integer|Long[] expected"}if(r.name!=null&&r.hasOwnProperty("name")&&!l.isString(r.name))return"name: string expected";if(r.docString!=null&&r.hasOwnProperty("docString")&&!l.isString(r.docString))return"docString: string expected";if(r.rawData!=null&&r.hasOwnProperty("rawData")&&!(r.rawData&&typeof r.rawData.length=="number"||l.isString(r.rawData)))return"rawData: buffer expected";if(r.externalData!=null&&r.hasOwnProperty("externalData")){if(!Array.isArray(r.externalData))return"externalData: array expected";for(var i=0;i<r.externalData.length;++i){var a=d.onnx.StringStringEntryProto.verify(r.externalData[i]);if(a)return"externalData."+a}}if(r.dataLocation!=null&&r.hasOwnProperty("dataLocation"))switch(r.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(r.doubleData!=null&&r.hasOwnProperty("doubleData")){if(!Array.isArray(r.doubleData))return"doubleData: array expected";for(var i=0;i<r.doubleData.length;++i)if(typeof r.doubleData[i]!="number")return"doubleData: number[] expected"}if(r.uint64Data!=null&&r.hasOwnProperty("uint64Data")){if(!Array.isArray(r.uint64Data))return"uint64Data: array expected";for(var i=0;i<r.uint64Data.length;++i)if(!l.isInteger(r.uint64Data[i])&&!(r.uint64Data[i]&&l.isInteger(r.uint64Data[i].low)&&l.isInteger(r.uint64Data[i].high)))return"uint64Data: integer|Long[] expected"}return null},o.fromObject=function(r){if(r instanceof d.onnx.TensorProto)return r;var i=new d.onnx.TensorProto;if(r.dims){if(!Array.isArray(r.dims))throw TypeError(".onnx.TensorProto.dims: array expected");i.dims=[];for(var a=0;a<r.dims.length;++a)l.Long?(i.dims[a]=l.Long.fromValue(r.dims[a])).unsigned=!1:typeof r.dims[a]=="string"?i.dims[a]=parseInt(r.dims[a],10):typeof r.dims[a]=="number"?i.dims[a]=r.dims[a]:typeof r.dims[a]=="object"&&(i.dims[a]=new l.LongBits(r.dims[a].low>>>0,r.dims[a].high>>>0).toNumber())}if(r.dataType!=null&&(i.dataType=r.dataType|0),r.segment!=null){if(typeof r.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");i.segment=d.onnx.TensorProto.Segment.fromObject(r.segment)}if(r.floatData){if(!Array.isArray(r.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");i.floatData=[];for(var a=0;a<r.floatData.length;++a)i.floatData[a]=Number(r.floatData[a])}if(r.int32Data){if(!Array.isArray(r.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");i.int32Data=[];for(var a=0;a<r.int32Data.length;++a)i.int32Data[a]=r.int32Data[a]|0}if(r.stringData){if(!Array.isArray(r.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");i.stringData=[];for(var a=0;a<r.stringData.length;++a)typeof r.stringData[a]=="string"?l.base64.decode(r.stringData[a],i.stringData[a]=l.newBuffer(l.base64.length(r.stringData[a])),0):r.stringData[a].length>=0&&(i.stringData[a]=r.stringData[a])}if(r.int64Data){if(!Array.isArray(r.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");i.int64Data=[];for(var a=0;a<r.int64Data.length;++a)l.Long?(i.int64Data[a]=l.Long.fromValue(r.int64Data[a])).unsigned=!1:typeof r.int64Data[a]=="string"?i.int64Data[a]=parseInt(r.int64Data[a],10):typeof r.int64Data[a]=="number"?i.int64Data[a]=r.int64Data[a]:typeof r.int64Data[a]=="object"&&(i.int64Data[a]=new l.LongBits(r.int64Data[a].low>>>0,r.int64Data[a].high>>>0).toNumber())}if(r.name!=null&&(i.name=String(r.name)),r.docString!=null&&(i.docString=String(r.docString)),r.rawData!=null&&(typeof r.rawData=="string"?l.base64.decode(r.rawData,i.rawData=l.newBuffer(l.base64.length(r.rawData)),0):r.rawData.length>=0&&(i.rawData=r.rawData)),r.externalData){if(!Array.isArray(r.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");i.externalData=[];for(var a=0;a<r.externalData.length;++a){if(typeof r.externalData[a]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");i.externalData[a]=d.onnx.StringStringEntryProto.fromObject(r.externalData[a])}}switch(r.dataLocation){default:if(typeof r.dataLocation=="number"){i.dataLocation=r.dataLocation;break}break;case"DEFAULT":case 0:i.dataLocation=0;break;case"EXTERNAL":case 1:i.dataLocation=1;break}if(r.doubleData){if(!Array.isArray(r.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");i.doubleData=[];for(var a=0;a<r.doubleData.length;++a)i.doubleData[a]=Number(r.doubleData[a])}if(r.uint64Data){if(!Array.isArray(r.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");i.uint64Data=[];for(var a=0;a<r.uint64Data.length;++a)l.Long?(i.uint64Data[a]=l.Long.fromValue(r.uint64Data[a])).unsigned=!0:typeof r.uint64Data[a]=="string"?i.uint64Data[a]=parseInt(r.uint64Data[a],10):typeof r.uint64Data[a]=="number"?i.uint64Data[a]=r.uint64Data[a]:typeof r.uint64Data[a]=="object"&&(i.uint64Data[a]=new l.LongBits(r.uint64Data[a].low>>>0,r.uint64Data[a].high>>>0).toNumber(!0))}return i},o.toObject=function(r,i){i||(i={});var a={};if((i.arrays||i.defaults)&&(a.dims=[],a.floatData=[],a.int32Data=[],a.stringData=[],a.int64Data=[],a.doubleData=[],a.uint64Data=[],a.externalData=[]),i.defaults&&(a.dataType=0,a.segment=null,a.name="",i.bytes===String?a.rawData="":(a.rawData=[],i.bytes!==Array&&(a.rawData=l.newBuffer(a.rawData))),a.docString="",a.dataLocation=i.enums===String?"DEFAULT":0),r.dims&&r.dims.length){a.dims=[];for(var c=0;c<r.dims.length;++c)typeof r.dims[c]=="number"?a.dims[c]=i.longs===String?String(r.dims[c]):r.dims[c]:a.dims[c]=i.longs===String?l.Long.prototype.toString.call(r.dims[c]):i.longs===Number?new l.LongBits(r.dims[c].low>>>0,r.dims[c].high>>>0).toNumber():r.dims[c]}if(r.dataType!=null&&r.hasOwnProperty("dataType")&&(a.dataType=r.dataType),r.segment!=null&&r.hasOwnProperty("segment")&&(a.segment=d.onnx.TensorProto.Segment.toObject(r.segment,i)),r.floatData&&r.floatData.length){a.floatData=[];for(var c=0;c<r.floatData.length;++c)a.floatData[c]=i.json&&!isFinite(r.floatData[c])?String(r.floatData[c]):r.floatData[c]}if(r.int32Data&&r.int32Data.length){a.int32Data=[];for(var c=0;c<r.int32Data.length;++c)a.int32Data[c]=r.int32Data[c]}if(r.stringData&&r.stringData.length){a.stringData=[];for(var c=0;c<r.stringData.length;++c)a.stringData[c]=i.bytes===String?l.base64.encode(r.stringData[c],0,r.stringData[c].length):i.bytes===Array?Array.prototype.slice.call(r.stringData[c]):r.stringData[c]}if(r.int64Data&&r.int64Data.length){a.int64Data=[];for(var c=0;c<r.int64Data.length;++c)typeof r.int64Data[c]=="number"?a.int64Data[c]=i.longs===String?String(r.int64Data[c]):r.int64Data[c]:a.int64Data[c]=i.longs===String?l.Long.prototype.toString.call(r.int64Data[c]):i.longs===Number?new l.LongBits(r.int64Data[c].low>>>0,r.int64Data[c].high>>>0).toNumber():r.int64Data[c]}if(r.name!=null&&r.hasOwnProperty("name")&&(a.name=r.name),r.rawData!=null&&r.hasOwnProperty("rawData")&&(a.rawData=i.bytes===String?l.base64.encode(r.rawData,0,r.rawData.length):i.bytes===Array?Array.prototype.slice.call(r.rawData):r.rawData),r.doubleData&&r.doubleData.length){a.doubleData=[];for(var c=0;c<r.doubleData.length;++c)a.doubleData[c]=i.json&&!isFinite(r.doubleData[c])?String(r.doubleData[c]):r.doubleData[c]}if(r.uint64Data&&r.uint64Data.length){a.uint64Data=[];for(var c=0;c<r.uint64Data.length;++c)typeof r.uint64Data[c]=="number"?a.uint64Data[c]=i.longs===String?String(r.uint64Data[c]):r.uint64Data[c]:a.uint64Data[c]=i.longs===String?l.Long.prototype.toString.call(r.uint64Data[c]):i.longs===Number?new l.LongBits(r.uint64Data[c].low>>>0,r.uint64Data[c].high>>>0).toNumber(!0):r.uint64Data[c]}if(r.docString!=null&&r.hasOwnProperty("docString")&&(a.docString=r.docString),r.externalData&&r.externalData.length){a.externalData=[];for(var c=0;c<r.externalData.length;++c)a.externalData[c]=d.onnx.StringStringEntryProto.toObject(r.externalData[c],i)}return r.dataLocation!=null&&r.hasOwnProperty("dataLocation")&&(a.dataLocation=i.enums===String?d.onnx.TensorProto.DataLocation[r.dataLocation]===void 0?r.dataLocation:d.onnx.TensorProto.DataLocation[r.dataLocation]:r.dataLocation),a},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.TensorProto"},o.DataType=(function(){var r={},i=Object.create(r);return i[r[0]="UNDEFINED"]=0,i[r[1]="FLOAT"]=1,i[r[2]="UINT8"]=2,i[r[3]="INT8"]=3,i[r[4]="UINT16"]=4,i[r[5]="INT16"]=5,i[r[6]="INT32"]=6,i[r[7]="INT64"]=7,i[r[8]="STRING"]=8,i[r[9]="BOOL"]=9,i[r[10]="FLOAT16"]=10,i[r[11]="DOUBLE"]=11,i[r[12]="UINT32"]=12,i[r[13]="UINT64"]=13,i[r[14]="COMPLEX64"]=14,i[r[15]="COMPLEX128"]=15,i[r[16]="BFLOAT16"]=16,i[r[17]="FLOAT8E4M3FN"]=17,i[r[18]="FLOAT8E4M3FNUZ"]=18,i[r[19]="FLOAT8E5M2"]=19,i[r[20]="FLOAT8E5M2FNUZ"]=20,i})(),o.Segment=(function(){function r(i){if(i)for(var a=Object.keys(i),c=0;c<a.length;++c)i[a[c]]!=null&&(this[a[c]]=i[a[c]])}return r.prototype.begin=l.Long?l.Long.fromBits(0,0,!1):0,r.prototype.end=l.Long?l.Long.fromBits(0,0,!1):0,r.create=function(i){return new r(i)},r.encode=function(i,a){return a||(a=u.create()),i.begin!=null&&Object.hasOwnProperty.call(i,"begin")&&a.uint32(8).int64(i.begin),i.end!=null&&Object.hasOwnProperty.call(i,"end")&&a.uint32(16).int64(i.end),a},r.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},r.decode=function(i,a){i instanceof s||(i=s.create(i));for(var c=a===void 0?i.len:i.pos+a,h=new d.onnx.TensorProto.Segment;i.pos<c;){var m=i.uint32();switch(m>>>3){case 1:{h.begin=i.int64();break}case 2:{h.end=i.int64();break}default:i.skipType(m&7);break}}return h},r.decodeDelimited=function(i){return i instanceof s||(i=new s(i)),this.decode(i,i.uint32())},r.verify=function(i){return typeof i!="object"||i===null?"object expected":i.begin!=null&&i.hasOwnProperty("begin")&&!l.isInteger(i.begin)&&!(i.begin&&l.isInteger(i.begin.low)&&l.isInteger(i.begin.high))?"begin: integer|Long expected":i.end!=null&&i.hasOwnProperty("end")&&!l.isInteger(i.end)&&!(i.end&&l.isInteger(i.end.low)&&l.isInteger(i.end.high))?"end: integer|Long expected":null},r.fromObject=function(i){if(i instanceof d.onnx.TensorProto.Segment)return i;var a=new d.onnx.TensorProto.Segment;return i.begin!=null&&(l.Long?(a.begin=l.Long.fromValue(i.begin)).unsigned=!1:typeof i.begin=="string"?a.begin=parseInt(i.begin,10):typeof i.begin=="number"?a.begin=i.begin:typeof i.begin=="object"&&(a.begin=new l.LongBits(i.begin.low>>>0,i.begin.high>>>0).toNumber())),i.end!=null&&(l.Long?(a.end=l.Long.fromValue(i.end)).unsigned=!1:typeof i.end=="string"?a.end=parseInt(i.end,10):typeof i.end=="number"?a.end=i.end:typeof i.end=="object"&&(a.end=new l.LongBits(i.end.low>>>0,i.end.high>>>0).toNumber())),a},r.toObject=function(i,a){a||(a={});var c={};if(a.defaults){if(l.Long){var h=new l.Long(0,0,!1);c.begin=a.longs===String?h.toString():a.longs===Number?h.toNumber():h}else c.begin=a.longs===String?"0":0;if(l.Long){var h=new l.Long(0,0,!1);c.end=a.longs===String?h.toString():a.longs===Number?h.toNumber():h}else c.end=a.longs===String?"0":0}return i.begin!=null&&i.hasOwnProperty("begin")&&(typeof i.begin=="number"?c.begin=a.longs===String?String(i.begin):i.begin:c.begin=a.longs===String?l.Long.prototype.toString.call(i.begin):a.longs===Number?new l.LongBits(i.begin.low>>>0,i.begin.high>>>0).toNumber():i.begin),i.end!=null&&i.hasOwnProperty("end")&&(typeof i.end=="number"?c.end=a.longs===String?String(i.end):i.end:c.end=a.longs===String?l.Long.prototype.toString.call(i.end):a.longs===Number?new l.LongBits(i.end.low>>>0,i.end.high>>>0).toNumber():i.end),c},r.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},r.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TensorProto.Segment"},r})(),o.DataLocation=(function(){var r={},i=Object.create(r);return i[r[0]="DEFAULT"]=0,i[r[1]="EXTERNAL"]=1,i})(),o})(),p.SparseTensorProto=(function(){function o(r){if(this.dims=[],r)for(var i=Object.keys(r),a=0;a<i.length;++a)r[i[a]]!=null&&(this[i[a]]=r[i[a]])}return o.prototype.values=null,o.prototype.indices=null,o.prototype.dims=l.emptyArray,o.create=function(r){return new o(r)},o.encode=function(r,i){if(i||(i=u.create()),r.values!=null&&Object.hasOwnProperty.call(r,"values")&&d.onnx.TensorProto.encode(r.values,i.uint32(10).fork()).ldelim(),r.indices!=null&&Object.hasOwnProperty.call(r,"indices")&&d.onnx.TensorProto.encode(r.indices,i.uint32(18).fork()).ldelim(),r.dims!=null&&r.dims.length){i.uint32(26).fork();for(var a=0;a<r.dims.length;++a)i.int64(r.dims[a]);i.ldelim()}return i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof s||(r=s.create(r));for(var a=i===void 0?r.len:r.pos+i,c=new d.onnx.SparseTensorProto;r.pos<a;){var h=r.uint32();switch(h>>>3){case 1:{c.values=d.onnx.TensorProto.decode(r,r.uint32());break}case 2:{c.indices=d.onnx.TensorProto.decode(r,r.uint32());break}case 3:{if(c.dims&&c.dims.length||(c.dims=[]),(h&7)===2)for(var m=r.uint32()+r.pos;r.pos<m;)c.dims.push(r.int64());else c.dims.push(r.int64());break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof s||(r=new s(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.values!=null&&r.hasOwnProperty("values")){var i=d.onnx.TensorProto.verify(r.values);if(i)return"values."+i}if(r.indices!=null&&r.hasOwnProperty("indices")){var i=d.onnx.TensorProto.verify(r.indices);if(i)return"indices."+i}if(r.dims!=null&&r.hasOwnProperty("dims")){if(!Array.isArray(r.dims))return"dims: array expected";for(var a=0;a<r.dims.length;++a)if(!l.isInteger(r.dims[a])&&!(r.dims[a]&&l.isInteger(r.dims[a].low)&&l.isInteger(r.dims[a].high)))return"dims: integer|Long[] expected"}return null},o.fromObject=function(r){if(r instanceof d.onnx.SparseTensorProto)return r;var i=new d.onnx.SparseTensorProto;if(r.values!=null){if(typeof r.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");i.values=d.onnx.TensorProto.fromObject(r.values)}if(r.indices!=null){if(typeof r.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");i.indices=d.onnx.TensorProto.fromObject(r.indices)}if(r.dims){if(!Array.isArray(r.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");i.dims=[];for(var a=0;a<r.dims.length;++a)l.Long?(i.dims[a]=l.Long.fromValue(r.dims[a])).unsigned=!1:typeof r.dims[a]=="string"?i.dims[a]=parseInt(r.dims[a],10):typeof r.dims[a]=="number"?i.dims[a]=r.dims[a]:typeof r.dims[a]=="object"&&(i.dims[a]=new l.LongBits(r.dims[a].low>>>0,r.dims[a].high>>>0).toNumber())}return i},o.toObject=function(r,i){i||(i={});var a={};if((i.arrays||i.defaults)&&(a.dims=[]),i.defaults&&(a.values=null,a.indices=null),r.values!=null&&r.hasOwnProperty("values")&&(a.values=d.onnx.TensorProto.toObject(r.values,i)),r.indices!=null&&r.hasOwnProperty("indices")&&(a.indices=d.onnx.TensorProto.toObject(r.indices,i)),r.dims&&r.dims.length){a.dims=[];for(var c=0;c<r.dims.length;++c)typeof r.dims[c]=="number"?a.dims[c]=i.longs===String?String(r.dims[c]):r.dims[c]:a.dims[c]=i.longs===String?l.Long.prototype.toString.call(r.dims[c]):i.longs===Number?new l.LongBits(r.dims[c].low>>>0,r.dims[c].high>>>0).toNumber():r.dims[c]}return a},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.SparseTensorProto"},o})(),p.TensorShapeProto=(function(){function o(r){if(this.dim=[],r)for(var i=Object.keys(r),a=0;a<i.length;++a)r[i[a]]!=null&&(this[i[a]]=r[i[a]])}return o.prototype.dim=l.emptyArray,o.create=function(r){return new o(r)},o.encode=function(r,i){if(i||(i=u.create()),r.dim!=null&&r.dim.length)for(var a=0;a<r.dim.length;++a)d.onnx.TensorShapeProto.Dimension.encode(r.dim[a],i.uint32(10).fork()).ldelim();return i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof s||(r=s.create(r));for(var a=i===void 0?r.len:r.pos+i,c=new d.onnx.TensorShapeProto;r.pos<a;){var h=r.uint32();h>>>3===1?(c.dim&&c.dim.length||(c.dim=[]),c.dim.push(d.onnx.TensorShapeProto.Dimension.decode(r,r.uint32()))):r.skipType(h&7)}return c},o.decodeDelimited=function(r){return r instanceof s||(r=new s(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.dim!=null&&r.hasOwnProperty("dim")){if(!Array.isArray(r.dim))return"dim: array expected";for(var i=0;i<r.dim.length;++i){var a=d.onnx.TensorShapeProto.Dimension.verify(r.dim[i]);if(a)return"dim."+a}}return null},o.fromObject=function(r){if(r instanceof d.onnx.TensorShapeProto)return r;var i=new d.onnx.TensorShapeProto;if(r.dim){if(!Array.isArray(r.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");i.dim=[];for(var a=0;a<r.dim.length;++a){if(typeof r.dim[a]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");i.dim[a]=d.onnx.TensorShapeProto.Dimension.fromObject(r.dim[a])}}return i},o.toObject=function(r,i){i||(i={});var a={};if((i.arrays||i.defaults)&&(a.dim=[]),r.dim&&r.dim.length){a.dim=[];for(var c=0;c<r.dim.length;++c)a.dim[c]=d.onnx.TensorShapeProto.Dimension.toObject(r.dim[c],i)}return a},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.TensorShapeProto"},o.Dimension=(function(){function r(a){if(a)for(var c=Object.keys(a),h=0;h<c.length;++h)a[c[h]]!=null&&(this[c[h]]=a[c[h]])}r.prototype.dimValue=null,r.prototype.dimParam=null,r.prototype.denotation="";var i;return Object.defineProperty(r.prototype,"value",{get:l.oneOfGetter(i=["dimValue","dimParam"]),set:l.oneOfSetter(i)}),r.create=function(a){return new r(a)},r.encode=function(a,c){return c||(c=u.create()),a.dimValue!=null&&Object.hasOwnProperty.call(a,"dimValue")&&c.uint32(8).int64(a.dimValue),a.dimParam!=null&&Object.hasOwnProperty.call(a,"dimParam")&&c.uint32(18).string(a.dimParam),a.denotation!=null&&Object.hasOwnProperty.call(a,"denotation")&&c.uint32(26).string(a.denotation),c},r.encodeDelimited=function(a,c){return this.encode(a,c).ldelim()},r.decode=function(a,c){a instanceof s||(a=s.create(a));for(var h=c===void 0?a.len:a.pos+c,m=new d.onnx.TensorShapeProto.Dimension;a.pos<h;){var b=a.uint32();switch(b>>>3){case 1:{m.dimValue=a.int64();break}case 2:{m.dimParam=a.string();break}case 3:{m.denotation=a.string();break}default:a.skipType(b&7);break}}return m},r.decodeDelimited=function(a){return a instanceof s||(a=new s(a)),this.decode(a,a.uint32())},r.verify=function(a){if(typeof a!="object"||a===null)return"object expected";var c={};if(a.dimValue!=null&&a.hasOwnProperty("dimValue")&&(c.value=1,!l.isInteger(a.dimValue)&&!(a.dimValue&&l.isInteger(a.dimValue.low)&&l.isInteger(a.dimValue.high))))return"dimValue: integer|Long expected";if(a.dimParam!=null&&a.hasOwnProperty("dimParam")){if(c.value===1)return"value: multiple values";if(c.value=1,!l.isString(a.dimParam))return"dimParam: string expected"}return a.denotation!=null&&a.hasOwnProperty("denotation")&&!l.isString(a.denotation)?"denotation: string expected":null},r.fromObject=function(a){if(a instanceof d.onnx.TensorShapeProto.Dimension)return a;var c=new d.onnx.TensorShapeProto.Dimension;return a.dimValue!=null&&(l.Long?(c.dimValue=l.Long.fromValue(a.dimValue)).unsigned=!1:typeof a.dimValue=="string"?c.dimValue=parseInt(a.dimValue,10):typeof a.dimValue=="number"?c.dimValue=a.dimValue:typeof a.dimValue=="object"&&(c.dimValue=new l.LongBits(a.dimValue.low>>>0,a.dimValue.high>>>0).toNumber())),a.dimParam!=null&&(c.dimParam=String(a.dimParam)),a.denotation!=null&&(c.denotation=String(a.denotation)),c},r.toObject=function(a,c){c||(c={});var h={};return c.defaults&&(h.denotation=""),a.dimValue!=null&&a.hasOwnProperty("dimValue")&&(typeof a.dimValue=="number"?h.dimValue=c.longs===String?String(a.dimValue):a.dimValue:h.dimValue=c.longs===String?l.Long.prototype.toString.call(a.dimValue):c.longs===Number?new l.LongBits(a.dimValue.low>>>0,a.dimValue.high>>>0).toNumber():a.dimValue,c.oneofs&&(h.value="dimValue")),a.dimParam!=null&&a.hasOwnProperty("dimParam")&&(h.dimParam=a.dimParam,c.oneofs&&(h.value="dimParam")),a.denotation!=null&&a.hasOwnProperty("denotation")&&(h.denotation=a.denotation),h},r.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},r.getTypeUrl=function(a){return a===void 0&&(a="type.googleapis.com"),a+"/onnx.TensorShapeProto.Dimension"},r})(),o})(),p.TypeProto=(function(){function o(i){if(i)for(var a=Object.keys(i),c=0;c<a.length;++c)i[a[c]]!=null&&(this[a[c]]=i[a[c]])}o.prototype.tensorType=null,o.prototype.sequenceType=null,o.prototype.mapType=null,o.prototype.optionalType=null,o.prototype.sparseTensorType=null,o.prototype.denotation="";var r;return Object.defineProperty(o.prototype,"value",{get:l.oneOfGetter(r=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:l.oneOfSetter(r)}),o.create=function(i){return new o(i)},o.encode=function(i,a){return a||(a=u.create()),i.tensorType!=null&&Object.hasOwnProperty.call(i,"tensorType")&&d.onnx.TypeProto.Tensor.encode(i.tensorType,a.uint32(10).fork()).ldelim(),i.sequenceType!=null&&Object.hasOwnProperty.call(i,"sequenceType")&&d.onnx.TypeProto.Sequence.encode(i.sequenceType,a.uint32(34).fork()).ldelim(),i.mapType!=null&&Object.hasOwnProperty.call(i,"mapType")&&d.onnx.TypeProto.Map.encode(i.mapType,a.uint32(42).fork()).ldelim(),i.denotation!=null&&Object.hasOwnProperty.call(i,"denotation")&&a.uint32(50).string(i.denotation),i.sparseTensorType!=null&&Object.hasOwnProperty.call(i,"sparseTensorType")&&d.onnx.TypeProto.SparseTensor.encode(i.sparseTensorType,a.uint32(66).fork()).ldelim(),i.optionalType!=null&&Object.hasOwnProperty.call(i,"optionalType")&&d.onnx.TypeProto.Optional.encode(i.optionalType,a.uint32(74).fork()).ldelim(),a},o.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},o.decode=function(i,a){i instanceof s||(i=s.create(i));for(var c=a===void 0?i.len:i.pos+a,h=new d.onnx.TypeProto;i.pos<c;){var m=i.uint32();switch(m>>>3){case 1:{h.tensorType=d.onnx.TypeProto.Tensor.decode(i,i.uint32());break}case 4:{h.sequenceType=d.onnx.TypeProto.Sequence.decode(i,i.uint32());break}case 5:{h.mapType=d.onnx.TypeProto.Map.decode(i,i.uint32());break}case 9:{h.optionalType=d.onnx.TypeProto.Optional.decode(i,i.uint32());break}case 8:{h.sparseTensorType=d.onnx.TypeProto.SparseTensor.decode(i,i.uint32());break}case 6:{h.denotation=i.string();break}default:i.skipType(m&7);break}}return h},o.decodeDelimited=function(i){return i instanceof s||(i=new s(i)),this.decode(i,i.uint32())},o.verify=function(i){if(typeof i!="object"||i===null)return"object expected";var a={};if(i.tensorType!=null&&i.hasOwnProperty("tensorType")){a.value=1;{var c=d.onnx.TypeProto.Tensor.verify(i.tensorType);if(c)return"tensorType."+c}}if(i.sequenceType!=null&&i.hasOwnProperty("sequenceType")){if(a.value===1)return"value: multiple values";a.value=1;{var c=d.onnx.TypeProto.Sequence.verify(i.sequenceType);if(c)return"sequenceType."+c}}if(i.mapType!=null&&i.hasOwnProperty("mapType")){if(a.value===1)return"value: multiple values";a.value=1;{var c=d.onnx.TypeProto.Map.verify(i.mapType);if(c)return"mapType."+c}}if(i.optionalType!=null&&i.hasOwnProperty("optionalType")){if(a.value===1)return"value: multiple values";a.value=1;{var c=d.onnx.TypeProto.Optional.verify(i.optionalType);if(c)return"optionalType."+c}}if(i.sparseTensorType!=null&&i.hasOwnProperty("sparseTensorType")){if(a.value===1)return"value: multiple values";a.value=1;{var c=d.onnx.TypeProto.SparseTensor.verify(i.sparseTensorType);if(c)return"sparseTensorType."+c}}return i.denotation!=null&&i.hasOwnProperty("denotation")&&!l.isString(i.denotation)?"denotation: string expected":null},o.fromObject=function(i){if(i instanceof d.onnx.TypeProto)return i;var a=new d.onnx.TypeProto;if(i.tensorType!=null){if(typeof i.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");a.tensorType=d.onnx.TypeProto.Tensor.fromObject(i.tensorType)}if(i.sequenceType!=null){if(typeof i.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");a.sequenceType=d.onnx.TypeProto.Sequence.fromObject(i.sequenceType)}if(i.mapType!=null){if(typeof i.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");a.mapType=d.onnx.TypeProto.Map.fromObject(i.mapType)}if(i.optionalType!=null){if(typeof i.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");a.optionalType=d.onnx.TypeProto.Optional.fromObject(i.optionalType)}if(i.sparseTensorType!=null){if(typeof i.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");a.sparseTensorType=d.onnx.TypeProto.SparseTensor.fromObject(i.sparseTensorType)}return i.denotation!=null&&(a.denotation=String(i.denotation)),a},o.toObject=function(i,a){a||(a={});var c={};return a.defaults&&(c.denotation=""),i.tensorType!=null&&i.hasOwnProperty("tensorType")&&(c.tensorType=d.onnx.TypeProto.Tensor.toObject(i.tensorType,a),a.oneofs&&(c.value="tensorType")),i.sequenceType!=null&&i.hasOwnProperty("sequenceType")&&(c.sequenceType=d.onnx.TypeProto.Sequence.toObject(i.sequenceType,a),a.oneofs&&(c.value="sequenceType")),i.mapType!=null&&i.hasOwnProperty("mapType")&&(c.mapType=d.onnx.TypeProto.Map.toObject(i.mapType,a),a.oneofs&&(c.value="mapType")),i.denotation!=null&&i.hasOwnProperty("denotation")&&(c.denotation=i.denotation),i.sparseTensorType!=null&&i.hasOwnProperty("sparseTensorType")&&(c.sparseTensorType=d.onnx.TypeProto.SparseTensor.toObject(i.sparseTensorType,a),a.oneofs&&(c.value="sparseTensorType")),i.optionalType!=null&&i.hasOwnProperty("optionalType")&&(c.optionalType=d.onnx.TypeProto.Optional.toObject(i.optionalType,a),a.oneofs&&(c.value="optionalType")),c},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto"},o.Tensor=(function(){function i(a){if(a)for(var c=Object.keys(a),h=0;h<c.length;++h)a[c[h]]!=null&&(this[c[h]]=a[c[h]])}return i.prototype.elemType=0,i.prototype.shape=null,i.create=function(a){return new i(a)},i.encode=function(a,c){return c||(c=u.create()),a.elemType!=null&&Object.hasOwnProperty.call(a,"elemType")&&c.uint32(8).int32(a.elemType),a.shape!=null&&Object.hasOwnProperty.call(a,"shape")&&d.onnx.TensorShapeProto.encode(a.shape,c.uint32(18).fork()).ldelim(),c},i.encodeDelimited=function(a,c){return this.encode(a,c).ldelim()},i.decode=function(a,c){a instanceof s||(a=s.create(a));for(var h=c===void 0?a.len:a.pos+c,m=new d.onnx.TypeProto.Tensor;a.pos<h;){var b=a.uint32();switch(b>>>3){case 1:{m.elemType=a.int32();break}case 2:{m.shape=d.onnx.TensorShapeProto.decode(a,a.uint32());break}default:a.skipType(b&7);break}}return m},i.decodeDelimited=function(a){return a instanceof s||(a=new s(a)),this.decode(a,a.uint32())},i.verify=function(a){if(typeof a!="object"||a===null)return"object expected";if(a.elemType!=null&&a.hasOwnProperty("elemType")&&!l.isInteger(a.elemType))return"elemType: integer expected";if(a.shape!=null&&a.hasOwnProperty("shape")){var c=d.onnx.TensorShapeProto.verify(a.shape);if(c)return"shape."+c}return null},i.fromObject=function(a){if(a instanceof d.onnx.TypeProto.Tensor)return a;var c=new d.onnx.TypeProto.Tensor;if(a.elemType!=null&&(c.elemType=a.elemType|0),a.shape!=null){if(typeof a.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");c.shape=d.onnx.TensorShapeProto.fromObject(a.shape)}return c},i.toObject=function(a,c){c||(c={});var h={};return c.defaults&&(h.elemType=0,h.shape=null),a.elemType!=null&&a.hasOwnProperty("elemType")&&(h.elemType=a.elemType),a.shape!=null&&a.hasOwnProperty("shape")&&(h.shape=d.onnx.TensorShapeProto.toObject(a.shape,c)),h},i.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},i.getTypeUrl=function(a){return a===void 0&&(a="type.googleapis.com"),a+"/onnx.TypeProto.Tensor"},i})(),o.Sequence=(function(){function i(a){if(a)for(var c=Object.keys(a),h=0;h<c.length;++h)a[c[h]]!=null&&(this[c[h]]=a[c[h]])}return i.prototype.elemType=null,i.create=function(a){return new i(a)},i.encode=function(a,c){return c||(c=u.create()),a.elemType!=null&&Object.hasOwnProperty.call(a,"elemType")&&d.onnx.TypeProto.encode(a.elemType,c.uint32(10).fork()).ldelim(),c},i.encodeDelimited=function(a,c){return this.encode(a,c).ldelim()},i.decode=function(a,c){a instanceof s||(a=s.create(a));for(var h=c===void 0?a.len:a.pos+c,m=new d.onnx.TypeProto.Sequence;a.pos<h;){var b=a.uint32();b>>>3===1?m.elemType=d.onnx.TypeProto.decode(a,a.uint32()):a.skipType(b&7)}return m},i.decodeDelimited=function(a){return a instanceof s||(a=new s(a)),this.decode(a,a.uint32())},i.verify=function(a){if(typeof a!="object"||a===null)return"object expected";if(a.elemType!=null&&a.hasOwnProperty("elemType")){var c=d.onnx.TypeProto.verify(a.elemType);if(c)return"elemType."+c}return null},i.fromObject=function(a){if(a instanceof d.onnx.TypeProto.Sequence)return a;var c=new d.onnx.TypeProto.Sequence;if(a.elemType!=null){if(typeof a.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");c.elemType=d.onnx.TypeProto.fromObject(a.elemType)}return c},i.toObject=function(a,c){c||(c={});var h={};return c.defaults&&(h.elemType=null),a.elemType!=null&&a.hasOwnProperty("elemType")&&(h.elemType=d.onnx.TypeProto.toObject(a.elemType,c)),h},i.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},i.getTypeUrl=function(a){return a===void 0&&(a="type.googleapis.com"),a+"/onnx.TypeProto.Sequence"},i})(),o.Map=(function(){function i(a){if(a)for(var c=Object.keys(a),h=0;h<c.length;++h)a[c[h]]!=null&&(this[c[h]]=a[c[h]])}return i.prototype.keyType=0,i.prototype.valueType=null,i.create=function(a){return new i(a)},i.encode=function(a,c){return c||(c=u.create()),a.keyType!=null&&Object.hasOwnProperty.call(a,"keyType")&&c.uint32(8).int32(a.keyType),a.valueType!=null&&Object.hasOwnProperty.call(a,"valueType")&&d.onnx.TypeProto.encode(a.valueType,c.uint32(18).fork()).ldelim(),c},i.encodeDelimited=function(a,c){return this.encode(a,c).ldelim()},i.decode=function(a,c){a instanceof s||(a=s.create(a));for(var h=c===void 0?a.len:a.pos+c,m=new d.onnx.TypeProto.Map;a.pos<h;){var b=a.uint32();switch(b>>>3){case 1:{m.keyType=a.int32();break}case 2:{m.valueType=d.onnx.TypeProto.decode(a,a.uint32());break}default:a.skipType(b&7);break}}return m},i.decodeDelimited=function(a){return a instanceof s||(a=new s(a)),this.decode(a,a.uint32())},i.verify=function(a){if(typeof a!="object"||a===null)return"object expected";if(a.keyType!=null&&a.hasOwnProperty("keyType")&&!l.isInteger(a.keyType))return"keyType: integer expected";if(a.valueType!=null&&a.hasOwnProperty("valueType")){var c=d.onnx.TypeProto.verify(a.valueType);if(c)return"valueType."+c}return null},i.fromObject=function(a){if(a instanceof d.onnx.TypeProto.Map)return a;var c=new d.onnx.TypeProto.Map;if(a.keyType!=null&&(c.keyType=a.keyType|0),a.valueType!=null){if(typeof a.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");c.valueType=d.onnx.TypeProto.fromObject(a.valueType)}return c},i.toObject=function(a,c){c||(c={});var h={};return c.defaults&&(h.keyType=0,h.valueType=null),a.keyType!=null&&a.hasOwnProperty("keyType")&&(h.keyType=a.keyType),a.valueType!=null&&a.hasOwnProperty("valueType")&&(h.valueType=d.onnx.TypeProto.toObject(a.valueType,c)),h},i.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},i.getTypeUrl=function(a){return a===void 0&&(a="type.googleapis.com"),a+"/onnx.TypeProto.Map"},i})(),o.Optional=(function(){function i(a){if(a)for(var c=Object.keys(a),h=0;h<c.length;++h)a[c[h]]!=null&&(this[c[h]]=a[c[h]])}return i.prototype.elemType=null,i.create=function(a){return new i(a)},i.encode=function(a,c){return c||(c=u.create()),a.elemType!=null&&Object.hasOwnProperty.call(a,"elemType")&&d.onnx.TypeProto.encode(a.elemType,c.uint32(10).fork()).ldelim(),c},i.encodeDelimited=function(a,c){return this.encode(a,c).ldelim()},i.decode=function(a,c){a instanceof s||(a=s.create(a));for(var h=c===void 0?a.len:a.pos+c,m=new d.onnx.TypeProto.Optional;a.pos<h;){var b=a.uint32();b>>>3===1?m.elemType=d.onnx.TypeProto.decode(a,a.uint32()):a.skipType(b&7)}return m},i.decodeDelimited=function(a){return a instanceof s||(a=new s(a)),this.decode(a,a.uint32())},i.verify=function(a){if(typeof a!="object"||a===null)return"object expected";if(a.elemType!=null&&a.hasOwnProperty("elemType")){var c=d.onnx.TypeProto.verify(a.elemType);if(c)return"elemType."+c}return null},i.fromObject=function(a){if(a instanceof d.onnx.TypeProto.Optional)return a;var c=new d.onnx.TypeProto.Optional;if(a.elemType!=null){if(typeof a.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");c.elemType=d.onnx.TypeProto.fromObject(a.elemType)}return c},i.toObject=function(a,c){c||(c={});var h={};return c.defaults&&(h.elemType=null),a.elemType!=null&&a.hasOwnProperty("elemType")&&(h.elemType=d.onnx.TypeProto.toObject(a.elemType,c)),h},i.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},i.getTypeUrl=function(a){return a===void 0&&(a="type.googleapis.com"),a+"/onnx.TypeProto.Optional"},i})(),o.SparseTensor=(function(){function i(a){if(a)for(var c=Object.keys(a),h=0;h<c.length;++h)a[c[h]]!=null&&(this[c[h]]=a[c[h]])}return i.prototype.elemType=0,i.prototype.shape=null,i.create=function(a){return new i(a)},i.encode=function(a,c){return c||(c=u.create()),a.elemType!=null&&Object.hasOwnProperty.call(a,"elemType")&&c.uint32(8).int32(a.elemType),a.shape!=null&&Object.hasOwnProperty.call(a,"shape")&&d.onnx.TensorShapeProto.encode(a.shape,c.uint32(18).fork()).ldelim(),c},i.encodeDelimited=function(a,c){return this.encode(a,c).ldelim()},i.decode=function(a,c){a instanceof s||(a=s.create(a));for(var h=c===void 0?a.len:a.pos+c,m=new d.onnx.TypeProto.SparseTensor;a.pos<h;){var b=a.uint32();switch(b>>>3){case 1:{m.elemType=a.int32();break}case 2:{m.shape=d.onnx.TensorShapeProto.decode(a,a.uint32());break}default:a.skipType(b&7);break}}return m},i.decodeDelimited=function(a){return a instanceof s||(a=new s(a)),this.decode(a,a.uint32())},i.verify=function(a){if(typeof a!="object"||a===null)return"object expected";if(a.elemType!=null&&a.hasOwnProperty("elemType")&&!l.isInteger(a.elemType))return"elemType: integer expected";if(a.shape!=null&&a.hasOwnProperty("shape")){var c=d.onnx.TensorShapeProto.verify(a.shape);if(c)return"shape."+c}return null},i.fromObject=function(a){if(a instanceof d.onnx.TypeProto.SparseTensor)return a;var c=new d.onnx.TypeProto.SparseTensor;if(a.elemType!=null&&(c.elemType=a.elemType|0),a.shape!=null){if(typeof a.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");c.shape=d.onnx.TensorShapeProto.fromObject(a.shape)}return c},i.toObject=function(a,c){c||(c={});var h={};return c.defaults&&(h.elemType=0,h.shape=null),a.elemType!=null&&a.hasOwnProperty("elemType")&&(h.elemType=a.elemType),a.shape!=null&&a.hasOwnProperty("shape")&&(h.shape=d.onnx.TensorShapeProto.toObject(a.shape,c)),h},i.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},i.getTypeUrl=function(a){return a===void 0&&(a="type.googleapis.com"),a+"/onnx.TypeProto.SparseTensor"},i})(),o})(),p.OperatorSetIdProto=(function(){function o(r){if(r)for(var i=Object.keys(r),a=0;a<i.length;++a)r[i[a]]!=null&&(this[i[a]]=r[i[a]])}return o.prototype.domain="",o.prototype.version=l.Long?l.Long.fromBits(0,0,!1):0,o.create=function(r){return new o(r)},o.encode=function(r,i){return i||(i=u.create()),r.domain!=null&&Object.hasOwnProperty.call(r,"domain")&&i.uint32(10).string(r.domain),r.version!=null&&Object.hasOwnProperty.call(r,"version")&&i.uint32(16).int64(r.version),i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof s||(r=s.create(r));for(var a=i===void 0?r.len:r.pos+i,c=new d.onnx.OperatorSetIdProto;r.pos<a;){var h=r.uint32();switch(h>>>3){case 1:{c.domain=r.string();break}case 2:{c.version=r.int64();break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof s||(r=new s(r)),this.decode(r,r.uint32())},o.verify=function(r){return typeof r!="object"||r===null?"object expected":r.domain!=null&&r.hasOwnProperty("domain")&&!l.isString(r.domain)?"domain: string expected":r.version!=null&&r.hasOwnProperty("version")&&!l.isInteger(r.version)&&!(r.version&&l.isInteger(r.version.low)&&l.isInteger(r.version.high))?"version: integer|Long expected":null},o.fromObject=function(r){if(r instanceof d.onnx.OperatorSetIdProto)return r;var i=new d.onnx.OperatorSetIdProto;return r.domain!=null&&(i.domain=String(r.domain)),r.version!=null&&(l.Long?(i.version=l.Long.fromValue(r.version)).unsigned=!1:typeof r.version=="string"?i.version=parseInt(r.version,10):typeof r.version=="number"?i.version=r.version:typeof r.version=="object"&&(i.version=new l.LongBits(r.version.low>>>0,r.version.high>>>0).toNumber())),i},o.toObject=function(r,i){i||(i={});var a={};if(i.defaults)if(a.domain="",l.Long){var c=new l.Long(0,0,!1);a.version=i.longs===String?c.toString():i.longs===Number?c.toNumber():c}else a.version=i.longs===String?"0":0;return r.domain!=null&&r.hasOwnProperty("domain")&&(a.domain=r.domain),r.version!=null&&r.hasOwnProperty("version")&&(typeof r.version=="number"?a.version=i.longs===String?String(r.version):r.version:a.version=i.longs===String?l.Long.prototype.toString.call(r.version):i.longs===Number?new l.LongBits(r.version.low>>>0,r.version.high>>>0).toNumber():r.version),a},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.OperatorSetIdProto"},o})(),p.OperatorStatus=(function(){var o={},r=Object.create(o);return r[o[0]="EXPERIMENTAL"]=0,r[o[1]="STABLE"]=1,r})(),p.FunctionProto=(function(){function o(r){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],r)for(var i=Object.keys(r),a=0;a<i.length;++a)r[i[a]]!=null&&(this[i[a]]=r[i[a]])}return o.prototype.name="",o.prototype.input=l.emptyArray,o.prototype.output=l.emptyArray,o.prototype.attribute=l.emptyArray,o.prototype.attributeProto=l.emptyArray,o.prototype.node=l.emptyArray,o.prototype.docString="",o.prototype.opsetImport=l.emptyArray,o.prototype.domain="",o.create=function(r){return new o(r)},o.encode=function(r,i){if(i||(i=u.create()),r.name!=null&&Object.hasOwnProperty.call(r,"name")&&i.uint32(10).string(r.name),r.input!=null&&r.input.length)for(var a=0;a<r.input.length;++a)i.uint32(34).string(r.input[a]);if(r.output!=null&&r.output.length)for(var a=0;a<r.output.length;++a)i.uint32(42).string(r.output[a]);if(r.attribute!=null&&r.attribute.length)for(var a=0;a<r.attribute.length;++a)i.uint32(50).string(r.attribute[a]);if(r.node!=null&&r.node.length)for(var a=0;a<r.node.length;++a)d.onnx.NodeProto.encode(r.node[a],i.uint32(58).fork()).ldelim();if(r.docString!=null&&Object.hasOwnProperty.call(r,"docString")&&i.uint32(66).string(r.docString),r.opsetImport!=null&&r.opsetImport.length)for(var a=0;a<r.opsetImport.length;++a)d.onnx.OperatorSetIdProto.encode(r.opsetImport[a],i.uint32(74).fork()).ldelim();if(r.domain!=null&&Object.hasOwnProperty.call(r,"domain")&&i.uint32(82).string(r.domain),r.attributeProto!=null&&r.attributeProto.length)for(var a=0;a<r.attributeProto.length;++a)d.onnx.AttributeProto.encode(r.attributeProto[a],i.uint32(90).fork()).ldelim();return i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof s||(r=s.create(r));for(var a=i===void 0?r.len:r.pos+i,c=new d.onnx.FunctionProto;r.pos<a;){var h=r.uint32();switch(h>>>3){case 1:{c.name=r.string();break}case 4:{c.input&&c.input.length||(c.input=[]),c.input.push(r.string());break}case 5:{c.output&&c.output.length||(c.output=[]),c.output.push(r.string());break}case 6:{c.attribute&&c.attribute.length||(c.attribute=[]),c.attribute.push(r.string());break}case 11:{c.attributeProto&&c.attributeProto.length||(c.attributeProto=[]),c.attributeProto.push(d.onnx.AttributeProto.decode(r,r.uint32()));break}case 7:{c.node&&c.node.length||(c.node=[]),c.node.push(d.onnx.NodeProto.decode(r,r.uint32()));break}case 8:{c.docString=r.string();break}case 9:{c.opsetImport&&c.opsetImport.length||(c.opsetImport=[]),c.opsetImport.push(d.onnx.OperatorSetIdProto.decode(r,r.uint32()));break}case 10:{c.domain=r.string();break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof s||(r=new s(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.name!=null&&r.hasOwnProperty("name")&&!l.isString(r.name))return"name: string expected";if(r.input!=null&&r.hasOwnProperty("input")){if(!Array.isArray(r.input))return"input: array expected";for(var i=0;i<r.input.length;++i)if(!l.isString(r.input[i]))return"input: string[] expected"}if(r.output!=null&&r.hasOwnProperty("output")){if(!Array.isArray(r.output))return"output: array expected";for(var i=0;i<r.output.length;++i)if(!l.isString(r.output[i]))return"output: string[] expected"}if(r.attribute!=null&&r.hasOwnProperty("attribute")){if(!Array.isArray(r.attribute))return"attribute: array expected";for(var i=0;i<r.attribute.length;++i)if(!l.isString(r.attribute[i]))return"attribute: string[] expected"}if(r.attributeProto!=null&&r.hasOwnProperty("attributeProto")){if(!Array.isArray(r.attributeProto))return"attributeProto: array expected";for(var i=0;i<r.attributeProto.length;++i){var a=d.onnx.AttributeProto.verify(r.attributeProto[i]);if(a)return"attributeProto."+a}}if(r.node!=null&&r.hasOwnProperty("node")){if(!Array.isArray(r.node))return"node: array expected";for(var i=0;i<r.node.length;++i){var a=d.onnx.NodeProto.verify(r.node[i]);if(a)return"node."+a}}if(r.docString!=null&&r.hasOwnProperty("docString")&&!l.isString(r.docString))return"docString: string expected";if(r.opsetImport!=null&&r.hasOwnProperty("opsetImport")){if(!Array.isArray(r.opsetImport))return"opsetImport: array expected";for(var i=0;i<r.opsetImport.length;++i){var a=d.onnx.OperatorSetIdProto.verify(r.opsetImport[i]);if(a)return"opsetImport."+a}}return r.domain!=null&&r.hasOwnProperty("domain")&&!l.isString(r.domain)?"domain: string expected":null},o.fromObject=function(r){if(r instanceof d.onnx.FunctionProto)return r;var i=new d.onnx.FunctionProto;if(r.name!=null&&(i.name=String(r.name)),r.input){if(!Array.isArray(r.input))throw TypeError(".onnx.FunctionProto.input: array expected");i.input=[];for(var a=0;a<r.input.length;++a)i.input[a]=String(r.input[a])}if(r.output){if(!Array.isArray(r.output))throw TypeError(".onnx.FunctionProto.output: array expected");i.output=[];for(var a=0;a<r.output.length;++a)i.output[a]=String(r.output[a])}if(r.attribute){if(!Array.isArray(r.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");i.attribute=[];for(var a=0;a<r.attribute.length;++a)i.attribute[a]=String(r.attribute[a])}if(r.attributeProto){if(!Array.isArray(r.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");i.attributeProto=[];for(var a=0;a<r.attributeProto.length;++a){if(typeof r.attributeProto[a]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");i.attributeProto[a]=d.onnx.AttributeProto.fromObject(r.attributeProto[a])}}if(r.node){if(!Array.isArray(r.node))throw TypeError(".onnx.FunctionProto.node: array expected");i.node=[];for(var a=0;a<r.node.length;++a){if(typeof r.node[a]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");i.node[a]=d.onnx.NodeProto.fromObject(r.node[a])}}if(r.docString!=null&&(i.docString=String(r.docString)),r.opsetImport){if(!Array.isArray(r.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");i.opsetImport=[];for(var a=0;a<r.opsetImport.length;++a){if(typeof r.opsetImport[a]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");i.opsetImport[a]=d.onnx.OperatorSetIdProto.fromObject(r.opsetImport[a])}}return r.domain!=null&&(i.domain=String(r.domain)),i},o.toObject=function(r,i){i||(i={});var a={};if((i.arrays||i.defaults)&&(a.input=[],a.output=[],a.attribute=[],a.node=[],a.opsetImport=[],a.attributeProto=[]),i.defaults&&(a.name="",a.docString="",a.domain=""),r.name!=null&&r.hasOwnProperty("name")&&(a.name=r.name),r.input&&r.input.length){a.input=[];for(var c=0;c<r.input.length;++c)a.input[c]=r.input[c]}if(r.output&&r.output.length){a.output=[];for(var c=0;c<r.output.length;++c)a.output[c]=r.output[c]}if(r.attribute&&r.attribute.length){a.attribute=[];for(var c=0;c<r.attribute.length;++c)a.attribute[c]=r.attribute[c]}if(r.node&&r.node.length){a.node=[];for(var c=0;c<r.node.length;++c)a.node[c]=d.onnx.NodeProto.toObject(r.node[c],i)}if(r.docString!=null&&r.hasOwnProperty("docString")&&(a.docString=r.docString),r.opsetImport&&r.opsetImport.length){a.opsetImport=[];for(var c=0;c<r.opsetImport.length;++c)a.opsetImport[c]=d.onnx.OperatorSetIdProto.toObject(r.opsetImport[c],i)}if(r.domain!=null&&r.hasOwnProperty("domain")&&(a.domain=r.domain),r.attributeProto&&r.attributeProto.length){a.attributeProto=[];for(var c=0;c<r.attributeProto.length;++c)a.attributeProto[c]=d.onnx.AttributeProto.toObject(r.attributeProto[c],i)}return a},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.FunctionProto"},o})(),p})(),t.exports=d});function uy(e,t){if(!e)throw new Error(typeof t=="string"?t:t())}function Is(e){return new TextDecoder().decode(e)}var Be,Fn,Zd,jt,ly,dt,Bt,fe,Ss,Vi,Yn,Qn,ke=N(()=>{"use strict";yb(),Be=ce(ri()),hn(),Fn=class{static arraysEqual(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}},Zd=class{static preprocessInputShapes(e,t){let n=e.length===1?[1,e[0]]:e,s=t.length===1?[t[0],1]:t;return[n,s]}static postprocessOutputShape(e,t,n){t===1&&e.splice(e.length-2,1),n===1&&e.pop()}static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},jt=class Ln{static calcShape(t,n,s=!1){let u=t.length,l=n.length;if(u===0)return n;if(l===0)return t;let d=Math.max(t.length,n.length),p=new Array(d);if(s){if(u<2||l<2)return;let o=Zd.calcMatMulShape([t[u-2],t[u-1]],[n[l-2],n[l-1]]);if(o===void 0)return;[p[d-2],p[d-1]]=o}for(let o=s?3:1;o<=d;o++){let r=u-o<0?1:t[u-o],i=l-o<0?1:n[l-o];if(r!==i&&r>1&&i>1)return;p[d-o]=Math.max(r,i)}return p}static index(t,n){let s=new Array(n.length);return Ln.fillIndex(t,n,s),s}static fillIndex(t,n,s){let u=t.length-n.length;for(let l=0;l<n.length;l++)s[l]=t[u+l]%n[l]}static calc(t,n,s,u,l){let d=Ln.calcShape(t.dims,n.dims);if(d){if(u&&!fe.areEqual(d,t.dims))return;let p=fe.size(d),o=u?t:new ct(d,l||t.type);if(d.length===0)o.set([],s(t.get([]),n.get([])));else{let r=new Array(d.length),i=new Array(t.dims.length),a=new Array(n.dims.length),c=0,h=0,m=!1,b=!1;t.dims.length===0&&(c=t.get([]),m=!0),n.dims.length===0&&(h=n.get([]),b=!0);let x;for(let v=0;v<p;v++){x=v;for(let w=d.length-1;w>=0;w--)r[w]=x%d[w],x=Math.floor(x/d[w]);m||(Ln.fillIndex(r,t.dims,i),c=t.get(i)),b||(Ln.fillIndex(r,n.dims,a),h=n.get(a)),o.set(r,s(c,h))}}return o}}static isValidBroadcast(t,n){let s=t.length,u=n.length;if(s>u)return!1;for(let l=1;l<=s;l++)if(t[s-l]!==1&&t[s-l]!==n[u-l])return!1;return!0}static getBroadcastDims(t,n){let s=t.length,u=[];for(let l=0;l<s;l++){let d=s-1-l,p=t[d]||1;(n[n.length-1-l]||1)>1&&p===1&&u.unshift(d)}return u}},ly=class{static getShapeOfGemmResult(e,t,n,s,u){if(e.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let l,d,p;t?(l=e[1],d=e[0]):(l=e[0],d=e[1]);let o=-1;if(s?(p=n[0],o=1):(p=n[1],o=0),n[o]!==d)throw new Error("dimension mismatch");if(l<=0||p<=0||d<=0)throw new Error("invalid shape specified");if(u&&!jt.isValidBroadcast(u,[l,p]))throw new Error("gemm: invalid bias shape for broadcast");return[l,p,d]}},dt=class Os{static tensorDataTypeFromProto(t){switch(t){case Be.onnx.TensorProto.DataType.INT8:return"int8";case Be.onnx.TensorProto.DataType.UINT8:return"uint8";case Be.onnx.TensorProto.DataType.BOOL:return"bool";case Be.onnx.TensorProto.DataType.INT16:return"int16";case Be.onnx.TensorProto.DataType.UINT16:return"uint16";case Be.onnx.TensorProto.DataType.INT32:return"int32";case Be.onnx.TensorProto.DataType.UINT32:return"uint32";case Be.onnx.TensorProto.DataType.FLOAT:return"float32";case Be.onnx.TensorProto.DataType.DOUBLE:return"float64";case Be.onnx.TensorProto.DataType.STRING:return"string";case Be.onnx.TensorProto.DataType.INT64:return"int32";case Be.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${Be.onnx.TensorProto.DataType[t]}`)}}static tensorDataTypeStringToEnum(t){switch(t){case"int8":return Be.onnx.TensorProto.DataType.INT8;case"uint8":return Be.onnx.TensorProto.DataType.UINT8;case"bool":return Be.onnx.TensorProto.DataType.BOOL;case"int16":return Be.onnx.TensorProto.DataType.INT16;case"uint16":return Be.onnx.TensorProto.DataType.UINT16;case"int32":return Be.onnx.TensorProto.DataType.INT32;case"uint32":return Be.onnx.TensorProto.DataType.UINT32;case"float32":return Be.onnx.TensorProto.DataType.FLOAT;case"float64":return Be.onnx.TensorProto.DataType.DOUBLE;case"string":return Be.onnx.TensorProto.DataType.STRING;case"int64":return Be.onnx.TensorProto.DataType.INT64;case"uint64":return Be.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${t}`)}}static tensorDimsFromProto(t){return t.map(n=>Gr.isLong(n)?n.toNumber():n)}static tensorValueTypeFromProto(t){return{tensorType:Os.tensorDataTypeFromProto(t.elemType),shape:{dims:Os.tensorDimsFromProto(t.shape.dim.map(n=>n.dimValue))}}}static tensorDimsFromORTFormat(t){let n=[];for(let s=0;s<t.dimsLength();s++)n.push(Bt.longToNumber(t.dims(s)));return n}static tensorAttributesFromORTFormat(t){let n=[];for(let s=0;s<t.attributesLength();s++)n.push(t.attributes(s));return n}},Bt=class{static longToNumber(e){return Gr.isLong(e)?e.toNumber():typeof e=="bigint"?Number(e):e}static isLong(e){return Gr.isLong(e)||typeof e=="bigint"}},fe=class ur{static size(t){return ur.getSizeFromDimensionRange(t,0,t.length)}static sizeFromDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return ur.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return ur.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(t,n,s){let u=1;for(let l=n;l<s;l++){if(t[l]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");u*=t[l]}return u}static computeStrides(t){let n=t.length;if(n===0)return[];if(n===1)return[1];let s=new Array(n);s[n-1]=1,s[n-2]=t[n-1];for(let u=n-3;u>=0;--u)s[u]=s[u+1]*t[u+1];return s}static transpose(t){return t.slice().reverse()}static indicesToOffset(t,n,s){s===void 0&&(s=t.length);let u=0;for(let l=0;l<s;++l)u+=n[l]*t[l];return u}static offsetToIndices(t,n){let s=n.length;if(s===0)return[];if(s===1)return[t*n[0]];let u=new Array(n.length);for(let l=0;l<u.length-1;++l)u[l]=Math.floor(t/n[l]),t-=u[l]*n[l];return u[u.length-1]=t,u}static normalizeAxis(t,n){if(t<-n&&t>=n)throw new Error("unsupported axis for this operation.");return t<0?t+n:t}static normalizeAxes(t,n){return t.map(s=>this.normalizeAxis(s,n))}static incrementIndex(t,n,s){if(n.length===0||t.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(s===void 0)s=n.length;else if(s<=0||s>n.length)throw new Error("Incorrect axis to increment on");for(let u=s-1;u>=0&&(t[u]++,!(t[u]<n[u]));--u)t[u]=0}static calculateReshapedDims(t,n){if(n.length===0){if(t.length===0||ur.size(t)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let s=n.length,u=new Array(s),l=-1,d=1;for(let o=0;o<s;o++){if(n[o]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(n[o]===-1){if(l!==-1)throw new Error("at most one dimension in shape hints can be -1");l=o}else{if(n[o]===0){if(o>=t.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");u[o]=t[o]}else u[o]=n[o];d*=u[o]}}let p=ur.size(t);if(l!==-1){if(p%d!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${t}] Output shape: [${n}]`);u[l]=p/d}else if(d!==p)throw new Error("reshapedDims and originalDims don't have matching sizes");return u}static sortBasedOnPerm(t,n){return n?n.map(s=>t[s]):t.slice().reverse()}static padShape(t,n){let s=t.length;return t.map((u,l)=>u+n[l]+n[l+s])}static areEqual(t,n){return t.length!==n.length?!1:t.every((s,u)=>s===n[u])}static validateDimsAndCalcSize(t){if(t.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let n=1;for(let s of t){if(!Number.isInteger(s))throw new TypeError(`Invalid shape: ${s} is not an integer`);if(s<0||s>2147483647)throw new TypeError(`Invalid shape: length ${s} is not allowed`);n*=s}return n}static flattenShape(t,n){n<0&&(n+=t.length);let s=t.reduce((l,d)=>l*d,1),u=t.slice(n).reduce((l,d)=>l*d,1);return[s/u,u]}static squeezeShape(t,n){let s=new Array;n=ur.normalizeAxes(n,t.length);for(let u=0;u<t.length;u++){let l=n.indexOf(u)>=0;if(l&&t[u]!==1)throw new Error("squeeze an axis of size different than 1");(n.length===0&&t[u]>1||n.length>0&&!l)&&s.push(t[u])}return s}static unsqueezeShape(t,n){let s=new Array(t.length+n.length);s.fill(0);for(let l=0;l<n.length;l++){let d=ur.normalizeAxis(n[l],s.length);if(d>=s.length)throw new Error("'axes' has an out of range axis");if(s[d]!==0)throw new Error("'axes' has a duplicate axis");s[d]=1}let u=0;for(let l=0;l<s.length;l++)s[l]===0&&(s[l]=t[u++]);if(u!==t.length)throw new Error("the unsqueezed dimension could not be established");return s}},Ss=class dy{static splitShape(t,n,s,u){if(s.length===0){if(!u)throw new Error("need to know number of outputs when the 'split' attribute is not specified");dy.determineSplit(t[n],u,s)}let l=[],d=[0];for(let p=0;p<s.length;++p){p!==0&&d.push(d[p-1]+s[p-1]);let o=t.slice();o[n]=s[p],l.push(o)}return[l,d]}static determineSplit(t,n,s){if(t%n!==0)throw new Error("cannot split tensor to equal sized parts");for(let u=0;u<n;++u)s.push(t/n)}},Vi=class lr{static adjustPoolAttributes(t,n,s,u,l,d){if(!t&&s.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let p=0;p<n.length-2;p++)p>=s.length?s.push(n[p+2]):s[p]=n[p+2];for(let p=0;p<s.length;p++)if(p<u.length){if(u[p]<0)throw new Error("strides should be greater than or equal to 1")}else u.push(1);for(let p=0;p<s.length;p++)if(p<l.length){if(l[p]<0)throw new Error("dilations should be greater than or equal to 1")}else l.push(1);for(let p=0;p<s.length*2;p++)if(p<d.length){if(d[p]<0)throw new Error("pad should be greater than or equal to 1")}else d.push(0);for(let p=0;p<s.length;p++){if(s[p]<=0)throw new Error("kernel shapes need to be greater than 0");if(d[p]>=s[p]||d[p+s.length]>=s[p])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,s,u,l,d){if(d){if(l.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(u.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let p=0;p<t.length-2;p++)lr.adjustPadAndReturnShape(t[p+2],n[p],s[p],u[p],l,p,p+t.length-2,d)}}static computePoolOutputShape(t,n,s,u,l,d,p,o=0){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let r=[n[0],n[1]];return lr.computeShapeHelper(t,n,r,s,u,l,d,p,o),r}static computeConvOutputShape(t,n,s,u,l,d,p){if(t.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let o=[t[0],n[0]];return lr.computeShapeHelper(!1,t,o,s,u,l,d,p),o}static computeShapeHelper(t,n,s,u,l,d,p,o,r=0){if(t)for(let i=0;i<n.length-2;i++)s.push(1);else for(let i=0;i<n.length-2;i++)s.push(lr.adjustPadAndReturnShape(n[i+2],u[i],l[i],d[i],p,i,i+n.length-2,o,r))}static computeOutputSize(t,n,s,u,l){let d=Math.floor(t/n)+1;return l===1&&(d=Math.ceil(t/n)+1,(d-1)*n>=s+u&&(d-=1)),d}static adjustPadAndReturnShape(t,n,s,u,l,d,p,o,r=0){let i=s*(u-1)+1;if(o&&o!=="NOTSET")switch(o){case"VALID":return l[d]=0,l[p]=0,lr.computeOutputSize(t-i,n,t,0,r);case"SAME_LOWER":case"SAME_UPPER":if(s!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let a=(Math.floor((t+n-1)/n)-1)*n+u-t;return l[d]=Math.floor(o==="SAME_LOWER"?(a+1)/2:a/2),l[p]=a-l[d],lr.computeOutputSize(t+l[d]+l[p]-i,n,t,l[d],r)}default:throw new Error("Unsupported AutoPad type")}else return lr.computeOutputSize(t+l[d]+l[p]-i,n,t,l[d],r)}},Yn=-34028234663852886e22,Qn=34028234663852886e22});function KT(e){switch(e){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${e}`)}}function Jd(e){switch(e){case ye.onnx.TensorProto.DataType.UINT8:case ye.onnx.TensorProto.DataType.INT8:case ye.onnx.TensorProto.DataType.BOOL:return 1;case ye.onnx.TensorProto.DataType.UINT16:case ye.onnx.TensorProto.DataType.INT16:return 2;case ye.onnx.TensorProto.DataType.FLOAT:case ye.onnx.TensorProto.DataType.INT32:case ye.onnx.TensorProto.DataType.UINT32:return 4;case ye.onnx.TensorProto.DataType.INT64:case ye.onnx.TensorProto.DataType.DOUBLE:case ye.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${ye.onnx.TensorProto.DataType[e]}`)}}function XT(e,t){return new(py(t))(e)}function py(e){switch(e){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function Es(e,t){if(t===ye.onnx.TensorProto.DataType.INT64||t===Bi.TensorDataType.INT64){if(e.greaterThanOrEqual(2147483648)||e.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(t===ye.onnx.TensorProto.DataType.UINT32||t===Bi.TensorDataType.UINT32||t===ye.onnx.TensorProto.DataType.UINT64||t===Bi.TensorDataType.UINT64){if(e.greaterThanOrEqual(4294967296)||e.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${ye.onnx.TensorProto.DataType[t]}`);return e.toNumber()}function Yd(e,t,n){switch(t){case ye.onnx.TensorProto.DataType.BOOL:case ye.onnx.TensorProto.DataType.UINT8:return e.getUint8(n);case ye.onnx.TensorProto.DataType.INT8:return e.getInt8(n);case ye.onnx.TensorProto.DataType.UINT16:return e.getUint16(n,!0);case ye.onnx.TensorProto.DataType.INT16:return e.getInt16(n,!0);case ye.onnx.TensorProto.DataType.FLOAT:return e.getFloat32(n,!0);case ye.onnx.TensorProto.DataType.INT32:return e.getInt32(n,!0);case ye.onnx.TensorProto.DataType.UINT32:return e.getUint32(n,!0);case ye.onnx.TensorProto.DataType.INT64:return Es(Gr.fromBits(e.getUint32(n,!0),e.getUint32(n+4,!0),!1),t);case ye.onnx.TensorProto.DataType.DOUBLE:return e.getFloat64(n,!0);case ye.onnx.TensorProto.DataType.UINT64:return Es(Gr.fromBits(e.getUint32(n,!0),e.getUint32(n+4,!0),!0),t);default:throw new Error(`cannot read from DataView for type ${ye.onnx.TensorProto.DataType[t]}`)}}var Qd,ye,ct,hn=N(()=>{"use strict";Qd=ce(Y$()),yb(),ro(),ye=ce(ri()),ke(),ct=class Mi{constructor(t,n,s,u,l,d=Qd.Guid.create()){this.dims=t,this.type=n,this.dataProvider=s,this.asyncDataProvider=u,this.cache=l,this.dataId=d,this.size=fe.validateDimsAndCalcSize(t);let p=this.size,o=s===void 0&&u===void 0&&l===void 0;if(l!==void 0&&l.length!==p)throw new RangeError("Input dims doesn't match data length.");if(n==="string"){if(l!==void 0&&(!Array.isArray(l)||!l.every(r=>typeof r=="string")))throw new TypeError("cache should be a string array");o&&(this.cache=new Array(p))}else{if(l!==void 0){let r=py(n);if(!(l instanceof r))throw new TypeError(`cache should be type ${r.name}`)}if(o){let r=new ArrayBuffer(p*KT(n));this.cache=XT(r,n)}}}get data(){if(this.cache===void 0){let t=this.dataProvider(this.dataId);if(t.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=t}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(t){return this.data[fe.indicesToOffset(t,this.strides)]}set(t,n){this.data[fe.indicesToOffset(t,this.strides)]=n}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=fe.computeStrides(this.dims)),this._strides}static fromProto(t){if(!t)throw new Error("cannot construct Value from an empty tensor");let n=dt.tensorDataTypeFromProto(t.dataType),s=dt.tensorDimsFromProto(t.dims),u=new Mi(s,n);if(n==="string")t.stringData.forEach((l,d)=>{u.data[d]=Is(l)});else if(t.rawData&&typeof t.rawData.byteLength=="number"&&t.rawData.byteLength>0){let l=u.data,d=new DataView(t.rawData.buffer,t.rawData.byteOffset,t.rawData.byteLength),p=Jd(t.dataType),o=t.rawData.byteLength/p;if(t.rawData.byteLength%p!==0)throw new Error("invalid buffer length");if(l.length!==o)throw new Error("buffer length mismatch");for(let r=0;r<o;r++){let i=Yd(d,t.dataType,r*p);l[r]=i}}else{let l;switch(t.dataType){case ye.onnx.TensorProto.DataType.FLOAT:l=t.floatData;break;case ye.onnx.TensorProto.DataType.INT32:case ye.onnx.TensorProto.DataType.INT16:case ye.onnx.TensorProto.DataType.UINT16:case ye.onnx.TensorProto.DataType.INT8:case ye.onnx.TensorProto.DataType.UINT8:case ye.onnx.TensorProto.DataType.BOOL:l=t.int32Data;break;case ye.onnx.TensorProto.DataType.INT64:l=t.int64Data;break;case ye.onnx.TensorProto.DataType.DOUBLE:l=t.doubleData;break;case ye.onnx.TensorProto.DataType.UINT32:case ye.onnx.TensorProto.DataType.UINT64:l=t.uint64Data;break;default:throw new Error("unspecific error")}if(l==null)throw new Error("failed to populate data from a tensorproto value");let d=u.data;if(d.length!==l.length)throw new Error("array length mismatch");for(let p=0;p<l.length;p++){let o=l[p];Gr.isLong(o)?d[p]=Es(o,t.dataType):d[p]=o}}return u}static fromData(t,n,s){return new Mi(n,s,void 0,void 0,t)}static fromOrtTensor(t){if(!t)throw new Error("cannot construct Value from an empty tensor");let n=dt.tensorDimsFromORTFormat(t),s=dt.tensorDataTypeFromProto(t.dataType()),u=new Mi(n,s);if(s==="string")for(let l=0;l<t.stringDataLength();l++)u.data[l]=t.stringData(l);else if(t.rawDataArray()&&typeof t.rawDataLength()=="number"&&t.rawDataLength()>0){let l=u.data,d=new DataView(t.rawDataArray().buffer,t.rawDataArray().byteOffset,t.rawDataLength()),p=Jd(t.dataType()),o=t.rawDataLength()/p;if(t.rawDataLength()%p!==0)throw new Error("invalid buffer length");if(l.length!==o)throw new Error("buffer length mismatch");for(let r=0;r<o;r++){let i=Yd(d,t.dataType(),r*p);l[r]=i}}return u}}});function Te(e){return e===1?cy:hy}function ZT(e){let t=Te(e);return`${t.version}
      precision highp float;
      ${t.attribute} vec3 position;
      ${t.attribute} vec2 textureCoord;

      ${t.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function JT(e){let t=Te(e);return`${t.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${t.varyingFrag} vec2 TexCoords;
    ${t.outputDeclaration}
    const vec2 halfCR = vec2(0.5, 0.5);

    // Custom vector types to handle higher dimenalities.
    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    `}function YT(e,t){let n=Te(e);return`
  void main() {
    int indices[${t}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${n.output} = result;
  }
  `}var cy,hy,Le=N(()=>{"use strict";cy={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},hy={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}}),Se=N(()=>{"use strict"});async function ep(e,t=s=>0,n){return new Promise((s,u)=>{let l=0,d=()=>{if(e()){s();return}l++;let p=t(l);setTimeout(d,p)};d()})}function Mo(e){return uy(typeof e<"u"&&e.length!==0,()=>"empty string found for sampler name"),"get"+e.charAt(0).toUpperCase()+e.slice(1)}function QT(e){return uy(typeof e<"u"&&e.length!==0,()=>"empty string found for sampler name"),"get"+e.charAt(0).toUpperCase()+e.slice(1)+"AtOutCoords"}function Tn(e,t){let n=JSON.parse(JSON.stringify(e));return n=t,n}function In(e,t){return t.map(n=>e[n]).join(", ")}function cr(e){if(e<=1)return"int";if(e===2)return"ivec2";if(e===3)return"ivec3";if(e===4)return"ivec4";if(e===5)return"ivec5";if(e===6)return"ivec6";throw Error(`GPU for rank ${e} is not yet supported`)}function dn(e=6){return["x","y","z","w","u","v"].slice(0,e)}var Ht=N(()=>{"use strict";ke()});function e3(e,t){return dn(t).map(n=>`${e}.${n}`)}function gu(e,t){return t===1?[e]:e3(e,t)}function ni(){return`
    float getChannel(vec4 frag, int dim) {
      int modCoord = imod(dim, 2);
      return modCoord == 0 ? frag.r : frag.g;
    }

    float getChannel(vec4 frag, vec2 innerDims) {
      vec2 modCoord = mod(innerDims, 2.);
      return modCoord.x == 0. ?
        (modCoord.y == 0. ? frag.r : frag.g) :
        (modCoord.y == 0. ? frag.b : frag.a);
    }
  `}var fn=N(()=>{"use strict";Ht()});function t3(e,t,n){if(e===0)return"false";if(e===1)return`rc > ${t[0]}`;let s="";for(let u=e-2;u<e;u++)s+=`${n[u]} >= ${t[u-e+2]}`,u<e-1&&(s+="||");return s}function r3(e,t){let n=e.length;if(n===0)return"getA(), 0, 0, 0";if(n===1)return`getA(rc),
            rc + 1 >= ${e[0]} ? 0. : getA(rc + 1),
            0, 0`;let s="r, c",u="r, cp1",l="rp1, c",d="rp1, cp1",p="";if(n>2)for(let o=0;o<n-2;++o)p=p+`${t[o]},`;return`getA(${p}${s}),
          rEdge ? 0. : getA(${p}${l}),
          cEdge ? 0. : getA(${p}${u}),
          rEdge || cEdge ? 0. : getA(${p}${d})`}function n3(e,t,n,s){return e===0||e===1?"":`
    int r = ${t[e-2]};
    int c = ${t[e-1]};
    int rp1 = ${t[e-2]} + 1;
    int cp1 = ${t[e-1]} + 1;
    bool rEdge = rp1 >= ${s};
    bool cEdge = cp1 >= ${n};
    `}var jo,tp,fy,i3=N(()=>{"use strict";Le(),Se(),Ht(),fn(),jo={name:"pack",inputNames:["A"],inputTypes:[1]},tp=(e,t)=>{let n=Te(e.session.backend.glContext.version),s=t.dims,u=s.length,l=t.dims.length,d=cr(l),p=gu("rc",l),o=n3(l,p,s[s.length-2],s[s.length-1]),r;u===0?r=[1,1]:u===1?r=[s[0],1]:r=[s[l-1],s[l-2]];let i=t3(l,r,p),a=r3(s,p),c=`
        void main() {
          ${d} rc = getOutputCoords();

          if(${i}) {
            ${n.output} = vec4(0);
          } else {
            ${o}

            ${n.output} = vec4(${a});
          }
        }
      `;return{...jo,hasMain:!0,output:{dims:t.dims,type:t.type,textureType:2},shaderSource:c}},fy=(e,t)=>({...jo,get:()=>tp(e,t)})});function rp(e){if(e.length===0)return[1,1,1];let t=1;for(let n=0;n<e.length-2;++n)t*=e[n];return[t,e.length>1?e[e.length-2]:1,e[e.length-1]]}function o3(e,t){let n=!1;return e.length===0||t.length===0?n=!0:e.length<2||t.length<2?n=e[e.length-1]===t[t.length-1]:n=e[e.length-1]===t[t.length-1]&&e[e.length-2]===t[t.length-2],n}function a3(e){let t=fe.computeStrides(e),n=["b","r","c"],s="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${t.map((u,l)=>{let d=`int ${n[l]} = ${s} / ${u}`,p=l===t.length-1?`int ${n[l+1]} = ${s} - ${n[l]} * ${u}`:`index -= ${n[l]} * ${u}`;return`${d}; ${p};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function s3(e){let t=fe.computeStrides(e);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${t[0]} + coords.z * ${t[1]} + coords.y;
  }
`}var np,ip,my,u3=N(()=>{"use strict";ke(),Le(),Se(),fn(),np=e=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${e}`}),ip=(e,t,n,s)=>{let u=t.dims,l=s,d="";for(let r=0;r<4;r++){let i="";switch(r){case 0:i="outputCoords = rc;";break;case 1:i="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:i="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:i="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}d+=`
        ${i}
        ${r>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${r}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${r>0?"}":""}
      `}let p=Te(e.session.backend.glContext.version),o=`
      ${a3(u)}
      ${s3(l)}
      ${ni()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${l[2]};
        int cols = ${l[1]};

        ${d}
        ${p.output} = result;
      }
    `;return{...n,output:{dims:l,type:t.type,textureType:2},shaderSource:o,hasMain:!0}},my=(e,t,n)=>{let s=np(n);return{...s,get:()=>ip(e,t,s,n)}}}),Ps,l3=N(()=>{"use strict";Le(),Se(),Ps=(e,t)=>{let n=t.shape,s=Te(e.session.backend.glContext.version),u=`
    const float FLOAT_MAX = 1.70141184e38;
    const float FLOAT_MIN = 1.17549435e-38;

    bool isNaN(float val) {
      return (val < 1.0 || 0.0 < val || val == 0.0) ? false : true;
    }

    highp vec4 encodeAsUint8(highp float v) {
      if (isNaN(v)) {
        return vec4(255, 255, 255, 255);
      }

      highp float av = abs(v);

      if(av < FLOAT_MIN) {
        return vec4(0.0, 0.0, 0.0, 0.0);
      } else if(v > FLOAT_MAX) {
        return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
      } else if(v < -FLOAT_MAX) {
        return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
      }

      highp vec4 c = vec4(0,0,0,0);

      highp float e = floor(log2(av));
      highp float m = exp2(fract(log2(av))) - 1.0;

      c[2] = floor(128.0 * m);
      m -= c[2] / 128.0;
      c[1] = floor(32768.0 * m);
      m -= c[1] / 32768.0;
      c[0] = floor(8388608.0 * m);

      highp float ebias = e + 127.0;
      c[3] = floor(ebias / 2.0);
      ebias -= c[3] * 2.0;
      c[2] += floor(ebias) * 128.0;

      c[3] += 128.0 * step(0.0, -v);

      return c / 255.0;
    }

    void main() {
      float value = ${s.texture2D}(X,TexCoords).r;
      ${s.output} = encodeAsUint8(value);
    }`,l={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:n,type:t.tensor.type,textureType:3},shaderSource:u,hasMain:!0};return e.executeProgram(l,[t.tensor])}});function d3(e,t){if(e===1)return"rc";let n="";for(let s=0;s<e;s++)n+=t[s],s<e-1&&(n+=",");return n}var Fo,op,gy,p3=N(()=>{"use strict";Le(),Se(),Ht(),fn(),Fo={name:"unpack",inputNames:["A"],inputTypes:[2]},op=(e,t)=>{let n=t.dims.length,s=gu("rc",n),u=s.slice(-2),l=cr(n),d=ni(),p=t.dims.length===0?"":d3(n,s),o=n<=1?"rc":`vec2(${u.join(",")})`,r=Te(e.session.backend.glContext.version),i=`
    ${d}
    void main() {
      ${l} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${p});

       ${r.output} = vec4(getChannel(packedInput, ${o}), 0, 0, 0);
     }
   `;return{...Fo,hasMain:!0,output:{dims:t.dims,type:t.type,textureType:0},shaderSource:i}},gy=(e,t)=>({...Fo,get:()=>op(e,t)})}),by,As,yy,Ui=N(()=>{"use strict";kt(),by=class{constructor(e,t=1){if(t===1)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=t;else if(t===4)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=t;else throw new Error(`Invalid number of channels: ${t}`)}encode(e,t){let n,s;return e.constructor!==Float32Array&&(Ue.warning("Encoder","data was not of type Float32; creating new Float32Array"),s=new Float32Array(e)),t*this.channelSize>e.length?(Ue.warning("Encoder","Source data too small. Allocating larger array"),s=e,n=this.allocate(t*this.channelSize),s.forEach((u,l)=>n[l]=u)):(s=e,n=s),n}allocate(e){return new Float32Array(e*4)}decode(e,t){return this.channelSize===1?e.filter((n,s)=>s%4===0).subarray(0,t):e.subarray(0,t)}},As=class{constructor(e,t=1,n){if(t!==1&&t!==4)throw new Error(`Invalid number of channels: ${t}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=t,this.textureType=n||e.FLOAT}encode(e,t){let n=e;return this.channelSize===1&&(Ue.verbose("Encoder","Exploding into a larger array"),n=this.allocate(t),e.forEach((s,u)=>n[u*4]=s)),n}allocate(e){return new Float32Array(e*4)}decode(e,t){return this.channelSize===1?e.filter((n,s)=>s%4===0).subarray(0,t):e.subarray(0,t)}},yy=class{constructor(e,t=1){if(this.channelSize=4,t===1)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=t;else if(t===4)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=t;else throw new Error(`Invalid number of channels: ${t}`)}encode(e,t){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,t){if(e instanceof Uint8Array)return e.subarray(0,t);throw new Error(`Invalid array type: ${e.constructor}`)}}}),Kn,_y,ks,c3=N(()=>{"use strict";ke(),Se(),Kn=(e,t,n)=>{let s=n===0||n===1?1:4,u=n===2,l=n===1||n===2,d=n===4?t.length-1:void 0,p=n===4?t.map((o,r)=>r===t.length-1?o*4:o):void 0;return ks(e,t,s,p,{isPacked:u,reverseWH:l,breakAxis:d})},_y=(e,t,n)=>{let s=Kn(e,t,n);return[s.width,s.height]},ks=(e,t,n=1,s,u)=>{let l=!!(u&&u.isPacked),[d,p]=e.computeTextureWH(l&&s||t,u),o=t.length,r=t.slice(0);if(o===0&&(r=[1]),n===1)s=t;else if(l){if(n!==4)throw new Error("a packed texture must be 4-channel");s=t,o>0&&(r[o-1]=Math.ceil(r[o-1]/2)),o>1&&(r[o-2]=Math.ceil(r[o-2]/2))}else if(!s)throw new Error("Unpacked shape is needed when using channels > 1");return{width:d,height:p,channels:n,isPacked:l,shape:r,strides:fe.computeStrides(r),unpackedShape:s,reversedWH:u&&u.reverseWH}}}),ap,wy,h3=N(()=>{"use strict";kt(),hn(),ke(),i3(),u3(),l3(),p3(),Ui(),c3(),Se(),ap=(e,t)=>{let n=t.map(u=>`${u.unpackedShape.join(",")};${u.width}x${u.height}`).join("_"),s=e.name;return e.cacheHint&&(s+="["+e.cacheHint+"]"),s+=":"+n,s},wy=class{constructor(e){this.session=e,this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,t){return _y(this.session.layoutStrategy,e,t)}executeProgram(e,t){if(t.length<e.inputNames.length)throw new Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw new Error("input names size does not match input types");let n=[];for(let o=0;o<e.inputNames.length;++o)n[o]=this.getOrCreateTextureData(t[o],e.inputTypes[o]);let s=ap(e,n),u=this.session.programManager.getArtifact(s),l=u?u.programInfo:typeof e.get=="function"?e.get():e,d=Kn(this.session.layoutStrategy,l.output.dims,l.output.textureType),p=this.createTextureData(d,l.output.type);return u||(u=this.session.programManager.build(l,n,p),this.session.programManager.setArtifact(s,u)),this.runProgram(u,n,p),p}run(e,t){return this.executeProgram(e,t).tensor}runProgram(e,t,n){for(let s=0;s<t.length;++s)if(!!t[s].isPacked!=(e.programInfo.inputTypes[s]===2))throw new Error(`input[${s}] property packed inconsistent`);if(!!n.isPacked!=(e.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(e,t,n)}getOrCreateTextureData(e,t){let n=this.getTextureData(e.dataId,t===2);if(!n&&(n=this.getTextureData(e.dataId,t!==2),n))return t===2?this.pack(n):this.unpack(n);if(!n){let s=Kn(this.session.layoutStrategy,e.dims,t);if(t===4){let u=e.dims;if(u.length===4){let l=[u[0],Math.ceil(u[1]*u[2]*u[3]/4)],d=Kn(this.session.layoutStrategy,l,t),p=e.numberData;if(u[1]*u[2]*u[3]%4!==0){let o=u[0],r=u[1]*u[2]*u[3],i=Math.ceil(r*1/4)*4,a=o*i;p=new Float32Array(a);for(let c=0;c<o;++c){let h=c*r,m=c*i+c%1*r;p.set(e.numberData.subarray(h,h+r),m)}}return this.createTextureData(d,e.type,p,e,1)}}if(t===2){let u=ks(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),l=this.createTextureData(u,e.type,e.numberData,e,1);n=this.pack(l)}else n=this.createTextureData(s,e.type,e.numberData,e,1)}return n}createTextureDataFromLayoutBindTensor(e,t,n,s){return this.createTextureData(e,t,n,s,1)}createTextureData(e,t,n,s,u){Ue.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let l=this.session.textureManager.createTextureFromLayout(t,e,n,u);return this.createTextureDataFromTexture(e,t,l,s)}reshapeUnpacked(e,t){let n=this.getOrCreateTextureData(e,0),s={channels:n.channels,height:n.height,width:n.width,shape:t.length!==0?t:[1],strides:fe.computeStrides(t),unpackedShape:t};return this.createTextureDataFromTexture(s,e.type,n.texture).tensor}reshapePacked(e,t){let n=this.getOrCreateTextureData(e,2);if(o3(e.dims,t)){let p={channels:n.channels,height:n.height,width:n.width,shape:t.length!==0?t:[1],strides:fe.computeStrides(t),unpackedShape:t,isPacked:!0};return this.createTextureDataFromTexture(p,e.type,n.texture).tensor}let s=rp(e.dims),u=rp(t),l=this.reshapePacked(e,s),d=this.run(my(this,l,u),[l]);return this.reshapePacked(d,t)}cast(e,t){let n=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(n,t,n.texture).tensor}createTextureDataFromTexture(e,t,n,s,u){let l={...e,tensor:s||new ct(e.unpackedShape,t,d=>this.readTexture(l),async d=>this.readTextureAsync(l),void 0,u),texture:n};return this.setTextureData(l.tensor.dataId,l,e.isPacked),l}getTextureData(e,t=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,t):t?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,t,n=!1){this.session.isInitializer(e)?this.session.setTextureData(e,t,n):(n?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,t)}isTextureLayoutCached(e,t=!1){return!!this.getTextureData(e.dataId,t)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(Ps(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(Ps(this,e))}pack(e){return this.executeProgram(fy(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(gy(this,e.tensor),[e.tensor])}}}),sp,Me,Je=N(()=>{"use strict";sp=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},Me=e=>new sp(e)}),Lo,vy,xy,up,lp,f3=N(()=>{"use strict";Je(),Le(),Se(),Lo={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},vy=(e,t,n)=>(lp(t),[e.run({...Lo,cacheHint:n.cacheKey,get:()=>up(e,t,n)},t)]),xy=e=>{let t=e.attributes.getFloat("epsilon",1e-5),n=e.attributes.getFloat("momentum",.9),s=e.attributes.getInt("spatial",1);return Me({epsilon:t,momentum:n,spatial:s})},up=(e,t,n)=>{let s=Te(e.session.backend.glContext.version),u=t[0].dims.length,[l,d]=e.calculateTextureWidthAndHeight(t[1].dims,0),p=`
  float process(int[${u}] indices) {
    vec2 position = offsetToCoords(indices[1], ${l}, ${d});
    float scale = getColorAsFloat(${s.texture2D}(Scale, position));
    float mean = getColorAsFloat(${s.texture2D}(Mean, position));
    float variance = getColorAsFloat(${s.texture2D}(Variance, position));
    float b = getColorAsFloat(${s.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${n.epsilon})) ) + b;
  }`;return{...Lo,output:{dims:t[0].dims,type:t[0].type,textureType:0},shaderSource:p}},lp=e=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let t=e[0],n=e[1],s=e[2],u=e[3],l=e[4];if(t.dims.length<3||n.dims.length!==1||s.dims.length!==1||u.dims.length!==1||l.dims.length!==1)throw new Error("invalid input shape.");if(n.dims[0]!==t.dims[1]||s.dims[0]!==t.dims[1]||u.dims[0]!==t.dims[1]||l.dims[0]!==t.dims[1])throw new Error("invalid input shape.");if(t.type!=="float32"&&t.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||s.type!=="float32"&&s.type!=="float64"||u.type!=="float32"&&u.type!=="float64"||l.type!=="float32"&&l.type!=="float64")throw new Error("invalid input tensor types.")}}),$y,mn,Q,Ds,Ty,fr=N(()=>{"use strict";$y=class{constructor(e,t,n,s){this.glContext=e,this.programInfo=t,this.inputTextureLayouts=n,this.outputTextureLayout=s}},mn=class{constructor(e){this.context=e}},Q=class{constructor(e,t){this.routineBody=e,this.dependencies=t}},Ds=class{constructor(e,t,n){this.name=e,n?this.dependencies=n:this.dependencies=[],t&&(this.routineBody=t)}addDependency(e){e&&this.dependencies.push(e)}},Ty=class{static returnOrderedNodes(e){if(!e||e.length===0)return[];if(e.length===1)return e;let t=new Set,n=new Set,s=new Array;return this.createOrderedNodes(e,t,n,s),s}static createOrderedNodes(e,t,n,s){for(let u=0;u<e.length;++u)this.dfsTraverse(e[u],t,n,s)}static dfsTraverse(e,t,n,s){if(!e||n.has(e.name))return;if(t.has(e.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");t.add(e.name);let u=e.dependencies;if(u&&u.length>0)for(let l=0;l<u.length;++l)this.dfsTraverse(u[l],t,n,s);s.push(e),n.add(e.name),t.delete(e.name)}}});function m3(){let e="add_";return{body:`
  float ${e}(float a, float b) {
    return a + b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:e,type:0}}function g3(){let e="div_";return{body:`
  float ${e}(float a, float b) {
    return a / b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:e,type:0}}function b3(){let e="mul_";return{body:`
  float ${e}(float a, float b) {
    return a * b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:e,type:0}}function y3(){let e="sub_";return{body:`
  float ${e}(float a, float b) {
    return a - b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:e,type:0}}function _3(){let e="equal_";return{body:`
  float ${e}(float a, float b) {
    return float(a == b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:e,type:0}}function w3(){let e="greater_";return{body:`
  float ${e}(float a, float b) {
    return float(a > b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:e,type:0}}function v3(){let e="less_";return{body:`
  float ${e}(float a, float b) {
    return float(a < b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:e,type:0}}function x3(){let e="and_";return{body:`
  float ${e}(float a, float b) {
    return float( bool(a) && bool(b) );
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r && b2.r ,
                b1.g && b2.g,
                b1.b && b2.b,
                b1.a && b2.a );
  }
  `,name:e,type:0}}function $3(){return{body:`
  float or_(float a, float b) {
    return float( bool(a) || bool(b) );
  }
  vec4 or_(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r || b2.r ,
                b1.g || b2.g,
                b1.b || b2.b,
                b1.a || b2.a );
  }
  `,name:"or_",type:0}}function T3(){let e="xor_";return{body:`
  float ${e}(float a, float b) {
    return float( bool(a) ^^ bool(b) );
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r ^^ b2.r ,
                b1.g ^^ b2.g,
                b1.b ^^ b2.b,
                b1.a ^^ b2.a );
  }
  `,name:e,type:0}}function I3(){return O3("pow")}function S3(){let e="prelu_";return{body:`
  float ${e}(float a, float b) {
    return a < 0.0 ? a * b: a;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4(
      v1.r < 0.0 ? v1.r * v2.r: v1.r,
      v1.g < 0.0 ? v1.g * v2.g: v1.g,
      v1.b < 0.0 ? v1.b * v2.b: v1.b,
      v1.a < 0.0 ? v1.a * v2.a: v1.a
      );
  }
  `,name:e,type:0}}function O3(e){let t=`${e}_`;return{body:`
  float ${t}(float a, float b) {
    return ${e}(a, b);
  }
  vec4 ${t}(vec4 v1, vec4 v2) {
    return ${e}(v1, v2);
  }
  `,name:t,type:0}}var ut,dp,Iy,Sy,Oy,Ey,Py,Ay,ky,Dy,Ny,Cy,zy,Ry,E3=N(()=>{"use strict";ke(),fr(),Le(),Se(),ut=(e,t,n,s=t[0].type,u)=>{let l=e.session.pack?2:0;return{name:n.name,inputNames:["A","B"],inputTypes:[l,l],cacheHint:u,get:()=>dp(e,t,n,s)}},dp=(e,t,n,s=t[0].type)=>{let u=e.session.pack?2:0,l=!fe.areEqual(t[0].dims,t[1].dims),d=t[0].dims,p=e.session.pack;if(l){let i=jt.calcShape(t[0].dims,t[1].dims,!1);if(!i)throw new Error("Can't perform binary op on the given tensors");d=i;let a=d.length,c=t[0].dims.length!==0?t[0].dims.length:1,h=t[1].dims.length!==0?t[1].dims.length:1,m=t[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",b=t[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",x=Te(e.session.backend.glContext.version),v=p?`
      ${n.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${n.name}(a, b);
        ${x.output} = result;
      }`:`
      ${n.body}
      float process(int indices[${a}]) {
        int aindices[${c}];
        int bindices[${h}];
        ${m}
        ${b}
        return ${n.name}(_A(aindices), _B(bindices));
      }`;return{name:n.name,inputNames:["A","B"],inputTypes:[u,u],output:{dims:d,type:s,textureType:u},shaderSource:v,hasMain:p}}let o=Te(e.session.backend.glContext.version),r=`
    ${n.body}
    void main() {
      vec4 v1 = ${o.texture2D}(A, TexCoords);
      vec4 v2 = ${o.texture2D}(B, TexCoords);
      vec4 result = ${n.name}(v1, v2);
      ${o.output} = result;
    }
    `;return{name:n.name,inputNames:["A","B"],inputTypes:[u,u],output:{dims:t[0].dims,type:s,textureType:u},shaderSource:r,hasMain:!0}},Iy=(e,t)=>[e.run(ut(e,t,m3()),t)],Sy=(e,t)=>[e.run(ut(e,t,x3(),"bool"),t)],Oy=(e,t)=>[e.run(ut(e,t,g3()),t)],Ey=(e,t)=>[e.run(ut(e,t,_3(),"bool"),t)],Py=(e,t)=>[e.run(ut(e,t,w3(),"bool"),t)],Ay=(e,t)=>[e.run(ut(e,t,v3(),"bool"),t)],ky=(e,t)=>[e.run(ut(e,t,b3()),t)],Dy=(e,t)=>[e.run(ut(e,t,$3(),"bool"),t)],Ny=(e,t)=>[e.run(ut(e,t,I3()),t)],Cy=(e,t)=>[e.run(ut(e,t,S3()),t)],zy=(e,t)=>[e.run(ut(e,t,y3()),t)],Ry=(e,t)=>[e.run(ut(e,t,T3(),"bool"),t)]}),By,My,pp,P3=N(()=>{"use strict";ke(),By=(e,t,n)=>(pp(t),[e.cast(t[0],n)]),My=e=>dt.tensorDataTypeFromProto(e.attributes.getInt("to")),pp=e=>{if(!e||e.length!==1)throw new Error("Cast requires 1 input.");if(e[0].type==="string")throw new Error("Invalid input type.")}}),cp,hp,jy,Sn,A3=N(()=>{"use strict";Le(),Se(),Ht(),fn(),cp=(e,t)=>({name:"Concat (packed)",inputNames:Array.from({length:e},(n,s)=>`X${s}`),inputTypes:Array(e).fill(2),cacheHint:t}),hp=(e,t,n,s)=>{let u=n[0].dims.slice();if(s>=u.length||s<-1*u.length)throw new Error("axis specified for concat doesn't match input dimensionality");s<0&&(s=u.length+s);let l=u.slice(0);for(let E=1;E<n.length;E++){let A=n[E].dims.slice();for(let k=0;k<u.length;k++)if(k===s)l[s]+=A[k];else if(u[k]!==A[k])throw new Error("non concat dimensions must match")}let d=l.length,p=gu("coords",d),o=cr(d),r=ni(),i=n.map(E=>E.dims),a=dn(d),c=new Array(i.length-1);c[0]=i[0][s];for(let E=1;E<c.length;E++)c[E]=c[E-1]+i[E][s];let h=a[s],m=a.slice(-2),b=a.join(),x=`if (${h} < ${c[0]}) {
        return getChannel(
            getX0(${b}), vec2(${m.join()}));
        }`;for(let E=1;E<c.length;E++){let A=c[E-1];x+=`
            if (${h} < ${c[E]}  && ${h} >= ${c[E-1]}) {
              return getChannel(
                getX${E}(${Sn(a,h,A)}),
                vec2(${Sn(m,h,A)}));
            }`}let v=c.length,w=c[c.length-1];x+=`
            return getChannel(
              getX${v}(${Sn(a,h,w)}),
              vec2(${Sn(m,h,w)}));`;let S=Te(e.session.backend.glContext.version),O=`
          ${r}
          float getValue(${a.map(E=>"int "+E)}) {
            ${x}
          }

          void main() {
            ${o} coords = getOutputCoords();
            int lastDim = coords.${a[d-1]};
            coords.${a[d-1]} = coords.${a[d-2]};
            coords.${a[d-2]} = lastDim;

            vec4 result = vec4(getValue(${p}), 0., 0., 0.);

            ${p[d-1]} = ${p[d-1]} + 1;
            if (${p[d-1]} < ${l[d-1]}) {
              result.g = getValue(${p});
            }

            ${p[d-2]} = ${p[d-2]} + 1;
            if (${p[d-2]} < ${l[d-2]}) {
              result.a = getValue(${p});
            }

            ${p[d-1]} = ${p[d-1]} - 1;
            if (${p[d-2]} < ${l[d-2]} &&
                ${p[d-1]} < ${l[d-1]}) {
              result.b = getValue(${p});
            }
            ${S.output} = result;
          }
        `;return{...t,output:{dims:l,type:n[0].type,textureType:2},shaderSource:O,hasMain:!0}},jy=(e,t,n)=>{let s=cp(t.length,n.cacheKey);return{...s,get:()=>hp(e,s,t,n.axis)}},Sn=(e,t,n)=>{let s=e.indexOf(t);return e.map((u,l)=>l===s?`${u} - ${n}`:u).join()}}),Fy,fp,mp,gp,Vo,bp,yp,_p,Ly,wp,k3=N(()=>{"use strict";Je(),Se(),A3(),Fy=(e,t,n)=>(wp(t),e.session.pack&&t[0].dims.length>1?[e.run(jy(e,t,n),t)]:[e.run(gp(e,t,n),t)]),fp=(e,t)=>({name:"Concat",inputNames:Array.from({length:e},(n,s)=>`X${s}`),inputTypes:Array(e).fill(0),cacheHint:t}),mp=(e,t,n,s)=>{let u=n[0].dims.slice();if(s>=u.length||s<-1*u.length)throw new Error("axis specified for concat doesn't match input dimensionality");s<0&&(s=u.length+s);let l=u.slice(0);for(let h=1;h<n.length;h++){let m=n[h].dims.slice();for(let b=0;b<u.length;b++)if(b===s)l[s]+=m[b];else if(u[b]!==m[b])throw new Error("non concat dimensions must match")}let d=l.length,p=new Array(n.length),o=0;for(let h=0;h<p.length;++h)o+=n[h].dims[s],p[h]=o;let r="";n.length<5?r=Vo(p):r=bp(p);let i=yp(n.length,d),a=_p(p),c=`
        ${i}
        ${a}
        ${r}
        float process(int indices[${d}]) {
          int textureIndex = getTextureWhereDataResides (indices[${s}]);

          if(textureIndex != 0) {
            indices[${s}] = indices[${s}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...t,output:{dims:l,type:n[0].type,textureType:0},shaderSource:c}},gp=(e,t,n)=>{let s=fp(t.length,n.cacheKey);return{...s,get:()=>mp(e,s,t,n.axis)}},Vo=e=>`int getTextureWhereDataResides(int index) {
      ${e.map((t,n)=>`if(index<${t}) {return ${n};}
`).join("")}
    }`,bp=e=>Vo(e),yp=(e,t)=>{let n=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${t}]) {`];for(let s=0;s<e;++s)s===0?n.push(`	if (textureIndex == ${s}) { return _X${s}(indices); }`):s===e-1?n.push(`	else { return _X${s}(indices); }`):n.push(`	else if (textureIndex == ${s}) { return _X${s}(indices); }`);return n.push("	}"),n.join(`
`)},_p=e=>{let t=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let n=0;n<e.length;++n)n===0?t.push(`	if (index == ${n}) { return ${e[n]}; }`):n===e.length-1?t.push(`	else { return ${e[n]}; }`):t.push(`	else if (index == ${n}) { return ${e[n]}; }`);return t.push("	}"),t.join(`
`)},Ly=e=>Me({axis:e.attributes.getInt("axis")}),wp=e=>{if(!e||e.length<1)throw new Error("too few inputs");let t=e[0].type,n=e[0].dims.length;if(t==="string")throw new Error("string tensor is not supported yet");for(let s of e){if(s.type!==t)throw new Error("input tensors should be one type");if(s.dims.length!==n)throw new Error("input tensors should have the same shape")}}});function D3(){return wt("abs")}function N3(){return wt("acos")}function C3(){return wt("asin")}function z3(){return wt("atan")}function R3(){return wt("ceil")}function B3(){return wt("cos")}function M3(e){return{body:`
  const float alpha = float(${e});

  float elu_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 elu_(vec4 v) {
    return vec4(elu_(v.x), elu_(v.y), elu_(v.z), elu_(v.w));
  }
  `,name:"elu",type:0}}function j3(){return wt("exp")}function F3(){return wt("floor")}function Vy(e,t){let n="clip";return{body:`
  const float min = float(${e});
  const float max = float(${t});

  float ${n}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${n}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:n,type:0}}function L3(){let e="indentity";return{body:`
  float ${e}_(float a) {
    return a;
  }
  vec4 ${e}_(vec4 v) {
    return v;
  }
  `,name:e,type:0}}function V3(e){let t="leakyRelu";return{body:`
  const float alpha = float(${e});

  float ${t}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${t}_(vec4 v) {
    return vec4(${t}_(v.x), ${t}_(v.y), ${t}_(v.z), ${t}_(v.w));
  }
  `,name:t,type:0}}function U3(){return wt("log")}function q3(){return{body:`
  float neg_(float a) {
    return -a;
  }
  vec4 neg_(vec4 v) {
    return -v;
  }
  `,name:"neg",type:0}}function G3(){return{body:`
  float not_(float a) {
    return float( ! bool(a) );
  }
  bool not_(bool a) {
    return !a;
  }
  vec4 not_(vec4 v) {
    return vec4(!bool(v.x), !bool(v.y), !bool(v.z), !bool(v.w));
  }
  bvec4 not_(bvec4 v) {
    return bvec4(!v.x, !v.y, !v.z, !v.w);
  }
  `,name:"not",type:0}}function H3(){return wt("sin")}function Uy(){let e="relu";return{body:`
  float ${e}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${e}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:e,type:0}}function qy(){let e="sigmoid";return{body:`
  float ${e}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${e}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:e,type:0}}function W3(){return wt("sqrt")}function K3(){return wt("tan")}function X3(){let e="tanh";return{body:`
  float ${e}_(float a) {
    a = clamp(a, -10., 10.);
    a = exp(2.*a);
    return (a - 1.) / (a + 1.);
  }
  vec4 ${e}_(vec4 v) {
    v = clamp(v, -10., 10.);
    v = exp(2.*v);
    return (v - 1.) / (v + 1.);
  }
  `,name:e,type:0}}function wt(e){return{body:`
  float ${e}_(float a) {
    return ${e}(a);
  }
  vec4 ${e}_(vec4 v) {
    return ${e}(v);
  }
  `,name:e,type:0}}var vp,Ve,Gy,Hy,Wy,Ky,Ns,Xy,Zy,xp,Jy,Yy,Qy,e0,t0,r0,Cs,n0,i0,o0,a0,s0,u0,l0,d0,p0,c0,h0,f0=N(()=>{"use strict";Je(),ke(),fr(),Le(),Se(),vp=(e,t,n,s)=>{let u=e.session.pack?2:0,l=Te(e.session.backend.glContext.version);return{...t,output:{dims:n.dims,type:n.type,textureType:u},shaderSource:`
     ${s.body}
     void main() {
       vec4 v = ${l.texture2D}(A, TexCoords);
       v = ${s.name}_(v);
       ${l.output} = v;
     }
     `,hasMain:!0}},Ve=(e,t,n,s)=>{let u=e.session.pack?2:0,l={name:n.name,inputTypes:[u],inputNames:["A"],cacheHint:s};return{...l,get:()=>vp(e,l,t,n)}},Gy=(e,t)=>[e.run(Ve(e,t[0],D3()),t)],Hy=(e,t)=>[e.run(Ve(e,t[0],N3()),t)],Wy=(e,t)=>[e.run(Ve(e,t[0],C3()),t)],Ky=(e,t)=>[e.run(Ve(e,t[0],z3()),t)],Ns=(e,t,n)=>[e.run(Ve(e,t[0],Vy(n.min,n.max),n.cacheKey),t)],Xy=e=>Me({min:e.attributes.getFloat("min",Yn),max:e.attributes.getFloat("max",Qn)}),Zy=(e,t)=>{let n=xp(e,t);return Ns(e,[t[0]],n)},xp=(e,t)=>{if(t.length>=3&&(!e.session.isInitializer(t[1].dataId)||!e.session.isInitializer(t[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let n=t.length>=3?t[1].numberData[0]:Yn,s=t.length>=3?t[2].numberData[0]:Qn;return Me({min:n,max:s})},Jy=(e,t)=>[e.run(Ve(e,t[0],R3()),t)],Yy=(e,t)=>[e.run(Ve(e,t[0],B3()),t)],Qy=(e,t,n)=>[e.run(Ve(e,t[0],M3(n.alpha),n.cacheKey),t)],e0=e=>Me({alpha:e.attributes.getFloat("alpha",1)}),t0=(e,t)=>[e.run(Ve(e,t[0],j3()),t)],r0=(e,t)=>[e.run(Ve(e,t[0],F3()),t)],Cs=(e,t)=>[e.run(Ve(e,t[0],L3()),t)],n0=(e,t,n)=>[e.run(Ve(e,t[0],V3(n.alpha),n.cacheKey),t)],i0=e=>Me({alpha:e.attributes.getFloat("alpha",.01)}),o0=(e,t)=>[e.run(Ve(e,t[0],U3()),t)],a0=(e,t)=>[e.run(Ve(e,t[0],q3()),t)],s0=(e,t)=>[e.run(Ve(e,t[0],G3()),t)],u0=(e,t)=>[e.run(Ve(e,t[0],Uy()),t)],l0=(e,t)=>[e.run(Ve(e,t[0],qy()),t)],d0=(e,t)=>[e.run(Ve(e,t[0],H3()),t)],p0=(e,t)=>[e.run(Ve(e,t[0],W3()),t)],c0=(e,t)=>[e.run(Ve(e,t[0],K3()),t)],h0=(e,t)=>[e.run(Ve(e,t[0],X3()),t)]});function ii(e){let t;switch(e.activation){case"Relu":t=Uy();break;case"Sigmoid":t=qy();break;case"Clip":t=Vy(e.clipMin,e.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let n=t.name,s=t.body,u=`value = ${n}_(value);`;return{activationFunction:s,applyActivation:u}}var no,gn=N(()=>{"use strict";ke(),f0(),no=e=>{let t=e.getString("activation","");if(t==="Clip"){let[n,s]=e.getFloats("activation_params",[Yn,Qn]);return{activation:t,clipMax:s,clipMin:n,activationCacheKey:`${t}:${n},${s}`}}return{activation:t,activationCacheKey:t}}}),$p,Tp,m0,Z3=N(()=>{"use strict";kt(),Le(),Se(),_u(),gn(),$p=(e,t)=>({name:"GroupedConv",inputNames:e?["X","W","Bias"]:["X","W"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),Tp=(e,t,n,s)=>{let u=t.length>2?"value += getBias(output_channel);":"",l=t[0].dims.slice(),d=t[1].dims.slice(),p=d[0]/s.group;Ue.verbose("GroupedConv",`autpPad:${s.autoPad}, dilations:${s.dilations}, group:${s.group}, kernelShape:${s.kernelShape}, pads:${s.pads}, strides:${s.strides}`);let o=Xn(l,d,s.dilations,s.pads,s.strides),r=Te(e.session.backend.glContext.version),{activationFunction:i,applyActivation:a}=ii(s),c=`
  const ivec2 strides = ivec2(${s.strides[0]}, ${s.strides[1]});
  const ivec2 pads = ivec2(${s.pads[0]}, ${s.pads[1]});
  ${i}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;
    ivec2 xRCCorner = coords.zw * strides - pads;
    int group_id = output_channel / ${p};

    float value = 0.0;
    for (int wInChannel = 0; wInChannel < ${d[1]}; wInChannel++) {
      int input_channel = group_id * ${d[1]} + wInChannel;
      for (int wHeight = 0; wHeight < ${d[2]}; wHeight++) {
        int xHeight = xRCCorner.x + wHeight * ${s.dilations[0]};

        if (xHeight < 0 || xHeight >= ${l[2]}) {
          continue;
        }

        for (int wWidth = 0; wWidth < ${d[3]}; wWidth++) {
          int xWidth = xRCCorner.y + wWidth * ${s.dilations[1]};
          if (xWidth < 0 || xWidth >= ${l[3]}) {
            continue;
          }

          float xVal = getX(batch, input_channel, xWidth, xHeight);
          float wVal = getW(output_channel, wInChannel, wWidth, wHeight);
          value += xVal*wVal;
        }
      }
    }
    ${u}
    ${a}
    ${r.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:o,type:t[0].type,textureType:0},shaderSource:c,hasMain:!0}},m0=(e,t,n)=>{let s=$p(t.length>2,n.cacheKey);return{...s,get:()=>Tp(e,t,s,n)}}}),Ip,Sp,g0,J3=N(()=>{"use strict";Le(),Se(),fn(),Ip=e=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:e}),Sp=(e,t,n,s,u,l)=>{let d=n.dims,p=s.dims,o=2,r=3,i=u.length,a=[p[1]*p[2]*p[3],u[2]*u[3]],c=p[2]*p[3],h=ni(),m=Te(e.session.backend.glContext.version),b="";for(let v=0;v<=1;v++)for(let w=0;w<=1;w++)b+=`
            blockIndex = rc.x + ${w};
            pos = rc.y + ${v};

            if(blockIndex < ${a[1]} && pos < ${a[0]}) {
              offsetY = int(blockIndex / (${u[i-1]})) * ${l.strides[0]} -
                ${l.pads[0]};
              d0 = offsetY + ${l.dilations[0]} * (imod(pos, ${c}) / ${p[2]});

              if(d0 < ${d[o]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${u[i-1]}) * ${l.strides[1]} -
                  ${l.pads[1]};
                d1 = offsetX + ${l.dilations[1]} * imod(imod(pos, ${c}), ${p[2]});

                if(d1 < ${d[r]} && d1 >= 0) {

                  ch = int(float(pos)/ ${c}.);
                    innerDims = vec2(d0, d1);
                    result[${v*2+w}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let x=`
      ${h}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${b}
          ${m.output} = result;
      }
            `;return{...t,output:{dims:a,type:n.type,textureType:2},shaderSource:x,hasMain:!0}},g0=(e,t,n,s,u)=>{let l=Ip(u.cacheKey);return{...l,get:()=>Sp(e,l,t,n,s,u)}}});function Y3(e,t,n){let s=t[0].dims,u=t[1].dims,l=jt.calcShape(s,u,!0);if(!l)throw new Error("Can't use matmul on the given tensors");let d=cr(l.length),p=dn(),{activationFunction:o,applyActivation:r}=ii(n),i=t.length>2,a=i?"value += getBiasForMatmul();":"",c=i?`${y0(d,p,t[2].dims,l,!1)}`:"",h=l.length,m=s.length,b=u.length,x=s[s.length-1],v=`
    ${o}
    ${c}
    float process(int indices[${h}]) {
        int a[${m}];
        int b[${b}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${x}; ++k) {
            a[${m-1}] = k;
            b[${b-2}] = k;
            value += _A(a) * _B(b);
        }
        ${a}
        ${r}
        return value;
    }`;return{...e,output:{dims:l,type:t[0].type,textureType:0},shaderSource:v}}function b0(e,t){let n=v0(e.length>2,t.activationCacheKey);return{...n,get:()=>Y3(n,e,t)}}function y0(e,t,n,s,u){let l="",d=n.length,p=s.length,o=p-d;p<2&&d>0?l="coords":l=n.map((c,h)=>`coords.${t[h+o]}`).join(", ");let r=jt.getBroadcastDims(n,s).map(c=>`coords.${t[c+o]} = 0;`).join(`
`),i=fe.size(n)===1,a="vec4(outputValue.xx, outputValue.yy)";return i&&(a="vec4(outputValue.x)"),u?`
vec4 getBiasForMatmul() {
  ${e} coords = getOutputCoords();
  ${r}
  vec4 outputValue = getBias(${l});
  return ${a};
}`:`
float getBiasForMatmul() {
  ${e} coords = getOutputCoords();
  ${r}
  return getBias(coords.x);
}`}var _0,w0,v0,Op,bu=N(()=>{"use strict";ke(),Se(),Ht(),gn(),x0(),_0=(e,t,n)=>(Op(t),e.session.pack?[e.run(yu(e,t,n),t)]:[e.run(b0(t,n),t)]),w0=e=>no(e.attributes),v0=(e,t)=>({name:"MatMul",inputNames:e?["A","B","Bias"]:["A","B"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),Op=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.");if(e[0].type!=="float32"&&e[0].type!=="float64"||e[1].type!=="float32"&&e[1].type!=="float64")throw new Error("inputs should be float type");if(e[0].type!==e[1].type)throw new Error("inputs types should match")}});function Q3(e,t,n,s){let u=[],l=[],d=n[0].dims,p=n[1].dims,o=d.length,r=p.length,i=s.length,a=i-o,c=i-r;u=d.map((w,S)=>`coords.${t[S+a]}`),u[o-1]="i*2",u.join(", "),l=p.map((w,S)=>`coords.${t[S+c]}`),l[r-2]="i*2",l.join(", ");let h=jt.getBroadcastDims(d,s),m=jt.getBroadcastDims(p,s),b=h.map(w=>`coords.${t[w+a]} = 0;`).join(`
`),x=m.map(w=>`coords.${t[w+c]} = 0;`).join(`
`),v=`int lastDim = coords.${t[i-1]};
  coords.${t[i-1]} = coords.${t[i-2]};
  coords.${t[i-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${e} coords = getOutputCoords();
  ${v}
  ${b}
  vec4 outputValue = getA(${u});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${e} coords = getOutputCoords();
  ${v}
  ${x}
  vec4 outputValue = getB(${l});
  return outputValue;
}`}function eI(e,t){let n="";for(let s=0;s<t-2;s++)n+=`rc.${e[s]}, `;return n+=`rc.${e[t-2]}, i*2`,n}function tI(e,t){let n="";for(let s=0;s<t-2;s++)n+=`rc.${e[s]}, `;return n+=`i*2, rc.${e[t-1]}`,n}var Ep,Pp,yu,x0=N(()=>{"use strict";ke(),Le(),Se(),Ht(),gn(),bu(),Ep=(e,t)=>({name:"MatMul (packed)",inputNames:e?["A","B","Bias"]:["A","B"],inputTypes:e?[2,2,2]:[2,2],cacheHint:t}),Pp=(e,t,n,s)=>{let u=n.length>2,l=u?"value += getBiasForMatmul();":"",d=n[0].dims,p=n[1].dims,o=jt.calcShape(d,p,!0),r=!fe.areEqual(n[0].dims,n[1].dims);if(!o)throw new Error("Can't use matmul on the given tensors");let i=d[d.length-1],a=Math.ceil(i/2),c=d.length,h=p.length,m=Te(e.session.backend.glContext.version),b=cr(o.length),x=o.length,v=dn(),{activationFunction:w,applyActivation:S}=ii(s),O=u?`${y0(b,v,n[2].dims,o,!0)}`:"",E=r?`${Q3(b,v,n,o)}`:"",A=r?"getAAtOutCoordsMatmul(i)":`getA(${eI(v,c)})`,k=r?"getBAtOutCoordsMatmul(i)":`getB(${tI(v,h)})`,I=r?"":`${b} rc =
          getOutputCoords(); int lastDim = rc.${v[x-1]}; rc.${v[x-1]} =
          rc.${v[x-2]}; rc.${v[x-2]} = lastDim;
      `,M=`
            ${E}
            ${O}
            ${w}
            void main() {
              ${I}

              vec4 value = vec4(0);
              for (int i = 0; i < ${a}; i++) {
                vec4 a = ${A};
                vec4 b = ${k};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${l}
              ${S}
              ${m.output} = value;
            }`;return{...t,output:{dims:o,type:n[0].type,textureType:2},shaderSource:M,hasMain:!0}},yu=(e,t,n)=>{let s=Ep(t.length>2,n.activationCacheKey);return{...s,get:()=>Pp(e,s,t,n)}}}),$0,rI=N(()=>{"use strict";_u(),J3(),x0(),$0=(e,t,n)=>{let s=t[0].dims,u=t[1].dims,l=Xn(s,u,n.dilations,n.pads,n.strides),d=e.run(g0(e,t[0],t[1],l,n),[t[0]]),p=e.reshapePacked(t[1],[u[0],u[1]*u[2]*u[3]]),o=t.length===3?[p,d,t[2]]:[p,d],r=e.run(yu(e,o,n),o);return e.reshapePacked(r,l)}}),Ap,kp,T0,zs,I0=N(()=>{"use strict";Se(),Ap=e=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:e}),kp=(e,t,n,s,u,l)=>{let d=n.dims,p=s.dims,o=u.length,r=zs(d,p,u,4),i=`
        const int XC = ${d[1]};
        const int XH = ${d[2]};
        const int XW = ${d[3]};
        const int KH = ${l.kernelShape[0]};
        const int KW = ${l.kernelShape[1]};
        const int dilationH = ${l.dilations[0]};
        const int dilationW = ${l.dilations[1]};
        const int strideH = ${l.strides[0]};
        const int strideW = ${l.strides[1]};
        const int padH = ${l.pads[0]};
        const int padW = ${l.pads[1]};
        const int KHKW = KH*KW;
        const int XCKHKW = XC * KHKW;
        const int outputChannels = 4;
        vec4 process(int indices[${o}]) {
          int b  = indices[0]; // batch size
          int oh = indices[1] * strideH - padH; //output height
          int ow = indices[2] * strideW - padW; //output width
          int p = indices[3] * outputChannels; //patch
          vec4 value = vec4(0.0);
          for(int i=0; i < outputChannels; ++i) {
            if(p < XCKHKW) {
              int patchC = p / KHKW;
              int patchH = (p - patchC*KHKW) / KW;
              int patchW = (p - patchC*KHKW) - patchH * KW;
              int xh2 = oh + patchH * dilationH;
              int xw2 = ow + patchW * dilationW;
              int x[${d.length}];
              x[0] = b;
              x[1] = patchC;
              x[2] = xh2;
              x[3] = xw2;
              if(xh2 >= 0 &&
                  xh2 < XH &&
                  xw2 >= 0 &&
                  xw2 < XW) {
                value[i] = _X(x);
              }
            }
            ++p;
          }
          return value;
        }
        `;return{...t,output:{dims:r,type:n.type,textureType:4},shaderSource:i}},T0=(e,t,n,s,u)=>{let l=Ap(u.cacheKey);return{...l,get:()=>kp(e,l,t,n,s,u)}},zs=(e,t,n,s=4)=>[n[0],n[2],n[3],Math.ceil(e[1]*t[2]*t[3]/s)]}),Dp,Np,S0,nI=N(()=>{"use strict";ke(),Le(),Se(),gn(),I0(),Dp=(e,t)=>({name:"ConvDotProduct",inputNames:e?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:e?[0,4,0]:[0,4],cacheKey:t.activationCacheKey}),Np=(e,t,n,s,u)=>{let l=n[0].dims,d=n[1].dims,p=[d[0],Math.ceil(l[1]*d[2]*d[3]/4)],o=zs(l,d,s),[r,i]=e.calculateTextureWidthAndHeight(p,4),a=fe.computeStrides(o),[c,h]=e.calculateTextureWidthAndHeight(o,4),m=s.length,b=n.length<3?"0.0":"_B(b)",x=Math.ceil(l[1]*d[2]*d[3]/4),{activationFunction:v,applyActivation:w}=ii(u),S=Te(e.session.backend.glContext.version),O=`
${v}
float process(int indices[${m}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${a[0]} + im2col[1] * ${a[1]} + im2col[2] * ${a[2]};
  int kernelOffset = indices[1] * ${p[1]};
  float value = ${b};
  for (int i = 0; i < ${x}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${c}, ${h});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${r}, ${i});
    value += dot(${S.texture2D}(Im2Col, im2colCoords), ${S.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${w}
  return value;
}`;return{...t,output:{dims:s,type:n[0].type,textureType:0},shaderSource:O}},S0=(e,t,n,s)=>{let u=Dp(t.length>2,s);return{...u,get:()=>Np(e,u,t,n,s)}}}),Xn,Rs,Cp,zp,Rp,Bp,Bs,Mp,_u=N(()=>{"use strict";Je(),ke(),Z3(),rI(),nI(),gn(),I0(),bu(),Xn=(e,t,n,s,u)=>{let l=e[0],d=e.slice(2),p=d.length,o=t[0],r=t.slice(2).map((a,c)=>a+(a-1)*(n[c]-1)),i=d.map((a,c)=>a+s[c]+s[c+p]).map((a,c)=>Math.floor((a-r[c]+u[c])/u[c]));return[l,o].concat(...i)},Rs=(e,t,n)=>(Mp(t,n),Cp(e,t,n)),Cp=(e,t,n)=>{let s=Bp(n,t),u=e.session.pack,l=s.kernelShape[0]===1&&s.kernelShape[1]===1;return s.group>1?[e.run(m0(e,t,s),t)]:l&&u?[zp(e,t,s)]:u&&t[0].dims.length===4&&t[0].dims[0]===1&&!l?[$0(e,t,s)]:[Rp(e,t,s)]},zp=(e,t,n)=>{let s=t[0].dims,u=t[1].dims,l=Xn(s,u,n.dilations,n.pads,n.strides),d=e.reshapeUnpacked(t[0],[s[1],s[2]*s[3]]),p=e.reshapeUnpacked(t[1],[u[0],u[1]]),o=t.length>2?[p,d,t[2]]:[p,d],r=e.run(b0(o,n),o);return e.reshapeUnpacked(r,l)},Rp=(e,t,n)=>{let s=t[0].dims,u=t[1].dims,l=Xn(s,u,n.dilations,n.pads,n.strides),d=e.run(T0(e,t[0],t[1],l,n),[t[0]]),p=t.length===3?[d,t[1],t[2]]:[d,t[1]];return e.run(S0(e,t,l,n),p)},Bp=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0)for(let l=2;l<t[1].dims.length;++l)n.push(t[1].dims[l]);let s=e.pads.slice();Vi.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,s,e.autoPad);let u=Object.assign({},e);return Object.assign(u,{kernelShape:n,pads:s,cacheKey:e.cacheKey}),u},Bs=e=>{let t=e.attributes,n=no(t),s=t.getString("auto_pad","NOTSET"),u=t.getInts("dilations",[1,1]),l=t.getInt("group",1),d=t.getInts("kernel_shape",[]),p=t.getInts("pads",[0,0,0,0]),o=t.getInts("strides",[1,1]);return Me({autoPad:s,dilations:u,group:l,kernelShape:d,pads:p,strides:o,...n})},Mp=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4||e[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=e[0].dims[1],s=e[1].dims[1]*t.group;if(n!==s)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let u=e[0].dims.length-2;if(t.dilations.length!==u)throw new Error(`dilations should be ${u}D`);if(t.strides.length!==u)throw new Error(`strides should be ${u}D`);if(t.pads.length!==u*2)throw new Error(`pads should be ${u*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(e[0].type!=="float32"||e[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(e.length===3&&e[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}}),jp,Fp,Lp,O0,Vp,Up,qp,Gp,Hp,Wp,E0,Kp,iI=N(()=>{"use strict";Je(),Le(),Se(),gn(),jp=(e,t,n,s,u,l)=>(e-1)*t+n+(s-1)*u+1-l,Fp=(e,t,n,s,u)=>{let l=Math.floor(e/2);t==="SAME_UPPER"?(n[s]=l,n[u]=e-l):t==="SAME_LOWER"&&(n[s]=e-l,n[u]=l)},Lp=(e,t,n,s,u,l,d,p)=>{let o=e.length-2,r=p.length===0;for(let i=0;i<o;++i){let a=r?e[i+2]*l[i]:p[i],c=jp(e[i+2],l[i],u[i],t[i],n[i],a);Fp(c,s,u,i,i+o),r&&p.push(l[i]*(e[i+2]-1)+d[i]+(t[i]-1)*n[i]+1-u[i]-u[i+o])}},O0=(e,t,n)=>(Kp(t,n),Vp(e,t,n)),Vp=(e,t,n)=>{let s=Wp(n,t);return[Hp(e,t,s)]},Up=(e,t)=>({name:"ConvTranspose",inputNames:e?["X","W","B"]:["X","W"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),qp=(e,t,n,s)=>{let u=t.length>2?"getB(output_channel)":"0.0",l=t[0].dims,d=t[1].dims,p=d[1],o=d[0]/s.group,r=[t[0].dims[0],t[1].dims[1]*s.group,...s.outputShape],i=Te(e.session.backend.glContext.version),{activationFunction:a,applyActivation:c}=ii(s),h=`
  const ivec2 strides = ivec2(${s.strides[0]}, ${s.strides[1]});
  const ivec2 pads = ivec2(${s.pads[0]}, ${s.pads[1]});
  ${a}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;

    ivec2 loc = coords.zw + pads;

    int group_id = output_channel / ${p};
    int wOutChannel = output_channel - group_id * ${p};

    float value = ${u};
    for (int inChannelOffset = 0; inChannelOffset < ${o}; inChannelOffset++) {
      int input_channel = group_id * ${o} + inChannelOffset;
      for (int wWOff = 0; wWOff < ${d[2]}; wWOff++) {
        for (int wHOff = 0; wHOff < ${d[3]}; wHOff++) {
          ivec2 wOff = ivec2(wWOff * ${s.dilations[0]}, wHOff * ${s.dilations[1]});
          ivec2 wLoc = loc - wOff;
          ivec2 wLocIn = wLoc / strides;
          if (
            wLocIn * strides == wLoc &&
            wLocIn.x >= 0 && wLocIn.x < ${l[2]} &&
            wLocIn.y >= 0 && wLocIn.y < ${l[3]}
          ) {
            float xVal = getX(batch, input_channel, wLocIn.y, wLocIn.x);
            float wVal = getW(input_channel, wOutChannel, wHOff, wWOff);
            value += xVal * wVal;
          }
        }
      }
    }
    ${c}
    ${i.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:r,type:t[0].type,textureType:0},shaderSource:h,hasMain:!0}},Gp=(e,t,n)=>{let s=Up(t.length>2,n.cacheKey);return{...s,get:()=>qp(e,t,s,n)}},Hp=(e,t,n)=>e.run(Gp(e,t,n),t),Wp=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0)for(let p=2;p<t[1].dims.length;++p)n.push(t[1].dims[p]);let s=e.pads.slice(),u=e.outputShape.slice(),l=t[0].dims;Lp(l,n,e.dilations,e.autoPad,s,e.strides,e.outputPadding,u);let d=Object.assign({},e);return Object.assign(d,{kernelShape:n,pads:s,outputShape:u,cacheKey:e.cacheKey}),d},E0=e=>{let t=e.attributes,n=no(t),s=t.getString("auto_pad","NOTSET"),u=t.getInts("dilations",[1,1]),l=t.getInt("group",1),d=t.getInts("kernel_shape",[]),p=t.getInts("output_padding",[0,0]),o=t.getInts("output_shape",[]),r=t.getInts("pads",[0,0,0,0]),i=t.getInts("strides",[1,1]);return Me({autoPad:s,dilations:u,group:l,kernelShape:d,outputPadding:p,outputShape:o,pads:r,strides:i,...n})},Kp=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4||e[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=e[0].dims[1],s=e[1].dims[0];if(n!==s)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let u=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==u))throw new Error("invalid bias");let l=e[0].dims.length-2;if(t.dilations.length!==l)throw new Error(`dilations should be ${l}D`);if(t.strides.length!==l)throw new Error(`strides should be ${l}D`);if(t.pads.length!==l*2)throw new Error(`pads should be ${l*2}D`);if(t.outputPadding.length!==l)throw new Error(`output_padding should be ${l}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape");if(e[0].type!=="float32"||e[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(e.length===3&&e[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}}),Uo,ei,P0,Xp,qo,Zp,Jp,Yp,wu=N(()=>{"use strict";Je(),ke(),Se(),Uo={name:"Transpose",inputNames:["A"],inputTypes:[0]},ei=(e,t,n)=>(Yp(t),[e.run({...Uo,cacheHint:n.cacheKey,get:()=>Xp(e,t[0],n.perm)},t)]),P0=e=>Me({perm:e.attributes.getInts("perm",[])}),Xp=(e,t,n)=>{let s=t.dims;n=qo(s,n);let u=Zp(s,n),l=s.length,d=`
      ${Jp("perm",n,l)}
      float process(int indices[${l}]) {
        int a[${l}];
        perm(a, indices);
        return _A(a);
      }`;return{...Uo,output:{dims:u,type:t.type,textureType:0},shaderSource:d}},qo=(e,t)=>(t&&t.length!==e.length&&(t=[...e.keys()].reverse()),t),Zp=(e,t)=>(t=qo(e,t),fe.sortBasedOnPerm(e,t)),Jp=(e,t,n)=>{let s=[];s.push(`void ${e}(out int a[${n}], int src[${n}]) {`);for(let u=0;u<n;++u)s.push(`	a[${t[u]}]=src[${u}];`);return s.push("	}"),s.join(`
`)},Yp=e=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(e[0].type!=="float32"&&e[0].type!=="float64")throw new Error("input should be float tensor")}}),A0,k0,Qp,oI=N(()=>{"use strict";wu(),A0=(e,t,n)=>{Qp(t);let s=n.blocksize,u=s*s,l=n.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],d=n.mode==="DCR"?[t[0].dims[0],s,s,t[0].dims[1]/u,t[0].dims[2],t[0].dims[3]]:[t[0].dims[0],t[0].dims[1]/u,s,s,t[0].dims[2],t[0].dims[3]],p=e.reshapeUnpacked(t[0],d),o={perm:l,cacheKey:`${l}`},[r]=ei(e,[p],o),i=[t[0].dims[0],t[0].dims[1]/u,t[0].dims[2]*s,t[0].dims[3]*s];return[e.reshapeUnpacked(r,i)]},k0=e=>{let t=e.attributes.getInt("blocksize");if(t<1)throw new Error(`blocksize must be >= 1, but got : ${t} for DepthToSpace`);let n=e.attributes.getString("mode","DCR");if(n!=="DCR"&&n!=="CRD")throw new Error(`unrecognized mode: ${n} for DepthToSpace`);return{mode:n,blocksize:t}},Qp=e=>{if(e.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${e.length}`);if(e[0].type==="string"||e[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}}),D0,N0,ec,aI=N(()=>{"use strict";ke(),D0=(e,t,n)=>{ec(t,n);let s=fe.flattenShape(t[0].dims,n);return[e.reshapeUnpacked(t[0],s)]},N0=e=>e.attributes.getInt("axis",1),ec=(e,t)=>{if(!e||e.length!==1)throw new Error("Flatten requires 1 input.");let n=e[0].dims.length;if(n===0)throw new Error("scalar tensor is not supported.");if(t<-n||t>n)throw new Error("Invalid axis");if(e[0].type==="string")throw new Error("string tensor is not supported.")}}),oi,io=N(()=>{"use strict";oi=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]}),C0,z0,tc,rc,nc,ic,sI=N(()=>{"use strict";Je(),io(),ke(),Se(),C0=(e,t,n)=>(ic(t,n.axis),[e.run(nc(e,t,n),t)]),z0=e=>Me({axis:e.attributes.getInt("axis",0)}),tc={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},rc=(e,t,n,s)=>{let u=n[0].dims.slice(),l=n[1].dims.slice(),d=new Array(u.length+l.length-1);s=fe.normalizeAxis(s,u.length);let p=[];for(let c=0;c<d.length;c++)c<s?(d[c]=u[c],p.push(`inputIdx[${c}] = outputIdx[${c}];`)):c<s+l.length?(d[c]=l[c-s],p.push(`indexDataIdx[${c-s}] = outputIdx[${c}];`)):(d[c]=u[c-l.length+1],p.push(`inputIdx[${c-l.length+1}] = outputIdx[${c}];`));let o=d.length||1,r=u.length,i=l.length||1,a=`
      float process(int outputIdx[${o}]) {
        int inputIdx[${r}];
        int indexDataIdx[${i}];
        indexDataIdx[0] = 0;
        ${p.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${s}] = idx < 0 ? idx + ${u[s]} : idx;
        return _A(inputIdx);
      }`;return{...t,output:{dims:d,type:n[0].type,textureType:0},shaderSource:a}},nc=(e,t,n)=>{let s={...tc,cacheHint:n.cacheKey};return{...s,get:()=>rc(e,s,t,n.axis)}},ic=(e,t)=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.");let n=e[0].dims.length;if(n<1)throw new Error("Invalid input shape.");if(t<-n||t>n-1)throw new Error("Invalid axis.");if(oi.indexOf(e[0].type)===-1)throw new Error("Invaid input type.");if(e[1].type!=="int32"&&e[1].type!=="int16")throw new Error("Invaid input type.")}}),Ms,Go,R0,B0,oc,ac,sc,uI=N(()=>{"use strict";Je(),ke(),Se(),Ms=(e,t,n)=>(sc(t,n),[e.run(oc(t,n),t)]),Go=(e,t)=>{let n=e.attributes.getInt("transA",0)!==0,s=e.attributes.getInt("transB",0)!==0,u=e.attributes.getFloat("alpha",1),l=e.attributes.getFloat("beta",1);return Me({transA:n,transB:s,alpha:u,beta:l,isOptionalC:t})},R0=e=>Go(e,!1),B0=e=>Go(e,!0),oc=(e,t)=>{let n={name:"Gemm",inputNames:e.length===3?["A","B","C"]:["A","B"],inputTypes:e.length===3?[0,0,0]:[0,0],key:t.cacheKey};return{...n,get:()=>ac(n,e,t)}},ac=(e,t,n)=>{let s=t[0].dims.slice(),u=t[1].dims.slice(),[l,d]=ly.getShapeOfGemmResult(s,n.transA,u,n.transB,t.length===3?t[2].dims:void 0),p=[l,d];if(!p)throw new Error("Can't use gemm on the given tensors");let o=s[s.length-1],r="";n.transA&&(o=s[0]),n.transA&&n.transB?r="value += _A_T(a) * _B_T(b);":n.transA&&!n.transB?r="value += _A_T(a) * _B(b);":!n.transA&&n.transB?r="value += _A(a) * _B_T(b);":!n.transA&&!n.transB&&(r="value += _A(a) * _B(b);");let i=p.length,a=t.length===3?`int c[${t[2].dims.length}];`:"",c=t.length===3?"bcastIndices_C(indices, c);":"",h=t.length===3?"value += beta * _C(c);":"",m=`
      float process(int indices[${i}]) {
          int a[${i}];
          int b[${i}];
          ${a}

          copyVec(indices, a);
          copyVec(indices, b);
          ${c}

          float value = 0.0;
          for (int k=0; k<${o}; ++k) {
              a[${i-1}] = k;
              b[${i-2}] = k;
              ${r}
          }

          value = value * alpha;
          ${h}
          return value;
      }`;return{...e,output:{dims:p,type:t[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:n.alpha},{name:"beta",type:"float",data:n.beta}],shaderSource:m}},sc=(e,t)=>{if(!e)throw new Error("Input is missing");if(t.isOptionalC&&(e.length<2||e.length>3))throw new Error("Invaid input shape.");if(!t.isOptionalC&&e.length!==3)throw new Error("Gemm requires 3 inputs");if(e.length===3&&e[2].dims.length!==1&&e[2].dims.length!==2)throw new Error("Invalid input shape of C");if(e[0].type!=="float32"&&e[0].type!=="float64"||e[1].type!=="float32"&&e[1].type!=="float64"||e.length===3&&e[2].type!=="float32"&&e[2].type!=="float64")throw new Error("Invalid input type.");if(e[0].type!==e[1].type||e.length===3&&e[0].type!==e[2].type)throw new Error("Input types are mismatched")}}),M0,j0,uc,lc,dc,pc,cc,lI=N(()=>{"use strict";Je(),Se(),M0=(e,t,n)=>(cc(t),[e.run(dc(e,t,n),t)]),j0=e=>{let t=e.attributes.getFloat("scale"),n=e.attributes.getFloats("bias");return Me({scale:t,bias:n})},uc={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},lc=(e,t,n,s)=>{let u=n[0].dims.slice(),l=u.length,d=`
      ${pc(s.bias.length)}
      float process(int indices[${l}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...t,output:{dims:u,type:n[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:s.bias.length,data:s.bias},{name:"scale",type:"float",data:s.scale}],shaderSource:d}},dc=(e,t,n)=>{let s={...uc,cacheHint:n.cacheKey};return{...s,get:()=>lc(e,s,t,n)}},pc=e=>{let t=[`float getBias(float bias[${e}], int channel) {`];for(let n=0;n<e;++n)n===0?t.push(`	if (channel == ${n}) { return bias[${n}]; }`):n===e-1?t.push(`	else { return bias[${n}]; }`):t.push(`	else if (channel == ${n}) { return bias[${n}]; }`);return t.push("	}"),t.join(`
`)},cc=e=>{if(!e||e.length!==1)throw new Error("ImageScaler requires 1 input.");if(e[0].dims.length!==4)throw new Error("Invalid input shape.");if(e[0].type!=="float32"&&e[0].type!=="float64")throw new Error("Invalid input type.")}}),F0,L0,Ho,hc,fc,mc,gc,bc,yc,dI=N(()=>{"use strict";Le(),Se(),F0=(e,t,n)=>{yc(t);let s=e.run(fc(t[0]),t);return[e.run(bc(e,t[0],n,s.dims),[t[0],s,t[1],t[2]])]},L0=e=>e.attributes.getFloat("epsilon",1e-5),Ho={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},hc=(e,t)=>{let n=t.dims.slice(),s=n[1],u=n[2]*n[3],l=[n[0],s],d=`
      vec4 process(int[2] indices) {
        vec4 v = vec4(0.0);
        int a[4];
        a[0] = indices[0];
        a[1] = indices[1];
        float temp = 0.0;
        for(int a2=0; a2<${n[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${n[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += x;
          }
        }
        float mean = temp / float(${u});
        temp = 0.0;
        for(int a2=0; a2<${n[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${n[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += (x - mean) * (x - mean);
          }
        }
        v.r = mean;
        v.g = temp / float(${u});

        return v;
      }`;return{...e,output:{dims:l,type:t.type,textureType:4},shaderSource:d}},fc=e=>({...Ho,get:()=>hc(Ho,e)}),mc={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},gc=(e,t,n,s,u)=>{let l=Te(e.session.backend.glContext.version),[d,p]=e.calculateTextureWidthAndHeight(u,4),[o,r]=[d/4,p],i=`
      vec4 get_MeanAndVariance(int[2] mv) {
        int offset = indicesToOffset_MeanAndVariance(mv);
        vec2 coords = offsetToCoords(offset, ${o}, ${r});
        return ${l.texture2D}(MeanAndVariance, coords);
      }

      float process(int[4] indices) {
        int mv[2];
        mv[0] = indices[0];
        mv[1] = indices[1];
        vec4 mean_and_variance = get_MeanAndVariance(mv);
        float mean = mean_and_variance.r;
        float variance = mean_and_variance.g;

        int sb[1];
        sb[0] = indices[1];
        float scale = _Scale(sb);
        float b = _B(sb);

        return scale * (_X(indices) - mean) / sqrt(variance + epsilon) + b;
      }`;return{...t,output:{dims:n.dims,type:n.type,textureType:0},variables:[{name:"epsilon",type:"float",data:s}],shaderSource:i}},bc=(e,t,n,s)=>{let u={...mc,cacheHint:`${n}`};return{...u,get:()=>gc(e,u,t,n,s)}},yc=e=>{if(!e||e.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let t=e[0],n=e[1],s=e[2];if(t.dims.length<3||n.dims.length!==1||s.dims.length!==1)throw new Error("Invalid input shape.");if(n.dims[0]!==t.dims[1]||s.dims[0]!==t.dims[1])throw new Error("Input shapes are mismatched.");if(t.type!=="float32"&&t.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||s.type!=="float32"&&s.type!=="float64")throw new Error("Invalid input type.");if(e[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function pI(e,t){let n=e[0].dims[1],s=e[0].dims.length,u=-Math.floor((t.size-1)/2),l=Math.ceil((t.size-1)/2),d=`float(${t.alpha}) / float(${t.size})`,p=`float(${t.bias})`,o=`float(${t.beta})`,r=`
    float process(int indices[${s}]) {
        int c = indices[1];
        float x = _X(indices);
        float square_sum = 0.0;

        for (int i = ${u}; i <= ${l}; i++) {
          int idx = c + i;
          if (c >= 0 && c < ${n}) {
            indices[1] = idx;
            float j = _X(indices);
            square_sum += j * j;
          }
        }
        return x / pow(${p} + ${d} * square_sum, ${o});
    }`;return{...vu,cacheHint:t.cacheKey,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:r}}function cI(e,t){return{...vu,cacheHint:t.cacheKey,get:()=>pI(e,t)}}var V0,U0,vu,_c,hI=N(()=>{"use strict";Je(),Se(),V0=(e,t,n)=>(_c(t),[e.run(cI(t,n),t)]),U0=e=>{let t=e.attributes.getFloat("alpha",1e-4),n=e.attributes.getFloat("beta",.75),s=e.attributes.getFloat("bias",1),u=e.attributes.getInt("size");return Me({alpha:t,beta:n,bias:s,size:u})},vu={name:"LRN",inputNames:["X"],inputTypes:[0]},_c=e=>{if(!e||e.length!==1)throw new Error("LRN requires 1 input.");if(e[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(e[0].type!=="float32")throw new Error("input should be float type")}}),wc,js,q0,G0,H0,vc,xc,$c,Tc,Ic,Sc,Oc,Ec,fI=N(()=>{"use strict";Je(),ke(),Le(),Se(),wc={name:"Pad",inputNames:["A"],inputTypes:[0]},js=(e,t,n)=>($c(t),[e.run({...wc,cacheHint:n.cacheKey,get:()=>xc(e,t[0],n)},t)]),q0=e=>{let t=e.attributes.getString("mode","constant"),n=e.attributes.getFloat("value",0),s=e.attributes.getInts("pads");return Me({mode:t,value:n,pads:s})},G0=(e,t,n)=>{Tc(t);let s=vc(e,t,n);return js(e,[t[0]],s)},H0=e=>e.attributes.getString("mode","constant"),vc=(e,t,n)=>{if(!e.session.isInitializer(t[1].dataId)||t.length>=3&&!e.session.isInitializer(t[2].dataId))throw new Error("dynamic pad attributes are not allowed");let s=Array.from(t[1].integerData),u=t.length>=3?t[2].floatData[0]:0;return Me({mode:n,pads:s,value:u})},xc=(e,t,n)=>{let s=fe.padShape(t.dims.slice(),n.pads),u=s.length,l=`
      ${Ic(e,t,n)}
      float process(int[${u}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:s,type:t.type,textureType:0},shaderSource:l}},$c=e=>{if(!e||e.length!==1)throw new Error("Pad requires 1 input");if(e[0].type!=="float32"&&e[0].type!=="float64")throw new Error("Invalid input type.")},Tc=e=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(e[1].type!=="int32")throw new Error("Invalid input type.");if(e.length>=3&&e[2].type==="string")throw new Error("Invalid input type.")},Ic=(e,t,n)=>{let s=Te(e.session.backend.glContext.version),[u,l]=e.calculateTextureWidthAndHeight(t.dims,0),d=fe.computeStrides(t.dims);switch(n.mode){case"constant":return Sc(s,t.dims,d,u,l,n.pads,n.value);case"reflect":return Oc(s,t.dims,d,u,l,n.pads);case"edge":return Ec(s,t.dims,d,u,l,n.pads);default:throw new Error("Invalid mode")}},Sc=(e,t,n,s,u,l,d)=>{let p=t.length,o="";for(let r=p-1;r>=0;--r)o+=`
        k = m[${r}] - ${l[r]};
        if (k < 0)  return constant;
        if (k >= ${t[r]}) return constant;
        offset += k * ${n[r]};
        `;return`
      float padA(int m[${p}]) {
        const float constant = float(${d});
        int offset = 0;
        int k = 0;
        ${o}
        vec2 coords = offsetToCoords(offset, ${s}, ${u});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `},Oc=(e,t,n,s,u,l)=>{let d=t.length,p="";for(let o=d-1;o>=0;--o)p+=`
        k = m[${o}] - ${l[o]};
        if (k < 0) { k = -k; }
        {
          const int _2n_1 = ${2*(t[o]-1)};
          k = int( mod( float(k), float(_2n_1) ) ) ;
          if(k >= ${t[o]}) { k = _2n_1 - k; }
        }
        offset += k * ${n[o]};
        `;return`
      float padA(int m[${d}]) {
        int offset = 0;
        int k = 0;
        ${p}
        vec2 coords = offsetToCoords(offset, ${s}, ${u});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `},Ec=(e,t,n,s,u,l)=>{let d=t.length,p="";for(let o=d-1;o>=0;--o)p+=`
        k = m[${o}] - ${l[o]};
        if (k < 0)  k = 0;
        if (k >= ${t[o]}) k = ${t[o]-1};
        offset += k * ${n[o]};
      `;return`
      float padA(int m[${d}]) {
        int offset = 0;
        int k = 0;
        ${p}
        vec2 coords = offsetToCoords(offset, ${s}, ${u});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `}}),W0,K0,Wo,X0,Z0,J0,Y0,Ko,Xo,Pc,Zo,Q0,On,Jo,En,Ac,mI=N(()=>{"use strict";Je(),ke(),Se(),W0=(e,t,n)=>{On(t);let s={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[e.run({...s,get:()=>Wo(t,s,!1,n)},t)]},K0=e=>{let t=e.attributes.getString("auto_pad","NOTSET"),n=e.attributes.getInt("ceil_mode",0),s=e.attributes.getInt("count_include_pad",0)!==0,u=e.attributes.getInts("kernel_shape"),l=e.attributes.getInts("strides",[]),d=e.attributes.getInts("pads",[]);if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return Me({autoPad:t,ceilMode:n,countIncludePad:s,kernelShape:u,strides:l,pads:d})},Wo=(e,t,n,s)=>{let[u,l]=Xo(e,s,n),d=fe.size(u.kernelShape),p="value += _X(x);",o="";u.countIncludePad?o+=`value /= float(${d});`:o+=`value /= float(${d} - pad);`;let r=`
        ${Jo(e[0].dims,u,p,o,"0.0")}
      `;return{...t,output:{dims:l,type:e[0].type,textureType:0},shaderSource:r}},X0=(e,t,n)=>{On(t);let s={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${n.countIncludePad}`};return[e.run({...s,get:()=>Wo(t,s,!0,n)},t)]},Z0=e=>{let t=e.attributes.getInt("count_include_pad",0)!==0;return Me({autoPad:"",ceilMode:0,countIncludePad:t,kernelShape:[],strides:[],pads:[]})},J0=(e,t,n)=>{On(t);let s={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[e.run({...s,get:()=>Ko(t,s,!1,n)},t)]},Y0=e=>{let t=e.attributes.getString("auto_pad","NOTSET"),n=e.attributes.getInt("ceil_mode",0),s=e.attributes.getInts("kernel_shape"),u=e.attributes.getInts("strides",[]),l=e.attributes.getInts("pads",[]),d=e.attributes.getInt("storage_order",0),p=e.attributes.getInts("dilations",[]);if(d!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return Me({autoPad:t,ceilMode:n,countIncludePad:!1,kernelShape:s,strides:u,pads:l,storageOrder:d,dilations:p})},Ko=(e,t,n,s)=>{let[u,l]=Xo(e,s,n),d=`
      ${Jo(e[0].dims,u,`
      value = max(_X(x), value);
    `,"","-1e5")}
    `;return{...t,output:{dims:l,type:e[0].type,textureType:0},shaderSource:d}},Xo=(e,t,n)=>{let s=e[0].dims.slice(),u=Object.hasOwnProperty.call(t,"dilations"),l=t.kernelShape.slice(),d=t.strides.slice(),p=u?t.dilations.slice():[],o=t.pads.slice();Vi.adjustPoolAttributes(n,s,l,d,p,o);let r=Vi.computePoolOutputShape(n,s,d,p,l,o,t.autoPad),i=Object.assign({},t);return u?Object.assign(i,{kernelShape:l,strides:d,pads:o,dilations:p,cacheKey:t.cacheKey}):Object.assign(i,{kernelShape:l,strides:d,pads:o,cacheKey:t.cacheKey}),[i,r]},Pc={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},Zo={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},Q0=(e,t)=>(On(t),[e.run({...Zo,get:()=>Ko(t,Zo,!0,Pc)},t)]),On=e=>{if(!e||e.length!==1)throw new Error("Pool ops requires 1 input.");if(e[0].type!=="float32"&&e[0].type!=="float64")throw new Error("Invalid input type.")},Jo=(e,t,n,s,u)=>{let l=e.length;if(t.kernelShape.length<=2){let d=t.kernelShape[t.kernelShape.length-1],p=t.strides[t.strides.length-1],o=t.pads[t.pads.length/2-1],r=t.pads[t.pads.length-1],i=e[l-1],a="",c="",h="";if(o+r!==0?a=`
          for (int i = 0; i < ${d}; i++) {
            x[${l} - 1] = indices[${l} - 1] * ${p} - ${o} + i;
            if (x[${l} - 1] < 0 || x[${l} - 1] >= ${i}) {
              pad++;
              continue;
            }
            ${n}
          }`:a=`
          for (int i = 0; i < ${d}; i++) {
            x[${l} - 1] = indices[${l} - 1] * ${p} - ${o} + i;
            ${n}
          }`,t.kernelShape.length===2){let m=t.kernelShape[t.kernelShape.length-2],b=t.strides[t.strides.length-2],x=t.pads[t.pads.length/2-2],v=t.pads[t.pads.length-2],w=e[l-2];x+v!==0?c=`
            for (int j = 0; j < ${m}; j++) {
              x[${l} - 2] = indices[${l} - 2] * ${b} - ${x} + j;
              if (x[${l} - 2] < 0 || x[${l} - 2] >= ${w}) {
                pad+= ${d};
                continue;
              }
          `:c=`
            for (int j = 0; j < ${m}; j++) {
              x[${l} - 2] = indices[${l} - 2] * ${b} - ${x} + j;
            `,h=`
          }
        `}return`
        float process(int indices[${l}]) {
          int x[${l}];
          copyVec(indices, x);

          float value = ${u};
          int pad = 0;
          ${c}
          ${a}
          ${h}
          ${s}
          return value;
        }
      `}else{let d=fe.size(t.kernelShape),p=fe.computeStrides(t.kernelShape),o=p.length,r=t.pads.length,i=Ac(o),a=En(e,"inputDims"),c=En(t.pads,"pads"),h=En(p,"kernelStrides"),m=En(t.strides,"strides"),b=t.pads.reduce((v,w)=>v+w),x="";return b?x=`
            if (x[j] >= inputDims[j] || x[j] < 0) {
              pad++;
              isPad = true;
              break;
            }
          }
          if (!isPad) {
            ${n}
          }`:x=`
          }
          ${n}
        `,`
        ${i}
        float process(int indices[${l}]) {
          int x[${l}];
          copyVec(indices, x);
          int offset[${o}];
          int pads[${r}];
          int inputDims[${l}];
          int kernelStrides[${o}];
          int strides[${o}];
          ${c}
          ${a}
          ${m}
          ${h}

          float value = ${u};
          int pad = 0;
          bool isPad = false;
          for (int i = 0; i < ${d}; i++) {
            offsetToIndices(i, kernelStrides, offset);
            isPad = false;
            for (int j = ${l} - ${o}; j < ${l}; j++) {
              x[j] = indices[j] * strides[j - ${l} + ${o}]
                + offset[j - ${l} + ${o}] - pads[j - 2];
              ${x}
          }
          ${s}

          return value;
        }
      `}},En=(e,t)=>{let n="";for(let s=0;s<e.length;s++)n+=`
      ${t}[${s}] = ${e[s]};
    `;return n},Ac=e=>`
  void offsetToIndices(int offset, int[${e}] strides, out int[${e}] indices) {
    if (${e} == 0) {
      return;
    }
    for (int i = 0; i < ${e} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${e} - 1] = offset;
  }`}),tr,dr,kc,Dc,e_,t_,r_,n_,i_,o_,a_,gI=N(()=>{"use strict";Je(),io(),ke(),Se(),tr=(e,t,n,s,u)=>{Dc(t);let l={name:s,inputNames:["A"],inputTypes:[0]};return[e.run({...l,cacheHint:n.cacheKey,get:()=>kc(e,t,n,s,u,l)},t)]},dr=e=>{let t=e.attributes.getInts("axes",[]),n=e.attributes.getInt("keepdims",1)===1;return Me({axes:t,keepDims:n})},kc=(e,t,n,s,u,l)=>{let d=[],p=t[0].dims.length||1,o=[],r=fe.normalizeAxes(n.axes,t[0].dims.length),i=u(t,r),a=i[1];for(let h=0;h<t[0].dims.length;h++)r.indexOf(h)>=0||r.length===0?(n.keepDims&&d.push(1),a=`
          for(int j${h} = 0; j${h} < ${t[0].dims[h]}; j${h}++) {
            inputIdx[${h}] = j${h};
            ${a}
          }`):(o.push(`inputIdx[${h}] = outputIdx[${d.length}];`),d.push(t[0].dims[h]));let c=`
      float process(int outputIdx[${d.length||1}]) {
        float value;                 // final result
        int inputIdx[${p}];      // addressing input data
        ${o.join(`
`)}
        ${i[0]}       // init ops for reduce max/min
        ${a}
        ${i[2]}       // final computation for reduce mean
        return value;
      }`;return{...l,output:{dims:d,type:t[0].type,textureType:0},shaderSource:c}},Dc=e=>{if(!e||e.length!==1)throw new Error("Reduce op requires 1 input.");if(oi.indexOf(e[0].type)===-1)throw new Error("Invalid input type.")},e_=(e,t,n)=>tr(e,t,n,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),t_=(e,t,n)=>tr(e,t,n,"ReduceMean",(s,u)=>{let l=1;for(let d=0;d<s[0].dims.length;d++)(u.indexOf(d)>=0||u.length===0)&&(l*=s[0].dims[d]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${l}.;`]}),r_=(e,t,n)=>tr(e,t,n,"ReduceMax",(s,u)=>{let l=[];for(let d=0;d<s[0].dims.length;d++)(u.indexOf(d)>=0||u.length===0)&&l.push(`inputIdx[${d}] = 0;`);return[`${l.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),n_=(e,t,n)=>tr(e,t,n,"ReduceMin",(s,u)=>{let l=[];for(let d=0;d<s[0].dims.length;d++)(u.indexOf(d)>=0||u.length===0)&&l.push(`inputIdx[${d}] = 0;`);return[`${l.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),i_=(e,t,n)=>tr(e,t,n,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),o_=(e,t,n)=>tr(e,t,n,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),a_=(e,t,n)=>tr(e,t,n,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])}),s_,bI=N(()=>{"use strict";ke(),s_=(e,t)=>{let n=fe.calculateReshapedDims(t[0].dims,t[1].integerData);return e.session.pack?[e.reshapePacked(t[0],n)]:[e.reshapeUnpacked(t[0],n)]}}),Yo,Fs,u_,l_,Zn,Nc,Ls,qi,d_=N(()=>{"use strict";Je(),Le(),Se(),Yo={name:"Upsample",inputNames:["X"],inputTypes:[0]},Fs=(e,t,n)=>(Ls(t,n),[e.run({...Yo,cacheHint:n.cacheKey,get:()=>Nc(e,t,n)},t)]),u_=e=>Zn(e,7),l_=e=>Zn(e,9),Zn=(e,t)=>{let n=t>=10,s=e.attributes.getString("mode","nearest");if(s!=="nearest"&&s!=="linear"&&(t<11||s!=="cubic"))throw new Error(`unrecognized mode: ${s}`);let u=[];t<9&&(u=e.attributes.getFloats("scales"),qi(u,s,n));let l=e.attributes.getFloat("extrapolation_value",0),d=t>10?e.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(d)===-1)throw new Error(`coordinate_transform_mode '${d}' is not supported`);let p=d==="tf_crop_and_resize",o=p,r=s==="nearest"&&t>=11?e.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(r)===-1)throw new Error(`nearest_mode '${r}' is not supported`);let i=e.attributes.getFloat("cubic_coeff_a",-.75),a=e.attributes.getInt("exclude_outside",0)!==0;if(a&&s!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let c=t<11?!0:s==="nearest"&&d==="asymmetric"&&r==="floor",h=0,m=0,b=0;return t>10?e.inputs.length>2?(h=1,m=2,b=3):(m=1,b=2):t===9&&(m=1),Me({opset:t,isResize:n,mode:s,scales:u,extrapolationValue:l,coordinateTransformMode:d,useExtrapolation:o,needRoiInput:p,nearestMode:r,cubicCoefficientA:i,excludeOutside:a,useNearest2xOptimization:c,roiInputIdx:h,scalesInputIdx:m,sizesInputIdx:b})},Nc=(e,t,n)=>{let s=Te(e.session.backend.glContext.version),[u,l]=e.calculateTextureWidthAndHeight(t[0].dims,0),d=t[0].dims.map((b,x)=>Math.floor(b*n.scales[x])),[p,o]=e.calculateTextureWidthAndHeight(d,0),r=d.length,i=new Array(r),a=new Array(r),c=`
      int output_pitches[${r}];
      int input_pitches[${r}];
      `;for(let b=r-1;b>=0;b--)i[b]=b===r-1?1:i[b+1]*d[b+1],a[b]=b===r-1?1:a[b+1]*t[0].dims[b+1],c+=`
        output_pitches[${b}] = ${i[b]};
        input_pitches[${b}] = ${a[b]};
        `;let h=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${u}, ${l});
        float value = getColorAsFloat(${s.texture2D}(X, coords));
        return value;
      }
      `,m=n.mode==="nearest"?`
    ${h}
    float process(int indices[${r}]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${p}, ${o});

      ${c}

      int d, m;
      for (int dim = 0; dim < ${r}; ++dim) {
        d = output_index / output_pitches[dim];
        m = output_index - d * output_pitches[dim];
        output_index = m;

        if (scales[dim] != 1 && d > 0) {
          int d2 = d / scales[dim];
          m = d - d2 * scales[dim];
          d = d2;
        }
        input_index += input_pitches[dim] * d;
      }

      return getInputFloat(input_index);
    }`:r===4?`
    ${h}
    float process(int indices[4]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${p}, ${o});

      ${c}

      int m;
      int index_of_dim0, index_of_dim1, index_of_dim2, index_of_dim3;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m / output_pitches[1];
      m = m - index_of_dim1 * output_pitches[1];
      index_of_dim2 = m / output_pitches[2];
      m = m - index_of_dim2 * output_pitches[2];
      index_of_dim3 = m;

      int index_of_input_dim2, index_of_input_dim3, x_offset, y_offset;
      index_of_input_dim2 = index_of_dim2 / scales[2];
      y_offset = index_of_dim2 - index_of_input_dim2 * scales[2];
      index_of_input_dim3 = index_of_dim3 / scales[3];
      x_offset = index_of_dim3 - index_of_input_dim3 * scales[3];

      input_index = index_of_dim0 * input_pitches[0] +
            index_of_dim1 * input_pitches[1] +
            index_of_input_dim2 * input_pitches[2] +
            index_of_input_dim3;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim2 = false;
      if (index_of_input_dim2 == (${t[0].dims[2]} - 1)) {
        // It's the end in dimension 2
        x01 = x00;
        end_of_dim2 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[2]);
      }

      if (index_of_input_dim3 == (input_pitches[2] - 1)) {
        // It's the end in dimension 3
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim2 ? x10 : getInputFloat(input_index + input_pitches[2] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[2]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[2]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[3]);
    }`:`
    ${h}
    float process(int indices[2]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${p}, ${o});

      ${c}

      int m;
      int index_of_dim0, index_of_dim1;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m;

      int index_of_input_dim0, index_of_input_dim1, x_offset, y_offset;
      index_of_input_dim0 = index_of_dim0 / scales[0];
      y_offset = index_of_dim0 - index_of_input_dim0 * scales[0];
      index_of_input_dim1 = index_of_dim1 / scales[1];
      x_offset = index_of_dim1 - index_of_input_dim1 * scales[1];

      input_index = index_of_input_dim0 * input_pitches[0] + index_of_input_dim1;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim0 = false;
      if (index_of_input_dim0 == (${t[0].dims[0]} - 1)) {
        // It's the end in dimension 0
        x01 = x00;
        end_of_dim0 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[0]);
      }

      if (index_of_input_dim1 == (input_pitches[0] - 1)) {
        // It's the end in dimension 1
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim0 ? x10 : getInputFloat(input_index + input_pitches[0] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[0]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[0]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[1]);
    }`;return{...Yo,output:{dims:d,type:t[0].type,textureType:0},shaderSource:m,variables:[{name:"scales",type:"int",arrayLength:n.scales.length,data:n.scales.map(b=>Math.ceil(b))}]}},Ls=(e,t)=>{if(!e||t.opset<9&&e.length!==1||t.opset>=9&&t.opset<11&&e.length!==2||t.opset>=11&&e.length<2)throw new Error("invalid inputs.");if(t.scales.length>0&&e[0].dims.length!==t.scales.length)throw new Error("Invalid input shape.");if(e[0].type==="string")throw new Error("Invalid input tensor types.")},qi=(e,t,n)=>{if(n){for(let s of e)if(s<=0)throw new Error("Scale value should be greater than 0.")}else for(let s of e)if(s<1)throw new Error("Scale value should be greater than or equal to 1.");if((t==="linear"||t==="cubic")&&e.length!==2&&(e.length!==4||e[0]!==1||e[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${n?"Resize":"Upsample"} opeartor.`)}}),xi,Vs,p_,c_,Cc,zc,Rc,Bc,yI=N(()=>{"use strict";Le(),Se(),Ht(),fn(),d_(),xi={name:"Resize",inputNames:["A"],inputTypes:[2]},Vs=(e,t,n)=>(Ls(t,n),[e.run({...xi,cacheHint:n.cacheKey,get:()=>Cc(e,t,n)},t)]),p_=e=>Zn(e,10),c_=e=>Zn(e,11),Cc=(e,t,n)=>{let s=Te(e.session.backend.glContext.version),[u,l]=zc(t,n);if(u.every(w=>w===1)&&n.coordinateTransformMode!=="tf_crop_and_resize")return{...xi,output:{dims:l,type:t[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${s.texture2D}(X, TexCoords);
                    ${s.output} = v;
                }`};let d=l.length;if(d<2)throw new Error(`output dimension should be at least 2, but got ${d}`);let p=l[d-2],o=l[d-1],r=t[0].dims;if(d!==r.length)throw new Error(`output dimension should match input ${r.length}, but got ${d}`);let i=r[d-2],a=r[d-1],c=u[d-2],h=u[d-1],m="";if(n.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${n.mode}'`);switch(n.coordinateTransformMode){case"asymmetric":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${o}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${p}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${o}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${p}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${o}.0 - 1.0, ${p}.0 - 1.0, ${o}.0 - 1.0,
                            ${p}.0 - 1.0);
                        vec4 original = vec4(${a}.0 - 1.0, ${i}.0 - 1.0, ${a}.0 - 1.0,
                            ${i}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${n.coordinateTransformMode}'`)}let b=cr(d),x=ni(),v=`
            const vec2 inputWH = vec2(${i}.0, ${a}.0);
            const vec4 scaleWHWH = vec4(float(${c}), float(${h}), float(${c}), float(${h}));
            ${x}
            ${m}
            float getAValue(int x10, int r, int c, int d) {
                return getChannel(getA(x10, r, c, d), vec2(c, d));
            }
            void main() {
                ${b} rc = getOutputCoords();

                int batch = rc[0];
                int depth = rc[1];

                // retrieve the 4 coordinates that is used in the 4 packed output values.
                ivec4 coords = ivec4(rc.wz, rc.w + 1, rc.z + 1);

                // calculate the source index in fraction
                vec4 sourceFrac = getSourceFracIndex(coords);

                // get the lower and upper bound of the 4 values that will be packed into one texel.
                ivec4 x00 = ivec4(max(sourceFrac.xy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xy)));
                ivec4 x01 = ivec4(max(sourceFrac.xw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xw)));
                ivec4 x10 = ivec4(max(sourceFrac.zy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zy)));
                ivec4 x11 = ivec4(max(sourceFrac.zw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zw)));

                bool hasNextRow = rc.w < ${p-1};
                bool hasNextCol = rc.z < ${o-1};

                // pack x00, x01, x10, x11's top-left corner into one vec4 structure
                vec4 topLeft = vec4(
                    getAValue(batch, depth, x00.x, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.y) : 0.0);

                // pack x00, x01, x10, x11's top-right corner into one vec4 structure
                vec4 topRight = vec4(
                    getAValue(batch, depth, x00.x, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.w) : 0.0);

                // pack x00, x01, x10, x11's bottom-left corner into one vec4 structure
                vec4 bottomLeft = vec4(
                    getAValue(batch, depth, x00.z, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.y) : 0.0);

                // pack x00, x01, x10, x11's bottom-right corner into one vec4 structure
                vec4 bottomRight = vec4(
                    getAValue(batch, depth, x00.z, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.w) : 0.0);

                // calculate the interpolation fraction on u and v direction
                vec4 frac = vec4(sourceFrac) - floor(sourceFrac);
                vec4 clampFrac = clamp(frac, vec4(0.0), vec4(1.0));

                vec4 top = mix(topLeft, topRight, clampFrac.ywyw);
                vec4 bottom = mix(bottomLeft, bottomRight, clampFrac.ywyw);
                vec4 newValue = mix(top, bottom, clampFrac.xxzz);

                ${s.output} = vec4(newValue);
            }
        `;return{...xi,output:{dims:l,type:t[0].type,textureType:2},hasMain:!0,shaderSource:v}},zc=(e,t)=>{let n=e[0].dims,s=t.scales,u;if(s.length===0){let d=e[t.scalesInputIdx];if(d&&d.size!==0){if(e[t.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");s=Rc(d,t.mode,t.isResize)}else{let p=e[t.sizesInputIdx];if(!p||p.size===0)throw new Error("Either scales or sizes MUST be provided as input.");u=Array.from(p.integerData),s=Bc(u,n,t.mode,t.isResize)}}else if(e[t.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let l=u||n.map((d,p)=>Math.floor(d*s[p]));return[s,l]},Rc=(e,t,n)=>{let s=Array.from(e.floatData);return qi(s,t,n),s},Bc=(e,t,n,s)=>{let u=t.length,l=new Array(u);for(let d=0,p=u;d<p;d++)if(t[d]===0){if(e[d]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");l[d]=1}else l[d]=e[d]/t[d];return qi(l,n,s),l}}),h_,Mc,_I=N(()=>{"use strict";hn(),h_=(e,t)=>(Mc(t),[new ct([t[0].dims.length],"int32",void 0,void 0,new Int32Array(t[0].dims))]),Mc=e=>{if(!e||e.length!==1)throw new Error("Shape requires 1 input.")}}),$i,f_,m_,Qo,jc,g_,Fc,Lc,wI=N(()=>{"use strict";Je(),io(),ke(),Se(),$i={name:"Slice",inputNames:["A"],inputTypes:[0]},f_=(e,t,n)=>(jc(t),[e.run({...$i,cacheHint:n.cacheKey,get:()=>Qo(e,t[0],n)},t)]),m_=e=>{let t=e.attributes.getInts("starts"),n=e.attributes.getInts("ends"),s=e.attributes.getInts("axes",[]);return Me({starts:t,ends:n,axes:s})},Qo=(e,t,n)=>{let s=n.axes.length===0?t.dims.slice(0).map((i,a)=>a):n.axes,u=fe.normalizeAxes(s,t.dims.length),l=n.starts.map((i,a)=>i>t.dims[u[a]]-1?t.dims[u[a]]:fe.normalizeAxis(i,t.dims[u[a]])),d=n.ends.map((i,a)=>i>t.dims[u[a]]-1?t.dims[u[a]]:fe.normalizeAxis(i,t.dims[u[a]])),p=t.dims.slice(),o=[];for(let i=0;i<u.length;i++)p[u[i]]=d[i]-l[i],l[i]>0&&o.push(`outputIdx[${u[i]}] += ${l[i]};`);let r=`
      float process(int outputIdx[${p.length}]) {
        ${o.join(`
      `)}
        return _A(outputIdx);
      }`;return{...$i,output:{dims:p,type:t.type,textureType:0},shaderSource:r}},jc=e=>{if(!e||e.length!==1)throw new Error("Slice requires 1 input.");if(oi.indexOf(e[0].type)===-1)throw new Error("Invalid input type.")},g_=(e,t)=>{Lc(t);let n=Fc(e,t);return[e.run({...$i,cacheHint:n.cacheKey,get:()=>Qo(e,t[0],n)},[t[0]])]},Fc=(e,t)=>{if(!e.session.isInitializer(t[1].dataId)||!e.session.isInitializer(t[2].dataId)||t.length>=4&&!e.session.isInitializer(t[3].dataId)||t.length>=5&&!e.session.isInitializer(t[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(t.length>=5&&t[4].integerData.some(d=>d!==1))throw new Error("currently non-1 steps is not supported for Slice");let n=Array.from(t[1].integerData),s=Array.from(t[2].integerData),u=t.length>=4?Array.from(t[3].integerData):[],l=`${u};${n};${s}`;return{starts:n,ends:s,axes:u,cacheKey:l}},Lc=e=>{if(!e||e.length<3||e.length>5)throw new Error("Invalid input number.");if(e[1].type!=="int32"||e[1].dims.length!==1)throw new Error("Invalid input type.");if(e[2].type!=="int32"||e[2].dims.length!==1)throw new Error("Invalid input type.");if(e.length>=4&&(e[3].type!=="int32"||e[3].dims.length!==1))throw new Error("Invalid input type.");if(e.length>=5&&(e[4].type!=="int32"||e[4].dims.length!==1))throw new Error("Invalid input type.")}}),ea,ta,ra,b_,y_,__,w_,na,Vc,Uc,qc,ia,vI=N(()=>{"use strict";Je(),ke(),Le(),Se(),wu(),ea={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},ta={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},ra={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},b_=(e,t,n)=>{ia(t);let s=t[0].dims.slice(),u=fe.normalizeAxis(n.axis,s.length),l=fe.sizeToDimension(s,u),d=fe.sizeFromDimension(s,u);return na(e,t,n,l,d)},y_=e=>Me({axis:e.attributes.getInt("axis",1)}),__=e=>Me({axis:e.attributes.getInt("axis",-1)}),w_=(e,t,n)=>{ia(t);let s=t[0].dims.slice(),u=fe.normalizeAxis(n.axis,s.length),l=s.length,d=u!==l-1,p=[],o=[],r=[],i;d&&(o=Array.from({length:l}).map((m,b)=>b),o[u]=l-1,o[l-1]=u,o.map(m=>p.push(s[m])),i=Me({perm:o}),r=ei(e,t,i));let a=d?fe.sizeToDimension(p,l-1):fe.sizeToDimension(s,l-1),c=d?fe.sizeFromDimension(p,l-1):fe.sizeFromDimension(s,l-1),h=na(e,d?r:t,n,a,c);return d?ei(e,h,i):h},na=(e,t,n,s,u)=>{let l=Vc(e,t[0],s,u,[s]),d=e.run({...ea,cacheHint:n.cacheKey,get:()=>l},t),p=Uc(e,t[0],s,u,l.output.dims,[s]),o=e.run({...ta,cacheHint:n.cacheKey,get:()=>p},[t[0],d]),r=qc(e,t[0],s,u,l.output.dims,p.output.dims);return[e.run({...ra,cacheHint:n.cacheKey,get:()=>r},[t[0],d,o])]},Vc=(e,t,n,s,u)=>{let[l,d]=e.calculateTextureWidthAndHeight(t.dims,0),p=u.length;if(n<1||s<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(u.length!==1)throw new Error("Dimensionality of the output should be 1");if(u[0]!==n)throw new Error("Shape of the output should be equal to logical row count");let o=Te(e.session.backend.glContext.version),r=`
      float process(int[${p}] indices) {
        int logical_row_start_offset = indices[0] * ${s};

        float max = getColorAsFloat(${o.texture2D}(A, offsetToCoords(logical_row_start_offset, ${l},
        ${d} )));
        for(int i=1; i<${s}; ++i)
        {
          float current = getColorAsFloat(${o.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${l}, ${d})));
          if(current > max)
          max = current;
        }

        return max;
      }`;return{...ea,output:{dims:u,type:t.type,textureType:0},shaderSource:r}},Uc=(e,t,n,s,u,l)=>{let[d,p]=e.calculateTextureWidthAndHeight(t.dims,0),o=l.length;if(n<1||s<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(l.length!==1)throw new Error("Dimensionality of the output should be 1");if(l[0]!==n)throw new Error("Shape of the output should be equal to logical row count");if(u.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(u[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let r=Te(e.session.backend.glContext.version),i=`
      float process(int[${o}] indices) {
        int logical_row_start_offset = indices[0] * ${s};

        float norm_factor = 0.0;
        float max = _Max(indices);
        for(int i=0; i<${s}; ++i)
        {
          norm_factor += exp(getColorAsFloat(${r.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${d}, ${p}))) - max);
        }

        return norm_factor;
      }`;return{...ta,output:{dims:l,type:t.type,textureType:0},shaderSource:i}},qc=(e,t,n,s,u,l)=>{let[d,p]=e.calculateTextureWidthAndHeight(t.dims,0),o=t.dims.length;if(n<1||s<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(u.length!==1||l.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(u[0]!==n||l[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let r=`
      float process(int[${o}] indices) {

      // get offset of current logical tensor index from the 2-D texture coordinates (TexCoords)
      int offset = coordsToOffset(TexCoords, ${d}, ${p});

      //determine the logical row for this index
      int logical_row_index[1];
      logical_row_index[0] = offset / ${s};

      float norm_factor = _Norm(logical_row_index);

      // avoid possible division by 0
      // if norm_facor is 0, all elements are zero
      // if so, return 0
      if(norm_factor == 0.0)
        return 0.0;

      return exp(_A(indices) - _Max(logical_row_index)) / norm_factor;
    }`;return{...ra,output:{dims:t.dims,type:t.type,textureType:0},shaderSource:r}},ia=e=>{if(!e||e.length!==1)throw new Error("Softmax requires 1 input.");if(e[0].type!=="float32"&&e[0].type!=="float64")throw new Error("Invalid input type")}}),oa,v_,x_,Gc,Hc,Wc,xI=N(()=>{"use strict";Je(),ke(),Se(),oa={name:"Split",inputNames:["A"],inputTypes:[0]},v_=(e,t,n)=>{Wc(t);let s=fe.normalizeAxis(n.axis,t[0].dims.length),u=Gc(e,t,s,n),l=[];for(let d=0;d<u;++d)l.push(e.run({...oa,cacheHint:`${n.cacheKey};${d}`,get:()=>Hc(e,t[0],n,s,d)},t));return l},x_=e=>{let t=e.attributes.getInt("axis",0),n=e.attributes.getInts("split",[]),s=e.outputs.length;return Me({axis:t,split:n,numOutputs:s})},Gc=(e,t,n,s)=>{let[,u]=Ss.splitShape(t[0].dims,n,s.split,s.numOutputs);return u.length},Hc=(e,t,n,s,u)=>{let[l,d]=Ss.splitShape(t.dims,s,n.split,n.numOutputs),p=d[u],o=l[u],r=`
      float process(int indices[${o.length}]) {
        indices[${s}] += ${p};
        return _A(indices);
      }
    `;return{...oa,cacheHint:`${n.cacheKey}:${u}`,output:{dims:o,type:t.type,textureType:0},shaderSource:r}},Wc=e=>{if(!e||e.length!==1)throw new Error("Split requires one input.");if(e[0].type!=="int8"&&e[0].type!=="uint8"&&e[0].type!=="int16"&&e[0].type!=="uint16"&&e[0].type!=="int32"&&e[0].type!=="uint32"&&e[0].type!=="float32"&&e[0].type!=="float64"&&e[0].type!=="bool")throw new Error("Invalid input type.")}}),Us,$_,T_,Kc,Xc,$I=N(()=>{"use strict";ke(),Us=(e,t,n)=>{Kc(t);let s=fe.squeezeShape(t[0].dims,n);return[e.reshapeUnpacked(t[0],s)]},$_=(e,t)=>(Xc(t),Us(e,[t[0]],Array.from(t[1].integerData))),T_=e=>e.attributes.getInts("axes"),Kc=e=>{if(!e||e.length!==1)throw new Error("Squeeze requires 1 input.");if(e[0].type==="string")throw new Error("invalid input tensor types.")},Xc=e=>{if(!e||e.length!==2)throw new Error("Squeeze requires 2 inputs.");if(e[1].type!=="int32")throw new Error("Invalid input type.")}}),I_,Zc,Jc,TI=N(()=>{"use strict";Le(),Se(),I_=(e,t)=>{Jc(t);let n={name:"Sum",inputNames:t.map((s,u)=>`X${u}`),inputTypes:new Array(t.length).fill(0)};return[e.run({...n,get:()=>Zc(e,t,n)},t)]},Zc=(e,t,n)=>{let s=Te(e.session.backend.glContext.version),u=t[0].dims.slice(),l=`
      void main() {
        vec4 result = ${t.map((d,p)=>`${s.texture2D}(X${p},TexCoords)`).join(" + ")};
        ${s.output} = result;
      }
    `;return{...n,output:{dims:u,type:t[0].type,textureType:0},hasMain:!0,shaderSource:l}},Jc=e=>{if(!e||e.length===0)throw new Error("Sum requires inputs.");let t=e[0].dims.length;for(let n=1;n<e.length;n++){if(t!==e[n].dims.length)throw new Error("Input shapes are mismatched.");for(let s=0;s<t;s++)if(e[0].dims[s]!==e[n].dims[s])throw new Error("Input shapes are not matched.")}if(e[0].type!=="float32"&&e[0].type!=="float64")throw new Error("Invalid input type.");for(let n=1;n<e.length;n++)if(e[0].type!==e[n].type)throw new Error("Input types are not matched.")}}),S_,Yc,Qc,II=N(()=>{"use strict";io(),Se(),S_=(e,t)=>{Qc(t);let n={name:"Tile",inputNames:["A"],inputTypes:[0]};return[e.run({...n,get:()=>Yc(e,t,n)},t)]},Yc=(e,t,n)=>{let s=t[0].dims.slice(),u=new Array(s.length),l=[];for(let o=0;o<s.length;o++)u[o]=s[o]*t[1].numberData[o],l.push(`inputIdx[${o}] = int(mod(float(outputIdx[${o}]), ${s[o]}.));`);let d=u.length,p=`
      float process(int outputIdx[${d}]) {
        int inputIdx[${d}];
        ${l.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...n,output:{dims:u,type:t[0].type,textureType:0},shaderSource:p}},Qc=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 input.");if(e[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(e[1].dims[0]!==e[0].dims.length)throw new Error("Invalid input shape.");if(oi.indexOf(e[0].type)===-1)throw new Error("Invalid input type.");if(e[1].type!=="int32"&&e[1].type!=="int16")throw new Error("Invalid repeat type.")}}),qs,O_,E_,eh,th,SI=N(()=>{"use strict";ke(),qs=(e,t,n)=>{eh(t);let s=fe.unsqueezeShape(t[0].dims,n);return[e.reshapeUnpacked(t[0],s)]},O_=(e,t)=>(th(t),qs(e,[t[0]],Array.from(t[1].integerData))),E_=e=>e.attributes.getInts("axes"),eh=e=>{if(!e||e.length!==1)throw new Error("Unsqueeze requires 1 input.");if(e[0].type==="string")throw new Error("invalid input tensor types.")},th=e=>{if(!e||e.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(e[1].type!=="int32")throw new Error("Invalid input type.")}}),P_,OI=N(()=>{"use strict";f3(),E3(),P3(),k3(),_u(),iI(),oI(),aI(),sI(),uI(),lI(),dI(),hI(),bu(),fI(),mI(),gI(),bI(),yI(),_I(),wI(),vI(),xI(),$I(),TI(),II(),wu(),f0(),SI(),d_(),P_=[["Abs","","6+",Gy],["Acos","","7+",Hy],["Add","","7+",Iy],["And","","7+",Sy],["Asin","","7+",Wy],["Atan","","7+",Ky],["AveragePool","","7+",W0,K0],["BatchNormalization","","7+",vy,xy],["Cast","","6+",By,My],["Ceil","","6+",Jy],["Clip","","6-10",Ns,Xy],["Clip","","11+",Zy],["Concat","","4+",Fy,Ly],["Conv","","1+",Rs,Bs],["ConvTranspose","","1+",O0,E0],["Cos","","7+",Yy],["Div","","7+",Oy],["Dropout","","7+",Cs],["DepthToSpace","","1+",A0,k0],["Equal","","7+",Ey],["Elu","","6+",Qy,e0],["Exp","","6+",t0],["Flatten","","1+",D0,N0],["Floor","","6+",r0],["FusedConv","com.microsoft","1+",Rs,Bs],["Gather","","1+",C0,z0],["Gemm","","7-10",Ms,R0],["Gemm","","11+",Ms,B0],["GlobalAveragePool","","1+",X0,Z0],["GlobalMaxPool","","1+",Q0],["Greater","","7+",Py],["Identity","","1+",Cs],["ImageScaler","","1+",M0,j0],["InstanceNormalization","","6+",F0,L0],["LeakyRelu","","6+",n0,i0],["Less","","7+",Ay],["LRN","","1+",V0,U0],["Log","","6+",o0],["MatMul","","1+",_0,w0],["MaxPool","","1+",J0,Y0],["Mul","","7+",ky],["Neg","","6+",a0],["Not","","1+",s0],["Or","","7+",Dy],["Pad","","2-10",js,q0],["Pad","","11+",G0,H0],["Pow","","7+",Ny],["PRelu","","7+",Cy],["ReduceLogSum","","1+",o_,dr],["ReduceMax","","1+",r_,dr],["ReduceMean","","1+",t_,dr],["ReduceMin","","1+",n_,dr],["ReduceProd","","1+",i_,dr],["ReduceSum","","1-12",e_,dr],["ReduceSumSquare","","1+",a_,dr],["Relu","","6+",u0],["Reshape","","5+",s_],["Resize","","10",Vs,p_],["Resize","","11+",Vs,c_],["Shape","","1+",h_],["Sigmoid","","6+",l0],["Sin","","7+",d0],["Slice","","10+",g_],["Slice","","1-9",f_,m_],["Softmax","","1-12",b_,y_],["Softmax","","13+",w_,__],["Split","","2-12",v_,x_],["Sqrt","","6+",p0],["Squeeze","","1-12",Us,T_],["Squeeze","","13+",$_],["Sub","","7+",zy],["Sum","","6+",I_],["Tan","","7+",c0],["Tanh","","6+",h0],["Tile","","6+",S_],["Transpose","","1+",ei,P0],["Upsample","","7-8",Fs,u_],["Upsample","","9",Fs,l_],["Unsqueeze","","1-12",qs,E_],["Unsqueeze","","13+",O_],["Xor","","7+",Ry]]});function EI(e){let t={},n;for(;(n=Gs.exec(e))!==null;){let s=n[3].split(",").map(u=>{let l=u.trim().split(" ");return l&&l.length===2?{type:l[0],name:l[1]}:null}).filter(u=>u!==null);t[n[2]]={params:s,body:n[4]}}for(let s in t){let u=A_.replace("__FUNC__",s),l=new RegExp(u,"gm");for(;(n=l.exec(e))!==null;){let d=n[1],p=n[2],o=n[3].split(","),r=d?`${d} ${p};`:"",i=t[s].body,a="";t[s].params.forEach((h,m)=>{h&&(a+=`${h.type} ${h.name} = ${o[m]};
`)}),i=`${a}
 ${i}`,i=i.replace("return",`${p} = `);let c=`
      ${r}
      {
        ${i}
      }
      `;e=e.replace(n[0],c)}}return e=e.replace(Gs,""),e}var Gs,A_,PI=N(()=>{"use strict";Gs=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,A_="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function Vn(e,t){let n=[],s=[];for(let u=0;u<e.length;++u)e[u]!==1&&(n.push(e[u]),s.push(u));return{newShape:n,keptDims:s}}function AI(e){if(e.length===0)return 1;let t=e[0];for(let n=1;n<e.length;n++)t*=e[n];return t}function rh(e){let t=Math.ceil(Math.sqrt(e));return[t,Math.ceil(e/t)]}var k_,D_=N(()=>{"use strict";kt(),ke(),k_=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,t){let n=this.computeTexture(e,t);return t&&t.isPacked&&(n[0]/=2,n[1]/=2),t&&t.reverseWH?[n[1],n[0]]:n}computeTexture(e,t){let n=t&&t.isPacked;if(e.length===0)return n?[2,2]:[1,1];let s=this.maxTextureSize;if(t&&t.breakAxis!==void 0){let d=t.breakAxis>=e.length?1:e.slice(t.breakAxis).reduce((o,r)=>o*r),p=t.breakAxis<=0?1:e.slice(0,t.breakAxis).reduce((o,r)=>o*r);if(d>s||p>s)Ue.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${t.breakAxis}`);else return[d,p]}let u=e.slice(0);n&&(s=s*2,u=u.map((d,p)=>p>=u.length-2?u[p]%2===0?u[p]:u[p]+1:u[p]),u.length===1&&(u=[2,u[0]])),u.length!==2&&(u=Vn(u).newShape);let l=AI(u);return u.length<=1&&l<=s?[1,l]:u.length===2&&u[0]<=s&&u[1]<=s?u:u.length===3&&u[0]*u[1]<=s&&u[2]<=s?[u[0]*u[1],u[2]]:u.length===3&&u[0]<=s&&u[1]*u[2]<=s?[u[0],u[1]*u[2]]:u.length===4&&u[0]*u[1]*u[2]<=s&&u[3]<=s?[u[0]*u[1]*u[2],u[3]]:u.length===4&&u[0]<=s&&u[1]*u[2]*u[3]<=s?[u[0],u[1]*u[2]*u[3]]:n?rh(l/4).map(d=>d*2):rh(l)}}}),N_,kI=N(()=>{"use strict";ke(),fr(),Le(),D_(),Ht(),N_=class extends mn{constructor(e){super(e)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let e="offsetToCoords";return{offsetToCoords:new Q(`
      vec2 ${e}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let e="coordsToOffset";return{coordsToOffset:new Q(`
      int ${e}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let e=this.context.outputTextureLayout;return e.isPacked?this.getPackedOutputSamplingSnippet(e):this.getUnpackedOutputSamplingSnippet(e)}getPackedOutputSamplingSnippet(e){let t=e.unpackedShape,n=[e.width,e.height],s={},u="getOutputCoords";switch(t.length){case 0:s[u]=this.getOutputScalarCoords();break;case 1:s[u]=this.getOutputPacked1DCoords(t,n);break;case 2:s[u]=this.getOutputPacked2DCoords(t,n);break;case 3:s[u]=this.getOutputPacked3DCoords(t,n);break;default:s[u]=this.getOutputPackedNDCoords(t,n)}let l=`
      void setOutput(vec4 val) {
        ${Te(this.context.glContext.version).output} = val;
      }
    `,d="floatTextureSetRGBA";return s[d]=new Q(l),s}getUnpackedOutputSamplingSnippet(e){let t=e.unpackedShape,n=[e.width,e.height],s={},u="getOutputCoords";switch(t.length){case 0:s[u]=this.getOutputScalarCoords();break;case 1:s[u]=this.getOutputUnpacked1DCoords(t,n);break;case 2:s[u]=this.getOutputUnpacked2DCoords(t,n);break;case 3:s[u]=this.getOutputUnpacked3DCoords(t,n);break;case 4:s[u]=this.getOutputUnpacked4DCoords(t,n);break;case 5:s[u]=this.getOutputUnpacked5DCoords(t,n);break;case 6:s[u]=this.getOutputUnpacked6DCoords(t,n);break;default:throw new Error(`Unsupported output dimensionality: ${t.length}`)}let l=`
        void setOutput(float val) {
          ${Te(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,d="floatTextureSetR";return s[d]=new Q(l),s}getOutputScalarCoords(){return new Q(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(e,t){let n=t,s="";return n[0]===1?(s=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${n[1]}.0);
          }
        `,new Q(s)):n[1]===1?(s=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${n[0]}.0);
          }
        `,new Q(s)):(s=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${n[0]}, ${n[1]}));
          return 2 * (resTexRC.y * ${n[0]} + resTexRC.x);
        }
      `,new Q(s))}getOutputPacked2DCoords(e,t){let n="";if(Fn.arraysEqual(e,t))return n=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${t[0]}, ${t[1]}));
        }
      `,new Q(n);let s=t,u=Math.ceil(e[1]/2);return n=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${s[0]}, ${s[1]}));

          int index = resTexRC.y * ${s[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${u}) * 2;
          int c = 2 * (index / ${u});

          return ivec2(r, c);
        }
      `,new Q(n)}getOutputPacked3DCoords(e,t){let n=[t[0],t[1]],s=Math.ceil(e[2]/2),u=s*Math.ceil(e[1]/2),l=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          int index = resTexRC.y * ${n[0]} + resTexRC.x;

          int b = index / ${u};
          index -= b * ${u};

          // reverse r and c order for packed texture
          int r = imod(index, ${s}) * 2;
          int c = 2 * (index / ${s});

          return ivec3(b, r, c);
        }
      `;return new Q(l)}getOutputPackedNDCoords(e,t){let n=[t[0],t[1]],s=Math.ceil(e[e.length-1]/2),u=s*Math.ceil(e[e.length-2]/2),l=u,d="",p="b, r, c";for(let r=2;r<e.length-1;r++)l*=e[e.length-r-1],d=`
      int b${r} = index / ${l};
      index -= b${r} * ${l};
    `+d,p=`b${r}, `+p;let o=`
      ivec${e.length} getOutputCoords() {
        ivec2 resTexRC = ivec2(TexCoords.xy *
                              vec2(${n[0]}, ${n[1]}));
        int index = resTexRC.y * ${n[0]} + resTexRC.x;

        ${d}

        int b = index / ${u};
        index -= b * ${u};

        // reverse r and c order for packed texture
        int r = imod(index, ${s}) * 2;
        int c = 2 * (index / ${s});

        return ivec${e.length}(${p});
      }
    `;return new Q(o)}getOutputUnpacked1DCoords(e,t){let n=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          return resTexRC.y * ${t[0]} + resTexRC.x;
        }
      `;return new Q(n)}getOutputUnpacked2DCoords(e,t){let n=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          int r = index / ${e[1]};
          int c = index - r * ${e[1]};
          return ivec2(r, c);
        }
      `;return new Q(n)}getOutputUnpacked3DCoords(e,t){let n="",s=e.length,u=null;s<2&&(u=[]),u=new Array(s-1),u[s-2]=e[s-1];for(let p=s-3;p>=0;--p)u[p]=u[p+1]*e[p+1];let l=["r","c","d"],d=u.map((p,o)=>{let r=`int ${l[o]} = index / ${p}`,i=o===u.length-1?`int ${l[o+1]} = index - ${l[o]} * ${p}`:`index -= ${l[o]} * ${p}`;return`${r}; ${i};`}).join("");return n=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${d}
          return ivec3(r, c, d);
        }
      `,new Q(n)}getOutputUnpacked4DCoords(e,t){let n="",s=e.length,u=null;s<2&&(u=[]),u=new Array(s-1),u[s-2]=e[s-1];for(let p=s-3;p>=0;--p)u[p]=u[p+1]*e[p+1];let l=["r","c","d","d2"],d=u.map((p,o)=>{let r=`int ${l[o]} = index / ${p}`,i=o===u.length-1?`int ${l[o+1]} = index - ${l[o]} * ${p}`:`index -= ${l[o]} * ${p}`;return`${r}; ${i};`}).join("");return n=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${d}
          return ivec4(r, c, d, d2);
        }
      `,new Q(n)}getOutputUnpacked5DCoords(e,t){let n="",s=e.length,u=null;s<2&&(u=[]),u=new Array(s-1),u[s-2]=e[s-1];for(let p=s-3;p>=0;--p)u[p]=u[p+1]*e[p+1];let l=["r","c","d","d2","d3"],d=u.map((p,o)=>{let r=`int ${l[o]} = index / ${p}`,i=o===u.length-1?`int ${l[o+1]} = index - ${l[o]} * ${p}`:`index -= ${l[o]} * ${p}`;return`${r}; ${i};`}).join("");return n=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${d}
          return ivec5(r, c, d, d2, d3);
        }
      `,new Q(n)}getOutputUnpacked6DCoords(e,t){let n="",s=e.length,u=null;s<2&&(u=[]),u=new Array(s-1),u[s-2]=e[s-1];for(let p=s-3;p>=0;--p)u[p]=u[p+1]*e[p+1];let l=["r","c","d","d2","d3","d4"],d=u.map((p,o)=>{let r=`int ${l[o]} = index / ${p}`,i=o===u.length-1?`int ${l[o+1]} = index - ${l[o]} * ${p}`:`index -= ${l[o]} * ${p}`;return`${r}; ${i};`}).join("");return n=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${t[0]}, ${t[1]}));
         int index = resTexRC.y * ${t[0]} + resTexRC.x;
         ${d}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new Q(n)}getCommonUtilFuncs(){let e={},t="uvFromFlat";e[t]=new Q(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),t="packedUVfrom1D",e[t]=new Q(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="packedUVfrom2D",e[t]=new Q(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="packedUVfrom3D",e[t]=new Q(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="sampleTexture";let n=Te(this.context.glContext.version);return e[t]=new Q(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${n.texture2D}(textureSampler, uv).r;
        }`),e}getInputsSamplingSnippets(){let e={},t=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((n,s)=>{let u=this.context.inputTextureLayouts[s],l=Mo(n);u.isPacked?e[l]=this.getPackedSamplerFromInput(l,n,u):e[l]=this.getUnpackedSamplerFromInput(l,n,u);let d=QT(n);u.unpackedShape.length<=t.unpackedShape.length&&(u.isPacked?e[d]=this.getPackedSamplerAtOutputCoords(d,u,t,n):e[d]=this.getUnpackedSamplerAtOutputCoords(d,u,t,n))}),e}getPackedSamplerAtOutputCoords(e,t,n,s){let u=t.unpackedShape,l=n.unpackedShape,d=Mo(s),p=u.length,o=l.length,r=jt.getBroadcastDims(u,l),i=cr(o),a=o-p,c,h=dn();p===0?c="":o<2&&r.length>=1?c="coords = 0;":c=r.map(O=>`coords.${h[O+a]} = 0;`).join(`
`);let m="";o<2&&p>0?m="coords":m=u.map((O,E)=>`coords.${h[E+a]}`).join(", ");let b="return outputValue;",x=fe.size(u)===1,v=fe.size(l)===1;if(p===1&&!x&&!v)b=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if(x&&!v)o===1?b=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:b=`
          return vec4(outputValue.x);
        `;else if(r.length){let O=p-2,E=p-1;r.indexOf(O)>-1&&r.indexOf(E)>-1?b="return vec4(outputValue.x);":r.indexOf(O)>-1?b="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":r.indexOf(E)>-1&&(b="return vec4(outputValue.xx, outputValue.zz);")}let w=`
        int lastDim = coords.${h[o-1]};
        coords.${h[o-1]} = coords.${h[o-2]};
        coords.${h[o-2]} = lastDim;
      `,S=`
      vec4 ${e}() {
        ${i} coords = getOutputCoords();
        ${w}
        ${c}
        vec4 outputValue = ${d}(${m});
        ${b}
      }
    `;return new Q(S,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(e,t,n,s){let u=[n.width,n.height],l=[t.width,t.height],d=t.unpackedShape.length,p=n.unpackedShape.length,o=t.unpackedShape,r=n.unpackedShape,i=Mo(s);if(d===p&&Fn.arraysEqual(l,u)){let w=`
          float ${e}() {
            return sampleTexture(${s}, TexCoords);
          }
        `;return new Q(w,["coordinates.sampleTexture"])}let a=cr(p),c=jt.getBroadcastDims(o,r),h=p-d,m,b=dn();d===0?m="":p<2&&c.length>=1?m="coords = 0;":m=c.map(w=>`coords.${b[w+h]} = 0;`).join(`
`);let x="";p<2&&d>0?x="coords":x=t.unpackedShape.map((w,S)=>`coords.${b[S+h]}`).join(", ");let v=`
        float ${e}() {
          ${a} coords = getOutputCoords();
          ${m}
          return ${i}(${x});
        }
      `;return new Q(v,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(e,t,n){switch(n.unpackedShape.length){case 0:return this.getPackedSamplerScalar(e,t);case 1:return this.getPackedSampler1D(e,t,n);case 2:return this.getPackedSampler2D(e,t,n);case 3:return this.getPackedSampler3D(e,t,n);default:return this.getPackedSamplerND(e,t,n)}}getUnpackedSamplerFromInput(e,t,n){let s=n.unpackedShape;switch(s.length){case 0:return this.getUnpackedSamplerScalar(e,t,n);case 1:return this.getUnpackedSampler1D(e,t,n);case 2:return this.getUnpackedSampler2D(e,t,n);case 3:return this.getUnpackedSampler3D(e,t,n);case 4:return this.getUnpackedSampler4D(e,t,n);case 5:return this.getUnpackedSampler5D(e,t,n);case 6:return this.getUnpackedSampler6D(e,t,n);default:throw new Error(`Unsupported dimension ${s.length}-D`)}}getPackedSamplerScalar(e,t){let n=Te(this.context.glContext.version),s=`
          vec4 ${e}() {
            return ${n.texture2D}(${t}, halfCR);
          }
        `;return new Q(s)}getPackedSampler1D(e,t,n){let s=[n.width,n.height],u=[s[1],s[0]],l=Te(this.context.glContext.version),d=`vec4 ${e}(int index) {
      vec2 uv = packedUVfrom1D(
      ${u[0]}, ${u[1]}, index);
      return ${l.texture2D}(${t}, uv);
    }`;return new Q(d,["coordinates.packedUVfrom1D"])}getPackedSampler2D(e,t,n){let s=n.unpackedShape,u=[n.width,n.height],l=Te(this.context.glContext.version),d=u[0],p=u[1];if(u!=null&&Fn.arraysEqual(s,u)){let a=`vec4 ${e}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${p}.0, ${d}.0);
        return ${l.texture2D}(${t}, uv);
      }`;return new Q(a)}let o=u,r=Math.ceil(s[1]/2),i=`vec4 ${e}(int row, int col) {
      vec2 uv = packedUVfrom2D(${o[1]}, ${o[0]}, ${r}, row, col);
      return ${l.texture2D}(${t}, uv);
    }`;return new Q(i,["coordinates.packedUVfrom2D"])}getPackedSampler3D(e,t,n){let s=n.unpackedShape,u=[n.width,n.height],l=[u[0],u[1]],d=Te(this.context.glContext.version);if(s[0]===1){let c=s.slice(1),h=[1,2],m=Tn(s,c),b=["b","row","col"],x=JSON.parse(JSON.stringify(n));x.unpackedShape=m;let v=this.getPackedSamplerFromInput(e,t,x),w=`${v.routineBody}
      vec4 ${e}(int b, int row, int col) {
        return ${e}(${In(b,h)});
      } `;return new Q(w,v.dependencies)}let p=l[0],o=l[1],r=Math.ceil(s[2]/2),i=r*Math.ceil(s[1]/2),a=`vec4 ${e}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${o}, ${p}, ${i}, ${r}, b, row, col);
      return ${d.texture2D}(${t}, uv);}`;return new Q(a,["coordinates.packedUVfrom3D"])}getPackedSamplerND(e,t,n){let s=n.unpackedShape,u=s.length,l=[n.width,n.height],d=Te(this.context.glContext.version),p=[l[0],l[1]],o=p[1],r=p[0],i=Math.ceil(s[u-1]/2),a=i*Math.ceil(s[u-2]/2),c="int b, int row, int col",h=`b * ${a} + (row / 2) * ${i} + (col / 2)`;for(let b=2;b<u-1;b++)c=`int b${b}, `+c,a*=s[u-b-1],h=`b${b} * ${a} + `+h;let m=`vec4 ${e}(${c}) {
      int index = ${h};
      int texR = index / ${r};
      int texC = index - texR * ${r};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${r}, ${o});
      return ${d.texture2D}(${t}, uv);
    }`;return new Q(m)}getUnpackedSamplerScalar(e,t,n){let[s,u]=[n.width,n.height];if(s===1&&u===1){let d=`
          float ${e}() {
            return sampleTexture(${t}, halfCR);
          }
        `;return new Q(d,["coordinates.sampleTexture"])}let l=`
        float ${e}() {
          int offset_${t} = coordsToOffset(TexCoords, ${s}, ${u});
          vec2 uv = uvFromFlat(${s}, ${u}, offset_${t});
          return sampleTexture(${t}, uv);
        }
      `;return new Q(l,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(e,t,n){let s=n.width,u=n.height;if(u===1&&s===1){let d=`
        float ${e}(int index) {
          return sampleTexture(${t}, halfCR);
        }
      `;return new Q(d,["coordinates.sampleTexture"])}if(u===1){let d=`
          float ${e}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${s}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new Q(d,["coordinates.sampleTexture"])}if(s===1){let d=`
          float ${e}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${u}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new Q(d,["coordinates.sampleTexture"])}let l=`
        float ${e}(int index) {
          vec2 uv = uvFromFlat(${s}, ${u}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new Q(l,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(e,t,n){let s=n.unpackedShape,u=[n.height,n.width];if(u!=null&&Fn.arraysEqual(s,u)){let a=u[1],c=u[0],h=`
          float ${e}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${a}.0, ${c}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new Q(h,["coordinates.sampleTexture"])}let{newShape:l,keptDims:d}=Vn(s),p=l;if(p.length<s.length){let a=Tn(s,p),c=JSON.parse(JSON.stringify(n));c.unpackedShape=a;let h=["col","row"],m=`
          ${this.getUnpackedSamplerFromInput(e,t,c).routineBody}
          float ${e}(int row, int col) {
            return ${e}(${In(h,d)});
          }
        `;return new Q(m,["coordinates.sampleTexture"])}let o=u[1],r=u[0];if(r===1){let a=`
          float ${e}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${o}, ${r});
            float index = dot(vec3(row, col, offset_${t}), vec3(${s[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${o}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new Q(a,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(o===1){let a=`
          float ${e}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${o}, ${r});
            float index = dot(vec3(row, col, offset_${t}), vec3(${s[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${r}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new Q(a,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let i=`
        float ${e}(int row, int col) {
          int index = col * ${s[1]} + row;
          vec2 uv = uvFromFlat(${o}, ${r}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new Q(i,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(e,t,n){let s=n.unpackedShape,u=s[1]*s[2],l=s[2],{newShape:d,keptDims:p}=Vn(s),o=d;if(o.length<s.length){let c=Tn(s,o),h=["batch","col","row"],m=JSON.parse(JSON.stringify(n));m.unpackedShape=c;let b=this.getUnpackedSamplerFromInput(e,t,m),x=p.reverse(),v=`
          ${b.routineBody}
          float ${e}(int batch, int row, int col) {
            return ${e}(${In(h,x)});
          }
        `;return new Q(v,b.dependencies)}let r=n.width,i=n.height,a=`
          float ${e}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${u} + col * ${l} + row;
            vec2 uv = uvFromFlat(${r}, ${i}, index);
            return sampleTexture(${t}, uv);
          }
      `;return new Q(a,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(e,t,n){let s=n.unpackedShape,u=s[3],l=s[2]*u,d=s[1]*l,p=n.width,o=n.height,r=`
        float ${e}(int row, int col, int depth, int depth2) {
          int index = row * ${d} + col * ${l} +
              depth2 * ${u} + depth;
          vec2 uv = uvFromFlat(${p}, ${o}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new Q(r,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(e,t,n){let s=n.unpackedShape,u=s[4],l=s[3]*u,d=s[2]*l,p=s[1]*d,{newShape:o,keptDims:r}=Vn(s);if(o.length<s.length){let h=Tn(s,o),m=["row","col","depth","depth2","depth3"],b=JSON.parse(JSON.stringify(n));b.unpackedShape=h;let x=`
          ${this.getUnpackedSamplerFromInput(e,t,b).routineBody}
          float ${e}(int row, int col, int depth, int depth2, int depth3) {
            return ${e}(${In(m,r)});
          }
        `;return new Q(x,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let i=n.width,a=n.height,c=`
        float ${e}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${p} + col * ${d} + depth * ${l} +
          depth3 * ${u} + depth2;
          vec2 uv = uvFromFlat(${i}, ${a}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new Q(c,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(e,t,n){let s=n.unpackedShape,u=s[5],l=s[4]*u,d=s[3]*l,p=s[2]*d,o=s[1]*p,{newShape:r,keptDims:i}=Vn(s);if(r.length<s.length){let m=Tn(s,r),b=["row","col","depth","depth2","depth3","depth4"],x=JSON.parse(JSON.stringify(n));x.unpackedShape=m;let v=`
            ${this.getUnpackedSamplerFromInput(e,t,x).routineBody}
            float ${e}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${e}(${In(b,i)});
            }
          `;return new Q(v,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let a=n.width,c=n.height,h=`
          float ${e}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${o} + col * ${p} + depth * ${d} +
            depth2 * ${l} + depth3 * ${u} + depth4;
            vec2 uv = uvFromFlat(${a}, ${c}, index);
            return sampleTexture(${t}, uv);
          }
        `;return new Q(h,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let e=this.context.outputTextureLayout,t=e.shape.length,n=e.strides,s=e.width,u=e.height,l=[];for(let p=0;p<t-1;++p)l.push(`
        c[${p}] = offset / ${n[p]};`),l.push(`
        offset -= c[${p}] * ${n[p]};`);l.push(`
        c[${t-1}] = offset;`);let d=`
      void toVec(vec2 texCoords, out int c[${t}]) {
        int offset = coordsToOffset(texCoords, ${s}, ${u});
        ${l.join("")}
      }
      void toVec(int offset, out int c[${t}]) {
        ${l.join("")}
      }
    `;return{toVec:new Q(d,["coordinates.coordsToOffset"])}}valueFrom(){let e={};return this.context.programInfo.inputNames.forEach((t,n)=>{let s=this.context.inputTextureLayouts[n],u=(s.unpackedShape.length>0?s.unpackedShape:s.shape).length,l=`_${t}`;e[l]=new Q(this.getValueFromSingle(t,u,s.width,s.height,!1),[`shapeUtils.indicesToOffset${l}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),l=l+"_T",e[l]=new Q(this.getValueFromSingle(t,u,s.width,s.height,!0),[`shapeUtils.indicesToOffset${l}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),e}getValueFromSingle(e,t,n,s,u){let l=`_${e}`;u&&(l=l+"_T");let d=Te(this.context.glContext.version);return`
        float ${l}(int m[${t}]) {
          int offset = indicesToOffset${l}(m);
          vec2 coords = offsetToCoords(offset, ${n}, ${s});
          float value = getColorAsFloat(${d.texture2D}(${e}, coords));
          return value;
        }
        `}getPackedValueFrom(e,t,n,s,u){let l=`_${e}_Pack`;u&&(l=l+"_T");let d=Te(this.context.glContext.version);return`
        vec4 ${l}(int m[${t}]) {
          int offset = indicesToOffset_${e}(m);
          vec2 coords = offsetToCoords(offset, ${n}, ${s});
          return ${d.texture2D}(${e}, coords);
        }
        `}}}),C_,DI=N(()=>{"use strict";fr(),C_=class Hs extends mn{constructor(t){super(t)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new Q(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new Q(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let t=Hs.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new Q(`
      highp vec4 encode(highp float f) {
        highp float F = abs(f);
        highp float Sign = step(0.0,-f);
        highp float Exponent = floor(log2(F));
        highp float Mantissa = (exp2(- Exponent) * F);
        Exponent = floor(log2(F) + 127.0) + floor(log2(Mantissa));
        highp vec4 rgba;
        rgba[0] = 128.0 * Sign  + floor(Exponent*exp2(-1.0));
        rgba[1] = 128.0 * mod(Exponent,2.0) + mod(floor(Mantissa*128.0),128.0);
        rgba[2] = floor(mod(floor(Mantissa*exp2(23.0 -8.0)),exp2(8.0)));
        rgba[3] = floor(exp2(23.0)*mod(Mantissa,exp2(-15.0)));
        ${t}
        rgba = rgba / 255.0; // values need to be normalized to [0,1]
        return rgba;
    }
        `)}}decodeUint8(){let t=Hs.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new Q(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${t}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let t=new ArrayBuffer(4),n=new Uint32Array(t),s=new Uint8Array(t);if(n[0]=3735928559,s[0]===239)return!0;if(s[0]===222)return!1;throw new Error("unknown endianness")}}}),z_,NI=N(()=>{"use strict";fr(),Le(),z_=class extends mn{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=Te(this.context.glContext.version);return{setFragColor:new Q(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new Q(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}}),R_,CI=N(()=>{"use strict";fr(),R_=class Un extends mn{constructor(t){super(t)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let t=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((s,u)=>{let l=this.context.inputTextureLayouts[u].unpackedShape;if(l.length<=t){let d=l.length,p=t-d,o=`bcastIndices_${s}`,r="";for(let a=0;a<d;++a)r+=`
          realIndices[${a}] = int( mod(float(bcastedIndices[${p+a}]), ${l[a]}.0) );
          `;let i=`
        void ${o} (int bcastedIndices[${t}], out int realIndices[${d}]) {
          ${r}
        }
        `;n[o]=new Q(i)}}),n}bcastMatmulIndex(){let t=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((s,u)=>{let l=this.context.inputTextureLayouts[u].shape;if(!(l.length<2||l.length>t)){let d=l.length,p=t-d,o=`bcastMatmulIndices_${s}`,r="";for(let a=0;a<d-2;++a)r+=`
          realIndices[${a}] = int( mod(float(bcastedIndices[${p+a}]), ${l[a]}.0) );
          `;let i=`
        void ${o}(int bcastedIndices[${t}], out int realIndices[${d}]) {
          ${r}
          realIndices[${d-1}] = bcastedIndices[${t-1}];
          realIndices[${d-2}] = bcastedIndices[${t-2}];
        }
        `;n[o]=new Q(i)}}),n}indicesToOffset(){let t={};return this.context.programInfo.inputNames.forEach((n,s)=>{let u=this.context.inputTextureLayouts[s].shape,l=this.context.inputTextureLayouts[s].strides,d=u.length,p=`indicesToOffset_${n}`;t[p]=new Q(Un.indexToOffsetSingle(p,d,l)),p=`indicesToOffset_${n}_T`,t[p]=new Q(Un.indexToOffsetSingle(p,d,l.slice().reverse()))}),t}static indexToOffsetSingle(t,n,s){let u="";for(let l=n-1;l>=0;--l)u+=`
        offset += indices[${l}] * ${s[l]};
        `;return`
      int ${t}(int indices[${n}]) {
        int offset = 0;
        ${u}
        return offset;
      }
      `}offsetToIndices(){let t={};return this.context.programInfo.inputNames.forEach((n,s)=>{let u=this.context.inputTextureLayouts[s].shape,l=this.context.inputTextureLayouts[s].strides,d=u.length,p=`offsetToIndices_${n}`;t[p]=new Q(Un.offsetToIndicesSingle(p,d,l)),p=`offsetToIndices_${n}_T`,t[p]=new Q(Un.offsetToIndicesSingle(p,d,l.slice().reverse()))}),t}static offsetToIndicesSingle(t,n,s){let u=[];for(let l=0;l<n-1;++l)u.push(`
      indices[${l}] = offset / ${s[l]};`),u.push(`
        offset -= indices[${l}] * ${s[l]};`);return u.push(`
      indices[${n-1}] = offset;`),`
      void ${t}(int offset, out int indices[${n}]) {
        ${u.join("")}
      }
      `}incrementIndices(){let t={};return this.context.programInfo.inputNames.forEach((n,s)=>{let u=this.context.inputTextureLayouts[s].shape,l=u.length,d=`incrementIndices_${n}`,p="";for(let r=0;r<l;++r)p+=`
        shape[${r}] = ${u[r]};`;let o=`
        void ${d}(int axis, out int indices[${l}]) {
          int shape[${l}];
          ${p};
          for(int i = ${l} -1 ; i >= 0; --i) {
            if(i > axis) continue;
            indices[i] += 1;
            if(indices[i] < shape[i]) {
              break;
            }
            indices[i] = 0;
          }
        }
        `;t[d]=new Q(o)}),t}}}),B_,zI=N(()=>{"use strict";fr(),B_=class extends mn{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let e=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},n={};for(let s in t){let u=`${s}Vec`,l="";for(let p=0;p<e;++p)l+=`
          dest[${p}] ${t[s]} src[${p}];
          `;let d=`
        void ${u}(int src[${e}], out int dest[${e}]) {
          ${l}
        }
        `;n[u]=new Q(d)}return n}copyVec(){let e=this.context.outputTextureLayout.shape.length,t="";for(let s=0;s<e;++s)t+=`
        dest[${s}] = src[${s}];
        `;let n=`
      void copyVec(int src[${e}], out int dest[${e}]) {
        ${t}
      }
      `;return{copyVec:new Q(n)}}setVecItem(){let e=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index =${e} + index;
        if (index == 0)
            m[0] = value;
        `;for(let s=1;s<e-1;++s)t+=`
        else if (index == ${s})
            m[${s}] = value;
            `;t+=`
        else
            m[${e-1}] = value;
        `;let n=`
      void setVecItem(out int m[${e}], int index, int value) {
        ${t}
      }
        `;return{setVecItem:new Q(n)}}getVecItem(){let e=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index = ${e} + index;
        if (index == 0)
            return m[0];
      `;for(let s=1;s<e-1;++s)t+=`
        else if (index == ${s})
            return m[${s}];
      `;t+=`
        else
            return m[${e-1}];
        `;let n=`
      int getVecItem(int m[${e}], int index) {
        ${t}
      }
    `;return{getVecItem:new Q(n)}}}}),Ws,RI=N(()=>{"use strict";kI(),DI(),NI(),CI(),zI(),Ws={encoding:C_,fragcolor:z_,vec:B_,shapeUtils:R_,coordinates:N_}}),M_,BI=N(()=>{"use strict";fr(),PI(),RI(),Le(),M_=class{constructor(e,t,n,s){this.libs={},this.glslLibRoutineDependencyGraph={},this.context=new $y(e,t,n,s),Object.keys(Ws).forEach(l=>{let d=new Ws[l](this.context);this.libs[l]=d});let u=this.glslLibRoutineDependencyGraph;for(let l in this.libs){let d=this.libs[l].getFunctions();for(let p in d){let o=l+"."+p,r;u[o]?(r=u[o],r.routineBody=d[p].routineBody):(r=new Ds(o,d[p].routineBody),u[o]=r);let i=d[p].dependencies;if(i)for(let a=0;a<i.length;++a)if(u[i[a]])r.addDependency(u[i[a]]);else{let c=new Ds(i[a]);u[i[a]]=c,r.addDependency(c)}}}}preprocess(){let e=this.context.programInfo,t=e.shaderSource;return this.context.programInfo.hasMain||(t=`${t}
      ${YT(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),t=EI(t),`${JT(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(t)}
    ${t}`}getImports(e){let t=this.selectGlslLibRoutinesToBeIncluded(e);if(t.length===0)return"";let n="";for(let s=0;s<t.length;++s)if(t[s].routineBody)n+=t[s].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${t[s].name}`);return n}selectGlslLibRoutinesToBeIncluded(e){let t=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(n=>{let s=n.split(".")[1];e.indexOf(s)!==-1&&t.push(this.glslLibRoutineDependencyGraph[n])}),Ty.returnOrderedNodes(t)}getUniforms(e,t){let n=[];if(e)for(let s of e)n.push(`uniform sampler2D ${s};`);if(t)for(let s of t)n.push(`uniform ${s.type} ${s.name}${s.arrayLength?`[${s.arrayLength}]`:""};`);return n.join(`
`)}}}),j_,MI=N(()=>{"use strict";Qe(),kt(),BI(),Le(),j_=class{constructor(e,t,n){this.profiler=e,this.glContext=t,this.textureLayoutStrategy=n,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,n){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let s=this.glContext.gl,u=e.program;s.useProgram(u);try{this.bindOutput(n),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],t)}catch(l){throw Ue.error("ProgramManager",e.programInfo.shaderSource),l}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,t,n){return this.profiler.event("backend","ProgramManager.build",()=>{let s=new M_(this.glContext,e,t,n),u=s.preprocess(),l=this.compile(u);return{programInfo:e,program:l,uniformLocations:this.getUniformLocations(l,s.context.programInfo.inputNames,s.context.programInfo.variables),attribLocations:this.getAttribLocations(l)}})}compile(e){if(!this.vertexShader){Ue.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let s=ZT(this.glContext.version);this.vertexShader=this.glContext.compileShader(s,this.glContext.gl.VERTEX_SHADER)}ge.debug&&Ue.verbose("ProrgramManager",`FragShader:
${e}
`);let t=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),n=this.glContext.createProgram(this.vertexShader,t);return this.glContext.deleteShader(t),n}bindOutput(e){let t=e.width,n=e.height;Ue.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${t}/${n}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,t,n)}bindAttributes(e){let t=e.position,n=e.textureCoord;this.glContext.setVertexAttributes(t,n),this.attributesBound=!0}bindUniforms(e,t,n){var l;let s=this.glContext.gl,u=0;for(let{name:d,type:p,location:o,arrayLength:r}of e){let i=(l=t.find(a=>a.name===d))==null?void 0:l.data;if(p!=="sampler2D"&&!i)throw new Error(`variable '${d}' does not have data defined in program info`);switch(p){case"sampler2D":this.bindTexture(n[u],o,u),u++;break;case"float":r?s.uniform1fv(o,i):s.uniform1f(o,i);break;case"int":r?s.uniform1iv(o,i):s.uniform1i(o,i);break;default:throw new Error(`Uniform not implemented: ${p}`)}}}bindTexture(e,t,n){this.glContext.bindTextureToUniform(e.texture,n,t)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,t,n){let s=[];if(t)for(let u of t)s.push({name:u,type:"sampler2D",location:this.getUniformLocation(e,u)});if(n)for(let u of n)s.push({...u,location:this.getUniformLocation(e,u.name)});return s}getUniformLocation(e,t){let n=this.glContext.gl.getUniformLocation(e,t);if(n===null)throw new Error(`Uniform ${t} not found.`);return n}getAttribLocation(e,t){return this.glContext.gl.getAttribLocation(e,t)}}}),F_,jI=N(()=>{"use strict";kt(),Ui(),F_=class{constructor(e,t,n,s){this.glContext=e,this.layoutStrategy=t,this.profiler=n,this.config=s,this.pendingRead=new Map,s.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,t,n,s){let u=this.toEncoderType(e),l=this.glContext.getEncoder(u,t.channels||1,s);if(t.isPacked&&s===1)throw new Error("not implemented");let d=t.width,p=t.height,o,r;if(this.config.reuseTextures){o=`${d}x${p}_${l.format}_${l.internalFormat}_${l.textureType}`,r=this.inUseTextures.get(o),r||(r=[],this.inUseTextures.set(o,r));let a=this.idleTextures.get(o);if(a&&a.length>0){let c=a.pop();return r.push(c),s===1&&this.glContext.updateTexture(c,d,p,l,this.toTextureData(e,n)),c}}Ue.verbose("TextureManager",`Creating new texture of size ${t.width}x${t.height}`);let i=this.glContext.allocateTexture(d,p,l,this.toTextureData(e,n));return this.config.reuseTextures&&(r.push(i),this.textureLookup.set(i,o)),i}readTexture(e,t,n){return n||(n=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let s=e.shape.reduce((l,d)=>l*d)*n,u=this.glContext.readTexture(e.texture,e.width,e.height,s,this.toEncoderType(t),n);return this.toTensorData(t,u)})}async readTextureAsync(e,t,n){let s=e.tensor.dataId;if(n||(n=1),this.pendingRead.has(s)){let u=this.pendingRead.get(s);return new Promise(l=>u==null?void 0:u.push(l))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(s,[]);let u=e.shape.reduce((o,r)=>o*r)*n;await this.glContext.createAndWaitForFence();let l=this.glContext.readTexture(e.texture,e.width,e.height,u,this.toEncoderType(t),n),d=this.toTensorData(t,l),p=this.pendingRead.get(s);return this.pendingRead.delete(s),p==null||p.forEach(o=>o(d)),d})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let t=e.shape.reduce((s,u)=>s*u),n=this.glContext.readTexture(e.texture,e.width,e.height,t*4,"byte",4);return new Float32Array(n.buffer,n.byteOffset,t)})}releaseTexture(e,t){let n;if(this.config.reuseTextures&&(n=this.textureLookup.get(e.texture),n)){t&&this.textureLookup.delete(n);let s=this.inUseTextures.get(n);if(s){let u=s.indexOf(e.texture);if(u!==-1){s.splice(u,1);let l=this.idleTextures.get(n);l||(l=[],this.idleTextures.set(n,l)),l.push(e.texture)}}}(!n||t)&&(Ue.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,t){switch(e){case"int16":return t instanceof Int16Array?t:Int16Array.from(t);case"int32":return t instanceof Int32Array?t:Int32Array.from(t);case"int8":return t instanceof Int8Array?t:Int8Array.from(t);case"uint16":return t instanceof Uint16Array?t:Uint16Array.from(t);case"uint32":return t instanceof Uint32Array?t:Uint32Array.from(t);case"uint8":case"bool":return t instanceof Uint8Array?t:Uint8Array.from(t);case"float32":return t instanceof Float32Array?t:Float32Array.from(t);case"float64":return t instanceof Float64Array?t:Float64Array.from(t);default:throw new Error(`TensorData type ${e} is not supported`)}}toTextureData(e,t){if(t)return t instanceof Float32Array?t:new Float32Array(t)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}}),L_,FI=N(()=>{"use strict";kt(),J$(),h3(),OI(),MI(),D_(),jI(),L_=class{constructor(e,t){this.backend=e,this.context=t,this.layoutStrategy=new k_(e.glContext.maxTextureSize),this.programManager=new j_(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new F_(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:e.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new wy(this)}onGraphInitialized(e){let t=e.getValues().filter(n=>n.from===-1&&n.tensor).map(n=>n.tensor.dataId);this.initializers=new Set(t)}isInitializer(e){return this.initializers?this.initializers.has(e):!1}addInitializer(e){this.initializers.add(e)}getTextureData(e,t){return t?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,t,n=!1){Ue.verbose("WebGLSessionHandler","Storing Texture data in cache"),n?this.packedTextureDataCache.set(e,t):this.unpackedTextureDataCache.set(e,t)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,t,n){let s=X$(e,t,P_);return{impl:s.opImpl,context:s.opInit?s.opInit(e,n):e}}}});function LI(e){let t=0;for(;t<e.length&&e[t]();++t);return t-1}var Ks,VI=N(()=>{"use strict";Qe(),Ui(),Ui(),Ht(),Ks=class{constructor(e,t){this.frameBufferBound=!1,this.itemsToPoll=[],this.gl=e,this.version=t,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,t,n,s){let u=this.gl,l=u.createTexture();u.bindTexture(u.TEXTURE_2D,l),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MIN_FILTER,u.NEAREST),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MAG_FILTER,u.NEAREST),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_S,u.CLAMP_TO_EDGE),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_T,u.CLAMP_TO_EDGE);let d=s?n.encode(s,e*t):null;return u.texImage2D(u.TEXTURE_2D,0,n.internalFormat,e,t,0,n.format,n.textureType,d),this.checkError(),l}updateTexture(e,t,n,s,u){let l=this.gl;l.bindTexture(l.TEXTURE_2D,e);let d=s.encode(u,t*n);l.texSubImage2D(l.TEXTURE_2D,0,0,0,t,n,s.format,s.textureType,d),this.checkError()}attachFramebuffer(e,t,n){let s=this.gl;s.bindTexture(s.TEXTURE_2D,e),s.bindFramebuffer(s.FRAMEBUFFER,this.framebuffer),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,e,0),this.checkError(),s.viewport(0,0,t,n),s.scissor(0,0,t,n)}readTexture(e,t,n,s,u,l){let d=this.gl;l||(l=1),this.frameBufferBound||this.attachFramebuffer(e,t,n);let p=this.getEncoder(u,l),o=p.allocate(t*n);return d.bindTexture(d.TEXTURE_2D,e),d.framebufferTexture2D(d.FRAMEBUFFER,d.COLOR_ATTACHMENT0,d.TEXTURE_2D,e,0),d.readPixels(0,0,t,n,d.RGBA,p.textureType,o),this.checkError(),p.decode(o,s)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,t){let n=this.gl;n.vertexAttribPointer(e,3,n.FLOAT,!1,20,0),n.enableVertexAttribArray(e),t!==-1&&(n.vertexAttribPointer(t,2,n.FLOAT,!1,20,12),n.enableVertexAttribArray(t)),this.checkError()}createProgram(e,t){let n=this.gl,s=n.createProgram();return n.attachShader(s,e),n.attachShader(s,t),n.linkProgram(s),s}compileShader(e,t){let n=this.gl,s=n.createShader(t);if(!s)throw new Error(`createShader() returned null with type ${t}`);if(n.shaderSource(s,e),n.compileShader(s),n.getShaderParameter(s,n.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${n.getShaderInfoLog(s)}
Shader source:
${e}`);return s}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,t,n){let s=this.gl;s.activeTexture(s.TEXTURE0+t),this.checkError(),s.bindTexture(s.TEXTURE_2D,e),this.checkError(),s.uniform1i(n,t),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(ge.debug){let e=this.gl,t=e.getError(),n="";switch(t){case e.NO_ERROR:return;case e.INVALID_ENUM:n="INVALID_ENUM";break;case e.INVALID_VALUE:n="INVALID_VALUE";break;case e.INVALID_OPERATION:n="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:n="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:n="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:n="CONTEXT_LOST_WEBGL";break;default:n=`Unknown WebGL Error: ${t.toString(16)}`}throw new Error(n)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,t,n=0){if(this.version===2)return new by(this.gl,t);switch(e){case"float":return n===1||this.isRenderFloat32Supported?new As(this.gl,t):new As(this.gl,t,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new yy(this.gl,t);default:throw new Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let t=0;t<this.maxTextureImageUnits;++t)e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,t=e.createBuffer();if(!t)throw new Error("createBuffer() returned null");let n=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,n,e.STATIC_DRAW),this.checkError(),t}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw new Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t);let n=this.version===2?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,n,1,1,0,e.RGBA,e.FLOAT,null);let s=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,s),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0);let u=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(t),e.deleteFramebuffer(s),u}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,t,n,s,u,l;try{t=e.createTexture(),n=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,t);let d=this.version===2?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,d,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),e.enable(e.BLEND),s=e.createShader(e.VERTEX_SHADER),!s||(e.shaderSource(s,"void main(){}"),e.compileShader(s),u=e.createShader(e.FRAGMENT_SHADER),!u)||(e.shaderSource(u,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(u),l=e.createProgram(),!l)?!1:(e.attachShader(l,s),e.attachShader(l,u),e.linkProgram(l),e.useProgram(l),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),l&&e.deleteProgram(l),s&&e.deleteShader(s),u&&e.deleteShader(u),n&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(n)),t&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(t))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,t=this.disjointTimerQueryWebgl2Extension,n=e.createQuery();return e.beginQuery(t.TIME_ELAPSED_EXT,n),n}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,t=this.disjointTimerQueryWebgl2Extension;e.endQuery(t.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let t=!1,n=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let s=this.gl,u=this.disjointTimerQueryWebgl2Extension;t=s.getQueryParameter(e,s.QUERY_RESULT_AVAILABLE),n=s.getParameter(u.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return t&&!n}getTimerResult(e){let t=0;if(this.version===2){let n=this.gl;t=n.getQueryParameter(e,n.QUERY_RESULT),n.deleteQuery(e)}else throw new Error("WebGL1 profiling currently not supported");return t/1e6}async waitForQueryAndGetTime(e){return await ep(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let t,n=e,s=n.fenceSync(n.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),s===null?t=()=>!0:t=()=>{let u=n.clientWaitSync(s,0,0);return u===n.ALREADY_SIGNALED||u===n.CONDITION_SATISFIED},{query:s,isFencePassed:t}}async pollFence(e){return new Promise(t=>{this.addItemToPoll(()=>e.isFencePassed(),()=>t())})}pollItems(){let e=LI(this.itemsToPoll.map(t=>t.isDoneFn));for(let t=0;t<=e;++t){let{resolveFn:n}=this.itemsToPoll[t];n()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,t){this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),!(this.itemsToPoll.length>1)&&await ep(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function V_(e){let t;if((!e||e==="webgl2")&&"webgl2"in Rr?t=Rr.webgl2:(!e||e==="webgl")&&"webgl"in Rr&&(t=Rr.webgl),!t)try{let s=qI();t=nh(s,e)}catch{let s=UI();t=nh(s,e)}e=e||t.version===1?"webgl":"webgl2";let n=t.gl;return Rr[e]=t,n.isContextLost()?(delete Rr[e],V_(e)):(n.disable(n.DEPTH_TEST),n.disable(n.STENCIL_TEST),n.disable(n.BLEND),n.disable(n.DITHER),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SAMPLE_COVERAGE),n.enable(n.SCISSOR_TEST),n.enable(n.CULL_FACE),n.cullFace(n.BACK),t)}function nh(e,t){let n={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},s,u=n;if((!t||t==="webgl2")&&(s=e.getContext("webgl2",u),s))try{return new Ks(s,2)}catch(l){Ue.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${l}`)}if((!t||t==="webgl")&&(s=e.getContext("webgl",u)||e.getContext("experimental-webgl",u),s))try{return new Ks(s,1)}catch(l){Ue.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${l}`)}throw new Error("WebGL is not supported")}function UI(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let e=document.createElement("canvas");return e.width=1,e.height=1,e}function qI(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var Rr,GI=N(()=>{"use strict";kt(),VI(),Rr={}}),U_,HI=N(()=>{"use strict";Qe(),kt(),FI(),GI(),U_=class{get contextId(){return ge.webgl.contextId}set contextId(e){ge.webgl.contextId=e}get matmulMaxBatchSize(){return ge.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){ge.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return ge.webgl.textureCacheMode}set textureCacheMode(e){ge.webgl.textureCacheMode=e}get pack(){return ge.webgl.pack}set pack(e){ge.webgl.pack=e}get async(){return ge.webgl.async}set async(e){ge.webgl.async=e}initialize(){try{return this.glContext=V_(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),Ue.setWithEnv(ge),ge.webgl.context||Object.defineProperty(ge.webgl,"context",{value:this.glContext.gl}),Ue.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return Ue.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new L_(this,e)}dispose(){this.glContext.dispose()}}});async function q_(e){if(e){let t=typeof e=="string"?[e]:e;for(let n of t){let s=xu.get(n);if(s)return s;let u=await WI(n);if(u)return u}}else return q_(["webgl"]);throw new Error("no available backend to use")}async function WI(e){let t=G_;if(typeof t[e]<"u"&&KI(t[e])){let n=t[e],s=n.initialize();if(typeof s=="object"&&"then"in s&&(s=await s),s)return xu.set(e,n),n}}function KI(e){let t=e;return"initialize"in t&&typeof t.initialize=="function"&&"createSessionHandler"in t&&typeof t.createSessionHandler=="function"&&"dispose"in t&&typeof t.dispose=="function"}var xu,G_,XI=N(()=>{"use strict";HI(),xu=new Map,G_={webgl:new U_}}),ih,H_,ZI=N(()=>{"use strict";kt(),ih=class{constructor(e,t){this.op=e,this.node=t}},H_=class{constructor(e,t,n){this.graph=e,this.profiler=n,this.initialize(t)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let t=this.graph.getNodes();if(t.length!==e.length)throw new Error("The size of nodes and OPs do not match.");this._ops=e.map((n,s)=>new ih(n,t[s])),this.reset(),this._starter=[],this._ops.forEach((n,s)=>{let u=!0;for(let l of n.node.inputs)if(!this._values[l]&&this.graph.getInputIndices().indexOf(l)===-1){u=!1;break}u&&this._starter.push(s)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,t){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let n=e.createInferenceHandler(),s=this.graph.getInputIndices();if(t.length!==s.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${t.length} expected: ${s.length}`);t.forEach((r,i)=>{let a=s[i];this._values[a]=r});let u=this._starter.slice(0),l=this.graph.getValues(),d=this.graph.getNodes(),p=0;for(;p<u.length;){let r=u[p++],i=this._ops[r],a=i.node.inputs.map(b=>this._values[b]);if(a.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${i.node}`);let c=a;Ue.verbose("ExecPlan",`Running op:${i.node.name} (${c.map((b,x)=>`'${i.node.inputs[x]}': ${b.type}[${b.dims.join(",")}]`).join(", ")})`);let h=await this.profiler.event("node",i.node.name,async()=>i.op.impl(n,c,i.op.context));if(h.length!==i.node.outputs.length)throw new Error("the size of output does not match model definition.");h.forEach((b,x)=>{let v=i.node.outputs[x];if(this._values[v])throw new Error(`output [${v}] already has value: op:${i.node.name}`);this._values[v]=b});let m=new Set;h.forEach((b,x)=>{let v=i.node.outputs[x];for(let w of l[v].to){let S=d[w],O=!0;for(let E of S.inputs)if(!this._values[E]){O=!1;break}O&&m.add(w)}}),u.push(...m)}let o=[];for(let r=0;r<this.graph.getOutputIndices().length;r++){let i=this.graph.getOutputIndices()[r],a=this._values[i];if(a===void 0)throw new Error(`required output [${i}] does not have value`);i===0?await a.getData():a.data,o.push(a)}return Ue.verbose("ExecPlan","disposing of inferenceHandler"),n.dispose(),o})}}}),_e,Xs,JI=N(()=>{"use strict";ro(),_e=ce(ri()),hn(),ke(),Xs=class qn{constructor(t){if(this._attributes=new Map,t!=null){for(let n of t)n instanceof _e.onnx.AttributeProto?this._attributes.set(n.name,[qn.getValue(n),qn.getType(n)]):n instanceof Ts.Attribute&&this._attributes.set(n.name(),[qn.getValue(n),qn.getType(n)]);if(this._attributes.size<t.length)throw new Error("duplicated attribute names")}}set(t,n,s){this._attributes.set(t,[s,n])}delete(t){this._attributes.delete(t)}getFloat(t,n){return this.get(t,"float",n)}getInt(t,n){return this.get(t,"int",n)}getString(t,n){return this.get(t,"string",n)}getTensor(t,n){return this.get(t,"tensor",n)}getFloats(t,n){return this.get(t,"floats",n)}getInts(t,n){return this.get(t,"ints",n)}getStrings(t,n){return this.get(t,"strings",n)}getTensors(t,n){return this.get(t,"tensors",n)}get(t,n,s){let u=this._attributes.get(t);if(u===void 0){if(s!==void 0)return s;throw new Error(`required attribute not found: ${t}`)}if(u[1]!==n)throw new Error(`type mismatch: expected ${n} but got ${u[1]}`);return u[0]}static getType(t){let n=t instanceof _e.onnx.AttributeProto?t.type:t.type();switch(n){case _e.onnx.AttributeProto.AttributeType.FLOAT:return"float";case _e.onnx.AttributeProto.AttributeType.INT:return"int";case _e.onnx.AttributeProto.AttributeType.STRING:return"string";case _e.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case _e.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case _e.onnx.AttributeProto.AttributeType.INTS:return"ints";case _e.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case _e.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${_e.onnx.AttributeProto.AttributeType[n]}`)}}static getValue(t){let n=t instanceof _e.onnx.AttributeProto?t.type:t.type();if(n===_e.onnx.AttributeProto.AttributeType.GRAPH||n===_e.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let s=this.getValueNoCheck(t);if(n===_e.onnx.AttributeProto.AttributeType.INT&&Bt.isLong(s))return Bt.longToNumber(s);if(n===_e.onnx.AttributeProto.AttributeType.INTS){let u=s,l=new Array(u.length);for(let d=0;d<u.length;d++){let p=u[d];l[d]=Bt.longToNumber(p)}return l}if(n===_e.onnx.AttributeProto.AttributeType.TENSOR)return t instanceof _e.onnx.AttributeProto?ct.fromProto(s):ct.fromOrtTensor(s);if(n===_e.onnx.AttributeProto.AttributeType.TENSORS){if(t instanceof _e.onnx.AttributeProto)return s.map(u=>ct.fromProto(u));if(t instanceof Ts.Attribute)return s.map(u=>ct.fromOrtTensor(u))}return n===_e.onnx.AttributeProto.AttributeType.STRING&&t instanceof _e.onnx.AttributeProto?Is(s):n===_e.onnx.AttributeProto.AttributeType.STRINGS&&t instanceof _e.onnx.AttributeProto?s.map(Is):s}static getValueNoCheck(t){return t instanceof _e.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(t):this.getValueNoCheckFromOrtFormat(t)}static getValueNoCheckFromOnnxFormat(t){switch(t.type){case _e.onnx.AttributeProto.AttributeType.FLOAT:return t.f;case _e.onnx.AttributeProto.AttributeType.INT:return t.i;case _e.onnx.AttributeProto.AttributeType.STRING:return t.s;case _e.onnx.AttributeProto.AttributeType.TENSOR:return t.t;case _e.onnx.AttributeProto.AttributeType.GRAPH:return t.g;case _e.onnx.AttributeProto.AttributeType.FLOATS:return t.floats;case _e.onnx.AttributeProto.AttributeType.INTS:return t.ints;case _e.onnx.AttributeProto.AttributeType.STRINGS:return t.strings;case _e.onnx.AttributeProto.AttributeType.TENSORS:return t.tensors;case _e.onnx.AttributeProto.AttributeType.GRAPHS:return t.graphs;default:throw new Error(`unsupported attribute type: ${_e.onnx.AttributeProto.AttributeType[t.type]}`)}}static getValueNoCheckFromOrtFormat(t){switch(t.type()){case Ot.AttributeType.FLOAT:return t.f();case Ot.AttributeType.INT:return t.i();case Ot.AttributeType.STRING:return t.s();case Ot.AttributeType.TENSOR:return t.t();case Ot.AttributeType.GRAPH:return t.g();case Ot.AttributeType.FLOATS:return t.floatsArray();case Ot.AttributeType.INTS:{let n=[];for(let s=0;s<t.intsLength();s++)n.push(t.ints(s));return n}case Ot.AttributeType.STRINGS:{let n=[];for(let s=0;s<t.stringsLength();s++)n.push(t.strings(s));return n}case Ot.AttributeType.TENSORS:{let n=[];for(let s=0;s<t.tensorsLength();s++)n.push(t.tensors(s));return n}default:throw new Error(`unsupported attribute type: ${Ot.AttributeType[t.type()]}`)}}}}),aa,Zs,Vt,sa,oh,YI=N(()=>{"use strict";JI(),ro(),aa=ce(ri()),hn(),ke(),Zs={from:(e,t)=>new oh(e,t)},Vt=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=dt.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},sa=class{constructor(e,t){e instanceof aa.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new Xs(e.attribute)):e instanceof ny.Node&&(this.name=t??e.name(),this.opType=e.opType(),this.attributes=new Xs(dt.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},oh=class{constructor(e,t){if(!e)throw new TypeError("graph is empty");this.buildGraph(e),this.transformGraph(t),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof aa.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof ty.Graph)this.buildGraphFromOrtFormat(e);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let t=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let n=new Map;if(!e.input)throw new Error("missing information in graph: input");let s=[];for(let u of e.input){if(t.has(u.name))throw new Error(`duplicated input name: ${u.name}`);let l=this._allData.push(new Vt(u))-1;t.set(u.name,l),s.push(u.name)}if(!e.initializer)throw new Error("missing information in graph: initializer");for(let u of e.initializer){let l=t.get(u.name);if(l===void 0){let d=new Vt;d.type={shape:{dims:dt.tensorDimsFromProto(u.dims)},tensorType:dt.tensorDataTypeFromProto(u.dataType)},l=this._allData.push(d)-1,t.set(u.name,l)}this._allData[l]._from=-1,this._allData[l].tensor=ct.fromProto(u)}for(let u=0;u<this._allData.length;u++)this._allData[u].tensor||(this._allInputIndices.push(u),this._allInputNames.push(s[u]));if(!e.output)throw new Error("missing information in graph: output");for(let u of e.output){if(t.has(u.name))throw new Error(`duplicated output name: ${u.name}`);let l=this._allData.push(new Vt(u))-1;t.set(u.name,l),this._allOutputIndices.push(l),this._allOutputNames.push(u.name)}if(!e.node)throw new Error("missing information in graph: node");for(let u of e.node){if(!u.name)for(let d=0;;d++){let p=`unnamed_${u.opType}_${d}`;if(!n.has(p)){u.name=p;break}}if(n.has(u.name))throw new Error(`duplicated node name: ${u.name}`);let l=this._nodes.push(new sa(u))-1;n.set(u.name,l)}for(let u=0;u<this._nodes.length;u++){let l=this._nodes[u],d=e.node[u];if(!d.output)throw new Error(`missing output for node: ${d.name}`);for(let p of d.output){let o=t.get(p);if(typeof o>"u"&&(o=this._allData.push(new Vt)-1,t.set(p,o)),l.outputs.push(o),this._allData[o]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${o}`);if(this._allData[o]._from=u,d.opType==="Constant"){if(!d.attribute||d.attribute.length!==1||!d.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!d.output||d.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");l.outputs.pop(),l.executeNode=!1,this._allData[o]._from=-1,this._allData[o].tensor=ct.fromProto(d.attribute[0].t)}}}for(let u=0;u<this._nodes.length;u++){let l=this._nodes[u],d=e.node[u];if(!d.input)throw new Error(`missing input for node: ${d.name}`);for(let p of d.input){let o=t.get(p);if(typeof o>"u"){if(p===""&&(d.input.length===3||d.input.length===4)&&d.opType==="Resize")continue;throw new Error(`unrecognized input '${p}' for node: ${d.name}`)}l.inputs.push(o),this._allData[o]._to.push(u)}}return!0}buildGraphFromOrtFormat(e){var u,l,d;let t=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let n=new Map,s=[];for(let p=0;p<e.inputsLength();p++){let o=e.inputs(p);if(t.has(o))throw new Error(`duplicated input name: ${o}`);for(let r=0;r<e.nodeArgsLength();r++)if(((u=e.nodeArgs(r))==null?void 0:u.name())===o){let i=new Vt;if(((d=(l=e.nodeArgs(r))==null?void 0:l.type())==null?void 0:d.valueType())!==oy.TypeInfoValue.tensor_type)throw new Error("Unexpected value type for the nodeArg.");let a=e.nodeArgs(r).type().value(new iy.TensorTypeAndShape),c=dt.tensorDataTypeFromProto(a.elemType()),h=a.shape(),m=[];for(let x=0;x<h.dimLength();x++)m.push(Bt.longToNumber(h.dim(x).value().dimValue()));i.type={shape:{dims:m},tensorType:c};let b=this._allData.push(i)-1;t.set(o,b),s.push(o)}}for(let p=0;p<e.initializersLength();p++){let o=e.initializers(p),r=t.get(o.name());if(r===void 0){let i=new Vt,a=dt.tensorDimsFromORTFormat(o),c=dt.tensorDataTypeFromProto(o.dataType());i.type={shape:{dims:a},tensorType:c},r=this._allData.push(i)-1,t.set(o.name(),r)}this._allData[r]._from=-1,this._allData[r].tensor=ct.fromOrtTensor(o)}for(let p=0;p<this._allData.length;p++)this._allData[p].tensor||(this._allInputIndices.push(p),this._allInputNames.push(s[p]));for(let p=0;p<e.outputsLength();p++){let o=e.outputs(p);if(t.has(o))throw new Error(`duplicated output name: ${o}`);let r=this._allData.push(new Vt)-1;t.set(o,r),this._allOutputIndices.push(r),this._allOutputNames.push(o)}if(!e.nodes)throw new Error("missing information in graph: node");for(let p=0;p<e.nodesLength();p++){let o=e.nodes(p),r=o.name();if(!r)for(let a=0;r=`unnamed_${o.opType()}_${a}`,!!n.has(r);a++);if(n.has(r))throw new Error(`duplicated node name: ${r}`);let i=this._nodes.push(new sa(o,r))-1;n.set(r,i)}for(let p=0;p<this._nodes.length;p++){let o=this._nodes[p],r=e.nodes(p);if(r==null)throw new Error(`No node exists at index ${p}`);if((r==null?void 0:r.outputsLength())===0)throw new Error(`missing output for node: ${r.name}`);for(let i=0;i<(r==null?void 0:r.outputsLength());i++){let a=r==null?void 0:r.outputs(i),c=t.get(a);if(typeof c>"u"&&(c=this._allData.push(new Vt)-1,t.set(a,c)),o.outputs.push(c),this._allData[c]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${c}`);if(this._allData[c]._from=p,r.opType()==="Constant"){if(r.attributesLength()!==1||!r.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(r.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");o.outputs.pop(),o.executeNode=!1,this._allData[c]._from=-1,this._allData[c].tensor=ct.fromOrtTensor(r.attributes(0).t())}}}for(let p=0;p<this._nodes.length;p++){let o=this._nodes[p],r=e.nodes(p);if(r.inputsLength()===0)throw new Error(`missing input for node: ${r.name}`);for(let i=0;i<r.inputsLength();i++){let a=r.inputs(i),c=t.get(a);if(typeof c>"u")throw new Error(`unrecognized input '${a}' for node: ${r.name()}`);o.inputs.push(c),this._allData[c]._to.push(p)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(s=>{this._allData[s]._to.forEach(u=>{e.add(u)})});let t=Array.from(e),n=new Array(this._nodes.length).fill("white");for(;t.length>0;){let s=t.pop();n[s]==="gray"?n[s]="black":(t.push(s),n[s]="gray",this._nodes[s].outputs.forEach(u=>{let l=this._allData[u];if(typeof l.tensor<"u")throw new Error("node outputs should not be initialized");if(l._from!==s)throw new Error("from property of the Value object doesn't match index of Node being processed");l._to.forEach(d=>{if(n[d]==="gray")throw new Error("model graph is cyclic");n[d]==="white"&&t.push(d)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,t=new Array(this._nodes.length,0),n=0;for(let s=0;s<this._nodes.length;s++)t[s]=n,this._nodes[s].executeNode?(n!==s&&(this._nodes[n]=this._nodes[s]),n++):this._nodes[s].outputs.forEach(u=>{this._allData[u]._from=-2});this._nodes.splice(n,this._nodes.length-n);for(let s=0;s<this._allData.length;s++){let u=this._allData[s];u._from!==void 0&&u._from!==-1&&u._from!==-2&&(u._from=t[u._from]);for(let l=0;l<u._to.length;l++)if(u._to[l]>=0)u._to[l]=t[u._to[l]];else throw new Error("Trying to update a removed node")}e=0;for(let s=0;s<this._allData.length;s++){if(this._allData[s].from===-2&&this._allOutputIndices.indexOf(s+e)===-1){e++,this._allData.splice(s,1),s--;continue}if(e>0){let u=-1;this._allData[s].from!==void 0&&this._allData[s].from!==-1?(u=this._nodes[this._allData[s].from].outputs.indexOf(s+e),u!==-1&&(this._nodes[this._allData[s].from].outputs[u]=s)):(u=this._allInputIndices.indexOf(s+e),u!==-1&&(this._allInputIndices[u]=s)),this._allData[s].to.forEach(l=>{u=this._nodes[l].inputs.indexOf(s+e),u!==-1&&(this._nodes[l].inputs[u]=s)}),this._allData[s].to.length===0&&(u=this._allOutputIndices.indexOf(s+e),u!==-1&&(this._allOutputIndices[u]=s))}}}deleteNode(e){let t=this._nodes[e];if(t.outputs.length>1){for(let d=1;d<t.outputs.length;d++)if(this._allData[t.outputs[d]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}t.executeNode=!1;let n=t.inputs[0],s=t.outputs[0],u=this._allData[s].to;for(let d=0;d<t.inputs.length;d++){let p=this._allData[t.inputs[d]].to.indexOf(e);if(p===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[t.inputs[d]].to.splice(p,1)}this._allData[s]._to=[];let l=this._allOutputIndices.indexOf(s);if(l!==-1&&(this._allOutputIndices[l]=n),u&&u.length>0)for(let d of u){let p=this._nodes[d].inputs.indexOf(s);if(p===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[d].inputs[p]=n,this._allData[n].to.push(d)}}removeAllDropoutNodes(){let e=0;for(let t of this._nodes){if(t.opType==="Dropout"){if(t.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(t.outputs.length!==1&&t.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(t.outputs.length===2&&this._allData[t.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let t of this._nodes)t.opType==="Identity"&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if(e.opType==="Conv"){let t=this._allData[e.outputs[0]]._to;if(t.length===1&&this.isActivation(this._nodes[t[0]])){let n=this._nodes[t[0]];if(n.opType==="Clip")if(n.inputs.length===1)try{e.attributes.set("activation_params","floats",[n.attributes.getFloat("min"),n.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[Yn,Qn])}else if(n.inputs.length>=3&&this._allData[n.inputs[1]].tensor!==void 0&&this._allData[n.inputs[2]].tensor!==void 0)e.attributes.set("activation_params","floats",[this._allData[n.inputs[1]].tensor.floatData[0],this._allData[n.inputs[2]].tensor.floatData[0]]);else continue;e.attributes.set("activation","string",n.opType),this.deleteNode(t[0])}}}}}),ah,sh,W_,QI=N(()=>{"use strict";ah=ce(Ae()),YI(),ro(),sh=ce(ri()),ke(),W_=class{constructor(){}load(e,t,n){let s;if(!n)try{this.loadFromOnnxFormat(e,t);return}catch(u){if(n!==void 0)throw u;s=u}try{this.loadFromOrtFormat(e,t)}catch(u){throw n!==void 0?u:new Error(`Failed to load model as ONNX format: ${s}
as ORT format: ${u}`)}}loadFromOnnxFormat(e,t){let n=sh.onnx.ModelProto.decode(e);if(Bt.longToNumber(n.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=n.opsetImport.map(s=>({domain:s.domain,version:Bt.longToNumber(s.version)})),this._graph=Zs.from(n.graph,t)}loadFromOrtFormat(e,t){let n=new ah.ByteBuffer(e),s=ry.InferenceSession.getRootAsInferenceSession(n).model();if(Bt.longToNumber(s.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let u=0;u<s.opsetImportLength();u++){let l=s.opsetImport(u);this._opsets.push({domain:l==null?void 0:l.domain(),version:Bt.longToNumber(l.version())})}this._graph=Zs.from(s.graph(),t)}get graph(){return this._graph}get opsets(){return this._opsets}}}),K_,eS=N(()=>{"use strict";XI(),ZI(),kt(),QI(),K_=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=bb.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,t,n){await this.profiler.event("session","Session.loadModel",async()=>{let s=await q_(this.backendHint);if(this.sessionHandler=s.createSessionHandler(this.context),this._model=new W_,typeof e=="string"){let u=e.endsWith(".ort");{let l=await(await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(l),u)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let u=new Uint8Array(e,t||0,n||e.byteLength);this.initialize(u)}})}initialize(e,t){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let n=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,n,t),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new H_(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let t=this.normalizeAndValidateInputs(e),n=await this._executionPlan.execute(this.sessionHandler,t);return this.createOutput(n)})}normalizeAndValidateInputs(e){let t=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==t.length)throw new Error(`incorrect input array length: expected ${t.length} but got ${e.length}`)}else{if(e.size!==t.length)throw new Error(`incorrect input map size: expected ${t.length} but got ${e.size}`);let n=new Array(e.size),s=0;for(let u=0;u<t.length;++u){let l=e.get(t[u]);if(!l)throw new Error(`missing input tensor for: '${name}'`);n[s++]=l}e=n}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let n=this._model.graph.getInputIndices(),s=this._model.graph.getValues(),u=new Array(n.length);for(let l=0;l<n.length;++l){let d=s[n[l]];u[l]=d.type.shape.dims,this.context.graphInputTypes.push(d.type.tensorType),this.context.graphInputDims.push(e[l].dims)}this.validateInputTensorDims(u,e,!0)}else this.validateInputTensorDims(this.context.graphInputDims,e,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,t){for(let n=0;n<t.length;n++){let s=e[n],u=t[n].type;if(s!==u)throw new Error(`input tensor[${n}] check failed: expected type '${s}' but got ${u}`)}}validateInputTensorDims(e,t,n){for(let s=0;s<t.length;s++){let u=e[s],l=t[s].dims;if(!this.compareTensorDims(u,l,n))throw new Error(`input tensor[${s}] check failed: expected shape '[${u.join(",")}]' but got [${l.join(",")}]`)}}compareTensorDims(e,t,n){if(e.length!==t.length)return!1;for(let s=0;s<e.length;++s)if(e[s]!==t[s]&&(!n||e[s]!==0))return!1;return!0}createOutput(e){let t=this._model.graph.getOutputNames();if(e.length!==t.length)throw new Error("expected number of outputs do not match number of generated outputs");let n=new Map;for(let s=0;s<t.length;++s)n.set(t[s],e[s]);return n}initializeOps(e){let t=e.getNodes();this._ops=new Array(t.length);for(let n=0;n<t.length;n++)this._ops[n]=this.sessionHandler.resolve(t[n],this._model.opsets,e)}}}),X_,tS=N(()=>{"use strict";Qe(),hn(),X_=class{constructor(e){this.session=e,this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}get inputMetadata(){throw new Error("Getting model metadata is not supported in webgl backend.")}get outputMetadata(){throw new Error("Getting model metadata is not supported in webgl backend.")}async dispose(){}async run(e,t,n){let s=new Map;for(let d in e)if(Object.hasOwnProperty.call(e,d)){let p=e[d];s.set(d,new ct(p.dims,p.type,void 0,void 0,p.data))}let u=await this.session.run(s),l={};return u.forEach((d,p)=>{l[p]=new Pt(d.type,d.data,d.dims)}),l}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}}),Z_={};Xr(Z_,{onnxjsBackend:()=>J_});var uh,J_,rS=N(()=>{"use strict";eS(),tS(),uh=class{async init(){}async createInferenceSessionHandler(e,t){let n=new K_(t);return typeof e=="string"?await n.loadModel(e):await n.loadModel(e),new X_(n)}},J_=new uh}),$u=N(()=>{"use strict"}),Y_={};Xr(Y_,{default:()=>Q_});var ua,la,Q_,nS=N(()=>{"use strict";var e;s2(),Jr(),Tu(),ua="ort-wasm-proxy-worker",la=((e=globalThis.self)==null?void 0:e.name)===ua,la&&(self.onmessage=t=>{let{type:n,in:s}=t.data;try{switch(n){case"init-wasm":Iu(s.wasm).then(()=>{Vu(s).then(()=>{postMessage({type:n})},u=>{postMessage({type:n,err:u})})},u=>{postMessage({type:n,err:u})});break;case"init-ep":{let{epName:u,env:l}=s;Uu(l,u).then(()=>{postMessage({type:n})},d=>{postMessage({type:n,err:d})});break}case"copy-from":{let{buffer:u}=s,l=Ji(u);postMessage({type:n,out:l});break}case"create":{let{model:u,options:l}=s;qu(u,l).then(d=>{postMessage({type:n,out:d})},d=>{postMessage({type:n,err:d})});break}case"release":Gu(s),postMessage({type:n});break;case"run":{let{sessionId:u,inputIndices:l,inputs:d,outputIndices:p,options:o}=s;Hu(u,l,d,p,new Array(p.length).fill(null),o).then(r=>{r.some(i=>i[3]!=="cpu")?postMessage({type:n,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:n,out:r},Ku([...d,...r]))},r=>{postMessage({type:n,err:r})});break}case"end-profiling":Wu(s),postMessage({type:n});break;default:}}catch(u){postMessage({type:n,err:u})}}),Q_=la?null:t=>new Worker(t??lt,{type:"module",name:ua})}),ew={};Xr(ew,{default:()=>tw});async function lh(e={}){var Vd,Ud;var t=e,n=!!globalThis.window,s=!!globalThis.WorkerGlobalScope,u=s&&((Vd=self.name)==null?void 0:Vd.startsWith("em-pthread"));t.mountExternalData=(f,g)=>{f.startsWith("./")&&(f=f.substring(2)),(t.ad||(t.ad=new Map)).set(f,g)},t.unmountExternalData=()=>{delete t.ad,delete t.Yd,delete t.Xd,delete t.be},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let l=f=>async(...g)=>{var _;try{if(t.$c)throw Error("Session already started");let y=t.$c={Nd:g[0],errors:[]},T=await f(...g);if(t.$c!==y)throw Error("Session mismatch");(_=t.hd)==null||_.flush();let P=y.errors;if(0<P.length){let D=await Promise.all(P);if(D=D.filter(j=>j),0<D.length)throw Error(D.join(`
`))}return T}finally{t.$c=null}};t.jsepInit=(f,g)=>{if(f==="webgpu"){[t.hd,t.Dd,t.Hd,t.jd,t.Gd,t.bc,t.Id,t.Kd,t.Ed,t.Fd,t.Jd]=g;let _=t.hd;t.jsepRegisterBuffer=(y,T,P,D)=>_.registerBuffer(y,T,P,D),t.jsepGetBuffer=y=>_.getBuffer(y),t.jsepCreateDownloader=(y,T,P)=>_.createDownloader(y,T,P),t.jsepOnCreateSession=y=>{_.onCreateSession(y)},t.jsepOnReleaseSession=y=>{_.onReleaseSession(y)},t.jsepOnRunStart=y=>_.onRunStart(y),t.Ld=(y,T)=>{_.upload(y,T)}}else if(f==="webnn"){let _=g[0];[t.Vd,t.vd,t.webnnEnsureTensor,t.wd,t.webnnDownloadTensor,t.Ud,t.webnnEnableTraceEvent]=g.slice(1),t.webnnReleaseTensorId=t.vd,t.webnnUploadTensor=t.wd,t.webnnRegisterMLContext=t.Ud,t.webnnOnRunStart=y=>_.onRunStart(y),t.webnnOnRunEnd=_.onRunEnd.bind(_),t.webnnOnReleaseSession=y=>{_.onReleaseSession(y)},t.webnnCreateMLTensorDownloader=(y,T)=>_.createMLTensorDownloader(y,T),t.webnnRegisterMLTensor=(y,T,P,D)=>_.registerMLTensor(y,T,P,D),t.webnnCreateMLContext=y=>_.createMLContext(y),t.webnnRegisterGraphInput=_.registerGraphInput.bind(_),t.webnnIsGraphInput=_.isGraphInput.bind(_),t.webnnRegisterGraphOutput=_.registerGraphOutput.bind(_),t.webnnIsGraphOutput=_.isGraphOutput.bind(_),t.webnnCreateTemporaryTensor=_.createTemporaryTensor.bind(_),t.webnnIsGraphInputOutputTypeSupported=_.isGraphInputOutputTypeSupported.bind(_)}};let d=()=>{let f=g=>(..._)=>{let y=Nt;return _=g(..._),Nt!=y?new Promise((T,P)=>{go={resolve:T,reject:P}}):_};(()=>{for(let g of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[g]=f(t[g])})(),l!==void 0&&(t._OrtRun=l(t._OrtRun),t._OrtRunWithBinding=l(t._OrtRunWithBinding)),d=void 0};t.asyncInit=()=>{d==null||d()};var p,o,r=(f,g)=>{throw g},i=import.meta.url,a="";if(n||s){try{a=new URL(".",i).href}catch{}s&&(o=f=>{var g=new XMLHttpRequest;return g.open("GET",f,!1),g.responseType="arraybuffer",g.send(null),new Uint8Array(g.response)}),p=async f=>{if(k(f))return new Promise((_,y)=>{var T=new XMLHttpRequest;T.open("GET",f,!0),T.responseType="arraybuffer",T.onload=()=>{T.status==200||T.status==0&&T.response?_(T.response):y(T.status)},T.onerror=y,T.send(null)});var g=await fetch(f,{credentials:"same-origin"});if(g.ok)return g.arrayBuffer();throw Error(g.status+" : "+g.url)}}var c,h,m,b,x,v,w=console.log.bind(console),S=console.error.bind(console),O=w,E=S,A=!1,k=f=>f.startsWith("file://");function I(){Zt.buffer!=q.buffer&&W()}if(u){let f=function(g){try{var _=g.data,y=_.Vc;if(y==="load"){let T=[];self.onmessage=P=>T.push(P),v=()=>{postMessage({Vc:"loaded"});for(let P of T)f(P);self.onmessage=f};for(let P of _.Ad)t[P]&&!t[P].proxy||(t[P]=(...D)=>{postMessage({Vc:"callHandler",yd:P,args:D})},P=="print"&&(O=t[P]),P=="printErr"&&(E=t[P]));Zt=_.Rd,W(),h=_.Sd,Pe(),yi()}else if(y==="run"){(function(T){var P=(I(),$)[T+52>>>2>>>0];T=(I(),$)[T+56>>>2>>>0],Jl(P,P-T),he(P)})(_.Uc),vo(_.Uc,0,0,1,0,0),Ju(),ho(_.Uc),M||(Gl(),M=!0);try{_2(_.Pd,_.ed)}catch(T){if(T!="unwind")throw T}}else _.target!=="setimmediate"&&(y==="checkMailbox"?M&&pi():y&&(E(`worker: received unknown command ${y}`),E(_)))}catch(T){throw Hl(),T}};var M=!1;self.onunhandledrejection=g=>{throw g.reason||g},self.onmessage=f}var q,J,K,C,B,$,z,G,oe,U,ie,V=!1;function W(){var f=Zt.buffer;t.HEAP8=q=new Int8Array(f),K=new Int16Array(f),t.HEAPU8=J=new Uint8Array(f),C=new Uint16Array(f),t.HEAP32=B=new Int32Array(f),t.HEAPU32=$=new Uint32Array(f),z=new Float32Array(f),G=new Float64Array(f),oe=new BigInt64Array(f),U=new BigUint64Array(f)}function X(){V=!0,u?v():Lt.ub()}function L(f){throw E(f="Aborted("+f+")"),A=!0,f=new WebAssembly.RuntimeError(f+". Build with -sASSERTIONS for more info."),x==null||x(f),f}function de(){return{a:{ma:Vx,hb:Lx,g:w2,J:v2,f:x2,o:$2,i:T2,$:I2,b:S2,S:O2,Ha:nl,n:E2,aa:sl,Ya:ul,Da:ll,Fa:dl,Za:pl,Wa:cl,Pa:hl,Va:fl,ka:ml,Ea:gl,Ba:bl,Xa:yl,Ca:_l,cb:P2,fa:A2,wa:k2,ua:N2,ea:z2,N:R2,H:B2,va:M2,_:G2,xa:H2,Sa:W2,za:X2,Ia:Z2,sa:J2,ga:Y2,Ra:ho,$a:Q2,Q:nx,r:ux,c:po,ib:lx,y:dx,M:px,D:cx,l:hx,s:Ol,jb:fx,I:mx,R:gx,j:bx,u:yx,q:_x,k:wx,Ma:vx,Na:xx,Oa:$x,Ka:kl,La:Dl,ta:Nl,eb:Ix,bb:Ox,v:Ex,ba:Px,ha:Ax,ab:Sx,V:kx,_a:Dx,Aa:Nx,F:Tx,U:Cx,la:gi,ya:Rx,gb:zx,fb:Bx,Ta:Bl,Ua:Ml,Ga:bn,T:jl,Ja:Fl,ja:Ll,Qa:Vl,ia:Ul,lb:I$,na:w$,mb:T$,oa:_$,G:u$,e:Hx,t:qx,w:Ux,B:r$,nb:g$,Z:m$,x:Xx,pa:b$,X:v$,ca:f$,ob:h$,pb:c$,O:n$,qb:d$,qa:p$,rb:l$,L:a$,Y:y$,d:Gx,A:Kx,m:Wx,kb:S$,p:Jx,z:Yx,C:Zx,E:Qx,K:i$,ra:s$,P:x$,da:o$,W:$$,sb:t$,tb:e$,h:jx,a:Zt,db:at}}}async function Pe(){function f(y,T){var P=Lt=y.exports;y={};for(let[D,j]of Object.entries(P))typeof j=="function"?(P=ex(j),y[D]=P):y[D]=j;return Lt=y,Lt=(function(){var D=Lt,j=Y=>pe=>Y(pe)>>>0,Z=Y=>()=>Y()>>>0;return(D=Object.assign({},D)).vb=j(D.vb),D.Zb=Z(D.Zb),D.$b=j(D.$b),D.nc=j(D.nc),D.oc=Z(D.oc),D.sc=j(D.sc),D})(),Xu.push(Lt.ac),ql=(y=Lt).vb,Gl=y.wb,t._OrtInit=y.xb,t._OrtGetLastError=y.yb,t._OrtCreateSessionOptions=y.zb,t._OrtAppendExecutionProvider=y.Ab,t._OrtAddFreeDimensionOverride=y.Bb,t._OrtAddSessionConfigEntry=y.Cb,t._OrtReleaseSessionOptions=y.Db,t._OrtCreateSession=y.Eb,t._OrtReleaseSession=y.Fb,t._OrtGetInputOutputCount=y.Gb,t._OrtGetInputOutputMetadata=y.Hb,t._OrtFree=y.Ib,t._OrtCreateTensor=y.Jb,t._OrtGetTensorData=y.Kb,t._OrtReleaseTensor=y.Lb,t._OrtCreateRunOptions=y.Mb,t._OrtAddRunConfigEntry=y.Nb,t._OrtReleaseRunOptions=y.Ob,t._OrtCreateBinding=y.Pb,t._OrtBindInput=y.Qb,t._OrtBindOutput=y.Rb,t._OrtClearBoundOutputs=y.Sb,t._OrtReleaseBinding=y.Tb,t._OrtRunWithBinding=y.Ub,t._OrtRun=y.Vb,t._OrtEndProfiling=y.Wb,t._JsepOutput=y.Xb,t._JsepGetNodeName=y.Yb,bi=y.Zb,Ct=t._free=y._b,wn=t._malloc=y.$b,vo=y.cc,Hl=y.dc,Wl=y.ec,Kl=y.fc,xo=y.gc,Xl=y.hc,Zl=y.ic,be=y.jc,vn=y.kc,Jl=y.lc,he=y.mc,$o=y.nc,me=y.oc,Yl=y.pc,To=y.qc,Ql=y.rc,ed=y.sc,td=y.tc,Io=y.uc,rd=y.vc,nd=y.wc,id=y.xc,od=y.yc,ad=y.zc,sd=y.Ac,ud=y.Bc,ld=y.Cc,dd=y.Dc,pd=y.Ec,cd=y.Fc,hd=y.Gc,fd=y.Hc,md=y.Ic,gd=y.Jc,bd=y.Kc,yd=y.Lc,_d=y.Mc,wd=y.Nc,vd=y.Oc,xd=y.Pc,$d=y.Qc,Td=y.Sc,Id=y.Tc,Sd=y.cd,Od=y.dd,Ed=y.id,Pd=y.nd,Ad=y.od,kd=y.pd,Dd=y.qd,Nd=y.rd,Cd=y.sd,zd=y.td,Rd=y.ud,Bd=y.zd,Md=y.Zd,jd=y._d,Fd=y.$d,Ld=y.ae,h=T,Lt}var g,_=de();return t.instantiateWasm?new Promise(y=>{t.instantiateWasm(_,(T,P)=>{y(f(T,P))})}):u?f(new WebAssembly.Instance(h,de()),h):(ie??(ie=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",a):a+"ort-wasm-simd-threaded.jsep.wasm":new URL(""+new URL("ort-wasm-simd-threaded.jsep-MDYUKy93.wasm",import.meta.url).href,import.meta.url).href),g=await(async function(y){var T=ie;if(!c&&!k(T))try{var P=fetch(T,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(P,y)}catch(D){E(`wasm streaming compile failed: ${D}`),E("falling back to ArrayBuffer instantiation")}return(async function(D,j){try{var Z=await(async function(Y){if(!c)try{var pe=await p(Y);return new Uint8Array(pe)}catch{}if(Y==ie&&c)Y=new Uint8Array(c);else{if(!o)throw"both async and sync fetching of the wasm failed";Y=o(Y)}return Y})(D);return await WebAssembly.instantiate(Z,j)}catch(Y){E(`failed to asynchronously prepare wasm: ${Y}`),L(Y)}})(T,y)})(_),f(g.instance,g.module))}class ve{constructor(g){qd(this,"name","ExitStatus");this.message=`Program terminated with exit(${g})`,this.status=g}}var Ge=f=>{f.terminate(),f.onmessage=()=>{}},rt=[],ot=0,nt=null,Kt=f=>{Xt.length==0&&(Qu(),Yu(Xt[0]));var g=Xt.pop();if(!g)return 6;yn.push(g),gr[f.Uc]=g,g.Uc=f.Uc;var _={Vc:"run",Pd:f.Od,ed:f.ed,Uc:f.Uc};return g.postMessage(_,f.md),0},ze=0,se=(f,g,..._)=>{var y,T=16*_.length,P=me(),D=$o(T),j=D>>>3;for(y of _)typeof y=="bigint"?((I(),oe)[j++>>>0]=1n,(I(),oe)[j++>>>0]=y):((I(),oe)[j++>>>0]=0n,(I(),G)[j++>>>0]=y);return f=Wl(f,0,T,D,g),he(P),f};function at(f){if(u)return se(0,1,f);if(m=f,!(0<ze)){for(var g of yn)Ge(g);for(g of Xt)Ge(g);Xt=[],yn=[],gr={},A=!0}r(0,new ve(f))}function ai(f){if(u)return se(1,0,f);bn(f)}var bn=f=>{if(m=f,u)throw ai(f),"unwind";at(f)},Xt=[],yn=[],Xu=[],gr={},Zu=f=>{var g=f.Uc;delete gr[g],Xt.push(f),yn.splice(yn.indexOf(f),1),f.Uc=0,Kl(g)};function Ju(){Xu.forEach(f=>f())}var Yu=f=>new Promise(g=>{f.onmessage=T=>{var P=T.data;if(T=P.Vc,P.bd&&P.bd!=bi()){var D=gr[P.bd];D?D.postMessage(P,P.md):E(`Internal error! Worker sent a message "${T}" to target pthread ${P.bd}, but that thread no longer exists!`)}else T==="checkMailbox"?pi():T==="spawnThread"?Kt(P):T==="cleanupThread"?di(()=>{Zu(gr[P.Qd])}):T==="loaded"?(f.loaded=!0,g(f)):P.target==="setimmediate"?f.postMessage(P):T==="uncaughtException"?f.onerror(P.error):T==="callHandler"?t[P.yd](...P.args):T&&E(`worker sent an unknown command ${T}`)},f.onerror=T=>{throw E(`worker sent an error! ${T.filename}:${T.lineno}: ${T.message}`),T};var _,y=[];for(_ of[])t.propertyIsEnumerable(_)&&y.push(_);f.postMessage({Vc:"load",Ad:y,Rd:Zt,Sd:h})});function Qu(){var f=new Worker((()=>{let g=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new g("ort.all.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});Xt.push(f)}var Zt,_2=(f,g)=>{ze=0,f=Io(f,g),0<ze?m=f:xo(f)},si=[],ui=0;function w2(f){var g=new ao(f>>>=0);return(I(),q)[g.Wc+12>>>0]==0&&(el(g,!0),ui--),tl(g,!1),si.push(g),ed(f)}var Qr=0,v2=()=>{be(0,0);var f=si.pop();Yl(f.gd),Qr=0};function el(f,g){g=g?1:0,(I(),q)[f.Wc+12>>>0]=g}function tl(f,g){g=g?1:0,(I(),q)[f.Wc+13>>>0]=g}class ao{constructor(g){this.gd=g,this.Wc=g-24}}var so=f=>{var g=Qr;if(!g)return vn(0),0;var _=new ao(g);(I(),$)[_.Wc+16>>>2>>>0]=g;var y=(I(),$)[_.Wc+4>>>2>>>0];if(!y)return vn(0),g;for(var T of f){if(T===0||T===y)break;if(Ql(T,y,_.Wc+16))return vn(T),g}return vn(y),g};function x2(){return so([])}function $2(f){return so([f>>>0])}function T2(f,g,_,y){return so([f>>>0,g>>>0,_>>>0,y>>>0])}var I2=()=>{var f=si.pop();f||L("no exception to throw");var g=f.gd;throw(I(),q)[f.Wc+13>>>0]==0&&(si.push(f),tl(f,!0),el(f,!1),ui++),To(g),Qr=g};function S2(f,g,_){var y=new ao(f>>>=0);throw g>>>=0,_>>>=0,(I(),$)[y.Wc+16>>>2>>>0]=0,(I(),$)[y.Wc+4>>>2>>>0]=g,(I(),$)[y.Wc+8>>>2>>>0]=_,To(f),ui++,Qr=f}var O2=()=>ui;function rl(f,g,_,y){return u?se(2,1,f,g,_,y):nl(f,g,_,y)}function nl(f,g,_,y){if(f>>>=0,g>>>=0,_>>>=0,y>>>=0,!globalThis.SharedArrayBuffer)return 6;var T=[];return u&&T.length===0?rl(f,g,_,y):(f={Od:_,Uc:f,ed:y,md:T},u?(f.Vc="spawnThread",postMessage(f,T),0):Kt(f))}function E2(f){throw Qr||(Qr=f>>>0),Qr}var il=globalThis.TextDecoder&&new TextDecoder,ol=(f,g,_,y)=>{if(_=g+_,y)return _;for(;f[g]&&!(g>=_);)++g;return g},al=(f,g=0,_,y)=>{if(16<(_=ol(f,g>>>=0,_,y))-g&&f.buffer&&il)return il.decode(f.buffer instanceof ArrayBuffer?f.subarray(g,_):f.slice(g,_));for(y="";g<_;){var T=f[g++];if(128&T){var P=63&f[g++];if((224&T)==192)y+=String.fromCharCode((31&T)<<6|P);else{var D=63&f[g++];65536>(T=(240&T)==224?(15&T)<<12|P<<6|D:(7&T)<<18|P<<12|D<<6|63&f[g++])?y+=String.fromCharCode(T):(T-=65536,y+=String.fromCharCode(55296|T>>10,56320|1023&T))}}else y+=String.fromCharCode(T)}return y},qe=(f,g,_)=>(f>>>=0)?al((I(),J),f,g,_):"";function sl(f,g,_){return u?se(3,1,f,g,_):0}function ul(f,g){if(u)return se(4,1,f,g)}function ll(f,g){if(u)return se(5,1,f,g)}function dl(f,g,_){if(u)return se(6,1,f,g,_)}function pl(f,g,_){return u?se(7,1,f,g,_):0}function cl(f,g){if(u)return se(8,1,f,g)}function hl(f,g,_){if(u)return se(9,1,f,g,_)}function fl(f,g,_,y){if(u)return se(10,1,f,g,_,y)}function ml(f,g,_,y){if(u)return se(11,1,f,g,_,y)}function gl(f,g,_,y){if(u)return se(12,1,f,g,_,y)}function bl(f){if(u)return se(13,1,f)}function yl(f,g){if(u)return se(14,1,f,g)}function _l(f,g,_){if(u)return se(15,1,f,g,_)}var P2=()=>L(""),Dt=f=>{f>>>=0;for(var g="";;){var _=(I(),J)[f++>>>0];if(!_)return g;g+=String.fromCharCode(_)}},uo={},lo={},en=class extends Error{constructor(f){super(f),this.name="BindingError"}};function Ft(f,g,_={}){return(function(y,T,P={}){var D=T.name;if(!y)throw new en(`type "${D}" must have a positive integer typeid pointer`);if(lo.hasOwnProperty(y)){if(P.Bd)return;throw new en(`Cannot register type '${D}' twice`)}lo[y]=T,uo.hasOwnProperty(y)&&(T=uo[y],delete uo[y],T.forEach(j=>j()))})(f,g,_)}var wl=(f,g,_)=>{switch(g){case 1:return _?y=>(I(),q)[y>>>0]:y=>(I(),J)[y>>>0];case 2:return _?y=>(I(),K)[y>>>1>>>0]:y=>(I(),C)[y>>>1>>>0];case 4:return _?y=>(I(),B)[y>>>2>>>0]:y=>(I(),$)[y>>>2>>>0];case 8:return _?y=>(I(),oe)[y>>>3>>>0]:y=>(I(),U)[y>>>3>>>0];default:throw new TypeError(`invalid integer width (${g}): ${f}`)}};function A2(f,g,_,y,T){f>>>=0,_>>>=0,g=Dt(g>>>0);let P=D=>D;if(y=y===0n){let D=8*_;P=j=>BigInt.asUintN(D,j),T=P(T)}Ft(f,{name:g,Rc:P,Yc:(D,j)=>(typeof j=="number"&&(j=BigInt(j)),j),Xc:wl(g,_,!y),Zc:null})}function k2(f,g,_,y){Ft(f>>>=0,{name:g=Dt(g>>>0),Rc:function(T){return!!T},Yc:function(T,P){return P?_:y},Xc:function(T){return this.Rc((I(),J)[T>>>0])},Zc:null})}var vl=[],br=[0,1,,1,null,1,!0,1,!1,1];function po(f){9<(f>>>=0)&&--br[f+1]===0&&(br[f]=void 0,vl.push(f))}var ft=f=>{if(!f)throw new en(`Cannot use deleted val. handle = ${f}`);return br[f]},vt=f=>{switch(f){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let g=vl.pop()||br.length;return br[g]=f,br[g+1]=1,g}};function co(f){return this.Rc((I(),$)[f>>>2>>>0])}var D2={name:"emscripten::val",Rc:f=>{var g=ft(f);return po(f),g},Yc:(f,g)=>vt(g),Xc:co,Zc:null};function N2(f){return Ft(f>>>0,D2)}var C2=(f,g)=>{switch(g){case 4:return function(_){return this.Rc((I(),z)[_>>>2>>>0])};case 8:return function(_){return this.Rc((I(),G)[_>>>3>>>0])};default:throw new TypeError(`invalid float width (${g}): ${f}`)}};function z2(f,g,_){_>>>=0,Ft(f>>>=0,{name:g=Dt(g>>>0),Rc:y=>y,Yc:(y,T)=>T,Xc:C2(g,_),Zc:null})}function R2(f,g,_,y,T){f>>>=0,_>>>=0,g=Dt(g>>>0);let P=j=>j;if(y===0){var D=32-8*_;P=j=>j<<D>>>D,T=P(T)}Ft(f,{name:g,Rc:P,Yc:(j,Z)=>Z,Xc:wl(g,_,y!==0),Zc:null})}function B2(f,g,_){function y(P){var D=(I(),$)[P>>>2>>>0];return P=(I(),$)[P+4>>>2>>>0],new T((I(),q).buffer,P,D)}var T=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][g];Ft(f>>>=0,{name:_=Dt(_>>>0),Rc:y,Xc:y},{Bd:!0})}var Jt=(f,g,_)=>{var y=(I(),J);if(g>>>=0,0<_){var T=g;_=g+_-1;for(var P=0;P<f.length;++P){var D=f.codePointAt(P);if(127>=D){if(g>=_)break;y[g++>>>0]=D}else if(2047>=D){if(g+1>=_)break;y[g++>>>0]=192|D>>6,y[g++>>>0]=128|63&D}else if(65535>=D){if(g+2>=_)break;y[g++>>>0]=224|D>>12,y[g++>>>0]=128|D>>6&63,y[g++>>>0]=128|63&D}else{if(g+3>=_)break;y[g++>>>0]=240|D>>18,y[g++>>>0]=128|D>>12&63,y[g++>>>0]=128|D>>6&63,y[g++>>>0]=128|63&D,P++}}y[g>>>0]=0,f=g-T}else f=0;return f},li=f=>{for(var g=0,_=0;_<f.length;++_){var y=f.charCodeAt(_);127>=y?g++:2047>=y?g+=2:55296<=y&&57343>=y?(g+=4,++_):g+=3}return g};function M2(f,g){Ft(f>>>=0,{name:g=Dt(g>>>0),Rc(_){var y=(I(),$)[_>>>2>>>0];return y=qe(_+4,y,!0),Ct(_),y},Yc(_,y){y instanceof ArrayBuffer&&(y=new Uint8Array(y));var T=typeof y=="string";if(!(T||ArrayBuffer.isView(y)&&y.BYTES_PER_ELEMENT==1))throw new en("Cannot pass non-string to std::string");var P=T?li(y):y.length,D=wn(4+P+1),j=D+4;return(I(),$)[D>>>2>>>0]=P,T?Jt(y,j,P+1):(I(),J).set(y,j>>>0),_!==null&&_.push(Ct,D),D},Xc:co,Zc(_){Ct(_)}})}var xl=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,j2=(f,g,_)=>{if(f>>>=1,16<(g=ol((I(),C),f,g/2,_))-f&&xl)return xl.decode((I(),C).slice(f,g));for(_="";f<g;++f){var y=(I(),C)[f>>>0];_+=String.fromCharCode(y)}return _},F2=(f,g,_)=>{if(_??(_=2147483647),2>_)return 0;var y=g;_=(_-=2)<2*f.length?_/2:f.length;for(var T=0;T<_;++T){var P=f.charCodeAt(T);(I(),K)[g>>>1>>>0]=P,g+=2}return(I(),K)[g>>>1>>>0]=0,g-y},L2=f=>2*f.length,V2=(f,g,_)=>{var y="";f>>>=2;for(var T=0;!(T>=g/4);T++){var P=(I(),$)[f+T>>>0];if(!P&&!_)break;y+=String.fromCodePoint(P)}return y},U2=(f,g,_)=>{if(g>>>=0,_??(_=2147483647),4>_)return 0;var y=g;_=y+_-4;for(var T=0;T<f.length;++T){var P=f.codePointAt(T);if(65535<P&&T++,(I(),B)[g>>>2>>>0]=P,(g+=4)+4>_)break}return(I(),B)[g>>>2>>>0]=0,g-y},q2=f=>{for(var g=0,_=0;_<f.length;++_)65535<f.codePointAt(_)&&_++,g+=4;return g};function G2(f,g,_){if(f>>>=0,g>>>=0,_=Dt(_>>>=0),g===2)var y=j2,T=F2,P=L2;else y=V2,T=U2,P=q2;Ft(f,{name:_,Rc:D=>{var j=(I(),$)[D>>>2>>>0];return j=y(D+4,j*g,!0),Ct(D),j},Yc:(D,j)=>{if(typeof j!="string")throw new en(`Cannot pass non-string to C++ string type ${_}`);var Z=P(j),Y=wn(4+Z+g);return(I(),$)[Y>>>2>>>0]=Z/g,T(j,Y+4,Z+g),D!==null&&D.push(Ct,Y),Y},Xc:co,Zc(D){Ct(D)}})}function H2(f,g){Ft(f>>>=0,{Cd:!0,name:g=Dt(g>>>0),Rc:()=>{},Yc:()=>{}})}function W2(f){vo(f>>>0,!s,1,!n,131072,!1),Ju()}var di=f=>{if(!A)try{if(f(),!(0<ze))try{u?bi()&&xo(m):bn(m)}catch(g){g instanceof ve||g=="unwind"||r(0,g)}}catch(g){g instanceof ve||g=="unwind"||r(0,g)}},K2=!Atomics.waitAsync||((Ud=globalThis.navigator)==null?void 0:Ud.userAgent)&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function ho(f){f>>>=0,K2||(Atomics.waitAsync((I(),B),f>>>2,f).value.then(pi),f+=128,Atomics.store((I(),B),f>>>2,1))}var pi=()=>di(()=>{var f=bi();f&&(ho(f),Zl())});function X2(f,g){(f>>>=0)==g>>>0?setTimeout(pi):u?postMessage({bd:f,Vc:"checkMailbox"}):(f=gr[f])&&f.postMessage({Vc:"checkMailbox"})}var fo=[];function Z2(f,g,_,y,T){for(g>>>=0,T>>>=0,fo.length=0,_=T>>>3,y=T+y>>>3;_<y;){var P;P=(I(),oe)[_++>>>0]?(I(),oe)[_++>>>0]:(I(),G)[_++>>>0],fo.push(P)}return(g?So[g]:Fx[f])(...fo)}var J2=()=>{ze=0};function Y2(f){f>>>=0,u?postMessage({Vc:"cleanupThread",Qd:f}):Zu(gr[f])}function Q2(f){}var ci=f=>{try{f()}catch(g){L(g)}};function ex(f){var g=(..._)=>{hi.push(f);try{return f(..._)}finally{A||(hi.pop(),Nt&&Yt===1&&hi.length===0&&(Yt=0,ze+=1,ci(jd),typeof Fibers<"u"&&Fibers.de()))}};return Il.set(f,g),g}var Yt=0,Nt=null,$l=0,hi=[],mo=new Map,Tl=new Map,Il=new Map,tx=0,go=null,rx=[],Sl=f=>(function(g){if(!A){if(Yt===0){var _=!1,y=!1;g((T=0)=>{if(!A&&($l=T,_=!0,y)){Yt=2,ci(()=>Fd(Nt)),typeof MainLoop<"u"&&MainLoop.xd&&MainLoop.resume(),T=!1;try{var P=(function(){var Z=(I(),B)[Nt+8>>>2>>>0];return Z=Tl.get(Z),Z=Il.get(Z),--ze,Z()})()}catch(Z){P=Z,T=!0}var D=!1;if(!Nt){var j=go;j&&(go=null,(T?j.reject:j.resolve)(P),D=!0)}if(T&&!D)throw P}}),y=!0,_||(Yt=1,Nt=(function(){var T=wn(65548),P=T+12;if((I(),$)[T>>>2>>>0]=P,(I(),$)[T+4>>>2>>>0]=P+65536,P=hi[0],!mo.has(P)){var D=tx++;mo.set(P,D),Tl.set(D,P)}return P=mo.get(P),(I(),B)[T+8>>>2>>>0]=P,T})(),typeof MainLoop<"u"&&MainLoop.xd&&MainLoop.pause(),ci(()=>Md(Nt)))}else Yt===2?(Yt=0,ci(Ld),Ct(Nt),Nt=null,rx.forEach(di)):L(`invalid state: ${Yt}`);return $l}})(g=>{f().then(g)});function nx(f){return f>>>=0,Sl(async()=>{var g=await ft(f);return vt(g)})}var bo=[],ix=f=>{var g=bo.length;return bo.push(f),g},ox=(f,g)=>{for(var _=Array(f),y=0;y<f;++y){var T=y,P=(I(),$)[g+4*y>>>2>>>0],D=lo[P];if(D===void 0)throw f=`parameter ${y}`,P=ql(P),g=Dt(P),Ct(P),new en(`${f} has unknown type ${g}`);_[T]=D}return _},ax=(f,g,_)=>{var y=[];return f=f(y,_),y.length&&((I(),$)[g>>>2>>>0]=vt(y)),f},sx={},fi=f=>{var g=sx[f];return g===void 0?Dt(f):g};function ux(f,g,_){var[y,...T]=ox(f,g>>>0);g=y.Yc.bind(y);var P=T.map(Z=>Z.Xc.bind(Z));f--;var D={toValue:ft};switch(f=P.map((Z,Y)=>{var pe=`argFromPtr${Y}`;return D[pe]=Z,`${pe}(args${Y?"+"+8*Y:""})`}),_){case 0:var j="toValue(handle)";break;case 2:j="new (toValue(handle))";break;case 3:j="";break;case 1:D.getStringOrSymbol=fi,j="toValue(handle)[getStringOrSymbol(methodName)]"}return j+=`(${f})`,y.Cd||(D.toReturnWire=g,D.emval_returnValue=ax,j=`return emval_returnValue(toReturnWire, destructorsRef, ${j})`),j=`return function (handle, methodName, destructorsRef, args) {
  ${j}
  }`,_=new Function(Object.keys(D),j)(...Object.values(D)),j=`methodCaller<(${T.map(Z=>Z.name)}) => ${y.name}>`,ix(Object.defineProperty(_,"name",{value:j}))}function lx(f,g){return g>>>=0,(f=ft(f>>>0))==ft(g)}function dx(f){return(f>>>=0)?(f=fi(f),vt(globalThis[f])):vt(globalThis)}function px(f){return f=fi(f>>>0),vt(t[f])}function cx(f,g){return g>>>=0,f=ft(f>>>0),g=ft(g),vt(f[g])}function hx(f){9<(f>>>=0)&&(br[f+1]+=1)}function Ol(f,g,_,y,T){return bo[f>>>0](g>>>0,_>>>0,y>>>0,T>>>0)}function fx(f,g,_,y,T){return Ol(f>>>0,g>>>0,_>>>0,y>>>0,T>>>0)}function mx(){return vt([])}function gx(f){f=ft(f>>>0);for(var g=Array(f.length),_=0;_<f.length;_++)g[_]=f[_];return vt(g)}function bx(f){return vt(fi(f>>>0))}function yx(){return vt({})}function _x(f){for(var g=ft(f>>>=0);g.length;){var _=g.pop();g.pop()(_)}po(f)}function wx(f,g,_){g>>>=0,_>>>=0,f=ft(f>>>0),g=ft(g),_=ft(_),f[g]=_}function vx(f,g){f=-9007199254740992>f||9007199254740992<f?NaN:Number(f),g>>>=0,f=new Date(1e3*f),(I(),B)[g>>>2>>>0]=f.getUTCSeconds(),(I(),B)[g+4>>>2>>>0]=f.getUTCMinutes(),(I(),B)[g+8>>>2>>>0]=f.getUTCHours(),(I(),B)[g+12>>>2>>>0]=f.getUTCDate(),(I(),B)[g+16>>>2>>>0]=f.getUTCMonth(),(I(),B)[g+20>>>2>>>0]=f.getUTCFullYear()-1900,(I(),B)[g+24>>>2>>>0]=f.getUTCDay(),f=(f.getTime()-Date.UTC(f.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(I(),B)[g+28>>>2>>>0]=f}var El=f=>f%4==0&&(f%100!=0||f%400==0),Pl=[0,31,60,91,121,152,182,213,244,274,305,335],Al=[0,31,59,90,120,151,181,212,243,273,304,334];function xx(f,g){f=-9007199254740992>f||9007199254740992<f?NaN:Number(f),g>>>=0,f=new Date(1e3*f),(I(),B)[g>>>2>>>0]=f.getSeconds(),(I(),B)[g+4>>>2>>>0]=f.getMinutes(),(I(),B)[g+8>>>2>>>0]=f.getHours(),(I(),B)[g+12>>>2>>>0]=f.getDate(),(I(),B)[g+16>>>2>>>0]=f.getMonth(),(I(),B)[g+20>>>2>>>0]=f.getFullYear()-1900,(I(),B)[g+24>>>2>>>0]=f.getDay();var _=(El(f.getFullYear())?Pl:Al)[f.getMonth()]+f.getDate()-1|0;(I(),B)[g+28>>>2>>>0]=_,(I(),B)[g+36>>>2>>>0]=-60*f.getTimezoneOffset(),_=new Date(f.getFullYear(),6,1).getTimezoneOffset();var y=new Date(f.getFullYear(),0,1).getTimezoneOffset();f=0|(_!=y&&f.getTimezoneOffset()==Math.min(y,_)),(I(),B)[g+32>>>2>>>0]=f}function $x(f){f>>>=0;var g=new Date((I(),B)[f+20>>>2>>>0]+1900,(I(),B)[f+16>>>2>>>0],(I(),B)[f+12>>>2>>>0],(I(),B)[f+8>>>2>>>0],(I(),B)[f+4>>>2>>>0],(I(),B)[f>>>2>>>0],0),_=(I(),B)[f+32>>>2>>>0],y=g.getTimezoneOffset(),T=new Date(g.getFullYear(),6,1).getTimezoneOffset(),P=new Date(g.getFullYear(),0,1).getTimezoneOffset(),D=Math.min(P,T);return 0>_?(I(),B)[f+32>>>2>>>0]=+(T!=P&&D==y):0<_!=(D==y)&&(T=Math.max(P,T),g.setTime(g.getTime()+6e4*((0<_?D:T)-y))),(I(),B)[f+24>>>2>>>0]=g.getDay(),_=(El(g.getFullYear())?Pl:Al)[g.getMonth()]+g.getDate()-1|0,(I(),B)[f+28>>>2>>>0]=_,(I(),B)[f>>>2>>>0]=g.getSeconds(),(I(),B)[f+4>>>2>>>0]=g.getMinutes(),(I(),B)[f+8>>>2>>>0]=g.getHours(),(I(),B)[f+12>>>2>>>0]=g.getDate(),(I(),B)[f+16>>>2>>>0]=g.getMonth(),(I(),B)[f+20>>>2>>>0]=g.getYear(),f=g.getTime(),BigInt(isNaN(f)?-1:f/1e3)}function kl(f,g,_,y,T,P,D){return u?se(16,1,f,g,_,y,T,P,D):-52}function Dl(f,g,_,y,T,P){if(u)return se(17,1,f,g,_,y,T,P)}var _n={},Tx=()=>performance.timeOrigin+performance.now();function Nl(f,g){if(u)return se(18,1,f,g);if(_n[f]&&(clearTimeout(_n[f].id),delete _n[f]),!g)return 0;var _=setTimeout(()=>{delete _n[f],di(()=>Xl(f,performance.timeOrigin+performance.now()))},g);return _n[f]={id:_,ce:g},0}function Ix(f,g,_,y){f>>>=0,g>>>=0,_>>>=0,y>>>=0;var T=new Date().getFullYear(),P=new Date(T,0,1).getTimezoneOffset();T=new Date(T,6,1).getTimezoneOffset();var D=Math.max(P,T);(I(),$)[f>>>2>>>0]=60*D,(I(),B)[g>>>2>>>0]=+(P!=T),f=(g=j=>{var Z=Math.abs(j);return`UTC${0<=j?"-":"+"}${String(Math.floor(Z/60)).padStart(2,"0")}${String(Z%60).padStart(2,"0")}`})(P),g=g(T),T<P?(Jt(f,_,17),Jt(g,y,17)):(Jt(f,y,17),Jt(g,_,17))}var Sx=()=>Date.now();function Ox(f,g,_){return _>>>=0,0<=f&&3>=f?(f===0?f=Date.now():f=performance.timeOrigin+performance.now(),f=Math.round(1e6*f),(I(),oe)[_>>>3>>>0]=BigInt(f),0):28}var yo=[],Cl=(f,g)=>{yo.length=0;for(var _;_=(I(),J)[f++>>>0];){var y=_!=105;g+=(y&=_!=112)&&g%8?4:0,yo.push(_==112?(I(),$)[g>>>2>>>0]:_==106?(I(),oe)[g>>>3>>>0]:_==105?(I(),B)[g>>>2>>>0]:(I(),G)[g>>>3>>>0]),g+=y?8:4}return yo};function Ex(f,g,_){return f>>>=0,g=Cl(g>>>0,_>>>0),So[f](...g)}function Px(f,g,_){return f>>>=0,g=Cl(g>>>0,_>>>0),So[f](...g)}var Ax=()=>{};function kx(f,g){return E(qe(f>>>0,g>>>0))}var Dx=()=>{throw ze+=1,"unwind"};function Nx(){return 4294901760}var Cx=()=>navigator.hardwareConcurrency,yr={},mi=f=>{var g;return(g=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(f))?+g[1]:(g=/:(\d+):\d+(?:\)|$)/.exec(f))?2147483648|+g[1]:0},zl=f=>{for(var g of f)(f=mi(g))&&(yr[f]=g)};function zx(){var f=Error().stack.toString().split(`
`);return f[0]=="Error"&&f.shift(),zl(f),yr.kd=mi(f[3]),yr.Md=f,yr.kd}function gi(f){if(!(f=yr[f>>>0]))return 0;var g;if(g=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(f))f=g[1];else if(g=/^\s+at (.*) \(.*\)$/.exec(f))f=g[1];else{if(!(g=/^(.+?)@/.exec(f)))return 0;f=g[1]}Ct(gi.ld??0),g=li(f)+1;var _=wn(g);return _&&Jt(f,_,g),gi.ld=_,gi.ld}function Rx(f){f>>>=0;var g=(I(),J).length;if(f<=g||4294901760<f)return!1;for(var _=1;4>=_;_*=2){var y=g*(1+.2/_);y=Math.min(y,f+100663296);e:{y=(Math.min(4294901760,65536*Math.ceil(Math.max(f,y)/65536))-Zt.buffer.byteLength+65535)/65536|0;try{Zt.grow(y),W();var T=1;break e}catch{}T=void 0}if(T)return!0}return!1}function Bx(f,g,_){if(f>>>=0,g>>>=0,yr.kd==f)var y=yr.Md;else(y=Error().stack.toString().split(`
`))[0]=="Error"&&y.shift(),zl(y);for(var T=3;y[T]&&mi(y[T])!=f;)++T;for(f=0;f<_&&y[f+T];++f)(I(),B)[g+4*f>>>2>>>0]=mi(y[f+T]);return f}var _o,wo={},Rl=()=>{var y;if(!_o){var f,g={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(((y=globalThis.navigator)==null?void 0:y.language)??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(f in wo)wo[f]===void 0?delete g[f]:g[f]=wo[f];var _=[];for(f in g)_.push(`${f}=${g[f]}`);_o=_}return _o};function Bl(f,g){if(u)return se(19,1,f,g);f>>>=0,g>>>=0;var _,y=0,T=0;for(_ of Rl()){var P=g+y;(I(),$)[f+T>>>2>>>0]=P,y+=Jt(_,P,1/0)+1,T+=4}return 0}function Ml(f,g){if(u)return se(20,1,f,g);f>>>=0,g>>>=0;var _=Rl();for(var y of((I(),$)[f>>>2>>>0]=_.length,f=0,_))f+=li(y)+1;return(I(),$)[g>>>2>>>0]=f,0}function jl(f){return u?se(21,1,f):52}function Fl(f,g,_,y,T){return u?se(22,1,f,g,_,y,T):52}function Ll(f,g,_,y){return u?se(23,1,f,g,_,y):52}function Vl(f,g,_,y){return u?se(24,1,f,g,_,y):70}var Mx=[null,[],[]];function Ul(f,g,_,y){if(u)return se(25,1,f,g,_,y);g>>>=0,_>>>=0,y>>>=0;for(var T=0,P=0;P<_;P++){var D=(I(),$)[g>>>2>>>0],j=(I(),$)[g+4>>>2>>>0];g+=8;for(var Z=0;Z<j;Z++){var Y=f,pe=(I(),J)[D+Z>>>0],xe=Mx[Y];pe===0||pe===10?((Y===1?O:E)(al(xe)),xe.length=0):xe.push(pe)}T+=j}return(I(),$)[y>>>2>>>0]=T,0}function jx(f){return f>>>0}u||(function(){for(var f=t.numThreads-1;f--;)Qu();rt.push(async()=>{var g=(async function(){if(!u)return Promise.all(Xt.map(Yu))})();ot++,await g,--ot==0&&nt&&(g=nt,nt=null,g())})})(),u||(Zt=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),W()),t.wasmBinary&&(c=t.wasmBinary),t.stackSave=()=>me(),t.stackRestore=f=>he(f),t.stackAlloc=f=>$o(f),t.setValue=function(f,g,_="i8"){switch(_.endsWith("*")&&(_="*"),_){case"i1":case"i8":(I(),q)[f>>>0]=g;break;case"i16":(I(),K)[f>>>1>>>0]=g;break;case"i32":(I(),B)[f>>>2>>>0]=g;break;case"i64":(I(),oe)[f>>>3>>>0]=BigInt(g);break;case"float":(I(),z)[f>>>2>>>0]=g;break;case"double":(I(),G)[f>>>3>>>0]=g;break;case"*":(I(),$)[f>>>2>>>0]=g;break;default:L(`invalid type for setValue: ${_}`)}},t.getValue=function(f,g="i8"){switch(g.endsWith("*")&&(g="*"),g){case"i1":case"i8":return(I(),q)[f>>>0];case"i16":return(I(),K)[f>>>1>>>0];case"i32":return(I(),B)[f>>>2>>>0];case"i64":return(I(),oe)[f>>>3>>>0];case"float":return(I(),z)[f>>>2>>>0];case"double":return(I(),G)[f>>>3>>>0];case"*":return(I(),$)[f>>>2>>>0];default:L(`invalid type for getValue: ${g}`)}},t.UTF8ToString=qe,t.stringToUTF8=Jt,t.lengthBytesUTF8=li;var ql,Gl,bi,Ct,wn,vo,Hl,Wl,Kl,xo,Xl,Zl,be,vn,Jl,he,$o,me,Yl,To,Ql,ed,td,Io,rd,nd,id,od,ad,sd,ud,ld,dd,pd,cd,hd,fd,md,gd,bd,yd,_d,wd,vd,xd,$d,Td,Id,Sd,Od,Ed,Pd,Ad,kd,Dd,Nd,Cd,zd,Rd,Bd,Md,jd,Fd,Ld,Lt,Fx=[at,ai,rl,sl,ul,ll,dl,pl,cl,hl,fl,ml,gl,bl,yl,_l,kl,Dl,Nl,Bl,Ml,jl,Fl,Ll,Vl,Ul],So={1086876:(f,g,_,y,T)=>{if(t===void 0||!t.ad)return 1;if((f=qe(Number(f>>>0))).startsWith("./")&&(f=f.substring(2)),!(f=t.ad.get(f)))return 2;if(g=Number(g>>>0),_=Number(_>>>0),y=Number(y>>>0),g+_>f.byteLength)return 3;try{let P=f.subarray(g,g+_);switch(T){case 0:(I(),J).set(P,y>>>0);break;case 1:t.Td?t.Td(y,P):t.Ld(y,P);break;default:return 4}return 0}catch{return 4}},1087700:(f,g,_)=>{t.wd(f,(I(),J).subarray(g>>>0,g+_>>>0))},1087764:()=>t.Vd(),1087806:f=>{t.vd(f)},1087843:()=>{t.Ed()},1087874:()=>{t.Fd()},1087903:()=>{t.Jd()},1087928:f=>t.Dd(f),1087961:f=>t.Hd(f),1087993:(f,g,_)=>{t.jd(Number(f),Number(g),Number(_),!0)},1088056:(f,g,_)=>{t.jd(Number(f),Number(g),Number(_))},1088113:()=>typeof wasmOffsetConverter<"u",1088170:f=>{t.bc("Abs",f,void 0)},1088221:f=>{t.bc("Neg",f,void 0)},1088272:f=>{t.bc("Floor",f,void 0)},1088325:f=>{t.bc("Ceil",f,void 0)},1088377:f=>{t.bc("Reciprocal",f,void 0)},1088435:f=>{t.bc("Sqrt",f,void 0)},1088487:f=>{t.bc("Exp",f,void 0)},1088538:f=>{t.bc("Erf",f,void 0)},1088589:f=>{t.bc("Sigmoid",f,void 0)},1088644:(f,g,_)=>{t.bc("HardSigmoid",f,{alpha:g,beta:_})},1088723:f=>{t.bc("HardSwish",f,void 0)},1088780:f=>{t.bc("Log",f,void 0)},1088831:f=>{t.bc("Sin",f,void 0)},1088882:f=>{t.bc("Cos",f,void 0)},1088933:f=>{t.bc("Tan",f,void 0)},1088984:f=>{t.bc("Asin",f,void 0)},1089036:f=>{t.bc("Acos",f,void 0)},1089088:f=>{t.bc("Atan",f,void 0)},1089140:f=>{t.bc("Sinh",f,void 0)},1089192:f=>{t.bc("Cosh",f,void 0)},1089244:f=>{t.bc("Asinh",f,void 0)},1089297:f=>{t.bc("Acosh",f,void 0)},1089350:f=>{t.bc("Atanh",f,void 0)},1089403:f=>{t.bc("Tanh",f,void 0)},1089455:f=>{t.bc("Not",f,void 0)},1089506:(f,g,_)=>{t.bc("Clip",f,{min:g,max:_})},1089575:f=>{t.bc("Clip",f,void 0)},1089627:(f,g)=>{t.bc("Elu",f,{alpha:g})},1089685:f=>{t.bc("Gelu",f,void 0)},1089737:f=>{t.bc("Relu",f,void 0)},1089789:(f,g)=>{t.bc("LeakyRelu",f,{alpha:g})},1089853:(f,g)=>{t.bc("ThresholdedRelu",f,{alpha:g})},1089923:(f,g)=>{t.bc("Cast",f,{to:g})},1089981:f=>{t.bc("Add",f,void 0)},1090032:f=>{t.bc("Sub",f,void 0)},1090083:f=>{t.bc("Mul",f,void 0)},1090134:f=>{t.bc("Div",f,void 0)},1090185:f=>{t.bc("Pow",f,void 0)},1090236:f=>{t.bc("Equal",f,void 0)},1090289:f=>{t.bc("Greater",f,void 0)},1090344:f=>{t.bc("GreaterOrEqual",f,void 0)},1090406:f=>{t.bc("Less",f,void 0)},1090458:f=>{t.bc("LessOrEqual",f,void 0)},1090517:(f,g,_,y,T)=>{t.bc("ReduceMean",f,{keepDims:!!g,noopWithEmptyAxes:!!_,axes:y?Array.from((I(),B).subarray(Number(y)>>>0,Number(T)>>>0)):[]})},1090692:(f,g,_,y,T)=>{t.bc("ReduceMax",f,{keepDims:!!g,noopWithEmptyAxes:!!_,axes:y?Array.from((I(),B).subarray(Number(y)>>>0,Number(T)>>>0)):[]})},1090866:(f,g,_,y,T)=>{t.bc("ReduceMin",f,{keepDims:!!g,noopWithEmptyAxes:!!_,axes:y?Array.from((I(),B).subarray(Number(y)>>>0,Number(T)>>>0)):[]})},1091040:(f,g,_,y,T)=>{t.bc("ReduceProd",f,{keepDims:!!g,noopWithEmptyAxes:!!_,axes:y?Array.from((I(),B).subarray(Number(y)>>>0,Number(T)>>>0)):[]})},1091215:(f,g,_,y,T)=>{t.bc("ReduceSum",f,{keepDims:!!g,noopWithEmptyAxes:!!_,axes:y?Array.from((I(),B).subarray(Number(y)>>>0,Number(T)>>>0)):[]})},1091389:(f,g,_,y,T)=>{t.bc("ReduceL1",f,{keepDims:!!g,noopWithEmptyAxes:!!_,axes:y?Array.from((I(),B).subarray(Number(y)>>>0,Number(T)>>>0)):[]})},1091562:(f,g,_,y,T)=>{t.bc("ReduceL2",f,{keepDims:!!g,noopWithEmptyAxes:!!_,axes:y?Array.from((I(),B).subarray(Number(y)>>>0,Number(T)>>>0)):[]})},1091735:(f,g,_,y,T)=>{t.bc("ReduceLogSum",f,{keepDims:!!g,noopWithEmptyAxes:!!_,axes:y?Array.from((I(),B).subarray(Number(y)>>>0,Number(T)>>>0)):[]})},1091912:(f,g,_,y,T)=>{t.bc("ReduceSumSquare",f,{keepDims:!!g,noopWithEmptyAxes:!!_,axes:y?Array.from((I(),B).subarray(Number(y)>>>0,Number(T)>>>0)):[]})},1092092:(f,g,_,y,T)=>{t.bc("ReduceLogSumExp",f,{keepDims:!!g,noopWithEmptyAxes:!!_,axes:y?Array.from((I(),B).subarray(Number(y)>>>0,Number(T)>>>0)):[]})},1092272:f=>{t.bc("Where",f,void 0)},1092325:(f,g,_)=>{t.bc("Transpose",f,{perm:g?Array.from((I(),B).subarray(Number(g)>>>0,Number(_)>>>0)):[]})},1092449:(f,g,_,y)=>{t.bc("DepthToSpace",f,{blocksize:g,mode:qe(_),format:y?"NHWC":"NCHW"})},1092582:(f,g,_,y)=>{t.bc("DepthToSpace",f,{blocksize:g,mode:qe(_),format:y?"NHWC":"NCHW"})},1092715:(f,g,_,y)=>{t.bc("DFT",f,{axis:g,inverse:_,onesided:y})},1092807:(f,g,_,y,T,P,D,j,Z,Y,pe,xe,De,Re,Qt)=>{t.bc("ConvTranspose",f,{format:Z?"NHWC":"NCHW",autoPad:g,dilations:[_],group:y,kernelShape:[T],pads:[P,D],strides:[j],wIsConst:()=>!!(I(),q)[Y>>>0],outputPadding:pe?Array.from((I(),B).subarray(Number(pe)>>>0,Number(xe)>>>0)):[],outputShape:De?Array.from((I(),B).subarray(Number(De)>>>0,Number(Re)>>>0)):[],activation:qe(Qt)})},1093240:(f,g,_,y,T,P,D,j,Z,Y,pe,xe,De,Re)=>{t.bc("ConvTranspose",f,{format:j?"NHWC":"NCHW",autoPad:g,dilations:Array.from((I(),B).subarray(Number(_)>>>0,(Number(_)>>>0)+2>>>0)),group:y,kernelShape:Array.from((I(),B).subarray(Number(T)>>>0,(Number(T)>>>0)+2>>>0)),pads:Array.from((I(),B).subarray(Number(P)>>>0,(Number(P)>>>0)+4>>>0)),strides:Array.from((I(),B).subarray(Number(D)>>>0,(Number(D)>>>0)+2>>>0)),wIsConst:()=>!!(I(),q)[Z>>>0],outputPadding:Y?Array.from((I(),B).subarray(Number(Y)>>>0,Number(pe)>>>0)):[],outputShape:xe?Array.from((I(),B).subarray(Number(xe)>>>0,Number(De)>>>0)):[],activation:qe(Re)})},1093901:(f,g,_,y,T,P,D,j,Z,Y,pe,xe,De,Re,Qt)=>{t.bc("ConvTranspose",f,{format:Z?"NHWC":"NCHW",autoPad:g,dilations:[_],group:y,kernelShape:[T],pads:[P,D],strides:[j],wIsConst:()=>!!(I(),q)[Y>>>0],outputPadding:pe?Array.from((I(),B).subarray(Number(pe)>>>0,Number(xe)>>>0)):[],outputShape:De?Array.from((I(),B).subarray(Number(De)>>>0,Number(Re)>>>0)):[],activation:qe(Qt)})},1094334:(f,g,_,y,T,P,D,j,Z,Y,pe,xe,De,Re)=>{t.bc("ConvTranspose",f,{format:j?"NHWC":"NCHW",autoPad:g,dilations:Array.from((I(),B).subarray(Number(_)>>>0,(Number(_)>>>0)+2>>>0)),group:y,kernelShape:Array.from((I(),B).subarray(Number(T)>>>0,(Number(T)>>>0)+2>>>0)),pads:Array.from((I(),B).subarray(Number(P)>>>0,(Number(P)>>>0)+4>>>0)),strides:Array.from((I(),B).subarray(Number(D)>>>0,(Number(D)>>>0)+2>>>0)),wIsConst:()=>!!(I(),q)[Z>>>0],outputPadding:Y?Array.from((I(),B).subarray(Number(Y)>>>0,Number(pe)>>>0)):[],outputShape:xe?Array.from((I(),B).subarray(Number(xe)>>>0,Number(De)>>>0)):[],activation:qe(Re)})},1094995:(f,g)=>{t.bc("GlobalAveragePool",f,{format:g?"NHWC":"NCHW"})},1095086:(f,g,_,y,T,P,D,j,Z,Y,pe,xe,De,Re)=>{t.bc("AveragePool",f,{format:Re?"NHWC":"NCHW",auto_pad:g,ceil_mode:_,count_include_pad:y,storage_order:T,dilations:P?Array.from((I(),B).subarray(Number(P)>>>0,Number(D)>>>0)):[],kernel_shape:j?Array.from((I(),B).subarray(Number(j)>>>0,Number(Z)>>>0)):[],pads:Y?Array.from((I(),B).subarray(Number(Y)>>>0,Number(pe)>>>0)):[],strides:xe?Array.from((I(),B).subarray(Number(xe)>>>0,Number(De)>>>0)):[]})},1095565:(f,g)=>{t.bc("GlobalAveragePool",f,{format:g?"NHWC":"NCHW"})},1095656:(f,g,_,y,T,P,D,j,Z,Y,pe,xe,De,Re)=>{t.bc("AveragePool",f,{format:Re?"NHWC":"NCHW",auto_pad:g,ceil_mode:_,count_include_pad:y,storage_order:T,dilations:P?Array.from((I(),B).subarray(Number(P)>>>0,Number(D)>>>0)):[],kernel_shape:j?Array.from((I(),B).subarray(Number(j)>>>0,Number(Z)>>>0)):[],pads:Y?Array.from((I(),B).subarray(Number(Y)>>>0,Number(pe)>>>0)):[],strides:xe?Array.from((I(),B).subarray(Number(xe)>>>0,Number(De)>>>0)):[]})},1096135:(f,g)=>{t.bc("GlobalMaxPool",f,{format:g?"NHWC":"NCHW"})},1096222:(f,g,_,y,T,P,D,j,Z,Y,pe,xe,De,Re)=>{t.bc("MaxPool",f,{format:Re?"NHWC":"NCHW",auto_pad:g,ceil_mode:_,count_include_pad:y,storage_order:T,dilations:P?Array.from((I(),B).subarray(Number(P)>>>0,Number(D)>>>0)):[],kernel_shape:j?Array.from((I(),B).subarray(Number(j)>>>0,Number(Z)>>>0)):[],pads:Y?Array.from((I(),B).subarray(Number(Y)>>>0,Number(pe)>>>0)):[],strides:xe?Array.from((I(),B).subarray(Number(xe)>>>0,Number(De)>>>0)):[]})},1096697:(f,g)=>{t.bc("GlobalMaxPool",f,{format:g?"NHWC":"NCHW"})},1096784:(f,g,_,y,T,P,D,j,Z,Y,pe,xe,De,Re)=>{t.bc("MaxPool",f,{format:Re?"NHWC":"NCHW",auto_pad:g,ceil_mode:_,count_include_pad:y,storage_order:T,dilations:P?Array.from((I(),B).subarray(Number(P)>>>0,Number(D)>>>0)):[],kernel_shape:j?Array.from((I(),B).subarray(Number(j)>>>0,Number(Z)>>>0)):[],pads:Y?Array.from((I(),B).subarray(Number(Y)>>>0,Number(pe)>>>0)):[],strides:xe?Array.from((I(),B).subarray(Number(xe)>>>0,Number(De)>>>0)):[]})},1097259:(f,g,_,y,T)=>{t.bc("Gemm",f,{alpha:g,beta:_,transA:y,transB:T})},1097363:f=>{t.bc("MatMul",f,void 0)},1097417:(f,g,_,y)=>{t.bc("ArgMax",f,{keepDims:!!g,selectLastIndex:!!_,axis:y})},1097525:(f,g,_,y)=>{t.bc("ArgMin",f,{keepDims:!!g,selectLastIndex:!!_,axis:y})},1097633:(f,g)=>{t.bc("Softmax",f,{axis:g})},1097696:(f,g)=>{t.bc("Concat",f,{axis:g})},1097756:(f,g,_,y,T)=>{t.bc("Split",f,{axis:g,numOutputs:_,splitSizes:y?Array.from((I(),B).subarray(Number(y)>>>0,Number(T)>>>0)):[]})},1097912:f=>{t.bc("Expand",f,void 0)},1097966:(f,g)=>{t.bc("Gather",f,{axis:Number(g)})},1098037:(f,g)=>{t.bc("GatherElements",f,{axis:Number(g)})},1098116:(f,g)=>{t.bc("GatherND",f,{batch_dims:Number(g)})},1098195:(f,g,_,y,T,P,D,j,Z,Y,pe)=>{t.bc("Resize",f,{antialias:g,axes:_?Array.from((I(),B).subarray(Number(_)>>>0,Number(y)>>>0)):[],coordinateTransformMode:qe(T),cubicCoeffA:P,excludeOutside:D,extrapolationValue:j,keepAspectRatioPolicy:qe(Z),mode:qe(Y),nearestMode:qe(pe)})},1098557:(f,g,_,y,T,P,D)=>{t.bc("Slice",f,{starts:g?Array.from((I(),B).subarray(Number(g)>>>0,Number(_)>>>0)):[],ends:y?Array.from((I(),B).subarray(Number(y)>>>0,Number(T)>>>0)):[],axes:P?Array.from((I(),B).subarray(Number(P)>>>0,Number(D)>>>0)):[]})},1098821:f=>{t.bc("Tile",f,void 0)},1098873:(f,g,_)=>{t.bc("InstanceNormalization",f,{epsilon:g,format:_?"NHWC":"NCHW"})},1098987:(f,g,_)=>{t.bc("InstanceNormalization",f,{epsilon:g,format:_?"NHWC":"NCHW"})},1099101:f=>{t.bc("Range",f,void 0)},1099154:(f,g)=>{t.bc("Einsum",f,{equation:qe(g)})},1099235:(f,g,_,y,T)=>{t.bc("Pad",f,{mode:g,value:_,pads:y?Array.from((I(),B).subarray(Number(y)>>>0,Number(T)>>>0)):[]})},1099378:(f,g,_,y,T,P)=>{t.bc("BatchNormalization",f,{epsilon:g,momentum:_,spatial:!!T,trainingMode:!!y,format:P?"NHWC":"NCHW"})},1099547:(f,g,_,y,T,P)=>{t.bc("BatchNormalization",f,{epsilon:g,momentum:_,spatial:!!T,trainingMode:!!y,format:P?"NHWC":"NCHW"})},1099716:(f,g,_)=>{t.bc("CumSum",f,{exclusive:Number(g),reverse:Number(_)})},1099813:(f,g,_)=>{t.bc("DequantizeLinear",f,{axis:g,blockSize:_})},1099903:(f,g,_,y,T)=>{t.bc("GridSample",f,{align_corners:g,mode:qe(_),padding_mode:qe(y),format:T?"NHWC":"NCHW"})},1100073:(f,g,_,y,T)=>{t.bc("GridSample",f,{align_corners:g,mode:qe(_),padding_mode:qe(y),format:T?"NHWC":"NCHW"})},1100243:(f,g)=>{t.bc("ScatterND",f,{reduction:qe(g)})},1100328:(f,g,_,y,T,P,D,j,Z)=>{t.bc("Attention",f,{numHeads:g,isUnidirectional:_,maskFilterValue:y,scale:T,doRotary:P,qkvHiddenSizes:D?Array.from((I(),B).subarray(Number(j)>>>0,Number(j)+D>>>0)):[],pastPresentShareBuffer:!!Z})},1100600:f=>{t.bc("BiasAdd",f,void 0)},1100655:f=>{t.bc("BiasSplitGelu",f,void 0)},1100716:f=>{t.bc("FastGelu",f,void 0)},1100772:(f,g,_,y,T,P,D,j,Z,Y,pe,xe,De,Re,Qt,Oo)=>{t.bc("Conv",f,{format:xe?"NHWC":"NCHW",auto_pad:g,dilations:_?Array.from((I(),B).subarray(Number(_)>>>0,Number(y)>>>0)):[],group:T,kernel_shape:P?Array.from((I(),B).subarray(Number(P)>>>0,Number(D)>>>0)):[],pads:j?Array.from((I(),B).subarray(Number(j)>>>0,Number(Z)>>>0)):[],strides:Y?Array.from((I(),B).subarray(Number(Y)>>>0,Number(pe)>>>0)):[],w_is_const:()=>!!(I(),q)[Number(De)>>>0],activation:qe(Re),activation_params:Qt?Array.from((I(),z).subarray(Number(Qt)>>>0,Number(Oo)>>>0)):[]})},1101356:f=>{t.bc("Gelu",f,void 0)},1101408:(f,g,_,y,T,P,D,j,Z)=>{t.bc("GroupQueryAttention",f,{numHeads:g,kvNumHeads:_,scale:y,softcap:T,doRotary:P,rotaryInterleaved:D,smoothSoftmax:j,localWindowSize:Z})},1101625:(f,g,_,y)=>{t.bc("LayerNormalization",f,{axis:g,epsilon:_,simplified:!!y})},1101736:(f,g,_,y)=>{t.bc("LayerNormalization",f,{axis:g,epsilon:_,simplified:!!y})},1101847:(f,g,_,y,T,P)=>{t.bc("MatMulNBits",f,{k:g,n:_,accuracyLevel:y,bits:T,blockSize:P})},1101974:(f,g,_,y,T,P)=>{t.bc("MultiHeadAttention",f,{numHeads:g,isUnidirectional:_,maskFilterValue:y,scale:T,doRotary:P})},1102133:(f,g)=>{t.bc("QuickGelu",f,{alpha:g})},1102197:(f,g,_,y,T)=>{t.bc("RotaryEmbedding",f,{interleaved:!!g,numHeads:_,rotaryEmbeddingDim:y,scale:T})},1102336:(f,g,_)=>{t.bc("SkipLayerNormalization",f,{epsilon:g,simplified:!!_})},1102438:(f,g,_)=>{t.bc("SkipLayerNormalization",f,{epsilon:g,simplified:!!_})},1102540:(f,g,_,y)=>{t.bc("GatherBlockQuantized",f,{gatherAxis:g,quantizeAxis:_,blockSize:y})},1102661:f=>{t.Id(f)},1102695:(f,g)=>t.Kd(Number(f),Number(g),t.$c.Nd,t.$c.errors)};function Lx(f,g,_){return Sl(async()=>{await t.Gd(Number(f),Number(g),Number(_))})}function Vx(){return typeof wasmOffsetConverter<"u"}function Ux(f,g,_,y){var T=me();try{return ld(f,g,_,y)}catch(P){if(he(T),P!==P+0)throw P;be(1,0)}}function qx(f,g,_){var y=me();try{return od(f,g,_)}catch(T){if(he(y),T!==T+0)throw T;be(1,0)}}function Gx(f){var g=me();try{rd(f)}catch(_){if(he(g),_!==_+0)throw _;be(1,0)}}function Hx(f,g){var _=me();try{return Io(f,g)}catch(y){if(he(_),y!==y+0)throw y;be(1,0)}}function Wx(f,g,_){var y=me();try{td(f,g,_)}catch(T){if(he(y),T!==T+0)throw T;be(1,0)}}function Kx(f,g){var _=me();try{dd(f,g)}catch(y){if(he(_),y!==y+0)throw y;be(1,0)}}function Xx(f,g,_,y,T,P,D){var j=me();try{return sd(f,g,_,y,T,P,D)}catch(Z){if(he(j),Z!==Z+0)throw Z;be(1,0)}}function Zx(f,g,_,y,T,P){var D=me();try{nd(f,g,_,y,T,P)}catch(j){if(he(D),j!==j+0)throw j;be(1,0)}}function Jx(f,g,_,y){var T=me();try{ud(f,g,_,y)}catch(P){if(he(T),P!==P+0)throw P;be(1,0)}}function Yx(f,g,_,y,T){var P=me();try{id(f,g,_,y,T)}catch(D){if(he(P),D!==D+0)throw D;be(1,0)}}function Qx(f,g,_,y,T,P,D){var j=me();try{cd(f,g,_,y,T,P,D)}catch(Z){if(he(j),Z!==Z+0)throw Z;be(1,0)}}function e$(f,g,_,y,T,P,D){var j=me();try{hd(f,g,_,y,T,P,D)}catch(Z){if(he(j),Z!==Z+0)throw Z;be(1,0)}}function t$(f,g,_,y,T,P,D,j){var Z=me();try{bd(f,g,_,y,T,P,D,j)}catch(Y){if(he(Z),Y!==Y+0)throw Y;be(1,0)}}function r$(f,g,_,y,T){var P=me();try{return pd(f,g,_,y,T)}catch(D){if(he(P),D!==D+0)throw D;be(1,0)}}function n$(f,g,_){var y=me();try{return yd(f,g,_)}catch(T){if(he(y),T!==T+0)throw T;be(1,0)}}function i$(f,g,_,y,T,P,D,j){var Z=me();try{_d(f,g,_,y,T,P,D,j)}catch(Y){if(he(Z),Y!==Y+0)throw Y;be(1,0)}}function o$(f,g,_,y,T,P,D,j,Z,Y,pe,xe){var De=me();try{fd(f,g,_,y,T,P,D,j,Z,Y,pe,xe)}catch(Re){if(he(De),Re!==Re+0)throw Re;be(1,0)}}function a$(f,g,_){var y=me();try{return wd(f,g,_)}catch(T){if(he(y),T!==T+0)throw T;return be(1,0),0n}}function s$(f,g,_,y,T,P,D,j,Z){var Y=me();try{ad(f,g,_,y,T,P,D,j,Z)}catch(pe){if(he(Y),pe!==pe+0)throw pe;be(1,0)}}function u$(f){var g=me();try{return vd(f)}catch(_){if(he(g),_!==_+0)throw _;be(1,0)}}function l$(f,g){var _=me();try{return Bd(f,g)}catch(y){if(he(_),y!==y+0)throw y;return be(1,0),0n}}function d$(f,g,_,y){var T=me();try{return xd(f,g,_,y)}catch(P){if(he(T),P!==P+0)throw P;be(1,0)}}function p$(f){var g=me();try{return $d(f)}catch(_){if(he(g),_!==_+0)throw _;return be(1,0),0n}}function c$(f,g,_,y){var T=me();try{return Pd(f,g,_,y)}catch(P){if(he(T),P!==P+0)throw P;be(1,0)}}function h$(f,g,_,y,T){var P=me();try{return Ad(f,g,_,y,T)}catch(D){if(he(P),D!==D+0)throw D;be(1,0)}}function f$(f,g,_,y,T,P){var D=me();try{return kd(f,g,_,y,T,P)}catch(j){if(he(D),j!==j+0)throw j;be(1,0)}}function m$(f,g,_,y,T,P){var D=me();try{return md(f,g,_,y,T,P)}catch(j){if(he(D),j!==j+0)throw j;be(1,0)}}function g$(f,g,_,y,T,P){var D=me();try{return Dd(f,g,_,y,T,P)}catch(j){if(he(D),j!==j+0)throw j;be(1,0)}}function b$(f,g,_,y,T,P,D,j){var Z=me();try{return gd(f,g,_,y,T,P,D,j)}catch(Y){if(he(Z),Y!==Y+0)throw Y;be(1,0)}}function y$(f,g,_,y,T){var P=me();try{return Nd(f,g,_,y,T)}catch(D){if(he(P),D!==D+0)throw D;return be(1,0),0n}}function _$(f,g,_,y){var T=me();try{return Cd(f,g,_,y)}catch(P){if(he(T),P!==P+0)throw P;be(1,0)}}function w$(f,g,_,y){var T=me();try{return zd(f,g,_,y)}catch(P){if(he(T),P!==P+0)throw P;be(1,0)}}function v$(f,g,_,y,T,P,D,j,Z,Y,pe,xe){var De=me();try{return Rd(f,g,_,y,T,P,D,j,Z,Y,pe,xe)}catch(Re){if(he(De),Re!==Re+0)throw Re;be(1,0)}}function x$(f,g,_,y,T,P,D,j,Z,Y,pe){var xe=me();try{Od(f,g,_,y,T,P,D,j,Z,Y,pe)}catch(De){if(he(xe),De!==De+0)throw De;be(1,0)}}function $$(f,g,_,y,T,P,D,j,Z,Y,pe,xe,De,Re,Qt,Oo){var O$=me();try{Ed(f,g,_,y,T,P,D,j,Z,Y,pe,xe,De,Re,Qt,Oo)}catch(Eo){if(he(O$),Eo!==Eo+0)throw Eo;be(1,0)}}function T$(f,g,_){var y=me();try{return Td(f,g,_)}catch(T){if(he(y),T!==T+0)throw T;be(1,0)}}function I$(f,g,_){var y=me();try{return Id(f,g,_)}catch(T){if(he(y),T!==T+0)throw T;be(1,0)}}function S$(f,g,_,y){var T=me();try{Sd(f,g,_,y)}catch(P){if(he(T),P!==P+0)throw P;be(1,0)}}function yi(){if(0<ot)nt=yi;else if(u)b==null||b(t),X();else{for(var f=rt;0<f.length;)f.shift()(t);0<ot?nt=yi:(t.calledRun=!0,A||(X(),b==null||b(t)))}}return u||(Lt=await Pe(),yi()),t.PTR_SIZE=4,V?t:new Promise((f,g)=>{b=f,x=g})}var tw,dh,iS=N(()=>{"use strict";var e,t;tw=lh,dh=(t=(e=globalThis.self)==null?void 0:e.name)==null?void 0:t.startsWith("em-pthread"),dh&&lh()}),da,Js,ph,lt,rw,Ti,ch,hh,pa,fh,ca,nw,ha,iw,Tu=N(()=>{"use strict";$u(),da=typeof location>"u"?void 0:location.origin,Js=import.meta.url>"file:"&&import.meta.url<"file;",ph=()=>{if(Js){let e=URL;return new URL(new e("ort.all.bundle.min.mjs",import.meta.url).href,da).href}return import.meta.url},lt=ph(),rw=()=>{if(lt&&!lt.startsWith("blob:"))return lt.substring(0,lt.lastIndexOf("/")+1)},Ti=(e,t)=>{try{let n=t??lt;return(n?new URL(e,n):new URL(e)).origin===da}catch{return!1}},ch=(e,t)=>{let n=t??lt;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},hh=(e,t)=>`${t??"./"}${e}`,pa=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},fh=async e=>(await import(e)).default,ca=(nS(),ln(Y_)).default,nw=async()=>{if(!lt)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Ti(lt))return[void 0,ca()];let e=await pa(lt);return[e,ca(e)]},ha=(iS(),ln(ew)).default,iw=async(e,t,n,s)=>{let u=ha&&!(e||t);if(u)if(lt)u=Ti(lt)||s&&!n;else if(s&&!n)u=!0;else throw new Error("cannot determine the script source URL.");if(u)return[void 0,ha];{let l="ort-wasm-simd-threaded.jsep.mjs",d=e??ch(l,t),p=n&&d&&!Ti(d,t),o=p?await pa(d):d??hh(l,t);return[p?o:void 0,await fh(o)]}}}),fa,Ii,Pn,ma,mh,gh,bh,Iu,Ce,Jr=N(()=>{"use strict";Tu(),Ii=!1,Pn=!1,ma=!1,mh=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},gh=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},bh=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Iu=async e=>{if(Ii)return Promise.resolve();if(Pn)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(ma)throw new Error("previous call to 'initializeWebAssembly()' failed.");Pn=!0;let t=e.initTimeout,n=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!bh())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!gh())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let s=mh();n>1&&!s&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=n=1);let u=e.wasmPaths,l=typeof u=="string"?u:void 0,d=u==null?void 0:u.mjs,p=(d==null?void 0:d.href)??d,o=u==null?void 0:u.wasm,r=(o==null?void 0:o.href)??o,i=e.wasmBinary,[a,c]=await iw(p,l,n>1,!!i||!!r),h=!1,m=[];if(t>0&&m.push(new Promise(b=>{setTimeout(()=>{h=!0,b()},t)})),m.push(new Promise((b,x)=>{let v={numThreads:n};if(i)v.wasmBinary=i,v.locateFile=w=>w;else if(r||l)v.locateFile=w=>r??l+w;else if(p&&p.indexOf("blob:")!==0)v.locateFile=w=>new URL(w,p).href;else if(a){let w=rw();w&&(v.locateFile=S=>w+S)}c(v).then(w=>{Pn=!1,Ii=!0,fa=w,b(),a&&URL.revokeObjectURL(a)},w=>{Pn=!1,ma=!0,x(w)})})),await Promise.race(m),h)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Ce=()=>{if(Ii&&fa)return fa;throw new Error("WebAssembly is not initialized yet.")}}),Et,Gi,Ee,Su=N(()=>{"use strict";Jr(),Et=(e,t)=>{let n=Ce(),s=n.lengthBytesUTF8(e)+1,u=n._malloc(s);return n.stringToUTF8(e,u,s),t.push(u),u},Gi=(e,t,n,s)=>{if(typeof e=="object"&&e!==null){if(n.has(e))throw new Error("Circular reference in options");n.add(e)}Object.entries(e).forEach(([u,l])=>{let d=t?t+u:u;if(typeof l=="object")Gi(l,d+".",n,s);else if(typeof l=="string"||typeof l=="number")s(d,l.toString());else if(typeof l=="boolean")s(d,l?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof l}`)})},Ee=e=>{let t=Ce(),n=t.stackSave();try{let s=t.PTR_SIZE,u=t.stackAlloc(2*s);t._OrtGetLastError(u,u+s);let l=Number(t.getValue(u,s===4?"i32":"i64")),d=t.getValue(u+s,"*"),p=d?t.UTF8ToString(d):"";throw new Error(`${e} ERROR_CODE: ${l}, ERROR_MESSAGE: ${p}`)}finally{t.stackRestore(n)}}}),ow,oS=N(()=>{"use strict";Jr(),Su(),ow=e=>{let t=Ce(),n=0,s=[],u=e||{};try{if((e==null?void 0:e.logSeverityLevel)===void 0)u.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if((e==null?void 0:e.logVerbosityLevel)===void 0)u.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);(e==null?void 0:e.terminate)===void 0&&(u.terminate=!1);let l=0;return(e==null?void 0:e.tag)!==void 0&&(l=Et(e.tag,s)),n=t._OrtCreateRunOptions(u.logSeverityLevel,u.logVerbosityLevel,!!u.terminate,l),n===0&&Ee("Can't create run options."),(e==null?void 0:e.extra)!==void 0&&Gi(e.extra,"",new WeakSet,(d,p)=>{let o=Et(d,s),r=Et(p,s);t._OrtAddRunConfigEntry(n,o,r)!==0&&Ee(`Can't set a run config entry: ${d} - ${p}.`)}),[n,s]}catch(l){throw n!==0&&t._OrtReleaseRunOptions(n),s.forEach(d=>t._free(d)),l}}}),yh,_h,wh,vr,vh,aw,aS=N(()=>{"use strict";Jr(),Su(),yh=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},_h=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},wh=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(e.enableMemPattern=!1)},vr=(e,t,n,s)=>{let u=Et(t,s),l=Et(n,s);Ce()._OrtAddSessionConfigEntry(e,u,l)!==0&&Ee(`Can't set a session config entry: ${t} - ${n}.`)},vh=async(e,t,n)=>{let s=t.executionProviders;for(let u of s){let l=typeof u=="string"?u:u.name,d=[];switch(l){case"webnn":if(l="WEBNN",vr(e,"session.disable_quant_qdq","1",n),vr(e,"session.disable_qdq_constant_folding","1",n),typeof u!="string"){let a=u==null?void 0:u.deviceType;a&&vr(e,"deviceType",a,n)}break;case"webgpu":if(l="JS",typeof u!="string"){let a=u;if(a!=null&&a.preferredLayout){if(a.preferredLayout!=="NCHW"&&a.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);vr(e,"preferredLayout",a.preferredLayout,n)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${l}`)}let p=Et(l,n),o=d.length,r=0,i=0;if(o>0){r=Ce()._malloc(o*Ce().PTR_SIZE),n.push(r),i=Ce()._malloc(o*Ce().PTR_SIZE),n.push(i);for(let a=0;a<o;a++)Ce().setValue(r+a*Ce().PTR_SIZE,d[a][0],"*"),Ce().setValue(i+a*Ce().PTR_SIZE,d[a][1],"*")}await Ce()._OrtAppendExecutionProvider(e,p,r,i,o)!==0&&Ee(`Can't append execution provider: ${l}.`)}},aw=async e=>{let t=Ce(),n=0,s=[],u=e||{};wh(u);try{let l=yh(u.graphOptimizationLevel??"all"),d=_h(u.executionMode??"sequential"),p=typeof u.logId=="string"?Et(u.logId,s):0,o=u.logSeverityLevel??2;if(!Number.isInteger(o)||o<0||o>4)throw new Error(`log severity level is not valid: ${o}`);let r=u.logVerbosityLevel??0;if(!Number.isInteger(r)||r<0||r>4)throw new Error(`log verbosity level is not valid: ${r}`);let i=typeof u.optimizedModelFilePath=="string"?Et(u.optimizedModelFilePath,s):0;if(n=t._OrtCreateSessionOptions(l,!!u.enableCpuMemArena,!!u.enableMemPattern,d,!!u.enableProfiling,0,p,o,r,i),n===0&&Ee("Can't create session options."),u.executionProviders&&await vh(n,u,s),u.enableGraphCapture!==void 0){if(typeof u.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${u.enableGraphCapture}`);vr(n,"enableGraphCapture",u.enableGraphCapture.toString(),s)}if(u.freeDimensionOverrides)for(let[a,c]of Object.entries(u.freeDimensionOverrides)){if(typeof a!="string")throw new Error(`free dimension override name must be a string: ${a}`);if(typeof c!="number"||!Number.isInteger(c)||c<0)throw new Error(`free dimension override value must be a non-negative integer: ${c}`);let h=Et(a,s);t._OrtAddFreeDimensionOverride(n,h,c)!==0&&Ee(`Can't set a free dimension override: ${a} - ${c}.`)}return u.extra!==void 0&&Gi(u.extra,"",new WeakSet,(a,c)=>{vr(n,a,c,s)}),[n,s]}catch(l){throw n!==0&&t._OrtReleaseSessionOptions(n)!==0&&Ee("Can't release session options."),s.forEach(d=>t._free(d)),l}}}),Fr,Gt,Lr,oo,Hi,Ou,Eu,Ys,ae=N(()=>{"use strict";Fr=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Gt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Lr=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],s=typeof t=="number"?t:t.reduce((u,l)=>u*l,1);return n>0?Math.ceil(s*n):void 0},oo=e=>{switch(e){case"float16":return typeof Float16Array<"u"?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Hi=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Ou=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Eu=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ys=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Pu,sw=N(()=>{"use strict";$u(),Pu=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let n=t.headers.get("Content-Length"),s=n?parseInt(n,10):0;if(s<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let u=t.body.getReader(),l;try{l=new ArrayBuffer(s)}catch(p){if(p instanceof RangeError){let o=Math.ceil(s/65536);l=new WebAssembly.Memory({initial:o,maximum:o}).buffer}else throw p}let d=0;for(;;){let{done:p,value:o}=await u.read();if(p)break;let r=o.byteLength;new Uint8Array(l,d,r).set(o),d+=r}return new Uint8Array(l,0,s)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),xh,$h,Th,Ih,Au,Sh,we,Wt=N(()=>{"use strict";ae(),xh=["V","I","W","E","F"],$h=(e,t)=>{console.log(`[${xh[e]},${new Date().toISOString()}]${t}`)},Au=(e,t)=>{Th=e,Ih=t},Sh=(e,t)=>{let n=Hi(e),s=Hi(Th);n>=s&&$h(n,typeof t=="function"?t():t)},we=(...e)=>{Ih&&Sh(...e)}}),Oh,pn,R,Wi,uw,lw,dw,ue=N(()=>{"use strict";Oh=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},pn=class{static calcShape(e,t,n=!1){let s=e.length,u=t.length;if(s===0)return t;if(u===0)return e;let l=Math.max(e.length,t.length),d=new Array(l);if(n){if(s<2||u<2)return;let p=Oh.calcMatMulShape([e[s-2],e[s-1]],[t[u-2],t[u-1]]);if(p===void 0)return;[d[l-2],d[l-1]]=p}for(let p=n?3:1;p<=l;p++){let o=s-p<0?1:e[s-p],r=u-p<0?1:t[u-p];if(o!==r&&o>1&&r>1)return;let i=Math.max(o,r);if(o&&r)d[l-p]=Math.max(o,r);else{if(i>1)return;d[l-p]=0}}return d}static isValidBroadcast(e,t){let n=e.length,s=t.length;if(n>s)return!1;for(let u=1;u<=n;u++)if(e[n-u]!==1&&e[n-u]!==t[s-u])return!1;return!0}},R=class ji{static size(t){return ji.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,n=4){let s=t.length;if(s===0)return[];let u=new Array(s),l=s-1;for(;l>=0;){if(t[l]%n===0){u[l]=t[l]/n;break}if(n%t[l]!==0)throw new Error("cannot convert shape");u[l]=1,n/=t[l],l--}for(l--;l>=0;l--)u[l]=t[l];return u}static sizeFromDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return ji.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return ji.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(t,n,s){let u=1;for(let l=n;l<s;l++){if(t[l]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");u*=Number(t[l])}return u}static computeStrides(t){let n=t.length;if(n===0)return[];if(n===1)return[1];let s=new Array(n);s[n-1]=1,s[n-2]=t[n-1];for(let u=n-3;u>=0;--u)s[u]=s[u+1]*t[u+1];return s}static normalizeAxis(t,n){if(t<-n&&t>=n)throw new Error("unsupported axis for this operation.");return t<0?t+n:t}static normalizeAxes(t,n){return t.map(s=>this.normalizeAxis(s,n??t.length))}static sortBasedOnPerm(t,n){return n?n.map(s=>t[s]):t.slice().reverse()}static padShape(t,n){let s=t.length;return t.map((u,l)=>u+n[l]+n[l+s])}static areEqual(t,n){return t.length!==n.length?!1:t.every((s,u)=>s===n[u])}},Wi=class pr{static adjustPoolAttributes(t,n,s,u,l,d){if(!t&&s.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let p=0;p<n.length-2;p++)p>=s.length?s.push(n[p+2]):s[p]=n[p+2];for(let p=0;p<s.length;p++)if(p<u.length){if(u[p]<0)throw new Error("strides should be greater than or equal to 1")}else u.push(1);for(let p=0;p<s.length;p++)if(p<l.length){if(l[p]<0)throw new Error("dilations should be greater than or equal to 1")}else l.push(1);for(let p=0;p<s.length*2;p++)if(p<d.length){if(d[p]<0)throw new Error("pad should be greater than or equal to 1")}else d.push(0);for(let p=0;p<s.length;p++){if(s[p]<=0)throw new Error("kernel shapes need to be greater than 0");if(d[p]>=s[p]||d[p+s.length]>=s[p])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,s,u,l,d,p){if(p){if(l.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(u.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let o=0;o<t.length-2;o++)pr.adjustPadAndReturnShape(t[o+(d?1:2)],n[o],s[o],u[o],l,o,o+t.length-2,p)}}static computePoolOutputShape(t,n,s,u,l,d,p,o=0){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let r=[n[0],n[1]];return pr.computeShapeHelper(t,n,r,s,u,l,d,p,o),r}static computeConvOutputShape(t,n,s,u,l,d,p){if(t.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let o=[t[0],n[0]];return pr.computeShapeHelper(!1,t,o,s,u,l,d,p),o}static computeShapeHelper(t,n,s,u,l,d,p,o,r=0){if(t)for(let i=0;i<n.length-2;i++)s.push(1);else for(let i=0;i<n.length-2;i++)s.push(pr.adjustPadAndReturnShape(n[i+2],u[i],l[i],d[i],p,i,i+n.length-2,o,r))}static computeOutputSize(t,n,s,u,l){let d=Math.floor(t/n)+1;return l===1&&(d=Math.ceil(t/n)+1,(d-1)*n>=s+u&&(d-=1)),d}static adjustPadAndReturnShape(t,n,s,u,l,d,p,o,r=0){let i=s*(u-1)+1;if(o&&o!=="NOTSET")switch(o){case"VALID":return l[d]=0,l[p]=0,pr.computeOutputSize(t-i,n,t,0,r);case"SAME_LOWER":case"SAME_UPPER":if(s!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let a=(Math.floor((t+n-1)/n)-1)*n+u-t;return l[d]=Math.floor(o==="SAME_LOWER"?(a+1)/2:a/2),l[p]=a-l[d],pr.computeOutputSize(t+l[d]+l[p]-i,n,t,l[d],r)}default:throw new Error("Unsupported AutoPad type")}else return pr.computeOutputSize(t+l[d]+l[p]-i,n,t,l[d],r)}},uw=class{static getShapeOfGemmResult(e,t,n,s,u){if(e.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let l,d,p;t?(l=e[1],d=e[0]):(l=e[0],d=e[1]);let o=-1;if(s?(p=n[0],o=1):(p=n[1],o=0),n[o]!==d)throw new Error("dimension mismatch");if(l<=0||p<=0||d<=0)throw new Error("invalid shape specified");if(u&&!pn.isValidBroadcast(u,[l,p]))throw new Error("gemm: invalid bias shape for broadcast");return[l,p,d]}},lw=-34028234663852886e22,dw=34028234663852886e22}),ku,pw=N(()=>{"use strict";ae(),ku=(e,t)=>new(oo(t))(e)}),ga,Eh,ba,Ph,ya,Ah,_a,wa,va,kh,cw,sS=N(()=>{"use strict";ae(),Wt(),ga=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Eh=(e,t)=>{if(t==="int32")return e;let n=ga.get(t);if(!n)throw new Error(`WebNN backend does not support data type: ${t}`);let s=n/8;if(e.byteLength%s!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${s}.`);let u=e.byteLength/s,l=new(oo(t))(e.buffer,e.byteOffset,u);switch(t){case"int64":case"uint64":{let d=new Int32Array(u);for(let p=0;p<u;p++){let o=l[p];if(o>2147483647n||o<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");d[p]=Number(o)}return new Uint8Array(d.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&l.some(p=>p>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let d=Int32Array.from(l,Number);return new Uint8Array(d.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},ba=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let n=e.byteLength/4,s=new Int32Array(e.buffer,e.byteOffset,n);switch(t){case"int64":{let u=BigInt64Array.from(s,BigInt);return new Uint8Array(u.buffer)}case"uint64":{if(s.some(l=>l<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let u=BigUint64Array.from(s,BigInt);return new Uint8Array(u.buffer)}case"int8":{if(s.some(l=>l<-128||l>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let u=Int8Array.from(s,Number);return new Uint8Array(u.buffer)}case"uint8":{if(s.some(u=>u<0||u>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(s,Number)}case"uint32":{if(s.some(l=>l<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let u=Uint32Array.from(s,Number);return new Uint8Array(u.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Ph=1,ya=()=>Ph++,Ah=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),_a=(e,t)=>{let n=ga.get(e);if(!n)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((s,u)=>s*u)*n/8):0},wa=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:n,tensor:s,dataType:u,shape:l,fallbackDataType:d}=e;this.sessionId=t,this.mlContext=n,this.mlTensor=s,this.dataType=u,this.tensorShape=l,this.fallbackDataType=d}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return _a(this.dataType,this.tensorShape)}destroy(){we("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),n=ba(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(n);return}else return new Uint8Array(n).buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,n){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===n.length&&this.tensorShape.every((s,u)=>s===n[u])}setIsDataConverted(e){this.isDataConverted=e}},va=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,n,s){let u=this.tensorManager.getMLContext(e),l=this.tensorManager.getMLOpSupportLimits(e),d;if(!(l!=null&&l.input.dataTypes.includes(t))){if(d=Ah.get(t),!d||!(l!=null&&l.input.dataTypes.includes(d)))throw new Error(`WebNN backend does not support data type: ${t}`);we("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${d}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(u,t,n))return this.wrapper.tensor;if(s){if(this.wrapper.byteLength!==_a(t,n))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let p=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,n,p,!0,!0,d),s&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=Eh(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else we("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){var t,n;if(this.activeUpload){let s=(t=this.wrapper)!=null&&t.isDataConverted?ba(this.activeUpload,(n=this.wrapper)==null?void 0:n.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(s):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(s);return}else return s.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},kh=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=ya();return this.tensorTrackersById.set(e,new va(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,n,s,u){we("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${n}, shape: ${s}, copyOld: ${u}}`);let l=this.tensorTrackersById.get(t);if(!l)throw new Error("Tensor not found.");return l.ensureTensor(e,n,s,u)}upload(e,t){let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");n.upload(t)}async download(e,t){we("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t==null?void 0:t.byteLength}}`);let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");return n.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,n,s){let u=this.getMLContext(e),l=ya(),d=new wa({sessionId:e,context:u,tensor:t,dataType:n,shape:s});return this.tensorTrackersById.set(l,new va(this,d)),this.externalTensors.add(d),l}async getCachedTensor(e,t,n,s,u,l,d){let p=this.getMLContext(e);for(let[r,i]of this.freeTensors.entries())if(i.canReuseTensor(p,t,n)){we("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${d?`fallbackDataType: ${d},`:""} shape: ${n}`);let a=this.freeTensors.splice(r,1)[0];return a.sessionId=e,a}we("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${d?`fallbackDataType: ${d},`:""} shape: ${n}}`);let o=await p.createTensor({dataType:d??t,shape:n,dimensions:n,usage:s,writable:u,readable:l});return new wa({sessionId:e,context:p,tensor:o,dataType:t,shape:n,fallbackDataType:d})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},cw=(...e)=>new kh(...e)}),An,Dh,hw,uS=N(()=>{"use strict";ae(),Jr(),pw(),sS(),Wt(),An=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Dh=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let n=Object.keys(e).sort(),s=Object.keys(t).sort();return n.length===s.length&&n.every((u,l)=>u===s[l]&&e[u]===t[u])},hw=class{constructor(e){this.tensorManager=cw(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,Au(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){we("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){we("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let n of t)we("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${n}}`),this.tensorManager.releaseTensorId(n);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let n=this.mlContextCache.findIndex(s=>s.gpuDevice===e);if(n!==-1)return this.mlContextCache[n].mlContext;{let s=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:s}),s}}else if(e===void 0){let n=this.mlContextCache.findIndex(s=>s.options===void 0&&s.gpuDevice===void 0);if(n!==-1)return this.mlContextCache[n].mlContext;{let s=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:s}),s}}let t=this.mlContextCache.findIndex(n=>Dh(n.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let n=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:n}),n}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let n=this.sessionIdsByMLContext.get(t);n||(n=new Set,this.sessionIdsByMLContext.set(t,n)),n.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let n=this.sessionIdsByMLContext.get(t);if(n.delete(e),n.size===0){this.sessionIdsByMLContext.delete(t);let s=this.mlContextCache.findIndex(u=>u.mlContext===t);s!==-1&&this.mlContextCache.splice(s,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){we("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,n,s,u){let l=An.get(n);if(!l)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,l,s,u)}async createTemporaryTensor(e,t,n){we("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${n}}`);let s=An.get(t);if(!s)throw new Error(`Unsupported ONNX data type: ${t}`);let u=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,u,s,n,!1);let l=this.temporarySessionTensorIds.get(e);return l?l.push(u):this.temporarySessionTensorIds.set(e,[u]),u}uploadTensor(e,t){if(!Ce().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");we("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let n=await this.tensorManager.download(e);return ku(n,t)}}registerMLTensor(e,t,n,s){let u=An.get(n);if(!u)throw new Error(`Unsupported ONNX data type: ${n}`);let l=this.tensorManager.registerTensor(e,t,u,s);return we("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${u}, dimensions: ${s}} -> {tensorId: ${l}}`),l}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let n=this.sessionGraphInputs.get(e);return n?n.includes(t):!1}isGraphOutput(e,t){let n=this.sessionGraphOutputs.get(e);return n?n.includes(t):!1}isGraphInputOutputTypeSupported(e,t,n=!0){let s=An.get(Fr(t)),u=this.mlOpSupportLimitsBySessionId.get(e);return typeof s>"u"?!1:n?!!(u!=null&&u.input.dataTypes.includes(s)):!!(u!=null&&u.output.dataTypes.includes(s))}flush(){}}}),Du=N(()=>{"use strict"}),xa,Si,Oi,Nh,Ch,$a,Qs,zh,fw,lS=N(()=>{"use strict";Wt(),Du(),xa=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Si=[],Oi=e=>Math.ceil(Number(e)/16)*16,Nh=e=>{for(let t=0;t<Si.length;t++){let n=Si[t];if(e<=n)return n}return Math.ceil(e/16)*16},Ch=1,$a=()=>Ch++,Qs=async(e,t,n,s)=>{let u=Oi(n),l=e.device.createBuffer({size:u,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let d=e.getCommandEncoder();e.endComputePass(),d.copyBufferToBuffer(t,0,l,0,u),e.flush(),await l.mapAsync(GPUMapMode.READ);let p=l.getMappedRange();if(s){let o=s();return o.set(new Uint8Array(p,0,n)),o}else return new Uint8Array(p.slice(0,n))}finally{l.destroy()}},zh=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of xa)Si.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let n=t.buffer,s=t.byteOffset,u=t.byteLength,l=Oi(u),d=this.storageCache.get(e);if(!d)throw new Error("gpu data for uploading does not exist");if(Number(d.originalSize)!==u)throw new Error(`inconsistent data size. gpu data size=${d.originalSize}, data size=${u}`);if(l===u&&s%4===0)this.backend.device.queue.writeBuffer(d.gpuData.buffer,0,n,s,u);else{let p=new Uint8Array(l);p.set(t),this.backend.device.queue.writeBuffer(d.gpuData.buffer,0,p,0,l)}we("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let n=this.storageCache.get(e);if(!n)throw new Error("source gpu data for memcpy does not exist");let s=this.storageCache.get(t);if(!s)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==s.originalSize)throw new Error("inconsistent source and destination gpu data size");let u=Oi(n.originalSize),l=this.backend.getCommandEncoder();this.backend.endComputePass(),l.copyBufferToBuffer(n.gpuData.buffer,0,s.gpuData.buffer,0,u)}registerExternalBuffer(e,t,n){let s;if(n){if(s=n[0],e===n[1])return we("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${s}, buffer is the same, skip.`),s;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else s=$a();return this.storageCache.set(s,{gpuData:{id:s,type:0,buffer:e},originalSize:t}),we("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${s}, registered.`),s}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),we("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=Nh(e),s,u=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,l=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(u||l){let p=(u?this.freeBuffers:this.freeUniformBuffers).get(n);p?p.length>0?s=p.pop():s=this.backend.device.createBuffer({size:n,usage:t}):s=this.backend.device.createBuffer({size:n,usage:t})}else s=this.backend.device.createBuffer({size:n,usage:t});let d={id:$a(),type:0,buffer:s};return this.storageCache.set(d.id,{gpuData:d,originalSize:Number(e)}),we("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${d.id}`),d}get(e){var t;return(t=this.storageCache.get(e))==null?void 0:t.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,n=this.storageCache.get(t);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return we("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(e,t){let n=this.storageCache.get(Number(e));if(!n)throw new Error("data does not exist");await Qs(this.backend,n.gpuData.buffer,n.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=xa.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(we("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},fw=(...e)=>new zh(...e)}),Rh,Ie,Fe=N(()=>{"use strict";Rh=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},Ie=e=>new Rh(e)}),cn,Ei,We,He,ne,je,eu,un,hr,te,kn,F,ee,mw,Nu,Bh,gw,le=N(()=>{"use strict";ae(),ue(),cn=64,Ei=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},We=(e,t=1)=>{let n=Ei(e,t);return typeof n=="string"?n:n[0]},He=(e,t=1)=>{let n=Ei(e,t);return typeof n=="string"?n:n[1]},ne=(...e)=>{let t=[];return e.forEach(n=>{n.length!==0&&t.push({type:12,data:n},{type:12,data:R.computeStrides(n)})}),t},je=e=>e%4===0?4:e%2===0?2:1,eu=(e="f32",t,n="0")=>!t||t===1?`${e}(${n})`:`vec${t}<${e}>(${n})`,un=(e,t,n)=>e==="f32"?n:t===1?`f32(${n})`:`vec${t}<f32>(${n})`,hr=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,te=(e,t,n,s)=>e.startsWith("uniforms.")&&n>4?typeof t=="string"?s==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:s==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,kn=(e,t,n,s,u)=>{let l=typeof n=="number",d=l?n:n.length,p=[...new Array(d).keys()],o=d<2?"u32":d<=4?`vec${d}<u32>`:`array<u32, ${d}>`,r=Ei(t,u),i=typeof r=="string"?r:r[1],a=typeof r=="string"?r:r[0],c={indices:o,value:i,storage:a,tensor:t},h=V=>typeof V=="string"?V:`${V}u`,m={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},b=l?"uniforms.":"",x=`${b}${e}_shape`,v=`${b}${e}_strides`,w="";for(let V=0;V<d-1;V++)w+=`
    let dim${V} = current / ${te(v,V,d)};
    let rest${V} = current % ${te(v,V,d)};
    indices[${V}] = dim${V};
    current = rest${V};
    `;w+=`indices[${d-1}] = current;`;let S=d<2?"":`
  fn o2i_${e}(offset: u32) -> ${c.indices} {
    var indices: ${c.indices};
    var current = offset;
    ${w}
    return indices;
  }`,O=V=>(m.offsetToIndices=!0,d<2?V:`o2i_${e}(${V})`),E=[];if(d>=2)for(let V=d-1;V>=0;V--)E.push(`${te(v,V,d)} * (indices[${V}])`);let A=d<2?"":`
  fn i2o_${e}(indices: ${c.indices}) -> u32 {
    return ${E.join("+")};
  }`,k=V=>(m.indicesToOffset=!0,d<2?V:`i2o_${e}(${V})`),I=(...V)=>d===0?"0u":`${c.indices}(${V.map(h).join(",")})`,M=(V,W)=>d<2?`${V}`:`${te(V,W,d)}`,q=(V,W,X)=>d<2?`${V}=${X};`:`${te(V,W,d)}=${X};`,J={},K=(V,W)=>{m.broadcastedIndicesToOffset=!0;let X=`${W.name}broadcastedIndicesTo${e}Offset`;if(X in J)return`${X}(${V})`;let L=[];for(let de=d-1;de>=0;de--){let Pe=W.indicesGet("outputIndices",de+W.rank-d);L.push(`${M(v,de)} * (${Pe} % ${M(x,de)})`)}return J[X]=`fn ${X}(outputIndices: ${W.type.indices}) -> u32 {
             return ${L.length>0?L.join("+"):"0u"};
           }`,`${X}(${V})`},C=(V,W)=>(()=>{if(c.storage===c.value)return`${e}[${V}]=${W};`;if(c.storage==="vec2<u32>"&&c.value==="i32")return`${e}[${V}]=vec2<u32>(u32(${W}), select(0u, 0xFFFFFFFFu, ${W} < 0));`;if(c.storage==="vec2<u32>"&&c.value==="u32")return`${e}[${V}]=vec2<u32>(u32(${W}), 0u);`;if(c.storage==="u32"&&c.value==="vec4<bool>")return`${e}[${V}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${W}));`;throw new Error(`not supported combination of storage type ${c.storage} and value type ${c.value} yet`)})(),B=V=>(()=>{if(c.storage===c.value)return`${e}[${V}]`;if(c.storage==="vec2<u32>"&&c.value==="i32")return`i32(${e}[${V}].x)`;if(c.storage==="vec2<u32>"&&c.value==="u32")return`u32(${e}[${V}].x)`;if(c.storage==="u32"&&c.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${V}] & 0xFFu), bool(${e}[${V}] & 0xFF00u), bool(${e}[${V}] & 0xFF0000u), bool(${e}[${V}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${c.storage} and value type ${c.value} yet`)})(),$=d<2?"":`
  fn get_${e}ByIndices(indices: ${c.indices}) -> ${i} {
    return ${B(`i2o_${e}(indices)`)};
  }`,z=d<2?"":(()=>{let V=p.map(X=>`d${X}: u32`).join(", "),W=p.map(X=>`d${X}`).join(", ");return`
  fn get_${e}(${V}) -> ${i} {
    return get_${e}ByIndices(${I(W)});
  }`})(),G=(...V)=>{if(V.length!==d)throw new Error(`indices length must be ${d}`);let W=V.map(h).join(",");return d===0?B("0u"):d===1?B(W[0]):(m.get=!0,m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}(${W})`)},oe=V=>d<2?B(V):(m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}ByIndices(${V})`),U=d<2?"":`
  fn set_${e}ByIndices(indices: ${c.indices}, value: ${i}) {
    ${C(`i2o_${e}(indices)`,"value")}
  }`,ie=d<2?"":(()=>{let V=p.map(X=>`d${X}: u32`).join(", "),W=p.map(X=>`d${X}`).join(", ");return`
  fn set_${e}(${V}, value: ${i}) {
    set_${e}ByIndices(${I(W)}, value);
  }`})();return{impl:()=>{let V=[],W=!1;return m.offsetToIndices&&(V.push(S),W=!0),m.indicesToOffset&&(V.push(A),W=!0),m.broadcastedIndicesToOffset&&(Object.values(J).forEach(X=>V.push(X)),W=!0),m.set&&(V.push(ie),W=!0),m.setByIndices&&(V.push(U),W=!0),m.get&&(V.push(z),W=!0),m.getByIndices&&(V.push($),W=!0),!l&&W&&V.unshift(`const ${x} = ${c.indices}(${n.join(",")});`,`const ${v} = ${c.indices}(${R.computeStrides(n).join(",")});`),V.join(`
`)},type:c,offsetToIndices:O,indicesToOffset:k,broadcastedIndicesToOffset:K,indices:I,indicesGet:M,indicesSet:q,set:(...V)=>{if(V.length!==d+1)throw new Error(`indices length must be ${d}`);let W=V[d];if(typeof W!="string")throw new Error("value must be string");let X=V.slice(0,d).map(h).join(",");return d===0?C("0u",W):d===1?C(X[0],W):(m.set=!0,m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}(${X}, ${W})`)},setByOffset:C,setByIndices:(V,W)=>d<2?C(V,W):(m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}ByIndices(${V}, ${W});`),get:G,getByOffset:B,getByIndices:oe,usage:s,name:e,strides:v,shape:x,rank:d}},F=(e,t,n,s=1)=>kn(e,t,n,"input",s),ee=(e,t,n,s=1)=>kn(e,t,n,"output",s),mw=(e,t,n)=>kn(e,t,n,"atomicOutput",1),Nu=(e,t,n,s=1)=>kn(e,t,n,"internal",s),Bh=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=cn){let t=typeof e=="number"?e:e[0],n=typeof e=="number"?1:e[1],s=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||s>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${n}, ${s}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*n*s>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${n}, ${s}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let u=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,l=u?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,d=u?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*n*s}u + local_idx;`;return`@compute @workgroup_size(${t}, ${n}, ${s})
  fn main(${l}) {
    ${d}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let n=e.usage==="input"?"read":"read_write",s=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${n}> ${e.name}: array<${s}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,n=1){return this.uniforms.push({name:e,type:t,length:n}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:n,length:s}of this.uniforms)if(s&&s>4)n==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${n}>, ${Math.ceil(s/8)}>`):e.push(`${t}:array<vec4<${n}>, ${Math.ceil(s/4)}>`);else{let u=s==null||s===1?n:`vec${s}<${n}>`;e.push(`${t}:${u}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},gw=(e,t)=>new Bh(e,t)}),Mh,Ta,jh,Fh,Lh,Vh,ht,bw,yw,mr=N(()=>{"use strict";ae(),ue(),Fe(),le(),Mh=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Ta=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),jh=(e,t)=>R.sortBasedOnPerm(e,Ta(e.length,t)),Fh=(e,t,n,s)=>{let u=`fn perm(i: ${s.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let l=0;l<t;++l)u+=`a[${e[l]}]=i[${l}];`;return u+="return a;}"},Lh=(e,t)=>{let n=[],s=[];for(let u=0;u<e.length;++u)e[u]!==1&&n.push(e[u]),e[t[u]]!==1&&s.push(t[u]);return{newShape:n,newPerm:s}},Vh=(e,t)=>{let n=0;for(let s=0;s<e.length;++s)if(t[e[s]]!==1){if(e[s]<n)return!1;n=e[s]}return!0},ht=(e,t)=>{let n=e.dataType,s=e.dims.length,u=Ta(s,t),l=jh(e.dims,u),d=e.dims,p=l,o=s<2||Vh(u,e.dims),r;if(o)return r=m=>{let b=F("input",n,d,4),x=ee("output",n,p,4);return`
  ${m.registerUniform("output_size","u32").declareVariables(b,x)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let m=R.size(l);return{outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64/4)},programUniforms:[{type:12,data:Math.ceil(m/4)}]}},getShaderSource:r};let{newShape:i,newPerm:a}=Lh(e.dims,u),c=R.areEqual(a,[2,3,1]),h=R.areEqual(a,[3,1,2]);if(i.length===2||c||h){d=c?[i[0],i[1]*i[2]]:h?[i[0]*i[1],i[2]]:i,p=[d[1],d[0]];let m=16;return r=b=>{let x=F("a",n,d.length),v=ee("output",n,p.length);return`
  ${b.registerUniform("output_size","u32").declareVariables(x,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${m+1}>, ${m}>;
  ${b.mainStart([m,m,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${m} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${m}u + local_id.x;
    let input_row = workgroup_id_x * ${m}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${x.getByIndices(`${x.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${m}u + local_id.x;
    let output_row = workgroup_id_y * ${m}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let b=R.size(l);return{outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(p[1]/m),y:Math.ceil(p[0]/m)},programUniforms:[{type:12,data:b},...ne(d,p)]}},getShaderSource:r}}return r=m=>{let b=F("a",n,d.length),x=ee("output",n,p.length);return`
  ${m.registerUniform("output_size","u32").declareVariables(b,x)}

  ${Fh(u,s,b,x)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${x.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${x.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let m=R.size(l);return{outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...ne(d,p)]}},getShaderSource:r}},bw=(e,t)=>{Mh(e.inputs,t.perm),e.compute(ht(e.inputs[0],t.perm))},yw=e=>Ie({perm:e.perm})}),Uh,qh,Gh,Hh,Wh,Kh,Xh,Zh,Jh,Yh,xt,_w,ww,vw,xw,$w,Tw,Iw,Sw,Ow,Ew,dS=N(()=>{"use strict";ae(),ue(),le(),Cu(),mr(),Uh={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},qh={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Gh={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Hh={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Wh=(e,t)=>{let n=[];for(let s=t-e;s<t;++s)n.push(s);return n},Kh=(e,t)=>{let n=[],s=e.length;for(let l=0;l<s;l++)t.indexOf(l)===-1&&n.push(e[l]);let u=t.map(l=>e[l]);return[n,u]},Xh=(e,t)=>{let n=e.length+t.length,s=[],u=0;for(let l=0;l<n;l++)t.indexOf(l)===-1?s.push(e[u++]):s.push(1);return s},Zh=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},Jh=(e,t)=>{let n=[];if(!Zh(e,t)){for(let s=0;s<t;++s)e.indexOf(s)===-1&&n.push(s);e.forEach(s=>n.push(s))}return n},Yh=(e,t,n,s,u,l,d)=>{let p=n[0].dims,o=R.size(l),r=R.size(d),i=F("_A",n[0].dataType,p),a=ee("output",u,l),c=64;o===1&&(c=256);let h=`
          var<workgroup> aBestValues : array<f32, ${c}>;
       `,m=b=>`
        ${b.registerUniform("reduceSize","u32").declareVariables(i,a)}
        ${h}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${b.mainStart(c)}

          let outputIndex = global_idx / ${c};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Gh[s]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${c}) {
           let candidate = f32(${i.getByOffset("offset + k")});
           bestValue = ${Uh[s]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${c}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${qh[s]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${a.setByOffset("outputIndex",`${s==="mean"?`${a.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${a.type.storage}(${Hh[s]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${c}`,inputDependencies:["type"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:l,dataType:u}],dispatchGroup:{x:o},programUniforms:[{type:12,data:r}]})}},xt=(e,t,n,s)=>{let u=e.inputs.length===1?n:tu(e.inputs,n),l=u.axes;l.length===0&&!u.noopWithEmptyAxes&&(l=e.inputs[0].dims.map((h,m)=>m));let d=R.normalizeAxes(l,e.inputs[0].dims.length),p=d,o=e.inputs[0],r=Jh(p,e.inputs[0].dims.length);r.length>0&&(o=e.compute(ht(e.inputs[0],r),{inputs:[0],outputs:[-1]})[0],p=Wh(p.length,o.dims.length));let[i,a]=Kh(o.dims,p),c=i;u.keepDims&&(c=Xh(i,d)),e.compute(Yh(t,u.cacheKey,[o],s,e.inputs[0].dataType,c,a),{inputs:[o]})},_w=(e,t)=>{xt(e,"ReduceMeanShared",t,"mean")},ww=(e,t)=>{xt(e,"ReduceL1Shared",t,"l1")},vw=(e,t)=>{xt(e,"ReduceL2Shared",t,"l2")},xw=(e,t)=>{xt(e,"ReduceLogSumExpShared",t,"logSumExp")},$w=(e,t)=>{xt(e,"ReduceMaxShared",t,"max")},Tw=(e,t)=>{xt(e,"ReduceMinShared",t,"min")},Iw=(e,t)=>{xt(e,"ReduceProdShared",t,"prod")},Sw=(e,t)=>{xt(e,"ReduceSumShared",t,"sum")},Ow=(e,t)=>{xt(e,"ReduceSumSquareShared",t,"sumSquare")},Ew=(e,t)=>{xt(e,"ReduceLogSumShared",t,"logSum")}}),$t,Qh,Ki,tu,Tt,ef,tf,rf,nf,of,af,sf,uf,lf,df,It,Pw,Aw,kw,Dw,Nw,Cw,zw,Rw,Bw,Mw,Cu=N(()=>{"use strict";ae(),ue(),Fe(),le(),dS(),$t=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Qh=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Ki=(e,t,n,s,u,l,d=!1,p=!1)=>{let o=[],r=n[0].dims,i=r.length,a=R.normalizeAxes(u,i),c=!p&&a.length===0;r.forEach((b,x)=>{c||a.indexOf(x)>=0?d&&o.push(1):o.push(b)});let h=o.length,m=R.size(o);return{name:e,shaderCache:t,getShaderSource:b=>{let x=[],v=F("_A",n[0].dataType,i),w=ee("output",l,h),S=s(v,w,a),O=S[2];for(let E=0,A=0;E<i;E++)c||a.indexOf(E)>=0?(d&&A++,O=`for(var j${E}: u32 = 0; j${E} < ${r[E]}; j${E}++) {
                  ${S[2].includes("last_index")?`let last_index = j${E};`:""}
                  ${v.indicesSet("input_indices",E,`j${E}`)}
                  ${O}
                }`):(x.push(`${v.indicesSet("input_indices",E,w.indicesGet("output_indices",A))};`),A++);return`

        ${b.registerUniform("output_size","u32").declareVariables(v,w)}

        ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${w.offsetToIndices("global_idx")};

          ${x.join(`
`)}
          ${S[0]}       // init ops for reduce max/min
          ${S[1]}
          ${O}
          ${S[3]}
          ${S.length===4?w.setByOffset("global_idx","value"):S.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:o,dataType:l}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...ne(r,o)]})}},tu=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(s=>n.push(Number(s))),Ie({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Tt=(e,t,n,s)=>{let u=e.inputs,l=u.length===1?n:tu(u,n);e.compute(Ki(t,{hint:l.cacheKey,inputDependencies:["rank"]},[u[0]],l.noopWithEmptyAxes&&l.axes.length===0?Qh:s,l.axes,u[0].dataType,l.keepDims,l.noopWithEmptyAxes),{inputs:[0]})},ef=(e,t)=>{$t(e.inputs),Tt(e,"ReduceLogSum",t,(n,s)=>[`var value = ${s.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},tf=(e,t)=>{$t(e.inputs),Tt(e,"ReduceL1",t,(n,s)=>[`var value = ${s.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},rf=(e,t)=>{$t(e.inputs),Tt(e,"ReduceL2",t,(n,s)=>[`var t = ${s.type.value}(0); var value = ${s.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},nf=(e,t)=>{$t(e.inputs),Tt(e,"ReduceLogSumExp",t,(n,s)=>[`var value = ${s.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},of=(e,t)=>{$t(e.inputs),Tt(e,"ReduceMax",t,(n,s,u)=>{let l=[];for(let d=0;d<n.rank;d++)(u.indexOf(d)>=0||u.length===0)&&l.push(n.indicesSet("input_indices",d,0));return[`${l.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},af=(e,t)=>{$t(e.inputs),Tt(e,"ReduceMean",t,(n,s,u)=>{let l=1;for(let d=0;d<n.rank;d++)(u.indexOf(d)>=0||u.length===0)&&(l*=e.inputs[0].dims[d]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${s.type.value}(sum / ${l});`]})},sf=(e,t)=>{$t(e.inputs),Tt(e,"ReduceMin",t,(n,s,u)=>{let l=[];for(let d=0;d<n.rank;d++)(u.indexOf(d)>=0||u.length===0)&&l.push(`input_indices[${d}] = 0;`);return[`${l.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},uf=(e,t)=>{$t(e.inputs),Tt(e,"ReduceProd",t,(n,s)=>[`var value = ${s.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},lf=(e,t)=>{$t(e.inputs),Tt(e,"ReduceSum",t,(n,s)=>[`var value = ${s.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},df=(e,t)=>{$t(e.inputs),Tt(e,"ReduceSumSquare",t,(n,s)=>[`var t = ${s.type.value}(0); var value = ${s.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},It=(e,t,n)=>{if(t.length===0)return n;let s=1,u=1;for(let l=0;l<t.length;l++)t.indexOf(l)===-1?s*=e[l]:u*=e[l];return u<32&&s>1024},Pw=(e,t)=>{It(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?af(e,t):_w(e,t)},Aw=(e,t)=>{It(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?tf(e,t):ww(e,t)},kw=(e,t)=>{It(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?rf(e,t):vw(e,t)},Dw=(e,t)=>{It(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?nf(e,t):xw(e,t)},Nw=(e,t)=>{It(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?of(e,t):$w(e,t)},Cw=(e,t)=>{It(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?sf(e,t):Tw(e,t)},zw=(e,t)=>{It(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?uf(e,t):Iw(e,t)},Rw=(e,t)=>{It(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?lf(e,t):Sw(e,t)},Bw=(e,t)=>{It(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?df(e,t):Ow(e,t)},Mw=(e,t)=>{It(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ef(e,t):Ew(e,t)}}),Ia,jw,Fw,ru,pS=N(()=>{"use strict";ae(),Fe(),Cu(),Ia=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},jw=(e,t)=>{Ia(e.inputs);let n=(s,u,l)=>{let d=[];for(let p=0;p<s.rank;p++)(l.indexOf(p)>=0||l.length===0)&&d.push(`input_indices[${p}] = 0;`);return[`${d.join(`
`)}`,`var value = ${s.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${s.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${s.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",u.setByOffset("global_idx","best_index")]};e.compute(Ki("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},Fw=(e,t)=>{Ia(e.inputs);let n=(s,u,l)=>{let d=[];for(let p=0;p<s.rank;p++)(l.indexOf(p)>=0||l.length===0)&&d.push(`input_indices[${p}] = 0;`);return[`${d.join(`
`)}`,`var value = ${s.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${s.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${s.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",u.setByOffset("global_idx","best_index")]};e.compute(Ki("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},ru=e=>Ie(e)}),pf,Pi,cf,hf,ff,ti,mf,Lw,zu=N(()=>{"use strict";ae(),ue(),Du(),le(),pf=(e,t)=>{let n=e[0],s=e[1],u=e[2],l=e[3],d=e[4],p=e[5];if(d&&p)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let o=n.dims[0],r=n.dims[1],i=n.dims[2];if(u.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(s.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(s.dims[0]!==i)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(u.dims[0]!==s.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let a=u.dims[0]/3,c=a,h=c;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let S of t.qkvHiddenSizes)if(S%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");a=t.qkvHiddenSizes[0],c=t.qkvHiddenSizes[1],h=t.qkvHiddenSizes[2]}let m=r;if(a!==c)throw new Error("qkv_hidden_sizes first element should be same as the second");if(u.dims[0]!==a+c+h)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let b=0;if(d){if(c!==h)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(d.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(d.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(d.dims[1]!==o)throw new Error('Input "past" second dimension must be batch_size');if(d.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(d.dims[4]!==c/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(b=d.dims[3])}let x=m+b,v=-1,w=0;if(l)throw new Error("Mask not supported");if(d)throw new Error("past is not supported");if(p){if(p.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(p.dims[0]!==o||p.dims[1]!==t.numHeads||p.dims[2]!==r||p.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:o,sequenceLength:r,pastSequenceLength:b,kvSequenceLength:m,totalSequenceLength:x,maxSequenceLength:v,inputHiddenSize:i,hiddenSize:a,vHiddenSize:h,headSize:Math.floor(a/t.numHeads),vHeadSize:Math.floor(h/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Pi=(e,t,n)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e==null?void 0:e.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${n?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,cf=(e,t,n,s,u,l,d,p)=>{let o=je(d?1:l),r=64,i=l/o;i<r&&(r=32);let a=Math.ceil(l/o/r),c=[{type:12,data:t},{type:12,data:n},{type:12,data:s},{type:12,data:u},{type:12,data:i},{type:12,data:a}],h=We(e.dataType,o),m=He(1,o),b=["type"];d&&b.push("type"),p&&b.push("type");let x=v=>{let w=ee("x",e.dataType,e.dims,o),S=[w],O=d?F("seq_lens",d.dataType,d.dims):void 0;O&&S.push(O);let E=p?F("total_sequence_length_input",p.dataType,p.dims):void 0;E&&S.push(E);let A=He(e.dataType),k=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${r}>;
  var<workgroup> thread_sum: array<f32, ${r}>;
  ${v.registerUniforms(k).declareVariables(...S)}
  ${v.mainStart([r,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Pi(O,E,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${r}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${d?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${m}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${m}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(o){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${o}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${r}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${m}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${m}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(o){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${o}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${r}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${w.type.value}(${A}(1.0) / ${A}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${m}(x[offset + i]);
        x[offset + i] = ${w.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${d?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${w.type.value}(${A}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${r};${h};${o}`,inputDependencies:b},getShaderSource:x,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:u,z:t*n},programUniforms:c})}},hf=(e,t,n,s,u,l,d,p,o)=>{let r=d+l.kvSequenceLength,i=[l.batchSize,l.numHeads,l.sequenceLength,r],a=e>1&&s,c=l.kvNumHeads?l.kvNumHeads:l.numHeads,h=a?[l.batchSize,c,r,l.headSize]:void 0,m=l.nReps?l.nReps:1,b=l.scale===0?1/Math.sqrt(l.headSize):l.scale,x=je(l.headSize),v=l.headSize/x,w=12,S={x:Math.ceil(r/w),y:Math.ceil(l.sequenceLength/w),z:l.batchSize*l.numHeads},O=[{type:12,data:l.sequenceLength},{type:12,data:v},{type:12,data:r},{type:12,data:l.numHeads},{type:12,data:l.headSize},{type:1,data:b},{type:12,data:d},{type:12,data:l.kvSequenceLength},{type:12,data:m}],E=a&&s&&R.size(s.dims)>0,A=["type","type"];E&&A.push("type"),u&&A.push("type"),p&&A.push("type"),o&&A.push("type");let k=[{dims:i,dataType:t.dataType,gpuDataType:0}];a&&k.push({dims:h,dataType:t.dataType,gpuDataType:0});let I=M=>{let q=F("q",t.dataType,t.dims,x),J=F("key",n.dataType,n.dims,x),K=[q,J];if(E){let U=F("past_key",s.dataType,s.dims,x);K.push(U)}u&&K.push(F("attention_bias",u.dataType,u.dims));let C=p?F("seq_lens",p.dataType,p.dims):void 0;C&&K.push(C);let B=o?F("total_sequence_length_input",o.dataType,o.dims):void 0;B&&K.push(B);let $=ee("output",t.dataType,i),z=[$];a&&z.push(ee("present_key",t.dataType,h,x));let G=He(1,x),oe=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;

  var<workgroup> tileQ: array<${q.type.storage}, ${w*w}>;
  var<workgroup> tileK: array<${q.type.storage}, ${w*w}>;
  ${M.registerUniforms(oe).declareVariables(...K,...z)}
  ${M.mainStart([w,w,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${m===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${m===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Pi(C,B,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${E&&a?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${a?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${G}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${E&&a?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${a?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${G}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(x){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${x}`)}})()};
        output[outputIdx] = ${$.type.value} (sum * uniforms.alpha) + ${u?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${x};${u!==void 0};${s!==void 0};${e}`,inputDependencies:A},getRunData:()=>({outputs:k,dispatchGroup:S,programUniforms:O}),getShaderSource:I}},ff=(e,t,n,s,u,l,d=void 0,p=void 0)=>{let o=l+u.kvSequenceLength,r=u.nReps?u.nReps:1,i=u.vHiddenSize*r,a=e>1&&s,c=u.kvNumHeads?u.kvNumHeads:u.numHeads,h=a?[u.batchSize,c,o,u.headSize]:void 0,m=[u.batchSize,u.sequenceLength,i],b=12,x={x:Math.ceil(u.vHeadSize/b),y:Math.ceil(u.sequenceLength/b),z:u.batchSize*u.numHeads},v=[{type:12,data:u.sequenceLength},{type:12,data:o},{type:12,data:u.vHeadSize},{type:12,data:u.numHeads},{type:12,data:u.headSize},{type:12,data:i},{type:12,data:l},{type:12,data:u.kvSequenceLength},{type:12,data:r}],w=a&&s&&R.size(s.dims)>0,S=["type","type"];w&&S.push("type"),d&&S.push("type"),p&&S.push("type");let O=[{dims:m,dataType:t.dataType,gpuDataType:0}];a&&O.push({dims:h,dataType:t.dataType,gpuDataType:0});let E=A=>{let k=F("probs",t.dataType,t.dims),I=F("v",n.dataType,n.dims),M=[k,I];w&&M.push(F("past_value",s.dataType,s.dims));let q=d?F("seq_lens",d.dataType,d.dims):void 0;d&&M.push(q);let J=p?F("total_sequence_length_input",p.dataType,p.dims):void 0;p&&M.push(J);let K=[ee("output",t.dataType,m)];a&&K.push(ee("present_value",t.dataType,h));let C=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${b}u;
  var<workgroup> tileQ: array<${k.type.value}, ${b*b}>;
  var<workgroup> tileV: array<${k.type.value}, ${b*b}>;
  ${A.registerUniforms(C).declareVariables(...M,...K)}
  ${A.mainStart([b,b,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${r===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${r===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Pi(q,J,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${w&&a?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${a?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${k.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${w&&a?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${a?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${s!==void 0};${e}`,inputDependencies:S},getRunData:()=>({outputs:O,dispatchGroup:x,programUniforms:v}),getShaderSource:E}},ti=(e,t,n,s,u,l,d,p,o,r,i=void 0,a=void 0)=>{let c=Math.min(e.outputCount,1+(d?1:0)+(p?1:0)),h=c>1?d:void 0,m=c>1?p:void 0,b=c>1?r.pastSequenceLength:0,x=b+r.kvSequenceLength,v=o&&R.size(o.dims)>0?o:void 0,w=[t,n];h&&R.size(h.dims)>0&&w.push(h),v&&w.push(v),i&&w.push(i),a&&w.push(a);let S=e.compute(hf(c,t,n,h,v,r,b,i,a),{inputs:w,outputs:c>1?[-1,1]:[-1]})[0];e.compute(cf(S,r.batchSize,r.numHeads,b,r.sequenceLength,x,i,a),{inputs:i&&a?[S,i,a]:[S],outputs:[]});let O=[S,s];m&&R.size(m.dims)>0&&O.push(m),i&&O.push(i),a&&O.push(a),e.compute(ff(c,S,s,m,r,b,i,a),{inputs:O,outputs:c>1?[0,2]:[0]})},mf=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],s=t.sequenceLength,u=t.inputHiddenSize,l=t.headSize,d=12,p={x:Math.ceil(t.headSize/d),y:Math.ceil(t.sequenceLength/d),z:t.batchSize*t.numHeads},o=[e.inputs[0],e.inputs[1],e.inputs[2]],r=[{type:12,data:s},{type:12,data:u},{type:12,data:l},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],i=a=>{let c=ee("output_q",o[0].dataType,n),h=ee("output_k",o[0].dataType,n),m=ee("output_v",o[0].dataType,n),b=F("input",o[0].dataType,o[0].dims),x=F("weight",o[1].dataType,o[1].dims),v=F("bias",o[2].dataType,o[2].dims),w=b.type.storage,S=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${d}u;
  var<workgroup> tileInput: array<${w}, ${d*d}>;
  var<workgroup> tileWeightQ: array<${w}, ${d*d}>;
  var<workgroup> tileWeightK: array<${w}, ${d*d}>;
  var<workgroup> tileWeightV: array<${w}, ${d*d}>;
  ${a.registerUniforms(S).declareVariables(b,x,v,c,h,m)}
  ${a.mainStart([d,d,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${w}(0);
    var valueK = ${w}(0);
    var valueV = ${w}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:p,programUniforms:r}),getShaderSource:i},{inputs:o,outputs:[-1,-1,-1]})},Lw=(e,t)=>{let n=pf(e.inputs,t),[s,u,l]=mf(e,n);return ti(e,s,u,l,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}}),gf,bf,yf,Vw,cS=N(()=>{"use strict";Qe(),ae(),ue(),Fe(),le(),gf=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(s,u,l)=>{let d=u.length;if(d!==s.length)throw new Error(`${l}: num dimensions != ${d}`);u.forEach((p,o)=>{if(p!==s[o])throw new Error(`${l}: dim[${o}] do not match`)})};if(e[0].dims.length>1){let s=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,s,"Invalid input scale"),n(e[2].dims,s,"Invalid input B"),n(e[3].dims,s,"Invalid input mean"),n(e[4].dims,s,"Invalid input var")}else n(e[1].dims,[1],"Invalid input scale"),n(e[2].dims,[1],"Invalid input B"),n(e[3].dims,[1],"Invalid input mean"),n(e[4].dims,[1],"Invalid input var")},bf=(e,t)=>{let{epsilon:n,spatial:s,format:u}=t,l=e[0].dims,d=s?je(l[l.length-1]):1,p=u==="NHWC"&&l.length>1?d:1,o=R.size(l)/d,r=s,i=r?l.length:l,a=F("x",e[0].dataType,e[0].dims,d),c=F("scale",e[1].dataType,e[1].dims,p),h=F("bias",e[2].dataType,e[2].dims,p),m=F("inputMean",e[3].dataType,e[3].dims,p),b=F("inputVar",e[4].dataType,e[4].dims,p),x=ee("y",e[0].dataType,i,d),v=()=>{let S="";if(s)S=`let cOffset = ${l.length===1?"0u":u==="NHWC"?`outputIndices[${l.length-1}] / ${d}`:"outputIndices[1]"};`;else if(u==="NCHW")S=`
            ${x.indicesSet("outputIndices","0","0")}
            let cOffset = ${x.indicesToOffset("outputIndices")};`;else{S=`var cIndices = ${c.type.indices}(0);
                       cIndices[0] = outputIndices[${l.length-1}];`;for(let O=1;O<c.rank;O++)S+=`cIndices[${O}] = outputIndices[${O}];`;S+=`let cOffset = ${c.indicesToOffset("cIndices")};`}return S},w=S=>`
  const epsilon = ${n};
  ${S.registerUniform("outputSize","u32").declareVariables(a,c,h,m,b,x)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${x.offsetToIndices(`global_idx * ${d}`)};
    ${v()}
    let scale = ${c.getByOffset("cOffset")};
    let bias = ${h.getByOffset("cOffset")};
    let inputMean = ${m.getByOffset("cOffset")};
    let inputVar = ${b.getByOffset("cOffset")};
    let x = ${a.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${x.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${s}_${d}`,inputDependencies:r?["rank","type","type","type","type"]:void 0},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:r?[{type:12,data:o},...ne(l)]:[{type:12,data:o}]})}},yf=e=>Ie(e),Vw=(e,t)=>{let{inputs:n,outputCount:s}=e,u=yf({...t,outputCount:s});if(ge.webgpu.validateInputContent&&gf(n,u),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(bf(n,u))}}),_f,wf,Uw,hS=N(()=>{"use strict";ue(),le(),_f=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},wf=e=>{let t=e[0].dims,n=e[0].dims[2],s=R.size(t)/4,u=e[0].dataType,l=F("input",u,t,4),d=F("bias",u,[n],4),p=F("residual",u,t,4),o=ee("output",u,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)}}),getShaderSource:r=>`
  const channels = ${n}u / 4;
  ${r.declareVariables(l,d,p,o)}

  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes(s)}
    let value = ${l.getByOffset("global_idx")}
      + ${d.getByOffset("global_idx % channels")} + ${p.getByOffset("global_idx")};
    ${o.setByOffset("global_idx","value")}
  }`}},Uw=e=>{_f(e.inputs),e.compute(wf(e.inputs))}}),vf,$e,qw,Gw,Hw,Ww,Kw,Xw,Zw,Jw,Yw,xf,Qw,ev,tv,rv,Gn,nv,Fi,iv,ov,av,sv,uv,lv,dv,pv,cv,hv,fv,mv,gv,bv,yv,_v,wv,Sa,vv,nu,iu,xv,$v,Tv,$f,Tf,Iv,Ru=N(()=>{"use strict";ae(),ue(),Fe(),le(),vf=(e,t,n,s,u,l,d)=>{let p=Math.ceil(t/4),o="";typeof u=="string"?o=`${u}(a)`:o=u("a");let r=F("inputData",n,[p],4),i=ee("outputData",s,[p],4),a=[{name:"vec_size",type:"u32"}];return d&&a.push(...d),`
      ${e.registerUniforms(a).declareVariables(r,i)}

  ${l??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${r.getByOffset("global_idx")};
    ${i.setByOffset("global_idx",o)}
  }`},$e=(e,t,n,s,u,l=e.dataType,d,p)=>{let o=[{type:12,data:Math.ceil(R.size(e.dims)/4)}];return d&&o.push(...d),{name:t,shaderCache:{hint:u,inputDependencies:["type"]},getShaderSource:r=>vf(r,R.size(e.dims),e.dataType,l,n,s,p),getRunData:r=>({outputs:[{dims:e.dims,dataType:l}],dispatchGroup:{x:Math.ceil(R.size(r[0].dims)/64/4)},programUniforms:o})}},qw=e=>{e.compute($e(e.inputs[0],"Abs","abs"))},Gw=e=>{e.compute($e(e.inputs[0],"Acos","acos"))},Hw=e=>{e.compute($e(e.inputs[0],"Acosh","acosh"))},Ww=e=>{e.compute($e(e.inputs[0],"Asin","asin"))},Kw=e=>{e.compute($e(e.inputs[0],"Asinh","asinh"))},Xw=e=>{e.compute($e(e.inputs[0],"Atan","atan"))},Zw=e=>{e.compute($e(e.inputs[0],"Atanh","atanh"))},Jw=e=>Ie(e),Yw=(e,t)=>{let n;switch(t.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute($e(e.inputs[0],"Cast",n,void 0,t.cacheKey,t.to))},xf=e=>{let t,n,s=e.length>=2&&e[1].data!==0,u=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=s?e[1].getFloat32Array()[0]:-34028234663852886e22,n=u?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=s?e[1].getUint16Array()[0]:64511,n=u?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return Ie({min:t,max:n})},Qw=(e,t)=>{let n=t||xf(e.inputs),s=He(e.inputs[0].dataType);e.compute($e(e.inputs[0],"Clip",u=>`clamp(${u}, vec4<${s}>(uniforms.min), vec4<${s}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:"min",type:s},{name:"max",type:s}]),{inputs:[0]})},ev=e=>{e.compute($e(e.inputs[0],"Ceil","ceil"))},tv=e=>{e.compute($e(e.inputs[0],"Cos","cos"))},rv=e=>{e.compute($e(e.inputs[0],"Cosh","cosh"))},Gn=e=>Ie(e),nv=(e,t)=>{let n=He(e.inputs[0].dataType);e.compute($e(e.inputs[0],"Elu",s=>`elu_vf32(${s})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Fi=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,iv=e=>{let t=He(e.inputs[0].dataType);e.compute($e(e.inputs[0],"Erf",n=>`erf_vf32(${n})`,Fi(t)))},ov=e=>{e.compute($e(e.inputs[0],"Exp","exp"))},av=e=>{e.compute($e(e.inputs[0],"Floor","floor"))},sv=e=>{let t=He(e.inputs[0].dataType);e.compute($e(e.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Fi(t)))},uv=(e,t)=>{let n=He(e.inputs[0].dataType);e.compute($e(e.inputs[0],"LeakyRelu",s=>`select(leaky_relu_alpha_ * ${s}, ${s}, ${s} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},lv=e=>{e.compute($e(e.inputs[0],"Not",t=>`!${t}`))},dv=e=>{e.compute($e(e.inputs[0],"Neg",t=>`-${t}`))},pv=e=>{e.compute($e(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},cv=e=>{let t=He(e.inputs[0].dataType);e.compute($e(e.inputs[0],"Relu",n=>`select(vec4<${t}>(0.0), ${n}, ${n} > vec4<${t}>(0.0))`))},hv=e=>{e.compute($e(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},fv=e=>Ie(e),mv=(e,t)=>{let n=He(e.inputs[0].dataType);e.compute($e(e.inputs[0],"HardSigmoid",s=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${s} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},gv=e=>{let t=He(e.inputs[0].dataType);e.compute($e(e.inputs[0],"HardSwish",n=>`${n} * max(vec4<${t}>(0.0), min(vec4<${t}>(1.0), vec4<${t}>(${t}(1.0 / 6.0)) * ${n} + vec4<${t}>(0.5)))`))},bv=e=>{e.compute($e(e.inputs[0],"Sin","sin"))},yv=e=>{e.compute($e(e.inputs[0],"Sinh","sinh"))},_v=e=>{e.compute($e(e.inputs[0],"Sqrt","sqrt"))},wv=e=>{e.compute($e(e.inputs[0],"Tan","tan"))},Sa=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,vv=e=>{e.compute($e(e.inputs[0],"Tanh",Sa))},nu=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Sa("v")};
}
`,iu=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,xv=e=>{let t=He(e.inputs[0].dataType);e.compute($e(e.inputs[0],"FastGelu",iu,nu(t),void 0,e.inputs[0].dataType))},$v=(e,t)=>{let n=He(e.inputs[0].dataType);return e.compute($e(e.inputs[0],"ThresholdedRelu",s=>`select(vec4<${n}>(0.0), ${s}, ${s} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},Tv=e=>{e.compute($e(e.inputs[0],"Log","log"))},$f=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Tf=e=>`quick_gelu_impl(${e})`,Iv=(e,t)=>{let n=He(e.inputs[0].dataType);e.compute($e(e.inputs[0],"QuickGelu",Tf,$f(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),If,Sf,Sv,fS=N(()=>{"use strict";ue(),le(),Ru(),If=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Sf=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let n=F("input",e[0].dataType,e[0].dims,4),s=F("bias",e[0].dataType,[e[0].dims[2]],4),u=ee("output",e[0].dataType,t,4),l=R.size(t)/4,d=We(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)}}),getShaderSource:p=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${p.declareVariables(n,s,u)}

  ${Fi(d)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(l)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${u.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Sv=e=>{If(e.inputs),e.compute(Sf(e.inputs))}}),Of,Ef,St,Ov,Ev,Pv,Av,kv,Dv,Nv,Cv,zv,Rv,mS=N(()=>{"use strict";ae(),ue(),le(),Of=(e,t,n,s,u,l,d,p,o,r,i,a)=>{let c,h;typeof p=="string"?c=h=(w,S)=>`${p}((${w}),(${S}))`:typeof p=="function"?c=h=p:(c=p.scalar,h=p.vector);let m=ee("outputData",i,s.length,4),b=F("aData",o,t.length,4),x=F("bData",r,n.length,4),v;if(u)if(l){let w=R.size(t)===1,S=R.size(n)===1,O=t.length>0&&t[t.length-1]%4===0,E=n.length>0&&n[n.length-1]%4===0;w||S?v=m.setByOffset("global_idx",h(w?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"),S?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"))):v=`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${b.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${x.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",h(d||O?b.getByOffset("offsetA / 4u"):`${b.type.value}(${b.getByOffset("offsetA / 4u")}[offsetA % 4u])`,d||E?x.getByOffset("offsetB / 4u"):`${x.type.value}(${x.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=m.setByOffset("global_idx",h(b.getByOffset("global_idx"),x.getByOffset("global_idx")));else{if(!l)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let w=(S,O,E="")=>{let A=`aData[indexA${O}][componentA${O}]`,k=`bData[indexB${O}][componentB${O}]`;return`
            let outputIndices${O} = ${m.offsetToIndices(`global_idx * 4u + ${O}u`)};
            let offsetA${O} = ${b.broadcastedIndicesToOffset(`outputIndices${O}`,m)};
            let offsetB${O} = ${x.broadcastedIndicesToOffset(`outputIndices${O}`,m)};
            let indexA${O} = offsetA${O} / 4u;
            let indexB${O} = offsetB${O} / 4u;
            let componentA${O} = offsetA${O} % 4u;
            let componentB${O} = offsetB${O} % 4u;
            ${S}[${O}] = ${E}(${c(A,k)});
          `};i===9?v=`
            var data = vec4<u32>(0);
            ${w("data",0,"u32")}
            ${w("data",1,"u32")}
            ${w("data",2,"u32")}
            ${w("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:v=`
            ${w("outputData[global_idx]",0)}
            ${w("outputData[global_idx]",1)}
            ${w("outputData[global_idx]",2)}
            ${w("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(b,x,m)}

        ${a??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},Ef=(e,t,n,s,u,l,d=n.dataType)=>{let p=n.dims.map(Number),o=s.dims.map(Number),r=!R.areEqual(p,o),i=p,a=R.size(p),c=!1,h=!1,m=[r];if(r){let b=pn.calcShape(p,o,!1);if(!b)throw new Error("Can't perform binary op on the given tensors");i=b.slice(),a=R.size(i);let x=R.size(p)===1,v=R.size(o)===1,w=p.length>0&&p[p.length-1]%4===0,S=o.length>0&&o[o.length-1]%4===0;m.push(x),m.push(v),m.push(w),m.push(S);let O=1;for(let E=1;E<i.length;E++){let A=p[p.length-E],k=o[o.length-E];if(A===k)O*=A;else break}O%4===0?(h=!0,c=!0):(x||v||w||S)&&(c=!0)}else c=!0;return m.push(c),{name:e,shaderCache:{hint:t+m.map(b=>b.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:b=>Of(b,p,o,i,c,r,h,u,n.dataType,s.dataType,d,l),getRunData:()=>({outputs:[{dims:i,dataType:d}],dispatchGroup:{x:Math.ceil(a/64/4)},programUniforms:[{type:12,data:Math.ceil(R.size(i)/4)},...ne(p,o,i)]})}},St=(e,t,n,s,u,l)=>{e.compute(Ef(t,u??"",e.inputs[0],e.inputs[1],n,s,l))},Ov=e=>{St(e,"Add",(t,n)=>`${t}+${n}`)},Ev=e=>{St(e,"Div",(t,n)=>`${t}/${n}`)},Pv=e=>{St(e,"Equal",{scalar:(t,n)=>`u32(${t}==${n})`,vector:(t,n)=>`vec4<u32>(${t}==${n})`},void 0,void 0,9)},Av=e=>{St(e,"Mul",(t,n)=>`${t}*${n}`)},kv=e=>{let t=F("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;St(e,"Pow",{scalar:(n,s)=>`pow_custom(${n},${s})`,vector:(n,s)=>`pow_vector_custom(${n},${s})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Dv=e=>{St(e,"Sub",(t,n)=>`${t}-${n}`)},Nv=e=>{St(e,"Greater",{scalar:(t,n)=>`u32(${t}>${n})`,vector:(t,n)=>`vec4<u32>(${t}>${n})`},void 0,void 0,9)},Cv=e=>{St(e,"Less",{scalar:(t,n)=>`u32(${t}<${n})`,vector:(t,n)=>`vec4<u32>(${t}<${n})`},void 0,void 0,9)},zv=e=>{St(e,"GreaterOrEqual",{scalar:(t,n)=>`u32(${t}>=${n})`,vector:(t,n)=>`vec4<u32>(${t}>=${n})`},void 0,void 0,9)},Rv=e=>{St(e,"LessOrEqual",{scalar:(t,n)=>`u32(${t}<=${n})`,vector:(t,n)=>`vec4<u32>(${t}<=${n})`},void 0,void 0,9)}}),Pf,Af,kf,Df,Bv,Mv,gS=N(()=>{"use strict";ae(),ue(),Fe(),le(),Pf=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let n=0,s=e[n],u=s.dataType,l=s.dims.length;e.forEach((d,p)=>{if(p!==n){if(d.dataType!==u)throw new Error("input tensors should be one type");if(d.dims.length!==l)throw new Error("input tensors should have the same shape");d.dims.forEach((o,r)=>{if(r!==t&&o!==s.dims[r])throw new Error("non concat dimensions must match")})}})},Af=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,kf=(e,t)=>{let n=e.length,s=[];for(let u=0;u<n;++u){let l=t.setByOffset("global_idx",e[u].getByIndices("indices"));n===1?s.push(l):u===0?s.push(`if (inputIndex == ${u}u) { ${l} }`):u===n-1?s.push(`else { ${l} }`):s.push(`else if (inputIndex == ${u}) { ${l} }`)}return s.join(`
`)},Df=(e,t,n,s)=>{let u=R.size(n),l=new Array(e.length),d=new Array(e.length),p=0,o=[],r=[],i=[{type:12,data:u}];for(let b=0;b<e.length;++b)p+=e[b].dims[t],l[b]=p,r.push(e[b].dims.length),d[b]=F(`input${b}`,s,r[b]),o.push("rank"),i.push({type:12,data:l[b]});for(let b=0;b<e.length;++b)i.push(...ne(e[b].dims));i.push(...ne(n));let a=ee("output",s,n.length),c=a.indicesGet("indices",t),h=Array.from(Array(l.length).keys()).map(b=>`uniforms.sizeInConcatAxis${b}`).join(","),m=b=>`

  ${(()=>{b.registerUniform("outputSize","u32");for(let x=0;x<e.length;x++)b.registerUniform(`sizeInConcatAxis${x}`,"u32");return b.declareVariables(...d,a)})()}

  ${Af(l.length,h)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${a.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${c});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${l.length}u>(${h});
      ${c} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${kf(d,a)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:o},getRunData:()=>({outputs:[{dims:n,dataType:s}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:i}),getShaderSource:m}},Bv=(e,t)=>{let n=e.inputs,s=n[0].dims,u=R.normalizeAxis(t.axis,s.length);Pf(n,u);let l=s.slice();l[u]=n.reduce((p,o)=>p+(o.dims.length>u?o.dims[u]:0),0);let d=n.filter(p=>R.size(p.dims)>0);e.compute(Df(d,u,l,n[0].dataType),{inputs:d})},Mv=e=>Ie({axis:e.axis})}),Hr,Wr,Kr,Bu,Yr=N(()=>{"use strict";ae(),ue(),Hr=(e,t,n="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Wr=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Kr=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Bu=e=>{let t=(e==null?void 0:e.activation)||"";if(t==="HardSigmoid"){let[n,s]=(e==null?void 0:e.activation_params)||[.2,.5];return{activation:t,alpha:n,beta:s}}else if(t==="Clip"){let[n,s]=(e==null?void 0:e.activation_params)||[lw,dw];return{activation:t,clipMax:s,clipMin:n}}else if(t==="LeakyRelu"){let[n]=(e==null?void 0:e.activation_params)||[.01];return{activation:t,alpha:n}}return{activation:t}}}),Ze,jv,Mu=N(()=>{"use strict";Ze=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},jv=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Fv,bS=N(()=>{"use strict";Fv=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),Jn,ju,Fu=N(()=>{"use strict";ae(),ue(),le(),Yr(),Jn=(e,t,n,s,u)=>{let l=s-n;return`
      ${Array.from({length:n}).map((d,p)=>`
      if (${te(t.shape,p,t.rank)} != 1) {
        ${t.indicesSet(e,p,te(u,p+l,s))}
      } else {
        ${t.indicesSet(e,p,0)}
      }`).join("")}
`},ju=(e,t,n,s,u=!1,l)=>{let d=e[0].dims,p=e[1].dims,o=d[d.length-2],r=p[p.length-1],i=d[d.length-1],a=je(r),c=je(i),h=je(o),m=R.size(n)/a/h,b=e.length>2,x=s?s.slice(0,-2):n.slice(0,-2),v=[R.size(x),o,r],w=[{type:12,data:m},{type:12,data:o},{type:12,data:r},{type:12,data:i}];Wr(t,w),w.push(...ne(x,d,p)),b&&w.push(...ne(e[2].dims)),w.push(...ne(v));let S=O=>{let E=Nu("batch_dims",e[0].dataType,x.length),A=F("a",e[0].dataType,d.length,c),k=F("b",e[1].dataType,p.length,a),I=ee("output",e[0].dataType,v.length,a),M=We(I.type.tensor),q=Hr(t,I.type.value,M),J=[A,k],K="";if(b){let $=u?a:1;J.push(F("bias",e[2].dataType,e[2].dims.length,$)),K=`${u?`value += bias[col / ${$}];`:`value += ${I.type.value}(bias[row + i]);`}`}let C=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Kr(t,C);let B=()=>{let $=`var a_data: ${A.type.value};`;for(let z=0;z<c;z++)$+=`
              let b_data${z} = b[(b_offset + (k + ${z}) * uniforms.N + col) / ${a}];`;for(let z=0;z<h;z++){$+=`a_data = a[(a_offset + (row + ${z}) * uniforms.K + k) / ${c}];`;for(let G=0;G<c;G++)$+=`
            values[${z}] = fma(${k.type.value}(a_data${c===1?"":`[${G}]`}), b_data${G}, values[${z}]);
`}return $};return`
  ${O.registerUniforms(C).registerInternalVariables(E).declareVariables(...J,I)}
  ${O.mainStart()}
    ${O.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${a})) * ${a};
    var index1 = global_idx / (uniforms.N / ${a});
    let stride1 = uniforms.M / ${h};
    let row = (index1 % stride1) * ${h};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${E.offsetToIndices("batch")};`}

    var a_indices: ${A.type.indices};
    ${Jn("a_indices",A,A.rank-2,E.rank,"batch_indices")}
    ${A.indicesSet("a_indices",A.rank-2,0)}
    ${A.indicesSet("a_indices",A.rank-1,0)}
    let a_offset = ${A.indicesToOffset("a_indices")};

    var b_indices: ${k.type.indices};
    ${Jn("b_indices",k,k.rank-2,E.rank,"batch_indices")}
    ${k.indicesSet("b_indices",k.rank-2,0)}
    ${k.indicesSet("b_indices",k.rank-1,0)}
    let b_offset = ${k.indicesToOffset("b_indices")};
    var values: array<${I.type.value}, ${h}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${c}) {
      ${B()}
    }
    for (var i = 0u; i < ${h}u; i++) {
      var value = values[i];
      ${K}
      ${q}
      let cur_indices = ${I.type.indices}(batch, row + i, col);
      let offset = ${I.indicesToOffset("cur_indices")};
      ${I.setByOffset(`offset / ${a}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${a};${c};${h};${u}`,inputDependencies:b?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:l?l(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:w}),getShaderSource:S}}}),Nf,Cf,ou,Oa,zf,au,Rf,Xi,Lu=N(()=>{"use strict";ae(),ue(),le(),Yr(),Fu(),Mu(),Nf=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Cf=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,ou=(e,t,n="f32",s,u=!1,l=32,d=!1,p=32)=>{let o=t[1]*e[1],r=t[0]*e[0],i=u?o:l,a=u?l:o,c=i/t[0],h=l/t[1];if(!((u&&c===4&&e[1]===4||!u&&(c===3||c===4))&&i%t[0]===0&&l%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${u} is true, innerElementSize ${c} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${c} must be 3 or 4.
  tileAWidth ${i} must be divisible by workgroupSize[0]${t[0]}. tileInner ${l} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${c}<${n}>, ${i/c}>, ${a}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${r/e[0]}>, ${l}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${c};
const tileInner = ${l};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${d?"0":"i32(globalId.z)"};
  ${s?`let batchIndices = ${s.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${o};

  let num_tiles = ${d?`${Math.ceil(p/l)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${d?`i32(globalId.z) * ${p}`:"0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${h};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Nf(u,s)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${s?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${c===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Cf(u,c)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Oa=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,zf=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",au=(e,t,n="f32",s,u=!1,l=32,d=!1,p=32,o=!1)=>{let r=e[1]*t[1],i=e[0]*t[0],a=u?r:l,c=u?l:r;if(!(c%t[1]===0&&a%t[0]===0&&l%t[1]===0))throw new Error(`tileAHight ${c} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${a} must be divisible by workgroupSize[0]${t[0]}, tileInner ${l} must be divisible by workgroupSize[1]${t[1]}`);let h=c/t[1],m=a/t[0],b=l/t[1],x=o?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${r};
    let globalColStart = i32(workgroupId.x) * ${i};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${c}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${a}; inputCol = inputCol + ${t[0]}) {
          ${Oa(u,s)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${l}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${i}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${s?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${u?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${r};

let tileRowA = i32(localId.y) * ${h};
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${b};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Oa(u,s)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${s?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${n}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${zf(u)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${n}, ${a}>, ${c}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${i}>, ${l}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${l};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${d?"0":"i32(globalId.z)"};
    ${s?`let batchIndices = ${s.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${d?`${Math.ceil(p/l)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${d?`i32(globalId.z) * ${p}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${x}
  }
`},Rf=(e,t,n,s,u=!1)=>{let[l,d,p,o]=s,r=We(s[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${l.type.indices}) -> ${Ze(e,r)} {
      var value = ${Ze(e,r)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${d.type.indices};
        ${Jn("aIndices",d,d.rank-2,l.rank,"batchIndices")}
        ${d.indicesSet("aIndices",d.rank-2,"u32(row)")}
        ${d.indicesSet("aIndices",d.rank-1,"u32(colIn)")}
        value = ${d.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${l.type.indices}) -> ${Ze(e,r)} {
      var value = ${Ze(e,r)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${p.type.indices};
        ${Jn("bIndices",p,p.rank-2,l.rank,"batchIndices")}
        ${p.indicesSet("bIndices",p.rank-2,"u32(row)")}
        ${p.indicesSet("bIndices",p.rank-1,"u32(colIn)")}
        value = ${p.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ze(e,r)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${u?"bias[colIn]":`${Ze(e,r)}(bias[row])`};`:""}
        ${n}
        ${o.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Xi=(e,t,n,s,u=!1,l)=>{let d=e[0].dims,p=e[1].dims,o=d.slice(0,-2),r=p.slice(0,-2),i=s?s.slice(0,-2):n.slice(0,-2),a=R.size(i),c=d[d.length-2],h=d[d.length-1],m=p[p.length-1],b=h%4===0&&m%4===0,x=c<=8?[4,1,1]:[4,4,1],v=[8,8,1],w=[Math.ceil(m/v[0]/x[0]),Math.ceil(c/v[1]/x[1]),Math.ceil(a/v[2]/x[2])],S=b?4:1,O=[...o,c,h/S],E=O.length,A=[...r,h,m/S],k=A.length,I=[a,c,m/S],M=[{type:6,data:c},{type:6,data:m},{type:6,data:h}];Wr(t,M),M.push(...ne(i,O,A));let q=["rank","rank"],J=e.length>2;J&&(M.push(...ne(e[2].dims)),q.push("rank")),M.push(...ne(I));let K=C=>{let B=i.length,$=Nu("batchDims",e[0].dataType,B,1),z=We(e[0].dataType),G=F("a",e[0].dataType,E,S),oe=F("b",e[1].dataType,k,S),U=ee("result",e[0].dataType,I.length,S),ie=[G,oe];if(J){let de=u?S:1;ie.push(F("bias",e[2].dataType,e[2].dims.length,de))}let V=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Kr(t,V);let W=We(U.type.tensor),X=Hr(t,U.type.value,W),L=Rf(S,J,X,[$,G,oe,U],u);return`
  ${C.registerUniforms(V).registerInternalVariables($).declareVariables(...ie,U)}
  ${L}
  ${b?ou(x,v,z,$):au(x,v,z,$)}
                   `};return{name:"MatMul",shaderCache:{hint:`${x};${t.activation};${b};${u}`,inputDependencies:q},getRunData:()=>({outputs:[{dims:l?l(n):n,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:M}),getShaderSource:K}}}),Bf,Lv,yS=N(()=>{"use strict";ae(),Wt(),le(),Yr(),Mu(),bS(),Lu(),Bf=(e,t,n,s,u=!1,l,d=4,p=4,o=4,r="f32")=>{let i=M=>{switch(M){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${r}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${M} is not supported.`)}},a=M=>{switch(M){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${M} is not supported.`)}},c=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,h=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,m=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",b=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",x=e?"row":"col",v=e?"col":"row",w=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${x} / outWidth;
    let outCol = ${x} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${Ze(d,r)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${b}) {
      ${c}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${i(d)}
    }
    return resData;`,S=e?t&&s?`
    let col = colIn * ${d};
    ${w}`:`
    let col = colIn * ${d};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${w}
    }
    return ${Ze(d,r)}(0.0);`:s&&n?`
    let col = colIn * ${d};
    ${w}`:`
    let col = colIn * ${d};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${w}
    }
    return ${Ze(d,r)}(0.0);`,O=e?s&&n?a(p):`
    let col = colIn * ${p};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${a(p)}
    }
    return ${Ze(p,r)}(0.0);`:`
    let col = colIn * ${p};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${a(p)}
    }
    return ${Ze(p,r)}(0.0);`,E=Ze(o,r),A=Ze(e?d:p,r),k=Ze(e?p:d,r),I=Hr(l,E,r);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?S:O}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${k} {
      ${e?O:S}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${E}) {
      let col = colIn * ${o};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${h}
      ${jv(u)}
      ${I}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Lv=(e,t,n,s,u,l,d,p,o)=>{let r=t.format==="NHWC",i=r?e[0].dims[3]:e[0].dims[1],a=n[0],c=r?n[2]:n[3],h=r?n[1]:n[2],m=r?n[3]:n[1],b=r&&(i%4===0||i%3===0)&&m%4===0,x=r?m:c*h,v=r?c*h:m,w=[8,8,1],S=s<=8?[4,1,1]:[4,4,1],O=[Math.ceil(x/w[0]/S[0]),Math.ceil(v/w[1]/S[1]),Math.ceil(a/w[2]/S[2])];we("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${O}`);let E=b?r&&i%4!==0?3:4:1,A=w[1]*S[1],k=w[0]*S[0],I=Math.max(w[0]*E,w[1]),M=s%A===0,q=u%k===0,J=l%I===0,K=b?[E,4,4]:[1,1,1],C=[{type:6,data:s},{type:6,data:u},{type:6,data:l},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Wr(t,C),C.push(...ne(e[0].dims,e[1].dims));let B=["rank","rank"];d&&(C.push(...ne(e[2].dims)),B.push("rank")),C.push(...ne(n));let $=z=>{let G=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Kr(t,G);let oe=b?4:1,U=We(e[0].dataType),ie=`
      fn setOutputAtIndex(flatIndex : i32, value : ${b?`vec4<${U}>`:U}) {
        result[flatIndex] = ${b?`vec4<${U}>`:U}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${b?`vec4<${U}>`:U}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${b?"/ 4":""}, value);
      }`,V=F("x",e[0].dataType,e[0].dims.length,E===3?1:E),W=F("w",e[1].dataType,e[1].dims.length,oe),X=[V,W],L=ee("result",e[0].dataType,n.length,oe);if(d){let de=F("bias",e[2].dataType,e[2].dims.length,oe);X.push(de),ie+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${b?`vec4<${U}>`:U} {
          return bias[coords.${r?"w":"y"}${b?"/ 4":""}];
        }`}return`
        ${Fv("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${z.registerUniforms(G).declareVariables(...X,L)}
        ${ie}
        ${Bf(r,M,q,J,d,t,K[0],K[1],K[2],U)}
        ${b?ou(S,w,U,void 0,!r,I):au(S,w,U,void 0,!r,I,!1,void 0,p)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${E};${b};${M};${q};${J};${A};${k};${I}`,inputDependencies:B},getRunData:()=>({outputs:[{dims:o?o(n):n,dataType:e[0].dataType}],dispatchGroup:{x:O[0],y:O[1],z:O[2]},programUniforms:C}),getShaderSource:$}}}),Mf,Ea,Dn,jf,Pa,Ff,Vv,Uv,_S=N(()=>{"use strict";ae(),Wt(),ue(),le(),Yr(),Mu(),Mf=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},Ea=e=>typeof e=="number"?[e,e,e]:e,Dn=(e,t)=>t<=1?e:e+(e-1)*(t-1),jf=(e,t,n,s=1)=>{let u=Dn(t,s);return Math.floor((e[0]*(n-1)-n+u)/2)},Pa=(e,t,n,s,u)=>{u==null&&(u=jf(e,t[0],s[0]));let l=[0,0,0,n];for(let d=0;d<3;d++)e[d]+2*u>=t[d]&&(l[d]=Math.trunc((e[d]-t[d]+2*u)/s[d]+1));return l},Ff=(e,t,n,s,u,l,d,p,o,r)=>{let i,a,c,h;if(e==="VALID"&&(e=0),typeof e=="number"){i={top:e,bottom:e,left:e,right:e,front:e,back:e};let m=Pa([t,n,s,1],[p,o,r],1,[u,l,d],e);a=m[0],c=m[1],h=m[2]}else if(Array.isArray(e)){if(!e.every((b,x,v)=>b===v[0]))throw Error(`Unsupported padding parameter: ${e}`);i={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let m=Pa([t,n,s,1],[p,o,r],1,[u,l,d],e[0]);a=m[0],c=m[1],h=m[2]}else if(e==="SAME_UPPER"){a=Math.ceil(t/u),c=Math.ceil(n/l),h=Math.ceil(s/d);let m=(a-1)*u+p-t,b=(c-1)*l+o-n,x=(h-1)*d+r-s,v=Math.floor(m/2),w=m-v,S=Math.floor(b/2),O=b-S,E=Math.floor(x/2),A=x-E;i={top:S,bottom:O,left:E,right:A,front:v,back:w}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:i,outDepth:a,outHeight:c,outWidth:h}},Vv=(e,t,n,s,u,l=!1,d="channelsLast")=>{let p,o,r,i,a;if(d==="channelsLast")[p,o,r,i,a]=e;else if(d==="channelsFirst")[p,a,o,r,i]=e;else throw new Error(`Unknown dataFormat ${d}`);let[c,,h,m,b]=t,[x,v,w]=Ea(n),[S,O,E]=Ea(s),A=Dn(h,S),k=Dn(m,O),I=Dn(b,E),{padInfo:M,outDepth:q,outHeight:J,outWidth:K}=Ff(u,o,r,i,x,v,w,A,k,I),C=l?c*a:c,B=[0,0,0,0,0];return d==="channelsFirst"?B=[p,C,q,J,K]:d==="channelsLast"&&(B=[p,q,J,K,C]),{batchSize:p,dataFormat:d,inDepth:o,inHeight:r,inWidth:i,inChannels:a,outDepth:q,outHeight:J,outWidth:K,outChannels:C,padInfo:M,strideDepth:x,strideHeight:v,strideWidth:w,filterDepth:h,filterHeight:m,filterWidth:b,effectiveFilterDepth:A,effectiveFilterHeight:k,effectiveFilterWidth:I,dilationDepth:S,dilationHeight:O,dilationWidth:E,inShape:e,outShape:B,filterShape:t}},Uv=(e,t,n,s,u,l)=>{let d=l==="channelsLast",p=d?e[0].dims[3]:e[0].dims[1],o=!1,r=[64,1,1],i={x:n.map((w,S)=>S)},a=[Math.ceil(Mf(i.x.map(w=>n[w]))/r[0]),1,1];we("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${a}`);let c=o?d&&p%4!==0?3:4:1,h=R.size(n),m=[{type:12,data:h},{type:12,data:s},{type:12,data:u},{type:12,data:t.strides},{type:12,data:t.dilations}];Wr(t,m),m.push(...ne(e[0].dims,e[1].dims));let b=["rank","rank"],x=e.length===3;x&&(m.push(...ne(e[2].dims)),b.push("rank")),m.push(...ne(n));let v=w=>{let S=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:s.length},{name:"pads",type:"u32",length:u.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Kr(t,S);let O=o?4:1,E=We(e[0].dataType),A=F("x",e[0].dataType,e[0].dims.length,c===3?1:c),k=F("W",e[1].dataType,e[1].dims.length,O),I=[A,k],M=ee("result",e[0].dataType,n.length,O),q="";if(x){let C=F("bias",e[2].dataType,e[2].dims.length,O);I.push(C),q+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${o?`vec4<${E}>`:E} {
          return bias[${d?te("coords",4,5):te("coords",1,5)}${o?"/ 4":""}];
        }`}let J=Ze(c,E),K=Hr(t,J,E);return`
            ${q}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> ${E} {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${A.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> ${E} {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${k.getByIndices("aIndices")};
            }
          ${w.registerUniforms(S).declareVariables(...I,M)}
          ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${M.offsetToIndices("global_idx")};
              let batch = ${te("coords",0,A.rank)};
              let d2 = ${d?te("coords",A.rank-1,A.rank):te("coords",1,A.rank)};
              let xFRCCorner = vec3<u32>(${d?te("coords",1,A.rank):te("coords",2,A.rank)},
              ${d?te("coords",2,A.rank):te("coords",3,A.rank)},
              ${d?te("coords",3,A.rank):te("coords",4,A.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${d?te("uniforms.x_shape",1,A.rank):te("uniforms.x_shape",2,A.rank)};
              let xShapeZ = ${d?te("uniforms.x_shape",2,A.rank):te("uniforms.x_shape",3,A.rank)};
              let xShapeW = ${d?te("uniforms.x_shape",3,A.rank):te("uniforms.x_shape",4,A.rank)};
              let xShapeU = ${d?te("uniforms.x_shape",4,A.rank):te("uniforms.x_shape",1,A.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = ${E}(0);
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${d?`let xValues = vec4<${E}>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<${E}>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<${E}>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${d?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${d?`let xValues = vec2<${E}>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<${E}>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<${E}>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${d?`let xValues = vec3<${E}>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<${E}>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<${E}>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${x?"value = value + getBiasByOutputCoords(coords)":""};
              ${K}
              result[global_idx] = ${E}(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${d};${c};${x}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:a[0],y:a[1],z:a[2]},programUniforms:m}),getShaderSource:v}}}),qv,Gv,wS=N(()=>{"use strict";ae(),ue(),le(),Yr(),qv=(e,t,n,s)=>{let u=e.length>2,l=u?"value += b[output_channel];":"",d=e[0].dims,p=e[1].dims,o=t.format==="NHWC",r=o?n[3]:n[1],i=r/t.group,a=o&&i>=4?je(r):1,c=R.size(n)/a,h=[{type:12,data:c},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:i}];Wr(t,h),h.push(...ne(d,[p[0],p[1],p[2],p[3]/a]));let m=u?["rank","rank","rank"]:["rank","rank"];h.push(...ne([n[0],n[1],n[2],n[3]/a]));let b=x=>{let v=ee("output",e[0].dataType,n.length,a),w=We(v.type.tensor),S=Hr(t,v.type.value,w),O=F("x",e[0].dataType,d.length),E=F("w",e[1].dataType,p.length,a),A=[O,E];u&&A.push(F("b",e[2].dataType,e[2].dims,a));let k=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Kr(t,k);let I=o?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${O.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${E.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${O.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${E.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${x.registerUniforms(k).declareVariables(...A,v)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${o?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${o?1:2}], outputIndices[${o?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${a} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${o?2:1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${I}
    ${l}
    ${S}
    ${v.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${a}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:s?s(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:h}),getShaderSource:b}},Gv=(e,t,n,s)=>{let u=e.length>2,l=je(n[3]),d=je(n[2]),p=R.size(n)/l/d,o=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/l],r=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/l],i=[n[0],n[1],n[2],n[3]/l],a=[{type:12,data:p},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Wr(t,a),a.push(...ne(o,r,i));let c=(d-1)*t.strides[1]+r[1],h=m=>{let b=ee("output",e[0].dataType,i.length,l),x=We(b.type.tensor),v=Hr(t,b.type.value,x),w=F("x",e[0].dataType,o.length,l),S=F("w",e[1].dataType,r.length,l),O=[w,S];u&&O.push(F("b",e[2].dataType,e[2].dims,l));let E=u?"value += b[output_channel];":"",A=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Kr(t,A),`
  ${m.registerUniforms(A).declareVariables(...O,b)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${d}u;
    let col = (index1 % width1) * ${d}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${w.type.value}, ${c}>;
    var values: array<${b.type.value}, ${d}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${r[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${c}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${w.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${w.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${r[1]}; w_width++) {
          let w_val = ${S.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${d}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${d}u; i++) {
      var value = values[i];
      ${E}
      ${v}
      ${b.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${l};${d};${c};${r[0]};${r[1]}`,inputDependencies:u?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:a}),getShaderSource:h}}}),Lf,Ai,Vf,ki,su,Aa,Uf,qf,uu,vS=N(()=>{"use strict";ue(),yS(),_S(),Lu(),wS(),Yr(),Fu(),mr(),Lf=(e,t,n,s,u,l)=>{let d=e[0],p=e.slice(l?1:2,l?3:4),o=p.length,r=t[0],i=t.slice(2).map((c,h)=>c+(c-1)*(n[h]-1)),a=p.map((c,h)=>c+s[h]+s[h+o]).map((c,h)=>Math.floor((c-i[h]+u[h])/u[h]));return a.splice(0,0,d),a.splice(l?3:1,0,r),a},Ai=[2,3,1,0],Vf=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],s=e[1].dims[1]*t.group;if(n!==s)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let u=e[0].dims.length-2;if(t.dilations.length!==u)throw new Error(`dilations should be ${u}D`);if(t.strides.length!==u)throw new Error(`strides should be ${u}D`);if(t.pads.length!==u*2)throw new Error(`pads should be ${u*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},ki=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let l=2;l<t[1].dims.length;++l)n[l-2]===0&&(n[l-2]=t[1].dims[l]);let s=e.pads.slice();Wi.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,s,e.format==="NHWC",e.autoPad);let u=Object.assign({},e);return Object.assign(u,{kernelShape:n,pads:s}),u},su=e=>{let t=Bu(e),n=e.format,s=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],u=e.dilations,l=e.group,d=e.kernel_shape,p=e.pads,o=e.strides,r=e.w_is_const();return{autoPad:s,format:n,dilations:u,group:l,kernelShape:d,pads:p,strides:o,wIsConst:r,...t,cacheKey:`${e.format};${t.activation};`}},Aa=(e,t,n,s)=>{let u=n.format==="NHWC",l=Lf(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,u);if(n.group!==1){let A=[t[0]];if(u){let k=e.kernelCustomData.wT??e.compute(ht(t[1],Ai),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=k),A.push(k)}else A.push(t[1]);t.length===3&&A.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&u&&t[1].dims[0]===n.group&&t[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?e.compute(Gv(A,n,l,s),{inputs:A}):e.compute(qv(A,n,l,s),{inputs:A});return}let d=t.length===3,p=t[0].dims[u?1:2],o=t[0].dims[u?2:3],r=t[0].dims[u?3:1],i=t[1].dims[2],a=t[1].dims[3],c=l[u?1:2],h=l[u?2:3],m=l[u?3:1],b=u&&i===p&&a===o&&n.pads[0]===0&&n.pads[1]===0;if(b||i===1&&a===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let A=l[0],k,I,M,q=[];if(u){let C=e.kernelCustomData.wT??e.compute(ht(t[1],Ai),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=C),b){let B=p*o*r;k=t[0].reshape([1,A,B]),I=C.reshape([1,B,m]),M=[1,A,m]}else k=t[0].reshape([A,p*o,r]),I=C.reshape([1,r,m]),M=[A,c*h,m];q.push(k),q.push(I)}else k=t[0].reshape([A,r,p*o]),I=t[1].reshape([1,m,r]),M=[A,m,c*h],q.push(I),q.push(k);d&&q.push(t[2]);let J=M[2],K=q[0].dims[q[0].dims.length-1];J<8&&K<8?e.compute(ju(q,n,l,M,u,s),{inputs:q}):e.compute(Xi(q,n,l,M,u,s),{inputs:q});return}let x=!0,v=e.kernelCustomData.wT??e.compute(ht(t[1],Ai),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=v);let w=[t[0],v];d&&w.push(t[2]);let S=u?c*h:m,O=u?m:c*h,E=i*a*r;e.compute(Lv(w,n,l,S,O,E,d,x,s),{inputs:w})},Uf=(e,t)=>{let n=t.format==="NHWC",s=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&s.push(e.inputs[2]);let u=[0,t.pads[0],0,t.pads[1]],l=[1].concat(t.strides),d=[1].concat(t.dilations),p=[1].concat(t.kernelShape),o=ki({...t,pads:u,strides:l,dilations:d,kernelShape:p},s);Aa(e,s,o,r=>n?[r[0],r[2],r[3]]:[r[0],r[1],r[3]])},qf=(e,t,n)=>{let s=n.format==="NHWC"?"channelsLast":"channelsFirst",u=ki(n,t),l=n.autoPad==="NOTSET"?n.pads:n.autoPad,d=Vv(t[0].dims,t[1].dims,n.strides,n.dilations,l,!1,s);e.compute(Uv(t,u,d.outShape,[d.filterDepth,d.filterHeight,d.filterWidth],[d.padInfo.front,d.padInfo.top,d.padInfo.left],s))},uu=(e,t)=>{if(Vf(e.inputs,t),e.inputs[0].dims.length===3)Uf(e,t);else if(e.inputs[0].dims.length===5)qf(e,e.inputs,t);else{let n=ki(t,e.inputs);Aa(e,e.inputs,n)}}}),Hv,xS=N(()=>{"use strict";ae(),Wt(),ue(),le(),Hv=(e,t,n)=>{let s=e.length>2,u=t.outputShape,l=t.format==="NHWC",d=t.group,p=e[1].dims,o=p[2]/d,r=p[3],i=l?je(o):1,a=l&&r===1&&o>=4,c=a?Math.floor(o/4)*4:Math.floor(o/i)*i,h=o-c,m=l?je(r):1,b=l?r===1?i:m:1,x=R.size(u)/m,v=[Math.ceil(x/64),1,1];we("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${v}`);let w=["rank","rank"],S=[t.strides[0],t.strides[1]],O=[t.kernelShape[l?1:2],t.kernelShape[l?2:3]],E=[t.dilations[0],t.dilations[1]],A=[O[0]+(t.dilations[0]<=1?0:(t.kernelShape[l?1:2]-1)*(t.dilations[0]-1)),O[1]+(t.dilations[1]<=1?0:(t.kernelShape[l?2:3]-1)*(t.dilations[1]-1))],k=[A[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),A[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],I=[{type:12,data:x},{type:12,data:S},{type:12,data:O},{type:12,data:E},{type:12,data:A},{type:6,data:k},{type:12,data:c},{type:12,data:o},{type:12,data:r},...ne(e[0].dims,e[1].dims)];s&&(I.push(...ne(e[2].dims)),w.push("rank")),I.push(...ne(u));let M=q=>{let J=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:S.length},{name:"filter_dims",type:"u32",length:O.length},{name:"dilations",type:"u32",length:O.length},{name:"effective_filter_dims",type:"u32",length:A.length},{name:"pads",type:"i32",length:k.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],K=We(e[0].dataType),C=l?1:2,B=l?2:3,$=l?3:1,z=F("W",e[1].dataType,e[1].dims.length,b),G=F("Dy",e[0].dataType,e[0].dims.length,i),oe=[G,z];s&&oe.push(F("bias",e[2].dataType,[u[$]].length,m));let U=ee("result",e[0].dataType,u.length,m),ie=()=>{let X="";if(a)i===4?X+=`
        let xValue = ${G.getByOffset("x_offset")};
        let wValue = ${z.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:i===2?X+=`
          dotProd = dotProd + dot(vec4<${K}>(${G.getByOffset("x_offset")}, ${G.getByOffset("x_offset + 1u")}), vec4<${K}>(${z.getByOffset("w_offset")}, ${z.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:i===1&&(X+=`
          dotProd = dotProd + dot(vec4<${K}>(${G.getByOffset("x_offset")}, ${G.getByOffset("x_offset + 1u")}, ${G.getByOffset("x_offset + 2u")}, ${G.getByOffset("x_offset + 3u")}), vec4<${K}>(${z.getByOffset("w_offset")}, ${z.getByOffset("w_offset + 1u")}, ${z.getByOffset("w_offset + 2u")}, ${z.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(X+=`
                  let xValue = ${l?G.getByOffset(`${G.indicesToOffset(`${G.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${i}`):G.get("batch","inputChannel","idyR","idyC")};
        `,i===1)X+=`
          let w_offset = ${z.indicesToOffset(`${z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${z.getByOffset(`w_offset / ${b}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let L=0;L<i;L++)X+=`
            let wValue${L} = ${z.getByOffset(`${z.indicesToOffset(`${z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${L}, wOutChannel)`)} / ${b}`)};
            dotProd = dotProd + xValue[${L}] * wValue${L};`;return X},V=()=>{if(h===0)return"";if(!a)throw new Error(`packInputAs4 ${a} is not true.`);let X="";if(i===1){X+="dotProd = dotProd";for(let L=0;L<h;L++)X+=`
            + ${G.getByOffset(`x_offset + ${L}`)} * ${z.getByOffset(`w_offset + ${L}`)}`;X+=";"}else if(i===2){if(h!==2)throw new Error(`Invalid inputChannelsRemainder ${h}.`);X+=`
          let xValue = ${G.getByOffset("x_offset")};
          let wValue = ${z.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return X},W=`
            let outputIndices = ${U.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${U.indicesGet("outputIndices",0)};
            let d1 = ${U.indicesGet("outputIndices",$)};
            let r = ${U.indicesGet("outputIndices",C)};
            let c = ${U.indicesGet("outputIndices",B)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${U.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${K}(dyRCorner) + ${K}(wR)) / ${K}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${K}(uniforms.Dy_shape[${C}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${K}(dyCCorner) + ${K}(wC)) / ${K}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${K}(uniforms.Dy_shape[${B}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${a?`
                var x_offset = ${G.indicesToOffset(`${G.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${i};
                var w_offset = ${z.indicesToOffset(`${z.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${b};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${a?4:i}) {
                  ${ie()}
                  inputChannel = inputChannel + ${a?4:i};
                }
                ${V()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${s?` + bias[d1 / ${m}]`:""};
            ${U.setByOffset("global_idx","value")};
          `;return`
    ${q.registerUniforms(J).declareVariables(...oe,U)}
      ${q.mainStart()}
      ${q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${W}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${i}${b}${m}${a}${h}`,inputDependencies:w},getRunData:()=>({dispatchGroup:{x:v[0],y:v[1],z:v[2]},outputs:[{dims:n?n(u):u,dataType:e[0].dataType}],programUniforms:I}),getShaderSource:M}}}),Gf,Hf,Wf,ka,Wv,Kf,Da,Xf,Kv,$S=N(()=>{"use strict";xS(),Yr(),mr(),Gf=(e,t,n,s,u,l)=>(e-1)*t+n+(s-1)*u+1-l,Hf=(e,t,n,s,u)=>{let l=Math.floor(e/2);t==="SAME_UPPER"?(n[s]=l,n[u]=e-l):t==="SAME_LOWER"&&(n[s]=e-l,n[u]=l)},Wf=(e,t,n,s,u,l,d,p,o,r)=>{let i=e.length-2,a=r.length===0;o.length<i&&o.push(...Array(i-o.length).fill(0));let c=e[0],h=t[p?3:1]*u;for(let m=0,b=e.length-i-(p?1:0);m<i;++m,++b){let x=e[b],v=a?x*d[m]:r[m],w=Gf(x,d[m],l[m],t[b],n[m],v);Hf(w,s,l,m,m+i),a&&r.push(d[m]*(x-1)+o[m]+(t[b]-1)*n[m]+1-l[m]-l[m+i])}r.splice(0,0,c),r.splice(p?3:1,0,h)},ka=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((a,c)=>a*c,1)===0){n.length=0;for(let a=2;a<t[1].dims.length;++a)n.push(t[1].dims[a])}let s=e.format==="NHWC";n.splice(0,0,t[1].dims[0]),n.splice(s?3:1,0,t[1].dims[1]);let u=e.pads.slice(),l=e.outputShape.slice(),d=e.outputPadding.slice(),p=t[0].dims,o=e.dilations.slice();if(o.reduce((a,c)=>a+c,0)===0){let a=t[0].dims.length-2;o=new Array(a).fill(1)}let r=e.strides.slice();if(r.reduce((a,c)=>a+c,0)===0){let a=t[0].dims.length-2;r=new Array(a).fill(1)}Wf(p,n,o,e.autoPad,e.group,u,r,s,d,l);let i=Object.assign({},e);return Object.assign(i,{kernelShape:n,pads:u,outputPadding:d,outputShape:l,dilations:o,strides:r}),i},Wv=e=>{let t=Bu(e),n=e.format,s=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],u=e.dilations,l=e.group??1,d=e.kernelShape,p=e.pads,o=e.strides,r=e.wIsConst(),i=e.outputPadding,a=e.outputShape;return{autoPad:s,format:n,dilations:u,group:l,kernelShape:d,outputPadding:i,outputShape:a,pads:p,strides:o,wIsConst:r,...t,cacheKey:`${e.format};${t.activation};`}},Kf=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],s=e[1].dims[0];if(n!==s)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let u=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==u))throw new Error("invalid bias");let l=e[0].dims.length-2;if(t.dilations.reduce((d,p)=>d+p,0)>0&&t.dilations.length!==l)throw new Error(`dilations should be ${l}D`);if(t.strides.reduce((d,p)=>d+p,0)>0&&t.strides.length!==l)throw new Error(`strides should be ${l}D`);if(t.pads.reduce((d,p)=>d+p,0)>0&&t.pads.length!==l*2)throw new Error(`pads should be ${l*2}D`);if(t.outputPadding.length!==l&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${l}D`);if(t.kernelShape.reduce((d,p)=>d+p,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Da=(e,t,n,s)=>{let u=e.kernelCustomData.wT??e.compute(ht(t[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=u);let l=[t[0],u];t.length===3&&l.push(t[2]),e.compute(Hv(l,n,s),{inputs:l})},Xf=(e,t)=>{let n=t.format==="NHWC",s=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&s.push(e.inputs[2]);let u=t.kernelShape;(u.length===0||u[0]===0)&&(u=[e.inputs[1].dims[2]]);let l=t.dilations;(l.length===0||l[0]===0)&&(l=[1]);let d=t.strides;(d.length===0||d[0]===0)&&(d=[1]);let p=t.pads;p.length===0&&(p=[0,0]),p=[0,p[0],0,p[1]],d=[1].concat(d),l=[1].concat(l),u=[1].concat(u);let o=t.outputPadding;o=[0].concat(o);let r=ka({...t,pads:p,strides:d,dilations:l,kernelShape:u,outputPadding:o},s);Da(e,s,r,i=>n?[i[0],i[2],i[3]]:[i[0],i[1],i[3]])},Kv=(e,t)=>{if(Kf(e.inputs,t),e.inputs[0].dims.length===3)Xf(e,t);else{let n=ka(t,e.inputs);Da(e,e.inputs,n)}}}),Zf,Xv,Zv,TS=N(()=>{"use strict";ae(),ue(),Fe(),le(),Zf=(e,t,n,s)=>{let u=R.size(t),l=t.length,d=F("input",e,l),p=ee("output",e,l),o=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),r=R.normalizeAxis(o,l),i=a=>{let c=` i32(${d.indicesGet("inputIndices","uniforms.axis")}) `,h=te("uniforms.input_shape","uniforms.axis",l),m=s.reverse?c+(s.exclusive?" + 1":""):"0",b=s.reverse?h:c+(s.exclusive?"":" + 1");return`
                ${a.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(d,p)}
                ${a.mainStart()}
                  ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${p.offsetToIndices("global_idx")};
                  var sum = ${p.type.value}(0);
                  let first : i32 = ${m};
                  let last : i32 = ${b};
                  for (var i : i32 = first; i < last; i++) {
                    ${d.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${d.getByIndices("inputIndices")};
                  }
                  ${p.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:s.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:[{type:12,data:u},{type:12,data:r},...ne(t,t)]}),getShaderSource:i}},Xv=(e,t)=>{let n=e.inputs[0].dims,s=e.inputs[0].dataType,u=e.inputs[1];e.compute(Zf(s,n,u,t),{inputs:[0]})},Zv=e=>{let t=e.exclusive===1,n=e.reverse===1;return Ie({exclusive:t,reverse:n})}}),Jf,Yf,Qf,Jv,Yv,IS=N(()=>{"use strict";ae(),ue(),Fe(),le(),Jf=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Yf=(e,t,n,s)=>{let u=[];u.push(`fn perm(i: ${s.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let l=0;l<t;++l)u.push(n.indicesSet("a",e[l],`i[${l}]`));return u.push("return a;}"),u.join(`
`)},Qf=(e,t)=>{let n,s,u,l,d,p,o=t.format==="NHWC",r=t.blocksize,i=t.mode==="DCR";o?([n,s,u,l]=e.dims,d=i?[n,s,u,r,r,l/r**2]:[n,s,u,l/r**2,r,r],p=i?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,s,u,l]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],d=i?[n,r,r,l/r**2,s,u]:[n,l/r**2,r,r,s,u],p=i?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let a=e.reshape(d),c=a.dims.length,h=e.dataType,m=F("a",h,c),b=ee("output",h,c),x=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(m,b)}

  ${Yf(p,c,m,b)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${b.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${b.setByOffset("global_idx",m.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:v=>{let w=o?[n,s*r,u*r,l/r**2]:[n,l/r**2,s*r,u*r],S=R.size(w),O=a.dims,E=R.sortBasedOnPerm(O,p);return{outputs:[{dims:w,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:[{type:12,data:S},...ne(O,E)]}},getShaderSource:x}},Jv=(e,t)=>{Jf(e.inputs),e.compute(Qf(e.inputs[0],t))},Yv=e=>Ie({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Ut,Nn,Di,Na,rr,em,tm,rm,Ca,za,Ra,nm,im,Ba,om,Qv,e1,SS=N(()=>{"use strict";ae(),ue(),Fe(),le(),Ut=256,Nn=512,Di=2*Math.PI,Na=e=>{let t=[],n=e;for(let s of[4,2,3,5])for(;n%s===0;)t.push(s),n/=s;return n===1?t:void 0},rr=e=>{let t=e.toPrecision(9);return/[.eE]/.test(t)?t:`${t}.0`},em=(e,t,n,s,u)=>{let l=n/e,d=Nn-s,p=r=>`smem[${d}u + base + ${r*t}u]`,o=`  for (var t = local_idx; t < ${l}u; t += ${Ut}u) {
`;o+=`    let twiddleIndex = t % ${t}u;
    let angleUnit = f32(twiddleIndex);
`,o+=`    var leg: array<vec2<f32>, 5>;
`;for(let r=0;r<e;r++){let i=`${s}u + t + ${r*l}u`;if(r===0)o+=`    leg[0] = smem[${i}];
`;else{let a=u*Di*r/(e*t);o+=`    { let a = ${rr(a)} * angleUnit; leg[${r}] = cmul(smem[${i}], vec2<f32>(cos(a), sin(a))); }
`}}if(o+=`    let base = (t / ${t}u) * ${t*e}u + twiddleIndex;
`,e===2)o+=`    ${p(0)} = leg[0] + leg[1];
    ${p(1)} = leg[0] - leg[1];
`;else if(e===4){let r=u<0?"vec2<f32>(oddDiff.y, -oddDiff.x)":"vec2<f32>(-oddDiff.y, oddDiff.x)";o+=`    let evenSum = leg[0] + leg[2]; let evenDiff = leg[0] - leg[2];
`,o+=`    let oddSum = leg[1] + leg[3]; let oddDiff = leg[1] - leg[3];
`,o+=`    let oddRot = ${r};
`,o+=`    ${p(0)} = evenSum + oddSum;
    ${p(1)} = evenDiff + oddRot;
`,o+=`    ${p(2)} = evenSum - oddSum;
    ${p(3)} = evenDiff - oddRot;
`}else for(let r=0;r<e;r++){let i=["leg[0]"];for(let a=1;a<e;a++){let c=u*Di*(a*r)/e,h=rr(Math.cos(c)),m=rr(Math.sin(c));i.push(`vec2<f32>(leg[${a}].x*${h} - leg[${a}].y*${m}, leg[${a}].x*${m} + leg[${a}].y*${h})`)}o+=`    ${p(r)} = ${i.join(" + ")};
`}return`${o}  }
  workgroupBarrier();
`},tm=(e,t,n)=>{let s="",u=1,l=0;for(let d of e)s+=em(d,u,t,l,n),u*=d,l=Nn-l;return{code:s,resultOffset:l}},rm=(e,t,n,s,u)=>{let l=e.dims,d=l.length,p=l[d-1],o=l[t],r=n&&s?(o-1)*2:o;u!==void 0&&(r=u);let i=n&&s?1:2,a=s&&!n?Math.floor(r/2)+1:r,c=l.slice();c[t]=a,c[d-1]=i;let h=1;for(let b=t+1;b<d-1;b++)h*=l[b];let m=R.size(l)/p/o;return{dataType:e.dataType,outputDims:c,length:r,signalLength:o,inner:h,batch:m,inputComponents:p,outputComponents:i,outputLength:a,inverse:n,onesided:s}},Ca=(e,t)=>[t,e.length,e.inputComponents,e.outputComponents,e.inverse,e.onesided].join(";"),za=e=>[{type:12,data:e.batch},{type:12,data:e.signalLength},{type:12,data:e.inner},{type:12,data:e.outputLength}],Ra=(e,t,n)=>e.registerUniform("batch","u32").registerUniform("signalLength","u32").registerUniform("inner","u32").registerUniform("outputLength","u32").declareVariables(t,n),nm=e=>{let{dataType:t,length:n,inputComponents:s,outputComponents:u,inverse:l,onesided:d}=e,p=He(t),o=l?1:-1,r=l?1/n:1,i=Na(n),a=c=>{let h=F("x",t,[1]),m=ee("y",t,[1]),b=E=>{let A=`inBase + (${E}) * uniforms.inner * ${s}u`,k=`f32(${h.getByOffset(A)})`,I=s===2?`f32(${h.getByOffset(`${A} + 1u`)})`:"0.0";return`vec2<f32>(${k}, ${I})`},x;if(l&&d){let E=Math.floor(n/2)+1,A=n%2===0?`select(provided, provided - 1u, provided == ${E}u)`:"provided";x=`
    let provided = min(uniforms.signalLength, ${E}u);
    for (var i = local_idx; i < ${n}u; i += ${Ut}u) {
      if (i < provided) { smem[i] = ${b("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();
    for (var k = local_idx + 1u; k < ${A}; k += ${Ut}u) {
      let h = smem[k];
      smem[${n}u - k] = vec2<f32>(h.x, -h.y);
    }
    workgroupBarrier();`}else x=`
    let loadCount = min(uniforms.signalLength, ${n}u);
    for (var i = local_idx; i < ${n}u; i += ${Ut}u) {
      if (i < loadCount) { smem[i] = ${b("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();`;let{code:v,resultOffset:w}=tm(i,n,o),S=r===1?`smem[${w}u + i]`:`smem[${w}u + i] * ${rr(r)}`,O=u===2?m.setByOffset("off + 1u",`${p}(v.y)`):"";return`
  ${Ra(c,h,m)}
  var<workgroup> smem: array<vec2<f32>, ${2*Nn}>;
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${c.mainStart(Ut)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${s}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${u}u;
    ${x}
${v}    for (var i = local_idx; i < uniforms.outputLength; i += ${Ut}u) {
      let v = ${S};
      let off = outBase + i * uniforms.inner * ${u}u;
      ${m.setByOffset("off",`${p}(v.x)`)}
      ${O}
    }
  }`};return{name:"DFT",shaderCache:{hint:Ca(e,"fft"),inputDependencies:["type"]},getShaderSource:a,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:za(e),dispatchGroup:{x:e.batch}})}},im=e=>{let{dataType:t,length:n,inputComponents:s,outputComponents:u,inverse:l,onesided:d}=e,p=He(t),o=l?1:-1,r=l?1/n:1,i=a=>{let c=F("x",t,[1]),h=ee("y",t,[1]),m=S=>{let O=`inBase + (${S}) * uniforms.inner * ${s}u`,E=`f32(${c.getByOffset(O)})`,A=s===2?`f32(${c.getByOffset(`${O} + 1u`)})`:"0.0";return`vec2<f32>(${E}, ${A})`},b=l&&d?`fn spectrum(inBase: u32, k: u32) -> vec2<f32> {
    let provided = min(uniforms.signalLength, ${Math.floor(n/2)+1}u);
    if (k < provided) { return ${m("k")}; }
    let m = ${n}u - k;
    if (m < provided) {
      let h = ${m("m")};
      return vec2<f32>(h.x, -h.y);
    }
    return vec2<f32>(0.0, 0.0);
  }`:`fn spectrum(inBase: u32, n: u32) -> vec2<f32> {
    if (n < uniforms.signalLength) { return ${m("n")}; }
    return vec2<f32>(0.0, 0.0);
  }`,x=`
      let angle = ${rr(o*Di)} * f32(knMod) / ${rr(n)};
      acc += cmul(spectrum(inBase, n), vec2<f32>(cos(angle), sin(angle)));
      knMod += k;
      if (knMod >= ${n}u) { knMod -= ${n}u; }`,v=u===2?h.setByOffset("off + 1u",`${p}(v.y)`):"",w=r===1?"acc":`acc * ${rr(r)}`;return`
  ${Ra(a,c,h)}
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${b}
  ${a.mainStart(Ut)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${s}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${u}u;
    for (var k = local_idx; k < uniforms.outputLength; k += ${Ut}u) {
      var acc = vec2<f32>(0.0, 0.0);
      var knMod = 0u;
      for (var n = 0u; n < ${n}u; n++) {${x}
      }
      let v = ${w};
      let off = outBase + k * uniforms.inner * ${u}u;
      ${h.setByOffset("off",`${p}(v.x)`)}
      ${v}
    }
  }`};return{name:"DFT",shaderCache:{hint:Ca(e,"direct"),inputDependencies:["type"]},getShaderSource:i,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:za(e),dispatchGroup:{x:e.batch}})}},Ba=e=>{if(!e||e.dataType===0)return;if(R.size(e.dims)!==1)throw new Error("DFT optional scalar inputs must have exactly 1 element.");if(e.dataType===6)return e.getInt32Array()[0];let t=Number(e.getBigInt64Array()[0]);if(!Number.isSafeInteger(t))throw new Error("DFT optional scalar inputs are out of JavaScript safe integer range.");return t},om=e=>{if(!e||e.length<1)throw new Error("DFT requires at least 1 input.");let t=e[0].dims;if(t.length<2)throw new Error("DFT input must have at least 2 dimensions.");let n=t[t.length-1];if(n!==1&&n!==2)throw new Error("DFT input's innermost dimension must be 1 (real) or 2 (complex).")},Qv=(e,t)=>{om(e.inputs);let n=e.inputs[0],s=n.dims.length,u=t.inverse!==0,l=t.onesided!==0,d=Ba(e.inputs[1]);if(d!==void 0&&d<=0)throw new Error("dft_length must be greater than zero.");let p=R.normalizeAxis(Ba(e.inputs[2])??t.axis,s);if(p===s-1)throw new Error("DFT axis must refer to a signal dimension, not the innermost (real/imaginary) dimension.");if(u&&l&&n.dims[s-1]!==2)throw new Error("Inverse one-sided DFT (IRFFT) requires complex-valued input (innermost dimension 2).");let o=rm(n,p,u,l,d);if(o.length<=0)throw new Error(`Invalid DFT length: ${o.length}`);let r=o.length<=Nn&&Na(o.length)!==void 0?nm(o):im(o);e.compute(r,{inputs:[0]})},e1=e=>Ie({axis:e.axis??1,inverse:e.inverse??0,onesided:e.onesided??0})}),Ni,Cn,Ma,am,sm,um,lm,ja,dm,t1,r1,OS=N(()=>{"use strict";ae(),ue(),Fe(),le(),Ni="[a-zA-Z]|\\.\\.\\.",Cn="("+Ni+")+",Ma="^"+Cn+"$",am="("+Cn+",)*"+Cn,sm="^"+am+"$",um=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let n=this.symbolToIndices.get(e);n===void 0?n=[t]:n.push(t),this.symbolToIndices.set(e,n)}},lm=class{constructor(e,t){var u;this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,s]=t.includes("->")?t.split("->",2):[t,""];if(!n.match(RegExp(sm)))throw new Error("Invalid LHS term");if(n.split(",").forEach((l,d)=>{let p=e[d].dims.slice();if(!l.match(RegExp(Ma)))throw new Error("Invalid LHS term");let o=this.processTerm(l,!0,p,d);this.lhs.push(o)}),s==="")s+=[...this.symbolToInfo.entries()].filter(([l,d])=>d.count===1||l==="...").map(([l])=>l).join("");else if(!s.match(RegExp(Cn)))throw new Error("Invalid RHS");(u=s.match(RegExp(Ni,"g")))==null||u.forEach(l=>{if(l==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let d=this.symbolToInfo.get(l);if(d===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(d.dimValue)}}),this.rhs=this.processTerm(s,!1,this.outputDims)}addSymbol(e,t,n){let s=this.symbolToInfo.get(e);if(s!==void 0){if(s.dimValue!==t&&s.count!==1)throw new Error("Dimension mismatch");s.count++,s.inputIndices.push(n)}else s={count:1,dimValue:t,inputIndices:[n]};this.symbolToInfo.set(e,s)}processTerm(e,t,n,s=-1){let u=n.length,l=!1,d=[],p=0;if(!e.match(RegExp(Ma))&&!t&&e!=="")throw new Error("Invalid LHS term");let o=e.match(RegExp(Ni,"g")),r=new um(s);return o==null||o.forEach((i,a)=>{if(i==="..."){if(l)throw new Error("Only one ellipsis is allowed per input term");l=!0;let c=u-o.length+1;if(c<0)throw new Error("Ellipsis out of bounds");if(d=n.slice(p,p+c),this.hasEllipsis){if(this.ellipsisDims.length!==d.length||this.ellipsisDims.toString()!==d.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=d;else throw new Error("Ellipsis must be specified in the LHS");for(let h=0;h<d.length;h++){let m=String.fromCharCode(48+h);r.addSymbol(m,a+h),this.addSymbol(m,n[p++],s)}}else r.addSymbol(i,a+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(i,n[p++],s)}),r}},ja=e=>e+"_max",dm=(e,t,n,s)=>{let u=e.map(r=>r.length).map((r,i)=>F(`input${i}`,t,r)),l=R.size(s),d=ee("output",t,s.length),p=[...n.symbolToInfo.keys()].filter(r=>!n.rhs.symbolToIndices.has(r)),o=r=>{let i=[],a="var prod = 1.0;",c="var sum = 0.0;",h="sum += prod;",m=[],b=[],x=[],v=[],w=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((O,E)=>{var A;if(n.rhs.symbolToIndices.has(E)){let k=(A=n.rhs.symbolToIndices.get(E))==null?void 0:A[0];k!==void 0&&n.lhs.forEach((I,M)=>{if(O.inputIndices.includes(M)){let q=I.symbolToIndices.get(E);if(q===void 0)throw new Error("Invalid symbol error");q.forEach(J=>{i.push(`${u[M].indicesSet(`input${M}Indices`,J,d.indicesGet("outputIndices",k))}`)})}})}else n.lhs.forEach((k,I)=>{if(O.inputIndices.includes(I)){let M=k.symbolToIndices.get(E);if(M===void 0)throw new Error("Invalid symbol error");M.forEach(q=>{m.push(`${u[I].indicesSet(`input${I}Indices`,q,`${E}`)}`)}),v.push(`prod *= ${u[I].getByIndices(`input${I}Indices`)};`)}}),b.push(`for(var ${E}: u32 = 0; ${E} < uniforms.${ja(E)}; ${E}++) {`),x.push("}")});let S=w?[...i,`let sum = ${u.map((O,E)=>O.getByIndices(`input${E}Indices`)).join(" * ")};`]:[...i,c,...b,...m,a,...v,h,...x];return`
            ${r.registerUniforms(p.map(O=>({name:`${ja(O)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...u,d)}

            ${r.mainStart()}
            ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${d.offsetToIndices("global_idx")};
            ${u.map((O,E)=>`var input${E}Indices: ${u[E].type.indices};`).join(`
`)}
            ${S.join(`
`)};
            ${d.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let r=p.filter(a=>n.symbolToInfo.has(a)).map(a=>{var c;return{type:12,data:((c=n.symbolToInfo.get(a))==null?void 0:c.dimValue)||0}});r.push({type:12,data:l});let i=e.map((a,c)=>[...ne(a)]).reduce((a,c)=>a.concat(c),r);return i.push(...ne(s)),{outputs:[{dims:s,dataType:t}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:i}},getShaderSource:o}},t1=(e,t)=>{let n=new lm(e.inputs,t.equation),s=n.outputDims,u=e.inputs.map((l,d)=>l.dims);e.compute(dm(u,e.inputs[0].dataType,n,s))},r1=e=>{let t=e.equation.replace(/\s+/g,"");return Ie({equation:t})}}),pm,Fa,cm,hm,n1,ES=N(()=>{"use strict";ae(),ue(),le(),pm=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),s=n.length<t.length?0:n.length-t.length,u=t.length<n.length?0:t.length-n.length;for(;s<n.length&&u<t.length;++s,++u)if(n[s]!==t[u]&&n[s]!==1&&t[u]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Fa=(e,t)=>{let n=e.length-t.length,s=[];for(let u=0;u<n;++u)s.push(e[u]);for(let u=0;u<t.length;++u)s.push(t[u]===1?e[u+n]:t[u]);return s},cm=(e,t)=>e.length>t.length?Fa(e,t):Fa(t,e),hm=e=>{let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),s=cm(t,n),u=e[0].dataType,l=u===9||R.size(t)===1,d=u===9||t.length>0&&t[t.length-1]%4===0?4:1,p=l||s.length>0&&s[s.length-1]%4===0?4:1,o=Math.ceil(R.size(s)/p),r=a=>{let c=F("input",u,t.length,d),h=ee("output",u,s.length,p),m;if(u===9){let b=(x,v,w="")=>`
          let outputIndices${v} = ${h.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${c.broadcastedIndicesToOffset(`outputIndices${v}`,h)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${x}[${v}] = ${w}(${c.getByOffset(`index${v}`)}[component${v}]);
        `;m=`
        let outputOffset = global_idx * ${p};
        var data = vec4<u32>(0);
        ${b("data",0,"u32")}
        ${b("data",1,"u32")}
        ${b("data",2,"u32")}
        ${b("data",3,"u32")}
        ${h.setByOffset("global_idx","data")}
      }`}else m=`
        let outputIndices = ${h.offsetToIndices(`global_idx * ${p}`)};
        let inputOffset = ${c.broadcastedIndicesToOffset("outputIndices",h)};
        let data = ${h.type.value}(${c.getByOffset(`inputOffset / ${d}`)});
        ${h.setByOffset("global_idx","data")}
      }`;return`
    ${a.registerUniform("vec_size","u32").declareVariables(c,h)}
    ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${m}`},i=[{type:12,data:o},...ne(t,s)];return{name:"Expand",shaderCache:{hint:`${s.length};${d}${p}`,inputDependencies:["rank"]},getShaderSource:r,getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:i})}},n1=e=>{pm(e.inputs),e.compute(hm(e.inputs),{inputs:[0]})}}),fm,i1,PS=N(()=>{"use strict";ae(),ue(),le(),Ru(),fm=e=>{let t=e[0].dataType,n=R.size(e[0].dims),s=R.size(e[1].dims),u=s%4===0,l=d=>{let p=F("x",t,[1],4),o=F("bias",t,[1],4),r=ee("y",t,[1],4),i=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],a=h=>`
      let bias${h}_offset: u32 = (global_idx * 4 + ${h}) % uniforms.bias_size;
      let bias${h} = ${o.getByOffset(`bias${h}_offset / 4`)}[bias${h}_offset % 4];`,c=u?`
      let bias = ${o.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${a(0)}${a(1)}${a(2)}${a(3)}
      let bias = ${p.type.value}(bias0, bias1, bias2, bias3);`;return`${d.registerUniforms(i).declareVariables(p,o,r)}

    ${nu(He(t))}

    ${d.mainStart(cn)}
      ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${p.getByOffset("global_idx")};
      ${c}
      let x_in = x + bias;
      ${r.setByOffset("global_idx",iu("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${u}`,inputDependencies:["type","type"]},getShaderSource:l,getRunData:d=>({outputs:[{dims:d[0].dims,dataType:d[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:s}],dispatchGroup:{x:Math.ceil(n/cn/4)}})}},i1=e=>{e.inputs.length<2||R.size(e.inputs[1].dims)===0?xv(e):e.compute(fm(e.inputs))}}),mm,gm,o1,a1,AS=N(()=>{"use strict";ae(),ue(),Fe(),le(),mm=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},gm=(e,t)=>{let n=e[0].dims,s=e[1].dims,u=n.length,l=R.normalizeAxis(t.axis,u),d=n.slice(0);d.splice(l,1,...s);let p=n[l],o=e[0].dataType===9?4:1,r=Math.ceil(R.size(d)/o),i=[{type:12,data:r},{type:6,data:p},{type:12,data:l},...ne(e[0].dims,e[1].dims,d)],a=c=>{let h=F("data",e[0].dataType,e[0].dims.length,o),m=F("inputIndices",e[1].dataType,e[1].dims.length),b=ee("output",e[0].dataType,d.length,o),x=w=>{let S=s.length,O=`var indicesIndices${w}  = ${m.type.indices}(0);`;for(let E=0;E<S;E++)O+=`${S>1?`indicesIndices${w}[${E}]`:`indicesIndices${w}`} = ${d.length>1?`outputIndices${w}[uniforms.axis + ${E}]`:`outputIndices${w}`};`;O+=`
          var idx${w} = ${m.getByIndices(`indicesIndices${w}`)};
          if (idx${w} < 0) {
            idx${w} = idx${w} + uniforms.axisDimLimit;
          }
          var dataIndices${w} : ${h.type.indices};
        `;for(let E=0,A=0;E<u;E++)E===l?(O+=`${u>1?`dataIndices${w}[${E}]`:`dataIndices${w}`} = u32(idx${w});`,A+=S):(O+=`${u>1?`dataIndices${w}[${E}]`:`dataIndices${w}`} = ${d.length>1?`outputIndices${w}[${A}]`:`outputIndices${w}`};`,A++);return O},v;if(e[0].dataType===9){let w=(S,O,E="")=>`
          let outputIndices${O} = ${b.offsetToIndices(`outputOffset + ${O}u`)};
          ${x(O)};
          let offset${O} = ${h.indicesToOffset(`dataIndices${O}`)};
          let index${O} = offset${O} / 4u;
          let component${O} = offset${O} % 4u;
          ${S}[${O}] = ${E}(${h.getByOffset(`index${O}`)}[component${O}]);
        `;v=`
        let outputOffset = global_idx * ${o};
        var value = vec4<u32>(0);
        ${w("value",0,"u32")}
        ${w("value",1,"u32")}
        ${w("value",2,"u32")}
        ${w("value",3,"u32")}
        ${b.setByOffset("global_idx","value")}
      `}else v=`
      let outputIndices = ${b.offsetToIndices("global_idx")};
      ${x("")};
      let value = ${h.getByIndices("dataIndices")};
      ${b.setByOffset("global_idx","value")};
      `;return`
      ${c.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,m,b)}
      ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:i}),getShaderSource:a}},o1=e=>Ie({axis:e.axis}),a1=(e,t)=>{let n=e.inputs;mm(n),e.compute(gm(e.inputs,t))}}),bm,s1,u1,kS=N(()=>{"use strict";ae(),ue(),le(),bm=(e,t,n,s,u,l,d,p,o)=>{let r=[{type:12,data:l},{type:12,data:s},{type:12,data:u},{type:12,data:n},{type:12,data:d},{type:12,data:p},{type:12,data:o}],i=[l];r.push(...ne(t.dims,i));let a=c=>{let h=F("indices_data",t.dataType,t.dims.length),m=ee("input_slice_offsets_data",12,1,1),b=[h,m],x=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:u.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${c.registerUniforms(x).declareVariables(...b)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${u.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${n.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${u.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:r}),getShaderSource:a},{inputs:[t],outputs:[-1]})[0]},s1=(e,t)=>{let n=e.inputs,s=n[0].dims,u=n[0].dataType,l=n[1].dims,d=l[l.length-1],p=R.sizeToDimension(l,l.length-1),o=R.sizeFromDimension(s,t.batchDims+d),r=R.sizeToDimension(s,t.batchDims),i=R.sizeFromDimension(s,t.batchDims),a=p/r,c=new Array(d),h=o;for(let O=0;O<d;++O)c[d-1-O]=h,h*=s[t.batchDims+d-1-O];let m=bm(e,n[1],c,t.batchDims,s,p,a,i,d),b=t.batchDims+d;if(b>s.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let x=l.slice(0,-1).concat(s.slice(b)),v=R.size(x),w=[{type:12,data:v},{type:12,data:o},...ne(n[0].dims,m.dims,x)],S=O=>{let E=F("data",n[0].dataType,n[0].dims.length),A=F("slice_offsets",12,m.dims.length),k=ee("output",n[0].dataType,x.length);return`
          ${O.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(E,A,k)}
            ${O.mainStart()}
            ${O.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:x,dataType:u}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:w}),getShaderSource:S},{inputs:[n[0],m]})},u1=e=>({batchDims:e.batch_dims,cacheKey:""})}),ym,_m,l1,d1,DS=N(()=>{"use strict";ae(),ue(),Fe(),le(),ym=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=R.normalizeAxis(t.quantizeAxis,e[0].dims.length),s=t.blockSize,u=e[0],l=e[2],d=e.length===4?e[3]:void 0;if(l.dims.length!==u.dims.length||!u.dims.map((p,o)=>o===n?Math.ceil(p/s)===l.dims[o]:p===l.dims[o]).reduce((p,o)=>p&&o,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(d){if(d.dataType!==u.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(d.dims.length!==l.dims.length||!d.dims.map((p,o)=>p===l.dims[o]).reduce((p,o)=>p&&o,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},_m=(e,t)=>{let n=e[0].dims,s=e[1].dims,u=n.length,l=R.normalizeAxis(t.gatherAxis,u),d=R.normalizeAxis(t.quantizeAxis,u),p=n.slice(0);p.splice(l,1,...s);let o=R.size(p),r=e[2].dataType,i=e[0].dataType===22,a=[{type:12,data:o},{type:12,data:d},{type:12,data:l},{type:12,data:t.blockSize},...ne(...e.map((h,m)=>h.dims),p)],c=h=>{let m=F("data",e[0].dataType,e[0].dims.length),b=F("inputIndices",e[1].dataType,e[1].dims.length),x=F("scales",e[2].dataType,e[2].dims.length),v=e.length>3?F("zeroPoint",e[3].dataType,e[3].dims.length):void 0,w=ee("output",r,p.length),S=[m,b,x];v&&S.push(v);let O=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${h.registerUniforms(O).declareVariables(...S,w)}
        ${h.mainStart()}
        let output_indices = ${w.offsetToIndices("global_idx")};
        var indices_indices = ${b.type.indices}(0);
        ${s.length>1?`
          for (var i: u32 = 0; i < ${s.length}; i++) {
            let index = ${w.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${b.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${w.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${m.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${w.indicesGet("output_indices","i")};
          ${m.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${b.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[l]};
        }
        ${m.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${p.length}; i++) {
          let index = ${w.indicesGet("output_indices",`i + ${s.length} - 1`)};
          ${m.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${m.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${m.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${i?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${x.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${x.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${x.getByIndices("scale_indices")};
        ${v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${i?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${He(r)}(quantized_data - zero_point) * scale;
        ${w.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((h,m)=>m!==1).map(h=>h.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(h,m)=>"rank")},getRunData:()=>({outputs:[{dims:p,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:a}),getShaderSource:c}},l1=(e,t)=>{let n=e.inputs;ym(n,t),e.compute(_m(e.inputs,t))},d1=e=>Ie({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),wm,vm,p1,c1,NS=N(()=>{"use strict";ae(),ue(),Fe(),le(),wm=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},vm=(e,t)=>{let n=e[0].dims,s=e[0].dataType,u=n.length,l=e[1].dims,d=e[1].dataType,p=R.normalizeAxis(t.axis,u),o=n[p],r=l.slice(0),i=R.size(r),a=F("input",s,u),c=F("indicesInput",d,l.length),h=ee("output",s,r.length),m=[{type:12,data:i},{type:6,data:o},{type:12,data:p}];return m.push(...ne(n,l,r)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:m}),getShaderSource:b=>`
      ${b.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(a,c,h)}
      ${b.mainStart()}
      ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${h.offsetToIndices("global_idx")};

      var idx = ${c.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${a.type.indices}(outputIndices);
      ${a.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${a.getByIndices("inputIndices")};

      ${h.setByOffset("global_idx","value")};
  }`}},p1=e=>Ie({axis:e.axis}),c1=(e,t)=>{let n=e.inputs;wm(n),e.compute(vm(e.inputs,t))}}),xm,$m,h1,f1,CS=N(()=>{"use strict";ae(),ue(),le(),xm=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},$m=(e,t)=>{let n=e[0].dims.slice(),s=e[1].dims.slice(),[u,l,d]=uw.getShapeOfGemmResult(n,t.transA,s,t.transB,e.length===3?e[2].dims:void 0),p=[u,l];if(!p)throw new Error("Can't use gemm on the given tensors");let o=16,r=Math.ceil(l/o),i=Math.ceil(u/o),a=!0,c=R.size(p),h=[{type:12,data:a?r:c},{type:12,data:u},{type:12,data:l},{type:12,data:d},{type:1,data:t.alpha},{type:1,data:t.beta}],m=["type","type"];e.length===3&&(h.push(...ne(e[2].dims)),m.push("rank")),h.push(...ne(p));let b=v=>{let w="";t.transA&&t.transB?w="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?w="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?w="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(w="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let S=t.alpha===1?"":"value *= uniforms.alpha;",O=F("a",e[0].dataType,e[0].dims),E=F("b",e[1].dataType,e[1].dims),A=O.type.value,k=null,I=[O,E];e.length===3&&(k=F("c",e[2].dataType,e[2].dims.length),I.push(k));let M=ee("output",e[0].dataType,p.length);I.push(M);let q=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${v.registerUniforms(q).declareVariables(...I)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${A}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${S}
    ${k!=null?`let cOffset = ${k.broadcastedIndicesToOffset("vec2(m, n)",M)}; value += ${A}(uniforms.beta) * ${k.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},x=v=>{let w=F("a",e[0].dataType,e[0].dims),S=F("b",e[1].dataType,e[1].dims),O=null,E=[w,S];e.length===3&&(O=F("c",e[2].dataType,e[2].dims.length),E.push(O));let A=ee("output",e[0].dataType,p.length);E.push(A);let k=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],I="",M="";t.transA&&t.transB?(M=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,I="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(M=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,I="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(M=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,I="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(M=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,I="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let q=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${v.registerUniforms(k).declareVariables(...E)}
  var<workgroup> tile_a: array<array<${w.type.storage}, ${o}>, ${o}>;
  var<workgroup> tile_b: array<array<${S.type.storage}, ${o}>, ${o}>;
  ${v.mainStart([o,o,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${o};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${o};
    let num_tiles = (uniforms.K - 1) / ${o} + 1;
    var k_start = 0u;
    var value = ${A.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${M}
      k_start = k_start + ${o};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${o}; k++) {
        ${I}
      }
      workgroupBarrier();
    }

    ${q}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${O!=null?`let cOffset = ${O.broadcastedIndicesToOffset("vec2(m, n)",A)}; value += ${A.type.value}(uniforms.beta) * ${O.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return a?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:r*i},programUniforms:h}),getShaderSource:x}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:h}),getShaderSource:b}},h1=e=>{let t=e.transA,n=e.transB,s=e.alpha,u=e.beta;return{transA:t,transB:n,alpha:s,beta:u,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},f1=(e,t)=>{xm(e.inputs),e.compute($m(e.inputs,t))}}),zt,qt,xr,$r,Tm,Im,Sm,Om,Em,Pm,Am,km,m1,g1,zS=N(()=>{"use strict";ae(),ue(),Fe(),le(),[zt,qt,xr,$r]=[0,1,2,3],Tm=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Im=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,Sm=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Om=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Em=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,Pm=(e,t,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${zt}] = batch;
     indices[${qt}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${xr}] = u32(r);
            indices[${$r}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${xr}] = u32(clamp(r, 0, H - 1));
          indices[${$r}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${xr}] = gs_reflect(r, border[1], border[3]);
          indices[${$r}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Am=(e,t,n)=>(()=>{switch(n.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${zt}], indices[${qt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${zt}], indices[${qt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${zt}], indices[${qt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${zt}], indices[${qt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${zt}], indices[${qt}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${zt}], indices[${qt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,km=(e,t)=>{let n=F("x",e[0].dataType,e[0].dims.length),s=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],u=F("grid",e[1].dataType,s.length,2),l=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(l=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[zt,qt,xr,$r]=[0,3,1,2]);let d=ee("output",e[0].dataType,l.length),p=n.type.value,o=R.size(l),r=[{type:12,data:o},...ne(e[0].dims,s,l)],i=a=>`
  ${a.registerUniform("output_size","u32").declareVariables(n,u,d)}
  ${Im}
  ${Sm(p)}
  ${Om(t)}
  ${Em(t)}
  ${Pm(n,p,t)}

  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${xr}]);
      let W_in = i32(uniforms.x_shape[${$r}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${d.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${zt}], indices[${xr}], indices[${$r}]);
      let nxy = ${u.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Am(d,p,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:a=>{let c=R.size(l);return{outputs:[{dims:l,dataType:a[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:r}},getShaderSource:i}},m1=(e,t)=>{Tm(e.inputs),e.compute(km(e.inputs,t))},g1=e=>Ie({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),et,Dm,b1,La,Nm,Hn,y1,_1=N(()=>{"use strict";ae(),ue(),Fe(),Du(),zu(),le(),mr(),et=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Dm=(e,t)=>{let n=e[0],s=et(e,1),u=et(e,2),l=et(e,3),d=et(e,4),p=et(e,5),o=et(e,6),r=et(e,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let i=n.dims[0],a=n.dims[1],c=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],h=a,m=0,b=0,x=Math.floor(c/t.numHeads);if(o&&r&&R.size(o.dims)&&R.size(r.dims)){if(o.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(o.dims[0]!==i||o.dims[1]!==t.numHeads||o.dims[3]!==x)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(r.dims[0]!==i||r.dims[1]!==t.numHeads||r.dims[3]!==x)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(o.dims[2]!==r.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(r.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=o.dims[2],b=o.dims[2]}else if(o&&R.size(o.dims)||r&&R.size(r.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(s&&R.size(s.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(s.dims.length<3||s.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==s.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(s.dims.length===3){if(s.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,h=s.dims[1]}else if(s.dims.length===5){if(s.dims[2]!==t.numHeads||s.dims[3]!==2||s.dims[4]!==x)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(u)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,h=s.dims[1]}else{if(s.dims[1]!==t.numHeads||s.dims[3]!==x)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,h=s.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==t.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(l&&R.size(l.dims)>0){if(l.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(s&&s.dims.length===5&&s.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let w=m+h,S=0;if(d&&R.size(d.dims)>0){S=8;let k=d.dims;throw k.length===1?k[0]===i?S=1:k[0]===3*i+2&&(S=3):k.length===2&&k[0]===i&&k[1]===w&&(S=5),S===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let O=!1,E=c;if(u&&R.size(u.dims)>0){if(u.dims.length!==3&&u.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==u.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(u.dims.length===3){if(h!==u.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');E=u.dims[2]}else{if(h!==u.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');E=u.dims[1]*u.dims[3],O=!0}}let A=!1;if(d&&R.size(d.dims)>0)throw new Error("Key padding mask is not supported");if(p&&R.size(p.dims)>0){if(p.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(p.dims[0]!==i||p.dims[1]!==t.numHeads||p.dims[2]!==a||p.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:i,sequenceLength:a,pastSequenceLength:m,kvSequenceLength:h,totalSequenceLength:w,maxSequenceLength:b,inputHiddenSize:0,hiddenSize:c,vHiddenSize:E,headSize:x,vHeadSize:Math.floor(E/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:S,scale:t.scale,broadcastResPosBias:A,passPastInKv:O,qkvFormat:v}},b1=e=>Ie({...e}),La=Ie({perm:[0,2,1,3]}),Nm=(e,t,n,s,u,l,d)=>{let p=[s,u,l],o=R.size(p),r=[{type:12,data:o},{type:12,data:d},{type:12,data:l}],i=a=>{let c=ee("qkv_with_bias",t.dataType,p),h=F("qkv",t.dataType,p),m=F("bias",n.dataType,p),b=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${a.registerUniforms(b).declareVariables(h,m,c)}
  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:p,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:r}),getShaderSource:i},{inputs:[t,n],outputs:[-1]})[0]},Hn=(e,t,n,s,u,l,d,p)=>{let o=l;if(d&&R.size(d.dims)>0){if(s===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return o=Nm(e,l,d,t,s,n*u,p),o=o.reshape([t,s,n,u]),n===1||s===1?o:e.compute(ht(o,La.perm),{inputs:[o],outputs:[-1]})[0]}else return l.dims.length===3&&(o=l.reshape([t,s,n,u])),n===1||s===1?o:e.compute(ht(o,La.perm),{inputs:[o],outputs:[-1]})[0]},y1=(e,t)=>{let n=Dm(e.inputs,t),s=e.inputs[0],u=et(e.inputs,1),l=et(e.inputs,2),d=et(e.inputs,3),p=et(e.inputs,4),o=et(e.inputs,5),r=et(e.inputs,6),i=et(e.inputs,7);if(s.dims.length===5)throw new Error("Packed QKV is not implemented");if((u==null?void 0:u.dims.length)===5)throw new Error("Packed KV is not implemented");let a=u&&l&&u.dims.length===4&&l.dims.length===4,c=Hn(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,s,d,0);if(a)return ti(e,c,u,l,p,void 0,r,i,o,n);if(!u||!l)throw new Error("key and value must be provided");let h=Hn(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,u,d,n.hiddenSize),m=Hn(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,l,d,2*n.hiddenSize);ti(e,c,h,m,p,void 0,r,i,o,n)}}),Cm,zm,Rm,Bm,lu,w1,v1,x1=N(()=>{"use strict";ae(),ue(),Fe(),le(),Cm=e=>{if(!e||e.length<1)throw new Error("too few inputs")},zm=(e,t)=>{let n=[],s=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(u=>n.push(Number(u))),s=n.length),Ie({numOutputs:s,axis:t.axis,splitSizes:n})},Rm=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${te("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Bm=e=>{let t=e.length,n=[];for(let s=0;s<t;++s){let u=e[s].setByIndices("indices","input[global_idx]");t===1?n.push(u):s===0?n.push(`if (output_number == ${s}u) { ${u} }`):s===t-1?n.push(`else { ${u} }`):n.push(`else if (output_number == ${s}) { ${u} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},lu=(e,t)=>{let n=e[0].dims,s=R.size(n),u=e[0].dataType,l=R.normalizeAxis(t.axis,n.length),d=new Array(t.numOutputs),p=F("input",u,n.length),o=new Array(t.numOutputs),r=[],i=[],a=0,c=[{type:12,data:s}];for(let m=0;m<t.numOutputs;m++){a+=t.splitSizes[m],o[m]=a;let b=n.slice();b[l]=t.splitSizes[m],i.push(b),d[m]=ee(`output${m}`,u,b.length),r.push({dims:i[m],dataType:e[0].dataType})}c.push({type:12,data:o},...ne(n,...i));let h=m=>`
  ${m.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",o.length).declareVariables(p,...d)}
  ${Rm(o.length)}
  ${Bm(d)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${p.offsetToIndices("global_idx")};
    var index = ${p.indicesGet("indices",l)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${te("uniforms.size_in_split_axis","output_number - 1u",o.length)};
      ${p.indicesSet("indices",l,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:h,getRunData:()=>({outputs:r,dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c})}},w1=(e,t)=>{Cm(e.inputs);let n=e.inputs.length===1?t:zm(e.inputs,t);e.compute(lu(e.inputs,n),{inputs:[0]})},v1=e=>{let t=e.axis,n=e.splitSizes,s=e.numOutputs<0?n.length:e.numOutputs;if(s!==n.length)throw new Error("numOutputs and splitSizes length must be equal");return Ie({axis:t,numOutputs:s,splitSizes:n})}}),Mm,Zi,$1,T1=N(()=>{"use strict";ae(),ue(),Fe(),le(),Mm=(e,t)=>{let[n,s,u,l]=e,{numHeads:d,rotaryEmbeddingDim:p}=t;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!R.areEqual(s.dims,[])&&!R.areEqual(s.dims,[1])&&s.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${s.dims.length}`);if(u.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${u.dims.length}`);if(l.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${l.dims.length}`);if(!R.areEqual(u.dims,l.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(p>0&&d===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let o=n.dims[0],r=n.dims[n.dims.length-2],i=u.dims[0],a=R.sizeFromDimension(n.dims,1)/r,c=p===0?u.dims[1]*2:a/d;if(p>c)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(s.dims.length===2){if(o!==s.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${s.dims[0]}`);if(r!==s.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${s.dims[1]}`)}if(r>i)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(c/2!==u.dims[1]&&p/2!==u.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${u.dims[1]}`)},Zi=(e,t)=>{let{interleaved:n,numHeads:s,rotaryEmbeddingDim:u,scale:l}=t,d=e[0].dims[0],p=R.sizeFromDimension(e[0].dims,1),o=e[0].dims[e[0].dims.length-2],r=p/o,i=e[2].dims[1],a=u===0?i*2:r/s,c=new Array(d,o,r/a,a-i),h=R.computeStrides(c),m=[{type:1,data:l},{type:12,data:c},{type:12,data:h},...e[0].dims.length===3?new Array({type:12,data:[p,r,a,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[p,a,o*a,1]}):[],...ne(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],b=x=>{let v=F("input",e[0].dataType,e[0].dims.length),w=F("position_ids",e[1].dataType,e[1].dims.length),S=F("cos_cache",e[2].dataType,e[2].dims.length),O=F("sin_cache",e[3].dataType,e[3].dims.length),E=ee("output",e[0].dataType,e[0].dims.length);return x.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:c.length},{name:"global_strides",type:"u32",length:h.length},{name:"input_output_strides",type:"u32",length:h.length}]),`
        ${x.declareVariables(v,w,S,O,E)}

        ${x.mainStart(cn)}
          let half_rotary_emb_dim = uniforms.${S.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${w.broadcastedIndicesToOffset("bsnh.xy",ee("",w.type.tensor,2))};
            let position_id =
                u32(${w.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${v.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} -
                ${v.getByOffset("j")} * ${O.get("position_id","bsnh[3]")};
            ${E.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${O.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${E.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${E.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:Ie({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(R.size(c)/cn)},programUniforms:m})}},$1=(e,t)=>{Mm(e.inputs,t),e.compute(Zi(e.inputs,t))}}),jm,Fm,Va,Lm,I1,RS=N(()=>{"use strict";Fe(),ae(),zu(),_1(),x1(),mr(),T1(),le(),jm=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=e[0],s=e[1],u=e[2],l=e[3],d=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let p=!1,o=n.dims[0],r=n.dims[1],i=n.dims.length===3?p?n.dims[2]/3:n.dims[2]:t.numHeads*n.dims[4],a=r,c=0,h=!s||s.dims.length===0,m=Math.floor(h?i/(t.numHeads+2*t.kvNumHeads):i/t.numHeads);h&&(i=m*t.numHeads);let b=l&&l.dims.length!==0,x=d&&d.dims.length!==0;if(b&&l.dims.length===4&&l.dims[0]===o&&l.dims[1]!==t.kvNumHeads&&l.dims[2]===t.kvNumHeads&&l.dims[3]===m)throw new Error("BSNH pastKey/pastValue is not supported");if(b&&x){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');c=l.dims[2]}else if(b||x)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(s&&s.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(s.dims.length<3||s.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==s.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(s.dims.length===3){if(n.dims[2]%s.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');a=s.dims[1]}else if(s.dims.length===5){if(s.dims[2]!==t.numHeads||s.dims[3]!==2||s.dims[4]!==m)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(u)throw new Error('Expect "value" be none when "key" has packed kv format.');a=s.dims[1]}else{if(s.dims[1]!==t.numHeads||s.dims[3]!==m)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');a=s.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==t.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let w=0,S=!1,O=t.kvNumHeads?m*t.kvNumHeads:i;if(u&&u.dims.length>0){if(u.dims.length!==3&&u.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==u.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(u.dims.length===3){if(a!==u.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');O=u.dims[2]}else{if(a!==u.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');O=u.dims[1]*u.dims[3],S=!0}}let E=e.length>4?e[5]:void 0;if(E){if(E.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let A=E.dims.reduce((k,I)=>k*I,1);if(A!==o)throw new Error(`seqlens_k must have batch_size (${o}) elements, got ${A}.`);for(let k=0;k<E.dims.length;k++)if(E.dims[k]!==1&&E.dims[k]!==o)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${o}), got dims[${k}] = ${E.dims[k]}.`)}return{batchSize:o,sequenceLength:r,pastSequenceLength:c,kvSequenceLength:a,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:i,vHiddenSize:O,headSize:m,vHeadSize:Math.floor(O/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:S,qkvFormat:v}},Fm=Ie({perm:[0,2,1,3]}),Va=(e,t,n)=>{let s=t,u=n.kvNumHeads;return t.dims.length===3&&n.kvSequenceLength!==0&&(s=t.reshape([n.batchSize,n.kvSequenceLength,u,n.headSize]),s=e.compute(ht(s,Fm.perm),{inputs:[s],outputs:[-1]})[0]),s},Lm=(e,t,n,s)=>{let u=7,l=["type","type"],d=[e*t],p=e*t,o=[{type:12,data:p},{type:12,data:t},{type:12,data:e}],r=i=>{let a=F("seq_lens",n.dataType,n.dims),c=F("total_seq_lens",s.dataType,s.dims),h=ee("pos_ids",u,d),m=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${i.registerUniforms(m).declareVariables(a,c,h)}
  ${i.mainStart()}
    ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${c.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${a.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${h.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${h.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${h.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:d,dataType:u}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:o}),getShaderSource:r}},I1=(e,t)=>{var O;if(e.inputs.length>14&&e.inputs[14]||e.inputs.length>15&&e.inputs[15])throw new Error("GroupQueryAttention (JSEP): q_norm_weight / k_norm_weight inputs are not supported. The per-head Q/K RMS normalization prologue is implemented only on the CUDA and native WebGPU EPs.");let n=jm(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(((O=e.inputs[1])==null?void 0:O.dims.length)===5)throw new Error("Packed KV is not implemented");let s=e.inputs[0],u=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,l=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,d=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,p=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,o=e.inputs.length>4?e.inputs[5]:void 0,r=e.inputs.length>5?e.inputs[6]:void 0,i=n.kvNumHeads?n.kvNumHeads:n.numHeads,a=Ie({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,i*n.headSize,i*n.headSize]}),[c,h,m]=!u&&!l?e.compute(lu([s],a),{inputs:[s],outputs:[-1,-1,-1]}):[s,u,l],b,x;if(t.doRotary){let E=e.compute(Lm(n.batchSize,n.sequenceLength,o,r),{inputs:[o,r],outputs:[-1]})[0],A=e.inputs[7],k=e.inputs[8],I=Ie({interleaved:t.rotaryInterleaved!==0,numHeads:n.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),M=[c,E,A,k],q=[-1];b=e.compute(Zi(M,I),{inputs:M,outputs:q})[0],M.splice(0,1,h);let J=Ie({interleaved:t.rotaryInterleaved!==0,numHeads:n.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});x=e.compute(Zi(M,J),{inputs:M,outputs:q})[0]}let v=Hn(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t.doRotary?b:c,void 0,0),w=Va(e,t.doRotary?x:h,n),S=Va(e,m,n);ti(e,v,w,S,void 0,void 0,d,p,void 0,n,o,r)}}),Ua,Vm,Um,S1,BS=N(()=>{"use strict";ae(),ue(),mr(),le(),Ua=(e,t,n,s,u,l,d,p)=>{let o=je(l),r=o===1?"f32":`vec${o}f`,i=o===1?"vec2f":`mat2x${o}f`,a=u*d,c=64;a===1&&(c=256);let h=[u,d,l/o],m=[u,d,2],b=["rank","type","type"],x=[];x.push(...ne(h,m));let v=w=>{let S=F("x",t.dataType,3,o),O=F("scale",n.dataType,n.dims),E=F("bias",s.dataType,s.dims),A=ee("output",1,3,2),k=[S,O,E,A];return`
  var<workgroup> workgroup_shared : array<${i}, ${c}>;
  const workgroup_size = ${c}u;
  ${w.declareVariables(...k)}
  ${w.mainStart(c)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${r}(0);
    var squared_sum = ${r}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${r}(${S.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${i}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${hr("workgroup_shared[0][0]",o)} / f32(hight * ${o});
      let squared_sum_final = ${hr("workgroup_shared[0][1]",o)} / f32(hight * ${o});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${p}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${o};${p};${c}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:a},programUniforms:x}),getShaderSource:v},{inputs:[t,n,s],outputs:[-1]})[0]},Vm=(e,t,n)=>{let s=t[0].dims,u=s,l=2,d=s[0],p=s[1],o=R.sizeFromDimension(s,l),r=je(o),i=R.size(u)/r,a=Ua(e,t[0],t[1],t[2],d,o,p,n.epsilon),c=[d,p,o/r],h=[d,p],m=["type","none"],b=x=>{let v=F("x",t[0].dataType,c.length,r),w=F("scale_shift",1,h.length,2),S=ee("output",t[0].dataType,c.length,r),O=[v,w,S];return`
  ${x.registerUniform("output_size","u32").declareVariables(...O)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${S.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${w.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${S.type.value}(scale_shift.x) + ${S.type.value}(scale_shift.y);
      ${S.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${r}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:u,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...ne(c,h,c)]}),getShaderSource:b},{inputs:[t[0],a]})},Um=(e,t,n)=>{let s=t[0].dims,u=s,l=s[0],d=s[s.length-1],p=R.sizeFromDimension(s,1)/d,o=je(d),r=R.size(u)/o,i=[{type:12,data:p},{type:12,data:Math.floor(d/o)}],a=["type","type"],c=!1,h=[0,s.length-1];for(let v=0;v<s.length-2;v++)c=c||s[v+1]!==1,h.push(v+1);c=c&&s[s.length-1]!==1;let m=c?e.compute(ht(e.inputs[0],h),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:s.length},(v,w)=>s[h[w]])),b=Ua(e,m,t[1],t[2],l,p,d,n.epsilon),x=v=>{let w=We(t[0].dataType),S=o===1?"vec2f":`mat${o}x2f`,O=k=>{let I=k===0?"x":"y",M=o===1?"f32":`vec${o}f`;switch(o){case 1:return`${w}(${M}(scale.${I}))`;case 2:return`vec2<${w}>(${M}(scale[0].${I}, scale[1].${I}))`;case 4:return`vec4<${w}>(${M}(scale[0].${I}, scale[1].${I}, scale[2].${I}, scale[3].${I}))`;default:throw new Error(`Not supported compoents ${o}`)}},E=F("input",t[0].dataType,t[0].dims,o),A=ee("output",t[0].dataType,u,o);return`
  @group(0) @binding(0) var<storage, read> input : array<${E.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${S}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${A.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${O(0)}, ${O(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${o}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:u,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:i}),getShaderSource:x},{inputs:[t[0],b]})},S1=(e,t)=>{t.format==="NHWC"?Um(e,e.inputs,t):Vm(e,e.inputs,t)}}),qm,Gm,O1,MS=N(()=>{"use strict";ae(),ue(),le(),qm=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Gm=(e,t,n)=>{let s=t.simplified,u=e[0].dims,l=e[1],d=!s&&e[2],p=u,o=R.normalizeAxis(t.axis,u.length),r=R.sizeToDimension(u,o),i=R.sizeFromDimension(u,o),a=R.size(l.dims),c=d?R.size(d.dims):0;if(a!==i||d&&c!==i)throw new Error(`Size of X.shape()[axis:] == ${i}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${a} and bias size of ${c}`);let h=[];for(let E=0;E<u.length;++E)E<o?h.push(u[E]):h.push(1);let m=je(i),b=["type","type"],x=[{type:12,data:r},{type:1,data:i},{type:12,data:Math.floor(i/m)},{type:1,data:t.epsilon}];d&&b.push("type");let v=n>1,w=n>2,S=E=>{let A=We(e[0].dataType),k=[F("x",e[0].dataType,e[0].dims,m),F("scale",l.dataType,l.dims,m)];d&&k.push(F("bias",d.dataType,d.dims,m)),k.push(ee("output",e[0].dataType,p,m)),v&&k.push(ee("mean_data_output",1,h)),w&&k.push(ee("inv_std_output",1,h));let I=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${E.registerUniforms(I).declareVariables(...k)}
  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${eu("f32",m)};
    var mean_square_vector = ${eu("f32",m)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${un(A,m,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${hr("mean_vector",m)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${hr("mean_square_vector",m)} / uniforms.norm_size ${s?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${un(A,m,"x[j + offset]")};
      let f32scale = ${un(A,m,"scale[j]")};
      output[j + offset] = ${k[0].type.value}((f32input ${s?"":"- mean"}) * inv_std_dev * f32scale
        ${d?`+ ${un(A,m,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${w?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},O=[{dims:p,dataType:e[0].dataType}];return v&&O.push({dims:h,dataType:1}),w&&O.push({dims:h,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${m};${n};${s}`,inputDependencies:b},getRunData:()=>({outputs:O,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:x}),getShaderSource:S}},O1=(e,t)=>{qm(e.inputs),e.compute(Gm(e.inputs,t,e.outputCount))}}),Hm,E1,jS=N(()=>{"use strict";ue(),Fu(),Lu(),Hm=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},E1=e=>{Hm(e.inputs);let t=pn.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let n=t[t.length-1],s=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&s<8)e.compute(ju(e.inputs,{activation:""},t));else{let u=t[t.length-2],l=R.size(e.inputs[0].dims.slice(0,-2)),d=R.size(e.inputs[1].dims.slice(0,-2));if(l!==1&&u===1&&d===1){let p=e.inputs[0].reshape([1,l,s]),o=e.inputs[1].reshape([1,s,n]),r=[1,l,n],i=[p,o];e.compute(Xi(i,{activation:""},t,r),{inputs:i})}else e.compute(Xi(e.inputs,{activation:""},t))}}}),Wm,Km,Xm,P1,A1,FS=N(()=>{"use strict";ae(),ue(),Fe(),le(),Wm=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=e[0],s=n.dims.length;if(n.dims[s-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let u=Math.floor((t.k+t.blockSize-1)/t.blockSize),l=t.blockSize/8*t.bits,d=e[1];if(!R.areEqual(d.dims,[t.n,u,l]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let p=e[2].dims;if(R.size(p)!==t.n*u)throw new Error("scales input size error.");if(e.length===4){let o=e[3].dims,r=t.n*(t.bits===8?u:Math.floor((u*t.bits+7)/8));if(R.size(o)!==r)throw new Error("zeroPoints input size error.")}},Km=(e,t)=>{let n=e[0].dims,s=n.length,u=n[s-2],l=t.k,d=t.n,p=n.slice(0,s-2),o=R.size(p),r=e[1].dims[2]/4,i=e[0].dataType,a=je(t.k),c=je(r),h=je(d),m=p.concat([u,d]),b=u>1&&d/h%2===0?2:1,x=R.size(m)/h/b,v=64,w=[],S=[o,u,l/a],O=R.convertShape(e[1].dims).slice();O.splice(-1,1,r/c),w.push(...ne(S)),w.push(...ne(O)),w.push(...ne(e[2].dims)),e.length===4&&w.push(...ne(R.convertShape(e[3].dims)));let E=[o,u,d/h];w.push(...ne(E));let A=k=>{let I=S.length,M=F("a",e[0].dataType,I,a),q=F("b",12,O.length,c),J=F("scales",e[2].dataType,e[2].dims.length),K=[M,q,J],C=e.length===4?F("zero_points",12,e[3].dims.length):void 0;C&&K.push(C);let B=E.length,$=ee("output",e[0].dataType,B,h),z=We(e[0].dataType),G=(()=>{switch(a){case 1:return`array<${z}, 8>`;case 2:return`mat4x2<${z}>`;case 4:return`mat2x4<${z}>`;default:throw new Error(`${a}-component is not supported.`)}})(),oe=Math.floor(32/t.bits),U=Math.floor(oe/8),ie=()=>{let X="";for(let L=0;L<U;L++){let de=L*t.bits*4,Pe=de+t.bits;X+=`
          // reuse a data (pass ${L})
            var input_offset${L>0?L:""} = ${L===0?M.indicesToOffset(`${M.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${L>0?L:""}: ${G};
            for (var j${L>0?L:""}: u32 = 0; j${L>0?L:""} < ${8/a}; j${L>0?L:""}++) {
              a_data${L>0?L:""}[j${L>0?L:""}] = ${M.getByOffset(`input_offset${L>0?L:""}`)};
              input_offset${L>0?L:""}++;
            }
          `;for(let ve=0;ve<h*b;ve++)X+=`
            b_value = ${c===1?`b${ve}_data`:`b${ve}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${L*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${de}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${Pe}u) & b_mask);`}
            b_quantized_values = ${G}(${Array.from({length:4},(Ge,rt)=>`${z}(b_value_lower[${rt}]), ${z}(b_value_upper[${rt}])`).join(", ")});
            b_dequantized_values = ${a===1?`${G}(${Array.from({length:8},(Ge,rt)=>`(b_quantized_values[${rt}] - ${C?`zero_point${ve}`:"zero_point"}) * scale${ve}`).join(", ")});`:`(b_quantized_values - ${G}(${Array(8).fill(`${C?`zero_point${ve}`:"zero_point"}`).join(",")})) * scale${ve};`};
            workgroup_shared[local_id.x * ${b} + ${Math.floor(ve/h)}]${h>1?`[${ve%h}]`:""} += ${Array.from({length:8/a},(Ge,rt)=>`${a===1?`a_data${L>0?L:""}[${rt}] * b_dequantized_values[${rt}]`:`dot(a_data${L>0?L:""}[${rt}], b_dequantized_values[${rt}])`}`).join(" + ")};
          `}return X},V=()=>{let X=`
            var col_index = col * ${h};
            ${C?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${z}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            `;for(let L=0;L<h*b;L++)X+=`
            let scale${L} = ${J.getByOffset("col_index * nBlocksPerCol + block")};
            ${C?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${C.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${L} = ${z}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return X},W=()=>{let X=`col_index = col * ${h};`;for(let L=0;L<h*b;L++)X+=`
            let b${L}_data = ${q.getByIndices(`${q.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return X+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${G};
            var b_dequantized_values: ${G};`,X};return`
        var<workgroup> workgroup_shared: array<${$.type.value}, ${b*v}>;
        ${k.declareVariables(...K,$)}
        ${k.mainStart([v,1,1])}
          let output_indices = ${$.offsetToIndices(`(global_idx / ${v}) * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/a};
            ${V()}
            for (var word: u32 = 0; word < ${r}; word += ${c}) {
              ${W()}
              for (var i: u32 = 0; i < ${c}; i++) {
                ${ie()}
                word_offset += ${oe/a};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${b}) {
            var output_value: ${$.type.value} = ${$.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${b};
            }
            ${$.setByIndices(`${$.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${a};${c};${h};${b};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:m,dataType:i}],dispatchGroup:{x},programUniforms:w}),getShaderSource:A}},Xm=(e,t)=>{let n=e[0].dims,s=n.length,u=n[s-2],l=t.k,d=t.n,p=n.slice(0,s-2),o=R.size(p),r=e[1].dims[2]/4,i=e[0].dataType,a=je(t.k),c=je(r),h=p.concat([u,d]),m=128,b=d%8===0?8:d%4===0?4:1,x=m/b,v=Math.floor(32/t.bits),w=x*c*v,S=w/a,O=w/t.blockSize,E=R.size(h)/b,A=[],k=[o,u,l/a],I=R.convertShape(e[1].dims).slice();I.splice(-1,1,r/c),A.push(...ne(k)),A.push(...ne(I)),A.push(...ne(e[2].dims)),e.length===4&&A.push(...ne(R.convertShape(e[3].dims)));let M=[o,u,d];A.push(...ne(M));let q=J=>{let K=k.length,C=F("a",e[0].dataType,K,a),B=F("b",12,I.length,c),$=F("scales",e[2].dataType,e[2].dims.length),z=[C,B,$],G=e.length===4?F("zero_points",12,e[3].dims.length):void 0;G&&z.push(G);let oe=M.length,U=ee("output",e[0].dataType,oe),ie=We(e[0].dataType),V=()=>{switch(a){case 1:return`
          let a_data0 = vec4<${ie}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ie}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ie}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ie}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${a}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${C.type.value}, ${S}>;
        var<workgroup> inter_results: array<array<${U.type.value}, ${x}>, ${b}>;
        ${J.declareVariables(...z,U)}
        ${J.mainStart([x,b,1])}
          let output_indices = ${U.offsetToIndices(`workgroup_index * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${O} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${S};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${S}; a_offset += ${m})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${C.getByIndices(`${C.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${C.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${O} + local_id.x;
            ${G?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${G.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ie}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${ie}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            let scale = ${$.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${B.getByIndices(`${B.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/a};
            for (var i: u32 = 0; i < ${c}; i++) {
              let b_value = ${c===1?"b_data":"b_data[i]"};
              ${(()=>{let W=Math.floor(v/8),X="";for(let L=0;L<W;L++){let de=L*t.bits*4,Pe=de+t.bits;X+=`
              ${V()}
              {${t.bits===2?`
                let half_word = b_value >> ${L*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${de}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${Pe}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${ie}>(${Array.from({length:4},(ve,Ge)=>`${ie}(b_value_lower[${Ge}]), ${ie}(b_value_upper[${Ge}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${ie}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(ve,Ge)=>`${`dot(a_data${Ge}, b_dequantized_values[${Ge}])`}`).join(" + ")};
              }
              word_offset += ${8/a};`}return X})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${b}) {
            var output_value: ${U.type.value} = ${U.type.value}(0);
            for (var b = 0u; b < ${x}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${U.setByIndices(`${U.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${a};${c};${x};${b}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:h,dataType:i}],dispatchGroup:{x:E},programUniforms:A}),getShaderSource:q}},P1=(e,t)=>{Wm(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Xm(e.inputs,t)):e.compute(Km(e.inputs,t))},A1=e=>Ie(e)}),Zm,Jm,Ym,Qm,eg,tg,rg,ng,k1,LS=N(()=>{"use strict";ae(),ue(),le(),Zm=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Jm=(e,t,n)=>{let s="";for(let u=t-1;u>=0;--u)s+=`
            k = i32(${e.indicesGet("indices",u)}) - ${te("uniforms.pads",u,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${te("uniforms.x_shape",u,t)})) {
              break;
            }
            offset += k * i32(${te("uniforms.x_strides",u,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${s}
            value = x[offset];
          }
      `},Ym=(e,t,n)=>{let s="";for(let u=t-1;u>=0;--u)s+=`
                k = i32(${e.indicesGet("indices",u)}) - ${te("uniforms.pads",u,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${te("uniforms.x_shape",u,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${te("uniforms.x_shape",u,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${te("uniforms.x_strides",u,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${s}
              value = x[offset];
          `},Qm=(e,t,n)=>{let s="";for(let u=t-1;u>=0;--u)s+=`
                k = i32(${e.indicesGet("indices",u)}) - ${te("uniforms.pads",u,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${te("uniforms.x_shape",u,t)})) {
                  k = i32(${te("uniforms.x_shape",u,t)}) - 1;
                }
                offset += k * i32(${te("uniforms.x_strides",u,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${s}
              value = x[offset];
          `},eg=(e,t,n)=>{let s="";for(let u=t-1;u>=0;--u)s+=`
                k = i32(${e.indicesGet("indices",u)}) - ${te("uniforms.pads",u,n)};
                if (k < 0)  {
                  k += i32(${te("uniforms.x_shape",u,t)}]);
                }
                if (k >= i32(${te("uniforms.x_shape",u,t)})) {
                  k -= i32(${te("uniforms.x_shape",u,t)});
                }
                offset += k * i32(${te("uniforms.x_strides",u,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${s}
              value = x[offset];
          `},tg=(e,t,n)=>{switch(n.mode){case 0:return Jm(e,t,n.pads.length);case 1:return Ym(e,t,n.pads.length);case 2:return Qm(e,t,n.pads.length);case 3:return eg(e,t,n.pads.length);default:throw new Error("Invalid mode")}},rg=(e,t)=>{let n=R.padShape(e[0].dims.slice(),t.pads),s=e[0].dims,u=R.size(n),l=[{type:12,data:u},{type:6,data:t.pads}],d=e.length>=3&&e[2].data;t.mode===0&&l.push({type:d?e[2].dataType:1,data:t.value}),l.push(...ne(e[0].dims,n));let p=["rank"],o=r=>{let i=ee("output",e[0].dataType,n.length),a=F("x",e[0].dataType,s.length),c=a.type.value,h=tg(i,s.length,t),m=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&m.push({name:"constant_value",type:d?c:"f32"}),`
            ${r.registerUniforms(m).declareVariables(a,i)}
            ${r.mainStart()}
            ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${i.offsetToIndices("global_idx")};

            var value = ${c}(0);
            ${h}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${d}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(R.size(n)/64)},programUniforms:l}),getShaderSource:o}},ng=(e,t)=>{if(e.length>1){let n=e[1].getBigInt64Array(),s=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,u=e[0].dims.length,l=new Int32Array(2*u).fill(0);if(e.length>=4){let p=e[3].getBigInt64Array();for(let o=0;o<p.length;o++)l[Number(p[o])]=Number(n[o]),l[Number(p[o])+u]=Number(n[o+p.length])}else n.forEach((p,o)=>l[Number(o)]=Number(p));let d=[];return l.forEach(p=>d.push(p)),{mode:t.mode,value:s,pads:d}}else return t},k1=(e,t)=>{Zm(e.inputs);let n=ng(e.inputs,t);e.compute(rg(e.inputs,n),{inputs:[0]})}}),zn,qa,Ga,Ha,Wa,ig,og,Ka,Xa,D1,N1,Za,C1,z1,Ja,R1,B1,M1,j1,VS=N(()=>{"use strict";Qe(),ae(),ue(),le(),zn=e=>{if(ge.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},qa=(e,t,n)=>{let s=t.format==="NHWC",u=e.dims.slice();s&&u.splice(1,0,u.pop());let l=Object.hasOwnProperty.call(t,"dilations"),d=t.kernelShape.slice(),p=t.strides.slice(),o=l?t.dilations.slice():[],r=t.pads.slice();Wi.adjustPoolAttributes(n,u,d,p,o,r);let i=Wi.computePoolOutputShape(n,u,p,o,d,r,t.autoPad,t.ceilMode),a=Object.assign({},t);l?Object.assign(a,{kernelShape:d,strides:p,pads:r,dilations:o,cacheKey:t.cacheKey}):Object.assign(a,{kernelShape:d,strides:p,pads:r,cacheKey:t.cacheKey});let c=i.slice();return c.push(c.splice(1,1)[0]),[a,s?c:i]},Ga=(e,t)=>{let n=t.format==="NHWC",s=R.size(e),u=R.size(t.kernelShape),l=[{type:12,data:s},{type:12,data:u}],d=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let p=t.kernelShape[t.kernelShape.length-1],o=t.strides[t.strides.length-1],r=t.pads[t.pads.length/2-1],i=t.pads[t.pads.length-1],a=!!(r+i);l.push({type:12,data:p},{type:12,data:o},{type:12,data:r},{type:12,data:i}),d.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let c=!1;if(t.kernelShape.length===2){let h=t.kernelShape[t.kernelShape.length-2],m=t.strides[t.strides.length-2],b=t.pads[t.pads.length/2-2],x=t.pads[t.pads.length-2];c=!!(b+x),l.push({type:12,data:h},{type:12,data:m},{type:12,data:b},{type:12,data:x}),d.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[l,d,!0,a,c]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let p=R.computeStrides(t.kernelShape);l.push({type:12,data:p},{type:12,data:t.pads},{type:12,data:t.strides}),d.push({name:"kernelStrides",type:"u32",length:p.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let o=t.pads.reduce((r,i)=>r+i);return[l,d,!!o,!1,!1]}},Ha=(e,t,n,s,u,l,d,p,o,r,i,a)=>{let c=u.format==="NHWC",h=t.type.value,m=ee("output",t.type.tensor,s);if(u.kernelShape.length<=2){let b="",x="",v="",w=n-(c?2:1);if(i?b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${w}] < 0 || xIndices[${w}]
                      >= uniforms.x_shape[${w}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${l}
                }`:b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${l}
                }`,u.kernelShape.length===2){let S=n-(c?3:2);a?x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${S}] = indices[${S}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${S}] < 0 || xIndices[${S}] >= uniforms.x_shape[${S}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${S}] = indices[${S}] * uniforms.sh - uniforms.phStart + j;
                `,v=`
              }
            `}return`
            ${e.registerUniforms(o).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${h}(${p});
              var pad = 0;
              ${x}
              ${b}
              ${v}
              ${d}

              output[global_idx] = value;
            }`}else{if(c)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let b=u.kernelShape.length,x=u.pads.length,v="";return r?v=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${l}
              }`:v=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${l}
            `,`
            ${e.registerUniforms(o).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var offsets: array<u32, ${b}>;

              var value = ${h}(${p});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${b-1}u; j++) {
                  offsets[j] = offset / ${te("uniforms.kernelStrides","j",b)};
                  offset -= offsets[j] * ${te("uniforms.kernelStrides","j",b)};
                }
                offsets[${b-1}] = offset;

                isPad = false;
                for (var j = ${n-b}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${te("uniforms.strides",`j - ${n-b}u`,b)}
                    + offsets[j - ${n-b}u] - ${te("uniforms.pads","j - 2u",x)};
                  ${v}
              }
              ${d}

              output[global_idx] = value;
            }`}},Wa=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,ig=e=>`${Wa(e)};${e.countIncludePad}`,og=e=>`${Wa(e)};${e.storageOrder};${e.dilations}`,Ka=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Xa=(e,t,n,s)=>{let[u,l]=qa(t,s,n),d=F("x",t.dataType,t.dims.length),p=d.type.value,o="value += x_val;",r="";u.countIncludePad?r+=`value /= ${p}(uniforms.kernelSize);`:r+=`value /= ${p}(i32(uniforms.kernelSize) - pad);`;let[i,a,c,h,m]=Ga(l,u);i.push(...ne(t.dims,l));let b=["rank"];return{name:e,shaderCache:{hint:`${s.cacheKey};${c};${h};${m}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:l,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(R.size(l)/64)},programUniforms:i}),getShaderSource:x=>Ha(x,d,t.dims.length,l.length,u,o,r,0,a,c,h,m)}},D1=e=>{let t=e.count_include_pad!==0,n=Ka(e);if(n.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding/divisor) is not yet implemented in the WebGPU AveragePool kernel");let s={countIncludePad:t,...n,cacheKey:""};return{...s,cacheKey:ig(s)}},N1=(e,t)=>{zn(e.inputs),e.compute(Xa("AveragePool",e.inputs[0],!1,t))},Za={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},C1=e=>{let t=e.format;return{format:t,...Za,cacheKey:t}},z1=(e,t)=>{zn(e.inputs),e.compute(Xa("GlobalAveragePool",e.inputs[0],!0,t))},Ja=(e,t,n,s)=>{let[u,l]=qa(t,s,n),d=`
      value = max(x_val, value);
    `,p="",o=F("x",t.dataType,t.dims.length),r=["rank"],[i,a,c,h,m]=Ga(l,u);return i.push(...ne(t.dims,l)),{name:e,shaderCache:{hint:`${s.cacheKey};${c};${h};${m}`,inputDependencies:r},getRunData:()=>({outputs:[{dims:l,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(R.size(l)/64)},programUniforms:i}),getShaderSource:b=>Ha(b,o,t.dims.length,l.length,u,d,p,t.dataType===10?-65504:-1e5,a,c,h,m)}},R1=(e,t)=>{zn(e.inputs),e.compute(Ja("MaxPool",e.inputs[0],!1,t))},B1=e=>{let t=e.storage_order,n=e.dilations,s=Ka(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(s.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding) is not yet implemented in the WebGPU MaxPool kernel");let u={storageOrder:t,dilations:n,...s,cacheKey:""};return{...u,cacheKey:og(u)}},M1=e=>{let t=e.format;return{format:t,...Za,cacheKey:t}},j1=(e,t)=>{zn(e.inputs),e.compute(Ja("GlobalMaxPool",e.inputs[0],!0,t))}}),ag,sg,F1,L1,US=N(()=>{"use strict";ae(),ue(),Fe(),le(),ag=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((n,s)=>n===e[2].dims[s]).reduce((n,s)=>n&&s,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((u,l)=>l===t.axis||u===e[0].dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=e[0].dims[t.axis],s=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/s)||t.blockSize>Math.ceil(n/(s-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},sg=(e,t)=>{let n=R.normalizeAxis(t.axis,e[0].dims.length),s=e[0].dataType,u=s===3,l=e[0].dims,d=e[1].dataType,p=R.size(l),o=s===3||s===2,r=o?[Math.ceil(R.size(e[0].dims)/4)]:e[0].dims,i=e[1].dims,a=e.length>2?e[2]:void 0,c=a?o?[Math.ceil(R.size(a.dims)/4)]:a.dims:void 0,h=i.length===0||i.length===1&&i[0]===1,m=h===!1&&i.length===1,b=je(p),x=h&&(!o||b===4),v=x?b:1,w=x&&!o?b:1,S=F("input",o?12:s,r.length,w),O=F("scale",d,i.length),E=a?F("zero_point",o?12:s,c.length):void 0,A=ee("output",d,l.length,v),k=[S,O];E&&k.push(E);let I=[r,i];a&&I.push(c);let M=[{type:12,data:p/v},{type:12,data:n},{type:12,data:t.blockSize},...ne(...I,l)],q=J=>{let K=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${J.registerUniforms(K).declareVariables(...k,A)}
      ${J.mainStart()}
          ${J.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${A.offsetToIndices("global_idx")};

          // Set input x
          ${o?`
            let input = ${S.getByOffset("global_idx / 4")};
            let x_vec = ${u?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${v===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${S.getByOffset("global_idx")};`};

          // Set scale input
          ${h?`let scale_value= ${O.getByOffset("0")}`:m?`
            let scale_index = ${A.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${O.getByOffset("scale_index")};`:`
            var scale_indices: ${O.type.indices} = output_indices;
            let index = ${O.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${O.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${O.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${E?h?o?`
                let zero_point_input = ${E.getByOffset("0")};
                let zero_point_vec =  ${u?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${E.getByOffset("0")}`:m?o?`
                let zero_point_index = ${A.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${E.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${u?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${A.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${E.getByOffset("zero_point_index")};`:o?`
                let zero_point_offset = ${O.indicesToOffset("scale_indices")};
                let zero_point_input = ${E.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${u?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${E.getByIndices("scale_indices")};`:`let zero_point_value = ${o?u?"i32":"u32":S.type.value}(0);`};
      // Compute and write output
      ${A.setByOffset("global_idx",`${A.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:E?["rank","rank","rank"]:["rank","rank"]},getShaderSource:q,getRunData:()=>({outputs:[{dims:l,dataType:d}],dispatchGroup:{x:Math.ceil(p/v/64),y:1,z:1},programUniforms:M})}},F1=(e,t)=>{ag(e.inputs,t),e.compute(sg(e.inputs,t))},L1=e=>Ie({axis:e.axis,blockSize:e.blockSize})}),ug,lg,V1,qS=N(()=>{"use strict";Qe(),ae(),le(),ug=(e,t,n)=>{let s=e===t,u=e<t&&n<0,l=e>t&&n>0;if(s||u||l)throw new Error("Range these inputs' contents are invalid.")},lg=(e,t,n,s)=>{let u=Math.abs(Math.ceil((t-e)/n)),l=[u],d=u,p=[{type:12,data:d},{type:s,data:e},{type:s,data:n},...ne(l)],o=r=>{let i=ee("output",s,l.length),a=i.type.value,c=[{name:"outputSize",type:"u32"},{name:"start",type:a},{name:"delta",type:a}];return`
        ${r.registerUniforms(c).declareVariables(i)}
        ${r.mainStart()}
        ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${a}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${s}`},getShaderSource:o,getRunData:()=>({outputs:[{dims:l,dataType:s}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p})}},V1=e=>{let t=0,n=0,s=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],s=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],s=e.inputs[2].getFloat32Array()[0]),ge.webgpu.validateInputContent&&ug(t,n,s),e.compute(lg(t,n,s,e.inputs[0].dataType),{inputs:[]})}}),dg,pg,U1,q1,GS=N(()=>{"use strict";ae(),ue(),Fe(),le(),dg=(e,t,n,s)=>{if(e!=="none"&&s!=="i32"&&s!=="u32"&&s!=="f32")throw new Error(`Input ${s} is not supported with reduction ${e}.`);let u=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,l=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${n};`;case"add":return s==="i32"||s==="u32"?`atomicAdd(&${t}, bitcast<${s}>(${n}));`:`
              ${u}bitcast<${s}>(oldValue) + (${n})${l}`;case"max":return s==="i32"||s==="u32"?`atomicMax(&${t}, bitcast<${s}>(${n}));`:`
                ${u}max(bitcast<f32>(oldValue), (${n}))${l}`;case"min":return s==="i32"||s==="u32"?`atomicMin(&${t}, bitcast<${s}>(${n}));`:`${u}min(bitcast<${s}>(oldValue), (${n}))${l}`;case"mul":return`${u}(bitcast<${s}>(oldValue) * (${n}))${l}`;default:throw new Error(`Reduction ${e} is not supported.`)}},pg=(e,t)=>{let n=e[0].dims,s=e[1].dims,u=n,l=1,d=Math.ceil(R.sizeToDimension(s,s.length-1)/l),p=s[s.length-1],o=R.sizeFromDimension(n,p),r=[{type:12,data:d},{type:12,data:p},{type:12,data:o},...ne(e[1].dims,e[2].dims,u)],i=a=>{let c=F("indices",e[1].dataType,e[1].dims.length),h=F("updates",e[2].dataType,e[2].dims.length,l),m=t.reduction!=="none"&&t.reduction!==""?mw("output",e[0].dataType,u.length):ee("output",e[0].dataType,u.length,l);return`
      ${a.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(c,h,m)}
      ${a.mainStart()}
        ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${dg(t.reduction,"output[data_offset + i]","value",m.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:r}),getShaderSource:i}},U1=e=>Ie({reduction:e.reduction}),q1=(e,t)=>{e.compute(pg(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),cg,hg,fg,Ya,mg,gg,bg,yg,_g,wg,vg,xg,Qa,$g,Tg,Ig,Sg,Og,G1,H1,HS=N(()=>{"use strict";ae(),ue(),Fe(),le(),cg=(e,t)=>{if(e.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},hg=(e,t,n)=>{t.every(u=>u>=0&&u<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let s=new Array(n).fill(1);return t.forEach((u,l)=>s[u]=e[l]),s},fg=(e,t,n,s,u,l)=>{let[d,p,o]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],r=e[0].dims.length;if(d>0&&e.length>d&&e[d].dims.length>0)e[d].getFloat32Array().forEach(i=>l.push(i));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(p>0&&e.length>p&&e[p].dims.length===1&&e[p].dims[0]>0){if(e[p].getFloat32Array().forEach(i=>s.push(i)),s.length!==0&&s.length!==r&&n>=18&&s.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");cg(s,t),t.axes.length>0&&hg(s,t.axes,r).forEach((i,a)=>s[a]=i)}if(o>0&&e.length>o&&e[o].dims.length===1&&e[o].dims[0]>0&&(e[o].getBigInt64Array().forEach(i=>u.push(Number(i))),u.length!==0&&u.length!==r&&n>=18&&u.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(s.length!==0&&s.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(u.length!==0&&u.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof s<"u"&&typeof u<"u"&&s.length>0&&u.length>r)throw new Error("Resize requires only of scales or sizes to be specified")},Ya=(e,t,n,s)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${s}(big / (${n}));
  let fract = ${s}(big % (${n})) / ${s}(${n});
  return whole + fract;
`,mg=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Ya("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Ya("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",gg=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",bg=(e,t,n)=>{let s=new Array(n).fill(0).concat(new Array(n).fill(1)),u=e.length===0?s:e.slice();return t.length>0?(t.forEach((l,d)=>{s[l]=u[d],s[d+n]=u[t.length+d]}),s):u},yg=(e,t,n,s)=>{let u=[];if(n.length>0)if(s.length>0){if(e.forEach(l=>u.push(l)),Math.max(...s)>e.length)throw new Error("axes is out of bound");s.forEach((l,d)=>u[l]=n[d])}else n.forEach(l=>u.push(l));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");u=e.map((l,d)=>Math.round(l*t[d]))}return u},_g=(e,t,n)=>{let s=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(l=>t[l]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(l=>t[l]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let u=e.slice();return n.axes.length>0?(n.axes.forEach(l=>t[l]=s),n.axes.forEach(l=>u[l]=Math.round(e[l]*t[l]))):(t.fill(s,0,t.length),u.forEach((l,d)=>u[d]=Math.round(l*t[d]))),u},wg=(e,t,n,s,u)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${te("uniforms.scales","i",s)};
        var roi_low = ${te("uniforms.roi","i",u)};
        var roi_hi = ${te("uniforms.roi",`i + ${t.length}`,u)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${te("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${te("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,vg=(e,t,n,s,u,l,d)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${s.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${te("uniforms.scales","i",u)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${te("uniforms.roi","i",l)};
          var roi_hi = ${te("uniforms.roi",`i + ${n.length}`,l)};
          var input_shape_i = ${te("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${te("uniforms.output_shape","i",s.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${d} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,xg=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${te("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Qa=(e,t,n,s)=>e.rank>s?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",n,"batch")};
`:"",$g=(e,t,n,s,u)=>{let[l,d,p,o]=n.length===2?[-1,0,1,-1]:[0,2,3,1],r=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${r} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",d,`max(0, min(row, ${n[d]} - 1))`)};
      ${e.indicesSet("input_indices",p,`max(0, min(col, ${n[p]} - 1))`)};
      ${Qa(e,o,l,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${r} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${r} = originalIndices[${d}];
      var col:${r} = originalIndices[${p}];
      ${s?`if (row < 0 || row > (${n[d]} - 1) || col < 0 || col > (${n[p]} - 1)) {
        return ${u};
      }`:""};
      row = max(0, min(row, ${n[d]} - 1));
      col = max(0, min(col, ${n[p]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${o}])`:"0"};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${l}])`:"0"};
      var x11: ${r} = getInputValue(batch, channel, row1, col1);
      var x12: ${r} = getInputValue(batch, channel, row1, col2);
      var x21: ${r} = getInputValue(batch, channel, row2, col1);
      var x22: ${r} = getInputValue(batch, channel, row2, col2);
      var dx1: ${r} = abs(row - ${r}(row1));
      var dx2: ${r} = abs(${r}(row2) - row);
      var dy1: ${r} = abs(col - ${r}(col1));
      var dy2: ${r} = abs(${r}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Tg=(e,t,n,s,u,l,d,p,o,r)=>{let i=n.length===2,a=!0,[c,h]=i?[0,1]:a?[2,3]:[1,2],m=e.type.value,b=x=>{let v=x===c?"row":"col";return`
      fn ${v}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${m} {
        var output_index = ${t.indicesGet("output_indices",x)};
        var originalIdx: ${m} = getOriginalCoordinateFromResizedCoordinate(output_index, ${u[x]},
        ${s[x]}, ${n[x]}, ${l[x]}, ${l[x]} + ${n.length});
        var fractOriginalIdx: ${m} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${p} && (originalIdx < 0 || originalIdx > (${n[x]} - 1))) {
          return ${o};
        }
        var data: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${v}: ${m} = originalIdx + ${m}(i);
          if (${v} < 0 || ${v} >= ${n[x]}) {
            ${r?`coefs[i + 1] = 0.0;
                        continue;`:p?`return ${o};`:`${v} = max(0, min(${v}, ${n[x]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",x,`u32(${v})`)};
          data[i + 1] = ${x===c?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${b(c)};
    ${b(h)};
  fn getCubicInterpolationCoefs(s: ${m}) -> array<${m}, 4> {
    var absS = abs(s);
    var coeffs: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${m} = 1.0 - absS;
    var twoMinusAbsS: ${m} = 2.0 - absS;
    var onePlusAbsS: ${m} = 1.0 + absS;
    coeffs[0] = ((${d} * onePlusAbsS - 5 * ${d}) * onePlusAbsS + 8 * ${d}) * onePlusAbsS - 4 * ${d};
    coeffs[1] = ((${d} + 2) * absS - (${d} + 3)) * absS * absS + 1;
    coeffs[2] = ((${d} + 2) * oneMinusAbsS - (${d} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${d} * twoMinusAbsS - 5 * ${d}) * twoMinusAbsS + 8 * ${d}) * twoMinusAbsS - 4 * ${d};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${m}, 4>, coefs: array<${m}, 4>) -> ${m} {
    var coefsSum: ${m} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${m} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Ig=(e,t,n,s,u)=>{let[l,d,p,o,r]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],i=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${i} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",d,`max(0, min(depth, ${n[d]} - 1))`)};
      ${e.indicesSet("input_indices",p,`max(0, min(height, ${n[p]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(width, ${n[o]} - 1))`)};
      ${Qa(e,r,l,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${i} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${i} = originalIndices[${d}];
      var height:${i} = originalIndices[${p}];
      var width:${i} = originalIndices[${o}];
      ${s?`if (depth < 0 || depth > (${n[d]} - 1) || height < 0 || height > (${n[p]} - 1) || width < 0 || (width > ${n[o]} - 1)) {
      return ${u};
        }`:""};

    depth = max(0, min(depth, ${n[d]} - 1));
      height = max(0, min(height, ${n[p]} - 1));
      width = max(0, min(width, ${n[o]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${r}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${l}])`:"0"};

      var x111: ${i} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${i} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${i} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${i} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${i} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${i} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${i} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${i} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${i} = abs(depth - ${i}(depth1));
      var dx2: ${i} = abs(${i}(depth2) - depth);
      var dy1: ${i} = abs(height - ${i}(height1));
      var dy2: ${i} = abs(${i}(height2) - height);
      var dz1: ${i} = abs(width - ${i}(width1));
      var dz2: ${i} = abs(${i}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Sg=(e,t,n,s,u,l)=>{let d=e.dims,p=bg(l,t.axes,d.length),o=yg(d,s,u,t.axes),r=s.slice();s.length===0&&(r=d.map((w,S)=>w===0?1:o[S]/w),t.keepAspectRatioPolicy!=="stretch"&&(o=_g(d,r,t)));let i=ee("output",e.dataType,o.length),a=F("input",e.dataType,d.length),c=R.size(o),h=d.length===o.length&&d.every((w,S)=>w===o[S]),m=t.coordinateTransformMode==="tf_crop_and_resize",b=t.extrapolationValue,x=a.type.value,v=w=>`
      ${h?"":`
      ${mg(t.coordinateTransformMode,x)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${xg(a,d)};
              ${gg(t.nearestMode,n,x)};
              ${vg(a,i,d,o,r.length,p.length,m)};
              `;case"linear":return`
              ${wg(i,d,o,r.length,p.length)};
              ${(()=>{if(d.length===2||d.length===4)return`${$g(a,i,d,m,b)}`;if(d.length===3||d.length===5)return`${Ig(a,i,d,m,b)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(d.length===2||d.length===4)return`${Tg(a,i,d,o,r,p,t.cubicCoeffA,m,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${w.registerUniform("output_size","u32").registerUniform("scales","f32",r.length).registerUniform("roi","f32",p.length).declareVariables(a,i)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${h?"output[global_idx] = input[global_idx];":`
        let output_indices = ${i.offsetToIndices("global_idx")};
        var input_indices: ${a.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${a.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${d.length===2||d.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${n}|${r.length>0?t.mode==="cubic"?r:r.length:""}|${u.length>0?u:""}|${p.length>0?p:""}|${h}|${t.mode==="nearest"?d.length:d}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:o,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},{type:1,data:r},{type:1,data:p},...ne(d,o)]})}},Og=e=>{let t=e.customDataBuffer;return new Uint32Array(t.buffer,t.byteOffset,1)[0]},G1=(e,t)=>{let n=[],s=[],u=[],l=Og(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");fg(e.inputs,t,l,n,s,u),e.compute(Sg(e.inputs[0],t,l,n,s,u),{inputs:[0]})},H1=e=>{let t=e.antialias,n=e.axes,s=e.coordinateTransformMode,u=e.cubicCoeffA,l=e.excludeOutside!==0,d=e.extrapolationValue,p=e.keepAspectRatioPolicy,o=e.mode,r=e.nearestMode===""?"simple":e.nearestMode;return Ie({antialias:t,axes:n,coordinateTransformMode:s,cubicCoeffA:u,excludeOutside:l,extrapolationValue:d,keepAspectRatioPolicy:p,mode:o,nearestMode:r})}}),Eg,Pg,W1,WS=N(()=>{"use strict";ae(),ue(),le(),Eg=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],n=e[1],s=e[2];if(t.dataType!==n.dataType||t.dataType!==s.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let u=t.dims[t.dims.length-1],l=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==u)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==l)throw new Error("Skip must have the same sequence length as input");if(s.dims.length!==1)throw new Error("Gamma must be 1D");if(s.dims[s.dims.length-1]!==u)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let d=e[3];if(d.dims.length!==1)throw new Error("Beta must be 1D");if(d.dims[d.dims.length-1]!==u)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let d=e[4];if(d.dims.length!==1)throw new Error("Bias must be 1D");if(d.dims[d.dims.length-1]!==u)throw new Error("Bias must have the same hidden size as input")}},Pg=(e,t,n,s)=>{let u=t.simplified,l=e[0].dims,d=R.size(l),p=l,o=d,r=l.slice(-1)[0],i=s?l.slice(0,-1).concat(1):[],a=!u&&e.length>3,c=e.length>4,h=s&&n>1,m=s&&n>2,b=n>3,x=64,v=je(r),w=[{type:12,data:o},{type:12,data:v},{type:12,data:r},{type:1,data:t.epsilon}],S=E=>{let A=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],k=[F("x",e[0].dataType,e[0].dims,v),F("skip",e[1].dataType,e[1].dims,v),F("gamma",e[2].dataType,e[2].dims,v)];a&&k.push(F("beta",e[3].dataType,e[3].dims,v)),c&&k.push(F("bias",e[4].dataType,e[4].dims,v)),k.push(ee("output",e[0].dataType,p,v)),h&&k.push(ee("mean_output",1,i)),m&&k.push(ee("inv_std_output",1,i)),b&&k.push(ee("input_skip_bias_sum",e[0].dataType,p,v));let I=We(e[0].dataType),M=We(1,v);return`

      ${E.registerUniforms(A).declareVariables(...k)}
      var<workgroup> sum_shared : array<${M}, ${x}>;
      var<workgroup> sum_squared_shared : array<${M}, ${x}>;

      ${E.mainStart([x,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${x};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${x};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${x-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${c?"bias[offset1d + i]":I+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${b?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${un(I,v,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${x};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${hr("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${hr("square_sum",v)} / f32(uniforms.hidden_size) ${u?"":"- mean * mean"} + uniforms.epsilon);
        ${h?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${u?"":`- ${I}(mean)`}) *
            ${I}(inv_std_dev) * gamma[offset1d + i]
            ${a?"+ beta[offset1d + i]":""};
        }
      }`},O=[{dims:p,dataType:e[0].dataType}];return n>1&&O.push({dims:i,dataType:1}),n>2&&O.push({dims:i,dataType:1}),n>3&&O.push({dims:l,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${h};${m};${b}`,inputDependencies:e.map((E,A)=>"type")},getShaderSource:S,getRunData:()=>({outputs:O,dispatchGroup:{x:Math.ceil(o/r)},programUniforms:w})}},W1=(e,t)=>{Eg(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(Pg(e.inputs,t,e.outputCount,!1),{outputs:n})}}),Ag,Rn,kg,es,Dg,Ng,K1,X1,KS=N(()=>{"use strict";ae(),ue(),Fe(),le(),Ag=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((n,s)=>{if(e[s+1].dataType!==6&&e[s+1].dataType!==7)throw new Error(`Input ${s} must be an array of int32 or int64`)})},Rn=(e,t)=>{let n=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(s=>n.push(Number(s)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(s=>n.push(Number(s)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return n},kg=(e,t)=>{if(e.length>1){let n=Rn(e,1),s=Rn(e,2),u=Rn(e,3);return u.length===0&&(u=[...Array(e[0].dims.length).keys()]),Ie({starts:n,ends:s,axes:u})}else return t},es=(e,t,n,s,u)=>{let l=e;return e<0&&(l+=n[s[t]]),u[t]<0?Math.max(0,Math.min(l,n[s[t]]-1)):Math.max(0,Math.min(l,n[s[t]]))},Dg=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${n.length-1}; i >= 0; i--) {
            let input_shape_i = ${te("uniforms.input_shape","i",n.length)};
            let steps_i = ${te("uniforms.steps","i",n.length)};
            let signs_i = ${te("uniforms.signs","i",n.length)};
            let starts_i = ${te("uniforms.starts","i",n.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Ng=(e,t)=>{let n=e[0].dims,s=R.size(n),u=t.axes.length>0?R.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],l=Rn(e,4);l.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),l.length===0&&(l=Array(u.length).fill(1));let d=t.starts.map((v,w)=>es(v,w,n,u,l)),p=t.ends.map((v,w)=>es(v,w,n,u,l));if(u.length!==d.length||u.length!==p.length)throw new Error("start, ends and axes should have the same number of elements");if(u.length!==n.length)for(let v=0;v<n.length;++v)u.includes(v)||(d.splice(v,0,0),p.splice(v,0,n[v]),l.splice(v,0,1));let o=l.map(v=>Math.sign(v));l.forEach((v,w,S)=>{if(v<0){let O=(p[w]-d[w])/v,E=d[w],A=E+O*l[w];d[w]=A,p[w]=E,S[w]=-v}});let r=n.slice(0);u.forEach((v,w)=>{r[v]=Math.ceil((p[v]-d[v])/l[v])});let i={dims:r,dataType:e[0].dataType},a=ee("output",e[0].dataType,r.length),c=F("input",e[0].dataType,e[0].dims.length),h=R.size(r),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:d.length},{name:"signs",type:"i32",length:o.length},{name:"steps",type:"u32",length:l.length}],b=[{type:12,data:h},{type:12,data:d},{type:6,data:o},{type:12,data:l},...ne(e[0].dims,r)],x=v=>`
      ${v.registerUniforms(m).declareVariables(c,a)}
        ${Dg(c,a,n)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${a.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${a.setByOffset("global_idx",c.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${o.length}_${d.length}_${l.length}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[i],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:b})}},K1=(e,t)=>{Ag(e.inputs,t);let n=kg(e.inputs,t);e.compute(Ng(e.inputs,n),{inputs:[0]})},X1=e=>{let t=e.starts,n=e.ends,s=e.axes;return Ie({starts:t,ends:n,axes:s})}}),Cg,zg,Z1,J1,XS=N(()=>{"use strict";ae(),ue(),Fe(),mr(),le(),Cg=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},zg=(e,t)=>{let n=e.inputs[0],s=n.dims,u=R.size(s),l=s.length,d=R.normalizeAxis(t.axis,l),p=d<s.length-1,o,r=[];p?(r=Array.from({length:l},(k,I)=>I),r[d]=l-1,r[l-1]=d,o=e.compute(ht(n,r),{inputs:[n],outputs:[-1]})[0]):o=n;let i=o.dims,a=i[l-1],c=u/a,h=je(a),m=a/h,b=64;c===1&&(b=256);let x=(k,I)=>I===4?`max(max(${k}.x, ${k}.y), max(${k}.z, ${k}.w))`:I===2?`max(${k}.x, ${k}.y)`:I===3?`max(max(${k}.x, ${k}.y), ${k}.z)`:k,v=F("x",o.dataType,o.dims,h),w=ee("result",o.dataType,o.dims,h),S=v.type.value,O=We(o.dataType)==="f32"?`var threadMax = ${S}(-3.4028234663852886e+38f);`:`var threadMax = ${S}(-65504.0h);`,E=k=>`
      var<workgroup> rowMaxShared : ${S};
      var<workgroup> rowSumShared : ${S};
      var<workgroup> threadShared : array<${S}, ${b}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${S} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${S}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${k.registerUniform("packedCols","i32").declareVariables(v,w)}
      ${k.mainStart(b)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${b};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${O}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${S}(${x("threadShared[0]",h)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${S}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${S}(${hr("threadShared[0]",h)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${S}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,A=e.compute({name:"Softmax",shaderCache:{hint:`${h};${b}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:i,dataType:o.dataType}],dispatchGroup:{x:c},programUniforms:[{type:6,data:m}]}),getShaderSource:E},{inputs:[o],outputs:[p?-1:0]})[0];p&&e.compute(ht(A,r),{inputs:[A]})},Z1=(e,t)=>{Cg(e.inputs),zg(e,t)},J1=e=>Ie({axis:e.axis})}),ts,Rg,Bg,Mg,Y1,ZS=N(()=>{"use strict";ae(),ue(),le(),ts=e=>Array.from(e.getBigInt64Array(),Number),Rg=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(ts(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Bg=(e,t)=>{let n=[];for(let s=0;s<e.length;++s)n.push(e[s]*t[s]);return n},Mg=(e,t)=>{let n=e[0].dims,s=t??ts(e[1]),u=Bg(n,s),l=R.size(u),d=e[0].dataType,p=F("input",d,n.length),o=ee("output",d,u.length),r=i=>`
      const inputShape = ${p.indices(...n)};
      ${i.registerUniform("output_size","u32").declareVariables(p,o)}
      ${i.mainStart()}
      ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${o.offsetToIndices("global_idx")};
      var input_indices: ${p.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${p.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${o.indicesGet("output_indices","i")}  % input_dim_i;

        ${p.indicesSet("input_indices","i","input_dim_value")}
      }
      ${o.setByOffset("global_idx",p.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${s}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:[{type:12,data:l},...ne(e[0].dims,u)]}),getShaderSource:r}},Y1=e=>{Rg(e.inputs),e.compute(Mg(e.inputs),{inputs:[0]})}}),jg,Fg,Q1,JS=N(()=>{"use strict";ae(),ue(),le(),jg=(e,t,n,s,u)=>{let l=ee("output_data",u,n.length,4),d=F("a_data",t[1].dataType,t[1].dims.length,4),p=F("b_data",t[2].dataType,t[2].dims.length,4),o=F("c_data",t[0].dataType,t[0].dims.length,4),r,i=(a,c,h)=>`select(${c}, ${a}, ${h})`;if(!s)r=l.setByOffset("global_idx",i(d.getByOffset("global_idx"),p.getByOffset("global_idx"),o.getByOffset("global_idx")));else{let a=(c,h,m="")=>{let b=`a_data[index_a${h}][component_a${h}]`,x=`b_data[index_b${h}][component_b${h}]`,v=`bool(c_data[index_c${h}] & (0xffu << (component_c${h} * 8)))`;return`
            let output_indices${h} = ${l.offsetToIndices(`global_idx * 4u + ${h}u`)};
            let offset_a${h} = ${d.broadcastedIndicesToOffset(`output_indices${h}`,l)};
            let offset_b${h} = ${p.broadcastedIndicesToOffset(`output_indices${h}`,l)};
            let offset_c${h} = ${o.broadcastedIndicesToOffset(`output_indices${h}`,l)};
            let index_a${h} = offset_a${h} / 4u;
            let index_b${h} = offset_b${h} / 4u;
            let index_c${h} = offset_c${h} / 4u;
            let component_a${h} = offset_a${h} % 4u;
            let component_b${h} = offset_b${h} % 4u;
            let component_c${h} = offset_c${h} % 4u;
            ${c}[${h}] = ${m}(${i(b,x,v)});
          `};u===9?r=`
            var data = vec4<u32>(0);
            ${a("data",0,"u32")}
            ${a("data",1,"u32")}
            ${a("data",2,"u32")}
            ${a("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:r=`
            ${a("output_data[global_idx]",0)}
            ${a("output_data[global_idx]",1)}
            ${a("output_data[global_idx]",2)}
            ${a("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(o,d,p,l)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${r}
      }`},Fg=e=>{let t=e[1].dims,n=e[2].dims,s=e[0].dims,u=e[1].dataType,l=!(R.areEqual(t,n)&&R.areEqual(n,s)),d=t,p=R.size(t);if(l){let r=pn.calcShape(pn.calcShape(t,n,!1),s,!1);if(!r)throw new Error("Can't perform where op on the given tensors");d=r,p=R.size(d)}let o=Math.ceil(p/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:r=>jg(r,e,d,l,u),getRunData:()=>({outputs:[{dims:d,dataType:u}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:o},...ne(s,t,n,d)]})}},Q1=e=>{e.compute(Fg(e.inputs))}}),e2,YS=N(()=>{"use strict";pS(),zu(),cS(),hS(),fS(),mS(),gS(),vS(),$S(),TS(),IS(),SS(),OS(),ES(),PS(),AS(),kS(),DS(),NS(),CS(),zS(),RS(),BS(),MS(),jS(),FS(),_1(),LS(),VS(),US(),qS(),GS(),Cu(),HS(),T1(),WS(),KS(),XS(),x1(),ZS(),mr(),Ru(),JS(),e2=new Map([["Abs",[qw]],["Acos",[Gw]],["Acosh",[Hw]],["Add",[Ov]],["ArgMax",[Fw,ru]],["ArgMin",[jw,ru]],["Asin",[Ww]],["Asinh",[Kw]],["Atan",[Xw]],["Atanh",[Zw]],["Attention",[Lw]],["AveragePool",[N1,D1]],["BatchNormalization",[Vw]],["BiasAdd",[Uw]],["BiasSplitGelu",[Sv]],["Cast",[Yw,Jw]],["Ceil",[ev]],["Clip",[Qw]],["Concat",[Bv,Mv]],["Conv",[uu,su]],["ConvTranspose",[Kv,Wv]],["Cos",[tv]],["Cosh",[rv]],["CumSum",[Xv,Zv]],["DepthToSpace",[Jv,Yv]],["DequantizeLinear",[F1,L1]],["DFT",[Qv,e1]],["Div",[Ev]],["Einsum",[t1,r1]],["Elu",[nv,Gn]],["Equal",[Pv]],["Erf",[iv]],["Exp",[ov]],["Expand",[n1]],["FastGelu",[i1]],["Floor",[av]],["FusedConv",[uu,su]],["Gather",[a1,o1]],["GatherElements",[c1,p1]],["GatherBlockQuantized",[l1,d1]],["GatherND",[s1,u1]],["Gelu",[sv]],["Gemm",[f1,h1]],["GlobalAveragePool",[z1,C1]],["GlobalMaxPool",[j1,M1]],["Greater",[Nv]],["GreaterOrEqual",[zv]],["GridSample",[m1,g1]],["GroupQueryAttention",[I1]],["HardSigmoid",[mv,fv]],["HardSwish",[gv]],["InstanceNormalization",[S1]],["LayerNormalization",[O1]],["LeakyRelu",[uv,Gn]],["Less",[Cv]],["LessOrEqual",[Rv]],["Log",[Tv]],["MatMul",[E1]],["MatMulNBits",[P1,A1]],["MaxPool",[R1,B1]],["Mul",[Av]],["MultiHeadAttention",[y1,b1]],["Neg",[dv]],["Not",[lv]],["Pad",[k1]],["Pow",[kv]],["QuickGelu",[Iv,Gn]],["Range",[V1]],["Reciprocal",[pv]],["ReduceMin",[Cw]],["ReduceMean",[Pw]],["ReduceMax",[Nw]],["ReduceSum",[Rw]],["ReduceProd",[zw]],["ReduceL1",[Aw]],["ReduceL2",[kw]],["ReduceLogSum",[Mw]],["ReduceLogSumExp",[Dw]],["ReduceSumSquare",[Bw]],["Relu",[cv]],["Resize",[G1,H1]],["RotaryEmbedding",[$1]],["ScatterND",[q1,U1]],["Sigmoid",[hv]],["Sin",[bv]],["Sinh",[yv]],["Slice",[K1,X1]],["SkipLayerNormalization",[W1]],["Split",[w1,v1]],["Sqrt",[_v]],["Softmax",[Z1,J1]],["Sub",[Dv]],["Tan",[wv]],["Tanh",[vv]],["ThresholdedRelu",[$v,Gn]],["Tile",[Y1]],["Transpose",[bw,yw]],["Where",[Q1]]])}),t2,QS=N(()=>{"use strict";Qe(),Wt(),le(),t2=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,n,s,u){Mt(e.programInfo.name);let l=this.backend.device,d=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let p=[];for(let r of t)p.push({binding:p.length,resource:{buffer:r.buffer}});for(let r of n)p.push({binding:p.length,resource:{buffer:r.buffer}});u&&p.push({binding:p.length,resource:u});let o=l.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:p,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let r={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:o,dispatchGroup:s};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(r)}d.setPipeline(e.computePipeline),d.setBindGroup(0,o),d.dispatchWorkgroups(...s),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),At(e.programInfo.name)}dispose(){}build(e,t){Mt(e.name);let n=this.backend.device,s=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(r=>{n.features.has(r.feature)&&s.push(`enable ${r.extension};`)});let u=gw(t,this.backend.device.limits),l=e.getShaderSource(u),d=`${s.join(`
`)}
${u.additionalImplementations}
${l}`,p=n.createShaderModule({code:d,label:e.name});we("verbose",()=>`[WebGPU] ${e.name} shader code: ${d}`);let o=n.createComputePipeline({compute:{module:p,entryPoint:"main"},layout:"auto",label:e.name});return At(e.name),{programInfo:e,computePipeline:o,uniformVariablesInfo:u.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,n=typeof e=="number"?1:e.y||1,s=typeof e=="number"?1:e.z||1,u=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=u&&n<=u&&s<=u)return[t,n,s];let l=t*n*s,d=Math.ceil(Math.sqrt(l));if(d>u){if(d=Math.ceil(Math.cbrt(l)),d>u)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[d,d,d]}else return[d,d,1]}}}),r2={};Xr(r2,{WebGpuBackend:()=>n2});var Lg,Vg,Ug,n2,eO=N(()=>{"use strict";Qe(),ae(),Wt(),pw(),lS(),YS(),QS(),Lg=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let s=0;s<e.length;++s){let u=e[s].dataType;switch(t[s]){case"none":{n.push("");break}case"type":{n.push(`${u}`);break}case"rank":{let l=e[s].dims.length;n.push(`${u};${l}`);break}case"dims":{let l=e[s].dims.join(",");n.push(`${u};${l}`);break}default:throw new Error(`unsupported input dependency: ${t[s]}`)}}return n.join("|")},Vg=(e,t,n)=>{var u,l;let s=e.name;return(u=e.shaderCache)!=null&&u.hint&&(s+="["+e.shaderCache.hint+"]"),s+=":"+n+`:${Lg(t,((l=e.shaderCache)==null?void 0:l.inputDependencies)??new Array(t.length).fill("dims"))}`,s},Ug=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},n2=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let n=[],s={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},u=p=>t.features.has(p)&&n.push(p)&&!0;u("chromium-experimental-timestamp-query-inside-passes")||u("timestamp-query"),u("shader-f16"),u("subgroups"),this.device=await t.requestDevice(s);let l=t,d=t.info??(typeof l.requestAdapterInfo=="function"?await l.requestAdapterInfo():void 0);this.adapterInfo=new Ug(d),this.gpuDataManager=fw(this),this.programManager=new t2(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Au(e.logLevel,!!e.debug),this.device.onuncapturederror=p=>{p.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${p.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){var e;typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&((e=this.env)!=null&&e.webgpu)&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Mt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{var s;let t=new BigUint64Array(e.getMappedRange()),n=this.pendingQueries.get(e);for(let u=0;u<t.length/2;u++){let l=n[u],d=l.kernelId,p=this.kernels.get(d),o=p.kernelType,r=p.kernelName,i=l.programName,a=l.inputTensorViews,c=l.outputTensorViews,h=t[u*2],m=t[u*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=h);let b=Number(h-this.queryTimeBase),x=Number(m-this.queryTimeBase);if(!Number.isSafeInteger(b)||!Number.isSafeInteger(x))throw new RangeError("incorrect timestamp range");if((s=this.env.webgpu.profiling)!=null&&s.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:a.map(v=>({dims:v.dims,dataType:Gt(v.dataType)})),outputsMetadata:c.map(v=>({dims:v.dims,dataType:Gt(v.dataType)})),kernelId:d,kernelType:o,kernelName:r,programName:i,startTime:b,endTime:x});else{let v="";a.forEach((S,O)=>{v+=`input[${O}]: [${S.dims}] | ${Gt(S.dataType)}, `});let w="";c.forEach((S,O)=>{w+=`output[${O}]: [${S.dims}] | ${Gt(S.dataType)}, `}),console.log(`[profiling] kernel "${d}|${o}|${r}|${i}" ${v}${w}start time: ${b} ns, execution time: ${x-b} ns`)}Li("GPU",`${i}::${h}::${m}`)}e.unmap(),this.pendingQueries.delete(e)}),At()}run(e,t,n,s,u,l){Mt(e.name);let d=[];for(let w=0;w<t.length;++w){let S=t[w].data;if(S===0)continue;let O=this.gpuDataManager.get(S);if(!O)throw new Error(`no GPU data for input: ${S}`);d.push(O)}let{outputs:p,dispatchGroup:o,programUniforms:r}=e.getRunData(t),i=n.length===0?p.map((w,S)=>S):n;if(i.length!==p.length)throw new Error(`Output size ${i.length} must be equal to ${p.length}.`);let a=[],c=[];for(let w=0;w<p.length;++w){if(!Number.isInteger(i[w])||i[w]<-3||i[w]>=l)throw new Error(`Invalid output index: ${i[w]}`);if(i[w]===-3)continue;let S=i[w]===-1,O=i[w]===-2,E=S||O?u(p[w].dataType,p[w].dims):s(i[w],p[w].dataType,p[w].dims);if(a.push(E),E.data===0)continue;let A=this.gpuDataManager.get(E.data);if(!A)throw new Error(`no GPU data for output: ${E.data}`);if(S&&this.temporaryData.push(A),O){let k=this.kernelPersistentData.get(this.currentKernelId);k||(k=[],this.kernelPersistentData.set(this.currentKernelId,k)),k.push(A)}c.push(A)}if(d.length!==t.length||c.length!==a.length){if(c.length===0)return At(e.name),a;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let h;if(r){let w=0,S=[];r.forEach(k=>{let I=typeof k.data=="number"?[k.data]:k.data;if(I.length===0)return;let M=k.type===10?2:4,q,J;k.type===10?(J=I.length>4?16:I.length>2?8:I.length*M,q=I.length>4?16:M*I.length):(J=I.length<=2?I.length*M:16,q=16),w=Math.ceil(w/J)*J,S.push(w);let K=k.type===10?8:4;w+=I.length>4?Math.ceil(I.length/K)*q:I.length*M});let O=16;w=Math.ceil(w/O)*O;let E=new ArrayBuffer(w);r.forEach((k,I)=>{let M=S[I],q=typeof k.data=="number"?[k.data]:k.data;if(k.type===6)new Int32Array(E,M,q.length).set(q);else if(k.type===12)new Uint32Array(E,M,q.length).set(q);else if(k.type===10)new Uint16Array(E,M,q.length).set(q);else if(k.type===1)new Float32Array(E,M,q.length).set(q);else throw new Error(`Unsupported uniform type: ${Gt(k.type)}`)});let A=this.gpuDataManager.create(w,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(A.buffer,0,E,0,w),this.gpuDataManager.release(A.id),h={offset:0,size:w,buffer:A.buffer}}let m=this.programManager.normalizeDispatchGroupSize(o),b=m[1]===1&&m[2]===1,x=Vg(e,t,b),v=this.programManager.getArtifact(x);if(v||(v=this.programManager.build(e,m),this.programManager.setArtifact(x,v),we("info",()=>`[artifact] key: ${x}, programName: ${e.name}`)),r&&v.uniformVariablesInfo){if(r.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${r.length} in program "${v.programInfo.name}".`);for(let w=0;w<r.length;w++){let S=r[w],O=S.type,E=typeof S.data=="number"?1:S.data.length,[A,k]=v.uniformVariablesInfo[w];if(O!==A||E!==k)throw new Error(`Uniform variable ${w} mismatch: expect type ${A} with size ${k}, got type ${O} with size ${E} in program "${v.programInfo.name}".`)}}if(we("info",()=>`[ProgramManager] run "${e.name}" (key=${x}) with ${m[0]}x${m[1]}x${m[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let w={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:t,outputTensorViews:a};this.pendingKernels.push(w),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(w)}return this.programManager.run(v,d,c,m,h),At(e.name),a}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,n,s){let u=e2.get(e);if(!u)throw new Error(`kernel not implemented: ${e}`);let l={kernelType:e,kernelName:s,kernelEntry:u[0],attributes:[u[1],n]};this.kernels.set(t,l)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let n of t)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,n){let s=this.kernels.get(e);if(!s)throw new Error(`kernel not created: ${e}`);let u=s.kernelType,l=s.kernelName,d=s.kernelEntry,p=s.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${u}] ${l}" is not allowed to be called recursively`);this.currentKernelId=e,p[0]&&(p[1]=p[0](p[1]),p[0]=void 0),we("info",()=>`[WebGPU] Start to run kernel "[${u}] ${l}"...`);let o=this.env.debug;this.temporaryData=[];try{return o&&this.device.pushErrorScope("validation"),d(t,p[1]),0}catch(r){return n.push(Promise.resolve(`[WebGPU] Kernel "[${u}] ${l}" failed. ${r}`)),1}finally{o&&n.push(this.device.popErrorScope().then(r=>r?`GPU validation error for kernel "[${u}] ${l}": ${r.message}`:null));for(let r of this.temporaryData)this.gpuDataManager.release(r.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,n,s){let u=this.sessionExternalDataMapping.get(e);u||(u=new Map,this.sessionExternalDataMapping.set(e,u));let l=u.get(t),d=this.gpuDataManager.registerExternalBuffer(n,s,l);return u.set(t,[d,n]),d}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,n){return async()=>{let s=await Qs(this,e,t);return ku(s.buffer,n)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){var e;this.queryType="none",(((e=this.env.webgpu.profiling)==null?void 0:e.mode)==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){we("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){we("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){we("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),n=e.length;this.pendingKernels=[];for(let s=0;s<n;s++){let u=this.getComputePassEncoder(),l=e[s];this.writeTimestamp(this.pendingDispatchNumber*2),u.setPipeline(l.computePipeline),u.setBindGroup(0,l.bindGroup),u.dispatchWorkgroups(...l.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[s]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),i2={};Xr(i2,{init:()=>o2});var Ci,qg,o2,tO=N(()=>{"use strict";ae(),Wt(),ue(),uS(),Ci=class a2{constructor(t,n,s,u){this.module=t,this.dataType=n,this.data=s,this.dims=u}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(R.size(t)!==R.size(this.dims))throw new Error("Invalid new shape");return new a2(this.module,this.dataType,this.data,t)}},qg=class{constructor(e,t,n){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let s=e.PTR_SIZE,u=n/e.PTR_SIZE,l=s===4?"i32":"i64";this.opKernelContext=Number(e.getValue(s*u++,l));let d=Number(e.getValue(s*u++,l));this.outputCount=Number(e.getValue(s*u++,l)),this.customDataOffset=Number(e.getValue(s*u++,"*")),this.customDataSize=Number(e.getValue(s*u++,l));let p=[];for(let o=0;o<d;o++){let r=Number(e.getValue(s*u++,l)),i=Number(e.getValue(s*u++,"*")),a=Number(e.getValue(s*u++,l)),c=[];for(let h=0;h<a;h++)c.push(Number(e.getValue(s*u++,l)));p.push(new Ci(e,r,i,c))}this.inputs=p}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){var d;let n=((d=t==null?void 0:t.inputs)==null?void 0:d.map(p=>typeof p=="number"?this.inputs[p]:p))??this.inputs,s=(t==null?void 0:t.outputs)??[],u=(p,o,r)=>new Ci(this.module,o,this.output(p,r),r),l=(p,o)=>{let r=Lr(p,o);if(!r)throw new Error(`Unsupported data type: ${p}`);let i=r>0?this.backend.gpuDataManager.create(r).id:0;return new Ci(this.module,p,i,o)};return this.backend.run(e,n,s,u,l,this.outputCount)}output(e,t){let n=this.module.stackSave();try{let s=this.module.PTR_SIZE,u=s===4?"i32":"i64",l=this.module.stackAlloc((1+t.length)*s);this.module.setValue(l,t.length,u);for(let d=0;d<t.length;d++)this.module.setValue(l+s*(d+1),t[d],u);return this.module._JsepOutput(this.opKernelContext,e,l)}catch(s){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${s}`)}finally{this.module.stackRestore(n)}}},o2=async(e,t,n,s)=>{let u=t.jsepInit;if(!u)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let l=(eO(),ln(r2)).WebGpuBackend,d=new l;await d.initialize(n,s),u("webgpu",[d,p=>d.alloc(Number(p)),p=>d.free(p),(p,o,r,i=!1)=>{if(i)we("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(p)}, dst=${Number(o)}, size=${Number(r)}`),d.memcpy(Number(p),Number(o));else{we("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(p)}, gpuDataId=${Number(o)}, size=${Number(r)}`);let a=t.HEAPU8.subarray(Number(p>>>0),Number(p>>>0)+Number(r));d.upload(Number(o),a)}},async(p,o,r)=>{we("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${p}, dataOffset=${o}, size=${r}`),await d.download(Number(p),()=>t.HEAPU8.subarray(Number(o)>>>0,Number(o+r)>>>0))},(p,o,r)=>d.createKernel(p,Number(o),r,t.UTF8ToString(t._JsepGetNodeName(Number(o)))),p=>d.releaseKernel(p),(p,o,r,i)=>{we("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${r}, kernel=${p}, contextDataOffset=${o}`);let a=new qg(t,d,Number(o));return d.computeKernel(Number(p),a,i)},()=>d.captureBegin(),()=>d.captureEnd(),()=>d.replay()])}else{let l=new hw(n);u("webnn",[l,()=>l.reserveTensorId(),d=>l.releaseTensorId(d),async(d,p,o,r,i)=>l.ensureTensor(d,p,o,r,i),(d,p)=>{l.uploadTensor(d,p)},async(d,p)=>l.downloadTensor(d,p),(d,p)=>l.registerMLContext(d,p),!!n.trace])}}}),Gg,Vu,Uu,nr,Hg,rs,Ji,qu,Gu,ns,Hu,Wu,Ku,s2=N(()=>{"use strict";Qe(),oS(),aS(),ae(),Jr(),Su(),sw(),Gg=(e,t)=>{Ce()._OrtInit(e,t)!==0&&Ee("Can't initialize onnxruntime.")},Vu=async e=>{Gg(e.wasm.numThreads,Hi(e.logLevel))},Uu=async(e,t)=>{var s,u;(u=(s=Ce()).asyncInit)==null||u.call(s);let n=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let l=e.webgpu.powerPreference;if(l!==void 0&&l!=="low-power"&&l!=="high-performance")throw new Error(`Invalid powerPreference setting: "${l}"`);let d=e.webgpu.forceFallbackAdapter;if(d!==void 0&&typeof d!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${d}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:l,forceFallbackAdapter:d}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let l=(tO(),ln(i2)).init;t==="webgpu"&&await l("webgpu",Ce(),e,n),t==="webnn"&&await l("webnn",Ce(),e)}},nr=new Map,Hg=e=>{let t=Ce(),n=t.stackSave();try{let s=t.PTR_SIZE,u=t.stackAlloc(2*s);t._OrtGetInputOutputCount(e,u,u+s)!==0&&Ee("Can't get session input/output count.");let l=s===4?"i32":"i64";return[Number(t.getValue(u,l)),Number(t.getValue(u+s,l))]}finally{t.stackRestore(n)}},rs=(e,t)=>{let n=Ce(),s=n.stackSave(),u=0;try{let l=n.PTR_SIZE,d=n.stackAlloc(2*l);n._OrtGetInputOutputMetadata(e,t,d,d+l)!==0&&Ee("Can't get session input/output metadata.");let p=Number(n.getValue(d,"*"));u=Number(n.getValue(d+l,"*"));let o=n.HEAP32[u/4];if(o===0)return[p,0];let r=n.HEAPU32[u/4+1],i=[];for(let a=0;a<r;a++){let c=Number(n.getValue(u+8+a*l,"*"));i.push(c!==0?n.UTF8ToString(c):Number(n.getValue(u+8+(a+r)*l,"*")))}return[p,o,i]}finally{n.stackRestore(s),u!==0&&n._OrtFree(u)}},Ji=e=>{let t=Ce(),n=t._malloc(e.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},qu=async(e,t)=>{var a,c,h,m;let n,s,u=Ce();Array.isArray(e)?[n,s]=e:e.buffer===u.HEAPU8.buffer?[n,s]=[e.byteOffset,e.byteLength]:[n,s]=Ji(e);let l=0,d=0,p=0,o=[],r=[],i=[];try{if([d,o]=await aw(t),(t==null?void 0:t.externalData)&&u.mountExternalData){let I=[];for(let M of t.externalData){let q=typeof M=="string"?M:M.path,J=typeof M=="string"?M:M.data;I.push(Pu(J).then(K=>{u.mountExternalData(q,K)}))}await Promise.all(I)}for(let I of(t==null?void 0:t.executionProviders)??[])if((typeof I=="string"?I:I.name)==="webnn"){if(u.shouldTransferToMLTensor=!1,typeof I!="string"){let M=I,q=M==null?void 0:M.context,J=M==null?void 0:M.gpuDevice,K=M==null?void 0:M.deviceType,C=M==null?void 0:M.powerPreference;q?u.currentContext=q:J?u.currentContext=await u.webnnCreateMLContext(J):u.currentContext=await u.webnnCreateMLContext({deviceType:K,powerPreference:C})}else u.currentContext=await u.webnnCreateMLContext();break}l=await u._OrtCreateSession(n,s,d),(a=u.webgpuOnCreateSession)==null||a.call(u,l),l===0&&Ee("Can't create a session."),(c=u.jsepOnCreateSession)==null||c.call(u),u.currentContext&&(u.webnnRegisterMLContext(l,u.currentContext),u.currentContext=void 0,u.shouldTransferToMLTensor=!0);let[b,x]=Hg(l),v=!!(t!=null&&t.enableGraphCapture),w=[],S=[],O=[],E=[],A=[];for(let I=0;I<b;I++){let[M,q,J]=rs(l,I);M===0&&Ee("Can't get an input name."),r.push(M);let K=u.UTF8ToString(M);w.push(K),O.push(q===0?{name:K,isTensor:!1}:{name:K,isTensor:!0,type:Gt(q),shape:J})}for(let I=0;I<x;I++){let[M,q,J]=rs(l,I+b);M===0&&Ee("Can't get an output name."),i.push(M);let K=u.UTF8ToString(M);S.push(K),E.push(q===0?{name:K,isTensor:!1}:{name:K,isTensor:!0,type:Gt(q),shape:J});{if(v&&(t==null?void 0:t.preferredOutputLocation)===void 0){A.push("gpu-buffer");continue}let C=typeof(t==null?void 0:t.preferredOutputLocation)=="string"?t.preferredOutputLocation:((h=t==null?void 0:t.preferredOutputLocation)==null?void 0:h[K])??"cpu",B=u.webnnIsGraphOutput;if(C==="cpu"&&B&&B(l,K)){A.push("ml-tensor-cpu-output");continue}if(C!=="cpu"&&C!=="cpu-pinned"&&C!=="gpu-buffer"&&C!=="ml-tensor")throw new Error(`Not supported preferred output location: ${C}.`);if(v&&C!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${C}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);A.push(C)}}let k=null;return A.some(I=>I==="gpu-buffer"||I==="ml-tensor"||I==="ml-tensor-cpu-output")&&(p=u._OrtCreateBinding(l),p===0&&Ee("Can't create IO binding."),k={handle:p,outputPreferredLocations:A,outputPreferredLocationsEncoded:A.map(I=>I==="ml-tensor-cpu-output"?"ml-tensor":I).map(I=>Ys(I))}),nr.set(l,[l,r,i,k,v,!1]),[l,w,S,O,E]}catch(b){throw r.forEach(x=>u._OrtFree(x)),i.forEach(x=>u._OrtFree(x)),p!==0&&u._OrtReleaseBinding(p)!==0&&Ee("Can't release IO binding."),l!==0&&u._OrtReleaseSession(l)!==0&&Ee("Can't release session."),b}finally{u._free(n),d!==0&&u._OrtReleaseSessionOptions(d)!==0&&Ee("Can't release session options."),o.forEach(b=>u._free(b)),(m=u.unmountExternalData)==null||m.call(u)}},Gu=e=>{var o,r,i;let t=Ce(),n=nr.get(e);if(!n)throw new Error(`cannot release session. invalid session id: ${e}`);let[s,u,l,d,p]=n;d&&(p&&t._OrtClearBoundOutputs(d.handle)!==0&&Ee("Can't clear bound outputs."),t._OrtReleaseBinding(d.handle)!==0&&Ee("Can't release IO binding.")),(o=t.jsepOnReleaseSession)==null||o.call(t,e),(r=t.webnnOnReleaseSession)==null||r.call(t,e),(i=t.webgpuOnReleaseSession)==null||i.call(t,e),u.forEach(a=>t._OrtFree(a)),l.forEach(a=>t._OrtFree(a)),t._OrtReleaseSession(s)!==0&&Ee("Can't release session."),nr.delete(e)},ns=async(e,t,n,s,u,l,d=!1)=>{if(!e){t.push(0);return}let p=Ce(),o=p.PTR_SIZE,r=e[0],i=e[1],a=e[3],c=a,h,m;if(r==="string"&&(a==="gpu-buffer"||a==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(d&&a!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${l} when enableGraphCapture is true.`);if(a==="gpu-buffer"){let v=e[2].gpuBuffer;m=Lr(Fr(r),i);{let w=p.jsepRegisterBuffer;if(!w)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');h=w(s,l,v,m)}}else if(a==="ml-tensor"){let v=e[2].mlTensor;m=Lr(Fr(r),i);let w=p.webnnRegisterMLTensor;if(!w)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');h=w(s,v,Fr(r),i)}else{let v=e[2];if(Array.isArray(v)){m=o*v.length,h=p._malloc(m),n.push(h);for(let w=0;w<v.length;w++){if(typeof v[w]!="string")throw new TypeError(`tensor data at index ${w} is not a string`);p.setValue(h+w*o,Et(v[w],n),"*")}}else{let w=p.webnnIsGraphInput,S=p.webnnIsGraphOutput;if(r!=="string"&&w&&S){let O=p.UTF8ToString(u);if(w(s,O)||S(s,O)){let E=Fr(r);m=Lr(E,i),c="ml-tensor";let A=p.webnnCreateTemporaryTensor,k=p.webnnUploadTensor;if(!A||!k)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let I=await A(s,E,i);k(I,new Uint8Array(v.buffer,v.byteOffset,v.byteLength)),h=I}else m=v.byteLength,h=p._malloc(m),n.push(h),p.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,m),h)}else m=v.byteLength,h=p._malloc(m),n.push(h),p.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,m),h)}}let b=p.stackSave(),x=p.stackAlloc(4*i.length);try{i.forEach((w,S)=>p.setValue(x+S*o,w,o===4?"i32":"i64"));let v=p._OrtCreateTensor(Fr(r),h,m,x,i.length,Ys(c));v===0&&Ee(`Can't create tensor for input/output. session=${s}, index=${l}.`),t.push(v)}finally{p.stackRestore(b)}},Hu=async(e,t,n,s,u,l)=>{var K,C,B,$;let d=Ce(),p=d.PTR_SIZE,o=nr.get(e);if(!o)throw new Error(`cannot run inference. invalid session id: ${e}`);let r=o[0],i=o[1],a=o[2],c=o[3],h=o[4],m=o[5],b=t.length,x=s.length,v=0,w=[],S=[],O=[],E=[],A=[],k=d.stackSave(),I=d.stackAlloc(b*p),M=d.stackAlloc(b*p),q=d.stackAlloc(x*p),J=d.stackAlloc(x*p);try{[v,w]=ow(l),Ur("wasm prepareInputOutputTensor");for(let U=0;U<b;U++)await ns(n[U],S,E,e,i[t[U]],t[U],h);for(let U=0;U<x;U++)await ns(u[U],O,E,e,a[s[U]],b+s[U],h);qr("wasm prepareInputOutputTensor");for(let U=0;U<b;U++)d.setValue(I+U*p,S[U],"*"),d.setValue(M+U*p,i[t[U]],"*");for(let U=0;U<x;U++)d.setValue(q+U*p,O[U],"*"),d.setValue(J+U*p,a[s[U]],"*");if(c&&!m){let{handle:U,outputPreferredLocations:ie,outputPreferredLocationsEncoded:V}=c;if(i.length!==b)throw new Error(`input count from feeds (${b}) is expected to be always equal to model's input count (${i.length}).`);Ur("wasm bindInputsOutputs");for(let W=0;W<b;W++){let X=t[W];await d._OrtBindInput(U,i[X],S[W])!==0&&Ee(`Can't bind input[${W}] for session=${e}.`)}for(let W=0;W<x;W++){let X=s[W];(K=u[W])!=null&&K[3]?(A.push(O[W]),d._OrtBindOutput(U,a[X],O[W],0)!==0&&Ee(`Can't bind pre-allocated output[${W}] for session=${e}.`)):d._OrtBindOutput(U,a[X],0,V[X])!==0&&Ee(`Can't bind output[${W}] to ${ie[W]} for session=${e}.`)}qr("wasm bindInputsOutputs"),nr.set(e,[r,i,a,c,h,!0])}(C=d.jsepOnRunStart)==null||C.call(d,r),(B=d.webnnOnRunStart)==null||B.call(d,r);let z;c?z=await d._OrtRunWithBinding(r,c.handle,x,q,v):z=await d._OrtRun(r,M,I,b,J,x,q,v),z!==0&&Ee("failed to call OrtRun().");let G=[],oe=[];Ur("wasm ProcessOutputTensor");for(let U=0;U<x;U++){let ie=Number(d.getValue(q+U*p,"*"));if(ie===O[U]||A.includes(O[U])){G.push(u[U]),ie!==O[U]&&d._OrtReleaseTensor(ie)!==0&&Ee("Can't release tensor.");continue}let V=d.stackSave(),W=d.stackAlloc(4*p),X=!1,L,de=0;try{d._OrtGetTensorData(ie,W,W+p,W+2*p,W+3*p)!==0&&Ee(`Can't access output tensor data on index ${U}.`);let Pe=p===4?"i32":"i64",ve=Number(d.getValue(W,Pe));de=d.getValue(W+p,"*");let Ge=d.getValue(W+p*2,"*"),rt=Number(d.getValue(W+p*3,Pe)),ot=[];for(let ze=0;ze<rt;ze++)ot.push(Number(d.getValue(Ge+ze*p,Pe)));d._OrtFree(Ge)!==0&&Ee("Can't free memory for tensor dims.");let nt=ot.reduce((ze,se)=>ze*se,1);L=Gt(ve);let Kt=c==null?void 0:c.outputPreferredLocations[s[U]];if(L==="string"){if(Kt==="gpu-buffer"||Kt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let ze=[];for(let se=0;se<nt;se++){let at=d.getValue(de+se*p,"*"),ai=d.getValue(de+(se+1)*p,"*"),bn=se===nt-1?void 0:ai-at;ze.push(d.UTF8ToString(at,bn))}G.push([L,ot,ze,"cpu"])}else if(Kt==="gpu-buffer"&&nt>0){let ze=d.jsepGetBuffer;if(!ze)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let se=ze(de),at=Lr(ve,nt);if(at===void 0||!Ou(L))throw new Error(`Unsupported data type: ${L}`);X=!0,G.push([L,ot,{gpuBuffer:se,download:d.jsepCreateDownloader(se,at,L),dispose:()=>{d._OrtReleaseTensor(ie)!==0&&Ee("Can't release tensor.")}},"gpu-buffer"])}else if(Kt==="ml-tensor"&&nt>0){let ze=d.webnnEnsureTensor,se=d.webnnIsGraphInputOutputTypeSupported;if(!ze||!se)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Lr(ve,nt)===void 0||!Eu(L))throw new Error(`Unsupported data type: ${L}`);if(!se(e,L,!1))throw new Error(`preferredLocation "ml-tensor" for ${L} output is not supported by current WebNN Context.`);let at=await ze(e,de,ve,ot,!1);X=!0,G.push([L,ot,{mlTensor:at,download:d.webnnCreateMLTensorDownloader(de,L),dispose:()=>{d.webnnReleaseTensorId(de),d._OrtReleaseTensor(ie)}},"ml-tensor"])}else if(Kt==="ml-tensor-cpu-output"&&nt>0){let ze=d.webnnCreateMLTensorDownloader(de,L)(),se=G.length;X=!0,oe.push((async()=>{let at=[se,await ze];return d.webnnReleaseTensorId(de),d._OrtReleaseTensor(ie),at})()),G.push([L,ot,[],"cpu"])}else{let ze=oo(L),se=new ze(nt);new Uint8Array(se.buffer,se.byteOffset,se.byteLength).set(d.HEAPU8.subarray(de,de+se.byteLength)),G.push([L,ot,se,"cpu"])}}finally{d.stackRestore(V),L==="string"&&de&&d._free(de),X||d._OrtReleaseTensor(ie)}}c&&!h&&(d._OrtClearBoundOutputs(c.handle)!==0&&Ee("Can't clear bound outputs."),nr.set(e,[r,i,a,c,h,!1]));for(let[U,ie]of await Promise.all(oe))G[U][2]=ie;return qr("wasm ProcessOutputTensor"),G}finally{($=d.webnnOnRunEnd)==null||$.call(d,r),d.stackRestore(k),S.forEach(z=>d._OrtReleaseTensor(z)),O.forEach(z=>d._OrtReleaseTensor(z)),E.forEach(z=>d._free(z)),v!==0&&d._OrtReleaseRunOptions(v),w.forEach(z=>d._free(z))}},Wu=e=>{let t=Ce(),n=nr.get(e);if(!n)throw new Error("invalid session id");let s=n[0],u=t._OrtEndProfiling(s);u===0&&Ee("Can't get an profile file name."),t._OrtFree(u)},Ku=e=>{let t=[];for(let n of e){let s=n[2];!Array.isArray(s)&&"buffer"in s&&t.push(s.buffer)}return t}}),ir,it,tn,Bn,Mn,zi,is,Ri,Tr,Ir,Wg,u2,l2,d2,p2,c2,h2,f2,m2=N(()=>{"use strict";Qe(),s2(),Jr(),Tu(),ir=()=>!!ge.wasm.proxy&&typeof document<"u",tn=!1,Bn=!1,Mn=!1,Ri=new Map,Tr=(e,t)=>{let n=Ri.get(e);n?n.push(t):Ri.set(e,[t])},Ir=()=>{if(tn||!Bn||Mn||!it)throw new Error("worker not ready")},Wg=e=>{switch(e.data.type){case"init-wasm":tn=!1,e.data.err?(Mn=!0,is[1](e.data.err)):(Bn=!0,is[0]()),zi&&(URL.revokeObjectURL(zi),zi=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Ri.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},u2=async()=>{if(!Bn){if(tn)throw new Error("multiple calls to 'initWasm()' detected.");if(Mn)throw new Error("previous call to 'initWasm()' failed.");if(tn=!0,ir())return new Promise((e,t)=>{it==null||it.terminate(),nw().then(([n,s])=>{try{it=s,it.onerror=l=>t(l),it.onmessage=Wg,is=[e,t];let u={type:"init-wasm",in:ge};!u.in.wasm.wasmPaths&&(n||Js)&&(u.in.wasm.wasmPaths={wasm:new URL(""+new URL("ort-wasm-simd-threaded.jsep-MDYUKy93.wasm",import.meta.url).href,import.meta.url).href}),it.postMessage(u),zi=n}catch(u){t(u)}},t)});try{await Iu(ge.wasm),await Vu(ge),Bn=!0}catch(e){throw Mn=!0,e}finally{tn=!1}}},l2=async e=>{if(ir())return Ir(),new Promise((t,n)=>{Tr("init-ep",[t,n]);let s={type:"init-ep",in:{epName:e,env:ge}};it.postMessage(s)});await Uu(ge,e)},d2=async e=>ir()?(Ir(),new Promise((t,n)=>{Tr("copy-from",[t,n]);let s={type:"copy-from",in:{buffer:e}};it.postMessage(s,[e.buffer])})):Ji(e),p2=async(e,t)=>{if(ir()){if(t!=null&&t.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Ir(),new Promise((n,s)=>{Tr("create",[n,s]);let u={type:"create",in:{model:e,options:{...t}}},l=[];e instanceof Uint8Array&&l.push(e.buffer),it.postMessage(u,l)})}else return qu(e,t)},c2=async e=>{if(ir())return Ir(),new Promise((t,n)=>{Tr("release",[t,n]);let s={type:"release",in:e};it.postMessage(s)});Gu(e)},h2=async(e,t,n,s,u,l)=>{if(ir()){if(n.some(d=>d[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(u.some(d=>d))throw new Error("pre-allocated output tensor is not supported for proxy.");return Ir(),new Promise((d,p)=>{Tr("run",[d,p]);let o=n,r={type:"run",in:{sessionId:e,inputIndices:t,inputs:o,outputIndices:s,options:l}};it.postMessage(r,Ku(o))})}else return Hu(e,t,n,s,u,l)},f2=async e=>{if(ir())return Ir(),new Promise((t,n)=>{Tr("end-profiling",[t,n]);let s={type:"end-profiling",in:e};it.postMessage(s)});Wu(e)}}),os,Kg,g2,rO=N(()=>{"use strict";Qe(),m2(),ae(),$u(),sw(),os=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Kg=e=>{switch(e[3]){case"cpu":return new Pt(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Ou(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:s,dispose:u}=e[2];return Pt.fromGpuBuffer(n,{dataType:t,dims:e[1],download:s,dispose:u})}case"ml-tensor":{let t=e[0];if(!Eu(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:s,dispose:u}=e[2];return Pt.fromMLTensor(n,{dataType:t,dims:e[1],download:s,dispose:u})}default:throw new Error(`invalid data location: ${e[3]}`)}},g2=class{async fetchModelAndCopyToWasmMemory(e){return d2(await Pu(e))}async loadModel(e,t){Mt();let n;typeof e=="string"?n=await this.fetchModelAndCopyToWasmMemory(e):n=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await p2(n,t),At()}async dispose(){return c2(this.sessionId)}async run(e,t,n){Mt();let s=[],u=[];Object.entries(e).forEach(a=>{let c=a[0],h=a[1],m=this.inputNames.indexOf(c);if(m===-1)throw new Error(`invalid input '${c}'`);s.push(h),u.push(m)});let l=[],d=[];Object.entries(t).forEach(a=>{let c=a[0],h=a[1],m=this.outputNames.indexOf(c);if(m===-1)throw new Error(`invalid output '${c}'`);l.push(h),d.push(m)});let p=s.map((a,c)=>os(a,()=>`input "${this.inputNames[u[c]]}"`)),o=l.map((a,c)=>a?os(a,()=>`output "${this.outputNames[d[c]]}"`):null),r=await h2(this.sessionId,u,p,d,o,n),i={};for(let a=0;a<r.length;a++)i[this.outputNames[d[a]]]=l[a]??Kg(r[a]);return At(),i}startProfiling(){}endProfiling(){f2(this.sessionId)}}}),b2={};Xr(b2,{OnnxruntimeWebAssemblyBackend:()=>pu,initializeFlags:()=>du,wasmBackend:()=>y2});var du,pu,y2,nO=N(()=>{"use strict";Qe(),m2(),rO(),du=()=>{(typeof ge.wasm.initTimeout!="number"||ge.wasm.initTimeout<0)&&(ge.wasm.initTimeout=0);let e=ge.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),ge.wasm.simd=!1),typeof ge.wasm.proxy!="boolean"&&(ge.wasm.proxy=!1),typeof ge.wasm.trace!="boolean"&&(ge.wasm.trace=!1),typeof ge.wasm.numThreads!="number"||!Number.isInteger(ge.wasm.numThreads)||ge.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ge.wasm.numThreads=1;else{let t=typeof navigator>"u"?as("node:os").cpus().length:navigator.hardwareConcurrency;ge.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},pu=class{async init(e){du(),await u2(),await l2(e)}async createInferenceSessionHandler(e,t){let n=new g2;return await n.loadModel(e,t),n}},y2=new pu});Qe();Qe();Qe();var iO="1.30.0",aO=mb;{let e=(rS(),ln(Z_)).onnxjsBackend;Vr("webgl",e,-10)}{let e=(nO(),ln(b2)).wasmBackend;Vr("webgpu",e,5),Vr("webnn",e,5),Vr("cpu",e,10),Vr("wasm",e,10)}Object.defineProperty(ge.versions,"web",{value:iO,enumerable:!0});/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//*! Bundled license information:

long/index.js:
long/umd/index.js:
  (**
   * @license
   * Copyright 2009 The Closure Library Authors
   * Copyright 2020 Daniel Wirtz / The long.js Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * SPDX-License-Identifier: Apache-2.0
   *)
*/export{fb as InferenceSession,Li as TRACE,Ur as TRACE_EVENT_BEGIN,qr as TRACE_EVENT_END,Mt as TRACE_FUNC_BEGIN,At as TRACE_FUNC_END,Pt as Tensor,aO as default,ge as env,Vr as registerBackend};
