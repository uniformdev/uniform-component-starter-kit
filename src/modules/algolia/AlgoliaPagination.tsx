/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from 'react';
// @ts-ignore: Expected error if the module is not yet installed
import { Pagination, Configure } from 'react-instantsearch';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { withErrorCallout } from '../../hocs/withErrorCallout';

type Props = {
  paginationParams?: {
    paginationProps?: {
      instantSearchProps?: {
        indexName?: string;
        stalledSearchDelay?: number;
      };
    };
  };
  pageSize?: string;
};

const AlgoliaPagination: FC<ComponentProps<Props>> = ({ paginationParams, pageSize = '9' }) => {
  const { paginationProps } = paginationParams || {};

  return (
    <div className="flex justify-center">
      <Configure hitsPerPage={parseInt(pageSize)} />
      <Pagination
        {...paginationProps}
        classNames={{
          list: 'flex w-full justify-center gap-1',
          item: 'btn rounded-none btn-primary !p-0 w-10',
          link: 'w-full h-full flex justify-center items-center',
          selectedItem: 'btn-disabled',
          disabledItem: 'btn-disabled',
          nextPageItem: 'btn-ghost',
          previousPageItem: 'btn-ghost',
          firstPageItem: 'btn-ghost',
          lastPageItem: 'btn-ghost',
        }}
      />
    </div>
  );
};

// TODO: think how to translate errors
registerUniformComponent({
  type: 'algolia-pagination',
  component: withErrorCallout(
    AlgoliaPagination,
    'Something went wrong. Please use Pagination components only inside the Instant Search component'
  ),
});

export default AlgoliaPagination;
