import re

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

# Remove sortableJS
content = content.replace('<script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>', '')

# Remove inline cursors
content = content.replace('cursor: move;', '')
content = content.replace('cursor: ns-resize;', '')

# Keep matchHeights but remove the rest of setupDraggers
script_match = re.search(r'(<script>.*?const root = document.getElementById\(\'root\'\);\nroot.innerHTML = \'\';\nroot.appendChild\(renderFns\[\'v-1\'\]\(\)\);\n)setupDraggers\(\);\n\nfunction setupDraggers\(\) \{.*?(  const matchHeights = \(\) => \{.*?\}\;\n  setTimeout\(matchHeights, 150\);\n  window\.addEventListener\(\'resize\', matchHeights\);).*?(\n\}\n</script>)', content, re.DOTALL)

if script_match:
    new_script = script_match.group(1) + "\n" + script_match.group(2) + "\n</script>"
    content = content[:script_match.start()] + new_script + content[script_match.end():]

# Clean up CSS print rules to ensure it works beautifully
content = content.replace(
    '''  @media print {
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    #debug-hud { display: none !important; }
    body { background: #fff !important; }
    .page { margin: 0 !important; box-shadow: none !important; width: 100% !important; min-height: auto !important; }
  }''',
    '''  @media print {
    html, body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; background: #fff !important; margin: 0 !important; padding: 0 !important; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    .page { margin: 0 !important; box-shadow: none !important; width: 210mm !important; min-height: 297mm !important; }
  }'''
)

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
