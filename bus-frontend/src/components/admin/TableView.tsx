import React from 'react';

export const TableView = ({ headers, children }: { headers: string[], children: React.ReactNode }) => {
  return (
    <div className="overflow-x-auto glass-panel rounded-2xl border border-white/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#161920] border-b border-white/10">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="p-5 font-black text-slate-400 text-xs uppercase tracking-[0.2em]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 bg-[#0b0c0f]/50">
          {children}
        </tbody>
      </table>
    </div>
  );
};
