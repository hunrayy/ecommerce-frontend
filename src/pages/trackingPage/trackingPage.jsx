import React, { useState } from 'react';
import './trackingPage.css';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const TrackingPage = () => {
    const [trackingId, setTrackingId] = useState('')
    const [formError, setFormError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!trackingId){
            setFormError('Tracking ID is required')
        }else{
            setFormError(null)
            alert('hello')
        }
    }

    return <div>
        <Navbar />
        <div className="tracking-page-container">
            <div className="tracking-page-wrapper">
                <h2 className='mb-4'>Track Your Order</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Enter Tracking ID</label><br />
                        <input type="text" placeholder='Tracking ID' className={`form-control py-2 mt-2 ${formError && 'is-invalid'}`} onChange={(e)=> setTrackingId(e.target.value.trim())} />
                        {formError && <p className='text-danger'>{formError}</p>}
                    </div>
                    <div className="d-grid mt-4">
                        <button className='btn' style={{background: "purple", color: "white"}}>Track Order</button>
                    </div>
                </form>

            </div>
            
        </div>
        <Footer />
    </div>
};

export default TrackingPage;

