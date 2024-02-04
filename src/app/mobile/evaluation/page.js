'use client'
import './page.css'
import Footer2 from "@/components/footer2";
import Link from "next/link";
import '/public/iconfont/iconfont.css'
export default function Page(){
const canteen_lists=[
    {
        id:0,
        img:'/upload/canteen/thefirst.jpeg',
        score:70,
        name:'华商第一食堂'
    }
];
const show_canteen_lists=canteen_lists.map(e=>
    <li key={e.id}>
        <Link href={'/mobile/evaluation/'+e.id}><img src={e.img} alt=""/>
            <div><p>{e.name}</p>
                <p>得分:<span className={'score'}>{e.score}/90</span></p></div>
            <span className={'iconfont icon-right'}></span>
        </Link>
    </li>
)
    return (
        <>
            <ul className={'canteen-score-lists'}>
                {show_canteen_lists}
           </ul>
  <Footer2 initNum={1}></Footer2>
        </>
    )
}