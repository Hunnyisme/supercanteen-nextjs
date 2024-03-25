'use client'
import {Button} from "antd";

export default function Page(){



    return(<>
                  <h3 style={{marginLeft:'40%'}}>评价成功</h3>

            <Button style={{marginLeft:'40%'}} onClick={()=>{
                location.href='/mobile'
            }}>回到首页</Button>
        </>
    )
}
