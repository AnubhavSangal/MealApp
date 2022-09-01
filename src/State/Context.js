import React, { createContext, useReducer, useState } from "react";
import { getDataReducer, formatDataReducer, addItemReducer, deleteItemReducer } from "./Reducers/MainReducer";
import { GET_DATA, CHANGE_FOOD, CHANGE_RATE, CHANGE_PRICE, ADD_ITEM, DELETE_ITEM } from "./Types";

export const ContextProvider = createContext();

const initialValues = {};

const Context = (props) => {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [foodType, setFoodType] = useState("Burgers");
  const [rateType, setRateType] = useState(0);
  const [priceType, setPriceType] = useState([-1,-1])

  const reducer = (state, action) => {
    switch (action.type) {
      case GET_DATA:
        getDataReducer(foodType,setAllData,action.setIsLoading,rateType,priceType,setData);
        break;
    
      case CHANGE_FOOD:
        setFoodType(action.food);
        formatDataReducer(rateType,priceType,allData,setData);
        break;

      case CHANGE_RATE:
        formatDataReducer(action.rate,priceType,allData,setData);
        setRateType(action.rate);
        break;
      
      case CHANGE_PRICE:
        formatDataReducer(rateType,action.price,allData,setData);
        setPriceType(action.price)
        break;
      case ADD_ITEM:
        addItemReducer(action.item,selectedItems, setSelectedItems);
        break;
      case DELETE_ITEM:
        deleteItemReducer(action.index,selectedItems,setSelectedItems);
        break;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialValues);

  return (
    <ContextProvider.Provider value={{ dispatch, data, foodType, selectedItems }}>
      {props.children}
    </ContextProvider.Provider>
  );
};

export default Context;
