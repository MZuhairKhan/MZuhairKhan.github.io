import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { profile } from '../data/profile';

export async function GET(context: APIContext): Promise<Response> {
  const papers = (await getCollection('papers', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: `Papers — ${profile.fullName}`,
    description: `Research outputs, theses, and writing by ${profile.fullName}.`,
    site: context.site ?? 'https://zuhair.fi',
    items: papers.map((paper) => ({
      title: paper.data.title,
      pubDate: paper.data.date,
      description: paper.data.abstract ?? '',
      link: `/papers/${paper.id}`,
      categories: paper.data.tags,
    })),
  });
}
