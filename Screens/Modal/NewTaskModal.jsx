import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, KeyboardAvoidingViewBase } from 'react-native' ; 
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar , faClock } from '@fortawesome/free-solid-svg-icons';

const NewTaskModal = ({closeModal}) => {
    const [taskData, setTaskData] = useState();
    const [taskText, setTaskText] = useState('');
    const [date,setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false); 
    const [text, setText] = useState('');
    const [time, setTime] = useState(new Date());

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate =  new Date(currentDate);
        let formatDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1)  +'/' + tempDate.getFullYear(); 
        let formatTime = tempDate.getHours() + ':' + tempDate.getMinutes();
        setTime(formatTime);
        setText(formatDate+' @ '+formatTime);
        console.log(formatDate+'\n'+formatTime);
    }

    const showMode = (currentMode) =>{
        setShow(true);
        setMode(currentMode);
    }
  

    return (
        <KeyboardAvoidingView style={styles.modalOverview}  behavior="padding">
            {/* onPress={()=>closeModal()} */}
            <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>

                    <TextInput
                        style={styles.modalHeaderText} 
                        placeholder="Enter the task in 50 characters"
                        value={taskText}
                        multiline={true}
                        maxLength={50}
                        onChangeText={(textItem)=>setTaskText(textItem)}
                    />
                </View>
                <View style={styles.modalFooterIcon}>

                    <View style={styles.modalFooterOne}>
                        <FontAwesomeIcon 
                            icon={faCalendar} 
                            size={30} 
                            color="white" 
                            onPress={()=>showMode('date')} 
                        />
                        <FontAwesomeIcon
                            icon={faClock}
                            size={30}
                            color="white"
                            onPress={()=>{showMode('time')}}
                        />
                        
                    </View>
                    <View style={styles.modalFootertwo}>
                        <Text style={styles.modalFooterText}> {text}</Text>
                    </View>
                </View>
                <View style={styles.modalFooterControls}>
                    <TouchableOpacity style={styles.button}
                        onPress={()=>{setTaskData({
                            taskText: taskText,
                            date: date,
                            time: time,
                            priority :'' ,
                            status: 'pending',
                            
                        })}}
                    >
                        <Text style={styles.buttonText}>Add Task</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.buttonSecondary]}
                        onPress={()=>{closeModal()}}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )} 

            </View>
        </KeyboardAvoidingView>
        
    )
}

const styles =  StyleSheet.create({
    modalOverview: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        opacity: 0.8,
        height: '100%',

    },
    modalContainer: {
        backgroundColor: '#0db89e',
        width: '70%',
        height: '40%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    modalHeader: {
        borderWidth: 1,
        width: '80%',
        height: '50%',
        borderRadius: 10,
        marginBottom: 40,
        
        borderColor:'white',
    },
    modalHeaderText: {
        fontSize: 20,
        color: 'white',
    },
    modalFooterIcon: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalFooterOne: {
        width: '40%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    modalFootertwo: {
        width: '40%',
        
    },
    modalFooterText: {
        color: 'white',
        fontSize: 16,
    },
    modalFooterControls: {
        marginTop:20,
        display:'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        width: '80%',
        height: '10%',
        marginBottom: 20,
    },
    button: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: '#0db89e',
        borderRadius:10,
       
        borderColor: 'white',    
    },

    buttonSecondary: {
        backgroundColor: 'white',
        borderColor: '#0db89e',
    },
})

export default NewTaskModal;