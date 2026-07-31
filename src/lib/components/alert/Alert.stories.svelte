<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Alert from './Alert.svelte';
	import AlertTitle from './AlertTitle.svelte';
	import AlertDescription from './AlertDescription.svelte';
	import AlertAction from './AlertAction.svelte';
	import { Icon } from '../icon';
	import { Button } from '../button';

	const { Story } = defineMeta({
		title: 'Components/Alert',
		component: Alert,
		parameters: {
			layout: 'padded'
		},
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'success', 'warning', 'error'],
				description: 'Visual variant'
			}
		}
	});
</script>

<Story name="Variants">
	{#snippet template()}
		<div style="display: grid; gap: 1rem; max-width: 40rem;">
			<Alert variant="default">
				<Icon name="alert-circle" size="base" variant="tertiary" />
				<AlertTitle>Heads up</AlertTitle>
				<AlertDescription>This is a default alert with some information.</AlertDescription>
			</Alert>

			<Alert variant="success">
				<Icon name="check-circle" size="base" variant="success" />
				<AlertTitle>Changes saved</AlertTitle>
				<AlertDescription>Your changes have been saved successfully.</AlertDescription>
			</Alert>

			<Alert variant="warning">
				<Icon name="alert-circle" size="base" variant="warning" />
				<AlertTitle>Review these changes before continuing.</AlertTitle>
			</Alert>

			<Alert variant="error">
				<Icon name="alert-circle" size="base" variant="error" />
				<AlertTitle>Unable to process your payment.</AlertTitle>
				<AlertDescription>Please verify your billing information and try again.</AlertDescription>
			</Alert>
		</div>
	{/snippet}
</Story>

<Story name="With action">
	{#snippet template()}
		<div style="max-width: 40rem;">
			<Alert>
				<Icon name="alert-circle" size="base" variant="tertiary" />
				<AlertTitle>New version available</AlertTitle>
				<AlertDescription>A new version of the app is ready to install.</AlertDescription>
				<AlertAction>
					<Button size="small" variant="invisible" label="Dismiss" />
				</AlertAction>
			</Alert>
		</div>
	{/snippet}
</Story>

<Story name="With inline code">
	{#snippet template()}
		<div style="max-width: 40rem;">
			<Alert>
				<Icon name="alert-circle" size="base" variant="tertiary" />
				<AlertDescription>
					Found 3 unidentified agent spans. Add <code>gen_ai.agent.id</code> or
					<code>gen_ai.agent.name</code> to include them in the Agents view.
				</AlertDescription>
			</Alert>
		</div>
	{/snippet}
</Story>
