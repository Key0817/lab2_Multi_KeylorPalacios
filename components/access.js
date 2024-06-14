import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from 'react-native';


export default function Acceso() {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/imagenes/img_fondo.jpg')} style={styles.background}>
                <View style={{backgroundColor: "rgba(0, 0, 0, 0.75)", flex:1}}>
                    <Image source={require('../assets/imagenes/logo_fruit-sf.png')} style={styles.logo} />
                    <View style={styles.card}>
                        <TouchableOpacity onPress={() => navigation.navigate("create")}>
                            <Text style={styles.btnIniciarSesion}>Crear Cuenta</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("products")}>
                            <Text style={styles.btnIniciarSesion}>Registrar Producto</Text>
                        </TouchableOpacity>
                    </View>
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

    card: {
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
        width: 130,
        height: 120,
        position: 'absolute',
        top: 16,
        right: 8,
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
        shadowColor: '#000',
        textShadowOffset: {width:0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});