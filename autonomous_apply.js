// Autonomous Job Application Script using bifrost-gateway Playwright
// This script navigates to job sites and fills applications automatically

const { createWriteStream, unlinkSync, existsSync } = require('fs');
const { join } = require('path');

// Your application data
const applicantData = {
  name: 'Carlos Vitor Botti Calvi',
  email: 'vcalvi@gmail.com',
  phone: '+34 672962737',
  linkedin: 'https://www.linkedin.com/in/carloscalvi',
  portfolio: 'https://github.com/vitorcalvi',
  cvUrl: '/Users/vitorcalvi/Desktop/carlos-calvi-cv/CV_EN_contractor.md',
  coverLetter: `I'm an AI/ML consultant with clinically validated 82% accuracy stress detection model (Petrobras POC, 41,000+ employees). I specialize in privacy-preserving ML and GDPR/HIPAA compliance. Available 15-20 hrs/week CET for fractional engagements. Portfolio: github.com/vitorcalvi`
};

// Jobs to apply to (non-LinkedIn first, as LinkedIn requires login)
const jobs = [
  {
    name: 'A.Team Senior AI Engineer',
    url: 'https://remotive.com/remote-jobs/software-development/senior-independent-ai-engineer-architect-1919266',
    platform: 'remotive',
    formSelectors: {
      nameInput: 'input[name="name"], input[placeholder*="name"], #name',
      emailInput: 'input[type="email"], input[placeholder*="email"], #email',
      messageArea: 'textarea[name="cover_letter"], textarea[placeholder*="cover"], textarea',
      submitButton: 'button[type="submit"], input[type="submit"], button:has-text("Apply")'
    }
  },
  {
    name: 'Remotive AI Internet Rater',
    url: 'https://remotive.com/remote-jobs/ai-ml/ai-internet-rater-2088618',
    platform: 'remotive',
    formSelectors: {
      nameInput: 'input[name="name"], input[placeholder*="name"], #name',
      emailInput: 'input[type="email"], input[placeholder*="email"], #email',
      messageArea: 'textarea, textarea',
      submitButton: 'button[type="submit"], input[type="submit"], button:has-text("Apply")'
    }
  }
];

// Helper: Wait for page load
async function waitForPage(browser, page, timeoutMs = 30000) {
  await page.waitForLoadState('networkidle', { timeout: timeoutMs });
  await page.waitForTimeout(2000);
}

// Main execution
async function runAutomation() {
  console.log('🚀 Starting autonomous job applications via agentic-browser...\n');

  // Launch browser (non-headless so you can see)
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  const page = await context.newPage();

  const results = [];

  for (const job of jobs) {
    try {
      console.log(`\n📋 Processing: ${job.name}`);
      console.log(`   URL: ${job.url}`);

      await page.goto(job.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await waitForPage(browser, page);

      // Screenshot for verification
      const screenshotPath = `/tmp/job_application_${job.platform}_${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`   📸 Screenshot: ${screenshotPath}`);

      // Try to find and fill the application form
      const filled = await fillApplicationForm(page, job, applicantData);
      if (filled) {
        console.log(`   ✅ Application ready for submission`);
        results.push({ job: job.name, status: 'filled', url: job.url });
      } else {
        console.log(`   ⚠️ Could not auto-fill - manual intervention needed`);
        results.push({ job: job.name, status: 'manual', url: job.url });
      }

      // Small delay between jobs
      await page.waitForTimeout(3000);

    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      results.push({ job: job.name, status: 'error', error: error.message, url: job.url });
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 AUTOMATION SUMMARY');
  console.log('='.repeat(60));

  for (const r of results) {
    const icon = r.status === 'filled' ? '✅' : r.status === 'manual' ? '⚠️' : '❌';
    console.log(`${icon} ${r.job}`);
  }

  console.log('\n💡 NEXT STEPS:');
  console.log('1. Review screenshots to verify form filling');
  console.log('2. For "filled" jobs: Click SUBMIT manually in the browser');
  console.log('3. For "manual" jobs: Check MANUAL_APPLICATION_GUIDE.md');

  console.log('\n⏳ Press ENTER to close browser and finish...');
  await new Promise(resolve => { process.stdin.once('data', resolve); });
  await browser.close();

  console.log('\n✨ Automation session complete!');
}

async function fillApplicationForm(page, job, data) {
  try {
    const selectors = job.formSelectors;

    // Wait a bit for page to settle
    await page.waitForTimeout(2000);

    // Check if form exists
    const formExists = await page.$('form, [role="form"], [class*="form"]').then(el => el !== null);
    if (!formExists) {
      console.log('   ⚠️ No application form detected');
      return false;
    }

    console.log('   📝 Filling form fields...');

    // Fill name
    try {
      const nameInput = await page.waitForSelector(selectors.nameInput, { timeout: 5000 });
      await nameInput.fill(data.name);
      console.log('     ✓ Name filled');
    } catch (e) {
      console.log('     ⚠️ Name field not found');
    }

    // Fill email
    try {
      const emailInput = await page.waitForSelector(selectors.emailInput, { timeout: 5000 });
      await emailInput.fill(data.email);
      console.log('     ✓ Email filled');
    } catch (e) {
      console.log('     ⚠️ Email field not found');
    }

    // Fill phone (if field exists)
    try {
      const phoneInput = await page.$('input[type="tel"], input[name*="phone"], input[placeholder*="phone"]');
      if (phoneInput) {
        await phoneInput.fill(data.phone);
        console.log('     ✓ Phone filled');
      }
    } catch (e) {}

    // Fill LinkedIn (if field exists)
    try {
      const linkedinInput = await page.$('input[name*="linkedin"], input[placeholder*="linkedin"]');
      if (linkedinInput) {
        await linkedinInput.fill(data.linkedin);
        console.log('     ✓ LinkedIn filled');
      }
    } catch (e) {}

    // Fill cover letter/message
    try {
      const messageArea = await page.waitForSelector(selectors.messageArea, { timeout: 5000 });
      await messageArea.fill(data.coverLetter);
      console.log('     ✓ Cover letter filled');
    } catch (e) {
      console.log('     ⚠️ Message area not found');
    }

    // Upload CV if file input exists
    try {
      const fileInput = await page.$('input[type="file"]');
      if (fileInput) {
        await fileInput.setInputFiles(data.cvUrl);
        console.log('     ✓ CV uploaded');
      }
    } catch (e) {}

    // Screenshot filled form
    await page.screenshot({
      path: `/tmp/job_filled_${job.platform}_${Date.now()}.png`,
      fullPage: true
    });

    console.log('   ✅ Form filled successfully');
    console.log('   ⚠️ Manual step required: Click SUBMIT button');
    return true;

  } catch (error) {
    console.log(`   ❌ Form fill failed: ${error.message}`);
    return false;
  }
}

// Run
runAutomation().catch(console.error);
