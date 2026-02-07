
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
// เรียกloaaBook  ทำงานทุกครั้งที่ตัวแปร allBook มีการเปลี่ยนแปลงค่า  "
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
        
        const newBook = [...allBook, book]
        // 2
        await AsyncStorage.setItem("book", JSON.stringify(newBook))
        // เอาของใหม่มาต่อ เอาข้อมูล newboook มาแทน book
        setAllBook(newBook)
        

        setBookName("")
        setBookPrice("")
    }

   return (
        
        // style={myStyles.container} คือการจัดหน้าจอ (อยู่กึ่งกลาง) ตามที่กำหนดไว้ข้างล่าง
        <View style={myStyles.container}>

            
            <Text>ชื่อหนังสือ</Text>

            {/* ช่องกรอกข้อมูล (Input) สำหรับชื่อหนังสือ */}
            <TextInput
                value={bookName}              // เชื่อมค่าในช่องนี้กับตัวแปร bookName (ถ้าตัวแปรเปลี่ยน ข้อความเปลี่ยน)
                onChangeText={setBookName}    // เมื่อพิมพ์ข้อความ ให้เอาค่าใหม่ไปใส่ในตัวแปร bookName ทันที
                style={myStyles.input}        // กำหนดความสวยงาม (กรอบ, ความกว้าง)
            />

            {/* แสดงข้อความคำว่า "ราคาหนังสือ" เป็นหัวข้อ */}
            <Text>ราคาหนังสือ </Text>

            {/* ช่องกรอกข้อมูล (Input) สำหรับราคา */}
            <TextInput 
                value={bookPrice}             // เชื่อมค่าในช่องนี้กับตัวแปร bookPrice
                onChangeText={setBookPrice}   // เมื่อพิมพ์ ให้เอาค่าไปใส่ในตัวแปร bookPrice
                style={myStyles.input}        // ใช้สไตล์เดียวกับช่องชื่อหนังสือ
            />

            {/* ปุ่มกดบันทึก */}
            <Button 
                title="บันทึก"                // ข้อความที่จะปรากฏบนปุ่ม
                onPress={() => addBook()}     // สั่งว่า "ถ้าโดนกด" ให้ไปเรียกฟังก์ชัน addBook() ทำงาน
            />

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