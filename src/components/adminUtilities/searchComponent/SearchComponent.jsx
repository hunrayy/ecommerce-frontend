




import "./searchComponent.css"
const SearchComponent = () => {
    return <div>
        <div className="search-component-container">
            <div className="search-component-wrapper form">
                <div className="search-component">
                <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Search products" autoFocus className="form-control" />
                </div>
            </div>
        </div>  

    </div>
}
export default SearchComponent