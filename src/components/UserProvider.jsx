import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider=({children})=>{

    const [userData,setUserData] = useState();

    useEffect(()=>{

        if(localStorage.getItem('user')){
            setUserData(JSON.parse(localStorage.getItem('user')))
        }

    },[])
    console.log(userData)
       
    const updateUserData= newData =>{  // updateUserData function is used to update userData
        setUserData(newData)
    }


    return(
        <UserContext.Provider value={{userData, updateUserData}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider


