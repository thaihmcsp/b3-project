import React from 'react'
import { Col, Row, Carousel, PageHeader, Descriptions, Radio, Tag, Button, Select } from 'antd'
import 'antd/dist/antd.css';
import './productDetail.css'
import { useState } from 'react';
const { Option } = Select;
const handleChange = (value) => {
    console.log(`selected ${value}`);
};


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
    let [inputpd, setInputpd] = useState(1)
    let [like, setLike] = useState(200)
    function like1() {
        let heart = document.querySelector('.fa-heart')

        if (like % 2 == 0) {

            setLike(like + 1)
            heart.setAttribute('style', 'color:red')

        } else {
            setLike(like - 1)
            heart.setAttribute('style', 'color:aqua')


        }
    }

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
                                <Descriptions.Item label="10.000.000 ??">
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="product-detail-sale">
                            <Descriptions bordered>
                                <Descriptions.Item label='M?? gi???m gi?? :'>
                                    <Tag color="red">Gi???m 25%</Tag>
                                    <Tag color="red">Gi???m 35%</Tag>
                                    <Tag color="red"> Gi???m 45%</Tag>
                                    <Tag color="red">Gi???m75%</Tag>

                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="prodtuct-detail-color">
                            <Descriptions>
                                <Descriptions.Item label='M??u S???c'>
                                    <Radio.Group defaultValue="a" buttonStyle="solid">
                                        <Radio.Button value="a">?????</Radio.Button>
                                        <Radio.Button value="b">Xanh</Radio.Button>
                                        <Radio.Button value="c">Tr???ng</Radio.Button>
                                        <Radio.Button value="d">Xanh l??</Radio.Button>
                                    </Radio.Group>
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="prodtuct-detail-stroge">
                            <Descriptions>
                                <Descriptions.Item label='Dung l?????ng'>
                                    <Radio.Group defaultValue="a" buttonStyle="solid">
                                        <Radio.Button value="a">128Gb</Radio.Button>
                                        <Radio.Button value="b">256GB</Radio.Button>
                                        <Radio.Button value="C">512GB</Radio.Button>
                                    </Radio.Group>
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="prodtuct-detail-address">
                            <Descriptions >
                                <Descriptions.Item label="V???n chuy???n">
                                    <span> ?????a ch???: <span>A4 BT3 214 Nguy???n Xi???n Thanh Xu??n H?? N???i</span></span>
                                </Descriptions.Item>
                                <Descriptions.Item label='Phi v???n chuy???n'>
                                    <Select
                                        defaultValue="0"
                                        style={{
                                            width: 100,
                                        }}
                                        onChange={handleChange}
                                    >

                                        <Option value="0">Mi???n Ph??</Option>
                                        <Option value="15000">15000??</Option>
                                        <Option value="25000">25000??</Option>

                                    </Select>
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="product-detail-quantity">
                            <Descriptions>
                                <Descriptions.Item label='S??? l?????ng'>
                                    <Button type="primary" onClick={giam}>-</Button>
                                    <input placeholder="Basic usage" value={inputpd} />
                                    <Button type="primary" onClick={tang}>+</Button>
                                </Descriptions.Item>
                            </Descriptions>
                        </div>

                    </div>
                </Col>

            </Row>
            <Row justify='center'>
                <Col span={6}>
                    <div className='product-detail-footer'>
                        <div>
                            <span>Chia s???:</span>
                            <a href="#"><i className="fa-brands fa-facebook-messenger"></i></a>

                            <a href="#"> <i className="fa-brands fa-facebook"></i></a>
                            <a href="#"> <i className="fa-brands fa-pinterest"></i></a>

                            <a href="#"> <i className="fa-brands fa-twitter"></i></a>
                        </div>
                        <div>
                            <a href="#" onClick={like1}><i className="fa-solid fa-heart"></i></a> <span> ???? Th??ch({like})</span>
                        </div>
                    </div>
                </Col>
                <Col span={10}>
                    <div className='product-detail-add'>
                        <Button danger className='pd-add-gh'> <i className="fa-solid fa-cart-plus"></i>  Th??m v??o gi??? h??ng</Button>
                        <Button type='primary' danger  className='pd-add-mh'>Mua Ngay</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ProductDetail