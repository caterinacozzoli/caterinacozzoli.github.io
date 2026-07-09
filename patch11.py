import re

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

# 1. Update Competenze Banner position
content = re.sub(
    r'<h2 class="section-title drag-competenze" style="position: relative; left: 0px; top: -?\d+px; z-index: 20; cursor: move;" data-offsetX="0" data-offsetY="-?\d+">Competenze</h2>',
    r'<h2 class="section-title drag-competenze" style="position: relative; left: 0px; top: 5px; z-index: 20; cursor: move;" data-offsetX="0" data-offsetY="5">Competenze</h2>',
    content
)

# 2. Update Blocco Progetti position
content = re.sub(
    r'<div class="drag-projects" style="position: relative; top: -?\d+px; cursor: ns-resize;" data-offsetY="-?\d+">',
    r'<div class="drag-projects" style="position: relative; top: 4px; cursor: ns-resize;" data-offsetY="4">',
    content
)

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
