import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from 'react-native';
import { useState } from 'react';

//import DB
import { addDoc, collection, getFirestore } from "firebase/firestore";
import app from "../AccesoFirebase";

const db = getFirestore(app)

export default function Crear() {

    //variable para guardar la navegación
    const navigation = useNavigation()

    //crud agregar a la base de datos
    const inicioEstado = {
        nombreCompleto: '',
        email: '',
        clave: '',
        confClave: '',

    }
    const [estado, setEstado] = useState(inicioEstado)

    const HandleChangeText = (value, name) => {
        setEstado({ ...estado, [name]: value })
    }

    const RegistarUsuario = async () => {

        try {
            await addDoc(collection(db, 'User'), { ...estado })

            Alert.alert('Alerta', 'El usuario se registró con éxito')

        } catch {
            console.error(error)
        }
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/imagenes/img_fondo.jpg')} style={styles.background}></ImageBackground>
            <View style={styles.card}>

                <Text style={styles.titulo}>Crear cuenta nueva</Text>

                <TextInput
                    onChangeText={(value) => HandleChangeText(value, 'nombreCompleto')}
                    value={estado.nombreCompleto}
                    keyboardType="ascii-capable"
                    placeholder="Nombre completo"
                    style={styles.inputTxt}
                    underlineColor="transparent"
                ></TextInput>

                <TextInput
                    onChangeText={(value) => HandleChangeText(value, 'email')}
                    value={estado.email}
                    keyboardType="email-address"
                    placeholder="Correo Electronico"
                    style={styles.inputTxt}
                    underlineColor="transparent"
                ></TextInput>

                <TextInput
                    onChangeText={(value) => HandleChangeText(value, 'clave')}
                    value={estado.clave}
                    secureTextEntry={true}
                    placeholder="Contraseña"
                    style={styles.inputTxt}
                    underlineColor="transparent"
                ></TextInput>

                <TextInput
                    onChangeText={(value) => HandleChangeText(value, 'confClave')}
                    value={estado.confClave}
                    secureTextEntry={true}
                    placeholder="Comprobar Contraseña"
                    style={styles.inputTxt}
                    underlineColor="transparent"
                ></TextInput>

                <TouchableOpacity onPress={RegistarUsuario}>
                    <Text style={styles.btnIniciarSesion}>Registrarse</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },

    background: {
        flex: 1,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        zIndex: -1,
    },

    card: {
        marginTop: 'auto',
        marginBottom: 50,
        backgroundColor: '#D9D9D9',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        width: 300,
        height: 435,
        marginRight: 'auto',
        marginLeft: 'auto',
        bottom: 50,
    },

    titulo: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
        marginBottom: 30,
        marginTop: 10,
    },

    inputTxt: {
        backgroundColor: "#fff",
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        width: 250,
        height: 50,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 10,


    },

    btnIniciarSesion: {
        backgroundColor: "#871F1F",
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 12,
        width: 180,
        height: 50,
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: 20,
        borderRadius: 20,
        top: 30,
        marginTop: 'auto',
        marginBottom: 'auto',

    },

});