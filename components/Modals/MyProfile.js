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
import {useDispatch, useSelector} from 'react-redux';
import {setMyProfileVisible} from '../../redux/slices/myProfileSlice';
import {getMyProfileVisible} from '../../redux/slices/myProfileSlice';
import {getAccessToken} from '../../redux/slices/authTokenSlice';
import {getFilterOption} from '../../redux/slices/fliterOptionSlice';
import Filter from '../Filter';
import Feed from '../Psuedo/Feed';

const MyProfile = () => {
  const dispatch = useDispatch();
  const myProfileVisible = useSelector(getMyProfileVisible);
  const accessToken = useSelector(getAccessToken);
  const filterOption = useSelector(getFilterOption);

  const [snooIcon, setSnooIcon] = useState();
  const [userName, setUserName] = useState();
  const [karma, setKarma] = useState();
  const [created, setCreated] = useState();
  const [description, setDescription] = useState();
  const [bannerImg, setBannerImg] = useState(
    'https://cdn.pixabay.com/photo/2017/01/18/21/49/singapore-1990959_1280.jpg',
  );
  const [followers, setFollowers] = useState();

  const [feed, setFeed] = useState();
  const [liked, setLiked] = useState(0);
  const [clickSave, setClickSave] = useState(0);

  useEffect(() => {
    fetch('https://oauth.reddit.com/api/v1/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + accessToken,
      },
    }).then(res =>
      res.json().then(data => {
        setSnooIcon(data.snoovatar_img && data.snoovatar_img);
        setUserName(data.subreddit.display_name_prefixed);
        setKarma(data.total_karma);
        setCreated(data.created);
        setDescription(data.subreddit.public_description);
        data.subreddit.banner_img && setBannerImg(data.subreddit.banner_img);
        setFollowers(data.subreddit.subscribers);
      }),
    );
  }, []);

  useEffect(() => {
    if (!userName) {
      return;
    }
    fetch(
      `https://oauth.reddit.com/user/${
        userName.split('/')[1]
      }/submitted/${filterOption}`,
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
  }, [userName, filterOption, clickSave, liked]);
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={false}
        visible={myProfileVisible}
        onRequestClose={() => {
          dispatch(setMyProfileVisible(false));
        }}>
        <View style={tw`h-full bg-black`}>
          <View style={tw`h-40 bg-black`}>
            <Image
              style={tw`w-full h-full`}
              resizeMode="cover"
              source={{uri: bannerImg}}
            />
            <Image
              source={{uri: snooIcon}}
              style={tw`h-35 w-35 absolute bottom-0`}
              resizeMode="contain"
            />
          </View>
          <View style={tw`bg-black px-3 py-2`}>
            <Text style={tw`text-white font-black text-xl`}>{userName}</Text>
            <Text style={tw`text-white`}>{followers} followers</Text>
            <Text style={tw`text-white`}>
              {userName} - {karma} karma -{' '}
              {new Date(
                new Date(Date.now()) - new Date(created * 1000),
              ).getFullYear() - 1970}
              y -{' '}
              {new Date(created * 1000)
                .toDateString()
                .split(' ')
                .slice(1)
                .join(' ')}
            </Text>
            <Text style={tw`text-white`}>{description}</Text>
          </View>
          <View style={tw`h-10 bg-white items-center justify-center`}>
            <Filter />
          </View>
          <FlatList
            data={feed}
            vertical
            renderItem={(
              {
                item: {
                  data: {
                    subreddit_name_prefixed,
                    author,
                    // eslint-disable-next-line no-shadow
                    created,
                    title,
                    ups,
                    thumbnail_height,
                    thumbnail,
                    likes,
                    saved,
                    num_comments,
                  },
                },
              },
              index,
            ) => (
              <Feed
                index={index}
                subreddit_name_prefixed={subreddit_name_prefixed}
                author={author}
                created={created}
                title={title}
                ups={ups}
                thumbnail_height={thumbnail_height}
                thumbnail={thumbnail}
                likes={likes}
                liked={liked}
                setLiked={setLiked}
                clickSave={clickSave}
                setClickSave={setClickSave}
                saved={saved}
                num_comments={num_comments}
              />
            )}
          />
          <TouchableOpacity
            onPress={() => dispatch(setMyProfileVisible(false))}
            style={tw`absolute left-3 shadow-lg z-50`}>
            <Icon name="keyboard-backspace" color="white" size={40} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default MyProfile;
