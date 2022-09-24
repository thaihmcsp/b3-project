import {Button, Form, Modal, Table, Typography, Upload,  Select, Input, message,  Image  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import './AdminListProduct.css'
import { useNavigate} from "react-router-dom";
import { getAPI, patchAPI,postAPI } from '../../../../config/api';
import { useEffect} from 'react';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
  }

  return isJpgOrPng && isLt2M;
};

function AdminListProduct() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const { Option } = Select;
  // const [formImg, setFormImg] = useState(new FormData())
  // const [loading, setLoading] = useState(false);
  // const [imageUrl, setImageUrl] = useState();
  // const [count, setCount] = useState(0)
  // const key = 'updatable';
  const [productId, setProductId] = useState()
  const [productName, setProductName] = useState()
  const [brand, setBrand] = useState()
  const [type, setType] = useState()
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
                    thumbnail:value.thumbnail.startsWith('https')?  <Image className='preview-img' src={value.thumbnail} /> : <Image className='preview-img' src={`https://shope-b3.thaihm.site/${value.thumbnail}`} />,
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
  const onFinish = async (values) => {
    try {
        console.log(values);
        const res = await postAPI(`/product/update-product-info/${productId}`)
        console.log(res);
        message.success('Đổi thông tin thành công')
    } catch (error) {
        console.log(error);
        message.error('Thất bại')
    }
};


  const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
  };
  const [open, setOpen] = useState(false);
  const handleOk = (e) => {
    setOpen(false);
  };

  const handleCancel = (e) => {
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
      <Form  form={form} component={false} onFinish={onFinish}  >
      <Table
        dataSource={uData}
      >
      <Column 
        title= 'Ảnh mô tả sản phẩm'
        dataIndex= 'thumbnail'  
        className='column-list-product'
        onPreview='handlePreview'
        />
      <Column 
        title= 'Tên sản phẩm'
        dataIndex= 'productName' 
        width= '20%' 
        className='column-list-product'/>
      <Column 
        title= 'Thương hiệu'
        dataIndex= 'brand' 
        className='column-list-product' />
      <Column 
        title= 'Phân loại'
        dataIndex= 'type'  
        className='column-list-product'/>
      <Column 
        title= 'Số lượng biến thể'
        dataIndex= 'quantityProperty'  
        className='column-list-product'/>
      <Column
        title= 'Xem sảm phẩm'
        dataIndex= 'operation'
        className='column-list-product'
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
        className='column-list-product'
        render={ (record,index) => {
          const showModal = () => {
            setOpen(true);
            setProductId(index.id)
            console.log(productId);
          };
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
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
      >
          {/* {imageUrl ?(
              <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                      width: '100%',
                  }}
              />
          ) : 'Ảnh'} */}
      </Upload>
        <label>Tên sản phẩm</label>
        <Input placeholder="Vui lòng điền đủ thông tin" id='productName' width='50%' className='inp-list-product'/>
        <br />
        <label>Thương hiệu</label>
        <Input placeholder="Vui lòng điền đủ thông tin" id='brand' width='50%' className='inp-list-product' />
        <br />
        <label>Phân loại</label>
        <Select
          className='select-list-product'
          defaultValue="Điện thoại"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          width='50%'
        >
          <Option value="Điện thoại">Điện thoại</Option>
          <Option value="Máy tính">Máy tính</Option>
        </Select>
      </Modal>
    </Form>
    </div>
  )
}

export default AdminListProduct