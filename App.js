import React, { useState, useEffect } from "react";

import { SafeAreaView, Button, View, FlatList, StyleSheet, Text, StatusBar, Alert, TouchableOpacity } from 'react-native';
import axios from "axios";

// https://smart-aquarium-backend.herokuapp.com/api/temp
// also could be: /id:jdp2389p1329djp at the end of the url
// temp = variable that I am trying to access
// username, temp, pH, ammonia, nitrate, nitrite, light_illuminated, last_fed (would represent date)
// get.body({"id": "615a0f8ce4074662ba8754c5"})


const APP_TITLE = [
    {
        id: '1',
        title: 'Smart Aquarium App',
    },
];

function fetch_data( data_to_fetch ) {
    for (let i = 0; i < data_to_fetch.length; i++) {
    fetch("https://smart-aquarium-backend.herokuapp.com/api/" + data_to_fetch[i].id + "?id=615a0f8ce4074662ba8754c5", {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then((responseData) => {
            data_to_fetch[i].data = responseData;
        })
        .catch(error => console.log(error)) //to catch the errors if any
}
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

const IDS = ['temp', 'pH', 'ammonia', 'nitrate', 'nitrite', 'light_illuminated'];

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[0,0,0,0,0,0]};
    }

    componentDidMount() {
        this.pollAPI();
        setInterval(() => {this.pollAPI()}, 5000);
    }

    pollAPI() {
        for (let i = 0; i < IDS.length; i++) {
            fetch("https://smart-aquarium-backend.herokuapp.com/api/" + IDS[i] + "?id=615a0f8ce4074662ba8754c5", {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then((responseData) => {
                    let newResponseData = this.state.data
                    newResponseData[i] = responseData
                    this.setState({data: newResponseData});
                })
                .catch(error => console.log(error)) //to catch the errors if any
        }
    };

    render(){
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={APP_TITLE}
                    renderItem={({ item, index, separators}) => (
                        <TitleItem title={item.title} />
                    )}
                />
                <FlatList
                    data={["temp:"]}
                    renderItem={({ item, index, separators}) => (
                        <View style={styles.item}>
                            <Text style={styles.title}>Temperature:</Text>
                            <Text style={styles.value}>{this.state.data[0]}</Text>
                            <Text style={styles.title}>pH:</Text>
                            <Text style={styles.value}>{this.state.data[1]}</Text>
                            <Text style={styles.title}>Ammonia:</Text>
                            <Text style={styles.value}>{this.state.data[2]}</Text>
                            <Text style={styles.title}>Nitrate:</Text>
                            <Text style={styles.value}>{this.state.data[3]}</Text>
                            <Text style={styles.title}>Nitrite:</Text>
                            <Text style={styles.value}>{this.state.data[4]}</Text>
                            <Text style={styles.title}>Light Status:</Text>
                            {this.state.data[5] ? (
                                <Text style={styles.value}>On</Text>) : (
                                <Text style={styles.value}>Off</Text>)}
                        </View>
                    )}
                />
                <TouchableOpacity
                    style={styles2.button}
                    onPress={() => Alert.alert('Fish fed')}
                >
                    <Text style={styles2.text}>Feed fish</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles2.button}
                    onPress={() => Alert.alert('Running quality test')}
                >
                    <Text style={styles2.text}>Run quality test</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles2.button}
                    onPress={() => Alert.alert('Turning light on/off')}
                >
                    <Text style={styles2.text}>Turn light on/off</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles2.button}
                    onPress={() => Alert.alert('Implementing some other function')}
                >
                    <Text style={styles2.text}>Some other function</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
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
        fontSize: 24
    },
    value: {
        fontSize: 24,
        marginBottom: 15
    }
});

const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        marginBottom: 20,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#1e5dc2",
        padding: 10,
        marginVertical: 16,
        marginHorizontal: 16
    },
    item: {
        backgroundColor: '#1e5dc2',
        padding: 20,
        marginVertical: 16,
        marginHorizontal: 16
    },
    title: {
        fontSize: 32
    },
    text: {
        color: "#ffffff"
    },
});