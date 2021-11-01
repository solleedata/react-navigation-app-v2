import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

function HomeScreen({ navigation, route }) { // FIXME: navigation must be defined
  useEffect(() => {
    if (route.params?.post) {

    }
  }, [route.params?.post])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Create post"
        onPress={() => {
          navigation.navigate('CreatePost')
        }}
      />
      <Text style={{ margin: 10 }} >Post: {route.params?.post} </Text>
    </View>
  )
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = useState('')
  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'Home',
            params: { post: postText },
            merge: true,
          });
        }}
      />
    </>
  )
}

function DetailsScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)} </Text>
      <Text>itemId: {JSON.stringify(otherParam)} </Text>
      <Button
        title='Go to details...again'
        onPress={() =>
          navigation.push('Details', {
            // params: 
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button
        title='Go to Home'
        onPress={() => navigation.navigate('Home')} // navigate is a method that takes a screen name as a parameter (to where we want to mmove to)
      />
      <Button
        title='Go back'
        onPress={() => navigation.goBack()} // goBack is a method that takes a screen name as a parameter (to where we want to mmove to)
      />
    </View>
  )
}

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({ title: 'Updated!' })}
      />
    </View>
  );
}

function LogoTitle() {
  return (
    <Image
      style={{ width: 30, height: 30, backgroundColor: 'black' }}
      source={require('./assets/icon.png')}
    />
  )
}

function StackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{ // any screen that belongs to StackScreen will share these properties
        headerStyle: {
          backgroundColor: '#e6e6e6',
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // title: 'my home',
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  )
}

const Stack = createNativeStackNavigator()


export default function App() {
  return (
    <NavigationContainer>
      {/* Initial route */}
      <Stack.Navigator initialRouteName='StackScreen'>
        <Stack.Screen
          name="Home" // name of the route
          component={HomeScreen} // component to render
          options={{ title: 'Overview' }} // options for the route
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          initialParams={{ itemId: 42 }} // initial params for the route
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
        />
        <Stack.Screen
          name="StackScreen"
          component={StackScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
