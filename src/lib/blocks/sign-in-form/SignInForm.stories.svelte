<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, userEvent, within } from 'storybook/test';
	import SignInForm, { type SignInSubmitHandler } from './SignInForm.svelte';

	const { Story } = defineMeta({
		title: 'Blocks/SignInForm',
		component: SignInForm,
		parameters: { layout: 'fullscreen' },
		tags: ['autodocs']
	});

	const succeed: SignInSubmitHandler = async () => undefined;
	const rejectCredentials: SignInSubmitHandler = async () => 'Invalid email or password.';
	const remainPending: SignInSubmitHandler = () => new Promise(() => {});

	async function enterCredentials(canvasElement: HTMLElement) {
		const canvas = within(canvasElement);
		await userEvent.type(canvas.getByLabelText('Email'), 'operator@example.com');
		await userEvent.type(canvas.getByLabelText('Password'), 'password');
		return canvas;
	}

	async function showValidationErrors({ canvasElement }: { canvasElement: HTMLElement }) {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: 'Sign in' }));
		await expect(canvas.getByText('Email is required.')).toBeVisible();
		await expect(canvas.getByText('Password is required.')).toBeVisible();
	}

	async function showInvalidEmailError({ canvasElement }: { canvasElement: HTMLElement }) {
		const canvas = within(canvasElement);
		await userEvent.type(canvas.getByLabelText('Email'), 'not-an-email');
		await userEvent.type(canvas.getByLabelText('Password'), 'password');
		await userEvent.click(canvas.getByRole('button', { name: 'Sign in' }));
		await expect(canvas.getByText('Enter a valid email address.')).toBeVisible();
	}

	async function submitCredentials({ canvasElement }: { canvasElement: HTMLElement }) {
		const canvas = await enterCredentials(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: 'Sign in' }));
		await expect(canvas.getByText('Invalid email or password.')).toBeVisible();
	}

	async function showSubmitting({ canvasElement }: { canvasElement: HTMLElement }) {
		const canvas = await enterCredentials(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: 'Sign in' }));
		await expect(canvas.getByRole('button', { name: 'Signing in…' })).toBeDisabled();
	}
</script>

<Story name="Default">
	{#snippet template()}
		<SignInForm onSubmit={succeed} />
	{/snippet}
</Story>

<Story name="Branded">
	{#snippet template()}
		<SignInForm onSubmit={succeed} title="Sign in to Radiant">
			{#snippet brand()}<strong>Radiant</strong>{/snippet}
		</SignInForm>
	{/snippet}
</Story>

<Story name="Validation errors" play={showValidationErrors}>
	{#snippet template()}
		<SignInForm onSubmit={succeed} />
	{/snippet}
</Story>

<Story name="Invalid email" play={showInvalidEmailError}>
	{#snippet template()}
		<SignInForm onSubmit={succeed} />
	{/snippet}
</Story>

<Story name="Invalid credentials" play={submitCredentials}>
	{#snippet template()}
		<SignInForm onSubmit={rejectCredentials} />
	{/snippet}
</Story>

<Story name="Server error" play={showValidationErrors}>
	{#snippet template()}
		<SignInForm action="/login" serverError="Invalid email or password." />
	{/snippet}
</Story>

<Story name="Submitting" play={showSubmitting}>
	{#snippet template()}
		<SignInForm onSubmit={remainPending} />
	{/snippet}
</Story>
