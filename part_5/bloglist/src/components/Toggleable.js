import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Toggleable = forwardRef(({ children, label }, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <>
      {visible && children}
      <button onClick={toggleVisibility}>{visible ? "cancel" : label}</button>
    </>
  );
});

Toggleable.propTypes = {
  label: PropTypes.string,
  children: PropTypes.object,
};

export default Toggleable;
