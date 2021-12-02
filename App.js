import React, { useState, useEffect } from "react";
import Moment from 'moment';

import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';

const APP_TITLE = [
    {
        id: '1',
        title: 'Smart Aquarium',
    },
];

const TitleItem = ({ title }) => (
    <View style={styles2.item}>
        <Text style={styles2.title}>{title}</Text>
    </View>
);

const IDS = ['temp', 'pH', 'ammonia', 'nitrate', 'nitrite', 'light_illuminated', 'heater_on', 'last_fed'];

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
            return "Safe"
        }
        else {
            return "Unsafe"
        }
    }

    nitrateTest(level){
        if(level < 80){
            return "Safe"
        }
        else{
            return "Unsafe"
        }
    }

    nitriteTest(level){
        if(level < 1.2){
            return "Safe"
        }
        else{
            return "Unsafe"
        }
    }



    render(){
        Moment.locale('en');
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    style={styles.header}
                    data={APP_TITLE}
                    renderItem={({ item, index, separators}) => (
                        <TitleItem title={item.title} />
                    )}
                />
                <FlatList
                    style={styles.header}
                    data={["temp"]}
                    renderItem={({ item, index, separators}) => (
                        <View style={styles.item}>
                            <Text style={styles.title}>Temperature: {this.state.data[0]}</Text>
                            <Text style={styles.title}>pH: {this.state.data[1]}</Text>
                            <Text style={styles.title}>Ammonia Status: {this.ammoniaTest(this.state.data[2])}</Text>
                            <Text style={styles.title}>Nitrate Status: {this.nitrateTest(this.state.data[3])}</Text>
                            <Text style={styles.title}>Nitrite Status: {this.nitriteTest(this.state.data[4])}</Text>
                            <Text style={styles.title}>Light Status: {this.state.data[5] ? "On" : "Off"}</Text>
                            <Text style={styles.title}>Heater Status: {this.state.data[6] ? "On" : "Off"}</Text>
                            <Text style={styles.title}>Fish Last Fed: {Moment(this.state.data[7]).format('LLLL')}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
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
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 30,
    },
    dataList: {
        textAlign: "left",
        backgroundColor: '#1e5dc2',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 30,
    },
    header: {
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: '#1e5dc2',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 30,
    },
    title: {
        fontSize: 24,
        color: "#ffffff",
        marginBottom: 20,
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
        marginHorizontal: 16,
        borderRadius: 30,
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
