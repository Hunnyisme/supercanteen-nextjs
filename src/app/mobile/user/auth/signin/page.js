'use client'
import {Alert, Button, Checkbox, Form, Input} from "antd";
import {useState} from "react";
import api from "@/Utils/axios_init";
import { Typography } from 'antd';
const { Title } = Typography;
import './page.css'
import Link from "next/link";

export default function Page(){
    const[res,set_res]=useState({x:""})
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [input_value,set_input_value]=useState(null)
    const hidden_style={
        display:'none'
    }
    const display_style={
        display: 'block',
        marginTop:10
    }
    const [err_state,set_err_state]=useState('0')
    const [err_mess,set_err_mess]=useState('')
    function openAlert(mess){
        set_err_mess(mess)
        set_err_state('1')
        setTimeout(()=>{
            set_err_state('0')
        },2000)

    }
    return (
        <>

            <Title level={2} style={{marginLeft:150}}>注册</Title>
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
                    label="名称"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="邮箱"
                    name="email"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="手机号"
                    name="phone"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" onClick={
                        ()=>{
                      api.post('user/sign',input_value).then(res=>{
                          if(res.data.status_code==200){
                              localStorage.setItem('token',res.data.data.token)
                              localStorage.setItem('account',res.data.data.account)
                              location.href='/mobile'
                          }else{
                               openAlert(res.data.mess)
                          }
                      })
                        }
                    } >
                        提交
                    </Button>
                </Form.Item>
            </Form>
            <Link href={'login'}>已有账号?去注册</Link>

            <Alert message={err_mess} style={err_state==='0'?hidden_style:display_style} type="error" />
        </>
    )
}
