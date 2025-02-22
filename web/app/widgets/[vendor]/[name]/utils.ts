import { isWidget, widgetParameterDefinitions } from '@/utils/widgets';
import { resolveParameters } from '@ossinsight/widgets-core/src/parameters/resolver';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export type WidgetPageProps = { params: { vendor: string, name: string }, searchParams: Record<string, string> };

export const widgetPageParams = cache((params: WidgetPageProps['params']) => {
  if (params.vendor !== 'official') {
    notFound();
  }

  const name = `@ossinsight/widget-${decodeURIComponent(params.name)}`;
  if (!isWidget(name)) {
    notFound();
  }

  return {
    vendor: decodeURIComponent(params.vendor),
    name,
  };
});

export function widgetSignature (props: WidgetPageProps) {
  return JSON.stringify(props);
}

export const makeLinkedData = cache((name: string, searchParams: Record<string, string>) => {
  return widgetParameterDefinitions(name).then(paramDef => resolveParameters(paramDef, searchParams));
});
