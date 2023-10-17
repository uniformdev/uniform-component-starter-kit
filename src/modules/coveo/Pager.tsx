/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
// @ts-ignore: Expected error if the module is not yet installed
import { buildPager, PagerState, buildResultsPerPage, ResultsPerPageState, buildSearchBox } from '@coveo/headless';
import { HeadlessEngineContext } from './Engine';
import Button from '../../components/Button';

type PagerProps = ComponentProps<{
  numberOfResults?: string;
  numberOfPages?: string;
}>;

// Coveo Pager docs https://docs.coveo.com/en/headless/latest/reference/search/controllers/pager/
const Pager: FC<PagerProps> = ({ numberOfResults = '10', numberOfPages = '3' }) => {
  const headlessEngine = useContext(HeadlessEngineContext);

  const headlessResultsPerPage = useMemo(
    () => buildResultsPerPage(headlessEngine, { initialState: { numberOfResults: Math.abs(Number(numberOfResults)) } }),
    [headlessEngine, numberOfResults]
  );
  const [, setResultsPerPageState] = useState<ResultsPerPageState>(headlessResultsPerPage.state);
  useEffect(
    () => headlessResultsPerPage.subscribe(() => setResultsPerPageState(headlessResultsPerPage.state)),
    [headlessResultsPerPage]
  );

  const headlessPager = useMemo(
    () => buildPager(headlessEngine, { options: { numberOfPages: Math.abs(Number(numberOfPages)) } }),
    [headlessEngine, numberOfPages]
  );
  const [pagerState, setPagerState] = useState<PagerState>(headlessPager.state);
  useEffect(() => headlessPager.subscribe(() => setPagerState(headlessPager.state)), [headlessPager]);

  const headlessSearchBox = useMemo(() => buildSearchBox(headlessEngine), [headlessEngine]);
  useEffect(() => {
    if (!headlessSearchBox.state.isLoading && headlessResultsPerPage.state.numberOfResults) {
      headlessSearchBox.submit();
    }
  }, [headlessSearchBox, headlessResultsPerPage]);

  return (
    <div className="flex flex-row items-center justify-center gap-2 [&>*]:border-none">
      <Button
        onClick={() => headlessPager.previousPage()}
        disable={!pagerState.hasPreviousPage}
        copy="«"
        style="ghost"
      />
      {
        // @ts-ignore: Expected error if the module is not yet installed
        pagerState.currentPages.map(page => (
          <Button
            key={page}
            disable={headlessPager.isCurrentPage(page)}
            onClick={() => headlessPager.selectPage(page)}
            copy={page}
            style="primary"
          />
        ))
      }
      <Button disable={!pagerState.hasNextPage} onClick={() => headlessPager.nextPage()} copy="»" style="ghost" />
    </div>
  );
};

registerUniformComponent({
  type: 'coveo-pager',
  component: Pager,
});

export default Pager;
