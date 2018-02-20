import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

// Other
import { colorPrimary, colorSecondary, backgroundColor } from 'src/config/styles';

const Tab = props => (
  <View style={{...styles.container, ...props.containerStyles}}>
    {!props.header ?
      null

      :

      <View style={styles.headerContainer}>
        <Text style={{...styles.header, ...props.headerStyles}}>{props.header}</Text>

        {props.showRightIcon ?
          <Icon
            size={20}
            name={props.iconName || "edit"}
            type="font-awesome"
            color={colorPrimary}
            onPress={() => {
              props.onRightIconPress ? props.onRightIconPress() : null;
            }}
          />

          :

          null
        }
      </View>
    }

    {props.children}
  </View>
);

Tab.propTypes = {
  containerStyles: PropTypes.object,
  headerStyles: PropTypes.object,
  onRightIconPress: PropTypes.func
};

export default Tab;

const styles = {
  container: {
    backgroundColor,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
    elevation: 2
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  header: {
    fontWeight: "bold",
    fontSize: 15
  }
}
