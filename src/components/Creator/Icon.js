import React from "react";
import { View, Text, TouchableOpacity, Dimensions, FlatList, TextInput } from "react-native";
import R from "ramda";
import { Icon } from 'react-native-elements';

// Components
import Sorter from "src/components/Sorter";
import Submit from "src/components/Creator/Submit";
import Tab from "src/components/Tab";

// Other
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles';
import Icons from "src/config/icons";

const GetTimerStyles = (Dimensions, sorting) => {
  const margin = 10;
  const square = Dimensions.width / sorting - margin;

  return {
    width: square,
    height: square,
    backgroundColor: colorSecondary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  };
};

class IconButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getState(this.props);
  };

  componentWillReceiveProps(nextProps) {
    this.setState(this.getState(nextProps));
  };

  getState(props) {
    return {
      isHighlighted: props.picked && props.picked.icon === props.data.icon && props.picked.type === props.data.type
    };
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isHighlighted !== nextState.isHighlighted;
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.pickIcon(this.props.data)}
        style={Object.assign({}, this.props.styles, this.state.isHighlighted ? styles.highlighted : {})}
      >
        {this.state.isHighlighted ?
          <View style={styles.highlightedBall}/>

          :

          null
        }

        <Icon
          name={this.props.data.icon}
          type={this.props.data.type}
          color={accentColor}
          size={this.props.styles.width - 20}
        />
      </TouchableOpacity>
    );
  }
}

const Row = props => (
  <View style={{flexDirection: "row", justifyContent: 'space-around', marginBottom: 10}}>
    {props.icons.map((val, index2) => <IconButton key={`${val.icon}-${val.type}`} data={val} {...props} />)}
  </View>
);

const CurrentIcon = props => {
  if (props.data) {
    return (
      <View style={{flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: colorSecondary, backgroundColor: colorSecondary, borderRadius: 10, padding: 5}}>
        <Icon
          name={props.data.icon}
          type={props.data.type}
          color={accentColor}
          size={50}
        />

        <View style={{marginLeft: 10}}>
          <View style={{flexDirection: 'row', alignItems: "center"}}>
            <Text style={{fontWeight: "bold", marginRight: 5}}>Name:</Text>
            <Text>{props.data.icon}</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: "center"}}>
            <Text style={{fontWeight: "bold", marginRight: 5}}>Type:</Text>
            <Text>{props.data.type}</Text>
          </View>
        </View>
      </View>
    )
  }

  return null;
};

export default class IconPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sorting: 5,
      filter: "",
      icon: this.prepareStateIcon(this.props)
    };
  };

  componentWillReceiveProps(nextProps) {
    this.setState({icon: this.prepareStateIcon(nextProps)});
  };

  prepareStateIcon = props => {
    if (props.update) {
      return props.chosenData.icon;
    }

    return props.screenProps.data.icon;
  };

  // changeSorting = int => {
  //   this.setState({
  //     sorting: int
  //   });
  // };

  pickIcon = picked => {
    this.setState({
      icon: picked
    });
  };

  render() {
    const { mode, updateCreator, t, finishCreation } = this.props.screenProps;
    const dim = Dimensions.get("window");
    const preparedIcons = R.flatten(Icons.map(obj => {
      return obj.icons.map(icon => ({icon, type: obj.type, fullName: `${icon}_${obj.type}`}));
    })).filter(obj => obj.icon.toLowerCase().includes(this.state.filter.toLowerCase()));
    const sortedArray = R.splitEvery(this.state.sorting, preparedIcons);

    if (this.props.update) {
      return (
        <View style={{flex: 1}}>
          <Tab containerStyles={{flex: 1}}>
            <Sorter {...this.state} hideSorter>
              <View style={{flex: 1}}>
                <TextInput
                  style={{padding: 0, color: backgroundColor, margin: 0}}
                  onChangeText={text => this.setState({filter: text})}
                  value={this.state.filter}
                  placeholder={t(`update.${this.props.update}.icon.filter`)}
                  placeholderTextColor={backgroundColor}
                  underlineColorAndroid={colorPrimary}
                />
              </View>
            </Sorter>

            <CurrentIcon data={this.state.icon} />

            <View style={{flex: 1, marginTop: 5}}>
              <FlatList
                keyExtractor={(item, index) => JSON.stringify(item)}
                data={sortedArray}
                renderItem={({ item }) => <Row icons={item} styles={GetTimerStyles(dim, this.state.sorting)} picked={this.state.icon} pickIcon={this.pickIcon} />}
              />
            </View>
          </Tab>

          <Submit
            {...this.props}
            mainButtonText={this.props.screenProps.t(`update.${this.props.update}.icon.submit`)}
            mainOnPress={() => {
              this.props.updateData(this.props.chosenData.id, this.props.update, {icon: this.state.icon}, () => this.props.closeModal());
            }}
          />
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <Sorter {...this.state} hideSorter>
          <View style={{flex: 1}}>
            <TextInput
              style={{padding: 0, color: backgroundColor, margin: 0}}
              onChangeText={text => this.setState({filter: text})}
              value={this.state.filter}
              placeholder={t(`creation.${mode}.icon.filter`)}
              placeholderTextColor={backgroundColor}
              underlineColorAndroid={colorPrimary}
            />
          </View>
        </Sorter>

        <Tab containerStyles={{margin: 5, flex: 1}} header={this.state.icon ? "" : this.props.screenProps.t(`creation.${mode}.icon.header`)}>
          <CurrentIcon data={this.state.icon} />

          <View style={{flex: 1, marginTop: 5}}>
            <FlatList
              keyExtractor={(item, index) => JSON.stringify(item)}
              data={sortedArray}
              renderItem={({ item }) => <Row icons={item} styles={GetTimerStyles(dim, this.state.sorting)} picked={this.state.icon} pickIcon={this.pickIcon} />}
            />
          </View>
        </Tab>

        <Submit
          {...this.props}
          mainButtonText={this.props.screenProps.t(`creation.${mode}.icon.submit`)}
          hasBack={() => this.props.changeComponent("Name")}
          mainOnPress={() => {
            updateCreator(mode, {icon: this.state.icon}, () => {
              if (mode !== "TimerCreator") {
                finishCreation(mode, this.props);
              } else {
                this.props.changeComponent("TagsNBreaks");
              }
            })
          }}
          isDisabled={!this.state.icon}
          containerStyles={{marginBottom: 10}}
        />
      </View>
    );
  };
};

const styles = {
  highlighted: {
    borderWidth: 2,
    borderColor: colorPrimary
  },
  highlightedBall: {
    backgroundColor: colorPrimary,
    width: 10,
    height: 10,
    position: "absolute",
    top: 5,
    right: 5,
    borderRadius: 50
  }
};
