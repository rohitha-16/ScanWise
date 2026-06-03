import React, { ReactNode } from 'react';
import { StyleSheet, ScrollView, View, useColorScheme } from 'react-native';

type ParallaxScrollViewProps = {
  children: ReactNode;
  headerImage?: ReactNode;
  headerBackgroundColor?: {
    light: string;
    dark: string;
  };
};

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor = { light: '#f0f0f0', dark: '#1c1c1c' },
}: ParallaxScrollViewProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const backgroundColor = headerBackgroundColor[colorScheme];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {headerImage && (
        <View style={[styles.headerContainer, { backgroundColor }]}>
          {headerImage}
        </View>
      )}
      <View style={styles.content}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
});