import { useEffect, useRef, useState } from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import { gsap } from 'gsap';

// 导航项的内容数组
const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact']
const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);        // 音频播放状态
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);  // 音频可视化指示器激活状态（动画效果）
  const [lastScrollY, setLastScrollY] = useState(0);                  // 记录上次滚动位置，判断滚动方向
  const [isNavVisible, setIsNavVisible] = useState(true);             // 导航栏可见性
  const navContainerRef = useRef(null); // 导航栏容器DOM引用
  const audioElementRef = useRef(null); // 音频元素DOM引用

  const { y: currentScrollY } = useWindowScroll();  // 获取当前窗口滚动位置

  // 根据滚动行为判断是否显示导航栏
  useEffect(() => {
    if (currentScrollY === 0) {  // 在顶部
      setIsNavVisible(true);
      navContainerRef.current.classList.remove('floating-nav');
    }
    else if (currentScrollY > lastScrollY) {  // 向下滚动
      setIsNavVisible(false); // 隐藏导航栏
      navContainerRef.current.classList.add('floating-nav');
    }
    else if (currentScrollY < lastScrollY) {  // 向上滚动
      setIsNavVisible(true);
      navContainerRef.current.classList.add('floating-nav');
    }
    setLastScrollY(currentScrollY); // 更新上次滚动位置
  }, [currentScrollY, lastScrollY])

  // GSAP动画处理导航栏显隐过渡效果
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100, // 垂直位移，隐藏时上移100px
      opacity: isNavVisible ? 1 : 0,
      duration: 0.03,
    })
  }, [isNavVisible])

  // 切换播放状态
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev); // 取反当前状态
    setIsIndicatorActive((prev) => !prev);  // 同步更新指示器状态
  }

  // 音频播放控制
  useEffect(() => {
    // 根据音频状态 播放/暂停
    if (isAudioPlaying) {
      audioElementRef.current.play();
    }
    else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying])

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700  sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">

        {/* 导航栏主体 */}
        <nav className="flex size-full items-center justify-between p-4">

          {/* 导航栏左侧：Logo、按钮 */}
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* 导航栏右侧： 导航项、音频按钮 */}
          <div className="flex h-full items-center">
            {/* 导航项菜单 */}
            <div className="hidden md:block">
              {navItems.map((item) => ( // 箭头函数简写，自动返回内部的锚标签
                <a key={item}
                  href={`#${item.toLowerCase()}`} // 跳转锚点链接
                  className="nav-hover-btn">
                  {item}
                </a>
              )
              )}
            </div>

            {/* 音频控制按钮 */}
            <button className="ml-10 flex items-center space-x-0.5" onClick={toggleAudioIndicator}>
              {/* 背景音乐元素 */}
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {/* 音频可视化指示器 */}
              {[1, 2, 3, 4].map((bar) => (  //.map遍历数组，显示bgm播放状态的四根指示小竖线
                <div
                  key={bar}
                  className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div >
  )
}

export default Navbar
