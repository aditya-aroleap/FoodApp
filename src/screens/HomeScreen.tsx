import React,{useEffect,useReducer} from "react";
import {View,Text, StyleSheet, Dimensions, Image} from 'react-native';
import { useNavigation } from '../utils'

import { connect } from 'react-redux'
import { onAvailability ,UserState, ApplicationState, ShoppingState, Restaurant, FoodModel, onSearchFoods } from '../reducer'
import { SearchBar, RestaurantCard, CategoryCard } from "../components";
import { ButtonWithIcon } from "../components/ButtonWithIcon";
import { FlatList, ScrollView } from "react-native-gesture-handler";

interface HomeProps{
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onAvailability: Function,
    onSearchFoods: Function,
}

export const _HomeScreen: React.FC<HomeProps> = (props) => {
    const {location} = props.userReducer;
    const {availability} = props.shoppingReducer;
    const {categories, foods, restaurants} = availability;

    const {navigate} = useNavigation();

    useEffect(() => {
        props.onAvailability(location.postalCode)
        setTimeout(() => {
            props.onSearchFoods(location.postalCode)
        }, 1000 )

    }, [])


    const onTapRestaurant = (item: Restaurant) => {
        navigate('RestaurantPage', { restaurant: item})
    }

    const onTapFood = (item: FoodModel) => {    
        navigate('FoodDetailPage', { food: item})
    }

    return (
        <View style={styles.container}>
           <View style={styles.navigation}>
                <View style={{marginTop:50, backgroundColor:'white', flex:4, paddingLeft:20, paddingRight:20, alignItems:'flex-start', justifyContent:'center', flexDirection:'row'}}>
                    <Text>{`${location.street},${location.name},${location.city}`}</Text>
                    <Text> Edit</Text>
                </View>
                <View style={{display:'flex', justifyContent:'space-around', height:60, alignItems:'center', marginLeft:4, flexDirection:'row'}}>
                    <SearchBar didTouch={()=>{
                        navigate('SearchPage')
                    }} onTextChange={()=>{}}/>
                    <ButtonWithIcon icon={require('../images/hambar.png')} onTap={()=>{}} width={50} height={40}/>
                </View>
            </View>
            <View style={styles.body}>
                <ScrollView>
                     <FlatList 
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     data={categories}
                     renderItem={({item})=><CategoryCard item={item} onTap={()=>{}}/>}
                     keyExtractor={(item)=>`${item.id}`}
                     />
                </ScrollView>
                <View>
                        <Text style={{fontSize: 25, fontWeight: '600', color: '#f15b5d', marginLeft: 20 }} > Top Restaurants</Text>
                    </View>
                    <FlatList 
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     data={restaurants}
                     renderItem ={({ item }) =>  <RestaurantCard item={item} onTap={onTapRestaurant} /> } 
                     keyExtractor={(item) => `${item._id}`}
                    />

                    <View>
                        <Text style={{fontSize: 25, fontWeight: '600', color: '#f15b5d', marginLeft: 20 }} > 30 Minutes Foods</Text>
                    </View>
                    <FlatList 
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     data={foods}
                     renderItem ={({ item }) =>  <RestaurantCard item={item} onTap={onTapFood} /> } 
                     keyExtractor={(item) => `${item._id}`}
                    />
            </View>
            <View style={styles.footer}>
                <Text>Footer</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFF'
    },
    navigation: {
        flex:2,
    },
    body: {
        flex:9,
        alignItems:'center',
        justifyContent:'center',
    },
    footer:{
        flex:1,
    }
})

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const HomeScreen = connect(mapToStateProps, { onAvailability, onSearchFoods })(_HomeScreen)

export { HomeScreen }