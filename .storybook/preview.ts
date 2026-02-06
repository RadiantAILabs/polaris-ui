import type { Preview } from '@storybook/svelte';
import '../src/lib/styles/index.scss';

import { withThemeByDataAttribute } from '@storybook/addon-themes';

const preview: Preview = {
	parameters: {
		docs: { story: { inline: false } },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		backgrounds: { disable: true }
	},

	decorators: [
		withThemeByDataAttribute({
			themes: { light: 'light', dark: 'dark' },
			defaultTheme: 'light',
			attributeName: 'data-theme',
			parentSelector: 'html'
		})
	]
};

export default preview;
