import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import React, {Component} from 'react';
import Pusher from 'pusher-js/react-native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
TextInput,
Button
} from 'react-native';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      // user: [],
      data: [],
      id_penjual: '',
      loading: false,
      input: '',
      id:''
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then(value => {
      if (value != null) {
        console.log(value);
        this.setState({token: value,id_penjual:this.props.route.params.item});
        console.log('Token tersedia');
        console.log(this.props.route.params.item);
        // this.getSeller();
      } else {
        console.log('Token tidak ada');
      }
      // this.getSeller;
    });

    Pusher.logToConsole = true;

    var pusher = new Pusher('32c4697c9bf010656c17', {
      cluster: 'ap1',
    });
    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', () => {
        // alert(JSON.stringify(data));
      console.log('ini dari pusher');
this.getpesan()
    });
  }
  getpesan() {
    console.log('mengambil kontak..');
    console.log(this.state.token);
    console.log(this.props.route.params.item);
    fetch(
      `https://defa-store.herokuapp.com/api/message/${
        this.props.route.params.item
      }`,
      {
        method: 'GET',
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${this.state.token}`,
        },
      },
    )
      .then(respon => respon.json())
      .then(resJson => {
        this.setState({data: resJson.data
        });
        console.log('response json get ', resJson);
      })
      .catch(err => {
        console.log('Terjadi kesalahan. ' + err);
      });
  }

  chatting() {
    console.log('mengirim pesan');
    const {input,id_penjual,token} = this.state;
    fetch(
      `https://defa-store.herokuapp.com/api/message/${
        this.state.id_penjual
      }`,
      {
        method: 'POST',
        body: JSON.stringify({message: input}),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(respon => respon.json())
      .then(resJson => {
        console.log('response json nya ', resJson);
        const {status} = resJson;
        if (status == 'success') {
        
          this.setState({loading: false});
        } else {
          this.setState({loading: false});
        }
      })
      .catch(err => {
        console.log('Tdk bisa mengirim. ' + err);
      });
  }


  render() {
    console.log( this.props.route.params.item);
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
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
        {this.state.token == '' ? (
          <View style={styles.viewLoading}>
            <LottieView
              autoPlay
              style={{width: 120}}
              source={require('../../Assets/Logo/10357-chat-typing-indicator.json')}
            />
          </View>
        ) : (
          <View style={{flex: 1}}>
            <ScrollView>
              <View>
                {this.state.data == '' ? (
                  <View>
                    <ActivityIndicator color="red" size={30} />
                  </View>
                ) : (
                  <>
                    {this.state.data.map((value, key) => {
                      return (
                        <View key={key}>
                          {value.from == this.props.route.params.item ? (
                            <View style={styles.getText}>
                              <Text>{value.message}</Text>
                            </View>
                          ) : (
                            <View style={styles.textSend}>
                              <Text>{value.message}</Text>
                            </View>
                          )}
                        </View>
                      );
                    })}
                  </>
                )}
              </View>
            </ScrollView>
            <View style={styles.boxSend}>
              <View style={styles.textMasuk}>
                <TextInput
                  style={{width: '75%'}}
                  placeholder=" Pesan "
                  value={this.state.input}
                  onChangeText={(text) => this.setState({input: text})}
                />
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Icon name="send" size={35} onPress={() => this.chatting()} />
              </View>
            </View>
          </View>
        )}
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
  boxSend: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    elevation: 5,
    backgroundColor: '#82CAFA',
    justifyContent: 'center',
  },
  getText: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    margin: 5,
    alignSelf: 'flex-start',
    maxWidth: '85%',
  },
  textSend: {
    backgroundColor: '#4CC417',
    padding: 5,
    borderRadius: 10,
    marginTop: 5,
    margin: 5,
    alignSelf: 'flex-end',
    maxWidth: '85%',
  },
  textMasuk: {
    width: '85%',
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: 'white',
  },
});

export default ChatScreen;
