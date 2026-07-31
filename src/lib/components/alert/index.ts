import Root from './Alert.svelte';
import Title from './AlertTitle.svelte';
import Description from './AlertDescription.svelte';
import Action from './AlertAction.svelte';

export { type AlertProps, type AlertVariant } from './Alert.svelte';
export { type AlertTitleProps } from './AlertTitle.svelte';
export { type AlertDescriptionProps } from './AlertDescription.svelte';
export { type AlertActionProps } from './AlertAction.svelte';

export {
	Root,
	Title,
	Description,
	Action,
	//
	Root as Alert,
	Title as AlertTitle,
	Description as AlertDescription,
	Action as AlertAction
};
