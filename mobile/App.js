import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { ThemeProvider } from './src/context/ThemeContext';
import { ProgressProvider } from './src/context/ProgressContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from './src/screens/OnboardingScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import LessonScreen from './src/screens/LessonScreen';
import ReadinessScoreScreen from './src/screens/ReadinessScoreScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <NavigationContainer>
          <StatusBar barStyle="default" />
          <Stack.Navigator 
            initialRouteName="Onboarding"
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right'
            }}
          >
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Lesson" component={LessonScreen} />
            <Stack.Screen name="ReadinessScore" component={ReadinessScoreScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ProgressProvider>
    </ThemeProvider>
  );
}