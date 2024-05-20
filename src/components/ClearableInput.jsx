import React from 'react';
import '../styles.css';

const ClearableInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="clearable-input">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {value && (
        <button onClick={() => onChange({ target: { value: '' } })}>
          x
        </button>
      )}
    </div>
  );
};

export default ClearableInput;
