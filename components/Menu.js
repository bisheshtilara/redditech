/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  TouchableOpacity,
  View,
  Modal,
  Text,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {getAccessToken} from '../redux/slices/authTokenSlice';
import tw from 'twrnc';
import Subreddit from './Subreddit';
import {getSubRedditVisible} from '../redux/slices/subRedditSlice';
import {
  setSubRedditVisible,
  setSubRedditName,
} from '../redux/slices/subRedditSlice';

const Menu = () => {
  const accessToken = useSelector(getAccessToken);
  const [childrenData, setChildrenData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [after, setAfter] = useState();

  const subRedditVisible = useSelector(getSubRedditVisible);
  const dispatch = useDispatch();

  useEffect(() => {
    if (after === null) return;
    fetch(
      `https://oauth.reddit.com/subreddits/mine/subscriber?after=${after}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + accessToken,
        },
      },
    ).then(res =>
      res.json().then(data => {
        let tmp = [];
        for (let child of data.data.children) {
          tmp.push({
            display_name_prefixed: child.data.display_name_prefixed,
            subscribers: child.data.subscribers,
            community_icon: child.data.community_icon,
          });
        }
        setChildrenData(childrenData.concat(tmp));
        setAfter(data.data.after);
      }),
    );
  }, [after]);

  return (
    <View>
      <Pressable onPress={() => setModalVisible(!modalVisible)}>
        <Icon name="menu" color="gray" size={35} />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={tw`bg-zinc-800 pt-3`}>
            <Text style={tw`text-white font-black text-xl text-center pb-2`}>
              Your Comminuties
            </Text>
            <TouchableOpacity
              style={tw`absolute top-2 left-1`}
              onPress={() => setModalVisible(!modalVisible)}>
              <Icon name="close" color="white" size={40} />
            </TouchableOpacity>
            <View style={tw`bg-zinc-800`}>
              <FlatList
                data={childrenData}
                renderItem={(
                  {item: {community_icon, display_name_prefixed, subscribers}},
                  index,
                ) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      dispatch(setSubRedditVisible(true));
                      dispatch(
                        setSubRedditName(display_name_prefixed.split('/')[1]),
                      );
                    }}>
                    <View style={tw`flex-row items-center pt-4 pl-2`}>
                      <Image
                        style={{
                          height: 50,
                          width: 50,
                          resizeMode: 'cover',
                          borderRadius: 50,
                        }}
                        source={{
                          uri: community_icon
                            ? community_icon.split('?')[0]
                            : 'https://www.redditinc.com/assets/images/site/reddit-logo.png',
                        }}
                      />
                      <View>
                        <Text style={tw`pl-2 text-white font-black text-lg`}>
                          {display_name_prefixed}
                        </Text>
                        <Text style={tw`text-white pl-2 text-sm`}>
                          Community - {subscribers} members
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </Pressable>
      {subRedditVisible && <Subreddit />}
    </View>
  );
};

export default Menu;
