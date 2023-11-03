import { Box, Grid, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, styled, TextField, Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import {Sync as SyncIcon, CloudUpload as CloudUploadIcon, ReceiptLong as ReceiptLongIcon} from '@mui/icons-material/';
import ModalComponent from '../../Components/Common/ModalComponent';

interface StyledTypographyProps {
  color: string;
}

const StyledTableCellHeader = styled(TableCell)(() => ({
  padding: "8px 17px !important",
  fontSize: "14px",
  fontWeight: '900',
  color: '#1C2C5A',
  textAlign: 'center',
}));

const StyledTableCellBody = styled(TableCell)(() => ({
  padding: "8px 16px",
  fontSize: "12px",
  color: '#1C2C5A',
  textAlign: 'center',
}));

const StyledTableCellSubHeader = styled(TableCell)(() => ({
  fontSize: "12px",
  fontWeight: 'bold',
  color: '#1C2C5A',
  textAlign: 'left',
  paddingLeft: '25px !important',
  paddingRight: '25px !important'
}));

const StyledTableCellSubBody = styled(TableCell)(() => ({
  fontSize: "12px",
  color: '#1C2C5A',
  textAlign: 'center',
  fontWeight: 'bold',
}));

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


const StyledTableCellTypography = styled(Typography)<StyledTypographyProps>((props) => ({
  textTransform: 'none',
  fontSize: 14,
  border: '1px solid',
  lineHeight: 1.5,
  color: '#1C2C5A',
  borderRadius: '20px',
  borderColor: props.color,
  fontWeight: '900',
}));

const CustomScrollbarBox = styled(Box)`
    overflow-y: auto;
    height: calc(100vh - 160px);

    /* Custom Scrollbar Styles */
    scrollbar-width: thin;
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #2B4B81;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  `;

const GrabMart = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  function createRow(location: string, date: string, acountno: number, memno: number, cashno: number, regno: number, trxno: number, orderno: string, qty: number,
    amount1: number, subtotal: number, amount2: number, jono: number, billable: string, variance: number) {
    return { location, date, acountno, memno, cashno, regno, trxno, orderno, qty,
      amount1, subtotal, amount2, jono, billable, variance };
  }

  const rows = [
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),
    createRow('FORT', '2023-09-19', 9999990009, 9999990009, 309090, 23, 43223, 'QIUPHIU8', 1, 184.00, 184.00, 0.00, 0.00, '', 0.00),

  ];
  interface Row {
    location: string;
    date: string;
    acountno: number;
    memno: number;
    cashno: number;
    regno: number;
    trxno: number;
    orderno: string;
    qty: number;
    amount1: number;
    subtotal: number;
    amount2: number;
    jono: number;
    billable: string;
    variance: number
  }

  function subtotalAmt1(items: readonly Row[]) {
    return items.map(({ amount1 }) => amount1).reduce((sum, i) => sum + i, 0);
  }

  function subtotal(items: readonly Row[]) {
    return items.map(({ subtotal }) => subtotal).reduce((sum, i) => sum + i, 0);
  }

  function subtotalAmt2(items: readonly Row[]) {
    return items.map(({ amount2 }) => amount2).reduce((sum, i) => sum + i, 0);
  }

  function variance(items: readonly Row[]) {
    return items.map(({ variance }) => variance).reduce((sum, i) => sum + i, 0);
  }

  function grandtotalAmt1(items: readonly Row[]) {
    return items.map(({ amount2 }) => amount2).reduce((sum, i) => sum + i, 0);
  }

  function grandtotalSubTot(items: readonly Row[]) {
    return items.map(({ variance }) => variance).reduce((sum, i) => sum + i, 0);
  }

  const subtotalAmount1 = subtotalAmt1(rows);
  const subtotal1 = subtotal(rows);
  const subtotalAmount2 = subtotalAmt2(rows);
  const totalVariance = variance(rows);
  const grandtotalAmount = grandtotalAmt1(rows);
  const grandtotalSub = grandtotalSubTot(rows);

  useEffect(() => {
    document.title = 'CSI | GrabMart';
  }, []);


  return (
    <Box
      sx={{
        marginTop: '16px',
        marginLeft: '16px',
        flexGrow: 1,
      }}
    >
      <Grid container spacing={1} alignItems="flex-start" direction={'row'}>
        <Grid item >
          <BootstrapButton
            sx={{
              color: "white",
              fontSize: "16px",
              backgroundColor: "#1C3766",
              width: "100%",
              borderRadius: "20px",
              fontFamily: 'Inter',
              fontWeight: '900',
            }}
          >
            <SyncIcon sx={{marginRight: '5px'}} />
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
              width: "100%",
              borderRadius: "20px",
              fontFamily: 'Inter',
              fontWeight: '900',
            }}
            onClick={handleOpenModal}
          >
            <CloudUploadIcon sx={{marginRight: '5px'}} />
            <Typography>
              Upload Prooflist
            </Typography>
          </BootstrapButton>
        </Grid>
        <Grid item >
          <BootstrapButton
            sx={{
              color: "white",
              fontSize: "16px",
              backgroundColor: "#1C3766",
              width: "100%",
              borderRadius: "20px",
              fontFamily: 'Inter',
              fontWeight: '900',
            }}
            //onClick={handleOpenInvoiceModal}
          >
            <ReceiptLongIcon sx={{marginRight: '5px'}} />
            <Typography>
              Generate Invoice
            </Typography>
          </BootstrapButton>
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
              <Grid container spacing={1} sx={{paddingTop: '5px'}}>
                <Grid item xs={12} sm={6} sx={{ marginRight: '-15px' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingBottom: '10px',
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Inter',
                        fontWeight: '900',
                        color: '#1C3766',
                        fontSize: 19,
                        paddingLeft: '25px'
                      }}
                    >
                      Grab Mart
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: '#00B14F',
                        height: '7px',
                        width: '40px',
                        borderRadius: '25px',
                        marginLeft: '50px',
                        marginTop: '-4px',
                      }}
                    >
                    </Box>
                  </Box>
                </Grid>
                {/* <Grid item xs={12} sm={2}
                  sx={{
                    paddingBottom: '10px',
                  }}>
                  <StyledTypography color="#E7FFDF">
                    System: 30,946.48
                  </StyledTypography>
                </Grid>
                <Grid item xs={12} sm={2}
                  sx={{
                    paddingBottom: '10px',
                  }}>
                  <StyledTypography color="#FFFCDF">
                    Actual: 30,946.48
                  </StyledTypography>
                </Grid>
                <Grid item xs={12} sm={2}
                  sx={{
                    paddingBottom: '10px',
                  }}>
                  <StyledTypography color="#FFDFDF">
                    Variance: -
                  </StyledTypography>
                </Grid> */}
              </Grid>
              <Box style={{ position: 'relative' }}>
                <CustomScrollbarBox component={Paper}
                  sx={{
                    height: '400px',
                    position: 'relative',
                    paddingTop: '10px',
                    borderBottomLeftRadius: '20px',
                    borderBottomRightRadius: '20px',
                    borderTopLeftRadius: '0',
                    borderTopRightRadius: '0',
                    boxShadow: '1px 6px 8px -1px rgba(0,0,0,0.3), 1px 0px 8px -1px rgba(0,0,0,0.3)',
                  }}
                >
                  <Table
                    sx={{
                      minWidth: 700,
                      "& th, & td": {
                        border: 0,
                        padding: '1px',
                      },
                    }}
                    aria-label="spanning table">
                    <TableHead >
                      <TableRow >
                        <TableCell colSpan={7}>
                        </TableCell>
                        <TableCell
                          align='center'
                          colSpan={4}
                        >
                          <StyledTableCellTypography color="#83C8A2">
                            Analytic
                          </StyledTableCellTypography>
                        </TableCell>
                        <TableCell
                          align='center'
                          colSpan={3}
                        >
                          <StyledTableCellTypography color="#00A5EA">
                            Portal
                          </StyledTableCellTypography>
                        </TableCell>
                        <TableCell>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "& th": { border: 0 },
                          fontWeight: '900',
                          color: 'red',
                          fontFamily: 'Inter',
                        }}>
                        <StyledTableCellHeader>Location</StyledTableCellHeader>
                        <StyledTableCellHeader>Date</StyledTableCellHeader>
                        <StyledTableCellHeader>Account No.</StyledTableCellHeader>
                        <StyledTableCellHeader>Membership No.</StyledTableCellHeader>
                        <StyledTableCellHeader>Cashier No.</StyledTableCellHeader>
                        <StyledTableCellHeader>Register No.</StyledTableCellHeader>
                        <StyledTableCellHeader>TRX No.</StyledTableCellHeader>
                        <StyledTableCellHeader sx={{backgroundColor: '#B1E9CA', borderTopLeftRadius: '8px',}}>Order No.</StyledTableCellHeader>
                        <StyledTableCellHeader sx={{backgroundColor: '#B1E9CA'}}>Qty</StyledTableCellHeader>
                        <StyledTableCellHeader sx={{backgroundColor: '#B1E9CA'}}>Amount</StyledTableCellHeader>
                        <StyledTableCellHeader sx={{backgroundColor: '#B1E9CA', borderTopRightRadius: '8px',}}>Subtotal</StyledTableCellHeader>
                        <StyledTableCellHeader sx={{backgroundColor: '#A0DFFA', borderTopLeftRadius: '8px',}}>Amount</StyledTableCellHeader>
                        <StyledTableCellHeader sx={{backgroundColor: '#A0DFFA'}}>JO No.</StyledTableCellHeader>
                        <StyledTableCellHeader sx={{backgroundColor: '#A0DFFA', borderTopRightRadius: '8px',}}>BILLABLE</StyledTableCellHeader>
                        <StyledTableCellHeader>VARIANCE</StyledTableCellHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody sx={{ maxHeight: 'calc(100% - 48px)', overflowY: 'auto', position: 'relative' }}>
                      {rows.map((row, index) => (
                      <TableRow key={index} sx={{ "& td": { border: 0 }}}>
                        <StyledTableCellBody>{row.location}</StyledTableCellBody>
                        <StyledTableCellBody>{row.date}</StyledTableCellBody>
                        <StyledTableCellBody>{row.acountno}</StyledTableCellBody>
                        <StyledTableCellBody>{row.memno}</StyledTableCellBody>
                        <StyledTableCellBody>{row.cashno}</StyledTableCellBody>
                        <StyledTableCellBody>{row.regno}</StyledTableCellBody>
                        <StyledTableCellBody>{row.trxno}</StyledTableCellBody>
                        <StyledTableCellBody sx={{backgroundColor: '#B1E9CA',  borderBottomLeftRadius: index === rows.length - 1 ? '8px' : 0,}}>{row.orderno}</StyledTableCellBody>
                        <StyledTableCellBody sx={{backgroundColor: '#B1E9CA'}}>{row.qty}</StyledTableCellBody>
                        <StyledTableCellBody sx={{backgroundColor: '#B1E9CA'}}>{row.amount1}</StyledTableCellBody>
                        <StyledTableCellBody sx={{backgroundColor: '#B1E9CA', borderBottomRightRadius: index === rows.length - 1 ? '8px' : 0,}}>{row.subtotal}</StyledTableCellBody>
                        <StyledTableCellBody sx={{backgroundColor: '#A0DFFA', borderBottomLeftRadius: index === rows.length - 1 ? '8px' : 0,}}>{row.amount2}</StyledTableCellBody>
                        <StyledTableCellBody sx={{backgroundColor: '#A0DFFA'}}>{row.jono}</StyledTableCellBody>
                        <StyledTableCellBody sx={{backgroundColor: '#A0DFFA', borderBottomRightRadius: index === rows.length - 1 ? '8px' : 0,}}>{row.billable}</StyledTableCellBody>
                        <StyledTableCellBody>{row.variance}</StyledTableCellBody>
                      </TableRow>

                      ))}
                      <TableRow sx={{ position: 'sticky', backgroundColor: '#F2F2F2', zIndex: 1, width: '100%', bottom: 19, paddingBottom: '10px' }}>
                        <StyledTableCellSubHeader>SUBTOTAL</StyledTableCellSubHeader>
                        <StyledTableCellSubBody></StyledTableCellSubBody>
                        <StyledTableCellSubBody></StyledTableCellSubBody>
                        <StyledTableCellSubBody></StyledTableCellSubBody>
                        <StyledTableCellSubBody></StyledTableCellSubBody>
                        <StyledTableCellSubBody></StyledTableCellSubBody>
                        <StyledTableCellSubBody></StyledTableCellSubBody>
                        <StyledTableCellSubBody></StyledTableCellSubBody>
                        <StyledTableCellSubBody></StyledTableCellSubBody>
                        <StyledTableCellSubBody>{subtotalAmount1}</StyledTableCellSubBody>
                        <StyledTableCellSubBody>{subtotal1}</StyledTableCellSubBody>
                        <StyledTableCellSubBody>{subtotalAmount2}</StyledTableCellSubBody>
                        <StyledTableCellSubBody></StyledTableCellSubBody>
                        <StyledTableCellSubBody></StyledTableCellSubBody>
                        <StyledTableCellSubBody>{totalVariance}</StyledTableCellSubBody>
                      </TableRow>
                      <TableRow sx={{ position: 'sticky', backgroundColor: '#F2F2F2', zIndex: 1, width: '100%', bottom: -1, marginBottom: '20px'  }}>
                          <StyledTableCellSubHeader>GRANDTOTAL</StyledTableCellSubHeader>
                          <StyledTableCellSubBody></StyledTableCellSubBody>
                          <StyledTableCellSubBody></StyledTableCellSubBody>
                          <StyledTableCellSubBody></StyledTableCellSubBody>
                          <StyledTableCellSubBody></StyledTableCellSubBody>
                          <StyledTableCellSubBody></StyledTableCellSubBody>
                          <StyledTableCellSubBody></StyledTableCellSubBody>
                          <StyledTableCellSubBody></StyledTableCellSubBody>
                          <StyledTableCellSubBody></StyledTableCellSubBody>
                          <StyledTableCellSubBody>{grandtotalAmount}</StyledTableCellSubBody>
                          <StyledTableCellSubBody>{grandtotalSub}</StyledTableCellSubBody>
                          <StyledTableCellSubBody></StyledTableCellSubBody>
                          <StyledTableCellSubBody></StyledTableCellSubBody>
                          <StyledTableCellSubBody></StyledTableCellSubBody>
                          <StyledTableCellSubBody></StyledTableCellSubBody>
                        </TableRow>
                      </TableBody>
                    </Table>
                </CustomScrollbarBox>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}
            sx={{
                paddingTop: '10px',
                paddingRight: '20px',
                transition: 'left 0.3s ease',
            }}>
            <CustomScrollbarBox component={Paper}
              sx={{
                height: '300px',
                position: 'relative',
                paddingTop: '10px',
                borderRadius: '20px',
                boxShadow: 'inset 1px 6px 8px -1px rgba(0,0,0,0.3), inset 1px 0px 8px -1px rgba(0,0,0,0.3)',
                backgroundColor: '#F2F2F2',
              }}
            >
              <Table
                sx={{
                  minWidth: 700,
                  "& th, & td": {
                    border: 0,
                    padding: '1px',
                  },

                }}
                aria-label="spanning table">
                <TableHead >
                  <TableRow
                    sx={{
                      "& th": { border: 0 },
                      fontWeight: '900',
                      color: 'red',
                      fontFamily: 'Inter',
                    }}>
                    <StyledTableCellHeader sx={{paddingLeft: '40px !important'}}>Location</StyledTableCellHeader>
                    <StyledTableCellHeader>TransactionDate</StyledTableCellHeader>
                    <StyledTableCellHeader>JO No.</StyledTableCellHeader>
                    <StyledTableCellHeader>Delivery Partner</StyledTableCellHeader>
                    <StyledTableCellHeader>Amount</StyledTableCellHeader>
                    <StyledTableCellHeader>Disputed Amount</StyledTableCellHeader>
                    <StyledTableCellHeader>Date Dispute Filed</StyledTableCellHeader>
                    <StyledTableCellHeader>Description of Dispute</StyledTableCellHeader>
                    <StyledTableCellHeader>Accounts Payment Trans No.</StyledTableCellHeader>
                    <StyledTableCellHeader sx={{paddingRight: '40px !important'}}>Type</StyledTableCellHeader>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ maxHeight: 'calc(100% - 48px)', overflowY: 'auto', position: 'relative' }}>
                  {rows.map((row, index) => (
                  <TableRow key={index} sx={{ "& td": { border: 0 }}}>
                    <StyledTableCellBody sx={{paddingLeft: '25px !important'}}>{row.location}</StyledTableCellBody>
                    <StyledTableCellBody>{row.date}</StyledTableCellBody>
                    <StyledTableCellBody>{row.acountno}</StyledTableCellBody>
                    <StyledTableCellBody>{row.memno}</StyledTableCellBody>
                    <StyledTableCellBody>{row.cashno}</StyledTableCellBody>
                    <StyledTableCellBody>{row.regno}</StyledTableCellBody>
                    <StyledTableCellBody>{row.trxno}</StyledTableCellBody>
                    <StyledTableCellBody>{row.orderno}</StyledTableCellBody>
                    <StyledTableCellBody>{row.qty}</StyledTableCellBody>
                    <StyledTableCellBody sx={{paddingRight: '15px !important'}}>{row.amount1}</StyledTableCellBody>
                  </TableRow>
                  ))}
                  </TableBody>
                </Table>
            </CustomScrollbarBox>
          </Grid>
        </Grid>
      <ModalComponent
        title='Upload Prooflist'
        onClose={handleCloseModal}
        buttonName='Upload'
        open={open}
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
                  <TextField size='small' fullWidth >
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
                File
              </Grid>
              <Grid item xs={11.5} sx={{marginLeft: '10px'}}>
                <Box display={'flex'}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    disabled
                    value="Selected File"
                    size='small'
                    helperText='*CSV, TXT, XLS, XLSX File Only'
                  />
                  <Button
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
