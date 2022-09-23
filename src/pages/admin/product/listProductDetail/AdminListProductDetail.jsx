import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Modal, Descriptions, Input, InputNumber, Switch, Upload } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import './AdminListProductDetail.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getAPI, patchAPI, postAPI } from '../../../../config/api';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

function AdminListProductDetail() {
  const { productId } = useParams()
  const [Data, setData] = useState([])
  const [count, setcount] = useState(0)
  const [Urll, setUrl] = useState('')
  const [editDetail, setEditDetail] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([])
  const domain = 'https://shope-b3.thaihm.site/'
  const handleCancelPreview = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    console.log(31, file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  useEffect(() => {
    getData()
  }, [count])

  const getData = async () => {
    try {
      let res = await axios.get('https://shope-b3.thaihm.site/api/productDetail/get-all-detail/product/' + productId)
      let url = res.data.productDetails[0].listImg[0]
      if (!url) {
        url = 'https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/a8/16/d6/a816d667-a1af-83c3-97ba-0152eb8fd205/AppIcon-1x_U007emarketing-0-5-0-0-85-220.png/1200x600wa.png'
      }
      if (!url.startsWith('https')) {
        url = domain + url
      }
      setUrl(url)
      setData(res.data.productDetails)
    } catch (error) {
      console.log(error);
    }
  }

  // Modal-logic

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    if (editDetail) {
      setEditDetail(false)
    }
    setIsModalVisible(false);
  };

  // Form-logic

  const onFinish = async (values) => {
    console.log(96, values);
    console.log(97, fileList);
    try {
      let res = await postAPI('productDetail/create-product-detail/product/' + productId, values);
      console.log(97, res.data.productDetail._id);
      const formData = new FormData();
      for (let i = 0; i < fileList.length; i++) {
        let file = fileList[i].originFileObj
        formData.append('thumbs', file);
      }
      let newDetail = await patchAPI('/productDetail/add-product-detail-thumbs/' + res.data.productDetail._id, formData);
      console.log(105, newDetail.data);
      setcount(count + 1)
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  // Modal-editDetail-logic

  const [isModalOpenn, setIsModalOpenn] = useState(false);
  const [idEdit, setIdEdit] = useState('')

  // const showModal1 = () => {
  //   setIsModalOpenn(true);
  // };

  const handleOk1 = () => {
    setIsModalOpenn(false);
  };

  const handleCancel1 = () => {
    setIsModalOpenn(false);
  };

  const openModall = () => {
    setEditDetail(true)
    showModal()
  }


  return (
    <div className='adminListProductDetail' >
      <div className="adminListProductDetail-header">
        <div className="adminListProductDetail-header-left">
          {/* <h3>Product : {productDT.productName}</h3> */}
        </div>
        <div className="adminListProductDetail-header-right">
          <Button type="primary" onClick={showModal} >
            + Thêm 1 sản phẩm mới
          </Button>
          <Modal title={editDetail ? 'Edit Detail Form' : "Create Product Detail"} footer={null} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
              <Form.Item
                label="Color"
                name="color"
                rules={[
                  {
                    required: true,
                    message: 'Please input color!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Ram"
                name="ram"
                rules={[
                  {
                    required: true,
                    message: 'Please input ram!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Rom"
                name="rom"
                rules={[
                  {
                    required: true,
                    message: 'Please input rom!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Storage"
                name="storage"
                rules={[
                  {
                    required: true,
                    message: 'Please input Storage!',
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: 'Please input Price!',
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelPreview}>
                  <img
                    alt="example"
                    style={{
                      width: '100%',
                    }}
                    src={previewImage}
                  />
                </Modal>

              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                {editDetail ?
                  <Button type="primary" htmlType="submit">
                    Add Detail
                  </Button>
                  :
                  <Button type="primary" htmlType="submit">
                    Add Detail
                  </Button>
                }
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
      <div className="adminListProductDetail-body">
        <div className="adminListProductDetail-table">
          <div className="adminListProductDetail-table-header">
            <Descriptions title="" column={7}>
              <Descriptions.Item label="Product"></Descriptions.Item>
              <Descriptions.Item label="">Color</Descriptions.Item>
              <Descriptions.Item label="">Status</Descriptions.Item>
              <Descriptions.Item label="">RAM-ROM</Descriptions.Item>
              <Descriptions.Item label="">
                Storage
              </Descriptions.Item>
              <Descriptions.Item label="">Price</Descriptions.Item>
            </Descriptions>
          </div>
          <div className="adminListProductDetail-table-body">
            {
              Data ? Data.map((value, index) => {
                const onChange = async (checked) => {
                  try {
                    let res = await patchAPI('/productDetail/update-product-detail-status/' + value._id, { status: checked ? 'enable' : "disable" })
                    setcount(count + 1)
                  } catch (error) {
                    console.log(error);
                  }
                };

                const onFinish1 = async (values) => {
                  try {
                    let res = await patchAPI('/productDetail/update-product-detail-info/' + idEdit, values)
                    console.log(res);
                    alert(res.statusText)
                    setcount(count + 1)
                  } catch (error) {
                    console.log(error);
                  }
                };

                const showModal1 = () => {
                  setIdEdit(value._id)
                  setIsModalOpenn(true);
                };

                return (
                  <div className='product'>
                    <Descriptions title="" column={7}>
                      <Descriptions.Item label=""><img src={Urll} alt="" width={120} /></Descriptions.Item>
                      <Descriptions.Item label="">{value.color}</Descriptions.Item>
                      <Descriptions.Item label="">{value.status}</Descriptions.Item>
                      <Descriptions.Item label="">{value.ram} - {value.rom}</Descriptions.Item>
                      <Descriptions.Item label=""> {value.storage} </Descriptions.Item>
                      <Descriptions.Item label=""> {value.price} </Descriptions.Item>
                      <Descriptions.Item label="">
                        <Switch checked={value.status == 'enable' ? true : false} onChange={onChange} />
                      </Descriptions.Item>
                      <Descriptions.Item label=""></Descriptions.Item>
                      <Descriptions.Item label="">
                        <Button type="primary" onClick={openModall}>
                          Edit Detail
                        </Button>
                        {/* <Modal title="Basic Modal" visible={isModalOpenn} open={isModalOpenn} onOk={handleOk1} onCancel={handleCancel1} footer={null}>
                          <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onFinish1} onFinishFailed={onFinishFailed} autoComplete="off" >
                            <Form.Item
                              label="Color"
                              name="color"
                              rules={[
                                {
                                  required: true,
                                  message: 'Please input color!',
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>

                            <Form.Item
                              label="Ram"
                              name="ram"
                              rules={[
                                {
                                  required: true,
                                  message: 'Please input ram!',
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>

                            <Form.Item
                              label="Rom"
                              name="rom"
                              rules={[
                                {
                                  required: true,
                                  message: 'Please input rom!',
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>

                            <Form.Item
                              label="Storage"
                              name="storage"
                              rules={[
                                {
                                  required: true,
                                  message: 'Please input Storage!',
                                },
                              ]}
                            >
                              <InputNumber />
                            </Form.Item>

                            <Form.Item
                              label="Price"
                              name="price"
                              rules={[
                                {
                                  required: true,
                                  message: 'Please input Price!',
                                },
                              ]}
                            >
                              <InputNumber />
                            </Form.Item>

                            <Form.Item
                              wrapperCol={{
                                offset: 8,
                                span: 16,
                              }}
                            >
                              <Button type="primary" htmlType="submit">
                                Add Detail
                              </Button>
                            </Form.Item>
                          </Form>
                        </Modal> */}
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                )
              }) : <h1>Đang tải</h1>
            }
          </div>
        </div>
      </div>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelPreview}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  )
}

export default AdminListProductDetail