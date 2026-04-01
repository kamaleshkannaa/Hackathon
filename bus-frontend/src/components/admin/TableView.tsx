import React from 'react';

export const TableView = ({ headers, children }: { headers: string[], children: React.ReactNode }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg border shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b">
            {headers.map((h, i) => <th key={i} className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {children}
        </tbody>
      </table>
    </div>
  );
};
