import React, { useEffect, useState } from "react";
import { View, Button, Text, TextInput, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { FIRESTORE_DB, FIRESTORE_STORAGE } from "../../firebaseConfig";
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage';


const CadastrarNoticia = () => {
    const [titulo, setTitulo] = useState("")
    const [descricao, setDescricao] = useState("")
    const [image, setImage] = useState()

    const selecionarImagem = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });        

        if(!result.cancelled){
            setImage(result.uri);
        }
        
    }

    async function convertImageToBase64(uri: any) {
        const response = await fetch(uri);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        })
    }

    const salvarNoticia = async () => {
        try {
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
            };
        
            const docRef = await addDoc(collection(FIRESTORE_DB, 'Noticias'), docData);


          } catch (error) {
            alert("Erro ao criar notícia" + error)
          }
    }

    function dataFormatada() {
        var data = new Date(),
            dia  = data.getDate(),
            mes  = data.getMonth() + 1,
            ano  = data.getFullYear();
        return [dia, mes, ano].join('/');
    }

    return (
        <View>
            <Text>Título:</Text>
            <TextInput value={titulo} onChangeText={(n: string) => setTitulo(n)} />
            <Text>Descricão:</Text>
            <TextInput value={descricao} onChangeText={(n: string) => setDescricao(n)} />
            {  image != null &&
                <Image style={{width: 50, height: 50}} source={{uri:image}} />
            }
            
            <Button title="Selecionar arquivos" onPress={selecionarImagem} />

            <Button title="Criar notícia" onPress={() => salvarNoticia()}/>

        </View>
    );
}

export default CadastrarNoticia;