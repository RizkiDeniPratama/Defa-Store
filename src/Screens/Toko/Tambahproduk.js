import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Alert,
  ToastAndroid,
  Modal,
  Image,
  style,
  Picker,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

class Tambahproduk extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      harga: '',
      stok: '',
      foto: '',
      photo: '',
      deskripsi: '',
      id_kategori: '',
      // token: '',
      loading: false,
      image: {uri: ''},
      data: [],
    };
  }

  list = () => {
    console.log('sedang mengambil wilayah');
    const url = 'https://defa-store.herokuapp.com/api/kategori';
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
            data: resJson.data,
            kurir: resJson.name,
          });
        }
      })
      .catch(error => {
        console.log('errror ini ' + error);
      });
  };

  tambah() {
    const {name, harga, stok, deskripsi, id_kategori, image} = this.state;
    if (
      name !== '' &&
      harga !== '' &&
      stok !== '' &&
      image !== '' &&
      deskripsi !== '' &&
      id_kategori !== ''
    ) {
      const body = {
        name: name,
        harga: harga,
        stok: stok,
        deskripsi: deskripsi,
        id_kategori: id_kategori,
      };
      fetch('https://defa-store.herokuapp.com/api/seller/add_product', {
        method: 'POST',
        body: this.createFormData(image, body),
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
        .then(response => response.json())
        .then(response => {
          if (response) console.log('Berhasil di tampilkan.', response);
          alert('Data ditambahkan!');
          this.props.navigation.replace('TabNavigation', {screen: 'Home'});
        })
        .catch(error => {
          console.log('Upload error', error);
          alert('Gagal ditambahkan');
        });
    } else {
      alert('Isi dengan benar');
    }
  }

  createFormData = (photo, body) => {
    const data = new FormData();

    data.append('image', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({image: response});
        console.log(this.state.image);
      }
    });
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then(token => {
      if (token != null) {
        this.setState({token: token});
        this.list();
        console.log('token ada');
      } else {
        console.log('token tidak ada');
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        {/* atas */}
        <View style={styles.header}>
          <IonIcons
            name="arrow-back-outline"
            size={30}
            style={{
              marginLeft: 20,
            }}
            onPress={() => this.props.navigation.replace('Toko')}
          />
          <Text style={{marginLeft: 70, fontSize: 20, fontWeight: 'bold'}}>
            {' '}
            Add Product{' '}
          </Text>
        </View>
        <ScrollView>
          {/* tambah photo */}
          {/* <View style={styles.foto}>
            <TouchableOpacity style={styles.addFoto} activeOpacity={0.7}   onPress={() => this.handleChoosePhoto()}>
              <MaterialIcons name="add-a-photo" size={150}  />
            </TouchableOpacity>
          </View> */}
          <View style={styles.foto}>
            <TouchableOpacity
              style={styles.addFoto}
              activeOpacity={0.7}
              onPress={() => this.handleChoosePhoto()}>
              {this.state.image.uri !== '' ? (
                <Image
                  style={styles.profile}
                  source={{uri: this.state.image.uri}}
                />
              ) : (
                <View>
                  <MaterialIcons name="add-a-photo" size={150} />
                </View>
              )}
            </TouchableOpacity>
          </View>
          {/* nama barang */}
          <View style={styles.inputView}>
            <View style={styles.headerName}>
              <Text style={{fontWeight: 'bold'}}>Nama Produk</Text>
              <Text style={{color: 'red'}}>*</Text>
            </View>
            <TextInput
              placeholder={'Masukkan Nama Produk'}
              style={styles.input}
              onChangeText={teks => this.setState({name: teks})}
            />
          </View>

          {/* deskripsi barang */}
          <View style={styles.inputView}>
            <View style={styles.headerName}>
              <Text style={{fontWeight: 'bold'}}>Deskripsi Produk</Text>
              <Text style={{color: 'red'}}>*</Text>
            </View>
            <TextInput
              placeholder={'Masukkan deskripsi dengan jujur'}
              style={styles.input}
              onChangeText={teks => this.setState({deskripsi: teks})}
            />
          </View>
          {/* kategori */}

          <View style={styles.inputView}>
            <View style={styles.headerName}>
              <Text style={{fontWeight: 'bold', marginTop: 10}}>kategori</Text>
              <Text style={{color: 'red'}}>*</Text>
            </View>
            <Picker
              style={{width: 330, marginLeft: 15}}
              mode="dropdown"
              selectedValue={this.state.id_kategori}
              onValueChange={sel => this.setState({id_kategori: sel})}>
              {this.state.data.map((value, index) => (
                <Picker.Item key={index} label={value.name} value={value.id} />
              ))}
            </Picker>
          </View>
          {/* harga */}
          <View style={styles.inputPrice}>
            <View style={styles.headerName}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Harga</Text>
                <Text style={{color: 'red'}}>*</Text>
                <Text style={{left: 160}}>Rp</Text>
              </View>
              <TextInput
                placeholder={'Atur Harga'}
                keyboardType="decimal-pad"
                style={{marginLeft: 170}}
                onChangeText={teks => this.setState({harga: teks})}
              />
            </View>
          </View>
          {/* stok */}
          <View style={styles.inputstok}>
            <View style={styles.headerName}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Stok</Text>
                <Text style={{color: 'red'}}>*</Text>
              </View>
              <TextInput
                placeholder={'Atur Stok barang'}
                keyboardType="decimal-pad"
                style={{marginLeft: 180}}
                onChangeText={teks => this.setState({stok: teks})}
              />
            </View>
          </View>
          {/* tambah barang */}
          <TouchableOpacity style={styles.nampil} onPress={a => this.tambah()}>
            <Text
              style={{
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: 20,
                color: 'white',
              }}>
              Tampilkan
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default Tambahproduk;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  foto: {
    backgroundColor: '#FFF',
    height: 200,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  addFoto: {
    borderWidth: 2,
    padding: 10,
    borderStyle: 'dashed',
    borderRadius: 5,
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
  inputKategori: {
    backgroundColor: '#FFF',
    height: 50,
    marginTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputPrice: {
    backgroundColor: '#FFF',
    height: 50,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    width: '100%',
  },
  inputstok: {
    backgroundColor: '#FFF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 1,
  },
  nampil: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    height: 50,
    width: 200,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  profile: {
    height: 150,
    width: 150,
  },
});
