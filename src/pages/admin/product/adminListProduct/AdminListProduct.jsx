import {Button, Form, Modal, Table, Typography, Upload,  Select, Input  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import './AdminListProduct.css'
import { useNavigate} from "react-router-dom";
import { getAPI } from '../../../../config/api';
import { useEffect} from 'react';


function AdminListProduct() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const { Option } = Select;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const [uData, setUdata] = useState([])
  async  function getAPIproduct() {
    try {
        let products = await getAPI(`product/get-all-products`);
        let newList = []
        products.data.products.map(
          (value)=>{
            newList.push(
                  {
                    productName: value.productName,
                    thumbnail:value.thumbnail.startsWith('https')? <img  src= {value.thumbnail} alt=''/> : <img  src= {`https://shope-b3.thaihm.site/${value.thumbnail}`} alt=''/>,
                    brand: value.brand,
                    quantityProperty:value.listDtail.length,
                    type:value.categoryId._id==='63227fdadb8fd735e64e3e50'?'Điện thoại':'Máy tính',
                    id: value._id
                  }
              )
          }
        )
        setUdata(newList)
    }
    catch (error) {
        console.log(error);
    }
  }
  const [open, setOpen] = useState(false);
console.log(open);
  const showModal = () => {
    console.log(321321);
    setOpen(true);
  };

  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };
  const navigate = useNavigate();
  
  const [form] = Form.useForm();
    useEffect(() => {
      getAPIproduct() 
    },[])
    const { Column } = Table;
return (
    <div>
      <Form  form={form} component={false}>
      <Table
        dataSource={uData}
      >
      <Column 
        title= 'Ảnh mô tả sản phẩm'
        dataIndex= 'thumbnail'  />
      <Column 
      title= 'Tên sản phẩm'
      dataIndex= 'productName' 
      width= '20%' />
      <Column 
      title= 'Thương hiệu'
      dataIndex= 'brand'  />
      <Column 
      title= 'Phân loại'
      dataIndex= 'type'  />
      <Column 
      title= 'Số lượng biến thể'
      dataIndex= 'quantityProperty'  />
      <Column
        title= 'Xem sảm phẩm'
        dataIndex= 'operation'
        render = {(record,index) => {
          const viewDetail =()=>{
            navigate(`/admin/product/${index.id}/detail` )
          };
          return(
            <span>
              <Button
              className='btn-list-product'
              type="primary"
              onClick={() => {viewDetail()}}
              >
              Xem chi tiết
              </Button>
            </span>
        )}}
      />
      <Column
        title= 'Sửa thông tin'
        dataIndex= 'operation'
        render={ (index) => {
          return (
            <span>
              <Button
                className='btn-list-product'
                type="primary"
                onClick={showModal}
              >
              Sửa
              </Button>
            </span>
          )
        } }
      />
      </Table>
      </Form>
      <Modal
        title="Sửa thông tin"
        visible={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: false,
          className: 'btn-ok'
        }}
        cancelButtonProps={{
          disabled: false,
        }}
      >
        <p>Some contents...</p>
        <label>Tên sản phẩm</label>
        <Input placeholder="Vui lòng điền đủ thông tin" id='productName' width='50%' className='inp-list-product'/>
        <br />
        <label>Thương hiệu</label>
        <Input placeholder="Vui lòng điền đủ thông tin" id='brand' width='50%' className='inp-list-product' />
        <br />
        <label>Phân loại</label>
        <Select
          className='select-list-product'
          defaultValue="lucy"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          width='50%'
        >
          <Option value="jack">Điện thoại</Option>
          <Option value="lucy">Máy tính</Option>
        </Select>
      </Modal>
    </div>
  )
}

export default AdminListProduct