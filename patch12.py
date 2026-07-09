import re

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

# Remove the copy button logic
old_hud_html = """    hud.innerHTML = `<button id="btn-copy" style="background: lime; color: black; border: none; padding: 6px; cursor: pointer; font-weight: bold;">Copia per l'AI</button><div id="hud-out" style="white-space: pre-wrap;"></div>`;
    document.body.appendChild(hud);
    
    document.getElementById('btn-copy').addEventListener('click', () => {
      navigator.clipboard.writeText(document.getElementById('hud-out').innerText).then(() => {
        document.getElementById('btn-copy').innerText = "Copiato!";
        setTimeout(() => document.getElementById('btn-copy').innerText = "Copia per l'AI", 2000);
      });
    });"""

new_hud_html = """    hud.innerHTML = `<div id="hud-out" style="white-space: pre-wrap;"></div>`;
    document.body.appendChild(hud);"""

content = content.replace(old_hud_html, new_hud_html)

# Add print rule to hide HUD and draggers UI just in case
if "@media print {" not in content:
    content = content.replace('</style>', '  @media print { #debug-hud { display: none !important; } }\n</style>')

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
