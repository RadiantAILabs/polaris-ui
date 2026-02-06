import * as ResizablePrimitive from 'paneforge';
import type { WithoutChildrenOrChild } from 'bits-ui';
type $$ComponentProps = WithoutChildrenOrChild<ResizablePrimitive.PaneResizerProps> & {
    disabled?: boolean;
};
declare const ResizableHandle: import("svelte").Component<$$ComponentProps, {}, "ref">;
type ResizableHandle = ReturnType<typeof ResizableHandle>;
export default ResizableHandle;
