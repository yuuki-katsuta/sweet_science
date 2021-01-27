import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextInputField = ({
  id,
  label,
  type,
  placeholder,
  name,
  value,
  setName,
}) => {
  return (
    <TextField
      fullWidth
      size='medium'
      style={{ margin: '16px 0' }}
      name={name}
      id={id}
      label={label}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        setName(e.target.value);
      }}
    />
  );
};
export default TextInputField;
