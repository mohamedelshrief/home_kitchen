# Home Kitchen

Interactive kitchen design concept built as a lightweight 3D web viewer for reviewing cabinet layouts, appliance placement, dimensions, and material choices.

## Overview

This project renders a kitchen concept in the browser using a custom Three.js scene. It includes:

- a 3D kitchen layout
- alternate view presets
- material and finish options
- dimension notes and assumptions
- a downloadable GLB model export

## Files

- `index.html` — project entry page
- `viewer.mjs` — interactive viewer logic
- `scene.mjs` — kitchen geometry and materials
- `three.mjs` — Three.js module
- `dimensions-and-assumptions.md` — notes and measurements
- `dimensions.json` — structured dimension data
- `alex-kitchen.glb` — exported 3D model

## Run locally

Open the project in a browser using a local static server, for example:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000/
```

## Notes

This repository is intended for design review and concept visualization. Some dimensions are provisional and should be confirmed before fabrication or final installation.
