// настройка PostCSS
// подключение плагинов в файл
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  // подключение плагинов autoprefixer и cssnano к PostCSS
  plugins: [
    autoprefixer,
    // { preset: default } говорит о том, что нужно использовать
    // стандартные настройки минификации
    cssnano({ preset: 'default' })
  ]
};