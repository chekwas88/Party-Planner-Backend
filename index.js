/* eslint-disable no-undef */
import app, {PORT} from '@app';

const server = app.listen(PORT || 3300, () => {
    
    console.log(`Listening on port ${server.address().port}`);
});