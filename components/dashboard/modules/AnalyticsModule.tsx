
import React from 'react';
import { MateriaData } from '../../../types';
import CognitiveBreakdown from '../CognitiveBreakdown';
import AdvancedCharts from '../AdvancedCharts';
import ComplexitySection from '../ComplexitySection';
import QuestionTable from '../QuestionTable';

interface AnalyticsModuleProps {
  data: MateriaData;
}

const AnalyticsModule: React.FC<AnalyticsModuleProps> = ({ data }) => {
  return (
    <section className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 fade-in delay-300">
      <CognitiveBreakdown data={data} />
      <AdvancedCharts data={data} />
      <ComplexitySection data={data} />
      
      {/* Exibe a tabela de questões apenas se houver logs disponíveis */}
      {data.questionLog && data.questionLog.length > 0 && (
         <div className="w-full">
            <QuestionTable questions={data.questionLog} />
         </div>
      )}
    </section>
  );
};

export default AnalyticsModule;