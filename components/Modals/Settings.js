/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, TouchableOpacity, Modal, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import {useSelector, useDispatch} from 'react-redux';
import {
  getSettingsVisible,
  setSettingsVisible,
} from '../../redux/slices/settingsSlice';
import {getAccessToken} from '../../redux/slices/authTokenSlice';
import {Icon} from 'react-native-elements';

const Settings = () => {
  const dispatch = useDispatch();
  const settingsVisible = useSelector(getSettingsVisible);
  const accessToken = useSelector(getAccessToken);

  const [over18, setOver18] = useState();
  const [showPresence, setShowPresence] = useState();
  const [emailPrivateMessage, setEmailPrivateMessage] = useState();
  const [enableFollowers, setEnableFollowers] = useState();
  const [sendWelcomeMessages, setSendWelcomeMessages] = useState();
  const [emailCommentReply, setEmailCommentReply] = useState();

  useEffect(() => {
    fetch('https://oauth.reddit.com/api/v1/me/prefs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    }).then(res =>
      res.json().then(data => {
        setOver18(data.over_18);
        setShowPresence(data.show_presence);
        setEmailPrivateMessage(data.email_private_message);
        setEnableFollowers(data.enable_followers);
        setSendWelcomeMessages(data.send_welcome_messages);
        setEmailCommentReply(data.email_comment_reply);
      }),
    );
  }, []);

  const changeSettings = data => {
    fetch('https://oauth.reddit.com/api/v1/me/prefs', {
      method: 'PATCH',
      headers: {
        Authorization: 'bearer ' + accessToken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={false}
        visible={settingsVisible}
        onRequestClose={() => {
          dispatch(setSettingsVisible(false));
        }}>
        <View style={tw`h-full bg-black`}>
          <View style={tw`items-center py-5 bg-zinc-900`}>
            <Text style={tw`text-white text-xl font-semibold`}>Settings</Text>
          </View>
          <View style={tw`flex-row items-center bg-zinc-800 h-10 my-2 px-5`}>
            <Text style={tw`text-white font-black text-xl`}>Over 18?</Text>
            <Switch
              trackColor={{false: '#767577', true: '#f45000'}}
              thumbColor={over18 ? '#f45000' : '#f4f3f4'}
              onValueChange={e => {
                setOver18(e);
              }}
              value={over18}
            />
          </View>
          <View style={tw`flex-row items-center bg-zinc-800 h-10 mb-2 px-5`}>
            <Text style={tw`text-white font-black text-xl`}>
              Show Presence?
            </Text>
            <Switch
              trackColor={{false: '#767577', true: '#f45000'}}
              thumbColor={showPresence ? '#f45000' : '#f4f3f4'}
              onValueChange={e => {
                setShowPresence(e);
              }}
              value={showPresence}
            />
          </View>
          <View style={tw`flex-row items-center bg-zinc-800 h-10 mb-2 px-5`}>
            <Text style={tw`text-white font-black text-xl`}>
              Email Private Message?
            </Text>
            <Switch
              trackColor={{false: '#708090', true: '#f45000'}}
              thumbColor={emailPrivateMessage ? '#f45000' : '#f4f3f4'}
              onValueChange={e => {
                setEmailPrivateMessage(e);
              }}
              value={emailPrivateMessage}
            />
          </View>
          <View style={tw`flex-row items-center bg-zinc-800 h-10 mb-2 px-5`}>
            <Text style={tw`text-white font-black text-xl`}>
              Enable Followers?
            </Text>
            <Switch
              trackColor={{false: '#708090', true: '#f45000'}}
              thumbColor={enableFollowers ? '#f45000' : '#f4f3f4'}
              onValueChange={e => {
                setEnableFollowers(e);
              }}
              value={enableFollowers}
            />
          </View>
          <View style={tw`flex-row items-center bg-zinc-800 h-10 mb-2 px-5`}>
            <Text style={tw`text-white font-black text-xl`}>
              Send Welcome Message?
            </Text>
            <Switch
              trackColor={{false: '#708090', true: '#f45000'}}
              thumbColor={sendWelcomeMessages ? '#f45000' : '#f4f3f4'}
              onValueChange={e => {
                setSendWelcomeMessages(e);
              }}
              value={sendWelcomeMessages}
            />
          </View>
          <View style={tw`flex-row items-center bg-zinc-800 h-10 mb-2 px-5`}>
            <Text style={tw`text-white font-black text-xl`}>
              Email Comment Reply?
            </Text>
            <Switch
              trackColor={{false: '#708090', true: '#f45000'}}
              thumbColor={emailCommentReply ? '#f45000' : '#f4f3f4'}
              onValueChange={e => {
                setEmailCommentReply(e);
              }}
              value={emailCommentReply}
            />
          </View>

          <View style={tw`items-center pt-2`}>
            <TouchableOpacity
              onPress={() => {
                changeSettings({
                  over_18: over18,
                  show_presence: showPresence,
                  email_private_message: emailPrivateMessage,
                  enable_followers: enableFollowers,
                  send_welcome_messages: sendWelcomeMessages,
                  email_comment_reply: emailCommentReply,
                });
                alert('Changes Saved !');
              }}
              style={tw`bg-orange-600 w-40 items-center rounded pb-1`}>
              <Text style={tw`text-white font-black text-2xl`}>
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => dispatch(setSettingsVisible(false))}
            style={tw`absolute left-3 shadow-lg z-50`}>
            <Icon name="keyboard-backspace" color="white" size={40} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Settings;
