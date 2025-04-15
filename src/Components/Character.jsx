import { useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";

const Character = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // 当前播放视频索引（1-based）
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 3; // 视频总数
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

  // 构建视频路径
  const getVideoSrc = (index) => `videos/character-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* 主容器 */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
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
              ContainerClass="!bg-yellow-300 flex-center gap"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font character-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>mi<b>n</b>g
      </h1>
    </div>
  );
};

export default Character;
