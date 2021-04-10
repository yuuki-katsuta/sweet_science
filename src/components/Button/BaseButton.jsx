import Button from '@material-ui/core/Button';

const BaseButton = ({
  children,
  fullWidth,
  variant,
  color,
  style,
  setState,
}) => {
  return (
    <Button
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      style={style}
      onClick={setState}
    >
      {children}
    </Button>
  );
};
export default BaseButton;
