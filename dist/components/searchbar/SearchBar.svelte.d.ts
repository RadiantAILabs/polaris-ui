import { type InputProps } from '../input';
export type SearchBarProps = Omit<InputProps, 'type' | 'icon'>;
declare const SearchBar: import("svelte").Component<SearchBarProps, {}, "value">;
type SearchBar = ReturnType<typeof SearchBar>;
export default SearchBar;
