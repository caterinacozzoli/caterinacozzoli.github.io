with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

old_contacts = """const genContacts = () => `
  <div style="display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; font-weight: 500;">
    <a href="tel:+393408322577" style="color: var(--ink); text-decoration: none;">+39 340 832 2577</a>
    <a href="mailto:caterinacozzoli@gmail.com" style="color: var(--ink); text-decoration: underline;">caterinacozzoli@gmail.com</a>
    <a href="https://caterinacozzoli.github.io" target="_blank" style="color: var(--ink); text-decoration: underline;">PORTFOLIO</a>
    <a href="https://linkedin.com/in/caterina-cozzoli" target="_blank" style="color: var(--ink); text-decoration: underline;">LINKEDIN</a>
  </div>
`;"""

new_contacts = """const genContacts = () => `
  <ul class="bullet-list" style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; font-weight: 500;">
    <li><a href="tel:+393408322577" style="color: var(--ink); text-decoration: none;">+39 340 832 2577</a></li>
    <li><a href="mailto:caterinacozzoli@gmail.com" style="color: var(--ink); text-decoration: underline;">caterinacozzoli@gmail.com</a></li>
    <li><a href="https://caterinacozzoli.github.io" target="_blank" style="color: var(--ink); text-decoration: underline;">PORTFOLIO</a></li>
    <li><a href="https://linkedin.com/in/caterina-cozzoli" target="_blank" style="color: var(--ink); text-decoration: underline;">LINKEDIN</a></li>
  </ul>
`;"""

content = content.replace(old_contacts, new_contacts)

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
