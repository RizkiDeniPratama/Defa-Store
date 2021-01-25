import React from 'react';
import {View, Text, Image} from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import AsyncStorage from '@react-native-community/async-storage';
class Splash extends React.Component {
  constructor() {
    super();
    this.state = {
      token: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('token')
      .then(value => {
        console.log(value);
        if (value != null) {

    setTimeout(() => {
        this.props.navigation.replace('TabNavigation');
      }, 2000);
        } else {
          console.log('token anda tidak ada');
        this.props.navigation.replace('Intro');

        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#326FE7',
        }}>
        <Image
          style={{width: '65%', height: 122, resizeMode: 'cover'}}
          source={require('../../Assets/Logo/Group_1.png')}
        />
        <View style={{height: 50, top: 150}}>
          <SkypeIndicator color="black" size={50} />
        </View>
      </View>
    );
  }
}
export default Splash;

