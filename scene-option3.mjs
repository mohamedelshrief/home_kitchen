import * as THREE from './three.mjs';
import {buildKitchen as previous} from './scene-option2.mjs';
export function buildKitchen(){
 const m=previous(),{groups:g,materials:M}=m;m.root.name='Option 3 — accessible wet zone';
 const box=(p,n,x,y,z,w,h,d,mat)=>{const a=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);a.name=n;a.position.set(x,y,z);a.castShadow=a.receiveShadow=true;p.add(a);return a;};
 const fridge=g.base.children.find(a=>a.name.startsWith('Bosch KGN'));
 const range=g.base.children.find(a=>a.name.startsWith('Bosch HGP'));
 const sink=g.base.children.find(a=>a.name.startsWith('Sink base'));
 const dw=g.base.children.find(a=>a.name.startsWith('Dishwasher bay'));
 const hood=g.upper.children.find(a=>a.name.startsWith('Stainless hood'));
 g.base.clear();g.base.add(fridge,range,sink,dw);g.upper.clear();g.upper.add(hood);
 m.cornerFronts=new THREE.Group();m.cornerFronts.name='North blind corner access doors';g.base.add(m.cornerFronts);
 dw.position.set(.31,0,2.635);dw.rotation.y=Math.PI;
 range.position.z=1.15;hood.position.z=1.15;
 // The west return stays clear: no cabinet blocks dishwasher loading or the entrance.
 const top=(n,x,z,w,d)=>box(g.base,n,x,.87,z,w,.04,d,M.stone);
 function cab(n,x,z,w,d,rot=0,upper=false,drawers=false){
  const p=new THREE.Group();p.name=n;p.position.set(x,0,z);p.rotation.y=rot;(upper?g.upper:g.base).add(p);
  const lo=upper?1.5:.15,hi=upper?2.37:.85,mat=upper?M.beige:M.blue;
  box(p,'Bottom',0,lo,0,w,.018,d,mat);box(p,'Back',0,(lo+hi)/2,-d/2,w,hi-lo,.018,mat);
  box(p,'Cabinet top',0,hi,0,w,.018,d,mat);
  for(const side of [-1,1])box(p,'Side',side*(w/2-.009),(lo+hi)/2,0,.018,hi-lo,d,mat);
  box(p,'Internal shelf',0,(lo+hi)/2,0,w-.036,.018,d-.02,M.wood);
  const count=drawers?3:(w>.5?2:1);
  for(let i=0;i<count;i++){
   const px=drawers?0:-w/2+w/count*(i+.5),py=drawers?lo+(hi-lo)/count*(i+.5):(lo+hi)/2;
   box(p,drawers?'Drawer front':'Hinged door',px,py,d/2+.012,drawers?w-.008:w/count-.008,drawers?(hi-lo)/3-.008:hi-lo-.008,.022,mat);
   box(p,'Single silver handle',drawers?0:px+(count===2?(i===0?.07:-.07):0),upper?lo+.12:py,d/2+.04,drawers?.16:.012,drawers?.012:.12,.024,M.silver);
  }
  if(!upper)box(p,'Recessed plinth',0,.075,-.035,w,.15,d-.08,M.ivoryEdge);
  else box(p,'Warm task LED',0,lo-.01,d/2-.03,w-.04,.01,.015,M.light);
  return p;
 }
 // One connected north/east corner, reached from a broad north-facing opening.
 const corner=new THREE.Group();corner.name='1400 x 630 blind corner, 700 mm nominal access';g.base.add(corner);
 for(const y of [.15,.49,.83])box(corner,'Continuous corner shelf',1.51,y,.315,1.40,.018,.63,M.wood);
 box(corner,'Corner back',1.51,.49,.012,1.40,.70,.024,M.blue);
 box(corner,'Corner left side',.822,.49,.315,.024,.70,.63,M.blue);
 box(corner,'Corner right side',2.198,.49,.315,.024,.70,.63,M.blue);
 box(corner,'Blind front',1.875,.49,.64,.67,.70,.022,M.blue);
 for(const x of [.995,1.345]){box(m.cornerFronts,'350 mm corner access leaf',x,.49,.64,.342,.70,.022,M.blue);box(m.cornerFronts,'Silver corner pull',x,.49,.67,.012,.13,.025,M.silver);}
 top('North preparation counter — 740 mm clear frontage',1.51,.325,1.40,.65);
 // Compact range-side landing, rather than a second inaccessible blind corner.
 cab('350 mm full-extension pan drawers',1.895,1.785,.35,.60,-Math.PI/2,false,true);
 top('Range landing 350 mm',1.885,1.785,.65,.35);
 // Same-wall wet zone: DW 600 + fillers + sink 750 + cupboard 600 = 2010.
 cab('600 mm accessible south storage — paired 300 mm doors',1.69,2.635,.60,.60,Math.PI);
 for(const [x,w] of [[.005,.01],[.62,.02],[1.385,.01],[2.00,.02]])box(g.base,'Joinery scribe',x,.5,2.635,w,.70,.63,M.blue);
 top('Dishwasher preparation surface',.365,2.625,.73,.65);
 top('Right sink landing',1.645,2.625,.73,.65);
 top('Sink front rim',1.005,2.3425,.55,.085);top('Sink rear rim',1.005,2.8975,.55,.105);
 // Microwave occupies an open bay in the north uppers, keeping the worktop free.
 cab('North corner upper cupboard',1.89,.18,.62,.36,0,true);
 cab('Range-side upper cupboard',2.02,1.795,.35,.36,-Math.PI/2,true);
 cab('Window-left upper cupboard',.56,2.77,1.08,.36,Math.PI,true);
 const over=cab('Over refrigerator cupboard',.40,.28,.78,.56,0,true);over.scale.y=.46;over.position.y=1.28;
 const microwave=g.detail.children.find(a=>a.name.startsWith('LG MH'));
 microwave.position.set(1.18,.365,.29);microwave.rotation.y=0;
 box(g.upper,'Open microwave shelf — confirm LG ventilation',1.18,1.25,.29,.73,.03,.56,M.beige);
 m.root.userData={option:3,units:'metres',room:{width:2.21,length:2.95,southClearWidth:2.01},layout:{sinkCentreX:1.005,dishwasherCentreX:.31,dishwasherWall:'south',rangeCentreZ:1.15,rangeSouthLanding:.35,northPrepFrontage:.74,cornerOpening:.70,westReturn:'clear for loading and circulation',fridgeEntryProjection:.14,AC:'800 mm centred above entrance'},limitations:['Kitchen height, window and appliance installation drawings require survey.','Existing deep refrigerator still projects 140 mm into entry approach: retained owner constraint.','North straight prep 740 mm falls short of 914 mm guideline.','350 mm range landing is below 381 mm benchmark on one side.','Blind corner shelves accessible through 700 mm opening; back corner requires reach, no unverified pull-out mechanism claimed.','600 mm south cupboard has 300 mm hinged leaves, not deep drawers facing range-side landing.','Microwave is on an open shelf, not enclosed built-in.','Concept only; no claim of fully compliant or fabrication-ready layout.']};
 return m;
}
