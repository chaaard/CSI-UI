import { Box, Divider, Grid, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, TextFieldProps, Typography, styled } from '@mui/material';
import GrabMart from '../../Assets/GrabMart.png'
import GrabFood from '../../Assets/GrabFood.png'
import Metromart from '../../Assets/Metromart.png'
import FoodPanda from '../../Assets/FoodPanda.png'
import Lazada from '../../Assets/Lazada.png'
import Shopee from '../../Assets/Shopee.png'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import PaperComponent from '../../Components/Common/PaperComponent';

const StyledTableCellHeader = styled(TableCell)(() => ({
  padding: "8px 17px !important",
  fontSize: "15px",
  fontWeight: '900',
  color: '#1C2C5A',
  textAlign: 'center',
}));

const StyledTableCellBody = styled(TableCell)(() => ({
  fontSize: "14px",
  color: '#1C2C5A',
  fontWeight: '400',
  textAlign: 'center',
})); 

const BootstrapButton = styled(IconButton)(() => ({
  textTransform: 'none',
  fontSize: 12, 
  lineHeight: 1.5,
  color: '#1C2C5A',
  fontWeight: '900',
  fontFamily: 'Inter',
}));

const CustomScrollbarBox = styled(Box)`
    overflow-y: auto;
    height: calc(100vh - 100px);

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

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null | undefined>(null);
  const [currentDate, setCurrentDate] = useState<Dayjs | null | undefined>(null);
  const [page, setPage] = useState<number>(1); // Current page number
  const [itemsPerPage, setItemsPerPage] = useState<number>(20); // Items displayed per page
  const [pageCount, setPageCount] = useState<number>(0); // Total page count
  const [columnToSort, setColumnToSort] = useState<string>(""); // Column to sort
  const [orderBy, setOrderBy] = useState<string>("asc"); // Sorting order
  
  const handleSubmit = () => {
    console.log("Test");
  };

  useEffect(() => {
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
    document.title = 'CSI | Dashboard';
  }, []);

  function createRow(customer: string, jo: string, transactDate: string, amount: string, adjustment: string) {
    return { customer, jo, transactDate, amount, adjustment};
  }

  const rows = [
    createRow('LAZADA', '9999990009', 'September 22, 2023', '43.00', 'For Dispute Filling'),
    createRow('LAZADA', '9999990009', 'September 22, 2023', '43.00', 'For Cancellation'),
    createRow('LAZADA', '9999990009', 'September 22, 2023', '43.00', 'JO Edit'),
    createRow('LAZADA', '9999990009', 'September 22, 2023', '43.00', 'Change Partner'),
    createRow('GRABMART', '9999990009', 'September 22, 2023', '43.00', 'JO Edit'),
    createRow('GRABFOOD', '9999990009', 'September 22, 2023', '43.00', 'Change Partner'),
  ];

  return (
  <CustomScrollbarBox>
    <Box 
      sx={{
        marginTop: '16px',
        marginLeft: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker  
          inputFormat="dddd, MMMM DD, YYYY"
          value={selectedDate}
          onChange={handleChangeDate}
          renderInput={(params : TextFieldProps) => 
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
                  width: '250px'
                }
              }}
            />
          }
        />
      </LocalizationProvider>
    </Box>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '16px',
        marginLeft: '16px',
        marginRight: '16px',
        flexWrap: 'wrap',
        '& > :not(style)': {
          width: 250,
          height: 140,
        },
      }}>
      
      {/* Grab Mart */}
      <PaperComponent
        color = {'#00A94A'}
        backgroundColor = {'#F3F3F3'} 
        backgroundColorView = {'#EBEBEB'}
        image={GrabMart}
        onClick={handleSubmit}
        total='0.00'
        isImage={true}
        top={0}
        left={6}
        width='22%'
      />

      {/* Grab Food */}
      <PaperComponent
        color = {'#FFFFFF'}
        backgroundColor = {'#00B14F'} 
        backgroundColorView = {'#009E47'}
        image={GrabFood}
        onClick={handleSubmit}
        total='0.00'
        isImage={true}
        top={0}
        left={6}
        width='25%'
      />

      {/* Food Panda */}
      <PaperComponent
        color = {'#FFFFFF'}
        backgroundColor = {'#D71465'} 
        backgroundColorView = {'#B31154'}
        image={FoodPanda}
        onClick={handleSubmit}
        total='0.00'
        isImage={true}
        top={0}
        left={0}
        width='36%'
      />

      {/* Agile FS */}
      <PaperComponent
        color = {'#1C2C5A'}
        backgroundColor = {'#ECECEC'} 
        backgroundColorView = {'#D2D1D1'}
        image={"Agile FS"}
        onClick={handleSubmit}
        total='0.00'
        isImage={false}
        top={3}
        left={10}
        width=''
      />

      {/* Agile Merchandise */}
      <PaperComponent
        color = {'#FFFFFF'}
        backgroundColor = {'#1C2C5A'} 
        backgroundColorView = {'#17244A'}
        image={"Agile Merchandise"}
        onClick={handleSubmit}
        total='0.00'
        isImage={false}
        top={3}
        left={10}
        width='22%'
      />


      {/* Metromart */}
      <PaperComponent
        color = {'#FFFFFF'}
        backgroundColor = {'#424140'} 
        backgroundColorView = {'#2F2E2E'}
        image={Metromart}
        onClick={handleSubmit}
        total='0.00'
        isImage={true}
        top={3}
        left={6}
        width='25%'
      />

      {/* Lazada */}
      <PaperComponent
        color = {'#FFFFFF'}
        backgroundColor = {'#181164'} 
        backgroundColorView = {'#110C4A'}
        image={Lazada}
        onClick={handleSubmit}
        total='0.00'
        isImage={true}
        top={0}
        left={6}
        width='25%'
      />

      {/* Shopee */}
      <PaperComponent
        color = {'#FFFFFF'}
        backgroundColor = {'#F24731'} 
        backgroundColorView = {'#D73E2B'}
        image={Shopee}
        onClick={handleSubmit}
        total='0.00'
        isImage={true}
        top={6}
        left={0}
        width='25%'
      />

      {/* Walk-In */}
      <PaperComponent
        color = {'#1C2C5A'}
        backgroundColor = {'#D9D9D9'} 
        backgroundColorView = {'#B8B8B8'}
        image={"Walk-In"}
        onClick={handleSubmit}
        total='0.00'
        isImage={false}
        top={3}
        left={10}
        width=''
      />

      {/* Employee */}
      <PaperComponent
        color = {'#FFFFFF'}
        backgroundColor = {'#1C2C5A'} 
        backgroundColorView = {'#17244A'}
        image={"Employee"}
        onClick={handleSubmit}
        total='0.00'
        isImage={false}
        top={3}
        left={10}
        width=''
      />

      {/* Volume Shopper */}
      <PaperComponent
        color = {'#1C2C5A'}
        backgroundColor = {'#D9D9D9'} 
        backgroundColorView = {'#B8B8B8'}
        image={"Volume Shopper"}
        onClick={handleSubmit}
        total='0.00'
        isImage={false}
        top={3}
        left={10}
        width='22%'
      />

      {/* Bank Promos */}
      <PaperComponent
        color = {'#FFFFFF'}
        backgroundColor = {'#1C2C5A'} 
        backgroundColorView = {'#17244A'}
        image={"Bank Promos"}
        onClick={handleSubmit}
        total='0.00'
        isImage={false}
        top={3}
        left={10}
        width='22%'
      />
    </Box>
    <Divider 
      sx={{ 
        marginLeft: '16px', 
        marginRight: '16px',
        border: "1px solid #BBBBBB",
      }}>
    </Divider>
    <Grid container direction="row" alignItems="center" sx={{ padding: '10px 16px 0 16px' }} >
      {/* DatetimePicker for start date */}
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

      <Grid item xs={12} sm={12} md={12} lg={12} xl={8}>
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

      <Grid item>
        <BootstrapButton
          onClick={() => {
            //handleEditOrDeleteClick(row.Id, true)
          }}
          sx={{
            backgroundColor: '#EEEEEE',
            width: '120px',
            height: "20px",
            fontSize: '16px',
            borderRadius: "15px",
            fontWeight: '600',
            "&:hover": {
              backgroundColor: "#E7E7E7",
            },
          }}>
            View All
        </BootstrapButton>
      </Grid>
    </Grid>
    <Box sx={{ position: 'relative', paddingLeft: '16px', paddingRight: '16px', marginTop: '-5px' }}>
      <CustomScrollbarBox component={Paper}
        sx={{
          height: '350px',
          position: 'relative',
          paddingTop: '10px',
          boxShadow: 'inset 1px 6px 8px -1px rgba(0,0,0,0.3), inset -1px 1px 10px -1px rgba(0,0,0,0.3)',
          marginTop: '16px',
          paddingLeft: '50px',
          paddingRight: '50px',
          borderRadius: '25px',
          backgroundColor: '#F2F2F2',
        }}
      >
        <Table  
          sx={{
            "& td": {
              border: 0,
              padding: '2px',
              paddingLeft: '50px',
              paddingRight: '50px',
            },
          }}>
          <TableHead  sx={{
              "& th": {
                borderBottom: "2px solid #1C2C5A",
              },
            }}>
            <TableRow>
              <StyledTableCellHeader>Customer</StyledTableCellHeader>
              <StyledTableCellHeader>JO</StyledTableCellHeader>
              <StyledTableCellHeader>Transaction Date</StyledTableCellHeader>
              <StyledTableCellHeader>Amount</StyledTableCellHeader>
              <StyledTableCellHeader>Adjustment</StyledTableCellHeader>
              <StyledTableCellHeader>Action</StyledTableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
            <TableRow key={index}>
              <StyledTableCellBody>{row.customer}</StyledTableCellBody>
              <StyledTableCellBody>{row.jo}</StyledTableCellBody>
              <StyledTableCellBody>{row.transactDate}</StyledTableCellBody>
              <StyledTableCellBody>{row.amount}</StyledTableCellBody>
              <StyledTableCellBody>{row.adjustment}</StyledTableCellBody>
              <StyledTableCellBody sx={{ textAlign: 'center', width: '60px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <BootstrapButton
                    onClick={() => {
                      //handleEditOrDeleteClick(row.Id, true)
                    }}
                    sx={{
                      boxShadow: 'inset 1px 1px 1px -1px rgba(0,0,0,0.3), inset -1px 1px 6px -1px rgba(0,0,0,0.3)',
                      backgroundColor: '#FFFFFF',
                      width: '90px',
                      height: "20px",
                      borderRadius: "15px",
                      "&:hover": {
                        //backgroundColor: "#7799F8",
                      },
                    }}>
                      View
                  </BootstrapButton>
                  <BootstrapButton
                    onClick={() => {
                      //handleEditOrDeleteClick(row.Id, false)
                    }}
                    sx={{
                      boxShadow: 'inset 1px 1px 1px -1px rgba(0,0,0,0.3), inset -1px 1px 6px -1px rgba(0,0,0,0.3)',
                      backgroundColor: '#FFFFFF',
                      width: '90px',
                      height: "20px",
                      borderRadius: "15px",
                      marginLeft: 0.5,
                      "&:hover": {
                        //backgroundColor: "#FF7171", // Change to the desired hover color
                      }
                    }}>
                    Edit
                  </BootstrapButton>
                </Box>
              </StyledTableCellBody>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomScrollbarBox>
      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        <Pagination
          variant="outlined"
          shape="rounded"
          count={pageCount}
          page={page}
          // onChange={(event, value) => {
          //   setPage(value);
          //   fetchCustomerCodes(value, itemsPerPage, searchQuery, columnToSort, orderBy);
          // }}
        />
      </Box>
    </Box>
  </CustomScrollbarBox>
  )
}

export default Dashboard