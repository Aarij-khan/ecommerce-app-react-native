import { Stack } from "expo-router";
import CartProvider from "./context/contextapi";

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="forgotpassword" options={{ headerShown: false }} />
        <Stack.Screen name="main" options={{ headerShown: false }} />
        <Stack.Screen name="screens" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="ProductsItem" options={{ headerShown: false }} />
        <Stack.Screen name="productdetail" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ headerShown: false }} />
        <Stack.Screen name="addtocart" options={{ headerShown: false }} />
        <Stack.Screen
          name="profile"
          options={{
            animation: "slide_from_bottom",
            headerTitleAlign: "center",
            headerTitle: "Profile",
          }}
        />
      </Stack>
      </CartProvider>
  );
}
