import {ShoppingAction} from '../actions';
import {FoodModel,FoodAvailability,ShoppingState} from '../model';

const initialState = {
    availability: {} as FoodAvailability,
    availableFoods: {} as [FoodModel]
}
const ShoppingReducer = (state:ShoppingState=initialState,action:ShoppingAction) => {

    switch(action.type){
        case 'ON_AVAILABILITY':
            return {
                ...state,
                availability:action.payload,
            }
        case 'ON_FOODS_SEARCH':
            return {
                ...state,
                availableFoods: action.payload
            }
        default:
            return state    
    }
}
export {ShoppingReducer}