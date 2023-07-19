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
import { message, Popconfirm } from 'antd';
import { connect } from "react-redux";
import {
    retrieveCruds,
    createCrud,
    updateCruds,
    deleteCruds
  } from "../actions/crud";
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";

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

    useEffect( () => {
        props.retrieveCruds();
        // console.log(props);
    }, [])
    useEffect(() => {
        setItem(props.cruds)
    }, [])
    const submitForm = (event) => {
        event.preventDefault();
        if(vform.action){
            updateData();
            return false;
        }
        props.createCrud(vform.title, vform.priority, vform.is_active, 71551).then((response) => {
            props.retrieveCruds();
            setOpen(false)
        });
    }
    const onChangeForm = (e) => {
        setvForm({...vform,[e.target.name]: e.target.value})
    }
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    const editForm = (data) => {
        setvForm({
            title: data.title,
            priority: data.priority,
            is_active: data.is_active,
            id: data.id,
            action: 'edit'
        })
        setOpen(true);
    }
    const updateData = async () => {
        const data = {
            title: vform.title,
            priority: vform.priority,
            is_active: vform.is_active,
            email: '4mir.rdn@gmail.com',
            activity_group_id: '71551'
        }
        props.updateCruds(vform.id, data).then(() => {
            setOpen(false)
            props.retrieveCruds();
        })
        console.log('ypda')
        
    }
    const confirm = (id) => {
        DropCrud(id);
        message.success('Click on Yes');
      };
      const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
      };
    const DropCrud = (id) => {
        props.deleteCruds(id).then(() => {
            props.retrieveCruds();
        })
    }
    return(<>
            <Button variant="outlined" className={classes.buttonright} onClick={handleClickOpen}>
                Create
            </Button>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {props.cruds && props.cruds.map((row) => (
                    <TableRow
                    key={row.title}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.title}
                    </TableCell>
                    <TableCell>{row.priority}</TableCell>
                    <TableCell>
                    <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        value={row.is_active}
                    >
                        <FormControlLabel value={1} control={<Radio />}  />
                    </RadioGroup>
                    </FormControl>
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
        <Dialog open={open} onClose={handleClose}>
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
                    vform && vform.action ? vform.title : 'Create New'
                }
            </DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                name="title"
                onChange={onChangeForm}
                defaultValue={vform === null ? '' : vform.title}
            />
             <FormControl fullWidth sx={{ m: 1 }} size="small">
                <InputLabel id="Priority-label">Priority</InputLabel>
            <Select
                labelId="priority-label"
                id="priority"
                label="Priority"
                onChange={onChangeForm}
                name='priority'
                value={vform === null ? '' : vform.priority}
            >
                <MenuItem  defaultValue={vform === null ? '' : vform.priority}>
                <em>None</em>
                </MenuItem>
                <MenuItem value='vary Hhgh'>Vary High</MenuItem>
                <MenuItem value='low'>Low</MenuItem>
                <MenuItem value='high'>High</MenuItem>
                <MenuItem value='medium'>Medium</MenuItem>
            </Select>
            </FormControl>
            <FormControl fullWidth>
            <FormLabel id="is-active-group-label">Gender</FormLabel>
            <RadioGroup
                aria-labelledby="is_active-group-label"
                defaultValue={vform === null ? 0 : vform.is_active}
                name="is_active"
                onChange={onChangeForm}
            >
                <FormControlLabel value={1} control={<Radio />} label="Active" />
                <FormControlLabel value={0} control={<Radio />} label="Non Active" />
            </RadioGroup>
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
        cruds: state.cruds.todo_items,
    };
  };
  
  export default connect(mapStateToProps, {
    retrieveCruds,
    deleteCruds,
    createCrud,
    updateCruds
  })(Dashboard);
