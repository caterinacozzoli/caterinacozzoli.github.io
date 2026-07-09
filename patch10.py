import re

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

# 1. Update Competenze Banner position
content = content.replace(
    '<h2 class="section-title drag-competenze" style="position: relative; left: 0px; top: 4px; z-index: 20; cursor: move;" data-offsetX="0" data-offsetY="4">Competenze</h2>',
    '<h2 class="section-title drag-competenze" style="position: relative; left: 0px; top: -13px; z-index: 20; cursor: move;" data-offsetX="0" data-offsetY="-13">Competenze</h2>'
)

# 2. Reduce distance between projects
content = content.replace('.proj-item { margin-bottom: 14px; }', '.proj-item { margin-bottom: 8px; }')

# 3. Double check the other values she mentioned just in case they aren't exactly what's in the file
content = re.sub(
    r'<div class="drag-projects" style="position: relative; top: \d+px; cursor: ns-resize;" data-offsetY="\d+">',
    r'<div class="drag-projects" style="position: relative; top: 7px; cursor: ns-resize;" data-offsetY="7">',
    content
)
content = re.sub(
    r'<div class="tools-wrap drag-tools" style="position: relative; top: \d+px; cursor: ns-resize;" data-offsetY="\d+">',
    r'<div class="tools-wrap drag-tools" style="position: relative; top: 12px; cursor: ns-resize;" data-offsetY="12">',
    content
)
content = re.sub(
    r'<div class="skills-wrap drag-skills" style="position: relative; top: \d+px; cursor: ns-resize;" data-offsetY="\d+">',
    r'<div class="skills-wrap drag-skills" style="position: relative; top: 17px; cursor: ns-resize;" data-offsetY="17">',
    content
)

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
