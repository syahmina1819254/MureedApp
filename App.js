import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import ListScreen from './src/screens/ListScreen';
import NewScreen from './src/screens/NewScreen';
import ViewScreen from './src/screens/ViewScreen';
import LoginScreen from './src/screens/LoginScreen';


export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
        <Scene key="LoginScreen" component={LoginScreen} left={()=>null} title="Mureed" initial={true} />
          <Scene key="ListScreen" component={ListScreen} left={()=>null} title="Mureed" />
          <Scene key="NewScreen" component={NewScreen} left={()=>null} title="Mureed" />
          <Scene key="ViewScreen" component={ViewScreen} left={()=>null} title="Mureed" />
        </Scene>
      </Router>
    )
  }
}