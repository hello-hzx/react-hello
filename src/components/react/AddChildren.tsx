import React, { Children, cloneElement } from 'react';

const CompA = (props: any) => {
  const { children } = props;
  return (
    <div>
      <p>Com A:</p>
      {!!children && children}
    </div>
  );
};

const CompB = (props: any) => {
  const children = props?.children;
  return (
    <div>
      <p>Com B:</p>
      {!!children && children}
    </div>
  );
};

const CompC = (props: any) => {
  const { children } = props;
  return (
    <div>
      Comp C:
      {!!children && children}
    </div>
  );
};

const CompD = () => <div>Comp D</div>;

const compLibs = {
  CompB: <CompB />,
  CompC: <CompC />,
  CompD: <CompD />,
};

const compDataArr = [
  { key: 'bbb1', type: 'CompB', nodes: [] },
  { key: 'bbb2', type: 'CompB', nodes: ['ccc1'] },
  { key: 'ccc1', type: 'CompC', nodes: ['ddd1'] },
  { key: 'ddd1', type: 'CompD', nodes: [] },
];

const full = (Comp: any, childrenKeys: string[]) => {
  const childrenComp = [];
  childrenKeys.forEach((key) => {
    const compData = compDataArr.find((item) => item.key === key);
    const { type } = compData;
    let ChildComp = compLibs[type];

    const { nodes } = compData;
    if (nodes?.length) {
      const children = full(ChildComp, nodes);
      ChildComp = (cloneElement(Comp, {}, ...children));
    }

    childrenComp.push(cloneElement(Comp, {}, ...[ChildComp]));
  });

  return childrenComp;
};
const AddChildren = () => {
  const rootNodes = ['bbb1', 'bbb2'];

  const components = [];
  rootNodes.forEach((name) => {
    const compData = compDataArr.find((item) => item.key === name);
    const { type } = compData;
    const Comp = compLibs[type];
    const { nodes } = compData;
    if (nodes?.length) {
      const childrenComp = full(Comp, nodes);
      components.push(...childrenComp);
    } else {
      components.push(Comp);
    }
  });

  return (
    <CompA>
      {Children.map(components, (child) => child)}
    </CompA>
  );
};

export default AddChildren;
