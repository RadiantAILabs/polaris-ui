<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Breadcrumbs from './Breadcrumbs.svelte';

	const { Story } = defineMeta({
		title: 'Components/Breadcrumbs',
		component: Breadcrumbs,
		parameters: {
			layout: 'padded'
		},
		tags: ['autodocs']
	});

	const singleLevelArgs = {
		items: [{ label: 'Agents', href: '#' }]
	};

	const multipleLevelsArgs = {
		items: [
			{ label: 'Agents', href: '#' },
			{ label: 'Support Bot', href: '#' },
			{ label: 'Tools', href: '#' }
		]
	};
</script>

<Story name="Single Level" args={singleLevelArgs} />

<Story name="Multiple Levels" args={multipleLevelsArgs} />
