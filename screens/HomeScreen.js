import {SafeAreaView, View} from 'react-native';
import React from 'react';
import Signin from '../components/Signin';
import tw from 'twrnc';
import {useSelector} from 'react-redux';
import {getAccessToken} from '../redux/slices/authTokenSlice';
import Home from '../components/Home';
const HomePage = () => {
  const accessToken = useSelector(getAccessToken);
  return (
    <SafeAreaView>
      <View style={tw`flex h-full justify-center items-center bg-zinc-900`}>
        {!accessToken ? <Signin /> : <Home />}
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
