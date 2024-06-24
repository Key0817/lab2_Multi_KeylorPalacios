import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { addDoc, collection, getFirestore, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import app from "../AccesoFirebase";

export default function Favoritos() {
    const navigation = useNavigation();
    const db = getFirestore(app)

    const [isLoading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [initData, setInitData] = useState([]);
    const [data, setData] = useState([]);


    const getFavoritos = async () => {
        try {
            const qyCollection = await getDocs(collection(db, 'Favoritos'));
            const favoritos = qyCollection.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                family: doc.data().family,
                nutritions: {
                    calories: doc.data().nutritions.calories,
                    carbohydrates: doc.data().nutritions.carbohydrates,
                    fat: doc.data().nutritions.fat,
                    protein: doc.data().nutritions.protein,
                    sugar: doc.data().nutritions.sugar,
                }
            }));
            setInitData(favoritos);
            setData(favoritos);
            setLoading(false);
        } catch (error) {
            console.log('Error getting documents:', error);
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            getFavoritos();
        }, [])
    );

    useEffect(() => {
        if (busqueda === '') {
            setData(initData);
        } else {
            const newData = initData.filter(item => item.name.toLowerCase().includes(busqueda.toLowerCase()));
            setData(newData);
        }
    }, [busqueda, initData]);

    const aviso = (id, name) => {
        Alert.alert(`Eliminar ${name}`, '¿Quieres eliminar esta fruta?', [
            { text: 'Eliminar', style: 'destructive', onPress: () => eliminarFavorito(id) },
            { text: 'Cancelar', style: 'cancel', onPress: () => console.log('Cancelado') },
        ]);
    };

    const eliminarFavorito = async (id) => {
        try {
            await deleteDoc(doc(db, "Favoritos", id));
            const newInitData = initData.filter(item => item.id !== id);
            setInitData(newInitData);
            setData(newInitData);
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };

    const recargar = () => {
        setBusqueda('');
        getFavoritos();
    };

    const verFavorito = (fruit) => {
        navigation.navigate("mostarFavorito", { fruit });
    };

    return (
        <View style={styles.container}>
            <View style={styles.productItem}>
                <TextInput placeholder='Buscar Fruta' style={styles.inputTxt}
                    value={busqueda}
                    onChangeText={setBusqueda}
                />

                <TouchableOpacity style={{ marginTop: 15, marginLeft: 8 }} onPress={recargar}>
                    <MaterialCommunityIcons name="reload" color={"green"} size={35} style={{ marginLeft: 10, top: 26, left: 12 }} />
                    <Text style={styles.iconTXT}> Recargar</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.titulo}>Lista de Frutas Favoritas</Text>
            {isLoading ? (
                <View style={{ marginTop: '40%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Text style={{ marginBottom: 15, fontSize: 20 }}>Cargando...</Text>
                    <ActivityIndicator size={80} color='#871F1F' style={{ marginTop: 15, marginBottom: 30 }} />
                </View>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.productName}
                                onPress={() => navigation.navigate("mostarFavorito", { fruit: item })}
                            >{item.name}</Text>
                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                <MaterialCommunityIcons name="delete" color={"#871F1F"} size={30} style={{ marginLeft: 8, right: 8, top: 2.5 }}
                                    onPress={() => aviso(item.id, item.name)} />

                                <MaterialCommunityIcons name="eye" color={"black"} size={30} style={{ marginLeft: 8, right: 8 }}
                                    onPress={() => verFavorito(item)} />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
            <TouchableOpacity onPress={() => navigation.navigate("aprender")} style={{ marginTop: 30 }}>
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
    titulo: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
        marginTop: 5,
        marginBottom: 10,
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

    iconTXT: {
        fontSize: 14,
        Right: 10,
        Left: 10,
        padding: 10,
        top: 15
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
    productName: {
        fontSize: 18,
        marginRight: 10,
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
        borderRadius: 20,
        marginTop: 'auto',
        shadowColor: '#000',
        textShadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
