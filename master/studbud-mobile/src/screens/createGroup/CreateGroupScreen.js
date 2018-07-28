import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { Icon } from 'native-base';
import { FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';

import { TextInputWithValidations } from '../../commons';
import { createGroupValidations } from './validations';
import { CreateGroupForm } from './components';
import { LoadingScreen } from '../../commons';
import { createGroup } from './actions';
import Colors from '../../../constants/Colors';
import styles from './styles/CreateGroupScreen';

@connect(
  state => ({
    group: state.createGroup,
  }),
  { createGroup }
)
@reduxForm({
  form: 'createGroup',
  validate: createGroupValidations
})
export default class CreateGroupScreen extends Component {
  state = {
    //isFocused: true
    isDateTimePickerVisible: false,
    name: '',
    description: '',
  }

// Don't want to allow user to submit group without filling out required fields
_checkIfButtonSubmitDisabled() {
  const { name, description } = this.state;

  if (name.length > 5 && description.length > 5) {
    return false;
  }
  return true;
}

_createGroup = async values => {
  await this.props.createGroup(values);
  this.props.navigation.goBack();
}

  render() {
    const {
      group,
    } = this.props;
    if (group.isLoading) {
      return (
        <View style={styles.root}>
          <LoadingScreen />
        </View>
      );
    } else if (group.error.on) {
      return (
        <View style={styles.root}>
          <Text>{group.error.message}</Text>
        </View>
      );
    }
    return (
      <View style={styles.root}>
          <Text>Hello</Text>
          <CreateGroupForm
          createGroup={this._createGroup}
        />
      </View>
    )
  }
}
