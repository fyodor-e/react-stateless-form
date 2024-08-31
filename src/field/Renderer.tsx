import { FC, ReactNode, memo } from "react";

type RendererProps<ComponentProps extends {}> = {
  Component: FC<ComponentProps>;
} & ComponentProps;

const Renderer = ({ Component, ...restProps }: RendererProps<any>) => (
  <Component {...restProps} />
);

const MemoizedRenderer = memo(Renderer) as <ComponentProps extends {}>(
  props: RendererProps<ComponentProps>,
) => ReactNode;

export default MemoizedRenderer;
