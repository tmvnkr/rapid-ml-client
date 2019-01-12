import sampleData from './sample-data';

const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const fetchSampleData = () => {
  return delay(1000).then(() => {
    return Promise.resolve(sampleData);
  });
};
