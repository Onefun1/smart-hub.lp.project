(function () {
  'use strict';

  function headerBurgerInit() {
    var burgerItem = document.querySelector(".burger");
    var menu = document.querySelector(".header__nav");
    var menuCloseItem = document.querySelector(".nav__close");
    burgerItem.addEventListener("click", function () {
      menu.classList.add("nav--active");
      burgerItem.classList.add("burder--hide");
    });
    menuCloseItem.addEventListener("click", function () {
      menu.classList.remove("nav--active");
      burgerItem.classList.remove("burder--hide");
    });
  }

  function smoothScroll() {
    var menu = document.querySelector(".header__nav");
    var burgerItem = document.querySelector(".burger");
    var linkNav = document.querySelectorAll('[href^="#"]'),
        V = 0.2;

    for (var i = 0; i < linkNav.length; i++) {
      linkNav[i].addEventListener("click", function (e) {
        e.preventDefault();
        menu.classList.remove("nav--active");
        burgerItem.classList.remove("burder--hide");
        var w = window.pageYOffset,
            hash = this.href.replace(/[^#]*(.*)/, "$1");
        var t = document.querySelector(hash).getBoundingClientRect().top;
        var start = null;
        requestAnimationFrame(step);

        function step(time) {
          if (start === null) start = time;
          var progress = time - start,
              r = t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t);
          window.scrollTo(0, r);

          if (r != w + t) {
            requestAnimationFrame(step);
          } else {
            location.hash = hash;
          }
        }
      }, false);
    }
  }

  function getCurrentYear() {
    var year = new Date().getFullYear();
    var placeY = document.getElementsByClassName("year");

    for (var i = 0; i < placeY.length; i++) {
      var elemY = placeY[i];
      elemY.innerHTML = year;
    }
  }

  function createCustomSelectFunctionality() {
    var selectHeader = document.querySelectorAll(".select__header");
    var selectItem = document.querySelectorAll(".select__item");
    var companyTypeSelect = document.querySelector(".js-company__value");
    var aboutUsSelect = document.querySelector(".js-about__value");
    selectHeader.forEach(function (item) {
      item.addEventListener("click", selectToggle);
    });
    selectItem.forEach(function (item) {
      item.addEventListener("click", selectChoose);
    });

    function selectToggle() {
      // document.querySelectorAll(".select").forEach((item) => {
      //   item.classList.remove("is-active");
      // });
      this.parentElement.classList.toggle("is-active");
    }

    function selectChoose() {
      var text = this.innerText,
          select = this.closest(".select"),
          currentText = select.querySelector(".select__current");
      currentText.innerText = text;
      currentText.classList.add("select__current--selected");
      select.classList.remove("is-active");

      if (select.classList.contains("select-type")) {
        companyTypeSelect.value = text;
      } else {
        aboutUsSelect.value = text;
      }
    }
  }

  function validationForm() {
    var form = document.getElementById("form"),
        username = document.getElementById("username"),
        email = document.getElementById("email"),
        companyName = document.getElementById("company-name"),
        companyType = document.getElementById("company-type"),
        aboutUs = document.getElementById("about-us"),
        message = document.getElementById("message");
    form.addEventListener("submit", function (e) {
      console.log("CLICK");
      e.preventDefault();
      checkInputs();
    });

    function checkInputs() {
      var usernameValue = username.value.trim(),
          emailValue = email.value.trim(),
          companyNameValue = companyName.value.trim(),
          messageValue = message.value.trim(),
          companyTypeValue = companyType.value,
          aboutUsValue = aboutUs.value;

      if (usernameValue === "") {
        setErrorFor(username, "Username cannot be blank");
      } else {
        setSuccessFor(username);
      }

      if (emailValue === "") {
        setErrorFor(email, "Email cannot be blank");
      } else if (!isEmail(emailValue)) {
        setErrorFor(email, "Not a valid email");
      } else {
        setSuccessFor(email);
      }

      if (companyNameValue === "") {
        setErrorFor(companyName, "Field cannot be blank");
      } else {
        setSuccessFor(companyName);
      }

      if (companyTypeValue === "") {
        setErrorFor(companyType, "Field cannot be blank");
      } else {
        setSuccessFor(companyType);
      }

      if (aboutUsValue === "") {
        setErrorFor(aboutUs, "Field cannot be blank");
      } else {
        setSuccessFor(aboutUs);
      }

      if (messageValue === "") {
        setErrorFor(message, "Field cannot be blank");
      } else {
        setSuccessFor(message);
      }

      if (usernameValue && emailValue && isEmail(emailValue) && companyNameValue && companyTypeValue && messageValue && grecaptcha.getResponse()) {
        var blockStart = document.querySelector(".start");
        blockStart.classList.add("submited");
        setTimeout(function () {
          blockStart.classList.remove("submited");
        }, 2500);
      }
    }

    function setErrorFor(input, message) {
      var formWrap = input.parentElement;
      var small = formWrap.querySelector("small");
      formWrap.classList.remove("success");
      formWrap.classList.add("error");
      small.innerText = message;
    }

    function setSuccessFor(input) {
      var formWrap = input.parentElement;
      formWrap.classList.remove("error");
      formWrap.classList.add("success");
    }

    function isEmail(email) {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      return reg.test(email);
    }
  }

  function main() {
    headerBurgerInit();
    smoothScroll();
    getCurrentYear();
    createCustomSelectFunctionality();
    validationForm();
  }

  document.addEventListener("DOMContentLoaded", main);

}());
