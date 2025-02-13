import { Children } from 'react';
import { Text } from '../base/text';
import React from 'react';
export const renderChildren = (children: React.ReactNode) => {
  return Children.map(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return <Text>{child}</Text>;
    }
    return child;
  });
};
