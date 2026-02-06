<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SearchBar from './SearchBar.svelte';

	const { Story } = defineMeta({
		title: 'Components/SearchBar',
		component: SearchBar,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: { type: 'text' },
				description: 'The current value of the search input'
			},
			placeholder: {
				control: { type: 'text' },
				description: 'Placeholder text to display when input is empty'
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the search input is disabled'
			},
			'aria-label': {
				control: { type: 'text' },
				description: 'Accessible label for the search input'
			}
		}
	});
</script>

<script lang="ts">
	let defaultValue = $state('');
	let activeValue = $state('query text');
	let disabledValue = $state('');

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		console.log('Search input:', target.value);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			const target = event.target as HTMLInputElement;
			console.log('Search submitted:', target.value);
		}
	}
</script>

<Story name="All Variants">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 24px; width: 300px;">
			<div>
				<h3
					style="margin: 0 0 8px; font-size: 14px; font-weight: 500; color: var(--color-text-secondary);"
				>
					Default
				</h3>
				<SearchBar
					bind:value={defaultValue}
					placeholder="Search"
					oninput={handleInput}
					onkeydown={handleKeydown}
				/>
			</div>

			<div>
				<h3
					style="margin: 0 0 8px; font-size: 14px; font-weight: 500; color: var(--color-text-secondary);"
				>
					With value
				</h3>
				<SearchBar
					bind:value={activeValue}
					placeholder="Search"
					oninput={handleInput}
					onkeydown={handleKeydown}
				/>
			</div>

			<div>
				<h3
					style="margin: 0 0 8px; font-size: 14px; font-weight: 500; color: var(--color-text-secondary);"
				>
					Disabled
				</h3>
				<SearchBar bind:value={disabledValue} placeholder="Search" disabled={true} />
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		value: '',
		placeholder: 'Search',
		disabled: false,
		'aria-label': 'Search'
	}}
>
	{#snippet template(args)}
		<div style="width: 300px;">
			<SearchBar
				{...args}
				oninput={(event: Event) => {
					const target = event.target as HTMLInputElement;
					console.log('Search input:', target.value);
				}}
				onkeydown={(event: KeyboardEvent) => {
					if (event.key === 'Enter') {
						const target = event.target as HTMLInputElement;
						console.log('Search submitted:', target.value);
					}
				}}
			/>
		</div>
	{/snippet}
</Story>
