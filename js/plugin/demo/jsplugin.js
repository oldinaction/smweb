(function (undefined) {
  var person,
      VERSION = "1.0.0",
      global = this, // 此时的 this 为 window
      personProperties = {
        _name : null,
        _sex : null,
        _age : null,
        _marry : null // 婚否
      };

  /************************************
      构造函数
  ************************************/

  function Person (config) {
    extend(this, config);
  }

  /************************************
      辅助函数
  ************************************/

  function extend(a, b) {
      for (var i in b) {
          if (b.hasOwnProperty(i)) {
              a[i] = b[i];
          }
      }

      return a;
  }

  /************************************
      顶级函数
  ************************************/

  person = function (name, sex, age) {
    var c = {};
    c._name = name;
    c._sex = sex;
    c._age = age;
    c._marry = false;

    return new Person(c);
  };

  /************************************
      注入 Person
  ************************************/

  function makeGlobal() {
      global['person'] = person;
  }

  makeGlobal();

}).call(this);
