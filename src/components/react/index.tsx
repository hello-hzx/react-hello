import React from 'react';
import AddChildren from './AddChildren';
import { ClassComponent } from './ClassComponent';
import { ReactTransitionGroup } from './ReactTransitionGroup';
import CssInJs from './CssInJs';
import { I18nextReact } from './i18next-react';
import { ReactColor } from './ReactColor';

export const ReactComp = () => (
  <>
    <ReactColor />
    <ReactColor />
    <ReactColor />
    <ReactColor />
    <ReactColor />
    <ReactColor />
    <ReactColor />
    <I18nextReact />
    <AddChildren />
    <ClassComponent />
    <ReactTransitionGroup />
    <CssInJs />
  </>
);
