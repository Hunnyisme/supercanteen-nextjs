'use client'
import '../../components/footer'
import Footer from "@/components/footer";
import './page.css'
import {useEffect, useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import {Autoplay} from "swiper/modules";
import Link from "next/link";
import Footer2 from "@/components/footer2";
import api from "@/Utils/axios_init";

export default function Page(){
    const [loaddingstatus,setloaddingstatus]=useState(false);
    const[storeImgDataList,setStoreImgDataList]=useState([])
    const[dishImgDataList,setdishImgDataList]=useState([])
    const [car_count,setcar_count]=useState(0)
    const [storeId,setStoreId]=useState(0)
window.addEventListener('scroll',(e)=>{
    if(window.innerHeight+window.scrollY>=document.body.scrollHeight)
        console.log('到底')
       setloaddingstatus(true);
})

const[val,setVal]=useState("");
const uploadPath='/upload/'
let carousels=['carousel1.png','carousel2.png']

    useEffect(() => {
        api.get("/cart/get",{params:{userid:localStorage.getItem('userid')}}).then(res=>{
            console.log(res.data)
            setcar_count(Number(res.data.data))
        })

        const fetchData = async () => {
            try {
                const res = await api.get('/store');
                const storeList = res.data.data;
                const newDataList = await Promise.all(storeList.map(async item => {
                    const res = await api.get("/store/pic", {
                        params: {
                            iconAddress: encodeURIComponent(item.iconAddress)
                        },
                        responseType: 'arraybuffer'
                    });
                    const blob = new Blob([new Uint8Array(res.data)]);
                    const imgUrl = URL.createObjectURL(blob);
                    return {
                        id: item.id,
                        imgUrl: imgUrl,
                        name: item.name,
                        address: item.address,
                        profile: item.profile,
                        overallScore: item.overallScore,
                        foodScore: item.foodScore,
                        envScore: item.envScore,
                        attScore: item.attScore
                    };
                }));
                setStoreImgDataList(newDataList);
            } catch (error) {
                console.error('Error fetching store data:', error);
            }
        };

        const fetchdata2 = async () => {
            try {
                const res = await api.get('/dish/all');
                const dishlist = res.data.data;
                const newDataList = await Promise.all(dishlist.map(async item => {
                    const res = await api.get("/file", {
                        params: {
                            filename: encodeURIComponent(item.picture)
                        },
                        responseType: 'arraybuffer'
                    });
                    const blob = new Blob([res.data]);
                    const imgUrl = URL.createObjectURL(blob);
                    const res2 = await api.get('/store/bydish',{params:{dishId:item.id}})
                    return { id: item.id, imgUrl: imgUrl, name: item.name, price: item.price,store:res2.data.data.id };
                }));
                setdishImgDataList(newDataList);
            } catch (error) {
                console.error('Error fetching dish data:', error);
            }
        };

        fetchData();
        fetchdata2();

        return () => {
            storeImgDataList.forEach(data => {
                if (data.imgUrl) {
                    URL.revokeObjectURL(data.imgUrl);
                }
            });
            dishImgDataList.forEach(data => {
                if (data.imgUrl) {
                    URL.revokeObjectURL(data.imgUrl);
                }
            });
        };
    }, []);

    for (const item in dishImgDataList) {
        console.log(item)
    }
const show_suggest_store_list=storeImgDataList.map((store)=>
 <SwiperSlide key={store.id}><div className={'suggest-store-slide'}><Link href={'/mobile/seller/'+store.id}><img src={store.imgUrl}/><h4>{store.name}</h4>
     </Link></div>
 </SwiperSlide>
);

    const show_dish_list=dishImgDataList.map(dish=> {
           // api.get('/store/bydish',{params:{dishId:dish.id}}).then(res=>{
           //     const data=res.data.data
           //     setStoreId(data.id)
           // })

           return <li key={dish.id}><Link href={'/mobile/seller/'+dish.store}><img src={dish.imgUrl} alt={''}/><p>{dish.name}</p></Link></li>

        }
    )

//const show_meal_list=showMealList.map(meal=><li key={meal.id}><a href={'#'}><img src={meal.img}/><p>{meal.name}</p></a></li>);
function onHandleChange(event){
     setVal(event.target.value);
 }
console.log(car_count)
    return(
        <section >
            <div className="head">
            <input  onChange={onHandleChange} className={'search'} type={'text'}/>
                <span className={'search-btn'}>搜索</span>
                 <span className={'iconfont icon-cart-full'}></span>
                <span onClick={()=>{location.href='/mobile/cart'}} className={car_count>0?'cart-count':'cart-count disactive'}>{car_count}</span>
            </div>
           {/*<div className={'carousel'}>*/}
               {/*<img src={uploadPath+carousels[0]} />*/}
            <Swiper
                modules={[Autoplay]}
                autoplay={true}
                spaceBetween={50}
                slidesPerView={1}
            >
                <SwiperSlide><img className={'carousel'} src={uploadPath+carousels[0]}/></SwiperSlide>
                <SwiperSlide><img className={'carousel'} src={uploadPath + carousels[1]}/></SwiperSlide>
            </Swiper>
          <div className="suggestshop">
              <div className="suggestshop-head">
                  <h4>店铺推荐</h4>
                  <Link href={'/mobile/seller'}>全部<span className={'iconfont icon-right'}></span></Link>
              </div>
              <Swiper
                  modules={[Autoplay]}
                  autoplay={true}
                  spaceBetween={30}
                  slidesPerView={4}
              >
                  {show_suggest_store_list}
              </Swiper>
              </div>
            <div className="showmeal">
          <ul>
              {show_dish_list}
          </ul>
            </div>
            <img src={"loading.gif"} className={loaddingstatus?'loadding loaddingactive':'loadding'}/>
            <Footer2 initNum={0}/>
        </section>
    )
}
