import {createHashHistory, createMemoryHistory}  from 'history';

const history = typeof document !== 'undefined' ? createHashHistory() : createMemoryHistory()

export default history;
