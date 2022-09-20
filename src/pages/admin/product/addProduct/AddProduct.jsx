import React, { useState } from 'react'
import { Col, Row } from 'antd';
import { Input, Space, Form, Button, Cascader } from 'antd';
import { SwapRightOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AudioOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import '../addProduct/addProduct.css'
import axios from 'axios';
import { useEffect } from 'react';
import { instance } from '../../../../config/axios';
import { getAPI, postAPI } from '../../../../config/api';

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

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

const onSearch = (value) => console.log(value);

function AddProduct() {

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [branch, setBranch] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [idProduct, setIdProduct] = useState([])
  const [dataFile, setDataFile] = useState(new FormData())

  const nav = useNavigate()

  const onFinish = async (values) => {
    console.log(72, 'Success:', values);
    try {
      let res = await postAPI('/product/create-product', values)
      let idNewProduct = res.data.product._id
      setIdProduct(idNewProduct)
      console.log(30, res);
      nav(`/admin/product/${idNewProduct}/detail/create`)
    } catch (error) {
      console.log(32, error);
      alert('Sản phẩm đã tồn tại')
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = (e) => {
    console.log(24, 'Change:', e.target.value);
  };

  const handleChange = async (info) => {
    console.log(118, info);
    const formData = new FormData()
    setDataFile(formData)
    formData.append('thumb', info.file.originFileObj)
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };

  const handleChangeValue = (value) => {
    console.log(96, value)
    const categoryName = value[0]
    const branchName = value[1]
    setBranch(branchName)
    setCategoryName(categoryName)
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const options = [
    {
      value: 'Điện Thoại',
      label: 'Điện Thoại',
      children: [
        {
          name: 'branch',
          value: 'Apple',
          label: 'Apple',
        },
        {
          value: 'SamSung',
          label: 'SamSung',
        },
        {
          value: 'Xiaomi',
          label: 'Xiaomi',
        },
        {
          value: 'OPPO',
          label: 'OPPO',
        },
        {
          value: 'Nokia',
          label: 'Nokia',
        },
        {
          value: 'ASUS',
          label: 'ASUS',
        },
      ],
    },
    {
      value: 'Máy tính bảng',
      label: 'Máy tính bảng',
      children: [
        {
          value: 'Ipad',
          label: 'Ipad',
        },
        {
          value: 'SamSung',
          label: 'SamSung',
        },
        {
          value: 'Nokia',
          label: 'Nokia',
        },
        {
          value: 'Xiaomi',
          label: 'Xiaomi',
        },
        {
          value: 'Lenovo',
          label: 'Lenovo',
        },
      ],
    },
    {
      value: 'Laptop',
      label: 'Laptop',
      children: [
        {
          value: 'Mac',
          label: 'Mac',
        },
        {
          value: 'Dell',
          label: 'Dell',
        },
        {
          value: 'ASUS',
          label: 'ASUS',
        },
        {
          value: 'Xiaomi',
          label: 'Xiaomi',
        },
        {
          value: 'Inrel',
          label: 'Inrel',
        },
        {
          value: 'HP',
          label: 'HP',
        },
        {
          value: 'Acer',
          label: 'Acer',
        },
      ],
    },
  ]
  return (
    <div className='classAddProduct'>

      <div className='addProduct-header'>
        <h4>Thêm 1 sản phẩm mới</h4>
        <p>Vui lòng chọn ngành hàng phù hợp cho sản phẩm của bạn</p>
      </div>
      <hr />
      <div className='search-product'>
        <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <Form.Item className='inp-search-addProduct' label="Tên sản phẩm :" name="productName" rules={[{ required: true, message: 'Hãy nhập vào tên sản phẩm' }]} >
            <Input className='input-addProductName' showCount maxLength={120} onChange={onChange} placeholder='Nhập vào' />
          </Form.Item>
          <div className='addProduct-body'>
            <div className="input-search">
              {/* <Search
                placeholder="Tên ngành hàng"
                onSearch={onSearch}
                style={{
                  width: '30%',
                  borderRadius: 20
                }}
              />  */}
              <span>Chọn ngành hàng chính xác , <a className='link-addProduct' href="/">Bấm vào đây để tìm hiểu</a></span>
            </div>

            <Form.Item label="Tên ngành hàng : " className='addBranch-addProduct' name='branch'>
              <Cascader
                onChange={handleChangeValue}
                options={options}
              />
            </Form.Item>

          </div>

          <div className='footer-addProduct'>
            <div className='chose-addProduct'>
              Đã chọn :   <p> {categoryName} <SwapRightOutlined /> {branch} </p>
            </div>

            <div className="upload-img">
              <h4>Thêm ảnh cho sản phẩm</h4>
              <div className='input-upload-img'>

                <Form.Item className='img-product' name="thumbnail" rules={[{ required: true, message: 'Hãy nhập vào ảnh của sản phẩm' }]} >
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                          width: '100%',
                        }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Form.Item>
              </div>
            </div>
            <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
              <Button id='btn-addProduct' type="primary" htmlType="submit">
                Tiếp theo
              </Button>
            </Form.Item>

          </div>
        </Form>
      </div>
    </div>
  )
}

export default AddProduct






