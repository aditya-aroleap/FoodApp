import React,{useState,useEffect} from "react";
import {View,Text, StyleSheet, Dimensions, Image} from 'react-native';
import * as Location from 'expo-location'
import {useNavigation} from '../utils'
import { connect } from "react-redux";
import {onUpdateLocation, UserState, ApplicationState} from '../reducer';
import { UserReducer } from "../reducer/reducers/userReducer";

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

interface LandingProps{
    userReducer: UserState,
    onUpdateLocation: Function
}
export const _LandingScreen: React.FC<LandingProps> = (props) => {
    const { userReducer, onUpdateLocation} = props;
    const [currentAdd, setCurrentAddr] = useState<Location.LocationGeocodedAddress>();
    const [errorMsg, setErrorMsg] = useState("")    
    const [displayAddress, setDisplayAddress] = useState("Waiting for Current Location");
    const {navigate} = useNavigation();

    useEffect(() => {


        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();            

            if (status !== 'granted'){
                setErrorMsg('Permission to access location is not granted')
            }

            let location: any = await Location.getLastKnownPositionAsync({});

            const { coords } = location

            if(coords){

                const { latitude, longitude} = coords;

                let addressResponse: any = await Location.reverseGeocodeAsync({ latitude, longitude})

                for(let item of addressResponse){
                    setCurrentAddr(item)
                    onUpdateLocation(item)
                    let currentAddress = `${item.name},${item.street}, ${item.postalCode}, ${item.country}`
                    setDisplayAddress(currentAddress)
                    if(currentAddress.length > 0){
                        setTimeout(() =>{
                            navigate('homeStack')
                        }, 2000)
                    }
                    return;
                }


            }else{
                //notify user something went wrong with location
            }

        })();



    }, [])
    return (
        <View style={styles.container}>            
            <View style={styles.navigation}>
            </View>
            <View style={styles.body}>
                <Image source={require('../images/delivery_icon.png')} style={styles.deliveryIcon}/>
                <View style={styles.addressContainer}>
                    <Text style={styles.addressTitle}>Your delivery address</Text>
                </View>
                <Text style={styles.addressText}>{displayAddress}</Text>
            </View>
            <View style={styles.footer}>
                {/* <Text>Footer</Text> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'rgba(242,242,242,1)'
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
    },
    deliveryIcon: {
        width: 120,
        height: 120
    },
    addressContainer: {
        width: screenWidth - 100,
        borderBottomColor: 'red',
        borderBottomWidth: 0.5,
        padding: 5,
        marginBottom: 10,
        alignItems:'center'
    },
    addressTitle:{
        fontSize: 22,
        fontWeight: '700',
        color:'#7d7d7d'
    },
    addressText: {
        fontSize: 18,
        fontWeight: '200',
        color:'#4f4f4f'
    }
})

const mapStateToProps = (state:ApplicationState) => {
    UserReducer: state.userReducer
}

const LandingScreen = connect(mapStateToProps,{onUpdateLocation})(_LandingScreen)
export {LandingScreen}