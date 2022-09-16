import React from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, Col, Row, Modal, Checkbox, Form, Input, DatePicker, Space, Select } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { getAPI, patchAPI } from '../../config/api';
const { Option } = Select;

const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

    onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
    }
}

function UserProfile() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [count, setCount] = useState(0)
    const token = window.localStorage.getItem('user')
    const [data, setData] = useState({})
    let linkk = ''

    const getData = async () => {
        try {
            let res = await getAPI('auth/get-loged-in-user')
            linkk = res.data.user.avatar
            setData(res.data.user)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

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
    console.log(32, data);

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChange2 = (date, dateString) => {
        console.log(date, dateString);
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
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
                        <Col span={18}>{data.email ? data.email : "Đang cập nhật"}</Col>
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
                    <img src={data.avatar ? data.avatar : "https://64.media.tumblr.com/970f8c9047f214078b5b023089059228/4860ecfa29757f0c-62/s640x960/9578d9dcf4eac298d85cf624bcf8b672a17e558c.jpg"} alt="" />

                    <div>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                        </Upload>
                    </div>

                    <p>Dung lượng tối đa 1MB <br /> Định dạng: .JPEG, .PNG</p>
                </div>

            </div>


        </div>
    )
}

export default UserProfile