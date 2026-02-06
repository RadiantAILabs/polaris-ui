export interface Tab {
    label: string;
}
export interface UnderlineNavProps {
    tabs: Tab[];
    activeTab?: string;
    onTabChange?: (value: string) => void;
    showBorder?: boolean;
}
declare const UnderlineNav: import("svelte").Component<UnderlineNavProps, {}, "activeTab">;
type UnderlineNav = ReturnType<typeof UnderlineNav>;
export default UnderlineNav;
