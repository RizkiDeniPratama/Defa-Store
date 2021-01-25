import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ToastAndroid,
  Image,
} from 'react-native';
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: true,
      email: '',
      password: '',
      
    };
  
  }

  login = () => {
    const {email, password} = this.state;
    const url = 'https://defa-store.herokuapp.com/api/login';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        if (resJson.token) {
          AsyncStorage.setItem('token', resJson.token)
          .catch ((err ) => {console.log(err);})
          ToastAndroid.show(
            'Anda Berhasil Login',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.props.navigation.navigate('TabNavigation');
        // } else if (resJson.error) {
        //   alert(resJson.error);
        // } else {
        //   console.log(error);
        }
      })
      .catch(error => {
        console.log('errror ini ' + error);
      
      });
  };

  SignUp = () => {
    this.props.navigation.navigate('SignUp');
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.alas}>
          <Image
            style={{
              width: 200,
              height: 100,
              alignSelf: 'center',
              position: 'absolute',
              marginTop: 50,
            }}
            source={require('../../Assets/Logo/Group_1.png')}
          />
        </View>
        <View style={styles.alas1}>
          <View style={styles.login}>
            <Text style={styles.title}> SIGN IN</Text>
            <View style={{margin: 10, paddingVertical: 25}}>
              <View>
                <View style={{margin: 10}}>
                  <View>
                    <Text style={{color: '#a7abae'}}>email</Text>
                  </View>
                  <TextInput
                    underlineColorAndroid="black"
                    autoCapitalize="none"
                    autoCompleteType={'email'}
                    keyboardType="email-address"
                    style={styles.input}
                    value={this.state.email}
                    onChangeText={teks => this.setState({email: teks})}
                  />
                </View>
                <View style={{margin: 10, bottom: -13}}>
                  <View>
                    <Text style={{color: '#a7abae'}}>password</Text>
                  </View>
                  <TextInput
                    underlineColorAndroid="black"
                    autoCompleteType={'password'}
                    style={styles.input}
                    keyboardType="numbers-and-punctuation"
                    secureTextEntry={this.state.visible}
                    value={this.state.password}
                    onChangeText={teks => this.setState({password: teks})}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.tombol}
              onPress={() => this.login()}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                {' '}
                S I G N I N
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <View>
                <Text>New user?</Text>
              </View>
              <View>
                <Text
                  style={{color: 'blue', fontWeight: 'bold', right: -10}}
                  onPress={() => this.SignUp()}>
                  Sing Up
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  alas: {
    flex: 1,
    backgroundColor: '#2071d5',
  },
  alas1: {
    flex: 2,
    backgroundColor: '#b2b4b1',
  },
  login: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    width: '90%',
    height: 420,
    top: 0,
    alignSelf: 'center',
    marginTop: -75,
    borderRadius: 7,
  },
  header: {
    height: '45%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'green',
    alignSelf: 'center',
    bottom: -20,
  },
  tombol: {
    backgroundColor: '#1072ea',
    height: 50,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    margin: 8,
    right: -25,
    bottom: 10,
  },
});
