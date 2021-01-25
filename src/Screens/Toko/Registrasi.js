import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Alert,
  ToastAndroid,
  Modal,
  Image,
  Picker,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const byImage = require('../../Assets/Images/daftar.png');
class Bukatoko extends Component {
  constructor() {
    super();
    this.state = {
      name_toko: '',
      alamat: '',
      no_telpon: '',
      no_rekening: '',
      id_kota: '',
      token: '',
      modal: false,
      kota: [],
      wilayah_id: '',
      kurir: [],
      id_kurir: '',
      province: [],
      id_provinces: '',
      avatar:{uri:''} ,
      photo: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then(value => {
      if (value != null) {
        console.log('token tersedia');
        this.setState({token: value});
        this.seller();
      } else {
        console.log('token tidak ada');
      }
    });
  }

  seller = () => {
    console.log('sedang mengambil wilayah');
    const url = 'https://defa-store.herokuapp.com/api/seller/register';
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(respon => respon.json())
      .then(resJson => {
        console.log('ini data', resJson);
        if (resJson != null || '') {
          this.setState({
            kota: resJson.city,
            kurir: resJson.kurir,
            province: resJson.province,
          });
        }
      })
      .catch(error => {
        console.log('errror ini ' + error);
      });
  };

  toko = () => {
    const {
      name_toko,
      alamat,
      no_telpon,
      no_rekening,
      id_provinces,
      id_kota,
      id_kurir,
      photo,
      avatar,
    } = this.state;

    const body = {
      name_toko: name_toko,
      alamat: alamat,
      no_telpon: no_telpon,
      no_rekening: no_rekening,
      id_provinces: id_provinces,
      id_kota: id_kota,
      id_kurir: id_kurir,
    };

    const url = 'https://defa-store.herokuapp.com/api/seller/register';
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${this.state.token}`,
    //   },
    //   body: this.createFormData(avatar, body),
    // })
    //   .then(respon => respon.json())
    //   .then(resJson => {
    //     console.log('ini seller', resJson);
    //     if (resJson.token) {
    //       this.props.navigation.navigate('Toko');
    //       ToastAndroid.show(
    //         'Toko anda sudah terdaftar',
    //         ToastAndroid.SHORT,
    //         ToastAndroid.CENTER,
    //       );
    //     }
    //   })
    //   .catch(error => {
    //     console.log('errror ini ' + error);
    //   });

    const formData = new FormData();

      formData.append('name_toko', name_toko );
      formData.append(' alamat',  alamat);
      formData.append('no_telpon', no_telpon);
      formData.append(' no_rekening',  no_rekening);
      formData.append(' id_provinces',  id_provinces);
      formData.append(' id_kota',  id_kota);
      formData.append('  id_kurir',   id_kurir);
      formData.append('avatar', {
        name: avatar.fileName,
        type: avatar.type,
        uri:
          Platform.OS == 'android'
            ? avatar.uri
            : avatar.uri.replace('file://', ''),
      });
      console.log(formData);
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${this.state.token}`,
        },
        body: formData,
      })
      .then(respon => respon.json())
        .then(resJson => {
          console.log('ini seller', resJson);
          if (resJson.status == 'success') {
            this.props.navigation.navigate('Toko');
            ToastAndroid.show(
              'Toko anda sudah terdaftar',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
        })
        .catch(error => {
          console.log('errror ini ' + error);
        });
  };
  // fungsi photo
  createFormData = (photo, body) => {
    const data = new FormData();

    if (photo !== '') {
      data.append('avatar', {
        name: photo.fileName,
        type: photo.type,
        uri:
          Platform.OS == 'android'
            ? photo.uri
            : photo.uri.replace('file://', ''),
      });
    }
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
    console.log('ini form ',data);
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

  render() {
    // console.log('ini dari render', this.state.avatar.uri);
    return (
      <ImageBackground
        source={byImage}
        style={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
        }}>
        <Modal
          animationType={'fade'}
          visible={this.state.modal}
          onRequestClose={() => this.setState({modal: !this.state.modal})}>
          <View style={{flex: 1, backgroundColor: 'black'}}>
            {/* <Image
              style={{...styles.gambaratas, resizeMode: 'contain'}}
              source={{uri: image}}
            /> */}
          </View>
        </Modal>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.textheader}>{'Create\nStore'}</Text>
            <Text style={{marginLeft: 230, marginTop: -10}}>
              {'Sudah\nPunya toko ?'}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.market}
              onPress={() => this.props.navigation.navigate('Toko')}>
              <FontAwesome5 name="store-alt" size={25} color="white" />
            </TouchableOpacity>

            {/* inputdata */}
            <TextInput
              style={{
                ...styles.inputStyle,
                marginTop: 30,
              }}
              placeholder={'Nama Toko'}
              placeholderTextColor={'white'}
              underlineColorAndroid="white"
              value={this.state.name_toko}
              onChangeText={teks => this.setState({name_toko: teks})}
            />

            <TextInput
              style={{
                ...styles.inputStyle,
              }}
              placeholder={'Alamat'}
              placeholderTextColor={'white'}
              underlineColorAndroid="white"
              value={this.state.alamat}
              onChangeText={teks => this.setState({alamat: teks})}
            />

            <TextInput
              style={{
                ...styles.inputStyle,
              }}
              placeholder={'Kontak Hp'}
              placeholderTextColor={'white'}
              underlineColorAndroid="white"
              keyboardType="number-pad"
              value={this.state.no_telpon}
              onChangeText={teks => this.setState({no_telpon: teks})}
            />

            <TextInput
              style={{
                ...styles.inputStyle,
              }}
              placeholder={'No Rekening'}
              placeholderTextColor={'white'}
              underlineColorAndroid="white"
              keyboardType="number-pad"
              value={this.state.no_rekening}
              onChangeText={teks => this.setState({no_rekening: teks})}
            />
            <Text>pilih kota mu</Text>
            <Picker
              mode="dropdown"
              selectedValue={this.state.id_kota}
              onValueChange={sel => this.setState({id_kota: sel})}>
              {this.state.kota.map((value, index) => (
                <Picker.Item key={index} label={value.name} value={value.id} />
              ))}
            </Picker>

            <Text>pilih provinsi mu</Text>
            <Picker
              mode="dropdown"
              selectedValue={this.state.id_provinces}
              onValueChange={sel => this.setState({id_provinces: sel})}>
              {this.state.province.map((value, index) => (
                <Picker.Item key={index} label={value.name} value={value.id} />
              ))}
            </Picker>

            <Text>pilih kurir mu</Text>
            <Picker
              mode="dropdown"
              selectedValue={this.state.id_kurir}
              onValueChange={sel => this.setState({id_kurir: sel})}>
              {this.state.kurir.map((value, index) => (
                <Picker.Item key={index} label={value.name} value={value.id} />
              ))}
            </Picker>

            <View style={styles.foto}>
            <TouchableOpacity style={styles.addFoto} activeOpacity={0.7}
            onPress={() => this.handleChoosePhoto()}>
            
              {this.state.avatar.uri !== '' ? (
              <Image
                style={styles.profile}
                source={{uri: this.state.avatar.uri}}
              />
            ) : (
              <View>
                <MaterialIcons name="add-a-photo" size={90} />
              </View>
            )}
            
            </TouchableOpacity>
          </View>
          </View>

          <TouchableOpacity style={styles.tombol} onPress={() => this.toko()}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Buka Toko </Text>
          </TouchableOpacity>
         


        </ScrollView>


        {/* tombol kembali */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.back}
          onPress={() => this.props.navigation.navigate('Akun')}>
          <IonIcons name="chevron-back-outline" size={25} color="white" />
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

export default Bukatoko;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  textheader: {
    fontSize: 40,
    color: 'white',
    marginTop: 80,
    marginBottom: 40,
  },
  back: {
    position: 'absolute',
    // backgroundColor: '#FFF',
    borderRadius: 30,
    left: 30,
    padding: 5,
    top: 20,
    elevation: 10,
  },
  inputStyle: {
    fontSize: 20,
    color: 'white',
    width: '100%',
    marginTop: 30,

    paddingBottom: 15,
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
  market: {
    // position:'absolute',
    // borderRadius:30,
    marginLeft: 270,
    backgroundColor: 'red',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  foto: {
    // backgroundColor: '#FFF',
    height: 150,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
  },
  addFoto: {
    borderWidth: 2,
    padding: 10,
    borderStyle: 'dashed',
    borderRadius: 5,
  },
  profile: {
height:100,
width:100
  }
});
