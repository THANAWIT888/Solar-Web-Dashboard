import * as React from 'react';
import { useRef, useCallback, useMemo, useState, useEffect } from 'react';
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
  useMediaQuery
} from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Plant() {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  const checkIsSystemAdmin = (user) => {
    return user.role === 'systemadmin';
  };
  
  const dateNow = new Date().toISOString();
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    plant_name: '',
    plant_description: '',
    plant_address: '',
    plant_country: '',
    plant_city: '',
    plant_state: '',
    plant_postal_code: '',
    plant_status: 'true'
  });
  const [activeStep, setActiveStep] = useState(0);
  const gridRef = useRef(null);
  const [rowData, setRowData] = useState([]);
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log(user.role)

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value || ''
    });
  };

  const handleSelectChange = (e) => {
    setFormValues({
      ...formValues,
      plant_status: e.target.value || 'true'
    });
  };

  const fetchUserData = useCallback(async () => {
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
      console.log(result)
      setRowData(result);
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://100.94.171.111:8000/add_plant", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "insomnia/9.2.0",
        },
        body: JSON.stringify({
          ...formValues,
          plant_created_at: dateNow,
          plant_update_at: dateNow,
          plant_created_by: user.id,
          plant_updated_by: 0,
          nxge_user_table_id: user.id
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Failed to add plant: " + errorData.message);
      } else {
        toast.success("Plant added successfully!");
        fetchUserData();
      }
    } catch (error) {
      toast.error("Error submitting form: " + error.message);
    }
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "600px", width: "100%" }), []);

  const onBtExport = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsExcel();
    }
  }, []);
  

  const CustomButtonComponent = (props) => {
    const { role, plant } = props;
    const navigate = useNavigate();

    const handleViewClick = () => {
      // ส่งข้อมูลไปยังหน้า parameter ผ่าน state
      navigate('/dashboard/parameter', { state: { plant } });
    };

    return (
      <div>
        {role === 'systemadmin' ? (
          <>
            <button onClick={handleViewClick}>View</button>
            <button onClick={() => window.alert('Edit Clicked')}>Edit</button>
            <button onClick={() => window.alert('Delete Clicked')}>Delete</button>
          </>
        ) : (
          <button onClick={() => window.alert('View Only Clicked')}>View Only</button>
        )}
      </div>
    );
  };
  

  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50, 100];
  const columnDefs = [
    { headerName: 'Plant Name', field: 'plant_name', filter: 'agTextColumnFilter' },
    { headerName: 'Plant Description', field: 'plant_description' },
    { headerName: 'Plant Address', field: 'plant_address' },
    { headerName: 'Plant Country', field: 'plant_country' },
    { headerName: 'Plant Create At', field: 'plant_created_at' },
    { headerName: 'Plant Status', field: 'plant_status' },
    {
      headerName: 'Management',
      field: 'Management',
      cellRenderer: (params) => <CustomButtonComponent role={user.role} plant={params.data} /> // ส่งข้อมูลแถว
    }
  ];
  

  const steps = ['Plant Form'];
  const isSmallScreen = useMediaQuery('(max-width:450px)');

  const style = {
    position: 'absolute',
    top: isSmallScreen ? '40%' : '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isSmallScreen ? '100%' : '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };

  const renderFormContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Plant Name"
                name="plant_name"
                value={formValues.plant_name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="plant-status-select-label">Plant Status</InputLabel>
                <Select
                  labelId="plant-status-select-label"
                  id="plant-status-select"
                  value={formValues.plant_status}
                  onChange={handleSelectChange}
                  autoWidth
                  label="Plant Status"
                >
                  <MenuItem value="true">Enable</MenuItem>
                  <MenuItem value="false">Disable</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Plant Description"
                name="plant_description"
                value={formValues.plant_description}
                onChange={handleChange}
                fullWidth
                minRows={4}
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Plant Address"
                name="plant_address"
                value={formValues.plant_address}
                onChange={handleChange}
                fullWidth
                minRows={4}
                multiline
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Plant Country"
                name="plant_country"
                value={formValues.plant_country}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Plant City"
                name="plant_city"
                value={formValues.plant_city}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Plant State"
                name="plant_state"
                value={formValues.plant_state}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Plant Postal Code"
                name="plant_postal_code"
                value={formValues.plant_postal_code}
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

  return (
    <div>
      <ToastContainer />
      <h1>Plant Page</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Button variant="contained" color="primary" onClick={onBtExport}>Export to Excel</Button>
        {checkIsSystemAdmin(user) && (
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
          pagination={true}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          defaultColDef={{
            sortable: true,
            resizable: true,
            filter: true,
            flex: 1
          }}
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

export default Plant;
