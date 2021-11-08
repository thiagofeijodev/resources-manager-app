import React from 'react'
import { Button, SHAPE } from 'baseui/button'
import { Modal, SIZE, ROLE } from 'baseui/modal'
import { Heading, HeadingLevel } from 'baseui/heading'
import { Plus, Search } from 'baseui/icon'
import { List as BaseUIList, Align } from './components'

const ITEMS = Array.from({length: 100}, () => ({
  title: 'Jane Smith',
  subtitle: 'Senior Engineering Manager',
  icon: Search,
}))

export default function List({ title, Viewer }) {
  const [selected, setSelected] = React.useState(null)
  const isOpen = !!selected

  return (
    <>
      <HeadingLevel>
        <Align>
          <Heading>
            {title} 
          </Heading>
          <Button
            shape={SHAPE.circle}
            onClick={() => setSelected({})}
          >
            <Plus />
          </Button>
        </Align>
      </HeadingLevel>

      <BaseUIList
        items={ITEMS}
        onSelect={({item}) => setSelected(item)}
      />

      <Modal
        onClose={() => setSelected(null)}
        closeable
        isOpen={isOpen}
        animate
        autoFocus
        size={SIZE.full}
        role={ROLE.dialog}
      >
        <Viewer item={selected} />
      </Modal>
    </>
  )
}
