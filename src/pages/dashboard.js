import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import useMediaQuery from '@mui/material/useMediaQuery';
import Checkbox from '@mui/material/Checkbox';
import { message, Popconfirm } from 'antd';
import { connect } from "react-redux";
import {
    retrieveCruds,
    createCrud,
    updateCruds,
    deleteCruds,
    deleteAllCrud
  } from "../actions/crud";
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from '@mui/material/styles';

const style = makeStyles({
    buttonright: {
      float: "right",
    },
    paddingRIghtbtn: {
        marginRight: '3px !important'
    }
  });
  
  const Dashboard = (props) => {
      const [items, setItem] = useState(null);
      const [vform, setvForm] = useState(null);
      const [open, setOpen] = useState(false);
      const classes = style();
      const theme = useTheme();
      const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect( () => {
        props.retrieveCruds();
        // console.log(props);
    }, [])
    useEffect(() => {
        setItem(props.cruds)
    }, [])
    const submitForm = async (event) => {
        event.preventDefault();
        if(vform.action){
            updateData();
            return false;
        }
        const data = {
            fullname: vform.fullname,
            gender: vform.gender,
            city: vform.city,
            address: vform.address,
            text: vform.address
        }
        await props.createCrud(data).then((response) => {
            props.retrieveCruds();
            setOpen(false)
        });
    }
    const onChangeForm = (e) => {
        setvForm({...vform,[e.target.name]: e.target.value})
    }
    const handleClickOpen = (val) => {
        if(val === 'create'){
            setvForm(null)
        }
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    const editForm = (data) => {
        setvForm({
            fullname: data.fullname,
            gender: data.gender,
            city: data.city,
            address: data.address,
            id: data.id,
            action: 'edit'
        })
        setOpen(true);
    }
    const updateData = async () => {
        const data = {
            fullname: vform.fullname,
            gender: vform.gender,
            city: vform.city,
            address: vform.address,
            text: vform.address
        }
        props.updateCruds(vform.id, data).then(() => {
            setOpen(false)
            props.retrieveCruds();
        })
        
    }
    const confirm = (id) => {
        DropCrud(id);
        message.success('Click on Yes');
      };
      const cancel = (e) => {
        message.error('Click on No');
      };
    const DropCrud = (id) => {
        props.deleteCruds(id).then(() => {
            props.retrieveCruds();
        })
    }
    const DeletedSelectedData = () => {
        props.deleteAllCrud(isCheck).then(() =>{
            props.retrieveCruds();
        })
    }
    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(props.cruds.data.map(li => li.id.toString()));
        if (isCheckAll) {
          setIsCheck([]);
        }
      };
    
      const handleClickCheck = e => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
          setIsCheck(isCheck.filter(item => item !== id));
        }
      };
    return(<>
            <div className={classes.buttonright}>
                <Button variant="outlined" className={classes.paddingRIghtbtn} onClick={(e) => DeletedSelectedData()}>
                    Delete
                </Button>&nbsp;
                <Button variant="outlined"  onClick={(e) => handleClickOpen('create')}>
                    Create
                </Button>

            </div>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                        <Checkbox
                        checked={isCheckAll}
                        onChange={handleSelectAll}
                        inputProps={{ 'aria-label': 'controlled' }}
                        />
                        </TableCell>
                        <TableCell>Fullname</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {props.cruds.data && props.cruds.data.map((row) => (
                    <TableRow
                    className={`${isCheck.includes(row.id.toString()) ? 'selected' : ''}`}
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            <Checkbox
                                name={row.id}
                                id={row.id}
                                key={row.id}
                                checked={isCheck.includes(row.id.toString())}
                                onChange={handleClickCheck}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </TableCell>
                    <TableCell component="th" scope="row">
                        {row.fullname}
                    </TableCell>
                    <TableCell>{row.gender === '1' ? 'Male' : 'Female'}</TableCell>
                    <TableCell>
                        {row.city}
                    </TableCell>
                    <TableCell>
                        {row.address}
                    </TableCell>
                    <TableCell>
                    <Button variant="outlined" className={classes.paddingRIghtbtn} onClick={(e) => editForm(row)}>
                        View
                    </Button>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={(e) => confirm(row.id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                    <Button variant="outlined">
                        Delete
                    </Button>

                    </Popconfirm>
                    </TableCell>

                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                }}
                noValidate
                autoComplete="off"
                onSubmit={submitForm}
            >
            <DialogTitle>
                {
                    vform && vform.action ? vform.fullname : 'Create New'
                }
            </DialogTitle>
            <DialogContent>
            <FormControl fullWidth>
            <TextField
                autoFocus
                margin="dense"
                id="fullname"
                label="Fullname"
                type="text"
                fullWidth
                variant="standard"
                name="fullname"
                onChange={onChangeForm}
                defaultValue={vform === null ? '' : vform.fullname}
            />
            </FormControl>
            <FormControl fullWidth>
                <FormLabel id="is-active-group-label">Gender</FormLabel>
                <RadioGroup
                    aria-labelledby="is_active-group-label"
                    defaultValue={vform === null ? 1 : vform.gender}
                    name="gender"
                    onChange={onChangeForm}
                >
                    <FormControlLabel value={1} control={<Radio />} label="Male" />
                    <FormControlLabel value={2} control={<Radio />} label="Female" />
                </RadioGroup>
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    autoFocus
                    margin="dense"
                    id="city"
                    label="City"
                    type="text"
                    fullWidth
                    variant="standard"
                    name="city"
                    onChange={onChangeForm}
                    defaultValue={vform === null ? '' : vform.city}
                />
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    margin="dense"
                    id="addressl"
                    label="Address"
                    type="text"
                    fullWidth
                    variant="standard"
                    name="address"
                    multiline
                    rows={2}
                    maxRows={4}
                    onChange={onChangeForm}
                    defaultValue={vform === null ? '' : vform.address}
                />
            </FormControl>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>
                {
                    vform && vform.action ? 'Update' : 'Submit'
                }
            </Button>
            </DialogActions>
            </Box>
        </Dialog>
    </>)
}
const mapStateToProps = (state) => {
    return {
        cruds: state.cruds,
    };
  };
  
  export default connect(mapStateToProps, {
    retrieveCruds,
    deleteCruds,
    createCrud,
    updateCruds,
    deleteAllCrud
  })(Dashboard);
