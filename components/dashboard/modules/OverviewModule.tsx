import React from 'react';
import { MateriaData } from '../../../types';
import KPIGrid from '../KPIGrid';
import ProjectionChart from '../ProjectionChart';
import ExecutiveSynthesis from '../ExecutiveSynthesis';

interface OverviewModuleProps {
  data: MateriaData;
}

const OverviewModule: React.FC<OverviewModuleProps> = ({ data }) => {
  return (
    <section className="space-y-10 animate-in slide-in-from-bottom-4 duration-500 fade-in delay-100">
      <div className="relative">
        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-brand-accent opacity-50"></div>
        <div className="pl-4">
          <h2 className="text-[10px] font-black font-display tracking-[0.4em] text-brand-accent/70 mb-6 uppercase">SUBSYSTEM://TELEMETRY_CORE</h2>
          <KPIGrid data={data} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-10">
        <div className="cyber-border bg-brand-card p-1">
          <ProjectionChart data={data} />
        </div>
        <ExecutiveSynthesis data={data} />
      </div>
    </section>
  );
};

export default OverviewModule;