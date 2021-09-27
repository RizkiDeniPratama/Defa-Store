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
} from 'react-native';
import IonIcons from 'ribu kota bosniaeact-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

class SignUp extends Component {
  back = () => {
    this.props.navigation.navigate('Home');
  };
  constructor() {
    super();
    this.state = {
      modal: false,
      name: '',
      harga: '',
      jumlah: 0,
      token: '',
      data: {},
      loading: false,
      id: '',
      image: '',
      token: '',
      id_penjual: '',
    };
  }

  jumlah = () => {
    this.setState({jumlah: this.state.jumlah + 1});
  };
  kurang = () => {
    if (this.state.jumlah > 0) {
      this.setState({jumlah: this.state.jumlah - 1});
    }
  };

  keranjang = () => {
    const {jumlah, name, harga, image, id} = this.state;
    const produk = {
      jumlah: jumlah,
      name: name,
      harga: harga,
      image: image,
      id: id,
    };
    const url = `https://defa-store.herokuapp.com/api/user/add_cart/product/${
      this.state.id
    }`;
    this.setState({loading: true});
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: produk,
    })
      .then(respon => respon.json())
      .then(resJson => {
        console.log('ini resjson fetch', resJson);
        if (resJson.status != 'error') {
          this.props.navigation.replace('TabNavigation', {screen: 'Keranjang'});
          ToastAndroid.show(
            ' berhasil di tambahkan di keranjang',
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

  componentDidMount() {
    AsyncStorage.getItem('token').then(value => {
      if (value != '') {
        this.setState({
          token: value,
          data: this.props.route.params.item,
          id: this.props.route.params.item.id,
          name: this.props.route.params.item.name,
          harga: this.props.route.params.item.harga,
          image: this.props.route.params.item.image,
          id_penjual: this.props.route.params.item.id_penjual,
        });
      } else {
        console.log('token tidak ada');
      }
    });
  }
  pesan() {
    const {id} = this.state;
    const url = 'https://defa-store.herokuapp.com/api/message/' + id;

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(respon => respon.json())
      .then(resJson => {
        const {status} = resJson;
        if (status == 'success') {
          console.log(resJson.message);
          this.props.navigation.replace('TabNavigation', {screen: 'Pesan'});
        } else {
          console.log('tidak berasil mengahapus');
        }
      })
      .catch(error => {
        console.log('error is' + error);
      });
  }
  render() {
    const {
      name,
      image,
      deskripsi,
      harga,
      stok,
      dilihat,
      id,
    } = this.props.route.params.item;
    console.log(this.state.jumlah);
    return (
      <View style={styles.container}>
        <Modal
          animationType={'fade'}
          visible={this.state.modal}
          onRequestClose={() => this.setState({modal: !this.state.modal})}>
          <View style={{flex: 1, backgroundColor: 'black'}}>
            <Image
              style={{...styles.gambaratas, resizeMode: 'contain'}}
              source={{uri: image}}
            />
          </View>
        </Modal>
        <ScrollView>
          <View style={{height: 350}}>
            <TouchableOpacity
              onPress={() => this.setState({modal: !this.state.modal})}
              activeOpacity={0.5}>
              <Image style={styles.gambaratas} source={{uri: image}} />
            </TouchableOpacity>
          </View>

          <View style={{flex: 1}}>
            <View style={styles.namaHarga}>
              <Text style={styles.price}>{'Rp' + harga}</Text>
              <Text style={styles.nama}>{name}</Text>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <IonIcons
                  name="pricetags-outline"
                  size={20}
                  // style={{left: 200, bottom: 50}}
                />

                <Text style={{marginLeft: 10}}>{'Stok: ' + stok}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  top: -100,
                }}>
                <TouchableOpacity onPress={() => this.kurang()}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    -
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    paddingHorizontal: 20,
                  }}>
                  {this.state.jumlah}
                </Text>

                <TouchableOpacity onPress={() => this.jumlah()}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.deskipsi}>
            <Text style={styles.judul}>Deskripsi Barang</Text>
            <Text style={styles.keterangan}>{deskripsi}</Text>
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => this.keranjang()}
            style={{
              backgroundColor: '#a5d1e9ad',
              height: 50,
              width: '75%',
              alignSelf: 'flex-start',
              borderRadius: 10,
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Feather name="shopping-cart" size={30} />
            <Text style={{margin: 10}}>masukkan ke keranjang</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ChatScreen',{
                item: this.state.data.id_penjual,
              })
            }
            style={{
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'flex-end',
              backgroundColor: '#afd076',
              width: '15%',

              paddingVertical: 6,
            }}>
            <IonIcons name="chatbox-ellipses-outline" size={30} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            position: 'absolute',
            backgroundColor: '#FFF',
            borderRadius: 30,
            left: 30,
            padding: 5,
            top: 20,
            elevation: 10,
          }}
          onPress={() => this.back()}>
          <IonIcons name="chevron-back-outline" size={30} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef1ef',
  },

  gambaratas: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  namaHarga: {
    // height: 100,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#FFF',
    borderRadius: 5,
    // top:10
  },
  nama: {
    fontSize: 20,
    marginTop: 10,
  },
  price: {
    // marginTop:10,
    fontSize: 20,
    color: 'blue',
  },
  deskipsi: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    marginTop: 10,
    height: 400,
  },
  judul: {
    fontWeight: 'bold',
  },
  keterangan: {
    paddingTop: 20,
  },
});
