'use client'
export default function Page(){
    let i=""
    let list=[1,2,3]

    function f() {
        i="hahhaah"
    }
   const res=   list.map(async item=>{
               await console.log(item)

      })
f()
    return(
        <>
            {i}
           
        </>
    )
}
