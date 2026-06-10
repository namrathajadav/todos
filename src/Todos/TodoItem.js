import React,{useEffect} from "react";
import item from './TodoItem.css';
import useGenerateRandomColor from "./useGenerateRandomColor";
import Card from "../Card/Card";
import Button from "@mui/material/Button";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const TodoItem=(props)=>{

    var buttonName;


    if(props.status == true){
        buttonName=<p style={{textAlign:'right',marginTop:'-3px'}}>
            <Button  variant='contained' color='success' >Completed</Button>
            </p>
    }else if(props.status == false){
        buttonName=<p style={{textAlign:'right',marginTop:'-3px'}}>
        <Button variant='contained' color='error'>In Completed</Button>
        </p>
    }

    const { color, generateColor } =
        useGenerateRandomColor();

    useEffect(()=>{
            generateColor()
    },[])

    const detailHandler=()=>{
       props.detail(props.taskId,color);

    }


    return(
        <Card style={{backgroundColor:`#${color}`}} onClick={detailHandler}>
        <li className="list-item">
            {props.taskName} <br/>
              {buttonName}
             
        </li>
        </Card>

    )
}

export default TodoItem;