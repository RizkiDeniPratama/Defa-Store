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
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export class Akun extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      data: '',
    };
  }

  user() {
    const url = 'https://defa-store.herokuapp.com/api/profil';

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(response => response.json())
      .then(resJson => {
        console.log('darirofil', resJson);
        if (resJson) {
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
        });
      } else {
        console.log('token tidak ada');
      }
    });
  }

  logout = () => {
    AsyncStorage.clear();
    this.props.navigation.replace('TabNavigation');
  };
  konfirmasilogout = () => {
    Alert.alert(
      'keluar',
      'Yakin ingin keluar ?',
      [
        {
          text: 'Batal',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'logout', onPress: () => this.logout()},
      ],
      {cancelable: false},
    );
  };
  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.token == '' ? (
          <View>
            <Button
              title="masuk"
              onPress={() => this.props.navigation.navigate('SignIn')}
            />
          </View>
        ) : (
          <View style={{flex: 1}}>
            <View style={styles.header}>
              <Text>ACCOUNT</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1, paddingHorizontal: 20}}>
              <View style={styles.layerUser}>
                <Image
                  source={{uri: this.state.data.avatar}}
                  style={styles.akun}
                />

                <View>
                  <View style={styles.dataUser}>
                    <IonIcons name="person-sharp" size={20} />
                    <Text style={styles.apiUser}>{this.state.data.name}</Text>
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
                </View>

                <View>
                  <View style={styles.dataUser2}>
                    <IonIcons name="mail" size={20} />
                    <Text style={styles.apiUser}>{this.state.data.email}</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View style={styles.list}>
              <View style={{width: '100%'}}>
                <Text style={styles.textList}>Additional Services</Text>
                <View style={styles.gayaList} />
              </View>
            </View>
            <ScrollView>
              {/* edir data user*/}
              <TouchableOpacity
                style={styles.kotaklist}
                onPress={() =>
                  this.props.navigation.navigate('Edituser', {
                    data: this.state.data,
                  })
                }>
                <View style={{flexDirection: 'row'}}>
                  <FontAwesome5 name="user-edit" size={20} />
                  <Text style={{marginLeft: 20}}>editakun</Text>
                </View>
                <IonIcons name="chevron-forward-sharp" size={20} />
              </TouchableOpacity>
              {/* keranjang */}
              <TouchableOpacity
                style={styles.kotaklist}
                onPress={() => this.props.navigation.navigate('Keranjang')}>
                <View style={{flexDirection: 'row'}}>
                  <MaterialIcons name="local-grocery-store" size={20} />
                  <Text style={{marginLeft: 20}}>keranjang</Text>
                </View>
                <IonIcons name="chevron-forward-sharp" size={20} />
              </TouchableOpacity>
              {/* buka toko */}
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Registrasi')}
                style={styles.kotaklist}>
                <View style={{flexDirection: 'row'}}>
                  <MaterialIcons name="add-business" size={20} />
                  <Text style={{marginLeft: 20}}>buka toko</Text>
                </View>
                <IonIcons name="chevron-forward-sharp" size={20} />
              </TouchableOpacity>
              {/* ke toko */}
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Toko')}
                style={styles.kotaklist}>
                <View style={{flexDirection: 'row'}}>
                  <MaterialIcons name="add-business" size={20} />
                  <Text style={{marginLeft: 20}}>Toko mu</Text>
                </View>
                <IonIcons name="chevron-forward-sharp" size={20} />
              </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity
              onPress={() => this.konfirmasilogout()}
              style={styles.logOut}>
              <Text style={styles.titlelog}>Log Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

export default Akun;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 40,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 1,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  layerUser: {
    // padding: 20,
    flexDirection: 'row',
  },
  akun: {
    borderRadius: 70,
    width: 130,
    height: 130,
    marginTop: 20,
  },
  dataUser: {
    flexDirection: 'row',
    margin: 15,
    // left: 15,
  },
  dataUser2: {
    flexDirection: 'row',
    margin: 15,
    // left: 40,
  },
  list: {
    paddingHorizontal: 20,
    width: '100%',
  },
  textList: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#484d51',
  },
  gayaList: {
    height: 4,
    backgroundColor: '#b1e5d3',
    width: 160,
    marginTop: 2,
  },
  kotaklist: {
    paddingHorizontal: 20,
    marginTop: 15,
    backgroundColor: 'red',
    height: 50,
    width: 340,
    left: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 5,
  },
  titlelog: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  logOut: {
    backgroundColor: '#0f88eb',
    alignItems: 'center',
    height: 50,
    width: 330,
    bottom: 30,
    justifyContent: 'center',
    left: 15,
    borderRadius: 5,
  },
  apiUser: {
    marginLeft: 15,
  },
});
