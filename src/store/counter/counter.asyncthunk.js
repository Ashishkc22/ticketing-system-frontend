export default [
  {
    name: "counter/fetchCount",
    thunk: async (amount) => {
      const response = await fetchCount(amount);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    },
  },
];
