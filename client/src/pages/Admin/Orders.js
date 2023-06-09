import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../../context/order";
const Orders = () => {
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useOrder();
    const [id, setId] = useState("");
    const navigate = useNavigate();
  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/get-order");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this order ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/order/delete-order/${id}`
      );
      toast.success("Order Deleted Successfully");
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
      <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
            <h1 className="text-center">All Order List</h1>
            <div className="d-flex flex-wrap">
            {products?.map((p) => (
             <Link
             key={p._id}
             to={`/dashboard/admin/order/${p.slug}`}
             className="product-link"
           >
                <div className="card m-2" style={{ width: "18rem" }}>
                  {/* <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    height={"150px"}
                    alt={p.name}
                  /> */}
                  <div className="card-body">
                    <h5 className="card-title">Name: {p.name}</h5>
                    
                    <p className="card-text">email: {p.email}</p>
                    <p className="card-text">phone: {p.phone}</p>
                    <p className="card-text">bkash_Number: {p.bkash}</p>
                    <p className="card-text">Product_Serial: {p.serial}</p>
                    <p className="card-text">address: {p.address}</p>
                    <p className="card-text">currieraddress: {p.currieraddress}</p>
                    <p className="card-text">PoBox_Number: {p.pobox}</p>
                   
                    <p className="card-text">size: {p.size}</p>
                    <p className="card-text">Quantity: {p.quantity}</p>
                    <p className="card-text">Price: {p.price}Taka</p>
                  </div>
                  <div>
                  <button className="btn btn-secondary ms-1"
                    onClick={() => {
                      setOrder([...order, p]);
                      localStorage.setItem(
                        "order",
                        JSON.stringify([...order, p])
                      );
                      toast.success("Item Added to order");
                    }} >Confirm</button>
                     <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE 
                </button>
                  </div>
                </div>
                </Link>
            ))}
          </div>
            </div>
        </div>
      </div>
        
    </Layout>
  )
}

export default Orders