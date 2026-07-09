import re

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

# 1. Update HTML
old_header = """    <h1 class="drag-caterina" style="position: absolute; left: 24px; top: 40px; font-size: 50px; line-height: 1.1; margin: 0; text-transform: uppercase; cursor: move; z-index: 5;" data-offsetX="24" data-offsetY="40">Caterina</h1>
    <h1 class="drag-maria" style="position: absolute; left: 260px; top: 40px; font-size: 50px; line-height: 1.1; margin: 0; text-transform: uppercase; cursor: move; z-index: 5;" data-offsetX="260" data-offsetY="40">Maria</h1>
    <h1 class="drag-cozzoli" style="position: absolute; left: 420px; top: 40px; font-size: 50px; line-height: 1.1; margin: 0; text-transform: uppercase; cursor: move; z-index: 5;" data-offsetX="420" data-offsetY="40">Cozzoli</h1>
    <img class="drag-favicon" src="../public/favicon.png" style="position: absolute; top: 48px; left: 320px; transform: rotate(-12deg); width: 60px; height: 60px; z-index: 4; opacity: 0.9; cursor: move;" data-offsetX="320" data-offsetY="48" />
    <h2 class="drag-role" style="position: absolute; left: 24px; top: 96px; font-family: var(--font-body); font-size: 24px; font-weight: 500; margin: 0; cursor: move; z-index: 5;" data-offsetX="24" data-offsetY="96">${DATA.headline}</h2>"""

new_header = """    <h1 class="drag-name1" style="position: absolute; left: 24px; top: 10px; font-size: 50px; line-height: 1.1; margin: 0; text-transform: uppercase; cursor: move; z-index: 5;" data-offsetX="24" data-offsetY="10">Caterina Maria</h1>
    <h1 class="drag-name2" style="position: absolute; left: 24px; top: 60px; font-size: 50px; line-height: 1.1; margin: 0; text-transform: uppercase; cursor: move; z-index: 5;" data-offsetX="24" data-offsetY="60">Cozzoli</h1>
    <img class="drag-favicon" src="../public/favicon.png" style="position: absolute; top: 10px; left: 400px; transform: rotate(-12deg); width: 60px; height: 60px; z-index: 4; opacity: 0.9; cursor: move;" data-offsetX="400" data-offsetY="10" />
    <h2 class="drag-role" style="position: absolute; left: 24px; top: 110px; font-family: var(--font-body); font-size: 24px; font-weight: 500; margin: 0; cursor: move; z-index: 5;" data-offsetX="24" data-offsetY="110">${DATA.headline}</h2>"""

content = content.replace(old_header, new_header)

# 2. Update HUD function
old_hud = """      const cat = document.querySelector('.v-1 .drag-caterina');
      const mar = document.querySelector('.v-1 .drag-maria');
      const coz = document.querySelector('.v-1 .drag-cozzoli');
      const role = document.querySelector('.v-1 .drag-role');
      const fav = document.querySelector('.v-1 .drag-favicon');
      const mainInner = document.querySelector('.v-1 .drag-main');
      const img = document.querySelector('.v-1 .sidebar img');
      
      let html = '<strong style="color:white;margin-bottom:8px;">--- POSIZIONI E DIMENSIONI (Seleziona per copiare) ---</strong>';
      
      if(mainInner) html += `<div>Main Margin Top: ${-24 + (parseFloat(mainInner.getAttribute('data-offsetY'))||0)}px</div>`;
      if(cat) html += `<div>Caterina: left ${cat.getAttribute('data-offsetX')}px, top ${cat.getAttribute('data-offsetY')}px, font ${cat.style.fontSize}</div>`;
      if(mar) html += `<div>Maria: left ${mar.getAttribute('data-offsetX')}px, top ${mar.getAttribute('data-offsetY')}px, font ${mar.style.fontSize}</div>`;
      if(coz) html += `<div>Cozzoli: left ${coz.getAttribute('data-offsetX')}px, top ${coz.getAttribute('data-offsetY')}px, font ${coz.style.fontSize}</div>`;
      if(role) html += `<div>Ruolo: left ${role.getAttribute('data-offsetX')}px, top ${role.getAttribute('data-offsetY')}px, font ${role.style.fontSize}</div>`;
      if(fav) html += `<div>Favicon: left ${fav.getAttribute('data-offsetX')}px, top ${fav.getAttribute('data-offsetY')}px, width ${fav.style.width}</div>`;
      if(img) html += `<div>Foto Object-Position: center ${img.getAttribute('data-offsetY')}px</div>`;"""

new_hud = """      const n1 = document.querySelector('.v-1 .drag-name1');
      const n2 = document.querySelector('.v-1 .drag-name2');
      const role = document.querySelector('.v-1 .drag-role');
      const fav = document.querySelector('.v-1 .drag-favicon');
      const mainInner = document.querySelector('.v-1 .drag-main');
      const img = document.querySelector('.v-1 .sidebar img');
      
      let html = '<strong style="color:white;margin-bottom:8px;">--- POSIZIONI E DIMENSIONI (Seleziona per copiare) ---</strong>';
      
      if(mainInner) html += `<div>Main Margin Top: ${-24 + (parseFloat(mainInner.getAttribute('data-offsetY'))||0)}px</div>`;
      if(n1) html += `<div>Caterina Maria: left ${n1.getAttribute('data-offsetX')}px, top ${n1.getAttribute('data-offsetY')}px, font ${n1.style.fontSize}</div>`;
      if(n2) html += `<div>Cozzoli: left ${n2.getAttribute('data-offsetX')}px, top ${n2.getAttribute('data-offsetY')}px, font ${n2.style.fontSize}</div>`;
      if(role) html += `<div>Ruolo: left ${role.getAttribute('data-offsetX')}px, top ${role.getAttribute('data-offsetY')}px, font ${role.style.fontSize}</div>`;
      if(fav) html += `<div>Favicon: left ${fav.getAttribute('data-offsetX')}px, top ${fav.getAttribute('data-offsetY')}px, width ${fav.style.width}</div>`;
      if(img) html += `<div>Foto Object-Position: center ${img.getAttribute('data-offsetY')}px</div>`;"""

content = content.replace(old_hud, new_hud)

# 3. Update Sliders
old_sliders = """        <div>
          <label>Caterina Size: <input type="range" min="20" max="80" value="50" oninput="document.querySelector('.drag-caterina').style.fontSize = this.value + 'px'; updateHUD()"></label>
        </div>
        <div>
          <label>Maria Size: <input type="range" min="20" max="80" value="50" oninput="document.querySelector('.drag-maria').style.fontSize = this.value + 'px'; updateHUD()"></label>
        </div>
        <div>
          <label>Cozzoli Size: <input type="range" min="20" max="80" value="50" oninput="document.querySelector('.drag-cozzoli').style.fontSize = this.value + 'px'; updateHUD()"></label>
        </div>"""

new_sliders = """        <div>
          <label>Caterina Maria Size: <input type="range" min="20" max="80" value="50" oninput="document.querySelector('.drag-name1').style.fontSize = this.value + 'px'; updateHUD()"></label>
        </div>
        <div>
          <label>Cozzoli Size: <input type="range" min="20" max="80" value="50" oninput="document.querySelector('.drag-name2').style.fontSize = this.value + 'px'; updateHUD()"></label>
        </div>"""
content = content.replace(old_sliders, new_sliders)

# 4. Update setupDraggers
old_setup = """    makeDraggable(document.querySelector('.v-1 .drag-caterina'));
    makeDraggable(document.querySelector('.v-1 .drag-maria'));
    makeDraggable(document.querySelector('.v-1 .drag-cozzoli'));"""

new_setup = """    makeDraggable(document.querySelector('.v-1 .drag-name1'));
    makeDraggable(document.querySelector('.v-1 .drag-name2'));"""
content = content.replace(old_setup, new_setup)

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
