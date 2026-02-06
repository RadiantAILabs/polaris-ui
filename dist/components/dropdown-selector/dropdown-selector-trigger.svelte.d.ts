import { Select as SelectPrimitive } from 'bits-ui';
import type { IconName } from '../icon';
declare function $$render<T extends {
    value: string;
    label: string;
    disabled?: boolean;
}>(): {
    props: Omit<Omit<SelectPrimitive.TriggerProps, "child">, "value"> & {
        value?: T[];
        showAsBadges?: boolean;
        allowDelete?: boolean;
        onBadgeDelete?: (value: T["value"]) => void;
        variant?: "default" | "invisible";
        icon?: IconName;
        fullWidth?: boolean;
    };
    exports: {};
    bindings: "ref";
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
    bindings(): "ref";
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
declare const DropdownSelectorTrigger: $$IsomorphicComponent;
type DropdownSelectorTrigger<T extends {
    value: string;
    label: string;
    disabled?: boolean;
}> = InstanceType<typeof DropdownSelectorTrigger<T>>;
export default DropdownSelectorTrigger;
