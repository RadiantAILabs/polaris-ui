<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import NavButton from './NavButton.svelte';

	const { Story } = defineMeta({
		title: 'Components/NavButton',
		component: NavButton,
		parameters: {
			layout: 'padded'
		},
		tags: ['autodocs'],
		argTypes: {
			icon: {
				control: { type: 'text' },
				description: 'The icon name to display'
			},
			label: {
				control: { type: 'text' },
				description: 'The label text for the navigation button'
			},
			active: {
				control: { type: 'boolean' },
				description: 'Whether the button is in active/selected state'
			},
			expanded: {
				control: { type: 'boolean' },
				description: 'Whether to show the label (collapsed sidebar hides label)'
			}
		}
	});
</script>

<script lang="ts"></script>

<Story name="All States">
	{#snippet template()}
		<div
			style="display: flex; flex-direction: column; gap: 2rem; padding: 1rem; border-radius: 8px;"
		>
			<div>
				<h3 style="margin-bottom: 0.5rem; font-size: 14px; font-weight: 600; color: #f6f6f6;">
					Expanded
				</h3>
				<div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 300px;">
					<div>
						<p style="margin-bottom: 0.25rem; font-size: 12px; color: #999;">Rest</p>
						<NavButton icon="wrench" label="Configuration" active={false} expanded={true} />
					</div>
					<div>
						<p style="margin-bottom: 0.25rem; font-size: 12px; color: #999;">Active</p>
						<NavButton icon="wrench" label="Configuration" active={true} expanded={true} />
					</div>
				</div>
			</div>

			<div>
				<h3 style="margin-bottom: 0.5rem; font-size: 14px; font-weight: 600; color: #f6f6f6;">
					Collapsed
				</h3>
				<div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 48px;">
					<div>
						<p style="margin-bottom: 0.25rem; font-size: 12px; color: #999;">Rest</p>
						<NavButton icon="wrench" label="Configuration" active={false} expanded={false} />
					</div>
					<div>
						<p style="margin-bottom: 0.25rem; font-size: 12px; color: #999;">Active</p>
						<NavButton icon="wrench" label="Configuration" active={true} expanded={false} />
					</div>
				</div>
			</div>
		</div>
	{/snippet}
</Story>
