import React  from 'react'
import { Col, Row, Carousel, PageHeader, Descriptions, Radio, Tag, Button, Select, Image } from 'antd'
import 'antd/dist/antd.css';
import './productDetail.css';
import axios from 'axios';
import { Routes, Route, useParams } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import product from '../../../static/Truong/product.json'
import { getAPI } from '../../../config/api';
import { instance } from '../../../config/axios';
// Select 
const { Option } = Select;
const children = [
    <Option key={1}> {'Giảm 10%'}</Option>,
    <Option key={2}> {'Giảm 15%'}</Option>,
    <Option key={3}>{'Giảm 25%'}</Option>,
    <Option key={4}>{'Giảm 50%'}</Option>,
    <Option key={5}>{'Free ship'}</Option>,

];

const handleChange = (value) => {
    console.log(`Selected: ${value}`);

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
    const { productId } = useParams()
    let [inputpd, setInputpd] = useState(1)
    let [like, setLike] = useState(200)
    const [productDetailData, setProductDetailData] = useState([])
    const [count, setCount] = useState(0);

// getAPI 
async function getAPIproductDetail(){
    
    try {
        let products = await instance.get(`product/get-one-product/${productId}`)
        setProductDetailData([products.data.product])
    }
    catch (error){
        console.log(error);
    }
}
useEffect(() => {
    getAPIproductDetail()
}, [count])
//
console.log(productDetailData);

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
            {productDetailData.map(
                (value, index) => {
                    return (
                        <div>
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
                                                    <img src={value.thumbnail} alt="" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className='product-detail-carousel-card'>
                                                    <img src={value.thumbnail} alt="" />

                                                </div>
                                            </div>
                                            <div>
                                                <div className='product-detail-carousel-card'>
                                                    <img src={value.thumbnail} alt="" />

                                                </div>
                                            </div>
                                            <div>
                                                <div className='product-detail-carousel-card'>
                                                    <img src={value.thumbnail} alt="" />

                                                </div>
                                            </div>

                                        </Carousel>
                                        <div className="product-detail-listimg">
                                            <Image
                                                width={66}
                                                src={value.thumbnail}
                                            />
                                            <Image
                                                width={66}
                                                src={value.thumbnail}
                                            />
                                            <Image
                                                width={66}
                                                src={value.thumbnail}
                                            />
                                            <Image
                                                width={66}
                                                src={value.thumbnail}
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col span={10}>
                                    <div className="product-detail-right">
                                        <div className="product-detail-title">
                                            <h2> {value.productName}</h2>
                                        </div>
                                        <div className="product-detail-rank">
                                            <div className="product-detail-rank-item">
                                                <span className='product-detail-item1'>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star-half"></i>
                                                </span>
                                            </div>
                                            <div className="product-detail-rank-item">
                                                <span className='product-detail-item2'>Đánh giá</span>
                                            </div>
                                            <div className="product-detail-rank-item3">
                                                <span>
                                                    Đã bán
                                                </span>
                                            </div>
                                        </div>
                                        <div className="product-detail-price">
                                            <Descriptions bordered>
                                                <Descriptions.Item label={value.price}>
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </div>
                                        <div className="product-detail-sale">
                                            <Descriptions bordered>
                                                <Descriptions.Item label='Mã giảm giá :'>
                                                    <Select
                                                        mode="multiple"
                                                        placeholder="Chọn hoặc nhập mã"
                                                        defaultValue={['Giảm 10%']}
                                                        onChange={handleChange}
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    >
                                                        {children}
                                                    </Select>
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
                                                        <Radio.Button value="32">32Gb</Radio.Button>
                                                        <Radio.Button value="64">64Gb</Radio.Button>
                                                        <Radio.Button value="a">128Gb</Radio.Button>
                                                        <Radio.Button value="b">256GB</Radio.Button>
                                                        <Radio.Button value="C">512GB</Radio.Button>
                                                    </Radio.Group>
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </div>
                                        <div className="prodtuct-detail-address">
                                            <Descriptions >
                                                <Descriptions.Item label="Vận chuyển">
                                                    <span><i class="fa-solid fa-truck-moving"></i> Địa chỉ: <span> A4 BT3 214 Nguyễn Xiển Thanh Xuân Hà Nội</span></span>
                                                </Descriptions.Item>

                                            </Descriptions>
                                        </div>
                                        <div className="prodtuct-detail-address">
                                            <Descriptions>
                                                <Descriptions.Item label='Phi vận chuyển'>
                                                    <Select
                                                        defaultValue="0"
                                                        style={{
                                                            width: 100,
                                                        }}
                                                        onChange={handleChange}
                                                    >

                                                        <Option value="0">Miễn Phí</Option>
                                                        <Option value="15000">15000đ</Option>
                                                        <Option value="25000">25000đ</Option>

                                                    </Select>
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

                            </Row>
                            <Row justify='center'>
                                <Col span={6}>
                                    <div className='product-detail-footer'>
                                        <div>
                                            <span>Chia sẻ:</span>
                                            <a href="#"><i className="fa-brands fa-facebook-messenger"></i></a>

                                            <a href="#"> <i className="fa-brands fa-facebook"></i></a>
                                            <a href="#"> <i className="fa-brands fa-pinterest"></i></a>

                                            <a href="#"> <i className="fa-brands fa-twitter"></i></a>
                                        </div>
                                        <div>
                                            <a href="#" onClick={like1}><i className="fa-solid fa-heart"></i></a> <span> Đã Thích({like})</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={10}>
                                    <div className='product-detail-add'>
                                        <Button danger className='pd-add-gh'> <i className="fa-solid fa-cart-plus"></i>  Thêm vào giỏ hàng</Button>
                                        <Button type='primary' danger className='pd-add-mh'>Mua Ngay</Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    )
                }
            )}
        </div>
    )
}

export default ProductDetail