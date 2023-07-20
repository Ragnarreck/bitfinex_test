import React from 'react';
import { LogBox, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Header from './src/components/header';
import Content from './src/components/content';
import { Provider } from 'react-redux';
import { store } from './src/store';

LogBox.ignoreAllLogs();

export const precisionLevels = ['P0', 'P1', 'P2', 'P3', 'P4'];

export default function App() {
  const [precisionLevel, setPrecisionLevel] = React.useState(precisionLevels[0]);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.orderBookContainer}>

          {/* orders pair */}
          <View style={styles.pairTitleContainer}>
            <Text style={[styles.title, styles.text]}>BTC/USD</Text>
          </View>


          {/* header block */}
          <Header precisionLevel={precisionLevel} setPrecisionLevel={setPrecisionLevel} />
        </View>

        <View style={styles.content}>
          <Content precisionLevel={precisionLevel} />
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  orderBookContainer: {

  },
  pairTitleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  text: {
    color: 'white'
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 25,
  },
});
