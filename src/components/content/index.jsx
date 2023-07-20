import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text, Button, ScrollView } from 'react-native';
import TableGroup from './group';
import { orderBookMocks } from '../../constants/orderBookMocks';
import useRealtimeOrderBook from '../../hooks/useRealtimeOrderBook';
import { useSelector } from 'react-redux';

const Content = ({ precisionLevel }) => {
    const [updatesFrequency, setUpdatesFrequency] = useState('F1'); // F0 | F1
    const { connect, isConnected, disconnect } = useRealtimeOrderBook({ precisionLevel, updatesFrequency });

    const data = useSelector((state) => state.orderBook.data);

    const leftData = useMemo(() => {
        const middleIndex = Math.floor(data?.length / 2);
        return data?.slice(0, middleIndex)
    }, [data]);

    const rightData = useMemo(() => {
        const middleIndex = Math.floor(data?.length / 2);
        return data?.slice(middleIndex)
    }, [data]);

    return (
        <ScrollView style={styles.container}>

            {/* table block */}
            <View style={styles.tableContainer}>
                <View style={styles.groupBlock}>
                    <TableGroup info={leftData} id="less" />
                </View>

                <View style={[styles.groupBlock, { marginLeft: 10 }]}>
                    <TableGroup info={rightData} id="more" />
                </View>
            </View>

            <View style={styles.connectionStatusContainer}>
                <Text style={styles.connectionStatus}>{isConnected ? 'Connected' : 'Disconnected'}</Text>
                <View style={[styles.connectionDot, { backgroundColor: isConnected ? 'green' : 'red' }]} />
            </View>

            <View style={styles.connectionButtonWrapper}>
                <Button
                    title={isConnected ? 'Disconnect' : 'Connect'}
                    onPress={isConnected ? disconnect : connect}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tableContainer: {
        width: '100%',
        flexDirection: 'row',
    },
    groupBlock: {
        width: '50%',
    },
    connectionStatusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    connectionDot: {
        width: 10,
        height: 10,
        borderRadius: 100,
        marginLeft: 10,
    },
    connectionStatus: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    connectionButtonWrapper: {
        marginTop: 30,
    },
})

export default Content;