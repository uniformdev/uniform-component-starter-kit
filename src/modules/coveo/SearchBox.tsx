/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useCallback, useEffect, useMemo, useState, ChangeEvent, useContext } from 'react';
import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
// @ts-ignore: Expected error if the module is not yet installed
import { buildSearchBox } from '@coveo/headless';
import { HeadlessEngineContext } from './Engine';

type SearchBoxProps = ComponentProps<{
  placeholder?: string;
  enableQuerySyntax?: boolean;
  clearFilters?: boolean;
  searchBoxTitle?: string;
}>;

const SearchButton = () => (
  <svg className="w-3.5 h-3.5" width="10" height="10" viewBox="0 0 40 40" aria-hidden="true">
    <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"></path>
  </svg>
);

// Coveo Search Box docs https://docs.coveo.com/en/headless/latest/reference/search/controllers/search-box/
const SearchBox: FC<SearchBoxProps> = ({ placeholder, enableQuerySyntax = false, clearFilters = false }) => {
  const headlessEngine = useContext(HeadlessEngineContext);
  const headlessSearchBox = useMemo(
    () =>
      buildSearchBox(headlessEngine, {
        options: {
          highlightOptions: {
            notMatchDelimiters: {
              open: '<strong>',
              close: '</strong>',
            },
            correctionDelimiters: {
              open: '<i>',
              close: '</i>',
            },
          },
          clearFilters,
          enableQuerySyntax,
        },
      }),
    [clearFilters, enableQuerySyntax, headlessEngine]
  );

  const [, setSearchBoxState] = useState(headlessSearchBox.state);

  useEffect(() => headlessSearchBox.subscribe(() => setSearchBoxState(headlessSearchBox.state)), [headlessSearchBox]);

  const handleSubmit = useCallback(() => {
    headlessSearchBox.submit();
  }, [headlessSearchBox]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    headlessSearchBox.updateText(e.target.value);
    headlessSearchBox.submit();
  };

  return (
    <div className="relative search-form mb-4">
      <button
        type="button"
        onClick={handleSubmit}
        className="absolute inset-y-0 left-0 px-2 py-2 text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        <SearchButton />
      </button>
      <input
        onChange={handleInputChange}
        type="search"
        placeholder={placeholder}
        className="py-2 px-8 bg-gray-50 placeholder:text-black w-full focus:border-black border-none outline-none"
      />
    </div>
  );
};

registerUniformComponent({
  type: 'coveo-searchBox',
  component: SearchBox,
});

export default SearchBox;
