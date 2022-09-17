import React, { Fragment } from 'react'
import './OrderDetail.css'
import { LeftOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { instance } from '../../../config/axios'
import { useState } from 'react'
import { getAPI, patchAPI } from '../../../config/api';


function OrderDetail() {
  const { orderId } = useParams()
  const [orderAPI, setOrderAPI] = useState([]);
  const [btnValue, setBtnValue] = useState({});
  const nav = useNavigate();


  let totalPrice = 0;
  let ship = 16500;
  let discount = 1;
  let status;
  let btn;


  const getOrder = async () => {
    try {
      let res = await getAPI('/order/get-one-order/' + orderId);
      setOrderAPI(res.data.order.listProduct);
      let object = {};
      object = res.data.order;
      setBtnValue(object)
    } catch (error) {
      console.log(error);
    }
  }

  const back = () => {
    nav('/user/order')
  }

  console.log(26, btnValue);
  useEffect(() => {
    getOrder();
  }, [])

  if (btnValue.status === 'pending') {
    status = 'Đơn hàng đang chờ xác nhận';
    btn = <Fragment ><button className='btn-took-product' style={{ width: '100%' }}>Hủy đơn hàng</button> <button className='btn-secondary'>Liên hệ người bán</button></Fragment>
  } else if (btnValue.status === 'done') {
    status = 'Đơn hàng đã giao hàng thành công';
    btn = <Fragment><button className='btn-took-product'>Đánh giá</button>
      <button className='btn-secondary'>Yêu cầu trả hàng/hoàn tiền</button>
      <Link to={'/cart'}> <span style={{ color: 'white', display: "block" }}><button className='btn-took-product' style={{ width: '100%' }}>Mua lại</button></span></Link></Fragment>
  } else if (btnValue.status === 'canceled') {
    status = 'Đơn hàng đã hủy';
    btn = <Fragment> <Link to={'/cart'}><button className='btn-took-product' style={{ width: '100%' }}>Mua lại</button></Link> <button className='btn-secondary'>Liên Hệ Người Bán</button></Fragment>
  } else if (btnValue.status === 'delivering') {
    status = 'Đơn hàng đang được giao';
    btn = <Fragment><button className='btn-secondary'>Liên Hệ Người Bán</button></Fragment>
  }


  return (
    <div className='order-detail-container'>

      {orderAPI.map((data) => {
        console.log(43, data);
        totalPrice += data.quantity * data.productDetailId.price;
        return (
          <Fragment>
            <div className="order-detail">
              <div className="order-detail__status">
                <div className="order-detail__status-header">
                  <div className="order-header-left" onClick={back}>
                    <LeftOutlined />
                    <span className='back-text'>Trở lại</span>
                  </div>

                  <div className="order-header-right">
                    <span>
                      <span className='id-order'>ID đơn hàng : {btnValue._id}</span>
                      <span className={'order-status order-status-' + btnValue.status}>{status}</span>
                    </span>

                  </div>
                </div>

                <div className="order-detail__status-content">
                  <div className="stepper">

                    <div className="stepper-item stepper-order-done">
                      <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0" class="shopee-svg-icon icon-order-order"><g><path d="m5 3.4v23.7c0 .4.3.7.7.7.2 0 .3 0 .3-.2.5-.4 1-.5 1.7-.5.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1s1.7.4 2.2 1.1c.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.7 0 1.2.2 1.7.5.2.2.3.2.3.2.3 0 .7-.4.7-.7v-23.7z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></path><g><line fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" x1="10" x2="22" y1="11.5" y2="11.5"></line><line fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" x1="10" x2="22" y1="18.5" y2="18.5"></line></g></g></svg>

                    </div>


                    <div className="stepper-text">
                      <span>Đơn hàng đã đặt</span>
                    </div>


                  </div>


                  <div className="stepper">
                    <div className="stepper-item stepper-pending">
                      <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0" class="shopee-svg-icon icon-order-paid"><g><path clip-rule="evenodd" d="m24 22h-21c-.5 0-1-.5-1-1v-15c0-.6.5-1 1-1h21c .5 0 1 .4 1 1v15c0 .5-.5 1-1 1z" fill="none" fill-rule="evenodd" stroke-miterlimit="10" stroke-width="3"></path><path clip-rule="evenodd" d="m24.8 10h4.2c.5 0 1 .4 1 1v15c0 .5-.5 1-1 1h-21c-.6 0-1-.4-1-1v-4" fill="none" fill-rule="evenodd" stroke-miterlimit="10" stroke-width="3"></path><path d="m12.9 17.2c-.7-.1-1.5-.4-2.1-.9l.8-1.2c.6.5 1.1.7 1.7.7.7 0 1-.3 1-.8 0-1.2-3.2-1.2-3.2-3.4 0-1.2.7-2 1.8-2.2v-1.3h1.2v1.2c.8.1 1.3.5 1.8 1l-.9 1c-.4-.4-.8-.6-1.3-.6-.6 0-.9.2-.9.8 0 1.1 3.2 1 3.2 3.3 0 1.2-.6 2-1.9 2.3v1.2h-1.2z" stroke="none"></path></g></svg>

                    </div>

                    <div className="stepper-text">
                      <span>Chờ xác nhận</span>
                    </div>
                  </div>


                  <div className="stepper">
                    <div className="stepper-item stepper-delivering">
                      <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0" class="shopee-svg-icon icon-order-paid"><g><path clip-rule="evenodd" d="m24 22h-21c-.5 0-1-.5-1-1v-15c0-.6.5-1 1-1h21c .5 0 1 .4 1 1v15c0 .5-.5 1-1 1z" fill="none" fill-rule="evenodd" stroke-miterlimit="10" stroke-width="3"></path><path clip-rule="evenodd" d="m24.8 10h4.2c.5 0 1 .4 1 1v15c0 .5-.5 1-1 1h-21c-.6 0-1-.4-1-1v-4" fill="none" fill-rule="evenodd" stroke-miterlimit="10" stroke-width="3"></path><path d="m12.9 17.2c-.7-.1-1.5-.4-2.1-.9l.8-1.2c.6.5 1.1.7 1.7.7.7 0 1-.3 1-.8 0-1.2-3.2-1.2-3.2-3.4 0-1.2.7-2 1.8-2.2v-1.3h1.2v1.2c.8.1 1.3.5 1.8 1l-.9 1c-.4-.4-.8-.6-1.3-.6-.6 0-.9.2-.9.8 0 1.1 3.2 1 3.2 3.3 0 1.2-.6 2-1.9 2.3v1.2h-1.2z" stroke="none"></path></g></svg>

                    </div>

                    <div className="stepper-text">
                      <span>Đang giao</span>
                    </div>
                  </div>

                  <div className="stepper">
                    <div className="stepper-item stepper-shipped">
                      <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0" class="shopee-svg-icon icon-order-shipping"><g><line fill="none" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" x1="18.1" x2="9.6" y1="20.5" y2="20.5"></line><circle cx="7.5" cy="23.5" fill="none" r="4" stroke-miterlimit="10" stroke-width="3"></circle><circle cx="20.5" cy="23.5" fill="none" r="4" stroke-miterlimit="10" stroke-width="3"></circle><line fill="none" stroke-miterlimit="10" stroke-width="3" x1="19.7" x2="30" y1="15.5" y2="15.5"></line><polyline fill="none" points="4.6 20.5 1.5 20.5 1.5 4.5 20.5 4.5 20.5 18.4" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></polyline><polyline fill="none" points="20.5 9 29.5 9 30.5 22 24.7 22" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></polyline></g></svg>

                    </div>

                    <div className="stepper-text">
                      <span>Đã giao</span>
                    </div>
                  </div>


                  <div className="stepper cancel">
                    <div className="stepper-item stepper-cancel">
                      <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0" class="shopee-svg-icon icon-order-paid"><g><path clip-rule="evenodd" d="m24 22h-21c-.5 0-1-.5-1-1v-15c0-.6.5-1 1-1h21c .5 0 1 .4 1 1v15c0 .5-.5 1-1 1z" fill="none" fill-rule="evenodd" stroke-miterlimit="10" stroke-width="3"></path><path clip-rule="evenodd" d="m24.8 10h4.2c.5 0 1 .4 1 1v15c0 .5-.5 1-1 1h-21c-.6 0-1-.4-1-1v-4" fill="none" fill-rule="evenodd" stroke-miterlimit="10" stroke-width="3"></path><path d="m12.9 17.2c-.7-.1-1.5-.4-2.1-.9l.8-1.2c.6.5 1.1.7 1.7.7.7 0 1-.3 1-.8 0-1.2-3.2-1.2-3.2-3.4 0-1.2.7-2 1.8-2.2v-1.3h1.2v1.2c.8.1 1.3.5 1.8 1l-.9 1c-.4-.4-.8-.6-1.3-.6-.6 0-.9.2-.9.8 0 1.1 3.2 1 3.2 3.3 0 1.2-.6 2-1.9 2.3v1.2h-1.2z" stroke="none"></path></g></svg>

                    </div>

                    <div className="stepper-text">
                      <span>Đã hủy</span>
                    </div>
                  </div>

                  <div class="stepper-line">
                    <div class="stepper__line-background" style={{ background: 'rgb(224, 224, 224)' }}></div>
                    <div class="stepper__line-foreground" style={{ width: 'calc((100% - 140px) * 0.25);', background: 'rgb(45, 194, 88);' }}></div></div>
                </div>
              </div>


              <div className="order-detail__payment">
                <div className="payment-left">
                  <div className="stepper-date">
                    <span>Đơn hàng được đặt lúc : {btnValue.createdAt}</span>
                  </div>
                  <span>Vui lòng thanh toán trước
                    22:31 29-08-2022
                    bằng phương thức Tài khoản ngân hàng đã liên kết Ví ShopeePay</span>
                </div>

                <div className="payment-right">
                  {btn}
                </div>
              </div>

              <div className="order-detail__address">
                <div className="border-top"></div>
                <div className="order-detail__address-content">
                  <h1 className='address-title'>Địa chỉ nhận hàng</h1>
                  <h3>Tên khách hàng : Lê Quốc Mạnh</h3>
                  <p className="address-content-detail">
                    <div>{btnValue.phone}</div>
                    <div>Số nhà 43E ngõ 97 Triều Khúc, Phường Thanh Xuân Nam, Quận Thanh Xuân, Hà Nội
                      {/* {btnValue.address} */}
                      <button className='edit-btn'>Sửa</button></div>
                  </p>
                </div>
              </div>

            </div>

            <div className="order-detail__product">
              <div className="order-detail__product-header">
                <div className="order-product--shop">
                  <div className="order-product--shop__left">
                    <span className='shop-love'>Yêu thích+</span>
                    <h1> Dareu Viet Nam</h1>
                    <button className='chat'> <i class="fa-solid fa-comment"></i> Chat</button>
                    <button className="watch-shop"><i class="fa-solid fa-store"></i>Xem Shop</button>
                  </div>

                  <div className="order-product--shop__right">

                  </div>
                </div>
              </div>
              <div className='line'></div>


              <div className="order-detail__product-content">
                <div className="order-product--detail">
                  <Fragment>
                    <div className="order-product-detail__img">
                      <img src={data.productDetailId.listImg[0] ? data.productDetailId.listImg[0] : data.productDetailId.productId.thumbnail} alt="" />
                    </div>
                    <div className="order-product-detail__name">

                      <div className="order-product-detail__category">
                        <span>Phân loại hàng:{data.productDetailId.color},{data.productDetailId.ram},{data.productDetailId.rom}</span>
                      </div>
                      <div className="listProduct-infor">
                        <div className="order-product-detail__quantity">
                          <span>Số lượng mua : {data.quantity}</span>
                        </div>
                        <div className="order-product-detail__price">
                          <span><sup>₫{data.productDetailId.price.toLocaleString()}</sup></span>
                        </div>
                      </div>
                    </div>

                  </Fragment>



                </div>
              </div>
            </div>
          </Fragment>
        )
      })}



      <div className="order-list__total">

        <div className='order-list-item'>
          <p>Tổng tiền hàng : </p>
          <span><sup>₫</sup>{totalPrice.toLocaleString()}</span>
        </div>

        <div className='order-list-item'>
          <p>Phí vận chuyển:</p>
          <span><sup>₫</sup>{ship.toLocaleString()}</span>
        </div>

        <div className='order-list-item'>
          <p>Giảm giá cước vận chuyển:</p>
          <span>-<sup>₫</sup>{(discount * ship).toLocaleString()}</span>
        </div>

        <div className='order-list-item'>
          <p>Tổng số tiền:</p>
          <span><sup>₫</sup>{(totalPrice + ship - discount * ship).toLocaleString()}</span>
        </div>

      </div >
    </div >
  )
}

export default OrderDetail



