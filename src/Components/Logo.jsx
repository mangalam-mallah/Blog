import React from 'react';
import Images from '../Images/logo.png';

function Logo({ width = '120px' }) { // Increased default width
  return (
    <div className="px-3">
      <img
        src={Images}
        alt="Logo"
        className="h-auto"
        style={{
          width, // Dynamically adjusts width
          borderRadius: '50%', // Keeps the circular style
        }}
      />
    </div>
  );
}

export default Logo;
