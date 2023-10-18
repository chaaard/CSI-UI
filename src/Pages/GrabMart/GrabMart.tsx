import { Box, Grid, IconButton, Typography, styled } from '@mui/material';
import { useCallback, useState } from 'react';

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

const GrabMart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openInvoice, setOpenInvoice] = useState<boolean>(false);
  
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpenInvoiceModal = () => {
    setOpenInvoice(true);
  };

  const handleCloseInvoiceModal = useCallback(() => {
    setOpenInvoice(false);
  }, []);


  return (
    <Box>
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
          >
            <Typography>
              Refresh
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
            onClick={handleOpenModal}
          >
            <Typography>
              Upload Prooflist
            </Typography>
          </BootstrapButton>  
        </Grid>
        <Grid item>
          <BootstrapButton
            sx={{
              color: "white",
              fontSize: "16px",   
              backgroundColor: "#1C3766",
              width: "200px",  
              borderRadius: "20px", 
              fontFamily: 'Inter',
              fontWeight: '900', 
            }}
            onClick={handleOpenInvoiceModal}
          >
            <Typography>
              Generate Invoice
            </Typography>
          </BootstrapButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default GrabMart
