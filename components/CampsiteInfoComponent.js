import React, { Component } from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-elements";
import { CAMPSITES } from "../shared/campsites";

function RenderCampsite({ campsite }) {
  if (campsite) {
    return (
      <Card
        featuredTitle={campsite.name}
        image={require("./images/react-lake.jpg")}
      >
        <Text style={{ margin: 10 }}>{campsite.description}</Text>
      </Card>
    );
  }
  return <View />;
}

class CampsiteInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
    };
  }

  //Code below sets the header for the screen
  static navigationOptions = {
    title: "Campsite Information",
  };

  render() {
    /*The line of code below change how the campites object is passed
    to the RenderCampsite component. In the Directory Component, we set a parameter
    to hold the campsiteId being passed with the navigate function. It can be accessed here
    through the navigation prop, which is passed automatically to all components that
    are set up as screens. */
    const campsiteId = this.props.navigation.getParam("campsiteId");
    /* Because the campsite array is stored in the local state, 
    the line of code below pulls the campsite object we want from 
    the array using the filter method */
    const campsite = this.state.campsites.filter(
      (campsite) => campsite.id === campsiteId
    )[0];
    return <RenderCampsite campsite={campsite} />;
  }
}

export default CampsiteInfo;
