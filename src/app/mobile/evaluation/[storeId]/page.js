'use client'
import './page.css'
import '/public/iconfont/iconfont.css'
import Link from "next/link";
import {linkGc} from "next/dist/client/app-link-gc";
import {useEffect, useState} from "react";
import api from "@/Utils/axios_init";
import {List} from "antd";
import ListItem from "antd/es/upload/UploadList/ListItem";
export default function Page({params}){
    const [storeData,setStoreData]=useState({})
   const storeId=params.storeId
    const [evas,setevas]=useState([])
    useEffect(() => {
        const fetchdata=async ()=>{
             const res=await api.get('/store/one',{params:{storeId: storeId}})
                           const data=res.data.data
            setStoreData(data)
            console.log(data)
            const res2= await api.get('/eva', {params: {storeId: storeId}})
            const data2=res2.data.data
            setevas(data2)
            console.log(data2)
        }

        fetchdata()
    }, []);
    return(
        <>
            <div className="header-evaluation">
                <Link href={'/mobile/evaluation'}><i className={'iconfont icon-fanhui'}></i></Link>
                <span>评分详情</span>
            </div>
            <div className="canteen-info">
                <p><strong>{storeData.name}</strong></p>
                <p>{storeData.address}</p>
                <p>{storeData.profile}</p>
            </div>
            <h3>总分</h3>
            <h1>{storeData.overallScore}</h1>
            <ul className={'parts_of_score'}>
                <li><p>卫生</p><h2>{storeData.hygScore}</h2></li>
                <li><p>服务</p><h2>{storeData.serScore}</h2></li>
                <li><p>口味</p><h2>{storeData.foodScore}</h2></li>
                <li><p>环境</p><h2>{storeData.envScore}</h2></li>
            </ul>
            {/*<div className="canteen-photos">*/}
            {/*    <p>商家相册</p>*/}
            {/*    <ul>*/}
            {/*        {show_img}*/}
            {/*    </ul>*/}
            {/*</div>*/}
            <br/>
            <p>用户评论</p>
            <List
                dataSource={evas}
                bordered
                renderItem={(i) => {
                    return<>
                        <List.Item>
                            <p style={{marginBottom:'5px'}}>{i.userName}</p>
                            {i.textComment}
                        </List.Item>
                    </>
                }}
            />
        </>
    )
}
