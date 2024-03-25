'use client'
import {Button, Form, InputNumber, Rate} from "antd";
import {useEffect, useState} from "react";
import api from "@/Utils/axios_init";
import TextArea from "antd/es/input/TextArea";

export default function Page({params}){
const dealId=params.dealId
    const [dealdata,setdealdata]=useState({})
    const [envscore,setenvscore]=useState(0)
    const [serscore,setserscore]=useState(0)
    const [fooscore,setfooscore]=useState(0)
    const [hygscore,sethygscore]=useState(0)
    const [comment,setcomment]=useState("")
useEffect(()=>{
     const fetchdata=async ()=>{
      const res= await  api.get('/deal/one',{params:{dealId:dealId}})
       setdealdata(res.data.data)
     }

       fetchdata()
},[])

    function doPost(){
          api.post('/eva',{
              storeId:dealdata.storeId,
             dealId: dealId,
              envScore:envscore,
              serScore:serscore,
              fooScore:fooscore,
              hygScore:hygscore,
              textComment:comment,
              userId:localStorage.getItem('userid')
          }).then(res=>{
                location.href='/mobile/comment'
          })

    }
return(
    <>
                 <h3 style={{marginLeft:'40%'}}>评价页</h3>
        <br/>
                 <h3 style={{marginLeft:'30%'}}>您对{dealdata.storeName}的评价是：</h3>
        <Form

            layout="horizontal"
            style={{
                maxWidth: 300,
                marginLeft:'10%'
            }}
        >
         <Form.Item label={'环境(1-10)'}>
             <Rate count={10} onChange={(e)=>setenvscore(e)}/>
         </Form.Item>
            <Form.Item label={'服务(1-10)'} >
                <Rate count={10} onChange={(e)=>setserscore(e)}/>
            </Form.Item>
                 <Form.Item label={'口味(1-10)'}>
                     <Rate count={10} onChange={(e)=>setfooscore(e)}/>
                 </Form.Item>
            <Form.Item label={'卫生(1-10)'}>
                <Rate count={10} onChange={(e)=>sethygscore(e)}/>
            </Form.Item>
            <Form.Item label={'文字评价'} >
                <TextArea
                    maxLength={200}
                    placeholder=""
                    autoSize={{
                        minRows: 2,
                        maxRows: 6,
                    }}
                 onChange={(e)=>{setcomment(e.target.innerText)}}
                />
            </Form.Item>
            <Form.Item>
            <Button onClick={doPost}>提交</Button>
            </Form.Item>
        </Form>
    </>
)
}
