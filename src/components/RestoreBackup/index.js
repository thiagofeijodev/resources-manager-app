import React from 'react'
import { FileUploader } from 'baseui/file-uploader'
import { BASE_PATH as auth } from 'data/auth'
import { BASE_PATH as history } from 'data/history'
import { BASE_PATH as resource } from 'data/resource'

export default function RestoreBackup({ onRestore }) {
  function onChange(files) {
    var reader = new FileReader()
    reader.onload = onReaderLoad
    reader.readAsText(files[0])
  }

  function onReaderLoad(event) {
    const storage = JSON.parse(event.target.result)

    for (let item in storage) {
      if ([ auth, history, resource ].includes(item)) {
        localStorage.setItem(item, storage[item])
      }
    }

    window.location.reload()
  }

  return (
    <FileUploader
      overrides={{
        ContentMessage: () => "Load database..."
      }}
      accept={['.json']}
      multiple={false}
      onDrop={(acceptedFiles) => {
        console.log(acceptedFiles);
        onChange(acceptedFiles)
      }}
    />
  )
}
