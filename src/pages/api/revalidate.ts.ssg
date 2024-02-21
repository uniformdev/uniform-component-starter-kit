import type { NextApiRequest, NextApiResponse } from 'next';
import { getProjectMapClient } from '../../utilities/canvas/canvasClients';
import localizationSettings from '@/context/locales.json';

// Vercel specific, Incremental Static Regeneration. more info https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { locales = [] } = localizationSettings || {};
  const secret = req.query.secret as string | undefined;

  if (secret !== process.env.UNIFORM_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Secret was not provided or it does not match' });
  }

  const compositionId = (req.body?.composition_id as string | undefined) || (req.body?.id as string | undefined);
  if (!compositionId || typeof compositionId !== 'string') {
    return res.status(401).json({ message: 'Composition id is not provided' });
  }

  const { nodes } = await getProjectMapClient().getNodes({ compositionId });
  const pathsToRevalidate: string[] | undefined = nodes
    ?.map(node => node?.path)
    .map(path => {
      if (locales?.length) {
        return locales.map((locale: string) => path.replace(`/:locale`, `/${locale}`));
      }
      return [path.replace(`/:locale`, '')];
    })
    .flat();

  if (!pathsToRevalidate || pathsToRevalidate.length <= 0) {
    return res.status(404).json({ message: 'Paths could not be resolved for composition: ' + compositionId });
  }

  try {
    console.log(`Revalidating paths: '${pathsToRevalidate}'`);
    await Promise.all(
      (pathsToRevalidate || []).map(async pagePath => {
        console.log(`Revalidating path: '${pagePath}'`);
        await res.revalidate(pagePath);
      })
    );
    console.log('revalidated: true');
    return res.json({ revalidated: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).json({ message: err.message, compositionId, query: req.query, body: req.body });
  }
}
