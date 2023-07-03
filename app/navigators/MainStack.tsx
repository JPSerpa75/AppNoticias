import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import mainTab from '../navigators/MainTab';
import { useNavigation, useRoute } from '@react-navigation/native';
import Logo from '../components/Logo';
import Sair from '../components/Sair';
import EditarNoticia from '../screens/EditarNoticia';
const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: "#FEFBF3"
                },
                headerTitleStyle: {
                    fontSize: 24,
                    color: "#eb1c24"
                },
            }}
        >
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Serpa News" component={mainTab}
                options={{
                    headerLeft: () => <Logo />,
                    headerRight: () => <Sair />
                }}
            />
            <Stack.Screen name="Editar Notícia" component={EditarNoticia}
                options={{
                    headerRight: () => <Logo />,
                    headerTintColor: "#eb1c24"
                }}
            />
        </Stack.Navigator>
    );
};