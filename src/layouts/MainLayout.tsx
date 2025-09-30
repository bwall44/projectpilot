import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// ...existing code...
import Box from '@mui/material/Box';
import longCat from '../content/otherPhotos/longCat.png';
import PetsIcon from '@mui/icons-material/Pets';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/Projects' },
  { label: 'Cats', to: '/CatView' },
  { label: 'Squirrels', to: '/BackyardSquirrels' },
  { label: 'Cat Facts', to: '/CatFacts' },
];

const MainLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none', borderBottom: '1px solid #eee' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', minWidth: 120 }}>
            <IconButton
              edge="start"
              aria-label="open navigation"
              onClick={toggleDrawer(true)}
              size="large"
              sx={{ color: 'black' }}
            >
              {/* blue hamburger icon */}
              <span style={{ display: 'inline-block', lineHeight: 0 }} aria-hidden>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="6" width="18" height="2" fill="black" />
                  <rect x="3" y="11" width="18" height="2" fill="black" />
                  <rect x="3" y="16" width="18" height="2" fill="black" />
                </svg>
              </span>
            </IconButton>
          </div>

          {/* centered longCat image */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <img src={longCat} alt="long cat" style={{ maxHeight: 56, objectFit: 'contain' }} />
          </Box>

          <div style={{ minWidth: 120, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <IconButton component={Link} to="/" aria-label="home" sx={{ color: 'black' }}>
              <PetsIcon sx={{ color: 'black' }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }} onClick={toggleDrawer(false)}>
          {navItems.map((item) => (
            <ListItem key={item.to} disablePadding>
              <ListItemButton component={Link} to={item.to}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;