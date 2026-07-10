import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from '../screens/OnboardingScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LessonScreen from '../screens/LessonScreen';
import ReadinessScoreScreen from '../screens/ReadinessScoreScreen';
import DoubtWallScreen from '../screens/DoubtWallScreen';
import PauseResumeScreen from '../screens/PauseResumeScreen';
import OutcomeDashboardScreen from '../screens/OutcomeDashboardScreen';
import JobBoardScreen from '../screens/JobBoardScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerStyle: { backgroundColor: '#6C63FF' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Lesson" component={LessonScreen} options={{ title: 'Snack Lesson' }} />
      <Stack.Screen name="ReadinessScore" component={ReadinessScoreScreen} options={{ title: 'Job-Readiness Score' }} />
      <Stack.Screen name="DoubtWall" component={DoubtWallScreen} options={{ title: 'Doubt Wall' }} />
      <Stack.Screen name="PauseResume" component={PauseResumeScreen} options={{ title: 'Life Happens' }} />
      <Stack.Screen name="OutcomeDashboard" component={OutcomeDashboardScreen} options={{ title: 'Outcome Dashboard' }} />
      <Stack.Screen name="JobBoard" component={JobBoardScreen} options={{ title: 'Job Board' }} />
    </Stack.Navigator>
  );
};

// ✅ MAKE SURE THIS EXISTS
export default AppNavigator;