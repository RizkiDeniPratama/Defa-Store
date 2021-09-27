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
  Picker,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import ImagePicker from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import IonIcons from 'react-native-vector-icons/Ionicons';

class Editbarang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.route.params.item.name,
      harga: this.props.route.params.item.harga,
      stok: this.props.route.params.item.stok,
      foto: '',
      photo: '',
      deskripsi: this.props.route.params.item.deskripsi,
      id_kategori: this.props.route.params.item.id_kategori,
      token: '',
      loading: false,
      image: {
        uri: this.props.route.params.item.image,
        fileName: 'poto',
        type: 'image/jpeg',
      },
      data: [],
      id: this.props.route.params.item.id,
    };
  }
  //   ambil data kategori
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

// HAPUS BARANG

Delet() {
    const  {id} = this.state
    const url =
      'https://defa-store.herokuapp.com/api/seller/delete_product/' + id
   
    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        const {status} = resJson;
        if (status == 'success') {
          console.log(resJson.message);
          this.props.navigation.replace('Toko',)
        } else {
          console.log('tidak berasil mengahapus');
        }
      })
      .catch((error) => {
        console.log('error is' + error);
      });
  }

  // fetch edit
  edit = () => {
    const {name, harga, deskripsi, image, stok, id, id_kategori} = this.state;
    const url =
      'https://defa-store.herokuapp.com/api/seller/update_product/' + id;

    // const body = {
    //     _method:'patch',
    //   name: name,
    //   deskripsi: deskripsi,
    //   stok :parseFloat(stok) ,
    //   id_kategori:id_kategori
    // };
    const formData = new FormData();

    formData.append('_method', 'patch');
    formData.append('name', name);
    formData.append(' deskripsi', deskripsi);
    formData.append(' stok', stok);
    formData.append(' id_kategori', id_kategori);
    formData.append(' harga', harga);
    formData.append(' id_kategori', id_kategori);
    formData.append('image', {
      name: image.fileName,
      type: image.type,
      uri:
        Platform.OS == 'android' ? image.uri : image.uri.replace('file://', ''),
    });

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
        console.log('ini resjson fetch', resJson);
        if (resJson) {
          this.props.navigation.replace('Toko');
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

  createFormData = (photo, body) => {
    const data = new FormData();
    if (photo.uri != '') {
      data.append('image', {
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
    console.log('ini form', data);
    console.log('ini image', data._parts);
    return data;
  };

  handleChoosePhoto = () => {
    const option = {
      noData: true,
    };
    ImagePicker.showImagePicker(option, response => {
      console.log(response);
      if (response.uri) {
        this.setState({image: response});
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
    //    console.log('ini params',this.props.route.params);
    const {item} = this.props.route.params;
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
            Edit Product{' '}
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
              value={this.state.name}
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
              placeholder={'Masukkan Nama Produk'}
              style={styles.input}
              value={this.state.deskripsi}
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
                value={this.state.harga}
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
                <Text style={{left: 170}}>Rp</Text>
              </View>
              <TextInput
                placeholder={'Atur Harga'}
                keyboardType="decimal-pad"
                style={{marginLeft: 180}}
                value={this.state.stok}
                onChangeText={teks => this.setState({stok: teks})}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-around',
            }}>
            {/*edit */}
            <TouchableOpacity style={styles.nampil} onPress={() => this.edit()}>
              <Text style={styles.title}>edit bro</Text>
            </TouchableOpacity>
            {/* hapus*/}
            <TouchableOpacity style={styles.hapus} activeOpacity={0.7} onPress={ () => this.Delet()} >
              <FontAwesome5
                name="trash"
                size={30}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Editbarang;

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
    backgroundColor: 'blue',
    height: 50,
    width: 150,
    alignSelf: 'flex-end',
    borderRadius: 10,
    justifyContent: 'center',
  },
  profile: {
    height: 150,
    width: 150,
  },
  hapus: {
    backgroundColor: 'red',
    height: 50,
    width: 50,
    alignSelf: 'flex-start',
    borderRadius: 10,
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
    color: 'white',
  },
});
