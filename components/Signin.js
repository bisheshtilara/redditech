import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {authorize} from 'react-native-app-auth';
import {useDispatch} from 'react-redux';
import {setAuthToken} from '../redux/slices/authTokenSlice';

const config = {
  redirectUrl: 'com.redditech://oauth2redirect/reddit',
  clientId: 'X0cZAVduQbT2UHJtnGhtmA',
  clientSecret: '',
  scopes: [
    'identity',
    'mysubreddits',
    'read',
    'history',
    'account',
    'subscribe',
    'vote',
    'save',
  ],
  serviceConfiguration: {
    authorizationEndpoint:
      'https://www.reddit.com/api/v1/authorize.compact?duration=permanent',
    tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
  },
  customHeaders: {
    token: {
      Authorization: 'Basic WDBjWkFWZHVRYlQyVUhKdG5HaHRtQQ==',
    },
  },
};
const Signin = () => {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const authState = await authorize(config);
    dispatch(setAuthToken(authState.accessToken));
  };

  return (
    <SafeAreaView>
      <View style={tw`flex h-full justify-center items-center`}>
        <View style={tw`pb-5`}>
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              height: 100,
              width: 100,
              resizeMode: 'cover',
            }}
            source={{
              uri: 'https://www.redditinc.com/assets/images/site/reddit-logo.png',
            }}
          />
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          style={tw`bg-orange-600 w-50 h-10 justify-center items-center rounded-full`}>
          <Text style={tw`text-white font-semibold text-lg`}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Signin;
