/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
	rules: {
		'selector-class-pattern': null,
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global']
			}
		]
	},
	overrides: [
		{
			files: ['**/*.svelte'],
			customSyntax: 'postcss-html'
		}
	]
};
