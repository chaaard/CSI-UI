import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, styled, CircularProgress, Pagination, Grid, TextField, TextFieldProps, Button } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import * as React from "react";
import * as XLSX from 'xlsx';


const StyledTableCellHeader = styled(TableCell)(() => ({
  padding: "8px 17px !important",
  fontSize: "20px",
  fontWeight: '900',
  color: '#1C2C5A',
  textAlign: 'center',
}));

const StyledTableCellBody = styled(TableCell)(() => ({
  fontSize: "15px",
  color: '#1C2C5A',
  fontWeight: '500',
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

  function createRow(Customer: string, Jo: string, Transactiondate: string, Amount: number, Adjustment: string, Club: string) {
    return { Customer, Jo, Transactiondate, Amount, Adjustment, Club };
  }
  const rows = [
    createRow('GrabFood', '9999990009', 'December 10, 2023', 43.00, 'For Dispute Filing', 'SNR New Manila'),
    createRow('GrabFood', '9999990009', 'December 10, 2023', 43.00, 'For Cancellation', 'SNR BGC'),
    createRow('GrabFood', '9999990009', 'December 10, 2023', 43.00, 'JO Edit', 'SNR New Manila'),
    createRow('GrabFood', '9999990009', 'December 10, 2023', 43.00, 'Change Partner', 'SNR Bulacan'),
  ];

const Exceptions = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null | undefined>(null);
  const [currentDate, setCurrentDate] = useState<Dayjs | null | undefined>(null);

  useEffect(() => {
    setLoading(false)
    const defaultDate = dayjs().subtract(1, 'day');
    const currentDate = dayjs();
    setSelectedDate(defaultDate);
    setCurrentDate(currentDate);
  }, []);

  const handleChangeDate = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
  };

  const handleChangeCurrentDate = (newValue: Dayjs | null) => {
    setCurrentDate(newValue);
  };
  
  useEffect(() => {
    document.title = 'Maintenance | Exceptions Report';
  }, []);

  const exportToExcel = () => {
    // Convert the data to a worksheet
    const ws = XLSX.utils.json_to_sheet(rows);
  
    // Create a workbook with a single sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
  
    // Save the workbook to a file
    XLSX.writeFile(wb, 'Exception-Reports.xlsx');
  };

  if (!loading) {
    return (
      <Box
        sx={{
          marginTop: '16px',
          marginLeft: '20px',
          marginRight: '20px',
          flexGrow: 1,
        }}
      >
        <Grid container direction="row" alignItems="center" sx={{ padding: '8px 16px 0 -9px' }} >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={2.6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                inputFormat="dddd, MMMM DD, YYYY"
                value={selectedDate}
                onChange={handleChangeDate}
                renderInput={(params: TextFieldProps) => (
                  <TextField
                    size="small"
                    {...params}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderRadius: '40px',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        color: '#1C2C5A',
                        fontFamily: 'Inter',
                        fontWeight: 'bold',
                        width: '250px',
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={0.4}>
            <Typography variant="h6" sx={{ color: '#1C2C5A' }}>
              To:
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={2.6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                inputFormat="dddd, MMMM DD, YYYY"
                value={currentDate}
                onChange={handleChangeCurrentDate}
                renderInput={(params: TextFieldProps) => (
                  <TextField
                    size="small"
                    {...params}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderRadius: '40px',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        color: '#1C2C5A',
                        fontFamily: 'Inter',
                        fontWeight: 'bold',
                        width: '250px',
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={5.6}>
            <TextField
              variant="outlined"
              size="small"
              name="CategoryId"
              type="text"
              required
              select
              InputProps={{
                sx: {
                  borderRadius: '13px', 
                  backgroundColor: '#EEEEEE',
                  color: '#1C2C5A',
                  "& fieldset": { border: 'none' },
                  boxShadow: 'inset 1px 1px 1px -3px rgba(0,0,0,0.1), inset 1px 1px 8px 0px rgba(0,0,0,0.3)',
                },
              }}
            >
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={0.6}>
            <Button variant="contained" onClick={exportToExcel}>Export</Button>
          </Grid>
        </Grid>

        <Box style={{ position: 'relative' }}>
            <Table
              sx={{
                position: 'sticky', 
                top: 0, 
                zIndex: 1,
                backgroundColor: '#FFFFFF',
                height: '50px'
              }}>
              <TableHead sx={{ backgroundColor: '#FFFFFF', paddingTop: '-30px' }}>
                <TableRow sx={{
                  minWidth: 700,
                  "& th": {
                    borderBottom: "2px solid #1C2C5A",
                    padding: '1px',
                  },
                }}
                >
                  <StyledTableCellHeader>Customer</StyledTableCellHeader>
                  <StyledTableCellHeader>JO</StyledTableCellHeader>
                  <StyledTableCellHeader>Transaction Date</StyledTableCellHeader>
                  <StyledTableCellHeader>Amount</StyledTableCellHeader>
                  <StyledTableCellHeader>Adjustment</StyledTableCellHeader>
                  <StyledTableCellHeader>Club</StyledTableCellHeader>
                </TableRow>
              </TableHead>
              </Table>

            <CustomScrollbarBox
              sx={{
                height: '650px',
                position: 'relative',
              }}
            >
              <Table  
                sx={{
                  minWidth: 700,
                  " & td": {
                    border: 0,
                    padding: '1px',
                  },
                }}>
                <TableBody >

                  {rows.map((row, index) => (
                  <TableRow key={index} sx={{ "& td": { border: 0 }}} >
                    <StyledTableCellBody sx={{ textAlign: 'center', width: '270px' }}>{row.Customer}</StyledTableCellBody>
                    <StyledTableCellBody sx={{ textAlign: 'center', width: '145px' }}>{row.Jo}</StyledTableCellBody>
                    <StyledTableCellBody sx={{ textAlign: 'center', width: '400px' }}>{row.Transactiondate}</StyledTableCellBody>
                    <StyledTableCellBody sx={{ textAlign: 'center', width: '265px' }}>{row.Amount}</StyledTableCellBody>
                    <StyledTableCellBody sx={{ textAlign: 'center', width: '295px' }}>{row.Adjustment}</StyledTableCellBody>
                    <StyledTableCellBody sx={{ textAlign: 'center' }}>{row.Club}</StyledTableCellBody>
                  </TableRow>
                  ))}
                   
                </TableBody>
              </Table>
            </CustomScrollbarBox>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Pagination
              variant="outlined"
              shape="rounded"
              count={1}
              page={10}
              // onChange={(event, value) => {
              //   setPage(value);
              // }}
            />
          </Box>
        </Box>
      </Box>
    )
                  
  } else {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress size={80} />
        <Typography variant="h6" color="textSecondary" style={{ marginTop: '16px' }}>
          Loading...
        </Typography>
      </Box>
    );
  }
}

export default Exceptions
