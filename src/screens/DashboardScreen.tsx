import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { DashboardData } from '@/src/types';
import { dashboardApi } from '@/src/services/api';
import { useAuth } from '@/src/hooks/useAuth';

export default function DashboardScreen() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await dashboardApi.getDashboardData();
      if (response.success && response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  if (!dashboardData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load dashboard</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadDashboardData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {dashboardData.user.firstName}!</Text>
        <Text style={styles.role}>{dashboardData.user.role.charAt(0).toUpperCase() + dashboardData.user.role.slice(1)}</Text>
      </View>

      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{dashboardData.metrics.totalStudents}</Text>
          <Text style={styles.metricLabel}>Students</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{dashboardData.metrics.totalTeachers}</Text>
          <Text style={styles.metricLabel}>Teachers</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{dashboardData.metrics.totalClasses}</Text>
          <Text style={styles.metricLabel}>Classes</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{dashboardData.metrics.attendanceRate}%</Text>
          <Text style={styles.metricLabel}>Attendance</Text>
        </View>
      </View>

      <View style={styles.walletCard}>
        <Text style={styles.cardTitle}>Wallet</Text>
        <Text style={styles.balance}>${dashboardData.wallet.balance.toFixed(2)}</Text>
        {dashboardData.wallet.lastTransaction && (
          <Text style={styles.lastTransaction}>
            Last: {dashboardData.wallet.lastTransaction.description} - 
            ${Math.abs(dashboardData.wallet.lastTransaction.amount).toFixed(2)}
          </Text>
        )}
      </View>

      <View style={styles.eventsCard}>
        <Text style={styles.cardTitle}>Upcoming Events</Text>
        {dashboardData.upcomingEvents.slice(0, 3).map((event) => (
          <View key={event.id} style={styles.eventItem}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDate}>{event.date} at {event.time}</Text>
          </View>
        ))}
      </View>

      <View style={styles.notificationsCard}>
        <Text style={styles.cardTitle}>Recent Notifications</Text>
        {dashboardData.notifications.slice(0, 3).map((notification) => (
          <View key={notification.id} style={styles.notificationItem}>
            <View style={[styles.notificationDot, { backgroundColor: getNotificationColor(notification.type) }]} />
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'urgent': return '#ef4444';
    case 'warning': return '#f59e0b';
    case 'success': return '#10b981';
    default: return '#3b82f6';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  role: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3b82f6',
  },
  metricLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  walletCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  balance: {
    fontSize: 32,
    fontWeight: '700',
    color: '#10b981',
    marginBottom: 8,
  },
  lastTransaction: {
    fontSize: 14,
    color: '#6b7280',
  },
  eventsCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  eventDate: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  notificationsCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  notificationMessage: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
});