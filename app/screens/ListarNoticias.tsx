import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";

const ListarNoticias = () => {
    const [noticias, setNoticias] = useState<any[]>([]);


    const subscriber = () => {
        const NoticiasRef = collection(FIRESTORE_DB, "Noticias");
        const subscriber = onSnapshot(NoticiasRef, {
            next: (snapshot) => {
                const noticias: any[] = [];
                snapshot.docs.forEach((doc) => {
                    noticias.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setNoticias(noticias);
            },
        });
    }

    useEffect(() => { subscriber() }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Últimas Notícias</Text>
            <FlatList
                data={noticias}
                style={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>{item.titulo}</Text>
                        <Image style={styles.img} source={{ uri: item.imageUrl }} resizeMode="cover"/>
                        <View style={styles.areaData}>
                            <Text>Data publicação:</Text>
                            <Text>{item.dataCriacao}</Text>
                        </View>
                        
                        <Text>{item.descricao}</Text>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
            <Text style={styles.madeBy}>Made by: Serpa</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        display: "flex",
        flex: 1,
        padding: 16,
        alignItems: "center",
    },
    list:{
        marginVertical: 20,
        flex: 1
    },
    card:{
        marginVertical: 10,
    },
    cardTitle:{
        textAlign: "center",
    },
    img:{
        width: 250,
        height: 250,
        borderRadius: 16,
        marginTop: 16,
    },
    areaData:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12
    },
    madeBy:{
        marginBottom: -10,
        fontSize: 9
    }
})

export default ListarNoticias;