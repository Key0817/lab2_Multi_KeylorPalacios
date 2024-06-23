import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Importacion de los documentos de para enrutar 
import Acceso from "./components/access";
import Crear from "./components/create";
import Productos from "./components/products";
import HomePage from "./components/principal";
import ListProducts from "./components/listaProducts";
import MostrarProducto from "./components/mostrarProducto";
import ApiAprender from "./components/aprender";
import MostrarFruta from "./components/mostrarFuta";


const StackNav = createStackNavigator();

function Stacks() {
    return (
      <StackNav.Navigator
        initialRouteName="access"
        screenOptions={{ headerShown: false }}>
        <StackNav.Screen name="access" component={Acceso} />
        <StackNav.Screen name="create" component={Crear} />
        <StackNav.Screen name="products" component={Productos} />
        <StackNav.Screen name="home" component={HomePage} />
        <StackNav.Screen name="listProducts" component={ListProducts} />
        <StackNav.Screen name="mostrarProducto" component={MostrarProducto} />
        <StackNav.Screen name="aprender" component={ApiAprender} />
        <StackNav.Screen name="mostrarFruta" component={MostrarFruta} />
      </StackNav.Navigator>
    );
  }

  
export default function Navegacion() {
    return (
      <NavigationContainer>
        <Stacks />
      </NavigationContainer>
    );
  }