'use client'
import './page.css'
import '../../../../public/iconfont/iconfont.css'
import Link from "next/link";
import Footer from "@/components/footer";
import Footer2 from "@/components/footer2";
import api from "@/Utils/axios_init";
import {useEffect, useState} from 'react';
export default function Page() {

    const token= localStorage.getItem('token')
       const [userInfo,set_userInfo]=useState({name:'user'})
    // const router=useRouter()
    function doLogOut(){
        try {
            api.get("/user/logout",{
                params:{
                    account:String(localStorage.getItem('account'))
                }
            }).then(res=>{
                if(res.data.status_code==200){
                    localStorage.removeItem('account')
                    localStorage.removeItem('token')
                    location.href="/mobile/user"
                }
            })
        }catch (e){
            console.log(e)
        }

    }
          if(token != null){
              useEffect(()=>{
                  try {
                      api.get("/user",{params:{userid:localStorage.getItem('userid')}}).then(res=>{
                          set_userInfo(res.data.data)
                          console.log(res)
                      })
                  }catch (e){
                      console.log(e)
                  }

              },[])

              return (
                  <>
                      <div className={'user-area'}>
                          <img src={'/upload/user/aniya.png'}/>
                          <p><strong>{userInfo.name}</strong></p>
                      </div>
                      <div className={'user-order'}>
                          <span><i className={'iconfont icon-order'}></i>订单</span><Link href={'/mobile/deal'}><span>全部订单<i
                          className={'iconfont icon-right'}></i></span></Link>
                          <ul >
                              <li ><Link href={'#'}><i className={'iconfont icon-money-wallet'}></i><p>待支付</p></Link></li>
                              <li ><Link href={'#'}><i className={'iconfont icon-message-comments'}></i><p>待评价</p></Link></li>
                              <li><Link href={'#'}><i className={'iconfont icon-money-tax-rebate'}></i><p>待退款</p></Link></li>
                          </ul>
                      </div>
                      <div className="user-itemslist">
                          <ul >
                              <li><Link href={'#'}><span className={'iconfont icon-favorites'}></span>我的收藏<i className={'iconfont icon-right'}></i></Link></li>
                              <li><Link href={'#'}><span className={'iconfont icon-customer'}></span>个人信息<i className={'iconfont icon-right'}></i></Link></li>
                              <li><Link href={'#'}><span className={'iconfont icon-order-rejected'}></span>用户协议<i className={'iconfont icon-right'}></i></Link></li>
                              <li><Link href={'#'}><span className={'iconfont icon-order-inspection'}></span>隐私政策<i className={'iconfont icon-right'}></i></Link></li>
                              <li><Link href={'#'}><span className={'iconfont icon-warning'}></span>注销账户<i className={'iconfont icon-right'}></i></Link></li>
                          </ul>
                      </div>
                      <Link href={'#'} className={'quit-login'} onClick={doLogOut}>退出登陆</Link>
                      <Footer2 initNum={2}/>
                  </>)
          }else {
              return (<>
                  还未登陆，即将跳转...
                  {setTimeout(()=>{
                      location.href='/mobile/user/auth/login'
                  },1000)}
                  </>)

          }


}




