<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { iconRegistry, type IconName } from './icon-registry';

	export interface IconProps extends HTMLAttributes<SVGElement> {
		name: IconName;
		size?: string | number;
		variant?:
			| 'primary'
			| 'secondary'
			| 'tertiary'
			| 'inverse-primary'
			| 'warning'
			| 'error'
			| 'success';
		animation?: 'spin';
		hidden?: boolean;
		class?: string;
		disabled?: boolean | null;
	}

	let {
		name,
		size = '1.5rem',
		variant = 'primary',
		animation,
		hidden = false,
		class: className = '',
		disabled = false,
		...props
	}: IconProps = $props();

	// Determine color based on variant (must be reactive to variant changes)
	const iconColor = $derived(
		disabled ? `var(--color-icon-disabled)` : `var(--color-icon-${variant})`
	);

	// Parse and process icon SVG content with reactive color
	const iconContent = $derived.by(() => {
		try {
			const svgContent = iconRegistry[name];

			if (!svgContent) {
				console.warn(`Icon "${name}" not found in registry`);
				return '';
			}

			// Extract just the path/content from the SVG and make it inherit color
			const parser = new DOMParser();
			const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
			const svgElement = svgDoc.querySelector('svg');

			if (svgElement) {
				// Get all elements with fill attributes and make them inherit color
				const elementsWithFill = svgElement.querySelectorAll('[fill]');
				elementsWithFill.forEach((element) => {
					const fillValue = element.getAttribute('fill');
					// Only change solid colors (not 'none' or gradients starting with 'url(')
					if (fillValue && fillValue !== 'none' && !fillValue.startsWith('url(')) {
						element.setAttribute('fill', 'currentColor');
					}
				});

				// Also handle stroke if present
				const elementsWithStroke = svgElement.querySelectorAll('[stroke]');
				elementsWithStroke.forEach((element) => {
					const strokeValue = element.getAttribute('stroke');
					if (strokeValue && strokeValue !== 'none' && !strokeValue.startsWith('url(')) {
						element.setAttribute('stroke', 'currentColor');
					}
				});

				// Get the innerHTML (paths, etc.) without the svg wrapper
				return svgElement.innerHTML;
			}

			return '';
		} catch (error) {
			console.warn(`Error processing icon "${name}":`, error);
			return '';
		}
	});
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="currentColor"
	class="icon {animation === 'spin' ? 'icon--spin' : ''} {className}"
	style="color: {iconColor}; opacity: {hidden ? 0 : 1};"
	{...props}
>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html iconContent}
</svg>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.icon {
  display: inline-block;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  vertical-align: middle;
}
@media (prefers-reduced-motion: no-preference) {
  .icon {
    transition: all 150ms ease-in-out;
  }
}
.icon--spin {
  animation: icon-spin 1200ms linear infinite;
}

@keyframes icon-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}</style>
