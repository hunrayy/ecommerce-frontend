


import { useNavigate } from "react-router-dom"
const Logo = () => {
    const navigate = useNavigate()
    return <div style={{cursor: "pointer"}}>
        <div style={{fontFamily: "cursive", fontSize: "35px", fontWeight: "bold"}}>
            <span style={{color: "#3788db"}}>B</span>
            <span style={{color: "#3788db"}}>B</span>
            <span style={{color: "#573e8a"}}>K</span>
        </div>

    </div>
}
export default Logo