import { type WithElementRef } from '../../utils';
import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
import type { IconName } from '../icon/icon-registry';
type InputType = Exclude<HTMLInputTypeAttribute, 'button' | 'checkbox' | 'file' | 'image' | 'radio' | 'range' | 'reset' | 'submit'>;
export type InputProps = WithElementRef<Omit<HTMLInputAttributes, 'type'> & {
    type?: InputType;
}> & {
    icon?: IconName;
};
declare const Input: import("svelte").Component<InputProps, {}, "value" | "ref">;
type Input = ReturnType<typeof Input>;
export default Input;
