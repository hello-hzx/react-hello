import React, { useState } from "react";
import { RGBColor, SketchPicker } from "react-color";
import { Popover } from "antd";

export const ReactColor = () => {
  const [color, setColor] = useState<RGBColor>({
    r: 241,
    g: 112,
    b: 19,
    a: 1,
  });

  const handleChange = (newColor) => {
    setColor(newColor.rgb);
  };

  return (
    <Popover
      style={{ display: "inline-block" }}
      trigger={["click"]}
      content={
        <SketchPicker
          className="picker"
          color={color}
          onChange={handleChange}
        />
      }
    >
      <div
        style={{
          height: "20px",
          width: "50px",
          backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        }}
      />
    </Popover>
  );
};
