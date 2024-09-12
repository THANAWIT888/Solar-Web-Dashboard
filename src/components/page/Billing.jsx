import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { useRef, useMemo, useState } from 'react';

function Billing() {
  const [rowData, setRowData] = useState([]);

  const gridRef = useRef(null);

  const gridStyle = useMemo(() => ({ height: "600px", width: "100%" }), []);

  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50, 100];
  const columnDefs = [
    { headerName: 'ID', field: 'plant_name', filter: 'agTextColumnFilter', width: 150 }, // กำหนดความกว้าง
    { headerName: 'Month', field: 'plant_description', width: 150 },
    { headerName: 'kWhp', field: 'plant_address', width: 150 },
    { headerName: 'kWhop', field: 'plant_country', width: 150 },
    { headerName: 'kWhh', field: 'plant_created_at', width: 150 },
    { headerName: 'Energy Power', field: 'plant_status', width: 200 },
    { headerName: 'รวมเงิน', field: 'plant_status', width: 150 },
    { headerName: 'type', field: 'plant_status', width: 150 },
    { headerName: 'Status', field: 'plant_status', width: 150 },
    {
      headerName: 'Management',
      field: 'Management',
      width: 200,
      cellRenderer: (params) => <CustomButtonComponent role={user.role} plant={params.data} /> // ส่งข้อมูลแถว
    }
  ];

  return (
    <>
      <div>Billing</div>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          defaultColDef={{
            sortable: true,
            resizable: true,
            filter: true,
            // เอา flex ออกเพื่อไม่ให้ขนาดคอลัมน์ยืดตามหน้าจอ
          }}
        />
      </div>
    </>
  )
}

export default Billing;
