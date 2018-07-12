/* @flow */

import * as React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Appbar, Colors, Switch, Paragraph, withTheme } from 'react-native-paper';

const initialParams = {
  showLeftIcon: true,
  showSubtitle: true,
  showSearchIcon: true,
  showMoreIcon: true,
};

const MORE_ICON = Platform.OS === 'ios' ? 'more-horiz' : 'more-vert';

class ToolbarExample extends React.Component {
  static title = 'Toolbar';
  static navigationOptions = ({ navigation }) => {
    const params = { ...initialParams, ...navigation.state.params };

    return {
      header: (
        <Appbar>
          {params.showLeftIcon && (
            <Appbar.BackAction onPress={() => navigation.goBack()} />
          )}
          <Appbar.Content
            title="Title"
            subtitle={params.showSubtitle ? 'Subtitle' : null}
          />
          {params.showSearchIcon && (
            <Appbar.Action icon="search" onPress={() => {}} />
          )}
          {params.showMoreIcon && (
            <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
          )}
        </Appbar>
      ),
    };
  };

  render() {
    const {
      navigation,
      theme: {
        colors: { background },
      },
    } = this.props;
    const params = { ...initialParams, ...navigation.state.params };

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: background,
          },
        ]}
      >
        <View style={styles.row}>
          <Paragraph>Left icon</Paragraph>
          <Switch
            value={params.showLeftIcon}
            onValueChange={value =>
              navigation.setParams({
                showLeftIcon: value,
              })
            }
          />
        </View>
        <View style={styles.row}>
          <Paragraph>Subtitle</Paragraph>
          <Switch
            value={params.showSubtitle}
            onValueChange={value =>
              navigation.setParams({
                showSubtitle: value,
              })
            }
          />
        </View>
        <View style={styles.row}>
          <Paragraph>Search icon</Paragraph>
          <Switch
            value={params.showSearchIcon}
            onValueChange={value =>
              navigation.setParams({
                showSearchIcon: value,
              })
            }
          />
        </View>
        <View style={styles.row}>
          <Paragraph>More icon</Paragraph>
          <Switch
            value={params.showMoreIcon}
            onValueChange={value =>
              navigation.setParams({
                showMoreIcon: value,
              })
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default withTheme(ToolbarExample);