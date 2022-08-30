import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import { Descriptions } from 'antd';
import './AdminListProductDetail.css'
import { useParams } from 'react-router-dom';
import data from '../../../../static/Truong/product.json'
import dataDetail from '../../../../static/Truong/productDetail.json'


function AdminListProductDetail() {

  const { productId } = useParams()
  let productDT = {}

  data.map((value, index) => {
    if (productId == value._id) {
      productDT = value
    }
  })

  productDT.listDetail.map((value) => {
    dataDetail.map((val, ind) => {
      if (value == val._id) {
        console.log(30, val);
      }
    })
  })


  // Modal-logic

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };



  return (
    <div className='adminListProductDetail' >
      <div className="adminListProductDetail-header">
        <div className="adminListProductDetail-header-left">
          <h3>Product : {productDT.productName}</h3>
        </div>
        <div className="adminListProductDetail-header-right">
          <Button type="primary" onClick={showModal} >
            + Thêm 1 sản phẩm mới
          </Button>
          <Modal title="Basic Modal" footer={null} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
      </div>
      <div className="adminListProductDetail-body">
        {
          data.map((value, index) => {
            if (productId == value._id) {
              return (
                value.listDetail.map((val, ind) => {
                  return (
                    dataDetail.map((vall, indd) => {
                      if (val == vall._id) {
                        console.log(79, vall);
                        return (
                          <div className='product'>
                            <Descriptions title="">
                              <Descriptions.Item label=""><img src={vall.listImg[0]} alt="" width={100} /></Descriptions.Item>
                              <Descriptions.Item label="Color">{vall.color}</Descriptions.Item>
                              <Descriptions.Item label="Status">{vall.status}</Descriptions.Item>
                              <Descriptions.Item label="">{}</Descriptions.Item>
                              <Descriptions.Item label="Ram - Rom">{vall.ram} - {vall.rom}</Descriptions.Item>
                              <Descriptions.Item label="Storage">
                              {vall.storage}
                              </Descriptions.Item>
                            </Descriptions>
                          </div>
                        )
                      }
                    })
                  )
                })
              )
            }
          })
        }
      </div>
    </div>
  )
}

export default AdminListProductDetail