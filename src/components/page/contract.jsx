import { red } from '@mui/material/colors'
import React from 'react'
import Divider from '@mui/material/Divider';

import {
    Grid, TextField, FormControl, InputLabel, FormHelperText  ,Button
  } from '@mui/material';
import { Style } from '@mui/icons-material';

function Contract() {

  return (
    < >
    {/* <div style={{margin : '20px'}}>asda</div> */}
    <div style={{ backgroundColor: '#ffffff', width: '100%', padding: '10px', height: '90vh', borderRadius: '5px', overflow: 'auto', }}>
        <h1 style={{padding : '10px'}}> Contract</h1>
        <Divider />

        <div>
        <h3>รายละเอียดสัญญา</h3>
        <Grid container spacing={2}>
  <Grid item xs={6}>
  <FormControl fullWidth required>
          {/* <InputLabel htmlFor="name-input">Name</InputLabel> */}
          <FormHelperText>วันที่เริ่มสัญญา</FormHelperText>
          <TextField
            id="name-input"
            placeholder="Write your name here"
            variant="outlined"
            type="date"
            fullWidth

          />
        </FormControl>
  </Grid>

  <Grid item xs={6}>
  <FormControl fullWidth required>
          {/* <InputLabel htmlFor="name-input">Name</InputLabel> */}
          <FormHelperText>วันที่สิ้นสุดสัญญา</FormHelperText>
          <TextField
            id="name-input"
            placeholder="Write your name here"
            variant="outlined"
            type="date"
            fullWidth
          />
        </FormControl>
        
  </Grid>

</Grid>


<Grid container spacing={2} style={{marginTop : '2px'}}>
  <Grid item xs={6}>
  <FormControl fullWidth required>
          {/* <InputLabel htmlFor="name-input">Name</InputLabel> */}
          <FormHelperText>สัญญาเลขที่</FormHelperText>
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
          <FormHelperText>ชื่อบริษัท ภาษาไทย</FormHelperText>
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
          <FormHelperText>ชื่อบริษัท ภษาอังกฤษ</FormHelperText>
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

<Grid item xs={12} style={{marginTop : '15px'}}>
  <FormControl fullWidth required  >
          {/* <InputLabel htmlFor="name-input">Name</InputLabel> */}
          <FormHelperText>ที่อยู่บริษัท</FormHelperText>
          <TextField
  id="name-input"
  placeholder="Write your name here"
  variant="outlined"
  type="text"
  fullWidth
  multiline
  rows={5} // ปรับจำนวนแถวที่คุณต้องการ
/>
        </FormControl>
  </Grid>
  </div>

  

  <div>
  <h3>รายละเอียด Meter</h3>

  <Grid container spacing={2} style={{marginTop : '2px'}}>
  <Grid item xs={6}>
  <FormControl fullWidth required>
          {/* <InputLabel htmlFor="name-input">Name</InputLabel> */}
          <FormHelperText>kWh Meter S/N</FormHelperText>
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
          <FormHelperText>Type</FormHelperText>
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
          <FormHelperText>Voltage</FormHelperText>
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

  <div>
    <h3>
    รายละเอียดการทำ Billing
    </h3>
    <Grid container spacing={2} style={{marginTop : '2px'}}>
  <Grid item xs={6}>
  <FormControl fullWidth required>
          {/* <InputLabel htmlFor="name-input">Name</InputLabel> */}
          <FormHelperText>ทำ Billing ทุกๆวันที่</FormHelperText>
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

  <div style={{ display: 'flex', justifyContent: 'start' }}>
  <Button style={{ marginTop: '20px' }} variant="contained">
    Edit
  </Button>
</div>


    </div>
    </>
  )
}

export default Contract