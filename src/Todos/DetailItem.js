import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import detail from './DetailItem.css';
import Button from '@mui/material/Button';
import { FaPlus } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DetailItem=()=>{

    const params=useParams();
    const navigate=useNavigate();

    const id=params.id;
    const color=params.color;
    var button1;

    const [open,setOpen]= useState(false);

    const [open2,setOpen2]=useState(false);

    const [open3,setOpen3]=useState(false);

    const [open4,setOpen4]=useState(false);
    const [open5,setOpen5]=useState(false);

    const [open6,setOpen6]=useState(false);
    const [open7,setOpen7]=useState(false);
    const [open8,setOpen8]=useState(false);

    const [open9,setOpen9]=useState(false);

    const [open10,setOpen10]=useState(false);

    const [open11,setOpen11]=useState(false);

    const handleClose=()=>{
        setOpen(false)

    }

    const handleClose2=()=>{
        setOpen2(false);
    }

    const handleClose3=()=>{
        setOpen3(false)
    }

    const handleClose4=()=>{
        setOpen4(false);
    }
    const handleClose5=()=>{
        setOpen5(false);
    }

    const handleClose6=()=>{
        setOpen6(false);
    }

    const handleClose7=()=>{
        setOpen7(false);
    }

    const handleClose8=()=>{
        setOpen8(false);
    }

    const handleClose9=()=>{
      setOpen9(false)
    }

    const handleClose10=()=>{
      setOpen10(false);
    }

    const handleClose11=()=>{
      setOpen11(false);
    }

    var [taskId,setTaskId]=useState();
    var [taskName,setTaskName]=useState();
    var [taskStatus,setTaskStatus]=useState();
    var [userId,setUserId]=useState();

    /* states for add task*/
    var [addTaskName,setAddTaskName]=useState('');
    var [addTaskStatus,setAddTaskStatus]=useState('');
    var [addUserId,setAddUserId]=useState('');


    useEffect(()=>{
        axios.get(`http://localhost:3001/todos/${id}`)
        .then((res)=>{
            return res.data

        }).then((data)=>{
           setTaskId(data.id);
           setTaskName(data.todo);
           setTaskStatus(data.completed);
           setUserId(data.userId)
        })

    },[]);

    const openDeleteHandler=()=>{
        setOpen(true)

    }

    const openEditHandler=()=>{
        setOpen3(true);

    }

    const taskStatusChangeHandler=(e)=>{
        if(e.target.value == 'Completed'){
            setTaskStatus(true)
        }else if(e.target.value == 'In Completed'){
            setTaskStatus(false); 
        }
    }

    const addTaskStatusChangeHandler=(e)=>{
      if(e.target.value == 'Completed'){
        setAddTaskStatus(true)
      }else if(e.target.value == 'In Completed'){
        setAddTaskStatus(false)
      }
    }

    const updateTaskHandler=()=>{
        // setOpen4(false);
        const taskItem={
            id:taskId,
            todo:taskName,
            completed:taskStatus,
            userId
        };
        axios.put(`http://localhost:3001/todos/${taskItem.id}`,taskItem)
        .then((res)=>{
            if(res.status== 200){
               setOpen4(false);
               setOpen5(true)
            }
        })
    }

    const updateTasks=()=>{
        setOpen5(false);
        window.location.reload(true);
    }


    const deleteHandler=()=>{
         setOpen(false);
         axios.delete(`http://localhost:3001/todos/${taskId}`)
         .then((res)=>{
            if(res.status == 200){
              setOpen2(true);
            }
         })
    }

    const deleteSuccessHandler=()=>{
        setOpen2(false);
        navigate('../todos');
        window.location.reload(true);
    }

    const editTaskHandler=()=>{
        setOpen3(false);
        setOpen4(true);
    }

    const closeAddTaskHandler=()=>{
      setOpen11(false);
      navigate('../todos');
      window.location.reload(true);
    }


    const openStatusChangeModal=()=>{
        setOpen6(true);
    }

    const openAddTaskModal=()=>{
      setOpen9(false);
      setOpen10(true);
    }

    const statusChangeHandler=()=>{
        setOpen6(false);
        setOpen7(true);
    }

    const updateTaskStatusHandler=()=>{
        // setOpen7(false);
          
        const taskItem={
            id:taskId,
            todo:taskName,
            completed:taskStatus,
            userId:userId
        }
        axios.put(`http://localhost:3001/todos/${taskId}`,taskItem)
        .then((res)=>{
            if(res.status == 200){
                setOpen7(false);
                setOpen8(true);
            }
        })
    }

    const saveAddTaskHandler=()=>{
      // setOpen10(false)
      const taskItem={
        id:Math.random(),
        todo:addTaskName,
        completed:addTaskStatus,
        userId:addUserId
      };
      axios.post(`http://localhost:3001/todos`,taskItem)
      .then((res)=>{
        if(res.status == 201){
           setOpen10(false);
           setOpen11(true);
        }
      })
    }

    const closeStatusModal=()=>{
        setOpen8(false);
        window.location.reload(true);
    }

    const openAddModalHandler=()=>{
      setOpen9(true)

    }

    if(taskStatus==true){
        button1= <Button variant='contained' color='success' size='large' style={{marginBottom:'10px'}}>Completed</Button>
    }
    else if(taskStatus==false){
        button1 =<Button variant='contained' color='error' size='large' style={{marginBottom:'10px'}}>In Completed</Button>
    }

    return(
        <>

       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h3 style={{color:'red'}}>Delete Task Confirmation</h3>
            Are You sure want to delete the task " {taskName} " ?
        <p style={{textAlign:'right'}}>
        <Button variant='contained' color='error' style={{marginRight:'10px'}} onClick={handleClose}>No</Button>
            <Button variant='contained' color='success' onClick={deleteHandler}>Yes</Button>
            </p>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h3 style={{color:'green'}}>Successfully Deleted Task</h3>
            The task " {taskName} " deleted Successfully .
        <p style={{textAlign:'right'}}>
        <Button variant='contained' color='error' style={{marginRight:'10px'}} onClick={handleClose2}>No</Button>
            <Button variant='contained' color='success' onClick={deleteSuccessHandler}>Yes</Button>
            </p>
          </Typography>
        </Box>
      </Modal>

       <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h3 style={{color:'warning',fontWeight:'bold'}}>Edit Task Confirmation</h3>
             Are you sure want to edit the task " {taskName} " ?
        <p style={{textAlign:'right'}}>
        <Button variant='contained' color='error' style={{marginRight:'10px'}} onClick={handleClose3}>No</Button>
            <Button variant='contained' color='warning' onClick={editTaskHandler}>Yes</Button>
            </p>
          </Typography>
        </Box>
      </Modal>
      
      <Modal
        open={open4}
        onClose={handleClose4}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h3 style={{color:'purple'}}>Edit Task</h3>
            <TextField id='taskId' label='Task Id' variant='outlined' value={taskId}
             style={{width:'100%',marginBottom:'15px'}} disabled/><br/>
             
             <TextField id='userId' label='User Id' variant='outlined' value={userId}
             style={{width:'100%',marginBottom:'15px'}} disabled/><br/>
            
            <TextField id='taskName' label='Task Name' variant='outlined' value={taskName}
             onChange={(e)=>setTaskName(e.target.value)}
             style={{width:'100%',marginBottom:'15px'}}/><br/>
             
             <InputLabel id="demo-simple-select-label"> Task Status</InputLabel>
        <Select style={{width:'100%',marginBottom:'15px'}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={taskStatus ?'Completed':'In Completed'}
          label="Task Status"
         onChange={taskStatusChangeHandler}
        >
          <MenuItem value='Completed'>Completed</MenuItem>
          <MenuItem value='In Completed'>In Completed</MenuItem>
        </Select>
        <p style={{textAlign:'right'}}>
        <Button variant='contained' color='error' style={{marginRight:'10px'}} onClick={handleClose4}>Cancel</Button>
            <Button variant='contained' color='warning' onClick={updateTaskHandler}>Update Task</Button>
            </p>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={open5}
        onClose={handleClose5}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h3 style={{color:'purple'}}>Updated Task Successfully</h3>
           The task " {taskName} " updated Successfully .
        <p style={{textAlign:'right'}}>
        <Button variant='contained' color='error' style={{marginRight:'10px'}} onClick={handleClose5}>Cancel</Button>
            <Button variant='contained' color='success' onClick={updateTasks}>Ok</Button>
            </p>
          </Typography>
        </Box>
      </Modal>

        <Modal
        open={open6}
        onClose={handleClose6}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h3 style={{color:'purple'}}>Task Status Change Confirmation</h3>
          Are you sure want to change the status of the task " {taskName} " ?
        <p style={{textAlign:'right'}}>
        <Button variant='contained' color='error' style={{marginRight:'10px'}} onClick={handleClose6}>No</Button>
            <Button variant='contained' color='success' onClick={statusChangeHandler}>Yes</Button>
            </p>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={open7}
        onClose={handleClose7}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h3 style={{color:'purple'}}>Change Task Status</h3>
            <TextField id='taskId' label='Task Id' variant='outlined' value={taskId}
             style={{width:'100%',marginBottom:'15px'}} disabled/><br/>
             
             <TextField id='userId' label='User Id' variant='outlined' value={userId}
             style={{width:'100%',marginBottom:'15px'}} disabled/><br/>
            
            <TextField id='taskName' label='Task Name' variant='outlined' value={taskName}
             style={{width:'100%',marginBottom:'15px'}} disabled/><br/>
             
             <InputLabel id="demo-simple-select-label"> Task Status</InputLabel>
        <Select style={{width:'100%',marginBottom:'15px'}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={taskStatus ?'Completed':'In Completed'}
          label="Task Status"
         onChange={taskStatusChangeHandler}
        >
          <MenuItem value='Completed'>Completed</MenuItem>
          <MenuItem value='In Completed'>In Completed</MenuItem>
        </Select>
        <p style={{textAlign:'right'}}>
        <Button variant='contained' color='error' style={{marginRight:'10px'}} onClick={handleClose7}>Cancel</Button>
            <Button variant='contained' color='success' onClick={updateTaskStatusHandler}>Update Task Status</Button>
            </p>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={open8}
        onClose={handleClose8}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h3 style={{color:'green'}}> Task Status Changed Successfully</h3>
            The Status of the task " {taskName} " changed Successfully .
        <p style={{textAlign:'right'}}>
        <Button variant='contained' color='error' style={{marginRight:'10px'}} onClick={handleClose8}>Cancel</Button>
            <Button variant='contained' color='success' onClick={closeStatusModal}>Ok</Button>
            </p>
          </Typography>
        </Box>
      </Modal>

    
     <Modal
        open={open9}
        onClose={handleClose9}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h3 style={{color:'purple'}}>Add Task </h3>
             
             <TextField id='userId' label='User Id' variant='outlined' value={addUserId}
             onChange={(e)=>setAddUserId(e.target.value)}
             style={{width:'100%',marginBottom:'15px'}} /><br/>
            
            <TextField id='taskName' label='Task Name' variant='outlined' value={addTaskName}
            onChange={(e)=>setAddTaskName(e.target.value)}
             style={{width:'100%',marginBottom:'15px'}} /><br/>
             
             <InputLabel id="demo-simple-select-label"> Task Status</InputLabel>
        <Select style={{width:'100%',marginBottom:'15px'}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Task Status"
          value={addTaskStatus?'Completed':'In Completed'}
          onChange={addTaskStatusChangeHandler}
        >
          <MenuItem value='default'></MenuItem>
          <MenuItem value='Completed'>Completed</MenuItem>
          <MenuItem value='In Completed'>In Completed</MenuItem>
        </Select>
        <p style={{textAlign:'right'}}>
        <Button variant='contained' color='error' style={{marginRight:'10px'}} onClick={handleClose9}>Cancel</Button>
            <Button variant='contained' color='success' onClick={openAddTaskModal} >Save Task</Button>
            </p>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={open10}
        onClose={handleClose10}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h3 style={{color:'green'}}> Add Task Confirmation</h3>
            Are you sure want to add the task " {addTaskName} " ?
        <p style={{textAlign:'right'}}>
        <Button variant='contained' color='error' style={{marginRight:'10px'}} onClick={handleClose10}>No</Button>
            <Button variant='contained' color='success' onClick={saveAddTaskHandler}>Yes</Button>
            </p>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={open11}
        onClose={handleClose11}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h3 style={{color:'green'}}>Successfully Added the Task</h3>
            The task " {addTaskName} " added successfully .
        <p style={{textAlign:'right'}}>
        <Button variant='contained' color='error' style={{marginRight:'10px'}} onClick={handleClose11}>Cancel</Button>
            <Button variant='contained' color='success' onClick={closeAddTaskHandler}>Ok</Button>
            </p>
          </Typography>
        </Box>
      </Modal>



        <div style={{backgroundColor:`#${color}`,width:'100%',height:'700px',textAlign:'center'}}>
           <h2>{taskName}</h2>
            {button1}<br/>
            <span style={{color:'white'}}>User Id : {userId}</span>

             <div style={{marginTop:'200px'}}>
            <p style={{textAlign:'right',marginRight:'10px'}}>
                 <Button variant='contained' color='success' size='large' style={{marginRight:'5px'}}
                 onClick={openAddModalHandler}>
                <FaPlus style={{marginRight:'5px'}}/>
                Add Task
            </Button>
            <Button variant='contained' color='primary' size='large' style={{marginRight:'5px'}}
             onClick={openEditHandler}>
                <FaEdit style={{marginRight:'5px'}}/>
                Edit Task
            </Button>
            <Button variant='contained' color='warning' size='large' style={{marginRight:'5px'}}
              onClick={openStatusChangeModal}>
                <FaExchangeAlt style={{marginRight:'5px'}}/>
                Change status
            </Button>
            <Button variant='contained' color='error' size='large' onClick={openDeleteHandler}>
                <FaTrash style={{marginRight:'5px'}}/>
                Delete Task
            </Button>
            </p>
        </div>
        </div>
       
        </>
    )
}

export default DetailItem;