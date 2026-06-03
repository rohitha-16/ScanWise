import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function ReportWasteScreen() {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [wasteType, setWasteType] = useState('');
  
  const wasteTypes = [
    { id: 'unmanaged', label: 'Unmanaged Waste' },
    { id: 'illegal_dumping', label: 'Illegal Dumping' },
    { id: 'overflow', label: 'Bin Overflow' },
    { id: 'mixed_waste', label: 'Unsegregated Waste' },
    { id: 'other', label: 'Other Issue' },
  ];

  const handleSubmit = () => {
    if (!location || !description || !wasteType) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }
    
    // In a real app, this would send data to a server
    Alert.alert(
      'Report Submitted',
      'Thank you for reporting this waste issue. Your contribution helps keep our community clean!',
      [
        { 
          text: 'OK', 
          onPress: () => {
            // Reset form
            setLocation('');
            setDescription('');
            setWasteType('');
          } 
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ 
        title: 'Report Waste',
        headerShown: true,
      }} />
      
      <ScrollView style={styles.scrollView}>
        <ThemedText style={styles.intro}>
          Help keep your community clean by reporting waste issues. Your reports will be sent to local authorities and Green Champions in your area.
        </ThemedText>

        <View style={styles.formContainer}>
          <ThemedText type="defaultSemiBold" style={styles.label}>Waste Type</ThemedText>
          <View style={styles.wasteTypeContainer}>
            {wasteTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.wasteTypeButton,
                  wasteType === type.id && styles.wasteTypeButtonSelected
                ]}
                onPress={() => setWasteType(type.id)}
              >
                <ThemedText 
                  style={[
                    styles.wasteTypeText,
                    wasteType === type.id && styles.wasteTypeTextSelected
                  ]}
                >
                  {type.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          <ThemedText type="defaultSemiBold" style={styles.label}>Location</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter the location of the waste"
            value={location}
            onChangeText={setLocation}
          />

          <ThemedText type="defaultSemiBold" style={styles.label}>Description</ThemedText>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe the waste issue"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.photoButton}>
            <ThemedText style={styles.photoButtonText}>📸 Add Photo</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <ThemedText style={styles.submitButtonText}>Submit Report</ThemedText>
          </TouchableOpacity>
        </View>
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
  formContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  wasteTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  wasteTypeButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  wasteTypeButtonSelected: {
    backgroundColor: '#4CAF50',
  },
  wasteTypeText: {
    fontSize: 14,
  },
  wasteTypeTextSelected: {
    color: 'white',
  },
  photoButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  photoButtonText: {
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});