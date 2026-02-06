<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ListCard from './ListCard.svelte';

	const { Story } = defineMeta({
		title: 'Components/ListCard',
		component: ListCard,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			primaryText: {
				control: { type: 'text' },
				description: 'Main text to display (required)'
			},
			secondaryText: {
				control: { type: 'text' },
				description: 'Optional secondary text'
			},
			icon: {
				control: { type: 'select' },
				options: ['chevron-right', 'gear', 'alert-circle', 'plus', 'search', null],
				description: 'Optional icon to display'
			},
			badgeText: {
				control: { type: 'text' },
				description: 'Optional badge text'
			},
			badgeLeadingIcon: {
				control: { type: 'select' },
				options: ['alert-circle', 'gear', 'plus', 'search', null],
				description: 'Optional icon for the badge'
			},
			buttonLabel: {
				control: { type: 'text' },
				description: 'Optional button label'
			},
			buttonVariant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'invisible'],
				description: 'Button variant'
			},
			buttonIcon: {
				control: { type: 'select' },
				options: ['arrow-right', 'plus', 'gear', 'alert-circle', null],
				description: 'Button icon'
			},
			buttonIconPosition: {
				control: { type: 'select' },
				options: ['left', 'right'],
				description: 'Button icon position'
			},
			onButtonClick: {
				action: 'button-clicked',
				description: 'Callback when button is clicked'
			},
			size: {
				control: { type: 'select' },
				options: ['base', 'large'],
				description: 'Card size variant'
			},
			onclick: {
				action: 'card-clicked',
				description: 'Callback when card is clicked'
			}
		}
	});
</script>

<script lang="ts">
	function handleCardClick() {
		console.log('Card clicked');
	}

	function handleButtonClick() {
		console.log('Button clicked');
	}
</script>

<Story name="All Variants">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 32px; width: 500px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Base Size</h3>
				<ListCard
					primaryText="Primary Text"
					secondaryText="Secondary Text"
					icon="chevron-right"
					badgeText="Item"
					buttonLabel="Click here"
					onButtonClick={handleButtonClick}
					size="base"
					onclick={handleCardClick}
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Large Size</h3>
				<ListCard
					primaryText="Primary Text"
					secondaryText="Secondary Text"
					icon="chevron-right"
					badgeText="Item"
					buttonLabel="Click here"
					onButtonClick={handleButtonClick}
					size="large"
					onclick={handleCardClick}
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Minimal Content</h3>
				<ListCard primaryText="Just Primary Text" onclick={handleCardClick} />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">With Icon Only</h3>
				<ListCard primaryText="Primary Text" icon="gear" onclick={handleCardClick} />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Badge Only</h3>
				<ListCard
					primaryText="Primary Text"
					secondaryText="Secondary Text"
					badgeText="Status"
					onclick={handleCardClick}
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Button Only</h3>
				<ListCard
					primaryText="Primary Text"
					secondaryText="Secondary Text"
					buttonLabel="Action"
					onButtonClick={handleButtonClick}
					onclick={handleCardClick}
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Long Text Truncation</h3>
				<ListCard
					primaryText="Very Long Primary Text That Should Be Truncated With Ellipsis"
					secondaryText="Very Long Secondary Text That Also Should Be Truncated"
					icon="alert-circle"
					badgeText="Long Badge Text"
					buttonLabel="Long Button"
					onButtonClick={handleButtonClick}
					size="base"
					onclick={handleCardClick}
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">
					Custom Badge and Button Props
				</h3>
				<ListCard
					primaryText="Custom Components"
					secondaryText="With modified props"
					icon="gear"
					badgeText="Custom"
					badgeLeadingIcon="alert-circle"
					buttonLabel="Custom"
					buttonVariant="primary"
					buttonIcon="plus"
					onButtonClick={handleButtonClick}
					onclick={handleCardClick}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		primaryText: 'Primary Text',
		secondaryText: 'Secondary Text',
		icon: 'chevron-right',
		badgeText: 'Item',
		buttonLabel: 'Click here',
		size: 'base'
	}}
>
	{#snippet template(args)}
		<div style="width: 500px; padding: 20px;">
			<ListCard {...args} onclick={handleCardClick} />
		</div>
	{/snippet}
</Story>
