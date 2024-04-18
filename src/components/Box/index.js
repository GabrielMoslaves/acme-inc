const Box = ({
  display,
  padding,
  width,
  gap,
  justifyContent,
  alignItems,
  paddingBottom,
  paddingTop,
  children,
  maxWidth,
  minWidth,
  textAlign,
  marginTop,
  fontSize,
  className,
  flexDirection,
}) => {
  return (
    <div
      className={className}
      style={{
        display,
        padding,
        width,
        gap,
        justifyContent,
        alignItems,
        paddingBottom,
        paddingTop,
        maxWidth,
        minWidth,
        textAlign,
        marginTop,
        fontSize,
        flexDirection,
      }}
    >
      {children}
    </div>
  );
};

export default Box;
