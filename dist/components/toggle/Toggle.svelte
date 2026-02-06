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

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.toggle {
  width: fit-content;
  height: fit-content;
  padding: calc(0.25rem - 1px);
  overflow: hidden;
  user-select: none;
  background-color: var(--color-background-rest);
  border: 1px solid transparent;
  border-radius: 2px;
}
.toggle--border-light {
  border-color: var(--color-button-border-light);
}
.toggle--border-strong {
  border-color: var(--color-button-border-base);
}

.toggle__wrapper {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
}

.toggle__background {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 0;
  background-color: var(--color-button-background-active);
  border-radius: 2px;
  transition: width 200ms cubic-bezier(0.4, 0, 0.2, 1), left 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.toggle--border-strong .toggle__background {
  border-radius: 0.25rem;
}

.toggle__option {
  z-index: 1;
  flex: 1;
  padding: 0.25rem 0.5rem;
  color: var(--color-text-tertiary);
  text-align: center;
  text-wrap: nowrap;
  cursor: pointer;
  outline: none;
  background: transparent;
  border: none;
  transition: color 150ms ease-in-out;
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.toggle__option:hover:not(.toggle__option--selected) {
  color: var(--color-text-onemphasized);
}
.toggle__option--selected {
  color: var(--color-text-onemphasized);
}</style>
