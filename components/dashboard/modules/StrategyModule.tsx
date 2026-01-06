import React from 'react';
import { MateriaData } from '../../../types';
import StrategicMatrix from '../StrategicMatrix';
import DiagnosticsSection from '../DiagnosticsSection';

interface StrategyModuleProps {
  data: MateriaData;
}

const StrategyModule: React.FC<StrategyModuleProps> = ({ data }) => {
  return (
    <section className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 fade-in delay-200">
      {/* Strategic Prioritization - Full Width */}
      <div className="w-full h-[500px]">
         <StrategicMatrix data={data} />
      </div>

      {/* Diagnostics & Action Plan */}
      <DiagnosticsSection data={data} />
    </section>
  );
};

export default StrategyModule;