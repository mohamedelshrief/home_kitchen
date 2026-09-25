import {buildKitchen} from './scene-option2.mjs';
import {GLTFExporter} from './GLTFExporter.mjs';
import fs from 'node:fs/promises';
globalThis.FileReader=class {readAsArrayBuffer(blob){blob.arrayBuffer().then(b=>{this.result=b;this.onloadend?.();});}readAsDataURL(blob){blob.arrayBuffer().then(b=>{this.result='data:'+blob.type+';base64,'+Buffer.from(b).toString('base64');this.onloadend?.();});}};
const {root}=buildKitchen();
let count=0;root.traverse(o=>{if(o.isMesh)count++;});
await new Promise((resolve,reject)=>new GLTFExporter().parse(root,async data=>{await fs.writeFile(new URL('./kitchen-option2.glb',import.meta.url),Buffer.from(data));resolve();},reject,{binary:true}));
await fs.writeFile(new URL('./dimensions-option2.json',import.meta.url),JSON.stringify(root.userData,null,2));
console.log(`Exported ${count} meshes in metres.`);
