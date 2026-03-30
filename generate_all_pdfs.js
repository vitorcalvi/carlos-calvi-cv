const { chromium } = require('playwright');
const fs = require('fs');

async function mdToPDF(mdPath, pdfPath) {
  const md = fs.readFileSync(mdPath, 'utf8');
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
    code { background: #f5f5f5; padding: 2px 6px; border-radius: 3px; font-size: 12px; }
  </style></head><body>${md.replace(/^# (.+)$/gm, '<h1>$1</h1>').replace(/^## (.+)$/gm, '<h2>$1</h2>').replace(/^### (.+)$/gm, '<h3>$1</h3>').replace(/^- (.+)$/gm, '<li>$1</li>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`(.+?)`/g, '<code>$1</code>').replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>').replace(/---/g, '')}</body></html>`;
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.pdf({ path: pdfPath, format: 'A4', margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' }, printBackground: true });
  await browser.close();
  console.log(`✅ Generated: ${pdfPath}`);
}

(async () => {
  await mdToPDF('./CV_EN_contractor.md', './CV_EN_contractor.pdf');
  await mdToPDF('./CV_ES_contractor.md', './CV_ES_contractor.pdf');
  await mdToPDF('./CV_PT_contractor.md', './CV_PT_contractor.pdf');
  console.log('\n🎉 All 3 PDFs generated!');
})();
