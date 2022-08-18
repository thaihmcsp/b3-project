import React from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, Col, Row, Modal, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';

const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

    onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
    }
}

function UserProfile() {

    // Btn-open-modal

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

    // Form-edit

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                        <Col span={18}>Quyhuu</Col>
                    </Row>

                    <Row>
                        <Col span={6} >Tên</Col>
                        <Col span={18}>Duong Huu Quy</Col>
                    </Row>

                    <Row>
                        <Col span={6} >Email</Col>
                        <Col span={18}>haha@gmail.com</Col>
                    </Row>


                    <Row>
                        <Col span={6} >Số Điện Thoại</Col>
                        <Col span={18}>0122222222</Col>
                    </Row>


                    <Row>
                        <Col span={6} >Tên Shop</Col>
                        <Col span={18}>Quyhuu</Col>
                    </Row>

                    <Row>
                        <Col span={6} >Giới tính</Col>
                        <Col span={18}>
                            <input type="radio" name="" id="" checked />Nam
                            <input type="radio" name="" id="" />Nữ
                            <input type="radio" name="" id="" />Khác
                        </Col>
                    </Row>

                    <Row>
                        <Col span={6} >Ngày sinh</Col>
                        <Col span={18}>
                            <input type="date" name="" id="" />
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
                                    label="Name"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your name!',
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
                    <img src="https://64.media.tumblr.com/970f8c9047f214078b5b023089059228/4860ecfa29757f0c-62/s640x960/9578d9dcf4eac298d85cf624bcf8b672a17e558c.jpg" alt="" />

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