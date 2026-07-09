import re

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

# Right column text size reduction by 2px
content = content.replace('.profile-text { font-size: 13.5px;', '.profile-text { font-size: 11.5px;')
content = content.replace('.exp-item .role, .edu-item .role { font-family: var(--font-body); font-weight: 800; font-size: 16px;', '.exp-item .role, .edu-item .role { font-family: var(--font-body); font-weight: 800; font-size: 14px;')
content = content.replace('.exp-item .org, .edu-item .org { font-size: 12.5px;', '.exp-item .org, .edu-item .org { font-size: 10.5px;')
content = content.replace('.exp-item .period { font-size: 10.5px;', '.exp-item .period { font-size: 8.5px;')
content = content.replace('.edu-item .period { font-size: 8px;', '.edu-item .period { font-size: 7px;')
content = content.replace('.exp-item .desc, .edu-item .desc { font-size: 11.5px;', '.exp-item .desc, .edu-item .desc { font-size: 9.5px;')

content = content.replace('.proj-item .name { font-family: var(--font-body); font-weight: 800; font-size: 18px;', '.proj-item .name { font-family: var(--font-body); font-weight: 800; font-size: 16px;')
content = content.replace('.proj-item .date { font-size: 12px;', '.proj-item .date { font-size: 10px;')
content = content.replace('.proj-item .desc { font-size: 12.5px; font-weight: 500; color: var(--ink); margin-top: 4px; margin-left: 56px;', '.proj-item .desc { font-size: 10.5px; font-weight: 500; color: var(--ink); margin-top: 4px; margin-left: 45px;')

content = content.replace('.skill-chip { padding: 4px 12px; border-radius: 20px; border: 1.5px solid var(--ink); color: var(--ink); font-size: 11.5px;', '.skill-chip { padding: 4px 12px; border-radius: 20px; border: 1.5px solid var(--ink); color: var(--ink); font-size: 9.5px;')

# Sticker size reduction by 1/4 (44 -> 33, 24 -> 18)
content = content.replace('.sticker-logo { width: 44px; height: 44px;', '.sticker-logo { width: 33px; height: 33px;')
content = content.replace('.sticker-logo img { width: 24px; height: 24px;', '.sticker-logo img { width: 18px; height: 18px;')

# DATA inline styles for stickers
content = re.sub(r'imgStyle: "width: 44px; height: 44px;', r'imgStyle: "width: 33px; height: 33px;', content)

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
