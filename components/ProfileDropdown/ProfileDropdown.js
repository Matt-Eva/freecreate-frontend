import styles from "./ProfileDropdown.module.css"
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from "@mui/material/IconButton";
import {useState} from 'react'

function ProfileDropdown() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)

  const openMenu = (e)=>{
    setAnchorEl(e.target)
    setOpen(true)
  }
  
  const closeMenu=(e) =>{
    setAnchorEl(null)
    setOpen(false)
  }

  return (
    <div className={styles.profileDropdown}>
        <IconButton onClick={openMenu} ><AccountCircleIcon /></IconButton>
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={closeMenu}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 5,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>Test</MenuItem>
        </Menu>
    </div>
  )
}

export default ProfileDropdown