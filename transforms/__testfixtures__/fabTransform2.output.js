/* @flow */

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Portal } from 'react-native-paper';
import type { Theme } from 'react-native-paper/types';

type Props = {
  theme: Theme,
};

type State = {
  open: boolean,
};

class ButtonExample extends React.Component<Props, State> {
  static title = 'Floating Action Button';

  state = {
    open: false,
  };

  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    return (
      <Portal>
        <FAB.Group
          open={this.state.open}
          icon={this.state.open ? 'today' : 'add'}
          actions={[
            { icon: 'add', onPress: () => {} },
            { icon: 'star', label: 'Star', onPress: () => {} },
            { icon: 'email', label: 'Email', onPress: () => {} },
            { icon: 'notifications', label: 'Remind', onPress: () => {} },
          ]}
          onStateChange={({ open }) => this.setState({ open })}
          onPress={() => {
            if (this.state.open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },

  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fab: {
    margin: 8,
  },
});

export default withTheme(ButtonExample);
