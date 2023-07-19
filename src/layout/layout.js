import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect } from 'react';


import MenuAppBar from './appbar';
import Drawers from './drawer';
import Contents from './content';
import { useNavigate } from 'react-router-dom';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const Layouts = (props) => {
  const navigate = useNavigate();
  const drawerWidth = 240;
  const [open, setOpen] = React.useState(true);

  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open'
  })(
    ({
      theme,
      open
    }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );
  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if(localStorage.getItem('user') === null){
      navigate('/login')
    }
     // eslint-disable-next-line
  }, [props])
  return(
        <>
            <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MenuAppBar className='header-root' open={open} handleDrawerOpen={handleDrawerOpen} storage={props.stores}/>

      <Drawers open={open} handleDrawerClose={handleDrawerClose}/>
      <Main open={open}>
        <DrawerHeader />
        
        <Contents stores={props}/>
      </Main>
    </Box>
        </>
    )
}
export default Layouts;