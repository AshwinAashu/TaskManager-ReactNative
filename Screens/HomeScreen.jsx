import React, {  useState  } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView } from 'react-native' ; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faBars, faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import NewTaskModal from './Modal/NewTaskModal';
// import { StatusBar } from 'expo-status-bar';



const HomeScreen = () => {
  
  const [showModal, setShowModal] = useState(false);
  const [taskListData, setTaskListData] = useState([]);
  const [objTask, setObjTask] = useState({});
  

  const closeModal = () => {
    setShowModal(false);
  }

  const addTaskHandler = (taskData) => {
    let tlist = [...taskListData, taskData];
    tlist = tlist.sort(function(a, b) {
      var c = new Date(a.taskDate);
      var d = new Date(b.taskDate);
      return c-d
    })
    setTaskListData(tlist);
    setObjTask(taskObjectConstructor(tlist));  
  }

  const taskObjectConstructor = (taskData) => {
    let taskObj = {};
    taskData.forEach(taskItem => {
      taskItem.taskDate = new Date(taskItem.taskDate)
      if(taskObj[taskItem.taskDate.toDateString()]){
        taskObj[taskItem.taskDate.toDateString()].push(taskItem);
      }else{
        taskObj[taskItem.taskDate.toDateString()] = [taskItem]; 
      }
    });
    return taskObj;
  }

  const handleDeleteTask = (targetTaskId) => {
    let tlist = [...taskListData];
    tlist = tlist.filter(taskItem => taskItem.taskId !== targetTaskId);
    setTaskListData(tlist);
    setObjTask(taskObjectConstructor(tlist));
  }
  
  const handleUpdateTask = (targetTaskId) => {
    let tlist = [...taskListData];

    let targetTask = tlist.find(taskItem => taskItem.taskId === targetTaskId);
    targetTask.taskStatus = !targetTask.taskStatus;
    setTaskListData(tlist);
    setObjTask(taskObjectConstructor(tlist));

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
          {/* rendering thorough the task object */}
          {Object.keys(objTask).map((key,index)=>{
            return (
              <View key={index} style={styles.feedItemHeader}>
                <Text style={styles.taskDateText}>{key}</Text>
                <View style={styles.feedItemCard}>
                  {objTask[key].map((tasks,deepIndex)=>{
                    return (
                      <View key={deepIndex} style={styles.feedItemCardContents}>
                        <Text 
                          style={tasks.taskStatus ? [styles.taskTextField, styles.taskCompleteText ] : styles.taskTextField}
                        >{tasks.taskText}</Text>

                        <View style= {styles.taskControls}>
                          <Text style={styles.taskTimeField}>{tasks.taskTime}</Text>
                          <FontAwesomeIcon 
                            icon={faCheckCircle}
                            size={20} 
                            onPress={()=> {
                              handleUpdateTask(tasks.taskId)
                            }}
                            style={tasks.taskStatus ? styles.taskCompleteStyle: styles.taskIncompleteStyle}
                            // color={ tasks.taskStatus ?  '#87ffb5' : 'gray'} 
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            size={20}
                            onPress={()=>{ handleDeleteTask(tasks.taskId)}}
                            color="#fa413e"
                          />
                        </View>
                      </View>
                    )
                  })}
                </View>
              </View>
            )
          })} 

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
    zIndex: 10000,
    justifyContent: 'flex-start',
    position: 'absolute',
    left: '75%',
    top: '75%',
 
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
    width: '100%',
  },
  feedItemHeader:{
    backgroundColor: '#dedede',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
  feedItemCardContents:{
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '3%',
  },
  taskControls:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width:'40%',
  },
  taskDateText:{
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6a6b6a',
    textAlign:'left',
    width: '90%',
    marginTop: '2%',
  },
  taskTextField:{
    fontSize: 20,
    width: '50%',
    color:'#000',
  },
  taskCompleteText:{
    textDecorationLine: 'line-through',
    color:'#6a6b6a',
  },
  taskCompleteStyle:{
    color: 'green',
    
  },
  taskIncompleteStyle:{
    color:'gray',
  },
  

})


export default HomeScreen