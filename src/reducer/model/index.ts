import { LocationGeocodedAddress } from 'expo-location'

export interface category{
    id: string;
    title: String;
    icon: String;
}
export interface FoodModel{
    _id: String;
    name: String;
    description: String;
    category: String;
    price: Number;
    readyTime: [String];
    images: [string];
    unit: number;
} 

export interface Restaurant{
    _id: String;
    name: String;
    foodType:String;
    address: String;
    phone: Number;
    images: String;
    foods: [FoodModel];
}

export interface FoodAvailability{
    categories: [category];
    foods: [FoodModel];
    restaurants: [Restaurant]
}

export interface UserModal{
    fName: String;
    lName: String;
    phoneNumber: Number;
    token: String;
}

export interface UserState{
    user: UserModal;
    location: LocationGeocodedAddress;
    error: String | undefined;
    Cart: [FoodModel];
}

export interface ShoppingState{
    availability: FoodAvailability;
    availableFoods: [FoodModel];
}