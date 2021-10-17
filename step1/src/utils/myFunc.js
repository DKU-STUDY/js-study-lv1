export const _curryr = (fn) => function(a, b) {
  return arguments.length === 2 ? fn(a, b) : (b) => fn(b, a)
};

export const _is_object = (obj) => typeof obj == 'object' && !!obj;
export const _keys = (obj) => _is_object(obj) ? Object.keys(obj) : [];

export const _each = _curryr((list, iter) => {
  const keys = _keys(list);
  for (let i = 0, len = keys.length ; i < len ; i++) {
    iter(list[keys[i]], keys[i]);
  }
  return list;
});

export const _map = _curryr((list, mapper) => {
  const new_list = [];
  _each(list, (val, key) => {
    new_list.push(mapper(val, key));
  });
  return new_list;
});

export const _values = (data) => _map(data, (val) => val);
export const _identity = (val) => val;
export const _get = _curryr((obj, key) => obj === null ? undefined : obj[key]);
export const _pluck = _curryr((data, key) => _map(data, _get(key)));
export const _filter = _curryr((list, predi) => {
  const new_list = [];
  for (let i = 0 ; i < list.length ; i++) {
    // 어떤 조건일 때 filter 를 할 것인가를 predi 라는 함수에 완전히 위임한다.
    if (predi(list[i])) {
      new_list.push(list[i]);
    }
  }
  return new_list;
});

export const _negate = (func) => (val) => !func(val);
export const _reject = _curryr((data, predi) => _filter(data, _negate(predi)));
export const _compact = _filter(_identity); // _compact([1, 2, 0, false, null, {}]));
export const _find = _curryr((list, predi) => {
  const keys = _keys(list);
  for (let i = 0, len = keys.length ; i < len ; i++) {
    const val = list[keys[i]];
    if (predi(val)) return val;
  }
  return list;
});

export const slice = Array.prototype.slice;
export const _rest = (list, num) => slice.call(list, num || 1);
export const _reduce = _curryr((list, iter, memo) => {
  // memo 가 없을 경우
  if (arguments.length === 2) {
    memo = list[0];
    list = _rest(list);
  }

  _each(list, (val) => {
    memo = iter(memo, val);
  });

  return memo;
});

export const _min = (data) => _reduce(data, (a, b) => a < b ? a : b);
export const _max = (data) => _reduce(data, (a, b) => a > b ? a : b);
export const _min_by = _curryr((data, iter) => _reduce(data, (a, b) => iter(a) < iter(b) ? a : b)); // _min_by([1, 2, 4, 10, 5, -11], Math.abs
export const _max_by = _curryr((data, iter) => _reduce(data, (a, b) => iter(a) > iter(b) ? a : b));
function _pipe() {
  const fns = arguments;
  return (arg) => _reduce(fns, (arg, fn) => fn(arg), arg);
}

function _go(arg) {
  const fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}

export const _push = (obj, key, val) => {
  (obj[key] = obj[key] || []).push(val);
  return obj;
}

export const _group_by = _curryr((data, iter) => _reduce(data,
  (grouped, val) => _push(grouped, iter(val), val), {}));

export const _inc = (count, key) => {
  count[key] ? count[key]++ : count[key] = 1;
  return count;
};

export const _count_by = _curryr((data, iter) =>
  _reduce(data, (count, val) => _inc(count, iter(val)), {}));

// var f1 = _pipe(
//   _count_by(user => user.age - user.age % 10),
//   _map((count, key) => `<li>${key}대는 ${count} 명 입니다.</li>`),
//   list => `<ul>${list.join('')}</ul>`,
//   document.write.bind(document),
// );


