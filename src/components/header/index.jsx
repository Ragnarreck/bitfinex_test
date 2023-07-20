import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { precisionLevels } from '../../../App';

const Header = ({ precisionLevel, setPrecisionLevel }) => {
    const isPossibleToIncreasePrecisionLevel = useMemo(() => {
        const index = precisionLevels.indexOf(precisionLevel);
        return index !== precisionLevels?.[precisionLevels?.length - 1];
    }, [precisionLevel]);

    const isPossibleToDecreasePrecisionLevel = useMemo(() => {
        const index = precisionLevels.indexOf(precisionLevel);
        return index !== 0;
    }, [precisionLevel]);

    const increasePrecisionLevel = () => {
        console.log('increasePrecisionLevel');
        const index = precisionLevels.indexOf(precisionLevel);
        if (index !== precisionLevels?.[precisionLevels?.length - 1]) {
            setPrecisionLevel(precisionLevels[index + 1]);
        }
    };

    const decreasePrecisionLevel = () => {
        console.log('decreasePrecisionLevel');
        const index = precisionLevels.indexOf(precisionLevel);
        if (index !== 0) {
            setPrecisionLevel(precisionLevels[index - 1]);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.title, styles.text]}>Order book</Text>
            <View style={styles.headerControlsContainer}>
                <TouchableOpacity onPress={decreasePrecisionLevel} disabled={!isPossibleToDecreasePrecisionLevel}>
                    <Text style={[styles.headerControlsItemText, { opacity: isPossibleToDecreasePrecisionLevel ? 1 : 0.5 }]}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerControlsItem} onPress={increasePrecisionLevel} disabled={!isPossibleToIncreasePrecisionLevel}>
                    <Text style={[styles.headerControlsItemText, { opacity: isPossibleToIncreasePrecisionLevel ? 1 : 0.5 }]}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
    },
    headerControlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerControlsItem: {
        marginLeft: 10
    },
    headerControlsItemText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    text: {
        color: 'white'
    }
});

export default Header;