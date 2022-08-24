import React from 'react'
import 'antd/dist/antd.css';
import tableCart from '../../../static/Truong/cart.json'
import tableProductDetail from "../../../static/Truong/productDetail.json"
import tableProduct from '../../../static/Truong/product.json'
import { useState } from 'react';
import './cart.css'
import { Col, Row, Radio, Table, Divider, Button ,Popconfirm } from 'antd'


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
// console.log(dataCart);
tableCart[1].listProduct.map(
  (product, index) => {
    dataCart.push(
      {
        key: index,
        Name: product.productDetailId.productId.productName,
        price: product.productDetailId.price,
        listImg: <img src={product.productDetailId.listImg[0]} alt="" />,
        stonge: product.quantity,
        total: product.quantity * product.productDetailId.price
      }
    )
  }
)
function Cart() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([dataCart]);
  const [count, setCount] = useState(2);
  // Table
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
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
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Bạn chắc chắn muốn xóa không ?" onConfirm={() => handleDelete(record.key)}>
            <Button type='text'><i class="fa-solid fa-trash-can"></i></Button>
          </Popconfirm>
        ) : null,
    },
    
  ];
  // selecttion


 

 


  // table antd
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
            {/* <Table rowSelection={rowSelection} columns={columns} dataSource={dataCart} /> */}
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
              dataSource={dataCart}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Cart