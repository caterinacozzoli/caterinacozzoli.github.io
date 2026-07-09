import re

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

# Adjust bullet-list line-height and margin-bottom
content = content.replace(
    '.bullet-list li { position: relative; padding-left: 20px; font-size: 12.5px; line-height: 1.4; font-weight: 500; color: var(--ink); margin-bottom: 4px; }',
    '.bullet-list li { position: relative; padding-left: 16px; font-size: 12.5px; line-height: 1.3; font-weight: 500; color: var(--ink); margin-bottom: 2px; }'
)
content = content.replace(
    '.bullet-list li::before { content: ""; position: absolute; left: 2px; top: 9px; width: 6px; height: 6px; background-color: var(--ink); border-radius: 50%; }',
    '.bullet-list li::before { content: ""; position: absolute; left: 0px; top: 6px; width: 5px; height: 5px; background-color: var(--ink); border-radius: 50%; }'
)

# genList inline margin adjustment
content = content.replace('margin-bottom: ${i === arr.length - 1 ? 0 : 4}px', 'margin-bottom: ${i === arr.length - 1 ? 0 : 2}px')

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
