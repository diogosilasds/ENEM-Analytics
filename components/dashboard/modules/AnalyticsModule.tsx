import React from 'react';
import { MateriaData } from '../../../types';
import CognitiveBreakdown from '../CognitiveBreakdown';
import AdvancedCharts from '../AdvancedCharts';
import ComplexitySection from '../ComplexitySection';

interface AnalyticsModuleProps {
  data: MateriaData;
}

const AnalyticsModule: React.FC<AnalyticsModuleProps> = ({ data }) => {
  return (
    <section className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 fade-in delay-300">
      <CognitiveBreakdown data={data} />
      <AdvancedCharts data={data} />
      <ComplexitySection data={data} />
    </section>
  );
};

export default AnalyticsModule;