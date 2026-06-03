import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <TabBarIcon name="compass" color={color} />,
        }}
      />
    </Tabs>
  );
}

// Simple TabBarIcon component
function TabBarIcon(props: { name: string; color: string }) {
  // This is a simplified version that uses a text character as a placeholder
  // In a real app, you would use a proper icon library
  const iconMap: Record<string, string> = {
    home: '🏠',
    compass: '🧭',
  };

  return (
    <div style={{ fontSize: 24, color: props.color }}>
      {iconMap[props.name] || '⚠️'}
    </div>
  );
}