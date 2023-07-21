import Widget, { WidgetParameters } from '@/components/Widget';
import widgets, { datasourceFetchers } from '@ossinsight/widgets';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

type Props = { params: { vendor: string, name: string }, searchParams: Record<string, string> };

export default async function Page ({ params, searchParams }: Props) {
  if (params.vendor !== 'official') {
    notFound();
  }

  const name = `@ossinsight/widget-${decodeURIComponent(params.name)}`;
  if (!(name in datasourceFetchers)) {
    notFound();
  }
  const fetcher = datasourceFetchers[name];

  const data = await fetcher({
    runtime: 'server',
    parameters: searchParams,
  });

  return (
    <main className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-700">Widget landing page prototype</h1>
      <div className="p-4 border-dashed border-2 rounded-2xl">
        <WidgetParameters widgetName={name} />
      </div>
      <Widget name={name} params={searchParams} data={data} />
      <div className="p-4 border-dashed border-2 rounded-2xl">
        <p className="text-gray-400">
          Share operations will be placed here
        </p>
      </div>
    </main>
  );
}

export function generateMetadata ({ params, searchParams }: Props): Metadata {
  const requestHeaders = headers();
  const host = requestHeaders.get('host');

  const name = `@ossinsight/widget-${decodeURIComponent(params.name)}`;

  const widget = widgets[name];

  if (!widget) {
    return {};
  }

  const usp = new URLSearchParams(searchParams);
  const twitterImageUsp = new URLSearchParams(usp);

  twitterImageUsp.set('width', '800');
  twitterImageUsp.set('height', '418');
  twitterImageUsp.set('dpr', '2');

  return {
    description: widget.description,
    title: decodeURIComponent(params.name),
    keywords: ['OSSInsight', 'OSSInsight Widget', 'GitHub Analytics'].concat(...(widget.keywords ?? [])),
    openGraph: {
      title: decodeURIComponent(params.name),
      tags: widget.keywords,
      description: widget.description,
      images: [`${protocol}://${host}/widgets/${params.vendor}/${params.name}/thumbnail.png?${usp.toString()}`],
    },
    twitter: {
      title: decodeURIComponent(params.name),
      description: widget.description,
      card: 'summary_large_image',
      images: [`${protocol}://${host}/widgets/${params.vendor}/${params.name}/thumbnail.png?${twitterImageUsp.toString()}`],
    },
  };
}

const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
