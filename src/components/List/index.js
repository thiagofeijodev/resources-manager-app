import React from 'react';
import { Button, SHAPE } from 'baseui/button';
import { Modal, SIZE, ROLE } from 'baseui/modal';
import { Heading, HeadingLevel } from 'baseui/heading';
import { Plus } from 'baseui/icon';
import { List as BaseUIList, Align } from './components';

export default function List({ title, items, Viewer, Item }) {
  const [selected, setSelected] = React.useState(null);
  const isOpen = !!selected;

  return (
    <>
      <HeadingLevel>
        <Align>
          <Heading>{title}</Heading>
          <Button shape={SHAPE.circle} onClick={() => setSelected({})}>
            <Plus />
          </Button>
        </Align>
      </HeadingLevel>

      <BaseUIList items={items} onSelect={({ item }) => setSelected(item)} Component={Item} />

      <Modal
        onClose={() => setSelected(null)}
        closeable
        isOpen={isOpen}
        animate
        autoFocus
        size={SIZE.full}
        role={ROLE.dialog}
      >
        <Viewer item={selected} onClose={() => setSelected(null)} />
      </Modal>
    </>
  );
}
