import React from 'react';
import AddChildren from './AddChildren';
import { ClassComponent } from './ClassComponent';
import { ReactTransitionGroup } from './ReactTransitionGroup';
import CssInJs from './CssInJs';

export const ReactComp = () => (
  <>
    <AddChildren />
    <ClassComponent />
    <ReactTransitionGroup />
    <CssInJs />
  </>
);
