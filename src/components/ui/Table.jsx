import React from 'react';

const Table = ({ headers, children, className = '' }) => {
  return (
    <div
      className={`overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white/50 backdrop-blur-sm ${className}`}
    >
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-3 font-semibold tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">{children}</tbody>
      </table>
    </div>
  );
};

// Subcomponent for typical row usage if needed, or just use tr/td directly in parent
export const TableRow = ({ children, className = '' }) => (
  <tr className={`hover:bg-slate-50/50 transition-colors ${className}`}>{children}</tr>
);

export const TableCell = ({ children, className = '' }) => (
  <td className={`px-6 py-4 whitespace-nowrap text-slate-700 ${className}`}>{children}</td>
);

export default Table;
