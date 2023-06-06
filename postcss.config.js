// @see https://github.com/postcss/postcss
const config = {
  plugins: [
    require("postcss-flexbugs-fixes"),
    require("postcss-normalize"),
    require("autoprefixer"),
    require("postcss-preset-env"),
  ],
};
module.exports = config;
