import Input from '@material-ui/core/Input';

const InputField = ({
  placeholder,
  inputProps,
  value,
  setState,
  fullWidth,
  style,
}) => {
  return (
    <Input
      style={style}
      fullWidth={fullWidth}
      placeholder={placeholder}
      value={value}
      inputProps={inputProps}
      onChange={(e) => {
        setState(e);
      }}
    />
  );
};
export default InputField;
