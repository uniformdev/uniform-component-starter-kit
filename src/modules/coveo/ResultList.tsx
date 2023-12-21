/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { ComponentInstance, RootComponentInstance } from '@uniformdev/canvas';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
// @ts-ignore: Expected error if the module is not yet installed
import { buildResultList, Result } from '@coveo/headless';
import { HeadlessEngineContext } from './Engine';
import ResultItem, { ResultItemStyles } from './ResultItem';
import InformationContent from '../../components/InformationContent';

enum ItemTypes {
  Item = 'coveo-resultListItem',
}

const COVEO_FIELDS_TO_INCLUDE = [
  'slug',
  'description',
  'ec_description',
  'ec_category',
  'name',
  'ec_thumbnails',
  'sub_category',
];

type ResultListProps = ComponentProps<{
  itemStyles?: ResultItemStyles;
}>;

// Coveo Result List docs https://docs.coveo.com/en/headless/latest/reference/search/controllers/result-list/
const ResultList: FC<ResultListProps> = ({ component, itemStyles }) => {
  const headlessEngine = useContext(HeadlessEngineContext);
  const headlessResultList = useMemo(
    () =>
      buildResultList(headlessEngine, {
        options: {
          fieldsToInclude: COVEO_FIELDS_TO_INCLUDE,
        },
      }),
    [headlessEngine]
  );

  const [resultState, setResultState] = useState(headlessResultList.state);

  useEffect(() => headlessResultList.subscribe(() => setResultState(headlessResultList.state)), [headlessResultList]);

  const renderResultItem = (component: ComponentInstance, item: Result) => {
    const currentComponent = (component?.slots?.resultItemComponent?.[0] as RootComponentInstance) || {};

    switch (currentComponent?.type) {
      case ItemTypes.Item:
        return <ResultItem item={item} key={item.uniqueId} component={currentComponent} styles={itemStyles} />;
      default:
        return (
          <div
            className="border border-gray-300 p-4 rounded-md mb-4 flex items-center justify-center"
            key={item.uniqueId}
          >
            <span>Add your custom Result Item</span>
          </div>
        );
    }
  };

  if (!resultState.results?.length) return <InformationContent title="Sorry there are no products for this filter" />;

  return (
    <div className="grid gap-y-3 mb-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-8 sm:gap-y-6 lg:gap-x-8 lg:gap-y-5 sm:mb-0">
      {
        // @ts-ignore: Expected error if the module is not yet installed
        resultState.results.map(result => renderResultItem(component, result))
      }
    </div>
  );
};

registerUniformComponent({
  type: 'coveo-resultList',
  component: ResultList,
});

export default ResultList;
