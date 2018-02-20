import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Flag from 'react-native-round-flags';
import i18n from 'i18next';
import { Icon } from 'react-native-elements';

// Components
import Tab from "src/components/Tab";

// Other
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles'

const LanguageButton = props => {
  if (props.lang === props.currentLang) {
    return (
      <View style={{backgroundColor: colorSecondary, flexDirection: "row", alignItems: "center", padding: 5}}>
        <Flag code={props.lang}/>

        <Text style={{color: colorPrimary, marginLeft: 10, fontWeight: "bold", fontSize: 20}}>{props.lang}</Text>

        <View style={{flex: 1}}/>

        <Icon
          name="check"
          type="font-awesome"
          color={accentColor}
          size={30}
        />
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={() => props.changeOptions({lang: props.lang}, () => i18n.changeLanguage(props.lang))} style={{flexDirection: "row", alignItems: "center", padding: 5}}>
      <Flag code={props.lang}/>

      <Text style={{color: colorPrimary, fontSize: 20, marginLeft: 10}}>{props.lang}</Text>
    </TouchableOpacity>
  );
};


const languages = [
  "PL",
  "GB"
];
//  "FI"

export default props => {
  return (
    <Tab header={props.screenProps.t("options.language.header")}>
      <View style={{marginTop: 5, paddingTop: 10, borderTopWidth: 0.5, borderTopColor: colorPrimary}}>
        {languages.map(lang => <LanguageButton lang={lang} key={lang} currentLang={props.screenProps.options.lang} changeOptions={props.screenProps.changeOptions} />)}
      </View>
    </Tab>
  );
}
