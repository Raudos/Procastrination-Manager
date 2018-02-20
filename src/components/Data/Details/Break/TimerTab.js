import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import R from "ramda";
import { NavigationActions } from 'react-navigation';

// Components
import Tab from "src/components/Tab";

// Other
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles';

export default props => {
  const { t } = props.screenProps;
  const { data } = props;

  const filteredTimers = data.timers ? R.flatten(data.timers.map(timer => {
    if (timer[props.searchFor].filter(id => id === props.chosenData.id).length) {
      return timer;
    }
  })).filter(obj => obj) : [];

  return (
    <Tab containerStyles={{flex: 1}} header={`${t("data.breaks.timers.header")} ${t(`data.breaks.timers.${props.searchFor}`)}`} headerStyles={{marginBottom: 10}}>
      <View style={{flex: 1}}>
        {filteredTimers.length ?
          null

          :

          <Text>{t(`data.breaks.timers.placeholder.${data.timers && data.timers.length ? `data.${props.searchFor}` : "noData"}`)}</Text>
        }

        <FlatList
          keyExtractor={(item, index) => item.id}
          data={filteredTimers}
          renderItem={({ item }) => {
            const objTags = item.tags.map(id => {
              return data.tags.filter(obj => obj.id === id)[0];
            });

            return (
              <TouchableOpacity
                style={styles.timerContainer}
                onPress={() => {
                  props.navigation.navigate({ routeName: 'Timers', params: {id: item.id}})
                }}
              >
                <Icon
                  name={item.icon.icon}
                  type={item.icon.type}
                  color={accentColor}
                  size={60}
                  containerStyle={{alignItems: "flex-start"}}
                />

                <View style={{flex: 1, marginLeft: 20}}>
                  <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 5}}>{item.name}</Text>

                  <View style={{flex: 1, borderTopWidth: 1, borderTopColor: accentColor, flexDirection: "row", paddingTop: 5}}>
                    {objTags.map(obj => {
                      return (
                        <Icon
                          key={obj.id}
                          name={obj.icon.icon}
                          type={obj.icon.type}
                          color={accentColor}
                          size={30}
                          containerStyle={{marginRight: 10}}
                        />
                      )
                    })}
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </Tab>
  );
};

const styles = {
  timerContainer: {
    borderWidth: 2,
    borderColor: colorSecondary,
    backgroundColor: colorSecondary,
    borderRadius: 10,
    marginBottom: 10,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2
  }
};
