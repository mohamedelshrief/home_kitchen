import * as THREE from './three.mjs';
import {buildKitchen as original} from './scene.mjs';
export function buildKitchen(){
 const model=original(),{root,groups,materials:M}=model;
 root.name='Option 2 - Modern blue storage study';
 M.blue.color.set('#9fb9c8');M.blue.roughness=.23;M.beige.color.set('#f5f5f2');M.beige.name='White upper cabinetry';M.beige.roughness=.23;M.ivoryEdge.color.set('#7e98a7');M.stone.color.set('#f3f1eb');
 const box=(p,n,x,y,z,w,h,d,m)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.name=n;o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;p.add(o);return o;};
 const keep=['Bosch KGN','Bosch HGP','Dishwasher bay','Sink base'];
 for(const o of [...groups.base.children])if(!keep.some(s=>o.name.startsWith(s)))groups.base.remove(o);
 for(const o of [...groups.upper.children])if(!o.name.startsWith('Stainless hood'))groups.upper.remove(o);
 groups.ac.clear();
 // Design envelope only: actual unit, lintel height and service clearances need measurement.
 const entryAc=new THREE.Group();entryAc.name='AC above entrance - 800 x 270 x 210 mm';entryAc.position.set(.105,0,1.075);entryAc.rotation.y=Math.PI/2;groups.ac.add(entryAc);
 box(entryAc,'White indoor AC housing',0,2.185,0,.80,.27,.21,M.beige);
 box(entryAc,'AC front fascia',0,2.205,.108,.76,.20,.012,M.beige);
 box(entryAc,'AC outlet',0,2.075,.111,.67,.034,.014,M.black);
 for(let i=0;i<3;i++)box(entryAc,'Outlet louvre',0,2.065+i*.011,.12,.65,.003,.01,M.silver);
 box(entryAc,'AC indicator',.29,2.21,.117,.026,.008,.003,M.light);
 // Replace patterned mosaic with large, quiet stone panels. Source option stays unchanged.
 for(const side of ['north','east','south'])for(const o of [...groups[side].children])if(o.name==='Ice blue and silver glass mosaic')groups[side].remove(o);
 box(groups.north,'White stone backsplash',1.105,1.195,.015,2.21,.61,.018,M.stone);
 box(groups.east,'White stone backsplash',2.19,1.29,1.125,.018,.80,2.25,M.stone);
 box(groups.east,'Column stone backsplash',1.99,1.195,2.60,.018,.61,.70,M.stone);
 box(groups.south,'White stone backsplash',1.005,1.16,2.935,2.01,.54,.018,M.stone);
 const veinMat=new THREE.LineBasicMaterial({color:'#c9c7c0',transparent:true,opacity:.55});
 for(let j=0;j<9;j++){const x=.13+j*.24;const pts=[new THREE.Vector3(x,.9,2.922),new THREE.Vector3(x+.04,1.07,2.922),new THREE.Vector3(x-.015,1.18,2.922),new THREE.Vector3(x+.05,1.40,2.922)];groups.south.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),veinMat));}
 for(const o of [...groups.detail.children])if(!o.name.startsWith('Sink ')&&o.name!=='Gooseneck tap'&&!o.name.startsWith('LG MH'))groups.detail.remove(o);
 // Surveyed west wall: 700 mm return, 750 mm opening, 1500 mm return.
 box(groups.west,'Entry north return 700 mm',-.055,1.235,.35,.11,2.47,.70,M.wall);
 box(groups.west,'Provisional entrance lintel - head 2000 mm',-.055,2.235,1.075,.11,.47,.75,M.wall);
 const fridge=groups.base.children.find(o=>o.name.startsWith('Bosch KGN'));
 fridge.position.set(.40,0,.42);fridge.rotation.y=0;
 const dw=groups.base.children.find(o=>o.name.startsWith('Dishwasher bay'));
 dw.position.set(.315,0,1.76);dw.rotation.y=Math.PI/2;
 // Separate moving door from the appliance body; keep its swept volume inspectable.
 const dwPivot=new THREE.Group();dwPivot.name='Dishwasher door hinge';dwPivot.position.set(0,.10,.32);dw.add(dwPivot);
 for(const o of [...dw.children])if(['Dishwasher control strip','Display','Recessed pull'].includes(o.name)){o.position.sub(dwPivot.position);dwPivot.add(o);}
 box(dwPivot,'Dishwasher door',0,.345,.008,.60,.69,.025,M.steel);
 model.dwPivot=dwPivot;
 groups.base.children.find(o=>o.name.startsWith('Bosch HGP')).position.z=1.70;
 groups.upper.children.find(o=>o.name.startsWith('Stainless hood')).position.z=1.70;
 const sink=groups.base.children.find(o=>o.name.startsWith('Sink base'));
 sink.position.set(1.005,0,2.635);sink.rotation.y=Math.PI;
 const sinkDetails=new THREE.Group();sinkDetails.name='Window sink and silver mixer';
 for(const o of [...groups.detail.children])if(o.name.startsWith('Sink ')||o.name==='Gooseneck tap')sinkDetails.add(o);
 // Map the old sink centre x=1.015 to x=1.605 on the window run.
 sinkDetails.rotation.y=Math.PI;sinkDetails.position.set(2.02,0,2.95);groups.detail.add(sinkDetails);
 const microwave=groups.detail.children.find(o=>o.name.startsWith('LG MH'));
 microwave.position.set(1.175,.36,.30);microwave.rotation.y=0;
 box(groups.upper,'Microwave support shelf - mounting and ventilation pending',1.175,1.235,.30,.75,.035,.60,M.beige);
 function cabinet(name,x,z,w,d,rot=0,drawers=false,lo=.15,hi=.85){
  const g=new THREE.Group();g.name=name;g.position.set(x,0,z);g.rotation.y=rot;groups[lo>1?'upper':'base'].add(g);const mat=lo>1?M.beige:M.blue;
  box(g,'Carcass',0,(lo+hi)/2,0,w,hi-lo,d,mat);
  const upper=lo>1,connector=upper&&w<=.30;
  const count=drawers?3:upper?(w<=.60?1:2):2;
  for(let i=0;i<count;i++){const fw=drawers?w-.012:w/count-.008,fh=drawers?(hi-lo)/3-.008:hi-lo-.01,fx=drawers?0:-w/2+(i+.5)*w/count,fy=drawers?lo+(i+.5)*(hi-lo)/3:(lo+hi)/2;
   box(g,'Panel',fx,fy,d/2+.012,fw,fh,.024,mat);
   if(upper){
    if(!connector){const hx=count===2?(i===0?-.042:.042):w/2-.05,hy=lo+.12;
     box(g,'Upper silver pull',hx,hy,d/2+.065,.009,.128,.012,M.silver);
     for(const offset of [-.055,.055])box(g,'Upper pull mounting',hx,hy+offset,d/2+.041,.009,.009,.04,M.silver);
    }
   }else box(g,'Silver pull',fx,fy+.04,d/2+.059,drawers?.18:.012,drawers?.012:.13,.025,M.silver);
  }
  if(lo<1)box(g,'Plinth',0,.075,-.03,w,.15,d-.08,M.ivoryEdge);
  else {box(g,'Flush top filler',0,hi+.03,0,w,.06,d,mat);box(g,'Under-cabinet LED',0,lo-.012,d/2-.025,w-.04,.012,.012,M.light);}
  return g;
 }
 cabinet('Entry-side drawers 750',1.175,.315,.75,.63,0,true);
 cabinet('North east corner storage 660',1.88,.315,.66,.63);
 cabinet('East prep drawers 600',1.895,.95,.60,.63,-Math.PI/2,true);
 cabinet('West wall upper storage',.18,1.95,.70,.36,Math.PI/2,false,1.50,2.37);
 // Real hollow connected corner volumes, rather than solid filler blocks.
 const corner=new THREE.Group();corner.name='Connected corner storage shells';groups.base.add(corner);
 const fronts=new THREE.Group();fronts.name='Corner access fronts';groups.base.add(fronts);model.cornerFronts=fronts;
 for(const y of [.15,.50]){
 box(corner,'Left corner continuous shelf',.315,y,2.505,.63,.018,.89,M.wood);
 box(corner,'Right corner south shelf',1.695,y,2.625,.63,.018,.65,M.wood);
 box(corner,'Right corner return shelf',1.785,y,2.275,.45,.018,.05,M.wood);
 box(corner,'Right corner before column shelf',1.885,y,2.20,.65,.018,.10,M.wood);
 }
 box(corner,'Left corner back',.012,.50,2.505,.024,.72,.89,M.blue);
 box(corner,'Left corner rear',.315,.50,2.938,.63,.72,.024,M.blue);
 box(corner,'Left corner sink partition',.618,.50,2.625,.024,.72,.65,M.blue);
 box(corner,'Right corner rear',1.695,.50,2.938,.63,.72,.024,M.blue);
 box(corner,'Right corner sink partition',1.392,.50,2.625,.024,.72,.65,M.blue);
 box(fronts,'Left corner removable side access 240',.635,.50,2.18,.022,.70,.23,M.blue);
 box(fronts,'Left corner front',.315,.50,2.30,.63,.70,.022,M.blue);
 box(fronts,'Right corner access front',1.475,.50,2.30,.17,.70,.022,M.blue);
 box(fronts,'Right corner return front',1.555,.50,2.225,.022,.70,.15,M.blue);
 box(fronts,'Right corner south front',1.785,.50,2.30,.45,.70,.022,M.blue);
 box(groups.base,'Sink left filler',.6225,.5,2.635,.015,.70,.63,M.blue);
 box(groups.base,'Sink right filler',1.3875,.5,2.635,.015,.70,.63,M.blue);
 const top=(n,x,z,w,d)=>box(groups.base,n,x,.87,z,w,.04,d,M.stone);
 top('Microwave landing',1.175,.325,.75,.65);
 top('North corner worktop',1.885,.325,.65,.65);
 top('Preparation worktop above dishwasher',1.885,.95,.65,.60);
 top('Dishwasher worktop',.325,1.76,.65,.60);
 top('Left corner connecting worktop',.325,2.18,.65,.24);
 top('East corner connecting worktop before column',1.885,2.20,.65,.10);
 top('East corner connecting worktop beside column',1.785,2.275,.45,.05);
 // Continuous south worktop with an actual cut-out for the bowl.
 top('Left sink landing',.365,2.625,.73,.65);
 top('Right sink landing',1.645,2.625,.73,.65);
 top('Sink front rim',1.005,2.3425,.55,.085);
 top('Sink rear rim',1.005,2.8975,.55,.105);
 cabinet('Microwave wall storage',1.175,.18,.75,.36,0,false,1.85,2.37);
 cabinet('Over refrigerator storage',.40,.30,.80,.60,0,false,1.97,2.37);
 cabinet('North corner wall storage',1.89,.18,.62,.36,0,false,1.50,2.37);
 cabinet('Prep wall storage',2.02,.87,.50,.36,-Math.PI/2,false,1.50,2.37);
 cabinet('Window left wall storage',.56,2.77,1.08,.36,Math.PI,false,1.50,2.37);
 cabinet('West upper corner connector',.18,2.445,.29,.36,Math.PI/2,false,1.50,2.37);
 cabinet('East north upper connector',2.02,.49,.26,.36,-Math.PI/2,false,1.50,2.37);
 cabinet('Hood to south upper link',1.83,2.2525,.095,.36,-Math.PI/2,false,1.50,2.37);
 cabinet('East south upper connector',1.83,2.445,.29,.36,-Math.PI/2,false,1.50,2.37);
 // Flatten inherited decorative panels to match the new slab-door reference.
 for(const g of [sink,...groups.upper.children]){const remove=[];g.traverse(o=>{if(['Recessed field','Stile','Rail','Moulding','Matching cornice'].includes(o.name))remove.push(o);});remove.forEach(o=>o.removeFromParent());}
 root.userData={option:2,units:'metres',room:{width:2.21,length:2.95,column:[.20,.70],entry:{northReturn:.70,opening:.75,southReturn:1.50}},provisional:{ceiling:2.47,windowSill:1.45,windowHeight:.75},layout:{fridgeBay:[.725,1.525],fridgeDepth:.84,entryLandingWidth:.725,sinkCentre:1.605,windowCentre:1.655,dishwasherWidth:.60,mainPrepWidth:.55},notes:['New design proposal; original option is unchanged.','Refrigerator shifted inward on north wall to avoid placing 840 mm depth directly across the 700 mm entrance return.','Entry landing is approximately 725 mm to the refrigerator bay; verify manoeuvring on site.','Sink is 50 mm off window centre to allow cabinet end clearance.','Cooker retained on east wall. Only 200 mm separates its south edge from the window worktop; review heat clearances and pan-handle use.','Refrigerator hinge clearance, microwave ventilation, drain route and window operation need installer verification.','AC omitted from this proposal pending actual window and ceiling measurements.']};
 root.userData.revision='Modern blue / centred sink / west storage';
 root.userData.layout={fridgeBay:[.725,1.525],fridgeDepth:.84,entryLandingWidth:.725,sinkCentre:1.005,windowCentre:1.655,sinkCabinetWidth:.75,dishwasherWall:'east',dishwasherCentreZ:.95,rangeCentreZ:1.70,westStorage:{width:.55,depth:.40,startZ:1.50,endZ:2.05},nominalCounterAisle:1.14,microwaveShelfHeight:1.235};
 root.userData.notes=['Reference image supplies finishes only; room dimensions are retained.','Sink centred on the 2010 mm clear wall, not on the off-centre window.','West drawers occupy a previously unused 550 mm wall section; clear corner access remains provisional.','Corner cabinets are spatial reservations, not validated storage mechanisms.','Dishwasher is farther from sink than preferred; confirm hose limits and workflow before approval.','Range and dishwasher are adjacent; verify side heat clearance and add a separator if required.','Raised microwave is a placement study only; shelf support and manufacturer ventilation requirements remain unverified.','Kitchen height, sink waste route and refrigerator door clearances remain subject to site coordination.'];
 root.userData.revision='Connected corners and sink-side dishwasher';
 root.userData.layout.fridgeBay=[0,.80];root.userData.layout.entryLandingWidth=0;
 root.userData.layout.dishwasherWall='west';root.userData.layout.dishwasherCentreZ=1.76;
 delete root.userData.layout.westStorage;root.userData.layout.nominalCounterAisle=.91;
 root.userData.notes=['Refrigerator moved into entry-side corner as requested; 840 mm depth projects approximately 140 mm beyond 700 mm entry return.','Dishwasher on west wall adjacent to the sink corner, using the same plumbing zone.','Connected hollow corner shelves and continuous worktops replace gaps; left corner side access is only about 240 mm and needs a practical joinery solution.','Dishwasher door opens into the aisle, away from the refrigerator; a standing-space compromise remains at the sink corner.','All connected corner access fronts can be hidden to inspect actual internal shelves.','Nominal aisle is 910 mm at the column and 910-1110 mm depending on appliance and cabinet section; not an accessibility-compliance claim.','Raised microwave installation and appliance manufacturer clearances remain unverified.'];
 root.userData.layout.airConditioner={wall:'west, above entrance',width:.80,height:.27,depth:.21,centreZ:1.075,bottom:2.05,top:2.32,assumedCeilingGap:.15,assumedEntranceHead:2.00,assumedHeadGap:.05,status:'Design envelope; verify actual unit, lintel and installation clearances'};
 root.userData.notes.push('AC centred above entrance, not window. Envelope 800 x 270 x 210 mm; bottom 2050 mm and top 2320 mm. Ceiling and entrance-head heights remain assumptions.','West upper run starts at z=1600 mm to clear AC end at 1475 mm by 125 mm. Over-fridge upper depth reduced to 600 mm to avoid intersecting AC. Near-side service access still needs selected-unit review.','Upper connectors 300 mm or narrower have no pulls. Regular doors have one silver pull each, aligned near their lower edge.');
 return model;
}
