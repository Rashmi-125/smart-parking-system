import React from 'react';

const Checkbox = ({ 
  label, 
  checked, 
  onChange, 
  name,
  className = '',
  ...props 
}) => {
  return (
    <label className={`flex items-center space-x-2 ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={name}
        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
        {...props}
      />
      {label && (
        <span className="text-sm text-gray-700">{label}</span>
      )}
    </label>
  );
};

export default Checkbox;