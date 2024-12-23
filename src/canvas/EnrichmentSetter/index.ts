import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { EnrichmentSetter } from './EnrichmentSetter';

type Enrichment = {
  fields: {
    cat: {
      value: string;
    };
    key: {
      value: string;
    };
    str: {
      value: number;
    };
  };
};

export type EnrichmentSetterProps = ComponentProps<{
  enrichments: Enrichment[];
}>;

registerUniformComponent({
  type: 'enrichmentSetter',
  component: EnrichmentSetter,
});

export default EnrichmentSetter;
