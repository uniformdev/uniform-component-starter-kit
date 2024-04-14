/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { ComponentProps, UniformSlot, registerUniformComponent } from '@uniformdev/canvas-react';
// @ts-ignore: Expected error if the module is not yet installed
import { buildFacet, buildSearchBox, FacetState } from '@coveo/headless';
import { getHeadlessEngine, HeadlessEngineContext } from './Engine';
import Container from '../../components/Container';
import { PaddingSize } from '../../utilities/styling';

type SearchProviderProps = ComponentProps<{
  [name: string]: string;
}>;

// Coveo Facet docs https://docs.coveo.com/en/headless/latest/reference/search/controllers/facet/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SearchProvider: FC<SearchProviderProps> = ({ component, ...facet }) => {
  const rootFacetName = Object.keys(facet)?.[0];
  const rootFacetValue = facet[rootFacetName] || '';

  const headlessEngine = useMemo(() => getHeadlessEngine(), []);
  const headlessFacets = useMemo(
    () =>
      rootFacetName
        ? buildFacet(headlessEngine, {
            options: {
              field: rootFacetName,
            },
          })
        : null,
    [rootFacetName, headlessEngine]
  );

  const headlessSearchBox = useMemo(() => buildSearchBox(headlessEngine), [headlessEngine]);

  const [facetState, setFacetState] = useState<FacetState | null>(headlessFacets?.state || null);

  useEffect(() => headlessFacets?.subscribe(() => setFacetState(headlessFacets.state)), [headlessFacets]);

  const currentSubCategory = useMemo(
    // @ts-ignore: Expected error if the module is not yet installed
    () => facetState?.values.find(v => v.value === rootFacetValue),
    [facetState?.values, rootFacetValue]
  );

  useEffect(() => {
    if (!headlessSearchBox.state.isLoading) {
      if (currentSubCategory && currentSubCategory.state === 'idle') {
        headlessFacets?.toggleSingleSelect(currentSubCategory);
      } else if (!currentSubCategory) {
        headlessSearchBox.submit();
      }
    }
  }, [currentSubCategory, headlessEngine, headlessFacets, headlessSearchBox]);

  const hidden = useMemo(
    () => rootFacetValue && (!currentSubCategory || currentSubCategory?.state === 'idle'),
    [currentSubCategory, rootFacetValue]
  );

  return (
    <div className={classNames({ hidden: hidden })}>
      <HeadlessEngineContext.Provider value={headlessEngine}>
        <Container paddingBottom={PaddingSize.None} paddingTop={PaddingSize.None}>
          <UniformSlot name="searchContent" />
        </Container>
      </HeadlessEngineContext.Provider>
    </div>
  );
};

registerUniformComponent({
  type: 'coveo-searchProvider',
  component: SearchProvider,
});

export default SearchProvider;
