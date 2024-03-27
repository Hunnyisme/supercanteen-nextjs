'use client'
import {useEffect, useState} from "react";
import api from "@/Utils/axios_init";
import {Button, Input, message, Modal} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import {  Upload } from 'antd';
import {generateUUID} from "@/Utils/utils";
import { useRef } from 'react';
import {decodeFromBase64} from "next/dist/build/webpack/loaders/utils";
import Showdishlist from "@/components/showdishlist";
export  default function Page({params}){
    const [messageApi, contextHolder] = message.useMessage();
   const[cateName,setCateName]=useState('')
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const[input_value_name,setInputValueName]=useState("")
    const[input_value_price,setInputValuePrice]=useState(0.0)

    const[uid,setuid]=useState('')
    const [fileList, setFileList] = useState([]);
    const[dishlist,set_dishlist]=useState([])
    const [uoploadfilename,setuploadfilename]=useState('')
    //const dishlistref = useRef(null);
    //const[imglist,setimglist]=useState([])
    const[imgdata,setimgdata]=useState(null)
    useEffect(()=>{
        api.get('/category/name',{
            params:{
                id:Number(params.id)
            }
        }).then(res=>{
                  setCateName(res.data.data)
        })

        api.get('/dish',{
            params:{
                id:Number(params.id)
            }
        }).then((res)=>{
            set_dishlist(res.data.data)
        })

    },[])
    // const show_dish=dishlist.map(item=>{
    //    api.get("/file",{
    //        params:{
    //            filename:String(item.picture)
    //        }
    //    }).then(res=>{
    //        const blob=new Blob([res.data])
    //        setimgdata(URL.createObjectURL(blob))
    //    })
    //     return(
    //         <>
    //           <li key={item.id} ><img src={imgdata} alt="无"/>{item.name}</li>
    //         </>
    //     )
    // })
    const showModal = () => {
        setOpen(true);
    };
//document.createElement('img')
    function doUpload({file,onSuccess,onError}){
        const formdata=new FormData
        const uuid=generateUUID()
        //setuid(generateUUID)
        formdata.append('uid',String(uuid))
        formdata.append('picture',file)
        console.log(file.name.split('.')[1])
        console.log(uid)
        setuploadfilename(CombinePicFileName(uuid,file.name.split('.')[1]))
        api.post('/file',formdata).then(res=>{
            console.log(res)
            onSuccess(res.data,file)
        }).catch(res=>{
            onError(res.data)
        })
    }
    const handleOk = () => {
        setConfirmLoading(true)
        console.log(input_value_name)
        console.log(input_value_price)
        api.post("/dish",{
         name:String(input_value_name),
            price:Number(input_value_price),
            relatedCate:Number(params.id),
            picture:String(uoploadfilename)
        }).then(res=>{
                if(res.data.status_code!=200)
                {
                    setConfirmLoading(false);
                    messageApi.open({
                        type:'error',
                        content:res.data.mess
                    })
                }else{
                    setOpen(false);
                    setConfirmLoading(false);
                    setInputValueName("")
                    setInputValuePrice("")
                    setFileList([])
                   window.location.reload()
                }

            }
        )

    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
        setConfirmLoading(false);
        setInputValueName("")
        setInputValuePrice("")
        setFileList([])
      //  setInputValue("")
    };
    let dat={id:111}
    function CombinePicFileName(uid,postfix){

      return uid+'.'+postfix
    }


    const handleUpload = ({ fileList: newFileList }) => {
        // 保存图片地址
        setFileList(newFileList);
    };
    return (
        <>
            {contextHolder}
            <h2 style={{marginLeft: '40%'}}>您正在管理{cateName}分组</h2>
            <Button style={{marginLeft: '800px'}} onClick={showModal}>添加菜品</Button>
           <Showdishlist dishlist={dishlist}></Showdishlist>
            <Modal
                title="请输入菜品信息"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <label>请输入菜名 <Input value={input_value_name} onChange={(e) => {
                    setInputValueName(e.target.value)
                }} placeholder=""/></label>
                <label>请输入价格 <Input value={input_value_price} onChange={(e) => {
                    setInputValuePrice(e.target.value)
                }} placeholder=""/></label>
                <label>
                    上传菜品图片<br/>
                    <Upload
                        customRequest={doUpload}
                        listType="picture"
                        className="upload-list-inline"
                        maxCount={1}
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleUpload}
                        fileList={fileList}
                    >
                        <Button icon={<UploadOutlined/>}>Upload</Button>
                    </Upload>
                </label>
            </Modal>
        </>
    )
}
