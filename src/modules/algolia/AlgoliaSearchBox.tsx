/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from 'react';
// @ts-ignore: Expected error if the module is not yet installed
import { SearchBox, useInstantSearch } from 'react-instantsearch';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { withErrorCallout } from '../../hocs/withErrorCallout';
import ErrorPropertyCallout from '../../components/ErrorPropertyCallout';

type Props = {
  searchBoxParams?: {
    searchBoxProps?: {
      placeholder?: string;
      searchAsYouType?: boolean;
    };
  };
};

const AlgoliaSearchBox: FC<ComponentProps<Props>> = ({ searchBoxParams }) => {
  const { searchBoxProps } = searchBoxParams || {};

  const { error } = useInstantSearch({ catchError: false });

  if (error) {
    return <ErrorPropertyCallout classNames="py-3" title={error.name} text={error.message} />;
  }

  return (
    <div className="mb-8">
      <SearchBox
        {...searchBoxProps}
        classNames={{
          input: 'py-2 px-8 bg-gray-50 placeholder:text-black w-full focus:border-black border-none outline-none',
          form: 'relative algolia-search-form',
          submit: 'absolute left-2 bottom-1/2 translate-y-1/2',
          submitIcon: 'w-3.5 h-3.5',
          resetIcon: 'w-3.5 h-3.5',
          reset: 'absolute right-3 bottom-1/2 translate-y-1/2',
          loadingIndicator: 'absolute right-3 bottom-1/2 translate-y-1/2',
        }}
      />
    </div>
  );
};

// TODO: think how to translate errors
registerUniformComponent({
  type: 'algolia-searchBox',
  component: withErrorCallout(
    AlgoliaSearchBox,
    'Something went wrong. Please use Search Box components only inside the Instant Search component'
  ),
});

export default AlgoliaSearchBox;
