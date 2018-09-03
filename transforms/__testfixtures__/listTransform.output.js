/* @flow */

import * as React from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import { List, Divider, withTheme } from 'react-native-paper';
import type { Theme } from 'react-native-paper/types';

type Props = {
  theme: Theme,
};

class ListSectionExample extends React.Component<Props> {
  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;
    return (
      <ScrollView style={[styles.container, { backgroundColor: background }]}>
        <List.Section title="Single line">
          <List.Item icon="event" title="List item 1" />
          <List.Item icon="redeem" title="List item 2" />
        </List.Section>
        <Divider />
        <List.Section title="Two line">
          <List.Item
            avatar={
              <Image
                source={require('../assets/email-icon.png')}
                style={styles.avatar}
              />
            }
            title="List item 1"
            description="Describes item 1"
          />
          <List.Item
            icon="info"
            avatar={
              <Image
                source={require('../assets/email-icon.png')}
                style={styles.avatar}
              />
            }
            title="List item 2"
            description="Describes item 2"
          />
        </List.Section>
        <Divider />
        <List.Section title="Three line">
          <List.Item
            avatar={
              <Image
                source={require('../assets/email-icon.png')}
                style={styles.avatar}
              />
            }
            title="List item 1"
            description="Describes item 1. Example of a very very long description."
          />
          <List.Item
            icon="star-border"
            avatar={
              <Image
                source={require('../assets/email-icon.png')}
                style={styles.avatar}
              />
            }
            title="List item 2"
            description="Describes item 2. Example of a very very long description."
          />
        </List.Section>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    height: 40,
    width: 40,
  },
});

export default withTheme(ListSectionExample);
