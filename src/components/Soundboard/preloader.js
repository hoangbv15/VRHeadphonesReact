import _ from 'underscore';

export default function preload(images, callback) {
  let assets = {};
  let done = () => {
    counter--;
    if (counter === 0) {
      if (_.isFunction(callback)) {
        callback(errors.length ? errors : null);
      }
    }
  };
  let error = function() {
    errors.push(this.src);  // eslint-disable-line no-invalid-this
    done();
  };

  let counter = _.keys(images).length;
  let errors = [];
  _.each(images, (image, key) => {
    let img = new Image();
    img.onload = done;
    img.onerror = error;
    img.src = image.src;
    assets[key] = img;
  });
  return assets;
}
