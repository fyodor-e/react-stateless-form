import type { Meta, StoryObj } from '@storybook/react';

import { Input, InputProps } from '@chakra-ui/react';
import useField from '../useField/useField';
import { FC } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Chakra/ChackraInput',
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    render: (args) => {
        const Field = useField<{ a: string }, InputProps, InputProps & { name: string, as: FC<InputProps>, b: string }>({
          values: { a: "werty" },
          errors: { a: undefined },
          touched: { a: undefined },
          convertFunction: (v) => ({ isInvalid: true, valuel: v.b })
        }, [])

        return <Field as={Input} name='' isDisabled b='1' />
    }
};