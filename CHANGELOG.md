# Changelog

All notable changes to `@radiantailabs/polaris-ui` are documented here. This
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.3.0

### Added

- `DataTable` per-column filtering via a `filter` config on `DataTableColumn`.
  `{ kind: 'search' }` renders a text input; `{ kind: 'select' }` renders a
  multi-select dropdown. Supports an `accessor` to filter on a value other than
  the displayed cell text, and explicit `select` `options`.
- `DataTable` `onFilterChange` and bindable `filters` props for caller-owned
  (e.g. server-side, paginated) filtering. `onFilterChange` is debounced 300ms.
- `DataTableColumn.sortable` to opt a column out of sorting, and
  `DataTableColumn.align` (`'start' | 'end'`) to right-align a column.
- Exported types `ColumnFilter` and `ColumnType`.
- `DropdownSelector` and `Input` `label` prop: a field name shown inside the
  control before the value/placeholder.
- `DropdownSelector` `clearable` prop: a clear ("x") button that resets the
  selection.
- `Table.BodyCell` `tabularNumbers` and `alignment` props; `Table.HeaderCell`
  `alignment` prop.
- `$shadow-raised` SCSS token for raised-surface elevation.

### Changed

- `DataTableColumn.type` with `'number'` now renders the column with tabular
  figures.
- Table header cells now use the secondary text color and `body-base-regular`
  type ramp (previously primary color and `button-base`). Affects all tables.
- `Dialog` open/close animations are shorter and are disabled under
  `prefers-reduced-motion`. Fixes a side-sheet focus bounce on open.
- Lowered `background-hidden` overlay opacity (light 70% to 40%, dark 70% to
  50%) and lightened `sidebar-button-background-active` in light theme.

### Removed / Breaking

- `DataTableColumn.sortType` renamed to `type`. Update every column definition.
- Removed `DataTable` `searchable`, `searchableColumns`, and `searchPlaceholder`
  props. Use per-column `filter` configs instead.
