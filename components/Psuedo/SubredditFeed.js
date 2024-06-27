import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {Icon} from 'react-native-elements';
const SubredditFeed = ({
  index,
  author,
  created,
  title,
  thumbnail,
  thumbnail_height,
  ups,
  name,
  likes,
  accessToken,
  liked,
  setLiked,
  num_comments,
  saved,
  clickSave,
  setClickSave,
}) => {
  const upvote = () => {
    fetch(
      `https://oauth.reddit.com/api/vote?id=${name}&dir=${
        likes === null ? 1 : 0
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + accessToken,
        },
      },
    );
    setLiked(liked + 1);
  };
  const downvote = () => {
    fetch(
      `https://oauth.reddit.com/api/vote?id=${name}&dir=${
        likes === null ? -1 : 0
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + accessToken,
        },
      },
    );
    setLiked(liked + 1);
  };
  const savePost = () => {
    fetch(
      `https://oauth.reddit.com/api/${saved ? 'unsave' : 'save'}?id=${name}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + accessToken,
        },
      },
    );
    setClickSave(clickSave + 1);
  };

  return (
    <View key={index} style={tw`bg-zinc-800 mt-2`}>
      <View style={tw`flex-row items-center pt-3 pl-2 justify-between`}>
        <View>
          <View style={tw`flex-row`}>
            <Text style={tw`text-zinc-400 pl-2`}>u/{author}</Text>
            <View style={tw`flex-row items-center`}>
              <Icon
                style={tw`font-semibold pl-5`}
                name="clockcircle"
                color="gray"
                type="antdesign"
                size={11}
              />
              <Text style={tw`text-white text-zinc-400 pl-1`}>
                {new Date(created * 1000).getHours()}h
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={tw`pr-4`} onPress={savePost}>
          <Icon
            name={saved ? 'bookmark' : 'bookmark-o'}
            type="font-awesome"
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={tw`text-white text-lg font-semibold pt-2 pl-4`}>
          {title}
        </Text>
        {thumbnail_height && thumbnail !== 'default' ? (
          <View style={tw`pt-3 pl-2`}>
            <Image
              style={tw`h-50 w-94`}
              resizeMode="contain"
              source={{uri: thumbnail}}
            />
          </View>
        ) : null}

        <View style={tw`pt-4 pl-4`}>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity onPress={upvote}>
              <Icon
                style={tw`font-semibold`}
                name="arrow-up-bold-outline"
                color={likes && likes !== null ? '#ff4500' : 'gray'}
                type="material-community"
              />
            </TouchableOpacity>
            <Text style={tw`text-zinc-400`}>
              {ups > 999 ? (ups / 1000).toFixed(1) + 'K' : ups}
            </Text>
            <TouchableOpacity onPress={downvote}>
              <Icon
                style={tw`font-semibold`}
                name="arrow-down-bold-outline"
                color={!likes && likes !== null ? '#0096FF' : 'gray'}
                type="material-community"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-row items-center justify-center pl-20`}>
              <Icon name="comments" color="gray" type="foundation" />
              <Text style={tw`text-zinc-400 pl-1`}>
                {num_comments > 999
                  ? (num_comments / 1000).toFixed(1) + 'K'
                  : num_comments}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SubredditFeed;
