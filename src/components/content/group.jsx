import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Divider from '../divider';


// info example: [[30320, 6, 2.10], [30310, 2, 0.8], [30300, 3, 0.9]] -- price, orders, amount
const TableGroup = ({ info = [], id }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Amount</Text>
                <Text style={styles.text}>Price</Text>
            </View>

            {info?.map(it => (
                <View key={`${id}_${it?.[0]}_${it?.[2]}}`}>
                    <View style={styles.tableRow}>
                        <Text style={styles.text}>{it?.[2]}</Text>
                        <Text style={styles.text}>{it?.[0]}</Text>
                    </View>
                    <Divider />
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    text: {
        color: 'white',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        alignItems: 'center',
    },
})

export default TableGroup;