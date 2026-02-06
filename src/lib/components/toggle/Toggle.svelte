<script lang="ts" module>
	import { cn, type WithElementRef } from '../../utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	export const toggleVariants = tv({
		base: 'toggle',
		variants: {
			border: {
				light: 'toggle--border-light',
				strong: 'toggle--border-strong'
			}
		},
		defaultVariants: {
			border: 'light'
		}
	});

	export type ToggleBorder = VariantProps<typeof toggleVariants>['border'];
	export type ToggleOption = {
		label: string;
		value: string;
	};
	export type ToggleProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		border?: ToggleBorder;
		options: ToggleOption[];
		value?: string;
		onchange?: (value: string) => void;
	};
</script>

<script lang="ts">
	let {
		class: className,
		border = 'light',
		options = [],
		value = $bindable(options[0]?.value || ''),
		onchange,
		ref = $bindable(null),
		...restProps
	}: ToggleProps = $props();

	let hoveredIndex = $state<number | null>(null);
	let selectedIndex = $derived(options.findIndex((option) => option.value === value));
	let buttonElements = $state<HTMLButtonElement[]>([]);

	function handleOptionClick(option: ToggleOption) {
		value = option.value;
		onchange?.(option.value);
	}

	function handleMouseEnter(index: number) {
		hoveredIndex = index;
	}

	function handleMouseLeave() {
		hoveredIndex = null;
	}

	// Calculate the position and width for the selected background using button dimensions
	let selectedBackgroundStyle = $derived(() => {
		if (selectedIndex === -1) return 'display: none;';

		const selectedButton = buttonElements[selectedIndex];
		if (!selectedButton) {
			// Return empty style to keep background visible until we have measurements
			return '';
		}

		const width = `${Math.round(selectedButton.offsetWidth)}px`;
		const left = `${Math.round(selectedButton.offsetLeft)}px`;
		return `width: ${width}; left: ${left};`;
	});
</script>

<div
	bind:this={ref}
	class={cn(toggleVariants({ border }), className)}
	role="group"
	aria-label="Toggle options"
	onmouseleave={handleMouseLeave}
	{...restProps}
>
	<div class="toggle__wrapper">
		<div class="toggle__background" style={selectedBackgroundStyle()}></div>
		{#each options as option, index (option.value)}
			<button
				bind:this={buttonElements[index]}
				class="toggle__option"
				class:toggle__option--selected={index === selectedIndex}
				class:toggle__option--hover={index === hoveredIndex}
				onclick={() => handleOptionClick(option)}
				onmouseenter={() => handleMouseEnter(index)}
				type="button"
			>
				{option.label}
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	@use './Toggle';
</style>
