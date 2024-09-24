
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

function ViewData() {
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
    { headerName: 'Datetime', field: 'plant_description' },
    { headerName: 'Value', field: 'plant_address' },
    { headerName: 'Gain', field: 'plant_country' },
  ];

  return (
    <>
      <div>View Data</div>
      <div style={{ padding: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth required>
              <FormHelperText>เลือกค่า Ft</FormHelperText>
              <Select
                multiple
                displayEmpty
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput style={{ backgroundColor: 'white' }} />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Placeholder</em>;
                  }
                  return selected.join(', ');
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem disabled value="">
                  <em>Placeholder</em>
                </MenuItem>
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3e5f5'; // เปลี่ยนสีเมื่อชี้
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = personName.includes(name) ? '#d1c4e9' : 'white'; // คืนค่าหลังออกจากชี้
                    }}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth required>
              <FormHelperText>วันที่เริ่มสัญญา</FormHelperText>
              <TextField
                id="start-date-input"
                variant="outlined"
                type="date"
                fullWidth
                style={{ backgroundColor: 'white' }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth required>
              <FormHelperText>วันที่สิ้นสุดสัญญา</FormHelperText>
              <TextField
                id="end-date-input"
                variant="outlined"
                type="date"
                fullWidth
                style={{ backgroundColor: 'white' }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>

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

export default ViewData;
