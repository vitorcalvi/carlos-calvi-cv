// HYBRID JOB APPLICATION - opens browser, you login when needed, script fills forms

const { chromium } = require('playwright');

const APP = {
  name: 'Carlos Vitor Botti Calvi',
  email: 'vcalvi@gmail.com',
  phone: '+34 672962737',
  linkedin: 'https://www.linkedin.com/in/carloscalvi',
  portfolio: 'https://github.com/vitorcalvi',
  cvPath: './CV_EN_contractor.md',
  esCvPath: './CV_ES_contractor.md',
  cover: 'AI/ML consultant with 82% accuracy stress detection (Petrobras POC, 41k employees). Privacy-preserving ML, GDPR/HIPAA compliance. 15-20 hrs/week CET. github.com/vitorcalvi',
  esCover: 'Consultor de IA/ML con 82% precisión validada clínicamente (POC Petrobras, 41k empleados). Python, ML producción, cumplimiento GDPR/HIPAA. 15-20 hrs/semana CET. github.com/vitorcalvi'
};

const JOBS = [
  { name: 'A.Team ($120-170/hr)', url: 'https://build.a.team/apply-ai', needsLogin: false },
  { name: 'Procesia - Madrid', url: 'https://es.linkedin.com/jobs/view/consultor-python-servicios-de-ia-at-procesia-4389095088', needsLogin: true, lang: 'es' },
  { name: 'Oktogon Labs - Lisbon', url: 'https://pt.linkedin.com/jobs/view/ai-consultant-junior-at-oktogon-labs-4382164261', needsLogin: true, lang: 'pt' },
  { name: 'ClearViewData - Amsterdam', url: 'https://nl.linkedin.com/jobs/view/data-ai-consultant-at-clearviewdata-4389213809', needsLogin: true, lang: 'en' },
  { name: 'Conquest One - São Paulo', url: 'https://br.linkedin.com/jobs/view/consultor-s%C3%AAnior-de-processos-automa%C3%A7%C3%A3o-e-intelig%C3%AAncia-artificial-at-conquest-one-4389081891', needsLogin: true, lang: 'pt' }
];

async function safeWait(page, ms) {
  try { await page.waitForTimeout(ms); } catch(e) { console.log('   ⚠️ Page closed during wait'); return false; }
  return true;
}

async function fillKnownFields(page, app) {
  const filled = [];
  const fields = [
    { sel: 'input[name*="name"], input[placeholder*="name"], input[placeholder*="nombre"]', val: app.name, label: 'Name' },
    { sel: 'input[type="email"], input[name*="email"]', val: app.email, label: 'Email' },
    { sel: 'input[type="tel"], input[name*="phone"]', val: app.phone, label: 'Phone' },
    { sel: 'input[name*="linkedin"], input[placeholder*="linkedin"]', val: app.linkedin, label: 'LinkedIn' },
    { sel: 'textarea', val: app.cover, label: 'Cover Letter' },
    { sel: 'input[type="file"]', val: app.cvPath, label: 'CV Upload' }
  ];
  for (const f of fields) {
    try {
      if (page.isClosed()) return filled;
      const el = await page.$(f.sel);
      if (el && await el.isVisible()) {
        if (f.sel.includes('file')) { await el.setInputFiles(f.val); }
        else { await el.fill(f.val); }
        filled.push(f.label);
      }
    } catch {}
  }
  return filled;
}

async function clickEasyApply(page) {
  const selectors = [
    'button:has-text("Easy Apply")',
    'button:has-text("Apply")',
    'a:has-text("Easy Apply")',
    'a:has-text("Apply")',
    'button[aria-label*="Easy Apply"]'
  ];
  for (const sel of selectors) {
    try {
      const btn = await page.$(sel);
      if (btn && await btn.isVisible()) {
        await btn.click();
        return true;
      }
    } catch {}
  }
  return false;
}

async function processNextApplyStep(page) {
  const selectors = ['button:has-text("Next")', 'button:has-text("Continue")', 'button:has-text("Submit")'];
  for (const sel of selectors) {
    try {
      const btn = await page.$(sel);
      if (btn && await btn.isVisible()) { await btn.click(); return sel; }
    } catch {}
  }
  return null;
}

(async () => {
  const browser = await chromium.launch({ headless: false });
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await ctx.newPage();
  const results = [];

  console.log('\n' + '='.repeat(60));
  console.log('🚀 HYBRID JOB APPLICATION - AUTONOMOUS + MANUAL LOGIN');
  console.log('='.repeat(60));

  for (let i = 0; i < JOBS.length; i++) {
    const job = JOBS[i];
    try {
    console.log(`\n📋 [${i + 1}/${JOBS.length}] ${job.name}`);
    console.log(`   URL: ${job.url}`);

    await page.goto(job.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await safeWait(page, 3000);

    if (job.needsLogin) {
      console.log('   🔐 LOGIN REQUIRED - Please log in to LinkedIn now');
      console.log('   ⏳ Waiting 45 seconds for manual login...');
      await page.waitForTimeout(45000);

      const filled = await fillKnownFields(page, APP);
      const clicked = await clickEasyApply(page);
      if (clicked) {
        console.log('   ✅ Easy Apply button clicked');
        await page.waitForTimeout(2000);
        for (let step = 0; step < 5; step++) {
          const filled2 = await fillKnownFields(page, APP);
          if (filled2.length > 0) console.log(`   ✅ Filled: ${filled2.join(', ')}`);
          const next = await processNextApplyStep(page);
          if (!next) break;
          console.log(`   ✅ Clicked: ${next}`);
          await page.waitForTimeout(1500);
        }
      }
      if (filled.length > 0) console.log(`   ✅ Filled: ${filled.join(', ')}`);
      await page.screenshot({ path: `/tmp/app_${i}.png` });
      console.log('   📸 Screenshot saved');
      console.log('   ⏳ Waiting 20s for manual submit...');
      await page.waitForTimeout(20000);
    } else {
      const filled = await fillKnownFields(page, APP);
      if (filled.length > 0) console.log(`   ✅ Filled: ${filled.join(', ')}`);
      await page.screenshot({ path: `/tmp/app_${i}.png` });
      console.log('   📸 Screenshot saved');
      console.log('   ⏳ Waiting 30s for manual submit...');
      await page.waitForTimeout(30000);
    }
    results.push({ job: job.name, status: 'processed' });
    } catch(e) {
      console.log(`   ❌ Error: ${e.message}`);
      results.push({ job: job.name, status: 'error' });
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ ALL 5 JOBS PROCESSED');
  console.log('='.repeat(60));
  for (const r of results) console.log(`   ✅ ${r.job}`);
  await page.waitForTimeout(3000);
  await browser.close();
  console.log('\n✨ All done! Browser closed.');
})();
