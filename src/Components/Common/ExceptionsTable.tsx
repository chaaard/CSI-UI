import { Box, CircularProgress, IconButton, Pagination, Paper, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, Typography, styled } from "@mui/material";
import IException from "../../Pages/Common/Interface/IException";
import { useState } from "react";
import AdjustmentTypeModal from "./AdjustmentTypeModal";

interface ExceptionProps {
  exceptions: IException[];
  loading: boolean;
  setIsModalClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const BootstrapButton = styled(IconButton)(() => ({
  textTransform: 'none',
  fontSize: 12, 
  lineHeight: 1.5,
  color: '#1C2C5A',
  fontWeight: '900',
  fontFamily: 'Inter',
}));

const StyledTableCellHeader = styled(TableCell)(() => ({
  padding: "8px 17px !important",
  fontSize: "14px",
  fontWeight: '900',
  color: '#1C2C5A',
  textAlign: 'center',
}));

const StyledTableCellBody = styled(TableCell)(() => ({
  padding: "1px 14px",
  fontSize: "12px",
  color: '#1C2C5A',
  textAlign: 'center',
}));

const CustomScrollbarBox = styled(Box)`
    overflow-y: auto;
    height: calc(100vh - 190px);

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

const ExceptionsTable: React.FC<ExceptionProps> = ({ exceptions, loading, setIsModalClose }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('success'); // Snackbar severity
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false); // Snackbar open state
  const [message, setMessage] = useState<string>('');
  const [exception, setException] = useState<IException>({} as IException);

  // Handle closing the snackbar
  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const handleResolveClick = (row: IException) => {
      setIsModalOpen(true);
      setException(row);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!loading) {
    return (
      <Box style={{ position: 'relative' }}>
        <CustomScrollbarBox component={Paper}
          sx={{
            height: '210px',
            position: 'relative',
            paddingTop: '10px',
            borderRadius: '20px',
            boxShadow: 'inset 1px 6px 8px -1px rgba(0,0,0,0.3), inset 1px 0px 8px -1px rgba(0,0,0,0.3)',
            backgroundColor: '#F2F2F2',
            paddingLeft: '20px',
            paddingRight: '20px',
          }}
        >
          <Table
            sx={{
              minWidth: 700,
              tableLayout: 'fixed', // Set table layout to fixed
              "& th": {
                borderBottom: '2px solid #D9D9D9',
              },
  
            }}
            aria-label="spanning table">
            <TableHead >
              <TableRow
                sx={{
                  "& th": { border: 0 },
                }}>
                <StyledTableCellHeader>Customer</StyledTableCellHeader>
                <StyledTableCellHeader>JO</StyledTableCellHeader>
                <StyledTableCellHeader>Transaction Date</StyledTableCellHeader>
                <StyledTableCellHeader>Amount</StyledTableCellHeader>
                <StyledTableCellHeader>Adjustment</StyledTableCellHeader>
                <StyledTableCellHeader>Status</StyledTableCellHeader>
                <StyledTableCellHeader>Action</StyledTableCellHeader>
              </TableRow>
            </TableHead>
            <TableBody sx={{ maxHeight: 'calc(100% - 48px)', overflowY: 'auto', position: 'relative' }}>
              {
                exceptions.map((row) => (
                  <TableRow key={row.Id} sx={{ "& td": { border: 0 }}}>
                    <StyledTableCellBody>{row.CustomerId}</StyledTableCellBody>
                    <StyledTableCellBody>{row.JoNumber}</StyledTableCellBody>
                    <StyledTableCellBody>
                      {row.TransactionDate !== null
                        ? new Date(row.TransactionDate ?? '').toLocaleDateString('en-CA', {
                            year: 'numeric',
                            month: 'short', // or 'long' for full month name
                            day: 'numeric',
                          })
                        : ''}
                    </StyledTableCellBody>
                    <StyledTableCellBody>{row.Amount !== null ? row.Amount?.toFixed(2) : '0.00'}</StyledTableCellBody>
                    <StyledTableCellBody>{row.AdjustmentType}</StyledTableCellBody>
                    <StyledTableCellBody>{row.Status}</StyledTableCellBody>
                    <StyledTableCellBody sx={{ textAlign: 'center', width: '60px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      {row.Status !== 'Pending' ? 
                        <BootstrapButton
                          onClick={() => {
                            //handleEditOrDeleteClick(row.Id, true)
                          }}
                          sx={{
                            backgroundColor: "#BECEFB",
                            width: '90px',
                            height: "20px",
                            borderRadius: "15px",
                            "&:hover": {
                              backgroundColor: "#7799F8",
                            },
                          }}>
                            View
                        </BootstrapButton>
                      : null }
                      <BootstrapButton
                        onClick={() => {
                          handleResolveClick(row)
                        }}
                        sx={{
                          backgroundColor: "#FFB5B5",
                          width: '90px',
                          height: "20px",
                          borderRadius: "15px",
                          marginLeft: 0.5,
                          "&:hover": {
                            backgroundColor: "#FF7171", // Change to the desired hover color
                          }
                        }}>
                          Resolve
                      </BootstrapButton>
                    </Box>
                  </StyledTableCellBody>
                  </TableRow>
                ))
              }
              </TableBody>
            </Table>
        </CustomScrollbarBox>
        <AdjustmentTypeModal open={isModalOpen} onClose={handleCloseModal} exception={exception} setIsModalClose={setIsModalClose} />
      </Box>
    );
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
};

export default ExceptionsTable;