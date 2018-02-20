import React from 'react';
import { View, Text } from 'react-native';
import { ColorPicker, toHsv, fromHsv } from 'react-native-color-picker';

// Components
import Submit from "src/components/Creator/Submit";
import Tab from "src/components/Tab";

export default class ColorPickerComponent extends React.Component {
  render() {
    const { data, updateCreator, mode, finishCreation, t } = this.props.screenProps;

    if (this.props.update) {
      return (
        <ColorPicker
          defaultColor={this.props.chosenData.color}
          ref={(picker) => { this.colorPicker = picker; }}
          style={{flex: 1}}
        />
      );
    }

    return (
      <View style={{flex: 1}}>
        <Tab containerStyles={{margin: 5, flex: 1}} header={t(`creation.${mode}.color.header`)}>
          <ColorPicker
            defaultColor={data.color}
            ref={(picker) => { this.colorPicker = picker; }}
            style={{flex: 1}}
          />
        </Tab>

        <Submit
          {...this.props}
          mainButtonText={t(`creation.${mode}.color.submit`)}
          hasBack
          mainOnPress={() => {
            updateCreator(mode, {color: fromHsv(this.colorPicker.state.color)})

            if (mode !== "TimerCreator") {
              finishCreation(mode, this.props);
            } else {
              this.props.navigation.navigate("TagsNBreaks");
            }
          }}
          containerStyles={{marginBottom: 10}}
        />
      </View>
    );
  }
}
