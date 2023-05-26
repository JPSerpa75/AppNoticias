import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListarNoticias from '../screens/ListarNoticias';
import CadastrarNoticia from '../screens/CadastrarNoticia';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Logo from '../components/Logo';


const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerRight: () => <Logo/>,
            headerStyle:{
                backgroundColor: "#FEFBF3"
            },
            headerTitleStyle:{
                fontSize: 24,
                color: "#eb1c24"
            },
            tabBarIcon: ({ focused, color, size }) => {
                let icon;

                if (route.name === 'Notícias') {
                    icon = faNewspaper;
                } else if (route.name === 'Nova Notícia') {
                    icon = faPlus;
                }

                return icon ? <FontAwesomeIcon icon={icon} size={size} color={color} /> : null;
            },
        })}
        tabBarOptions={{
            activeTintColor: "#eb1c24",
            tabStyle: {
                backgroundColor: "#FEFBF3",
            },
            labelStyle:{
                fontSize: 12,
                fontWeight: "bold",
            }
        }}
    >
        <Tab.Screen name="Notícias" component={ListarNoticias} />
        <Tab.Screen name="Nova Notícia" component={CadastrarNoticia} />
    </Tab.Navigator>
);