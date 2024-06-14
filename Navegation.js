import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Importacion de los documentos de para enrutar 
import Acceso from "./components/access";
import Crear from "./components/create";
import Productos from "./components/products";

const StackNav = createStackNavigator();

function Stacks() {
    return (
      <StackNav.Navigator
        initialRouteName="access"
        screenOptions={{ headerShown: false }}>
        <StackNav.Screen name="access" component={Acceso} />
        <StackNav.Screen name="create" component={Crear} />
        <StackNav.Screen name="products" component={Productos} />
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