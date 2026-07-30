<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { BlankState } from './index';

	const { Story } = defineMeta({
		title: 'Components/BlankState',
		component: BlankState,
		parameters: {
			layout: 'fullscreen'
		},
		tags: ['autodocs'],
		argTypes: {
			title: {
				control: { type: 'text' },
				description: 'The title text displayed in the blank state'
			},
			description: {
				control: { type: 'text' },
				description: 'The description text displayed below the title'
			},
			buttonProps: {
				control: { type: 'object' },
				description: 'Props to pass to the button (size is automatically set to large)'
			}
		}
	});
</script>

<script lang="ts">
	function handleGetStarted() {
		alert('Get started clicked!');
	}

	function handleCreateProject() {
		alert('Create project clicked!');
	}

	function handleLearnMore() {
		alert('Learn more clicked!');
	}
</script>

<Story name="All Variants">
	{#snippet template()}
		<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; height: 100vh;">
			<div style="border: 1px solid #e0e0e0;">
				<BlankState
					title="Welcome to your dashboard"
					description="Get started by creating your first project or importing existing data."
					buttonProps={{
						label: 'Get Started',
						variant: 'primary',
						icon: 'arrow-right',
						onclick: handleGetStarted
					}}
				/>
			</div>

			<div style="border: 1px solid #e0e0e0;">
				<BlankState
					title="No projects found"
					description="You haven't created any projects yet. Create your first project to get started."
					buttonProps={{
						label: 'Create Project',
						variant: 'secondary',
						icon: 'plus',
						onclick: handleCreateProject
					}}
				/>
			</div>

			<div style="border: 1px solid #e0e0e0;">
				<BlankState
					title="Data not available"
					description="The requested data is currently unavailable. Please check back later."
				/>
			</div>

			<div style="border: 1px solid #e0e0e0;">
				<BlankState
					title="Need help getting started?"
					description="Learn more about how to use this feature effectively."
					buttonProps={{
						label: 'Learn More',
						variant: 'invisible',
						icon: 'arrow-right',
						onclick: handleLearnMore
					}}
				></BlankState>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Inline (embedded in a card)">
	{#snippet template()}
		<div style="max-width: 22rem; overflow: hidden; border: 1px solid #e0e0e0; ">
			<div style="padding: 12px 16px; font-weight: 600; border-bottom: 1px solid #e0e0e0;">
				Recent activity
			</div>
			<BlankState size="inline" description="No runs observed yet for this agent." />
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		title: 'Call to action',
		description: 'Get started by pressing the button.',
		buttonProps: {
			label: 'Click here',
			variant: 'primary',
			icon: 'arrow-right'
		}
	}}
>
	{#snippet template(args)}
		<div style="height: 100vh; border: 1px solid #e0e0e0;">
			<BlankState {...args} />
		</div>
	{/snippet}
</Story>
