import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons';
class SignUp extends Component {
  state = {
    name: '',
    email: '',
    no_telpon: '',
    alamat: '',
    password: '',
    password_confirmation: '',
  };
  signup = () => {
    const {
      name,
      email,
      password,
      password_confirmation,
      no_telpon,
      alamat,
    } = this.state;
    const url = 'https://defa-store.herokuapp.com/api/register';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        no_telpon: no_telpon,
        alamat: alamat,
      }),
    })
      .then(respon => respon.json())
      .then(resJson => {
        console.log(resJson);
        if (resJson.token) {
          this.props.navigation.replace('SignIn');
          ToastAndroid.show(
            'Register Berhasil',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          alert('err');
        }
      })
      .catch(error => {
        console.log('errror ini ' + error);
      });
  };
  login = () => {
    this.props.navigation.navigate('SignIn');
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.atas}>
          <Image
            style={styles.gambaratas}
            source={require('../../Assets/Images/header2.jpg')}
          />
        </View>
        <View style={styles.bawah}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.headertext}>Create an account</Text>

            <Text style={{fontWeight: 'bold', bottom: -15}}>name</Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="black" size={20} />

              <TextInput
                placeholder="your username"
                style={styles.textinput}
                autoCapitalize='words'
                value={this.state.name}
                onChangeText={teks => this.setState({name: teks})}
              />
              <Feather name="check-circle" color="green" size={15} />
            </View>

            <Text style={{fontWeight: 'bold', bottom: -15}}>E-mail</Text>
            <View style={styles.action}>
              <Feather name="mail" color="black" size={20} />

              <TextInput
                placeholder="your email"
                style={styles.textinput}
                keyboardType="email-address"
                autoCapitalize='words'
                value={this.state.email}
                onChangeText={teks => this.setState({email: teks})}
              />
            </View>

            <Text style={{fontWeight: 'bold', bottom: -15}}>no Hp</Text>
            <View style={styles.action}>
              <IonIcons name="call-outline" size={20} />

              <TextInput
                placeholder="your number phone"
                style={styles.textinput}
                keyboardType="phone-pad"
                autoCapitalize='words'
                value={this.state.no_telpon}
                onChangeText={teks => this.setState({no_telpon: teks})}
              />
            </View>

            <Text style={{fontWeight: 'bold', bottom: -15}}>Alamat</Text>
            <View style={styles.action}>
              <IonIcons name="location-outline" size={20} />

              <TextInput
                placeholder="your location"
                style={styles.textinput}
                keyboardType="email-address"
                value={this.state.alamat}
                onChangeText={teks => this.setState({alamat: teks})}
              />
            </View>

            <Text style={{fontWeight: 'bold', bottom: -15}}>password</Text>
            <View style={styles.action}>
              <Feather name="lock" color="black" size={20} />

              <TextInput
                placeholder="your password"
                style={styles.textinput}
                autoCapitalize='none'
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={teks => this.setState({password: teks})}
              />
            </View>

            <Text style={{fontWeight: 'bold', bottom: -15}}>
              password Confirmation
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="black" size={20} />

              <TextInput
                placeholder="password confirmation"
                style={styles.textinput}
                autoCapitalize="none"
                secureTextEntry={true}
                value={this.state.password_confirmation}
                onChangeText={teks =>
                  this.setState({password_confirmation: teks})
                }
              />
            </View>
            <TouchableOpacity
              style={styles.tombol}
              onPress={() => this.signup()}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>SignUp</Text>
            </TouchableOpacity>
            <Text
              style={{color: 'blue', fontWeight: 'bold', right: -10}}
              onPress={() => this.login()}>
              Sing in
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  atas: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gambaratas: {
    width: '100%',
    height: '100%',
  },
  bawah: {
    flex: 3,
    backgroundColor: '#1764e8',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  headertext: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  action: {
    flexDirection: 'row',
    marginTop: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#f2f2f2',
    paddingBottom: -3,
    alignItems: 'center',
    backgroundColor: '#a5a3a1e0',
    borderRadius: 50,
    paddingHorizontal: 10,
  },

  textinput: {
    right: -10,
    width: '90%',
  },
  tombol: {
    backgroundColor: '#1072ea',
    height: 50,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    margin: 30,
  },
});
