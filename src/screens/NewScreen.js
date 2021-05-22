import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Text, Form, Item, Label, Input, Picker } from 'native-base';
import { addStudent } from '../services/DataService';

export default class NewScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      matricno: null,
      major: "",
      year: 0,
      status: ""
    };
  }

  setName = (value) =>{
    this.setState({ name: value });
  }

  setMatricNo = (value) =>{
    this.setState({ matricno: value });
  }

  setMajor = (value) => {
    this.setState({ major: value });
  }

  setYear = (value) => {
    this.setState({ year: value });
  }

  setStatus = (value) => {
    this.setState({ status: value });
  }

  saveData = () =>{
    if(this.state.name && this.state.matricno && this.state.major && this.state.year && this.state.status){
      if(isNaN(this.state.matricno)){
        Alert.alert('Status','Invalid Matric No!');
      }
       else{
         addStudent(this.state.name, this.state.matricno, this.state.major, this.state.year, this.state.status);
       }
    } else{
       Alert.alert('Status','Empty Field(s)!');
    }
  }

  render() {
    return (
      <Container>
        <Content padder>
        <Text style={{textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20}}>Student Details</Text>
        <Form>
        <Item fixedLabel last>
              <Label>Name</Label>
              <Input onChangeText={this.setName} />
        </Item>
        <Item fixedLabel last>
              <Label>Matric No</Label>
              <Input onChangeText={this.setMatricNo} />
        </Item>
        
        <Item fixedLabel last>
              <Label>Major</Label>
              <Input onChangeText={this.setMajor} />
        </Item>

        <Item fixedLabel last>
              <Label>Year</Label>
              <Input onChangeText={this.setYear} />
        </Item>

        <Item fixedLabel last>
              <Label>Status</Label>
              <Input onChangeText={this.setStatus} />
        </Item>
       

        
        </Form>

          <Button block last style={{marginTop: 50}} onPress={this.saveData}>
            <Text style={{fontWeight: "bold"}}>Save</Text>
          </Button>
        </Content>

        <Footer>
          <FooterTab>
          <Button vertical onPress={() => {Actions.ListScreen();}}>
              <Icon name="list-box" />
              <Text>Student List</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}