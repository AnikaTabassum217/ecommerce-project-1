import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
export const SettingContext = createContext();

const SettingProvider=({children})=>{

    const [setting, setSetting] = useState();

    useEffect(()=>{
        axios.get('https://uol-v-2.hostprohub.com/api/settings?platform=web')
        .then((respose)=>{
            setSetting(respose.data)
        })
        .catch((error)=>{
          console.log(error)
        })
    },[])
    console.log(setting)

   return(
    <SettingContext.Provider value={setting}>
    {children}
    </SettingContext.Provider>
   )
}
export default SettingProvider