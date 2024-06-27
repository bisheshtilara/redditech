/* eslint-disable react-hooks/exhaustive-deps */
import {Text, View, Modal, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import {useDispatch, useSelector} from 'react-redux';
import {getSavedVisible} from '../../redux/slices/savedSlice';
import {setSavedVisible} from '../../redux/slices/savedSlice';
import {Icon} from 'react-native-elements';
import {getUserName} from '../../redux/slices/userNameSlice';
import {getAccessToken} from '../../redux/slices/authTokenSlice';
import Feed from '../Psuedo/Feed';
const Saved = () => {
  const dispatch = useDispatch();
  const savedVisible = useSelector(getSavedVisible);
  const userName = useSelector(getUserName);
  const accessToken = useSelector(getAccessToken);
  const [feed, setFeed] = useState();
  const [liked, setLiked] = useState(0);
  const [clickSave, setClickSave] = useState(0);

  useEffect(() => {
    fetch(`https://oauth.reddit.com/user/${userName}/saved`, {
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
  }, [liked]);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={false}
        visible={savedVisible}
        onRequestClose={() => {
          dispatch(setSavedVisible(false));
        }}>
        <View style={tw`h-full bg-black`}>
          <View style={tw`items-center py-5 bg-zinc-900`}>
            <Text style={tw`text-white text-xl font-semibold`}>Saved</Text>
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
              <Feed
                index={index}
                subreddit_name_prefixed={subreddit_name_prefixed}
                author={author}
                created={created}
                title={title}
                ups={ups}
                thumbnail={thumbnail}
                thumbnail_height={thumbnail_height}
                likes={likes}
                name={name}
                liked={liked}
                setLiked={setLiked}
                accessToken={accessToken}
                num_comments={num_comments}
                clickSave={clickSave}
                setClickSave={setClickSave}
                saved={saved}
              />
            )}
          />
          <TouchableOpacity
            onPress={() => dispatch(setSavedVisible(false))}
            style={tw`absolute left-3 shadow-lg z-50`}>
            <Icon name="keyboard-backspace" color="white" size={40} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Saved;
