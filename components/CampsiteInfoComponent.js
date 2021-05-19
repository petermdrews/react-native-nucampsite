import React, { Component } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import { Card, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    comments: state.comments,
  };
};

function RenderCampsite(props) {
  //The below line of code is how you can destructure props outside of the function definition
  const { campsite } = props;

  if (campsite) {
    return (
      <Card
        featuredTitle={campsite.name}
        image={{ url: baseUrl + campsite.image }}
      >
        <Text style={{ margin: 10 }}>{campsite.description}</Text>
        <Icon
          name={props.favorite ? "heart" : "heart-o"}
          type="font-awesome"
          color="#f50"
          raised
          reverse
          onPress={() =>
            props.favorite
              ? console.log("Already set as a favorite")
              : props.markFavorite()
          }
        />
      </Card>
    );
  }
  return <View />;
}

function RenderComments({ comments }) {
  const renderCommentItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text
          style={{ fontSize: 12 }}
        >{`-- ${item.author}, ${item.date}`}</Text>
      </View>
    );
  };

  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  );
}

class CampsiteInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
    };
  }

  markFavorite() {
    this.setState({ favorite: true });
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
    const campsite = this.props.campsites.campsites.filter(
      (campsite) => campsite.id === campsiteId
    )[0];
    const comments = this.props.comments.comments.filter(
      (comment) => comment.campsiteId === campsiteId
    );
    return (
      <ScrollView>
        <RenderCampsite
          campsite={campsite}
          favorite={this.state.favorite}
          markFavorite={() => this.markFavorite()}
        />
        <RenderComments comments={comments} />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(CampsiteInfo);
