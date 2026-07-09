import re

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

# Change .page background to a warm white
content = re.sub(r'\.page \{\s*width: 210mm;\s*min-height: 297mm;\s*margin: 40px auto;\s*background: #fff;', 
                 r'.page {\n    width: 210mm;\n    min-height: 297mm;\n    margin: 40px auto;\n    background: #FCFBF8;', 
                 content)

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
