import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { CAMPSITES } from "../shared/campsites";
import { Card } from "react-native-elements";

class Contact extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Contact Us",
  };

  render() {
    return (
      <ScrollView>
        <Card title="Contact Information" wrapperStyle={{ margin: 20 }}>
          <Text>1 Nucamp Way</Text>
          <Text style={{ marginBottom: 10 }}>Seattle, WA 98001 U.S.A.</Text>
          <Text>Phone: 1-206-555-1234</Text>
          <Text>Email: campsites@nucamp.co</Text>
        </Card>
      </ScrollView>
    );
  }
}

export default Contact;
