var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_index_001 = __commonJS({
  "assets/index-4126a4a7.js"(exports, module) {
    (function polyfill() {
      const relList = document.createElement("link").relList;
      if (relList && relList.supports && relList.supports("modulepreload")) {
        return;
      }
      for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        processPreload(link);
      }
      new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type !== "childList") {
            continue;
          }
          for (const node of mutation.addedNodes) {
            if (node.tagName === "LINK" && node.rel === "modulepreload")
              processPreload(node);
          }
        }
      }).observe(document, { childList: true, subtree: true });
      function getFetchOpts(script) {
        const fetchOpts = {};
        if (script.integrity)
          fetchOpts.integrity = script.integrity;
        if (script.referrerpolicy)
          fetchOpts.referrerPolicy = script.referrerpolicy;
        if (script.crossorigin === "use-credentials")
          fetchOpts.credentials = "include";
        else if (script.crossorigin === "anonymous")
          fetchOpts.credentials = "omit";
        else
          fetchOpts.credentials = "same-origin";
        return fetchOpts;
      }
      function processPreload(link) {
        if (link.ep)
          return;
        link.ep = true;
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
      }
    })();
    const main = "";
    function updateUI(route, id) {
      const sections = $$("section");
      $$("article");
      const activeSection = $(`[data-route=${route}]`);
      sections.forEach((section) => {
        section.classList.remove("active");
      });
      activeSection.classList.add("active");
    }
    function $(element) {
      return document.querySelector(element);
    }
    function $$(elements) {
      return document.querySelectorAll(elements);
    }
    document.forms["searchForm"]["search"].value;
    $("#search-button");
    const searchInput = $("#search-input");
    const searchForm = $("#search-form");
    const apiKey = "S3GLzVAr";
    const URL$1 = `https://www.rijksmuseum.nl/api/en/collection?key=${apiKey}&imgonly=true`;
    const getDynamicMuseumData = async (options, id) => {
      if (!id) {
        const urlParams = `${URL$1}&ps=30`;
        const data = await request(urlParams);
        console.log(data);
        return data;
      } else {
        const urlParams = `https://www.rijksmuseum.nl/api/en/collection/${id}?key=${apiKey}`;
        console.log(urlParams);
        const data = await request(urlParams);
        return data;
      }
    };
    let input = localStorage.getItem("input");
    let localStorageURL = localStorage.getItem("urlParams");
    function setLocalSearchInput(val) {
      console.log(val);
      localStorage.setItem("input", val);
    }
    function setLocalParam(val) {
      console.log(val);
      localStorage.setItem("urlParams", val);
    }
    async function getLocalSearchInput() {
      const input2 = await localStorage.getItem("input");
      console.log(input2);
      return input2;
    }
    const searchMuseumData = async (newInput) => {
      let input2 = await getLocalSearchInput();
      const search = localStorageURL;
      console.log(input2);
      console.log(search);
      const urlParams = `${URL$1}&q=${newInput}&ps=30`;
      const data = await request(urlParams);
      return data;
    };
    const request = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    };
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const searchVal = searchInput.value;
      console.log(searchVal);
      localStorage.setItem("input", input);
      setLocalSearchInput(searchVal);
      const urlParams = `${URL$1}&q=${searchVal}`;
      setLocalParam(urlParams);
      localStorage.setItem("urlParams", urlParams);
    });
    /*!
     * routie - a tiny hash router
     * v0.3.2
     * http://projects.jga.me/routie
     * copyright Greg Allen 2016
     * MIT License
    */
    var Routie = function(w, isModule) {
      var routes = [];
      var map = {};
      var reference = "routie";
      var oldReference = w[reference];
      var Route = function(path, name) {
        this.name = name;
        this.path = path;
        this.keys = [];
        this.fns = [];
        this.params = {};
        this.regex = pathToRegexp(this.path, this.keys, false, false);
      };
      Route.prototype.addHandler = function(fn) {
        this.fns.push(fn);
      };
      Route.prototype.removeHandler = function(fn) {
        for (var i = 0, c = this.fns.length; i < c; i++) {
          var f = this.fns[i];
          if (fn == f) {
            this.fns.splice(i, 1);
            return;
          }
        }
      };
      Route.prototype.run = function(params) {
        for (var i = 0, c = this.fns.length; i < c; i++) {
          this.fns[i].apply(this, params);
        }
      };
      Route.prototype.match = function(path, params) {
        var m = this.regex.exec(path);
        if (!m)
          return false;
        for (var i = 1, len = m.length; i < len; ++i) {
          var key = this.keys[i - 1];
          var val = "string" == typeof m[i] ? decodeURIComponent(m[i]) : m[i];
          if (key) {
            this.params[key.name] = val;
          }
          params.push(val);
        }
        return true;
      };
      Route.prototype.toURL = function(params) {
        var path = this.path;
        for (var param in params) {
          path = path.replace("/:" + param, "/" + params[param]);
        }
        path = path.replace(/\/:.*\?/g, "/").replace(/\?/g, "");
        if (path.indexOf(":") != -1) {
          throw new Error("missing parameters for url: " + path);
        }
        return path;
      };
      var pathToRegexp = function(path, keys, sensitive, strict) {
        if (path instanceof RegExp)
          return path;
        if (path instanceof Array)
          path = "(" + path.join("|") + ")";
        path = path.concat(strict ? "" : "/?").replace(/\/\(/g, "(?:/").replace(/\+/g, "__plus__").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(_, slash, format, key, capture, optional) {
          keys.push({ name: key, optional: !!optional });
          slash = slash || "";
          return "" + (optional ? "" : slash) + "(?:" + (optional ? slash : "") + (format || "") + (capture || (format && "([^/.]+?)" || "([^/]+?)")) + ")" + (optional || "");
        }).replace(/([\/.])/g, "\\$1").replace(/__plus__/g, "(.+)").replace(/\*/g, "(.*)");
        return new RegExp("^" + path + "$", sensitive ? "" : "i");
      };
      var addHandler = function(path, fn) {
        var s = path.split(" ");
        var name = s.length == 2 ? s[0] : null;
        path = s.length == 2 ? s[1] : s[0];
        if (!map[path]) {
          map[path] = new Route(path, name);
          routes.push(map[path]);
        }
        map[path].addHandler(fn);
      };
      var routie = function(path, fn) {
        if (typeof fn == "function") {
          addHandler(path, fn);
          routie.reload();
        } else if (typeof path == "object") {
          for (var p in path) {
            addHandler(p, path[p]);
          }
          routie.reload();
        } else if (typeof fn === "undefined") {
          routie.navigate(path);
        }
      };
      routie.lookup = function(name, obj) {
        for (var i = 0, c = routes.length; i < c; i++) {
          var route = routes[i];
          if (route.name == name) {
            return route.toURL(obj);
          }
        }
      };
      routie.remove = function(path, fn) {
        var route = map[path];
        if (!route)
          return;
        route.removeHandler(fn);
      };
      routie.removeAll = function() {
        map = {};
        routes = [];
      };
      routie.navigate = function(path, options) {
        options = options || {};
        var silent = options.silent || false;
        if (silent) {
          removeListener();
        }
        setTimeout(function() {
          window.location.hash = path;
          if (silent) {
            setTimeout(function() {
              addListener();
            }, 1);
          }
        }, 1);
      };
      routie.noConflict = function() {
        w[reference] = oldReference;
        return routie;
      };
      var getHash = function() {
        return window.location.hash.substring(1);
      };
      var checkRoute = function(hash, route) {
        var params = [];
        if (route.match(hash, params)) {
          route.run(params);
          return true;
        }
        return false;
      };
      var hashChanged = routie.reload = function() {
        var hash = getHash();
        for (var i = 0, c = routes.length; i < c; i++) {
          var route = routes[i];
          if (checkRoute(hash, route)) {
            return;
          }
        }
      };
      var addListener = function() {
        if (w.addEventListener) {
          w.addEventListener("hashchange", hashChanged, false);
        } else {
          w.attachEvent("onhashchange", hashChanged);
        }
      };
      var removeListener = function() {
        if (w.removeEventListener) {
          w.removeEventListener("hashchange", hashChanged);
        } else {
          w.detachEvent("onhashchange", hashChanged);
        }
      };
      addListener();
      if (isModule) {
        return routie;
      } else {
        w[reference] = routie;
      }
    };
    if (typeof module == "undefined") {
      Routie(window);
    } else {
      module.exports = Routie(window, true);
    }
    const Routie$1 = Routie(window, true);
    function render(data, id) {
      console.log(data);
      if (!id) {
        collection(data.artObjects);
      } else if (id === "search") {
        collectionSearch(data.artObjects);
      } else {
        item(data.artObject);
      }
    }
    function collection(data) {
      const section = $("section[data-route=home]");
      console.log(data);
      data.forEach((item2) => {
        const { webImage, objectNumber, headerImage } = item2;
        const id = objectNumber;
        const article = document.createElement("div");
        article.classList.add("art-container");
        const html = `
      <article class='museum-item' id='${id}'">
        <img src="${webImage.url}" alt="" />
        <a href="#art/${id}">
        <h4>${item2.title}</h4>
        </a>
      </article>
    `;
        section.insertAdjacentHTML("beforeend", html);
      });
    }
    function item(data) {
      console.log(data);
      const section = $("section[data-route=art]");
      const { title, webImage } = data;
      const html = `
    <article>
      <h2>${title}</h2>
      <img src="${webImage.url}">
    </article>
  `;
      clearElement(section);
      section.insertAdjacentHTML("beforeend", html);
    }
    async function collectionSearch(data) {
      const section = $("section[data-route=search]");
      console.log(data);
      const UserSearch = await getLocalSearchInput();
      console.log(UserSearch);
      data.forEach((item2) => {
        const { webImage, objectNumber } = item2;
        const id = objectNumber;
        const article = document.createElement("div");
        article.classList.add("art-container");
        const html = `
      <article class='museum-item' id='${id}'">
        <img src="${webImage.url}" alt="" />
        <a href="#art/${id}">
        <h4>${item2.title}</h4>
        </a>
      </article>
    `;
        section.insertAdjacentHTML("beforeend", html);
      });
    }
    function clearElement(node) {
      while (node.firstChild) {
        node.removeChild(node.lastChild);
      }
    }
    const museumOptions = {
      lang: "en",
      color: "",
      involvedMaker: "",
      URL,
      search: ""
    };
    function handleRoutes() {
      Routie$1(
        {
          "": async () => {
            const data = await getDynamicMuseumData();
            render(data);
            updateUI("home");
          },
          "art/:id": async (id) => {
            const data = await getDynamicMuseumData(museumOptions, id);
            render(data, id);
            updateUI("art");
          },
          "search": async () => {
            const searchInput2 = await getLocalSearchInput();
            console.log(searchInput2);
            const data = await searchMuseumData(searchInput2);
            render(data, "search");
            updateUI("search");
          }
        }
      );
    }
    handleRoutes();
  }
});
export default require_index_001();
//# sourceMappingURL=index-4126a4a7.js.map
