import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Button, Layout, Modal, Row} from 'antd';
import EventForm from '../components/EventForm';
import EventCalendar from '../components/EventCalendar';
import {useActions} from '../hooks/useActions';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {IEvent} from '../models/IEvent';

const Event: FC = () => {
  const {fetchGuests, createEvent, fetchEvents} = useActions();
  const {guests, events} = useTypedSelector((state) => state.event);
  const {user: {username}} = useTypedSelector((state) => state.auth);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchGuests();
    fetchEvents(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNewEvent = (event: IEvent) => {
    setOpen(false);
    createEvent(event)
  };

  return (
    <Wrapper>
      <ButtonBlock>
        <Button
          type="primary"
          onClick={() => setOpen(true)}
        >
          Add Event
        </Button>
      </ButtonBlock>
      <EventCalendar events={events} />
      <Modal
        title="Add Event"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <EventForm guests={guests} submit={addNewEvent} />
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled(Layout)`
  padding: 20px;
`;

const ButtonBlock = styled(Row)`
  justify-content: flex-start;
  margin-bottom: 20px;
`;

export default Event;
