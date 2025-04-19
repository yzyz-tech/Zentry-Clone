import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)
// 主组件，接收标题文本和容器样式类，通过 props 实现复用
const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);  // 附加给主容器的引用

  useEffect(() => {
    // 限定动画作用域
    const ctx = gsap.context(() => {

      // 为.animated-word元素创建的动画时间线
      const titleAnimation = gsap.timeline({
        // 所有文字的进场动画，绑定在这条时间线上
        scrollTrigger: {
          trigger: containerRef.current,
          start: '100 bottom',  // 元素顶部+100px的位置 与视口底部对齐时
          end: 'center bottom',
          toggleActions: 'play none none reverse', // （文字接近视口底部上下时），滚动进入播放，滚出反向播放
          // markers: true,
        }
      });

      // 每个单词的动画效果
      titleAnimation.to('.animated-word', {
        opacity: 1, // 透明度（从0）到1
        transform: 'translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)',  // 3D变换复位
        ease: 'power2.inOut',
        stagger: 0.02,  // 字间延迟
      })
    }, containerRef)  // 限定动画作用域

    // useEffect的清理函数，需清理动画作用域，避免内存泄漏
    return () => ctx.revert();
  }, [])  // 空依赖数组表示只在挂载时运行

  return (
    // 渲染文本动画的主容器
    <div
      ref={containerRef}
      className={`animated-title ${containerClass} `}  // 合并传入的样式类
    >

      {/* 处理title文本，拆行 */}
      {title.split('<br />').map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >  {/* div 渲染每行 */}

          {/* 每行按空格拆词，每个词作为动画元素 */}
          {line.split(' ').map((word, i) => (
            <span
              key={i}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}  // 保留HTML标签，如<b>
            />  // span 渲染每个词
          ))}
        </div>
      ))}

    </div>
  )
}

export default AnimatedTitle
