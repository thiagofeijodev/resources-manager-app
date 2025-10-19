import React from "react";
import { Menu } from "baseui/menu";

export default function List({ items, onSelect, Component }) {
  const Item = React.forwardRef((props, ref) => (
    <Component {...props} ref={ref} onSelect={onSelect} />
  ));

  Item.displayName = "ListItemOverride";

  return (
    <Menu
      items={items}
      overrides={{
        Option: {
          props: {
            overrides: {
              ListItem: {
                component: Item,
              },
            },
          },
        },
      }}
    />
  );
}
