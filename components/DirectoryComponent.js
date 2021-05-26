import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
  };
};

class Directory extends Component {
  static navigationOptions = {
    title: "Directory",
  };

  render() {
    //The line below is destructuring the navigate function out of the navigation prop
    const { navigate } = this.props.navigation;
    const renderDirectoryItem = ({ item }) => {
      return (
        <Animatable.View animation="fadeInRightBig" duration={2000}>
          <Tile
            title={item.name}
            caption={item.description}
            featured
            onPress={() =>
              navigate("CampsiteInfo", { campsiteId: item.id })
            } /*this uses the navigate function
          to navigate on press. The first argument is the screen to navigate to. The second optional argument adds
          optional parameters to the route. In this case, we're specifying a parameter called campsiteId
          and giving the id of the campsite that was pressed  */
            imageSrc={{ uri: baseUrl + item.image }}
          />
        </Animatable.View>
      );
    };

    if (this.props.campsites.isLoading) {
      return <Loading />;
    }
    if (this.props.campsites.errMess) {
      return (
        <View>
          <Text>{this.props.campsites.errMess}</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={this.props.campsites.campsites} //the campsites.js data is stored in this compnents state; it isn't being received as props
        renderItem={renderDirectoryItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default connect(mapStateToProps)(Directory);
