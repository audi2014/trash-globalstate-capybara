export default (cb, storeprops, info, { getSubscriptions, getState }) => {
  const subscriptions = getSubscriptions();
  if (!subscriptions.find(([scb, keys]) => scb === cb)) {
    subscriptions.push([cb, storeprops, info]);
    //init values
    storeprops.forEach(key => {
      const prev = getState(key);
      const value = prev;
      cb({ key, value, prev, info: "__init__" });
    });
  } else {
    console.error("handler can't subscribe twice");
  }
  return subscriptions;
};
