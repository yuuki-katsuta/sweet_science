import Input from '@material-ui/core/Input';

const InputField = ({
  placeholder,
  inputProps,
  value,
  setState,
  fullWidth,
  className,
}) => {
  return (
    <Input
      className={className}
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
