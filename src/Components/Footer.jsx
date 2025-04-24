import React from 'react'
import { FaDiscord, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

// 社媒链接配置数组
const links = [
  { href: 'https://discord.com', icon: <FaDiscord /> },
  { href: 'https://twitter.com', icon: <FaTwitter /> },
  { href: 'https://github.com/yzyz-tech', icon: <FaGithub /> },
  { href: 'https://linkedin.com', icon: <FaLinkedin /> },
]
const Footer = () => {
  return (
    // 底部容器
    <footer className="w-screen bg-violet-300 py-4 text-black">
      {/* 响应式布局内容容器 */}
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        {/* 版权信息 */}
        <p className="text-center text-sm md:text-left">
          &copy; Yzyz 2025. All rights reserved
        </p>
        {/* 社媒图标链接容器 */}
        <div className="flex justify-center gap-4 md:justify-start">
          {links.map((link) => (
            <a
              key={link}
              href={link.href}
              target="_blank" // 新窗口打开链接
              rel="noopener noreferrer" // 安全策略
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"  // 悬停过渡为白色
            >
              {link.icon}
            </a>
          ))}
        </div>
        {/* 隐私政策链接 */}
        <a href="#privacy-policy" className="text-center text-sm hover:underline md:text-right">
          Privacy Policy
        </a>
      </div>
    </footer>
  )
}

export default Footer
