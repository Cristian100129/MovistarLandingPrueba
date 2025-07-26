import React, { useState, useEffect } from 'react';

const BannerAnimation = ({text}) => {
    const [textBanner, setTextBanner] = useState('');

    useEffect(() => {
        setTextBanner(text);
    }, []); 

  return (
    <div className="banner-container">
      <div className="animationBannerText">
        {textBanner}
      </div>
    </div>
  );
};

export default BannerAnimation;
