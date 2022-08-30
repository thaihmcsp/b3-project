import React from "react";
import "./AdminOrderDetail.css"

function AdminOrderDetail() {
    return (
    <div style={{ padding: "32px ", backgroundColor: "#f5f5f5", height: "100vh"}}>
            <div className="admin_order-info">
                <div className="order_info-item">
                    <h3 className="order_info-item-heading">ĐỊA CHỈ NGƯỜI NHẬN</h3>
                    <div className="order_info-item-user">
                        <h2>LẠI HUY TRƯỜNG</h2>
                        <p className="info-item-user-address">Địa chỉ: A4 BT3 ngõ 214 Nguyễn Xiển, Khương Trung, Quận Thanh Xuân, Hà Nội, Việt Nam</p>
                        <p className="info-item-user-phone">Điện thoại: 0866569541</p>
                    </div>
                </div>
                <div className="order_info-item">
                    <h3 className="order_info-item-heading">HÌNH THỨC GIAO HÀNG</h3>
                    <div className="order_info-item-delivery">
                        <p>Giao tiết kiệm</p>
                        <p>Giao vào thứ 5, 02/09</p>
                        <p>Được giao bởi Shoppee ( giao từ Hà Nội )</p>
                        <p>Phí vận chuyển: 13.000₫</p>
                    </div>
                </div>
                <div className="order_info-item">
                    <h3 className="order_info-item-heading">HÌNH THỨC THANH TOÁN</h3>
                    <div className="order_info-item-pay">
                        <p>Thanh toán tiền mặt khi nhận hàng</p>
                    </div>
                </div>
            </div>
            <div className="admin_order-product">
                
            </div>
        </div>
    );
}

export default AdminOrderDetail;
