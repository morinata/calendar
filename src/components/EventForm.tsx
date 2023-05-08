import React, {ChangeEvent, FC, useState} from 'react';
import styled from 'styled-components';
import dayjs, {Dayjs} from 'dayjs';
import {Button, DatePicker, Form, Input, Select} from 'antd';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {rules} from '../utils/rules';
import {IUser} from '../models/IUser';
import {IEvent} from '../models/IEvent';

interface EventFormProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = ({guests, submit}) => {
  const [event, setEvent] = useState<IEvent>({
    author: '',
    date: '',
    description: '',
    guest: '',
  } as IEvent)
  const {user} = useTypedSelector((state) => state.auth);

  const handleSelectDate = (date: Dayjs | null) => {
    if (date) {
      setEvent({...event, date: dayjs(date).format('YYYY.MM.DD')});
    }
  };

  const handleCreate = () => {
    submit({...event, author: user.username});
  };

  return (
    <Wrapper onFinish={handleCreate}>
      <FormItem
        label="Description"
        name="description"
        rules={[rules.required()]}
      >
        <Input
          value={event.description}
          onChange={({target: {value}}: ChangeEvent<HTMLInputElement>) => setEvent({...event, description: value})}
        />
      </FormItem>

      <FormItem
        label="Date"
        name="date"
        rules={[rules.required(), rules.isDateAfter("You can't create an event in the past")]}
      >
        <DatePicker onChange={(date) => handleSelectDate(date)} />
      </FormItem>

      <FormItem
        label="Guest"
        name="guest"
        rules={[rules.required()]}
      >
        <Select onChange={(guest: string) => setEvent({...event, guest})}>
          {guests.map((guest) => (
            <Select.Option value={guest.username} key={guest.username}>
              {guest.username}
            </Select.Option>
          ))}
        </Select>
      </FormItem>

      <FormBtn>
        <Button type="primary" htmlType="submit">
          Create Event
        </Button>
      </FormBtn>
    </Wrapper>
  );
};

const Wrapper = styled(Form)`
  margin-top: 20px;
`;

const FormItem = styled(Form.Item)`
  & .ant-form-item-label {
    width: 20%;
  }
`;

const FormBtn = styled(Form.Item)`
  margin-bottom: 5px;
  display: flex;
  justify-content: end;
`;

export default EventForm;