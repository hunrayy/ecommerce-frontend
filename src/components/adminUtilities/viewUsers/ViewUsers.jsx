

import { useState, useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import BasicLoader from "../../loader/BasicLoader"





const ViewUsers = () => {
    const [allUsers, setAllUsers] = useState([])
    const [allUsersLoading, setAllUsersLoading] = useState(true)
    const [serverError, setServerError] = useState({
        status: false,
        message: ""
    })

    const getUsers = async() => {
        const token = Cookies.get('authToken')
        const feedback = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/get-all-users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(feedback)
        setAllUsersLoading(false)
        if((feedback).data.code == "success"){
            setAllUsers((feedback).data.data)
        }else{
            setServerError({
                status: true,
                message: feedback.data.message
            })
        }
    }
    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    }
    useEffect(()=> {
        getUsers()
    }, [])

    if(allUsersLoading){
        return <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <BasicLoader />
        </div>
    
    }
    if(serverError.status){
        return <div className="alert alert-danger">{serverError.message}</div>

    }
    return <div>
        <div className="bread-crumb">
                    <div>Showing 1 - {allUsers.length} of {allUsers.length} users</div>
                </div>
        
        {
            allUsers && allUsers.map((each_user, index) => {
                
                return <div key={index} className="admin-view-all-users-container mb-2" style={{display: "flex", alignItems: "center", background: "#f4f4f4", gap: "5px"}}>
                    <div>
                        {/* <span>{allUsers.length - index}</span> */}
                        <img style={{maxWidth: "40px", maxHeight: "40px", borderRadius: "50%", objectFit: "cover"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ891HLuugNKthcStMIQ3VD_phd6XrcYAhkjA&s" alt="user image" />

                    </div>
                    <div style={{display: "flex", flexWrap: "wrap", gap: "2px", flexDirection: "column"}} className="flex-md-row">
                        <div><b>First name:</b> {each_user.firstname}</div>
                        <div><b>Email:</b> {each_user.email}</div>
                        <div><b>Created at:</b> {formattedDate(each_user.created_at)}</div>
                    </div>
                </div>
            })
        }


    </div>

    // return <div>
    //     <div className="bread-crumb">
    //                 <div>Showing 1 - {allUsers.length} of {allUsers.length} users</div>
    //             </div>
        
    //     {
    //         allUsers && allUsers.map((each_user, index) => {
                
    //             return <div key={index} style={{display: "flex", gap: "10px"}}>
    //                 <div>
    //                     <img style={{maxWidth: "40px", maxHeight: "40px", borderRadius: "50%", objectFit: "cover"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ891HLuugNKthcStMIQ3VD_phd6XrcYAhkjA&s" alt="user image" />

    //                 </div>
    //                 <div>
    //                     <div><b>First name:</b> {each_user.firstname}</div>
    //                     <div><b>Email:</b> {each_user.email}</div>
    //                     <div><b>Created at:</b> {formattedDate(each_user.created_at)}</div>
    //                 </div>
    //             </div>
    //         })
    //     }


    // </div>
}

export default ViewUsers