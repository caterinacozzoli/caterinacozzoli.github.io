import re

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

old_print = """  @media print {
    @page { size: A4; margin: 0; }
    body { padding: 0; background: #fff !important; }
    .controls { display: none !important; }
    .page { box-shadow: none !important; margin: 0 !important; }
  }"""

new_print = """  @media print {
    @page { size: A4; margin: 0; }
    body { padding: 0; background: #fff !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
    .controls { display: none !important; }
    .page { box-shadow: none !important; margin: 0 !important; }
  }"""

if old_print in content:
    content = content.replace(old_print, new_print)
else:
    # Just append it
    content = content.replace('</style>', new_print + '\n</style>')

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
