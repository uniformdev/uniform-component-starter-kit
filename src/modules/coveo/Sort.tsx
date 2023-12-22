/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ComponentProps, registerUniformComponent, UniformText } from '@uniformdev/canvas-react';
import {
  buildSort,
  SortState,
  buildRelevanceSortCriterion,
  SortCriterion,
  buildDateSortCriterion,
  SortOrder,
  buildCriterionExpression,
  buildFieldSortCriterion,
  // @ts-ignore: Expected error if the module is not yet installed
} from '@coveo/headless';
import { HeadlessEngineContext } from './Engine';
import Dropdown from '../../components/Dropdown';

type BreadcrumbManagerProps = ComponentProps<{
  title?: string;
  fieldsForSort?: string[];
}>;

// Coveo Sort docs https://docs.coveo.com/en/headless/latest/reference/search/controllers/sort/
const Sort: FC<BreadcrumbManagerProps> = ({ title = '', fieldsForSort = [] }) => {
  const headlessEngine = useContext(HeadlessEngineContext);

  const headlessSort = useMemo(() => buildSort(headlessEngine), [headlessEngine]);
  const [sortState, setSortState] = useState<SortState>(headlessSort.state);
  useEffect(() => headlessSort.subscribe(() => setSortState(headlessSort.state)), [headlessSort]);

  const additionalCriteria = useMemo(
    () =>
      fieldsForSort
        .map(field => [
          [
            `${field[0].toUpperCase() + field.slice(1)} (Ascending)`,
            buildFieldSortCriterion(field, SortOrder.Ascending),
          ] as [string, SortCriterion],
          [
            `${field[0].toUpperCase() + field.slice(1)} (Descending)`,
            buildFieldSortCriterion(field, SortOrder.Descending),
          ] as [string, SortCriterion],
        ])
        .flat(),
    [fieldsForSort]
  );

  const criteria: [string, SortCriterion][] = useMemo(
    () => [
      ['Relevance', buildRelevanceSortCriterion()],
      ['Date (Ascending)', buildDateSortCriterion(SortOrder.Ascending)],
      ['Date (Descending)', buildDateSortCriterion(SortOrder.Descending)],
      ...additionalCriteria,
    ],
    [additionalCriteria]
  );

  const criteriaValue = useMemo(
    () => criteria.map(([criterionName]) => ({ label: criterionName, value: criterionName })),
    [criteria]
  );

  const setCriterionFromName = useCallback(
    (name: string | undefined) => {
      const currentCriterion = criteria.find(([criterionName]) => criterionName === name)!;
      if (currentCriterion) headlessSort.sortBy(currentCriterion[1]);
    },
    [criteria, headlessSort]
  );

  const getCurrentCriterion = useCallback(
    () => criteria.find(([, criterion]) => sortState.sortCriteria === buildCriterionExpression(criterion))!,
    [criteria, sortState.sortCriteria]
  );

  return (
    <div className="w-full flex justify-center">
      <div className="pr-10 inline-flex flex-col w-full mb-4">
        <UniformText parameterId="title" className="font-extrabold text-lg capitalize text-black mb-2" />
        <Dropdown
          optionsContainerClassName="bg-secondary"
          title={title}
          options={criteriaValue}
          value={getCurrentCriterion()[0]}
          onChange={setCriterionFromName}
          buttonClassName="ml-2"
        />
      </div>
    </div>
  );
};

registerUniformComponent({
  type: 'coveo-sort',
  component: Sort,
});

export default Sort;
