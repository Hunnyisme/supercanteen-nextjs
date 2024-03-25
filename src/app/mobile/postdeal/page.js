'use client'
import {Button} from "antd";

export default function Page(){


    return (<>
            <h3 style={{marginLeft:'45%'}}>下单成功</h3>

            <Button style={{marginLeft:'40%',marginTop:'20%'}} onClick={()=>{
                location.href='/mobile/deal'
            }}>查看我的订单</Button>

        </>
        )
}
