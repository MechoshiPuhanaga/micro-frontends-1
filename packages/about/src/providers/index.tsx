import { FC, createContext, useContext } from 'react';
import { Action } from 'redux';

const initialState: { actions: { [key: string]: Function } } = {
  actions: { deleteRepository: () => {}, searchRepositories: () => {} }
};

export const ActionsContext = createContext(initialState);

export type TChildren = (() => JSX.Element | JSX.Element[]) | JSX.Element | JSX.Element[];

export const DataProvider: FC<{ value: any; children: TChildren }> = ({ value, children }) => {
  return <ActionsContext.Provider value={value}>{children}</ActionsContext.Provider>;
};

export const useData = () => {
  return useContext(ActionsContext);
};
