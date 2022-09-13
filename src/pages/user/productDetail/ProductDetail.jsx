import React from 'react'
import { Col, Row, Carousel, PageHeader, Descriptions, Radio, Tag, Button, Select, Image } from 'antd'
import 'antd/dist/antd.css';
import './productDetail.css';
import axios from 'axios';
import { Routes, Route, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import product from '../../../static/Truong/product.json'
import { getAPI, patchAPI } from '../../../config/api';
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
    const [productDetailCheck, setProductDetailCheck] = useState([])
    const [productDetailID, setProductDetailID] = useState()

    const [count, setCount] = useState(0);
    // getAPI 

    // console.log(count,51);
    async function getAPIproductDetail() {

        try {
            let products = await getAPI(`product/get-one-product/${productId}`)
            setProductDetailPrice(products.data.product.price)
            setProductDetailData([products.data.product])
            setProductDetailCheck(products.data.product.listDtail)
            
        }
        catch (error) {
            console.log(error);
        }
    }

    async function addToCart(){
        try {
            let addToCart = await patchAPI(`/cart/add-to-cart`,{'productDetailId':productDetailID,"quantity":inputpd})
            if(addToCart.status == 200){
                alert('Thêm vào giỏ hàng thành công !')
            }else {
                alert('Lỗi !')
            }
        }
        catch (error){
            console.log(error);
        }
    }

    // set product price
    const [productDetailPrice, setProductDetailPrice] = useState(0)


    // get value option
    const [pdColor, setpdColor] = useState();
    const [pdRam, setpdRam] = useState();
    const [pdRom, setpdRom] = useState();

    // set price
    function setPrice1(value) {
        let color = value.target.value
        setpdColor(color)
        getPrice(color, pdRam, pdRom )
        
    }
    function setPrice2(value) {
        let ram = value.target.value
        setpdRam(ram)
        getPrice(pdColor, ram, pdRom)
    }
    function setPrice3(value) {
        let rom = value.target.value
        setpdRom(rom)
        getPrice(pdColor, pdRam, rom)
    }


    function getPrice(pdColor, pdRam, pdRom){
        if (pdColor, pdRam, pdRom) {

            let arrPrice = productDetailCheck.find(
                (value) => {
                    return value.color == pdColor && value.ram == pdRam && value.rom == pdRom
                }
            )
            setProductDetailID(arrPrice._id)
            setProductDetailPrice(arrPrice.price)
        }
    }
    //  Chức năng tương tác

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

    //
    

//
    // useEffect
    useEffect(() => {
        getAPIproductDetail()
        // setProductDetailPrice(productDetailData[0].price);

    }, [count])




    return (
        <div className='product-detail'>
            {productDetailData.map(
                (value, index) => {

                    return (
                        <div className='product-detail-body'>
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

                                <Col span={5}>
                                    <div className="product-detail-left">
                                        <Carousel autoplay>
                                            <div>
                                                <div className='product-detail-carousel-card'>
                                                    <img src={`https://shope-b3.thaihm.site/${value.thumbnail}`} alt="" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className='product-detail-carousel-card'>
                                                    <img src={`https://shope-b3.thaihm.site/${value.thumbnail}`} alt="" />

                                                </div>
                                            </div>
                                            <div>
                                                <div className='product-detail-carousel-card'>
                                                    <img src={`https://shope-b3.thaihm.site/${value.thumbnail}`} alt="" />

                                                </div>
                                            </div>
                                            <div>
                                                <div className='product-detail-carousel-card'>
                                                    <img src={`https://shope-b3.thaihm.site/${value.thumbnail}`} alt="" />

                                                </div>
                                            </div>

                                        </Carousel>
                                        <div className="product-detail-listimg">
                                            <Image
                                                width={66}
                                                src={`https://shope-b3.thaihm.site/${value.thumbnail}`}
                                            />
                                            <Image
                                                width={66}
                                                src={`https://shope-b3.thaihm.site/${value.thumbnail}`}
                                            />
                                            <Image
                                                width={66}
                                                src={`https://shope-b3.thaihm.site/${value.thumbnail}`}
                                            />
                                            <Image
                                                width={66}
                                                src={`https://shope-b3.thaihm.site/${value.thumbnail}`}
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col span={11}>
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
                                                <Descriptions.Item label={productDetailPrice}>
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </div>
                                        {/* <div className="product-detail-sale">
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
                                                            </div> */}
                                        <div className="prodtuct-detail-color">
                                            <Descriptions>
                                                <Descriptions.Item label='Màu Sắc'>
                                                    <Radio.Group defaultValue="a" buttonStyle="solid" onChange={setPrice1}>
                                                        {productDetailCheck.filter(
                                                            (value, index, arr) => {
                                                                return value.status === 'enable'
                                                            }
                                                        ).filter(
                                                            (value2, index, array) => {
                                                                return index === array.findIndex((value3) => value3.color === value2.color)
                                                            }
                                                        ).map(
                                                            (val, index) => {
                                                                return (
                                                                    <Radio.Button value={val.color}>{val.color}</Radio.Button>
                                                                )
                                                            }
                                                        )}
                                                    </Radio.Group>
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </div>
                                        <div className="prodtuct-detail-stroge">
                                            <Descriptions>
                                                <Descriptions.Item label='RAM'>
                                                    <Radio.Group defaultValue="a" buttonStyle="solid" onChange={setPrice2}>

                                                        {productDetailCheck.filter(
                                                            (value, index, arr) => {
                                                                return value.status === 'enable'
                                                            }
                                                        ).filter(
                                                            (value2, index, array) => {
                                                                return index === array.findIndex((value3) => value3.ram === value2.ram)
                                                            }
                                                        ).map(
                                                            (val, index) => {
                                                                return (
                                                                    <Radio.Button value={val.ram}>{val.ram}</Radio.Button>
                                                                )
                                                            }
                                                        )}

                                                    </Radio.Group>
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </div>
                                        <div className="prodtuct-detail-stroge">
                                            <Descriptions>
                                                <Descriptions.Item label='ROM'>
                                                    <Radio.Group defaultValue="a" buttonStyle="solid" onChange={setPrice3}>
                                                        {productDetailCheck.filter(
                                                            (value, index, arr) => {
                                                                return value.status === 'enable'
                                                            }
                                                        ).filter(
                                                            (value2, index, array) => {
                                                                return index === array.findIndex((value3) => value3.rom === value2.rom)
                                                            }
                                                        ).map(
                                                            (val, index) => {
                                                                return (
                                                                    <Radio.Button value={val.rom}>{val.rom}</Radio.Button>
                                                                )
                                                            }
                                                        )}

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
                                        {/* <div className="prodtuct-detail-address">
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
                                                            </div> */}
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
                                        <Button danger className='pd-add-gh' onClick={addToCart}> <i className="fa-solid fa-cart-plus"></i>  Thêm vào giỏ hàng</Button>
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