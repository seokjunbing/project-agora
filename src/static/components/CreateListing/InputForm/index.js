import React, { Component } from 'react';

import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react';

const price_units = [
  { text: 'fixed', value: 'f' },
  { text: '/hr', value: 'h' },
  { text: '/week', value: 'w' },
  { text: '/term', value: 't' },
]

const products = [
  { text: 'Hat', value: 'hat' },
  { text: 'Scarf', value: 'scarf' },
  { text: 'Jacket', value: 'jacket' },
  { text: 'T-Shirt', value: 't_shirt' },
  { text: 'Gloves', value: 'gloves' },
  { text: 'Watch', value: 'watch' },
  { text: 'Belt', value: 'belt' },
  { text: 'Pants', value: 'pants' },
  { text: 'Shoes', value: 'shoes' },
  { text: 'Socks', value: 'socks' },
]

class InputForm extends Component {
  state = { serializedForm: {} }

  handleChange = (e, { value }) => this.setState({ value })

  handleSubmit = (e, serializedForm) => {
    e.preventDefault()
    this.setState({ serializedForm })
  }

  render() {
    const { serializedForm, value } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input label='Title' name='title' placeholder='e.g. 42 inch LG TV' />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input label='Price' name='price' placeholder='$50' />
          <Form.Select label='Price_Unit' name='price_unit' options={price_units} placeholder='Price Unit' />
        </Form.Group>
        <Form.Select label='Products' name='products' options={products} placeholder='Search...' search multiple />

        <Form.TextArea name='details' label='Details' placeholder='Anything else we should know?' rows='3' />

        <Button primary type='submit'>Submit</Button>

        <Message>
          <pre>serializedForm: {JSON.stringify(serializedForm, null, 2)}</pre>
        </Message>
      </Form>
    )
  }
}

export default (InputForm);
