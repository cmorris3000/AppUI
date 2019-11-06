import * as React from 'react';
import { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import { Container, Header, Title, Left, Body, Right, Content, Tab, Tabs } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Tab1 from './Tabs/Tab1';
import Tab2 from './Tabs/Tab2';
import Tab3 from './Tabs/Tab3';
export default class TabsScreem extends Component {

  state = {
    loading: true
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('../../../node_modules/native-base/Fonts/Roboto.ttf'),
      //'Roboto': require('../../../../node_modules/native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('../../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })
  }

  render() {
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
    return (
      <Container>
        <Header style={styles.header}>
          <Left/>
          <Body>
            <Title style={styles.tabText}>Notices</Title>
          </Body>
          <Right/>
          </Header>
        <Tabs tabBarUnderlineStyle={styles.tabsBar}>
          <Tab heading="Business" activeTextStyle={styles.tabText} textStyle={styles.tabText} tabStyle={styles.tab} activeTabStyle={styles.tabActive}>
            <Tab1 />
          </Tab>
          <Tab heading="Entertainment" activeTextStyle={styles.tabText} textStyle={styles.tabText} tabStyle={styles.tab} activeTabStyle={styles.tabActive}>
            <Tab2 />
          </Tab>
          <Tab heading="Science" activeTextStyle={styles.tabText} textStyle={styles.tabText} tabStyle={styles.tab} activeTabStyle={styles.tabActive}>
            <Tab3 />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#009387'
  },
  tabsBar:{
    backgroundColor: 'white'
  },
  tab:{
    backgroundColor: '#009387',    
  },
  tabActive:{
    backgroundColor: '#009360'
  },
  tabText:{
    color: 'white'
  }
});