const notesInitialState = []

const notesReducer = (state=notesInitialState,action)=>{
    switch(action.type) {
       case "GET_NOTES" :{
           return [...action.payload]
       }
        default : {
            return state
        }
    }
}

export default notesReducer
