import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import ProductDetailsPage from "./Pages/PlantDetailsPage";
import CartPage from "./Pages/CartPages/CartPage";
import LoginPage from "./Pages/UserPages/LoginPage";
import SignupPage from "./Pages/UserPages/SignupPage";
import MyOrdersPage from "./Pages/MyOrdersPage";
import ShippingPage from "./Pages/CartPages/ShippingPage";
import PaymentPage from "./Pages/CartPages/PaymentPage";
import PlaceOrderPage from "./Pages/CartPages/PlaceOrderPage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import PlantListPage from "./Pages/AdminPages/PlantListPage";
import PlantEditPage from "./Pages/AdminPages/PlantEditPage";
import OrderDetailsPage from "./Pages/OrderDetailsPage";
import DeliverMethodPage from "./Pages/CartPages/DeliveryMethodPage";
import OrderListAll from "./Pages/AdminPages/OrderListAll";
import WithNav from "./Pages/Layouts/WithNav";
import WithoutNav from "./Pages/Layouts/WithoutNav";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<WithoutNav />}>
          <Route path="/" element={<LandingPage />}></Route>
        </Route>

        <Route element={<WithNav />}>
          <Route path="/plants" element={<HomePage />}></Route>
          <Route path="/users/login" element={<LoginPage />}></Route>
          <Route path="/users/signup" element={<SignupPage />}></Route>
          <Route path="/users/profile" element={<MyOrdersPage />}></Route>
          <Route path="/plants/:id" element={<ProductDetailsPage />}></Route>

          <Route path="/cart">
            <Route index element={<CartPage />} />
            <Route path=":id" element={<CartPage />} />
          </Route>

          <Route path="/deliveryMethod" element={<DeliverMethodPage />}></Route>
          <Route path="/shipping" element={<ShippingPage />}></Route>
          <Route path="/payment" element={<PaymentPage />}></Route>
          <Route path="/placeorder" element={<PlaceOrderPage />}></Route>
          <Route path="/orders/:id" element={<OrderDetailsPage />}></Route>

          <Route path="/admin/plantList" element={<PlantListPage />}></Route>
          <Route
            path="/admin/plants/:id/edit"
            element={<PlantEditPage />}
          ></Route>
          <Route
            path="/admin/plants/:id/edit"
            element={<PlantEditPage />}
          ></Route>
          <Route path="/admin/orderlist" element={<OrderListAll />}></Route>
        </Route>
      </Routes>

      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
