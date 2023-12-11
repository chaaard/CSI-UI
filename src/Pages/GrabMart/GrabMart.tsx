import { Box, Grid, Typography, TextField, Button, ButtonGroup, Divider, Fade, Snackbar, Alert, styled, Pagination } from '@mui/material';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import ModalComponent from '../../Components/Common/ModalComponent';
import HeaderButtons from '../../Components/Common/HeaderButtons';
import MatchTable from '../../Components/Common/MatchTable';
import ExceptionsTable from '../../Components/Common/ExceptionsTable';
import AnalyticsTable from '../../Components/Common/AnalyticsTable';
import PortalTable from '../../Components/Common/PortalTable';
import IAnalytics from '../Common/Interface/IAnalytics';
import axios, { AxiosRequestConfig } from 'axios';
import IAnalyticProps from '../Common/Interface/IAnalyticsProps';
import IPortal from '../Common/Interface/IPortal';
import IMatch from '../Common/Interface/IMatch';
import IException from '../Common/Interface/IException';
import IExceptionProps from '../Common/Interface/IExceptionProps';
import dayjs, { Dayjs } from 'dayjs';

// Define custom styles for white alerts
const WhiteAlert = styled(Alert)(({ severity }) => ({
  color: '#1C2C5A',
  fontFamily: 'Inter',
  fontWeight: '700',
  fontSize: '15px',
  borderRadius: '25px',
  border:  severity === 'success' ? '1px solid #4E813D' : '1px solid #9B6B6B',
  backgroundColor: severity === 'success' ? '#E7FFDF' : '#FFC0C0',
}));

const GrabMart = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [open, setOpen] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState('Match');
  const [loading, setLoading] = useState<boolean>(true);
  const [analytics, setAnalytics] = useState<IAnalytics[]>([]);
  const [portal, setPortal] = useState<IPortal[]>([]);
  const [match, setMatch] = useState<IMatch[]>([]);
  const [exception, setException] = useState<IException[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('success'); // Snackbar severity
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false); // Snackbar open state
  const [message, setMessage] = useState<string>(''); // Error message
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search query
  const [page, setPage] = useState<number>(1); // Current page number
  const [itemsPerPage, setItemsPerPage] = useState<number>(6); // Items displayed per page
  const [pageCount, setPageCount] = useState<number>(0); // Total page count
  const [columnToSort, setColumnToSort] = useState<string>(""); // Column to sort
  const [orderBy, setOrderBy] = useState<string>("asc"); // Sorting order
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [currentDate, setCurrentDate] = useState<Dayjs | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isModalClose, setIsModalClose] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'CSI | GrabMart';
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if the selected file has the allowed file type
      if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
        setSelectedFile(file);
      } else {
        setIsSnackbarOpen(true);
        setSnackbarSeverity('error');
        setMessage('Please select a valid .xls or .xlsx file.');
      }
    } 
  };

  // Handle closing the snackbar
  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleButtonClick = (buttonName : string) => {
    setActiveButton(buttonName);
    // Add any additional logic you need on button click
  };

  const handleUploadClick = () => {
    try {
      if (selectedFile === null) {
        // Show an error message or take appropriate action
        setIsSnackbarOpen(true);
        setSnackbarSeverity('error');
        setMessage('Please select a file before uploading.');
        return;
      }

      const formData = new FormData();
      if (selectedFile) {
        formData.append('file', selectedFile);
        formData.append('customerName', 'GrabMart');

        const uploadProofList: AxiosRequestConfig = {
          method: 'POST',
          url: `${REACT_APP_API_ENDPOINT}/ProofList/UploadProofList`,
          data: formData,
        };

        axios(uploadProofList)
        .then((response) => {
          if(response.data.Item2 === 'Proof list already uploaded!')
          {
            setSelectedFile(null);
            setIsSnackbarOpen(true);
            setSnackbarSeverity('error');
            setMessage('GrabMart proof list already uploaded');
          }
          else if (response.data.Item2 === 'Error extracting proof list.')
          {
            setSelectedFile(null);
            setIsSnackbarOpen(true);
            setSnackbarSeverity('error');
            setMessage('Error extracting proof list. Please check the file and try again!');
          }
          else if (response.data.Item2 === 'Uploaded file transaction dates do not match.')
          {
            setSelectedFile(null);
            setIsSnackbarOpen(true);
            setSnackbarSeverity('error');
            setMessage('Uploaded file transaction dates do not match. Please check the file and try again!');
          }
          else
          {
            setSelectedFile(null);
            setIsSnackbarOpen(true);
            setSnackbarSeverity('success');
            setMessage('GrabMart proof list uploaded successfully.');
            setSuccess(true);
            setOpen(false);
          }
        })
        .catch((error) => {
          setIsSnackbarOpen(true);
          setSnackbarSeverity('error');
          setMessage('Error uploading proof list');
          setSelectedFile(null);
          console.error("Error uploading proof list:", error);
        })
      }
    } catch (error) {
        setIsSnackbarOpen(true);
        setSnackbarSeverity('error');
        setMessage('Error uploading proof list');
        setSelectedFile(null);
        console.error("Error uploading proof list:", error);
    } 

    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleCloseModal = useCallback(() => {
    setOpen(false);
    setSelectedFile(null);
  }, []);

  const fetchGrabMart = useCallback(async(anaylticsParam: IAnalyticProps) => {
    try {
      setLoading(true);

      const getAnalytics: AxiosRequestConfig = {
        method: 'POST',
        url: `${REACT_APP_API_ENDPOINT}/Analytics/GetAnalytics`,
        data: anaylticsParam,
      };

      axios(getAnalytics)
      .then(async (response) => {
        setAnalytics(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  }, [REACT_APP_API_ENDPOINT]);

  const fetchGrabMartPortal = useCallback(async(portalParams: IAnalyticProps) => {
    try {
      setLoading(true);

      const getPortal: AxiosRequestConfig = {
        method: 'POST',
        url: `${REACT_APP_API_ENDPOINT}/ProofList/GetPortal`,
        data: portalParams,
      };

      axios(getPortal)
      .then(async (response) => {
        setPortal(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
    } catch (error) {
      console.error("Error fetching portal:", error);
    } finally {
      setLoading(false);
    }
  }, [REACT_APP_API_ENDPOINT]);

  const fetchGrabMartMatch = useCallback(async(anaylticsParam: IAnalyticProps) => {
    try {
      setLoading(true);

      const getAnalyticsMatch: AxiosRequestConfig = {
        method: 'POST',
        url: `${REACT_APP_API_ENDPOINT}/Analytics/GetAnalyticsProofListVariance`,
        data: anaylticsParam,
      };

      axios(getAnalyticsMatch)
      .then(async (response) => {
        setMatch(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  }, [REACT_APP_API_ENDPOINT]);

  const fetchGrabMartException = useCallback(async(exceptionParam: IExceptionProps) => {
    try {
      setLoading(true);

      const getAnalytics: AxiosRequestConfig = {
        method: 'POST',
        url: `${REACT_APP_API_ENDPOINT}/Adjustment/GetAdjustmentsAsync`,
        data: exceptionParam,
      };

      axios(getAnalytics)
      .then(async (response) => {
        setException(response.data.ExceptionList);
        setPageCount(response.data.TotalPages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
    } catch (error) {
      console.error("Error fetching adjustment:", error);
    } finally {
      setLoading(false);
    }
  }, [REACT_APP_API_ENDPOINT]);

  useEffect(() => {
    const defaultDate = dayjs().subtract(1, 'day');
    const currentDate = dayjs();
    const currentDateWithoutTime = currentDate.startOf('day').subtract(1, 'day');
    setSelectedDate(defaultDate);
    setCurrentDate(currentDateWithoutTime);
  }, []);


  useEffect(() => {
    if(currentDate !== null)
    {
      const formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss.SSS');
      const anaylticsParam: IAnalyticProps = {
        dates: [formattedDate],
        memCode: ['9999011955'],
        userId: '',
        storeId: [221],
      };
  
      const exceptionParam: IExceptionProps = {
        PageNumber: page,
        PageSize: itemsPerPage,
        SearchQuery: searchQuery,
        ColumnToSort: columnToSort,
        OrderBy: orderBy, 
        dates: [formattedDate],
        memCode: ['9999011955'],
        userId: '',
        storeId: [221],
      };
  
      fetchGrabMart(anaylticsParam);
      fetchGrabMartPortal(anaylticsParam);
      fetchGrabMartMatch(anaylticsParam);
      fetchGrabMartException(exceptionParam);
    }
  }, [fetchGrabMart, fetchGrabMartPortal, fetchGrabMartMatch, fetchGrabMartException, page, itemsPerPage, searchQuery, columnToSort, orderBy, currentDate]);

  useEffect(() => {
    if(success)
    {
      const formattedDate = currentDate?.format('YYYY-MM-DD HH:mm:ss.SSS');
      const anaylticsParam: IAnalyticProps = {
        dates: [formattedDate?.toString() ? formattedDate?.toString() : ''],
        memCode: ['9999011955'],
        userId: '',
        storeId: [221],
      };

      fetchGrabMartPortal(anaylticsParam);
      fetchGrabMartMatch(anaylticsParam);
    }
  }, [fetchGrabMartPortal, fetchGrabMartMatch, currentDate, success]);

  useEffect(() => {
    if(isModalClose)
    {
      const formattedDate = currentDate?.format('YYYY-MM-DD HH:mm:ss.SSS');
      const anaylticsParam: IAnalyticProps = {
        dates: [formattedDate?.toString() ? formattedDate?.toString() : ''],
        memCode: ['9999011955'],
        userId: '',
        storeId: [221],
      };
  
      const exceptionParam: IExceptionProps = {
        PageNumber: page,
        PageSize: itemsPerPage,
        SearchQuery: searchQuery,
        ColumnToSort: columnToSort,
        OrderBy: orderBy, 
        dates: [formattedDate?.toString() ? formattedDate?.toString() : ''],
        memCode: ['9999011955'],
        userId: '',
        storeId: [221],
      };

      fetchGrabMartMatch(anaylticsParam);
      fetchGrabMartException(exceptionParam);
      setIsModalClose(false);
    }
  })

  return (
    <Box
      sx={{
        marginTop: '16px',
        marginLeft: '16px',
        flexGrow: 1,
      }}
    >
      <Grid container spacing={1} alignItems="flex-start" direction={'row'}>
        <Grid item>
          <HeaderButtons handleOpenModal={handleOpenModal} customerName='GrabMart'/>  
        </Grid>
        <Grid item xs={12}
          sx={{
              paddingTop: '10px',
              paddingRight: '20px',
              transition: 'left 0.3s ease',
          }}>
            <Box sx={{
              boxShadow: 'inset 6px 9px 8px -1px rgba(0,0,0,0.3), inset -6px 0px 8px -1px rgba(0,0,0,0.3)',
              backgroundColor: '#F2F2F2',
              paddingTop: '10px',
              borderRadius: '20px',
            }}>
              <Grid container spacing={1} sx={{paddingTop: '4px'}}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingBottom: '10px',
                      backgroundColor: 'white',
                      marginLeft: '15px',
                      paddingLeft: '-1px',
                      marginRight: '650px',
                      borderTopRightRadius: '20px',
                      borderTopLeftRadius: '20px',
                      paddingTop: '5px',
                      justifyContent: 'center', 
                      alignItems: 'center',
                      boxShadow: '1px 9px 8px -1px rgba(0,0,0,0.3), 1px 0px 8px -1px rgba(0,0,0,0.3)',
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Inter',
                        fontWeight: '900',
                        color: '#1C3766',
                        fontSize: 17,
                      }}
                    >
                      GrabMart
                    </Typography>
                    <Box
                      sx={{
                        border: '2px solid #00B14F',
                        height: '3px',
                        width: '40px',
                        borderRadius: '25px',
                      }}
                    >
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Box 
                sx={{ 
                  position: 'relative', 
                  backgroundColor: 'white', 
                  boxShadow: '-7px 0px 8px -4px rgba(0,0,0,0.1),7px 0px 8px -4px rgba(0,0,0,0.1),0px 7px 8px -4px rgba(0,0,0,0.1)', 
                  textAlign: 'center',
                  borderBottomLeftRadius: '20px',
                  borderBottomRightRadius: '20px',
                }}
                >
                <ButtonGroup sx={{ height: '20px', display: 'flex', justifyContent: 'center', paddingTop: '10px'  }}>
                  <Button 
                    sx={{ 
                      fontWeight: '900 !important', 
                      fontSize: '12px', 
                      width: '250px', 
                      borderRadius: '10px', 
                      textTransform: 'none',  
                      border: '2px solid #1C2D5B' ,
                      color: activeButton === 'Analytics' ? '#fff' : '#1C2D5B',
                      backgroundColor: activeButton === 'Analytics' ? '#1C2D5B' : 'transparent',
                    }}
                    onClick={() => handleButtonClick('Analytics')}
                  >Analytics
                  </Button>
                  <Button 
                    sx={{ 
                      fontWeight: '900 !important', 
                      fontSize: '12px', 
                      width: '250px', 
                      textTransform: 'none',  
                      border: '2px solid #1C2D5B',
                      color: activeButton === 'Match' ? '#fff' : '#1C2D5B',
                      backgroundColor: activeButton === 'Match' ? '#1C2D5B' : 'transparent',
                    }}
                    onClick={() => handleButtonClick('Match')}
                  >Match
                  </Button>
                  <Button 
                    sx={{ 
                      fontWeight: '900 !important', 
                      fontSize: '12px', 
                      width: '250px' , 
                      borderRadius: '10px', 
                      textTransform: 'none',  
                      border: '2px solid #1C2D5B', 
                      color: activeButton === 'Portal' ? '#fff' : '#1C2D5B',
                      backgroundColor: activeButton === 'Portal' ? '#1C2D5B' : 'transparent',
                    }}
                    onClick={() => handleButtonClick('Portal')}
                  >Portal
                  </Button>
                </ButtonGroup>
                <div className="fade">
                  {activeButton === 'Analytics' && (
                    <Fade  in={true} timeout={500}>
                      <Box>
                        <AnalyticsTable 
                          analytics={analytics}
                          loading={loading}
                        />
                      </Box>
                    </Fade>
                  )}
                  {activeButton === 'Match' && (
                    <Fade  in={true}  timeout={500}>
                      <Box>
                        <MatchTable 
                          match={match}
                          loading={loading}
                          setIsModalClose={setIsModalClose}
                        />
                      </Box>
                    </Fade>
                  )}
                  {activeButton === 'Portal' && (
                    <Fade  in={true} timeout={500}>
                      <Box>
                        <PortalTable 
                          portal={portal}
                          loading={loading}
                        />
                      </Box>
                    </Fade>
                  )}
                </div>
              </Box>
            </Box>
            <Divider variant="middle" sx={{ paddingTop: '20px', borderBottomWidth: 2 }} />
            <Box
              sx={{ paddingTop: '20px' }}>
              <ExceptionsTable 
                exception={exception} 
                loading={loading} 
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Pagination
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  count={pageCount}
                  page={page}
                  onChange={(event, value) => {
                    setPage(value);
                    const formattedDate = currentDate?.format('YYYY-MM-DD HH:mm:ss.SSS');
                    const exceptionParam: IExceptionProps = {
                      PageNumber: value,
                      PageSize: itemsPerPage,
                      SearchQuery: searchQuery,
                      ColumnToSort: columnToSort,
                      OrderBy: orderBy, 
                      dates: [formattedDate?.toString() ? formattedDate?.toString() : ''],
                      memCode: ['9999011955'],
                      userId: '',
                      storeId: [221],
                    };
                    fetchGrabMartException(exceptionParam);
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            TransitionComponent={Fade} 
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
          <WhiteAlert  variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {message}
          </WhiteAlert>
        </Snackbar>
        </Grid>
      <ModalComponent
        title='Upload Prooflist'
        onClose={handleCloseModal}
        buttonName='Upload'
        open={open}
        onSave={handleUploadClick}
        children={
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={8}
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: '900',
                  color: '#1C2C5A',
                  fontSize: '20px'
                }}>
                Partner
              </Grid>
              <Grid item xs={11.5} sx={{marginLeft: '10px'}}>
                <Box display={'flex'}>
                  <TextField 
                    size='small' 
                    fullWidth 
                    value={'GrabMart'}
                    disabled
                  >
                  </TextField>
                </Box>
              </Grid>
              <Grid item xs={8}
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: '900',
                  color: '#1C2C5A',
                  fontSize: '20px'
                }}>
                File *
              </Grid>
              <Grid item xs={11.5} sx={{marginLeft: '10px'}}>
                <Box display={'flex'}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    disabled
                    value={selectedFile ? selectedFile.name : 'Selected File'}
                    size='small'
                    helperText='*XLS, XLSX File Only'
                    required
                  />
                  <label htmlFor="file-input">
                  <Button
                    component="span"
                    variant="contained"
                    sx={{
                      backgroundColor: '#B6B6B6',
                      color: '#FFFFFF',
                      height: '39.5px',
                      boxShadow: 'inset 1px 6px 8px -1px rgba(0,0,0,0.3), inset 1px 0px 8px -1px rgba(0,0,0,0.3)',
                      marginLeft: '-10px',
                      borderRadius: 0,
                      borderTopRightRadius: '8px',
                      borderBottomRightRadius: '8px',
                    }}
                  >
                    Browse
                  </Button>
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept=".xls, .xlsx"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                </Box>
              </Grid>
            </Grid>
          </Box>
        } 
      />
    </Box>
  )
}

export default GrabMart
