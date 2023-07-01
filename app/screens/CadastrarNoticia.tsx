import React, { useEffect, useState } from "react";
import { View, Button, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { FIRESTORE_DB, FIRESTORE_STORAGE } from "../../firebaseConfig";
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage';
import { useNavigation } from "@react-navigation/native";


const CadastrarNoticia = ({route}) => {
    const userInfo = route.params.userInfo;
    const navigation = useNavigation()
    const [titulo, setTitulo] = useState("")
    const [descricao, setDescricao] = useState("")
    const [image, setImage] = useState("")

    const selecionarImagem = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    const salvarNoticia = async () => {
        try {
            if (titulo.trim().length == 0 || descricao.trim().length == 0 || image.trim().length == 0) {
                alert("Preencha todos os campos!");
                return;
            }
            const storageRef = ref(FIRESTORE_STORAGE, 'images/' + new Date().getTime());
            const response = await fetch(image);
            const blob = await response.blob();

            await uploadBytes(storageRef, blob);
            const imageUrl = await getDownloadURL(storageRef);

            const docData = {
                titulo: titulo,
                descricao: descricao,
                imageUrl: imageUrl,
                dataCriacao: dataFormatada(),
                criador: userInfo.email,
                likes: 0,
            };

            const docRef = await addDoc(collection(FIRESTORE_DB, 'Noticias'), docData);
            setTitulo("");
            setDescricao("");
            setImage("");
            

        } catch (error) {
            alert("Erro ao criar notícia" + error)
        }
    }

    function dataFormatada() {
        var data = new Date(),
            dia = data.getDate(),
            mes = data.getMonth() + 1,
            ano = data.getFullYear();
        return [dia, mes, ano].join('/');
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Nova Notícia</Text>
            <Text style={styles.label}>Título:</Text>
            <TextInput style={styles.input} value={titulo} onChangeText={(n: string) => setTitulo(n)} />
            <Text style={styles.label}>Descricão:</Text>
            <TextInput
                style={styles.input}
                value={descricao}
                onChangeText={(n: string) => setDescricao(n)}
                multiline={true}
                numberOfLines={4} />

            <View style={styles.vwImage}>
                <TouchableOpacity style={styles.areaBtnImage} onPress={selecionarImagem}>
                    <Text style={styles.textBtnImage}>Imagem</Text>
                </TouchableOpacity>

                {image != null &&
                    <Image style={styles.img} source={{ uri: image }} resizeMode="cover" />
                }
            </View>


            <TouchableOpacity style={styles.areaBtnNew} onPress={() => salvarNoticia()}>
                <Text style={styles.textBtnNew}>Criar nova notícia</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        padding: 24,
        backgroundColor: "#79B4B7",
    },
    title: {
        color: "#F8F0DF",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    label: {
        fontSize: 18,
        color: "#F8F0DF",
        fontWeight: "bold",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "#F8F0DF",
        color: "#eb1c24",
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
        fontWeight: "700",
        borderRadius: 8,
        textAlignVertical: "top"
    },
    areaBtnNew: {
        backgroundColor: "#eb1c24",
        marginVertical: 10,
        padding: 16,
        borderRadius: 40
    },
    textBtnNew: {
        textAlign: "center",
        color: "#F8F0DF",
        fontSize: 16,
        fontWeight: "bold",
    },
    areaBtnImage: {
        width: "25%",
        marginVertical: 10,
        padding: 8,
        borderRadius: 12,
        borderWidth: 3,
        borderColor: "#F8F0DF",
        height: 50
    },
    textBtnImage: {
        textAlign: "center",
        color: "#F8F0DF",
        fontSize: 16,
        fontWeight: "bold",
    },
    img: {
        width: "70%",
        height: 200,
        borderRadius: 10,
    },
    vwImage: {
        flexDirection: "row",
        gap: 20,
        marginBottom: 16,
    }

})

export default CadastrarNoticia;