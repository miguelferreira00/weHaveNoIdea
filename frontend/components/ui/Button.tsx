import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type CustomButtonProps = {
  title?: string;
  iconName?: keyof typeof AntDesign.glyphMap;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export const Button: React.FC<CustomButtonProps> = ({ title, iconName, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {iconName && <AntDesign name={iconName} size={20} color="white" style={styles.icon} />}
      {title && <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default Button;
