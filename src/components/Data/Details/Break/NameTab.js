import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation'

// Components
import Tab from "src/components/Tab";
import ModalComponent from "src/components/Modal";
import NameCreator from "src/components/Creator/Name";
import IconCreator from "src/components/Creator/Icon";

// Other
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles';

const Triangle = props => (
  <View style={styles.playButton.container}>
    <View style={styles.playButton.triangle}>
      <View style={styles.playButton.iconContainer}>
        {props.screenProps.activeTimer ?
          null

          :

          <Icon
            size={35}
            name='trash'
            type='font-awesome'
            color='white'
            onPress={() => {
              // For some reason dispatch has a diffrent effect on application than navigation.goBack();
              // https://github.com/react-navigation/react-navigation/pull/2486
              props.deleteData(props.chosenData.id, `${props.mode || "break"}s`, () => props.navigation.dispatch(NavigationActions.back({
                key: null
              })));
            }}
          />
        }
      </View>
    </View>
  </View>
);

 export default class NameTab extends React.Component {
   render() {
     return (
       <Tab containerStyles={{flexDirection: "row", alignItems: "center"}}>
         <ModalComponent
           ref={modal => { this.modalComponent = modal; }}
         >
          <NameCreator {...this.props} update={this.props.mode === "tag" ? "updateTag" : "updateBreak"} />
         </ModalComponent>

         <ModalComponent
           ref={modal => { this.colorNIconModal = modal; }}
         >
          <IconCreator {...this.props} update={this.props.mode === "tag" ? "updateTag" : "updateBreak"} data={this.props.chosenData} />
         </ModalComponent>

         <Triangle {...this.props} />

         <View style={{alignItems: "flex-start", justifyContent: "center", padding: 10, marginRight: 10}}>
           <Icon
             name={this.props.chosenData.icon.icon}
             type={this.props.chosenData.icon.type}
             color={accentColor}
             size={80}
             onPress={() => this.colorNIconModal.openModal()}
           />
         </View>

         <View style={{flex: 1, justifyContent: "center"}}>
           <Text onPress={() => this.modalComponent.openModal()} style={{fontSize: 30}}>{this.props.chosenData.name}</Text>
         </View>
       </Tab>
     );
   };
 };

 const styles = {
   playButton: {
     container: {
       justifyContent: "flex-start",
       alignItems: "flex-start",
       position: "absolute",
       top: 0,
       right: 0
     },
     triangle: {
       borderTopWidth: 0,
       borderRightWidth: 80,
       borderBottomWidth: 80,
       borderLeftWidth: 0,
       borderTopColor: 'transparent',
       borderBottomColor: 'transparent',
       borderLeftColor: 'transparent',
       borderTopRightRadius: 10,
       borderRightColor: accentColor
     },
     iconContainer: {
       flex: 1,
       position: "absolute",
       zIndex: 10,
       alignSelf: "flex-end",
       paddingTop: 2,
       paddingRight: 5
     }
   }
 }
