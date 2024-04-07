module.exports = {
	root: true,
	env: {browser: true, es2020: true},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:react-hooks/recommended'
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: true,
		tsconfigRootDir: __dirname
	},
	rules: {
		'@typescript-eslint/no-unsafe-call': 'warn',
		'@typescript-eslint/no-unsafe-member-access': 'warn',
		'@typescript-eslint/require-await': 'warn',
		'@typescript-eslint/no-unsafe-argument': 'warn',
		'@typescript-eslint/no-misused-promises': 'warn',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				args: 'all',
				argsIgnorePattern: '^_',
				caughtErrors: 'all',
				caughtErrorsIgnorePattern: '^_',
				destructuredArrayIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				ignoreRestSiblings: true
			}
		],
		'@typescript-eslint/unbound-method': 'warn',
		'@typescript-eslint/no-floating-promises': 'warn',
		'@typescript-eslint/no-explicit-any': 'error',
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'no-tabs': 0,
		'object-curly-spacing': [2, 'never'],
		'array-bracket-spacing': [2, 'never'],
		'computed-property-spacing': [2, 'never'],
		'brace-style': [2, '1tbs'],
		'keyword-spacing': [2],
		'eol-last': [2],
		'no-trailing-spaces': [2],
		'no-redeclare': 2,
		'no-shadow': 2,
		properties: 0,
		camelcase: 0,
		'react-refresh/only-export-components': ['warn', {allowConstantExport: true}]
	}
}
