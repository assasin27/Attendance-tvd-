import React, { Component } from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SummaryScreen from '../screens/SummaryScreen';
import db from '../config';

export default class HomeScreen extends Component {
  constructor() {
    super();

    this.state = {
      all_students: [],
      presentPressedList: [],
      absentPressedList: [],
    };
  }

  componentDidMount = async () => {
    var class_ref = await db.ref('/').on('value', (data) => {
      var all_students = [];
      var class_a = data.val();
      for (var i in class_a) {
        all_students.push(class_a[i]);
      }
      all_students.sort(function (a, b) {
        return a.roll_no - b.roll_no;
      });
      this.setState({ all_students: all_students });
      console.log(all_students);
    });
  };

  updateAttendance(roll_no, status) {
    var id = '';
    if (roll_no <= 6) {
      id = '0' + roll_no;
    } else {
      id = roll_no;
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    today = dd + '-' + mm + '-' + yyyy;

    var ref_path = id;
    var class_ref = db.ref(ref_path);
    class_ref.update({
      [today]: status,
    });
  }

  render() {
    var all_students = this.state.all_students;
    if (all_students.length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No Student Found</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={{ flex: 3 }}>
            {all_students.map((
              student,
              index
            ) => (
              <View key={index} style={styles.studentChartContainer}>
                <View
                  key={'name' + index}
                  style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginRight: 10,
                    }}>
                    {student.roll_no}.
                  </Text>
                  <Text style={{ fontSize: 20, fontWeight: 'bold',color:'purple' }}>
                    {student.name}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <TouchableOpacity 
                    style={
                      this.state.presentPressedList.includes(index)
                        ? [styles.presentButton, { backgroundColor: 'green' }]
                        : styles.presentButton
                    }
                    onPress={() => {
                      var presentPressedList = this.state.presentPressedList;
                      presentPressedList.push(index);
                      this.setState({ presentPressedList: presentPressedList });
                      var roll_no = index + 1;
                      this.updateAttendance(roll_no, 'present');
                    }}>
                    <Text>Present</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={
                      this.state.absentPressedList.includes(index)
                        ? [styles.absentButton, { backgroundColor: 'red' }]
                        : styles.absentButton
                    }
                    onPress={() => {
                      var absentPressedList = this.state.absentPressedList;
                      absentPressedList.push(index);
                      this.setState({ absentPressedList: absentPressedList });
                      var roll_no = index + 1;
                      this.updateAttendance(roll_no, 'absent');
                    }}>
                    <Text>Absent</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={{ flex: 1 }}>
              <TouchableOpacity 
                style={styles.footer}
                onPress={() => {
                  this.props.navigation.navigate('SummaryScreen');
                }}>
                <Text style={styles.text}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:25
  },
  studentChartContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    margin: 10,
  },
  presentButton: {
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 4,
  },
  absentButton: {
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 67,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgreen',
  },

  text:{
    fontSize: 20, fontWeight: 'bold' 
  }
});
