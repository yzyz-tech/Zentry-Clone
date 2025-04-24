import React from 'react'
import Button from './Button'

// 图片裁切容器组件
const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
)
const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      {/* 黑色背景容器 */}
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        {/* 左侧两个装饰小图片 */}
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
          {/* <div className="absolute sm:-left-20 sm:w-72"> */}
          <ImageClipBox
            src="img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
          {/* </div> */}
        </div>

        {/* 剑客图片（分层效果） */}
        <div className="absolute -top-40 left-32 w-60 sm:top-1/2 sm:left-auto md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="img/swordman-partial.webp"
            clipClass="absolute md:scale-125 "
          />
          <ImageClipBox
            src="img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        {/* 文字介绍 */}
        <div className="flex flex-col items-center text-center">
          <p className="font-general z-10 text-[10px] uppercase">Join Zentry</p>
          <p className="special-font z-10 mt-10 w-full font-zentry text-5xl leading-[0.9] md:text-[6rem] overlay-text">Le<b>t</b>'s buil<b>d</b> the<br /> new er<b>a</b> of ga<b>m</b>ing<br />toget<b>h</b>er.</p>
          <Button
            title="contact us"
            containerClass="mt-10 cursor-pointer" />
        </div>
      </div>
    </div >
  )
}

export default Contact
