var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_index_001 = __commonJS({
  "assets/index-3002700a.js"(exports, module) {
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
    const searchInput$1 = $("#search-input");
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
    function getLocalSearchInput() {
      const input2 = localStorage.getItem("input");
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
      const searchVal = searchInput$1.value;
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
    var Routie = function(a, b) {
      var c = [], d = {}, e = "routie", f = a[e], g = function(a2, b2) {
        this.name = b2, this.path = a2, this.keys = [], this.fns = [], this.params = {}, this.regex = h(this.path, this.keys, false, false);
      };
      g.prototype.addHandler = function(a2) {
        this.fns.push(a2);
      }, g.prototype.removeHandler = function(a2) {
        for (var b2 = 0, c2 = this.fns.length; c2 > b2; b2++) {
          var d2 = this.fns[b2];
          if (a2 == d2)
            return void this.fns.splice(b2, 1);
        }
      }, g.prototype.run = function(a2) {
        for (var b2 = 0, c2 = this.fns.length; c2 > b2; b2++)
          this.fns[b2].apply(this, a2);
      }, g.prototype.match = function(a2, b2) {
        var c2 = this.regex.exec(a2);
        if (!c2)
          return false;
        for (var d2 = 1, e2 = c2.length; e2 > d2; ++d2) {
          var f2 = this.keys[d2 - 1], g2 = "string" == typeof c2[d2] ? decodeURIComponent(c2[d2]) : c2[d2];
          f2 && (this.params[f2.name] = g2), b2.push(g2);
        }
        return true;
      }, g.prototype.toURL = function(a2) {
        var b2 = this.path;
        for (var c2 in a2)
          b2 = b2.replace("/:" + c2, "/" + a2[c2]);
        if (b2 = b2.replace(/\/:.*\?/g, "/").replace(/\?/g, ""), -1 != b2.indexOf(":"))
          throw new Error("missing parameters for url: " + b2);
        return b2;
      };
      var h = function(a2, b2, c2, d2) {
        return a2 instanceof RegExp ? a2 : (a2 instanceof Array && (a2 = "(" + a2.join("|") + ")"), a2 = a2.concat(d2 ? "" : "/?").replace(/\/\(/g, "(?:/").replace(/\+/g, "__plus__").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(a3, c3, d3, e2, f2, g2) {
          return b2.push({ name: e2, optional: !!g2 }), c3 = c3 || "", "" + (g2 ? "" : c3) + "(?:" + (g2 ? c3 : "") + (d3 || "") + (f2 || d3 && "([^/.]+?)" || "([^/]+?)") + ")" + (g2 || "");
        }).replace(/([\/.])/g, "\\$1").replace(/__plus__/g, "(.+)").replace(/\*/g, "(.*)"), new RegExp("^" + a2 + "$", c2 ? "" : "i"));
      }, i = function(a2, b2) {
        var e2 = a2.split(" "), f2 = 2 == e2.length ? e2[0] : null;
        a2 = 2 == e2.length ? e2[1] : e2[0], d[a2] || (d[a2] = new g(a2, f2), c.push(d[a2])), d[a2].addHandler(b2);
      }, j = function(a2, b2) {
        if ("function" == typeof b2)
          i(a2, b2), j.reload();
        else if ("object" == typeof a2) {
          for (var c2 in a2)
            i(c2, a2[c2]);
          j.reload();
        } else
          "undefined" == typeof b2 && j.navigate(a2);
      };
      j.lookup = function(a2, b2) {
        for (var d2 = 0, e2 = c.length; e2 > d2; d2++) {
          var f2 = c[d2];
          if (f2.name == a2)
            return f2.toURL(b2);
        }
      }, j.remove = function(a2, b2) {
        var c2 = d[a2];
        c2 && c2.removeHandler(b2);
      }, j.removeAll = function() {
        d = {}, c = [];
      }, j.navigate = function(a2, b2) {
        b2 = b2 || {};
        var c2 = b2.silent || false;
        c2 && o(), setTimeout(function() {
          window.location.hash = a2, c2 && setTimeout(function() {
            n();
          }, 1);
        }, 1);
      }, j.noConflict = function() {
        return a[e] = f, j;
      };
      var k = function() {
        return window.location.hash.substring(1);
      }, l = function(a2, b2) {
        var c2 = [];
        return b2.match(a2, c2) ? (b2.run(c2), true) : false;
      }, m = j.reload = function() {
        for (var a2 = k(), b2 = 0, d2 = c.length; d2 > b2; b2++) {
          var e2 = c[b2];
          if (l(a2, e2))
            return;
        }
      }, n = function() {
        a.addEventListener ? a.addEventListener("hashchange", m, false) : a.attachEvent("onhashchange", m);
      }, o = function() {
        a.removeEventListener ? a.removeEventListener("hashchange", m) : a.detachEvent("onhashchange", m);
      };
      return n(), b ? j : void (a[e] = j);
    };
    "undefined" == typeof module ? Routie(window) : module.exports = Routie(window, true);
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
    function collectionSearch(data) {
      const section = $("section[data-route=search]");
      console.log(data);
      const UserSearch = getLocalSearchInput();
      const renderQuerry = `
  <h2>${UserSearch}</h2>
  `;
      section.insertAdjacentHTML("beforeend", renderQuerry);
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
    const searchInput = getLocalSearchInput();
    const handleRoutes = () => {
      routie(
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
            const data = await searchMuseumData(searchInput);
            render(data, "search");
            updateUI("search");
          }
        }
      );
    };
    handleRoutes();
  }
});
export default require_index_001();
//# sourceMappingURL=index-3002700a.js.map
