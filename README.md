<!-- ================================ -->
<!-- Attune Self-Annotation README     -->
<!-- ================================ -->

<h1 align="center">
  Attune Self-Annotation
</h1>

<p align="center">
  <b>A gaze-aware self-annotation workflow for understanding attention in multi-robot video supervision</b>
  <br/>
  <i>Project page scaffold</i>
</p>

<p align="center">
  <a href="https://puqi7.github.io/Attune_SelfAnnotation/">Project Page</a> |
  <a href="static/pdfs/paper.pdf">Paper</a> |
  <a href="supplemental/">Supplemental</a>
</p>

<hr/>

Attune Self-Annotation is a project page and repository scaffold for presenting
research on gaze recording, replay, and self-annotation around multi-camera
robot video analysis. The page follows the same static GitHub Pages style as
`Puqi7/MRVS_VideoSensemaking`, with sections for the abstract, workflow, system
overview, data/model artifacts, citation, and acknowledgments.

## Repository Structure

```text
Attune_SelfAnnotation/
|-- index.html
|-- README.md
|-- .nojekyll
|-- supplemental/
`-- static/
    |-- css/
    |   `-- styles.css
    |-- images/
    |   `-- attune_pipeline_hybrid_sourcesans.svg
    |-- js/
    |   `-- main.js
    |-- pdfs/
    `-- videos/
```

## Edit Checklist

- Replace the provisional title/subtitle if the paper title changes.
- Update authors, affiliations, publication venue, and project links in
  `index.html`.
- Put the paper PDF in `static/pdfs/paper.pdf`.
- Add demo videos to `static/videos/` and update the video section.
- Replace the BibTeX block once the citation is final.

## Local Preview

Open `index.html` directly in a browser, or run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages

After pushing this repository to GitHub:

1. Go to `Settings` -> `Pages`.
2. Set source to `Deploy from a branch`.
3. Select the default branch and `/root`.
4. The project page should publish at:
   `https://puqi7.github.io/Attune_SelfAnnotation/`.

## Acknowledgments

This scaffold follows the academic project page pattern used by
`Puqi7/MRVS_VideoSensemaking`, which was generated from the Academic Project
Page Template and inspired by the Nerfies project page.

## Website License

This project page scaffold is intended for academic presentation use. Update
the license if the final project requires a different distribution policy.
