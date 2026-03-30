const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
  const md = fs.readFileSync('./CV_EN_contractor.md', 'utf8');
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body { font-family: 'Segoe UI', Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; line-height: 1.5; color: #333; }
    h1 { color: #1a1a2e; font-size: 28px; margin-bottom: 5px; }
    h2 { color: #16213e; font-size: 16px; border-bottom: 2px solid #0f3460; padding-bottom: 5px; margin-top: 20px; }
    h3 { color: #0f3460; font-size: 14px; margin-bottom: 5px; }
    ul { margin: 5px 0; padding-left: 20px; }
    li { margin: 3px 0; font-size: 13px; }
    strong { color: #0f3460; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th, td { padding: 5px 10px; text-align: left; border-bottom: 1px solid #ddd; }
    a { color: #0f3460; text-decoration: none; }
    .contact { color: #666; font-size: 13px; }
    code { background: #f5f5f5; padding: 2px 6px; border-radius: 3px; font-size: 12px; }
  </style></head><body>${md.replace(/^# (.+)$/gm, '<h1>$1</h1>').replace(/^## (.+)$/gm, '<h2>$1</h2>').replace(/^### (.+)$/gm, '<h3>$1</h3>').replace(/^- (.+)$/gm, '<li>$1</li>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`(.+?)`/g, '<code>$1</code>').replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>').replace(/^\| (.+) \|$/gm, '<tr>$1</tr>').replace(/\|/g, '</td><td>').replace(/---/g, '').replace(/<\/ul>\s*<ul>/g, '').replace(/<li>/g, '<ul><li>').replace(/<\/li>\s*<li>/g, '</li><li>')}</body></html>`;
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.pdf({ path: './CV_EN_contractor.pdf', format: 'A4', margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' }, printBackground: true });
  await browser.close();
  console.log('✅ PDF generated: CV_EN_contractor.pdf');
}

generatePDF().catch(console.error);
