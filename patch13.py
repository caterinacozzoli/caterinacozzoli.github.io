with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

old_print = "  @media print { #debug-hud { display: none !important; } }"
new_print = """  @media print {
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    #debug-hud { display: none !important; }
    body { background: #fff !important; }
    .page { margin: 0 !important; box-shadow: none !important; width: 100% !important; min-height: auto !important; }
  }"""

if old_print in content:
    content = content.replace(old_print, new_print)
else:
    # Fallback if not found exactly as string
    content = content.replace('</style>', new_print + '\n</style>')

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
