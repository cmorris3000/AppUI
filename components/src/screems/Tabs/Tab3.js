import React, { Component } from 'react';
import {Alert, ActivityIndicator, View, StyleSheet} from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import {getArticles} from '../../service/News';
import Tab1_list from './ItemsList/Tab1_list';
import MyModal from './Modal/Modal';

const category= 'science';

export default class Tab3 extends Component {
  constructor(props){
    super(props);    
    this.state={
      isLoading: true,
      data: null,/*[{url:'https://cdn.pixabay.com/photo/2019/10/21/12/53/fantasy-4566021_960_720.jpg',
      title: 'Hello', text: "Welcome"},
      {url:'https://cdn.pixabay.com/photo/2019/10/21/12/53/fantasy-4566021_960_720.jpg',
      title: 'Hello', text: "Welcome"}]*/
      setModalVisible: false,
      modalArticleData: {},
      loading: true
    }
  }  

  //Click on view button
  loadArticleData= (articleData) =>{
    this.setState({
      setModalVisible: true,
      modalArticleData: articleData
    });
  }

  //Close modal view and clear article data.
  handleModalClose= ()=>{
    this.setState({
      setModalVisible: false,
      modalArticleData: {}
    });
  }

// GET articles from News.js file:
// componentDidMount is a function as setState. 
async componentDidMount(){
    //Error Font not found:
    await Font.loadAsync({
      'Roboto': require('../../../../node_modules/native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('../../../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ loading: false });
    getArticles(category).then(data =>{
      this.setState({
        isLoading: false,
        data: data
      })   
      
      }, error =>{
        Alert.alert('Error', 'Something has went wrong!')
      })
}

  

  render() {
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
    //Animation for wait the information form url:
    //when  isLoading is true shows an animation, if is false shows the information.
    let view= this.state.isLoading ? (
      //Is true:
      <View style={styles.ViewIsLoading}>
        <ActivityIndicator animating={this.state.isLoading}/>
        <Text>Please wait..</Text>
      </View>
    ):(
      //Is false:
      <List 
        dataArray={this.state.data}
        renderRow={(item)=>{
          return <Tab1_list onPress={this.loadArticleData}  data={item}/>
        }}/>
    )


    return (
      <Container>        
        <Content>
          {view}          
        </Content>
        <MyModal 
          showModal={this.state.setModalVisible}
          articleData={this.state.modalArticleData}
          onClose={this.handleModalClose}
        />
      </Container>
    );
  }
}

const styles= StyleSheet.create({
  ViewIsLoading: {   
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  }
});