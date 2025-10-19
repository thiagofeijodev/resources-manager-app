import React from 'react';
import { FileUploader } from 'baseui/file-uploader';
import { BASE_PATH as history } from 'data/history';
import { BASE_PATH as resource } from 'data/resource';

export default function RestoreBackup() {
  const [fileRows, setFileRows] = React.useState([]);

  function onReaderLoad(event) {
    const storage = JSON.parse(event);

    for (const item in storage) {
      if ([history, resource].includes(item)) {
        localStorage.setItem(item, storage[item]);
      }
    }
  }

  const processFileOnDrop = (file) => {
    // Read each file
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async () => {
        onReaderLoad(reader.result);
        resolve({ name: file.name, data: reader.result });
        return Promise.resolve();
      };
      reader.onerror = (err) => {
        console.log('Error reading file:', err);
        reject(err);
      };
      reader.readAsText(file);
    });
  };

  return (
    <FileUploader
      overrides={{
        ContentMessage: () => 'Load database...',
      }}
      accept={['.json']}
      maxSize={1000000}
      fileRows={fileRows}
      setFileRows={(newFileRows) => setFileRows(newFileRows)}
      processFileOnDrop={processFileOnDrop}
    />
  );
}
