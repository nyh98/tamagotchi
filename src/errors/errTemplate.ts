const errTemplate = Object.freeze({
  responseJson(message: string) {
    const response = { message };
    return response;
  },
});

export default errTemplate;
