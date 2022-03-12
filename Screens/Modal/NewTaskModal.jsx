import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, KeyboardAvoidingViewBase } from 'react-native' ; 
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar , faClock } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-native-element-dropdown';
import  uuid  from 'react-native-uuid';

const NewTaskModal = ({closeModal, addTaskHandler}) => {
   
    const [taskText, setTaskText] = useState('');
    const [date,setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false); 
    const [text, setText] = useState('');
    const [time, setTime] = useState('');
    const [priority, setPriority] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const tid = uuid.v4();
    

    const priorityData = [
        {label : 'High' , value : 'High'},
        {label:'Medium', value:  'Medium'},
        {label: 'Low' , value : 'Low'},
    ];

    const onChange = (event, selectedDate) => {
        
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        
        let tempDate =  new Date(currentDate);
        let formatDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1)  +'/' + tempDate.getFullYear(); 
        let formatTime = tempDate.getHours() + ':' + tempDate.getMinutes();
        setTime(currentDate.toTimeString().substring(0,5));
    
        setText(formatDate+' @ '+formatTime);
       
    }

    const showMode = (currentMode) =>{
        setShow(true);
        setMode(currentMode);
    }



    return (
        <KeyboardAvoidingView
            style={styles.modalOverview}  
            behavior="padding">
           
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
                        
                        <View style={styles.modalFooterDropdown}>
                          
                            <Dropdown 
                                style={styles.dropdownmenu}
                                onChange={(item)=>{setPriority(item)}}
                                data={priorityData}
                                defaultValue='Select Priority'
                                labelField='label'
                                valueField='value'
                                value={priority}
                                onFocus={()=>{setIsFocus(true)}}  
                                placeholder={!isFocus? 'Task Priority' : priority.value}
                                
                            />
                        </View>

                        <Text style={styles.modalFooterText}> {text !== ''? text  :'Date & Time'}</Text>

                    </View>
                </View>
                <View style={styles.modalFooterControls}>
                    <TouchableOpacity style={styles.button}
                        onPress={()=> { addTaskHandler( 
                            {
                            'taskId': tid ,
                            'taskText': taskText,
                            'taskDate': `${date}`,
                            'taskTime': time,
                            'taskPriority' : priority.value ? priority.value : 'Low' ,
                            'taskStatus': false,
                            }
                        )
                            closeModal() 
                        }}
                    >
                        
                        <Text style={styles.buttonText}>Add Task</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.buttonSecondary]}
                        onPress={()=>{closeModal()}}
                    >
                        <Text style={styles.buttonTextsecondary}>Cancel</Text>
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
        width: '90%',
        minHeight: '40%',
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
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    modalFooterOne: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        
    },
    modalFootertwo: {
        
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: '100%',
        
    },
    modalFooterText: {
        color: 'white',
        fontSize: 16,
        width:'90%',
        textAlign: 'center',
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
        width: '45%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: '#0db89e',
        borderRadius:10,
        borderColor: 'white',    
    
    },

    buttonSecondary: {
        backgroundColor: 'white',
        borderColor: 'red',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18,

    },
    buttonTextsecondary: {
        color: 'red',
        fontWeight: '500',
        fontSize: 16,
    },
    modalFooterDropdown:{
        marginTop:10,
        width: '100%',
        
    },

    dropdownmenu: {
        backgroundColor:'#fff',
        marginBottom: 20,
        marginHorizontal: 10,
        height: 40,
        borderRadius: 10,
    },
    

    
})

export default NewTaskModal;