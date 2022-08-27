import { Table, Modal, Input } from 'antd';
import React, { useState } from 'react';
import product from '../../../../static/Truong/product.json'
import './AdminListProduct.css'


let quantity=0
  for (let index = 0; index < product.length; index++) {
    const element = product[index];
    quantity=element.listDetail.length
  }
let newData =[]
product.map(
    (value)=>{
        newData.push(
            {
                productName: value.productName,
                thumpnail:<img  src= {value.thumpnail} alt=''/>,
                brand:value.brand,
                quantityProperty:quantity
            }
        )
    }
)

function AdminListProduct() {
  const columns = [
    {
        title: 'Ảnh mô tả sản phẩm',
        dataIndex: 'thumpnail',              
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'productName',
    },
    {
        title: 'Thương hiệu',
        dataIndex: 'brand',
    },
    {
        title: 'Phân loại',
        dataIndex: 'type',
    },
    {
        title: 'Số lượng biến thể',
        dataIndex: `quantityProperty`,
    },
    ];
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
    <div>
    <Table
      onRow={(record) => {
        return {
          onClick: event => {
            setIsModalVisible(true)
          },
        }
    }}
        columns={columns}
        dataSource={newData}
        onClick={showModal}
    />
    <Modal title="Chỉnh sửa thông tin sản phẩm" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Input placeholder="Tên sản phẩm" />
      <Input placeholder="Tên thương hiệu" /> 
      </Modal>
  </div>
)
}

export default AdminListProduct