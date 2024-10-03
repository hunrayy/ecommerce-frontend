import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import firstPicture from "../../assets/firstPicture.png";
import secondPicture from "../../assets/secondPicture.png";
import thirdPicture from "../../assets/thirdPicture.png";
import "./banner.css";

const Banner = () => {
  const detailsObject = [
    {
      text: "Achieve silky smooth hair with our top-grade products. Easy to maintain and style for everyday glamour",
      imgSrc: firstPicture
    },
    {
      text: "Our hair extensions are designed for effortless beauty. Easy to apply, comfortable to wear, and stunning to look at",
      imgSrc: secondPicture
    },
    {
      text: "We offer top-quality hair products, excellent customer service, and unbeatable prices. Shop with confidence",
      imgSrc: thirdPicture
    }
  ];

  return (
    <div>
 
      <section className="pt-3 banner-component-container">
        <div className="container">
          <div className="row gx-3">
            <main className="col-lg-9">
              <Carousel
                // prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />}
                // nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}
                prevLabel={null}
                nextLabel={null}
                style={{zIndex: "1"}}
              >
                {detailsObject.map((item, index) => (
                  <Carousel.Item key={index}>
                    <div className="card-banner first-banner-container">
                      <img
                        src={item.imgSrc}
                        alt={`Slide ${index + 1}`}
                        style={{borderRadius: "10px"}}
                        // height="100%" width="100%"
                      />
                      <Carousel.Caption style={{ zIndex: "0" }}>
                        <h5 style={{ fontFamily: "cursive" }}>{item.text}</h5>
                      </Carousel.Caption>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </main>
            <aside className="col-lg-3">
              <div className="card-banner h-100 rounded-5 aside-banner-container" style={{ borderRadius: "10px", color: "black" }}>
                <div className='aside-banner-item'>
                  <i className="fa-sharp fa-solid fa-earth-americas" style={{ fontSize: "100px" }}></i>
                  <p className='mt-3' style={{ fontWeight: "bold" }}>World Wide Shipping</p>
                  <p className="">
                    Distance should never be a barrier between you & our luxurious hair hence why offer affordable worldwide shipping!
                  </p>
                </div>
                <div className='aside-banner-item'>
                  <i className="fa-sharp fa-solid fa-truck" style={{ fontSize: "100px" }}></i>
                  <p className='mt-3' style={{ fontWeight: "bold" }}>Fast and reliable shipping</p>
                  <p className="">
                    Express & reliable shipping services. FEDEX is our primary courier
                  </p>
                </div>
                <div className='aside-banner-item'>
                  <i className="fa-sharp fa-solid fa-headset" style={{ fontSize: "100px" }}></i>
                  <p className='mt-3' style={{ fontWeight: "bold" }}>24/7 Customer Support</p>
                  <p className="">
                    Our dedicated team is available around the clock to assist you with any queries or concerns you may have. Your satisfaction is our priority!
                  </p>
                </div>
                <div className='aside-banner-item'>
                <i class="fa-brands fa-instagram" style={{ fontSize: "100px" }}></i>
                  <p className='mt-3' style={{ fontWeight: "bold" }}>social media presence</p>
                  <p className="">
                    Follow us on instagram <a style={{color: "purple", textDecoration: "none"}} href="https://www.instagram.com/beauty_bykiaraa/" target="_blank" >@beauty_bykiara</a> and on tiktok <a style={{color: "purple", textDecoration: "none"}} href="https://www.tiktok.com/@beauty_bykiara"  target="_blank" >@beauty_bykiara</a>
                  </p>
                </div>
              </div>
            </aside>
       
          </div>
        </div>
      </section>
  
    </div>
  );
};

export default Banner;


































// import React from 'react';
// import Carousel from 'react-bootstrap/Carousel';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import firstPicture from "../../assets/firstPicture.png"
// import secondPicture from "../../assets/secondPicture.png"
// import thirdPicture from "../../assets/thirdPicture.png"
// import "./banner.css"

// const Banner = () => {
//   const detailsObject = [
//     {
//       text: "Achieve silky smooth hair with our top-grade products. Easy to maintain and style for everyday glamour",
//       imgSrc: firstPicture
//     },
//     {
//       text: "Our hair extensions are designed for effortless beauty. Easy to apply, comfortable to wear, and stunning to look at",
//       imgSrc: secondPicture
//     },
//     {
//       text: "We offer top-quality hair products, excellent customer service, and unbeatable prices. Shop with confidence",
//       imgSrc: thirdPicture
//     }
//   ];

//   return (
//     <div>
//       <section className="pt-3 banner-component-container">
//         <div className="container">
//           <div className="row gx-3">
//             <main className="col-lg-9">
//               <Carousel>
//                 {detailsObject.map((item, index) => (
//                   <Carousel.Item key={index}>
//                     <div className="card-banner first-banner-container">
//                       <img
//                         // className="d-block w-100"
//                         src={item.imgSrc}
//                         alt={`Slide ${index + 1}`}
//                         height="400px"
//                         />
//                       <Carousel.Caption style={{zIndex: "0"}}>
//                         <h5 style={{ fontFamily: "cursive" }}>{item.text}</h5>
//                       </Carousel.Caption>
//                     </div>
//                   </Carousel.Item>
//                 ))}
//               </Carousel>
//             </main>
//             <aside className="col-lg-3">
//                     <div className="card-banner h-100 rounded-5 aside-banner-container" style={{borderRadius: "10px", color: "black"}}>
//                       <div className='aside-banner-item'>
//                         <i class="fa-sharp fa-solid fa-earth-americas" style={{fontSize: "100px"}}></i>
//                         <p className='mt-3' style={{fontWeight: "bold"}}>World Wide Shipping</p>
//                         <p className="">
//                           Distance should never be a barrier between you & our luxurious hair hence why offer affordable worldwide shipping!
//                         </p>
//                       </div>
//                       <div className='aside-banner-item'>
//                         <i class="fa-sharp fa-solid fa-truck" style={{fontSize: "100px"}}></i>
//                         <p className='mt-3' style={{fontWeight: "bold"}}>Fast and reliable shipping</p>
//                         <p className="">
//                         Express & reliable shipping services. FEDEX is our primary courier
//                         </p>
//                       </div>
//                       <div className='aside-banner-item'>
//                       <i class="fa-sharp fa-solid fa-headset" style={{fontSize: "100px"}}></i>
//                       <p className='mt-3' style={{fontWeight: "bold"}}>24/7 Customer Support</p>
//                       <p className="">
//                         Our dedicated team is available around the clock to assist you with any queries or concerns you may have. Your satisfaction is our priority!
//                       </p>
//                     </div>
//                     </div>
//             </aside>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Banner;






































// import "./banner.css"
// import firstPicture from "../../assets/firstPicture.png"
// import secondPicture from "../../assets/secondPicture.png"
// import thirdPicture from "../../assets/thirdPicture.png"
// const Banner = () => {
//     const detailsObject = [
//         {
//             text: "Achieve silky smooth hair with our top-grade products. Easy to maintain and style for everyday glamour",
//             imgSrc: "firstPicture"
//         },
//         {
//             text: "Our hair extensions are designed for effortless beauty. Easy to apply, comfortable to wear, and stunning to look at",
//             imgSrc: "secondPicture"
//         },
//         {
//             text: "We offer top-quality hair products, excellent customer service, and unbeatable prices. Shop with confidence",
//             imgSrc: "firstPicture"
//         },
        
//     ]
//     return <div>
//         <section className="pt-3 banner-component-container">
//             <div className="container">
//                 <div className="row gx-3">
//                     <main className="col-lg-9">
//                         <div className="card-banner first-banner-container">
//                             <h5 style={{fontFamily: "cursive"}}>Achieve silky smooth hair with our top-grade products. Easy to maintain and style for everyday glamour</h5>
//                             <img src={firstPicture} height="100%"  />
//                         </div>
//                     </main>
//                 </div>
//             </div>
//         </section>


//     </div>
// }
// export default Banner
                    // <aside className="col-lg-3">
                    //     <div className="card-banner h-100 rounded-5" style={{borderRadius: "10px", backgroundColor: "#f87217"}}>
                    //         <div className="card-body text-center pb-5">
                    //             <h5 className="pt-5 text-white">Amazing Gifts</h5>
                    //             <p className="text-white">No matter how far along you are in your sophistication</p>
                    //             <a href="#" className="btn btn-outline-light"> View more </a>
                    //         </div>
                    //     </div>
                    // </aside>