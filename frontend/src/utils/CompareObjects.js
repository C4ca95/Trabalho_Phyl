const compareObjects = (obj1, obj2) => {
    const differences = {};
  
    for (const key in obj1) {
      if (obj1.hasOwnProperty(key)) {
        if (obj1[key] !== obj2[key] && obj1[key] !== '' && obj2[key] !== '') {
          differences[key] = obj1[key];
        }
      }
    }
  
    return differences;
  };

  export {compareObjects}