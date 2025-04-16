import React from "react";
// import { TiChartLine } from "react-icons/ti";

const Button = ({ title, id, rightIcon, leftIcon, ContainerClass }) => {
  return (
    <button
      id={id} // 按钮的唯一标识符
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 ${ContainerClass}`}
      // 样式包括Character.jsx中自定义的ContainerClass
    >
      {/* 渲染按钮左侧的图标 */}
      {leftIcon}
      <span className="relative incline-flex overflow-hidden font-general text-xs uppercase">
        {/* 渲染按钮的标题文本 */}
        <div>{title}</div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
