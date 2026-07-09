import re

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

# 1. Fonts +1px
content = content.replace('.profile-text { font-size: 11.5px;', '.profile-text { font-size: 12.5px;')
content = content.replace('.exp-item .role, .edu-item .role { font-family: var(--font-body); font-weight: 800; font-size: 14px;', '.exp-item .role, .edu-item .role { font-family: var(--font-body); font-weight: 800; font-size: 15px;')
content = content.replace('.exp-item .org, .edu-item .org { font-size: 10.5px;', '.exp-item .org, .edu-item .org { font-size: 11.5px;')
content = content.replace('.exp-item .period { font-size: 8.5px;', '.exp-item .period { font-size: 9.5px;')
content = content.replace('.edu-item .period { font-size: 7px;', '.edu-item .period { font-size: 8px;')
content = content.replace('.exp-item .desc, .edu-item .desc { font-size: 9.5px;', '.exp-item .desc, .edu-item .desc { font-size: 10.5px;')

content = content.replace('.proj-item .name { font-family: var(--font-body); font-weight: 800; font-size: 16px;', '.proj-item .name { font-family: var(--font-body); font-weight: 800; font-size: 17px;')
content = content.replace('.proj-item .date { font-size: 10px;', '.proj-item .date { font-size: 11px;')
content = content.replace('.proj-item .desc { font-size: 10.5px; font-weight: 500; color: var(--ink); margin-top: 4px; margin-left: 45px;', '.proj-item .desc { font-size: 11.5px; font-weight: 500; color: var(--ink); margin-top: 4px; margin-left: 45px;')

content = content.replace('.skill-chip { padding: 4px 12px; border-radius: 20px; border: 1.5px solid var(--ink); color: var(--ink); font-size: 9.5px;', '.skill-chip { padding: 4px 12px; border-radius: 20px; border: 1.5px solid var(--ink); color: var(--ink); font-size: 10.5px;')

# 2. Make main-inner draggable
content = content.replace(
    '<div class="main-inner" style="display: flex; flex-direction: column; gap: 16px; margin-top: -24px;">',
    '<div class="main-inner drag-main" style="display: flex; flex-direction: column; gap: 16px; margin-top: -24px; position: relative; top: 0px; left: 0px; cursor: move;" data-offsetX="0" data-offsetY="0">'
)

# 3. Update HUD script
old_hud = """    function updateHUD() {
      const img = document.querySelector('.v-1 .sidebar img');
      const name = document.querySelector('.v-1 .drag-name');
      const role = document.querySelector('.v-1 .drag-role');
      const favicon = document.querySelector('.v-1 .drag-favicon');
      
      let html = '<strong style="color:white;margin-bottom:8px;">--- POSIZIONI E DIMENSIONI (Seleziona per copiare) ---</strong>';
      
      if(name) {
        html += `<div>Nome Top: ${name.getAttribute('data-offsetY')}px | Left: ${name.getAttribute('data-offsetX')}px | Font-Size: ${name.style.fontSize}</div>`;
      }
      if(role) {
        html += `<div>Ruolo Top: ${role.getAttribute('data-offsetY')}px | Left: ${role.getAttribute('data-offsetX')}px | Font-Size: ${role.style.fontSize}</div>`;
      }
      if(favicon) {
        html += `<div>Favicon Top: ${parseFloat(favicon.getAttribute('data-offsetY')) + 38}px | Left: ${parseFloat(favicon.getAttribute('data-offsetX'))}px (relative to 50%) | Width: ${favicon.style.width}</div>`;
      }
      if(img) {
        html += `<div>Foto Object-Position: center ${img.getAttribute('data-offsetY')}px</div>`;
      }
      
      contentDiv.innerHTML = html;
    }"""

new_hud = """    function updateHUD() {
      const img = document.querySelector('.v-1 .sidebar img');
      const name = document.querySelector('.v-1 .drag-name');
      const role = document.querySelector('.v-1 .drag-role');
      const favicon = document.querySelector('.v-1 .drag-favicon');
      const mainInner = document.querySelector('.v-1 .drag-main');
      
      let html = '<strong style="color:white;margin-bottom:8px;">--- POSIZIONI E DIMENSIONI (Seleziona per copiare) ---</strong>';
      
      if(mainInner) {
        const top = parseFloat(mainInner.getAttribute('data-offsetY')) || 0;
        html += `<div>Testi Destra Margin Top: ${-24 + top}px</div>`;
      }
      if(name) {
        html += `<div>Nome Top: ${name.getAttribute('data-offsetY')}px | Left: ${name.getAttribute('data-offsetX')}px | Font-Size: ${name.style.fontSize}</div>`;
      }
      if(role) {
        html += `<div>Ruolo Top: ${role.getAttribute('data-offsetY')}px | Left: ${role.getAttribute('data-offsetX')}px | Font-Size: ${role.style.fontSize}</div>`;
      }
      if(favicon) {
        html += `<div>Favicon Top: ${parseFloat(favicon.getAttribute('data-offsetY')) + 38}px | Left: ${parseFloat(favicon.getAttribute('data-offsetX'))}px (relative to 50%) | Width: ${favicon.style.width}</div>`;
      }
      if(img) {
        html += `<div>Foto Object-Position: center ${img.getAttribute('data-offsetY')}px</div>`;
      }
      
      contentDiv.innerHTML = html;
    }"""

content = content.replace(old_hud, new_hud)

# Also add drag-main to setupDraggers
old_setup = """    makeDraggable(document.querySelector('.v-1 .sidebar img'));
    makeDraggable(document.querySelector('.v-1 .drag-name'));
    makeDraggable(document.querySelector('.v-1 .drag-role'));
    makeDraggable(document.querySelector('.v-1 .drag-favicon'));"""

new_setup = """    makeDraggable(document.querySelector('.v-1 .sidebar img'));
    makeDraggable(document.querySelector('.v-1 .drag-name'));
    makeDraggable(document.querySelector('.v-1 .drag-role'));
    makeDraggable(document.querySelector('.v-1 .drag-favicon'));
    makeDraggable(document.querySelector('.v-1 .drag-main'));"""

content = content.replace(old_setup, new_setup)

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
