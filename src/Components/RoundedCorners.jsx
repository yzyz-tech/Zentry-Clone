import React from 'react'

const RoundedCorners = () => {
  return (
    <svg
      className="invisible absolute size-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 定义图像滤镜 */}
      <defs>
        <filter id="flt_tag">
          {/* 高斯模糊 */}
          <feGaussianBlur
            in="SourceGraphic"  // 原始输入图像
            stdDeviation="8" // 模糊半径，值越大越模糊
            result="blur" // 供后续步骤引用
          />
          {/* 颜色矩阵（增强模糊效果） */}
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="flt_tag"
          />
          {/* 将滤镜效果应用回原图形 */}
          <feComposite
            in="SourceGraphic"
            in2="flt_tag"
            operator="atop" 
          />
        </filter>
      </defs>
    </svg>
  )
}

export default RoundedCorners
