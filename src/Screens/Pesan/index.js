import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

class Kontak extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: [],
      data: '',
      
    };
    AsyncStorage.getItem('token').then((value) => {
      if (value != null) {
        this.setState({token: value});
        console.log('Token tersedia');
       this.addkontak()
      } else {
        console.log('Token tidak ada');
      }
    });
  }

  addkontak() {
    console.log('mengambil kontak..');
    console.log(this.state.token);
    
    fetch('https://defa-store.herokuapp.com/api/chat/seller', {
      method: 'GET',
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log('response json nya ',resJson);
        this.setState({data: resJson.kontak});
       
      })
      .catch((err) => {
        console.log('Terjadi kesalahan. ' + err);
      });
  }


  render() {
    
    return (
      <View style={{flex: 1}}>
        {/* <View style={styles.header}>
          <ImageBackground
            source={require('../../Assets/Images/daftar.png')}
            style={styles.headerBg}>
            <Image
              source={require('../../Assets/Images/impian.png')}
              style={styles.headerIcon}
            />
            <Text style={styles.headerText}>Kontak</Text>
          </ImageBackground>
        </View>
        <ScrollView>
          {this.state.data == '' ? (
            <View style={styles.viewLoading}>
              <LottieView
                autoPlay
                style={{width: 120}}
                source={require('../../Assets/Logo/10357-chat-typing-indicator.json')}
              />
            </View>
          ) : (
            <View>
              {this.state.data.map((value, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.viewChat}
                  onPress={() =>
                    this.props.navigation.navigate('ChatScreen', {data: value})
                  }>
                  <Image source={{uri: value.image}} style={styles.imgPp} />
                  <View style={styles.viewTextChat}>
                    <Text style={styles.textName}>{value.name}</Text>
                    <Text>Chat terakhir</Text>
                  </View>
                  <Text>Waktu</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
         
        </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFF',
  },
  headerBg: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    resizeMode: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  headerIcon: {
    width: 25,
    height: 25,
    tintColor: 'white',
  },
  imgPp: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  viewChat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingVertical: 10,
  },
  viewTextChat: {
    flex: 1,
    height: 60,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  textName: {
    fontSize: 20,
  },
  viewLoading: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'center',
    width: '95%',
    elevation: 2,
    marginVertical: 10,
   
  },
});

export default Kontak;