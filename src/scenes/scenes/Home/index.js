import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'baseui/button'
import { Tabs, Tab } from 'baseui/tabs-motion'
import { logout } from 'data/auth'
import { selectResource } from 'data/resource'
import { selectHistory } from 'data/history'
import { List, RestoreBackup } from 'components'
import {
  ViewerResource,
  ViewerHistory,
  ItemResouce,
  ItemHistory,
} from './components'

export default function Home() {
  const [activeKey, setActiveKey] = React.useState('0')
  const resources = useSelector(selectResource)
  const history = useSelector(selectHistory)

  const dispatch = useDispatch()

  function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  const downloadBackup = () => {
    const allData = Object.keys(localStorage)
      .reduce((obj, str) => ({
        ...obj,
        [str]: localStorage.getItem(str)
      }), {})

    download(JSON.stringify(allData), 'database.json', 'text/plain')
  }

  return (
    <Tabs
      activeKey={activeKey}
      onChange={({ activeKey: _activeKey }) => setActiveKey(_activeKey)}
    >
      <Tab title="Resources">
        <List
          title="Resources"
          items={Object.values(resources)}
          Viewer={ViewerResource}
          Item={ItemResouce}
        />
      </Tab>
      <Tab title="Historic">
        <List
          title="Historic"
          items={history || []}
          Viewer={ViewerHistory}
          Item={ItemHistory}
        />
      </Tab>
      <Tab title="Setting">
        <RestoreBackup />
        <br/>
        <Button onClick={() => downloadBackup()}>
          Backup
        </Button>
        <br/>
        <br/>
        <Button onClick={() => dispatch(logout())}>
          Logoff
        </Button>
      </Tab>
    </Tabs>
  )
}
