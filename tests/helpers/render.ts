import { experimental_AstroContainer as AstroContainer, type ContainerRenderOptions } from 'astro/container';

type Component = Parameters<InstanceType<typeof AstroContainer>['renderToString']>[0];

let container: AstroContainer | undefined;

export async function render(component: Component, options: ContainerRenderOptions = {}) {
  container ??= await AstroContainer.create();
  return container.renderToString(component, options);
}

export function page(component: Component, params: Record<string, string | undefined> = {}) {
  return render(component, { params, partial: false });
}
