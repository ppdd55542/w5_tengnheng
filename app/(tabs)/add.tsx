
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useState ,useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage"

type Book = {
    id : string,
    name : string,
    price : string
}

export default function Add() {
    const [bookName, setBookName] = useState("")
    const [bookPrice, setBookPrice] = useState("")
    const [allBook, setAllBook] = useState<Book[]>([])

    useEffect(() => {
        loadBook()
    }, [allBook])

    async function loadBook() {
       const data = await AsyncStorage.getItem("book")
       if(data !== null){
            setAllBook(JSON.parse(data))
       }  
    }

    async function addBook() {
        const book = {
            id : Date.now().toString(),
            name: bookName,
            price : bookPrice
        }
        console.log(book)

        const newBook = [...allBook, book]
        await AsyncStorage.setItem("book", JSON.stringify(newBook))
        setAllBook(newBook)

        setBookName("")
        setBookPrice("")
    }

    return (
        <View style={myStyles.container}>

        <Text>ชื่อหนังสือ</Text>
        <TextInput
        value={bookName}
        onChangeText={setBookName}
        style={ myStyles.input } />
            <Text>ราคาหนังสือ </Text>
            <TextInput 
            value={bookPrice}
            onChangeText={setBookPrice}
            style = { myStyles.input } />
                <Button title="บันทึก"onPress={() => addBook()} />
        </View>
    )
}

const myStyles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center', // จัดกึ่งกลางแนวตั้ง
        alignItems: 'center'      // จัดกึ่งกลางแนวนอน
    },
    input: {
        width: "80%",
        borderWidth: 1,
        marginBottom: 10
    }
})