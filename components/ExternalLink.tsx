import { Pressable, PressableProps } from 'react-native';
import * as Linking from 'expo-linking';

export type ExternalLinkProps = PressableProps & {
  href: string;
};

export function ExternalLink(props: ExternalLinkProps) {
  const { href, ...otherProps } = props;
  
  return (
    <Pressable
      onPress={() => Linking.openURL(href)}
      {...otherProps}
    />
  );
}