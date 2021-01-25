import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TextInput,
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
import {TouchableOpacity} from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import Feather from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

class Home extends React.Component {
  state = {
    data: [],
    input: '',
    loading: false,
  };

  componentDidMount() {
    this.home();
  }
  home = () => {
    const url = 'https://defa-store.herokuapp.com/api/home';
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(respon => respon.json())
      .then(resJson => {
        console.log(resJson);
        if (resJson) {
          this.setState({data: resJson, loading: false});
        }
      })
      .catch(error => {
        console.log('error is' + error);
        this.setState({loading: false});
      });
  };

  belanja = () => {
    this.props.navigation.navigate('Detail');
  };
  render() {
    return (
      <View style={styles.container}>
            <ScrollView>
        <View style={styles.header}>
          <Image
            source={require('../../Assets/Images/1.png')}
            style={styles.drawer}
          />
          <View style={styles.screnHeader}>
            <View style={{width: '50%'}}>
              <Text style={styles.textHeader}>Hi FRIEND</Text>
            </View>
            <View style={styles.imageHeader}>
              <Image
                source={require('../../Assets/Images/g.png')}
                style={styles.styleImageHeader}
              />
            </View>
          </View>
        </View>
        <LinearGradient
          colors={['rgba(0,164,109,0.4)', 'transparent']}
          style={{
            left: 0,
            right: 0,
            height: 90,
            marginTop: -45,
          }}>
          <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('Search')}
          style={styles.screnSearch}>
            <Text  style={styles.search}>
          Search
             
              </Text>
            <Image
              source={require('../../Assets/Images/3.png')}
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>
        </LinearGradient>
          <ScrollView
            // contentContainerStyle={{width:340,alignSelf:'center',}}
            style={{flex: 1}}>
            <View
              style={{
                height: 200,
                width: '90%',
                marginTop: 10,
                justifyContent: 'center',
                alignSelf: 'center',
                top: -10,
              }}>
              <Swiper
                autoplay
                horizontal={true}
                height={200}
                activeDotColor="blue">
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                  }}>
                  <Image
                    source={require('../../Assets/Images/baju.jpg')}
                    resizeMode="cover"
                    style={{
                      height: '100%',
                      width: '100%',
                      alignSelf: 'center',
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                  }}>
                  <Image
                    source={require('../../Assets/Images/laptop.jpg')}
                    resizeMode="cover"
                    style={{
                      height: '100%',
                      width: '100%',
                      alignSelf: 'center',
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                  }}>
                  <Image
                    source={require('../../Assets/Images/makanan.jpg')}
                    resizeMode="cover"
                    style={{
                      height: '100%',
                      width: '100%',
                      alignSelf: 'center',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </Swiper>
            </View>
          </ScrollView>
          {/* <View style={styles.rekomendasi}>
            <View style={{width: '50%'}}>
              <Text style={styles.textrecomendasi}>Recommended</Text>
              <View style={styles.gayarekomendasi} />
            </View> */}
            {/* <View style={{width: '50%', alignItems: 'flex-end'}}>
            <View
              style={{
                backgroundColor: '#00a46c',
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 13,
                  color: '#FFF',
                }}>
                More
              </Text>
            </View>
          </View> */}
          {/* </View> */}

          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrolviewRecomendasi}>
            {/* <TouchableOpacity
              onPress={() => this.belanja()}
              style={styles.kotakRecomendasi}>
              <Image source={require('../../Assets/Images/4.png')} />
              <View style={styles.merekHarga}>
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>
                  SAMANTHA
                </Text>
                <Text style={styles.gayaHarga}>$40</Text>
              </View>
              <Text style={styles.footerRecomendasi}>RUSSIA</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.belanja()}
              style={styles.kotakRecomendasi}>
              <Image source={require('../../Assets/Images/4.png')} />
              <View style={styles.merekHarga}>
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>
                  SAMANTHA
                </Text>
                <Text style={styles.gayaHarga}>$40</Text>
              </View>
              <Text style={styles.footerRecomendasi}>RUSSIA</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.belanja()}
              style={styles.kotakRecomendasi}>
              <Image
                source={require('../../Assets/Images/5.png')}
                // style={{width:'100%',height:190,resizeMode:'cover',}}
              />
              <View style={styles.merekHarga}>
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>
                  SAMANTHA
                </Text>
                <Text style={styles.gayaHarga}>$40</Text>
              </View>
              <Text style={styles.footerRecomendasi}>RUSSIA</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.belanja()}
              style={styles.kotakRecomendasi}>
              <Image
                source={require('../../Assets/Images/5.png')}
                // style={{width:'100%',height:190,resizeMode:'cover',}}
              />
              <View style={styles.merekHarga}>
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>
                  SAMANTHA
                </Text>
                <Text style={styles.gayaHarga}>$40</Text>
              </View>
              <Text style={styles.footerRecomendasi}>RUSSIA</Text>
            </TouchableOpacity> */}
          </ScrollView>
          {this.state.loading ? (
            <View style={styles.viewLoading}>
            <LottieView
              autoPlay
              style={{width: 120,height:120}}
              source={require('../../Assets/Logo/890-loading-animation.json')}
            />
          </View>
          ) : (
            <View>
              <View style={styles.rekomendasi}>
                <View style={{width: '50%'}}>
                  <Text style={styles.textrecomendasi}>Recommended</Text>
                  <View style={styles.gayarekomendasi} />
                </View>
              </View>
              <View
                style={{
                  flexGrow: 1,
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  backgroundColor: '#fafafae3',
                  //  alignItems:'center',
                  justifyContent: 'center',
                }}>
                {this.state.data.map((val, key) => {
                  return (
                    <View key={key} >
                      <TouchableOpacity
                        style={{
                          height: 250,
                          elevation: 2,
                          backgroundColor: '#FFF',
                          marginHorizontal: 5,
                          marginTop: 20,
                          width: 160,
                        }}
                        onPress={() =>
                          this.props.navigation.navigate('Detail', {item: val})
                        }>
                        <View>
                          <Image
                            source={{uri: val.image}}
                            style={{
                              width: '100%',
                              height: 150,
                              resizeMode: 'cover',
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
                              paddingTop:10
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
      </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#424242cc',
    flex: 1,
  },
  header: {
    backgroundColor: 'blue',
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
  },
  drawer: {
    height: 10,
    width: 20,
    marginTop: 25,
  },
  screnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    width: '100%',
  },
  textHeader: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: 'bold',
  },
  imageHeader: {
    width: '50%',
    alignItems: 'flex-end',
  },
  styleImageHeader: {
    height: 60,
    width: 60,
  },
  screnSearch: {
    backgroundColor: '#FFF',
    // paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  search: {
    fontWeight: 'bold',
    fontSize: 18,
    width: 260,
  },
  rekomendasi: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#404040',
  },
  textrecomendasi: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#ecedf3a1',
  },
  gayarekomendasi: {
    height: 4,
    backgroundColor: '#b1e5d3',
    width: 115,
    marginTop: 2,
  },
  scrolviewRecomendasi: {
    flexGrow: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#fafafae3',
    //  alignItems:'center',
    justifyContent: 'center',
  },
  kotakRecomendasi: {
    height: 250,
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 5,
    marginTop: 20,
    borderRadius: 15,
    marginBottom: 10,
    width: 160,
  },
  merekHarga: {
    flexDirection: 'column',
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  gayaHarga: {
    fontWeight: 'bold',
    color: '#00a46c',
    fontSize:20,
  },
  footerRecomendasi: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: '#b1e5d3',
    paddingTop: 3,
  },
  viewLoading: {
    backgroundColor: '#FFF',

    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'center',
    width: '95%',
    elevation: 2,
    marginVertical: 10,
   
  },
});
