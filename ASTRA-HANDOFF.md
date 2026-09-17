# Kitchen Design Coordination Brief

## Purpose

Continue the existing compact kitchen 3D coordination model. Preserve the approved layout and confirmed dimensions, then develop presentation-quality renders from the same geometry. This is a private design review package, with neutral project naming and no company or personal branding.

The package is not a fabrication drawing. Record every unverified value as an assumption and do not present it as site-confirmed.

## Reference priority

1. `dimensions-and-assumptions.md` and the appliance schedule.
2. Apartment plan: `/home/muhamed/sha2a/khalil hamadaPLAN-Model (1).pdf`.
3. Original layout: `/home/muhamed/sha2a/matba5/ALEX KITCHEN.pdf` and `/home/muhamed/sha2a/matba5/20260825_025617.mp4`.
4. Existing-site photograph for window context only.
5. Image references for materials and styling only.

Do not use AI-generated images or photographic perspective to infer room dimensions, wall positions or appliance locations.

## Project files

- `scene.mjs`: current parametric 3D geometry; modify this file rather than rebuilding the project.
- `viewer.mjs`: cameras, controls, dimensions and refrigerator-door interaction.
- `index.html`: viewer interface.
- `alex-kitchen-offline.html`: self-contained viewer.
- `alex-kitchen.glb`: GLB export in metres.
- `dimensions.json`: current machine-readable model data.
- `dimensions-and-assumptions.md`: engineering notes and verified/assumed values.
- `realistic-fridge-corner-v4.png`: presentation reference only; do not measure from it.

## Coordinate system

- Unit: metres.
- `x = 0..2.21`: room width, west at x = 0 and east at x = 2.21.
- `z = 0..2.95`: north/sink wall at z = 0 and south/window wall at z = 2.95.
- `y`: height.
- The west wall contains the entry opening and is partially omitted from selected views to keep the interior visible.

## Confirmed geometry

| Item | Dimension |
| --- | ---: |
| Sink-wall width | 221 cm |
| Overall room length | 295 cm |
| Window-wall width | 201 cm |
| Corner column / projection | 20 × 70 cm |
| Window clear width | 71 cm |
| Dishwasher recess | 65 cm |
| Sink base | 75 cm |
| Cooker recess | 90 cm |
| Refrigerator recess | 80 cm |

## Appliance schedule

| Appliance | Model | Dimension (W × H × D) |
| --- | --- | --- |
| Refrigerator | Bosch KGN76CI3E8 | 75 × 186 × 84 cm |
| Cooker | Bosch HGP3I8W50S | 89.9 × 88.4–92.9 × 60.7 cm |
| Dishwasher | Bosch SMS4EMI60V | 60 × 84.5 × 60 cm |
| Hood | Bosch DWP94CC50T | 89.8 × height to confirm × 47 cm |
| Microwave | LG MH8265CIS | 54.4 × 30.8 × 45.8 cm |
| Washing machine | LG F4Y9EWG2PV | 60 × 85 × 56.5 cm; outside kitchen scope |

## Required layout

- Maintain the compact U-shaped layout.
- North wall: 60 cm dishwasher in the 65 cm recess, 75 cm sink base, then the east corner.
- East wall: 90 cm cooker recess from approximately z = 1.20 m to z = 2.10 m, with the hood above.
- South wall: 80 cm refrigerator recess at the west end, then the microwave worktop/drawer area, followed by the window and projection.
- Keep the microwave within the kitchen, on the worktop beside the refrigerator. Keep the washing machine outside the kitchen.
- Do not relocate the cooker, sink or refrigerator and do not introduce an island.

## Cabinet and finish requirements

- Baby-blue satin neo-classical lower cabinets with recessed panels.
- Warm ivory upper cabinets with simple arches and moulding.
- Warm-lit reeded-glass display cabinets.
- Light warm quartz worktop.
- Approximately 30 mm glass mosaic backsplash: icy blue, frosted clear, pearlescent silver and light lavender accent.
- Silver / stainless steel / satin-nickel sink, mixer, pulls and accessories. Avoid black accessories.
- A partially concealed stainless steel pyramidal hood, with its lower edge visible. Treat the enclosure as provisional until exhaust routing, safety clearances, filter access and service access are confirmed.

## Critical coordination items

### Refrigerator door

The refrigerator has a left-side handle and right-side hinges when viewed from the front. The door opens toward the adjacent wall. The model’s 90° door view intentionally shows the current handle/door conflict. Do not show free 90° clearance until it is confirmed using the Bosch installation drawing and final cabinet/end-panel dimensions.

### Microwave and stepped cabinet

- Retain the worktop microwave position beside the refrigerator and three drawers below.
- Do not place the 54.4 cm-wide microwave inside the 50 cm upper cabinet.
- The stepped upper cabinet ends before the window opening; retain this relationship.
- Verify microwave ventilation clearance from manufacturer instructions.

### Upper-cabinet corner

Keep the 290 mm connector that closes the gap between the sink-wall upper cabinets and the reeded-glass cabinet left of the cooker.

### AC trial above window

The model includes a separate review-only group named `Trial 1.5hp AC above window - 800 x 270 x 210`. Current unverified assumptions create approximately 45 mm overlap with the adjacent cabinet and 10 mm overlap with the window opening. Keep the clash visible and treat this group as an adjustable trial, not an approved installation.

## Values requiring site verification

1. Kitchen ceiling height.
2. Full window survey: width, height, sill height and distance from the corner.
3. Entry opening and clear wall area above it.
4. Refrigerator installation clearance and door swing from Bosch documentation.
5. Microwave ventilation clearance.
6. Hood enclosure feasibility, exhaust route, safety clearance and service access.
7. Electrical, gas, water, drainage and hood-outlet locations.
8. AC indoor-unit size, clearances, piping, condensate fall and outdoor-unit position.
9. Final door, drawer, end-panel and filler dimensions before fabrication.

## Validation protocol

After any geometry change:

1. Run `node export.mjs` to update the GLB.
2. Run `python3 package.py` to rebuild the offline viewer and delivery package.
3. Inspect the plan, refrigerator-and-window, cooker and AC views.
4. Test the 90° refrigerator-door control and ensure the displayed clearance condition matches the geometry.
5. Preserve the confirmed layout; use only verified measurements for fabrication decisions.

## Starter prompt

> Read `ASTRA-HANDOFF.md`, `dimensions-and-assumptions.md` and `dimensions.json` before editing. Inspect the existing `kitchen-v2` model and continue from its geometry; do not rebuild from scratch. Preserve the compact U-shaped layout and all confirmed plan dimensions. Keep the refrigerator-door clearance conflict, the stepped microwave arrangement, the 290 mm upper-cabinet corner connector, and the adjustable AC trial above the window visible until site measurements resolve them. Use image references only for materials and lighting. After each change, export the GLB, rebuild the offline package and visually verify the specified camera views and door interaction.
