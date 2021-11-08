import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'baseui/button'
import { Tabs, Tab } from 'baseui/tabs-motion'
import { logout } from 'data/auth'
import { List } from 'components'
import { Viewer } from './components'

export default function Home() {
  const [activeKey, setActiveKey] = React.useState('0')
  const dispatch = useDispatch()

  return (
    <Tabs
      activeKey={activeKey}
      onChange={({ activeKey }) => setActiveKey(activeKey)}
    >
      <Tab title="Items">
        <List title="Items" Viewer={Viewer} />
      </Tab>
      <Tab title="Historic">
        <List title="Historic" Viewer={Viewer} />
      </Tab>
      <Tab title="Setting">
        <Button
          onClick={() => dispatch(logout())}
        >
          Logoff
        </Button>
      </Tab>
    </Tabs>
  )
}
