/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
// @ts-ignore: Expected error if the module is not yet installed
import { buildBreadcrumbManager, BreadcrumbManagerState } from '@coveo/headless';
import { HeadlessEngineContext } from './Engine';
import Button from '../../components/Button';

type BreadcrumbManagerProps = ComponentProps<{
  title?: string;
}>;

// Coveo Breadcrumb Manager docs https://docs.coveo.com/en/headless/latest/reference/search/controllers/breadcrumb-manager/
const BreadcrumbManager: FC<BreadcrumbManagerProps> = ({ title }) => {
  const headlessEngine = useContext(HeadlessEngineContext);

  const headlessBreadcrumbManager = useMemo(() => buildBreadcrumbManager(headlessEngine), [headlessEngine]);
  const [breadcrumbManagerState, setBreadcrumbManagerState] = useState<BreadcrumbManagerState>(
    headlessBreadcrumbManager.state
  );
  useEffect(
    () => headlessBreadcrumbManager.subscribe(() => setBreadcrumbManagerState(headlessBreadcrumbManager.state)),
    [headlessBreadcrumbManager]
  );

  if (!breadcrumbManagerState?.hasBreadcrumbs) {
    return null;
  }

  return (
    <div>
      <p className="text-l font-bold">{title}</p>
      <ul>
        {
          // @ts-ignore: Expected error if the module is not yet installed
          breadcrumbManagerState.facetBreadcrumbs.map(facet => (
            <li key={facet.facetId} className="mb-4">
              {facet.field}:
              <div className="flex gap-2 flex-wrap">
                {
                  // @ts-ignore: Expected error if the module is not yet installed
                  facet.values.map(breadcrumb => (
                    <Button
                      key={breadcrumb.value.value}
                      style="primary"
                      onClick={() => breadcrumb.deselect()}
                      copy={breadcrumb.value.value}
                    />
                  ))
                }
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

registerUniformComponent({
  type: 'coveo-breadcrumbManager',
  component: BreadcrumbManager,
});

export default BreadcrumbManager;
