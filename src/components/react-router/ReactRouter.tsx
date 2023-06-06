import React, { PureComponent } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useRoutes,
  useSearchParams,
} from "react-router-dom";
import { Button } from "antd";
import { WithRouter } from "./hoc/WithRouter";

/** Home 子组件 UserInfo */
const UserInfo = () => <h1>name: Trump</h1>;

/** Home 类式子组件 UserCar */
class UserCar extends PureComponent<any, any> {
  toPath(path: string) {
    const { navigate } = this.props.router;
    navigate(path);
  }

  render() {
    return (
      <>
        <h1>car: byd</h1>
        <Button type="link" onClick={() => this.toPath("/home")}>
          to Home
        </Button>
      </>
    );
  }
}

const UserCarWrapped = WithRouter(UserCar);

const Home = () => {
  const navigate = useNavigate(); // 用于跳转页面
  const params = useParams(); // 用于获取路径参数 /user/:id
  const location = useLocation(); // 用于获取查询字符串 /user?name=tom&age=18
  const [searchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams); //

  window.console.log("params", params);
  window.console.log("location", location);
  window.console.log("query", query);

  const toPath = (path) => {
    navigate(path);
  };

  return (
    <>
      <h1>Home</h1>
      <Button type="link">
        <Link to="/home/user/info">to info</Link>
      </Button>
      {/* 1. 使用 <Link> 跳转 */}
      {/* <Button type="link"><Link to={'/home/user/car'}>to car</Link></Button> */}
      {/* 2. 手动 跳转 */}
      <Button type="link" onClick={() => toPath("/home/user/car")}>
        to car
      </Button>

      {/* Outlet 占位 */}
      <Outlet />
      <Button type="primary">
        <Link to="/about">to About</Link>
      </Button>
    </>
  );
};
const About = () => (
  <>
    <h1>About</h1>
    <Button>
      <Link to="/home">to Home</Link>
    </Button>
  </>
);

const NotFound = () => (
  <>
    <h1>Not Found</h1>
    <Button>
      <Link to="/home">to Home</Link>
    </Button>
  </>
);

/** 以配置的形式使用路由 */
const routers = [
  { path: "/", element: <Navigate to="/home" /> },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home",
        element: <Navigate to="/home/user/info?name=Trump&age=0" />,
      },
      { path: "/home/user/info", element: <UserInfo /> },
      { path: "/home/user/car", element: <UserCarWrapped /> },
    ],
  },
  { path: "/about", element: <About /> },
  { path: "*", element: <NotFound /> },
];

export const ReactRouter = () => (
  // <>
  //   <div className="content">
  //     {/* router5 中叫 Switch */}
  //     <Routes>
  //       {/* router5 中element叫component, Navigate叫Redirect，Navigate出现自动跳到指定to */}
  //       <Route path="/" element={<Navigate to="/home" />} />
  //       <Route path="/home" element={<Home />}>
  //         {/* 子路由 */}
  //         <Route path="/home" element={<Navigate to="/home/user/info?name=Trump&age=0" />} />
  //         <Route path="/home/user/info" element={<UserInfo />} />
  //         <Route path="/home/user/car" element={<UserCarWrapped />} />
  //       </Route>
  //       <Route path="/about" element={<About />} />
  //       <Route path="*" element={<NotFound />} />
  //     </Routes>
  //   </div>
  // </>
  <div className="content">{useRoutes(routers)}</div>
);
