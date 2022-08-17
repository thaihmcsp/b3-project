import React from 'react'
import { Col, Row, Carousel, PageHeader, Descriptions, Radio, Tag, Button,Icon  } from 'antd'
import 'antd/dist/antd.css';
import '../../../static/productDetail/productDetail.css'
import { useState } from 'react';
import {CarOutlined } from '@ant-design/icons';
const routes = [
    {
        path: 'index',
        breadcrumbName: 'First-level Menu',
    },
    {
        path: 'first',
        breadcrumbName: 'Second-level Menu',
    },
    {
        path: 'second',
        breadcrumbName: 'Third-level Menu',
    },
];

function ProductDetail() {
    let [inputpd, setInputpd] = useState(0)
    function tang() {
        setInputpd(inputpd + 1)
    }
    function giam() {
        setInputpd(inputpd - 1)
        if (inputpd <= 0) {
            setInputpd(0)
        }
    }

    return (
        <div className='product-detail'>
            <Row justify='center'>
                <Col span={16}>
                    <PageHeader
                        className="site-page-header"
                        breadcrumb={{
                            routes,
                        }}

                    />
                </Col>
            </Row>
            <Row justify='center' >

                <Col span={6}>
                    <div className="product-detail-left">
                        <Carousel autoplay>
                            <div>
                                <div className='product-detail-carousel-card'>
                                    <img src="https://pilt.elisa.ee/6bd99105-fee0-4653-bab3-d0db9bbc264d_size295x575.png" alt="" />
                                </div>
                            </div>
                            <div>
                                <div className='product-detail-carousel-card'>
                                    <img src="https://pilt.elisa.ee/6bd99105-fee0-4653-bab3-d0db9bbc264d_size295x575.png" alt="" />

                                </div>
                            </div>
                            <div>
                                <div className='product-detail-carousel-card'>
                                    <img src="https://pilt.elisa.ee/6bd99105-fee0-4653-bab3-d0db9bbc264d_size295x575.png" alt="" />

                                </div>
                            </div>
                            <div>
                                <div className='product-detail-carousel-card'>
                                    <img src="https://pilt.elisa.ee/6bd99105-fee0-4653-bab3-d0db9bbc264d_size295x575.png" alt="" />

                                </div>
                            </div>

                        </Carousel>
                    </div>
                </Col>
                <Col span={10}>
                    <div className="product-detail-right">
                        <div className="product-detail-title">
                            <h2>Iphone 13 Pro Max 2021</h2>
                        </div>
                        <div className="product-detail-price">
                            <Descriptions bordered>
                                <Descriptions.Item label="10.000.000 đ">
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="product-detail-sale">
                            <Descriptions bordered>
                                <Descriptions.Item label='Mã giảm giá :'>
                                    <Tag color="red">Giảm 25%</Tag>
                                    <Tag color="red">Giảm 35%</Tag>
                                    <Tag color="red"> Giảm 45%</Tag>
                                    <Tag color="red">Giảm75%</Tag>

                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="prodtuct-detail-color">
                            <Descriptions>
                                <Descriptions.Item label='Màu Sắc'>
                                    <Radio.Group defaultValue="a" buttonStyle="solid">
                                        <Radio.Button value="a">Đỏ</Radio.Button>
                                        <Radio.Button value="b">Xanh</Radio.Button>
                                        <Radio.Button value="c">Trắng</Radio.Button>
                                        <Radio.Button value="d">Xanh lá</Radio.Button>
                                    </Radio.Group>
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="prodtuct-detail-stroge">
                            <Descriptions>
                                <Descriptions.Item label='Dung lượng'>
                                    <Radio.Group defaultValue="a" buttonStyle="solid">
                                        <Radio.Button value="a">128Gb</Radio.Button>
                                        <Radio.Button value="b">256GB</Radio.Button>
                                        <Radio.Button value="C">512GB</Radio.Button>
                                    </Radio.Group>
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="prodtuct-detail-ship">
                            <Descriptions >
                                <Descriptions.Item label="Vận chuyển">
                                    <CarOutlined/>
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="product-detail-quantity">
                            <Descriptions>
                                <Descriptions.Item label='Số lượng'>
                                    <Button type="primary" onClick={giam}>-</Button>
                                    <input placeholder="Basic usage" value={inputpd} />
                                    <Button type="primary" onClick={tang}>+</Button>
                                </Descriptions.Item>
                            </Descriptions>
                        </div>

                    </div>
                </Col>
                <Col span={16}>

                </Col>
            </Row>
        </div>
    )
}

export default ProductDetail