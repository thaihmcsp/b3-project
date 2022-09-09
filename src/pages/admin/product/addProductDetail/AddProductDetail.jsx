import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import React, { useState } from 'react';
import { Input } from 'antd';
import './AddProductDetail.css'
import { Select } from 'antd';
const { Option } = Select;
function AddProductDetail() {
  
  // atn picture upload
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
        // setLoading(true);
        getBase64(info.file.originFileObj, (url) => {
          // setLoading(false);
          let data = [...imageUrl]
          data[index] = url
          setImageUrl(data);
        });
        return;
      }
  
      if (info.file.status === 'done') {
        // Get this url from response in real world.
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
        <div className='container'>
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
          <div className='product-info-double'>
          </div>
          <div className='product-info-double'>
          <div className='product-info-double'>
            <div className='label-double'>
              <p className='item-p'>Tên thương hiệu</p>
            </div>
            <div className='add-zone-double'>
            <Select
              showSearch
              placeholder="Vui lòng chọn"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              <Option value="jack">Samsung</Option>
              <Option value="lucy">Apple</Option>
              <Option value="tom">Xiaomi</Option>
              <Option value="tom">Huawei</Option>
            </Select>
            </div>
          </div>
          <div className='product-info-double'>
            <div className='label-double'>
              <p className='item-p'>Màu sắc</p>
            </div>
            <div className='add-zone-double'>
            <Select
              showSearch
              placeholder="Vui lòng chọn"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
            </div>
          </div>
          </div>
          <div className='product-info-double'>
          <div className='product-info-double'>
            <div className='label-double'>
              <p className='item-p'>RAM</p>
            </div>
            <div className='add-zone-double'>
            <Select
              showSearch
              placeholder="Vui lòng chọn"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
            </div>
          </div>
          <div className='product-info-double'>
            <div className='label-double'>
              <p className='item-p'>ROM</p>
            </div>
            <div className='add-zone-double'>
            <Select
              showSearch
              placeholder="Vui lòng chọn"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
            </div>
          </div>
          </div>
          <p className='head-p'>Thông tin bán hàng</p>
          <div className='price'>
            <div className='price-p'>
              <p className='item-p '>Giá</p>
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
    </div>
  )
};;

export default AddProductDetail