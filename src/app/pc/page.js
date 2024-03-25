'use client'
import {Button, Checkbox, Form, Input} from "antd";
import api from "@/Utils/axios_init";
import Title from "antd/es/typography/Title";
import {useState} from "react";
import Link from "next/link";
import {offset} from "antd/es/tree/utils/dropIndicator";
import './page.css'
import { Alert, Space } from 'antd';
export default function Page(){

const hidden_style={
    display:'none'
}
const display_style={
    display: 'block',
    marginTop:10,
     marginLeft: 250
}
const item_style={
    marginLeft:250
}

    const [err_state,set_err_state]=useState('0')
    const [err_mess,set_err_mess]=useState('')
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [input_value,set_input_value]=useState(null)
   function openAlert(mess){
        set_err_mess(mess)
        set_err_state('1')
       setTimeout(()=>{
           set_err_state('0')
       },2000)

   }
    return (
        <>

            <Title level={2} style={{marginLeft: 350,marginTop:50}}>管理员登陆页面</Title>
            <Form onValuesChange={(changedValues,values)=>{

                set_input_value(values)
            }}
                  name="basic"
                  labelCol={{
                      span: 8,
                  }}
                  wrapperCol={{
                      span: 16,
                  }}
                  style={{
                      maxWidth: 600,
                  }}
                  initialValues={{
                      remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
            >
                <Form.Item
                    label="账号"
                    name="account"
                    style={item_style}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    style={item_style}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    style={item_style}
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>记住我</Checkbox>

                </Form.Item>
                <Form.Item
                    style={item_style}
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" onClick={
                        ()=>{
                            api.post('/admin',input_value).then(res=>{
                                if(res.data.status_code===200){
                                    localStorage.setItem('token',res.data.data.token);
                                    localStorage.setItem('account',res.data.data.account)
                                    localStorage.setItem('sotreName',res.data.data.storeName)
                                    location.href='/pc/admin/board/category'
                                }else{
                                    openAlert(res.data.mess)

                                }
                            })
                        }
                    } >
                        登陆
                    </Button>
                </Form.Item>
            </Form>

            <Alert message={err_mess} style={err_state==='0'?hidden_style:display_style} type="error" />
        </>
    )


}
