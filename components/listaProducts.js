import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { useNavigation, useFocusEffect  } from "@react-navigation/native";
import { ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

//import DB
import { addDoc, collection, getFirestore, getDocs } from "firebase/firestore";
import app from "../AccesoFirebase";


const db = getFirestore(app)

export default function ListProducts(props) {

    //variable para guardar la navegación
    const navigation = useNavigation()
    const [loading, setLoading] = useState(true)
    const [listar, setListar] = useState([])

    const getListar = async () => {
        try {
          const qyCollection = await getDocs(collection(db, 'Product'));
          const Products = [];
          qyCollection.forEach((product) => {
            const { nombreCompleto, codigo, cantidad, fcadu } = product.data();
            Products.push({
              id: product.id,
              nombreCompleto,
              codigo,
              cantidad,
              fcadu
            });
          });
          setListar(Products);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
    
      useFocusEffect(
        React.useCallback(() => {
          setLoading(true);
          getListar();
        }, [])
      );

    if (loading) {
        return(
            <View style={{marginTop: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
                <Text style={{marginBottom: 15, fontSize:20}}>CARGANDO...</Text>
                <ActivityIndicator size={70} color='#871F1F' style={{marginTop: 15}}/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/imagenes/image2.png')} style={styles.background}></ImageBackground>

            <Image source={require('../assets/imagenes/logo_fruit-sf.png')} style={styles.logo} />

            <View style={styles.card} >
                <Text style={styles.titulo}>Lista de Productos</Text>
                <Text style={styles.subtitulo}>A continuacion se listarán los productos que hay actualmente</Text>
                <View>
                    <ScrollView >
                        {
                            listar.map((lista) => (
                                <View style={styles.productItem} key={lista.id}>
                                    <Text style={styles.productName}
                                        onPress={() => props.navigation.navigate('mostrarProducto', { ProductsId: lista.id })}
                                    > {lista.nombreCompleto} </Text>
                                    <TouchableOpacity>
                                        <MaterialCommunityIcons name="eye" color={"black"} size={35} style={{ marginLeft: 10, top: 10 }}
                                            onPress={() => props.navigation.navigate('mostrarProducto', { ProductsId: lista.id })} />
                                    </TouchableOpacity>
                                </View>

                            ))
                        }
                    </ScrollView>

                </View>

                <TouchableOpacity onPress={() => navigation.navigate("home")} style={{ marginTop: 30 }}>
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
        fontSize: 30,
        textAlign: "center",
        marginTop: 10,
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
        marginBottom: 50,
        backgroundColor: '#D9D9D9',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        width: 300,
        height: 'auto',
        marginRight: 'auto',
        marginLeft: 'auto',
        bottom: 60,
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
        marginBottom: 16,
        shadowColor: '#000',
        textShadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

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
        top: 10
    },
});
