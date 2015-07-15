import { Map } from 'immutable';
import { CIRCLE_ADD } from '../actions/ActionTypes';


const initialState = Map({
  circles: Map({ 0: true }),
  lastCircleId: 0,
});

export function circle(state = initialState, action = {}) {
  switch (action.type) {
    case CIRCLE_ADD:
      return state.withMutations(map => {
        const lastCircleId = map.get('lastCircleId');
        const circles = map.get('circles').set(lastCircleId + 1, true);
        return map.set('circles', circles).set('lastCircleId', lastCircleId + 1);
      });
    default:
      return state;
  }
}
