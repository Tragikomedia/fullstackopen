import { useState, forwardRef, useImperativeHandle } from "react"

const Toggleable = forwardRef(({children, label}, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => ({
    toggleVisibility
  }));

  return (
    <>
    {visible && children}
    <button onClick={toggleVisibility}>{visible ? 'cancel' : label}</button>
    </>
  )
});

export default Toggleable;