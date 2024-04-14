/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore: Expected error if the module is not yet installed
import { Index } from 'react-instantsearch';
import { ComponentProps, registerUniformComponent, UniformSlot } from '@uniformdev/canvas-react';
import ErrorPropertyCallout from '../../components/ErrorPropertyCallout';
import { withErrorCallout } from '../../hocs/withErrorCallout';

type CanvasIndexProps = {
  indexParams?: {
    indexProps?: {
      indexName?: string;
      indexId?: string;
    };
  };
};

const AlgoliaIndex = (componentProps: ComponentProps<CanvasIndexProps>) => {
  const { indexProps } = componentProps?.indexParams || {};
  const indexName = indexProps?.indexName;

  if (!indexName) {
    return <ErrorPropertyCallout title="Property 'indexName' was not defined for component." />;
  }

  return (
    <div className="index">
      <Index {...indexProps} indexName={indexName}>
        <UniformSlot name="widgets" />
      </Index>
    </div>
  );
};

// TODO: think how to translate errors
registerUniformComponent({
  type: 'algolia-index',
  component: withErrorCallout(
    AlgoliaIndex,
    'Something went wrong. Please use Pagination components only inside the Instant Search component'
  ),
});

export default AlgoliaIndex;
