<script lang="ts" generics="T extends Record<string, unknown>">
	import type { Snippet } from 'svelte';
	import type { FormInstance } from './createForm.svelte.js';
	import { cn } from '../../utils';

	type Props = {
		form: FormInstance<T>;
		children: Snippet;
		class?: string;
	};

	let { form, children, class: className }: Props = $props();

	// Handle form submission
	async function handleSubmit(event: Event) {
		event.preventDefault();
		await form.submit();
	}
</script>

<form class={cn('form', className)} onsubmit={handleSubmit} use:form.enhance novalidate>
	{@render children()}
</form>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 100%;
}</style>
