import React from 'react'
import { Menu } from 'baseui/menu'
import {
  ListItemLabel,
  MenuAdapter,
  ARTWORK_SIZES,
} from 'baseui/list'
import { ChevronRight } from 'baseui/icon'

export default function List({ items, onSelect }) {
  return (
    <Menu
      items={items}
      overrides={{
        Option: {
          props: {
            overrides: {
              ListItem: {
                component: React.forwardRef((props, ref) => (
                  <MenuAdapter
                    {...props}
                    onClick={() => onSelect(props)}
                    ref={ref}
                    artwork={props.item.icon}
                    artworkSize={ARTWORK_SIZES.LARGE}
                    endEnhancer={() => <ChevronRight />}
                  >
                    <ListItemLabel
                      description={props.item.subtitle}
                    >
                      {props.item.title}
                    </ListItemLabel>
                  </MenuAdapter>
                )),
              },
            },
          },
        },
      }}
    />
  )
}
