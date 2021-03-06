(function() {
  var CellPhone, DropDown, Token, Tooltip, addOnClickEvent, appendChild, createElement, destroyElement, getByClassName, getById;

  getById = function(id) {
    return document.getElementById(id);
  };

  getByClassName = function(name) {
    return document.getElementsByClassName(name);
  };

  createElement = function(tagName) {
    return document.createElement(tagName);
  };

  appendChild = function(child) {
    return document.body.appendChild(child);
  };

  addOnClickEvent = function(callback) {
    return document.onclick = callback;
  };

  destroyElement = function(element) {
    return element.parentNode.removeChild(element);
  };

  if (window.Authy == null) {
    window.Authy = {};
  }

  if (document.getElementsByClassName == null) {
    document.getElementsByClassName = function(className, parentElement) {
      var child, children, elements, i, length;
      children = (parentElement || document.body).getElementsByTagName("*");
      elements = [];
      child = void 0;
      i = 0;
      length = children.length;
      while (i < length) {
        child = children[i];
        if ((" " + child.className + " ").indexOf(" " + className + " ") !== -1) {
          elements.push(child);
        }
        i++;
      }
      return elements;
    };
    HTMLDivElement.prototype.getElementsByClassName = function(className) {
      return document.getElementsByClassName(className, this);
    };
  }

  window.Authy.Core = (function() {
    var absolutePosFor, countriesList, getMatchingCountryItems, phone, token;
    phone = function(text) {
      return text !== "" && text.match(/^([0-9][0-9][0-9])\W*([0-9][0-9]{2})\W*([0-9]{0,5})$/);
    };
    token = function(text) {
      return text !== "" && text.match(/^\d+$/);
    };
    getMatchingCountryItems = function(text, callback) {
      var countryItem, countryWords, cw, reg, _i, _len, _results;
      text = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      reg = new RegExp("^" + text, "i");
      _results = [];
      for (_i = 0, _len = countriesList.length; _i < _len; _i++) {
        countryItem = countriesList[_i];
        countryWords = countryItem.country.toLowerCase().split(/\s+/);
        cw = 0;
        _results.push((function() {
          var _results1;
          _results1 = [];
          while (cw < countryWords.length) {
            if ((countryWords[cw].length > 2 && countryWords[cw].match(reg)) || ("" + countryItem.code).match(reg)) {
              callback(countryItem);
              break;
            }
            _results1.push(cw++);
          }
          return _results1;
        })());
      }
      return _results;
    };
    countriesList = [
      {
        "country": "United States of America (+1)",
        "code": "1"
      }, {
        "country": "Canada (+1)",
        "code": "1"
      }, {
        "country": "Russia (+7)",
        "code": "7"
      }, {
        "country": "Kazakhstan (+7)",
        "code": "7"
      }, {
        "country": "Egypt (+20)",
        "code": "20"
      }, {
        "country": "South Africa (+27)",
        "code": "27"
      }, {
        "country": "Greece (+30)",
        "code": "30"
      }, {
        "country": "Netherlands (+31)",
        "code": "31"
      }, {
        "country": "Belgium (+32)",
        "code": "32"
      }, {
        "country": "France (+33)",
        "code": "33"
      }, {
        "country": "Spain (+34)",
        "code": "34"
      }, {
        "country": "Hungary (+36)",
        "code": "36"
      }, {
        "country": "Italy (+39)",
        "code": "39"
      }, {
        "country": "Romania (+40)",
        "code": "40"
      }, {
        "country": "Switzerland (+41)",
        "code": "41"
      }, {
        "country": "Austria (+43)",
        "code": "43"
      }, {
        "country": "United Kingdom (+44)",
        "code": "44"
      }, {
        "country": "Guernsey (+44)",
        "code": "44"
      }, {
        "country": "Isle of Man (+44)",
        "code": "44"
      }, {
        "country": "Jersey (+44)",
        "code": "44"
      }, {
        "country": "Denmark (+45)",
        "code": "45"
      }, {
        "country": "Sweden (+46)",
        "code": "46"
      }, {
        "country": "Norway (+47)",
        "code": "47"
      }, {
        "country": "Poland (+48)",
        "code": "48"
      }, {
        "country": "Germany (+49)",
        "code": "49"
      }, {
        "country": "Peru (+51)",
        "code": "51"
      }, {
        "country": "Mexico (+52)",
        "code": "52"
      }, {
        "country": "Cuba (+53)",
        "code": "53"
      }, {
        "country": "Argentina (+54)",
        "code": "54"
      }, {
        "country": "Brazil (+55)",
        "code": "55"
      }, {
        "country": "Chile (+56)",
        "code": "56"
      }, {
        "country": "Colombia (+57)",
        "code": "57"
      }, {
        "country": "Venezuela (+58)",
        "code": "58"
      }, {
        "country": "Malaysia (+60)",
        "code": "60"
      }, {
        "country": "Australia (+61)",
        "code": "61"
      }, {
        "country": "Indonesia (+62)",
        "code": "62"
      }, {
        "country": "Philippines (+63)",
        "code": "63"
      }, {
        "country": "New Zealand (+64)",
        "code": "64"
      }, {
        "country": "Singapore (+65)",
        "code": "65"
      }, {
        "country": "Thailand (+66)",
        "code": "66"
      }, {
        "country": "Japan (+81)",
        "code": "81"
      }, {
        "country": "Korea (+South) (+82)",
        "code": "82"
      }, {
        "country": "Vietnam (+84)",
        "code": "84"
      }, {
        "country": "China (+86)",
        "code": "86"
      }, {
        "country": "Turkey (+90)",
        "code": "90"
      }, {
        "country": "India (+91)",
        "code": "91"
      }, {
        "country": "Pakistan (+92)",
        "code": "92"
      }, {
        "country": "Afghanistan (+93)",
        "code": "93"
      }, {
        "country": "Sri Lanka (+94)",
        "code": "94"
      }, {
        "country": "Myanmar (+95)",
        "code": "95"
      }, {
        "country": "Iran (+98)",
        "code": "98"
      }, {
        "country": "Morocco (+212)",
        "code": "212"
      }, {
        "country": "Algeria (+213)",
        "code": "213"
      }, {
        "country": "Tunisia (+216)",
        "code": "216"
      }, {
        "country": "Libya (+218)",
        "code": "218"
      }, {
        "country": "Gambia (+220)",
        "code": "220"
      }, {
        "country": "Senegal (+221)",
        "code": "221"
      }, {
        "country": "Mauritania (+222)",
        "code": "222"
      }, {
        "country": "Mali Republic (+223)",
        "code": "223"
      }, {
        "country": "Guinea (+224)",
        "code": "224"
      }, {
        "country": "Ivory Coast (+225)",
        "code": "225"
      }, {
        "country": "Burkina Faso (+226)",
        "code": "226"
      }, {
        "country": "Niger (+227)",
        "code": "227"
      }, {
        "country": "Togo (+228)",
        "code": "228"
      }, {
        "country": "Benin (+229)",
        "code": "229"
      }, {
        "country": "Mauritius (+230)",
        "code": "230"
      }, {
        "country": "Liberia (+231)",
        "code": "231"
      }, {
        "country": "Sierra Leone (+232)",
        "code": "232"
      }, {
        "country": "Ghana (+233)",
        "code": "233"
      }, {
        "country": "Nigeria (+234)",
        "code": "234"
      }, {
        "country": "Chad (+235)",
        "code": "235"
      }, {
        "country": "Central African Republic (+236)",
        "code": "236"
      }, {
        "country": "Cameroon (+237)",
        "code": "237"
      }, {
        "country": "Cape Verde Islands (+238)",
        "code": "238"
      }, {
        "country": "Sao Tome and Principe (+239)",
        "code": "239"
      }, {
        "country": "Gabon (+241)",
        "code": "241"
      }, {
        "country": "Congo, Democratic Republ (+243)",
        "code": "243"
      }, {
        "country": "Angola (+244)",
        "code": "244"
      }, {
        "country": "Guinea-Bissau (+245)",
        "code": "245"
      }, {
        "country": "Seychelles (+248)",
        "code": "248"
      }, {
        "country": "Sudan (+249)",
        "code": "249"
      }, {
        "country": "Rwanda (+250)",
        "code": "250"
      }, {
        "country": "Ethiopia (+251)",
        "code": "251"
      }, {
        "country": "Somalia (+252)",
        "code": "252"
      }, {
        "country": "Djibouti (+253)",
        "code": "253"
      }, {
        "country": "Kenya (+254)",
        "code": "254"
      }, {
        "country": "Tanzania (+255)",
        "code": "255"
      }, {
        "country": "Uganda (+256)",
        "code": "256"
      }, {
        "country": "Burundi (+257)",
        "code": "257"
      }, {
        "country": "Mozambique (+258)",
        "code": "258"
      }, {
        "country": "Zambia (+260)",
        "code": "260"
      }, {
        "country": "Madagascar (+261)",
        "code": "261"
      }, {
        "country": "Reunion (+262)",
        "code": "262"
      }, {
        "country": "Zimbabwe (+263)",
        "code": "263"
      }, {
        "country": "Namibia (+264)",
        "code": "264"
      }, {
        "country": "Malawi (+265)",
        "code": "265"
      }, {
        "country": "Lesotho (+266)",
        "code": "266"
      }, {
        "country": "Botswana (+267)",
        "code": "267"
      }, {
        "country": "Swaziland (+268)",
        "code": "268"
      }, {
        "country": "Mayotte Island (+269)",
        "code": "269"
      }, {
        "country": "Aruba (+297)",
        "code": "297"
      }, {
        "country": "Faroe Islands (+298)",
        "code": "298"
      }, {
        "country": "Greenland (+299)",
        "code": "299"
      }, {
        "country": "Gibraltar (+350)",
        "code": "350"
      }, {
        "country": "Portugal (+351)",
        "code": "351"
      }, {
        "country": "Luxembourg (+352)",
        "code": "352"
      }, {
        "country": "Ireland (+353)",
        "code": "353"
      }, {
        "country": "Iceland (+354)",
        "code": "354"
      }, {
        "country": "Albania (+355)",
        "code": "355"
      }, {
        "country": "Malta (+356)",
        "code": "356"
      }, {
        "country": "Cyprus (+357)",
        "code": "357"
      }, {
        "country": "Finland (+358)",
        "code": "358"
      }, {
        "country": "Bulgaria (+359)",
        "code": "359"
      }, {
        "country": "Lithuania (+370)",
        "code": "370"
      }, {
        "country": "Latvia (+371)",
        "code": "371"
      }, {
        "country": "Estonia (+372)",
        "code": "372"
      }, {
        "country": "Moldova (+373)",
        "code": "373"
      }, {
        "country": "Armenia (+374)",
        "code": "374"
      }, {
        "country": "Belarus (+375)",
        "code": "375"
      }, {
        "country": "Andorra (+376)",
        "code": "376"
      }, {
        "country": "Monaco (+377)",
        "code": "377"
      }, {
        "country": "San Marino (+378)",
        "code": "378"
      }, {
        "country": "Ukraine (+380)",
        "code": "380"
      }, {
        "country": "Serbia (+381)",
        "code": "381"
      }, {
        "country": "Montenegro (+382)",
        "code": "382"
      }, {
        "country": "Croatia (+385)",
        "code": "385"
      }, {
        "country": "Slovenia (+386)",
        "code": "386"
      }, {
        "country": "Bosnia-Herzegovina (+387)",
        "code": "387"
      }, {
        "country": "Macedonia (+389)",
        "code": "389"
      }, {
        "country": "Czech Republic (+420)",
        "code": "420"
      }, {
        "country": "Slovakia (+421)",
        "code": "421"
      }, {
        "country": "Liechtenstein (+423)",
        "code": "423"
      }, {
        "country": "Falkland Islands (+500)",
        "code": "500"
      }, {
        "country": "Belize (+501)",
        "code": "501"
      }, {
        "country": "Guatemala (+502)",
        "code": "502"
      }, {
        "country": "El Salvador (+503)",
        "code": "503"
      }, {
        "country": "Honduras (+504)",
        "code": "504"
      }, {
        "country": "Nicaragua (+505)",
        "code": "505"
      }, {
        "country": "Costa Rica (+506)",
        "code": "506"
      }, {
        "country": "Panama (+507)",
        "code": "507"
      }, {
        "country": "Haiti (+509)",
        "code": "509"
      }, {
        "country": "Guadeloupe (+590)",
        "code": "590"
      }, {
        "country": "Bolivia (+591)",
        "code": "591"
      }, {
        "country": "Guyana (+592)",
        "code": "592"
      }, {
        "country": "Ecuador (+593)",
        "code": "593"
      }, {
        "country": "French Guiana (+594)",
        "code": "594"
      }, {
        "country": "Paraguay (+595)",
        "code": "595"
      }, {
        "country": "Martinique (+596)",
        "code": "596"
      }, {
        "country": "Suriname (+597)",
        "code": "597"
      }, {
        "country": "Uruguay (+598)",
        "code": "598"
      }, {
        "country": "Netherlands Antilles (+599)",
        "code": "599"
      }, {
        "country": "Timor-Leste (+670)",
        "code": "670"
      }, {
        "country": "Guam (+1671)",
        "code": "1671"
      }, {
        "country": "Brunei (+673)",
        "code": "673"
      }, {
        "country": "Nauru (+674)",
        "code": "674"
      }, {
        "country": "Papua New Guinea (+675)",
        "code": "675"
      }, {
        "country": "Tonga (+676)",
        "code": "676"
      }, {
        "country": "Solomon Islands (+677)",
        "code": "677"
      }, {
        "country": "Vanuatu (+678)",
        "code": "678"
      }, {
        "country": "Fiji Islands (+679)",
        "code": "679"
      }, {
        "country": "Cook Islands (+682)",
        "code": "682"
      }, {
        "country": "Samoa (+685)",
        "code": "685"
      }, {
        "country": "New Caledonia (+687)",
        "code": "687"
      }, {
        "country": "French Polynesia (+689)",
        "code": "689"
      }, {
        "country": "Korea (+North) (+850)",
        "code": "850"
      }, {
        "country": "HongKong (+852)",
        "code": "852"
      }, {
        "country": "Macau (+853)",
        "code": "853"
      }, {
        "country": "Cambodia (+855)",
        "code": "855"
      }, {
        "country": "Laos (+856)",
        "code": "856"
      }, {
        "country": "Bangladesh (+880)",
        "code": "880"
      }, {
        "country": "International (+882)",
        "code": "882"
      }, {
        "country": "Taiwan (+886)",
        "code": "886"
      }, {
        "country": "Maldives (+960)",
        "code": "960"
      }, {
        "country": "Lebanon (+961)",
        "code": "961"
      }, {
        "country": "Jordan (+962)",
        "code": "962"
      }, {
        "country": "Syria (+963)",
        "code": "963"
      }, {
        "country": "Iraq (+964)",
        "code": "964"
      }, {
        "country": "Kuwait (+965)",
        "code": "965"
      }, {
        "country": "Saudi Arabia (+966)",
        "code": "966"
      }, {
        "country": "Yemen (+967)",
        "code": "967"
      }, {
        "country": "Oman (+968)",
        "code": "968"
      }, {
        "country": "Palestine (+970)",
        "code": "970"
      }, {
        "country": "United Arab Emirates (+971)",
        "code": "971"
      }, {
        "country": "Israel (+972)",
        "code": "972"
      }, {
        "country": "Bahrain (+973)",
        "code": "973"
      }, {
        "country": "Qatar (+974)",
        "code": "974"
      }, {
        "country": "Bhutan (+975)",
        "code": "975"
      }, {
        "country": "Mongolia (+976)",
        "code": "976"
      }, {
        "country": "Nepal (+977)",
        "code": "977"
      }, {
        "country": "Tajikistan (+992)",
        "code": "992"
      }, {
        "country": "Turkmenistan (+993)",
        "code": "993"
      }, {
        "country": "Azerbaijan (+994)",
        "code": "994"
      }, {
        "country": "Georgia (+995)",
        "code": "995"
      }, {
        "country": "Kyrgyzstan (+996)",
        "code": "996"
      }, {
        "country": "Uzbekistan (+998)",
        "code": "998"
      }, {
        "country": "Bahamas (+1242)",
        "code": "1242"
      }, {
        "country": "Barbados (+1246)",
        "code": "1246"
      }, {
        "country": "Anguilla (+1264)",
        "code": "1264"
      }, {
        "country": "Antigua and Barbuda (+1268)",
        "code": "1268"
      }, {
        "country": "Virgin Islands, British (+1284)",
        "code": "1284"
      }, {
        "country": "Cayman Islands (+1345)",
        "code": "1345"
      }, {
        "country": "Bermuda (+1441)",
        "code": "1441"
      }, {
        "country": "Grenada (+1473)",
        "code": "1473"
      }, {
        "country": "Turks and Caicos Islands (+1649)",
        "code": "1649"
      }, {
        "country": "Montserrat (+1664)",
        "code": "1664"
      }, {
        "country": "Saint Lucia (+1758)",
        "code": "1758"
      }, {
        "country": "Dominica (+1767)",
        "code": "1767"
      }, {
        "country": "St. Vincent and The Gren (+1784)",
        "code": "1784"
      }, {
        "country": "Puerto Rico (+1787)",
        "code": "1787"
      }, {
        "country": "Dominican Republic (+1809)",
        "code": "1809"
      }, {
        "country": "Dominican Republic2 (+1829)",
        "code": "1829"
      }, {
        "country": "Dominican Republic3 (+1849)",
        "code": "1849"
      }, {
        "country": "Trinidad and Tobago (+1868)",
        "code": "1868"
      }, {
        "country": "Saint Kitts and Nevis (+1869)",
        "code": "1869"
      }, {
        "country": "Jamaica (+1876)",
        "code": "1876"
      }, {
        "country": "Congo (+242)",
        "code": "242"
      }
    ];
    absolutePosFor = function(element) {
      var absLeft, absTop;
      absTop = 0;
      absLeft = 0;
      while (element) {
        absTop += element.offsetTop;
        absLeft += element.offsetLeft;
        element = element.offsetParent;
      }
      return [absTop, absLeft];
    };
    return {
      validators: {
        phone: phone,
        token: token
      },
      absolutePosFor: absolutePosFor,
      countriesList: countriesList,
      getMatchingCountryItems: getMatchingCountryItems
    };
  })();

  Tooltip = function(options) {
    var create, defaultOptions, self, setupEvents, tooltip;
    tooltip = null;
    self = this;
    defaultOptions = function() {
      if (options.title == null) {
        options.title = "Authy Help Tooltip";
      }
      if (options.message == null) {
        options.message = "This is a help tooltip for your users. You can set the message by doing: authyUI.setTooltip(\"title\", \"message\");";
      }
      if (options.id == null) {
        options.id = "authy-tooltip";
      }
      return options.triggerCloseId != null ? options.triggerCloseId : options.triggerCloseId = "authy-tooltip-close";
    };
    create = function() {
      tooltip = createElement("div");
      tooltip.setAttribute("id", options.id);
      tooltip.innerHTML = "<a id=\"" + options.triggerCloseId + "\"></a><h3 class=\"tooltip-title\">" + options.title + "</h3><p class=\"tooltip-content\">" + options.message + "</p>";
      return appendChild(tooltip);
    };
    setupEvents = function() {
      options.element.onclick = function() {
        self.setupPosition();
        return tooltip.style.display = "block";
      };
      return getById(options.triggerCloseId).onclick = function() {
        return tooltip.style.display = "none";
      };
    };
    (function() {
      defaultOptions();
      create();
      return setupEvents();
    })();
    this.setupPosition = function() {
      var pos, tooltipLeft, tooltipTop;
      pos = Authy.Core.absolutePosFor(options.element);
      tooltipTop = pos[0];
      tooltipLeft = pos[1] + options.element.offsetWidth + 5;
      return tooltip.setAttribute("style", "top:" + tooltipTop + "px;left:" + tooltipLeft + "px;");
    };
    this.set = function() {
      tooltip.getElementsByClassName("tooltip-title")[0].innerHTML = title;
      tooltip.getElementsByClassName("tooltip-content")[0].innerHTML = msg;
    };
    this.destroy = function() {
      return destroyElement(tooltip);
    };
  };

  Token = function(options) {
    var token;
    token = options.element;
    token.onblur = function() {
      if (Authy.Core.validators.token(token.value)) {
        return token.style.backgroundColor = "white";
      } else {
        return token.style.backgroundColor = "#F2DEDE";
      }
    };
    this.disable = function() {
      token.setAttribute("autocomplete", "off");
    };
    this.destroy = function() {};
    (function(_this) {
      return (function() {
        return _this.disable();
      });
    })(this)();
  };

  CellPhone = function(options) {
    var cellPhone;
    cellPhone = options.element;
    cellPhone.onblur = function() {
      if (Authy.Core.validators.phone(cellPhone.value)) {
        return cellPhone.style.backgroundColor = "white";
      } else {
        return cellPhone.style.backgroundColor = "#F2DEDE";
      }
    };
    return;
    return this.destroy = function() {};
  };

  DropDown = function(dropdownOptions) {
    var buildItem, countriesList, findAndSetupCountries, getCountriesArr, getKeyCode, processKey13, processKey38, processKey40, self, setActive, setCountryField, setupCountriesDropdownPosition, setupEvents;
    self = this;
    getKeyCode = function(event) {
      var keyCode;
      if (event && event.which) {
        keyCode = event.which;
      } else if (window.event) {
        keyCode = window.event.keyCode;
      }
      return keyCode;
    };
    getCountriesArr = function() {
      return self.countriesDropdown.getElementsByTagName("li");
    };
    processKey40 = function() {
      var activeElement, countriesArr, i, li, _i, _len;
      countriesArr = getCountriesArr();
      for (i = _i = 0, _len = countriesArr.length; _i < _len; i = ++_i) {
        li = countriesArr[i];
        if (li.className === "active" && countriesArr.length > (i + 1)) {
          activeElement = countriesArr[i + 1];
          li.className = "";
          setActive(activeElement);
          self.autocomplete(activeElement, false);
          break;
        }
      }
      return false;
    };
    processKey38 = function() {
      var activeElement, countriesArr, i;
      countriesArr = getCountriesArr();
      i = countriesArr.length - 1;
      while (i >= 0) {
        if (getCountriesArr()[i].className === "active") {
          getCountriesArr()[i].className = "";
          activeElement = null;
          if (i === 0) {
            activeElement = getCountriesArr()[countriesArr.length - 1];
          } else {
            activeElement = getCountriesArr()[i - 1];
          }
          setActive(activeElement);
          self.autocomplete(activeElement, false);
          return false;
        }
        i--;
      }
      getCountriesArr()[0].setAttribute("class", "active");
    };
    processKey13 = function() {
      var obj;
      obj = self.countriesDropdown.getElementsByClassName("active")[0];
      self.autocomplete(obj, true);
      return false;
    };
    setActive = function(liElement) {
      var li, liElements, _i, _len;
      liElements = getCountriesArr();
      for (_i = 0, _len = liElements.length; _i < _len; _i++) {
        li = liElements[_i];
        li.className = "";
      }
      return liElement.className = "active";
    };
    setupEvents = function() {
      self.countriesInput.onblur = function(event) {
        return processKey13();
      };
      self.countriesInput.onfocus = function() {
        setupCountriesDropdownPosition();
        self.countriesDropdown.style.display = "block";
      };
      self.countriesInput.onkeyup = function(event) {
        var keyID;
        self.countriesDropdown.style.display = "block";
        keyID = getKeyCode(event);
        switch (keyID) {
          case 13:
            processKey13();
            return false;
          case 40:
            if (processKey40() === false) {
              return false;
            }
            break;
          case 38:
            if (processKey38() === false) {
              return false;
            }
        }
        return self.search();
      };
      self.countriesInput.onkeypress = function(event) {
        if (getKeyCode(event) === 13) {
          processKey13();
          return false;
        }
      };
      self.countriesDropdown.onclick = function(e) {
        if (e && e.stopPropagation) {
          self.hideAutocompleteList();
          return e.stopPropagation();
        } else {
          e = window.event;
          return e.cancelBubble = true;
        }
      };
      self.countriesInput.onclick = function(e) {
        if (e && e.stopPropagation) {
          e.stopPropagation();
          self.countriesInput.focus();
          return self.countriesInput.select();
        } else {
          e = window.event;
          return e.cancelBubble = true;
        }
      };
      return addOnClickEvent(function() {
        self.hideAutocompleteList();
      });
    };
    findAndSetupCountries = function() {
      var activeItem, buf, classActive, countries, countriesAutocompleteList, countryItem, i, listItem, name, placeholder, selectValue, _i, _j, _len, _len1, _ref, _ref1;
      if (!self.countriesSelect) {
        return;
      }
      countries = [];
      i = 0;
      while (i < self.countriesSelect.getElementsByTagName("option").length) {
        buf = [];
        buf[0] = self.countriesSelect.getElementsByTagName("option")[i].value;
        buf[1] = self.countriesSelect.getElementsByTagName("option")[i].innerHTML;
        countries.push(buf);
        i++;
      }
      self.countriesSelect.setAttribute("style", "display:none");
      name = self.countriesSelect.getAttribute("name");
      self.countriesSelect.removeAttribute("name");
      self.countryCodeInput.setAttribute("type", "hidden");
      self.countryCodeInput.setAttribute("id", "country-code-" + dropdownOptions.id);
      self.countryCodeInput.setAttribute("name", name);
      classActive = "";
      countriesAutocompleteList = createElement("ul");
      if (self.countriesSelect.getAttribute('data-value')) {
        selectValue = self.countriesSelect.getAttribute('data-value').replace('+', '');
        _ref = countriesList();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          countryItem = _ref[_i];
          if (countryItem.code === selectValue) {
            activeItem = countryItem;
            break;
          }
        }
      }
      if (!activeItem) {
        activeItem = countriesList()[0];
      }
      _ref1 = countriesList();
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        countryItem = _ref1[_j];
        classActive = (activeItem === countryItem ? "active" : "");
        listItem = buildItem(classActive, countryItem);
        countriesAutocompleteList.appendChild(listItem);
        if (activeItem === countryItem) {
          activeItem = listItem;
        }
      }
      self.countriesDropdown.innerHTML = "";
      self.countriesDropdown.appendChild(countriesAutocompleteList);
      appendChild(self.countriesDropdown);
      self.countriesInput.setAttribute("id", "countries-input-" + dropdownOptions.id);
      self.countriesInput.setAttribute("class", "countries-input");
      self.countriesInput.setAttribute("type", "text");
      self.countriesInput.setAttribute("autocomplete", "off");
      if (self.countriesSelect.getAttribute("required") !== null) {
        self.countriesInput.setAttribute("required", "required");
      }
      placeholder = self.countriesSelect.getAttribute("placeholder");
      if (placeholder != null) {
        self.countriesSelect.removeAttribute("placeholder");
        self.countriesInput.setAttribute("placeholder", placeholder);
      }
      self.countriesInputType = self.countriesSelect.getAttribute("data-show-as");
      if (/^number/i.exec(self.countriesInputType)) {
        self.countriesInput.setAttribute("data-show-as", "number");
      }
      self.countriesSelect.parentNode.insertBefore(self.countriesInput, self.countriesSelect);
      if (!self.countryCodeInput.parentNode) {
        self.countriesSelect.parentNode.appendChild(self.countryCodeInput);
      }
      self.countriesDropdown.setAttribute("id", "countries-autocomplete-" + dropdownOptions.id);
      self.countriesDropdown.setAttribute("class", "countries-autocomplete");
      setupCountriesDropdownPosition();
      setupEvents();
      self.autocomplete(activeItem);
    };
    setupCountriesDropdownPosition = function() {
      var pos, width;
      pos = Authy.Core.absolutePosFor(self.countriesInput);
      width = self.countriesInput.offsetWidth;
      if (width < 220) {
        width = 220;
      }
      return self.countriesDropdown.setAttribute("style", "width: " + (width - 5) + "px; top: " + (pos[0] + 2 + self.countriesInput.offsetHeight) + "px; left: " + (pos[1] - 2) + "px;");
    };
    countriesList = function() {
      if (dropdownOptions.defaultCountries) {
        return Authy.Core.countriesList;
      } else {
        return dropdownOptions.countriesList;
      }
    };
    buildItem = function(classActive, countryItem) {
      var cc, flag, li, name;
      cc = countryItem.country.substring(0, 2).toLowerCase() + countryItem.code;
      li = createElement("li");
      if (classActive) {
        li.setAttribute("selected", true);
      }
      li.setAttribute("class", classActive);
      li.setAttribute("data-list-id", dropdownOptions.id);
      li.setAttribute("rel", countryItem.code);
      li.setAttribute("data-name", countryItem.country);
      li.onmouseover = function(event) {
        return setActive(li);
      };
      flag = createElement("span");
      flag.setAttribute("class", "aflag flag-" + cc);
      li.appendChild(flag);
      name = createElement("span");
      name.innerHTML = countryItem.country;
      li.appendChild(name);
      return li;
    };
    setCountryField = function() {
      var countryCode, countryItem, _i, _len, _ref, _results;
      if (!self.countryCodeInput) {
        return;
      }
      countryCode = self.countryCodeInput.value;
      if (countryCode !== '') {
        _ref = countriesList();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          countryItem = _ref[_i];
          if (countryItem.code === countryCode) {
            self.autocomplete(buildItem('active', countryItem), true);
            break;
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };
    (function() {
      self.countriesSelect = dropdownOptions.element;
      self.countryCodeInput = createElement("input");
      self.countriesInput = createElement("input");
      self.countriesDropdown = createElement("div");
      self.buildItem = buildItem;
      self.onSelect = dropdownOptions.onSelect || function() {};
      self.id = dropdownOptions.id;
      findAndSetupCountries();
      return setCountryField();
    })();
    return this;
  };

  DropDown.prototype.destroy = function() {
    destroyElement(this.countriesInput);
    destroyElement(this.countryCodeInput);
    destroyElement(this.countriesSelect);
    return destroyElement(this.countriesDropDown);
  };

  DropDown.prototype.setCountryCode = function(value) {
    this.countryCodeInput.value = value;
    return this.onSelect(value);
  };

  DropDown.prototype.search = function() {
    var classActive, countriesAutocompleteList, firstCountryCodeFound, matches;
    classActive = "active";
    countriesAutocompleteList = createElement("ul");
    firstCountryCodeFound = null;
    matches = false;
    Authy.Core.getMatchingCountryItems(this.countriesInput.value, (function(_this) {
      return function(countryItem) {
        countriesAutocompleteList.appendChild(_this.buildItem(classActive, countryItem));
        classActive = "";
        matches = true;
        if (firstCountryCodeFound == null) {
          return firstCountryCodeFound = countryItem.code;
        }
      };
    })(this));
    if (matches) {
      this.countriesDropdown.innerHTML = "";
      this.countriesDropdown.appendChild(countriesAutocompleteList);
      return this.setCountryCode(firstCountryCodeFound);
    }
  };

  DropDown.prototype.autocomplete = function(obj, hideList) {
    var countryCode;
    countryCode = obj.getAttribute("rel");
    if (this.countriesInput.getAttribute("data-show-as") === "number") {
      this.countriesInput.value = "+" + countryCode;
    } else {
      this.countriesInput.value = obj.getAttribute("data-name");
    }
    this.setCountryCode(countryCode);
    if (hideList) {
      this.hideAutocompleteList();
    }
  };

  DropDown.prototype.hideAutocompleteList = function() {
    if (this.countriesDropdown) {
      return this.countriesDropdown.style.display = "none";
    }
  };

  window.Authy.DropDown = DropDown;

  window.Authy.CellPhone = CellPhone;

  window.Authy.Token = Token;

  window.Authy.Tooltip = Tooltip;

}).call(this);
(function() {
  var getById;

  if (typeof window === "undefined") {
    return;
  }

  getById = function(id) {
    return document.getElementById(id);
  };

  window.Authy.UI = function() {
    var dropdownHandler, tooltipHandler;
    dropdownHandler = null;
    tooltipHandler = null;
    this.init = function() {
      var cellPhone, dropdown, token, tooltip;
      cellPhone = getById("authy-cellphone");
      if (cellPhone) {
        new CellPhone({
          element: cellPhone
        });
      }
      token = getById("authy-token");
      if (token) {
        new Token({
          element: token
        });
      }
      tooltip = getById("authy-help");
      if (tooltip) {
        tooltipHandler = new Tooltip({
          element: tooltip
        });
      }
      dropdown = getById("authy-countries");
      if (dropdown) {
        return dropdownHandler = new Dropdown({
          element: dropdown,
          defaultCountries: true,
          id: 0
        });
      }
    };
    this.searchItem = function() {
      return dropdownHandler.search();
    };
    this.autocomplete = function(obj, hideList) {
      return dropdownHandler.autocomplete(obj, hideList);
    };
    this.setCountryCode = function(countryCode) {
      return dropdownHandler.setCountryCode(countryCode);
    };
    this.setTooltip = function(title, msg) {
      return tooltipHandler.set(title, msg);
    };
  };

  Authy.UI.instance = function() {
    if (!this.ui) {
      this.ui = new Authy.UI();
      this.ui.init();
    }
    return this.ui;
  };

  window.onload = function() {
    return Authy.UI.instance();
  };

}).call(this);
