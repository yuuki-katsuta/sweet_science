import Input from '@material-ui/core/Input';

const InputField = ({ placeholder, inputProps, value, setState }) => {
  return (
    <Input
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
