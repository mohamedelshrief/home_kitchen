import * as THREE from './three.mjs';
export function buildKitchen(){
 const root=new THREE.Group();root.name='My home kitchen - personal design - revision 2';
 const groups={};for(const name of ['base','upper','ac','north','east','south','west','floor','detail']){groups[name]=new THREE.Group();groups[name].name=name;root.add(groups[name]);}
 const material=(name,color,roughness=.48,metalness=0)=>{let m=new THREE.MeshStandardMaterial({color,roughness,metalness});m.name=name;return m;};
 const M={blue:material('Baby blue satin lacquer','#a6bfd3'),beige:material('Warm ivory beige satin','#e5dbca'),edge:material('Blue inset shadows','#829eb5'),ivoryEdge:material('Ivory moulding shadow','#c9bcaa'),stone:material('Warm white quartz','#eee9df',.28),wall:material('Warm plaster','#e9e5dc',.85),tile:material('Ivory ceramic','#e7e3d8',.38),pattern:material('Muted blue tile motif','#9eafb2',.6),grout:material('Warm grey grout','#c4c4bb',.9),steel:material('Brushed stainless steel','#aeb5b8',.3,.55),black:material('Graphite appliances','#20282c',.32,.18),glass:material('Smoked glass','#526269',.13,.45),wood:material('Oak cabinet interiors','#cbb28b',.7),silver:material('Satin nickel hardware','#c5c9c7',.23,.65),leaf:material('Sage foliage','#667b56',.8),soil:material('Soil','#423b32',.9),light:material('Warm LED diffuser','#fff0cc',.3)};
 M.mosaicBlue=material('Pale blue glass mosaic','#bfdde5',.15,.20);M.mosaicIce=material('Frosted ice glass mosaic','#e0e9ed',.22,.12);M.mosaicSilver=material('Pearl silver glass mosaic','#cdd1dc',.13,.36);
 M.light.emissive=new THREE.Color('#ffddb0');M.light.emissiveIntensity=1.4;
 const box=(p,n,x,y,z,w,h,d,m,bev=0)=>{
 let geo;if(bev){let s=new THREE.Shape();s.moveTo(-w/2+bev,-h/2+bev);s.lineTo(w/2-bev,-h/2+bev);s.lineTo(w/2-bev,h/2-bev);s.lineTo(-w/2+bev,h/2-bev);s.closePath();geo=new THREE.ExtrudeGeometry(s,{depth:Math.max(.001,d-2*bev),bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:bev,bevelThickness:bev});geo.translate(0,0,-d/2+bev);}else geo=new THREE.BoxGeometry(w,h,d);
 let o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.name=n;o.castShadow=true;o.receiveShadow=true;p.add(o);return o;};
 const tube=(p,pts,r,m,n='Moulding')=>{let path=new THREE.CatmullRomCurve3(pts.map(a=>new THREE.Vector3(...a)));let o=new THREE.Mesh(new THREE.TubeGeometry(path,Math.max(8,pts.length*3),r,6,false),m);o.name=n;o.castShadow=true;p.add(o);return o;};
 const cyl=(p,x,y,z,rad,h,m,rad2=rad)=>{let o=new THREE.Mesh(new THREE.CylinderGeometry(rad2,rad,h,24),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;p.add(o);return o;};
 const group=(p,n,x,z,rot=0)=>{let g=new THREE.Group();g.name=n;g.position.set(x,0,z);g.rotation.y=rot;p.add(g);return g;};
 const frame=(p,x,y,z,w,h,m)=>{const b=.021;box(p,'Stile',x-w/2,y,z,b,h,.017,m,.003);box(p,'Stile',x+w/2,y,z,b,h,.017,m,.003);box(p,'Rail',x,y-h/2,z,w,b,.017,m,.003);box(p,'Rail',x,y+h/2,z,w,b,.017,m,.003);};
 const archPts=(x,y,z,w,h)=>{const r=w/2,top=y+h/2-r;let a=[[x-r,y-h/2,z],[x-r,top,z]];for(let k=0;k<=24;k++){let t=Math.PI-k*Math.PI/24;a.push([x+r*Math.cos(t),top+r*Math.sin(t),z]);}a.push([x+r,y-h/2,z],[x-r,y-h/2,z]);return a;};
 function panel(p,x,y,z,w,h,mat,arched=false,glazed=false){
 if(!glazed)box(p,'Panel door',x,y,z,w,h,.022,mat,.004);
 else {box(p,'Left stile',x-w/2+.025,y,z,.05,h,.035,mat,.004);box(p,'Right stile',x+w/2-.025,y,z,.05,h,.035,mat,.004);box(p,'Bottom rail',x,y-h/2+.03,z,w,.06,.035,mat,.004);box(p,'Top rail',x,y+h/2-.03,z,w,.06,.035,mat,.004);
 // Solid face with a real arched cut-out.
 let surround=new THREE.Shape();surround.moveTo(x-w/2,y-h/2);surround.lineTo(x+w/2,y-h/2);surround.lineTo(x+w/2,y+h/2);surround.lineTo(x-w/2,y+h/2);surround.closePath();let hole=new THREE.Path();let ap=archPts(x,y-.005,0,w-.11,h-.12);hole.moveTo(ap[0][0],ap[0][1]);for(let v of ap.slice(1))hole.lineTo(v[0],v[1]);hole.closePath();surround.holes.push(hole);let surroundMesh=new THREE.Mesh(new THREE.ExtrudeGeometry(surround,{depth:.022,bevelEnabled:false}),mat);surroundMesh.position.z=z-.005;surroundMesh.castShadow=true;surroundMesh.receiveShadow=true;p.add(surroundMesh);
 // Clear fluted glazing: sparse fine rods leave the lit shelves visible.
 for(let xx=x-w/2+.058;xx<x+w/2-.05;xx+=.019)box(p,'Reeded glass flute',xx,y,z-.005,.003,h-.105,.007,M.glass);
 }
 if(arched){tube(p,archPts(x,y-.005,z+.018,w-.11,h-.12),.009,mat);tube(p,archPts(x,y-.005,z+.023,w-.145,h-.154),.004,mat);}
 else {box(p,'Recessed field',x,y,z+.013,w-.105,h-.105,.009,mat,.005);frame(p,x,y,z+.022,w-.12,h-.12,mat);}
 const hx=x+w*.31,hy=arched?y-h*.2:y+h*.24;
 tube(p,[[hx,hy-.055,z+.022],[hx,hy-.055,z+.055],[hx,hy+.055,z+.055],[hx,hy+.055,z+.022]],.006,M.silver,'Nickel pull');
 }
 function base(name,x,z,w,d,rot=0,doors=1){let g=group(groups.base,name,x,z,rot);box(g,'Carcass',0,.48,0,w-.008,.72,d-.025,M.blue);box(g,'Recessed plinth',0,.075,-.025,w-.01,.15,d-.085,M.ivoryEdge);for(let i=0;i<doors;i++)panel(g,-w/2+(i+.5)*w/doors,.49,d/2+.002,w/doors-.009,.705,M.blue);return g;}
 function upper(name,x,z,w,d,rot=0,doors=1,glass=false,lo=1.50,hi=2.37){let g=group(groups.upper,name,x,z,rot);let h=hi-lo,y=(hi+lo)/2;
 if(!glass)box(g,'Upper carcass',0,y,0,w,h,d,M.beige);else{box(g,'Oak back',0,y,-d/2+.01,w,h,.02,M.wood);box(g,'Oak side',-w/2+.01,y,0,.02,h,d,M.wood);box(g,'Oak side',w/2-.01,y,0,.02,h,d,M.wood);for(let sy=lo;sy<hi+.01;sy+=(h/3))box(g,'Display shelf',0,sy,0,w,.018,d,M.beige);for(let s=0;s<3;s++){for(let j=0;j<3;j++)cyl(g,-w*.18+j*.07,lo+.04+s*h/3,0,.053,.018,M.stone);tube(g,[[-w/2+.03,lo+.03,-d/2+.04],[-w/2+.03,hi-.03,-d/2+.04]],.007,M.light,'Display LED');}}
 for(let i=0;i<doors;i++)panel(g,-w/2+(i+.5)*w/doors,y,d/2+.016,w/doors-.009,h-.01,M.beige,true,glass);
 box(g,'Cornice lower',0,hi+.018,.006,w+.023,.036,d+.032,M.beige,.006);box(g,'Cornice crown',0,hi+.05,.003,w+.043,.034,d+.052,M.beige,.006);box(g,'Under cabinet light',0,lo-.009,d/2-.03,w-.075,.012,.016,M.light);
 return g;}
 // Room footprint: 2.21 x (2.25 + .70), with .20 x .70 column at window corner.
 box(groups.floor,'Room slab',1.105,-.07,1.475,2.31,.14,3.05,M.grout);
 for(let x=0;x<2.21;x+=.6)for(let z=0;z<2.95;z+=.6){let w=Math.min(.6,2.21-x),d=Math.min(.6,2.95-z);box(groups.floor,'Limestone floor tile',x+w/2,.006,z+d/2,w-.003,.014,d-.003,M.tile);}
 box(groups.west,'Wall beside fridge',-.055,1.235,2.20,.11,2.47,1.50,M.wall);
 box(groups.north,'Sink wall',1.105,1.235,-.055,2.32,2.47,.11,M.wall);
 box(groups.east,'Cooker wall',2.265,1.235,1.475,.11,2.47,3.06,M.wall);
 box(groups.east,'Structural column 200 x 700',2.11,1.235,2.60,.20,2.47,.70,M.wall);
 // High window from the apartment photo: vertical dimensions are still provisional.
 const sill=1.45,windowHeight=.75,windowTop=sill+windowHeight;
 box(groups.south,'Window wall under sill - provisional',1.005,sill/2,3.005,2.01,sill,.11,M.wall);
 box(groups.south,'Window wall above',1.005,(windowTop+2.47)/2,3.005,2.01,2.47-windowTop,.11,M.wall);
 box(groups.south,'Wall left of window',.65,sill+windowHeight/2,3.005,1.30,windowHeight,.11,M.wall);
 let win=group(groups.south,'High window - photo-informed, not measured',1.655,2.96,Math.PI);
 box(win,'Daylight glazing',0,sill+windowHeight/2,0,.70,windowHeight,.012,M.light);
 frame(win,0,sill+windowHeight/2,.021,.70,windowHeight,M.silver);box(win,'Window mullion',0,sill+windowHeight/2,.035,.022,windowHeight,.022,M.silver);
 box(win,'Stone sill',0,sill-.013,.08,.79,.027,.18,M.stone,.006);
 // Trial only: nominal 800mm-wide 1.5hp split AC above the unmeasured window.
 // With the present assumptions it overlaps the window vertically by 10mm and the adjacent upper by 45mm.
 let ac=group(groups.ac,'Trial 1.5hp AC above window - 800 x 270 x 210',1.655,2.885,Math.PI);
 box(ac,'AC indoor unit',0,2.325,0,.80,.27,.21,M.wall,.025);
 box(ac,'AC front fascia',0,2.35,.112,.75,.17,.018,M.tile,.018);
 box(ac,'AC lower outlet',0,2.205,.095,.67,.035,.032,M.black,.006);
 for(let k=0;k<9;k++)box(ac,'AC outlet vane',-.29+k*.073,2.205,.116,.055,.006,.006,M.silver,.001);
 // Small glass mosaic squares inspired by the user's sample, nominal 30mm pitch.
 function tiles(parent,x,z,length,rot=0){let g=group(parent,'Ice blue and silver glass mosaic',x,z,rot);let pitch=.03,high=parent===groups.east?1.75:1.50;
 box(g,'Mosaic grout backing',length/2,(.89+high)/2,-.004,length,high-.89,.009,M.grout);
 for(let a=0;a<Math.ceil(length/pitch);a++)for(let b=0;b<Math.ceil((high-.89)/pitch);b++){
 let width=Math.min(pitch,length-a*pitch),height=Math.min(pitch,high-.89-b*pitch),xx=a*pitch+width/2,yy=.89+b*pitch+height/2;
 if(parent===groups.south&&xx<.8&&yy+height/2>sill)continue;
 if(width<.004||height<.004)continue;
 let index=((Math.imul(a+17,73856093)^Math.imul(b+31,19349663))>>>0)%11,mat=index<5?M.mosaicBlue:index<9?M.mosaicIce:M.mosaicSilver;
 box(g,'Bevelled glass mosaic',xx,yy,.004,width-.002,height-.002,.009,mat,.0015);
 }}
 tiles(groups.north,0,.012,2.21);tiles(groups.east,2.198,0,2.25,-Math.PI/2);tiles(groups.east,1.998,2.25,.70,-Math.PI/2);tiles(groups.south,2.01,2.938,1.21,Math.PI);
 // Base run along sink wall: dishwasher .65, sink .75, corner .81.
 let sinkbase=base('Sink base 750',1.025,.315,.75,.63,0,2);let body=sinkbase.children.find(o=>o.name==='Carcass');sinkbase.remove(body);box(sinkbase,'Sink cabinet bottom',0,.14,0,.742,.025,.605,M.blue);box(sinkbase,'Sink cabinet left',-.366,.48,0,.018,.72,.605,M.blue);box(sinkbase,'Sink cabinet right',.366,.48,0,.018,.72,.605,M.blue);base('North corner 810',1.805,.315,.81,.63,0,2);
 let dw=group(groups.base,'Dishwasher bay 650',.325,.315);box(dw,'Bosch SMS4EMI60V - 600 x 845 x 600',0,.4225,0,.60,.845,.60,M.steel,.009);box(dw,'Dishwasher control strip',0,.798,.303,.59,.08,.018,M.steel,.003);box(dw,'Display',.19,.807,.315,.065,.022,.006,M.black);box(dw,'Recessed pull',0,.746,.317,.29,.025,.015,M.black,.003);box(dw,'Toe',0,.043,.25,.59,.08,.10,M.black);
 // Right-hand run. 900mm cooker opening starts 1.20m from north wall.
 base('Prep right 550',1.895,.925,.55,.63,-Math.PI/2);
 base('Right return 200',1.895,2.20,.20,.63,-Math.PI/2);
 base('Window corner base',1.785,2.625,.65,.43,-Math.PI/2);
 let drawers=group(groups.base,'Three drawers 760 - beneath microwave',1.18,2.625,Math.PI);
 box(drawers,'Drawer cabinet',0,.48,0,.752,.72,.605,M.blue);box(drawers,'Recessed plinth',0,.075,-.025,.75,.15,.545,M.ivoryEdge);
 let dy=.1375;for(const dh of [.275,.275,.155]){const cy=dy+dh/2;box(drawers,'Blue drawer front',0,cy,.318,.751,dh-.008,.025,M.blue,.004);frame(drawers,0,cy,.342,.64,dh-.083,M.blue);tube(drawers,[[-.105,cy+.01,.338],[-.105,cy+.01,.377],[.105,cy+.01,.377],[.105,cy+.01,.338]],.007,M.silver,'Horizontal silver drawer pull');dy+=dh;}
 // Quartz surfaces, opening around sink rather than slab covering bowl.
 box(groups.base,'Quartz left of sink',.371,.87,.325,.742,.04,.65,M.stone,.005);
 box(groups.base,'Quartz right of sink',1.75,.87,.325,.92,.04,.65,M.stone,.005);
 box(groups.base,'Quartz behind sink',1.015,.87,.055,.55,.04,.11,M.stone,.004);
 box(groups.base,'Quartz in front of sink',1.015,.87,.61,.55,.04,.08,M.stone,.004);
 box(groups.base,'Quartz prep right',1.885,.87,.925,.65,.04,.55,M.stone,.004);
 box(groups.base,'Quartz right return',1.885,.87,2.175,.65,.04,.15,M.stone,.004);
 box(groups.base,'Quartz by column',1.785,.87,2.60,.45,.04,.70,M.stone,.004);
 box(groups.base,'Quartz below window',1.18,.87,2.625,.76,.04,.65,M.stone,.004);
 box(groups.detail,'Sink bowl bottom',1.015,.717,.34,.55,.025,.46,M.steel,.006);
 box(groups.detail,'Sink left',.74,.79,.34,.018,.16,.46,M.steel);box(groups.detail,'Sink right',1.29,.79,.34,.018,.16,.46,M.steel);
 box(groups.detail,'Sink back',1.015,.79,.115,.55,.16,.017,M.steel);box(groups.detail,'Sink front',1.015,.79,.565,.55,.16,.017,M.steel);
 cyl(groups.detail,1.015,.735,.34,.025,.009,M.steel);
 tube(groups.detail,[[1.015,.895,.055],[1.015,1.20,.055],[1.015,1.255,.095],[1.015,1.255,.18],[1.015,1.20,.22]],.014,M.silver,'Gooseneck tap');
 // Cooker and hood are aligned to the exact opening, with five burners.
 let oven=group(groups.base,'Bosch HGP3I8W50S - width 899 depth 607',1.8865,1.65,-Math.PI/2);
 box(oven,'Range body',0,.445,0,.899,.82,.607,M.steel,.013);box(oven,'Range black face',0,.41,.324,.82,.62,.019,M.black,.009);box(oven,'Oven glazing',0,.40,.339,.69,.40,.009,M.glass,.008);box(oven,'Steel fascia',0,.785,.325,.87,.12,.023,M.steel,.004);
 for(let k=0;k<6;k++){let c=cyl(oven,-.34+k*.135,.79,.35,.021,.022,M.black);c.rotation.x=Math.PI/2;}
 tube(oven,[[-.35,.67,.342],[-.35,.67,.40],[.35,.67,.40],[.35,.67,.342]],.013,M.steel,'Oven handle');box(oven,'Cooktop',0,.871,0,.899,.022,.607,M.black,.005);
 for(let [x,z,r] of [[-.27,-.17,.047],[-.27,.16,.047],[.27,-.17,.047],[.27,.16,.047],[0,0,.065]]){cyl(oven,x,.888,z,r,.010,M.steel);cyl(oven,x,.896,z,r*.77,.006,M.black);box(oven,'Pan support',x,.903,z,.18,.014,.022,M.steel);box(oven,'Pan support',x,.903,z,.022,.014,.18,M.steel);}
 // Upper units follow the submitted layout: solid sink run and glass either side of hood.
 upper('Sink uppers',.70,.18,1.40,.36,0,3);
 upper('Upper north corner',1.79,.18,.78,.36,0,2);
 upper('Closed corner connector left of cooker',2.02,.505,.29,.36,-Math.PI/2,1,false);
 upper('Left glazed hood cabinet',2.02,.915,.53,.36,-Math.PI/2,1,true);
 upper('Right glazed hood cabinet',1.83,2.365,.53,.36,-Math.PI/2,1,true);
 // Stainless pyramid canopy. Decorative removable cover is a VISUAL OPTION only,
 // not a claim this wall-mounted hood is approved for enclosed cabinet installation.
 let hood=group(groups.upper,'Stainless hood with provisional removable surround',1.975,1.65,-Math.PI/2);
 box(hood,'Visible stainless lower canopy rim',0,1.705,0,.898,.05,.47,M.steel,.006);
 let pyramid=new THREE.CylinderGeometry(1,1,1,4,1,false);let pos=pyramid.attributes.position;
 for(let i=0;i<pos.count;i++){let y=pos.getY(i),top=y>0;let vx=pos.getX(i),vz=pos.getZ(i);let rx=(vx+vz)/Math.sqrt(2),rz=(vz-vx)/Math.sqrt(2);pos.setXYZ(i,rx*(top?.24:.898)/Math.sqrt(2),y*.20+1.83,rz*(top?.19:.47)/Math.sqrt(2));}pyramid.computeVertexNormals();let cone=new THREE.Mesh(pyramid,M.steel);hood.add(cone);
 box(hood,'Stainless chimney',0,2.15,-.07,.207,.48,.18,M.steel,.003);
 for(let x of [-.29,0,.29])box(hood,'Removable grease filter',x,1.676,0,.265,.009,.385,M.silver);
 for(let x of [-.30,.30])box(hood,'Extractor LED',x,1.667,.145,.072,.01,.035,M.light,.002);
 for(let k=0;k<5;k++){let key=cyl(hood,.28+k*.019,1.704,.239,.005,.006,M.silver);key.rotation.x=Math.PI/2;}
 // Empty service cavity; no solid cupboard placed through the motor or duct.
 box(hood,'Removable ivory fascia - provisional',0,2.05,.275,1.01,.64,.022,M.beige,.004);
 frame(hood,0,2.05,.296,.86,.47,M.beige);
 box(hood,'Left cover return',-.505,2.05,.005,.018,.64,.54,M.beige);box(hood,'Right cover return',.505,2.05,.005,.018,.64,.54,M.beige);
 box(hood,'Matching cornice',0,2.395,.008,1.055,.05,.59,M.beige,.005);
 // Narrow visual slots; actual service access and ventilation require installer approval.
 for(let k=0;k<9;k++)box(hood,'Upper ventilation slot',-.24+k*.06,2.338,.290,.036,.012,.006,M.ivoryEdge);
 // Fridge remains a single tall appliance in an 800 mm bay (as plan/render).
 let fridge=group(groups.base,'Bosch KGN76CI3E8 - 750 x 1860 x 840',.40,2.53,Math.PI);
 box(fridge,'Refrigerator cabinet',0,.93,0,.75,1.86,.80,M.black,.014);
 const doorPivot=new THREE.Group();doorPivot.name='Right hinge - handle left when facing fridge';doorPivot.position.set(.372,0,.40);fridge.add(doorPivot);
 box(doorPivot,'Main refrigerator door',-.372,1.18,.0175,.744,1.35,.035,M.steel,.008);
 tube(doorPivot,[[-.642,.69,.035],[-.642,.69,.075],[-.642,1.67,.075],[-.642,1.67,.035]],.012,M.silver,'Left vertical fridge pull');
 box(fridge,'Freezer door',0,.25,.4175,.744,.49,.035,M.steel,.008);
 tube(fridge,[[-.27,.09,.435],[-.27,.09,.475],[-.27,.41,.475],[-.27,.41,.435]],.012,M.silver,'Left freezer pull');
 const doorHome=doorPivot.parent;

 box(fridge,'Left ivory end panel',-.39,1.205,-.09,.018,2.41,.66,M.beige);box(fridge,'Right ivory end panel',.39,1.205,-.09,.018,2.41,.66,M.beige);
 upper('Over-fridge cabinet',.40,2.61,.80,.68,Math.PI,2,false,1.96,2.37);
 // A small open shelf from the supplied scheme, between fridge and window.
 // Stepped proposal: upper storage 500mm, open 760mm counter niche below.
 let tower=group(groups.upper,'Stepped storage 500mm - ends at window edge',1.05,2.625,Math.PI);
 box(tower,'Upper left side',-.241,1.995,0,.018,.89,.63,M.beige);
 box(tower,'Upper right side',.241,1.995,0,.018,.89,.63,M.beige);
 box(tower,'Storage back',0,1.995,-.30,.464,.89,.018,M.wood);
 for(let sy of [1.559,1.98,2.44])box(tower,'Storage shelf',0,sy,0,.464,.018,.63,M.beige);
 panel(tower,0,2.225,.324,.486,.39,M.beige,false);
 box(tower,'Ceiling filler',0,2.455,0,.50,.03,.63,M.beige);
 cyl(tower,.03,1.65,.02,.075,.13,M.steel);
 // User confirmed microwave belongs in kitchen; countertop location is provisional.
 let microwave=group(groups.detail,'LG MH8265CIS - 544 x 308 x 458 - provisional counter location',1.18,2.68,Math.PI);
 box(microwave,'Microwave case',0,1.044,0,.544,.308,.438,M.steel,.009);box(microwave,'Microwave front',0,1.044,.224,.538,.292,.010,M.black,.004);box(microwave,'Microwave glass',-.045,1.044,.232,.407,.223,.005,M.glass,.006);box(microwave,'Microwave display',.215,1.11,.235,.054,.029,.005,M.glass);let dial=cyl(microwave,.21,.98,.245,.019,.017,M.silver);dial.rotation.x=Math.PI/2;
 // Quiet worktop styling to show scale.
 function plant(p,x,y,z){cyl(p,x,y+.07,z,.067,.14,M.stone,.083);cyl(p,x,y+.14,z,.071,.008,M.soil);for(let k=0;k<9;k++){let a=k*2.4;let leaf=new THREE.Mesh(new THREE.SphereGeometry(1,8,8),M.leaf);leaf.scale.set(.029,.08,.013);leaf.position.set(x+Math.cos(a)*.052,y+.20+Math.sin(k)*.025,z+Math.sin(a)*.045);leaf.rotation.set(.4,a,Math.cos(a)*.7);leaf.castShadow=true;p.add(leaf);}}
 plant(groups.detail,1.90,.89,.73);
 let board=box(groups.detail,'Oak chopping board',1.85,1.06,.14,.25,.34,.027,M.wood,.008);board.rotation.y=-.12;
 let kettle=group(groups.detail,'Kettle',1.78,2.73);cyl(kettle,0,.90,0,.087,.028,M.silver);cyl(kettle,0,1.015,0,.082,.20,M.stone,.062);cyl(kettle,0,1.125,0,.063,.019,M.silver);tube(kettle,[[.063,.94,0],[.14,.96,0],[.14,1.11,0],[.05,1.11,0]],.012,M.silver,'Kettle handle');
 root.userData={units:'metres',source:'khalil hamadaPLAN-Model (1).pdf + ALEX KITCHEN.pdf + video',confirmed:{northWidth:2.21,length:2.95,columnWidth:.20,columnLength:.70,windowWidth:.71,cookerBay:.90,sinkUnit:.75,dishwasherBay:.65,fridgeBay:.80},provisional:{ceiling:2.47,ceilingSource:"bedroom measurement supplied by user; kitchen unconfirmed",worktopHeight:.89,upperBottom:1.50,upperTop:2.37,windowSill:1.45,windowHeight:.75,windowSource:"Higher opening inferred from site photo; vertical dimensions unmeasured",mosaicPitch:.03,hoodEnclosure:"Visual option only; wall-mounted hood enclosure approval and clearances outstanding",drawerLocation:"760mm window run under appliance tower",applianceTower:"Stepped proposal: 500mm upper spanning x0.80-1.30; 760mm open counter below; microwave ventilation NOT validated",airConditioner:"Trial 800 x 270 x 210mm above window. Current assumed geometry causes 45mm horizontal overlap with adjacent upper storage and 10mm vertical overlap with window; not installable without measured redesign.",upperCorner:"290mm connector closes the gap between north uppers and the glazed cabinet left of cooker"},appliances:{source:'User supplied dimensions screenshot',fridge:{width:.75,height:1.86,depth:.84,hinge:'Right when facing fridge; handle left',wallGap:.025,doorSwing:'Illustrative pivot; collision with west wall near full opening; manufacturer clearance pending'},dishwasher:{width:.60,height:.845,depth:.60},range:{width:.899,heightMin:.884,heightMax:.929,depth:.607},hood:{width:.898,depth:.47},washingMachine:{width:.60,height:.85,depth:.565,placement:'Outside kitchen, confirmed by user'},microwave:{width:.544,height:.308,depth:.458,placement:'Provisional countertop beside fridge, confirmed included by user'}},status:'Design visualization; detailed joinery reconstructed, not surveyed or fabrication-ready'};
 return {root,groups,materials:M,doorPivot,doorHome};
}
