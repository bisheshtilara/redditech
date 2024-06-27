import {SafeAreaView, View} from 'react-native';
import tw from 'twrnc';
import React from 'react';
import HomeFeed from './HomeFeed';
import TopBar from './TopBar';
import Filter from './Filter';

const Home = () => {
  return (
    <SafeAreaView>
      <View style={tw`w-98 h-full`}>
        <View style={tw`h-15 bg-zinc-800`}>
          <TopBar />
        </View>
        <View style={tw`h-10 bg-white`}>
          <Filter />
        </View>
        <View style={tw`h-full bg-black`}>
          <HomeFeed />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
