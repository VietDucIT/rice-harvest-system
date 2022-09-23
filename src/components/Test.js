import React, { Component } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import {
  Colors,
  Typography,
  View,
  Text,
  TextField,
  TextArea,
  Modal,
  Button,
  Keyboard,
} from "react-native-ui-lib"; //eslint-disable-line
const KeyboardAwareInsetsView = Keyboard.KeyboardAwareInsetsView;

const richText = require("../assets/icon.png");
const dropDown = require("../assets/favicon.png");
const star = require("../assets/splash.png");
const LONG_TEXT =
  "Concept, edition and design direction for the editorial piece “La Forma Bruta” by the photographer" +
  "Martín Bollati. In this piece";
const transformPrice = (value) => {
  let cleanValue;
  let priceText = "";
  if (value) {
    [cleanValue] = value.match(/^(?:(?:-?(?:0|\d{1,9}))(?:\.\d{0,2})?)|-/) || [
      "",
    ];
    priceText = cleanValue;
  }
  return priceText;
};
const INPUT_SPACING = 10;

export default class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      customExpandableValue: "Custom Expandable",
    };
  }

  onChangeText = (text) => {
    let message = "";
    if (text === "") {
      message = "This field is mandatory";
    }
    if (text === "Zzz") {
      message = "Please enter a valid text";
    }
    this.setState({ error: message });
  };

  onPressInfo = () => {
    Alert.alert("Info button pressed");
  };

  onPress = () => {
    this.setState({ customExpandableValue: "New Value" }, () => {
      this.input.toggleExpandableModal(false);
    });
  };

  renderExpandable = () => {
    return (
      <Modal visible animationType={"slide"}>
        <View flex bg-orange70 center>
          <Text marginB-20 text50>
            Do Whatever you want here
          </Text>
          <Button label="Close Me" onPress={this.onPress} />
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View flex>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          getTextInputRefs={() => [this.noUnderline, this.hugeText]}
        >
          <TextField
            text70
            containerStyle={{ marginBottom: INPUT_SPACING }}
            floatingPlaceholder
            placeholder="FloatingPlaceholder"
            onChangeText={this.onChangeText}
            floatOnFocus
          />

          <TextField
            text70
            containerStyle={{ marginBottom: INPUT_SPACING }}
            floatingPlaceholder
            placeholder="placeholder"
            helperText="helperText"
            value="disabled with value"
            maxLength={100}
            showCharacterCounter
            editable={false}
            disabledColor={Colors.grey70}
          />

          <TextField
            text70
            containerStyle={{ marginBottom: INPUT_SPACING }}
            floatingPlaceholder
            placeholder="With helperText"
            helperText="this is an helper text"
            onChangeText={this.onChangeText}
          />

          <TextField
            text70
            containerStyle={{ marginBottom: INPUT_SPACING }}
            floatingPlaceholder
            placeholder="Multiline & helperText"
            multiline
            helperText="this is an helper text"
          />

          <TextField
            text70
            containerStyle={{ marginBottom: INPUT_SPACING }}
            title="title"
            placeholder="Character counter & error"
            maxLength={3}
            showCharacterCounter
            onChangeText={this.onChangeText}
          />

          <TextField
            text70
            containerStyle={{ marginBottom: INPUT_SPACING }}
            title="Title"
            titleStyle={{ fontSize: Typography.text70.fontSize }}
            placeholder="Multiline & titleStyle"
            multiline
            maxLength={150}
            showCharacterCounter
            onChangeText={this.onChangeText}
            autoCapitalize="words"
          />

          <TextField
            text70
            containerStyle={{ marginBottom: INPUT_SPACING }}
            floatingPlaceholder
            placeholder="Character counter & expandable"
            expandable
            maxLength={20}
            showCharacterCounter
          />

          <TextField
            text70
            containerStyle={{ marginBottom: INPUT_SPACING }}
            floatingPlaceholder
            placeholderTextColor={Colors.cyan30}
            floatingPlaceholderColor={Colors.cyan30}
            placeholder="Underline colors & error"
            onChangeText={this.onChangeText}
            error={this.state.error}
            underlineColor={{ focus: Colors.purple50, error: Colors.orange60 }}
            errorColor={Colors.orange60}
          />

          <TextField
            text40
            containerStyle={{ marginBottom: INPUT_SPACING }}
            placeholder="Write something.."
            hideUnderline
          />

          <TextField
            text30
            containerStyle={{ marginBottom: INPUT_SPACING }}
            placeholder="Write something.."
            centered
            hideUnderline
          />

          <TextField
            text70
            containerStyle={{ marginBottom: INPUT_SPACING }}
            placeholder="Share your story"
            value={
              "Share Your Story exists to provide spaces to hear people's stories, in order to inspire us to" +
              "live better ones ourselves."
            }
            multiline
          />

          <TextField
            text70
            containerStyle={{ marginBottom: INPUT_SPACING }}
            floatingPlaceholder
            placeholder="Tell us about yourself"
            value={LONG_TEXT}
            expandable
          />

          <TextField
            containerStyle={{ marginBottom: INPUT_SPACING }}
            ref={(r) => (this.input = r)}
            placeholder="placeholder"
            expandable
            value={this.state.customExpandableValue}
            renderExpandable={this.renderExpandable}
          />

          <TextField
            text70
            containerStyle={{ marginBottom: INPUT_SPACING }}
            floatingPlaceholder
            placeholder="With price transformer"
            value={this.state.value}
            transformer={transformPrice}
          />

          <TextField
            text70
            containerStyle={{ marginBottom: INPUT_SPACING }}
            title="Title"
            placeholder="With right icon"
            rightIconSource={star}
            useTopErrors
            validate={"required"}
            errorMessage="Please fill this input"
          />

          <TextField
            text70
            containerStyle={{ marginBottom: INPUT_SPACING }}
            floatingPlaceholder
            placeholder="With right button"
            rightButtonProps={{
              iconSource: richText,
              onPress: this.onPressInfo,
              accessibilityLabel: "TextField Info",
              iconColor: Colors.red30,
            }}
            useTopErrors
            validate={"required"}
            errorMessage="Please fill this input"
          />

          <TextField
            text70
            containerStyle={{ marginBottom: INPUT_SPACING, width: 210 }}
            floatingPlaceholder
            placeholder="Multiline & right button"
            multiline
            rightButtonProps={{
              iconSource: richText,
              onPress: this.onPressInfo,
            }}
          />

          <TextField
            text70
            containerStyle={{ marginBottom: INPUT_SPACING }}
            floatingPlaceholder
            placeholder="Expandable & right icon"
            expandable
            rightIconSource={dropDown}
          />

          <Text grey10 marginB-5>
            Text Area
          </Text>
          <View
            style={{
              height: 150,
              borderWidth: 1,
              marginBottom: INPUT_SPACING,
              padding: 10,
              borderColor: Colors.grey60,
            }}
          >
            <TextArea placeholder="Write something.." />
          </View>

          <TextField
            text50
            floatingPlaceholder
            placeholder="Big Title Text"
            containerStyle={{ marginBottom: INPUT_SPACING }}
            helperText="this is an helper text"
          />
          <TextField
            text20
            placeholder="Huge Text"
            containerStyle={{ marginBottom: INPUT_SPACING }}
            ref={(input) => (this.hugeText = input)}
          />

          <TextField
            text70
            placeholder="No Underline"
            containerStyle={{ marginBottom: INPUT_SPACING }}
            ref={(input) => (this.noUnderline = input)}
            hideUnderline
          />

          <TextField
            text10
            placeholder="Centered"
            centered
            containerStyle={{ marginBottom: INPUT_SPACING }}
            // hideUnderline
          />
        </ScrollView>
        <KeyboardAwareInsetsView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 25,
  },
  title: {
    ...Typography.text20,
  },
  header: {
    ...Typography.text60,
    marginVertical: 20,
  },
});

// TOAST

// import _ from "lodash";
// import React, { Component } from "react";
// import { StyleSheet } from "react-native";
// import {
//   Colors,
//   View,
//   Button,
//   Text,
//   Icon,
//   TouchableOpacity,
//   Toast,
// } from "react-native-ui-lib";

// const colors = [Colors.green30, Colors.red30, Colors.violet30];
// const rootIcon = require("../assets/icon.png");
// const favIcon = require("../assets/favicon.png");
// const splashIcon = require("../assets/splash.png");

// export default class Test extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       showToast: false,
//       showTopToast: false,
//       showCustomToast: false,
//       selectedColor: "none",
//       showLoader: false,
//       showDismiss: false,
//       showContent: false,
//     };
//   }

//   renderColors() {
//     return (
//       <View row>
//         {_.map(["none", ...colors], (color, index) => {
//           const isSelected = color === this.state.selectedColor;
//           const backgroundColor = color === "none" ? undefined : color;
//           return (
//             <TouchableOpacity
//               key={color}
//               onPress={() => this.setState({ selectedColor: color })}
//             >
//               <View
//                 center
//                 style={[
//                   styles.color,
//                   { backgroundColor },
//                   isSelected && styles.selected,
//                 ]}
//               >
//                 {color === "none" && (
//                   <Icon source={favIcon} tintColor={Colors.black} />
//                 )}
//               </View>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     );
//   }

//   renderAboveToast = () => {
//     if (this.state.showContent) {
//       return (
//         <View
//           flex
//           bottom
//           right
//           paddingB-50
//           paddingR-20
//           pointerEvents={"box-none"}
//         >
//           <Button
//             iconSource={rootIcon}
//             color={Colors.white}
//             style={{ height: 50, width: 50 }}
//           />
//         </View>
//       );
//     }
//   };

//   renderBelowToast = () => {
//     if (this.state.showContent) {
//       return (
//         <View center bg-violet50 padding-8>
//           <Text white text70>
//             Objects may be closer than they appear
//           </Text>
//         </View>
//       );
//     }
//   };

//   renderCustomContent = () => {
//     const { selectedColor } = this.state;
//     const backgroundColor =
//       selectedColor === "none" ? undefined : selectedColor;

//     return (
//       <View flex padding-10 style={{ backgroundColor }}>
//         <Text white text60>
//           This is a custom content
//         </Text>
//         <Text white>
//           Lorem Ipsum is simply dummy text of the printing and typesetting
//           industry. Lorem Ipsum has been the industry standard dummy text ever
//           since the 1500s, when an unknown printer took a galley of type and
//           scrambled it to make a type specimen book.
//         </Text>
//       </View>
//     );
//   };

//   dismissTopToast = () => {
//     this.setState({ showTopToast: false });
//   };

//   dismissBottomToast = () => {
//     this.setState({ showToast: false });
//   };

//   dismissCustomToast = () => {
//     this.setState({ showCustomToast: false });
//   };

//   render() {
//     const {
//       showToast,
//       showTopToast,
//       showCustomToast,
//       selectedColor,
//       showLoader,
//       showDismiss,
//     } = this.state;
//     const backgroundColor =
//       selectedColor === "none" ? undefined : selectedColor;

//     return (
//       <View flex center bg-grey80 style={styles.container}>
//         <Toast
//           renderAttachment={this.renderBelowToast}
//           visible={this.state.showTopToast}
//           position={"top"}
//           backgroundColor={backgroundColor}
//           message="Toast with two lines of text. Toast with two lines of text"
//           onDismiss={this.dismissTopToast}
//           // autoDismiss={3000}
//           showDismiss={showDismiss}
//           // action={{iconSource: Assets.icons.x, onPress: () => console.log('dismiss')}}
//           showLoader={showLoader}
//         />
//         <Toast
//           renderAttachment={this.renderAboveToast}
//           visible={this.state.showToast}
//           position={"bottom"}
//           backgroundColor={backgroundColor}
//           message="Toast with one line of text"
//           icon={splashIcon}
//           onDismiss={this.dismissBottomToast}
//           // autoDismiss={3000}
//           showDismiss={showDismiss}
//           action={{ label: "Undo", onPress: () => console.log("undo") }}
//           showLoader={showLoader}
//         />
//         <Toast
//           visible={this.state.showCustomToast}
//           position={"bottom"}
//           onDismiss={this.dismissCustomToast}
//         >
//           {this.renderCustomContent()}
//         </Toast>

//         <View center>
//           <Text marginV-10 text60>
//             Toggle Toast
//           </Text>
//           <View center row marginB-10>
//             <Button
//               outline
//               size="medium"
//               label="TOP"
//               onPress={() => this.setState({ showTopToast: !showTopToast })}
//               marginR-10
//             />
//             <Button
//               outline
//               size="medium"
//               label="BOTTOM"
//               onPress={() =>
//                 this.setState({ showToast: !showToast, showCustomToast: false })
//               }
//               marginR-10
//             />
//             <Button
//               outline
//               size="medium"
//               label="CUSTOM"
//               onPress={() =>
//                 this.setState({
//                   showCustomToast: !showCustomToast,
//                   showToast: false,
//                 })
//               }
//             />
//           </View>
//           <Text marginV-10 text60>
//             Toast Background Color
//           </Text>
//           {this.renderColors()}
//           <View center row marginV-20>
//             <Button
//               outline
//               size="medium"
//               label="Show Loader"
//               onPress={() =>
//                 this.setState({ showLoader: !showLoader, showDismiss: false })
//               }
//               marginR-10
//             />
//             <Button
//               outline
//               size="medium"
//               label="Show Dismiss"
//               onPress={() =>
//                 this.setState({ showLoader: false, showDismiss: !showDismiss })
//               }
//             />
//           </View>
//           <View center row marginV-20>
//             <Button
//               outline
//               size="medium"
//               label="Toggle content above bottom toast"
//               onPress={() =>
//                 this.setState({ showContent: !this.state.showContent })
//               }
//             />
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {},
//   color: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     marginLeft: 5,
//   },
//   selected: {
//     borderWidth: 2,
//     borderColor: Colors.grey10,
//   },
// });
