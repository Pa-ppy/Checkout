import { createRequire } from 'module';

const require = createRequire(import.meta.url);


// const config = {
//   plugins: ["@tailwindcss/postcss"],
//   };

//   export default config;

const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
