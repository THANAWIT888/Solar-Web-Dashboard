
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import {
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  OutlinedInput,
  TextField,
  Grid,

} from '@mui/material';
import { useTheme } from '@mui/material/styles';

function ViewGian() {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [rowData, setRowData] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  function getStyles(name) {
    return {
      fontWeight: personName.includes(name)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
      borderRadius: '8px', // ปรับรอบวงกลม
      margin: '4px 0', // เพิ่มช่องว่างระหว่างเมนู
      backgroundColor: personName.includes(name) ? '#d1c4e9' : 'white', // เปลี่ยนสีพื้นหลังเมื่อเลือก
    };
  }


  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50, 100];
  const columnDefs = [
    { headerName: 'Parameter', field: 'plant_name', filter: 'agTextColumnFilter' },
    { headerName: 'Gain', field: 'plant_description' },
    { headerName: 'Unit', field: 'plant_address' },
    { headerName: 'Create_at', field: 'plant_country' },
    { headerName: 'Update_at', field: 'plant_country' },
    {
        headerName: 'Management',
        field: 'Management',
        cellRenderer: (params) => <CustomButtonComponent role={user.role} plant={params.data} /> // ส่งข้อมูลแถว
    }
  ];

  return (
    <>
      <div>View Gain</div>

      <div style={{ height: 500, width: '100%' }} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          defaultColDef={{
            sortable: true,
            resizable: true,
            filter: true,
            flex: 1,
          }}
        />
      </div>
    </>
  );
}

export default ViewGian