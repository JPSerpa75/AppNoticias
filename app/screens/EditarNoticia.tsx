import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FIRESTORE_DB, FIRESTORE_STORAGE } from "../../firebaseConfig";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClone } from '@fortawesome/free-solid-svg-icons';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


const EditarNoticia = ({ route }: any) => {
    const navigation = useNavigation();
    const userInfo = route.params.userInfo;
    const id = route.params.id;
    const [noticia, setNoticia] = useState<any>({});
    const [image, setImage] = useState("");

    const img = image != "" ? image : noticia.imagem;


    const loadNoticia = async () => {
        const colecao = doc(FIRESTORE_DB, "Noticias", id);
        const colecaoSnapshot = await getDoc(colecao);
        if (colecaoSnapshot.exists()) {
            setNoticia({
                id: colecaoSnapshot.id,
                ...colecaoSnapshot.data(),
            });
        }
    }

    useEffect(() => { loadNoticia(); }, [])

    const handleAtualizaValor = (key: string, t: string) => {
        setNoticia({
            ...noticia,
            [key]: t,
        });
    };

    const selecionarNewImagem = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.assets![0].uri)
        }
    }



    const updateNoticia = async () => {
        try {
            if (noticia.titulo.trim().length == 0 || noticia.descricao.trim().length == 0 || (noticia.imagem.trim().length == 0 || image.trim().length == 0)) {
                alert("Preencha todos os campos!");
                return;
            }

            const storageRef = ref(FIRESTORE_STORAGE, 'images/' + new Date().getTime());
            const response = await fetch(image);
            const blob = await response.blob();
            await uploadBytes(storageRef, blob);
            const url = await getDownloadURL(storageRef);

            await handleAtualizaValor("imagem", url);

            var updatedData = noticia;
            updatedData = {
                ...noticia,
                imagem: url
            }

            const colecao = doc(FIRESTORE_DB, "Noticias", id);
            await updateDoc(colecao, updatedData);
            navigation.navigate("Serpa News", { userInfo: userInfo });

        } catch (error) {
            alert("Não foi possível atualizar notícia! " + error)
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{alignItems: "center"}}>
            <View style={styles.card}>
                <TextInput style={styles.cardTitle} value={noticia.titulo} onChangeText={(t) => handleAtualizaValor("titulo", t)} />
                <TouchableOpacity style={styles.btnAlterImg} onPress={() => selecionarNewImagem()}>
                    <FontAwesomeIcon icon={faClone} size={25} color="#F8F0DF" />
                    <Text style={styles.textBtnImg} >Alterar Imagem</Text>
                </TouchableOpacity>
                <Image style={styles.img} source={{ uri: img }} resizeMode="cover" />
                <View style={styles.areaData}>
                    <Text style={styles.textData}>Data publicação:</Text>
                    <Text style={styles.textData}>{noticia.dataCriacao}</Text>
                </View>

                <TextInput style={styles.descricao} value={noticia.descricao} onChangeText={(t) => handleAtualizaValor("descricao", t)} 
                    multiline={true}
                    numberOfLines={4} />
            </View>
            

            <TouchableOpacity onPress={() => updateNoticia()} style={styles.btnSalvar}>
                <Text style={styles.btnTextSalvar}>Salvar Notícia</Text>
            </TouchableOpacity>
            <Text style={styles.madeBy}>Made by: Serpa</Text>

        </ScrollView>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#79B4B7",
    },
    card: {
        width: "100%",
        marginVertical: 10,
        backgroundColor: "#F8F0DF",
        padding: 20,
        borderRadius: 12,
        // Sombras específicas para Android
        elevation: 5,

        // Sombras específicas para iOS
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
            },
        }),
    },
    cardTitle: {
        fontSize: 20,
        color: "#eb1c24",
        fontWeight: "bold",
        textAlign: "center",
    },
    img: {
        width: "100%",
        height: 250,
        borderRadius: 12,
        marginTop: 12,
    },
    areaData: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
        marginTop: 2,
    },
    textData: {
        color: "#9D9D9D",
        fontSize: 12,
    },
    descricao: {
        color: "#79B4B7",
        fontSize: 16,
        fontWeight: "600",
    },
    madeBy: {
        color: "#FEFBF3",
        marginTop: 15,
        fontSize: 9
    },
    btnAlterImg: {
        flexDirection: "row",
        backgroundColor: "#9D9D9D",
        marginTop: 16,
        padding: 12,
        borderRadius: 8,
        gap: 16,
        justifyContent: "center",
    },
    textBtnImg: {
        alignSelf: "center",
        color: "#F8F0DF",
        fontWeight: "bold",
        fontSize: 16
    },
    btnSalvar: {
        backgroundColor: "#eb1c24",
        marginVertical: 10,
        padding: 16,
        borderRadius: 40,
        width: "100%"
    },
    btnTextSalvar: {
        textAlign: "center",
        color: "#F8F0DF",
        fontSize: 18,
        fontWeight: "bold",
    }
})

export default EditarNoticia;