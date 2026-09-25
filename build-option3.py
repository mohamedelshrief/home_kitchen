from pathlib import Path
import base64,re
p=Path(__file__).resolve().parent
v=(p/'viewer-option2.mjs').read_text().replace('./scene-option2.mjs','./scene-option3.mjs')
v=v.replace('doorOpen ? -Math.PI/2 : 0','doorOpen ? Math.PI/2 : 0')
v=v.replace('group.add(...lines);','if(lines.length)group.add(...lines);')
v=v.replace('model.root.attach(model.dwPivot);','for(const d of model.potDrawers)model.root.attach(d);model.root.attach(model.dwPivot);')
v += "\nconst drawerHome=model.potDrawers.map(d=>d.position.z);let potsOpen=false;host.querySelector('[data-action=pots]').onclick=e=>{if(doorOpen)host.querySelector('[data-action=door]').click();potsOpen=!potsOpen;model.potDrawers.forEach((d,i)=>d.position.z=drawerHome[i]+(potsOpen?.48:0));e.currentTarget.setAttribute('aria-pressed',String(potsOpen));draw();};const fridgeAction=host.querySelector('[data-action=door]').onclick;host.querySelector('[data-action=door]').onclick=e=>{if(potsOpen)host.querySelector('[data-action=pots]').click();fridgeAction(e);};\n"
v=v.replace("'Storage'","'DW 60'").replace("[1.48,.08,1.2],[1.48,.08,2.1]","[1.48,.08,.70],[1.48,.08,1.60]")
v=v.replace('Refrigerator at entry corner · entry projection accepted for this study','Option 3 · refrigerator entry projection 140 mm remains a constraint')
v=v.replace("'Sink 75'","'Sink 65'").replace('[.63,.08,3.0],[1.38,.08,3.0]','[.63,.08,3.0],[1.28,.08,3.0]').replace('[1.48,.08,.70],[1.48,.08,1.60]','[1.48,.08,1.10],[1.48,.08,2.00]')
(p/'viewer-option3.mjs').write_text(v)
h=(p/'option2.html').read_text()
h=re.sub(r'<script>.*?</script>','',h,flags=re.S)
h=h.replace('Option 2 — Modern Blue','Option 3 — Practical Access').replace('Modern slab fronts · centred sink · expanded storage study','White upper cabinets · same-wall wet zone · accessible storage')
h=h.replace('viewer-option2.mjs','viewer-option3.mjs').replace('kitchen-option2.glb','kitchen-option3.glb').replace('Corner Interiors','Inspect Both Corners')
h=h.replace('Option 3 — Practical Access','Option 3 — U Layout & Pot Drawers').replace('White upper cabinets · same-wall wet zone · accessible storage','Connected U worktop · 700 mm pot drawers · two retained storage corners')
h=h.replace('<button data-action="dims"','<button data-action="pots" aria-pressed="false">Open Pot Drawers</button><button data-action="dims"')
start=h.index('<p class="door-status"');end=h.index('</main>',start)
h=h[:start]+'''<p class="door-status" aria-live="polite">Option 3 · retained refrigerator projects 140 mm beyond the entrance return.</p>
<p class="note"><strong>Pot storage:</strong> dedicated 700 mm cabinet beside the refrigerator, with two deep drawers and illustrative 500 mm drawer boxes. Open Pot Drawers shows 480 mm travel. Refrigerator and drawers are shown one at a time because their open envelopes overlap.</p>
<p class="note"><strong>Connected U:</strong> both corners retain shelves. The north corner is accessed from the cooker wall through a nominal 430 mm front. The south corner proposes linked 270/280 mm folding leaves; inspect both interiors, then validate hinges and usable opening with the joiner.</p>
<p class="note"><strong>Wet zone:</strong> dishwasher remains beside the sink. Proposed sink base is 650 mm, moving the bowl 50 mm left of wall centre to enlarge corner access. Confirm the actual sink fits before adopting this change.</p>
<p class="note"><strong>Remaining constraints:</strong> 140 mm refrigerator entry projection; deep corner reach; short straight prep area. Microwave, hood and AC installation dimensions remain provisional. Connected storage is not a claim of fully usable volume or fabrication approval.</p>
<p class="note"><a href="option3-design-notes.md">Dimensions, decisions and remaining checks</a> · <a href="index.html">All three designs</a></p>'''+h[end:]
(p/'option3.html').write_text(h)
base=(p/'scene.mjs').read_text().replace("import * as THREE from './three.mjs';",'').replace('export function buildKitchen','function original')
s2=(p/'scene-option2.mjs').read_text().replace("import * as THREE from './three.mjs';",'').replace("import {buildKitchen as original} from './scene.mjs';",'').replace('export function buildKitchen','function previous')
s3=(p/'scene-option3.mjs').read_text().replace("import * as THREE from './three.mjs';",'').replace("import {buildKitchen as previous} from './scene-option2.mjs';",'').replace('export function buildKitchen','function buildKitchen')
view=v.replace("import * as THREE from './three.mjs';",'').replace("import {buildKitchen} from './scene-option3.mjs';",'')
script="import * as THREE from 'data:text/javascript;base64,"+base64.b64encode((p/'three.mjs').read_bytes()).decode()+"';\n"+'\n'.join([base,s2,s3,view])
(p/'option3-offline.html').write_text(h.replace('<script type="module" src="./viewer-option3.mjs"></script>','<script type="module">'+script+'</script>'))
(p/'export-option3.mjs').write_text((p/'export-option2.mjs').read_text().replace('option2','option3'))
shell=(p/'design-review.html').read_text().replace('data-page="alex-kitchen-offline.html" aria-pressed="false"','data-page="alex-kitchen-offline.html" aria-pressed="true"').replace('data-page="option2-offline.html" aria-pressed="true"','data-page="option2-offline.html" aria-pressed="false"').replace('src="option2-offline.html"','src="alex-kitchen-offline.html"')
shell=re.sub(r'<button data-page="option3-offline.html".*?</button>','',shell)
shell=shell.replace('</nav>','<button data-page="option3-offline.html" aria-pressed="false">03 · U Layout + Drawers</button></nav>')
for name in ['index.html','design-review.html']:(p/name).write_text(shell)
print('Built Option 3 and original-first navigation.')
