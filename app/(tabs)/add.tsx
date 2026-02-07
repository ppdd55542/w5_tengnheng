
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
// เรียกloaaBook  ทำงานทุกครั้งที่ตัวแปร allBook มีการเปลี่ยนแปลงค่า"
    useEffect(() => {
        loadBook()
    }, [allBook])
// ดึงข้อมูลเก่ามาโชว
    async function loadBook() {
       const data = await AsyncStorage.getItem("book")
       // สั่งให้ไปหาของ: สั่งให้ระบบไปค้นในลิ้นชักความจำของแอป (AsyncStorage) โดยมองหาลิ้นชักที่แปะป้ายชื่อว่า "book"
       if(data !== null){
            setAllBook(JSON.parse(data))
                                            //แปลงข้อความ ให้กลับเป็น Array  
  // s a book   คือการเอาข้อมูลที่แปลงเสร็จแล้ว ไปใส่ในตัวแปร allBook เพื่อให้หน้าจอ React ทำการแสดงผลรายการหนังสือ
       }  
    }

    async function addBook() {
        const book = {
            id : Date.now().toString(),
            name: bookName,
            price : bookPrice
        }
        console.log(book)
        // แสดงผล
        // เช็ค
// 1
        const newBook = [...allBook, book]
        // 2
        await AsyncStorage.setItem("book", JSON.stringify(newBook))
        // เอาของใหม่มาต่อ
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