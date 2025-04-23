import React, { useRef } from 'react'
import AnimatedTitle from './AnimatedTitle'
import { gsap } from 'gsap'
import RoundedCorners from './RoundedCorners'
import Button from './Button'
const Story = () => {
  const frameRef = useRef('null');  // 引用图片元素

  // 鼠标离开图片时，恢复图像的旋转角度为初始状态
  const handleMouseLeave = () => {
    const element = frameRef.current;
    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: 'power1.inOut'
    })
  }

  // 鼠标移动时卡片的倾斜动效（使用GSAP动画库）
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e; // 获取鼠标当前位置（相对视口左上角）
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect(); // 获取图片元素在视口中的位置信息
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // 计算图像中心
    const centerX = rect.width / 2; // 横向中心
    const centerY = rect.height / 2;

    // 计算鼠标位置相对于图像中心的偏移量，映射为旋转角度
    const rotateX = ((y - centerY) / centerY) * -10;  // 上下倾斜
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX, rotateY, // 倾斜角度
      transformPerspective: 500,  // 增加透视感
      ease: 'power1.inOut'
    })
  }
  return (
    <section
      id="story"
      className="min-h-dvh w-screen bg-black text-blue-50"
    >
      <div className="flex size-full flex-col items-center py-10 pb-24"
      >
        {/* 描述性文本 */}
        <p className="font-general text-sm uppercase md:text-[10px]">
          the multiversal ip world
        </p>
        <div className="relative size-full">
          <AnimatedTitle
            title="The st<b>o</b>ry of<br /> a hid<b>d</b>en real<b>m</b>"
            sectionId="#story"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />
          {/* 带有鼠标交互效果的图片 */}
          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  src="/img/entrance.webp"
                  alt="etrance"
                  className="object-contain"
                />
              </div>
            </div>
            <RoundedCorners />
          </div>
        </div>

        {/* 文本与按钮区域 */}
        <div className="-mt-10 flex w-full justify-center md:-mt-60 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center overflow-auto md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities.
            </p>
            <Button
              id="realm-button"
              title="discover prologue"
              containerClass="mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Story
