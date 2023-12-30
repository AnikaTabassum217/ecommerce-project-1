import React, { useContext } from "react";

import { SettingContext } from "../components/SettingProvider";

const Footer=()=>{
    const SettingDataFromContext = useContext(SettingContext) 
    return(
        <>
       
       <div className="bg-slate-950 text-white grid lg:grid-cols-4 p-2 mr-0 ">
                <div className="ml-48 lg:block  hidden">
                <h1 className="font-bold hover:text-orange-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110" >Product</h1>
                    <div className="ml-8 mt-2 font-semibold ">
                    <p className="hover:text-sky-500 ">Teams</p>
                    <p className="hover:text-sky-500 ">Advertising</p>
                    <p className="hover:text-sky-500">Talent</p>
                    <p className="hover:text-sky-500">Electronics</p>
                    </div>
                        
                </div>
                <div className="ml-48 lg:block hidden">
                    <h1 className="font-bold hover:text-orange-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">Network</h1>
                        <div className="ml-8 mt-2 font-semibold ">
                            <p className="hover:text-sky-500">Audi MMI</p>
                            <p className="hover:text-sky-500">Cockpit</p>
                            <p className="hover:text-sky-500">Blutooth</p>
                            <p className="hover:text-sky-500">Smartphone</p>
                        </div>
                </div>
                <div className="ml-48 lg:block hidden">
                    <h1 className="font-bold hover:text-orange-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">Company</h1>
                        <div className="ml-8 mt-2 font-semibold">
                        <p className="hover:text-sky-500">Jaguar</p>
                        <p className="hover:text-sky-500">Lexus</p>
                        <p className="hover:text-sky-500">BMW</p>
                        <p className="hover:text-sky-500">Land Rover</p>  
                        </div>                          
                </div>
                <div  className="ml-40">
                    <h1 className="font-bold hover:text-orange-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">Follow us</h1>
                    <div className="flex flex-wrap mt-8">
                       <p>{SettingDataFromContext?.footerManagement?.office_contact}</p>
                       <p>{SettingDataFromContext?.footerManagement?.email}</p>
                       <p>{SettingDataFromContext?.footerManagement?.hotline_no}</p>
                       
                    </div>
                </div>
        </div>
        </>
    )

}
export default Footer