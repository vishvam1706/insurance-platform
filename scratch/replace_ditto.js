const fs = require('fs');
const path = require('path');

const files = [
  "c:\\TV\\insurance-platform\\app\\(public)\\contact\\page.tsx",
  "c:\\TV\\insurance-platform\\app\\(public)\\page.tsx",
  "c:\\TV\\insurance-platform\\app\\(public)\\term-life\\page.tsx",
  "c:\\TV\\insurance-platform\\app\\globals.css",
  "c:\\TV\\insurance-platform\\components\\admin\\BlockEditor.tsx",
  "c:\\TV\\insurance-platform\\components\\admin\\BlockPreview.tsx",
  "c:\\TV\\insurance-platform\\components\\admin\\blocks\\ChooseDittoCtaEditor.tsx",
  "c:\\TV\\insurance-platform\\components\\admin\\blocks\\ComparisonSectionEditor.tsx",
  "c:\\TV\\insurance-platform\\components\\admin\\blocks\\DittoExperienceEditor.tsx",
  "c:\\TV\\insurance-platform\\components\\admin\\blocks\\DittosTakeEditor.tsx",
  "c:\\TV\\insurance-platform\\components\\admin\\blocks\\PlansTableEditor.tsx",
  "c:\\TV\\insurance-platform\\components\\blocks\\DittosTake.tsx",
  "c:\\TV\\insurance-platform\\components\\blocks\\PageRenderer.tsx",
  "c:\\TV\\insurance-platform\\components\\blocks\\PlansTable.tsx",
  "c:\\TV\\insurance-platform\\components\\blocks\\ProductCardsBlock.tsx",
  "c:\\TV\\insurance-platform\\components\\blocks\\ReviewsBlock.tsx",
  "c:\\TV\\insurance-platform\\components\\home\\ChooseDittoCta.tsx",
  "c:\\TV\\insurance-platform\\components\\home\\ComparisonSection.tsx",
  "c:\\TV\\insurance-platform\\components\\home\\DittoExperience.tsx",
  "c:\\TV\\insurance-platform\\components\\home\\HomeFaq.tsx",
  "c:\\TV\\insurance-platform\\components\\public\\Footer.tsx",
  "c:\\TV\\insurance-platform\\components\\public\\Header.tsx",
  "c:\\TV\\insurance-platform\\lib\\models\\InsurancePlan.ts",
  "c:\\TV\\insurance-platform\\lib\\seeds\\seed.ts",
  "c:\\TV\\insurance-platform\\types\\blocks.ts",
  "c:\\TV\\insurance-platform\\types\\plan.ts"
];

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.log(`File not found: ${file}`);
    continue;
  }
  let content = fs.readFileSync(file, 'utf8');
  
  // Specific phrases first to prevent partial replacements
  content = content.replace(/Ditto's Take/g, "PM Partners' Take");
  content = content.replace(/DittosTake/g, "PmPartnersTake");
  content = content.replace(/dittos_take/g, "pmpartners_take");
  content = content.replace(/dittos-take/g, "pmpartners-take");
  
  content = content.replace(/Ditto Experience/g, "PM Partners Experience");
  content = content.replace(/DittoExperience/g, "PmPartnersExperience");
  content = content.replace(/ditto_experience/g, "pmpartners_experience");
  content = content.replace(/ditto-experience/g, "pmpartners-experience");
  
  content = content.replace(/Choose Ditto/g, "Choose PM Partners");
  content = content.replace(/ChooseDitto/g, "ChoosePmPartners");
  content = content.replace(/choose_ditto/g, "choose_pmpartners");
  content = content.replace(/choose-ditto/g, "choose-pmpartners");
  
  content = content.replace(/dittoRating/g, "pmpartnersRating");
  content = content.replace(/ditto-rating/g, "pmpartners-rating");
  content = content.replace(/Ditto Rating/g, "PM Partners Rating");
  
  content = content.replace(/Ditto/g, "PM Partners");
  content = content.replace(/ditto/g, "pmpartners");
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Processed: ${file}`);
}
console.log("Replacement completed successfully.");
