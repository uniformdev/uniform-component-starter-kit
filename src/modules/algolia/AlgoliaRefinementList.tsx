/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from 'react';
// @ts-ignore: Expected error if the module is not yet installed
import { RefinementList } from 'react-instantsearch';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { withErrorCallout } from '../../hocs/withErrorCallout';
import ErrorPropertyCallout from '../../components/ErrorPropertyCallout';

type Props = {
  refinementListParams?: {
    refinementListProps?: {
      allowedIndex?: string;
      attribute: string;
      operator: 'and' | 'or';
      limit?: number;
      showMore?: boolean;
      showMoreLimit?: number;
      searchable?: boolean;
      searchablePlaceholder?: string;
      escapeFacetValues?: boolean;
    };
  };
};

// To remove prefixes in the facet name
const REGEX_PREFIX = /^(sub|root)/g;

const AlgoliaRefinementList: FC<ComponentProps<Props>> = ({ refinementListParams }) => {
  const { refinementListProps } = refinementListParams || {};

  if (!refinementListProps || !refinementListProps.attribute) {
    return <ErrorPropertyCallout classNames="py-3" title="Property 'attribute' was not defined for component." />;
  }

  // allowedIndex attribute is absent in the RefinementList properties of the Algolia component.
  // To avoid warnings in the console, form only necessary properties
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { allowedIndex, ...algoliaRefinementListProps } = refinementListProps;

  return (
    <div className="w-full flex justify-center">
      <div className="pt-12 pr-10 inline-flex flex-col lg:w-full first:pt-2 min-h-[250px]">
        <span className="font-extrabold text-lg capitalize text-black">
          {refinementListProps?.attribute?.replace(REGEX_PREFIX, '')}
        </span>
        <RefinementList
          {...algoliaRefinementListProps}
          classNames={{
            item: 'mt-4 px-2 hover:opacity-30 text-secondary-content',
            checkbox: 'hidden',
            selectedItem:
              'rounded whitespace-nowrap py-1.5 px-2 hover:opacity-30 text-white bg-primary my-1 text-primary-content',
            showMore: 'border-2 uppercase font-bold text-sm text-center px-8 py-2.5 my-2 hover:border-black',
            disabledShowMore: 'pointer-events-none opacity-60',
            label: 'cursor-pointer flex justify-between items-center pr-3',
            labelText: 'capitalize pr-4 flex-1 ',
            count: 'bg-gray-50 rounded-full px-2 text-secondary-content',
          }}
        />
      </div>
    </div>
  );
};

// TODO: think how to translate errors
registerUniformComponent({
  type: 'algolia-refinementList',
  component: withErrorCallout(
    AlgoliaRefinementList,
    'Something went wrong. Please use Refinement List components only inside the Instant Search component'
  ),
});

export default AlgoliaRefinementList;
