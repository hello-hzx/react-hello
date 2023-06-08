import React from "react";
import { useNavigate } from "react-router-dom";

/** 高阶组件：类式组件使用useNavigate或其他hooks时使用 */
export const WithRouter = (WrapperComponent: any) =>
  function (props) {
    const navigate = useNavigate();
    const router = { navigate };

    return <WrapperComponent {...props} router={router} />;
  };
