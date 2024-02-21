/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useMemo } from 'react';
// @ts-ignore: Expected error if the module is not yet installed
import algoliasearch from 'algoliasearch/lite';
// @ts-ignore: Expected error if the module is not yet installed
import { Configure, InstantSearch } from 'react-instantsearch';
import { useScores } from '@uniformdev/context-react';
import { ComponentProps, UniformSlot, registerUniformComponent } from '@uniformdev/canvas-react';
import { fromCamelCaseText } from '../../utilities';
import ErrorPropertyCallout from '../../components/ErrorPropertyCallout';

const algoliaApplicationId = process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID || '';
const algoliaSearchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || '';

const searchClient = algoliasearch(algoliaApplicationId, algoliaSearchKey);

type Props = {
  title?: string;
  rootCategory?: string;
  instantSearchParams?: {
    instantSearchProps?: {
      indexName: string;
      stalledSearchDelay?: number;
    };
  };
};

const prefixScore = 'subCategory_';

const AlgoliaInstantSearch: FC<ComponentProps<Props>> = ({ instantSearchParams, rootCategory = '' }) => {
  const scores = useScores();
  const { instantSearchProps } = instantSearchParams || {};

  // Optional filters: https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/in-depth/optional-filters/#filter-scoring
  const boostFacetFilters: string[] = useMemo(
    () =>
      Object.keys(scores)
        .filter(key => key.startsWith(prefixScore))
        .map(key => `subCategories:${fromCamelCaseText(key.replace(prefixScore, ''))}<score=${scores[key] || 0}>`),
    [scores]
  );

  if (!instantSearchProps || !instantSearchProps.indexName) {
    return <ErrorPropertyCallout classNames="py-3" title="Property 'indexName' was not defined for component." />;
  }

  return (
    <InstantSearch {...instantSearchProps} searchClient={searchClient}>
      <Configure
        sumOrFiltersScores={true}
        facetFilters={[[...boostFacetFilters, `rootCategories:${rootCategory}`], `rootCategories:${rootCategory}`]}
      />
      <UniformSlot name="widgets" />
    </InstantSearch>
  );
};

registerUniformComponent({
  type: 'algolia-instantSearch',
  component: AlgoliaInstantSearch,
});

export default AlgoliaInstantSearch;
