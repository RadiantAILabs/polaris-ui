<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Icon from './icon.svelte';
	import { iconRegistry, type IconName } from './icon-registry';
	import { Input } from '../input';

	const names = Object.keys(iconRegistry).sort() as IconName[];
	const { Story } = defineMeta({
		title: 'Components/Icon',
		component: Icon,
		tags: ['autodocs'],
		args: { name: 'folder', size: '24px', variant: 'primary' },
		argTypes: {
			name: { control: 'select', options: names },
			size: { control: 'text' },
			variant: {
				control: 'select',
				options: [
					'primary',
					'secondary',
					'tertiary',
					'inverse-primary',
					'on-destructive',
					'warning',
					'error',
					'success'
				]
			}
		}
	});
</script>

<script lang="ts">
	let query = $state('');
	const filteredNames = $derived(names.filter((name) => name.includes(query.trim().toLowerCase())));
</script>

<Story name="Example" />

<Story name="Gallery">
	{#snippet template(args)}
		<div class="icon-gallery">
			<div class="icon-gallery-search">
				<Input
					type="search"
					bind:value={query}
					icon="search"
					label="Search icons"
					placeholder="e.g. folder, arrow, calendar"
					clearable
				/>
			</div>
			<p aria-live="polite">{filteredNames.length} of {names.length} icons</p>
			<ul>
				{#each filteredNames as name (name)}
					<li>
						<Icon {name} size={args.size} variant={args.variant} aria-hidden="true" />
						<code>{name}</code>
					</li>
				{/each}
			</ul>
		</div>
	{/snippet}
</Story>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.icon-gallery {
		max-width: 80rem;
		margin: 0 auto;
	}

	.icon-gallery-search {
		max-width: 28rem;
		margin-bottom: $space-2;
	}

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
		gap: $space-2;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		flex-direction: column;
		gap: $space-1;
		align-items: center;
		padding: $space-2;
		background-color: var(--color-background-raised);
		border: $border-width-base solid var(--color-control-border-rest);
		border-radius: $border-radius-base;
	}

	code {
		text-align: center;
		overflow-wrap: anywhere;
	}
</style>
