import { Text, TextProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'defaultSemiBold' | 'title' | 'link';
};

export function ThemedText(props: ThemedTextProps) {
  const { style, lightColor, darkColor, type = 'default', ...otherProps } = props;
  const defaultColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const linkColor = useThemeColor({}, 'tint');

  let color = defaultColor;
  let fontFamily: string | undefined;
  let fontSize = 16;
  let fontWeight: 'normal' | 'bold' | '400' | '600' = 'normal';
  
  if (type === 'defaultSemiBold') {
    fontWeight = '600';
  } else if (type === 'title') {
    fontSize = 24;
    fontWeight = 'bold';
  } else if (type === 'link') {
    color = linkColor;
  }

  return (
    <Text
      style={[{ color, fontFamily, fontSize, fontWeight }, style]}
      {...otherProps}
    />
  );
}