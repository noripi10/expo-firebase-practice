import AsyncStorage from '@react-native-async-storage/async-storage';
import SecureStore from 'expo-secure-store';
import Storage from 'react-native-storage';

export const storage = new Storage({
	storageBackend: AsyncStorage,
	size: 1000,
});
