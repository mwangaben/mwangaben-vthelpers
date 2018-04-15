module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  extends: [
    'standard',
    'plugin:vue/recommended'
  ],
  plugins: [
    'vue',
    'mocha',
    'markdown'
  ],
  rules: {
    'space-before-function-paren': 'off',
    'vue/max-attributes-per-line': [2, {
      'singleline': 2
    }]
  },
  globals: {}
}
