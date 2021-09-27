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
} from 'react-native';
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
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
const byimage = require('../../Assets/Images/danau.jpg');
class Toko extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      data: '',
      barang: [],
      loading: false,
    };
  }

  // get data barang
  barang() {
    const url = 'https://defa-store.herokuapp.com/api/seller/product/me';
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(respon => respon.json())
      .then(resJson => {
        console.log('dari barang', resJson);
        if (resJson) {
          console.log(resJson);
          this.setState({barang: resJson.data[0].product, loading: false});
        }
      })
      .catch(error => {
        console.log('error is' + error);
        this.setState({loading: false});
      });
  }

  // get data seller

  user() {
    const url = 'https://defa-store.herokuapp.com/api/seller';

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
        console.log('darirofil', resJson);
        if (resJson) {
          console.log(resJson);
          this.setState({data: resJson.data});
        }
      })
      .catch(error => {
        console.log('error is' + error);
      });
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then(value => {
      if (value != null) {
        this.setState({token: value}, () => {
          this.user();
          this.barang();
          
        });
      } else {
        console.log('token tidak ada');
      }
    });
  }

  render() {
    return (
      <ImageBackground
        source={byimage}
        style={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
        }}>
      
          <ScrollView contentContainerStyle={{flexGrow:1,paddingBottom:50}}>
            {/* screen data penjual */}
            <View style={styles.home}>
            <Image
              source={{uri: this.state.data.avatar}}
              style={styles.profile}
            />
           
           <View>
                  <View style={styles.dataUser}>
                    <FontAwesome5 name="store-alt" size={20} />
                    <Text style={styles.apiUser}>{this.state.data.name_toko};</Text>
                  </View>

                  <View style={styles.dataUser}>
                    <IonIcons name="call-sharp" size={20} />
                    <Text style={styles.apiUser}>
                      {this.state.data.no_telpon}
                    </Text>
                  </View>

                  <View style={styles.dataUser}>
                    <IonIcons name="location-sharp" size={20} />
                    <Text style={styles.apiUser}>{this.state.data.alamat}</Text>
                  </View> 
                  
                  <View style={styles.dataUser}>
                    <IonIcons name="card" size={20} />
                    <Text style={styles.apiUser}>{this.state.data.no_rekening}</Text>
                  </View>

                </View>
           
         
            </View>
              <ScrollView 
              contentContainerStyle={{marginTop:20}}
              horizontal={true}
              >
                {this.state.barang == '' ? (
                  <View>
                    <PacmanIndicator color="black" size={30} />
                  </View>
                ) : (
                  <View>
                    <View style={styles.rekomendasi}>
                      <View style={{width:355}}>
                        <Text style={styles.textrecomendasi}>Barang anda</Text>
                        <View style={styles.gayarekomendasi} />
                      </View>
                      
                    </View>
                    <View
                      style={{
                        flexGrow: 1,
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        backgroundColor: '#cbc8c899',
                        //  alignItems:'center',
                        justifyContent: 'center',
                      }}>
                      {this.state.barang.map((val, key) => {
                        return (
                          <View key={key}>
                            <TouchableOpacity


                              style={{
                                height: 220,
                                elevation: 2,
                                backgroundColor: '#FFF',
                                marginHorizontal: 10,
                                marginTop: 5,
                                width: 160,
                              }}
                              onPress={() =>
                                this.props.navigation.navigate('Editbarang', {
                                  item: val,
                                })
                              }>
                              <View>
                                <Image
                                  source={{uri: val.image}}
                                  style={{
                                    width: '100%',
                                    height: 170,
                                    resizeMode: 'contain',
                                  }}
                                />
                              </View>
                              <View style={styles.merekHarga}>
                                <Text style={styles.gayaHarga}>
                                  {'Rp ' + val.harga}
                                </Text>
                                <Text
                                  numberOfLines={2}
                                  style={{
                                    fontWeight: 'bold',
                                  }}>
                                  {val.name}
                                </Text> 
                               
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                )}
              </ScrollView>
            {/* </View> */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-around',
              }}>
              {/* chat penjual */}
              <TouchableOpacity style={styles.chat}>
                <Text style={styles.title}>Chat</Text>
              </TouchableOpacity>
              {/* tambah prodak */}
              <TouchableOpacity
                style={styles.add}
                activeOpacity={0.7}
                onPress={() => this.props.navigation.navigate('Add')}>
                <Text style={styles.title}>Mulai Berjualan</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
       

        {/* kembali */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.back}
          onPress={() => this.props.navigation.navigate('Akun')}>
          <IonIcons name="chevron-back-outline" size={30} color="white" />
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

export default Toko;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back: {
    position: 'absolute',
    backgroundColor: '#a4949445',
    borderRadius: 10,
    marginLeft: 40,
    marginTop: 30,
  },
  profile: {
    borderRadius: 80,
    height: 120,
    width: 120,
    alignSelf: 'center',
    marginTop:-60
    
  },
  nama: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal:20,
    marginTop:20
    
  },
 home: {
    height: 300,
    width: 280,
    backgroundColor: '#cbc8c899',
    alignSelf: 'center',
    marginTop: 130,
    borderRadius: 20,
  },
 
  add: {
    backgroundColor: '#c0e9a5ad',
    height: 50,
    width: 150,
    alignSelf: 'flex-end',
    borderRadius: 10,
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
  },
  chat: {
    backgroundColor: '#a5d1e9ad',
    height: 50,
    width: 150,
    alignSelf: 'flex-start',
    borderRadius: 10,
    justifyContent: 'center',
  },
  rekomendasi: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#404040',
  //  position:'absolute'
  },
  textrecomendasi: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#ecedf3a1',
    alignSelf:'center'
  },
  gayarekomendasi: {
    height: 4,
    backgroundColor: '#b1e5d3',
    width: 200,
    marginTop: 2,
    alignSelf:'center'
    
  },
  dataUser: {
    flexDirection: 'row',
    margin: 15,
    // left: 15,
  },
  apiUser: {
    marginLeft: 15,
  },
});
