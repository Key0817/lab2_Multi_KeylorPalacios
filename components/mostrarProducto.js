import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { TextInput, ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

//import DB
import { addDoc, collection, getFirestore, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import app from "../AccesoFirebase";
import Productos from './products';
import firebase from 'firebase/compat/app';


const db = getFirestore(app)

export default function MostrarProducto(props) {

    //variable para guardar la navegación
    const navigation = useNavigation()

    const [loading, setLoading] = useState(true)

    const [product, setProduct] = useState([{
        nombreCompleto: '',
        codigo: '',
        cantidad: '',
        fcadu: '',
    }])
    const getProduct = async (id) => {
        try {
            const ref = doc(db, 'Product', id)
            const datos = await getDoc(ref)
            setProduct(datos.data())
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProduct(props.route.params.ProductsId)
    }, [])

    const eliminarProducto = async (id) => {
        await deleteDoc(doc(db, 'Product', id))
        props.navigation.navigate('listProducts')
    }

    const aviso = (id) => {
        Alert.alert(`Eliminar ${product.nombreCompleto}`, '¿Quieres eliminar este producto?', [
            { text: 'Eliminar', style: 'destructive', onPress: () => eliminarProducto(id) },
            { text: 'Cancelar', style: 'cancel', onPress: () => console.log(false) },
        ]);
    }

    const HandleChangeText = (name, value) => {
        setProduct({ ...product, [name]: value });
    };

    const updateProduct = async (id) => {
        await updateDoc(doc(db, 'Product', id), product);
        props.navigation.navigate('listProducts')
    }

    if (loading) {
        return (
            <View style={{ marginTop: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Text style={{ marginBottom: 15, fontSize: 20 }}>CARGANDO...</Text>
                <ActivityIndicator size={70} color='#871F1F' style={{ marginTop: 15 }} />
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/imagenes/image2.png')} style={styles.background}></ImageBackground>

            <Image source={require('../assets/imagenes/logo_fruit-sf.png')} style={styles.logo} />


            <View style={styles.card} >
                <Text style={styles.titulo}>Información del producto</Text>
                <Text style={styles.subtitulo}>A continuacion, se mostrará la infromacion del producto seleccionado</Text>
                <View style={styles.caracP}>

                    <TextInput
                        value={product.nombreCompleto}
                        keyboardType="ascii-capable"
                        placeholder="Nombre Producto"
                        style={styles.inputTxt}
                        onChangeText={(value) => HandleChangeText("nombreCompleto", value)}
                    />
                    <TextInput
                        value={product.codigo}
                        keyboardType="ascii-capable"
                        placeholder="Codigo Producto"
                        style={styles.inputTxt}
                        onChangeText={(value) => HandleChangeText("codigo", value)}

                    />
                    <TextInput
                        value={product.cantidad}
                        keyboardType="ascii-capable"
                        placeholder="Cantidad Producto"
                        style={styles.inputTxt}
                        onChangeText={(value) => HandleChangeText("cantidad", value)}

                    />
                    <TextInput
                        value={product.fcadu}
                        keyboardType="ascii-capable"
                        placeholder="Fecha Caducacion"
                        style={styles.inputTxt}
                        onChangeText={(value) => HandleChangeText("fcadu", value)}

                    />
                </View>

                <View style={styles.productItem}>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="delete" color={"red"} size={35} style={{ marginLeft: 16, top: 30 }}
                            onPress={() => aviso(props.route.params.ProductsId)}
                        />
                        <Text style={styles.productName}> Eliminar</Text>
                    </TouchableOpacity>


                    <TouchableOpacity>
                        <MaterialCommunityIcons name="reload" color={"green"} size={35} style={{ marginLeft: 25, top: 30 }}
                            onPress={() => updateProduct(props.route.params.ProductsId)}
                        />
                        <Text style={styles.productName}> Actualizar</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("listProducts")} style={{ marginTop: 30 }}>
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
    },

    subtitulo: {
        color: "#000",
        fontSize: 15,
        textAlign: 'justify',
        marginBottom: 5,
        marginTop: 8,
        marginLeft: 10,
        marginRight: 10,
    },

    caracP: {
        marginLeft: 8,
        marginBottom: 10,

    },

    productName: {
        fontSize: 16,
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

        marginTop: 30,
        marginBottom: 20,
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
        marginBottom: 10,
        marginTop: 20,
    },
    productName: {
        fontSize: 18,
        marginRight: 10,
        top: 30
    },
    inputTxt: {
        borderColor: 'gray',
        backgroundColor: "#D9D9D9",
        width: 300,
        height: 50,
        marginRight: 'auto',
        marginLeft: 'auto',
        top: 20,

    },
});
