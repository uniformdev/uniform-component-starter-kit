import { FC, useMemo, useEffect } from 'react';
import { useUniformContext } from '@uniformdev/context-react';
import { EnrichmentSetterProps } from '.';

export const EnrichmentSetter: FC<EnrichmentSetterProps> = ({ enrichments: baseEnrichments = [] }) => {
  const { context } = useUniformContext();

  const enrichments = useMemo(
    () =>
      baseEnrichments.map(enrichment => ({
        cat: enrichment?.fields?.cat?.value,
        key: enrichment?.fields?.key?.value,
        str: enrichment?.fields?.str?.value,
      })),
    [baseEnrichments]
  );

  useEffect(() => {
    context.update({ enrichments });
  }, [context, enrichments]);

  return null;
};
