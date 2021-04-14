import TextField from '@material-ui/core/TextField';

const TextInputField = ({
  id,
  label,
  type,
  placeholder,
  name,
  value,
  setState,
  style,
  fullWidth,
  rows,
  multiline,
  variant,
  margin,
  required,
  autoComplete,
  autoFocus,
  defaultValue,
}) => {
  return (
    <TextField
      multiline={multiline}
      fullWidth={fullWidth}
      rows={rows}
      style={style}
      name={name}
      id={id}
      label={label}
      type={type}
      placeholder={placeholder}
      value={value}
      variant={variant}
      margin={margin}
      required={required}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      defaultValue={defaultValue}
      onChange={(e) => {
        setState(e);
      }}
    />
  );
};
export default TextInputField;
