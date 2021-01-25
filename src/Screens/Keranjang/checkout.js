import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  ToastAndroid,
  ScrollView,
  Button,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
var {width} = Dimensions.get('window');

export class Chekout extends Component {
    state = {
alamat:'',
nama_penerima:'',
no_telpon:''
    }

  checkOut() {
      const {
        alamat,
nama_penerima,
no_telpon  
      } =  this.state
    const url = 'https://defa-store.herokuapp.com/api/user/cart/order/cekout';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body:JSON.stringify ({
          alamat:alamat,
          nama_penerima:nama_penerima,
          no_telpon:no_telpon
      })
    })
      .then(respon => respon.json())
      .then(resJson => {
        console.log('ini resjson nya', resJson);

        if (resJson.status == 'success') {
          ToastAndroid.show('selamat barang sudah di beli', ToastAndroid.SHORT);
        } else {
          console.log('gagal cekout');
        }
      })
      .catch(error => {
        alert('ada masalah cekoutnya', error);
      });
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token}, () => {
        
        });
      } else {
        console.log('token tidak ada');
      }
    });
  }
  render() {
    return (
      <View style={{flex: 1}}>
       <View style={styles.header}>
           <IonIcons
           name='arrow-back-outline'
           style={{right:90}}
           size={30}
           onPress= {() => this.props.navigation.navigate('Keranjang')}
           />
              <Text style={{fontWeight:'bold',fontSize:20}}>Checkout</Text>
            </View>
{/* alamat */}
              <View style={styles.inputView}>
            <View style={styles.headerName}>
              <Text style={{fontWeight: 'bold'}}>Masukan Alamatmu</Text>
              <Text style={{color: 'red'}}>*</Text>
            </View>
            <TextInput
              placeholder={'masukkan dengan lengkap'}
              style={styles.input}
              onChangeText={teks => this.setState({alamat: teks})}
            />
          </View>
{/* penerima */}
          <View style={styles.inputView}>
            <View style={styles.headerName}>
              <Text style={{fontWeight: 'bold'}}>Nama penerima</Text>
              <Text style={{color: 'red'}}>*</Text>
            </View>
            <TextInput
              placeholder={'harap masukkan dengan benar'}
              style={styles.input}
              onChangeText={teks => this.setState({nama_penerima: teks})}
            />
          </View>
{/* no */}
          <View style={styles.inputView}>
            <View style={styles.headerName}>
              <Text style={{fontWeight: 'bold'}}>No Telpon</Text>
              <Text style={{color: 'red'}}>*</Text>
            </View>
            <TextInput
              placeholder={'masukkan no telpon yang bisa di hubungi'}
              keyboardType='name-phone-pad'
              style={styles.input}
              onChangeText={teks => this.setState({no_telpon: teks})}
            />
          </View>

          <View style={{height: 20}} />
            <TouchableOpacity
            onPress={() => this.checkOut()}
              style={{
                backgroundColor: '#33c37d',
                width: width - 40,
                alignItems: 'center',
                padding: 10,
                borderRadius: 5,
                margin: 20,
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                BELI SEKARANG
              </Text>
            </TouchableOpacity>

            <View style={{height: 20}} />
      </View>
    );
  }
}

export default Chekout;

const styles = StyleSheet.create({
    header: {
        flexDirection:'row',
        height: 50,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
      elevation:5
      },
      inputView: {
        backgroundColor: '#FFF',
        height: 90,
        marginTop: 10,
      },
      headerName: {
        backgroundColor: '#FFF',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row',
      },
      input: {
        paddingHorizontal: 20,
      },
})