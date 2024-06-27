import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import React from 'react';
import {Icon} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {getFilterOption} from '../redux/slices/fliterOptionSlice';
import {setFilterOption} from '../redux/slices/fliterOptionSlice';

const filters = [
  {
    id: '1',
    name: 'Hot',
    icon: 'fire-alt',
    iconFrom: 'font-awesome-5',
    value: 'hot',
  },
  {
    id: '2',
    name: 'Best',
    icon: 'rocket',
    iconFrom: 'font-awesome',
    value: 'best',
  },
  {
    id: '3',
    name: 'Top',
    icon: 'totop',
    iconFrom: 'antdesign',
    value: 'top',
  },
  {
    id: '4',
    name: 'New',
    icon: 'new',
    iconFrom: 'entypo',
    value: 'new',
  },
];
const Filter = () => {
  const filterOption = useSelector(getFilterOption);
  const dispatch = useDispatch();

  return (
    <View style={tw`items-center pt-1 pl-6 h-full`}>
      <FlatList
        horizontal
        data={filters}
        keyExtractor={item => item.id}
        renderItem={({item: {name, icon, value, iconFrom}, item}) => (
          <TouchableOpacity onPress={() => dispatch(setFilterOption(value))}>
            <View style={tw`flex-row pr-6 items-center `}>
              <Text
                style={tw`text-zinc-600 text-xl font-medium pr-2 ${
                  value === filterOption && 'text-orange-600'
                }`}>
                {name}
              </Text>
              <Icon
                name={icon}
                color={value === filterOption ? '#ff4500' : '#404040'}
                type={iconFrom}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Filter;
