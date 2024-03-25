import axios from "axios";
const api =axios.create(
    {
        baseURL:'http://localhost:8080/api'
    }
)
 api.interceptors.request.use((config)=>{
     const token=localStorage.getItem('token')

     token&&(config.headers.Authorization=`Bearer ${token}`)
     return config
 })
api.interceptors.response.use(config=>{
          if(config.data.mess=='用户身份认证失败，请重新登陆')
          {
              localStorage.removeItem('token')
              localStorage.removeItem('account')
              location.href='/mobile/user/auth/login'
          }else if(config.data.mess=='管理员身份认证失败，请重新登陆')
          {
              localStorage.removeItem('token')
              localStorage.removeItem('account')
              location.href='/pc/admin/auth/login'
          }
          return config

})

export  default api;
