/** @type {import("prettier").Config} */
export default {
	semi: true,
	printWidth: 80,
	singleQuote: true,
	tabWidth: 2,
	arrowParens: 'always',
	trailingComma: 'es5',
	bracketSpacing: false,
	useTabs: true,
	plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-astro'],
	overrides: [
		{
			files: ['**/*.astro'],
			options: {
				parser: 'astro',
			},
		},
	],
};