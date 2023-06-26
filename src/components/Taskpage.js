import React,{useState} from 'react';
import Tasklist from './Tasklist';

import "./taskpage.css"
const TASK_STATUSES = ["Unstarted","In Progress", "Completed"]

function Taskpage(props) {

    const [cardForm,showCardForm] = useState(false);
    const [title,setTtile]= useState("");
    const [description,setDescription] = useState("");
    const [dueDate,setDueDate]=useState("")
    const onChangeTitle = (e) =>{
        setTtile(e.target.value)
    }

    const onDescriptionChange = (e) =>{
    setDescription(e.target.value);
    }

    const onDuedateChange = (e) =>{
        setDueDate(e.target.value);
        }

    const formToggler = ()=>{
        showCardForm(!cardForm)
    }

    const resetForm = () =>{
        setTtile("");
        setDescription("");
        setDueDate("");
        showCardForm(false);
    }

    const onCreateTask = (e) =>{
        e.preventDefault();
        props.OnCreateTask({
            title,
            description,
            dueDate
        })
        resetForm();
    }

    const renderTaskLists = () =>{
        const {tasks} = props;
        return TASK_STATUSES.map((status,id)=>{
            const statusTasks = tasks.filter((task) => task.status === status);
            console.log("target",statusTasks);
            return (
                <div className='col-md-3 card m-2 p-0' key={id}>
            
            
                <Tasklist key={status} 
                status={status}
                tasks={statusTasks}
                onStatusChange={props.onStatusChange}
                onRemoveTask={props.onRemoveTask}
                />

                </div>
            )
        })
    }

    return (

        <div className='container my-5'>
           <div className='jumbotron py-3 bg-light px-3'>
            <div className='row'>
             <div className='col-md-2'>
                <button className='btn btn-success m-3' onClick={formToggler}>+</button>
             </div>
             <div className='col-md-10'>
                <h2 className='display-4 text-center text-uppercase'>To do list</h2>
             </div>
            </div>
            {cardForm && (
            <form onSubmit={onCreateTask}>
             <div className='form-group my-2'>
               <input type="text" className='form-control' required placeholder='Task title' onChange={onChangeTitle}/> 
            </div> 
            <div className='form-group'>
            <textarea type="text" className='form-control' required placeholder="Task Description" onChange={onDescriptionChange}>
            </textarea>
            </div>  
            <div className='form-group my-2'>
               <p className='form-group mx-2'>select due date</p>
            <input type="date" className='form-control' style={{width:"15rem"}} required placeholder="due date" onChange={onDuedateChange}/>
            {/* </textarea> */}
            </div> 
            <button type="submit" className='btn btn-primary my-2'>Submit</button>
            </form>)}
            </div> 
            <div className='row d-flex justify-content-center position-relative flex-row' 
            style={{background:"#e9ecef"}}>{renderTaskLists()}</div>
        </div>

      
    );
};

export default Taskpage;
