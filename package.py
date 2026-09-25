from pathlib import Path
import base64, re, json, struct, zipfile
p=Path(__file__).parent
scene=(p/'scene.mjs').read_text().replace("import * as THREE from './three.mjs';\n",'').replace('export function buildKitchen','function buildKitchen')
viewer=(p/'viewer.mjs').read_text().replace("import * as THREE from './three.mjs';\n",'').replace("import {buildKitchen} from './scene.mjs?v=5';\n",'')
# Self-contained offline model viewer, retaining link to the adjacent GLB file.
three=base64.b64encode((p/'three.mjs').read_bytes()).decode()
code="import * as THREE from 'data:text/javascript;base64,"+three+"';\n"+scene+'\n'+viewer
html=(p/'index.html').read_text().replace('<script type="module" src="./viewer.mjs?v=5"></script>','<script type="module">\n'+code+'\n</script>')
(p/'alex-kitchen-offline.html').write_text(html)
fragment=(p/'inline-shell.html').read_text()+'\n<script type="module">\n'+"import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';\n"+scene+'\n'+viewer+'\n</script>\n'
(p/'my-kitchen-v2.html').write_text(fragment)
# Validate GLB container and the final metadata.
b=(p/'alex-kitchen.glb').read_bytes();magic,version,size=struct.unpack_from('<4sII',b);assert magic==b'glTF' and version==2 and size==len(b)
jlen,jtype=struct.unpack_from('<II',b,12);doc=json.loads(b[20:20+jlen]);assert doc['asset']['version']=='2.0'
assert len(doc['meshes'])>500
meta=json.loads((p/'dimensions.json').read_text());assert meta['provisional']['ceiling']==2.47;assert meta['appliances']['microwave']['width']==.544
assert 'Outside kitchen' in meta['appliances']['washingMachine']['placement']
print('Verified GLB:',len(doc['meshes']),'meshes;',len(b),'bytes; inline:',len(fragment.encode()),'bytes')
with zipfile.ZipFile(p/'alex-kitchen-package.zip','w',zipfile.ZIP_DEFLATED) as z:
 for name in ['alex-kitchen-offline.html','alex-kitchen.glb','ASTRA-HANDOFF.md','dimensions-and-assumptions.md','dimensions.json','material-concept.png','realistic-fridge-corner-v4.png','scene.mjs','viewer.mjs','three.mjs','export.mjs','GLTFExporter.mjs','TextureUtils.mjs','index.html']:
  z.write(p/name,'alex-kitchen/'+name)
