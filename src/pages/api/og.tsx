import { NextApiHandler } from 'next';
import { ImageResponse } from '@vercel/og';
import classNames from 'classnames';

export const config = {
  runtime: 'edge',
};

const handler: NextApiHandler = async req => {
  try {
    const { searchParams } = new URL(req?.url || '');

    const title = searchParams.get('title');
    const image = searchParams.get('image');

    return new ImageResponse(
      (
        <div tw="flex relative w-full h-full justify-center items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {image && <img tw="absolute left-0 right-0 top-0 bottom-0" src={image} alt={title || 'og:image'} />}
          <div tw={classNames('text-white text-center text-7xl', { 'text-black': !image })}>{title}</div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
};

export default handler;
