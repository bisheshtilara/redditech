/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, Modal, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Divider, Icon, Image} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {getProfileVisible} from '../redux/slices/profileSlice';
import {setProfileVisible} from '../redux/slices/profileSlice';
import {getAccessToken, setAuthToken} from '../redux/slices/authTokenSlice';
import {setGlobalUserName} from '../redux/slices/userNameSlice';
import {
  setMyProfileVisible,
  getMyProfileVisible,
} from '../redux/slices/myProfileSlice';
import {setSavedVisible, getSavedVisible} from '../redux/slices/savedSlice';
import {
  setSettingsVisible,
  getSettingsVisible,
} from '../redux/slices/settingsSlice';
import tw from 'twrnc';
import MyProfile from './Modals/MyProfile';
import Saved from './Modals/Saved';
import Settings from './Modals/Settings';

const Profile = () => {
  const dispatch = useDispatch();
  const profileVisible = useSelector(getProfileVisible);
  const accessToken = useSelector(getAccessToken);

  const [userIcon, setUserIcon] = useState();

  useEffect(() => {
    fetch('https://oauth.reddit.com/api/v1/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + accessToken,
      },
    }).then(res =>
      res.json().then(data => {
        setUserIcon(
          data.subreddit.icon_img.split('?')
            ? data.subreddit.icon_img.split('?')[0]
            : data.subreddit.icon_img,
        );
      }),
    );
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={() => dispatch(setProfileVisible(true))}>
        <Image
          style={tw`h-9 w-10 rounded-full`}
          source={{
            uri: userIcon,
          }}
        />
      </TouchableOpacity>
      {profileVisible && <ProfileModal />}
    </View>
  );
};

export default Profile;

const profileData = [
  {name: 'My profile', icon: 'user-circle-o', type: 'font-awesome', index: '0'},
  {name: 'Saved', icon: 'bookmarks', type: 'ionicons', index: '1'},
  {name: 'Settings', icon: 'settings', type: 'feather', index: '2'},
];

const ProfileModal = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(getAccessToken);
  const profileVisible = useSelector(getProfileVisible);
  const myProfileVisible = useSelector(getMyProfileVisible);
  const savedVisible = useSelector(getSavedVisible);
  const settingsVisible = useSelector(getSettingsVisible);

  const [snooIcon, setSnooIcon] = useState();
  const [userName, setUserName] = useState();
  const [karma, setKarma] = useState();
  const [created, setCreated] = useState();
  const [description, setDescription] = useState();
  const [followers, setFollowers] = useState();
  const [premium, setPremium] = useState();
  const [verified, setVerified] = useState();

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(null);
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
        setFollowers(data.subreddit.subscribers);
        setPremium(data.has_subscribed_to_premium);
        setVerified(data.verified);
        dispatch(
          setGlobalUserName(data.subreddit.display_name_prefixed.split('/')[1]),
        );
      }),
    );
  }, []);

  useEffect(() => {
    if (selected === '0') {
      dispatch(setMyProfileVisible(true));
    }
    if (selected === '1') {
      dispatch(setSavedVisible(true));
    }
    if (selected === '2') {
      dispatch(setSettingsVisible(true));
    }
  }, [selected]);
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={false}
        visible={profileVisible}
        onRequestClose={() => {
          dispatch(setProfileVisible(false));
        }}>
        <View style={tw`bg-zinc-800 h-full`}>
          <View style={tw`h-50 items-center justify-center pt-6`}>
            <Image source={{uri: snooIcon}} style={tw`w-30 h-45`} />
          </View>
          <View style={tw`h-10 items-center justify-center`}>
            <Text style={tw`text-white font-bold text-xl`}>{userName}</Text>
          </View>
          <View style={tw`px-2`}>
            <View style={tw`flex-row items-center pl-10`}>
              <Icon
                name="description"
                type="material-icons"
                color="#0096FF"
                size={30}
              />
              <Text style={tw`text-zinc-400 text-lg font-semibold pl-2`}>
                About me
              </Text>
            </View>

            <View style={tw`pl-11`}>
              <Text style={tw`text-white font-semibold text-lg`}>
                {description}
              </Text>
            </View>
          </View>
          <View style={tw`h-20 flex-row justify-between px-10`}>
            <View style={tw`flex-row items-center`}>
              <Icon
                name="star-outlined"
                color="#0096FF"
                type="entypo"
                size={45}
              />
              <View style={tw`pl-4`}>
                <Text style={tw`text-white text-xl font-bold`}>{karma}</Text>
                <Text style={tw`text-zinc-400`}>Karma</Text>
              </View>
            </View>

            <View style={tw`flex-row items-center`}>
              <Icon name="date" color="#0096FF" type="fontisto" size={40} />
              <View style={tw`pl-4`}>
                <Text style={tw`text-white text-xl font-bold`}>
                  {new Date(
                    new Date(Date.now()) - new Date(created * 1000),
                  ).getFullYear() - 1970}
                  y
                </Text>
                <Text style={tw`text-zinc-400`}>Reddit Age</Text>
              </View>
            </View>
          </View>
          <View style={tw`h-20 flex-row justify-between px-10`}>
            <View style={tw`flex-row items-center `}>
              <Icon
                name="birthday-cake"
                color="#0096FF"
                type="font-awesome"
                size={40}
              />
              <View style={tw`pl-4`}>
                <Text style={tw`text-white text-xl font-bold`}>
                  {new Date(created * 1000)
                    .toDateString()
                    .split(' ')
                    .slice(1)
                    .join(' ')}
                </Text>
                <Text style={tw`text-zinc-400`}>Cake Day</Text>
              </View>
            </View>
            <View style={tw`flex-row items-center`}>
              <Icon
                name="follow-the-signs"
                color="#0096FF"
                type="material-icons"
                size={45}
              />
              <View style={tw`pl-4`}>
                <Text style={tw`text-white text-xl font-bold`}>
                  {followers}
                </Text>
                <Text style={tw`text-zinc-400`}>Followers</Text>
              </View>
            </View>
          </View>

          <View style={tw`h-20 flex-row justify-between px-10`}>
            <View style={tw`flex-row items-center `}>
              <Icon
                name="important-devices"
                color="#0096FF"
                type="matierial-icons"
                size={40}
              />
              <View style={tw`pl-4`}>
                <Text style={tw`text-white text-xl font-bold`}>
                  {premium ? 'Yes' : 'No'}
                </Text>
                <Text style={tw`text-zinc-400`}>Reddit Premium</Text>
              </View>
            </View>
            <View style={tw`flex-row items-center pr-3`}>
              <Icon
                name="verified-user"
                color="#0096FF"
                type="material-icons"
                size={45}
              />
              <View style={tw`pl-4`}>
                <Text style={tw`text-white text-xl font-bold`}>
                  {verified ? 'Yes' : 'No'}
                </Text>
                <Text style={tw`text-zinc-400`}>Verified</Text>
              </View>
            </View>
          </View>

          <Divider />
          <View style={tw`flex-row justify-center pt-3`}>
            <FlatList
              data={profileData}
              renderItem={({item: {name, icon, type, index}, item}) => (
                <TouchableOpacity
                  key={index}
                  style={tw`flex-row items-center px-11 mt-3 bg-zinc-800 py-1`}
                  onPress={() => {
                    setSelected(index);
                  }}>
                  <Icon name={icon} type={type} color="#0096FF" size={30} />
                  <Text style={tw`text-white font-semibold pl-3 text-lg`}>
                    {name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <TouchableOpacity
            onPress={() => dispatch(setProfileVisible(false))}
            style={tw`absolute left-3 shadow-lg z-50`}>
            <Icon name="keyboard-backspace" color="white" size={40} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(setProfileVisible(false));
              dispatch(setAuthToken(''));
            }}
            style={tw`absolute bottom-3 right-5 bg-orange-600 w-30 h-10 justify-center items-center rounded-full`}>
            <Text style={tw`text-white font-semibold text-lg`}>Signout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {myProfileVisible && <MyProfile />}
      {savedVisible && <Saved />}
      {settingsVisible && <Settings />}
    </View>
  );
};
