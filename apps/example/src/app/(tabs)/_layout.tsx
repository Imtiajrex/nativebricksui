import { Stack } from 'expo-router';
import { Text } from 'react-native';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitle(props) {
          return (
            <Text className="text-center font-medium capitalize">
              {props.children.replaceAll('components/', '')}
            </Text>
          );
        },
      }}
    />
  );
}
