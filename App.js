import React, { useState, useEffect } from "react";
import Moment from 'moment';

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

const IDS = ['temp', 'pH', 'ammonia', 'nitrate', 'nitrite', 'light_illuminated', 'heater_on', 'last_fed'];

/*
    * https://smart-aquarium-backend.herokuapp.com/api/(X):
		feed
		runChemicalTest
		heaterToggle
		lightToggle
	message body:  {"id": "615a0f8ce4074662ba8754c5", "set": boolean(should be true from app)}
    * */

const send_post_request = (requestString) => (
    fetch("https://smart-aquarium-backend.herokuapp.com/api/" + requestString, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"id": "615a0f8ce4074662ba8754c5", "set": true})
    })
        .then(response => response.json())
        .then(() => {
            console.log("sent data successfully")
        })
        .catch(error => console.log(error))
);

const options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: true,
    timeZone: 'America/New_York'
};

const build_date = (date) => (
    new Intl.DateTimeFormat('en-US', options).format(new Date(date))
);






export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[0,0,0,0,0,0,0]};
    }

    componentDidMount() {
        this.pollAPI();
        setInterval(() => {this.pollAPI()}, 500);
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
                .catch(error => console.log(error));
        }
    };

    ammoniaTest(level){
        if(level < 0.25){
            return "ideal"
        }
        else if(level < 0.5){
            return "safe"
        }
        else if(level < 3.0){
            return "stress"
        }
        else if(level < 6.0){
            return "harmful"
        }
        else{
            return "danger"
        }
    }

    nitrateTest(level){
        if(level < 80){
            return "safe"
        }
        else if(level < 160){
            return "unsafe"
        }
        else{
            return "danger"
        }
    }

    nitriteTest(level){
        if(level < 0.5){
            return "safe"
        }
        else if(level < 3.0){
            return "unsafe"
        }
        else{
            return "danger"
        }
    }



    render(){
        Moment.locale('en');
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
                            <Text style={styles.title}>Ammonia status:</Text>
                            <Text style={styles.value}>{this.ammoniaTest(this.state.data[2])}</Text>
                            <Text style={styles.title}>Nitrate:</Text>
                            <Text style={styles.value}>{this.state.data[3]}</Text>
                            <Text style={styles.title}>Nitrate status:</Text>
                            <Text style={styles.value}>{this.nitrateTest(this.state.data[3])}</Text>
                            <Text style={styles.title}>Nitrite:</Text>
                            <Text style={styles.value}>{this.state.data[4]}</Text>
                            <Text style={styles.title}>Nitrite status:</Text>
                            <Text style={styles.value}>{this.nitriteTest(this.state.data[4])}</Text>
                            <Text style={styles.title}>Light Status:</Text>
                            {this.state.data[5] ? (
                                <Text style={styles.value}>On</Text>) : (
                                <Text style={styles.value}>Off</Text>)}
                            <Text style={styles.title}>Heater Status:</Text>
                            {this.state.data[6] ? (
                                <Text style={styles.value}>On</Text>) : (
                                <Text style={styles.value}>Off</Text>)}
                            <Text style={styles.title}>Time the fish were last fed:</Text>
                            <Text style={styles.value}>{Moment(this.state.data[7]).format('LLLL')}</Text>
                        </View>
                    )}
                />
                <TouchableOpacity
                    style={styles2.button}
                    onPress={() => send_post_request('feed')}
                >
                    <Text style={styles2.text}>Feed fish</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles2.button}
                    onPress={() => send_post_request('runChemicalTest')}
                >
                    <Text style={styles2.text}>Run chemical test</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles2.button}
                    onPress={() => send_post_request('heaterToggle')}
                >
                    <Text style={styles2.text}>Turn heater on/off</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles2.button}
                    onPress={() => send_post_request('lightToggle')}
                >
                    <Text style={styles2.text}>Turn light on/off</Text>
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
        fontSize: 24,
        color: "#ffffff"
    },
    value: {
        fontSize: 24,
        marginBottom: 15,
        color: "#ffffff"
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
        fontSize: 32,
        color: "#ffffff"
    },
    text: {
        color: "#ffffff"
    },
});
