/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    '@snowpack/plugin-webpack',
    ['@snowpack/plugin-sass', {
      native: true,
      compilerOptions: {
        style: 'compressed',
      },
    }],
  ],
  devOptions: {
    port: 3333,
  },
  install: [],
  installOptions: {},
  buildOptions: {},
  proxy: {},
  alias: {},
};
