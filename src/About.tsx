import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Button } from "antd";

function AboutA() {
  const onClick = () => {
    window.open("/");
  };
  return (
    <>
      <h1>About A</h1>
      <Button onClick={onClick}>Home</Button>
    </>
  );
}

function AboutB() {
  return <h1>About B</h1>;
}

function AboutApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/about.html" element={<Navigate to="/about/a" />} />
        <Route path="/about/a" element={<AboutA />} />
        <Route path="/about/b" element={<AboutB />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<AboutApp />);
