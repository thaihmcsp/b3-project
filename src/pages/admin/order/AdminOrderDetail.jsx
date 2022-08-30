import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AdminOrderDetail.css";

function AdminOrderDetail({ order, user, productDetail, product }) {
    const search = useParams();
    const [orderDetail, setOrderDetail] = useState([]);
    const [userOrder, setUserOrder] = useState();
    const [orderProduct, setOrderProduct] = useState([])
    const [total, setTotal] = useState(0)

    const sale = 13000;
    const getOrder = order.filter((item) => item._id === search.orderId);
    const getUser = user.filter((item) => {
        return item._id === getOrder[0].userId;
    });
    const getProductDetail = getOrder.map((item) => {
        return item.listProduct.map((value) => {
            return productDetail.filter((product) => {
                return value.productDetailId === product._id;
            });
        });
    });
    const getProduct = getProductDetail[0].map(item => {
        return product.filter(value => {
            return value.listDetail.includes(item[0]._id)
        })
    })

    const getData = async () => {
        try {
            setUserOrder(getUser);
            setOrderDetail(getProductDetail);
            setOrderProduct(getProduct)
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);
    let sum = 0

    return (
        <div
            style={{ padding: "32px ", backgroundColor: "#f5f5f5", height: "100%" }}
        >
            <div className="admin_order-info-user">
                <div className="order_info-user-item">
                    <h3 className="info_user-item-heading">ĐỊA CHỈ NGƯỜI NHẬN</h3>
                    {userOrder
                        ? userOrder.map((item) => {
                            return (
                            <div className="info_user-item-user">
                                
                                <h2>{item.fullname}</h2>
                                <p className="info-item-user-address">
                                {getOrder[0].address}
                                </p>
                                <p className="info-item-user-phone">
                                Điện thoại: {getOrder[0].phone}
                                </p>
                            </div>
                            );
                        })
                        : ""}
                </div>
                <div className="order_info-user-item">
                    <h3 className="info_user-item-heading">HÌNH THỨC GIAO HÀNG</h3>
                    <div className="info_user-item-delivery">
                        <p>Giao tiết kiệm</p>
                        <p>Giao vào thứ 5, 02/09</p>
                        <p>Được giao bởi Shoppee ( giao từ Hà Nội )</p>
                            <p>Phí vận chuyển: { sale.toLocaleString()} ₫</p>
                    </div>
                </div>
                <div className="order_info-user-item">
                    <h3 className="info_user-item-heading">HÌNH THỨC THANH TOÁN</h3>
                    <div className="info_user-item-pay">
                        <p>Thanh toán tiền mặt khi nhận hàng</p>
                    </div>
                </div>
            </div>
            <div className="admin_order-info-product">
                <div className="order-info-product-heading">
                    <p>Sản phẩm</p>
                    <p>Giá</p>
                    <p>Số lượng</p>
                    <p>Giảm giá</p>
                    <p>Tạm tính</p>
                </div>
                <div className="order-info-product-body">
                    {orderDetail ? orderDetail[0]?.map(value => {
                        return (
                            <div className="order-info-product-body-container">
                                {orderProduct.map(item => {
                                    const check = item[0].listDetail.includes(value[0]._id)
                                    return (
                                        check ? <div className="info_product-left">
                                            <img src={value[0].listImg[0]} alt="" />
                                            <div>
                                                <h2>{item[0].productName}</h2>
                                                <p>Ram: {value[0].ram}</p>
                                                <button>Mua lại</button>
                                            </div>
                                            </div>
                                        : ""
                                    )
                                })}
                                {getOrder.map(item1 => {
                                    return item1.listProduct.map(value1 => {
                                        const check1 = value1.productDetailId === value[0]._id
                                        sum = value[0].price * value1.quantity
                                        return (
                                            check1 ? <div className="info_product-right">
                                                <p>{value[0].price.toLocaleString()} ₫</p>
                                                <p>{value1.quantity}</p>
                                                <p>0 ₫</p>
                                                <p>{ sum.toLocaleString()} ₫</p>
                                            </div> : ""
                                        )
                                    })
                                })}
                            </div>
                        )
                    }) : ""}
                </div>  
                <div className="order-info-product-footer">
                    <div>
                        <p>Tạm tính</p>
                        <span>{sum.toLocaleString()} ₫</span>   
                    </div>
                    <div>
                        <p>Phí vận chuyển</p>
                        <span>{sale.toLocaleString()} ₫</span>
                    </div>
                    <div>
                        <p>Tổng cộng</p>
                        <span>{(sum + sale).toLocaleString()} ₫</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminOrderDetail;
