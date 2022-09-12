import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import React, { useState } from 'react';
import { Input } from 'antd';
import './AddProductDetail.css'
import { Select } from 'antd';
import { getAPI, postAPI } from '../../../../config/api';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;


function AddProductDetail() {
  const { productId } = useParams()

  let token = window.localStorage.getItem('user')
  console.log(token);
  
  const addSucess = async (values) => {
    console.log('Success:', values);
    try {
      let res = await axios.post('https://shope-b3.thaihm.site/api/product/create-product', values, { headers: { Authorization: token } })
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const addFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
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
  
    const [loading, setLoading] = useState([false,false,false,false,false,false,false,false,false]);
    const [imageUrl, setImageUrl] = useState(['','','','','','','','','']);
    const name = ['* Ảnh bìa', 'Hình ảnh 1','Hình ảnh 2','Hình ảnh 3', 'Hình ảnh 4', 'Hình ảnh 5', 'Hình ảnh 6', 'Hình ảnh 7', 'Hình ảnh 8']
    const handleChange = (info, index) => {
      console.log(index);
      if (info.file.status === 'uploading') {
        getBase64(info.file.originFileObj, (url) => {
          let data = [...imageUrl]
          data[index] = url
          setImageUrl(data);
        });
        return;
      }
  
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (url) => {
          setLoading(false);
          setImageUrl(url);
        });
      }
    }
    const uploadButton = (index) => {
      return (
        (
          <div>
            {loading[index] ? <LoadingOutlined /> : <PlusOutlined />}
            <div
              style={{
                marginTop: 8,
              }}
            >
            </div>
          </div>
        )
      )
    };


    // atn input
    const onChange = (value) => {
      console.log(`selected ${value}`);
    };
    
    const onSearch = (value) => {
      console.log('search:', value);
    };
  return (
    <div>
        <div className='container' addSucess={addSucess} addFailed={addFailed} >
          <p className='head-p'>Thông tin cơ bản</p>
          <div className='add-img'>
            <div className='label'>
              <p className='item-p'>Hình ảnh sản phẩm</p>
            </div>
            <div className='add-zone'>

              {imageUrl.map((data, index) => {
                console.log(imageUrl[index] ? true : false);
                return (
                  <div className='add-img-upload-item'>
                    <div>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      // action="https://www.mocky.io/v2/5cc8false9d300000980a055e76"
                      beforeUpload={beforeUpload}
                      onChange={(file) => {handleChange(file, index)}}
                    >
                      {imageUrl[index] ? (
                        <img
                          src={imageUrl[index]}
                          alt="avatar"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        uploadButton(index)
                      )}
                    </Upload>
                    </div>
                    <p className='p-des-item-special'>{name[index]}</p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='product-info-single'>
            <div className='label-single'>
              <p className='item-p'>Màu sắc</p>
            </div>
            <div className='add-zone-single'>
            <Input className='color-input' placeholder="Nhập vào" />
            </div>
          </div>
          <div className='product-info-double'>
          <div className='product-info-double'>
            <div className='label-double'>
              <p className='item-p'>RAM</p>
            </div>
            <div className='add-zone-double'>
            <Input className='RAM-input' placeholder="Nhập vào" />
            </div>
          </div>
          <div className='product-info-double'>
            <div className='label-double'>
              <p className='item-p'>ROM</p>
            </div>
            <div className='add-zone-double'>
            <Input className='ROM-input' placeholder="Nhập vào" />
            </div>
          </div>
          </div>
          <p className='head-p'>Thông tin bán hàng</p>
          <div className='price'>
            <div className='price-p'>
              <p className='item-p'>Giá</p>
            </div>
            <Input placeholder="Nhập vào" />
          </div>
          <div className='price'>
            <div className='price-p'>
              <p className='item-p '>Tồn kho</p>
            </div>
            <Input placeholder="Nhập vào"/>
          </div>
        </div>
        <div><button className='btn-add'>Thêm sản phẩm</button></div>
    </div>
  )
};;

export default AddProductDetail