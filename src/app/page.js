'use client'
import  './page.css'
import '../components/footer'
import Footer from "@/components/footer";
export default function Page() {
  let userAgent = navigator.userAgent.toLowerCase()

  /* 设备信息： */
  // 移动端：mozilla/5.0 (linux; android 6.0; nexus 5 build/mra58n) applewebkit/537.36 (khtml, like gecko) chrome/87.0.4280.88 mobile safari/537.36
  // PC端：mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/87.0.4280.88 safari/537.36

  // 用正则检测设备信息
  let device = /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/;

  if(device.test(userAgent)){//检测出是移动端设备
    // 跳转到移动端页面
    window.location.href="http://localhost:3000/mobile"
  }else{
    // 跳转到PC端页面
    window.location.href = "http://localhost:3000/pc/admin"
  }

  return (
    <>

    </>
  )
}
