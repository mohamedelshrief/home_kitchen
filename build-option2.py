from pathlib import Path
import base64
p=Path(__file__).resolve().parent
viewer=(p/'viewer.mjs').read_text().replace("./scene.mjs?v=5","./scene-option2.mjs")
viewer=viewer.replace("target.set(1.04,1.48,.1);radius=2.15;az=-.12;el=.07;camera.fov=64", "target.set(1.15,1.25,2.75);radius=1.45;az=-Math.PI+.10;el=.16;camera.fov=85")
viewer=viewer.replace("target.set(1.05,1.39,2.78);radius=2.28;az=-Math.PI+.10", "target.set(1.02,1.39,.1);radius=2.45;az=-.12")
viewer=viewer.replace("90° opening: the handle/door intersects the wall; clearance revision required.","90° swing shown. Verify appliance clearances and access to the prep corner before approval.")
viewer=viewer.replace("Left handle · right hinge · 25 mm nominal side clearance to wall","Entry-side refrigerator · right hinge · manufacturer clearances pending")
viewer=viewer.replace("if(view==='fridge'||view==='plan')line([1.255,2.46,2.84],[2.055,2.46,2.84],'AC 80 cm');","")
viewer=viewer.replace("line([0,.08,.75],[.65,.08,.75],'65');line([.65,.08,.75],[1.40,.08,.75],'75');","line([0,.08,3.0],[.60,.08,3.0],'Drawers 60');line([.60,.08,3.0],[1.20,.08,3.0],'DW 60');line([1.23,.08,3.0],[1.98,.08,3.0],'Sink 75');line([-.12,.08,.70],[-.12,.08,1.45],'Entry 75');")
(p/'viewer-option2.mjs').write_text(viewer)
viewer=viewer.replace('for(const g of Object.values(model.groups))mergeStatic(g);','model.root.attach(model.dwPivot);model.root.attach(model.cornerFronts);for(const g of Object.values(model.groups))mergeStatic(g);')
viewer += "\nlet dwOpen=false;host.querySelector('[data-action=dw]').onclick=e=>{dwOpen=!dwOpen;model.dwPivot.rotation.x=dwOpen?Math.PI/2:0;e.currentTarget.setAttribute('aria-pressed',String(dwOpen));draw();};host.querySelector('[data-action=corners]').onclick=e=>{model.cornerFronts.visible=!model.cornerFronts.visible;e.currentTarget.setAttribute('aria-pressed',String(!model.cornerFronts.visible));draw();};\n"
viewer=viewer.replace('Entry-side refrigerator · right hinge · manufacturer clearances pending','Refrigerator at entry corner · entry projection accepted for this study')
viewer=viewer.replace("group.clear();for(const {mat,geos}","const lines=group.children.filter(o=>o.isLine);group.clear();group.add(...lines);for(const {mat,geos}")
viewer=viewer.replace("'Drawers 60'","'Storage'").replace("line([.60,.08,3.0],[1.20,.08,3.0],'DW 60');",'').replace("line([1.23,.08,3.0],[1.98,.08,3.0],'Sink 75');","line([.63,.08,3.0],[1.38,.08,3.0],'Sink 75');")
(p/'viewer-option2.mjs').write_text(viewer)
html=(p/'index.html').read_text().replace('Kitchen Design Review','Option 2 — Window Sink')
html=html.replace('height:min(65vw,680px)','height:min(55vh,620px)')
html=html.replace('<button data-view="ac">AC Above Window</button>','').replace('Refrigerator &amp; Window','Refrigerator &amp; Entry')
html=html.replace('alex-kitchen.glb','kitchen-option2.glb').replace('dimensions-and-assumptions.md','option2-design-notes.md')
start=html.index('<p class="door-status"')
end=html.index('</main>',start)
html=html[:start]+'''<p class="door-status" aria-live="polite">Entry-side refrigerator · right hinge · manufacturer clearances pending</p>
<p class="note">Window wall: 600 mm drawers + 600 mm dishwasher + 30 mm filler + 750 mm sink cabinet + 30 mm end filler. Sink centre is 50 mm left of window centre.</p>
<p class="note">Entry-side wall: microwave counter, refrigerator shifted inward, then corner storage. The plan has a 700 mm return beside a 750 mm entry; the 840 mm-deep refrigerator must not sit directly against the entry corner. Modelled landing beside its bay: approximately 725 mm. Confirm manoeuvring on site.</p>
<p class="note">Main prep counter: approximately 1230 mm beside the sink, over drawers and dishwasher. Secondary cooking landing: 550 mm beside the cooker. Cooker-to-window-worktop separation: 200 mm. Verify heat clearances and the new water/drainage route.</p>
<p class="note"><a href="option2-design-notes.md">Option 2 design and coordination notes</a> · <a href="design-review.html">Compare both options</a></p>'''+html[end:]
html=html.replace('./viewer.mjs?v=5','./viewer-option2.mjs')
html=html.replace('Option 2 — Window Sink','Option 2 — Modern Blue').replace('Compact neo-classical kitchen · preliminary coordination model · baby blue and warm ivory palette','Modern slab fronts · centred sink · expanded storage study')
html=html.replace('Warm Ivory','White Uppers').replace('background:#e5dbca','background:#f5f5f2')
start=html.index('<p class="note">Window wall:')
end=html.index('<p class="note"><a href=',start)
html=html[:start]+'''<p class="note">Sink centred on the 2010 mm wall. Blue slab fronts, silver handles and white stone replace the earlier decorative finish. Window position remains unchanged.</p>
<p class="note">Added west-wall drawers: 550 mm wide, 400 mm deep, plus upper storage. Nominal counter-to-counter aisle: 1140 mm before appliance/handle projections. Corner cabinets reserve storage volume; access hardware is not yet resolved.</p>
<p class="note">Dishwasher relocated to the east run. Its distance from the sink and proximity to the cooker require review. Raised microwave shelf is provisional: mounting, load and manufacturer ventilation clearances are not approved.</p>'''+html[end:]
start=html.index('<p class="note">Sink centred')
end=html.index('<p class="note"><a href=',start)
html=html[:start]+'''<p class="note">Refrigerator moved to the entry corner. Dishwasher now sits beside the sink corner on the west wall, sharing the wet-services zone. Use Open Dishwasher to inspect its actual door sweep.</p>
<p class="note">Connected corner shelves and continuous worktops replace the former gaps. Inspect Corner Interiors to see the hollow storage. Left side access is approximately 240 mm; final access hardware and standing space require revision before fabrication.</p>
<p class="note">The refrigerator projects approximately 140 mm beyond the entry return, accepted for this design study. Appliance ventilation and the raised microwave shelf still need installation checks.</p>'''+html[end:]
html=html.replace('<button data-action="dims"','<button data-action="dw" aria-pressed="false">Open Dishwasher</button><button data-action="corners" aria-pressed="false">Corner Interiors</button><button data-action="dims"')
(p/'option2.html').write_text(html)
base=(p/'scene.mjs').read_text().replace("import * as THREE from './three.mjs';",'').replace('export function buildKitchen','function original')
new=(p/'scene-option2.mjs').read_text().replace("import * as THREE from './three.mjs';",'').replace("import {buildKitchen as original} from './scene.mjs';",'').replace('export function buildKitchen','function buildKitchen')
view=viewer.replace("import * as THREE from './three.mjs';",'').replace("import {buildKitchen} from './scene-option2.mjs';",'')
three=base64.b64encode((p/'three.mjs').read_bytes()).decode()
script="import * as THREE from 'data:text/javascript;base64,"+three+"';\n"+base+'\n'+new+'\n'+view
(p/'option2-offline.html').write_text(html.replace('<script type="module" src="./viewer-option2.mjs"></script>','<script type="module">'+script+'</script>'))
export=(p/'export.mjs').read_text().replace('./scene.mjs','./scene-option2.mjs').replace('./alex-kitchen.glb','./kitchen-option2.glb').replace('./dimensions.json','./dimensions-option2.json')
(p/'export-option2.mjs').write_text(export)
print('Option 2 viewer and export source built; original files untouched.')
