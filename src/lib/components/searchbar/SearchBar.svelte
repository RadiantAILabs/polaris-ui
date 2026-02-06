<script lang="ts" module>
	import { Input, type InputProps } from '../input';

	export type SearchBarProps = Omit<InputProps, 'type' | 'icon'>;
</script>

<script lang="ts">
	let {
		value = $bindable(),
		placeholder = 'Search',
		'aria-label': ariaLabel = 'Search',
		...restProps
	}: SearchBarProps = $props();

	const inputProps: InputProps = $derived({
		...restProps,
		type: 'search',
		placeholder,
		icon: 'search',
		'aria-label': ariaLabel
	});
</script>

<form role="search">
	<Input {...inputProps} bind:value />
</form>
