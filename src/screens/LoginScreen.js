import { StatusBar } from 'expo-status-bar';
import  Component  from 'react';
import { Actions } from 'react-native-router-flux';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Item, Form, Input, Button, Label } from "native-base";
import * as firebase from "firebase";


 
 
  export default class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: ""
      }
    }

    SignUp = () =>{
      try {
         if(this.state.email && this.state.password){
          firebase
              .auth()
              .createUserWithEmailAndPassword(this.state.email, this.state.password)
              .then(user => { 
                     console.log(user);
                     Alert.alert('Status','Sign Up Successful');
               })
              .catch(error => {
                Alert.alert('Status',error.toString(error));
              });
         } else {
            Alert.alert('Status','Invalid Email or Password!');
           }
          } catch (error) {
            Alert.alert({ errorMessage: error.message });
          }
     };

    getLogin = () => {
        try {
         if(this.state.email && this.state.password){
          firebase
             .auth()
             .signInWithEmailAndPassword(this.state.email, this.state.password)
             .then(() => {
                 Actions.ListScreen();
              })
             .catch(error => {
               Alert.alert('Status', error.toString(error));
              });
         } else {
           Alert.alert('Status','Invalid Email & Password!');
         }
          } catch (error) {
            console.log(error.toString(error));
        }
      };
 
   render(){ return (
    <Container style={styles.container}>
    <Form>
    <Item floatingLabel>
    <Label>Email</Label>
    <Input autoCapitalize="none" autoCorrect={false}  onChangeText={email => this.setState({ email })} />
    </Item>
    <Item floatingLabel>
    <Label>Password</Label>
    <Input
    secureTextEntry={true}
    autoCapitalize="none"
    autoCorrect={false}
    onChangeText={password => this.setState({ password })}
    />
    </Item>
    <Button full rounded success style={styles.button} onPress={() => this.getLogin(this.state.email, this.state.password)}>
    <Text>Login</Text>
    </Button>
    <Button full rounded success style={[styles.button, { backgroundColor: 'powderblue'}]} onPress={() => this.SignUp(this.state.email, this.state.password)}>
<Text>Signup</Text>
</Button>
    </Form>
    </Container>
);

   }
}

const styles = StyleSheet.create({
  container: {
   
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  button:{
    marginTop:20,
  }
});
