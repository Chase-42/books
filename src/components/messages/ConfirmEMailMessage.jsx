import React from 'react';
import { Message } from 'semantic-ui-react';

export default function ConfirmEmailMessage() {
  return (
    <Message info>
      <Message.Header>Please verify your email</Message.Header>
    </Message>
  );
}
