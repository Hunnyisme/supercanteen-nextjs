import React, { useState, useEffect } from 'react';
import api from "@/Utils/axios_init";
import Link from "next/link";
import {Image} from "antd";
export default function Showdishlist({dishlist}){
    const [imgDataList, setImgDataList] = useState([]);

    useEffect(() => {
        // 循环遍历 dishlist，为每个菜品获取图片数据
        const fetchData = async () => {
            const newDataList = await Promise.all(dishlist.map(async item => {
                try {
                    const res = await api.get("/file", {
                        params: {
                            filename: String(item.picture)
                        },
                        responseType: 'arraybuffer'
                    });
                    const blob = new Blob([res.data]);
                    const imgUrl = URL.createObjectURL(blob);
                    console.log(item.price)
                    return { id: item.id, imgUrl: imgUrl, name: item.name ,price:item.price};
                } catch (error) {
                    console.error('Error fetching image:', error);
                    return { id: item.id, imgUrl: null, name: item.name, price:item.price };
                }
            }));
            setImgDataList(newDataList);
        };

        fetchData();

        // 组件卸载时释放所有 URL 对象
        return () => {
            imgDataList.forEach(data => {
                if (data.imgUrl) {
                    URL.revokeObjectURL(data.imgUrl);
                }
            });
        };
    }, [dishlist]); // 监听 dishlist 变化

    return (
        <div>
            {imgDataList.map(data => (
                <li key={data.id} style={{marginTop:'10px'}}>
                    {data.imgUrl ? <Image preview={true} src={data.imgUrl} style={{height:'60px',width:'60px',marginRight:'10px'}}  alt={''}/> : <span>无图片</span>}
                    <span >{data.name}</span>
                     <span style={{position:'relative',left:'850px'}}>{data.price}元</span>
                    <Link href={'#'} style={{color:'skyBlue',position:'relative',left:'900px'}} onClick={(e)=>{
                        api.delete('/dish',{
                            params:{
                                id:Number(data.id)
                            }
                        }).then(res=>{
                            window.location.reload();
                        })
                    }}> 删除</Link>
                </li>
            ))}
        </div>
    );



}
