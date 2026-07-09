import re

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

# 1. Warm white background
content = re.sub(
    r'--bg: #[A-Fa-f0-9]{6};',
    '--bg: #FDFBF7;',
    content
)

# 2. Print PDF fixes
old_print = "  @media print { #debug-hud { display: none !important; } }"
new_print = """  @media print {
    html, body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; background: #fff !important; margin: 0 !important; padding: 0 !important; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
    #debug-hud { display: none !important; }
    .page { margin: 0 !important; box-shadow: none !important; width: 210mm !important; min-height: 297mm !important; }
  }"""
if old_print in content:
    content = content.replace(old_print, new_print)

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
