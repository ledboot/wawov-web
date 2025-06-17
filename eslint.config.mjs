import stylistic from '@stylistic/eslint-plugin'
import react from 'eslint-plugin-react'
import ts from 'typescript-eslint'

export default [
  {
    ignores: ['.docusaurus', 'build'],
  },
  ...ts.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@stylistic': stylistic,
      react: react,
    },
    rules: {
      ...react.configs['jsx-runtime'].rules,

      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@stylistic/comma-dangle': 'off'
    },
  },
]
