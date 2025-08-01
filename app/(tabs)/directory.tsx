import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DirectoryTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Directory</Text>
      <Text style={styles.subtitle}>Coming in Phase 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
});