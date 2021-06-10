const fileToByteArray = file => {
  return new Promise((resolve, reject) => {
    try {
      let reader = new FileReader();
      let fileByteArray = [];
      reader.readAsArrayBuffer(file);
      reader.onloadend = evt => {
        if (evt.target.readyState === FileReader.DONE) {
          let arrayBuffer = evt.target.result;
          let array = new Uint8Array(arrayBuffer);
          for (let byte of array) {
            fileByteArray.push(byte);
          }
        }
        resolve(fileByteArray);
      };
    } catch (error) {
      reject(error);
    }
  });
};

export { fileToByteArray };
