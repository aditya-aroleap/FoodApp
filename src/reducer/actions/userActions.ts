import axios from 'axios';
import { Dispatch  } from 'react';
import { BASE_URL } from '../../utils';
import { LocationGeocodedAddress as Address } from 'expo-location'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FoodModel, UserModal } from '../model';

export interface updateLocationAction{
    readonly type: 'ON_UPDATE_LOCATION',
    payload: Address
}

export interface userErrorAction{
    readonly type: 'ON_USER_ERROR',
    payload: any
}

export interface UpdateCartAction{
    readonly type: 'ON_UPDATE_CART',
    payload: FoodModel
}

export interface UserLoginAction{
    readonly type: 'ON_USER_LOGIN',
    payload: UserModal
}

export type UserAction = updateLocationAction | userErrorAction | UpdateCartAction | UserLoginAction;

export const onUpdateLocation = (location:Address) => {
    return async ( dispatch: Dispatch<UserAction> )=>{
        try{
            const locationString = JSON.stringify(location);
            AsyncStorage.setItem('user_loc',locationString);
            dispatch({
                type:'ON_UPDATE_LOCATION',
                payload: location 
            })
        }catch (error){
            console.error('error',error);
            dispatch({
                type:'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onUpdateCart = (item: FoodModel) => {

     
    return async ( dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: 'ON_UPDATE_CART',
            payload: item
        })
    }

}
export const OnUserLogin = (email: string, password: string) => {
 
    return async ( dispatch: Dispatch<UserAction>) => {

        try {
             const response = await axios.post<UserModal>(`${BASE_URL}/user/login`, {
                email,
                password
            })

            console.log(response)

            if(!response){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'Login Error'
                })
            }else{
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: 'Login Error'
            })
        }
    }

}

export const OnUserSignup = (email: string, phone: string ,password: string) => {
 
    return async ( dispatch: Dispatch<UserAction>) => {

        try {
             const response = await axios.post<UserModal>(`${BASE_URL}/user/signup`, {
                email,
                phone,
                password
            })

            console.log(response)

            if(!response){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'Login Error'
                })
            }else{
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: 'Login Error'
            })
        }
    }

}
