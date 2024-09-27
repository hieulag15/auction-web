import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import MuiAppBar from '@mui/material/AppBar'
import { useLogout } from '~/hooks/auth'
import { useAppStore } from '~/store/appStore'
import { useNavigate } from 'react-router-dom'
import ModeSelect from '~/components/ModeSelectComponent/ModeSelect'
import { StyledIconButton } from './style'

const AppBar = styled(MuiAppBar, {
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1
}))

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const updateOpen = useAppStore((state) => state.updateOpen)
  const dopen = useAppStore((state) => state.dopen)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const navigate = useNavigate()
  const { mutate: logout, isLoading: isLoggingOut } = useLogout()

  const handleLogout = () => {
    logout(null, {
      onSuccess: () => {
        handleMenuClose()
        navigate('/authentication')
      },
      onError: (error) => {
        console.error('Error logging out:', error)
      }
    })
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={(theme) => ({ bgcolor: theme.palette.primary.main })}>
        <Toolbar>
          <StyledIconButton
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => updateOpen(!dopen)}
          >
            <MenuIcon />
          </StyledIconButton>
          <ModeSelect />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <StyledIconButton size="large" aria-label="show 4 new mails">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </StyledIconButton>
            <StyledIconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </StyledIconButton>
            <StyledIconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </StyledIconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <StyledIconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </StyledIconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  )
}