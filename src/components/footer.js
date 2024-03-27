'use client'
import './footer.css'
import '../../public/iconfont/iconfont.css'
import Link from "next/link";
import {useState} from "react";
export default function Footer({className=''}){
   const classname='footer '+className
const currentUrl=window.location.pathname
   let liClassName1=['iconfont','icon-home-filling']
    let liClassName2=['iconfont','icon-comment-filling']
    let liclssname3=['iconfont','icon-user-filling']
    let  liClassName=[liClassName1,liClassName2,liclssname3]
    let initNum=0;
   switch (currentUrl){
       case '/mobile': initNum=0; break;
       case '/mobile/user': initNum=2; break ;
       case '/mobile/evaluation': initNum=1; break ;
   }
const[index,setIndex]=useState(initNum);
    return(
        <>
        <div className={classname}>
            <ul>
                <Link href={"/mobile"}  onClick={e=>setIndex(0)} >
                    <li  ><span className={initNum===0?liClassName[0].join(" ")+' active':liClassName[0].join(" ")}></span><p>首页</p></li>
                </Link>
                <Link href={"/mobile/evaluation"} onClick={e=>setIndex(1)}
                >
                    <li ><span className={initNum===1?liClassName[1].join(" ")+' active':liClassName[1].join(" ")}></span><p>评价</p></li>
                </Link>
                <Link href={"/mobile/user" } onClick={e=>setIndex(2)}
                >
                    <li ><span className={initNum===2?liClassName[2].join(" ")+' active':liClassName[2].join(" ")}></span><p>我的</p></li>
                </Link>
            </ul>
        </div>
        </>
    )
}
