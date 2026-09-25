# Option 2 — Connected Corners and Sink-Side Dishwasher

The current revision supersedes earlier Option 2 layouts. Original Option 1 files are preserved.

## Arrangement

- Refrigerator moved to the north-west entry corner, in the 800 mm bay. The user explicitly accepts the nominal 140 mm projection beyond the 700 mm entrance return for this study.
- Microwave shelf and 750 mm drawers moved to the right of the refrigerator.
- Sink stays centred at x=1005 mm on the 2010 mm clear south/window wall.
- Dishwasher moved to the west return, x=315 mm, z=1760 mm, facing east. It is beside the sink corner so supply and waste can route through the same wet-zone cabinets. Final hose routing and manufacturer length limits remain to be checked.
- East run now provides 600 mm preparation drawers in the former dishwasher position. The cooker remains centred at z=1700 mm.
- Countertops connect both south corners to their returns, following the structural projection. Ordinary construction joints and door reveals remain necessary.
- Corner cabinets contain continuous shelves and no solid internal dividing blocks across the connections. Corner Interiors hides their access fronts to expose the storage geometry.

## Door and access review

The viewer has a separate hinged dishwasher door and an Open Dishwasher control. A model bounding-box check at 90 degrees reports no intersection with either the refrigerator or cooker. The door occupies roughly x=635–1373 mm, z=1460–2060 mm. This checks the simplified model, not the manufacturer's exact door/rack envelope. Passing space is restricted while it is open.

Left corner side access is approximately 240 mm wide. Although the internal corner volume is connected, this is narrow and remains an unresolved joinery limitation. Do not claim large pots or a commercial corner mechanism will fit without checking its access opening. The sink-side standing area also needs a physical check.

The nominal aisle between the west and east 650 mm counters is 910 mm. Appliance fronts, handles and door/rack movement can reduce it. This is not a claim of compliance with accessibility or recommended work-aisle dimensions.

## Finish and remaining checks

The 800 × 270 × 210 mm AC design envelope is centred above the west entrance at z=1075 mm. Its bottom is 2050 mm and top 2320 mm, leaving 150 mm to the assumed 2470 mm ceiling. The entrance head is temporarily represented at 2000 mm; neither this head height nor the kitchen ceiling is surveyed. Confirm the chosen unit's installation/service clearances and drain route. The west upper run starts at z=1600 mm, and the over-fridge upper is 600 mm deep to avoid physical overlap with the AC. The adjacent refrigerator and upper units still need a service-access review.

Upper cabinetry remains white. Connectors up to 300 mm wide have no handles; regular doors each have one silver pull near the bottom edge. Two-door units use a central pair; single-door units use one edge pull. Lower cabinetry remains blue.

Modern blue slab fronts, silver hardware, light stone countertops and white backsplash follow the latest reference image. Kitchen ceiling/window heights remain provisional. Check actual appliance installation clearances, microwave shelf support/ventilation, corner access and sink drainage levels before fabrication.

## Build

Run `python3 build-option2.py` and `node export-option2.mjs`. Open `design-review.html` to compare options. `kitchen-option2.glb` and `dimensions-option2.json` correspond to this revision.
