import React, { Component } from "react";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import { View } from "react-native";
import { CAMPSITES } from "../shared/campsites";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
      selectedCampsite: null,
    };
  }

  //Event Handler - updates the state based on the which is selected
  onCampsiteSelect(campsiteId) {
    this.setState({ selectedCampsite: campsiteId });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Directory
          campsites={this.state.campsites}
          onPress={(campsiteId) => this.onCampsiteSelect(campsiteId)}
        />
        {/*The onCampsiteSelect method above is stored in the Directory component
        so it is available to be called there when needed*/}
        <CampsiteInfo
          campsite={
            this.state.campsites.filter(
              (campsite) => campsite.id === this.state.selectedCampsite
            )[0]
          }
        />
      </View>
    );
  }
}

export default Main;
