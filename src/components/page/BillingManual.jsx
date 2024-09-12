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
function BillingManual() {
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
            <Grid container spacing={2} style={{marginTop : '2px'}}>
  <Grid item xs={6}>
  <FormControl fullWidth required>
          {/* <InputLabel htmlFor="name-input">Name</InputLabel> */}
          <FormHelperText>Ft</FormHelperText>
          <TextField
            id="name-input"
            placeholder="Write your name here"
            variant="outlined"
            type="text"
            fullWidth

          />
        </FormControl>
  </Grid>

  <Grid item xs={6}>
  <FormControl fullWidth required>
          {/* <InputLabel htmlFor="name-input">Name</InputLabel> */}
          <FormHelperText>Cp อัตราค่าพลังงานไฟฟ้าสำหรับช่วงเวลา peak</FormHelperText>
          <TextField
            id="name-input"
            placeholder="Write your name here"
            variant="outlined"
            type="text"
            fullWidth
          />
        </FormControl>
        
  </Grid>

</Grid>
<Grid container spacing={2} style={{marginTop : '2px'}}>
  <Grid item xs={6}>
  <FormControl fullWidth required>
          {/* <InputLabel htmlFor="name-input">Name</InputLabel> */}
          <FormHelperText>Cop อัตราค่าพลังงานไฟฟ้สำหรับช่วงเวลา off-peak</FormHelperText>
          <TextField
            id="name-input"
            placeholder="Write your name here"
            variant="outlined"
            type="text"
            fullWidth

          />
        </FormControl>
  </Grid>

  <Grid item xs={6}>
  <FormControl fullWidth required>
          {/* <InputLabel htmlFor="name-input">Name</InputLabel> */}
          <FormHelperText>Ch อัตราค่าพลังงานไฟฟ้สำหรับช่วงเวลา off-peak (holiday)</FormHelperText>
          <TextField
            id="name-input"
            placeholder="Write your name here"
            variant="outlined"
            type="text"
            fullWidth
          />
        </FormControl>
        
  </Grid>

</Grid>
              <Grid container spacing={2} style={{marginTop : '2px'}}>
                {/* Dropdown Field */}
                <Grid item xs={6}>
                  <FormControl fullWidth required>
                    <FormHelperText>DF %</FormHelperText>
                    <TextField
            id="name-input"
            placeholder="Write your name here"
            variant="outlined"
            type="text"
            fullWidth

          />
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

              <Grid container spacing={2} style={{marginTop : '2px'}}>
  <Grid item xs={6}>
  <FormControl fullWidth required>
          {/* <InputLabel htmlFor="name-input">Name</InputLabel> */}
          <FormHelperText>kWhp อ่านครั้งก่อน</FormHelperText>
          <TextField
            id="name-input"
            placeholder="Write your name here"
            variant="outlined"
            type="text"
            fullWidth

          />
        </FormControl>
  </Grid>

  <Grid item xs={6}>
  <FormControl fullWidth required>
          {/* <InputLabel htmlFor="name-input">Name</InputLabel> */}
          <FormHelperText>kWhp อ่านครั้งหลัง</FormHelperText>
          <TextField
            id="name-input"
            placeholder="Write your name here"
            variant="outlined"
            type="text"
            fullWidth
          />
        </FormControl>
        
  </Grid>

</Grid>

<Grid container spacing={2} style={{marginTop : '2px'}}>
  <Grid item xs={6}>
  <FormControl fullWidth required>
          {/* <InputLabel htmlFor="name-input">Name</InputLabel> */}
          <FormHelperText>kWhop อ่านครั้งก่อน</FormHelperText>
          <TextField
            id="name-input"
            placeholder="Write your name here"
            variant="outlined"
            type="text"
            fullWidth

          />
        </FormControl>
  </Grid>

  <Grid item xs={6}>
  <FormControl fullWidth required>
          {/* <InputLabel htmlFor="name-input">Name</InputLabel> */}
          <FormHelperText>kWhop อ่านครั้งหลัง</FormHelperText>
          <TextField
            id="name-input"
            placeholder="Write your name here"
            variant="outlined"
            type="text"
            fullWidth
          />
        </FormControl>
        
  </Grid>

</Grid>

<Grid container spacing={2} style={{marginTop : '2px'}}>
  <Grid item xs={6}>
  <FormControl fullWidth required>
          {/* <InputLabel htmlFor="name-input">Name</InputLabel> */}
          <FormHelperText>kWhh อ่านครั้งก่อน</FormHelperText>
          <TextField
            id="name-input"
            placeholder="Write your name here"
            variant="outlined"
            type="text"
            fullWidth

          />
        </FormControl>
  </Grid>

  <Grid item xs={6}>
  <FormControl fullWidth required>
          {/* <InputLabel htmlFor="name-input">Name</InputLabel> */}
          <FormHelperText>kWhh อ่านครั้งหลัง</FormHelperText>
          <TextField
            id="name-input"
            placeholder="Write your name here"
            variant="outlined"
            type="text"
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

export default BillingManual