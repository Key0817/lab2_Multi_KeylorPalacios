import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View,
    Pressable, ActivityIndicator, FlatList, ImageBackground, Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { addDoc, collection, getFirestore, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import app from "../AccesoFirebase";

export default function ApiAprender() {

    const navigation = useNavigation();

    const db = getFirestore(app)

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const [initData, setinitData] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    const getFrutas = async () => {
        try {
            const response = await fetch('https://www.fruityvice.com/api/fruit/all');
            const json = await response.json();
            setData(json);
            setinitData(json);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFrutas();
    }, []);

    useEffect(() => {
        if (busqueda === '') {
            setData(initData);
        } else {
            const newData = initData.filter(item => item.name.toLowerCase().includes(busqueda.toLowerCase()));
            setData(newData);
        }
    }, [busqueda]);

    const recargar = () => {
        setBusqueda('');
        getFrutas();
    };

    const agregarFavorito = async (fruta) => {
        try {
            const favoritosRef = collection(db, 'Favoritos');
            const q = await getDocs(favoritosRef);
            const isAlreadyFavorite = q.docs.some(doc => doc.data().id === fruta.id);

            if (!isAlreadyFavorite) {
                await addDoc(favoritosRef, fruta);
                Alert.alert('Agregado!', `${fruta.name} se agregó a favoritos`);
            } else {
                Alert.alert('Ya existe', `${fruta.name} ya está en favoritos`);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <View style={styles.container}>

            <View style={styles.productItem}>

                <TouchableOpacity style={{ marginTop: 15, marginRight: 8 }}
                    onPress={() => navigation.navigate('favoritos')}
                >
                    <MaterialCommunityIcons name="heart" color={"#871F1F"} size={35} style={{ marginLeft: 10, top: 26, left: 12 }} />
                    <Text style={styles.iconTXT}> Favoritos</Text>
                </TouchableOpacity>

                <TextInput placeholder='Buscar Fruta' style={styles.inputTxt}
                    value={busqueda}
                    onChangeText={setBusqueda}
                />

                <TouchableOpacity style={{ marginTop: 15, marginLeft: 8 }} onPress={recargar}>
                    <MaterialCommunityIcons name="reload" color={"green"} size={35} style={{ marginLeft: 10, top: 26, left: 12 }} />
                    <Text style={styles.iconTXT}> Recargar</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.titulo}>Lista de Frutas</Text>

            <View style={{ flex: 1 }}>
                {isLoading ? (
                    <View style={{ marginTop: '40%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <Text style={{ marginBottom: 15, fontSize: 20 }}>Cargando...</Text>
                        <ActivityIndicator size={80} color='#871F1F' style={{ marginTop: 15 }} />
                    </View>
                ) : (
                    <FlatList
                        data={data}
                        keyExtractor={({ id }) => id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Text style={styles.productName}
                                    onPress={() => navigation.navigate('mostrarFruta', { fruit: item })}
                                >{item.name}
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <MaterialCommunityIcons name="heart" color={"#871F1F"} size={30} style={{ marginLeft: 8, right: 8, top: 2.5 }}
                                        onPress={() => agregarFavorito(item)} />

                                    <MaterialCommunityIcons name="eye" color={"black"} size={30} style={{ marginLeft: 8, right: 8 }}
                                        onPress={() => navigation.navigate('mostrarFruta', { fruit: item })} />
                                </View>

                            </View>
                        )}
                    />
                )}
                <StatusBar style="auto" />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("home")} style={{ marginTop: 30 }}>
                <Text style={styles.btnIniciarSesion}>Volver</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingBottom: 10,
    },

    background: {
        flex: 1,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        zIndex: -1,
    },

    titulo: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
        marginTop: 5,
        marginBottom: 10,
    },

    subtitulo: {
        color: "#000",
        fontSize: 15,
        textAlign: "center",
        marginBottom: 5,
        marginTop: 4,
    },

    card: {
        marginTop: 'auto',
        marginBottom: 15,
        backgroundColor: '#D9D9D9',
        width: 300,
        marginRight: 'auto',
        marginLeft: 'auto',
        borderRadius: 15,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        borderRadius: 20,
        marginTop: 'auto',
        // marginBottom: 16,
        shadowColor: '#000',
        textShadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },

    inputTxt: {
        shadowColor: '#000',
        textShadowOffset: { width: 0, height: 2 },
        borderColor: 'gray',
        backgroundColor: "#D9D9D9",
        borderRadius: 15,
        width: 220,
        height: 50,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 60,
        marginBottom: 10,
        textAlign: 'justify',
        padding: 10
    },

    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 10,
    },

    productName: {
        fontSize: 18,
        marginRight: 10,
        padding: 10,
    },

    iconTXT: {
        fontSize: 14,
        Right: 10,
        Left: 10,
        padding: 10,
        top: 15
    },


});