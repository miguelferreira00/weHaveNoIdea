import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

type CustomButtonProps = {
  title?: string;
  iconName?: keyof typeof AntDesign.glyphMap;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  useGradient?: boolean; 
};

export const Button: React.FC<CustomButtonProps> = ({
  title,
  iconName,
  onPress,
  style,
  useGradient = true, // ✅ Valor default
}) => {
  const content = (
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
      {iconName && <AntDesign name={iconName} size={20} color="white" style={styles.icon} />}
      {title && <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );

  if (useGradient) {
    return (
      <LinearGradient
        colors={['#6A11CB', '#2575FC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, style]}
      >
        {content}
      </LinearGradient>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 25,
    padding: 2,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
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
