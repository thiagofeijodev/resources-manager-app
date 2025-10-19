import { ListItemLabel, MenuAdapter } from 'baseui/list';
import { ChevronRight } from 'baseui/icon';

const ItemResouce = ({ ref, ...props }) => (
  <MenuAdapter
    {...props}
    onClick={() => props.onSelect(props)}
    ref={ref}
    endEnhancer={() => <ChevronRight />}
  >
    <ListItemLabel description={`Total amount: ${props.item.amount}`}>
      {props.item.name}
    </ListItemLabel>
  </MenuAdapter>
);

export default ItemResouce;
