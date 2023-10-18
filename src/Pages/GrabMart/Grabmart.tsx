import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { Box, Button, Grid } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import BackupIcon from '@mui/icons-material/Backup';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const Grabmart = () => {
useEffect(() => {
    document.title = 'CSI | GrabMart';
}, []);

function createData(
    location: string,
    date: string,
    accountNo: number,
    membershipNo: number,
    cashierNo: number,
    registerNo: number,
    trxNo: number,
    orderNo: string,
    quantity: number,
    amount1: number,
    subTotal: number,
    amount2: number,
    joNo: string,
    billable: string,
    variance: string,
  ) {
    return { 
        location,
        date,
        accountNo,
        membershipNo,
        cashierNo,
        registerNo,
        trxNo,
        orderNo,
        quantity,
        amount1,
        subTotal,
        amount2,
        joNo,
        billable,
        variance
    };
  }
  
  const rows = [
    createData('FORT','2023-09-19', 9999990009, 999900009, 309090, 23, 432323, 'QIUHIU8', 1, 184.00, 184.00, 186.01, 'q89ed', 'YES', '2.01'),
    createData('FORT','2023-09-19', 9999990009, 999900009, 309090, 23, 432323, 'QIUHIU8', 1, 184.00, 184.00, 189.00, 'q89ed', 'YES', '5.00'),
    createData('FORT','2023-09-19', 9999990009, 999900009, 309090, 23, 432323, 'QIUHIU8', 1, 184.00, 184.00, 184.00, 'q89ed', 'YES', '-'),
    createData('FORT','2023-09-19', 9999990009, 999900009, 309090, 23, 432323, 'QIUHIU8', 1, 184.00, 184.00, 184.00, 'q89ed', 'YES', '-'),
    createData('FORT','2023-09-19', 9999990009, 999900009, 309090, 23, 432323, 'QIUHIU8', 1, 184.00, 184.00, 184.00, 'q89ed', 'YES', '-'),
  ];

  return (
    <Box>
      <Grid container spacing={2} direction={'row'} justifyContent={'flex-start'} sx={{ marginBottom: '20px', }}>
        <Grid item sx={{ marginLeft: '30px', marginTop: '20px', }}>
          <Button sx={{backgroundColor: '#1C2C5A', color: 'white', borderRadius: '15px', paddingLeft:'15px', paddingRight:'20px'}}>
            <AutorenewIcon sx={{ marginRight: '7px' }}/> Refresh
          </Button>
        </Grid>
        <Grid item sx={{ marginTop: '20px' }}>
          <Button sx={{backgroundColor: '#1C2C5A', color: 'white', borderRadius: '15px', paddingLeft:'15px', paddingRight:'20px'}}>
            <BackupIcon sx={{ marginRight: '7px' }}/> Upload Prooflist
          </Button>
        </Grid>
        <Grid item sx={{ marginTop: '20px' }}>
          <Button sx={{ backgroundColor: '#1C2C5A', color: 'white', borderRadius: '15px', paddingLeft:'15px', paddingRight:'20px'}}>
            <ReceiptLongIcon sx={{ marginRight: '7px' }}/> Generate Invoice
          </Button>
        </Grid>
      </Grid>
      <Box 
          sx={{  
            position: 'absolute',
            height: '40vh',
            top: '70px',
            left: '20px',
            right: '20px',
            bottom: '10px',
            overflowX: 'hidden', 
            overflowY: 'auto', 
            marginTop: '10px', 
            padding: '0 5px',    
            transition: 'left 0.3s ease',
            backgroundColor: '#FFFFFF',
            borderRadius: '25px',
            boxShadow: 'inset 2px 2px 7px 0px rgba(0,0,0,0.3), inset -1px 3px 8px -1px rgba(0,0,0,0.3)',
          }}>
        <Box sx={{marginTop: '30px', marginBottom: '-20px'}}>
          
        <Grid container direction={'row'} justifyContent={'flex-end'} sx={{ marginBottom: '20px', }}>
          <Grid item 
            sx={{
              backgroundColor: '#E7FFDF', 
              borderRadius: '15px', 
              boxShadow: 'inset 2px 2px 7px 0px rgba(0,0,0,0.3), inset -1px 3px 8px -1px rgba(0,0,0,0.3)',
              color: '#1C2C5A', 
              fontSize: '20px',
              marginRight: '35px',
              paddingLeft:'15px', 
              paddingRight:'20px'
            }}>
            System: 30,946.48
          </Grid>
          <Grid item
            sx={{
              backgroundColor: '#FFFCDF', 
              borderRadius: '15px', 
              boxShadow: 'inset 2px 2px 7px 0px rgba(0,0,0,0.3), inset -1px 3px 8px -1px rgba(0,0,0,0.3)',
              color: '#1C2C5A', 
              fontSize: '20px',
              marginRight: '35px',
              paddingLeft:'15px', 
              paddingRight:'20px',
            }}>
            Actual: 30,946.48
          </Grid>
          <Grid item
            sx={{
              backgroundColor: '#FFDFDF', 
              borderRadius: '15px', 
              boxShadow: 'inset 2px 2px 7px 0px rgba(0,0,0,0.3), inset -1px 3px 8px -1px rgba(0,0,0,0.3)',
              color: '#1C2C5A', 
              fontSize: '20px',
              marginRight: '35px',
              paddingLeft:'15px', 
              paddingRight:'20px',
            }}>
            Variance: -
          </Grid>
        </Grid>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Account Number</TableCell>
                <TableCell align="right">Membership No.</TableCell>
                <TableCell align="right">Cashier No.</TableCell>
                <TableCell align="right">Register No.</TableCell>
                <TableCell align="right">TRX. No.</TableCell>
                <TableCell align="right">Order No.</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Sub Total</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">JO No.</TableCell>
                <TableCell align="right">BILLABLE</TableCell>
                <TableCell align="right">Variance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.location}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{row.location}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.accountNo}</TableCell>
                  <TableCell align="right">{row.membershipNo}</TableCell>
                  <TableCell align="right">{row.cashierNo}</TableCell>
                  <TableCell align="right">{row.registerNo}</TableCell>
                  <TableCell align="right">{row.trxNo}</TableCell>
                  <TableCell align="right">{row.orderNo}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{row.amount1}</TableCell>
                  <TableCell align="right">{row.subTotal}</TableCell>
                  <TableCell align="right">{row.amount2}</TableCell>
                  <TableCell align="right">{row.joNo}</TableCell>
                  <TableCell align="right">{row.billable}</TableCell>
                  <TableCell align="right">{row.variance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
          <Grid container spacing={3} direction={'row'} justifyContent={'flex-start'} sx={{marginLeft: '35px', marginBottom: '20px', marginTop: '100px' }}>
            <Grid item lg={7.5}>
              Sub Total
            </Grid>
            <Grid item lg={0.6}>
              1,104.00
            </Grid>
            <Grid item lg={0.5}>
              1,104.00
            </Grid>
            <Grid item lg={2.5}>
              1,104.00
            </Grid>
            <Grid item>
              7.01
            </Grid>
          </Grid>
          <Grid container spacing={3} direction={'row'} justifyContent={'flex-start'} sx={{marginLeft: '35px', marginBottom: '20px' }}>
            <Grid item lg={7.5}>
              Grand Total
            </Grid>
            <Grid item lg={0.6}>
              1,104.00
            </Grid>
            <Grid item lg={0.5}>
              1,104.00
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box 
          sx={{  
            position: 'absolute',
            top: '500px',
            left: '20px',
            right: '20px',
            bottom: '10px',
            overflowX: 'hidden', 
            overflowY: 'auto', 
            marginTop: '10px', 
            padding: '0 5px',    
            transition: 'left 0.3s ease',
            backgroundColor: '#F2F2F2',
            borderRadius: '25px',
            boxShadow: 'inset 2px 2px 7px 0px rgba(0,0,0,0.3), inset -1px 3px 8px -1px rgba(0,0,0,0.3)',
          }}>
          </Box>
    </Box>
  )
}

export default Grabmart