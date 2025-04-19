import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import AnimatedTitle from './AnimatedTitle';

gsap.registerPlugin(ScrollTrigger)

const About = () => {

  // 滚动触发动画
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '#clip', // 触发动画的目标元素
        // 当#clip元素 滚动到视口中时触发动画
        start: 'center center', // 当#clip的中心对齐视口中心时，开始动画
        end: '+=800 center',
        scrub: 0.5, // 动画随着滚动逐帧播放，0.5s缓动延迟（更平滑）
        pin: true,  // 钉住#clip整个展示区块
        pinSpacing: true, // 钉住后自动为页面添加占位空间，防止内容跳动
        // markers: true // 调试标记，观察start/end触发点位置
      }
    })
    // 向下滚动时，图片扩展到全宽
    clipAnimation.to('.mask-clip-path', {
      width: '100dvw',
      height: '100dvh',
      borderRadius: 0,
    })
  })

  return (
    // 页面主容器 about
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">

        {/* 文字信息 */}
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Zentry
        </h2>

        {/* 主标题 */}
        <AnimatedTitle
          title="Disc<b>o</b>ver the <b>w</b>orld's <br /> l<b>a</b>rgest shared adventu<b>r</b>e"
          containerClass="mt-5 !text-black text-center" />

        <div className="about-subtext">
          <p>
            the Game of games begins-your life, now an epic MMORPG
          </p>
          <p>
            Zentry unites every player from countless games and platforms
          </p>
        </div>
      </div>

      {/* 中央区域的图片外层容器，控制高度 */}
      <div id="clip" className="h-dvh w-screen">
        {/* 图片容器 */}
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />  {/* 绝对定位覆盖整个容器 */}
        </div>
      </div>
    </div>
  );
};

export default About;
