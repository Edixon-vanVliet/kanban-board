export const APIMock = (callback) =>
  new Promise((resolve) => {
    setTimeout(() => {
      return resolve(callback());
    }, 5000);
  });
