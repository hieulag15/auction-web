import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Avatar,
  Paper,
  Link,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TextFieldComponent from '~/components/TextFieldComponent/TextFieldComponent';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 1200,
  margin: '0 auto',
  marginTop: theme.spacing(4),
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const StyledSelect = styled(Select)(({ theme }) => ({
  bgcolor: theme.palette.primary.secondary,
  color: theme.palette.text.secondary,
  minWidth: 120,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.border
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.borderHover
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.borderFocus
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  '& .MuiRadio-root': {
    '&.Mui-checked': {
      color: '#b41712',
    },
  },
}));

const CustomerInformation = () => {
  const [gender, setGender] = useState('Nam');
  const [avatarUrl, setAvatarUrl] = useState('/placeholder.svg?height=180&width=180');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Generate arrays for day, month, year options
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        setErrorMessage('Kích thước file vượt quá 1MB');
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setErrorMessage('Chỉ chấp nhận file JPEG hoặc PNG');
        return;
      }
      setErrorMessage('');
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
    color: theme.palette.text.primary,
    '&.Mui-focused': {
      color: theme.palette.text.primary,
    },
  }));

  return (
    <StyledPaper elevation={0}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Hồ Sơ Của Tôi
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </Typography>

          <Box component="form" sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextFieldComponent
                  fullWidth
                  label="Tên đăng nhập"
                  value="lenguyenbao07"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextFieldComponent
                  fullWidth
                  label="Tên"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextFieldComponent
                  fullWidth
                  label="Email"
                  value="ba*********@gmail.com"
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Link underline='none' href='/' sx={{ ml: 1, color: '#b41712' }}>
                          Thay Đổi
                        </Link>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextFieldComponent
                  fullWidth
                  label="Số điện thoại"
                  value="********27"
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Link href="#" underline="none" sx={{ ml: 1, color: '#b41712' }}>
                          Thay Đổi
                        </Link>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <StyledFormLabel component="legend">Giới tính</StyledFormLabel>
                  <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)}>
                    <StyledFormControlLabel value="Nam" control={<Radio />} label="Nam" />
                    <StyledFormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                    <StyledFormControlLabel value="Khác" control={<Radio />} label="Khác" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormLabel component="legend">Ngày sinh</FormLabel>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={4}>
                    <StyledSelect fullWidth defaultValue="" displayEmpty>
                      <MenuItem value="" disabled>Ngày</MenuItem>
                      {days.map(day => (
                        <MenuItem key={day} value={day}>{day}</MenuItem>
                      ))}
                    </StyledSelect>
                  </Grid>
                  <Grid item xs={4}>
                    <StyledSelect fullWidth defaultValue="" displayEmpty>
                      <MenuItem value="" disabled>Tháng</MenuItem>
                      {months.map(month => (
                        <MenuItem key={month} value={month}>{month}</MenuItem>
                      ))}
                    </StyledSelect>
                  </Grid>
                  <Grid item xs={4}>
                    <StyledSelect fullWidth defaultValue="" displayEmpty>
                      <MenuItem value="" disabled>Năm</MenuItem>
                      {years.map(year => (
                        <MenuItem key={year} value={year}>{year}</MenuItem>
                      ))}
                    </StyledSelect>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{ width: 180, height: 180 }}
              src={avatarUrl}
            />
            <Button
              component="label"
              variant="outlined"
              sx={{ mt: 2, color: '#b41712', borderColor: '#b41712' }}
            >
              Chọn Ảnh
              <VisuallyHiddenInput type="file" accept="image/jpeg,image/png" onChange={handleImageUpload} />
            </Button>
            {errorMessage && (
              <Typography color="error" variant="caption">
                {errorMessage}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              Dung lượng file tối đa 1 MB
              <br />
              Định dạng: JPEG, PNG
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#b41712',
                color: 'white',
                px: 4,
                '&:hover': {
                  bgcolor: '#8B0000',
                },
              }}
            >
              Lưu
            </Button>
          </Box>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default CustomerInformation;