import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  AddTodoItem,
  ArchiveTodoItem,
  changeTodoItemState,
  DeleteTodoItem,
  ReturnArchiveTodoItem,
  UpdatePassword,
} from './Redux/TodoListReducer';
import DialogInput from 'react-native-dialog-input';

export default function Home() {
  const [currentTodoList, setcurrentTodoList] = useState('All Tasks');
  const [changePassword, setchangePassword] = useState(false);

  const TodoListReducer = useSelector((state) => state.TodoListReducer);
  const dispatch = useDispatch();
  const [addNewTodoPopUp, setaddNewTodoPopUp] = useState(false);

  const [archiveLock, setarchiveLock] = useState(false);

  //   Listen for toDoList change and update it
  useEffect(() => {
    settoDoList(
      TodoListReducer.toDoList.sort(function (a, b) {
        return a.isDone - b.isDone;
      }),
    );
    //filter not done first
  }, [TodoListReducer.toDoList]);
  // ---------------------

  useEffect(() => {
    settoDoListArchived(
      TodoListReducer.toDoListArchived.sort(function (a, b) {
        return a.isDone - b.isDone;
      }),
    );
    //filter not done first
  }, [TodoListReducer.toDoListArchived]);

  const [toDoListArchived, settoDoListArchived] = useState(
    TodoListReducer.toDoListArchived.sort(function (a, b) {
      return a.isDone - b.isDone;
    }),
  );
  console.log(toDoListArchived);

  const [toDoList, settoDoList] = useState(
    TodoListReducer.toDoList.sort(function (a, b) {
      return a.isDone - b.isDone;
    }),
  );
  return (
    <View style={{flex: 1, backgroundColor: '#F2F3F6'}}>
      {/* HEADER  */}
      <View
        style={{
          paddingVertical: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            currentTodoList === 'All Tasks'
              ? setarchiveLock(true)
              : setcurrentTodoList('All Tasks');
          }}>
          {currentTodoList === 'All Tasks' ? (
            <View>
              <Text style={{fontSize: 22, color: '#5CA8E0'}}>🔒</Text>
            </View>
          ) : (
            <Text style={{fontSize: 22, color: '#5CA8E0'}}>◀</Text>
          )}
        </TouchableOpacity>

        <View style={{flex: 1, alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              color: '#130f40',
              fontWeight: 'bold',
            }}>
            {currentTodoList}
          </Text>
        </View>
      </View>

      {currentTodoList === 'All Tasks' ? (
        <View />
      ) : (
        <TouchableOpacity
          onPress={() => {
            setchangePassword(true);
          }}
          style={{paddingVertical: 5, alignSelf: 'center'}}>
          <Text style={{color: '#5CA8E0'}}>change password</Text>
        </TouchableOpacity>
      )}

      {/* LIST OF OUR TODO LISTs */}
      <FlatList
        style={{}}
        keyExtractor={(item) => item.id}
        data={currentTodoList === 'All Tasks' ? toDoList : toDoListArchived}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onLongPress={() => {
                currentTodoList === 'All Tasks'
                  ? Alert.alert(
                      'todo item option',
                      'Would you like to archive it , or delete it permently ?',
                      [
                        {
                          text: 'delete',
                          onPress: () => {
                            dispatch({
                              type: DeleteTodoItem,
                              selectedTodoItem: item,
                            });
                          },
                        },

                        {
                          text: 'archive',
                          onPress: () => {
                            dispatch({
                              type: ArchiveTodoItem,
                              selectedTodoItem: item,
                            });
                          },
                        },
                        {
                          text: 'cancel',
                        },
                      ],
                    )
                  : console.log('');
              }}
              onPress={() => {
                currentTodoList === 'All Tasks'
                  ? dispatch({
                      type: changeTodoItemState,
                      selectedTodoItem: item,
                    })
                  : Alert.alert(
                      'archived todo',
                      'would you like to return this item to all task list ? ',
                      [
                        {
                          text: 'cancel',
                        },
                        {
                          text: 'yes',
                          onPress: () => {
                            dispatch({
                              type: ReturnArchiveTodoItem,
                              selectedTodoItem: item,
                            });
                          },
                        },
                      ],
                    );
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  marginVertical: '2%',
                  paddingHorizontal: '5%',
                  paddingVertical: '5%',
                  borderRadius: 50,
                  flexDirection: 'row',
                  marginHorizontal: '3%',
                  // SHOW
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}>
                <Text
                  style={{
                    flex: 1,
                    color: '#86888E',
                    fontSize: 17,

                    textDecorationLine: item.isDone ? 'line-through' : 'none',
                  }}>
                  {item.todoTitle}
                </Text>
                {item.isDone ? (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch({
                        type: changeTodoItemState,
                        selectedTodoItem: item,
                      });
                    }}
                    style={{
                      backgroundColor: '#37D7B2',
                      height: 25,
                      width: 25,
                      borderRadius: 25 / 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                      // SHOWDOW
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                    }}>
                    <Text style={{color: 'white'}}> ✓ </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch({
                        type: changeTodoItemState,
                        selectedTodoItem: item,
                      });
                    }}
                    style={{
                      backgroundColor: 'white',
                      height: 25,
                      width: 25,
                      borderRadius: 25 / 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                      // SHOWDOW
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,

                      elevation: 5,
                    }}></TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {toDoList.length === 0 ? (
        <View style={{flex: 1, alignSelf: 'center', width: '80%'}}>
          <Text>
            Your list is empty , start by creating your first todo item. Click
            on the plus button
          </Text>
        </View>
      ) : (
        <View />
      )}

      {currentTodoList === 'All Tasks' ? (
        <View>
          {/* WHITE BACKGROUND FOR ADD NEW TODO BUTTON */}
          <View
            style={{
              backgroundColor: 'white',
              shadowColor: '#000',

              height: 40,
            }}
          />
          {/* ADD NEW TODO BUTTON */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#5CA8E0',
                height: 70,
                width: 70,
                borderRadius: 70 / 2,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: '1%',
                // SHADOW
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 50,
              }}
              onPress={() => {
                setaddNewTodoPopUp(true);
              }}>
              <Text style={{color: 'white', fontSize: 35}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View />
      )}

      <DialogInput
        isDialogVisible={addNewTodoPopUp}
        title={'Add more'}
        message={'Enter the Title of the new todo item '}
        hintInput={'eg , Pray maghrib'}
        submitInput={(inputText) => {
          const newTodoItem = {
            todoTitle: inputText,
            id: Math.random() + Date.now().toString(),
            isDone: false,
          };
          if (inputText !== '') {
            dispatch({
              type: AddTodoItem,
              newTodoItem: newTodoItem,
            });
            setaddNewTodoPopUp(false);
          }
        }}
        closeDialog={() => setaddNewTodoPopUp(false)}></DialogInput>

      <DialogInput
        isDialogVisible={archiveLock}
        title={'Password'}
        message={
          'In order to access archived list you must enter your password '
        }
        hintInput={
          TodoListReducer.ArchivedListPassword === '0000'
            ? 'default : 0000'
            : 'pleas enter your password'
        }
        submitInput={(inputText) => {
          const pswrd = TodoListReducer.ArchivedListPassword;
          console.log({pswrd});
          if (inputText.toString() === TodoListReducer.ArchivedListPassword) {
            setarchiveLock(false);
            setcurrentTodoList('Archived Tasks');
          } else {
            alert('wrong password ! try again ');
          }
        }}
        closeDialog={() => setarchiveLock(false)}></DialogInput>

      <DialogInput
        isDialogVisible={changePassword}
        title={'Change Password'}
        hintInput={'new password'}
        submitInput={(inputText) => {
          dispatch({
            type: UpdatePassword,
            newPassword: inputText,
          });

          setchangePassword(false);
          alert('Password has been changed succesfuly ! ');
        }}
        closeDialog={() => setchangePassword(false)}></DialogInput>
    </View>
  );
}
