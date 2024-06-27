/* eslint-disable react-native/no-inline-styles */
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  Text,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import {useSelector, useDispatch} from 'react-redux';
import {getAccessToken} from '../redux/slices/authTokenSlice';
import {Icon} from 'react-native-elements';
import Menu from './Menu';
import Profile from './Profile';
import Subreddit from './Subreddit';
import {getSubRedditVisible} from '../redux/slices/subRedditSlice';
import {
  setSubRedditVisible,
  setSubRedditName,
} from '../redux/slices/subRedditSlice';

const TopBar = () => {
  const accessToken = useSelector(getAccessToken);
  const [search, setSearch] = useState('');
  const [apiData, setApiData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const subRedditVisible = useSelector(getSubRedditVisible);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(
      `https://oauth.reddit.com/api/subreddit_autocomplete?query=${search}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + accessToken,
        },
      },
    ).then(res => res.json().then(data => setApiData(data.subreddits)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <View style={tw`items-center pt-3 flex-row justify-between px-3`}>
      <Menu />
      <Pressable onPress={() => setModalVisible(!modalVisible)}>
        <View
          style={tw`flex-row items-center bg-zinc-700 mr-1 rounded-md`}
          pointerEvents="none">
          <Icon name="search" color="gray" />
          <TextInput
            placeholder="Search..."
            onChangeText={value => setSearch(value)}
            value={search}
            style={tw` h-8 w-60 text-white py-1`}
            placeholderTextColor="white"
          />
        </View>
        <View>
          <Modal
            animationType="fade"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={tw`h-full bg-zinc-800`}>
              <View style={tw`pt-2 pb-2 flex-row items-center`}>
                <View
                  style={tw`flex-row items-center bg-zinc-700 mr-1 rounded-md`}>
                  <Icon name="search" color="gray" />
                  <TextInput
                    placeholder="Search..."
                    onChangeText={value => setSearch(value)}
                    value={search}
                    style={tw` h-8 w-79 text-white py-1`}
                    placeholderTextColor="white"
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setSearch('');
                  }}>
                  <Text style={tw`text-zinc-300`}>Cancel</Text>
                </TouchableOpacity>
              </View>
              <View style={tw`w-full h-full`}>
                <FlatList
                  data={apiData}
                  renderItem={(
                    {item: {name, communityIcon, numSubscribers}, item},
                    index,
                  ) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        dispatch(setSubRedditVisible(true));
                        dispatch(setSubRedditName(name));
                      }}>
                      <View style={tw`flex-row items-center pt-4 pl-1`}>
                        <Image
                          style={{
                            height: 50,
                            width: 50,
                            resizeMode: 'cover',
                            borderRadius: 50,
                          }}
                          source={{
                            uri: communityIcon
                              ? communityIcon
                              : 'https://www.redditinc.com/assets/images/site/reddit-logo.png',
                          }}
                        />
                        <View>
                          <Text style={tw`pl-2 text-white font-black text-lg`}>
                            r/{name}
                          </Text>
                          <Text style={tw`text-white pl-2 text-sm`}>
                            Community - {numSubscribers} members
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </Modal>
        </View>
      </Pressable>
      <Profile />
      {subRedditVisible && <Subreddit />}
    </View>
  );
};

export default TopBar;
