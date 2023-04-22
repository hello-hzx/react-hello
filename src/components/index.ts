import React from 'react';

const importAllComponents = () => {
  const files: any = {};
  const requireModule = require.context('./', true, /\.tsx$/);
  const compMapping: Record<string, React.Component | React.FC> = {};

  requireModule.keys().forEach((fileName) => {
    files[fileName] = requireModule(fileName);
  });

  Object.values(files).forEach((file: any) => {
    Object.entries(file).forEach((exportItemData: any) => {
      const [componentName, comp] = exportItemData;
      compMapping[componentName] = comp;
    });
  });

  return compMapping;
};

const components = importAllComponents();

export default components;
