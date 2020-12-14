export const changeTodoItemState = 'changeTodoItemState';
export const AddTodoItem = 'AddTodoItem';
export const DeleteTodoItem = 'DeleteTodoItem';
export const ArchiveTodoItem = 'ArchiveTodoItem';
export const ReturnArchiveTodoItem = 'ReturnArchiveTodoItem';
export const UpdatePassword = 'UpdatePassword';

const initialState = {
  toDoList: [],
  toDoListArchived: [],
  ArchivedListPassword: '0000',
};

const TodoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case changeTodoItemState:
      state.toDoList.forEach((elm) => {
        if (elm.id === action.selectedTodoItem.id) {
          elm.isDone = !elm.isDone;
        }
      });
      return {
        toDoList: state.toDoList,
        toDoListArchived: state.toDoListArchived,
        ArchivedListPassword: state.ArchivedListPassword,
      };

    case AddTodoItem:
      state.toDoList = [action.newTodoItem, ...state.toDoList];
      return {
        toDoList: state.toDoList,
        toDoListArchived: state.toDoListArchived,
        ArchivedListPassword: state.ArchivedListPassword,
      };

    case DeleteTodoItem:
      state.toDoList = state.toDoList.filter((todoItem) => {
        return todoItem !== action.selectedTodoItem;
      });
      return {
        toDoList: state.toDoList,
        toDoListArchived: state.toDoListArchived,
        ArchivedListPassword: state.ArchivedListPassword,
      };

    case ArchiveTodoItem:
      state.toDoList = state.toDoList.filter((todoItem) => {
        return todoItem !== action.selectedTodoItem;
      });

      state.toDoListArchived = [
        action.selectedTodoItem,
        ...state.toDoListArchived,
      ];
      return {
        toDoList: state.toDoList,
        toDoListArchived: state.toDoListArchived,
        ArchivedListPassword: state.ArchivedListPassword,
      };

    case ReturnArchiveTodoItem:
      state.toDoListArchived = state.toDoListArchived.filter((todoItem) => {
        return todoItem !== action.selectedTodoItem;
      });

      state.toDoList = [action.selectedTodoItem, ...state.toDoList];
      return {
        toDoList: state.toDoList,
        toDoListArchived: state.toDoListArchived,
        ArchivedListPassword: state.ArchivedListPassword,
      };

    case UpdatePassword:
      state.ArchivedListPassword = action.newPassword;

      return {
        toDoList: state.toDoList,
        toDoListArchived: state.toDoListArchived,
        ArchivedListPassword: state.ArchivedListPassword,
      };

    default:
      return state;
  }
};

export default TodoListReducer;
