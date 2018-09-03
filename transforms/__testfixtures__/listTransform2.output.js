/* @flow */

import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List, Divider, withTheme } from 'react-native-paper';
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
        <List.Section title="Expandable list item">
          <List.Accordion icon="folder" title="Expandable list item">
            <List.Item title="List item 1" />
            <List.Item title="List item 2" />
          </List.Accordion>
        </List.Section>
        <Divider />
        <List.Section title="Expandable & multiline list item">
          <List.Accordion
            title="Expandable list item"
            description="Describes the expandable list item"
          >
            <List.Item title="List item 1" />
            <List.Item title="List item 2" />
          </List.Accordion>
        </List.Section>
        <Divider />
        <List.Section title="Expandable list with icons">
          <List.Accordion icon="star" title="Accordion item 1">
            <List.Item icon="thumb-up" title="List item 1" />
            <List.Item icon="thumb-down" title="List item 2" />
          </List.Accordion>
        </List.Section>
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
