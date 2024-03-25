'use client'
import './page.css'
import Footer2 from "@/components/footer2";
import Link from "next/link";
import '/public/iconfont/iconfont.css'
import {useEffect, useState} from "react";
import api from "@/Utils/axios_init";
export default function Page(){
    const [storeList,setstoreList]=useState([])
    const [imgstoreList,setimgstoreList]=useState([])
const canteen_lists=[
    {
        id:0,
        img:'/upload/canteen/thefirst.jpeg',
        score:70,
        name:'华商第一食堂'
    }
];
useEffect(()=>{
    const fetchdata=async ()=>{
        const res=await api.get('/store')
        const data=res.data.data
        setstoreList(data)
        console.log(res.data.data)
            const imgStoreList=await Promise.all(data.map(async item => {
                const res=  await api.get("/store/pic", {
                    params: {
                        iconAddress: encodeURIComponent(item.iconAddress)
                    },
                    responseType: 'arraybuffer'
                });
                const blob = new Blob([new Uint8Array(res.data)]);
                const imgUrl = URL.createObjectURL(blob);
                return {
                    id:item.id,
                    name:item.name,
                    address:item.address,
                    profile:item.profile,
                    imgUrl:imgUrl,
                    envScore:item.envScore,
                    foodScore:item.foodScore,
                    hygScore:item.hygScore,
                    serScore:item.serScore,
                    overallScore:item.overallScore
                }
            }))

        setimgstoreList(imgStoreList)
        console.log(imgStoreList)

    }
    fetchdata()

},[])
const show_canteen_lists=imgstoreList.map(e=>
    <li key={e.id}>
        <Link href={'/mobile/evaluation/'+e.id}><img src={e.imgUrl} alt=""/>
            <div><p>{e.name}</p>
                <p>得分:<span className={'score'}>{e.overallScore}/10</span></p></div>
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
