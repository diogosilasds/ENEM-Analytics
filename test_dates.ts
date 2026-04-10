import { dashboardService } from './services/dashboardService';
import { REGISTRIES_DB } from './data/db/registries';

console.log("All registries:");
REGISTRIES_DB.forEach(r => console.log(`${r.subjectId} - ${r.examRef} - ${r.date}`));

console.log("\nLatest active year per subject:");
['humanas', 'linguagens', 'matematica', 'natureza', 'redacao'].forEach(s => {
  console.log(`${s}: ${dashboardService.getLatestActiveYear(s)}`);
});
