import React from "react";
// import { TiChartLine } from "react-icons/ti";

const Button = ({ title, id, rightIcon, leftIcon, containerClass }) => {
  return (
    <button
      id={id} // 按钮的唯一标识符
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
    // 样式包括Character.jsx中自定义的containerClass
    >
      {/* 渲染按钮左侧的图标 */}
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        {/* 渲染按钮的标题文本 */}
        <div>{title}</div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
