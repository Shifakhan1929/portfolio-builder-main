"use client"
import { db } from "@/utils"
import { userInfo } from "@/utils/schema"
import { eq } from "drizzle-orm"
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import { UserDetailContext } from "../_context/UserDetailContext"
import { useState } from "react"
import { PreviewUpdateContext } from "../_context/PreviewUpdateContext"

const Provider=({children})=>{

    const {user}=useUser()
    const [userDetail,setUserDetail]=useState([])
    const [updatePreview,setUpdatePreview]=useState(0)

    useEffect(()=>{
        if(user){
            getUserDetails()
        }
    },[user])

    const getUserDetails=async()=>{
        // when select() is empty, it will fetch all the columns from the table by default
        const result=await db.select().from(userInfo)
        .where(eq(userInfo.email,user?.primaryEmailAddress?.emailAddress))

        setUserDetail(result[0])
    }

    return(
        <PreviewUpdateContext.Provider value={{updatePreview,setUpdatePreview}} >
        <div>
            {children}
        </div>
        </PreviewUpdateContext.Provider>
    )
}
export default Provider