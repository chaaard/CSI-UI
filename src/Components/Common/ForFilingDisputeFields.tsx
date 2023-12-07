import React, { ReactNode, useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, DialogActions, Button, Box, Grid, Typography, TextField, styled, TextFieldProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IAnalytics from '../../Pages/Common/Interface/IAnalytics';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import IMatch from '../../Pages/Common/Interface/IMatch';
import IAdjustmentAddProps from '../../Pages/Common/Interface/IAdjustmentAddProps';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface ForFilingDisputeProps {
  rowData: IMatch | null;
  onAdjustmentValuesChange: (field: keyof IAdjustmentAddProps, value: any) => void;
}

interface TextFieldCompProps {
  tName: string;
  isMultiline: boolean;
  maxRows: number;
  isDisabled: boolean;
  value?: string | number | null | undefined;
  onChange: (field: keyof IAdjustmentAddProps, value: any) => void;
}

const TextFieldComponent: React.FC<TextFieldCompProps> = ({tName, isMultiline, maxRows, isDisabled, value, onChange}) => {
  return (
    <TextField
      size='small'
      type="text"
      name={tName}
      fullWidth
      variant="outlined"
      required
      value={value}
      onChange={(e) => onChange(tName as keyof IAdjustmentAddProps, e.target.value.trim() === ''? '' : e.target.value)}
      disabled={isDisabled}
      multiline={isMultiline}
      rows={maxRows}
      InputProps={{
        sx: {
          borderRadius: '10px',
          backgroundColor: isDisabled ? '#EEEEEE' : '#FFFFFF',
          height: !isMultiline ? '35px' : '80px',
          fontSize: '13px',
          color: '#1C2C5A',
          "& fieldset": { border: 'none' },
          boxShadow: 'inset 1px 1px 1px -3px rgba(0,0,0,0.1), inset 1px 1px 8px 0px rgba(0,0,0,0.3)',
        },
      }}
      sx={{
        "& .MuiInputBase-input.Mui-disabled": {
          WebkitTextFillColor: "#1C2C5A",
        },
      }}
    />
  );
};

const ForFilingDisputeFields: React.FC<ForFilingDisputeProps> = ({ rowData, onAdjustmentValuesChange }) => {
  const [currentDate, setCurrentDate] = useState<Dayjs | undefined>();

   // Handle changes in form fields
  const handleChange = (field: keyof IAdjustmentAddProps, value: any)  => {
    if (typeof onAdjustmentValuesChange === 'function') {
      // Ensure value is defined before calling onAdjustmentValuesChange
      const sanitizedValue = value !== undefined ? value : '';
      onAdjustmentValuesChange(field, sanitizedValue);
      if(field === 'DateDisputeFiled')
      {
        setCurrentDate(sanitizedValue);
      }
    }
  };

  useEffect(() => {
    const currentDate = dayjs();
    setCurrentDate(currentDate);
    onAdjustmentValuesChange('Id', null)
    onAdjustmentValuesChange('NewJO', null)
    onAdjustmentValuesChange('CustomerId', null)
    onAdjustmentValuesChange('AccountsPaymentDate', null)
    onAdjustmentValuesChange('AccountsPaymentTransNo', null)
    onAdjustmentValuesChange('AccountsPaymentAmount', null)
    onAdjustmentValuesChange('ReasonId', null)
    onAdjustmentValuesChange('DeleteFlag', false)
    onAdjustmentValuesChange('DateDisputeFiled', currentDate)
  }, [onAdjustmentValuesChange]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={8}
          sx={{
            fontFamily: 'Inter',
            fontWeight: '900',
            color: '#1C2C5A',
            fontSize: '15px'
          }}>
          Partner
        </Grid>
        <Grid item xs={11.5} sx={{marginLeft: '10px'}}>
          <Box display={'flex'}>
            <TextFieldComponent 
              tName='AnalyticsPartner'
              isMultiline={false}
              maxRows={0}
              isDisabled={true}
              onChange={(field, value) => handleChange(field, value)}
              value={rowData?.AnalyticsPartner}
            />
          </Box>
        </Grid>
        <Grid item xs={8}
          sx={{
            fontFamily: 'Inter',
            fontWeight: '900',
            color: '#1C2C5A',
            fontSize: '15px'
          }}>
          Location
        </Grid>
        <Grid item xs={11.5} sx={{marginLeft: '10px'}}>
          <Box display={'flex'}>
            <TextFieldComponent 
              tName='AnalyticsLocation'
              isMultiline={false}
              maxRows={0}
              isDisabled={true}
              onChange={(field, value) => handleChange(field, value)}
              value={rowData?.AnalyticsLocation}
            />
          </Box>
        </Grid>

        <Grid item xs={8}
          sx={{
            fontFamily: 'Inter',
            fontWeight: '900',
            color: '#1C2C5A',
            fontSize: '15px'
          }}>
          Transaction Date
        </Grid>
        <Grid item xs={11.5} sx={{marginLeft: '10px'}}>
          <Box display={'flex'}>
            <TextFieldComponent 
              tName='AnalyticsTransactionDate'
              isMultiline={false}
              maxRows={0}
              isDisabled={true}
              onChange={(field, value) => handleChange(field, value)}
              value={rowData?.AnalyticsTransactionDate !== null
                ? new Date(rowData?.AnalyticsTransactionDate ?? '').toLocaleDateString('en-CA', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                : ''
              }
            />
          </Box>
        </Grid>
        <Grid item xs={8}
          sx={{
            fontFamily: 'Inter',
            fontWeight: '900',
            color: '#1C2C5A',
            fontSize: '15px'
          }}>
          JO No.
        </Grid>
        <Grid item xs={11.5} sx={{marginLeft: '10px'}}>
          <Box display={'flex'}>
            <TextFieldComponent 
              tName='AnalyticsOrderNo'
              isMultiline={false}
              maxRows={0}
              isDisabled={true}
              onChange={(field, value) => handleChange(field, value)}
              value={rowData?.AnalyticsOrderNo}
            />
          </Box>
        </Grid>

        <Grid item xs={8}
          sx={{
            fontFamily: 'Inter',
            fontWeight: '900',
            color: '#1C2C5A',
            fontSize: '15px'
          }}>
          Amount
        </Grid>
        <Grid item xs={11.5} sx={{marginLeft: '10px'}}>
          <Box display={'flex'}>
            <TextFieldComponent 
              tName='AnalyticsAmount'
              isMultiline={false}
              maxRows={0}
              isDisabled={true}
              onChange={(field, value) => handleChange(field, value)}
              value={rowData?.AnalyticsAmount}
            />
          </Box>
        </Grid>
        <Grid item xs={8}
          sx={{
            fontFamily: 'Inter',
            fontWeight: '900',
            color: '#1C2C5A',
            fontSize: '15px'
          }}>
          Dispute Reference Number
        </Grid>
        <Grid item xs={11.5} sx={{marginLeft: '10px'}}>
          <Box display={'flex'}>
            <TextFieldComponent 
              tName='DisputeReferenceNumber'
              isMultiline={false}
              maxRows={0}
              isDisabled={false}
              onChange={(field, value) => handleChange(field, value)}
            />
          </Box>
        </Grid>

        <Grid item xs={8}
          sx={{
            fontFamily: 'Inter',
            fontWeight: '900',
            color: '#1C2C5A',
            fontSize: '15px'
          }}>
          Dispute Amount *
        </Grid>
        <Grid item xs={11.5} sx={{marginLeft: '10px'}}>
          <Box display={'flex'}>
            <TextFieldComponent 
              tName='DisputeAmount'
              isMultiline={false}
              maxRows={0}
              isDisabled={false}
              onChange={(field, value) => handleChange(field, value)}
            />
          </Box>
        </Grid>
        <Grid item xs={8}
          sx={{
            fontFamily: 'Inter',
            fontWeight: '900',
            color: '#1C2C5A',
            fontSize: '15px'
          }}>
          Date Dispute Filed *
        </Grid>
        <Grid item xs={11.5} sx={{marginLeft: '10px'}}>
          <Box display={'flex'}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                inputFormat="dddd, MMMM DD, YYYY"
                disableMaskedInput
                value={currentDate}
                onChange={(value) => handleChange('DateDisputeFiled', value)}
                renderInput={(params: TextFieldProps) => (
                  <TextField
                    size="small"
                    {...params}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderRadius: '10px',
                          boxShadow: 'inset 1px 1px 1px -3px rgba(0,0,0,0.1), inset 1px 1px 8px 0px rgba(0,0,0,0.3)',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        color: '#1C2C5A',
                        backgroundColor: '#FFFFFF',
                        fontFamily: 'Inter',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        width: '418px',
                        borderRadius: '10px',
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid item xs={8}
          sx={{
            fontFamily: 'Inter',
            fontWeight: '900',
            color: '#1C2C5A',
            fontSize: '15px'
          }}>
          Description of Dispute
        </Grid>
        <Grid item xs={11.5} sx={{marginLeft: '10px'}}>
          <Box display={'flex'}>
            <TextFieldComponent 
              tName='DescriptionOfDispute'
              isMultiline={true}
              maxRows={4}
              isDisabled={false}
              onChange={(field, value) => handleChange(field, value)}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ForFilingDisputeFields;