import type { HTMLAttributes } from 'svelte/elements';
import { type WithElementRef } from '../../utils';
export type RadioButtonProps = WithElementRef<HTMLAttributes<HTMLButtonElement>> & {
    checked?: boolean;
    disabled?: boolean;
};
declare const RadioButton: import("svelte").Component<RadioButtonProps, {}, "ref">;
type RadioButton = ReturnType<typeof RadioButton>;
export default RadioButton;
