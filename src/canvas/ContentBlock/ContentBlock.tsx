import { FC, Fragment, PropsWithChildren } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { Next, documentToHtmlString, Options } from '@contentful/rich-text-html-renderer';
import { BLOCKS, NodeData } from '@contentful/rich-text-types';
import { UniformText } from '@uniformdev/canvas-react';
import { getTextClass } from '../../utilities/styling';
import { ContentBlockProps } from '.';

const documentToHtmlStringOptions: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: NodeData, next: Next) => `<p class="pb-10 text-lg">${next(node.content)}</p>`,
    [BLOCKS.HEADING_2]: (node: NodeData, next: Next) => `<h2 class="pb-2.5 text-2xl">${next(node.content)}</h2>`,
    [BLOCKS.EMBEDDED_ASSET]: (node: NodeData) =>
      `<div class="pb-12 lg:pb-16 max-w-4xl">
            <img src="${node.data.target.fields.file.url}" 
                    height="${node.data.target.fields.file.details.image.height}"
                    width="${node.data.target.fields.file.details.image.width}" alt="${node.data.target.fields.description}"/>
          </div>`,
  },
};

export const ContentBlock: FC<ContentBlockProps> = ({ titleStyle: TitleTag = 'h1', content = '', link, styles }) => {
  const Wrapper = link?.path
    ? ({ children }: PropsWithChildren) => {
        return <Link href={link?.path}>{children}</Link>;
      }
    : Fragment;

  return (
    <div
      className={'text-secondary-content items-center justify-between w-full gap-5 mx-auto lg:flex-nowrap rounded-xl'}
    >
      <Wrapper>
        <UniformText
          placeholder="Title goes here"
          parameterId="title"
          as={TitleTag}
          className={classNames('font-medium', getTextClass(TitleTag), styles?.title)}
        />
      </Wrapper>
      {content ? (
        <div
          className={classNames('py-6 text-xl prose [&>figure]:max-w-full', styles?.text)}
          dangerouslySetInnerHTML={{
            __html: typeof content === 'string' ? content : documentToHtmlString(content, documentToHtmlStringOptions),
          }}
        />
      ) : (
        <UniformText
          placeholder="Text goes here"
          parameterId="text"
          as={TitleTag}
          className={classNames('py-6 text-xl', styles?.text)}
        />
      )}
    </div>
  );
};
