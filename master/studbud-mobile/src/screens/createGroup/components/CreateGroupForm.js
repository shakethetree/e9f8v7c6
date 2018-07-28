import React from "react";
import { View } from "react-native";
import { Field, reduxForm } from "redux-form";
import { Button } from "react-native-elements";

import { TextInputWithValidations } from "../../../commons";
import { createGroupValidations } from "../validations";
import Colors from "../../../../constants/Colors";
import styles from "./styles/CreateGroupForm";
import {
  FormInput,
  FormLabel,
  FormValidationMessage
} from "react-native-elements";
import TagInput from "react-native-tag-input";

/*const tagInput = ({ input: { onChange, value, text, tag, ...restInput }, label, meta: { touched, error }, ...custom }) => {
  return (
    <View>
      <FormLabel>{label}</FormLabel>
      <TagInput
        {...restInput}
        value={value}
        onChange={value.onChange}
        onChangeText={text}
        editable={true}
        labelExtractor={tag}
        text={text}
        />
    </View>

    
     Field
      component=tagInput
      name="tags"
      label="Tags"
      text="Hello"
    
  )
}*/

const CreateGroupForm = ({
  createGroup,
  handleSubmit,
  invalid,
  submitting
}) => (
  <View style={styles.container}>
    <Field
      component={TextInputWithValidations}
      name="name"
      label="Group Title"
      placeholder="Name your group..."
      selectionColor={Colors.redColor}
      containerStyle={styles.item}
      inputStyle={{
        width: undefined,
        height: undefined,
        paddingBottom: 5,
        paddingLeft: 3
      }}
      paddingBottom={5}
    />
    <Field
      component={TextInputWithValidations}
      name="description"
      label="Description"
      placeholder="Describe your group..."
      multiline
      selectionColor={Colors.redColor}
      containerStyle={styles.item}
      inputStyle={{
        width: undefined,
        height: undefined,
        paddingBottom: 10,
        paddingLeft: 3
      }}
      paddingBottom={20}
    />

    <View style={styles.buttonCreate}>
      <Button
        backgroundColor={Colors.$darkBlue}
        title="Create Group"
        raised
        disabled={invalid || submitting}
        onPress={handleSubmit(createGroup)}
      />
    </View>
  </View>
);

export default reduxForm({
  form: "createGroup",
  validate: createGroupValidations
})(CreateGroupForm);
