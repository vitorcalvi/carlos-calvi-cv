// RUN THIS: cd /Users/vitorcalvi/Desktop/carlos-calvi-cv && node apply_now.js

const { chromium } = require('playwright');

const applicant = {
  name: 'Carlos Vitor Botti Calvi',
  email: 'vcalvi@gmail.com',
  phone: '+34 672962737',
  linkedin: 'https://www.linkedin.com/in/carloscalvi',
  portfolio: 'https://github.com/vitorcalvi',
  cvPath: './CV_EN_contractor.md',
  coverLetter: `AI/ML consultant with clinically validated 82% accuracy stress detection (Petrobras POC, 41,000+ employees). Specialize in privacy-preserving ML and GDPR/HIPAA compliance. Available 15-20 hrs/week CET for fractional engagements. Portfolio: github.com/vitorcalvi`
};

const targets = [
  {
    name: 'A.Team Senior AI Engineer ($120-170/hr)',
    url: 'https://build.a.team/apply-ai',
    expectForm: true
  },
  {
    name: 'ClearViewData - Data & AI Consultant (Amsterdam)',
    url: 'https://nl.linkedin.com/jobs/view/data-ai-consultant-at-clearviewdata-4389213809',
    expectForm: false
  },
  {
    name: 'Procesia - Consultor Python/IA (Madrid)',
    url: 'https://es.linkedin.com/jobs/view/consultor-python-servicios-de-ia-at-procesia-4389095088',
    expectForm: false
  }
];

(async () => {
  const browser = await chromium.launch({ headless: false });
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await ctx.newPage();

  console.log('🚀 Opening browser for 3 job applications...\n');

  for (const job of targets) {
    console.log(`📋 ${job.name}`);
    await page.goto(job.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    const title = await page.title();
    console.log(`   Page: ${title}`);

    await page.screenshot({ path: `/tmp/app_${Date.now()}.png`, fullPage: false });
    console.log('   📸 Screenshot saved');

    if (job.expectForm) {
      for (const sel of ['input[name="name"]','input[type="email"]','input[type="tel"]','textarea']) {
        try {
          const el = await page.$(sel);
          if (el) {
            if (sel.includes('email')) await el.fill(applicant.email);
            else if (sel.includes('tel')) await el.fill(applicant.phone);
            else if (sel.includes('name')) await el.fill(applicant.name);
            else if (sel.includes('textarea')) await el.fill(applicant.coverLetter);
            console.log(`   ✅ Filled ${sel}`);
          }
        } catch {}
      }
      const fileInput = await page.$('input[type="file"]');
      if (fileInput) { await fileInput.setInputFiles(applicant.cvPath); console.log('   ✅ CV uploaded'); }
    }

    console.log('   ⏳ Waiting 5s for manual submit / review...');
    await page.waitForTimeout(5000);
  }

  console.log('\n✅ Done. Browser stays open for manual actions.');
  console.log('   Press Ctrl+C when finished.');
  await new Promise(() => {});
})();
