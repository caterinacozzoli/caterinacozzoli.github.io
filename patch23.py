with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

# CSS font size shrinking
content = content.replace('font-size: 12.5px;', 'font-size: 12px;')
content = content.replace('.exp-item .role, .edu-item .role { font-family: var(--font-body); font-weight: 800; font-size: 15px;', '.exp-item .role, .edu-item .role { font-family: var(--font-body); font-weight: 800; font-size: 14.5px;')
content = content.replace('.exp-item .org, .edu-item .org { font-size: 11.5px;', '.exp-item .org, .edu-item .org { font-size: 11px;')
content = content.replace('.exp-item .desc, .edu-item .desc { font-size: 10.5px;', '.exp-item .desc, .edu-item .desc { font-size: 10px;')
content = content.replace('.proj-item .name { font-family: var(--font-body); font-weight: 800; font-size: 17px;', '.proj-item .name { font-family: var(--font-body); font-weight: 800; font-size: 16px;')
content = content.replace('.proj-item .desc { font-size: 11.5px;', '.proj-item .desc { font-size: 11px;')

# Aligning Perfil and Contatos
content = content.replace(
    '''<div class="main-inner drag-main" style="display: flex; flex-direction: column; gap: 16px; margin-top: -20px; position: relative; top: 0px; left: 0px;">''',
    '''<div class="main-inner drag-main" style="display: flex; flex-direction: column; gap: 16px; margin-top: 0px; position: relative; flex: 1;">'''
)

# Aligning Ferramentas at bottom
content = content.replace(
    '''<div style="position: relative; z-index: 11;"><h2 class="section-title">Ferramentas</h2>''',
    '''<div style="position: relative; z-index: 11; margin-top: auto;"><h2 class="section-title">Ferramentas</h2>'''
)

# Aligning Competencias at bottom
content = content.replace(
    '''<div><h2 class="section-title drag-competenze" style="position: relative; left: 0px; top: 5px; z-index: 20; " data-offsetX="0" data-offsetY="5">Competências</h2>''',
    '''<div style="margin-top: auto;"><h2 class="section-title drag-competenze" style="position: relative; z-index: 20; ">Competências</h2>'''
)

# Removing random offsets from tools, skills, projects to prevent misalignment
content = content.replace(
    '''<div class="drag-projects" style="position: relative; top: 4px; " data-offsetY="4">''',
    '''<div class="drag-projects" style="position: relative;">'''
)
content = content.replace(
    '''<div class="tools-wrap drag-tools" style="position: relative; top: 12px; " data-offsetY="12">''',
    '''<div class="tools-wrap drag-tools" style="position: relative; padding-top: 12px;">''' # Keep a bit of visual spacing internally
)
content = content.replace(
    '''<div class="skills-wrap drag-skills" style="position: relative; top: 17px; " data-offsetY="17">''',
    '''<div class="skills-wrap drag-skills" style="position: relative; padding-top: 17px;">''' # Keep visual spacing
)


with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
