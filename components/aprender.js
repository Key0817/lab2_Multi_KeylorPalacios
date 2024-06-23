import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View,
    Pressable, ActivityIndicator, FlatList, ImageBackground
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


export default function ApiAprender() {

    const navigation = useNavigation();

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

    //Se encarga de limpiar la busqueda y volver a cargar los datos
    const recargar = () => {
        setBusqueda(''); 
        getFrutas(); 
    };
    return (
        <View style={styles.container}>

            <View style={styles.productItem}>
                <TextInput placeholder='Buscar Fruta' style={styles.inputTxt}
                    value={busqueda}
                    onChangeText={setBusqueda}
                />
                <TouchableOpacity  style={{ marginTop: 15,}} onPress={recargar}>
                    <MaterialCommunityIcons name="reload" color={"green"} size={35} style={{ marginLeft: 10, top: 26, left:12 }} />
                    <Text style={styles.iconTXT}> Recargar</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.titulo}>Aprender</Text>

            <View style={{ flex: 1 }}>
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        data={data}
                        keyExtractor={({ id }) => id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Text style={styles.productName} >
                                    {item.name}
                                </Text>
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
        width: 250,
        height: 50,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 60,
        marginBottom: 10,
        textAlign: 'justify',
        padding:10
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
        marginRight: 10,
        padding: 10,
        top: 15
    },

});