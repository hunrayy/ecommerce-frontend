
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import firstPicture from "../../assets/firstPicture.png"
import secondPicture from "../../assets/secondPicture.png"
import thirdPicture from "../../assets/thirdPicture.png"
import "./banner.css"

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
              <Carousel>
                {detailsObject.map((item, index) => (
                  <Carousel.Item key={index}>
                    <div className="card-banner first-banner-container">
                      <img
                        // className="d-block w-100"
                        src={item.imgSrc}
                        alt={`Slide ${index + 1}`}
                        height="400px"
                        />
                      <Carousel.Caption style={{zIndex: "0"}}>
                        <h5 style={{ fontFamily: "cursive" }}>{item.text}</h5>
                      </Carousel.Caption>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </main>
            <aside className="col-lg-3">
                    <div className="card-banner h-100 rounded-5" style={{borderRadius: "10px", backgroundColor: "#f87217"}}>
                        <div className="card-body text-center pb-5">
                            <h5 className="pt-5 text-white">Amazing Gifts</h5>
                            <p className="text-white">No matter how far along you are in your sophistication</p>
                            <a href="#" className="btn btn-outline-light"> View more </a>
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