import { SafeAreaView, View, Text, FlatList, TextInput } from "react-native";


export default function TodoListScreen() {
 
    return (
        <SafeAreaView>
            <Text>Welcome, it's your todo list</Text>
            <TextInput placeholder="Write todo name"/>
            <FlatList/>
        </SafeAreaView>
    )
}