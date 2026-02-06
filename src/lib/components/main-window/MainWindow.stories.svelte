<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { MainWindow, type MainWindowProps } from './index';

	const { Story } = defineMeta({
		title: 'Components/MainWindow',
		// TODO figure out why this breaks the story layout
		// component: MainWindow,
		parameters: {
			layout: 'padded'
		},
		tags: ['autodocs'],
		argTypes: {
			title: {
				control: { type: 'text' },
				description: 'The main title of the page'
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
			},
			headerContent: {
				control: false,
				description: 'Optional snippet for additional header content (e.g., navigation)'
			}
		}
	});
</script>

<script lang="ts">
	// Sample button configurations
	const sampleButton = {
		variant: 'primary',
		label: 'Primary Action',
		icon: 'chevron-down'
	} as const;

	let activeTab = $state('Section 1');
	const tabs = [
		{ label: 'Section 1' },
		{ label: 'Section 2' },
		{ label: 'Section 3' },
		{ label: 'Section 4' },
		{ label: 'Section 5' }
	];
</script>

<Story name="Default">
	<div style="border: 1px dashed purple;">
		<MainWindow title="Main Window" button1={sampleButton}>
			<p>This is the content area of the main window.</p>
		</MainWindow>
	</div>
</Story>

<Story name="With Navigation">
	<div style="border: 1px dashed purple;">
		<MainWindow
			title="Page Title"
			button1={sampleButton}
			showNavbar
			navProps={{
				tabs,
				activeTab,
				showBorder: false,
				onTabChange: (tab) => {
					activeTab = tab;
				}
			}}
		>
			<p>This is the content area with navigation. Active tab: {activeTab}</p>
		</MainWindow>
	</div>
</Story>

<Story
	name="Playground"
	args={{
		title: 'Page Title',
		button1: sampleButton
	}}
>
	{#snippet template(args: MainWindowProps)}
		<div style="border: 1px dashed purple;">
			<MainWindow {...args}>
				<p>Content area placeholder</p>
			</MainWindow>
		</div>
	{/snippet}
</Story>
