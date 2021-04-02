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
      size='medium'
      style={{ margin: '8px 0', width: '85%', maxWidth: '552px' }}
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
