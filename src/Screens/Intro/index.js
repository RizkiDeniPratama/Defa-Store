import React from 'react';
import LottieView from 'lottie-react-native';
import Onboarding from 'react-native-onboarding-swiper';

class Intro extends React.Component {
  render() {
    return (
      <Onboarding
        onDone={() => this.props.navigation.replace('TabNavigation')}
        onSkip={() => this.props.navigation.replace('TabNavigation')}
        pages={[
          {
            backgroundColor: '#ffff',
            image: (
              <LottieView
                style={{
                  width: 300,
                  height: 330,
                }}
                source={require('../../Assets/Logo/30826-online-shopping.json')}
                autoPlay={true}
              />
            ),
            title: 'Selamat datang di toko kami',
            subtitle: 'kepuasan anda adalah kebahagian kami',
          },
          {
            backgroundColor: '#ffff',
            image: (
              <LottieView
                style={{
                  width: 350,
                  height: 350,
                }}
                source={require('../../Assets/Logo/39070-scan-products.json')}
                autoPlay={true}
              />
            ),
            title: 'Barang kami',
            subtitle: 'Kami akan menyediakan barang yang sesuai keiginan anda',
          },
          {
            backgroundColor: '#fff',
            image: (
              <LottieView
                style={{
                  width: 350,
                  height: 350,
                }}
                source={require('../../Assets/Logo/21227-delivery-boy-bumpy-ride.json')}
                autoPlay={true}
              />
            ),
            title: 'Pengiriman',
            subtitle: 'Jasa courier kami insya Allah aman',
          },
        ]}
      />
    );
  }
}
export default Intro;



// import React from 'react'
// import LottieView from 'lottie-react-native'
// import OnBoarding from 'react-native-onboarding-swiper'
// import {View, Text, Image} from 'react-native'
// class Intro extends React.Component {
//     render(){
//         return (
// <OnBoarding 
// pages={[
//     {
//       backgroundColor: '#fff',
//       image: <Image source={require('../../Assets/Images/laptop.jpg')} />,
//       title: 'Onboarding',
//       subtitle: 'Done with React Native Onboarding Swiper',
//     },
//   ]}

// />
//         )
//     }
// }
// export default Intro