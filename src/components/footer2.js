'use client'
import Link from "next/link";
import './footer.css'
import '../../public/iconfont/iconfont.css'
import {useState} from "react";
export default function Footer2({initNum}){
    const classname='footer '
    const currentUrl=window.location.pathname
    let liClassName1=['iconfont','icon-home-filling']
    let liClassName2=['iconfont','icon-comment-filling']
    let liclssname3=['iconfont','icon-user-filling']
    let  liClassName=[liClassName1,liClassName2,liclssname3]
    console.log(`这是${currentUrl}下的footer组件`)
    console.log('初始值是'+initNum)
// const[index,setIndex]=useState(initNum);
//     console.log('index值是'+index)

    return(
        <>
            <div className={classname}>
                <ul>
                    <Link href={"/mobile"}   >
                        <li  ><span className={initNum===0?liClassName[0].join(" ")+' active':liClassName[0].join(" ")}></span><p>首页</p></li>
                    </Link>
                    <a href={"/mobile/evaluation"}
                    >
                        <li ><span className={initNum===1?liClassName[1].join(" ")+' active':liClassName[1].join(" ")}></span><p>评价</p></li>
                    </a>
                    <Link href={"/mobile/user"}
                    >
                        <li ><span className={initNum===2?liClassName[2].join(" ")+' active':liClassName[2].join(" ")}></span><p>我的</p></li>
                    </Link>
                </ul>
            </div>
        </>
    )
}