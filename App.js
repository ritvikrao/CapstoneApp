import React, { useState, useEffect } from "react";
/**
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import axios from "axios";

// https://smart-aquarium-backend.herokuapp.com/api/temp
// also could be: /id:jdp2389p1329djp at the end of the url
// temp = variable that I am trying to access
// username, temp, pH, ammonia, nitrate, nitrite, light_illuminated, last_fed (would represent date)
// get.body({"id": "615a0f8ce4074662ba8754c5"})


const DATA = [
    {
        id: 'username',
        title: 'Username:',
    },
    {
        id: 'temp',
        title: 'Water temperature:',
    },
    {
        id: 'pH',
        title: 'Water pH level:',
    },
    {
        id: 'ammonia',
        title: 'Ammonia reading:',
    },
    {
        id: 'nitrate',
        title: 'Nitrate reading:',
    },
    {
        id: 'nitrite',
        title: 'Nitrite reading:',
    },
    {
        id: 'light_illuminated',
        title: 'Illumination:',
    },
    {
        id: 'last_fed',
        title: 'Date:',
    },
];

const APP_TITLE = [
    {
        id: '1',
        title: 'Smart Aquarium App',
    },
];

function fetch_data( data_to_fetch ) {
    axios.get('https://smart-aquarium-backend.herokuapp.com/api/' + data_to_fetch)
        .then(function (response) {
            console.log(response.success);
            return response.success;
        })
        .catch(function (error) {
            console.log(error);
        })
}



const Item = ({ title, data_to_fetch }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>{data_to_fetch}</Text>
    </View>
);

const TitleItem = ({ title }) => (
    <View style={styles2.item}>
        <Text style={styles2.title}>{title}</Text>
    </View>
);

const MyComponent = () => {

    const [data, setData] = React.useState('')

    const axiosApiCall = ({ item }) => {
        axios({
            "method": "GET",
            "url": "https://smart-aquarium-backend.herokuapp.com/api/" + item.id,
            "headers": {
                "x-rapidapi-host": "smart-aquarium-backend.herokuapp.com",
                "x-rapidapi-key": "615a0f8ce4074662ba8754c5",
                "useQueryString": true
            }, "params": {
                "language_code": "en"
            }
        })
            .then((response) => {
                console.log("gets to here");
                console.log(response);
                setData(response.success);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.title}>{data}</Text>
        </View>
    );

    const renderTitle = ({ item }) => (
        <TitleItem title={item.title} />
    );


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={APP_TITLE}
                renderItem={renderTitle}
                keyExtractor={item => item.id}
            />
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#1e5dc2',
        padding: 40,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 24,
    },
});

const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        marginBottom: 20,
    },
    item: {
        backgroundColor: '#1e5dc2',
        padding: 20,
        marginVertical: 16,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default MyComponent;
 **/

import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity
} from "react-native";
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource:0 };
    }
    componentDidMount(){
        fetch("https://smart-aquarium-backend.herokuapp.com/api/temp?id=615a0f8ce4074662ba8754c5", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },})
            .then(response => response.json())
            .then((responseData) => {
                this.loading = false;
                this.dataSource = responseData;
            })
            .catch(error=>console.log(error)) //to catch the errors if any
    }
    FlatListItemSeparator = () => {
        return (
            <View style={{
                height: .5,
                width:"100%",
                backgroundColor:"rgba(0,0,0,0.5)",
            }}
            />
        );
    }
    //<Text style={styles.lightText}>Employee Salary : {data.item.employee_salary}</Text>
    //<Text style={styles.lightText}>Employee Age : {data.item.employee_age}</Text>
    renderItem=(data)=>
        <TouchableOpacity style={styles.list}>
            <Text style={styles.lightText}>Employee Name : {data}</Text>
        </TouchableOpacity>
    render(){
        /**if(this.state.loading){
            console.log("gets here");
            return(
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#000000"/>
                </View>
            )}**/
        console.log(this.state.dataSource)
        return(
            <View style={styles.container}>
                <FlatList
                    data= {this.state.dataSource}
                    ItemSeparatorComponent = {this.FlatListItemSeparator}
                    renderItem= {item=> this.renderItem(item)}
                    keyExtractor= {item=>item.id.toString()}
                />
            </View>
        )}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#134fd2"
    },
    loader:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#134fd2"
    },
    list:{
        paddingVertical: 2,
        margin: 5,
        backgroundColor: "#fff"
    }
});