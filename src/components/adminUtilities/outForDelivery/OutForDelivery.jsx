







import axios from 'axios'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
const OutForDelivery = () => {

    const [outForDeliveryOrders, setOutForDeliveryOrders] = useState([])

    const [singleOrder, setSingleOrder] = useState(null)
    const [deliveredModal, setDeliveredModal] = useState(null)
    const [trackingId, setTrackingId] = useState('');
    const [trackingIdError, setTrackingIdError] = useState('');
    const [verificationText, setVerificationText] = useState('');
    const [verificationTextError, setVerificationTextError] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    

    const getOutForDeliveryOrders = async () => {
        const token = Cookies.get("authToken")
        const feedback = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/get-orders`, {
            params: {
                status: 'outForDelivery'
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(feedback)
        setOutForDeliveryOrders(feedback.data.data)
    }
    const handleViewMoreOutForDeliveryOrders = (order) => {
        setSingleOrder(order)
    }


    useEffect(()=> {
        getOutForDeliveryOrders()
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // This will format it based on the user's locale
    }

    const handleMarkAsDelivered = (order) => {
        setSingleOrder(null)
        setDeliveredModal(order)
        console.log(order)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'trackingId') {
            setTrackingId(value);
            setTrackingIdError(''); // Reset error when changing input
        } else if (name === 'verificationText') {
            setVerificationText(value);
            setVerificationTextError(''); // Reset error when changing input
        }
    };

    const validateForm = () => {
        let isValid = true;

        // Validate Tracking ID
        if (trackingId.trim() !== deliveredModal.tracking_id) {
            setTrackingIdError('Tracking ID does not match');
            isValid = false;
        }

        // Validate Verification Text
        if (verificationText.trim().toLocaleLowerCase() !== 'delivered') {
            setVerificationTextError('Verification text must be "delivered"');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        const token = Cookies.get("authToken")
        e.preventDefault(); // Prevent default form submission
        if (validateForm()) {
            setIsLoading(true)
            // Proceed with the action, e.g., updating the order status
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/change-order-status-to-delivered`, {trackingId: trackingId}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((feedback) => {
                console.log(feedback)
                setIsLoading(false)
                if(feedback.data.code == "success"){
                    //filter out the pending order from the list of pending orders
                    setOutForDeliveryOrders((prev) => prev.filter(order => order.tracking_id !== deliveredModal.tracking_id))
                    setTrackingId('');
                    setVerificationText('');
                    setDeliveredModal(null)
                    setSingleOrder(null)
                    toast.success('Order status successfully updated')

                }else{
                    toast.error(feedback.data.message)
                }

            })
            
            // Reset form fields
            // setOutForDeliveryModal(null); // Close modal after submission
        }
    };

    
    return <div>
        <div className="pending-orders-container">
            <div className="table-responsiv">
            <table className="table caption-top table-bordered">
        <caption>Out-For-Delivery Orders</caption>
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
            outForDeliveryOrders.map((each_item, index) => {

                return <tbody key={index}>
                    <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{each_item.tracking_id}</td>
                    {/* <td>{each_item.email}</td> */}
                    <td>{formatDate(each_item.created_at)}</td>
                    <td>{formatDate(each_item.updated_at)}</td>
                    <td>
                        <button className='btn btn-sm' style={{background: "purple", color: "white"}} onClick={()=> handleViewMoreOutForDeliveryOrders(each_item)}>View more</button>
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
                                <b>First name:</b> {singleOrder.firstname}<br/>
                                <b>Last name:</b> {singleOrder.lastname}<br/>
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
                    <div className='d-flex justify-content-center justify-content-md-end mt-3'>
                        <button style={{background: "purple", color: "white"}} className='btn' onClick={()=>handleMarkAsDelivered(singleOrder)}>Mark as Delivered</button>
                    </div>
                
                </div>
                </div>
                
            </div>
        }

        {/* out for delivery modal */}
        {
            deliveredModal && <div>
                <div className="single-order-container-overlay" onClick={()=> {setDeliveredModal(null), setTrackingId(''), setVerificationText('')}}>
                    <div className="out-for-delivery-modal-wrapper" onClick={(e)=>e.stopPropagation()}>
                        <div className='px-3'>
                            <h4 style={{color: "#333"}} className='mt-2'>Delivered</h4>
                            {
                                isLoading && <span className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </span>
                            }
                            <p>
                                Are you sure you want to change the status of this order to "Delivered"? Once confirmed, 
                                the order status will be updated, and <b>{deliveredModal.firstname}</b> will be notified via email regarding this update. 
                                Please ensure that all necessary preparations for the delivery have been completed. 
                            </p>
                            <p>
                                This action cannot be undone, and the order will officially enter the "delivered" phase. 
                            </p>
                        </div>
                        <form style={{background: "#f4f4f4"}} className='p-3' onSubmit={handleSubmit} method='post'>
                            <div className="form-group">
                                <label>Enter the Tracking ID <b>{deliveredModal.tracking_id}</b> to continue:</label>
                                <input type="number" name='trackingId' value={trackingId} onChange={handleInputChange} min='1' required className='form-control' />
                                {trackingIdError && <small className="text-danger">{trackingIdError}</small>}
                            </div>
                            <div className="form-group mt-3">
                                <label>To verify, type <b>delivered</b> below:</label>
                                <input type="text" name='verificationText' value={verificationText} onChange={handleInputChange} required className='form-control' />
                                {verificationTextError && <small className="text-danger">{verificationTextError}</small>}
                            </div>
                            <div className='d-flex justify-content-between mt-3'>
                                <button className='btn border' onClick={()=> setDeliveredModal(null)}>Cancel</button>
                                <button className='btn' style={{color: "white", backgroundColor: "black"}} disabled={isLoading}>
                                    <b>Continue</b>
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        }
    </div>
}
export default OutForDelivery


