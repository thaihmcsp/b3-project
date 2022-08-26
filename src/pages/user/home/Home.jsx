import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "antd";
import "./Home.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import { CheckOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";


const contentStyle = {
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  height: "235px",
  borderRadius: "4px",
};

function Home({ product }) {
  const nav = useNavigate();
  const [showDataPage, setShowDataPage] = useState([]);
  const [showPagination, setShowPagination] = useState(false);
  const [showBtnSeeMore, setShowBtnSeeMore] = useState(true);
  const [showHeaderProduct, setShowHeaderProduct] = useState(true);
  const [count, setCount] = useState(0);
  
  const tab1 = document.querySelector(".home_product-heading");
  const tab2 = document.querySelector(".home_product-img");

  const search = useLocation();
  let objectSearch = { page: 1, pageSize: 10 };
  if (search.search) {
    const querry = search.search.slice(1).split("&");
    querry.map((item) => {
      const key = item.split("=")[0];
      const value = item.split("=")[1];
      objectSearch[key] = +value;
      return objectSearch;
    });
  }

  useEffect(() => {
    async function getData() {
      try {
        setShowDataPage(
          product.slice(
            (objectSearch.page - 1) * objectSearch.pageSize,
            objectSearch.page * objectSearch.pageSize
          )
        );
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [count]);

  const changePage = (id) => {
    nav("/product-detail/" + id);
  };
  let refCarousel = useRef(null);
  const handlePrevSlider = () => {
    refCarousel.prev();
  };

  const handleNextSlider = () => {
    refCarousel.next();
  };

  const onShowSizeChange = (current, pageSize) => {
    let start = (current - 1) * pageSize;
    let stop = current * pageSize;
    setShowDataPage(product.slice(start, stop));
    nav(`?page=${current}&pageSize=${pageSize}`);
    setCount((pre) => pre + 1);
  };

  return (
    <div className="home_container">
      <div className="home_body">
        <div className="home_banner">
          <div className="home_banner-left">
            <button className="home_banner-left-btn" onClick={handlePrevSlider}>
              <LeftOutlined />
            </button>
            <Carousel autoplay ref={(node) => (refCarousel = node)}>
              <div>
                <h3 style={contentStyle}>1</h3>
              </div>
              <div>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div>
                <h3 style={contentStyle}>3</h3>
              </div>
              <div>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel>
            <button
              className="home_banner-right-btn"
              onClick={handleNextSlider}
            >
              <RightOutlined />
            </button>
          </div>
          <div className="home_banner-right">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkff_WbyYU5jxqitiN5v_L2ebMp13F7WE5Ry_mffonhA&s"
              alt="banner"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkff_WbyYU5jxqitiN5v_L2ebMp13F7WE5Ry_mffonhA&s"
              alt="banner"
            />
          </div>
        </div>
        <div className="home_navbar">
          <div className="home_navbar-item">
            <div className="home_navbar-item-img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi0sO1CA1idzbC6A3C12mgu27xkV6GwABMbQ&usqp=CAU"
                alt=""
              />
            </div>
            <p>Khung Giờ Săn Sale</p>
          </div>
          <div className="home_navbar-item">
            <div className="home_navbar-item-img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi0sO1CA1idzbC6A3C12mgu27xkV6GwABMbQ&usqp=CAU"
                alt=""
              />
            </div>
            <p>Gì Cũng Rẻ - Mua Là Freeship</p>
          </div>
          <div className="home_navbar-item">
            <div className="home_navbar-item-img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi0sO1CA1idzbC6A3C12mgu27xkV6GwABMbQ&usqp=CAU"
                alt=""
              />
            </div>
            <p>Miễn Phí Vận Chuyển</p>
          </div>
          <div className="home_navbar-item">
            <div className="home_navbar-item-img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi0sO1CA1idzbC6A3C12mgu27xkV6GwABMbQ&usqp=CAU"
                alt=""
              />
            </div>
            <p>Bắt Trend - Giá Sốc</p>
          </div>
          <div className="home_navbar-item">
            <div className="home_navbar-item-img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi0sO1CA1idzbC6A3C12mgu27xkV6GwABMbQ&usqp=CAU"
                alt=""
              />
            </div>
            <p>Hoàn Xu 6% - Lên Đến 200K</p>
          </div>
          <div className="home_navbar-item">
            <div className="home_navbar-item-img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi0sO1CA1idzbC6A3C12mgu27xkV6GwABMbQ&usqp=CAU"
                alt=""
              />
            </div>
            <p>Hàng Hiệu Giá Tốt</p>
          </div>
          <div className="home_navbar-item">
            <div className="home_navbar-item-img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi0sO1CA1idzbC6A3C12mgu27xkV6GwABMbQ&usqp=CAU"
                alt=""
              />
            </div>
            <p>Hàng Quốc Tế - Thương Hiệu 59K</p>
          </div>
          <div className="home_navbar-item">
            <div className="home_navbar-item-img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi0sO1CA1idzbC6A3C12mgu27xkV6GwABMbQ&usqp=CAU"
                alt=""
              />
            </div>
            <p>Nạp Thẻ, Hóa Đơn & Phim</p>
          </div>
          <div className="home_navbar-item">
            <div className="home_navbar-item-img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi0sO1CA1idzbC6A3C12mgu27xkV6GwABMbQ&usqp=CAU"
                alt=""
              />
            </div>
            <p>Deal Sốc Từ 1K</p>
          </div>
          <div className="home_navbar-item">
            <div className="home_navbar-item-img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi0sO1CA1idzbC6A3C12mgu27xkV6GwABMbQ&usqp=CAU"
                alt=""
              />
            </div>
            <p>Chọn 6 Số Trúng Tiền Triệu</p>
          </div>
        </div>
      </div>
      <div className="home_product">
        <div className="home_product-body">
          {showHeaderProduct ? (
            <div className="home_product-header">
              <div
                className="home_product-heading tab-active"
                onClick={() => {
                  tab2.classList.remove("tab-active");
                  tab1.classList.add("tab-active");
                }}
              >
                <h2>GỢI Ý HÔM NAY</h2>
              </div>
              <div
                className="home_product-img"
                onClick={() => {
                  tab2.classList.add("tab-active");
                  tab1.classList.remove("tab-active");
                }}
              >
                <img
                  src="https://cf.shopee.vn/file/bc036304a0bd28830f0c2a7c105240df"
                  alt=""
                />
              </div>
            </div>
          ) : (
            <div className="user_home-all-container">
              <button className="user_home-all-btn">Tất cả</button>
            </div>
          )}
          <div className="home_product-list-product">
            {showDataPage.map((item, index) => {
              return (
                <div
                  className="home_product-item"
                  onClick={() => changePage(item._id)}
                >
                  <img src={item.thumpnail} alt="" />
                  <h2>{item.productName}</h2>
                  <div className="home_product-item-text">
                    <span>₫</span>
                    <span>{item.price.toLocaleString()}</span>
                  </div>
                  <div className="home_product-item-box">
                    Tìm sản phẩm tương tự
                  </div>
                  <div className="home_product-item-favorite">
                    <CheckOutlined />
                    <span>Yêu thích</span>
                  </div>
                  <div className="home_product-item-sale">
                    <p className="home_product-item-sale-percent">43%</p>
                    <p className="home_product-item-sale-label">GIẢM</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

            {showPagination ? (
              <Pagination
                showSizeChanger={false}
                onChange={onShowSizeChange}
                defaultCurrent={2}
                total={product.length}
                pageSize={objectSearch.pageSize}
                style={{ margin: "20px 0" }}
              />
            ) : (
              ""
            )}

            {showBtnSeeMore ? (
              <button
                className="home_product-seemore-btn"
                onClick={() => {
                  setCount((pre) => pre + 1);
                  setShowPagination(true);
                  setShowBtnSeeMore(false);
                  setShowHeaderProduct(false);
                  nav(`?page=${2}&pageSize=${10}`);
                }}
              >
                Xem thêm
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
