/* eslint-disable react-hooks/exhaustive-deps */
import {SafeAreaView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getFilterOption} from '../redux/slices/fliterOptionSlice';
import {getAccessToken} from '../redux/slices/authTokenSlice';
import Feed from './Psuedo/Feed';

const HomeFeed = () => {
  const [feed, setFeed] = useState();
  const accessToken = useSelector(getAccessToken);
  const [limit, setLimit] = useState(20);
  const filterOption = useSelector(getFilterOption);
  const [liked, setLiked] = useState(0);
  const [clickSave, setClickSave] = useState(0);

  const fetchMorePost = () => {
    fetch(`https://oauth.reddit.com/${filterOption}.json?limit=${limit}`, {
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
    setLimit(limit + 10);
  };

  useEffect(() => {
    fetch(`https://oauth.reddit.com/${filterOption}.json`, {
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
    <SafeAreaView>
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
            thumbnail_height={thumbnail_height}
            thumbnail={thumbnail}
            name={name}
            accessToken={accessToken}
            likes={likes}
            liked={liked}
            setLiked={setLiked}
            num_comments={num_comments}
            clickSave={clickSave}
            setClickSave={setClickSave}
            saved={saved}
          />
        )}
        onEndReached={fetchMorePost}
      />
    </SafeAreaView>
  );
};

export default HomeFeed;
