import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import { List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

export default class Tab1_list extends Component{  

  state = {
    loading: true
  }
   //Avoid infinite loops with handlePress
  handlePress= ()=>{
    this.props.onPress(this.props.data);
  }

  //Error Font not found:
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('../../../../../node_modules/native-base/Fonts/Roboto.ttf'),
      //'Roboto': require('../../../../node_modules/native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('../../../../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })
  }

  render(){
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
    //Date from now with moment dependence:
    const date= moment(this.props.data.publishedAt || moment.now()).fromNow();

    return(
      <ListItem thumbnail>
          <Left>
            <Thumbnail square source={{uri: this.props.data.urlToImage != null ? this.props.data.urlToImage: 'https://cdn.pixabay.com/photo/2019/10/21/12/53/fantasy-4566021_960_720.jpg'}} />
          </Left>
          <Body>
            <Text numberOfLines={2}>{this.props.data.title}</Text>
            <Text note numberOfLines={1}>{this.props.data.description}</Text>
            <Text style={styles.date} note numberOfLines={1}>{date}</Text>
          </Body>
          <Right>
            <Button transparent onPress={this.handlePress}>
              <Text>View</Text>
            </Button>
          </Right>
      </ListItem>
      
    );
  }

}

const styles= StyleSheet.create({
  date: {
    marginTop: 10
  }
});