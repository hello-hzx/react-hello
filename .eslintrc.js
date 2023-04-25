const OFF = 0;
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react-hooks/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/function-component-definition': OFF, // react函数式组件的定义方式
    'import/prefer-default-export': OFF, // 只有一个导出时，优先默认导入
  },
};
