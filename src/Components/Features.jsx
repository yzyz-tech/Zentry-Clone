import { useRef, useState } from "react";
import { TbComet } from "react-icons/tb";

// 鼠标跟随的卡片倾斜效果
const BentoTilt = ({ children, className = '' }) => {
  const [transformStyle, setTransformStyle] = useState('');
  const itemRef = useRef();

  // 鼠标移动时计算倾斜角度，并设置transform样式
  const handleMouseMove = (e) => {
    if (!itemRef.current) return;

    // 获取卡片的边界信息
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();

    // 计算鼠标与卡片中心的相对位置
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    // 根据相对位置计算倾斜角度（围绕X/Y轴旋转）
    const tiltX = (relativeY - 0.5) * 5; // 垂直倾斜
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `
      perspective(700px) 
      rotateX(${tiltX}deg) 
      rotateY(${tiltY}deg) 
      scale3d(0.98, 0.98, 0.98)
    `; // 带透视、旋转、轻微缩放的样式

    // 设置新的样式
    setTransformStyle(newTransform);
  }

  const handleMouseLeave = () => {
    setTransformStyle('');  // 恢复初始样式
  }

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  )
}

// 卡片内容结构
const Bentocard = ({ src, title, description }) => {
  return (
    <div className="relative size-full">
      {/* 背景视频 */}
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      {/* 前景内容 */}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )} {/* 响应式字体大小 */}
        </div>
      </div>
    </div>
  )
}

// 主组件：文字引导 + Bento网格布局
const Features = () => {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        {/* 顶部标题与简介 */}
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Explore the Zentry Universe
          </p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Immerse yourself in a rich and ever-expanding universe where a vibrant array of products converge into an interconnected overlay experience on your world.
          </p>
        </div>

        {/* Bento 网格布局 */}
        {/* 第一行：单个横向大卡片 */}
        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">

          <Bentocard
            src="videos/feature-1.mp4"
            title={<>radia<b>n</b>t</>}
            description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
          />
        </BentoTilt>

        {/* 第二行：网格布局的多个卡片（2列3行） */}
        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
          {/* 左侧纵向大卡片 */}
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <Bentocard
              src="videos/feature-2.mp4"
              title={<>zig<b>m</b>a</>}
              description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            />
          </BentoTilt>
          {/* 右侧卡片组 */}
          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <Bentocard
              src="videos/feature-3.mp4"
              title={<>n<b>e</b>xus</>}
              description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <Bentocard
              src="videos/feature-4.mp4"
              title={<>az<b>u</b>l</>}
              description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            />
          </BentoTilt>
          {/* 第三行 */}
          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <h1 className="bento-title special-font">
                Mor<b>e</b> <br /> co<b>m</b>ing <br /> s<b>o</b>on!
              </h1>
              <TbComet className="m-5 scale-[5] self-end" />
            </div>
          </BentoTilt>
          <BentoTilt className="bento-tilt_2">
            <video
              src="videos/feature-5.mp4"
              loop
              muted
              autoPlay
              className="size-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  )
}

export default Features
