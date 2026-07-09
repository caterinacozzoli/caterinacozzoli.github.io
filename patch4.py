import re
with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

# 1. line-heights and bullet-list margins
content = content.replace('p { margin: 0; line-height: 1.6; }', 'p { margin: 0; line-height: 1.4; }')
content = content.replace('.profile-text { font-size: 13.5px; line-height: 1.6; color: var(--ink); font-weight: 500; }', '.profile-text { font-size: 13.5px; line-height: 1.4; color: var(--ink); font-weight: 500; }')
content = content.replace('.bullet-list li { position: relative; padding-left: 20px; font-size: 12.5px; line-height: 1.7; font-weight: 500; color: var(--ink); margin-bottom: 6px; }', '.bullet-list li { position: relative; padding-left: 20px; font-size: 12.5px; line-height: 1.4; font-weight: 500; color: var(--ink); margin-bottom: 4px; }')

# 2. .section-title
content = content.replace(
    "  .section-title { \n    font-size: 22px; text-transform: uppercase; color: var(--ink); margin-bottom: 17px; \n    display: flex; align-items: center; background: var(--accent); padding: 5px 32px 3px; border-radius: 0;\n    margin-left: -32px; margin-right: -32px;\n  }",
    "  .section-title { \n    font-size: 22px; text-transform: uppercase; color: var(--ink); margin-bottom: 12px; \n    display: flex; align-items: center; background: var(--accent); padding: 4px 24px 2px; border-radius: 0;\n    margin-left: -24px; margin-right: -24px;\n  }"
)

# 3. item margins
content = content.replace('.exp-item, .edu-item { margin-bottom: 21px; position:relative; }', '.exp-item, .edu-item { margin-bottom: 14px; position:relative; }')
content = content.replace('.proj-item { margin-bottom: 21px; }', '.proj-item { margin-bottom: 14px; }')

# 4. wrap gaps
content = content.replace('.tools-wrap { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }', '.tools-wrap { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }')
content = content.replace('.skills-wrap { display: flex; flex-wrap: wrap; gap: 8px; }', '.skills-wrap { display: flex; flex-wrap: wrap; gap: 6px; }')

# 5. genList margin
content = content.replace('margin-bottom: ${i === arr.length - 1 ? 0 : 6}px', 'margin-bottom: ${i === arr.length - 1 ? 0 : 4}px')

# 6. v-1 layout paddings and gaps
content = content.replace('.v-1 .sidebar { background: transparent; padding: 160px 32px 32px 32px; border-right: 4px solid var(--ink); display: flex; flex-direction: column; gap: 29px; position: relative; }', '.v-1 .sidebar { background: transparent; padding: 160px 24px 24px 24px; border-right: 4px solid var(--ink); display: flex; flex-direction: column; gap: 20px; position: relative; }')
content = content.replace('.v-1 .main { padding: 32px; display: flex; flex-direction: column; gap: 29px; }', '.v-1 .main { padding: 24px; display: flex; flex-direction: column; gap: 20px; }')

# 7. MainContent padding and margin alignment
content = re.sub(
    r'height: 160px; margin-top: -32px; margin-left: -32px; margin-right: -32px; padding: 0 32px; border-bottom',
    r'height: 160px; margin-top: -24px; margin-left: -24px; margin-right: -24px; padding: 0 24px; border-bottom',
    content
)
content = content.replace('gap: 29px; margin-top: -32px;', 'gap: 16px; margin-top: -24px;')

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
