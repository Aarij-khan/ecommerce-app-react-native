import { Stack } from 'expo-router';


export default function RootLayout() {

  return (
      <Stack>
        <Stack.Screen name="index"  options={{headerShown:false}}/>
        <Stack.Screen name="login"  options={{headerShown:false}}/>
        <Stack.Screen name="signup"  options={{headerShown:false}}/>
        <Stack.Screen name="forgotpassword"  options={{headerShown:false}}/>
        <Stack.Screen name="main"  options={{headerShown:false}}/>
        <Stack.Screen name="screens"  options={{headerShown:false}}/>
        <Stack.Screen name="home"  options={{headerShown:false}}/>
      </Stack>
  );
}
