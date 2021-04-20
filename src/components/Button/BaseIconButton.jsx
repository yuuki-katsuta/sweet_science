import IconButton from '@material-ui/core/IconButton';

const BaseIconButton = ({
  children,
  color,
  disabled,
  onClickHandler,
  className,
}) => {
  return (
    <IconButton
      className={className}
      disabled={disabled}
      color={color}
      onClick={(e) => {
        onClickHandler(e);
      }}
    >
      {children}
    </IconButton>
  );
};
export default BaseIconButton;
