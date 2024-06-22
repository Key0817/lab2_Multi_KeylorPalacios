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

export default function Productos() {

    //variable para guardar la navegación
    const navigation = useNavigation()

    //crud agregar a la base de datos
    const inicioEstado = {
        nombreCompleto: '',
        codigo: '',
        cantidad: '',
        fcadu: '',

    }
    const [estado, setEstado] = useState(inicioEstado)

    const HandleChangeText = (value, name) => {
        setEstado({ ...estado, [name]: value })
    }

    const RegistarProducto = async () => {

        try {
            await addDoc(collection(db, 'Product'), { ...estado })

            navigation.navigate('home')

        } catch (error){
            console.error(error)
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/imagenes/image2.png')} style={styles.background}></ImageBackground>

            <Image source={require('../assets/imagenes/logo_fruit-sf.png')} style={styles.logo} />

            <View style={styles.card}>

                <Text style={styles.titulo}>Productos</Text>
                <TextInput
                    onChangeText={(value) => HandleChangeText(value, 'nombreCompleto')}
                    value={estado.nombreCompleto}
                    keyboardType="ascii-capable"
                    placeholder="Nombre Producto"
                    style={styles.inputTxt}
                    underlineColor="transparent"
                ></TextInput>

                <TextInput
                    onChangeText={(value) => HandleChangeText(value, 'codigo')}
                    value={estado.codigo}
                    keyboardType="ascii-capable"
                    placeholder="Código Producto"
                    style={styles.inputTxt}
                    underlineColor="transparent"
                ></TextInput>

                <TextInput
                    onChangeText={(value) => HandleChangeText(value, 'cantidad')}
                    value={estado.cantidad}
                    keyboardType="ascii-capable"
                    placeholder="Cantidad"
                    style={styles.inputTxt}
                    underlineColor="transparent"
                ></TextInput>

                <TextInput
                    onChangeText={(value) => HandleChangeText(value, 'fcadu')}
                    value={estado.fcadu}
                    keyboardType="ascii-capable"
                    placeholder="Fecha caducidad"
                    style={styles.inputTxt}
                    underlineColor="transparent"
                ></TextInput>

                <TouchableOpacity onPress={RegistarProducto}>
                    <Text style={styles.btnIniciarSesion}>Guardar</Text>
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

    logo: {
        width: 130,
        height: 120,
        position: 'absolute',
        top: 16,
        right: 8,
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
        shadowColor: '#000',
        textShadowOffset: {width:0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderColor: 'gray',
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
        shadowColor: '#000',
        textShadowOffset: {width:0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
