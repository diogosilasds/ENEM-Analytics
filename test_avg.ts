import { dashboardService } from './services/dashboardService';
const subjects = dashboardService.getAllSubjectsSummary();
console.log(subjects.map(s => ({ id: s.id, score: s.data.notaAtual, year: s.data.data })));
