import React from 'react';
import { Image, } from 'react-native';

const Logo = () => {
  return (

    <Image
      style={{ height: 85, width: 85 }}
      source={require('../../assets/logo.png')}
    />
  );
};

export default Logo;
