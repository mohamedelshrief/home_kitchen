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
 range.position.z=1.55;hood.position.z=1.55;
 sink.scale.x=.65/.75;sink.position.x=.955;sink.name='Proposed 650 mm sink cabinet — verify actual sink';
 g.detail.children.find(a=>a.name==='Window sink and silver mixer').position.x-=.05;
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
 // Independent 700 mm pot drawers: their box never intrudes into either corner.
 const pots=cab('700 mm pots and pans cabinet',1.16,.315,.70,.60,0,false);
 for(const o of [...pots.children])if(['Hinged door','Single silver handle','Internal shelf'].includes(o.name))o.removeFromParent();
 m.potDrawers=[];
 for(const [y,h,label] of [[.315,.32,'Lower deep pot drawer'],[.635,.31,'Upper deep pot drawer']]){
  const d=new THREE.Group();d.name=label;pots.add(d);m.potDrawers.push(d);
  box(d,'Drawer front',0,y,.315,.692,h-.008,.022,M.blue);
  box(d,'Silver horizontal handle',0,y+.06,.346,.22,.014,.025,M.silver);
  box(d,'Drawer bottom',0,y-h/2+.035,.025,.61,.016,.50,M.wood);
  for(const side of [-1,1])box(d,'Drawer side',side*.298,y-.015,.025,.014,h-.055,.50,M.wood);
  box(d,'Drawer back',0,y-.015,-.218,.61,h-.055,.014,M.wood);
  // A 300 mm pot body plus handles demonstrates scale, not a purchased product.
  const pot=new THREE.Mesh(new THREE.CylinderGeometry(.15,.145,.16,32,1,true),M.steel);pot.position.set(0,y-.03,.03);d.add(pot);
  for(const side of [-1,1])box(d,'Pot handle',side*.175,y+.005,.03,.06,.018,.035,M.steel);
 }
 function shelf(n,x,z,w,d){for(const y of [.15,.49])box(g.base,n,x,y,z,w,.018,d,M.wood);}
 // North-east blind cabinet: east-facing access, separate from the pot drawers.
 shelf('North corner shelf',1.87,.315,.68,.63);shelf('North corner access extension',1.885,.86,.65,.46);
 box(g.base,'North corner back',1.87,.49,.012,.68,.70,.024,M.blue);
 box(g.base,'North corner drawer partition',1.525,.49,.315,.02,.70,.63,M.blue);
 box(g.base,'North corner closed face',1.87,.49,.64,.68,.70,.022,M.blue);
 box(m.cornerFronts,'North corner east access — 430 mm nominal',1.55,.49,.875,.022,.70,.422,M.blue);
 box(m.cornerFronts,'North corner pull',1.523,.49,.72,.024,.13,.012,M.silver);
 top('North continuous worktop',1.51,.325,1.40,.65);top('North corner return worktop',1.885,.875,.65,.45);
 // South corner follows the structural projection; two perpendicular leaves.
 shelf('South corner shelf',1.645,2.625,.73,.65);
 shelf('South corner east extension',1.885,2.125,.65,.25);
 shelf('South corner column neck',1.785,2.275,.45,.05);
 box(g.base,'South corner back',1.645,.49,2.938,.73,.70,.024,M.blue);
 box(g.base,'South corner sink partition',1.29,.49,2.625,.02,.70,.65,M.blue);
 box(g.base,'South corner blind face',1.785,.49,2.30,.45,.70,.022,M.blue);
 box(m.cornerFronts,'South corner front leaf — 270 mm',1.425,.49,2.30,.262,.70,.022,M.blue);
 box(m.cornerFronts,'South corner side leaf — 280 mm',1.55,.49,2.14,.022,.70,.272,M.blue);
 box(m.cornerFronts,'South corner silver pull',1.44,.49,2.27,.012,.13,.025,M.silver);
 top('South corner return before column',1.885,2.125,.65,.25);
 top('South corner return at column',1.785,2.275,.45,.05);
 top('Dishwasher and left sink landing',.34,2.625,.68,.65);
 top('South corner and right sink landing',1.62,2.625,.78,.65);
 top('Sink front rim',.955,2.3425,.55,.085);top('Sink rear rim',.955,2.8975,.55,.105);
 for(const [x,w] of [[.005,.01],[.62,.02]])box(g.base,'Wet run scribe',x,.49,2.635,w,.70,.63,M.blue);
 // Microwave occupies an open bay in the north uppers, keeping the worktop free.
 cab('North corner upper cupboard',1.89,.18,.62,.36,0,true);
 cab('Range-side upper cupboard',2.02,.875,.43,.36,-Math.PI/2,true);
 cab('Window-left upper cupboard',.56,2.77,1.08,.36,Math.PI,true);
 const over=cab('Over refrigerator cupboard',.40,.28,.78,.56,0,true);over.scale.y=.46;over.position.y=1.28;
 const microwave=g.detail.children.find(a=>a.name.startsWith('LG MH'));
 microwave.position.set(1.18,.365,.29);microwave.rotation.y=0;
 box(g.upper,'Open microwave shelf — confirm LG ventilation',1.18,1.25,.29,.73,.03,.56,M.beige);
 m.root.userData={option:3,units:'metres',room:{width:2.21,length:2.95,southClearWidth:2.01}};
 m.root.userData.revision='Connected U with dedicated 700 mm pot drawers';
 m.root.userData.layout={sinkCentreX:.955,sinkCabinetWidth:.65,dishwasherCentreX:.31,rangeCentreZ:1.55,potCabinetWidth:.70,potDrawerNominalDepth:.50,potDrawerTravel:.48,northCornerAccess:.43,southCornerLeaves:[.27,.28],fridgeEntryProjection:.14};
 m.root.userData.limitations=['650 mm sink cabinet is proposed; confirm actual bowl, cut-out and clips before joinery. Sink moves 50 mm left of wall centre.','South corner uses a proposed linked folding door, with 270/280 mm leaves; hinges, column clearance and access must be mocked up. Interior view removes faces and is not a validated hinge animation.','North corner retains deep reach storage through a 430 mm nominal opening; not all volume is equally convenient.','Fridge entry projection remains 140 mm.','Pot drawer boxes are illustrative; select runners and calculate clear internal space and loaded weight.','Corner landings are not equivalent to a full straight preparation frontage.','Microwave ventilation, hood surround, AC and kitchen vertical dimensions remain unverified.'];
 return m;
}
