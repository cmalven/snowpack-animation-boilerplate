/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    '@snowpack/plugin-webpack',
    '@snowpack/plugin-babel',
    ['@snowpack/plugin-sass', {
      native: true,
      compilerOptions: {
        style: 'compressed',
      },
    }],
    ['snowpack-plugin-raw-file-loader', {
      exts: ['.glsl'],
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
