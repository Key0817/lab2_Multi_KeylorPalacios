import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MostrarFruta(props) {
    const navigation = useNavigation();
    const { fruit } = props.route.params;

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/imagenes/image2.png')} style={styles.background}></ImageBackground>

            <Image source={require('../assets/imagenes/logo_fruit-sf.png')} style={styles.logo} />

            <View style={styles.card}>
                <Text style={styles.titulo}>Información de la fruta</Text>

                <View style={styles.caracP}>
                    <View style={styles.caraFlex}>
                        <Text style={styles.textLabel}>Nombre:</Text>
                        <Text style={styles.textValue}>{fruit.name}</Text>
                    </View>
                    <View style={styles.caraFlex}>
                        <Text style={styles.textLabel}>Familia:</Text>
                        <Text style={styles.textValue}>{fruit.family}</Text>
                    </View>
                    <Text style={styles.textLabel}>Nutrición:</Text>
                    <Text style={styles.textVNU}>Carbohidratos: {fruit.nutritions.carbohydrates}</Text>
                    <Text style={styles.textVNU}>Proteína: {fruit.nutritions.protein}</Text>
                    <Text style={styles.textVNU}>Grasa: {fruit.nutritions.fat}</Text>
                    <Text style={styles.textVNU}>Calorías: {fruit.nutritions.calories}</Text>
                    <Text style={styles.textVNU}>Azúcar: {fruit.nutritions.sugar}</Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("aprender")} style={{ marginTop: 30 }}>
                    <Text style={styles.btnIniciarSesion}>Volver</Text>
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
    titulo: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 25,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },

    caracP: {
        marginLeft: 8,
        marginBottom: 10,
    },

    caraFlex: {
        flexDirection: 'row'
    },
    textLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    textValue: {
        fontSize: 18,
        marginBottom: 10,
        marginLeft: 6,
    },
    textVNU: {
        fontSize: 18,
        marginBottom: 6,
        marginLeft: 24,
    },
    card: {
        marginTop: 'auto',
        marginBottom: 50,
        backgroundColor: '#D9D9D9',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        width: 370,
        height: 'auto',
        marginRight: 'auto',
        marginLeft: 'auto',
        bottom: 70,
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
        marginTop: 15,
        marginBottom: 20,
        shadowColor: '#000',
        textShadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
