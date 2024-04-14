/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { ComponentProps, UniformText, registerUniformComponent } from '@uniformdev/canvas-react';
// @ts-ignore: Expected error if the module is not yet installed
import { FacetState, buildFacet, FacetValue, buildSearchBox } from '@coveo/headless';
import { HeadlessEngineContext } from './Engine';

type FacetProps = {
  field: string;
};

// Coveo Facet docs https://docs.coveo.com/en/headless/latest/reference/search/controllers/facet/
const Facet: FC<FacetProps> = ({ field }) => {
  const headlessEngine = useContext(HeadlessEngineContext);
  const headlessFacets = useMemo(
    () =>
      buildFacet(headlessEngine, {
        options: {
          field,
        },
      }),
    [field, headlessEngine]
  );

  const [facetState, setFacetState] = useState<FacetState>(headlessFacets.state);

  useEffect(() => headlessFacets.subscribe(() => setFacetState(headlessFacets.state)), [headlessFacets]);

  const headlessSearchBox = useMemo(() => buildSearchBox(headlessEngine), [headlessEngine]);

  const currentSubCategory = useMemo(
    // @ts-ignore: Expected error if the module is not yet installed
    () => facetState?.values.find(v => v.value === field),
    [facetState?.values, field]
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

  const toggleSelect = (value: FacetValue) => headlessFacets.toggleSelect(value);

  const getFacetValues = () =>
    facetState.values.map((value: FacetValue) => (
      <button
        className={classNames('mt-4 pl-2 hover:opacity-30 text-secondary-content', {
          'rounded whitespace-nowrap py-1.5 px-2 hover:opacity-30 bg-primary my-1 text-primary-content':
            headlessFacets.isValueSelected(value),
        })}
        key={value.value}
        onClick={() => {
          toggleSelect(value);
        }}
      >
        <label className="cursor-pointer flex justify-between items-center pr-3 text-start">
          <span
            className={classNames('capitalize pr-4', {
              'text-primary-content': headlessFacets.isValueSelected(value),
            })}
          >
            {value.value}
          </span>
          <span className="bg-gray-50 rounded-full px-2 text-secondary-content">{value.numberOfResults}</span>
        </label>
      </button>
    ));

  return <div className="flex flex-col gap-2 flex-wrap">{getFacetValues()}</div>;
};

type FacetConfigurationProps = ComponentProps<{
  facet?: {
    facetConfiguration?: {
      field?: string;
    };
  };
  title?: string;
}>;

const FacetConfiguration: FC<FacetConfigurationProps> = ({ facet }) => {
  const { field = '' } = facet?.facetConfiguration || {};

  if (!field) {
    return <p className="text-black">Facet field must be provided</p>;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="pt-12 pr-10 inline-flex flex-col w-full first:pt-2 min-h-[250px]">
        <UniformText
          parameterId="title"
          placeholder="Title goes here"
          className="font-extrabold text-lg capitalize text-black"
        />
        <Facet key={field} field={field} />
      </div>
    </div>
  );
};

registerUniformComponent({
  type: 'coveo-facet',
  component: FacetConfiguration,
});

export default FacetConfiguration;
