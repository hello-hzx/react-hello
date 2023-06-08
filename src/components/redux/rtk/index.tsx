import React from "react";
import { Provider, shallowEqual } from "react-redux";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "@/components/redux/rtk/hooks";
import { store } from "./Store";
import { addAge, requestToStoreAction } from "./modules/Person";

function Show() {
  const { person } = useAppSelector((state) => state, shallowEqual);
  const dispatch = useAppDispatch();
  return (
    <Button
      onClick={async () => {
        dispatch(addAge(2));
        try {
          const result = await dispatch(
            requestToStoreAction({ key: "a" })
          ).unwrap(); // 这里可以传参（可选）
          console.log(result);
        } catch (e) {
          // error
        }
      }}
    >
      ReduxRtk: {person.obj.age}
    </Button>
  );
}

export function ReduxRtk() {
  return (
    <Provider store={store}>
      <Show />
    </Provider>
  );
}
