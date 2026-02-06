<script lang="ts">
	import { type WithElementRef } from '../../utils';
	import { Checkbox as CheckboxPrimitive } from 'bits-ui';

	export type CheckboxProps = WithElementRef<CheckboxPrimitive.RootProps>;

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		disabled = false,
		...restProps
	}: CheckboxProps = $props();
</script>

<CheckboxPrimitive.Root bind:ref bind:checked {disabled} {...restProps}>
	{#snippet child({ props })}
		<button {...props} class="checkbox">
			<svg xmlns="http://www.w3.org/2000/svg" width="0.5rem" height="0.375rem" viewBox="0 0 8 6">
				{#if checked}
					<path
						d="M6.11356 0.493408C6.39342 0.188098 6.86778 0.1677 7.17313 0.44751C7.47841 0.727411 7.4989 1.20176 7.21902 1.50708L3.55301 5.50708C3.41479 5.65781 3.22037 5.7458 3.0159 5.75024C2.81163 5.75458 2.61454 5.67493 2.47 5.53052L0.803009 3.86353C0.510312 3.57065 0.51027 3.09583 0.803009 2.80298C1.09586 2.5103 1.5707 2.5103 1.86356 2.80298L2.97586 3.91528L6.11356 0.493408Z"
						fill={disabled
							? 'var(--color-checkbox-icon-disabled)'
							: 'var(--color-checkbox-icon-active)'}
					/>
				{/if}
			</svg>
		</button>
	{/snippet}
</CheckboxPrimitive.Root>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  padding: 0.125rem;
  background-color: transparent;
  border: 1px solid var(--color-checkbox-border-rest);
  border-radius: 3px;
}
@media (prefers-reduced-motion: no-preference) {
  .checkbox {
    transition: border-color 150ms ease-in-out;
  }
}

.checkbox[data-state=checked] {
  background-color: var(--color-checkbox-background-active);
  border-color: var(--color-checkbox-border-rest);
}

.checkbox:is(:hover, :focus-visible):not([data-disabled]) {
  border-color: var(--color-checkbox-border-hover);
}

.checkbox[data-disabled] {
  cursor: not-allowed;
  background-color: var(--color-background-disabled);
  border-color: none;
}</style>
