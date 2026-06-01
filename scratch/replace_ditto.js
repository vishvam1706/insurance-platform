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
  content = content.replace(/Ditto's Take/g, "Policymine's Take");
  content = content.replace(/DittosTake/g, "policymineTake");
  content = content.replace(/dittos_take/g, "policymine_take");
  content = content.replace(/dittos-take/g, "policymine-take");
  
  content = content.replace(/Ditto Experience/g, "Policymine Experience");
  content = content.replace(/DittoExperience/g, "policymineExperience");
  content = content.replace(/ditto_experience/g, "policymine_experience");
  content = content.replace(/ditto-experience/g, "policymine-experience");
  
  content = content.replace(/Choose Ditto/g, "Choose Policymine");
  content = content.replace(/ChooseDitto/g, "Choosepolicymine");
  content = content.replace(/choose_ditto/g, "choose_policymine");
  content = content.replace(/choose-ditto/g, "choose-policymine");
  
  content = content.replace(/dittoRating/g, "policymineRating");
  content = content.replace(/ditto-rating/g, "policymine-rating");
  content = content.replace(/Ditto Rating/g, "Policymine Rating");
  
  content = content.replace(/Ditto/g, "Policymine");
  content = content.replace(/ditto/g, "policymine");
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Processed: ${file}`);
}
console.log("Replacement completed successfully.");
