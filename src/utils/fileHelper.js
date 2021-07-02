const fileToByteArray = file => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      const fileByteArray = [];
      reader.readAsArrayBuffer(file);
      reader.onloadend = evt => {
        if (evt.target.readyState === FileReader.DONE) {
          const arrayBuffer = evt.target.result;
          const array = new Uint8Array(arrayBuffer);
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
