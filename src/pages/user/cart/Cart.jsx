import React from 'react'
import 'antd/dist/antd.css';
import tableCart from '../../../static/Truong/cart.json'
import tableProductDetail from "../../../static/Truong/productDetail.json"
import tableProduct from '../../../static/Truong/product.json'
import { useState, useEffect } from 'react';
import './cart.css'
import { Col, Row, Radio, Table, Divider, Button, Popconfirm, Select } from 'antd'
import { Link, useNavigate } from 'react-router-dom';




tableCart[1].listProduct.map(
  (value, index) => {

    let product1 = value.productDetailId;
    //Lấy product detail id của bảng cart
    let detail = tableProductDetail.find((value2, index) => { return (product1 == value2._id) });

    value.productDetailId = detail;
    let productInfo = tableProduct.find(
      (value3, index) => {
        return value3._id === detail.productId
      }
    )
    value.productDetailId.productId = productInfo
    return value
  }
)
// antd table


const dataCart = [];
tableCart[1].listProduct.map(
  (product, index) => {
    dataCart.push(
      {
        key: index,
        Name: <a>{product.productDetailId.productId.productName}</a>,
        price: product.productDetailId.price,
        listImg: <img src={product.productDetailId.listImg[0]} alt="" />,
        stonge: product.quantity,
        total: product.quantity * product.productDetailId.price,
        select: false
      }
    )
  }
)
function Cart() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState(dataCart);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalQuality ,setTotalQuality] = useState(0)
  const nav = useNavigate()
  // Table

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  function createOrder() {
      nav('/create-order')
  }


  const onSelectChange = (newSelectedRowKeys) => {
    console.log(60, 'selectedRowKeys changed: ', newSelectedRowKeys);
    let newDataSource = [...dataSource];
    newDataSource.map((value) => {
      value.select = false
    })
    for (let i = 0; i < newSelectedRowKeys.length; i++) {
      newDataSource[newSelectedRowKeys[i]].select = true
    }



    console.log(80, newDataSource);
    setDataSource(newDataSource)
    setSelectedRowKeys(newSelectedRowKeys);
    // console.log(74, (newSelectedRowKeys.length));
    setCount(newSelectedRowKeys.length);
  };


  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }

            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);

        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];

          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }

            return false;
          });
          // console.log(108,newSelectedRowKeys);
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  const defaultColumns = [
    {
      title: 'Sản Phẩm',
      dataIndex: 'Name'
    },
    {
      title: '',
      dataIndex: 'listImg'
    },
    {
      title: 'Giá',
      dataIndex: 'price'
    },
    {
      title: 'Số lượng',
      dataIndex: 'stonge'
    },
    {
      title: 'Thành Tiền',
      dataIndex: 'total'
    },
    {
      title: 'Thao Tác',
      dataIndex: 'delete',
      render: (_, record) => {
        // console.log(128,_, record.key);
        return dataSource.length >= 1 ? (
          <Popconfirm title="Bạn chắc chắn muốn xóa không ?" onConfirm={() => handleDelete(record.key)}>
            <Button type='text'><i class="fa-solid fa-trash-can"></i></Button>
          </Popconfirm>
        ) : null
      }

    },

  ];
  // selecttion

  // Select 
  const { Option } = Select;
  const children = [
    <Option key={1}> {'Giảm 10%'}</Option>,
    <Option key={2}> {'Giảm 15%'}</Option>,
    <Option key={3}>{'Giảm 25%'}</Option>,
    <Option key={4}>{'Giảm 50%'}</Option>,
    <Option key={5}>{'Free ship'}</Option>,

  ];

  const handleChange = (value) => {
    console.log(`Selected: ${value}`);

  };

  // table antd
  useEffect(
    () => {
      let newTotal = 0;
      let newTotalQualyti = 0;
      dataSource.map(
        (value, index) => {
          if (value.select == true) {
            newTotal += value.total;
            newTotalQualyti += Number(value.stonge)
            // totalQuality1 += value.stonge
          }

        }
      )
      setTotal(newTotal)
      setTotalQuality(newTotalQualyti)
    }, [count]
  );

  return (
    <div className='cart-container'>
      <Row justify='center'>
        <Col span={20}>

          {tableCart[1].listProduct.map((product, index) => {
            // dataCart.push(
            //   {
            //     Name: product.productDetailId.productId.productName,
            //     price: product.productDetailId.price,
            //     listImg: <img src={product.productDetailId.listImg[0]} alt="" />,
            //     stonge: product.quantity,
            //     total: product.quantity * product.productDetailId.price
            //   }
            // )
            return (
              <div>
                {/* <div><img src={product.productDetailId.listImg[0]} alt="" /></div>
                <div>name: {product.productDetailId.productId.productName}</div>
                <div>brand: {product.productDetailId.productId.brand}</div>
                <div>ram: {product.productDetailId.ram}</div>
                <div>rom: {product.productDetailId.rom}</div>
                <div>price: {product.productDetailId.price}</div> */}
              </div>
            )
          })}

          <div className='cart-list'>
            <Table
              rowSelection={rowSelection}
              columns={defaultColumns}
              // expandable={{
              //   expandedRowRender: (record) => (
              //     <p
              //       style={{
              //         margin: 0,
              //       }}
              //     >
              //       {record.description}
              //     </p>
              //   ),
              //   rowExpandable: (record) => record.name !== 'Not Expandable',
              // }}
              dataSource={dataSource}
            />
          </div>
        </Col>
      </Row>
      <Row justify='center'>
        <Col span={20}>
          <div className='cart-footer'>
            <Row justify='center'>
              <Col span={10}></Col>
              <Col span={10}>
                <div className="cart-voucher-1">
                  <div className="cart-title">
                    <h2><i className="fa-solid fa-ticket"></i> <span>Shopee Voucher</span></h2>
                  </div>
                  <div className="cart-voucher">
                    <Select
                      mode="multiple"
                      placeholder="Chọn hoặc nhập mã"
                      defaultValue={['Free ship']}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                      }}
                    >
                      {children}
                    </Select>
                  </div>
                </div>
              </Col>
            </Row>
            <Row justify='center'>
              <Col span={10}>
                <div className="cart-footer">
                  <span>Chọn tất cả ({count})</span> <span> Xóa </span> <span> Bỏ sản phẩm không hoạt động</span>
                </div>
              </Col>
              <Col span={10}>
                <div className="cart-footer2">
                  <span>Tổng thanh toán ({totalQuality} Sản phẩm ): </span> <span className='cart-price'>
                    {total.toLocaleString()}
                    đ</span>
                  <Button type="primary" onClick={createOrder}>
                    Mua hàng
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Cart