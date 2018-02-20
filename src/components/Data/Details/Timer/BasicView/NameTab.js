import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

// Components
import ModalComponent from "src/components/Modal";
import NameCreator from "src/components/Creator/Name";
import IconCreator from "src/components/Creator/Icon";

// Other
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles';

const PlayButton = props => (
  <View style={styles.playButton.container}>
    <View style={styles.playButton.triangle}>
      {props.active ?
        null

        :

        <TouchableOpacity style={styles.playButton.iconContainer} onPress={() => props.activateTimer(props.timerData.id)}>
          <Icon
            size={40}
            name='play-circle-o'
            type='font-awesome'
            color={backgroundColor}
          />
        </TouchableOpacity>
      }
    </View>
  </View>
);

// class used because of refs
 export default class NameTab extends React.Component {
   render() {
     return (
       <View style={styles.container}>
         <ModalComponent
           ref={modal => { this.nameModal = modal; }}
         >
          <NameCreator {...this.props} update="updateTimer" />
         </ModalComponent>

         <ModalComponent
           ref={modal => { this.colorNIconModal = modal; }}
         >
          <IconCreator {...this.props} update="updateTimer" />
         </ModalComponent>

         {this.props.active ?
           null

           :

           <Icon
             size={20}
             name="trash"
             type='font-awesome'
             color={colorPrimary}
             onPress={() => this.props.deleteData(this.props.timerData.id, "timers", () => this.props.navigation.goBack())}
             containerStyle={{position: "absolute", top: 5, left: 5}}
           />
         }

         <PlayButton {...this.props} />

         <View style={{alignItems: "flex-start", justifyContent: "center", padding: 10, marginRight: 10}}>
           <Icon
             name={this.props.timerData.icon.icon}
             type={this.props.timerData.icon.type}
             color={accentColor}
             size={100}
             onPress={() => this.colorNIconModal.openModal()}
           />
         </View>

         <View style={{flex: 1, justifyContent: "center"}}>
           <Text onPress={() => this.nameModal.openModal()} style={{fontSize: 30}}>{this.props.timerData.name}</Text>
         </View>
       </View>
     )
   }
 }

 const styles = {
   playButton: {
     container: {
       justifyContent: "flex-start",
       alignItems: "flex-start",
       position: "absolute",
       top: 0,
       right: 0,
       elevation: 2
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
   },
   container: {
     flexDirection: "row",
     backgroundColor: "white",
     borderRadius: 10,
     marginBottom: 10,
     padding: 5,
     elevation: 2
   }
 }
