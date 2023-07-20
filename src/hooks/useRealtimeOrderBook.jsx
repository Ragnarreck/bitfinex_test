import React, { useEffect, useRef, useState } from 'react';
import { changeChannelId, changeFrequency, changeIsSubscribed, changePrecision, setInitialOrdersData, updateOrdersData, resetOrderBookState } from '../store/features/orderBook/slice';
import { useDispatch, useSelector } from 'react-redux';

const socketURL = 'wss://api-pub.bitfinex.com/ws/2';

const useRealtimeOrderBook = ({ precisionLevel, updatesFrequency }) => {
    const dispatch = useDispatch();
    const [isConnected, setIsConnected] = useState(false);
    const [isListening, setIsListening] = useState(false);

    const channelId = useSelector((state) => state.orderBook.channelId);


    const socket = useRef(null);

    const connectHandle = () => {
        console.log('Connection established');
        setIsConnected(true);
        open();
    }

    const disconnectHandle = () => {
        console.log('Disconnected');
        setIsConnected(false);
        setIsListening(false);
        // dispatch(resetOrderBookState());
    };

    const errorHandle = (error) => {
        console.log('error', error);
    };

    const onMessage = (message) => {
        const data = JSON.parse(message);
        // console.log('data', data);

        if (data?.event === 'error') {
            errorHandle(data?.msg);
            return;
        }

        if (data?.event === 'subscribed') {
            console.log('SUBSCRIBED', data);
            const { prec, freq, chanId } = data;
            dispatch(changeIsSubscribed(true));
            dispatch(changeChannelId(chanId));
            dispatch(changePrecision(prec));
            dispatch(changeFrequency(freq));
        } 
        
        // if data comes from our channel
        if (Boolean(channelId) && data?.[0] === channelId) {
            const [_, info] = data;

            // this is update
            if (typeof info?.[0] === 'number') {
                dispatch(updateOrdersData(info));
            } else {
                if (typeof info === 'string') return;
                // this is initial set
                dispatch(setInitialOrdersData(info));
                console.log('Initial data is set', info);
            }
        }
    };

    const open = () => {
        const msg = JSON.stringify({
            event: 'subscribe',
            channel: 'book',
            symbol: 'tBTCUSD',
            prec: precisionLevel,
            freq: updatesFrequency,
        });

        socket.current.send(msg);
        setIsListening(true);
        console.log('Tried to subscribe');
    };

    const connect = () => {
        if (isConnected) {
            console.log('Already connected');
            return;
        };
        socket.current = new WebSocket(socketURL);
        socket.current.onopen = connectHandle;
        socket.current.onclose = disconnectHandle;
        socket.current.onerror = errorHandle;

    };

    const disconnect = () => {
        if (!isConnected) {
            console.log('Already disconnected');
            return;
        }
        socket.current?.close();
        socket.current = null;
    };

    useEffect(() => {
        connect();

        const socketCurrent = socket.current;

        return () => {
            socketCurrent?.close();
        };
    }, []);

    useEffect(() => {
        if (!socket?.current || !isListening) return;

        socket.current.onmessage = e => {
            // a message was received
            onMessage(e.data)
        };
    }, [isListening, channelId]);

    useEffect(() => {
        if (isConnected && isListening) {
            open();
        }
    }, [precisionLevel])

    return { isConnected, connect, disconnect };
};

export default useRealtimeOrderBook;