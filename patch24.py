with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

# Restore margin-top: -20px to perfectly align with the left sidebar's 160px padding + 20px gap
content = content.replace(
    '''<div class="main-inner drag-main" style="display: flex; flex-direction: column; gap: 16px; margin-top: 0px; position: relative; flex: 1;">''',
    '''<div class="main-inner drag-main" style="display: flex; flex-direction: column; gap: 16px; margin-top: -20px; position: relative; flex: 1;">'''
)

# Remove padding-top from tools and skills to move them "piu in su" (higher up)
content = content.replace(
    '''<div class="tools-wrap drag-tools" style="position: relative; padding-top: 12px;">''',
    '''<div class="tools-wrap drag-tools" style="position: relative;">'''
)
content = content.replace(
    '''<div class="skills-wrap drag-skills" style="position: relative; padding-top: 17px;">''',
    '''<div class="skills-wrap drag-skills" style="position: relative;">'''
)

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
