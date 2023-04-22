import React from 'react';

/** 禁止在需要动态导出的文件中使用默认导出（default export） */
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
