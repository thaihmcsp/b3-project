import {Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import React, { useState } from 'react';
import './AdminListProduct.css'
import { useNavigate} from "react-router-dom";
import { getAPI } from '../../../../config/api';
import { useEffect} from 'react';
const originData = [];

function AdminListProduct() {
  const [uData, setUdata] = useState([])
  async  function getAPIproduct() {
    try {
        let products = await getAPI(`product/get-all-products`);
        let newList = []
        products.data.products.map(
          (value)=>{
            newList.push(
                  {
                      productName: value.productName,
                      // thumpnail:<img  src= {value.thumpnail} alt=''/>,
                      brand: value.brand,
                      // quantityProperty:quantity,
                      // type:value.categoryId=='ct1'?'Máy tính':'Điện thoại',
                      id: value._id
                  }
              )
          }
        )
        setUdata(newList)
    }
    catch (error) {
        console.log(error);
    }
}
  for (let i = 0; i < 100; i++) {
    originData.push({
      key: i.toString(),
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }
  const navigate = useNavigate();
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.id === editingKey;
  const edit = (record, e) => {
    e.stopPropagation()
    form.setFieldsValue({
      productName: '',
      brand: '',
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
        title: 'Ảnh mô tả sản phẩm',
        dataIndex: 'thumpnail',     
    },  
    {
        title: 'Tên sản phẩm',
        dataIndex: 'productName',
        width: '40%',
        editable: true,
    },
    {
        title: 'Thương hiệu',
        dataIndex: 'brand',
        editable: true,
    },
    {
        title: 'Phân loại',
        dataIndex: 'type',
    },
    {
        title: 'Số lượng biến thể',
        dataIndex: `quantityProperty`,
    },
    {
      title: 'Xem sảm phẩm',
      dataIndex: `operation`,
      render: (record) => {
        return (
          <Typography.Link 
          disabled={editingKey !== ''} 
          onRow={(record,index) => {
            return {
              onClick: event => {
                navigate(`/admin/product/${uData[index].id}/detail` )
              },
            }
          }}>
          Details
          </Typography.Link>
        )
        } 
    },
    {
      title: 'Sửa thông tin',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={(e) => edit(record, e)}>
            Edit
          </Typography.Link>
        );
      },
    },
    ];
    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });
    
    useEffect(() => {
      getAPIproduct() 
      
    },[])
    console.log(uData);
return (
    <Form form={form} component={false}>
    <Table
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      rowClassName="editable-row"
      pagination={{
        onChange: cancel,
      }}
      columns={mergedColumns}
      
        dataSource={uData}
    />
    </Form>
)
}

export default AdminListProduct