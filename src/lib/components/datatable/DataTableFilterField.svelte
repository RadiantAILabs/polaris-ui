<script lang="ts" module>
	import type { InputProps } from '../input';

	export interface DataTableFilterFieldProps extends InputProps {
		/** Column label, shown inside the field as a stable name before the value. */
		label: string;
	}
</script>

<script lang="ts">
	import { cn } from '../../utils';
	import { Input } from '../input';

	let { label, value, class: className, ...restProps }: DataTableFilterFieldProps = $props();

	const hasValue = $derived(value != null && String(value).length > 0);
</script>

<div class={cn('filter-field', hasValue && 'filter-field--filled', className)}>
	<Input {label} {value} {...restProps} />
</div>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.filter-field {
		display: flex;
		width: fit-content;

		:global(.input) {
			flex: none;
			width: 0;
			transition: width 160ms ease;
		}

		&:focus-within,
		&--filled {
			:global(.input) {
				width: 14rem;
			}
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.filter-field :global(.input) {
			transition: none;
		}
	}
</style>
