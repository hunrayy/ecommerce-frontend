













import axios from 'axios'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
const DeliveredOrders = () => {

    const [deliveredOrders, setDeliveredOrders] = useState([])

    const [singleOrder, setSingleOrder] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    

    const getDeliveredOrders = async () => {
        const token = Cookies.get("authToken")
        const feedback = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/get-orders`, {
            params: {
                status: 'delivered'
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(feedback)
        setDeliveredOrders(feedback.data.data)
    }
    const handleViewMoreDeliveredOrders = (order) => {
        setSingleOrder(order)
    }


    useEffect(()=> {
        getDeliveredOrders()
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // This will format it based on the user's locale
    }

    
    return <div>
        <div className="pending-orders-container">
            <div className="table-responsiv">
            <table className="table caption-top table-bordered">
        <caption>Delivered Orders</caption>
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Tracking ID</th>
                {/* <th scope="col">Email</th> */}
                <th scope="col">Initaited at</th>
                <th scope="col">Updated at</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
        {
            deliveredOrders.map((each_item, index) => {

                return <tbody key={index}>
                    <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{each_item.tracking_id}</td>
                    {/* <td>{each_item.email}</td> */}
                    <td>{formatDate(each_item.created_at)}</td>
                    <td>{formatDate(each_item.updated_at)}</td>
                    <td>
                        <button className='btn btn-sm' style={{background: "purple", color: "white"}} onClick={()=> handleViewMoreDeliveredOrders(each_item)}>View more</button>
                    </td>
                    </tr>
                </tbody>
            })
        }
        </table>
            </div>
        </div>


        {/* view-more modal */}
        {
            singleOrder && <div className='single-order-container-overlay' onClick={()=> setSingleOrder(null)}>
                {console.log(singleOrder)}
                <div className="single-order-wrapper" onClick={(e)=> {e.stopPropagation()}}>
                <div style={{fontFamily: "Arial, sans-serif", color: "#333", lineHeight: "1.6"}}>
                    <h4 style={{color: "#333"}} className='mt-2'>Order Details:</h4>
                    <div className="row">
                        <div className='col-md-4 border py-2'>
                            <h5>User Profile</h5>
                            <p>
                                <b>Firstname:</b> {singleOrder.firstname}<br/>
                                <b>Lastname:</b> {singleOrder.lastname}<br/>
                                <b>Email:</b> {singleOrder.email}<br/>
                                <b>Phone Number:</b> {singleOrder.phoneNumber}<br/>
                            </p>
                        </div>
                        <div className='col-md-4 border py-2'>
                            <h5>Shipping Information</h5>
                            <p>
                                <b>Country:</b> {singleOrder.country}<br/>
                                <b>State:</b> {singleOrder.state}<br/>
                                <b>City:</b> {singleOrder.city}<br/>
                                <b>Address:</b> {singleOrder.address}<br/>
                                <b>Postal Code:</b> {singleOrder.postalCode ? singleOrder.postalCode : "nil"}<br/>
                                <b>Expected Date Of Delivery:</b> {singleOrder.expectedDateOfDelivery}<br/>
                            </p>
                        </div>
                        <div className='col-md-4 border py-2'>
                            <h5>Order Information</h5>
                            <p>
                                <b>Tracking ID:</b> {singleOrder.tracking_id}<br/>
                                <b>Transaction ID:</b> {singleOrder.transaction_id}<br/>
                                <b>Initiated At:</b> {formatDate(singleOrder.created_at)}<br/>
                                <b>Shipping Fee:</b> {singleOrder.shippingFee}<br/>
                                <b>Total:</b> {singleOrder.currency} {Number(singleOrder.totalPrice).toLocaleString()}<br/>
                            </p>
                        </div>
                    </div>
                    <h4 style={{color: "#333"}} className='mt-2'>Order Summary:</h4>
                    <div style={{display: "flex", flexWrap: "wrap", gap: "10px"}} className='border p-2 justify-content-center justify-content-md-start'>
                        {
                            
                            JSON.parse(singleOrder.products).map((product, index) => {
                                return <div className="card" key={index}>
                                    <img src={product.img} className="card-img-top" style={{maxHeight: "100px", objectFit: "contain"}} alt={`product image ${index + 1}`} />
                                    <div className="card-body">
                                        <div style={{textAlign: "center"}}>
                                            <p style={{margin: "0"}}><b>{product.name}</b></p>
                                            <p style={{margin: "0"}}>Length - {product.lengthPicked}</p>
                                            <p style={{margin: "0"}}>Quantity * {product.quantity}</p>
                                            <p style={{margin: "0"}}>Price: {singleOrder.currency} {Number(product.price).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                
                </div>
                </div>
                
            </div>
        }
    </div>
}
export default DeliveredOrders
