import { FC } from 'react';
import classNames from 'classnames';
import { InformationContentProps } from '.';

const InformationContent: FC<InformationContentProps> = ({ title, imageComponent = '', text = '', className }) => (
  <div className={classNames('pt-14 lg:mb-28 flex flex-col justify-center items-center h-full text-center', className)}>
    <div className="mt-7 font-bold text-3xl">{title}</div>
    {imageComponent && <div className="mt-7">{imageComponent}</div>}
    {text && <div className="mt-7">{text}</div>}
  </div>
);

export default InformationContent;
