import React, { useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import BottomTabBarScreen from "./components/bottomTabBarScreen";
import AllReviewsScreen from "./screens/allReviews/allReviewsScreen";
import BookNowScreen from "./screens/bookNow/bookNowScreen";
import ExploreTripScreen from "./screens/exploreTrip/exploreTripScreen";
import HotelDetailScreen from "./screens/hotelDetail/hotelDetailScreen";
import HotelWithMapScreen from "./screens/hotelWithMap/hotelWithMapScreen";
import MustVisitPlaceScreen from "./screens/mustVisitPlace/mustVisitPlaceScreen";
import PaymentScreen from "./screens/payment/paymentScreen";
import PopularExperienceScreen from "./screens/popularExperience/popularExperienceScreen";
import PopularPlaceScreen from "./screens/popularPlace/popularPlaceScreen";
import NotificationScreen from "./screens/notification/notificationScreen";
import EditProfileScreen from "./screens/editProfile/editProfileScreen";
import InviteFriendsScreen from "./screens/inviteFriends/inviteFriendsScreen";
import TravelProCashScreen from "./screens/travelProCash/travelProCashScreen";
import WelcomeScreen from "./screens/auth/welcomeScreen";
import VerificationScreen from "./screens/auth/verificationScreen";
import RegisterScreen from "./screens/auth/registerScreen";
import SplashScreen from "./screens/splashScreen";
import OnboardingScreen from "./screens/onboarding/onboardingScreen";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

ExpoSplashScreen.preventAutoHideAsync();

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    NotoSans_Bold: require("./assets/fonts/noto_sans/NotoSans-Bold.ttf"),
    NotoSans_Regular: require("./assets/fonts/noto_sans/NotoSans-Regular.ttf"),
    Pecifico_Regular: require("./assets/fonts/pacifico/Pacifico-Regular.ttf")
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  onLayoutRootView();

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ ...TransitionPresets.DefaultTransition }} />
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="BottomTabBar" component={BottomTabBarScreen} />
          <Stack.Screen name="PopularPlace" component={PopularPlaceScreen} options={{ ...TransitionPresets.FadeFromBottomAndroid }} />
          <Stack.Screen name="HotelDetail" component={HotelDetailScreen} />
          <Stack.Screen name="AllReviews" component={AllReviewsScreen} />
          <Stack.Screen name="PopularExperience" component={PopularExperienceScreen} />
          <Stack.Screen name="BookNow" component={BookNowScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="HotelWithMap" component={HotelWithMapScreen} />
          <Stack.Screen name="ExploreTrip" component={ExploreTripScreen} />
          <Stack.Screen name="MustVisitPlace" component={MustVisitPlaceScreen} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
          <Stack.Screen name="TravelProCash" component={TravelProCashScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;