import React, {useState} from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from 'react-native';


export default function HomePage() {

    //variable para guardar la navegación
    const navigation = useNavigation()



    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/imagenes/image2.png')} style={styles.background}></ImageBackground>

            <Image source={require('../assets/imagenes/logo_fruit-sf.png')} style={styles.logo} />

            <View style={styles.card}>

                <Text style={styles.titulo}>Bienvenido</Text>
                <Text style={styles.subtitulo}>¿Qué deseas hacer?</Text>

                <View style={styles.cardNav}>
                    <TouchableOpacity onPress={() => navigation.navigate("products")}>
                        <Text style={styles.btnIniciarSesion}>Registrar Producto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("listProducts")}>
                        <Text style={styles.btnIniciarSesion}>Listar Productos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>navigation.navigate('aprender')}>
                        <Text style={styles.btnIniciarSesion}>Aprender +</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.CONF} onPress={() => navigation.navigate("access")}>
                <Image source={require('../assets/imagenes/CerrarSesion.png')} width={35} height={35} style={{ right: 4, }} />
                <Text>Cerrar Sesión</Text>
            </TouchableOpacity>
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

    flecha: {
        width: 130,
        height: 120,
        position: 'absolute',
        top: 16,
        left: 8,
        color: "#000",
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
        bottom: 70,
    },

    titulo: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
        marginTop: 10,
    },

    subtitulo: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
        marginTop: 4,
    },

    cardNav: {
        padding: 10,
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
        marginBottom: 16,
        shadowColor: '#000',
        textShadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    CONF: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 30,
        height: 55,
        marginTop: 16,
        textDecorationLine: 'none',
        color: '#000',
        bottom: 30,
    },
});
