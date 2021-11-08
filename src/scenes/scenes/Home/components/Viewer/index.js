import React from 'react'
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal'
import { KIND as ButtonKind } from 'baseui/button'

export default function Viewer({ item }) {
  return (
    <>
      <ModalHeader>Hello world</ModalHeader>
      <ModalBody>
        {JSON.stringify(item)}
      </ModalBody>
      <ModalFooter>
        <ModalButton kind={ButtonKind.tertiary}>
          Cancel
        </ModalButton>
        <ModalButton>Okay</ModalButton>
      </ModalFooter>
    </>
  )
}
