import React, { Component } from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { CAMPSITES } from "../shared/campsites";

class Directory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
    };
  }

  static navigationOptions = {
    title: "Directory",
  };

  render() {
    //The line below is destructuring the navigate function out of the navigation prop
    const { navigate } = this.props.navigation;
    const renderDirectoryItem = ({ item }) => {
      return (
        <ListItem
          title={item.name}
          subtitle={item.description}
          onPress={() =>
            navigate("CampsiteInfo", { campsiteId: item.id })
          } /*this uses the navigate function
          to navigate on press. The first argument is the screen to navigate to. The second optional argument adds
          optional parameters to the route. In this case, we're specifying a parameter called campsiteId
          and giving the id of the campsite that was pressed  */
          leftAvatar={{ source: require("./images/react-lake.jpg") }}
        /> // The require function above is built in as part of node.js
      );
    };
    return (
      <FlatList
        data={this.state.campsites} //the campsites.js data is stored in this compnents state; it isn't being received as props
        renderItem={renderDirectoryItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default Directory;
