import React from 'react';

const Card = ({ children, className = '', title, footer }) => {
  return (
    <div className={`glass-card rounded-xl p-6 ${className}`}>
      {title && (
        <div className="mb-4 border-b border-slate-200/60 pb-3">
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        </div>
      )}
      <div>{children}</div>
      {footer && (
        <div className="mt-6 pt-4 border-t border-slate-200/60 flex justify-end">{footer}</div>
      )}
    </div>
  );
};

export default Card;
