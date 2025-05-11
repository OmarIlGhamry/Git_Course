import { Stack } from 'expo-router';
import { CartProvider } from '../app/cartContext'; 

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </CartProvider>
  );
}
