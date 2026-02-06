<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import GalleryCard from './index';

	const { Story } = defineMeta({
		title: 'Components/GalleryCard',
		component: GalleryCard,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			title: {
				control: { type: 'text' },
				description: 'Main title to display (required)'
			},
			caption: {
				control: { type: 'text' },
				description: 'Optional caption text'
			},
			icon: {
				control: { type: 'select' },
				options: ['agent', 'chevron-right', 'gear', 'alert-circle', 'plus', 'search', null],
				description: 'Optional icon to display'
			},
			onclick: {
				action: 'card-clicked',
				description: 'Callback when card is clicked'
			},
			size: {
				control: { type: 'select' },
				options: ['base', 'small'],
				description: 'Card size variant'
			}
		}
	});
</script>

<script lang="ts">
	function handleCardClick() {
		console.log('Gallery card clicked');
	}
</script>

<Story name="All Variants">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 32px; width: 600px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Base Size</h3>
				<GalleryCard
					title="Dataset Analysis"
					caption="2024-09-09"
					icon="agent"
					size="base"
					onclick={handleCardClick}
				>
					<GalleryCard.Grid columns={2}>
						<GalleryCard.Label label="Status:" value="Active" position="below" />
						<GalleryCard.Label label="Records:" value="150,000" position="below" />
						<GalleryCard.Label label="Size:" value="2.4 GB" position="below" />
						<GalleryCard.Label label="Updated:" value="2 hours ago" position="below" />
					</GalleryCard.Grid>
				</GalleryCard>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Small Size</h3>
				<GalleryCard
					title="User Metrics"
					caption="Dashboard"
					icon="gear"
					size="small"
					onclick={handleCardClick}
				>
					<GalleryCard.Grid columns={2}>
						<GalleryCard.Label label="Users:" value="12,845" position="below" />
						<GalleryCard.Label label="Sessions:" value="45,321" position="below" />
					</GalleryCard.Grid>
				</GalleryCard>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Minimal Content</h3>
				<GalleryCard title="Minimal Card" onclick={handleCardClick}>
					<GalleryCard.Label value="Single value without label" />
				</GalleryCard>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Long Text Truncation</h3>
				<GalleryCard
					title="Very Long Title That Should Be Truncated With Ellipsis When It Gets Too Long"
					caption="Also Very Long Caption Text That Should Be Truncated With Ellipsis"
					icon="search"
					onclick={handleCardClick}
				>
					<GalleryCard.Grid columns={2}>
						<GalleryCard.Label
							label="Very Long Label:"
							value="Very Long Value That Should Span Across Multiple Lines Because
						It is Quite Long"
							position="below"
						/>
						<GalleryCard.Label
							label="Another Long Label:"
							value="Another Long Value Text"
							position="below"
						/>
					</GalleryCard.Grid>
				</GalleryCard>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">
					Grid with Column Spanning
				</h3>
				<GalleryCard
					title="Spanning Example"
					caption="Mixed layout"
					icon="gear"
					onclick={handleCardClick}
				>
					<GalleryCard.Grid columns={3}>
						<GalleryCard.Label
							label="Full Width:"
							value="This spans all 3 columns"
							position="below"
							span={3}
						/>
						<GalleryCard.Label label="Left:" value="Column 1" position="below" />
						<GalleryCard.Label
							label="Right:"
							value="This label spans 2 cols, as you can see"
							position="below"
							span={2}
						/>
						<GalleryCard.Label label="A:" value="Normal" position="below" />
						<GalleryCard.Label label="B:" value="Normal" position="below" />
						<GalleryCard.Label label="C:" value="Normal" position="below" />
					</GalleryCard.Grid>
				</GalleryCard>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Static (No onclick)</h3>
				<GalleryCard title="Non-Interactive Card" caption="Read-only" size="small">
					<GalleryCard.Grid columns={2}>
						<GalleryCard.Label label="Status:" value="Archived" position="below" />
						<GalleryCard.Label label="Records:" value="50,000" position="below" />
					</GalleryCard.Grid>
					This is a section of text.
				</GalleryCard>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="GalleryCard.Label Variants">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 32px; width: 300px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">With Label - Below</h3>
				<GalleryCard.Label label="Label" value="Value" position="below" />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">With Label - Right</h3>
				<GalleryCard.Label label="Label" value="Value" position="right" />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Value Only</h3>
				<GalleryCard.Label value="Value without label" />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Long Text - Below</h3>
				<GalleryCard.Label
					label="Very Long Label That Shows Text Behavior"
					value="Very Long Value That Demonstrates How Text Wrapping Works"
					position="below"
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Long Text - Right</h3>
				<GalleryCard.Label
					label="Long Label"
					value="Very Long Value That Demonstrates How Text Wrapping Works"
					position="right"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		title: 'Sample Gallery Card',
		caption: 'Interactive example',
		icon: 'agent',
		size: 'base'
	}}
>
	{#snippet template(args)}
		<div style="width: 500px; padding: 20px;">
			<GalleryCard {...args} onclick={handleCardClick}>
				<GalleryCard.Grid columns={2}>
					<GalleryCard.Label label="Field 1:" value="Value 1" position="below" />
					<GalleryCard.Label label="Field 2:" value="Value 2" position="below" />
				</GalleryCard.Grid>
				<GalleryCard.Grid columns={2}>
					<GalleryCard.Label label="Field 3:" value="Value 3" position="below" />
					<GalleryCard.Label label="Field 4:" value="Value 4" position="below" />
				</GalleryCard.Grid>
			</GalleryCard>
		</div>
	{/snippet}
</Story>
