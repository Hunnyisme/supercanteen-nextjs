'use client'
import './page.css';
import {useState} from "react";
import {useRef} from "react";
import '/public/iconfont/iconfont.css'
import Link from "next/link";
import {generateUUID} from "@/Utils/utils";
export  default function Page({params}){
  const sellerid=params.sellerid;
 const bgi="/upload/sellerbgi.jpeg";
 const [tabstate,settabstate]=useState(0);
 const [category_tab_sate,set_category_tab_state]=useState(0);
 const tab_list=[{
     id:0,
     name:'黑糖蒸煮奶茶系列'
 },
     {
         id:1,
         name: '荤菜'
     },
     {
         id:2,
         name:'素菜'
     },
     {
         id:3,
         name:'主食'
     },
     {
         id:4,
         name:'主食'
     },
     {
         id:5,
         name:'主食'
     },
     {
         id:6,
         name:'主食'
     },
     {
         id:7,
         name:'主食'
     },
     {
         id:8,
         name:'主食'
     },
     {
         id:9,
         name:'主食'
     }
     ,
     {
         id:10,
         name:'主食'
     }
     ,
     {
         id:11,
         name:'主食'
     }
 ];
 const meal_list=[{id:0,cate_id:0,cate_name:'黑糖蒸煮奶茶系列',meals:1,img:''},{id:1,cate_id:0,cate_name:'黑糖蒸煮奶茶系列',meals:2,img:''},{id:2,cate_id:0,cate_name:'黑糖蒸煮奶茶系列',meals:3,img:''},
     {id:3,cate_id:0,cate_name:'黑糖蒸煮奶茶系列',meals:4,img:''},{id:4,cate_id:0,cate_name:'黑糖蒸煮奶茶系列',meals:5,img:''},{id:5,cate_id:0,cate_name:'黑糖蒸煮奶茶系列',meals:6,img:''},{id:6,cate_id:0,cate_name:'黑糖蒸煮奶茶系列',meals:7,img:''},{id:7,cate_id:1,cate_name:'荤菜',meals:8,img:''},
     {id:8,cate_id:1,cate_name:'荤菜',meals:9,img:''},
     {id:9,cate_id:1,cate_name:'荤菜',meals:9,img:''},
     {id:10,cate_id:1,cate_name:'荤菜',meals:9,img:''},
     {id:11,cate_id:1,cate_name:'荤菜',meals:9,img:''}
 ]
 const show_tab_list=tab_list.map(e=>
     <li key={e.id} id={e.id} className={category_tab_sate===e.id?'tab-vertical-active':''}>{e.name}</li>
 );
    const cate_refs=[];
 const show_meal_list=[];
  for(let i=0;i<tab_list.length;i++){
   cate_refs.push(useRef(null))
 show_meal_list.push(<h4 key={generateUUID()} ref={cate_refs[i]}>{tab_list[i].name}</h4>);
const list=meal_list.filter(e=>e.cate_id===tab_list[i].id)
      for(let j=0;j<list.length;j++){
          show_meal_list.push(<li key={generateUUID()}>{list[j].meals}</li>)
      }
  }


    return(
        <div className={'Seller'}>
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
                    <li className={tabstate===0?'tab_active':''} onClick={event => settabstate(0)}>点菜</li>
                    <li className={tabstate===1?'tab_active':''} onClick={event => settabstate(1)}>评价</li>
                </ul>
            </div>
            <div className={tabstate===0?'dish-tab':'disabled'}>
                <ul className={'tab-vertical'} onClick={event =>{ set_category_tab_state(Number(event.target.id));
                    const options={

                    };
                     cate_refs[Number(event.target.id)].current.scrollIntoView(options)
                }}>
                    {show_tab_list}
                </ul>
                <ul className={'dish-vertical'}>
                    {show_meal_list}
                </ul>
            </div>
            <div className={tabstate===1?'comment-tab':'disabled'}>
                2
            </div>
        </div>
    )
}
