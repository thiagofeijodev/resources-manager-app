import React from 'react'
import { useSelector } from 'react-redux'
import { selectResource } from 'data/resource'
import {
  ListItemLabel,
  MenuAdapter,
} from 'baseui/list'
import { ChevronRight } from 'baseui/icon'

const ItemHistory = ({ ref, ...props }) => {
  const resources = useSelector(selectResource)
  const id = (props.item.resource || []).map(({ id }) => id).join()

  return (
    <MenuAdapter
      {...props}
      onClick={() => props.onSelect(props)}
      ref={ref}
      endEnhancer={() => <ChevronRight />}
    >
      <ListItemLabel
        description={`Total amount: ${props.item.amount}`}
      >
        {resources[id]?.name || 'Not fount'}
      </ListItemLabel>
    </MenuAdapter>
  )
}

export default ItemHistory
