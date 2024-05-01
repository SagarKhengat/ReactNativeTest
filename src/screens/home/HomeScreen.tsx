import React, { useMemo } from "react";
import { View, FlatList, Image, Text, ActivityIndicator } from 'react-native';

import { useTheme } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";

/**
 * ? Local Imports
 */
import createStyles from "./HomeScreen.style";
import MockData from "./mock/MockData";
import CardItem from "./components/card-item/CardItem";
/**
 * ? Shared Imports
 */

import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersData } from '../../services/redux/user/UserActions';
import { RootState } from '../../services/redux/Store';


interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state);



  React.useEffect(() => {
    dispatch(fetchUsersData(1, 10));
  }, [dispatch]);

  const handleItemPress = () => {
   
  };

  const handleLoadMore = () => {
    const nextPage = Math.ceil(users.length / 10) + 1;
    dispatch(fetchUsersData(nextPage, 10));
  };

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */



  const renderUserItem = ({ item }: { item: any }) => (
    <View>
      <Text>{item.name.first} {item.name.last}</Text>
      <Text>{item.email}</Text>
      {/* Add other details here */}
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View></View>
      <Image
        resizeMode="cover"
        source={ require('../../assets/logo.png') }
        style={styles.profilePicImageStyle}
      />
       <View></View>
    </View>
  );

  const renderList = () => (
    <View>
         {loading ? (
           <ActivityIndicator size="large" />
         ) : error ? (
           <Text>{error}</Text>
         ) : (
           <FlatList
             data={users}
             renderItem={({ item }) => (
              <CardItem data={item} onPress={handleItemPress} />
            )}
             keyExtractor={(item) => item.login.uuid}
             onEndReached={handleLoadMore}
             onEndReachedThreshold={0.5}
           />
         )}
       </View>
  );


  const renderContent = () => (
    <View style={styles.contentContainer}>
      {renderList()}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderContent()}
    </SafeAreaView>
  );
};

export default HomeScreen;
