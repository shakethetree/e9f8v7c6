import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import createStackNavigator from '../../../routes/Navigator';
import styles from './styles/MyGroupsList';
import { Card, ListItem } from 'react-native-elements';

const MyGroupsList = ({ groups, navigation }) => (
  <View style={styles.root}>
    
    <View style={styles.contentContainer}>
      <ScrollView vertical>
        {groups.map((group, i) => (
          <TouchableWithoutFeedback key={i} onPress={() => navigation.navigate('CreateMeetup')}>

          {/*<View key={i}  style={styles.meetupCard}>*/}
          <View key={i}>
            <Card title={group.name} style={styles.groupCard}>
              <View>
                <Text>
                {group.description}
                </Text>
              </View>
            </Card>

            {/*<View style={styles.meetupCardTopContainer}>
              <Text style={styles.meetupCardTitle}>
                {group.name}
              </Text>
            </View>

            <View style={styles.meetupCardBottomContainer}>
              <Text style={styles.meetupCardMetaName}>
                {group.description}
              </Text>
              <Text style={styles.meetupsCardMetaDate}>
                hiiiii
              </Text>
            </View>*/}


          </View>
        </TouchableWithoutFeedback>

        )).reverse()}
      </ScrollView>
    </View>
  </View>
);

export default MyGroupsList;
