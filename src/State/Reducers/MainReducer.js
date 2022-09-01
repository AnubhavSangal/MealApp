import { getData } from "../API";

export const getDataReducer = async (foodType,updateState,setIsLoading,rateType,priceType,setData) => {
  setIsLoading(true);
  try {
    const res = await getData(foodType);
    updateState(res.data);
    formatDataReducer(rateType,priceType,res.data,setData);
  } catch (e) {
    console.log(e);
  } finally {
    setIsLoading(false);
  }
};

function checkPrice(price,item) {
  if(price[0] === -1 && price[1] === -1) {
    return true;
  }
  if(price[0] === -1) {
    if(item.price < price[1]) {
      return true;
    }else {
      return false;
    }
  }
  if(price[1] === -1) {
    if(item.price > price[0]) {
      return true;
    }else {
      return false;
    }
  }
  if(item.price <= price[0] && item.price >= price[0]) {
    return true;
  }else {
    return false;
  }
}

function checkRate(rate,item) {
  if(item.rate >= rate) {
    return true;
  }else {
    return false;
  }
}

export const formatDataReducer = (rateType,priceType,allData,setData) => {
  const Data = [];
  for(const item of allData) {
    if(checkPrice(priceType,item) && checkRate(rateType,item)) {
      Data.push(item);
    }
  }
  setData(Data);
}

export const addItemReducer = (item,selectedItems,setSelectedItems) => {
  const tempItems = selectedItems;
  tempItems.push(item);
  setSelectedItems(tempItems);
}

export const deleteItemReducer = (index, selectedItems, setSelectedItems) => {
  console.log(index)
  const tempItems = [];
  for(const item of selectedItems) {
    tempItems.push(item);
  }
  tempItems.splice(index,1);
  setSelectedItems(tempItems);
  console.log(selectedItems);
}