import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    value : [
        // BACKLOG
        { title: "Look into render bug in dashboard", id: "1", column: "backlog", assignedTo: "Achieng", dueDate: "2023-11-15" },
        { title: "SOX Compliance review", id: "2", column: "backlog", assignedTo: "Kiptoo", dueDate: "2023-12-01" },
        { title: "Plan upcoming marketing campaign", id: "3", column: "backlog", assignedTo: "Wafula", dueDate: "2023-11-20" },
        { title: "Prepare quarterly financial report", id: "4", column: "backlog", assignedTo: "Chebet", dueDate: "2023-11-30" },

        // TODO
        { title: "Fix navbar bug", id: "5", column: "todo", assignedTo: "Mwende", dueDate: "2023-11-18" },
        { title: "Update API documentation", id: "6", column: "todo", assignedTo: "Kamau", dueDate: "2023-11-25" },

        // IN PROGRESS
        { title: "Conduct user testing", id: "7", column: "doing", assignedTo: "Otieno", dueDate: "2023-11-22" },
        { title: "Develop new landing page", id: "8", column: "doing", assignedTo: "Njeri", dueDate: "2023-11-28" },

        // COMPLETE
        { title: "Launch new product feature", id: "9", column: "done", assignedTo: "Mwendwa", dueDate: "2023-11-10" },
        { title: "Complete performance review", id: "10", column: "done", assignedTo: "Simiyu", dueDate: "2023-11-12" },
      ]
}


const tasksSlice = createSlice({
    name:"tasks",
    initialState,
    reducers:{
        addTask(state,action){
            if(Array.isArray(action.payload)){
                state.value = action.payload
            }
            else{
                state.value.push(action.payload)
        }

            },
            
        deleteTask(state,action){
            state.value = state.value.filter((task)=>task.id !==action.payload)
        }
    }

})

export const {addTask,deleteTask} = tasksSlice.actions
export default tasksSlice.reducer 