import React, { Key, useRef, useState } from "react";
import { ProTable } from "@ant-design/pro-components";
import { Checkbox, Typography } from "antd";
import _ from "lodash";

const { Link } = Typography;

const total = 15;
export const ProComp = () => {
  const columns = [
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "age",
      dataIndex: "age",
    },
    {
      title: "action",
      dataIndex: "action",
      render: () => <Link href=".">action</Link>,
    },
  ];

  const [checkboxState, setCheckboxState] = useState({
    checked: false,
    indeterminate: false,
  });
  const [selectedKeys, setSelectedKeys] = useState([]);
  const currPageKeysRef = useRef([]);
  const canceledKeysRef = useRef(null);

  const setCheckBoxProps = (keys) => {
    if (!keys.length && !canceledKeysRef.current) {
      // 没有数据选中&&不处于主动全选状态下
      setCheckboxState({ checked: false, indeterminate: false });
    } else if (keys.length === total || canceledKeysRef.current?.length === 0) {
      // 数据全选中 || 主动勾选了全选框
      setCheckboxState({ checked: true, indeterminate: false });
    } else if (
      (keys.length && keys.length < total) ||
      canceledKeysRef.current?.length < total
    ) {
      // 数据部分选中 || 主动勾选了全选框同时取消了部分数据的选中
      setCheckboxState({ checked: false, indeterminate: true });
    }
  };

  const rowSelection = {
    type: "checkbox",
    selectedRowKeys: selectedKeys,
    onChange: (_keys: Key[], _rows: any[]) => {
      console.log("onChange");
    },

    onSelect: (record, selected) => {
      let keys = [];
      if (selected) {
        keys = [...selectedKeys, record.id];

        _.pull(canceledKeysRef.current, record.id);
      } else {
        keys = _.difference(selectedKeys, [record.id]);

        canceledKeysRef.current?.push(record.id); // 记录在全选状态下被取消的数据key
        if (canceledKeysRef.current?.length === total)
          canceledKeysRef.current = null;
      }
      setSelectedKeys(keys);
      setCheckBoxProps(keys);

      console.log("onSelect");
    },
    onSelectAll: (selected) => {
      let keys = [];
      if (selected) {
        keys = _.union(selectedKeys, currPageKeysRef.current);

        _.pull(canceledKeysRef.current, ...currPageKeysRef.current);
      } else {
        keys = _.difference(selectedKeys, currPageKeysRef.current);

        canceledKeysRef.current?.push(...currPageKeysRef.current); // 记录在全选状态下被取消的数据key
        if (canceledKeysRef.current?.length === total)
          canceledKeysRef.current = null;
      }
      setSelectedKeys(keys);
      setCheckBoxProps(keys);

      console.log("onSelectAll");
    },
  };

  const onDataSourceChange = (dataSource: any[]) => {
    const pageKeys = dataSource.map((item) => item.id);
    currPageKeysRef.current = pageKeys;
    if (checkboxState.checked) setSelectedKeys(_.union(pageKeys, selectedKeys));

    // 选中在主动勾选全选后没有被取消选中的数据
    if (canceledKeysRef.current) {
      const keys = pageKeys.filter(
        (key) => !canceledKeysRef.current.includes(key)
      );
      setSelectedKeys(_.union(keys, selectedKeys));
    }
  };

  const checkAllChange = () => {
    if (checkboxState.checked) {
      // 取消全选
      setCheckboxState({
        checked: false,
        indeterminate: false,
      });
      setSelectedKeys([]);

      canceledKeysRef.current = null;
    } else {
      // 点击全选框
      setCheckboxState({ checked: true, indeterminate: false });
      setSelectedKeys(_.union(selectedKeys, currPageKeysRef.current));

      canceledKeysRef.current = [];
    }
  };

  return (
    <>
      <h1>Pro Components</h1>
      <ProTable
        columns={columns}
        request={async (params = {}, _sort, _filter) => {
          const data = [];
          if (params.current === 1) {
            for (let i = 0; i < 5; i++) {
              data.push({ id: i, name: `${i}-name`, age: `${i}-name` });
            }
          } else if (params.current === 2) {
            for (let i = 5; i < 10; i++) {
              data.push({ id: i, name: `${i}-name`, age: `${i}-name` });
            }
          } else {
            for (let i = 10; i < 15; i++) {
              data.push({ id: i, name: `${i}-name`, age: `${i}-name` });
            }
          }
          return {
            data,
            success: true,
            total,
          };
        }}
        search={false}
        rowKey="id"
        pagination={{
          pageSize: 5,
        }}
        headerTitle={
          <Checkbox {...checkboxState} onChange={checkAllChange}>
            check All
          </Checkbox>
        }
        rowSelection={rowSelection as any}
        tableAlertRender={false}
        onDataSourceChange={onDataSourceChange}
      />
    </>
  );
};
