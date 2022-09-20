import React from 'react'
import 'antd/dist/antd.css';
import { useState, useEffect } from 'react';
import './cart.css'
import { Col, Row, Table, Button, Popconfirm, Select } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAPI, patchAPI } from '../../../config/api';

// // antd table
function Cart() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalQuality, setTotalQuality] = useState(0);
  const [listProductDetail, setListProductDetail] = useState([]);
  const [reload, setReload] = useState(true);
  const [counting, setCounting] = useState(0)


  const nav = useNavigate()
  // get API
  async function getAPIcart() {
    try {
      let arrDataCart = await getAPI("cart/get-loged-in-cart");
      setListProductDetail(arrDataCart.data.cart.listProduct);
      let dataCart = [];
      let selectList = []
      arrDataCart.data.cart.listProduct.map(
        (value, index) => {
          if (value.productDetailId) {
            dataCart.push(
              {
                productId: value.productDetailId._id,
                key: value.productDetailId._id,
                Name: <a>{value.productDetailId.productId.productName}</a>,
                price: value.productDetailId.price,
                listImg: <img src={`https://shope-b3.thaihm.site/${value.productDetailId.productId.thumbnail}`}></img>,
                stonge: value.quantity,
                total: value.quantity * value.productDetailId.price,
                select: value.select
              }
            )
          }

          if(value.productDetailId && value.select === true){
            selectList.push(value.productDetailId._id)
          }
        }
      )

      let newTotal = 0;
      let newTotalQualyti = 0;

      dataCart.map(
        (value, index) => {
          if (value.select == true) {
            newTotal += value.total;
            newTotalQualyti += Number(value.stonge)
            // totalQuality1 += value.stonge
          }

        }
      )
      console.log(65 ,newTotal);
      setTotal(newTotal)
      setTotalQuality(newTotalQualyti)
      setSelectedRowKeys(selectList);
      setDataSource(dataCart);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(56, selectedRowKeys);
  // remote product
  async function remoteCartAPI(id) {
    try {
      await patchAPI("/cart/remove-from-cart", { productDetailId: id });
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }
  // set quanlity
  async function setQuanlityAPI(id, quanlity) {
    try {
      if (quanlity <= 1) {
        quanlity = 1
      }
      await patchAPI('/cart/update-cart-quantity', { "productDetailId": id, "quantity": quanlity })
    }
    catch (error) {
      console.log(error);
    }
  }
  //
  async function selectAPI(id, check) {
    try {
      let data = await patchAPI('/cart/update-cart-select', { "productDetailId": id, "select": check });
      console.log(81, data);
    }
    catch (error) {
      console.log(error);
    }
  }
  // data Cart

  const [dataSource, setDataSource] = useState([]);
  // Table

  const handleDelete = (id) => {
    const newData = dataSource.filter((item) => item.productId !== id);
    remoteCartAPI(id);

  };

  function createOrder() {
    nav("/create-order");
  }


  const onSelectChange = async (newSelectedRowKeys) => {
    console.log(103, 'selectedRowKeys changed: ', newSelectedRowKeys, selectedRowKeys);

    let isAdd = false;
    let id;
    if(newSelectedRowKeys.length > selectedRowKeys.length){
      isAdd = true;
      id = newSelectedRowKeys[newSelectedRowKeys.length - 1];
    }else{
      id = selectedRowKeys.find((item) => {
        return !newSelectedRowKeys.includes(item);
      });
    }
    // let selectItem = dataSource.find((value) => {
    //   console.log(value);
    //   return value.productId === newSelectedRowKeys[0]
    // })
    
    // let current = selectItem.select;
    // // let id = selectItem.productId;
    
    let newDataSource = [...dataSource];
    // console.log(113, index, isCheck, newDataSource[index].productId);
    await selectAPI(id, isAdd);

    // newDataSource.map((value) => {
    //   value.select = false;
    // })
  
    // newDataSource.map(
    //   (val, index) => { return 
    //     // setCounting(counting + 1)

    //   }
    // )
    // console.log(110, newDataSource);
    // setDataSource(newDataSource)
    setSelectedRowKeys(newSelectedRowKeys);
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
        key: "odd",
        text: "Select Odd Row",
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
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];

          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }

            return false;
          });
          // console.log(152,newSelectedRowKeys);
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  const defaultColumns = [
    {
      title: "Sản Phẩm",
      dataIndex: "Name",
    },
    {
      title: "",
      dataIndex: "listImg",
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
    {
      title: 'Số lượng',
      dataIndex: 'stonge',
      render: (text, record) => {
        return (
          <div className='cart-quanlity'>
            <Button type="primary" onClick={
              async () => {
                await setQuanlityAPI(record.productId, --text)
                setCounting(counting - 1)
              }
            }>-</Button>
            <input placeholder="" value={text} />
            <Button type="primary" onClick={
              async () => {
                await setQuanlityAPI(record.productId, ++text);
                setCounting(counting + 1)
              }
            }>+</Button>
          </div>
        );
      },
    },
    {
      title: "Thành Tiền",
      dataIndex: "total",
    },
    {
      title: "Thao Tác",
      dataIndex: "delete",
      render: (_, record) => {
        return dataSource.length >= 1 ? (
          <Popconfirm
            title="Bạn chắc chắn muốn xóa không ?"
            onConfirm={() => handleDelete(record.productId)}
          >
            <Button type="text">
              <i class="fa-solid fa-trash-can"></i>
            </Button>
          </Popconfirm>
        ) : null;
      },
    },
  ];
  // selecttion

  // Select
  const { Option } = Select;
  const children = [
    <Option key={1}> {"Giảm 10%"}</Option>,
    <Option key={2}> {"Giảm 15%"}</Option>,
    <Option key={3}>{"Giảm 25%"}</Option>,
    <Option key={4}>{"Giảm 50%"}</Option>,
    <Option key={5}>{"Free ship"}</Option>,
  ];

  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
  };

  // table antd
  useEffect(
    () => {
      
      setQuanlityAPI()
      getAPIcart()
    }, [count, reload, counting]
  );
  console.log(216, dataSource);
  return (
    <div className="cart-container">
      <Row justify="center">
        <Col span={20}>
          <div className="cart-list">
            <Table
              rowSelection={rowSelection}
              columns={defaultColumns}
              dataSource={dataSource}
            />
          </div>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
          <div className="cart-footer">
            <Row justify="center">
              <Col span={10}></Col>
              <Col span={10}>
                <div className="cart-voucher-1">
                  <div className="cart-title">
                    <h2>
                      <i className="fa-solid fa-ticket"></i>{" "}
                      <span>Shopee Voucher</span>
                    </h2>
                  </div>
                  <div className="cart-voucher">
                    <Select
                      mode="multiple"
                      placeholder="Chọn hoặc nhập mã"
                      defaultValue={["Free ship"]}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                      }}
                    >
                      {children}
                    </Select>
                  </div>
                </div>
              </Col>
            </Row>
            <Row justify="center">
              <Col span={10}>
                <div className="cart-footer">
                  <span>Chọn tất cả ({count})</span> <span> Xóa </span>{" "}
                  <span> Bỏ sản phẩm không hoạt động</span>
                </div>
              </Col>
              <Col span={10}>
                <div className="cart-footer2">
                  <span>Tổng thanh toán ({totalQuality} Sản phẩm ): </span>{" "}
                  <span className="cart-price">{total}đ</span>
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
  );
}

export default Cart;
