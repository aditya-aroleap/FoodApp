import { FoodAvailability, FoodModel } from './../model/index';
import axios from 'axios';
import { Dispatch  } from 'react';
import { BASE_URL } from '../../utils';
import { LocationGeocodedAddress as Address } from 'expo-location'

export interface AvailabilityAction{
    readonly type: 'ON_AVAILABILITY',
    payload: FoodAvailability
}

export interface ShoppingErrorAction{
    readonly type: 'ON_SHOPPING_ERROR',
    payload: any
}

export interface FoodSearchAction{
    readonly type: 'ON_FOODS_SEARCH',
    payload: [FoodModel]
}

export type ShoppingAction = AvailabilityAction | ShoppingErrorAction | FoodSearchAction;

export const onAvailability = (postCode: string) => {
    return async ( dispatch: Dispatch<ShoppingAction> )=>{
        try{
            const resp = await axios.get<FoodAvailability>(`${BASE_URL}/food/availability/${postCode}`)
            if(!resp){
                dispatch({
                    type:'ON_SHOPPING_ERROR',
                    payload: 'Availability Error'
                })
            }else{
            dispatch({
                type:'ON_AVAILABILITY',
                payload: resp.data 
            })
        }
        }catch (error){
            console.log('error in catch',error);
            dispatch({
                type:'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }
}

export const onSearchFoods = (postCode: string) => {


    return async ( dispatch: Dispatch<ShoppingAction>) => {

        try {

            const response = await axios.get<[FoodModel]>(`${BASE_URL}/food/search/${postCode}`)


            if(!response){
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            }else{
                dispatch({
                    type: 'ON_FOODS_SEARCH',
                    payload: response.data
                })
            }


        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }

    }

}