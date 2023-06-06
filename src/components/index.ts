import React from "react";

let module = {};
if (!Object.keys(import.meta).length) {
  /** 禁止在需要动态导出的文件中使用默认导出（default export） */
  const requireModule = require.context("./", true, /\.tsx$/);
  requireModule.keys().forEach((fileName) => {
    module[fileName] = requireModule(fileName);
  });
} else {
  module = import.meta.glob("./*/*.tsx", { eager: true });
}

const components: Record<string, React.ElementType> = {};
Object.values(module).forEach((item) => {
  Object.entries(item).forEach((exportItem) => {
    const [name, comp] = exportItem;
    components[name] = comp;
  });
});

export default components;
