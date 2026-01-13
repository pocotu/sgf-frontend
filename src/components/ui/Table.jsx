import React from 'react';
import PropTypes from 'prop-types';

/**
 * Table Component
 * Componente de tabla reutilizable siguiendo principios SOLID
 * - Single Responsibility: Solo renderiza tablas
 * - Open/Closed: Extensible mediante props
 */
const Table = ({ headers, children, className = '' }) => {
  return (
    <div
      className={`overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white/50 backdrop-blur-sm ${className}`}
    >
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200">
          <tr>
            {headers.map((header, index) => (
              <th
                key={`header-${header}-${index}`}
                className="px-6 py-3 font-semibold tracking-wider"
              >
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

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * TableRow Component
 * Componente de fila de tabla
 */
export const TableRow = ({ children, className = '' }) => (
  <tr className={`hover:bg-slate-50/50 transition-colors ${className}`}>{children}</tr>
);

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * TableCell Component
 * Componente de celda de tabla
 */
export const TableCell = ({ children, className = '', colSpan }) => (
  <td className={`px-6 py-4 whitespace-nowrap text-slate-700 ${className}`} colSpan={colSpan}>
    {children}
  </td>
);

TableCell.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  colSpan: PropTypes.number,
};

export default Table;
