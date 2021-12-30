import Button from '@material-ui/core/Button';

const BaseButton = ({
  children,
  fullWidth,
  variant,
  color,
  setState,
  className,
}) => {
  return (
    <Button
      className={className}
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      onClick={setState}
    >
      {children}
    </Button>
  );
};
export default BaseButton;
