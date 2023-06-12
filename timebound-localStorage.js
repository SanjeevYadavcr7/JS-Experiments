// creating time-bound localstorage

window.timeBoundLocalStorage = {
    setItem: function (key, value, expiryTime) {
      const timeBoundValue = {
        value,
        expiryTime: Date.now() + expiryTime
      };
      localStorage.setItem(key, JSON.stringify(timeBoundValue));
      console.log("Item saved to localStorage");
    },
  
    getItem: function (key) {
      const item = JSON.parse(localStorage.getItem(key));
      if (item.expiryTime <= Date.now()) {
        localStorage.removeItem(key);
        return null;
      }
      return item.value;
    },
  
    removeItem: function (key) {
      localStorage.removeItem(key);
    },
  
    clear: function () {
      localStorage.clear();
    }
  };
  

  
  // timeBoundLocalStorage in action :)

  timeBoundLocalStorage.setItem("name", "sanjeev", 1000);

  setTimeout(() => {
    console.log(`Name = ${timeBoundLocalStorage.getItem("name")}`);
  }, 500);   // returns "sanjeev"  
  
  setTimeout(() => {
    console.log(`Name = ${timeBoundLocalStorage.getItem("name")}`);
  }, 1500);  // returns null
  