'use client'
import {useEffect, useState} from "react";
import api from "@/Utils/axios_init";
import {Button, Checkbox, List} from "antd";
import Link from "next/link";

export  default function Page(){
    const [dishimgdatalist,setdishimgdatalist]=useState([])
    const [countValue,setcountValue]=useState(0)
    const [selectedItems, setSelectedItems] = useState([]);
    useEffect(() => {
        const fetchdata=async ()=>{
         const res=  await api.get('/cart/list',{params:{userid:Number(localStorage.getItem('userid'))}})
         const data=res.data.data
            console.log(data)
         const newdatalist= await Promise.all(data.map(async item=>{
                                     console.log(item)
              const temdatalist= await Promise.all(item.map(async i=>{
                                    if(i.hasOwnProperty('picture')){
                                        const res= await api.get('/file',{params:{filename:String(i.picture)},
                                            responseType: 'arraybuffer'
                                        })
                                        const blob = new Blob([new Uint8Array(res.data)]);
                                        const imgUrl = URL.createObjectURL(blob);
                                        setcountValue(i.count)
                                        return{
                                            imgUrl:imgUrl,
                                            name:i.dishName,
                                            price:i.dishPrice,
                                            dishId:i.dishId,
                                            count:i.count,
                                            cartId:i.cartId
                                        }
                                    }else{
                                        return {
                                            name:i.name
                                        }

                                    }
                                }))

                       return temdatalist
            }))
            setdishimgdatalist(newdatalist)
        }
        fetchdata()
    }, []);
    function doPost(){

     api.post('/deal',{
         dealDtos:selectedItems,
         userid:Number(localStorage.getItem('userid'))
     })
           location.href='/mobile/postdeal'
    }
    console.log(dishimgdatalist)
    console.log(selectedItems)
    return(
        <>
                       <h3 style={{marginLeft:'45%'}}>购物车</h3>
                      <List
                          size="small"
                          dataSource={dishimgdatalist}
                          renderItem={item => {
                                return        item.map(i=>{
                                        if(i.hasOwnProperty('imgUrl')){

                                            return <List.Item  ><Checkbox onChange={e => {
                                                if (e.target.checked) {
                                                    // 如果复选框被选中，将该条目信息添加到选中的条目数组中
                                                    setSelectedItems([...selectedItems, i]);
                                                } else {
                                                    // 如果复选框被取消选中，从选中的条目数组中移除该条目信息
                                                    setSelectedItems(selectedItems.filter(selectedItem => selectedItem.cartId !== i.cartId));
                                                }
                                            }} id={i.cartId} >
                                                <img src={i.imgUrl}
                                                                   style={{height: '50px', width: '50px',}}
                                                                   alt=""/>{i.name}
                                                <Link rel="stylesheet" style={{color:'blue',marginLeft:'80px',marginRight:'5px'}} href="#">
                                                减少</Link>
                                            {
                                                countValue
                                            }
                                            <Link rel="stylesheet" style={{color:'blue',marginLeft:'5px'}} href="#">
                                            增加 < /Link>
                                                <span style={{marginLeft:'40px'}}>{i.price*i.count}元</span>
                                            </Checkbox>
                                        </List.Item>

                                        }else{
                                            return <List.Item>{i.name} </List.Item>
                                        }
                                    })

                          }
                          }
                      >
                      </List>
                     <Button onClick={doPost}>下单</Button>
        </>
    )

}
