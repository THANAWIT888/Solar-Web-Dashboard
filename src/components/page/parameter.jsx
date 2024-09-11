import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useRef, useState, useCallback, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
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
  NativeSelect
} from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Parameter() {
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }));

  const location = useLocation();
  const { plant, user } = location.state || {};
  const [value, setValue] = useState(null);
  const [age, setAge] = useState(plant ? plant.id : '');
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [rowData, setRowData] = useState([]);
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(plant ? plant.plant_id : '');
  const [currentPlant, setCurrentPlant] = useState(plant || {});
  const [formValues, setFormValues] = useState({
    parameter_ch: '',
    parameter_cop: '',
    parameter_cp: '',
    parameter_ft: '',
    parameter_eff_start: '',
    parameter_eff_end: '',
    nxge_plant_table_plant_id: plant?.plant_id || '',
    nxge_user_table_id: user?.id || ''
  });

  const gridRef = useRef(null);
  const steps = ['Step 1'];
  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  };

  const handleSelectChange = async (event) => {
    const plantId = event.target.value;
    setSelectedPlant(plantId);

    // Fetch the selected plant details
    try {
      const response = await fetch(`http://100.94.171.111:8000/plants/${plantId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch plant details');
      }

      const plantData = await response.json();
      setCurrentPlant(plantData);
    } catch (error) {
      toast.error("Error fetching plant details: " + error.message);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const clearTableData = () => {
    setRowData([]);
  };


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
                label="cp"
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
  name="parameter_eff_start"
  type="datetime-local"
  value={formValues.parameter_eff_start} // ใช้ value เท่านั้น
  onChange={handleChange}
  fullWidth
/>
            </Grid>
            <Grid item xs={12}>
            <TextField
  name="parameter_eff_end"
  type="datetime-local"
  value={formValues.parameter_eff_end} // ใช้ value เท่านั้น
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

  const handleSubmit = async () => {
    console.log(formValues)
        try {
          const response = await fetch("http://100.94.171.111:8000/add_parameter", {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "User-Agent": "insomnia/9.2.0",
            },
            body: JSON.stringify({
              parameter_ft: formValues.parameter_ft,
              parameter_cp: formValues.parameter_cp,
              parameter_cop: formValues.parameter_cop,
              parameter_ch: formValues.parameter_ch,
              parameter_eff_start:  formValues.parameter_eff_start,
              parameter_eff_end:  formValues.parameter_eff_end ,
              nxge_plant_table_plant_id: plant.plant_id,
              nxge_user_table_id: user.id
            })
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            toast.error("Failed to add plant: " + errorData.message);
          } else {
            toast.success("Parameter added successfully!");
            fetchUserData();
            handleClose();
    
          }
        } catch (error) {
          toast.error("Error submitting form: " + error.message);
        }
      };
  const onBtExport = () => {
    gridRef.current.api.exportDataAsCsv();
  };

  const fetchUserData = useCallback(async () => {
    const plant_id = selectedPlant;
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://100.94.171.111:8000/get_parameters/${plant_id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const result = await response.json();
        clearTableData();
        throw new Error(result.detail);
      }

      const result = await response.json();
      setRowData(result);
    } catch (error) {
      // toast.error("Error: " + error.message);
      // toast.error("Failed to add plant: " + error.message);
    }
  }, [selectedPlant]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://100.94.171.111:8000/plants", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setPlants(result);

        if (selectedPlant) {
          await fetchUserData(); // Fetch data related to the selected plant
        }
      } catch (error) {
        toast.error("Error fetching plants: " + error.message);
      }
    };

    fetchPlants();
  }, [fetchUserData, selectedPlant]);

  const columnDefs = [
    { headerName: 'ID', field: 'parameter_id', filter: 'agTextColumnFilter' },
    { headerName: 'CH', field: 'parameter_ch' },
    { headerName: 'COP', field: 'parameter_cop' },
    { headerName: 'FT', field: 'parameter_ft' },
    { headerName: 'CP', field: 'parameter_cp' },
    { headerName: 'Effect Start', field: 'parameter_eff_start' },
    { headerName: 'Effect End', field: 'parameter_eff_end' },
    { headerName: 'Parameter Status', field: 'parameter_update_at' },
  ];

  const gridStyle = { height: 400, width: '100%' };
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50, 100];

  return (
    <div>
     <FormControl sx={{ m: 1 }} variant="standard">
  <InputLabel htmlFor="plant-select">Select Plant</InputLabel>
  <NativeSelect
    id="plant-select" // Ensure this ID matches the htmlFor of InputLabel
    value={selectedPlant}
    onChange={handleSelectChange}
    input={<BootstrapInput />}
  >
    {plants.map((plant) => (
      <option key={plant.plant_id} value={plant.plant_id}>
        {plant.plant_name}
      </option>
    ))}
  </NativeSelect>
</FormControl>


      {currentPlant && (
        <div>
          <p>Name: {currentPlant.plant_name}</p>
          <p>Description: {currentPlant.plant_description}</p>
          <p>Address: {currentPlant.plant_address}</p>
          <p>Country: {currentPlant.plant_country}</p>
          <p>City: {currentPlant.plant_city}</p>
          <p>Postal Code: {currentPlant.plant_postal_code}</p>
          <p>Status: {currentPlant.plant_status ? 'Enabled' : 'Disabled'}</p>
        </div>
      )}

<ToastContainer />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Button variant="contained" color="primary" onClick={onBtExport}>Export to Excel</Button>
        {/* {checkIsSystemAdmin({ role: 'admin' }) && ( */}
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add Parameter
          </Button>
        {/* )} */}
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
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
