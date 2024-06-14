import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from 'react-native';


export default function Acceso() {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/imagenes/img_fondo.jpg')} style={styles.background}>

                {/* <Image source={require('../assets/imagenes/logo_fruit.png')} width={50} height={50} style={styles.logo}/> */}
                <View style={styles.card}>
                    <TouchableOpacity onPress={() => navigation.navigate("create")}>
                        <Text style={styles.btnIniciarSesion}>Crear Cuenta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("products")}>
                        <Text style={styles.btnIniciarSesion}>Registrar Producto</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>

    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },

    card:{
        backgroundColor: '#D9D9D9',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        marginBottom: 'auto',
        marginTop: 'auto',
        marginRight: 'auto',
        marginLeft: 'auto',
        height: 162,
        width: 200,
    
    },

    logo: {
        resizeMode: 'cover',
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
        marginTop: 20,


    },
});