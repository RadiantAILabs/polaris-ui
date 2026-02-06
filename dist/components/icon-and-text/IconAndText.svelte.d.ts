import type { HTMLAttributes } from 'svelte/elements';
import type { IconName } from '../icon/icon-registry';
export interface IconAndTextProps extends HTMLAttributes<HTMLDivElement> {
    icon?: IconName;
    text: string;
    size?: 'base' | 'large';
    variant?: 'default' | 'error';
}
declare const IconAndText: import("svelte").Component<IconAndTextProps, {}, "">;
type IconAndText = ReturnType<typeof IconAndText>;
export default IconAndText;
