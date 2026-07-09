import re

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

# 1. 4 per riga in tools-wrap
content = re.sub(
    r'\.tools-wrap \{ display: grid; grid-template-columns: repeat\(3, 1fr\); gap: 16px; \}',
    r'.tools-wrap { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }',
    content
)

# 2. Bullet point in lingue e hobby (genList)
content = re.sub(
    r'const genList = \(arr\) => arr\.map\(\(a, i\) => `<div style="font-size: 12px; margin-bottom: \$\{i === arr\.length - 1 \? 0 : 8\}px;">\$\{a\}</div>`\)\.join\(''\);',
    r'const genList = (arr) => `<ul class="bullet-list" style="margin:0; padding:0; list-style:none;">` + arr.map((a, i) => `<li style="font-size: 12.5px; margin-bottom: ${i === arr.length - 1 ? 0 : 6}px;">${a}</li>`).join(\'\') + `</ul>`;',
    content
)

# 3 & 4. MainContent changes (Progetti banner + Draggable classes/structure)
old_main_content = """const MainContent = `
  <div style="display: flex; flex-direction: column; justify-content: center; height: 160px; margin-top: -32px; margin-left: -32px; margin-right: -32px; padding: 0 32px; border-bottom: 4px solid var(--ink); box-sizing: border-box;">
    <h1 style="font-size: 50px; line-height: 1.1; margin: 0 0 8px 0; text-transform: uppercase;">
      Caterina <span style="position: relative; display: inline-block; z-index: 2;">Maria
        <img src="../public/favicon.png" style="position: absolute; top: 38px; left: 50%; transform: translateX(-50%) rotate(-12deg); width: 60px; height: 60px; z-index: -1; opacity: 0.9;" data-offsetX="0" />
      </span> Cozzoli
    </h1>
    <h2 style="font-family: var(--font-body); font-size: 24px; font-weight: 500; margin: 0;">${DATA.headline}</h2>
  </div>
  <div class="main-inner" style="display: flex; flex-direction: column; gap: 29px; margin-top: -32px;">
    <div><h2 class="section-title">Profilo</h2><p class="profile-text">${DATA.profile}</p></div>
    <div>${genProj()}</div>
    <div><h2 class="section-title">Esperienza</h2>${genExp()}</div>
    <div><h2 class="section-title">Competenze</h2>${genSkills()}</div>
  </div>
`;"""

new_main_content = """const MainContent = `
  <div style="display: flex; flex-direction: column; justify-content: center; height: 160px; margin-top: -32px; margin-left: -32px; margin-right: -32px; padding: 0 32px; border-bottom: 4px solid var(--ink); box-sizing: border-box;">
    <h1 class="drag-name" style="font-size: 50px; line-height: 1.1; margin: 0 0 8px 0; text-transform: uppercase; position: relative; left: 0px; top: 0px; cursor: move;" data-offsetX="0" data-offsetY="0">
      Caterina <span style="position: relative; display: inline-block; z-index: 2;">Maria
        <img class="drag-favicon" src="../public/favicon.png" style="position: absolute; top: 38px; left: 50%; transform: translateX(-50%) rotate(-12deg); width: 60px; height: 60px; z-index: -1; opacity: 0.9; cursor: move;" data-offsetX="0" />
      </span> Cozzoli
    </h1>
    <h2 class="drag-role" style="font-family: var(--font-body); font-size: 24px; font-weight: 500; margin: 0; position: relative; left: 0px; top: 0px; cursor: move;" data-offsetX="0" data-offsetY="0">${DATA.headline}</h2>
  </div>
  <div class="main-inner" style="display: flex; flex-direction: column; gap: 29px; margin-top: -32px;">
    <div><h2 class="section-title">Profilo</h2><p class="profile-text">${DATA.profile}</p></div>
    <div><h2 class="section-title">Progetti In Evidenza</h2>${genProj()}</div>
    <div><h2 class="section-title">Esperienza</h2>${genExp()}</div>
    <div><h2 class="section-title">Competenze</h2>${genSkills()}</div>
  </div>
`;"""

content = content.replace(old_main_content, new_main_content)

# 5. Replace setupDraggers completely
# We find the start of function setupDraggers() and replace to the end of the file or up to the closing brace.
start_idx = content.find("function setupDraggers() {")
end_idx = content.find("</script>", start_idx)

new_draggers = """function setupDraggers() {
  const mainInner = document.querySelector('.v-1 .main-inner');
  const sideCol = document.querySelector('.v-1 .sidebar');
  const gridContainer = document.querySelector('.v-1');
  const photoImg = document.querySelector('.v-1 .sidebar img');
  const nameEl = document.querySelector('.drag-name');
  const roleEl = document.querySelector('.drag-role');
  const favicon = document.querySelector('.drag-favicon');

  let hud = document.getElementById('debug-hud');
  let hudOut = document.getElementById('hud-out');
  
  if(!hud) {
    hud = document.createElement('div');
    hud.id = 'debug-hud';
    hud.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: rgba(0,0,0,0.9); color: lime; padding: 16px; border-radius: 8px; font-family: monospace; z-index: 9999; pointer-events: auto; display: flex; flex-direction: column; gap: 12px; font-size: 13px;';
    
    const hudControls = document.createElement('div');
    hudControls.id = 'hud-controls';
    hudControls.innerHTML = `
      <div style="display:flex; justify-content:space-between; width:260px; margin-bottom: 4px;">
        <label>Nome Size:</label> <input type="range" id="sz-name" min="20" max="100" value="50">
      </div>
      <div style="display:flex; justify-content:space-between; width:260px; margin-bottom: 4px;">
        <label>UX/UI Size:</label> <input type="range" id="sz-role" min="10" max="50" value="24">
      </div>
      <div style="display:flex; justify-content:space-between; width:260px;">
        <label>Favicon Size:</label> <input type="range" id="sz-fav" min="20" max="150" value="60">
      </div>
    `;
    hud.appendChild(hudControls);

    hudOut = document.createElement('div');
    hudOut.id = 'hud-out';
    hudOut.style.whiteSpace = 'pre-wrap';
    hudOut.style.userSelect = 'text';
    hud.appendChild(hudOut);
    document.body.appendChild(hud);
  }

  const updateHud = () => {
    let text = "--- POSIZIONI (Seleziona per copiare) ---\\n";
    if(gridContainer) text += `Intero Blocco Margin Top: ${gridContainer.style.marginTop || '0px'}\\n`;
    if(mainInner) text += `Testi Destra Margin Top: ${mainInner.style.marginTop || '0px'}\\n`;
    if(sideCol) text += `Colonna Sinistra Padding Top: ${sideCol.style.paddingTop || '160px'}\\n`;
    if(photoImg) text += `Foto Object-Position: ${photoImg.style.objectPosition || 'center -50px'}\\n`;
    if(nameEl) {
      text += `Nome Size: ${nameEl.style.fontSize || '50px'}\\n`;
      text += `Nome Pos: left ${nameEl.style.left || '0px'}, top ${nameEl.style.top || '0px'}\\n`;
    }
    if(roleEl) {
      text += `UX/UI Size: ${roleEl.style.fontSize || '24px'}\\n`;
      text += `UX/UI Pos: left ${roleEl.style.left || '0px'}, top ${roleEl.style.top || '0px'}\\n`;
    }
    if(favicon) {
       text += `Favicon Size: ${favicon.style.width || '60px'}\\n`;
       text += `Favicon Top: ${favicon.style.top || '38px'}\\n`;
       text += `Favicon Left: ${favicon.style.left || '50%'}\\n`;
    }
    if(hudOut) hudOut.textContent = text;
  };
  updateHud();

  if(!window.controlsBound) {
    document.getElementById('sz-name')?.addEventListener('input', (e) => { if(nameEl) nameEl.style.fontSize = e.target.value + 'px'; updateHud(); });
    document.getElementById('sz-role')?.addEventListener('input', (e) => { if(roleEl) roleEl.style.fontSize = e.target.value + 'px'; updateHud(); });
    document.getElementById('sz-fav')?.addEventListener('input', (e) => { 
      if(favicon) { favicon.style.width = e.target.value + 'px'; favicon.style.height = e.target.value + 'px'; }
      updateHud();
    });
    window.controlsBound = true;
  }

  if(gridContainer && !gridContainer.dataset.dragBound) {
    gridContainer.dataset.dragBound = '1';
    const gridHandle = document.createElement('div');
    gridHandle.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 15px; background: rgba(0,0,255,0.1); cursor: ns-resize; z-index: 100;';
    document.querySelector('.page').appendChild(gridHandle);
    let isResizing = false, startY = 0, startMarg = 0;
    gridHandle.addEventListener('mousedown', (e) => {
      isResizing = true; startY = e.clientY; startMarg = parseInt(window.getComputedStyle(gridContainer).marginTop) || 0; e.preventDefault();
    });
    window.addEventListener('mousemove', (e) => { if(isResizing) { gridContainer.style.marginTop = `${startMarg + e.clientY - startY}px`; updateHud(); } });
    window.addEventListener('mouseup', () => { isResizing = false; });
  }

  if(mainInner && !mainInner.dataset.dragBound) {
    mainInner.dataset.dragBound = '1';
    const mainCol = document.querySelector('.v-1 .main');
    const mainHandle = document.createElement('div');
    mainHandle.style.cssText = 'position: absolute; top: 160px; left: 0; right: 0; height: 15px; background: rgba(0,0,0,0.1); cursor: ns-resize; z-index: 999;';
    mainCol.style.position = 'relative'; mainCol.appendChild(mainHandle);
    let isResizing = false, startY = 0, startMarg = 0;
    mainHandle.addEventListener('mousedown', (e) => {
      isResizing = true; startY = e.clientY; startMarg = parseInt(window.getComputedStyle(mainInner).marginTop) || 0; e.preventDefault();
    });
    window.addEventListener('mousemove', (e) => { if(isResizing) { mainInner.style.marginTop = `${startMarg + e.clientY - startY}px`; updateHud(); } });
    window.addEventListener('mouseup', () => { isResizing = false; });
  }

  if(sideCol && !sideCol.dataset.dragBound) {
    sideCol.dataset.dragBound = '1';
    const sideHandle = document.createElement('div');
    sideHandle.style.cssText = 'position: absolute; top: 160px; left: 0; right: 0; height: 15px; background: rgba(0,0,0,0.1); cursor: ns-resize; z-index: 999;';
    sideCol.appendChild(sideHandle);
    let isResizing = false, startY = 0, startPad = 0;
    sideHandle.addEventListener('mousedown', (e) => {
      isResizing = true; startY = e.clientY; startPad = parseInt(window.getComputedStyle(sideCol).paddingTop) || 160; e.preventDefault();
    });
    window.addEventListener('mousemove', (e) => { if(isResizing) { sideCol.style.paddingTop = `${startPad + e.clientY - startY}px`; updateHud(); } });
    window.addEventListener('mouseup', () => { isResizing = false; });
  }

  if(photoImg && !photoImg.dataset.dragBound) {
    photoImg.dataset.dragBound = '1';
    photoImg.style.cursor = 'ns-resize';
    let isResizing = false, startY = 0, startObj = 0;
    photoImg.addEventListener('mousedown', (e) => {
      isResizing = true; startY = e.clientY; startObj = parseInt(photoImg.dataset.offsetY) || -50; e.preventDefault(); e.stopPropagation();
    });
    window.addEventListener('mousemove', (e) => { if(isResizing) { let newY = startObj + e.clientY - startY; photoImg.dataset.offsetY = newY; photoImg.style.objectPosition = `center ${newY}px`; updateHud(); } });
    window.addEventListener('mouseup', () => { isResizing = false; });
  }

  function makeDraggable(el, isFavicon) {
    if(!el) return;
    el.style.cursor = 'move';
    let isDragging = false;
    let startX = 0, startY = 0, initialX = 0, initialY = 0;
    el.addEventListener('mousedown', (e) => {
      if(!isFavicon && e.target === favicon) return;
      isDragging = true; startX = e.clientX; startY = e.clientY;
      initialX = parseInt(el.dataset.offsetX) || 0;
      initialY = parseInt(el.dataset.offsetY) || 0;
      if(isFavicon) {
        initialY = parseInt(window.getComputedStyle(el).top) || 38;
      }
      e.preventDefault(); e.stopPropagation();
    });
    window.addEventListener('mousemove', (e) => {
      if(isDragging) {
        let newX = initialX + (e.clientX - startX);
        let newY = initialY + (e.clientY - startY);
        el.dataset.offsetX = newX;
        el.dataset.offsetY = newY;
        if(isFavicon) {
          el.style.left = `calc(50% + ${newX}px)`;
          el.style.top = `${initialY + (e.clientY - startY)}px`;
        } else {
          el.style.left = `${newX}px`;
          el.style.top = `${newY}px`;
        }
        updateHud();
      }
    });
    window.addEventListener('mouseup', () => { isDragging = false; });
  }

  makeDraggable(nameEl, false);
  makeDraggable(roleEl, false);
  makeDraggable(favicon, true);
}
"""

content = content[:start_idx] + new_draggers + content[end_idx:]

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
