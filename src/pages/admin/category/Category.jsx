import React, { useState, useEffect } from "react";
import { VscQuestion } from "react-icons/vsc";
import { AiOutlinePlus } from "react-icons/ai";
import { ImDropbox } from "react-icons/im";
import { IoIosMenu } from "react-icons/io";
import { Modal } from "antd";
import "./Category.css";
import { getAPI, patchAPI, postAPI } from "../../../config/api";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLt2M;
};

function Category() {
  let [num, setNum] = useState(0);
  const [active, setActive] = useState(1);
  const [items, setItems] = useState([]); //[]
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
  const [nameCategory, setNameCategory] = useState("");
  const [nameUpdateCategory, setNameUpdateCategory] = useState("")
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [dataUpload, setDataUpload] = useState(new FormData())
  const [dataUpdateUpload, setDataUpdateUpload] = useState(new FormData())
  const [idUpdate, setIdUpdate] = useState("")

  useEffect(() => {
    const getData = async () => {
      try {
        let data = await getAPI("/category/get-all-categories");
        setItems(data.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [num]);

  const headerClick = (index) => {
    setActive(index);
  };

  const showModal = () => {
    setNameCategory("")
    setDataUpload(new FormData())
    setIsModalOpen(true);
  };

  const handleOk = async (e) => {
    if (nameCategory) {
      dataUpload.append("categoryName", nameCategory)
      await postAPI("/category/create-category", dataUpload)
      setNum((pre) => pre + 1);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (info) => {
    const formData = new FormData()
    formData.append("thumb", info.file.originFileObj)
    setDataUpload(formData)
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };

  const showModalUpdate = (id) => {
    setNameUpdateCategory("")
    setDataUpdateUpload(new FormData())
    setIdUpdate(id)
    setIsModalUpdateOpen(true)
  }

  const handleUpdateOk = async () => {
    if (nameUpdateCategory) {
      dataUpdateUpload.append("categoryName", nameUpdateCategory)
      await patchAPI("/category/update-category/" + idUpdate, dataUpdateUpload)
      setNum((pre) => pre + 1);
      setIsModalUpdateOpen(false);
    }
  }

  const handleCancelUpdate = () => {
    setIsModalUpdateOpen(false);
  }

  const handleChangeUpdate = (info) => {
    const formData = new FormData()
    formData.append("thumb", info.file.originFileObj)
    setDataUpdateUpload(formData)
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

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
                  <img
                    src={"https://shope-b3.thaihm.site/" + item.thumbnail}
                    alt=""
                  />
                </div>

                <div className="admin-category-item-name">
                  <p>{item.categoryName}</p>
                </div>

                <div className="admin-category-item-store">
                  {/* <p>Tồn kho: {item.storage}</p> */}
                </div>

                <div className="admin-category-item-handle">
                  <button className="admin-category-item-handle-update" onClick={() => showModalUpdate(item._id)}>
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

      {/* MODAL ADD */}
      <Modal
        title="Thêm phân loại"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input
          type="text"
          id="admin_category-modal-name"
          value={nameCategory}
          placeholder="Tên phân loại"
          onChange={(e) => setNameCategory(e.target.value)}
        />
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </Modal>
      {/* MODAL ADD DONE */}
      {/* MODAL UPDATE */}
      <Modal
        title="Sửa phân loại"
        visible={isModalUpdateOpen}
        onOk={handleUpdateOk}
        onCancel={handleCancelUpdate}
      >
        <input
          type="text"
          id="admin_category-modal-name"
          value={nameUpdateCategory}
          placeholder="Tên phân loại"
          onChange={(e) => setNameUpdateCategory(e.target.value)}
        />
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChangeUpdate}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </Modal>
      {/* MODAL UPDATE DONE */}
    </div>
  );
}
export default Category;
