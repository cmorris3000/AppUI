import * as React from 'react';
import { Dimensions, WebView, Modal, StyleSheet, Share, View} from 'react-native';
import Constants from 'expo-constants';
import {Container, Content, Header, Text, Left, Right, Body, Icon, Button, Title} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const webViewHight= Dimensions.get('window').height - 56;
const deviceWidth = Dimensions.get('window').width - 20;

export default class MyModal extends React.Component {

  state = {
    loading: true
  }
  //Share web page from modal.
  handleShare= ()=>{
    var message= `${this.props.articleData.title}\n\nRead More @${this.props.articleData.url}\n\nShared via News App`;
    return Share.share({
        message: message,
        url: this.props.articleData.url,
        title: this.props.articleData.title
      }      
    );
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('../../../../../node_modules/native-base/Fonts/Roboto.ttf'),
      //'Roboto': require('../../../../../node_modules/native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('../../../../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
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
    if(this.props.articleData.url != undefined){
      return (
      <Modal 
        animationType='slide' 
        transparent visible={this.props.showModal}
        onRequestClose={this.props.onClose}
        >
        <Container style={styles.container}>
          <Header style={styles.header}>
            <Left>
              <Button onPress={this.props.onClose} style={styles.leftButton} transparent>
                <Icon style={styles.leftButton} name='close'/></Button>
            </Left>
            <Body>
              <Title style={styles.leftButton}>{this.props.articleData.title}</Title>
            </Body>
            <Right>
              <Button onPress={this.handleShare} style={styles.leftButton} transparent>
                <Icon style={styles.leftButton} name='share'/></Button>
            </Right>
          </Header>
          <Content contentContainerStyle={styles.contentView}>            
            <WebView 
              style={styles.webView} source={{uri: this.props.articleData.url}}
              startInLoadingState={true} scalesPageToFit={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              useWebKit={true}
              />
          </Content>
        </Container>
      </Modal>
    );
    }else {
      return null;
    }
    
  }
}

const styles= StyleSheet.create({
  container: {
    margin: 15,
    marginBottom: 20
  },
  header:{
    backgroundColor: '#009387'
  },
  leftButton:{
    color: 'white'
  },
  contentView:{
    height: webViewHight,
    width: deviceWidth,
    flex:1
  },
  webView: {
    
  }
});