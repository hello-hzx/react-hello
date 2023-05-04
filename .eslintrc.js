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
    'react/destructuring-assignment': OFF, // 解构使用道具
    'react/jsx-props-no-spreading': OFF, // 解构道具分配
    'react-hooks/rules-of-hooks': OFF, // React Hook cannot be called inside a callback.
    'react/jsx-one-expression-per-line': OFF,
    '@typescript-eslint/default-param-last': OFF, // 默认参数应该放在最后
  },
};
