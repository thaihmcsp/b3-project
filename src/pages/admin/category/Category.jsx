import React, { useState, useEffect } from "react";
import { VscQuestion } from "react-icons/vsc";
import { AiOutlinePlus } from "react-icons/ai";
import { ImDropbox } from "react-icons/im";
import { IoIosMenu } from "react-icons/io";
import { CgArrowsV } from "react-icons/cg";
import { AiOutlineCloseSquare } from "react-icons/ai";

import data from "../../../static/Truong/productDetail.json";
import "./Category.css";

function Category() {
  let [num, setNum] = useState(0);
  const [active, setActive] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [items, setItems] = useState([]); //[]
  const [index, setIndex] = useState(undefined);

  useEffect(() => {
    if (!window.localStorage.getItem("data")) {
      setItems(data);
    } else {
      setItems(JSON.parse(window.localStorage.getItem("data")));
    }
  }, [num]);

  const headerClick = (index) => {
    setActive(index);
  };

  const getIndex = (index) => {
    let addBtn = document.querySelector(".add-button");
    let updateBtn = document.querySelector(".update-button");
    let cancelBtn = document.querySelector(".cancel-button");
    let LinkImg = document.querySelector(".admin-category-imageLink");
    addBtn.style.display = "none";
    updateBtn.style.display = "block";
    cancelBtn.style.display = "block";
    LinkImg.style.display = "none";
    setIndex(index);
    showModal();
  };

  const showModal = () => {
    setOpenModal(true);
  };

  const hideModal = () => {
    setOpenModal(false);
  };

  const cancel = () => {
    hideModal();
  };

  const add = () => {
    let addBtn = document.querySelector(".add-button");
    let updateBtn = document.querySelector(".update-button");
    let cancelBtn = document.querySelector(".cancel-button");
    let LinkImg = document.querySelector(".admin-category-imageLink");
    addBtn.style.display = "block";
    updateBtn.style.display = "none";
    cancelBtn.style.display = "block";
    LinkImg.style.display = "block";
    showModal();
  };

  const addProduct = () => {
    let color = document.querySelector("#color").value;
    let ram = document.querySelector("#ram").value;
    let rom = document.querySelector("#rom").value;
    let storage = document.querySelector("#storage").value;
    let link = document.querySelector("#image").value;

    if (
      !color.trim() ||
      !ram.trim() ||
      !rom.trim() ||
      !storage.trim() ||
      !link.trim()
    ) {
      alert("Hãy nhập đủ thông tin");
    } else {
      let clone = [
        ...items,
        {
          color,
          ram,
          rom,
          storage,
          listImg: [link],
          productId:
            "p" + (Number(items[items.length - 1].productId.slice(1)) + 1),
          _id: "pd" + (Number(items[items.length - 1]._id.slice(2)) + 1),
        },
      ];
      window.localStorage.setItem("data", JSON.stringify(clone));
      setNum((num += 1));
      hideModal();
    }
  };

  const update = (index) => {
    let color = document.querySelector("#color").value;
    let ram = document.querySelector("#ram").value;
    let rom = document.querySelector("#rom").value;
    let storage = document.querySelector("#storage").value;
    if (!color.trim() || !ram.trim() || !rom.trim() || !storage.trim()) {
      alert("Hãy nhập đủ thông tin");
    } else {
      let clone = [...items];
      clone[index] = {
        listImg: [items[index].listImg[0]],
        color,
        ram,
        rom,
        storage,
        productId: clone[index].productId,
        _id: clone[index]._id,
      };
      window.localStorage.setItem("data", JSON.stringify(clone));
      setNum((num += 1));

      hideModal();
    }
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
            <button onClick={add}>
              <AiOutlinePlus />
              Thêm 1 sản phẩm mới
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
        <div className="admin-category-body-product-info">
          <div className="admin-category-body-product-info-first">
            <div className="admin-category-body-product-info-checkbox">
              <input type="checkbox" />
            </div>

            <div>
              <p className="admin-category-body-product-info-p">Tên sản phẩm</p>
            </div>
          </div>

          <div className="admin-category-body-product-info-second">
            <p className="admin-category-body-product-info-p">SKU phân loại</p>
          </div>

          <div className="admin-category-body-product-info-third">
            <p className="admin-category-body-product-info-p">Phân loại hàng</p>
          </div>

          <div className="admin-category-body-product-info-fourth">
            <div>
              <p className="admin-category-body-product-info-p">Giá</p>
            </div>

            <div className="admin-category-body-product-info-div">
              <CgArrowsV className="admin-category-body-product-info-div-arrowIcon-other" />
            </div>
          </div>

          <div className="admin-category-body-product-info-fifth">
            <div>
              <p className="admin-category-body-product-info-p">Kho hàng</p>
            </div>

            <div className="admin-category-body-product-info-div">
              <VscQuestion className="admin-category-body-product-info-div-questionIcon" />
            </div>

            <div className="admin-category-body-product-info-div">
              <CgArrowsV className="admin-category-body-product-info-div-arrowIcon" />
            </div>
          </div>

          <div className="admin-category-body-product-info-sixth">
            <div>
              <p className="admin-category-body-product-info-p">Doanh số</p>
            </div>

            <div className="admin-category-body-product-info-div">
              <CgArrowsV className="admin-category-body-product-info-div-arrowIcon-other" />
            </div>
          </div>

          <div className="admin-category-body-product-info-seventh">
            <p className="admin-category-body-product-info-p">Hoạt động</p>
          </div>
        </div>
        {/* BODY FIRST DONE */}

        {/* BODY SECOND */}
        <div className="admin-category-body-listItems">
          {items.map((item, index) => {
            console.log(270, item.productId);
            return (
              <div
                style={{
                  display: "flex",
                  marginBottom: "1rem",
                  borderBottom: "1px solid grey",
                }}
                key={item._id}
              >
                <div
                  style={{
                    width: "35%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img style={{ width: "50%" }} src={item.listImg[0]} alt="" />
                </div>

                <div
                  style={{
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {/* <h1>ID sản phẩm: {item.productId} </h1> */}
                  <p>Màu: {item.color}</p>
                  <p>RAM: {item.ram}</p>
                  <p>ROM: {item.rom}</p>
                </div>

                <div
                  style={{
                    width: "20%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p>Tồn kho: {item.storage}</p>
                </div>

                <div style={{ width: "15%", position: "relative" }}>
                  <button
                    onClick={() => {
                      getIndex(index);
                    }}
                    className="admin-category-body-listItems-updateBtn"
                  >
                    Sửa
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {/* BODY SECOND DONE */}
      </div>
      {/* BODY DONE */}

      {/* MODAL */}
      <div
        className={`admin-category-modalContainer ${
          openModal ? "openModal" : ""
        }`}
      >
        <div className="admin-category-modal">
          <div className="admin-category-modal-header">
            <h1 style={{ fontSize: "2rem" }}>Thông tin sản phẩm</h1>
            <AiOutlineCloseSquare
              onClick={cancel}
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "0",
                top: "0",
                fontSize: "1.3rem",
              }}
            />
          </div>

          <div className="admin-category-modal-body">
            <div style={{ marginRight: "1rem" }}>
              <div>
                Màu: <input id="color" type="text" placeholder="Màu..." />
              </div>
              <div>
                RAM: <input id="ram" type="text" placeholder="RAM..." />
              </div>
              <div className="admin-category-imageLink">
                Link ảnh:{" "}
                <input id="image" type="text" placeholder="Link ảnh..." />
              </div>
            </div>

            <div>
              <div>
                ROM: <input id="rom" type="text" placeholder="ROM..." />
              </div>
              <div>
                Tồn Kho:{" "}
                <input id="storage" type="text" placeholder="Tồn kho..." />
              </div>
            </div>
          </div>

          <div className="admin-category-modal-footer">
            <button
              className="cancel-button"
              style={{
                padding: "4px 10px",
                border: "none",
                marginRight: "0.5rem",
                cursor: "pointer",
              }}
              onClick={cancel}
            >
              Hủy
            </button>
            <button
              className="update-button"
              style={{
                padding: "4px 10px",
                border: "none",
                cursor: "pointer",
                marginRight: "0.5rem",
              }}
              onClick={() => {
                update(index);
              }}
            >
              Sửa
            </button>
            <button
              className="add-button"
              style={{ padding: "4px 10px", border: "none", cursor: "pointer" }}
              onClick={addProduct}
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
      {/* MODAL DONE */}
    </div>
  );
}

export default Category;
