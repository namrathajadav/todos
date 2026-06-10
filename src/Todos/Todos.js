import React,{useState,useEffect} from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import todos from './Todos.css';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height:400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const style3 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height:200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

    

const Todos=(props)=>{

    const navigate=useNavigate()

    const [open1,setOpen1]=useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3,setOpen3]=useState(false)

    const [userId,setUserId]=useState();
    const [taskName,setTaskName]=useState();
    const [taskStatus,setTaskStatus] =useState();


    const openModalHandler=()=>{
        setOpen1(true);
    }

    const openModal2Handler=()=>{
        setOpen1(false);
        setOpen2(true);
    }

    const handleClose1=()=>{
        setOpen1(false);
    }

    const handleClose2=()=>{
        setOpen2(false);
    }

    const handleClose3=()=>{
        setOpen3(false)
    }

    const addTaskSuccessHandler=()=>{
        setOpen3(false)
         window.location.reload(true);
    }

    const userIdChangeHandler=(e)=>{
        setUserId(e.target.value);
    }

    const taskNameChangeHandler=(e)=>{
        setTaskName(e.target.value);
    }

    const taskStatusChangeHandler=(e)=>{
        if(e.target.value == 'Completed'){
            setTaskStatus(true)
        }
        else if(e.target.value == 'In Completed'){
            setTaskStatus(false)
        }
        
    }

    const addNewTaskHandler=()=>{

        const taskItem={
            id:Math.random(),
            todo:taskName,
            completed:taskStatus,
            userId
        }

        axios.post(`http://localhost:3001/todos`,taskItem)
        .then((res)=>{
           handleClose2();
           setOpen3(true);
          
        })
    }

    const detailTaskHandler=(id,color)=>{
        console.log(id+" "+color);
        navigate(`../detail/${id}/${color}`);
    }

    

    const filterTasksHandler=(status)=>{
       props.filter(status);
    }

    const showAllTasks=()=>{
        props.show();
    }


    
    return(
        <>

        <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
         
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h4 style={{color:'purple'}}>Add New Task</h4>
            <TextField id='userId' label='User Id' variant='outlined' value={userId}
            onChange={userIdChangeHandler}
             style={{width:'100%',marginBottom:'15px'}}/><br/>
            
            <TextField id='taskName' label='Task Name' variant='outlined' value={taskName}
            onChange={taskNameChangeHandler}
             style={{width:'100%',marginBottom:'15px'}}/><br/>

             <InputLabel id="demo-simple-select-label"> Task Status</InputLabel>
        <Select style={{width:'100%',marginBottom:'15px'}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={taskStatus}
          onChange={taskStatusChangeHandler}
          label="Task Status"
        >
          <MenuItem value='Completed'>Completed</MenuItem>
          <MenuItem value='In Completed'>In Completed</MenuItem>
        </Select>
        <p style={{textAlign:'right'}}>
        <Button variant='contained' color='error' style={{marginRight:'10px'}} onClick={handleClose1}>Cancel</Button>
            <Button variant='contained' color='success' onClick={openModal2Handler}>Save Task</Button>
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
        <Box sx={style3}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h4 style={{color:'red'}}>Add Task Confirmation</h4>
            Are You sure want to add the task " {taskName} " ?
        <p style={{textAlign:'right'}}>
        <Button variant='contained' color='error' style={{marginRight:'10px'}} onClick={handleClose2}>No</Button>
            <Button variant='contained' color='success' onClick={addNewTaskHandler}>Yes</Button>
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
        <Box sx={style3}>
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h4 style={{color:'green'}}>Added Task Successfully</h4>
            The Task " {taskName} " added Successfully .
        <p style={{textAlign:'right'}}>
        <Button variant='contained' color='error' style={{marginRight:'10px'}} onClick={handleClose3}>Cancel</Button>
            <Button variant='contained' color='success' onClick={addTaskSuccessHandler}>Ok</Button>
            </p>
          </Typography>
        </Box>
      </Modal>
        
        <ul className='lists'>
            <span >
           <p>Tasks</p>
            
            
            <Button variant='contained' color='primary' onClick={openModalHandler} style={{marginRight:'10px'}}>Add New Task</Button>
            <Button variant='contained' color='warning' style={{marginRight:'10px'}} onClick={()=>showAllTasks()}>All Tasks</Button>
            <Button variant='contained' color='success' style={{marginRight:'10px'}} onClick={()=>filterTasksHandler(true)}>Completed Tasks</Button>
            <Button variant='contained' color='error' onClick={()=>filterTasksHandler(false)}>In Completed Tasks</Button>
        
           </span>
        {
            props.todos.map((task)=>{
                return <TodoItem  taskId={task.id} status={task.completed} detail={detailTaskHandler}
                taskName={task.todo} userid={task.userId}/>
            })

        }
        </ul>
        </>
    )
}

export default Todos;