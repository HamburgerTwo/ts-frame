import './index.css';

if (__DEV__) {
  console.info('development');
}

if (process.env.NODE_ENV === 'production') {
  console.info("process.env.NODE_ENV === 'production'");
}
