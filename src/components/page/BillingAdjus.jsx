import React from 'react'
import { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
  Modal,
  Fade,
  useMediaQuery,
  FormHelperText
} from '@mui/material';

function BillingAdjus() {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <>
      <div>BillingAdjus</div>
      <div style={{ backgroundColor: '#ffffff', marginTop: '20px', width: '100%', height: '100%', display: 'block', borderRadius : '15px'}}>
        <div style={{ backgroundColor: 'rgba(91, 48, 142, 1)' , padding : '15px' , borderRadius : '15px 15px 0px 0px' ,color : '#ffffff'}}>Manual Billing</div>
        <div style={{  padding : '15px' }}>
          <Grid container spacing={2}>
            {/* Dropdown Field */}
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <FormHelperText>เลือกค่า Ft</FormHelperText>
                <Select
                  value={selectedDate}
                  onChange={handleDateChange}
                  displayEmpty
                  variant="outlined"
                >
                  <MenuItem value="" disabled>
                  เลือกค่า Ft
                  </MenuItem>
                  <MenuItem value="2024-01-01">1 มกราคม 2024</MenuItem>
                  <MenuItem value="2024-02-01">1 กุมภาพันธ์ 2024</MenuItem>
                  <MenuItem value="2024-03-01">1 มีนาคม 2024</MenuItem>
                  {/* เพิ่มตัวเลือกอื่นๆ ตามที่ต้องการ */}
                </Select>
              </FormControl>
            </Grid>

            {/* Date Field */}
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <FormHelperText>เลือกเดือน</FormHelperText>
                <TextField
                  id="name-input"
                  placeholder="Write your name here"
                  variant="outlined"
                  type="month"
                  fullWidth
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>

        <div style={{ paddingLeft : '15px', paddingBottom : ' 15px' }}>
          <Button style={{ marginTop: '20px', backgroundColor : '#673ab7'}} variant="contained">
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default BillingAdjus;
