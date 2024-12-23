import { FC, Fragment } from 'react';
import { PageProps } from '.';
import { PageContent } from '../../components/BasePage/BasePage';

export const Page: FC<PageProps> = () => <PageContent providers={Fragment} />;
