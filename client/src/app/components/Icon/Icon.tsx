import React from 'react';

const Icon: React.SFC = ({ onClick }) => (
  <div
    className="icon"
    style={{ backgroundImage: 'url("images/warning.png")' }}
    onClick={onClick}
  />
);

export default Icon;
