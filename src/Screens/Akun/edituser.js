import React, {Component} from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';
import ImagePicker from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';

class Edituser extends React.Component {
  constructor() {
    super();
    this.state = {
      token: '',
      data: '',
      name: '',
      no_telpon: '',
      password: '',
      avatar: {uri:'',type:'image/jpeg',fileName:'profilLama'},
      photo: '',
      alamat: '',
     
    };
  }
  edit = () => {
    const {name, no_telpon, alamat, avatar} = this.state;
    const url = 'https://defa-store.herokuapp.com/api/user/update';

    const body = {
      _method: 'patch',
      name: name,
      no_telpon: no_telpon,
      alamat: alamat,
     
    };
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: this.createFormData(avatar, body),
    })
      .then(respon => respon.json())
      .then(resJson => {
        console.log(resJson);
        if (resJson) {
          this.props.navigation.replace('TabNavigation', {screen: 'Akun'});
          ToastAndroid.show(
            ' Berhasil Diganti',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          alert('err');
        }
      })
      .catch(error => {
        console.log('ini error dari feact' + error);
      });
  };
  back = () => {
    this.props.navigation.navigate('Akun');
  };
  createFormData = (photo, body) => {
    const data = new FormData();
if(photo.uri != ''){

  data.append('avatar', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS == 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });
}
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
    console.log('ini form', data);
    console.log('ini avatar', data._parts);
    return data;
  };

  handleChoosePhoto = () => {
    const option = {
      noData: true,
    };
    ImagePicker.showImagePicker(option, response => {
      console.log(response);
      if (response.uri) {
        this.setState({avatar: response});
      }
    });
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then(value => {
      if (value != null) {
        this.setState({token: value}, () => {});
      } else {
        console.log('token tidak ada');
      }
    });
    this.setState({
      email: this.props.route.params.data.email,
      name: this.props.route.params.data.name,
      alamat: this.props.route.params.data.alamat,
      no_telpon: this.props.route.params.data.no_telpon,
      avatar:{...this.state.avatar,uri: this.props.route.params.data.avatar} ,
    });
    
  }
  render() {
   
    return (
      <View style={styles.container}>
        <View style={styles.atas}>
          <LottieView
            style={{
              alignSelf: 'center',
              // backgroundColor:'red',
              width: '100%',
              height: '100%',
            }}
            source={require('../../Assets/Logo/28608-make-payment.json')}
            style={styles.lottie}
            autoPlay={true}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              position: 'absolute',
               backgroundColor: '#FFF',
              borderRadius: 30,
              left: 30,
              padding: 5,
              top: 20,
            }}
            onPress={() => this.back()}>
            <Feather name="arrow-left" size={25} />
          </TouchableOpacity>
        </View>

        <View style={styles.bawah}>
          <TouchableOpacity
            onPress={() => this.handleChoosePhoto()}>
            {this.state.avatar !== '' ? (
              <View>
               <Image
                 style={styles.profile}
                 source={{uri: this.state.avatar.uri}}
               />
              <MaterialIcons
                  name="add-a-photo"
                  size={30}
                  style={{marginLeft: 250}}
                />
                </View>
            ) : (
              <View>
                <Image
                  style={styles.profile}
                  source={require('../../Assets/Images/5.png')}
                />
                <MaterialIcons
                  name="add-a-photo"
                  size={30}
                  style={{marginLeft: 250}}
                />
              </View>
            )}
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.input}>
            {/* Ganti email */}
            <Text style={{fontWeight: 'bold', bottom: -15}}>Nama</Text>
            <View style={styles.action}>
              <FontAwesome5 name="user-cog" color="black" size={20} />

              <TextInput
                placeholder="Ganti Nama"
                style={{right: -10, width: '90%'}}
                keyboardType="email-address"
                autoCapitalize="words"
                placeholderTextColor={'white'}
                underlineColorAndroid="white"
                value={this.state.name}
                onChangeText={teks => this.setState({name: teks})}
              />
            </View>
            {/* Gantin No Hp */}
            <Text style={{fontWeight: 'bold', bottom: -15}}>No Hp</Text>
            <View style={styles.action}>
              <MaterialIcons name="add-call" size={25} />

              <TextInput
                placeholder="Ganti Nomor"
                style={{right: -10, width: '90%'}}
                keyboardType='number-pad'
                placeholderTextColor={'white'}
                underlineColorAndroid="white"
                value={this.state.no_telpon}
                onChangeText={teks => this.setState({no_telpon: teks})}
              />
            </View>

            <Text style={{fontWeight: 'bold', bottom: -15}}>Lokasi</Text>
            <View style={styles.action}>
              <MaterialIcons name="add-location-alt" size={25} />
              {/* Ganti Lokasi/] */}
              <TextInput
                placeholder="Ganti Lokasi"
                style={{right: -10, width: '90%'}}
                keyboardType="email-address"
                autoCapitalize="words"
                placeholderTextColor={'white'}
                underlineColorAndroid="white"
                value={this.state.alamat}
                onChangeText={teks => this.setState({alamat: teks})}
              />
            </View>

            <TouchableOpacity style={styles.tombol} onPress={() => this.edit()}>
              <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
                Ganti
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Edituser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  atas: {
    flex: 1,
  },
  bawah: {
    flex: 3,
    backgroundColor: '#1764e8',
    paddingHorizontal: 20,
    paddingVertical: 30,
    // alignItems:'center',
  },
  profile: {
    borderRadius: 70,
    width: 130,
    height: 130,
    top: -90,
    left: 100,
    position: 'absolute',
  },
  lottie: {
    maxWidth: '100%',
    maxHeight: '100%',
    //  resizeMode:'cover',
    backgroundColor: 'red',
  },
  input: {
    marginTop: 70,
  },

  action: {
    flexDirection: 'row',
    marginTop: 20,
    paddingBottom: -3,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  tombol: {
    backgroundColor: 'black',
    height: 50,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    margin: 40,
    // marginTop:50
  },
});
