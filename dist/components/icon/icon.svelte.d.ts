import type { HTMLAttributes } from 'svelte/elements';
import { type IconName } from './icon-registry';
export interface IconProps extends HTMLAttributes<SVGElement> {
    name: IconName;
    size?: string | number;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'inverse-primary' | 'warning' | 'error' | 'success';
    animation?: 'spin';
    hidden?: boolean;
    class?: string;
    disabled?: boolean | null;
}
declare const Icon: import("svelte").Component<IconProps, {}, "">;
type Icon = ReturnType<typeof Icon>;
export default Icon;
