(function (window) {
  var Like = function (param) {
    this.element = param.element
    this.value = param.value
    this.click = param.click
    this.callback = param.callback || function() {}
    this.init()
  }

  Like.prototype = {
    init: function () {
      if (!this.element) return
      if (!this.value) return console.error('必须传入 value 值')
      var valueStr = this.value.toString()
      var valueArr = valueStr.split('')
      var html = ''
      for (var i = 0; i < valueArr.length; i++) {
        html += '<div class="num"><span>' + valueArr[i] + '</span></div>'
      }

      this.element.querySelector('.count').innerHTML = html
      this.click && this.addEvent(this.element, 'click', this.toggle.bind(this))
    },
    updateValue: function (newValue) {
      var nums = this.element.querySelectorAll('.count .num');

      var newValueStr = newValue.toString();
      var oldValueStr = this.value.toString();

      var oldValue = this.value;

      if (oldValue !== newValue) {
        var oldNum = oldValueStr.split('');
        var newNum = newValueStr.split('');

        var h = '', len = 0;

        if (oldNum.length < newNum.length) {
          oldNum.push('')
          len = oldNum.length - 1
          this.element.querySelector('.count').insertAdjacentHTML('beforeEnd', '<div class="num"><span></span></div>')
        } else if (oldNum.length > newNum.length) {
          newNum.push('')
          len = newNum.length - 1
          setTimeout(function () {
            nums[nums.length - 1].remove()
          }, 300)
        } else {
          len = oldNum.length - 1
        }

        // 保证所有的数字滚动
        for (var i = len; i >= 0; i--) {
          if (oldNum[i] !== newNum[i]) {
            // 通过前后的数字判断是否是向上滚动还是向下滚动
            if (oldValue < newValue) {
              h = '<span class="upupin">' + oldNum[i] + '</span>' +
                '<span class="upup">' + newNum[i] + '</span>'
            } else {
              h = '<span class="down">' + newNum[i] + '</span>' +
                '<span class="downin">' + oldNum[i] + '</span>'
            }
            this.element.querySelectorAll('.count .num')[i].innerHTML = h
          }
        }
        this.value = newValueStr
      }
    },
    toggle: function(e) {
      var elm = e.target
      if (elm.classList.contains('heart')) {
        if (elm.getAttribute('data-flag') === '0') {
          elm.querySelector('.fa-heart-o').classList.remove('active')
          elm.querySelector('.fa-heart').classList.add('active')
          elm.setAttribute('data-flag', '1')
          this.addNum()
        } else {
          elm.querySelector('.fa-heart-o').classList.add('active')
          elm.querySelector('.fa-heart').classList.remove('active')
          elm.setAttribute('data-flag', '0')
          this.reduceNum()
        }
        this.callback(this.value)
      }
    },
    addNum: function() {
      var value = this.value
      value++
      this.updateValue(value)
    },
    reduceNum: function() {
      var value = this.value
      value--
      this.updateValue(value)
    },
    addEvent: function (elm, type, fn) {
      if (window.attachEvent) {
        elm.attachEvent("on" + type, fn);
      } else if (window.addEventListener) {
        elm.addEventListener(type, fn, false);
      } else {
        elm["on" + type] = fn;
      }
    }
  }

  window.Like = Like
})(window)