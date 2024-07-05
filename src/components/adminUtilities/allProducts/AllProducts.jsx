
import productsStore from "../../products/products.json"
import { useEffect, useState } from "react"





const AllProducts = () => {
    const [allProducts, setAllProducts] =  useState({
        products: [],
        products_loading: false
    })

    useEffect(()=> {
        setAllProducts({
            products: productsStore,
            products_loading: false
        })


    }, [])
    return <div>
        <section>
            <div className="bread-crumb">
                <div style={{fontSize: "20px", fontWeight: "semi bold"}}>Admin Dashboard </div>
                <div>Home / all products</div>
            </div>
            <div className="container my-5 product-page-container">
                <header className="mb-4">
                <h3>All products</h3>
                </header>

                <div className="row">
                    {allProducts.products?.map((product) =>{
                        // console.log(product)
                        return (<div className="col-lg-3 col-md-6 col-sm-6 col-6 single-item-container" style={{textDecoration: "none", color: "black"}}>
                            <div className="my-2">
                    
                                <img src={product.img} className="card-img-top rounded-2" style={{aspectRatio: "3 / 4", width: "100%", height: "auto"}} />
                
                            <div className="pl-2 pt-2">
                                <h5 className="">${product.price}</h5>
                                <p className=" mb-0">{product.name}</p>
                                <p className="text-muted">{product.description}</p>
                            </div>
                        </div>
                    </div>)
                    })}
                </div>
            </div>
        </section> 

    </div>
}
export default AllProducts