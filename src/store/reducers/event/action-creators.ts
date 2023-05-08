import {getUsers} from '../../../api/api';
import {AppDispatch} from '../../index';
import {IUser} from '../../../models/IUser';
import {IEvent} from '../../../models/IEvent';
import {EventActionEnum, SetEventsAction, SetGuestsAction} from './types';

export const EventActionCreators = {
  setGuests: (guests: IUser[]): SetGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload: guests}),
  setEvents: (events: IEvent[]): SetEventsAction => ({type: EventActionEnum.SET_EVENTS, payload: events}),
  fetchGuests: () => async (dispatch: AppDispatch) => {
      try {
        const response = await getUsers();
        dispatch(EventActionCreators.setGuests(response.data))
      } catch (e) {
        console.log('Error', e);
      }
  },
  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem('events') || '[]';
      const json = JSON.parse(events) as IEvent[];
      json.push(event);
      dispatch(EventActionCreators.setEvents(json));
      localStorage.setItem('events', JSON.stringify(json));
    } catch (e) {
      console.log('Error', e);
    }
  },
  fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem('events') || '[]';
      const json = JSON.parse(events) as IEvent[];
      const currentUserEvents = json.filter(({author, guest}) => author === username || guest === username);
      dispatch(EventActionCreators.setEvents(currentUserEvents));
    } catch (e) {
      console.log('Error', e);
    }
  }
};