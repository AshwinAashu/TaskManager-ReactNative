import React, {  useState  } from 'react';
import { View, Text, StyleSheet, Modal, KeyboardAvoidingView } from 'react-native' ; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import NewTaskModal from './Modal/NewTaskModal';
// import { StatusBar } from 'expo-status-bar';



const HomeScreen = () => {
  
  const [showModal, setShowModal] = useState(false);
  const [taskListData, setTaskListData] = useState([]);

  const closeModal = () => {
   
    setShowModal(false);
  }

  const addTaskHandler = (taskData) => {
    let tlist = [...taskListData, taskData];
    // setTaskListData([...taskListData, taskData]);
    tlist = tlist.sort(function(a, b) {
      var c = new Date(a.taskDate);
      var d = new Date(b.taskDate);
      return c-d
    })
    setTaskListData(tlist);
  }
  
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
          {/* {console.log('check',tlist)} */}
          {
            taskListData.map((tasks,index)=>{
              return (
                <View key={index} style={styles.feedItemHeader}>
                  <Text style={styles.taskDateText}>{tasks.taskDate}</Text>
                  <View style={styles.feedItemCard}>
                    <View style={styles.feedItemCardContents}>
                      <Text style={styles.taskTextField}>{tasks.taskText}</Text>
                      <Text style={styles.taskTimeField}>{tasks.taskTime}</Text>
                      {/* icon to mark completion of task */}
                    </View>
                  </View>
                </View>
              )
              
            })
          }
        </View>

        <View style={styles.addItemContainer}>
          <View style={styles.addItem} >
            <FontAwesomeIcon 
              icon={faPlus} 
              size={20}
              color="white"
              onPress={()=>{setShowModal(true)}}
               />
          </View>
        </View>
      </View>
      <Modal visible={showModal} animationType="slide" transparent={true}>
          <NewTaskModal 
            closeModal={closeModal} 
            addTaskHandler={ addTaskHandler }/>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#dedede',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%',
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
    position: 'relative',
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
    
    // flex: 1,
    zIndex: 10000,
    justifyContent: 'flex-start',
    position: 'absolute',
    left: '75%',
    top: '75%',
    
    
    // marginBottom: '5%',
  },
  addItem:{
   
    width:60,
    height:60,
    backgroundColor: '#0db89e',
    justifyContent: 'center',
    alignItems : 'center',
    borderRadius: 30,
    
  },
  feedItem:{
    // flex: 4,
    width: '100%',
    // height: '100%',
  },
  feedItemHeader:{
    // width: '100%',
    backgroundColor: '#dedede',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: '50%',
  },
  feedItemCard:{
    width: '95%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,  
    borderLeftColor:'red',
    borderLeftWidth:5,
    
  },

})


export default HomeScreen