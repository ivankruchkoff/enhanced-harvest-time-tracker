// Generated by CoffeeScript 1.6.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function() {
    var config;
    config = this.config;
    return this.PlatformCookie = (function() {
      PlatformCookie.prototype.loggedIn = false;

      PlatformCookie.prototype.lastCookie = null;

      function PlatformCookie(cookie_name) {
        this.cookie_name = cookie_name;
        this.parseCookie = __bind(this.parseCookie, this);
        this.parseCookieChange = __bind(this.parseCookieChange, this);
        chrome.cookies.onChanged.addListener(this.parseCookieChange);
      }

      PlatformCookie.prototype.parseCookieChange = function(d) {
        if (d.cookie.name !== this.cookie_name || d.cookie.domain !== config.domain) {
          return;
        }
        if (d.removed && d.cause !== "overwrite") {
          this.lastCookie = null;
          return this.updatedCookie(d.cookie);
        } else if (d.cookie.value !== this.lastCookie) {
          this.lastCookie = d.cookie.value;
          return this.updatedCookie(d.cookie);
        }
      };

      PlatformCookie.prototype.getCookie = function() {
        var options;
        options = {
          url: config.url,
          name: this.cookie_name
        };
        return chrome.cookies.get(options, this.parseCookie);
      };

      PlatformCookie.prototype.parseCookie = function(cookie) {
        if ((cookie != null ? cookie.value : void 0) !== this.lastCookie) {
          this.lastCookie = cookie != null ? cookie.value : void 0;
          return this.updatedCookie(cookie);
        }
      };

      PlatformCookie.prototype.updatedCookie = function(cookie) {
        return $(document).trigger("login:change");
      };

      return PlatformCookie;

    })();
  })();

}).call(this);
