var assert = require("assert")

// 丸め誤差（四捨五入）
var errorNumber = function(value, bit) {
  var v = value * Math.pow(10, bit);
  v = Math.round(v);
  v = v / Math.pow(10, bit);
  return v;
}

describe('math', function() {
  describe('.abs', function() {
    it('正の数の場合は変わらない', function() {
      var value = 5;
      var result = Math.abs(value);
      assert.equal(value, result);
    });
    it('負の数の場合はマイナスを掛けたものになる', function() {
      var value = -3;
      var result = Math.abs(value);
      assert.notEqual(result, value);
      assert.equal((-1)*value, result);
    });
    it('ゼロの場合は変わらない', function() {
      var value = 0;
      var result = Math.abs(value);
      assert.equal(value, result);
    });
  });

  describe('.ceil', function() {
    it('整数の場合は変わらない', function() {
      var value = 5;
      var result = Math.ceil(value);
      assert.equal(value, result);
    });
    it('0.1〜0.9の場合は1になる', function() {
      for (var i=1; i<10; i++) {
        var value = i*0.1;
        var result = Math.ceil(value);
        assert.equal(1, result);
      }
    });
  });

  describe('.exp', function() {
    it('1〜10までのeの累乗', function() {
      var func = function(val) {
        var result = Math.E;
        for (var j=1; j<val; j++) {
          result = result * Math.E;
        }
        return result;
      }
      for (var i=1; i<=10; i++) {
        var value = errorNumber(func(i), 10);
        var result = errorNumber(Math.exp(i), 10);
        assert.equal(value, result);
      }
    });
  });

  describe('.floor', function() {
    it('0.1〜0.9 までテスト', function() {
      for (var i=1; i<10; i++) {
        var value = i / 10;
        var result = Math.floor(value);
        assert.equal(0, result);
      }
    });
    it('1.0 をテスト', function() {
      var value = 1.0;
        var result = Math.floor(value);
        assert.equal(1, result);
    });
  });

  describe('.max', function() {
    it('大きいほうが返る', function() {
      var a = 3;
      var b = 5;
      var result = Math.max(a, b);
      assert.equal(b, result);
    });
  });

  describe('.min', function() {
    it('小さいほうが返る', function() {
      var a = 3;
      var b = 5;
      var result = Math.min(a, b);
      assert.equal(a, result);
    });
  });

  describe('.pow', function() {
    it('2乗が返る1〜10までテスト', function() {
      for (var i=1; i<=10; i++) {
        var value = i*i;
        var result = Math.pow(i, 2);
        assert.equal(value, result);
      }
    });
    it('べき乗が返る1〜10までテスト', function() {
      var func = function(val) {
        var result = val;
        for (var j=1; j<val; j++) {
          result = result * val;
        }
        return result;
      }
      for (var i=1; i<=10; i++) {
        var value = func(i);
        var result = Math.pow(i, i);
        assert.equal(value, result);
      }
    });
    it('小数どうしようかな', function() {
      assert.equal(false);
    });
  });

  describe('.sqrt', function() {
    it('2乗したら同じ数になる、1〜10まで', function() {
      for (var i=1; i<=10; i++) {
        var result = Math.sqrt(i);
        assert.equal(i, errorNumber(result*result, 8));
      }
    });
  });

  describe('.sin', function() {
    it('0のテスト', function() {
      var value = 0;
      var result = Math.sin(value);
      assert.equal(0, result);
    });
    it('π/2 のテスト', function() {
      var value = Math.PI / 2;
      var result = Math.sin(value);
      assert.equal(1, result);
    });
    // Math.sin(PI) はどうやら 0 に限りなく近い何かになるらしい
    // 丸め誤差で確認しなければならない
    it('πのテスト', function() {
      var value = Math.PI;
      var result = Math.sin(value);
      assert.equal(0, errorNumber(result, 10));
    });
    it('π3/2 のテスト', function() {
      var value = Math.PI * 3 / 2;
      var result = Math.sin(value);
      assert.equal(-1, result);
    });
    it('第一象限のテスト', function() {
      var value = Math.PI / 6;
      var result = Math.sin(value);
      assert.equal(0.5, errorNumber(result, 10));
    });
    it('第二象限のテスト', function() {
      var value = Math.PI * 5 / 6;
      var result = Math.sin(value);
      assert.equal(0.5, errorNumber(result, 10));
    });
    it('第三象限のテスト', function() {
      var value = Math.PI * 7 / 6;
      var result = Math.sin(value);
      assert.equal(-0.5, errorNumber(result, 10));
    });
    it('第四象限のテスト', function() {
      var value = Math.PI * 11 / 6;
      var result = Math.sin(value);
      assert.equal(-0.5, errorNumber(result, 10));
    });
  });

  describe('.cos', function() {
    it('0のテスト', function() {
      var value = 0;
      var result = Math.cos(value);
      assert.equal(1, result);
    });
    // Math.cos(PI/2) はどうやら 0 に限りなく近い何かになるらしい
    // 丸め誤差で確認しなければならない
    it('π/2 のテスト', function() {
      var value = Math.PI / 2;
      var result = Math.cos(value);
      assert.equal(0, errorNumber(result, 10));
    });
    it('πのテスト', function() {
      var value = Math.PI;
      var result = Math.cos(value);
      assert.equal(-1, result);
    });
    // Math.cos(PI*3/2) はどうやら 0 に限りなく近い何かになるらしい
    // 丸め誤差で確認しなければならない
    it('π3/2 のテスト', function() {
      var value = Math.PI * 3 / 2;
      var result = Math.cos(value);
      assert.equal(0, errorNumber(result,10));
    });
    it('第一象限のテスト', function() {
      var value = Math.PI / 3
      var result = Math.cos(value);
      assert.equal(0.5, errorNumber(result, 10));
    });
    it('第二象限のテスト', function() {
      var value = Math.PI * 2 / 3;
      var result = Math.cos(value);
      assert.equal(-0.5, errorNumber(result, 10));
    });
    it('第三象限のテスト', function() {
      var value = Math.PI * 4 / 3;
      var result = Math.cos(value);
      assert.equal(-0.5, errorNumber(result, 10));
    });
    it('第四象限のテスト', function() {
      var value = Math.PI * 5 / 3;
      var result = Math.cos(value);
      assert.equal(0.5, errorNumber(result, 10));
    });
  });

  describe('.tan', function() {
    it('0のテスト', function() {
      var value = 0;
      var result = Math.tan(value);
      assert.equal(0, result);
    });
    // Math.tan(PI/2) は数学的に定義ができないので、
    // 100000000000 以上であることをチェックする
    it('π/2 のテスト', function() {
      var value = Math.PI / 2;
      var result = Math.tan(value);
      assert.equal(true, 100000000000 < result);
    });
    // Math.tan(PI*3/2) は 0 に限りなく近い何かになるらしい
    // 丸め誤差で確認しなければならない
    it('πのテスト', function() {
      var value = Math.PI;
      var result = Math.tan(value);
      assert.equal(0, errorNumber(result, 10));
    });
    // Math.tan(PI*3/2) は数学的に定義ができないので、
    // 100000000000 以上であることをチェックする
    it('π3/2 のテスト', function() {
      var value = Math.PI * 3 / 2;
      var result = Math.tan(value);
      assert.equal(true, 100000000000 < result);
    });
    it('第一象限のテスト', function() {
      var value = Math.PI / 4
      var result = Math.tan(value);
      assert.equal(1, errorNumber(result, 10));
    });
    it('第二象限のテスト', function() {
      var value = Math.PI * 3 / 4;
      var result = Math.tan(value);
      assert.equal(-1, errorNumber(result, 10));
    });
    it('第三象限のテスト', function() {
      var value = Math.PI * 5 / 4;
      var result = Math.tan(value);
      assert.equal(1, errorNumber(result, 10));
    });
    it('第四象限のテスト', function() {
      var value = Math.PI * 7 / 4;
      var result = Math.tan(value);
      assert.equal(-1, errorNumber(result, 10));
    });
  });
});

