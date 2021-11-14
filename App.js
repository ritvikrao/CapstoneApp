import React, { useState, useEffect } from "react";

import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import axios from "axios";

// https://smart-aquarium-backend.herokuapp.com/api/temp
// also could be: /id:jdp2389p1329djp at the end of the url
// temp = variable that I am trying to access
// username, temp, pH, ammonia, nitrate, nitrite, light_illuminated, last_fed (would represent date)
// get.body({"id": "615a0f8ce4074662ba8754c5"})

/**
const DATA = [
    {
        id: 'temp',
        title: 'Water temperature:',
        data: 0,
    },
    {
        id: 'pH',
        title: 'Water pH level:',
        data: 0,
    },
    {
        id: 'ammonia',
        title: 'Ammonia reading:',
        data: 0,
    },
    {
        id: 'nitrate',
        title: 'Nitrate reading:',
        data: 0,
    },
    {
        id: 'nitrite',
        title: 'Nitrite reading:',
        data: 0,
    },
    {
        id: 'light_illuminated',
        title: 'Illumination:',
        data: 0,
    },
];
 **/

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

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.ids = ['temp', 'pH', 'ammonia', 'nitrate', 'nitrite', 'light_illuminated'];
        this.state = {
            data:[0,0,0,0,0,0] };
    }
    componentDidMount() {
        for (let i = 0; i < this.ids.length; i++) {
            fetch("https://smart-aquarium-backend.herokuapp.com/api/" + this.ids[i] + "?id=615a0f8ce4074662ba8754c5", {
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
                    console.log(responseData);
                })
                .catch(error => console.log(error)) //to catch the errors if any
        }
        }


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
                            <Text style={styles.title}>{this.state.data[0]}</Text>
                            <Text style={styles.title}>pH:</Text>
                            <Text style={styles.title}>{this.state.data[1]}</Text>
                            <Text style={styles.title}>Ammonia:</Text>
                            <Text style={styles.title}>{this.state.data[2]}</Text>
                            <Text style={styles.title}>Nitrate:</Text>
                            <Text style={styles.title}>{this.state.data[3]}</Text>
                            <Text style={styles.title}>Nitrite:</Text>
                            <Text style={styles.title}>{this.state.data[4]}</Text>
                            <Text style={styles.title}>Is the light illuminated?</Text>
                            <Text style={styles.title}>{this.state.data[5].toString()}</Text>
                        </View>
                    )}
                />
            </SafeAreaView>
        );
    }
}

const MyComponent = () => {

    let DATA = [
        {
            id: 'temp',
            title: 'Water temperature:',
            data: 0,
        },
        {
            id: 'pH',
            title: 'Water pH level:',
            data: 0,
        },
        {
            id: 'ammonia',
            title: 'Ammonia reading:',
            data: 0,
        },
        {
            id: 'nitrate',
            title: 'Nitrate reading:',
            data: 0,
        },
        {
            id: 'nitrite',
            title: 'Nitrite reading:',
            data: 0,
        },
        {
            id: 'light_illuminated',
            title: 'Illumination:',
            data: 0,
        },
    ];

    for (let i = 0; i < DATA.length; i++) {
        fetch("https://smart-aquarium-backend.herokuapp.com/api/" + DATA[i].id + "?id=615a0f8ce4074662ba8754c5", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then((responseData) => {
                DATA[i].data = responseData;
                console.log(DATA[i].data);
            })
            .catch(error => console.log(error)) //to catch the errors if any
    }

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.title}>{item.data}</Text>
        </View>
    );

    const renderTitle = ({ item }) => (
        <TitleItem title={item.title} />
    );

    console.log("does get here");
    console.log(DATA[0].data)

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

/**
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
        if(this.state.loading){
            console.log("gets here");
            return(
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#000000"/>
                </View>
            )}
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
**/
