const paths = {
  home() {
    return '/';
  },

  contactShow(id: string) {
    return `/contact/${id}`;
  },

  api: {
    characters() {
      return 'https://rickandmortyapi.com/api/character/';
    },
  },
};

export default paths;
