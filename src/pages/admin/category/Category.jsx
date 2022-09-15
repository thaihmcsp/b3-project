import React, { useState, useEffect } from "react";
import { VscQuestion } from "react-icons/vsc";
import { AiOutlinePlus } from "react-icons/ai";
import { ImDropbox } from "react-icons/im";
import { IoIosMenu } from "react-icons/io";
import { Modal } from 'antd';
import "./Category.css";
import { getAPI, postAPI } from "../../../config/api";

function Category() {
  let [num, setNum] = useState(0);
  const [active, setActive] = useState(1);
  const [items, setItems] = useState([]); //[]
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(16, isModalOpen);

  useEffect(() => {
    const getData = async () => {
      try {
        let data = await getAPI("/category/get-all-categories")
        setItems(data.data.categories);
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [num]);

  const headerClick = (index) => {
    setActive(index);
  }; 

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (e) => {
    // postAPI("/category/create-category", {categoryName: })
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="admin-category-container">
      {/* HEADER */}
      <div className="admin-category-header">
        {/* HEADER LEFT */}
        <div className="admin-category-header-left">
          <div className="admin-category-header-left-product">
            <p>0 Product</p>
          </div>

          <div className="admin-category-header-left-progress">
            <div className="admin-category-header-left-line-green"></div>
            <div className="admin-category-header-left-line-white"></div>
          </div>

          <div className="admin-category-header-left-load">
            <p>
              Có thể đăng tải thêm 1000 sản phẩm
              <VscQuestion className="question-icon" />
            </p>
          </div>
        </div>
        {/* HEADER LEFT  DONE*/}

        {/* HEADER RIGHT */}
        <div className="admin-category-header-right">
          <div className="admin-category-header-right-productOptimization">
            Tối ưu sản phẩm
          </div>

          <div className="admin-category-header-right-addProduct">
            <button onClick={showModal}>
              <AiOutlinePlus />
              Thêm 1 biến thể mới
            </button>
          </div>

          <div>
            <select name="" id="">
              <option value="Công cụ xử lý hàng loạt">
                Công cụ xử lý hàng loạt
              </option>
            </select>
          </div>

          <div className="admin-category-header-right-icon">
            <div
              onClick={() => {
                headerClick(1);
              }}
              className={
                active === 1
                  ? `admin-category-header-right-icon-left active`
                  : `admin-category-header-right-icon-left`
              }
            >
              <IoIosMenu />
            </div>

            <div
              onClick={() => {
                headerClick(2);
              }}
              className={
                active === 2
                  ? `admin-category-header-right-icon-right active`
                  : `admin-category-header-right-icon-right`
              }
            >
              <ImDropbox />
            </div>
          </div>
        </div>
      </div>
      {/* HEADER DONE*/}

      {/* BODY */}
      <div className="admin-category-body">
        {/* BODY FIRST */}
        <div className="admin-category-body-heading">
          <div>Ảnh phân loại</div>
          <div>Tên phân loại</div>
          <div>Tồn kho</div>
          <div>Thao tác</div>
        </div>
        {/* BODY FIRST DONE */}

        {/* BODY SECOND */}
        <div className="admin-category-body-listItems">
          {items.map((item, index) => {
            return (
              <div className="admin-category-body-item" key={item._id}>
                <div className="admin-category-item-img">
                  <img src={"https://shope-b3.thaihm.site/" + item.thumbnail} alt="" />
                </div>

                <div className="admin-category-item-name">
                  <p>{item.categoryName}</p>
                </div>

                <div className="admin-category-item-store">
                  {/* <p>Tồn kho: {item.storage}</p> */}
                </div>

                <div className="admin-category-item-handle">
                  <button className="admin-category-item-handle-update">Sửa</button>
                  <button className="admin-category-item-handle-delete">Xóa</button>
                </div>
              </div>
            );
          })}
        </div>
        {/* BODY SECOND DONE */}
      </div>
      {/* BODY DONE */}

      {/* MODAL */}
      <Modal title="Thêm phân loại" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <input type="text" id="admin_category-modal-name" placeholder="Tên biến thể" />
        <input type="text" id="admin_category-modal-img" placeholder="Ảnh biến thể" />
      </Modal>
      {/* MODAL DONE */}
    </div>
  );
}
export default Category;
