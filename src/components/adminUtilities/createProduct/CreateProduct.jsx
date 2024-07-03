




import "./createProduct.css"
const CreateProduct = () => {
    return <div>
        <div className="admin-createPage-container">
        <div className="container mt-5">
            <h2>Create Product</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="productImage" className="form-label">Product Image</label>
                    <input type="file" className="form-control" id="productImage" />
                </div>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Product Name</label>
                    <input type="text" className="form-control" id="productName" placeholder="Enter product name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="productDescription" className="form-label">Product Description</label>
                    <textarea className="form-control" id="productDescription" rows="3" placeholder="Enter product description"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">Product Price</label>
                    <input type="number" className="form-control" id="productPrice" placeholder="Enter product price" />
                </div>
                <button type="submit" className="btn btn-primary">Create Product</button>
            </form>
        </div>
        </div>

    </div>
}
export default CreateProduct