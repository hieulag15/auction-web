import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Phone, Person } from '@mui/icons-material';
import Logo from '~/assets/images/logo/logo.png';
import { useGetToken, useRegister } from '~/hooks/authHook';
import { fadeIn, StyledButton, LogoContainer, StyledTextField } from './style';
import { validateLogin } from '~/utils/validateLogin';
import { validateRegister } from '~/utils/validateRegister'; 
export default function AuthForm({ handleClose }) {
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '', saveLogin: false });
  const [registerData, setRegisterData] = useState({ username: '', phone: '', email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});

  const { mutate: getToken, isLoading: isGettingToken } = useGetToken();
  const { mutate: register, isLoading: isRegistering } = useRegister();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = validateLogin(loginData);
    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }

    getToken(
      { email: loginData.email, password: loginData.password },
      {
        onSuccess: () => {
          handleClose();
        },
        onError: (error) => {
          console.error('Error logging in:', error);
        },
      }
    );
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const errors = validateRegister(registerData); // Validate registration data
    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors); // Set registration errors
      return;
    }

    register(registerData, {
      onSuccess: () => {
        handleClose();
      },
      onError: (error) => {
        console.error('Error registering:', error);
      },
    });
  };

  const handleLoginChange = (e) => {
    const { name, value, checked } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: name === 'saveLogin' ? checked : value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputFocus = (field) => {
    setLoginErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
    setRegisterErrors({}); // Hide all errors when focusing on any field in register form
  };

  return (
    <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 4 }}>
        <LogoContainer
          elevation={3}
          sx={{
            width: { xs: 100, md: 120, lg: 140 },
            height: { xs: 100, md: 120, lg: 140 },
          }}
        >
          <Box component="img" src={Logo} alt="Logo" sx={{ width: '180%' }} />
        </LogoContainer>
        <Typography
          variant="h4"
          sx={{
            color: '#B7201B',
            fontWeight: 'bold',
            fontSize: { xs: '24px', md: '28px', lg: '32px' },
            letterSpacing: '1px',
          }}
        >
          Auction BIDMASTER
        </Typography>
      </Box>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          mb: 3,
          '& .MuiTab-root': {
            color: '#B7201B',
            '&.Mui-selected': {
              color: '#B7201B',
              fontWeight: 'bold',
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#B7201B',
          },
        }}
      >
        <Tab label="Đăng nhập" />
        <Tab label="Đăng ký" />
      </Tabs>

      {activeTab === 0 && (
        <Box component="form" onSubmit={handleLoginSubmit}>
          <StyledTextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={loginData.email}
            onChange={handleLoginChange}
            onFocus={() => handleInputFocus('email')}
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
            error={!!loginErrors.email}
            helperText={loginErrors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: 'action.active' }} />
                </InputAdornment>
              ),
            }}
          />

          <StyledTextField
            fullWidth
            label="Mật khẩu"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={loginData.password}
            onChange={handleLoginChange}
            onFocus={() => handleInputFocus('password')}
            margin="normal"
            variant="outlined"
            sx={{ mb: 3 }}
            error={!!loginErrors.password}
            helperText={loginErrors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: 'action.active' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="saveLogin"
                  checked={loginData.saveLogin}
                  onChange={handleLoginChange}
                  sx={{
                    color: '#B7201B',
                    '&.Mui-checked': {
                      color: '#B7201B',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: '14px' }}>
                  Ghi nhớ đăng nhập
                </Typography>
              }
            />
            <Typography
              component="span"
              sx={{
                color: '#B7201B',
                fontWeight: 'bold',
                fontSize: '14px',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#6C1B19',
                },
              }}
            >
              Quên mật khẩu?
            </Typography>
          </Box>

          <StyledButton
            type="submit"
            fullWidth
            size="large"
            sx={{
              height: '50px',
            }}
          >
            Đăng nhập
          </StyledButton>
        </Box>
      )}

      {activeTab === 1 && (
        <Box component="form" onSubmit={handleRegisterSubmit}>
          <StyledTextField
            fullWidth
            label="Tên đăng nhập"
            name="username"
            type="text"
            value={registerData.username}
            onChange={handleRegisterChange}
            onFocus={() => handleInputFocus('username')}  // Focus event added here
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
            error={!!registerErrors.username}
            helperText={registerErrors.username}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: 'action.active' }} />
                </InputAdornment>
              ),
            }}
          />

          <StyledTextField
            fullWidth
            label="Số điện thoại"
            name="phone"
            type="text"
            value={registerData.phone}
            onChange={handleRegisterChange}
            onFocus={() => handleInputFocus('phone')}  // Focus event added here
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
            error={!!registerErrors.phone}
            helperText={registerErrors.phone}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone sx={{ color: 'action.active' }} />
                </InputAdornment>
              ),
            }}
          />

          <StyledTextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={registerData.email}
            onChange={handleRegisterChange}
            onFocus={() => handleInputFocus('email')}  // Focus event added here
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
            error={!!registerErrors.email}
            helperText={registerErrors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: 'action.active' }} />
                </InputAdornment>
              ),
            }}
          />

          <StyledTextField
            fullWidth
            label="Mật khẩu"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={registerData.password}
            onChange={handleRegisterChange}
            onFocus={() => handleInputFocus('password')}  // Focus event added here
            margin="normal"
            variant="outlined"
            sx={{ mb: 3 }}
            error={!!registerErrors.password}
            helperText={registerErrors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: 'action.active' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <StyledButton
            type="submit"
            fullWidth
            size="large"
            sx={{
              height: '50px',
            }}
          >
            Đăng ký
          </StyledButton>
        </Box>
      )}
    </Box>
  );
}
