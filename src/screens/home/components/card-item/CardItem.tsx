import React, { useMemo } from "react";
import { View, StyleProp, ViewStyle, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-dynamic-vector-icons";
import RNBounceable from "@freakycoder/react-native-bounceable";
/**
 * ? Local Imports
 */
import createStyles from "./CardItem.style";
import Text from "@shared-components/text-wrapper/TextWrapper";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface ICardItemProps {
  style?: CustomStyleProp;
  data: any;
  onPress: () => void;
}

const CardItem: React.FC<ICardItemProps> = ({ style, data, onPress }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { name, location,  } = data;

  const Header = () => (
    <>
      <Text h4 bold color={colors.text}>
        {`${name.first}, ${name.last}`}
      </Text>
      <Text h5 color={colors.placeholder} style={styles.descriptionTextStyle}>
        {`${location.city}, ${location.country}`}
      </Text>
    </>
  );



  return (
    <RNBounceable style={[styles.container, style]} onPress={onPress}>
      <Header />
      <Image source={{ uri: data.picture.thumbnail }} style={{ position: 'absolute', left: -20, top: 25,  height: 50, width: 50, borderRadius: 25  }}/>
      <View style={styles.contentContainer}>
       
      </View>
    </RNBounceable>
  );
};

export default CardItem;
