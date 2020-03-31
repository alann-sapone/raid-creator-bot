import { types } from "../actions/characterActions";

const initialState = {
    characters = {}
}

function characterReducer(state = initialState, action) {
    const { type, serverId, characterData } = action;
    switch (type) {
        case types.CHARACTER_ADD:
            console.log(type, state, type, serverId, characterData);
            return state;
            
        case types.CHARACTER_EDIT:
            console.log(type, state, type, serverId, characterData);
            return state;
            
        case types.CHARACTER_REMOVE:
            console.log(type, state, type, serverId, characterData);
            return state;
    
        default:
            console.log("Default");
            return state;
    }
}
