import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

type IconSymbolProps = {
  name: string;
  size?: number;
  color?: string;
  style?: TextStyle;
};

export function IconSymbol({ name, size = 24, color = '#000', style }: IconSymbolProps) {
  // This is a simplified version that uses a text character as a placeholder
  // In a real app, you would use a proper icon library like FontAwesome, Material Icons, etc.
  
  // Map icon names to simple text representations
  const iconMap: Record<string, string> = {
    'chevron.left.forwardslash.chevron.right': '</>', 
    // Add more mappings as needed
  };

  const iconText = iconMap[name] || '⚠️';
  
  return (
    <Text 
      style={[
        styles.icon, 
        { fontSize: size, color }, 
        style
      ]}
    >
      {iconText}
    </Text>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontWeight: 'bold',
  },
});