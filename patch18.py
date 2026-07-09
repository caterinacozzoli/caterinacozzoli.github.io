import re

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

# Remove sortableJS
content = content.replace('<script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>', '')

# Remove inline cursors
content = content.replace('cursor: move;', '')
content = content.replace('cursor: ns-resize;', '')
content = content.replace('cursor: grab;', '')

# Keep matchHeights but remove the rest of setupDraggers
script_match = re.search(r'(<script>.*?const root = document.getElementById\(\'root\'\);\nroot.innerHTML = \'\';\nroot.appendChild\(renderFns\[\'v-1\'\]\(\)\);\n)setupDraggers\(\);\n\nfunction setupDraggers\(\) \{.*?(  const matchHeights = \(\) => \{.*?\}\;\n  setTimeout\(matchHeights, 150\);\n  window\.addEventListener\(\'resize\', matchHeights\);).*?(\n\}\n</script>)', content, re.DOTALL)

if script_match:
    new_script = script_match.group(1) + "\n" + script_match.group(2) + "\n</script>"
    content = content[:script_match.start()] + new_script + content[script_match.end():]

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
