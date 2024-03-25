'use client'
import {useEffect, useState} from "react";
import api from "@/Utils/axios_init";
import {Button, List} from "antd";

export  default function Page(){
    const [deallist,setdeallist]=useState([])
    const [detaillist,setdetaillist]=useState([])
useEffect(()=>{
    const fetchdata=async ()=>{
            const res=await api.get('/deal',{params:{userid:Number(localStorage.getItem('userid'))}})
        console.log(res)
        const data=res.data.data
            setdeallist(data)
             const detaildata= await Promise.all(data.map(async i => {
             const  res= await api.get("/deal/detail", {params: {dealsId: i.dealId}})
                 return res.data.data
             }))
        console.log(detaildata)
        setdetaillist(detaildata)
    }


              fetchdata()
},[])
console.log(deallist)
    const showList= deallist.map(item=>{
        return(
            <>
            <List
                key={item.dealId}
                size="large"
                header={<div><span>{item.storeName}</span><span style={{marginLeft:'30px'}}>{item.dateTime}</span></div>}
                footer={
                <>
                    <div>总价：{item.amountCount}</div>
                <div>流水号:{item.dealId}</div>
                    <Button id={item.dealId} onClick={(e)=>{location.href='/mobile/comment/'+item.dealId}}>去评价</Button>
                </>
            }
                bordered
                dataSource={detaillist}
                renderItem={(i)=>{
                    return i.map(i=>{
                          if(i.dealsId==item.dealId)
                        return <List.Item><span>{i.dishName}</span><span>数量:{i.quantity}</span><span>小计:{i.subtotal}</span></List.Item>

                    })
                }}
            />
                <br/>
            </>
        )
    })

    // const showList2=deallist.map(item=>{
    //
    //  const details=  detaillist.filter(i=>i['dealsId']==item.dealId)
    //   return    details.map(i=>{
    //                     i.map(i=>
    //       {
    //           return (
    //               <>
    //                   <div>{item.storeName}</div>
    //                   <div>{i['dishName']}</div>
    //               </>
    //           )
    //       })
    //      })
    // }
    const showList2=detaillist.map(item=>{
        return item.map(item=>{

            return (<div>{item.dishName}</div>)
        })

    })
return(
    <>
                <h3 style={{marginLeft:'40%'}}>我的订单</h3>
                       {showList}

    </>
    )
}
