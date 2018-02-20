import React from "react";
import { View, Text, Keyboard, ScrollView } from "react-native";

// Components
import Input from "src/components/Input";
import Submit from 'src/components/Creator/Submit';
import TimePicker from "src/components/Creator/TimePicker";
import Tab from "src/components/Tab";
import Tooltip from "src/components/Creator/Tooltip";

// Other
import { colorPrimary, colorSecondary, backgroundColor } from 'src/config/styles';

const icons = {
  TimerCreator: "timer",
  BreakCreator: "pause-octagon-outline",
  TagCreator: "barcode"
};

export default class Name extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.prepareState(this.props);
  };

  componentWillReceiveProps(nextProps) {
    this.setState(this.prepareState(nextProps))
  };

  prepareState = props => {
    if (props.update) {
      return {
        name: props.chosenData.name,
        id: props.chosenData.id
      };
    }

    return {
      name: props.screenProps.data.name
    };
  };

  onCreationFinish = transition => {
    const { mode, updateCreator } = this.props.screenProps;

    var createdData = {
      name: this.state.name
    };

    if (mode === "BreakCreator") {
      createdData.time = this.timepickerComponent.state.minutes * 60 + this.timepickerComponent.state.hours * 60 * 60;
    }

    updateCreator(mode, createdData);

    if (transition) {
      this.props.changeComponent("Icon");
      Keyboard.dismiss();
    }
  };

  onUpdateFinish = () => {
    const { updateData, update } = this.props;

    const onSuccess = () => {
      this.props.closeModal();
      Keyboard.dismiss();
    };

    var updatedData = {
      name: this.state.name
    };

    if (update === "updateBreak") {
      updatedData.time = this.timepickerComponent.state.minutes * 60 + this.timepickerComponent.state.hours * 60 * 60;
    }

    updateData(this.state.id, update, updatedData, onSuccess);
  };

  render() {
    const { data, mode, updateCreator, updateData } = this.props.screenProps;

    if (this.props.update) {
      return (
        <View style={styles.container}>
          <Tab header={this.props.screenProps.t(`update.${this.props.update}.name.header`)}>
            <Input
              placeholderText={this.props.screenProps.t(`update.${this.props.update}.name.placeholder`)}
              stateField="name"
              value={this.state.name}
              onChangeText={name => this.setState({name})}
              onFinish={this.onUpdateFinish}
            />
          </Tab>

          {this.props.update === "updateBreak" ?
            <TimePicker
              {...this.props}
              update={this.props.update}
              ref={timePicker => { this.timepickerComponent = timePicker }}
            />

            :

            null
          }

          <View style={{flex: 1}} />

          <Submit
            {...this.props}
            mainButtonText={this.props.screenProps.t(`update.${this.props.update}.name.submit`)}
            mainOnPress={this.onUpdateFinish}
            isDisabled={!this.state.name}
            containerStyles={{marginBottom: 10}}
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <Tooltip icon={icons[mode]} text={this.props.screenProps.t(`tooltips.creation.${mode}`)} />

          <Tab header={this.props.screenProps.t(`creation.${mode}.name.header`)}>
            <View style={{marginTop: 5, paddingTop: 5, borderTopWidth: 0.5, borderTopColor: colorPrimary}}>
              <Input
                placeholderText={this.props.screenProps.t(`creation.${mode}.name.placeholder`)}
                stateField="name"
                value={this.state.name}
                onChangeText={name => this.setState({name})}
                onFinish={() => this.onCreationFinish(false)}
              />
            </View>

          </Tab>

          {mode === "BreakCreator" ?
            <TimePicker
              {...this.props}
              ref={timePicker => { this.timepickerComponent = timePicker }}
            />

            :

            null
          }

          <View style={{flex: 1}} />
        </ScrollView>

        <Submit
          {...this.props}
          mainButtonText={this.props.screenProps.t(`creation.${mode}.name.submit`)}
          mainOnPress={() => this.onCreationFinish(true)}
          isDisabled={!this.state.name}
          containerStyles={{marginBottom: 10, marginTop: 10}}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    padding: 5
  }
};
