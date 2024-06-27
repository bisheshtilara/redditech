/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-elements';
import tw from 'twrnc';
import {useSelector, useDispatch} from 'react-redux';
import {
  getSubRedditVisible,
  getSubRedditName,
} from '../redux/slices/subRedditSlice';
import {setSubRedditVisible} from '../redux/slices/subRedditSlice';
import {getAccessToken} from '../redux/slices/authTokenSlice';
import Filter from './Filter';
import {getFilterOption} from '../redux/slices/fliterOptionSlice';
import SubredditFeed from './Psuedo/SubredditFeed';

const Subreddit = () => {
  const subRedditVisible = useSelector(getSubRedditVisible);
  const subRedditName = useSelector(getSubRedditName);
  const accessToken = useSelector(getAccessToken);
  const dispatch = useDispatch();
  const filterOption = useSelector(getFilterOption);

  const [feed, setFeed] = useState();
  const [limit, setLimit] = useState(20);

  const [name, setName] = useState();
  const [coverImgURI, setCoverImgURI] = useState();
  const [logoURI, setLogoURI] = useState();
  const [members, setMembers] = useState();
  const [online, setOnline] = useState();
  const [subscribed, setSubscribed] = useState();
  const [description, setDescription] = useState();

  const [liked, setLiked] = useState(0);
  const [clickSave, setClickSave] = useState(0);

  useEffect(() => {
    fetch(`https://oauth.reddit.com/r/${subRedditName}/about.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + accessToken,
      },
    }).then(res =>
      res.json().then(data => {
        setName(data.data.display_name_prefixed);
        data.data.banner_background_image
          ? setCoverImgURI(data.data.banner_background_image.split('?')[0])
          : null;
        data.data.community_icon
          ? setLogoURI(data.data.community_icon.split('?')[0])
          : null;
        setMembers(data.data.subscribers);
        setOnline(data.data.active_user_count);
        setSubscribed(data.data.user_is_subscriber);
        setDescription(data.data.public_description);
      }),
    );
  }, [subscribed]);
  const fetchMorePost = () => {
    fetch(
      `https://oauth.reddit.com/r/${subRedditName}/${filterOption}.json?limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + accessToken,
        },
      },
    ).then(res =>
      res.json().then(data => {
        setFeed(data.data.children);
      }),
    );
    setLimit(limit + 10);
  };
  const joinSubreddit = () => {
    fetch(
      `https://oauth.reddit.com/api/subscribe?action=${
        subscribed ? 'unsub' : 'sub'
      }&sr_name=${subRedditName}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + accessToken,
        },
      },
    );
    setSubscribed(!subscribed);
  };

  useEffect(() => {
    fetch(`https://oauth.reddit.com/r/${subRedditName}/${filterOption}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + accessToken,
      },
    }).then(res =>
      res.json().then(data => {
        setFeed(data.data.children);
      }),
    );
  }, [filterOption, liked, clickSave]);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={false}
        visible={subRedditVisible}
        onRequestClose={() => {
          dispatch(setSubRedditVisible(false));
        }}>
        <View style={tw`bg-zinc-800 h-full`}>
          <View style={tw`h-30 bg-zinc-800`}>
            <Image
              style={tw`w-full h-full`}
              resizeMode="cover"
              source={{uri: coverImgURI}}
            />
          </View>
          <View
            style={tw`h-8 bg-zinc-800 pl-4 flex-row justify-between items-center`}>
            <Text style={tw`text-white font-bold text-xl`}>{name}</Text>
            <View style={tw`pr-4 pt-1`}>
              <TouchableOpacity onPress={joinSubreddit}>
                <Text
                  style={tw`text-gray-400 font-semibold text-sm border border-gray-400 rounded-xl px-2`}>
                  {subscribed ? 'Joined' : 'Join'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`h-8`}>
            <Text style={tw`text-gray-400 pl-4 text-xs`}>
              {members} members - {online} online
            </Text>
          </View>
          <View style={tw`h-auto justify-center w-94.5 pb-4`}>
            <Text style={tw`text-white text-sm pl-4`}>{description}</Text>
          </View>
          <View style={tw`h-10 bg-white items-center justify-center`}>
            <Filter />
          </View>
          <View style={tw`h-full bg-black items-center justify-center`}>
            <FlatList
              data={feed}
              vertical
              renderItem={(
                {
                  item: {
                    data: {
                      author,
                      created,
                      title,
                      ups,
                      thumbnail_height,
                      thumbnail,
                      name,
                      likes,
                      num_comments,
                      saved,
                    },
                  },
                },
                index,
              ) => (
                <SubredditFeed
                  index={index}
                  author={author}
                  created={created}
                  title={title}
                  ups={ups}
                  thumbnail_height={thumbnail_height}
                  thumbnail={thumbnail}
                  name={name}
                  likes={likes}
                  accessToken={accessToken}
                  liked={liked}
                  setLiked={setLiked}
                  num_comments={num_comments}
                  saved={saved}
                  clickSave={clickSave}
                  setClickSave={setClickSave}
                />
              )}
              onEndReached={fetchMorePost}
            />
          </View>
          <TouchableOpacity
            onPress={() => dispatch(setSubRedditVisible(false))}
            style={tw`absolute left-3 shadow-lg z-50`}>
            <Icon name="keyboard-backspace" color="white" size={40} />
          </TouchableOpacity>
          <Image
            style={tw`w-15 h-15 absolute left-3 top-16 rounded-full`}
            resizeMode="contain"
            source={{uri: logoURI}}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Subreddit;
