/* {feed &&
        feed.map((data, index) => (
          <View key={index} style={tw`bg-zinc-800 mt-2`}>
            <View style={tw`flex-row items-center pt-3`}>
              <Image
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'cover',
                }}
                source={{
                  uri: 'https://www.redditinc.com/assets/images/site/reddit-logo.png',
                }}
              />
              <View>
                <Text style={tw`text-zinc-400 font-extrabold pl-2`}>
                  {data.data.subreddit_name_prefixed}
                </Text>
                <View style={tw`flex-row`}>
                  <Text style={tw`text-zinc-400 pl-2`}>
                    u/{data.data.author}
                  </Text>
                  <View style={tw`flex-row items-center`}>
                    <Icon
                      style={tw`font-semibold pl-5`}
                      name="clockcircle"
                      color="gray"
                      type="antdesign"
                      size={11}
                    />
                    <Text style={tw`text-white text-zinc-400 pl-2`}>
                      {new Date(data.data.created * 1000).getHours()}h
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text style={tw`text-white text-lg font-semibold pt-2`}>
                {data.data.title}
              </Text>
              <View style={tw`pt-4`}>
                <View style={tw`flex-row items-center`}>
                  <Icon
                    style={tw`font-semibold`}
                    name="arrow-up-bold-outline"
                    color="gray"
                    type="material-community"
                  />
                  <Text style={tw`text-zinc-400`}>{data.data.ups}</Text>
                </View>
              </View>
            </View>
          </View>
        ))} */
