import React, {useState , useEffect} from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView,TextInput, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    useEffect(() => {
        return onAuthStateChanged(auth,(user) => {
            if(user){
                navigation.navigate('Home')
            }
        })
        
    }, [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth,email,password)
            .then((userCredential) => {
                const user = userCredential.user;
        
            })
            .catch((error)=>{
                alert(error.message);
            })
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth,email,password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert('loggedin as', user.email);
            })
            .catch((error)=>{
                alert(error.message);
            })
    }


    return (
        <KeyboardAvoidingView
            style={styles.containerMain}
            behavior="padding"
        >
            <View style={styles.inputMainContainer}>
                <Text style={styles.pageHeader}>Log in | Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="email"
                    value={email}
                    onChangeText={text=>setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="password"
                    secureTextEntry={true}
                    value = {password}
                    onChangeText={text=>setPassword(text)}
                />

            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={handleSignUp}
                    style={[ styles.button , styles.buttonSecondary ]}
                >
                    <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Sign Up</Text>
                </TouchableOpacity>

            </View>
            
        </KeyboardAvoidingView>
    )
}

const styles= StyleSheet.create({
    pageHeader:{
        fontSize:30,
        color: '#69a0ff',
        marginBottom: 20,
    },
    containerMain: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    }, 
    inputMainContainer: {
        width: '80%',
       
    },
    input:{
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop:10,
        borderWidth: 1,
        borderColor:'#949494',
    },
    buttonContainer: {
        width:'80%',
        alignItems:'center',
        marginTop:10,
        justifyContent: 'space-evenly',
        
    },
    button: {
        backgroundColor: '#69a0ff',
        width:'60%',
        padding:10,
        borderRadius: 10,
        borderColor: 'blue',
        borderWidth: 1,
        marginTop:5,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight:'700',
        fontSize:20,
    },
    buttonSecondary: {
        backgroundColor: '#fff',
    },
    buttonTextSecondary:{
        color: '#69a0ff',
    }
})

export default LoginScreen