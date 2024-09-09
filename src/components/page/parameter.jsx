import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useRef, useState, useCallback, useEffect } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Modal,
  Fade,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function Parameter() {
  const location = useLocation();
  const { plant } = location.state || {}; 
  const status = plant?.plant_status;
//   console.log(plant?.plant_id);
const DateTimePickerExample = () => {
    const [value, setValue] = useState(null);
}

  const [age, setAge] = useState(plant ? plant.id : '');
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [rowData, setRowData] = useState([]);
  const [formValues, setFormValues] = useState({
    parameter_ch: '',
    parameter_cop: '',
    parameter_cp: '',
    parameter_ft: '',
    parameter_eff_start: '',
    parameter_eff_end: '',
    nxge_plant_table_plant_id: plant.plant_id,
    nxge_user_table_id: ''
  });

  const gridRef = useRef(null);

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  };

  const handleSelectChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleSubmit = () => {
    // ฟังก์ชันสำหรับการ submit ข้อมูล
    console.log('Submitted', formValues);
    handleClose();
  };

  const onBtExport = () => {
    gridRef.current.api.exportDataAsCsv();
  };

  const checkIsSystemAdmin = (user) => {
    // ตัวอย่างการตรวจสอบผู้ใช้
    return user?.role === 'admin';
  };

  const steps = ['Step 1'];

  const renderFormContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="ch"
                name="parameter_ch"
                value={formValues.parameter_ch}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="cop"
                name="parameter_cop"
                value={formValues.parameter_cop}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Plant cp"
                name="parameter_cp"
                value={formValues.parameter_cp}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="ft"
                name="parameter_ft"
                value={formValues.parameter_ft}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // label="parameter_eff_start"
                name="parameter_eff_start"
                type="datetime-local"
                defaultValue="2024-09-09T10:30"

                value={formValues.parameter_eff_start}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // label="Plant Postal Code"
                name="parameter_eff_end"
                type="datetime-local"
 defaultValue="2024-09-09T10:30"
                value={formValues.parameter_eff_end}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        );
      default:
        return 'Unknown stepIndex';
    }
  };

  const fetchUserData = useCallback(async () => {
    const plant_id = plant?.plant_id;
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://100.94.171.111:8000/get_parameters/${plant_id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
      setRowData(result);
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  }, [plant]);

  useEffect(() => {
    if (plant?.plant_id) {
      fetchUserData();
    }
  }, [fetchUserData, plant]);

  const columnDefs = [
    { headerName: 'id', field: 'parameter_id', filter: 'agTextColumnFilter' },
    { headerName: 'ch', field: 'parameter_ch' },
    { headerName: 'cop', field: 'parameter_cop' },
    { headerName: 'ft', field: 'parameter_ft' },
    { headerName: 'cp', field: 'parameter_cp' },
    { headerName: 'effect start', field: 'parameter_eff_start' },
    { headerName: 'effect end', field: 'parameter_eff_end' },
    { headerName: 'Parameter Status', field: 'parameter_update_at' },
  ];

  const gridStyle = { height: 400, width: '100%' };
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50, 100];

  return (
    <div>
      <h1>Plant Parameter</h1>
      {plant && (
        <div>
          <p>Name: {plant.plant_name}</p>
          <p>Description: {plant.plant_description}</p>
          <p>Address: {plant.plant_address}</p>
          <p>Country: {plant.plant_country}</p>
          <p>City: {plant.plant_city}</p>
          <p>Postal Code: {plant.plant_postal_code}</p>
          <p>Status: {status ? 'Enabled' : 'Disabled'}</p>
        </div>
      )}
      
      <ToastContainer />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Button variant="contained" color="primary" onClick={onBtExport}>Export to Excel</Button>
        {checkIsSystemAdmin({ role: 'admin' }) && (
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add Plant
          </Button>
        )}
      </div>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {renderFormContent()}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                color="secondary"
              >
                Back
              </Button>
              <Button
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                variant="contained"
                color="primary"
                style={{ marginLeft: '10px' }}
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
