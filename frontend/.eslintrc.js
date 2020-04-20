module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [

    'eslint:recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // préférer utiliser `plugin:vue/strongly-recommended` ou `plugin:vue/recommended` pour des règles strictes.
    'plugin:vue/recommended',
    'plugin:prettier/recommended',

    // 'plugin:vue/essential',
    // '@vue/standard'

  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'semi': [2, 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': ['error', { 'semi': false }],
    // 'no-console': process.env.NUXT_ENV_RUN_MODE === 'prod' ? 'warn' : 'off',
    // 'no-debugger': process.env.NUXT_ENV_RUN_MODE === 'prod' ? 'warn' : 'off'
  }
}

