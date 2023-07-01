import React from 'react';
import { Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const Sair = () => {
    const navigation  = useNavigation();
    function goBack(){
        navigation.navigate("Login", {userInfo: null})
    }

    return (
        <TouchableOpacity style={{padding: 15}} onPress={goBack}>
            <FontAwesomeIcon icon={faRightFromBracket} size={25} color="#eb1c24" />
        </TouchableOpacity>
    );
};

export default Sair;
