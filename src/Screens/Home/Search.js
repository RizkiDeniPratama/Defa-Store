import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator,
  ToastAndroid,
  StyleSheet
} from 'react-native';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      text: '',
      isLoading: false,
      isError: false,
    };
  }

//   search = async () => {
//     this.setState({isLoading: true});
//     try {
//       const response = await Axios.get(
//         `https://mini-project-c.herokuapp.com/api/cari/${this.state.text}`,
//       );

//       if (response) {
//         this.setState({
//           isLoading: false,
//           data: response.data.data,
//         });
//       }
//     } catch (error) {
//       this.setState({isLoading: false});
//       ToastAndroid.show('not found', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
//     }
//   };
search = () => {
    console.log('sedang mengambil search');
    this.setState({isLoading:true})
    const url = 'https://defa-store.herokuapp.com/api/product/search';
    fetch(url, {
      method: 'POST',
      headers: {
        // Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(respon => respon.json())
      .then(resJson => {
        this.setState({data: resJson.data.data,isLoading:false});
        console.log('ini data search', this.state.data);
      })
      .catch(error => {
        console.log('error is' + error);
      });
  };

  render() {
    return (
  
        <View style={styles.container}>
          <View style={styles.containerSearch}>
            <TextInput
              value={this.state.text}
              style={styles.textInputSearch}
              placeholder="Search"
              autoFocus
              placeholderTextColor="grey"
              onSubmitEditing={() => this.search()}
              onChangeText={(data) => this.setState({text: data})}
            />
            <View style={styles.justify}>
              <TouchableOpacity onPress={() => this.search()}>
                <Image
                  source={require('../../Assets/Logo/magnifier.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
              {this.state.isLoading && <ActivityIndicator size="large" color="red" />}
            <FlatList
              numColumns={2}
              data={this.state.data}
              renderItem={({item}) => (
                <View style={styles.viewList}>
                  <View style={styles.viewList1}>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        this.props.navigation.navigate('Detail', {
                          item: item,
                        })
                      }>
                      <View>
                        <Image
                          source={{uri: `${item.image}`}}
                          style={styles.ImageSearch}
                        />
                        <Text style={styles.textItemName}> {item.name}</Text>
                        <Text style={styles.textItemPrice}>
                          {' '}
                          Rp {item.harga}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              )}
              keyExtractor={({id}, index) => index}
            />
          </View>
        </View>
   
    );
  }
}

const styles = StyleSheet.create ({
    // isLoading: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     flex: 1,
    //     backgroundColor: 'red',
    //   },
      awal: {
        flex: 1,
        backgroundColor: 'blue',
      },
      container: {
        flex: 1,
        padding: 15,
      },
      containerSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      textInputSearch: {
        width: '90%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 4,
      },
      justify: {
        justifyContent: 'center',
      },
      icon: {
        height: 23,
        width: 23,
        tintColor: 'white',
      },
      viewList: {
        flexBasis: '50%',
        width: 100,
        paddingTop:10
      },
      viewList1: {
        borderWidth: 0.1,
        borderColor: 'grey',
        borderRadius: 3,
        marginLeft: 3,
        alignItems: 'center',
        backgroundColor: '#100f0f',
        
      },
      ImageSearch: {
        marginTop: 20,
        width: 150,
        height: 200,
        borderRadius: 3,
        resizeMode: 'cover',
        alignSelf: 'center',
      },
      textItemName: {
        fontSize: 15,
        color: 'white',
        marginTop: 10,
      },
      textItemPrice: {
        fontWeight: 'bold',
        fontSize: 12,
        color: 'grey',
      },
})