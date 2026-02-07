import { View, TextInput, Button, StyleSheet, Text, FlatList ,TouchableOpacity } from 'react-native';
import { useState ,useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage"

type Book = {
    id : string,
    name : string,
    price : string
}

export default function Home(){

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

    async function removeBook(id:string) {
        const newBook = allBook.filter((_,i) =>_.id != id)
        await AsyncStorage.setItem("book", JSON.stringify(newBook))
        setAllBook(newBook)
    }




    

    return (
        // 1. ใส่ style container ตรงนี้
        <View style={styles.container}>
            <FlatList
                style={{ width: '100%' }} // ให้ list กว้างเต็มจอ
                contentContainerStyle={{ alignItems: 'center' }} // จัดรายการให้อยู่กลางแนวนอน
                data={allBook}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item})=>(
                    // 2. ใส่ style item ตรงนี้ (จัดตัวหนังสือกลาง + เว้นระยะห่าง)
                    <View style={styles.item}>
                        <Text>รหัส : {item.id}</Text>
                        <Text>เรื่อง : {item.name}</Text>
                        <Text>ราคา : {item.price}</Text>
                        
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: 'red',
                                borderRadius: 5,
                                padding: 9,
                                alignSelf: 'center', // ให้ปุ่มอยู่กลาง
                                marginTop: 15
                            }} 
                            onPress={() => removeBook(item.id)}>
                            <Text style={{color:"red"}}>ลบ</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,                // เต็มจอ
        justifyContent: 'center', 
        alignItems: 'center',   // จัดกลาง
        paddingTop: 50          // เว้นขอบบน
    },
    item: {
        alignItems: 'center',   // จัดตัวหนังสือในรายการให้อยู่กลาง
        marginBottom: 20,       // เว้นระยะห่างแต่ละรายการ
        borderBottomWidth: 1,   // (แถม) ขีดเส้นใต้จางๆ แบ่งรายการ
        borderBottomColor: '#eee',
        paddingBottom: 10,
        width: 250              // กำหนดความกว้างรายการหน่อยจะได้ดูเป็นระเบียบ
    }
})