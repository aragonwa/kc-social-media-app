import React from 'react';

const FAIcon = ({ icon }) => {
  const iString =
    icon === 'instagram' || icon === 'wordpress'
      ? `fa fa-${icon} fa-2x`
      : `fa fa-${icon}-square fa-2x`;
  return (
    <span
      className={iString}
      style={{ paddingRight: '5px' }}
      aria-hidden="true"
    />
  );
};

export default FAIcon;
