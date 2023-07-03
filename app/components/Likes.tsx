import { collection, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Likes = ({ item }) => {
    const [likedItems, setLikedItems] = useState<any>({});

    const handleLike = async (itemId: any) => {

        try {
            const colecao = collection(FIRESTORE_DB, "Noticias")
            const noticia = doc(colecao, itemId);
            var updatedData = null;
            if (likedItems[itemId]) {
                updatedData = {
                    likes: --item.likes,
                };
            } else {
                updatedData = {
                    likes: ++item.likes,
                };

            }

            await updateDoc(noticia, updatedData);
        } catch (error) {
            alert("Não foi possivel dar like! " + error);
        }


        setLikedItems((prevLikedItems: any) => {
            const updatedLikedItems = {
                ...prevLikedItems,
                [itemId]: !prevLikedItems[itemId],
            };
            return updatedLikedItems;
        });
    };




    const isLiked = likedItems[item.id] || false;
    const iconColor = isLiked ? '#eb1c24' : '#9D9D9D';

    return (
        <TouchableOpacity style={styles.like} onPress={() => handleLike(item.id)}>
            <FontAwesomeIcon icon={faHeart} size={20} color={iconColor} />
            <Text style={styles.text}>{item.likes}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    like: {
        flexGrow: 1,
        flexDirection: "row",
        gap: 8
    },
    text: {
        color: "#9D9D9D",
        fontWeight: "bold"
    }
})



export default Likes;