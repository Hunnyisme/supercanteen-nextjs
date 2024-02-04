'use client'
import '../../components/footer'
import Footer from "@/components/footer";
import './page.css'
import {useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import {Autoplay} from "swiper/modules";
import Link from "next/link";
import Footer2 from "@/components/footer2";

export default function Page(){

    const [loaddingstatus,setloaddingstatus]=useState(false);
window.addEventListener('scroll',(e)=>{
    if(window.innerHeight+window.scrollY>=document.body.scrollHeight)
        console.log('到底')
       setloaddingstatus(true);
})

const[val,setVal]=useState("");
const uploadPath='/upload/'
let carousels=['carousel1.png','carousel2.png']
    const suggestStoreList =[
        {
            id:0,
            name:'麦当劳...',
            img:'/upload/storeimg/m.png'
        },
        {
            id:1,
            name:'塔斯丁',
            img:'/upload/storeimg/m.png'
        },
        {
            id:2,
            name:'塔斯丁',
            img:'/upload/storeimg/m.png'
        },
        {
            id:3,
            name:'塔斯丁',
            img:'/upload/storeimg/m.png'
        },
        {
            id:4,
            name:'塔斯丁',
            img:'/upload/storeimg/m.png'
        },
        {
            id:5,
            name:'塔斯丁',
            img:'/upload/storeimg/m.png'
        },
        {
            id:6,
            name:'塔斯丁',
            img:'/upload/storeimg/m.png'
        },
        {
            id:7,
            name:'塔斯丁',
            img:'/upload/storeimg/m.png'
        }
    ];
const showMealList=[

    {
        id:0,
        name:'这个汉堡也太好吃了吧我了格斗',
        img:'/upload/mealimg/hb.png'
    },
    {
        id:1,
        name:'汉堡',
        img:'/upload/mealimg/hb.png'
    },
    {
        id:2,
        name:'汉堡',
        img:'/upload/mealimg/hb.png'
    },
    {
        id:3,
        name:'汉堡',
        img:'/upload/mealimg/hb.png'
    },
    {
        id:4,
        name:'汉堡',
        img:'/upload/mealimg/hb.png'
    },
    {
        id:5,
        name:'汉堡',
        img:'/upload/mealimg/hb.png'
    },
];
const show_suggest_store_list=suggestStoreList.map((store)=>
 <SwiperSlide key={store.id}><div className={'suggest-store-slide'}><Link href={'#'}><img src={store.img}/><h4>{store.name}</h4>
     </Link></div>
 </SwiperSlide>
);
const show_meal_list=showMealList.map(meal=><li key={meal.id}><a href={'#'}><img src={meal.img}/><p>{meal.name}</p></a></li>);
function onHandleChange(event){
     setVal(event.target.value);
 }
 let car_count=1;
    return(
        <section >
            <div className="head">
            <input  onChange={onHandleChange} className={'search'} type={'text'}/>
                <span className={'search-btn'}>搜索</span>
                 <span className={'iconfont icon-cart-full'}></span>
                <span className={car_count>0?'cart-count':'cart-count disactive'}>{car_count}</span>
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
                  <Link href={'#'}>全部<span className={'iconfont icon-right'}></span></Link>
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
              {show_meal_list}
          </ul>
            </div>
            <img src={"loading.gif"} className={loaddingstatus?'loadding loaddingactive':'loadding'}/>
            <Footer2 initNum={0}/>
        </section>
    )
}
