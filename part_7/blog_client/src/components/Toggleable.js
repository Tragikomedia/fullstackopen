import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Toggleable = ({ children, label }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);
  const augmentedChildren = React.cloneElement(children, { toggleVisibility });

  return (
    <>
      {visible && augmentedChildren}
      <button onClick={toggleVisibility}>{visible ? 'cancel' : label}</button>
    </>
  );
};

Toggleable.propTypes = {
  label: PropTypes.string,
  children: PropTypes.object,
};

export default Toggleable;
