//web 272323963993-ksi628rvg9vhj9sec131fmi8va432vdk.apps.googleusercontent.com
//ios 272323963993-0gckeb59ira1tookdqkr9q30bm7l31q7.apps.googleusercontent.com
//android 272323963993-of8vns30pj8hg9i3j2t3srvh0g3ggot9.apps.googleusercontent.com

import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = React.useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "452060283375-3bmj8u6560g2rfi3g6ujplu6vglv3cou.apps.googleusercontent.com",
        iosClientId: "452060283375-tg8glke8tq9q3c7uqcpbsmmuvb326sia.apps.googleusercontent.com",
        webClientId: "452060283375-l0o3ba6sdf18549cgu0mpukjnp8orlse.apps.googleusercontent.com",
        expoClientId: "452060283375-m4b7urc6ni5ef46b3g19bgnvrnmobcn1.apps.googleusercontent.com"
    })

    React.useEffect(() => {
        handleSignInWithGoogle();
    }, [response])

    async function handleSignInWithGoogle() {
        const user = await AsyncStorage.getItem("@user");
        if (!user) {
            if (response?.type === "success")
                await getUserInfo(response.authentication?.accessToken);

        } else {
            AsyncStorage.removeItem("@user");
        }
    }



    const getUserInfo = async (token: any) => {
        if (!token) return;
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const user = await response.json();
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUserInfo(user);
            navigation.navigate("Serpa News", { userInfo: user })
        } catch (error) {
            // Add your own error handler here
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <TouchableOpacity onPress={() => promptAsync()}>
                <Text>Login com Google</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
