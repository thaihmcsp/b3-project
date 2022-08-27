import { Divider, Radio, Table } from 'antd';
import React, { useState } from 'react';
import product from '../../../../static/Truong/product.json'
import './AddProductDetail.css'

let newData =[]
product.map(
    (value,index)=>{
        newData.push(
            {
                productName: value.productName,
                thumpnail:<img  src= {value.thumpnail} alt=''/>,
                brand:value.brand,
            }
        )
    }
)

console.log(newData);
function AddProductDetail() {
    const columns = [
      {
          title: 'Ảnh mô tả sản phẩm',
          dataIndex: 'thumpnail',              
      },
      {
          title: 'Tên sản phẩm',
          dataIndex: 'productName',
      },
      {
          title: 'Brand',
          dataIndex: 'brand',
      },
      {
          title: 'Phân loại',
          dataIndex: 'type',
      },
      {
          title: 'Số lượng biến thể',
          dataIndex: ``,
      },
      ];

      const rowSelection = {
          onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          getCheckboxProps: (record) => ({
              disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
              name: record.name,
          }),
      };
      const [selectionType, setSelectionType] = useState('checkbox');
  return (
      
      <div>
          <Radio.Group
              onChange={({ target: { value } }) => {
              setSelectionType(value);
              }}
              value={selectionType}
          >
          </Radio.Group>
      <Table
          rowSelection={{
              type: selectionType,
              ...rowSelection,
          }}
          columns={columns}
          dataSource={newData}
      />
      
  </div>
  )
}

export default AddProductDetail