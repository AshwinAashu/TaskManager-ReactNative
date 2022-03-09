import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native' ;
import { auth } from '../../firebase'
import { useNavigation } from '@react-navigation/native';

const SignOutModal = ({closeSignOutModal}) => {
    
    const navigation = useNavigation();
    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                alert('signed out');
                navigation.navigate('Login');
            })
            .catch((error) => {
                alert(error.message);
            })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Sign Out</Text>
            <Text style={styles.headerText}>You are about to sign out</Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={handleSignOut}
            >
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.buttonSecondary]}
                onPress={()=>closeSignOutModal()}
            >
                <Text style={styles.buttonTextsecondary}>Cancel</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        opacity: 0.8,
        height: '100%',
        
    },
    header: {
        fontSize: 30,
        color: '#69a0ff',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        color: 'white',
    },
    button: {
        width: '40%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
        borderColor:'red',
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 20,
        color: 'red',
    },
    buttonSecondary: {
        backgroundColor: '#69a0ff',
        borderWidth: 2,
        borderColor: '#69a0ff',
    },
    buttonTextsecondary: {
        fontSize: 20,
        color: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%',
    },


})

export default SignOutModal;