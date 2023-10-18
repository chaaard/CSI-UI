import { AppBar, Grid, Avatar, Box, IconButton, Toolbar, Typography, styled, Menu, MenuItem, useMediaQuery, useTheme, TextFieldProps, TextField, Checkbox, FormControlLabel } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react';
import React from 'react';
import { format } from 'date-fns';
import { PopoverComponent } from './Popover';
import MenuIcon from '@mui/icons-material/Menu';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import ModalComponent from './Common/ModalComponent';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';


const BootstrapButton = styled(IconButton)(({ theme }) => ({
  textTransform: 'none',
  fontSize: 16, 
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#1C3766',
  borderColor: '#1C3766',
  color: 'white',
  boxShadow: '0px 7px 5px -1px rgba(0,0,0,0.5)',
  '&:hover': {
    backgroundColor: '#15294D',
    borderColor: '#15294D',
    boxShadow: '0px 7px 5px -1px rgba(0,0,0,0.5)',
  },
  borderRadius: theme.shape.borderRadius, // Ensure the button has the default shape
}));


interface HeaderProps {
  sideNavWidth: number;
}

const Header: React.FC<HeaderProps> = ({ sideNavWidth }) => {
  const anchorRef = useRef(null);
  const theme = useTheme();
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'EEEE, MMMM dd, yyyy');
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openActual, setOpenActual] = useState<boolean>(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null | undefined>(null);
  const fullName = window.localStorage.getItem('fullName');
  const isScreenSmall = useMediaQuery(theme.breakpoints.down(1045));
  const isExtraScreenSmall = useMediaQuery(theme.breakpoints.down(550));

  const handleClosePopover = useCallback(() => {
    setOpenPopover(false);
  }, []);

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModalActual = useCallback(() => {
    setOpenActual(false);
  }, []);

  const handleOpenModalActual = () => {
    setOpenActual(true);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  
  const handleChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
  };

  useEffect(() => {
    const defaultDate = dayjs().subtract(1, 'day');
    setSelectedDate(defaultDate);
  }, []);
  return (
    <Box>
      <AppBar  
        sx={{
          backgroundColor: '#F2F2F2',
          zIndex: theme => theme.zIndex.drawer + 1,
          marginLeft: `${sideNavWidth}px `,
          width: `calc(100% - ${sideNavWidth}px)`, 
          boxShadow: 'none',
        }}>
        <Toolbar>
        {isScreenSmall ? 
          (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon 
                sx={{
                  color: '#1C2C5A'
                }} 
              />
            </IconButton>
          ) : (
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <BootstrapButton
                  sx={{
                    color: "white",
                    fontSize: "16px",   
                    backgroundColor: "#1C3766",
                    width: "150px",  
                    borderRadius: "20px", 
                    fontFamily: 'Inter',
                    fontWeight: '900', 
                  }}
                  onClick={handleOpenModal}
                >
                  <Typography>
                    Load Analytics
                  </Typography>
                </BootstrapButton>  
              </Grid>
              <Grid item>
                <BootstrapButton
                  sx={{
                    color: "white",
                    fontSize: "16px",   
                    backgroundColor: "#1C3766",
                    width: "150px",  
                    borderRadius: "20px", 
                    fontFamily: 'Inter',
                    fontWeight: '900', 
                  }}
                  onClick={handleOpenModalActual}
                >
                  <Typography>
                    Input Actual
                  </Typography>
                </BootstrapButton>
              </Grid>
            </Grid>
          )}
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            flexGrow={1} 
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              disableRipple 
            >
              <Grid container alignItems="center">
              {!isExtraScreenSmall && (
                <Box
                  sx={{
                    marginRight: '10px',
                    textAlign: 'right',
                    color: '#1C2C5A',
                  }}
                >
                  <Typography variant="h5" 
                    sx={{ 
                      fontSize: '15px', 
                      fontFamily: 'Inter',
                      fontWeight: '900', 
                    }}>
                    Treasury - BGC
                  </Typography>
                  <Typography variant="h4" 
                  sx={{ 
                    fontSize: '11px', 
                    fontStyle: 'italic',
                    fontFamily: 'Inter',
                    fontWeight: '900', 
                    }}>
                    {formattedDate}
                  </Typography>
                </Box>
                )}
                <Avatar
                  onClick={handleOpenPopover}
                  ref={anchorRef}
                  sx={{
                    backgroundColor: '#1C3766',
                    textTransform: 'uppercase',
                    color: 'white',
                    marginLeft: '10px',
                    boxShadow: '0px 7px 5px -1px rgba(0,0,0,0.5)',
                  }}
                >
                  {fullName
                    ? `${fullName.split(' ')[0][0]}${fullName.split(' ')[1][0]}`
                    : ''}
                </Avatar>
              </Grid>
            </IconButton>
            <PopoverComponent
              anchorEl={anchorRef.current}
              open={openPopover}
              onClose={handleClosePopover}
              isExtraScreenSmall={isExtraScreenSmall}
              role={"Treasury"}
              location={"BGC"}
              date={formattedDate}
            />
          </Box>
        </Toolbar>
        {isScreenSmall && (
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem disableRipple>
              <BootstrapButton
                sx={{
                  color: "white",
                  fontSize: "16px",   
                  backgroundColor: "#1C3766",
                  width: "150px",  
                  borderRadius: "20px", 
                  fontFamily: 'Inter',
                  fontWeight: '900', 
                }}
                disableRipple
                onClick={handleOpenModal}
                >
                <Typography>
                  Load Analytics
                </Typography>
              </BootstrapButton>  
            </MenuItem>
            <MenuItem disableRipple>
              <BootstrapButton
                sx={{
                  color: "white",
                  fontSize: "16px",   
                  backgroundColor: "#1C3766",
                  width: "150px",  
                  borderRadius: "20px", 
                  fontFamily: 'Inter',
                  fontWeight: '900', 
                }}
                disableRipple
                onClick={handleOpenModalActual}
                >
                <Typography>
                  Input Actual
                </Typography>
              </BootstrapButton>  
            </MenuItem>
          </Menu>
        )}
      </AppBar>

      <ModalComponent
        title='Load Analytics'
        onClose={handleCloseModal}
        buttonName='Load Now'
        open={open}
        children={
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0}>
              <Grid item xs={8}
                sx={{
                  marginBottom: '10px',
                  fontFamily: 'Inter',
                  fontWeight: '900',
                  color: '#1C2C5A',
                  fontSize: '20px'
                }}>
                Select Date
              </Grid>
              <Grid item xs={10} sx={{marginLeft: '10px'}}>
                <Box display={'flex'}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker  
                      inputFormat="MMMM DD, YYYY"
                      value={selectedDate}
                      onChange={handleChange}
                      renderInput={(params : TextFieldProps) => 
                        <TextField  
                          size="small"
                          {...params} 
                          sx={{
                            '& .MuiOutlinedInput-input': {
                              color: '#1C2C5A',
                              width: '400px',
                            },
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: '#FFFFFF', 
                              height: '30px',
                            },
                            '& .MuiIconButton-root': {
                              height: '25px',
                            },
                          }}
                        />
                      }
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
              <Grid item xs={3.5} sx={{marginLeft: '10px'}} >
                <FormControlLabel
                  control={<Checkbox icon={<CropSquareIcon />} checkedIcon={<SquareRoundedIcon sx={{color: '#4761AD'}} />} />}
                  label={
                    <Typography
                      sx={{
                        color: '#1C2C5A',
                        fontFamily: 'Inter',
                        fontWeight: '900',
                        fontSize: '18px',
                      }}
                    >
                      Grab Mart
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={3.5}>
                <FormControlLabel
                  control={<Checkbox icon={<CropSquareIcon />} checkedIcon={<SquareRoundedIcon sx={{color: '#4761AD'}} />} />}
                  label={
                    <Typography
                      variant="body1" // You can adjust the variant as needed
                      sx={{
                        color: '#1C2C5A',
                        fontFamily: 'Inter',
                        fontWeight: '900',
                        fontSize: '18px',
                      }}
                    >
                      Grab Food
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox icon={<CropSquareIcon />} checkedIcon={<SquareRoundedIcon sx={{color: '#4761AD'}} />} />}
                  label={
                    <Typography
                      variant="body1" // You can adjust the variant as needed
                      sx={{
                        color: '#1C2C5A',
                        fontFamily: 'Inter',
                        fontWeight: '900',
                        fontSize: '18px',
                      }}
                    >
                      Food Panda
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={3.5} sx={{marginLeft: '10px'}}>
                <FormControlLabel
                  control={<Checkbox icon={<CropSquareIcon />} checkedIcon={<SquareRoundedIcon sx={{color: '#4761AD'}} />} />}
                  label={
                    <Typography
                      variant="body1" // You can adjust the variant as needed
                      sx={{
                        color: '#1C2C5A',
                        fontFamily: 'Inter',
                        fontWeight: '900',
                        fontSize: '18px',
                      }}
                    >
                      Agile FS
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={8}>
                <FormControlLabel
                  control={<Checkbox icon={<CropSquareIcon />} checkedIcon={<SquareRoundedIcon sx={{color: '#4761AD'}} />} />}
                  label={
                    <Typography
                      variant="body1" // You can adjust the variant as needed
                      sx={{
                        color: '#1C2C5A',
                        fontFamily: 'Inter',
                        fontWeight: '900',
                        fontSize: '18px',
                      }}
                    >
                      Agile Merchandise
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={3.5} sx={{marginLeft: '10px'}}>
                <FormControlLabel
                  control={<Checkbox icon={<CropSquareIcon />} checkedIcon={<SquareRoundedIcon sx={{color: '#4761AD'}} />} />}
                  label={
                    <Typography
                      variant="body1" // You can adjust the variant as needed
                      sx={{
                        color: '#1C2C5A',
                        fontFamily: 'Inter',
                        fontWeight: '900',
                        fontSize: '18px',
                      }}
                    >
                      MetroMart
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={3.5}>
                <FormControlLabel
                  control={<Checkbox icon={<CropSquareIcon />} checkedIcon={<SquareRoundedIcon sx={{color: '#4761AD'}} />} />}
                  label={
                    <Typography
                      variant="body1" // You can adjust the variant as needed
                      sx={{
                        color: '#1C2C5A',
                        fontFamily: 'Inter',
                        fontWeight: '900',
                        fontSize: '18px',
                      }}
                    >
                      Lazada
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={3.5}>
                <FormControlLabel
                  control={<Checkbox icon={<CropSquareIcon />} checkedIcon={<SquareRoundedIcon sx={{color: '#4761AD'}} />} />}
                  label={
                    <Typography
                      variant="body1" // You can adjust the variant as needed
                      sx={{
                        color: '#1C2C5A',
                        fontFamily: 'Inter',
                        fontWeight: '900',
                        fontSize: '18px',
                      }}
                    >
                      Shopee
                    </Typography>
                  }
                />
              </Grid> 
            </Grid>   
          </Box>
        } 
      />

      {/* <ModalComponent
        title='Input Manual CSI'
        onClose={handleCloseModalManual}
        buttonName='Save'
        open={openManual}
        children={
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <Typography
                  sx={{
                    color: '#1C3766',
                    fontFamily: 'Inter',
                    fontWeight: '900',
                    fontSize: '20px',
                  }}
                >Select Date
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box 
                  sx={{
                    display: 'flex',
                  }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker  
                      inputFormat="MMMM DD, YYYY"
                      value={selectedDate}
                      onChange={handleChange}
                      renderInput={(params : TextFieldProps) => 
                        <TextField  
                          size="small"
                          {...params} 
                          sx={{
                            '& .MuiOutlinedInput-input': {
                              color: '#1C2C5A',
                              width: '440px',
                            },
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: '#FFFFFF', 
                              height: '40px',
                            },
                            '& .MuiIconButton-root': {
                              height: '30px',
                            },
                          }}
                        />
                      }
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  sx={{
                    color: '#1C3766',
                    fontFamily: 'Inter',
                    fontWeight: '900',
                    fontSize: '20px',
                  }}
                >Manual CSI
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <StyledTextField size='small' variant="outlined" 
                  value={'0.00'}
                  InputProps={{
                    startAdornment: <InputAdornment className="adornment" position="start">Php</InputAdornment>,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '470px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'right',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    }
                  }} 
                />
              </Grid>
              <Grid item xs={8}>
                <Typography
                  sx={{
                    color: '#1C3766',
                    fontFamily: 'Inter',
                    fontWeight: '900',
                    fontSize: '20px'
                  }}
                >EJ Receipt
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <StyledTextField size='small' variant="outlined"
                  value={'0.00'} 
                  InputProps={{
                    startAdornment: <InputAdornment className="adornment" position="start">Php</InputAdornment>,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '470px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'right',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    }
                  }} 
                />
              </Grid>
              <Grid item xs={8}>
                <Typography
                  sx={{
                    color: '#1C3766',
                    fontFamily: 'Inter',
                    fontWeight: '900',
                    fontSize: '20px'
                  }}
                >Variance
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <StyledTextField size='small' variant="outlined" 
                  value={'0.00'}
                  InputProps={{
                    startAdornment: <InputAdornment className="adornment" position="start">Php</InputAdornment>,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '470px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'right',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    }
                  }} 
                />
              </Grid>
            </Grid>
          </Box>
        } 
      /> */}

      <ModalComponent  
        title='Input Actual'
        onClose={handleCloseModalActual}
        buttonName='Save'
        open={openActual}
        children={
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={3}>
              </Grid>
              <Grid item xs={3} sx={{ textAlign: 'center'}}>
                <Typography
                  sx={{
                    color: '#1C3766',
                    fontFamily: 'Inter',
                    fontWeight: '900',
                    fontSize: '20px',
                  }}
                >System
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{ textAlign: 'center'}}>
                <Typography
                  sx={{
                    color: '#1C3766',
                    fontFamily: 'Inter',
                    fontWeight: '900',
                    fontSize: '20px',
                  }}
                >Actual
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    color: '#1C3766',
                    fontFamily: 'Inter',
                    fontWeight: '900',
                    fontSize: '20px',
                  }}
                >Variance
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  sx={{
                    color: '#1C3766',
                    fontFamily: 'Inter',
                    fontWeight: '900',
                    fontSize: '20px',
                  }}
                >GrabMart
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
              <Grid item xs={3} >
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
              <Grid item xs={3} >
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
              <Grid item xs={3}>
                <Typography
                  sx={{
                    color: '#1C3766',
                    fontFamily: 'Inter',
                    fontWeight: '900',
                    fontSize: '20px'
                  }}
                >GrabFood
                </Typography>
              </Grid>
              <Grid item  xs={3}>
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
              <Grid item xs={3}>
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
              <Grid item xs={3}>
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
              <Grid item xs={3}>
                <Typography
                  sx={{
                    color: '#1C3766',
                    fontFamily: 'Inter',
                    fontWeight: '900',
                    fontSize: '20px'
                  }}
                >AgileFS
                </Typography>
              </Grid>
              <Grid item  xs={3}>
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
              <Grid item xs={3}>
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
              <Grid item xs={3}>
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
              <Grid item xs={3}>
                <Typography
                  sx={{
                    color: '#1C3766',
                    fontFamily: 'Inter',
                    fontWeight: '900',
                    fontSize: '17px',
                    marginBottom: '-10px'
                  }}
                >Agile
                </Typography>
                <Typography
                  sx={{
                    color: '#1C3766',
                    fontFamily: 'Inter',
                    fontWeight: '900',
                    fontSize: '17px'
                  }}
                >Merchandise
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{marginTop: '2px'}}>
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
              <Grid item xs={3} sx={{marginTop: '2px'}}>
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
              <Grid item xs={3} sx={{marginTop: '2px'}}>
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
              <Grid item xs={3}>
                <Typography
                  sx={{
                    color: '#1C3766',
                    fontFamily: 'Inter',
                    fontWeight: '900',
                    fontSize: '20px'
                  }}
                >MetroMart
                </Typography>
              </Grid>
              <Grid item  xs={3}>
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
              <Grid item xs={3}>
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
              <Grid item xs={3}>
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
              <Grid item xs={3}>
                <Typography
                  sx={{
                    color: '#1C3766',
                    fontFamily: 'Inter',
                    fontWeight: '900',
                    fontSize: '20px'
                  }}
                >Lazada
                </Typography>
              </Grid>
              <Grid item  xs={3}>
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
              <Grid item xs={3}>
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
              <Grid item xs={3}>
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
              <Grid item xs={3}>
                <Typography
                  sx={{
                    color: '#1C3766',
                    fontFamily: 'Inter',
                    fontWeight: '900',
                    fontSize: '20px'
                  }}
                >Shopee
                </Typography>
              </Grid>
              <Grid item  xs={3}>
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
              <Grid item xs={3}>
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
              <Grid item xs={3}>
                <TextField size='small' variant="outlined" 
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#FFFFFF',
                      color: '#1C3766',
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      textAlign: 'center',
                      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.3), inset 0px 0px 8px -1px rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                    },
                    display: 'flex',
                  }} 
                />
              </Grid>
            </Grid>
          </Box>
        } 
      />
    </Box>
  );
};

export default Header;