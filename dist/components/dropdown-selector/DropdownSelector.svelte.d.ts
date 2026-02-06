import { Select as SelectPrimitive, type WithoutChildren } from 'bits-ui';
import DropdownSelector from '.';
import type { IconName } from '../icon';
export type DropdownSelectorProps<T extends {
    value: string;
    label: string;
    disabled?: boolean;
}> = Omit<WithoutChildren<SelectPrimitive.RootProps>, 'children'> & {
    placeholder?: string;
    contentProps?: WithoutChildren<SelectPrimitive.Content>;
    showAsBadges?: boolean;
    allowDelete?: boolean;
    items?: T[];
    variant?: 'default' | 'invisible';
    class?: string;
    icon?: IconName;
    fullWidth?: boolean;
    name?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    'aria-errormessage'?: string;
    'aria-required'?: boolean;
    'aria-busy'?: boolean;
};
declare function $$render<T extends {
    value: string;
    label: string;
    disabled?: boolean;
}>(): {
    props: DropdownSelectorProps<T>;
    exports: {};
    bindings: "value";
    slots: {};
    events: {};
};
declare class __sveltets_Render<T extends {
    value: string;
    label: string;
    disabled?: boolean;
}> {
    props(): ReturnType<typeof $$render<T>>['props'];
    events(): ReturnType<typeof $$render<T>>['events'];
    slots(): ReturnType<typeof $$render<T>>['slots'];
    bindings(): "value";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T extends {
        value: string;
        label: string;
        disabled?: boolean;
    }>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T extends {
        value: string;
        label: string;
        disabled?: boolean;
    }>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {}): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const DropdownSelector: $$IsomorphicComponent;
type DropdownSelector<T extends {
    value: string;
    label: string;
    disabled?: boolean;
}> = InstanceType<typeof DropdownSelector<T>>;
export default DropdownSelector;
