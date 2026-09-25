from pathlib import Path
import base64,re
p=Path(__file__).resolve().parent
v=(p/'viewer-option2.mjs').read_text().replace('./scene-option2.mjs','./scene-option3.mjs')
v=v.replace('doorOpen ? -Math.PI/2 : 0','doorOpen ? Math.PI/2 : 0')
v=v.replace('group.add(...lines);','if(lines.length)group.add(...lines);')
v=v.replace("'Storage'","'DW 60'").replace("[1.48,.08,1.2],[1.48,.08,2.1]","[1.48,.08,.70],[1.48,.08,1.60]")
v=v.replace('Refrigerator at entry corner · entry projection accepted for this study','Option 3 · refrigerator entry projection 140 mm remains a constraint')
(p/'viewer-option3.mjs').write_text(v)
h=(p/'option2.html').read_text()
h=re.sub(r'<script>.*?</script>','',h,flags=re.S)
h=h.replace('Option 2 — Modern Blue','Option 3 — Practical Access').replace('Modern slab fronts · centred sink · expanded storage study','White upper cabinets · same-wall wet zone · accessible storage')
h=h.replace('viewer-option2.mjs','viewer-option3.mjs').replace('kitchen-option2.glb','kitchen-option3.glb').replace('Corner Interiors','Inspect North Corner')
start=h.index('<p class="door-status"');end=h.index('</main>',start)
h=h[:start]+'''<p class="door-status" aria-live="polite">Option 3 · retained refrigerator projects 140 mm beyond the entrance return.</p>
<p class="note"><strong>Wet zone:</strong> 600 mm dishwasher immediately beside the centred 750 mm sink cabinet. No west-wall base units obstruct standing at the dishwasher. The right-hand 600 mm cupboard uses two short hinged doors.</p>
<p class="note"><strong>Storage:</strong> one connected north blind corner with a 700 mm nominal double-door opening. 350 mm pan drawers beside the range. The open area at the south-east is standing/access space, not a missing corner cabinet.</p>
<p class="note"><strong>Remaining compromises:</strong> the existing refrigerator still restricts the entry; the main straight prep frontage is 740 mm, below the 914 mm planning benchmark. Microwave shelf, hood enclosure, AC and all vertical dimensions need installation checks. This is a measured concept, not fabrication approval.</p>
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
shell=shell.replace('</nav>','<button data-page="option3-offline.html" aria-pressed="false">03 · Practical Access</button></nav>')
for name in ['index.html','design-review.html']:(p/name).write_text(shell)
print('Built Option 3 and original-first navigation.')
