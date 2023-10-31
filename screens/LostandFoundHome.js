import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    FlatList,
    ScrollView

} from 'react-native'
import React, { useState, useEffect } from 'react';
import { IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const LostandFoundHome = () => {

    const navigation = useNavigation();

    //Init local states
    const [inputDetailArea, setInputDetailArea] = useState("");
    const [inputDetailDate, setInputDetailDate] = useState("");
    const [inputDetailcontact, setInputDetailcontact] = useState("");
    const [inputDetailBreed, setInputDetailBreed] = useState("");
    const [inputDetailiMark, setInputDetailMark] = useState("");
    const [inputDetailReward, setInputDetailReward] = useState("");

    const [inputDetailList, setInputDetailList] = useState([]);
    const [editedList, setEditedList] = useState(null);

    // Load the data from AsyncStorage
    useEffect(() => {
        AsyncStorage.getItem('inputDetailList')
            .then((data) => {
                if (data) {
                    setInputDetailList(JSON.parse(data));
                }
            })
            .catch((error) => {
                console.error('Error loading data:', error);
            });
    }, []);
    // Save the data to AsyncStorage
    useEffect(() => {
        const dataToSave = JSON.stringify(inputDetailList);
        AsyncStorage.setItem('inputDetailList', dataToSave)
            .catch((error) => {
                console.error('Error on saving:', error);
            });
    }, [inputDetailList]);

    //handle Add Notice Details
    const handleAddNoticeDetails = () => {



        //structure of a single Notice item
        // {
        //     id:
        //     Area:
        //     Date:
        //     Contact:
        //     Breed:
        //     Identification:
        //     Reward:
        // }

        //create copy of the inputDetailList state

        // console.log(Date.now().toString());
        // //return unique milisecond from particular point
        if (inputDetailArea === "" &&
            inputDetailDate === "" &&
            inputDetailcontact === "" &&
            inputDetailBreed === "" &&
            inputDetailiMark === "" &&
            inputDetailReward === "") {

                alert("Fill the Empty Feilds");
                return; // check empty item
        }

        if (inputDetailArea === "") {

                alert("Fill the Area Feild");
                return; // check empty item
        }
        if (inputDetailDate === "") {

                alert("Fill the Date Feild");
                return; // check empty item
        }
        if (inputDetailcontact === "") {

                alert("Fill the Contact Number Feild");
                return; // check empty item
        }
        if (inputDetailBreed === "") {

                alert("Fill the Breed Feild");
                return; // check empty item
        }
        if (inputDetailiMark === "") {

                alert("Fill the Identification Marks Feild");
                return; // check empty item
        }
        if (inputDetailReward === "") {

                alert("Fill the Reward Feild");
                return; // check empty item
        }
        
        setInputDetailList([...inputDetailList, {
            id: Date.now().toString(),
            Area: inputDetailArea,
            Date: inputDetailDate,
            Contact: inputDetailcontact,
            Breed: inputDetailBreed,
            Identification: inputDetailiMark,
            Reward: inputDetailReward
        }]);

        // alert("Successfully Added");

        setInputDetailArea("");
        setInputDetailDate("");
        setInputDetailcontact("");
        setInputDetailBreed("");
        setInputDetailMark("");
        setInputDetailReward("");

        navigation.navigate("LFsuccess");
        // ---------------------------------------------------------------------------------------------------------------

    }

    //handle notice Delete
    const handlenoticeDelete = (id) => {
        const updateInputDetailList = inputDetailList.filter((inputDetailArea) => inputDetailArea.id != id)
        setInputDetailList(updateInputDetailList);

        alert("Successfully Deleted");
    }

    //handle notice edit
    const handlenoticeEdit = (inputDetailArea) => {

        setEditedList(inputDetailArea);

        setInputDetailArea(inputDetailArea.Area);
        // editedList
        setInputDetailDate(inputDetailArea.Date);
        setInputDetailcontact(inputDetailArea.Contact);
        setInputDetailBreed(inputDetailArea.Breed);
        setInputDetailMark(inputDetailArea.Identification);
        setInputDetailReward(inputDetailArea.Reward);
    }

    //handle notice Update
    const handlenoticeUpdate = () => {
        const updatedNotices = inputDetailList.map((item) => {
            if (item.id === editedList.id) {
                return {
                    ...item,
                    Area: inputDetailArea,
                    Date: inputDetailDate,
                    Contact: inputDetailcontact,
                    Breed: inputDetailBreed,
                    Identification: inputDetailiMark,
                    Reward: inputDetailReward,
                }
            }
            return item

        });

        setInputDetailList(updatedNotices);
        setEditedList(null);

        setInputDetailArea("");
        setInputDetailDate("");
        setInputDetailcontact("");
        setInputDetailBreed("");
        setInputDetailMark("");
        setInputDetailReward("");
    }

    //Render inputDetails
    const renderPets = ({ item, index }) => {
        return (
            <View
                style={{
                    backgroundColor: "#D9D9D9",
                    borderRadius: 16,
                    paddingVertical: 6, paddingTop: 15,
                    paddingHorizontal: 12,
                    marginBottom: 12,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,

                }}>

                <Text style={styles.cardstyle}>Area : {item.Area}</Text>
                <Text style={styles.cardstyle}>Date : {item.Date}</Text>
                <Text style={styles.cardstyle}>Contact : {item.Contact}</Text>
                <Text style={styles.cardstyle}>Breed : {item.Breed}</Text>
                <Text style={styles.cardstyle}>Identification : {item.Identification}</Text>
                <Text style={styles.cardstyle}>Reward : Rs: {item.Reward}</Text>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ flex: 1 }}></Text>
                    <IconButton
                        icon="pencil"
                        iconColor="#000"
                        style={{ borderRadius: 10, backgroundColor: "#fff" }}
                        onPress={() => handlenoticeEdit(item)}
                    />
                    <IconButton
                        icon="trash-can"
                        iconColor="#000"
                        style={{ borderRadius: 10, backgroundColor: "#fff" }}
                        onPress={() => handlenoticeDelete(item.id)}
                    />

                    {/* <TouchableOpacity
                        style={{
                            backgroundColor: "#1A3C54",
                            borderRadius: 10,
                            paddingVertical: 10,
                            marginVertical: 10,
                            alignItems: "center",
                            height: 40,
                            width: 80
                        }}>
                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Submit</Text>
                    </TouchableOpacity> */}



                </View>



            </View>
        )
    }

    return (
        

                <View style={styles.container}>

                    <Text style={{ marginTop: 16, fontWeight: "800", fontSize: 20, marginLeft: "32%" }}>LOST & FOUND</Text>
                    
                    <Text style={{marginTop:10, fontWeight: "600"}}>Lost & Found notice</Text>

                    <TextInput style={styles.inputfeildstyle} placeholder="Area"
                        value={inputDetailArea} onChangeText={(userText1) => setInputDetailArea(userText1)} />

                    <TextInput style={styles.inputfeildstyle} placeholder="Date"
                        value={inputDetailDate} onChangeText={(userText2) => setInputDetailDate(userText2)} />

                    <TextInput style={styles.inputfeildstyle} placeholder="Contact Details"
                        value={inputDetailcontact} onChangeText={(userText3) => setInputDetailcontact(userText3)} />

                    <TextInput style={styles.inputfeildstyle} placeholder="Breed / Keyword"
                        value={inputDetailBreed} onChangeText={(userText4) => setInputDetailBreed(userText4)} />

                    <TextInput style={styles.inputfeildstyle} placeholder="Identification Marks"
                        multiline={true} numberOfLines={2}
                        value={inputDetailiMark} onChangeText={(userText5) => setInputDetailMark(userText5)} />

                    <Text style={{ fontWeight: "bold", marginTop: 15, fontSize: 17 }}>Optional :</Text>

                    <TextInput style={styles.inputfeildstyle} placeholder="Reward"
                        value={inputDetailReward} onChangeText={(userText6) => setInputDetailReward(userText6)} />
                    {/* // editedList */}

                    {editedList ? <TouchableOpacity
                        style={{
                            marginTop: 14,
                            backgroundColor: "#1A3C54",
                            borderRadius: 14,
                            paddingVertical: 10,
                            marginVertical: 10,
                            alignItems: "center",
                        }}
                        onPress={() => handlenoticeUpdate()}>

                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>Update</Text>
                    </TouchableOpacity> : <TouchableOpacity
                        style={{
                            marginTop: 14,
                            backgroundColor: "#1A3C54",
                            borderRadius: 14,
                            paddingVertical: 10,
                            marginVertical: 10,
                            alignItems: "center",
                        }}
                        onPress={() => handleAddNoticeDetails()}>

                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>Submit</Text>
                    </TouchableOpacity>}



                    {/* --------------------------------------------- */}

                    <TouchableOpacity
                        style={{
                            marginTop: 3,
                            backgroundColor: "#1A3C54",
                            borderRadius: 14,
                            paddingVertical: 10,
                            marginVertical: 10,
                            alignItems: "center",
                            height:'5%',
                            width: "20%"
                        }}
                        onPress={() => navigation.navigate("LFHome")}>
                            {/* ------------------------------------------------------------------------------------------------------------------------------------- */}

                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>Home</Text>
                    </TouchableOpacity>

                    {/* ------------------------------------------------------ */}


                    {/* render list */}
                    <FlatList data={inputDetailList} renderItem={renderPets} />



                </View>
     
    )
}

export default LostandFoundHome

const styles = StyleSheet.create({
    container:{
        marginTop:40,
        marginHorizontal: 16,
        bottom:1, 
        flex:1,
    },
    cardstyle: {
        color: "#000",
        fontWeight: "700"
    },
    inputfeildstyle: {
        borderWidth: 2,
        borderColor: "#1A3C54",
        borderRadius: 9,
        // borderRadius: 14,
        paddingVertical: 11,
        paddingHorizontal: 16,
        marginTop: 20,
        // height:"6%"
    },
    submitbtnstyle: {
        marginTop: 39,
        backgroundColor: "#1A3C54",
        borderRadius: 14,
        paddingVertical: 10,
        marginVertical: 24,
        alignItems: "center",
        // height:"6%",justifyContent:"center"
    }
})



LostandFoundHome