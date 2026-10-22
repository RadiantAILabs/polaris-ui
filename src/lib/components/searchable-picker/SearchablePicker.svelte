<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { PickerOption } from './contract';
	export interface SearchablePickerProps {
		/** Results in display order. The caller owns filtering and remote requests. */
		items: PickerOption[];
		query?: string;
		onQueryChange?: (query: string) => void;
		selected?: string[];
		multiple?: boolean;
		onSelect: (value: string) => void;
		loading?: boolean;
		emptyMessage?: string;
		label?: string;
		autofocus?: boolean;
		item?: Snippet<[PickerOption]>;
	}
</script>

<script lang="ts">
	import { Icon } from '../icon';
	import { Input } from '../input';
	import { Skeleton } from '../skeleton';
	let {
		items,
		query = $bindable(''),
		onQueryChange,
		selected = [],
		multiple = false,
		onSelect,
		loading = false,
		emptyMessage = 'No results',
		label = 'Search',
		autofocus = false,
		item
	}: SearchablePickerProps = $props();
	const id = $props.id();
	let input = $state<HTMLInputElement | null>(null);
	let list: HTMLDivElement;
	let active = $state<string>();
	const groups = $derived.by(() => {
		// This lookup is local to one derived computation, not reactive state.
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const sections = new Map<string | undefined, PickerOption[]>();
		for (const option of items) {
			const section = sections.get(option.section);
			if (section) section.push(option);
			else sections.set(option.section, [option]);
		}
		let index = 0;
		return [...sections].map(([section, options]) => ({
			section,
			options: options.map((option) => ({ ...option, index: index++ }))
		}));
	});
	const orderedItems = $derived(groups.flatMap((group) => group.options));
	const enabledItems = $derived(orderedItems.filter((option) => !option.disabled));
	const selectedValues = $derived(new Set(selected));
	const activeIndex = $derived(
		orderedItems.findIndex((option) => option.value === active && !option.disabled)
	);
	$effect(() => {
		if (autofocus) input?.focus();
	});
	function keydown(event: KeyboardEvent) {
		if (loading || event.isComposing) return;
		const option = orderedItems[activeIndex];
		if (event.key === 'Enter' && option && !option.disabled) {
			event.preventDefault();
			onSelect(option.value);
			return;
		}
		if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
		event.preventDefault();
		if (!enabledItems.length) return;
		const index = enabledItems.findIndex((option) => option.value === active);
		const next =
			event.key === 'ArrowDown'
				? (index + 1) % enabledItems.length
				: (index <= 0 ? enabledItems.length : index) - 1;
		const nextOption = enabledItems[next];
		if (!nextOption) return;
		active = nextOption.value;
		list
			.querySelector<HTMLElement>(`[data-index="${nextOption.index}"]`)
			?.scrollIntoView({ block: 'nearest' });
	}
</script>

<div class="picker">
	<div class="picker__search">
		<Input
			bind:ref={input}
			role="combobox"
			autocomplete="off"
			aria-label={label}
			placeholder="Search"
			aria-expanded="true"
			aria-controls={`${id}-list`}
			aria-activedescendant={activeIndex >= 0 && !loading ? `${id}-${activeIndex}` : undefined}
			aria-autocomplete="list"
			value={query}
			oninput={(event) => {
				query = event.currentTarget.value;
				active = undefined;
				onQueryChange?.(query);
			}}
			onkeydown={keydown}
		/>
	</div>
	<div bind:this={list} class="picker__list scroll-area">
		<div
			id={`${id}-list`}
			role="listbox"
			aria-label={label}
			aria-busy={loading}
			aria-multiselectable={multiple || undefined}
		>
			{#if !loading && items.length > 0}
				{#each groups as group, sectionIndex (group.section)}
					{#if sectionIndex > 0}<div class="picker__separator" role="presentation"></div>{/if}
					<div
						role={group.section ? 'group' : 'presentation'}
						aria-labelledby={group.section ? `${id}-section-${sectionIndex}` : undefined}
					>
						{#if group.section}<div
								class="picker__label"
								id={`${id}-section-${sectionIndex}`}
								role="presentation"
							>
								{group.section}
							</div>{/if}
						{#each group.options as option (option.value)}
							{@const index = option.index}
							<button
								type="button"
								id={`${id}-${index}`}
								role="option"
								aria-selected={selectedValues.has(option.value)}
								disabled={option.disabled}
								data-disabled={option.disabled || undefined}
								tabindex="-1"
								data-index={index}
								data-highlighted={active === option.value || undefined}
								onpointermove={() => (active = option.value)}
								onpointerdown={(event) => event.preventDefault()}
								onclick={() => onSelect(option.value)}
							>
								<span class="picker__text"
									>{#if item}{@render item(option)}{:else}{option.label}{/if}</span
								>
								{#if selectedValues.has(option.value)}<Icon name="check" size="small" />{/if}
							</button>
						{/each}
					</div>
				{/each}
			{/if}
		</div>
		<div role="status">
			{#if loading}
				<div class="picker__message">
					<span class="picker__status-text">Loading options</span>
					<Skeleton /><Skeleton /><Skeleton />
				</div>
			{:else if items.length === 0}<div class="picker__message">{emptyMessage}</div>{/if}
		</div>
	</div>
</div>

<style lang="scss">
	@use '../../styles/floating';
	@use '../../styles/accessibility';

	.picker {
		width: 100%;
		min-width: 0;
	}

	.picker__search {
		padding: 8px;
		border-bottom: 1px solid var(--color-border-base);
	}

	.picker__list {
		max-height: 320px;
		padding: 4px;
		overflow: auto;
	}

	button {
		@include floating.item($managed-highlight: true);
	}

	.picker__text {
		@include floating.text;
	}

	.picker__label {
		@include floating.label;
	}

	.picker__separator {
		@include floating.separator;
	}

	.picker__message {
		display: grid;
		gap: 12px;
		padding: 12px;
		color: var(--color-text-tertiary);
	}

	.picker__status-text {
		@include accessibility.visually-hidden;
	}
</style>
