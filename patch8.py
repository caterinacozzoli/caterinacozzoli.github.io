import re

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

# 1. Replace the h1 and h2 in MainContent
old_header = """    <h1 class="drag-name" style="font-size: 50px; line-height: 1.1; margin: 0 0 8px 0; text-transform: uppercase; position: relative; left: 0px; top: 0px; cursor: move;" data-offsetX="0" data-offsetY="0">
      Caterina <span style="position: relative; display: inline-block; z-index: 2;">Maria
        <img class="drag-favicon" src="../public/favicon.png" style="position: absolute; top: 38px; left: 50%; transform: translateX(-50%) rotate(-12deg); width: 60px; height: 60px; z-index: -1; opacity: 0.9; cursor: move;" data-offsetX="0" />
      </span> Cozzoli
    </h1>
    <h2 class="drag-role" style="font-family: var(--font-body); font-size: 24px; font-weight: 500; margin: 0; position: relative; left: 0px; top: 0px; cursor: move;" data-offsetX="0" data-offsetY="0">${DATA.headline}</h2>"""

new_header = """    <h1 class="drag-caterina" style="position: absolute; left: 24px; top: 40px; font-size: 50px; line-height: 1.1; margin: 0; text-transform: uppercase; cursor: move; z-index: 5;" data-offsetX="24" data-offsetY="40">Caterina</h1>
    <h1 class="drag-maria" style="position: absolute; left: 260px; top: 40px; font-size: 50px; line-height: 1.1; margin: 0; text-transform: uppercase; cursor: move; z-index: 5;" data-offsetX="260" data-offsetY="40">Maria</h1>
    <h1 class="drag-cozzoli" style="position: absolute; left: 420px; top: 40px; font-size: 50px; line-height: 1.1; margin: 0; text-transform: uppercase; cursor: move; z-index: 5;" data-offsetX="420" data-offsetY="40">Cozzoli</h1>
    <img class="drag-favicon" src="../public/favicon.png" style="position: absolute; top: 48px; left: 320px; transform: rotate(-12deg); width: 60px; height: 60px; z-index: 4; opacity: 0.9; cursor: move;" data-offsetX="320" data-offsetY="48" />
    <h2 class="drag-role" style="position: absolute; left: 24px; top: 96px; font-family: var(--font-body); font-size: 24px; font-weight: 500; margin: 0; cursor: move; z-index: 5;" data-offsetX="24" data-offsetY="96">${DATA.headline}</h2>"""

content = content.replace(old_header, new_header)

# 2. Update HUD content output
old_hud = """      const img = document.querySelector('.v-1 .sidebar img');
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

new_hud = """      const cat = document.querySelector('.v-1 .drag-caterina');
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
      if(img) html += `<div>Foto Object-Position: center ${img.getAttribute('data-offsetY')}px</div>`;
      
      contentDiv.innerHTML = html;
    }"""
content = content.replace(old_hud, new_hud)

# 3. Update Sliders
old_sliders = """        <div>
          <label>Nome Size: <input type="range" min="20" max="80" value="50" oninput="document.querySelector('.drag-name').style.fontSize = this.value + 'px'; updateHUD()"></label>
        </div>
        <div>
          <label>Ruolo Size: <input type="range" min="12" max="40" value="24" oninput="document.querySelector('.drag-role').style.fontSize = this.value + 'px'; updateHUD()"></label>
        </div>
        <div>
          <label>Favicon Size: <input type="range" min="20" max="100" value="60" oninput="document.querySelector('.drag-favicon').style.width = this.value + 'px'; document.querySelector('.drag-favicon').style.height = this.value + 'px'; updateHUD()"></label>
        </div>"""

new_sliders = """        <div>
          <label>Caterina Size: <input type="range" min="20" max="80" value="50" oninput="document.querySelector('.drag-caterina').style.fontSize = this.value + 'px'; updateHUD()"></label>
        </div>
        <div>
          <label>Maria Size: <input type="range" min="20" max="80" value="50" oninput="document.querySelector('.drag-maria').style.fontSize = this.value + 'px'; updateHUD()"></label>
        </div>
        <div>
          <label>Cozzoli Size: <input type="range" min="20" max="80" value="50" oninput="document.querySelector('.drag-cozzoli').style.fontSize = this.value + 'px'; updateHUD()"></label>
        </div>
        <div>
          <label>Ruolo Size: <input type="range" min="12" max="40" value="24" oninput="document.querySelector('.drag-role').style.fontSize = this.value + 'px'; updateHUD()"></label>
        </div>
        <div>
          <label>Favicon Size: <input type="range" min="20" max="100" value="60" oninput="document.querySelector('.drag-favicon').style.width = this.value + 'px'; document.querySelector('.drag-favicon').style.height = this.value + 'px'; updateHUD()"></label>
        </div>"""
content = content.replace(old_sliders, new_sliders)

# 4. Update setupDraggers
old_setup = """    makeDraggable(document.querySelector('.v-1 .sidebar img'));
    makeDraggable(document.querySelector('.v-1 .drag-name'));
    makeDraggable(document.querySelector('.v-1 .drag-role'));
    makeDraggable(document.querySelector('.v-1 .drag-favicon'));
    makeDraggable(document.querySelector('.v-1 .drag-main'));"""

new_setup = """    makeDraggable(document.querySelector('.v-1 .sidebar img'));
    makeDraggable(document.querySelector('.v-1 .drag-caterina'));
    makeDraggable(document.querySelector('.v-1 .drag-maria'));
    makeDraggable(document.querySelector('.v-1 .drag-cozzoli'));
    makeDraggable(document.querySelector('.v-1 .drag-role'));
    makeDraggable(document.querySelector('.v-1 .drag-favicon'));
    makeDraggable(document.querySelector('.v-1 .drag-main'));"""
content = content.replace(old_setup, new_setup)

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
