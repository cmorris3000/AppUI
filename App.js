import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import TabsScreem from './components/src/screems/TabsScreem';



export default class App extends React.Component {
  render() {
    return (
      <TabsScreem />
    );
  }
}
