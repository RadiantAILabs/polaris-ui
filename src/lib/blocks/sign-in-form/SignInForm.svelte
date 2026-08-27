<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface SignInCredentials {
		email: string;
		password: string;
	}

	export type SignInSubmitHandler = (credentials: SignInCredentials) => Promise<string | undefined>;

	export interface SignInFormProps {
		onSubmit?: SignInSubmitHandler;
		action?: string;
		serverError?: string;
		title?: string;
		brand?: Snippet;
		autofocus?: boolean;
	}
</script>

<script lang="ts">
	import { Alert, AlertDescription } from '../../components/alert';
	import { Button } from '../../components/button';
	import Form from '../../components/form';
	import { Input } from '../../components/input';

	let {
		onSubmit,
		action,
		serverError = '',
		title = 'Sign in',
		brand,
		autofocus = true
	}: SignInFormProps = $props();

	const uid = $props.id();
	const headingId = `${uid}-heading`;
	const emailId = `${uid}-email`;
	const passwordId = `${uid}-password`;

	let submitting = $state(false);
	let authError = $state('');
	let emailError = $state('');
	let passwordError = $state('');
	let emailValue = $state('');
	let passwordValue = $state('');
	let emailInput = $state<HTMLInputElement | null>(null);
	let passwordInput = $state<HTMLInputElement | null>(null);
	let displayedAuthError = $derived(authError || serverError);

	function validateEmail(value: string) {
		const email = value.trim();
		if (!email) return 'Email is required.';
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Enter a valid email address.';
	}

	function validatePassword(value: string) {
		return value ? '' : 'Password is required.';
	}

	function handleEmailInput(event: Event) {
		emailValue = (event.currentTarget as HTMLInputElement).value;
		if (emailError) emailError = validateEmail(emailValue);
		authError = '';
	}

	function handlePasswordInput(event: Event) {
		passwordValue = (event.currentTarget as HTMLInputElement).value;
		if (passwordError) passwordError = validatePassword(passwordValue);
		authError = '';
	}

	async function submit(event: SubmitEvent) {
		const handler = onSubmit;
		const email = emailValue.trim();
		const password = passwordValue;

		emailError = validateEmail(email);
		passwordError = validatePassword(password);
		authError = '';

		if (emailError || passwordError) {
			event.preventDefault();
			(emailError ? emailInput : passwordInput)?.focus();
			return;
		}
		if (!handler) return;

		event.preventDefault();
		submitting = true;
		try {
			authError = (await handler({ email, password })) ?? '';
		} catch (error) {
			console.error('Sign-in submission failed:', error);
			authError = 'Unable to sign in. Please try again.';
		} finally {
			submitting = false;
		}
	}
</script>

<div class="sign-in-page">
	<section class="sign-in-panel" aria-labelledby={headingId}>
		{#if brand}
			<header class="brand">{@render brand()}</header>
		{/if}
		<h1 id={headingId} class="sign-in-heading">{title}</h1>

		<form method="post" {action} onsubmit={submit} novalidate>
			{#if displayedAuthError}
				<Alert variant="error">
					<AlertDescription>{displayedAuthError}</AlertDescription>
				</Alert>
			{/if}

			<Form.Field name="email" label="Email" error={emailError}>
				{#snippet children({ props })}
					<Input
						{...props}
						bind:ref={emailInput}
						bind:value={emailValue}
						class="credential-input"
						id={emailId}
						type="email"
						autocomplete="username"
						oninput={handleEmailInput}
						{autofocus}
						required
					/>
				{/snippet}
			</Form.Field>

			<div class="password-field">
				<Form.Field name="password" label="Password" error={passwordError}>
					{#snippet children({ props })}
						<Input
							{...props}
							bind:ref={passwordInput}
							bind:value={passwordValue}
							class="credential-input"
							id={passwordId}
							type="password"
							autocomplete="current-password"
							oninput={handlePasswordInput}
							required
						/>
					{/snippet}
				</Form.Field>
			</div>

			<Button
				class="submit-button"
				type="submit"
				size="large"
				label={submitting ? 'Signing in…' : 'Sign in'}
				disabled={submitting}
			/>
		</form>
	</section>
</div>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.sign-in-page {
		display: grid;
		place-items: center;
		min-height: 100dvh;
		padding: $space-4;
		background: var(--color-background-base);
	}

	.brand {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: $space-2-5;
	}

	.sign-in-panel {
		width: min(100%, 23rem);

		.sign-in-heading {
			margin-bottom: $space-4;
			font-size: 1.375rem;
			font-weight: 600;
			line-height: 1.2;
			text-align: center;
			letter-spacing: -0.01em;
		}
	}

	form {
		display: grid;
		gap: $space-2;
	}

	.sign-in-page .sign-in-panel :global(.credential-input) {
		min-height: $space-5;
		padding-inline: $space-1-5;
	}

	.password-field {
		margin-bottom: $space-1-5;
	}

	.sign-in-page .sign-in-panel :global(.submit-button) {
		width: 100%;
	}
</style>
