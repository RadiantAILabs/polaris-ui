<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PageTitleBar from './PageTitleBar.svelte';

	const { Story } = defineMeta({
		title: 'Components/PageTitleBar',
		// TODO figure out why the Stories break when this line is uncommented
		// component: PageTitleBar,
		parameters: {
			layout: 'padded'
		},
		tags: ['autodocs'],
		argTypes: {
			title: {
				control: { type: 'text' },
				description: 'The main title displayed in the title bar'
			},
			button1: {
				control: { type: 'object' },
				description: 'Configuration for the first action button'
			},
			button2: {
				control: { type: 'object' },
				description: 'Configuration for the second action button'
			},
			button3: {
				control: { type: 'object' },
				description: 'Configuration for the third action button'
			}
		}
	});
</script>

<script lang="ts">
	// Sample button configurations based on Figma design
	const sampleButton1 = {
		variant: 'secondary',
		label: 'Click here',
		icon: 'chevron-down'
	} as const;

	const sampleButton2 = {
		variant: 'secondary',
		label: 'Click here',
		icon: 'chevron-down'
	} as const;

	const sampleButton3 = {
		variant: 'primary',
		label: 'Click here',
		icon: 'chevron-down'
	} as const;
</script>

<Story name="Full Example">
	<PageTitleBar
		title="Page Title"
		button1={sampleButton1}
		button2={sampleButton2}
		button3={sampleButton3}
	/>
</Story>

<Story name="Overflow">
	<PageTitleBar
		title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
		button1={{ variant: 'secondary', label: 'Settings' } as const}
		button3={{ variant: 'primary', label: 'Save Changes' } as const}
	/>
</Story>

<Story name="No Actions">
	<PageTitleBar title="Page Title" />
</Story>

<Story name="With Breadcrumbs">
	<PageTitleBar
		title="Support Bot"
		breadcrumbs={[
			{ label: 'Agents', href: '#' },
			{ label: 'Support Bot', href: '#' }
		]}
		button3={sampleButton3}
	/>
</Story>

<Story
	name="Playground"
	args={{
		title: 'Page Title',
		button1: undefined,
		button2: undefined,
		button3: sampleButton3
	}}
>
	{#snippet template(args)}
		<PageTitleBar {...args} />
	{/snippet}
</Story>
