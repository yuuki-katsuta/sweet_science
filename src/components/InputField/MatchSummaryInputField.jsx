import TextField from '@material-ui/core/TextField';

const MatchSummaryInputField = ({
  id,
  name,
  value,
  label,
  setState,
  rows,
  multiline,
}) => {
  return (
    <TextField
      fullWidth
      multiline={multiline}
      rows={rows}
      name={name}
      id={id}
      label={label}
      value={value}
      onChange={(e) => {
        setState(e);
      }}
    />
  );
};
export default MatchSummaryInputField;
