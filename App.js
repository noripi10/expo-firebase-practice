import React, {useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {AppNavigator} from './src/navigation/AppNavigator';
import {UserContext} from './src/context/UserContext';
import {storage} from './src/util/storage';
import {auth} from './src/util/firebase';
import {createUserDoc} from './src/util/firebase';

export default function App() {
  // const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const authSurveillanceHandler = () => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const {displayName, photoURL, uid, isAnonymous} = user;
        setUser({displayName, photoURL, uid, isAnonymous});

        if (!user.isAnonymous) {
          storage.save({key: 'login', data: true});
        }
      } else {
        setUser(null);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = authSurveillanceHandler();

    return () => {
      unsubscribe();
    };
  }, []);

  // if (initializing) {
  // 	return (
  // 		<View>
  // 			<Text>initializing...</Text>
  // 		</View>
  // 	);
  // }

  return (
    <UserContext.Provider value={{user, setUser}}>
      <AppNavigator />
    </UserContext.Provider>
  );
}
