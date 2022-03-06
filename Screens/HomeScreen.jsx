import React, { useEffect , useState } from 'react';
import { View, Text, StyleSheet } from 'react-native' ; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
// import { StatusBar } from 'expo-status-bar';



const HomeScreen = () => {
  return (
    <View style={styles.containerMain}>
      <View style={styles.containerHeader}>

        <View style ={styles.headerContainer}>
            <Text style={styles.headertext}>TODO LIST</Text>
        </View>

        <View style ={styles.headerOptions}>
          <View >
            <FontAwesomeIcon icon={faBars} size={30} color="white" />
            {/* option breadcrum goes here */}
          </View>
      
        </View>
      </View>

      <View style ={styles.feedContainer}>
        <View style={styles.feedItem}>
        </View>

        <View style={styles.addItemContainer}>
          <View style={styles.addItem}>
            <FontAwesomeIcon icon={faPlus} size={20} color="white" />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#dedede',
    // marginBottom: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  
  },
  containerHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0db89e',
    width: '100%',
    height:'10%',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    // justifyContent: 'space-between',
  },
  headerContainer: {
    width: '80%',
    backgroundColor: '#0db89e',
    marginTop: '5%',
  },
  headertext: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold', 
    textAlign: 'right',
    marginRight: '25%',
  },
  headerOptions: {
    // backgroundColor: '#000',
    width: '20%',
    marginTop: '5%',
    marginLeft: '5%',
    
  },
  feedContainer: {
    width: '100%',
    backgroundColor: '#dedede',
    height:'100%',
   
  },
  addItemContainer:{
    
    flex: 1,
    justifyContent: 'flex-start',
    left: '75%',
    top: '65%',
    
    
    // marginBottom: '5%',
  },
  addItem:{
    zIndex: 1,
    width:60,
    height:60,
    backgroundColor: '#0db89e',
    justifyContent: 'center',
    alignItems : 'center',
    borderRadius: 30,
    
  },

})


export default HomeScreen