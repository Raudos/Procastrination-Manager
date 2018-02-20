import React from "react";
import { View, Text, TextInput, Image, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

// Components
import Container from "src/components/Container";
import Tab from "src/components/Tab";
import Tooltip from "src/components/Creator/Tooltip";

// Other
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles';

const Start = props => {
  const { t } = props.screenProps;

  return (
    <Container {...props}>
      <View style={{flex: 1, padding: 5, justifyContent: "center"}}>
        <ScrollView>
          <Tab>
            <View style={{alignItems: "center", paddingVertical: 20}}>
              <Image
                style={{width: 150, height: 150, marginBottom: 10}}
                source={require('src/assets/images/logo.png')}
              />

              <Text style={{fontSize: 25}}>{t("start.welcome")}</Text>

              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={{fontSize: 15}}>{`${t('start.in')} `}</Text>
                <Text style={{fontSize: 15, fontWeight: "bold"}}>Procastrination Manager</Text>
              </View>

              <Text style={{marginTop: 5, paddingTop: 5, borderTopWidth: 0.5, borderTopColor: colorPrimary, paddingHorizontal: 10}}>
                {t("start.introduction")}
              </Text>
            </View>
          </Tab>

          <Tooltip header={t("start.timer.header")} icon="timer" text={t("start.timer.introduction")}/>

          <Tooltip header={t("start.break.header")} icon="pause-octagon-outline" text={t("start.break.introduction")}/>

          <Tooltip header={t("start.tag.header")} icon="barcode" text={t("start.tag.introduction")}/>
        </ScrollView>
      </View>
    </Container>
  );
};

Start.propTypes = {
  screenProps: PropTypes.shape({
    t: PropTypes.func.isRequired
  })
};

export default Start;
