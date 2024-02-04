'use client'
import './page.css'
import '/public/iconfont/iconfont.css'
import Link from "next/link";
import {linkGc} from "next/dist/client/app-link-gc";
export default function Page({params}){
const canteen_info={
    id:0,
    img:[{img_id:0,url:'/upload/canteen/thefirst.jpeg'}],
    name:'华商第一食堂',
    phone:'19333333',
    address:'华商街1号'
};
const show_img=canteen_info.img.map(e=>
    <li key={canteen_info.img.img_id}><img src={e.url} alt=""/></li>
)
    return(
        <>
            <div className="header-evaluation">
                <Link href={'/mobile/evaluation'}><i className={'iconfont icon-fanhui'}></i></Link>
                <span>评分详情</span>
            </div>
            <div className="canteen-info">
                <p><strong>{canteen_info.name}</strong></p>
                <p>{canteen_info.address}</p>
                <p>{canteen_info.phone}</p>
            </div>
            <h3>总分</h3>
            <h1>59</h1>
            <ul className={'parts_of_score'}>
                <li><p>卫生</p><h2>1</h2></li>
                <li><p>服务</p><h2>20</h2></li>
                <li><p>口味</p><h2>30</h2></li>
                <li><p>环境</p><h2>40</h2></li>
            </ul>
            <div className="canteen-photos">
                <p>商家相册</p>
                <ul>
                    {show_img}
                </ul>
            </div>
            .
        </>
    )
}