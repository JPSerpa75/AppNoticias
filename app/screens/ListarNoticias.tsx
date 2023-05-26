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
                            <Text style={styles.textData}>Data publicação:</Text>
                            <Text style={styles.textData}>{item.dataCriacao}</Text>
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
        backgroundColor: "#79B4B7",
    },
    title:{
        color: "#F8F0DF",
        fontSize: 24,
        fontWeight: "bold"
    },
    list:{
        marginVertical: 20,
        flex: 1,
    },
    card:{
        marginVertical: 10,
        backgroundColor: "#F8F0DF",
        padding: 20,
        borderRadius: 12,
    },
    cardTitle:{
        fontSize: 20,
        color: "#eb1c24",
        fontWeight: "bold",
        textAlign: "center",
    },
    img:{
        width: 250,
        height: 250,
        borderRadius: 12,
        marginTop: 16,
    },
    areaData:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12, 
        marginTop: 2,   
    },
    textData:{
        color: "#9D9D9D",
        fontSize: 12,
    },
    madeBy:{
        color: "#FEFBF3",
        marginBottom: -10,
        fontSize: 9
    }
})

export default ListarNoticias;