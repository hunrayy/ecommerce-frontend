
import "./home.css"
import Navbar from "../../components/navbar/Navbar"
import Banner from "../../components/banner/Banner"
import Products from "../../components/products/Products"
import Footer from "../../components/footer/Footer"
const Home = () => {
    return <div>
        <div className="home-page-container">
        <Navbar />
        <Banner />
        <Products />
        <Footer />
        </div>


    </div>
}
export default Home