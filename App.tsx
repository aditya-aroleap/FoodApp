import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {HomeScreen} from './src/screens/HomeScreen';
import {LandingScreen} from './src/screens/LandingScreen';
import {SearchScreen} from './src/screens/SearchScreen';
import {FoodDetailScreen} from './src/screens/FoodDetailsScreen';
import {RestaurantScreen} from './src/screens/RestaurantScreen';
import { CartScreen } from './src/screens/CartScreen';
import { LoginScreen } from './src/screens/LoginScreen';

import {createAppContainer,createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator } from 'react-navigation-tabs'

import { Provider } from 'react-redux';
import {store} from './src/reducer'

const switchNav = createSwitchNavigator({

  landingPage : {
    screen: createStackNavigator({
      Landing : LandingScreen
    },{
      defaultNavigationOptions: {
        headerShown: false,
      }
    })
  },

  homeStack: createBottomTabNavigator({
    Home:{
      screen: createStackNavigator({
        HomePage: HomeScreen,
        SearchPage: SearchScreen,
        RestaurantPage: RestaurantScreen,
        FoodDetailPage: FoodDetailScreen
      },{
        defaultNavigationOptions: {
          headerShown: false,
        }}),
      navigationOptions:{
        tabBarIcon: ({focused,tintColor})=> {
          let icon = focused === true ? require('./src/images/home_icon.png') : require('./src/images/home_n_icon.png')
          return <Image source={icon} style={styles.iconStyle}/>
        }
      }
    },
    Offer:{
      screen: createStackNavigator({
        Home: HomeScreen
      }),
      navigationOptions:{
        tabBarIcon: ({focused,tintColor})=> {
          let icon = focused === true ? require('./src/images/offer_icon.png') : require('./src/images/offer_n_icon.png')
          return <Image source={icon} style={styles.iconStyle}/>
        }
      }
    },
    Cart:{
      screen: createStackNavigator({
        Home: CartScreen,
        LoginPage: LoginScreen,
      },{
        defaultNavigationOptions: {
          headerShown: false,
        }}),
      navigationOptions:{
        tabBarIcon: ({focused,tintColor})=> {
          let icon = focused === true ? require('./src/images/cart_icon.png') : require('./src/images/cart_n_icon.png')
          return <Image source={icon} style={styles.iconStyle}/>
        }
      }
    },
    Account:{
      screen: createStackNavigator({
        Home: HomeScreen,
        LoginPage: LoginScreen,
      }),
      navigationOptions:{
        tabBarIcon: ({focused,tintColor})=> {
          let icon = focused === true ? require('./src/images/account_icon.png') : require('./src/images/account_n_icon.png')
          return <Image source={icon} style={styles.iconStyle}/>
        }
      }
    } 
  })
})

const AppNavigation = createAppContainer(switchNav)
export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    width: 30,
    height: 30
  }
});
