<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Form, { createForm } from './index';
	import { Input } from '../input/index';
	import { MultilineInput } from '../multilineinput/index';
	import DropdownSelector from '../dropdown-selector';
	import { Button } from '../button/index';
	import { CollapsibleWindow } from '../collapsible-window/index';
	import { z } from 'zod';

	const { Story } = defineMeta({
		title: 'Components/Form',
		component: Form.Root,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	// Validation schemas
	const userSchema = z.object({
		username: z.string().min(3, { error: 'Username must be at least 3 characters' }),
		email: z.email({ error: 'Please enter a valid email' }),
		bio: z.string().optional()
	});

	const serverSchema = z.object({
		serverName: z.string().min(1, { error: 'Server name is required' }),
		environment: z.string().min(1, { error: 'Environment is required' }),
		region: z.string().min(1, { error: 'Region is required' }),
		maxConnections: z.number().min(1).max(1000),
		description: z.string().optional()
	});

	// Handlers
	async function handleSubmit(data: z.infer<typeof userSchema>) {
		console.log('Form submitted:', data);
		alert(`Form submitted successfully!\n\n${JSON.stringify(data, null, 2)}`);
	}

	async function handleAutoSave(fieldName: string, value: unknown) {
		console.log('Auto-saving field:', fieldName, '=', value);

		// Create or find banner container
		let container = document.getElementById('autosave-banners');
		if (!container) {
			container = document.createElement('div');
			container.id = 'autosave-banners';
			container.style.cssText = `
				position: fixed;
				top: 20px;
				right: 20px;
				z-index: 1000;
				display: flex;
				flex-direction: column;
				gap: 8px;
			`;
			document.body.appendChild(container);
		}

		// Create banner
		const banner = document.createElement('div');
		banner.style.cssText = `
			background: #28a745;
			color: white;
			padding: 12px 20px;
			border-radius: 6px;
			box-shadow: 0 2px 10px rgba(0,0,0,0.1);
			font-family: system-ui, -apple-system, sans-serif;
			font-size: 14px;
			animation: slideIn 0.3s ease-out;
		`;
		banner.textContent = `Auto-saved: ${fieldName} = ${value}`;

		// Add slide-in animation
		const style = document.createElement('style');
		style.textContent = `
			@keyframes slideIn {
				from { transform: translateX(100%); opacity: 0; }
				to { transform: translateX(0); opacity: 1; }
			}
		`;
		if (!document.head.querySelector('style[data-autosave]')) {
			style.setAttribute('data-autosave', 'true');
			document.head.appendChild(style);
		}

		container.appendChild(banner);

		// Remove banner after 3 seconds
		setTimeout(() => {
			if (banner.parentNode) {
				banner.style.animation = 'slideIn 0.3s ease-out reverse';
				setTimeout(() => {
					if (banner.parentNode) {
						banner.parentNode.removeChild(banner);
					}
					// Clean up container if empty
					if (container && container.children.length === 0 && container.parentNode) {
						container.parentNode.removeChild(container);
					}
				}, 300);
			}
		}, 3000);
	}

	// Form instances
	const submitForm = createForm(
		{ username: '', email: '', bio: '' },
		{
			schema: userSchema,
			onSubmit: handleSubmit
		}
	);

	const autoSaveForm = createForm(
		{
			serverName: 'api-server-1',
			environment: 'staging',
			region: 'us-east-1',
			maxConnections: 25,
			description: 'Production server configuration'
		},
		{
			schema: serverSchema,
			autoSave: true,
			onAutoSaveField: handleAutoSave
		}
	);

	function handleExternalUpdate() {
		const updates = {
			environment: 'production',
			maxConnections: 100
		};

		// Update the form data using the form's setValues method
		autoSaveForm.setValues(updates);

		console.log('Applied external update:', updates);
	}

	function clearBio() {
		submitForm.data.bio = '';
	}

	// Options for dropdowns
	const environmentOptions = [
		{ value: 'development', label: 'Development' },
		{ value: 'staging', label: 'Staging' },
		{ value: 'production', label: 'Production' }
	];

	const regionOptions = [
		{ value: 'us-east-1', label: 'US East 1' },
		{ value: 'us-west-2', label: 'US West 2' },
		{ value: 'eu-west-1', label: 'EU West 1' }
	];
</script>

<Story name="Submit Form">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 16px;">
			<Form.Root form={submitForm}>
				<Form.Section title="Account Information">
					<Form.Field
						form={submitForm}
						name="username"
						label="Username"
						description="Choose carefully - this cannot be changed later"
						descriptionType="info"
						required
					>
						{#snippet children({ props })}
							<Input
								{...props}
								placeholder="Enter username..."
								bind:value={submitForm.data.username}
							/>
						{/snippet}
					</Form.Field>

					<Form.Field form={submitForm} name="email" label="Email Address" required>
						{#snippet children({ props })}
							<Input
								{...props}
								type="email"
								placeholder="user@example.com"
								bind:value={submitForm.data.email}
							/>
						{/snippet}
					</Form.Field>
				</Form.Section>

				<Form.Section
					title="Profile Details"
					actionButton={{
						variant: 'secondary',
						label: 'Clear Bio',
						icon: 'cross',
						onclick: clearBio
					}}
				>
					<Form.Field form={submitForm} name="bio" label="Bio">
						{#snippet children({ props })}
							<MultilineInput
								{...props}
								placeholder="Tell us about yourself..."
								bind:value={submitForm.data.bio}
							/>
						{/snippet}
					</Form.Field>
				</Form.Section>
			</Form.Root>

			<div style="display: flex; justify-content: flex-end;">
				<Button
					type="submit"
					onclick={() => submitForm.submit()}
					disabled={submitForm.submitting}
					label={submitForm.submitting ? 'Creating Account...' : 'Create Account'}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Auto-Save Form">
	{#snippet template()}
		<Form.Root form={autoSaveForm}>
			<Form.Section title="Server Configuration">
				<Form.Field form={autoSaveForm} name="serverName" label="Server Name" required>
					{#snippet children({ props })}
						<Input
							{...props}
							placeholder="Enter server name..."
							bind:value={autoSaveForm.data.serverName}
						/>
					{/snippet}
				</Form.Field>

				<Form.Column>
					<Form.Field form={autoSaveForm} name="environment" label="Environment">
						{#snippet children({ props })}
							<DropdownSelector
								{...props}
								type="single"
								items={environmentOptions}
								bind:value={autoSaveForm.data.environment}
							/>
						{/snippet}
					</Form.Field>

					<Form.Field form={autoSaveForm} name="region" label="Region">
						{#snippet children({ props })}
							<DropdownSelector
								{...props}
								type="single"
								items={regionOptions}
								bind:value={autoSaveForm.data.region}
							/>
						{/snippet}
					</Form.Field>
				</Form.Column>

				<Form.Field form={autoSaveForm} name="maxConnections" label="Max Connections">
					{#snippet children({ props })}
						<Input
							{...props}
							type="number"
							min={1}
							max={1000}
							bind:value={autoSaveForm.data.maxConnections}
						/>
					{/snippet}
				</Form.Field>

				<Form.Field form={autoSaveForm} name="description" label="Description">
					{#snippet children({ props })}
						<MultilineInput
							{...props}
							placeholder="Server description and notes..."
							bind:value={autoSaveForm.data.description}
						/>
					{/snippet}
				</Form.Field>
			</Form.Section>
		</Form.Root>

		<div style="padding: 16px; margin-top: 32px; background: #f8f9fa; border-radius: 8px;">
			<h4 style="margin: 0 0 12px;">External Updates</h4>
			<p style="margin: 0 0 16px; font-size: 14px; color: #666;">
				Simulate receiving updates from WebSocket or API responses:
			</p>
			<Button onclick={handleExternalUpdate} variant="secondary" label="Simulate Server Update" />
			<div style="margin-top: 16px;">
				<CollapsibleWindow>
					{#snippet trigger()}
						Current Form Data
					{/snippet}
					{#snippet content()}
						<pre
							style="padding: 12px; margin-top: 8px; overflow: auto; font-size: 12px; background: white; border-radius: 4px;">{JSON.stringify(
								autoSaveForm.data,
								null,
								2
							)}</pre>
					{/snippet}
				</CollapsibleWindow>
			</div>
		</div>
	{/snippet}
</Story>
