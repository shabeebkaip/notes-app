const categoryInitialState = []

const categoriesReducer = (state = categoryInitialState, action)=>{
    switch(action.type) {
        case "GET_CATEGORIES":{
            return [...action.payload]
        }
        case "ADD_CATEGORY":{
            return [...state,action.payload]
        }
        case "DELETE_CATEGORY":{
            return [...state].filter(stat=>stat.id !== action.payload)
        }
        default:{
            return [...state]
        }
    }
}
export default categoriesReducer