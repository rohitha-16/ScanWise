import { StyleSheet, ScrollView, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SegregationScreen() {
  const router = useRouter();
  
  const wasteTypes = [
    {
      id: 1,
      title: 'Wet Waste',
      color: '#4CAF50',
      icon: '🍎',
      examples: ['Food waste', 'Fruit and vegetable peels', 'Tea bags', 'Coffee grounds', 'Eggshells', 'Garden waste'],
      tips: 'Can be composted at home using a simple compost bin. Keep separate from dry waste to prevent contamination.'
    },
    {
      id: 2,
      title: 'Dry Waste',
      color: '#2196F3',
      icon: '📰',
      examples: ['Paper', 'Cardboard', 'Plastic bottles', 'Glass bottles', 'Metal cans', 'Tetra packs'],
      tips: 'Clean and dry before disposal. Many items can be recycled if properly segregated.'
    },
    {
      id: 3,
      title: 'Hazardous Waste',
      color: '#F44336',
      icon: '⚠️',
      examples: ['Batteries', 'CFL bulbs', 'Expired medicines', 'Paints', 'Chemicals', 'Electronic waste'],
      tips: 'Never mix with regular waste. Return to collection centers or during special collection drives.'
    },
    {
      id: 4,
      title: 'Sanitary Waste',
      color: '#9C27B0',
      icon: '🧴',
      examples: ['Diapers', 'Sanitary napkins', 'Bandages', 'Cotton swabs', 'Razors', 'Syringes'],
      tips: 'Wrap in newspaper and mark with a red cross. Dispose in separate bins marked for sanitary waste.'
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ 
        title: 'Waste Segregation Guide',
        headerShown: true,
      }} />
      
      <ScrollView style={styles.scrollView}>
        <ThemedText style={styles.intro}>
          Proper waste segregation is the first step towards effective waste management. 
          Learn how to separate your waste into these categories:
        </ThemedText>

        {wasteTypes.map((wasteType) => (
          <View key={wasteType.id} style={[styles.wasteCard, { borderLeftColor: wasteType.color }]}>
            <View style={styles.wasteHeader}>
              <ThemedText style={styles.wasteIcon}>{wasteType.icon}</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.wasteTitle}>{wasteType.title}</ThemedText>
            </View>
            
            <ThemedText type="defaultSemiBold" style={styles.examplesTitle}>Examples:</ThemedText>
            <View style={styles.examplesList}>
              {wasteType.examples.map((example, index) => (
                <View key={index} style={styles.exampleItem}>
                  <ThemedText>• {example}</ThemedText>
                </View>
              ))}
            </View>
            
            <ThemedText type="defaultSemiBold" style={styles.tipsTitle}>Tips:</ThemedText>
            <ThemedText style={styles.tips}>{wasteType.tips}</ThemedText>
          </View>
        ))}

        <TouchableOpacity 
          style={styles.composteButton}
          onPress={() => router.push('/composting')}
        >
          <ThemedText type="defaultSemiBold" style={styles.buttonText}>Learn How to Compost at Home</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  intro: {
    marginBottom: 20,
    lineHeight: 22,
  },
  wasteCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 5,
  },
  wasteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  wasteIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  wasteTitle: {
    fontSize: 18,
  },
  examplesTitle: {
    marginBottom: 8,
  },
  examplesList: {
    marginBottom: 12,
  },
  exampleItem: {
    marginBottom: 4,
  },
  tipsTitle: {
    marginBottom: 8,
  },
  tips: {
    fontStyle: 'italic',
  },
  composteButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
  },
});