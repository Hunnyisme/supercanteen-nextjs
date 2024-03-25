'use client'
import './page.css';
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/Utils/axios_init";
import {List, message} from 'antd';

export default function Page({ params }) {
    const sellerid = params.sellerid;
    const bgi = "/upload/sellerbgi.jpeg";
    const [tabstate, settabstate] = useState(0);
    const [dishandcatelist, setdishandcatelist] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/dish/show", { params: { storeid: Number(sellerid) } });
                const data = res.data.data;
                console.log(data)
                const newDataList = await Promise.all(data.map(async (item) => {
                    const dish = item[0];
                    const dishData = item[1];
                    const dishList = await Promise.all(dishData.map(async (dishItem) => {
                        try {
                            const res = await api.get("/file", {
                                params: {
                                    filename: String(dishItem.picture)
                                },
                                responseType: 'arraybuffer'
                            });
                            const blob = new Blob([new Uint8Array(res.data)]);
                            const imgUrl = URL.createObjectURL(blob);
                            return {
                                id: dishItem.id,
                                imgUrl: imgUrl,
                                name: dishItem.name,
                            };
                        } catch (error) {
                            console.error('Error fetching dish image:', error);
                            return null;
                        }
                    }));
                    return [dish, ...dishList];
                }));
                setdishandcatelist(newDataList.flat());
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [sellerid]);
function addCart(e){
    console.log(e.target.id)
    api.get('/cart',{
            params:{
                dishid:Number(e.target.id),
                userid:Number(localStorage.getItem('userid'))
            }


    }).then(res=>{
        messageApi.open({
            type:'success',
            content:'添加购物车成功'
        })
    })

}
    const show_dish_list = (
        <List
            size="small"
            dataSource={dishandcatelist}
            renderItem={item => {
                if (!item.hasOwnProperty('imgUrl')) {
                    return <p>{item.name}</p>
                } else {
                    return <List.Item><img src={item.imgUrl} style={{height:'50px',width:'50px'}} alt=""/>{item.name}<Link id={item.id} onClick={addCart} href={'#'} style={{color:'blue'}}>添加</Link></List.Item>
                }
            }}
        />
    )

    return (

        <div className={'Seller'}>
            {contextHolder}
            <div className="nav-seller">
                <Link href={'/mobile'}><i className={'iconfont icon-fanhui'}></i></Link>
                <Link href={'/mobile'}><i className={'iconfont icon-favorites'}></i></Link>
            </div>
            <div className="background-img" style={{backgroundImage: `url(${bgi})`}}>
            </div>
            <div className="mask">
            </div>
            <div className="sellerhead">
                <h3>麦当劳</h3>
                <img src="/upload/storeimg/m.png" alt=""/>
                <p className={'sales'}>月售1000+</p>
                <p className={'announcement-title'}>公告</p>
                <p className={'announcement-content'}>12121212121212</p>
            </div>
            <div className="tab-align ">
                <ul>
                    <li className={tabstate === 0 ? 'tab_active' : ''} onClick={event => settabstate(0)}>点菜</li>
                    <li className={tabstate === 1 ? 'tab_active' : ''} onClick={event => settabstate(1)}>评价</li>
                </ul>
            </div>
            <div className={tabstate === 0 ? 'comment-tab' : 'disabled'}>
                {show_dish_list}
            </div>
            <div className={tabstate === 1 ? 'comment-tab' : 'disabled'}>
                2
            </div>
        </div>
    )
}
