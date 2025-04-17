import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Character = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // 当前播放视频索引（1-based）
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4; // 视频总数
  const nextVideoRef = useRef(null); // 下一个视频的引用

  // 视频加载事件
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1); // 增加已加载视频数量
  };

  // 计算下一个视频的索引，模运算 实现循环播放
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  // 小视频点击事件
  const handleMiniVideoClick = () => {
    setHasClicked(true); // 设置点击状态
    setCurrentIndex(upcomingVideoIndex); // 直接跳到下一个视频
  };

  // 视频加载完成事件
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  // GSAP动画库
  useGSAP(
    () => {
      // 仅在用户点击后执行动画逻辑
      if (hasClicked) {
        // 下一个视频元素(中央小窗口的初始状态)：可见
        gsap.set("#next-video", { visibility: "visible" });

        // 下一个视频元素，从中央小视频放大到全屏背景
        gsap.to("#next-video", {
          transformOrigin: "center center", // 缩放中心
          scale: 1, // 放大到原始尺寸
          width: "100%",
          height: "100%",
          duration: 1, // 动画持续1秒
          ease: "power1.inOut", // 基于一次方程的缓动曲线，应用于动画开始与结束
          onStart: () => nextVideoRef.current.play(), // 开始动画时播放下一个视频
        });

        // 当前视频元素，从0放大到中央小窗口
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0, // 初始为完全缩小状态，由无到有
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex], // 当currentIndex（依赖项）变化时重新运行动画
      revertOnUpdate: true, /// 每次依赖变化时，重置并还原动画初始状态
    }
  );

  // 创建滚动触发的剪裁路径动画
  useGSAP(() => {
    // 主容器的初始状态
    gsap.set("#video-frame", {
      // 设置初始的裁剪路径：斜切的不规则四边形蒙版
      clipPath: "polygon(14% 0%, 72% 0%, 88% 88%, 0% 100%)", // 多边形顶点坐标从左上角顺时针
      borderRadius: "0 0 45% 5%", // 初始圆角（后两个先右下、再左下）
    });

    //从初始状态到目标状态的动画
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // 全屏矩形
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        // 滚动触发配置
        trigger: "#video-frame", // 触发动画的元素
        start: "center center", // 当触发器元素中心到达视口中心时开始
        end: "bottom center", // 底部到达视口中心
        scrub: true, // 动画根据滚动位置进行更新
      },
    });
  });
  // 构建视频路径
  const getVideoSrc = (index) => `videos/character-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* 主容器 */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        {/* 加载中的动画 */}
        {isLoading && (
          <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
            <div className="three-body">
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
            </div>
          </div>
        )}

        {/* 视频区块 */}
        <div>
          {/* 中央小视频容器（可点击） */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              {/* 下一个视频元素（点击后切换） */}
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)} // 即将播放的视频
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          {/* 预加载当前播放视频（不可见，用于预加载） */}
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-60 object-cover object-center "
            onLoadedData={handleVideoLoad}
          />

          {/* 全屏背景视频（实际展示） */}
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
              // 当前播放索引（1-based）
            )} // 根据索引切换视频
            // autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        {/* 右下角标题 */}
        <h1 className="special-font character-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>mi<b>n</b>g
        </h1>

        {/* 页面左上角文字介绍 */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font character-heading  text-blue-100">
              redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer
              <br /> Unleash the Play Economy
            </p>

            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              ContainerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      {/* 以上为主容器 */}
      <h1 className="special-font character-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>mi<b>n</b>g
      </h1>
    </div>
  );
};

export default Character;
