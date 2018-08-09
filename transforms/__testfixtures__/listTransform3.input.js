/* @flow */

import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  ListAccordion,
  ListItem,
  Divider,
  withTheme,
} from 'react-native-paper';
import type { Theme } from 'react-native-paper/types';

type Props = {
  theme: Theme,
};

class ListAccordionExample extends React.Component<Props> {
  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;
    return (
      <ScrollView style={[styles.container, { backgroundColor: background }]}>
        <ListAccordion icon="folder" title="Expandable list item">
          <ListItem title="List item 1" />
          <ListItem title="List item 2" />
        </ListAccordion>
        <Divider />
        <ListAccordion
          title="Expandable list item"
          description="Describes the expandable list item"
        >
          <ListItem title="List item 1" />
          <ListItem title="List item 2" />
        </ListAccordion>
        <Divider />
        <ListAccordion icon="star" title="Accordion item 1">
          <ListItem icon="thumb-up" title="List item 1" />
          <ListItem icon="thumb-down" title="List item 2" />
        </ListAccordion>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withTheme(ListAccordionExample);