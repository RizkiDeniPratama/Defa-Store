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
import Icon from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
var {width} = Dimensions.get('window');
var {height} = Dimensions.get('window');
class Keranjang extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      data: [],
    };
  }

  keranjang = () => {
    console.log('sedang mengambil cart');
    const url = 'https://defa-store.herokuapp.com/api/user/cart';
    fetch(url, {
      method: 'GET',
      headers: {
        // Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(respon => respon.json())
      .then(resJson => {
        this.setState({data: resJson.data});
        console.log('ini data keranjang', this.state.data);
      })
      .catch(error => {
        console.log('error is' + error);
      });
  };

  Delete = id_product => {
    console.log('menghapus');
    const url = `https://defa-store.herokuapp.com/api/user/delete_di_cart/product/${id_product}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(respon => respon.json())
      .then(resJson => {
        console.log(resJson);
        if (resJson.status == 'success') {
          ToastAndroid.show('barang sudah modar', ToastAndroid.SHORT);
          this.keranjang();
        } else {
          console.log('gagal menghapus');
        }
      })
      .catch(error => {
        console.log('error is' + error);
      });
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then(token => {
      if (token != null) {
        this.setState({token: token}, () => {
          this.keranjang();
        });
      } else {
        console.log('token tidak ada');
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {this.state.token != '' && (
          <>
            <View style={{height: 20}} />
            <Text style={{fontSize: 30, fontWeight: 'bold', color: '#33c37d'}}>
              Keranjang Kamu
            </Text>
            <View style={{height: 10}} />
          </>
        )}
        <View style={{flex: 1}}>
          <ScrollView>
            <View style={{flex: 1}}>
              {this.state.token == '' ? (
                <View style={styles.loginRegister}>
                  <View style={styles.BoxImage}>
                    <Image
                      source={require('../../Assets/Images/avatar.png')}
                      style={{width: 70, height: 70}}
                    />
                  </View>
                  <View style={styles.posisenLogin}>
                    <View style={styles.boxLoginRegister}>
                      <Button
                        title="MASUK"
                        onPress={() => this.props.navigation.navigate('SignIn')}
                      />
                    </View>
                    <View style={styles.boxLoginRegister}>
                      <Button
                        title="DAFTAR"
                        onPress={() => this.props.navigation.navigate('SignUp')}
                      />
                    </View>
                  </View>
                </View>
              ) : (
                <View style={{flex: 1}}>
                  {this.state.data.map((val, key) => {
                    return (
                      <View
                        key={key}
                        style={{
                          width: width - 20,
                          margin: 10,
                          backgroundColor: 'transparent',
                          flexDirection: 'row',
                          borderBottomWidth: 2,
                          borderColor: '#cccccc',
                          paddingBottom: 10,
                        }}>
                        <Image
                          source={{uri: val.product.image}}
                          style={{width: width / 3, height: width / 3}}
                          resizeMode="contain"
                        />
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: 'trangraysparent',
                            padding: 10,
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>
                              {val.product.name}
                            </Text>
                            <Text>kategori</Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => this.Delete(val.id_product)}
                            style={{alignSelf: 'flex-end'}}>
                            <IonIcons name="trash" size={30} color="red" />
                          </TouchableOpacity>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                color: '#33c37d',
                                fontSize: 20,
                              }}>
                              Rp{val.total_price}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          </ScrollView>
          <View style={{height: 20}} />
          {this.state.token != '' && (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Checkout')}
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
                CHECKOUT
              </Text>
            </TouchableOpacity>
          )}
          <View style={{height: 20}} />
        </View>
      </View>
    );
  }
}

export default Keranjang;

const styles = StyleSheet.create({
  boxTampildata: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    // flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  boksProduk: {
    width: 300,
    height: 200,
    backgroundColor: '#FFF',
    marginLeft: 20,
    marginTop: 10,
    elevation: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
  },
  viewImage: {
    // justifyContent: 'center',
    alignItems: 'center',
  },
  viewTeks: {
    paddingLeft: 7,
    // justifyContent: 'space-around',
  },
  loginRegister: {
    width: '90%',
    height: 190,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 90,
    marginLeft: 18,
    elevation: 10,
  },
  BoxImage: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    top: 50,
    borderWidth: 7,
    borderColor: '#3462f9',
    marginTop: -95,
    borderWidth: 7,
    margin: 5,
  },
  posisenLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  boxLoginRegister: {
    width: '40%',
    height: 50,
    margin: 5,
    borderRadius: 20,
  },
});
