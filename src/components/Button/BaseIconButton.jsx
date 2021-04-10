import IconButton from '@material-ui/core/IconButton';

const BaseIconButton = ({
  children,
  style,
  color,
  disabled,
  onClickHandler,
}) => {
  return (
    <IconButton
      disabled={disabled}
      color={color}
      style={style}
      onClick={(e) => {
        onClickHandler(e);
      }}
    >
      {children}
    </IconButton>
  );
};
export default BaseIconButton;
