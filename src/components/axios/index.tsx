import React from "react";
import { Button } from "antd";
import { send1 } from "@/components/axios/service/module/User";

export const AxiosComp: React.FC = () => {
  const send = async () => {
    console.log(await send1());
  };

  return (
    <>
      <h1>Axios</h1>
      <Button onClick={send}>send</Button>
    </>
  );
};
