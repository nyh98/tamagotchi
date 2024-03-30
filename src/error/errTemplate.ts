const errTemplate = Object.freeze({
  queryErr: (message: string) => {
    return {
      err: message,
    };
  },
});

export default errTemplate;
