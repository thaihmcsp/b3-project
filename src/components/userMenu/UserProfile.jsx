import React from 'react'
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Upload, Col, Row, Modal, Checkbox, Form, Input, DatePicker, Space, Select, message } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { getAPI, patchAPI } from '../../config/api';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { userLogin } from '../../redux/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;


// Set default value BirthDay
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';


const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

    onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
    }
}


// Upload file logic

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

function UserProfile() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [count, setCount] = useState(0)
    const token = window.localStorage.getItem('user')
    const [data, setData] = useState({})
    const [birthDay,setBirthDay] = useState('')
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [formImg, setFormImg] = useState(new FormData())
    const key = 'updatable';
    const nav = useNavigate()
    const dispatch = useDispatch()
    let linkk = ''

    const domain = 'https://shope-b3.thaihm.site/'

    

    const success = () => {
        message.loading({
            content: 'Loading...',
            key,
        });


        setTimeout(() => {
            message.success({
                content: 'Đổi ảnh đại diện thành công',
                key,
                duration: 2,
            });
        }, 1000);
    };


    const errorMess = () => {
        message.error('Thất bại ! Hãy xem lại kết nối hoặc chọn lại ảnh');
    };

    const getData = async () => {
        try {
            let res = await getAPI('auth/get-loged-in-user')
            linkk = res.data.user.avatar

            if (!linkk) {
                linkk = 'https://64.media.tumblr.com/970f8c9047f214078b5b023089059228/4860ecfa29757f0c-62/s640x960/9578d9dcf4eac298d85cf624bcf8b672a17e558c.jpg'
            }

            if (!linkk.startsWith('https')) {
                linkk = domain + linkk
            }

            setImageUrl(linkk)
            setData(res.data.user)
            setBirthDay((res.data.user.dateOfBirth.split('T'))[0].split('-').join('/'))
        } catch (error) {
            console.log(error);
        }
    }

    console.log(data);
    console.log(123,birthDay);

    useEffect(() => {
        getData()
    }, [count])

    // Btn-open-modal


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Form-edit

    const onFinish = async (values) => {
        try {
            let res = await patchAPI('user/update-info', values)
            setCount(count + 1)
            console.log(res);
            alert(res.data.message)
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChange2 = (date, dateString) => {
        console.log(date, dateString);
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    // Upload logic

    const handleChange2 = (info) => {
        const formData = new FormData()
        formData.append('avatar', info.file.originFileObj)
        console.log(112, info);
        setFormImg(formData)

        getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
        });
    };



    const onFinishAvatar = async (values) => {
        try {
            const res = await patchAPI('/user/change-avatar', formImg)
            console.log(res);
            const ress = await getAPI('/auth/get-loged-in-user')
            const action = userLogin(ress.data)
            dispatch(action)
            setCount(count + 1)
            success()
        } catch (error) {
            console.log(error);
            errorMess()
        }
    };

    


    return (
        <div className='user-profile'>
            <div className="profile-header">
                <h3>Hồ Sơ Của Tôi</h3>
                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>
            <div className="profile-body">
                <div className="body-left">
                    <Row>
                        <Col span={6} >Tên Đăng Nhập</Col>
                        {/* <Col span={18}>{data.email ? data.email : "Đang cập nhật"}</Col> */}
                        <Col span={18}><Input value={data.email ? data.email : "Đang cập nhật"} /></Col>
                    </Row>

                    <Row>
                        <Col span={6}>Username:</Col>
                        <Col span={18}><Input value={data.username ? data.username : "Đang cập nhật"} /></Col>
                    </Row>

                    <Row>
                        <Col span={6}>Fullname:</Col>
                        <Col span={18}><Input value={data.fullname ? data.fullname : "Đang cập nhật"} /></Col>
                    </Row>

                    <Row>
                        <Col span={6}>Phone:</Col>
                        <Col span={18}><Input value={data.phone ? data.phone : "Đang cập nhật"} /></Col>
                    </Row>

                    <Row>
                        <Col span={6}>Sex:</Col>
                        <Col span={18}>
                            <Select
                                style={{
                                    width: 120,
                                }}
                                defaultValue={data.sex == "Male" ? "Male" : "Female"}
                                onChange={handleChange}
                            >
                                <Option value="Male">Male</Option>
                                <Option value="Female">Female</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={6}>Birth Day:</Col>
                        <Col span={18} >
                            <DatePicker onChange={onChange2} defaultValue={moment(birthDay, dateFormat)} format={dateFormat} />
                        </Col>
                    </Row>

                    <Row>
                        <Button type="primary" onClick={showModal}>
                            Đổi thông tin
                        </Button>
                        <Modal title="Thông tin" footer={null} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Full Name"
                                    name="fullname"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Full Name!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Phone"
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Phone!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Sex"
                                    name="sex"
                                >
                                    <Select
                                        style={{
                                            width: 120,
                                        }}
                                        onChange={handleChange}
                                    >
                                        <Option value="Male">Male</Option>
                                        <Option value="Female">Female</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Date of birth"
                                    name="dateOfBirth"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Date of birth',
                                        },
                                    ]}
                                >
                                    <DatePicker onChange={onChange2} />
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Đổi thông tin
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>


                    </Row>
                </div>

                <div className="body-right">
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinishAvatar}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={handleChange2}
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
                                    64
                                )}
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <p>Dung lượng tối đa 1MB <br /> Định dạng: .JPEG, .PNG</p>
                        </Form.Item>

                        <Form.Item >
                            <Button className='btn-change-avatar' type="primary" htmlType="submit">
                                Đổi ảnh đại diện
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </div>


        </div>
    )
}

export default UserProfile