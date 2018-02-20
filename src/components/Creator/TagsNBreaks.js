import React from "react";
import { View, ScrollView, Text, FlatList, TouchableOpacity } from "react-native";
import { Button } from 'react-native-elements';
import R from "ramda";

// components
import Submit from "src/components/Creator/Submit";
import { TagButton } from "src/components/Data/Details/Timer/BasicView/TagsTab";
import Tab from "src/components/Tab";

// Other
import { colorPrimary, colorSecondary, backgroundColor } from 'src/config/styles';

class Partial extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.prepareState(this.props);
  };

  componentWillReceiveProps(nextProps) {
    this.setState(this.prepareState(nextProps));
  };

  prepareState = props => {
    var allData, usedData;

    // TODO name props a little bit better?...
    if (props.update) {
      allData = props.data[props.header];
      usedDataIds = props.timerData[props.header];
    } else {
      allData = props.screenProps[props.header];
      usedDataIds = props.screenProps.data[props.header];
    }

    return {
      data: usedDataIds.map(id => R.find(R.propEq('id', id))(allData)),
      pickableData: allData.filter(obj => !usedDataIds.includes(obj.id))
    };
  };

  updateState = (obj, del = true) => {
    if (del) {
      this.setState(state => ({
        data: state.data.filter(iObj => iObj.id !== obj.id),
        pickableData: [...state.pickableData, obj]
      }))
    } else {
      this.setState(state => ({
        data: [...state.data, obj],
        pickableData: state.pickableData.filter(iObj => iObj.id !== obj.id)
      }))
    }
  };

  render() {
    const { mode, t } = this.props.screenProps;

    return (
      <Tab containerStyles={{flex: 1}} header={t(`${this.props.update ? "update" : "creation"}.${this.props.update || mode}.tagsNBreaks.headers.${this.props.header}`)}>
        <View style={{padding: 5, borderBottomWidth: 1, borderBottomColor: colorPrimary, marginBottom: 10}}>
          <ScrollView
            horizontal

          >
            {this.state.data.map(obj => (
              <View style={{marginRight: 5}} key={obj.id}>
                <TagButton
                  {...this.props}
                  tagData={obj}
                  active
                  onPress={() => this.updateState(obj)}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{flex: 1}}>
          <FlatList
            keyExtractor={item => item.id}
            data={this.state.pickableData}
            renderItem={({item}) => (
              <TagButton
                {...this.props}
                tagData={item}
                onPress={() => this.updateState(item, false)}
              />
            )}
          />
        </View>
      </Tab>
    );
  };
};

export default props => {
  const { mode, finishCreation, t, updateCreator } = props.screenProps;

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Partial
          {...props}
          header="tags"
          ref={tags => { this.tagsPartial = tags; }}
        />

        <Partial
          {...props}
          header="breaks"
          ref={breaks => { this.breaksPartial = breaks; }}
        />
      </View>

      <Submit
        {...props}
        hasBack={props.update ? null : () => props.changeComponent("Icon")}
        mainButtonText={t(`${props.update ? "update" : "creation"}.${props.update || mode}.tagsNBreaks.submit`)}
        mainOnPress={() => {
          if (props.update) {
            const onSuccess = () => {
              props.closeModal();
            };

            props.updateData(props.timerData.id, props.update, {
              breaks: this.breaksPartial.state.data.map(obj => obj.id),
              tags: this.tagsPartial.state.data.map(obj => obj.id)
            }, onSuccess);
          } else {
            updateCreator(mode, {
              breaks: this.breaksPartial.state.data.map(obj => obj.id),
              tags: this.tagsPartial.state.data.map(obj => obj.id)
            });

            finishCreation(mode, props);
          }
        }}
        isDisabled={false}
        containerStyles={{marginBottom: 10}}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 5
  },
  partial: {
    flex: 1,
    borderWidth: 1,
    borderColor: "red"
  }
};
