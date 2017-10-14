module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
    // 分号结尾
    "semi": ["error", "always"],
    // 函数前空格
    'space-before-function-paren': 0,
    // 大括号样式
    'brace-style': [2, "stroustrup", { "allowSingleLine": true }],
    //
    'no-unused-vars': 1,
    // 空白的注释
    'spaced-comment': 0,
    // === 代替 ==
    'eqeqeq': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
