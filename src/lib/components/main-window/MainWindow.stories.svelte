<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect } from 'storybook/test';
	import { MainWindow, type MainWindowProps } from './index';

	async function spaced({ canvasElement }: { canvasElement: HTMLElement }) {
		const window = canvasElement.querySelector('.main-window__content');
		if (!window) throw new Error('MainWindow story must render its window');
		await expect(
			parseFloat(getComputedStyle(window).paddingTop),
			'disabling content padding preserves header spacing'
		).toBeGreaterThan(0);
	}
	async function flush({ canvasElement }: { canvasElement: HTMLElement }) {
		const window = canvasElement.querySelector('.main-window__content');
		if (!window) throw new Error('MainWindow story must render its window');
		await expect(
			parseFloat(getComputedStyle(window).paddingTop),
			'a toolbar adjoins its header'
		).toBe(0);
	}
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

<Story name="Without content padding" tags={['interaction']} play={spaced}>
	{#snippet template()}<div style="height: 24rem; border: 1px dashed purple;">
			<MainWindow title="Observations" contentPadding={false}
				><p>Content retains spacing below the header.</p></MainWindow
			>
		</div>{/snippet}
</Story>
<Story name="Adjoining toolbar" tags={['interaction']} play={flush}>
	{#snippet template()}<div style="height: 24rem; border: 1px dashed purple;">
			<MainWindow title="Logs" contentPadding={false} --main-window-content-spacing="0px"
				><div style="padding: 12px; border-bottom: 1px solid var(--color-border-base);">
					Query toolbar
				</div></MainWindow
			>
		</div>{/snippet}
</Story>
