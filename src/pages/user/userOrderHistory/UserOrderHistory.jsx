import React, { Fragment } from 'react'
import { Menu } from 'antd';
import { useState } from 'react'
import './UserOrderHistory.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getAPI, patchAPI, postAPI } from '../../../config/api';
import UserOrderItem from './UserOrderItem';
import { Skeleton } from 'antd';

const items = [
  {
    label: <Link to={'/user/order?type=1'}>Tất cả</Link>,
    key: 'all',
    icon: null,
  },
  {
    label: <Link to={'/user/order?type=2'}>Chờ xác nhận</Link>,
    key: 'wait-confirm',
    icon: null,
  },
  {
    label: <Link to={'/user/order?type=3'}>Đang giao</Link>,
    key: 'delivering',
    icon: null,
  },
  {
    label: <Link to={'/user/order?type=4'}>Đã giao</Link>,
    key: 'shipping',
    icon: null
  },
  {
    label: <Link to={'/user/order?type=5'}>Đã hủy</Link>,
    key: 'cancel',
    icon: null
  }
];

function UserOrderHistory() {
  const [current, setCurrent] = useState('all');
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [listOrder, setListOrder] = useState([]);
  let [inputValue, setInputValue] = useState('');
  const [cloneOrder, setCloneOrder] = useState([]);
  let user;
  const search = useLocation();
  const nav = useNavigate();
  let count = 0;
  const objType = {}
  let noOrder =
    <div class="no-product">
      <div class="no-product__content "></div>
      <div class="no-product__text">Chưa có đơn hàng</div>
    </div>

  if (search.search) {
    let query = search.search.slice(1).split('=');
    objType[query[0]] = query[1];
  }
  const getUser = async () => {
    try {
      let res = await getAPI('/auth/get-loged-in-user')
      user = res.data.user._id;
      getOrderInfor();
      render();
    } catch (error) {
      console.log(error);
    }
  }
  console.log(69, objType, inputValue);

  const getOrderInfor = async () => {
    try {
      let res = await getAPI('/order/get-order-by-userId/user/' + user);
      setListOrder(res.data.order);
    } catch (error) {
      console.log(error);
    }
  }

  const cancelOrder = async (orderId) => {
    let values = { status: 'canceled' }
    if (window.confirm('Do you want to cancel the order ?') === true) {
      try {
        await patchAPI('/order/change-order-status/' + orderId, values);
        setNumber(number + 1);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
      getUser();
    }, 1000)
    render();
  }, [number, inputValue])

  const onClick = (e) => {
    setCurrent(e.key);
  };

  function render() {
    // if (inputValue.length) {
    listOrder.map((data) => {
      data.listProduct.filter((value) => {
        if (value.productDetailId?.productId.productName.includes(inputValue)) {
          setCloneOrder([data]);
        }
      })
    })
    // }
  }

  const searchOrder = (e) => {
    if (e.keyCode == 13) {
      let inputValue = document.querySelector('.searchOrder').value;
      nav(`?keyword=${inputValue}`)
      setInputValue(inputValue);
    }
  }

  return (
    <div className='order-history'>
      <div className="order-history--item">
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      </div>

      <div className="search-input">
        <svg width="19px" height="19px" viewBox="0 0 19 19"><g id="Search-New" stroke-width="1" fill="none" fill-rule="evenodd"><g id="my-purchase-copy-27" transform="translate(-399.000000, -221.000000)" stroke-width="2"><g id="Group-32" transform="translate(400.000000, 222.000000)"><circle id="Oval-27" cx="7" cy="7" r="7"></circle><path d="M12,12 L16.9799555,16.919354" id="Path-184" stroke-linecap="round" stroke-linejoin="round"></path></g></g></g></svg>
        <input type="text" className='searchOrder' placeholder='Tìm kiếm theo Tên Shop, ID đơn hàng hoặc tên sản phẩm' onKeyUp={searchOrder} />
      </div>

      <div>
        {
          !loading ?
            (listOrder.length ? ((objType.type || !objType.keyword ? listOrder : cloneOrder).map((orderItem) => {
              let statusPending = 'Đang chờ xác nhận';
              let btnPending = <Fragment ><button className='btn-took-product' onClick={() => { cancelOrder(orderItem._id) }}>Hủy đơn hàng</button> <button className='btn-secondary'>Liên hệ người bán</button></Fragment>;
              let textPending = <span>Đơn hàng của bạn sẽ được shop xác nhận nhanh chóng. Vui lòng đợi nha !</span>;
              let statusDone = 'Đã giao hàng thành công';
              let btnDone = <Fragment><button className='btn-took-product'>Đánh giá</button>
                <button className='btn-secondary'>Yêu cầu trả hàng/hoàn tiền</button>
                <Link to={'/cart'}><button className='btn-took-product'>Mua lại</button></Link></Fragment>
              let textDone = <span>Nếu hài lòng với sản phẩm đã nhận, hãy chọn "Đã nhận được hàng". Nếu không hài lòng, hãy chọn "Trả hàng/Hoàn tiền" trước <a href=""></a>
                nhé!</span>
              let statusCancel = 'Đã hủy';
              let btnCancel = <Fragment> <Link to={'/cart'}><button className='btn-took-product'>Mua lại</button></Link> <button className='btn-secondary'>Liên Hệ Người Bán</button></Fragment>
              let textCancel = <span>Bạn đã hủy đơn hàng này !</span>
              let statusDelivering = 'Đang giao hàng';
              let btnDelivering = <Fragment><button className='btn-secondary'>Liên Hệ Người Bán</button></Fragment>
              let textDelivering = <span>Hàng của bạn đang được giao vui lòng để ý điện thoại để nhận hàng nhé !!</span>

              if (objType.type == 1 || !objType.type) {
                if (orderItem.status === 'pending') {
                  return <UserOrderItem orderItem={orderItem} status={statusPending} btn={btnPending} text={textPending}></UserOrderItem>
                } else if (orderItem.status === 'done') {
                  return <UserOrderItem orderItem={orderItem} status={statusDone} btn={btnDone} text={textDone}></UserOrderItem>

                } else if (orderItem.status === 'canceled') {
                  return <UserOrderItem orderItem={orderItem} status={statusCancel} btn={btnCancel} text={textCancel}></UserOrderItem>

                } else if (orderItem.status === 'delivering') {
                  return <UserOrderItem orderItem={orderItem} status={statusDelivering} btn={btnDelivering} text={textDelivering}></UserOrderItem>
                }
              }


              if (objType.type == 2) {
                if (orderItem.status === 'pending') {
                  return <UserOrderItem orderItem={orderItem} status={statusPending} btn={btnPending} text={textPending}></UserOrderItem>
                } else {
                  count++;
                  if (count === listOrder.length) {
                    return noOrder
                  }
                }
              }

              if (objType.type == 4) {
                if (orderItem.status === 'done') {
                  return <UserOrderItem orderItem={orderItem} status={statusDone} btn={btnDone} text={textDone}></UserOrderItem>
                } else {
                  count++;
                  if (count === listOrder.length) {
                    return noOrder
                  }
                }
              }

              if (objType.type == 5) {
                if (orderItem.status === 'canceled') {
                  return <UserOrderItem orderItem={orderItem} status={statusCancel} btn={btnCancel} text={textCancel}></UserOrderItem>
                } else {
                  count++;
                  if (count === listOrder.length) {
                    return noOrder
                  }
                }
              }

              if (objType.type == 3) {
                if (orderItem.status === 'delivering') {
                  return <UserOrderItem orderItem={orderItem} status={statusDelivering} btn={btnDelivering} text={textDelivering}></UserOrderItem>
                } else {
                  count++;
                  if (count === listOrder.length) {
                    return noOrder
                  }
                }
              }
            })) : noOrder)
            : <Skeleton active={true} title={{ width: '80%' }} paragraph={{ rows: 2, width: '100%' }}></Skeleton>
        }
      </div>
    </div >
  )
}

export default UserOrderHistory 