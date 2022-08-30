import React, { Fragment } from 'react'
import productDetail from '../../../static/Truong/productDetail.json'
import order from '../../../static/Truong/order.json'
import product from '../../../static/Truong/product.json'
import { data } from '../userOrderHistory/UserOrderHistory'
import './OrderDetail.css'
import { LeftOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom'
import { Divider, List, Typography } from 'antd';




function OrderDetail() {
  const { orderId } = useParams()


  return (
    <div className='order-detail-container'>
      <div className="order-detail">
        <div className="order-detail__status">
          <div className="order-detail__status-header">
            <div className="order-header-left">
              <LeftOutlined />
              <span>Trở lại</span>
            </div>

            <div className="order-header-right">
              <span>Chờ thanh toán</span>

            </div>
          </div>

          <div className="order-detail__status-content">
            <div className="stepper">

              <div className="stepper-item stepper-order-done">
                <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0" class="shopee-svg-icon icon-order-order"><g><path d="m5 3.4v23.7c0 .4.3.7.7.7.2 0 .3 0 .3-.2.5-.4 1-.5 1.7-.5.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1s1.7.4 2.2 1.1c.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.7 0 1.2.2 1.7.5.2.2.3.2.3.2.3 0 .7-.4.7-.7v-23.7z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></path><g><line fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" x1="10" x2="22" y1="11.5" y2="11.5"></line><line fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" x1="10" x2="22" y1="18.5" y2="18.5"></line></g></g></svg>

              </div>


              <div className="stepper-text">
                <span>Đơn hàng đã đặt</span>
                {/* <div className="stepper-date">
                  <span>22:31 28-08-2022</span>
                </div> */}
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
              <div className="stepper-item">
                <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0" class="shopee-svg-icon icon-order-shipping"><g><line fill="none" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" x1="18.1" x2="9.6" y1="20.5" y2="20.5"></line><circle cx="7.5" cy="23.5" fill="none" r="4" stroke-miterlimit="10" stroke-width="3"></circle><circle cx="20.5" cy="23.5" fill="none" r="4" stroke-miterlimit="10" stroke-width="3"></circle><line fill="none" stroke-miterlimit="10" stroke-width="3" x1="19.7" x2="30" y1="15.5" y2="15.5"></line><polyline fill="none" points="4.6 20.5 1.5 20.5 1.5 4.5 20.5 4.5 20.5 18.4" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></polyline><polyline fill="none" points="20.5 9 29.5 9 30.5 22 24.7 22" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></polyline></g></svg>

              </div>

              <div className="stepper-text">
                <span>Đã giao</span>
              </div>
            </div>

            <div class="stepper-line">
              <div class="stepper__line-background" style={{ background: 'rgb(224, 224, 224)' }}></div>
              <div class="stepper__line-foreground" style={{ width: 'calc((100% - 140px) * 0.25);', background: 'rgb(45, 194, 88);' }}></div></div>
          </div>
        </div>


        <div className="order-detail__payment">
          <div className="payment-left">
            <span>Vui lòng thanh toán trước
              22:31 29-08-2022
              bằng phương thức Tài khoản ngân hàng đã liên kết Ví ShopeePay</span>
          </div>

          <div className="payment-right">
            <button className='pay-btn'>Thanh toán ngay</button>
            <button className='other-btn'>Liên hệ người bán</button>
            <button className='other-btn'>Đổi phương thức thanh toán</button>
            <button className='other-btn'>Hủy đơn hàng</button>
          </div>
        </div>

        <div className="order-detail__address">
          <div className="border-top"></div>
          <div className="order-detail__address-content">
            <h1 className='address-title'>Địa chỉ nhận hàng</h1>
            <p>Tên khách hàng : Lê Quốc Mạnh</p>
            <p className="address-content-detail">
              <div>(+84) 332774093</div>
              <div>Số nhà 43E ngõ 97 Triều Khúc, Phường Thanh Xuân Nam, Quận Thanh Xuân, Hà Nội <button className='edit-btn'>Sửa</button></div>
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
              <div >
                <span> <svg viewBox="64 64 896 896" focusable="false" data-icon="question-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"></path></svg> </span>
              </div>
            </div>
          </div>
        </div>
        <div className='line'></div>


        <div className="order-detail__product-content">
          <div className="order-product--detail">
            {productDetail.map((detail) => {
              if (orderId === detail._id) {

                return (
                  <Fragment>
                    <div className="order-product-detail__img">
                      <img src={detail.listImg[0]} alt="" />
                    </div>
                    <div className="order-product-detail__name">

                      <div className="order-product-detail__category">
                        <span>Phân loại hàng:{detail.color},{detail.ram},{detail.rom}</span>
                      </div>
                      {
                        data.map((value) => {
                          let result = value.listProduct.map((listProduct) => {
                            if (orderId === listProduct.productDetailId) {
                              return (
                                <div className="listProduct-infor">
                                  <div className="order-product-detail__quantity">
                                    <span>Số lượng mua : {listProduct.quantity}</span>
                                  </div>
                                  <div className="order-product-detail__price">
                                    <span><sup>₫{listProduct.newData.price.toLocaleString()}</sup></span>
                                  </div>
                                </div>
                              )
                            }
                          })
                          return result
                        })
                      }

                    </div>

                  </Fragment>
                )
              }
            })}

          </div>
        </div>
      </div>

      <div className="order-list__total">

        <div className='order-list-item'>
          <p>Tổng tiền hàng : </p>
          <span><sup>₫</sup></span>
        </div>

        <div className='order-list-item'>
          <p>Phí vận chuyển:</p>
          <span><sup>₫</sup>16.500</span>
        </div>

        <div className='order-list-item'>
          <p>Giảm giá cước vận chuyển:</p>
          <span>-<sup>₫</sup>16.500</span>
        </div>

        <div className='order-list-item'>
          <p>Tổng số tiền:</p>
          <span><sup>₫</sup></span>
        </div>

      </div >
    </div >
  )
}

export default OrderDetail