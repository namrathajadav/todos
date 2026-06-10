
import './App.css';
import React,{useState,useEffect} from 'react';
import Header from './Header/Header';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './Home/Home';
import Todos from './Todos/Todos';
import axios from 'axios';
import AddTodos from './Todos/AddTodos';
import DetailItem from './Todos/DetailItem';

function App() {
  var [todos,setTodos]=useState([]);

  
    useEffect(()=>{

      axios.get(`http://localhost:3001/todos`)
      .then((res)=>{
        return res.data
      }).then((data)=>{
        setTodos([...todos,...data])
      })

    },[])

    const filterHandler=(status)=>{
      var filteredTasks=[];
      axios.get(`http://localhost:3001/todos`)
      .then((res)=>{
        return res.data
      })
      .then((data)=>{
        filteredTasks=data.filter((task)=>{
          return task.completed == status
        });
        setTodos(filteredTasks);
      })
    }

    const showAllTasksHandler=()=>{

     
      axios.get(`http://localhost:3001/todos`)
      .then((res)=>{
        return res.data
      })
      .then((data)=>{
        setTodos(data);
      })

    }

    

  



  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/todos' element={<Todos todos={todos} filter={filterHandler} show={showAllTasksHandler}/>}/>
            <Route path='/add' element={<AddTodos />}/>
            <Route path='/detail/:id/:color' element={<DetailItem />}/>
          </Routes>

        </Router>
        
      </header>
    </div>
  );
}

export default App;
