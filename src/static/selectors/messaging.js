import { createSelector } from 'reselect';

const conversationsSelector = state => state.messaging.conversations;
const userSelector = state => state.user.user_id;

export const numUnreadSelector = createSelector(
    [ conversationsSelector, userSelector ],
    (convos, user) => {
        var count = 0;
        if(convos) {
            convos.map((convo) => {
                if(convo.read_by.indexOf(user) == -1) {
                    count++;
                }
            });
            return count;
        }
    }
);
