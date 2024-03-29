﻿import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { routerReducer, routerMiddleware } from "react-router-redux";
import * as Card from "./Card";
import * as SideMenu from "./SideMenu";
import * as UserManagement from "./UserManagement";
import * as SearchStore from "./SearchStore";
import * as Classroom from "./Classroom";

export default function configureStore(history, initialState) {
  const reducers = {
    card: Card.reducer,
    sideMenu: SideMenu.reducer,
    userManagement: UserManagement.reducer,
    // clasroom: Classroom.reducer,
    searchStore: SearchStore.reducer,
  };

  const middleware = [thunk, routerMiddleware(history)];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === "development";
  if (
    isDevelopment &&
    typeof window !== "undefined" &&
    window.devToolsExtension
  ) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
