with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

old_header = '<div style="display: flex; flex-direction: column; justify-content: center; height: 160px; margin-top: -32px; margin-left: -32px; margin-right: -32px; padding: 0 32px; border-bottom: 4px solid var(--ink); box-sizing: border-box;">'
new_header = '<div style="display: flex; flex-direction: column; justify-content: center; height: 160px; margin-top: -32px; margin-left: -32px; margin-right: -32px; padding: 0 32px; border-bottom: 4px solid var(--ink); box-sizing: border-box; position: relative; z-index: 10;">'

content = content.replace(old_header, new_header)

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
