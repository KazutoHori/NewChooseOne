export function slugify (str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return str;
}

export function timeToDay (current) {
  var month = '';
  if(current.slice(5, 7) === '01') month = 'Jan';
  else if(current.slice(5, 7) === '02') month = 'Feb';
  else if(current.slice(5, 7) === '03') month = 'Mar';
  else if(current.slice(5, 7) === '04') month = 'Apr';
  else if(current.slice(5, 7) === '05') month = 'Mar';
  else if(current.slice(5, 7) === '06') month = 'Jun';
  else if(current.slice(5, 7) === '07') month = 'Jul';
  else if(current.slice(5, 7) === '08') month = 'Aug';
  else if(current.slice(5, 7) === '09') month = 'Sep';
  else if(current.slice(5, 7) === '10') month = 'Oct';
  else if(current.slice(5, 7) === '11') month = 'Nov';
  else if(current.slice(5, 7) === '12') month = 'Dec';

  var day = '';
  if(current[8] === '0') day = current[9];
  else day = current.slice(8, 10);
  var year = current.slice(0, 4)

  var ret = month + ' ' + day + ', ' + year;
  return ret;
}