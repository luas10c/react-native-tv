module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true
  },
  globals: {
    React: true,
    JSX: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  plugins: ['prettier', 'react'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.spec.ts', '**/*.test.ts'],
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint']
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: '13',
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error'
  }
}
