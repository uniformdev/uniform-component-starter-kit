/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
// @ts-ignore: Expected error if the module is not yet installed
import { buildQuerySummary, QuerySummaryState } from '@coveo/headless';
import { useTranslations } from 'next-intl';
import { HeadlessEngineContext } from './Engine';

enum DurationSetting {
  milliseconds = 'milliseconds',
  seconds = 'seconds',
}

type QuerySummaryProps = ComponentProps<{
  title?: string;
  durationSettings?: DurationSetting;
}>;

// Coveo Pager docs https://docs.coveo.com/en/headless/latest/reference/search/controllers/query-summary/
const QuerySummary: FC<QuerySummaryProps> = ({ title, durationSettings = DurationSetting.seconds }) => {
  const t = useTranslations();
  const headlessEngine = useContext(HeadlessEngineContext);

  const headlessQuerySummary = useMemo(() => buildQuerySummary(headlessEngine), [headlessEngine]);
  const [querySummaryState, setQuerySummaryState] = useState<QuerySummaryState>(headlessQuerySummary.state);
  useEffect(
    () => headlessQuerySummary.subscribe(() => setQuerySummaryState(headlessQuerySummary.state)),
    [headlessQuerySummary]
  );

  const {
    hasResults,
    hasQuery,
    hasDuration,
    firstResult,
    lastResult,
    total,
    query,
    durationInSeconds,
    durationInMilliseconds,
  } = querySummaryState;

  if (!hasResults) {
    return null;
  }

  const summary = [`${t('Results')} ${firstResult}-${lastResult} ${t('of')} ${total}`];

  if (hasQuery) {
    summary.push(`${t('for')} ${query}`);
  }

  if (hasDuration) {
    summary.push(
      durationSettings === DurationSetting.milliseconds
        ? `${t('in')} ${durationInMilliseconds} ${t('milliseconds')}`
        : `${t('in')} ${durationInSeconds} ${t('seconds')}`
    );
  }

  return (
    <div>
      <p className="text-l font-bold">{title}</p>
      <p>{summary.join(' ')}</p>
    </div>
  );
};

registerUniformComponent({
  type: 'coveo-querySummary',
  component: QuerySummary,
});

export default QuerySummary;
