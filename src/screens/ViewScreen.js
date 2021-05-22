import React, { Component } from 'react';
import { Container, Content, Footer, FooterTab, Button, Icon, Text, Form, Item, Label, Input, Picker } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { db } from '../configure/db';
import { updateStudent } from '../services/DataService';

let studentsRef = db.ref('/students');

export default class ViewScreen extends Component {
  constructor(){
   super();
   this.state = {
     students: [],
     name: null,
     matricno: null,
     major: null,
     year: 0,
     status: null,
     postID: null
   }
  }

  componentDidMount() {
    let query = studentsRef.orderByChild("matricno").equalTo(this.props.matricno);
      query.once('value', (snapshot) => {
      let data = snapshot.val();
          if(data){
            let firebaseData = Object.values(data);
            this.setState({students: firebaseData},()=>{
              this.state.students.map((element) => {
                this.setState({
                  name: element.name,
                  matricno: element.matricno,
                  major: element.major,
                  year: element.year,
                  status: element.status
                });
              });
            });
          }
     });
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

  updateData = () =>{
    if(this.state.name && this.state.matricno && this.state.major && this.state.year && this.state.status){
      if(isNaN(this.state.matricno)){
        Alert.alert('Status','Invalid Matric No!');
      }
       else{
         updateStudent(this.state.name, this.state.matricno, this.state.major, this.state.year, this.state.status);
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
        <Text>{this.state.postID}</Text>
        <Form>
        <Item fixedLabel last>
              <Label>Name</Label>
              <Input onChangeText={this.setName} value={this.state.name} />
        </Item>
        <Item fixedLabel last>
              <Label>Matric No</Label>
              <Input onChangeText={this.setMatricNo} value={this.state.matricno} disabled={true} />
        </Item>
       
        <Item fixedLabel last>
              <Label>Major</Label>
               <Input onChangeText={this.setMajor} value={this.state.major} disabled={true} />
        </Item>

        <Item fixedLabel last>
              <Label>Year</Label>
              <Input onChangeText={this.setYear} value={this.state.year} disabled={true} />
        </Item>

        <Item fixedLabel last>
              <Label>Status</Label>
              <Input onChangeText={this.setStatus} value={this.state.status}  />
        </Item>
          
     
        </Form>

          <Button block last style={{marginTop: 50}} onPress={this.updateData}>
            <Text style={{fontWeight: "bold"}}>Update</Text>
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