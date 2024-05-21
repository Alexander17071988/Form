document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");

  // Маски для полей
  const carNumberInput = document.getElementById("carNumber");
  const carNumberErrorInput = document.getElementById("carNumberError");
  const carNameInput = document.getElementById("carName");
  const carNameErrorInput = document.getElementById("carNameError")
  const carDateArriveInput = document.getElementById("carDateArrive");
  const carDateArriveInputError = document.getElementById("carDateArriveError");
  const FIOInput = document.getElementById("FIO");
  const FIOErrorInput = document.getElementById("FIOError");
  const passportSeriesInput = document.getElementById("passportSeries");
  const passportNumberInput = document.getElementById("passportNumber");
  const pasportSeriesNumberErrorInput = document.getElementById("passportError");
  const passportIssuedInput = document.getElementById("passportIssued");
  const passportIssuedErrorInput = document.getElementById("passportIssuedError");
  const passportDateInput = document.getElementById("passportDate");
  const passportDateInputError = document.getElementById("passportDateError");
  const btnRight = document.getElementById("btnRight");

  // Функция для загрузки данных из LocalStorage и заполнения полей
  function loadFormData() {
    const dateCarNumberValue = localStorage.getItem("carNumber");
    const dateCarNameValue = localStorage.getItem("carName");
    const dateCarDateArriveValue = localStorage.getItem("carDateArrive");
    const dateFIOValue = localStorage.getItem("FIO");
    const datePassportSeriesValue = localStorage.getItem("passportSeries");
    const datePassportNumberValue = localStorage.getItem("passportNumber");
    const datePassportIssuedValue = localStorage.getItem("issuedPassport");
    const datePassportDateValue = localStorage.getItem("passportDate");

    if (dateCarNumberValue) {
      carNumberInput.value = dateCarNumberValue;
      carNameInput.value = dateCarNameValue;
      carDateArriveInput.value = dateCarDateArriveValue;
      FIOInput.value = dateFIOValue;
      passportSeriesInput.value = datePassportSeriesValue;
      passportNumberInput.value = datePassportNumberValue;
      passportIssuedInput.value = datePassportIssuedValue;
      passportDateInput.value = datePassportDateValue;
    }
  }

  //Функция для сохранения данных в LocalStorage
  function saveFormData() {
    const dateCarNumberValue = carNumberInput.value;
    const dateCarNameValue = carNameInput.value;
    const dateCarDateArriveValue = carDateArriveInput.value;
    const dateFIOValue = FIOInput.value;
    const datePassportSeriesValue = passportSeriesInput.value;
    const datePassportNumberValue = passportNumberInput.value;
    const datePassportIssuedValue = passportIssuedInput.value;
    const datePassportDateValue = passportDateInput.value;

    localStorage.setItem("carNumber", dateCarNumberValue);
    localStorage.setItem("carName", dateCarNameValue);
    localStorage.setItem("carDateArrive", dateCarDateArriveValue);
    localStorage.setItem("FIO", dateFIOValue);
    localStorage.setItem("passportSeries", datePassportSeriesValue);
    localStorage.setItem("passportNumber", datePassportNumberValue);
    localStorage.setItem("issuedPassport", datePassportIssuedValue);
    localStorage.setItem("passportDate", datePassportDateValue);
  }

  loadFormData();

  // Регулярное выражение для проверки валидности гос-номера
  const regex = /^[АВЕКМНОРСТУХ]{1}\d{3}[АВЕКМНОРСТУХ]{2}\d{2,3}$/;

  // Регулярное выражение для валидности ФИО
  const fioPattern = /^[А-ЯЁ][а-яё]+(?:-[А-ЯЁ][а-яё]+)?\s[А-ЯЁ][а-яё]+(?:-[А-ЯЁ][а-яё]+)?\s[А-ЯЁ][а-яё]+(?:-[А-ЯЁ][а-яё]+)?$/;

  //Управление отображением даты в поле "Ориентировочная дата прибытия покупателя"
  carDateArriveInput.addEventListener('focus', function () {
    this.type = 'date';
    this.placeholder = '';
    if (this.value) {
      const dateParts = this.value.split('.');
      if (dateParts.length === 3) {
        this.value = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
      }
    }
  });

  carDateArriveInput.addEventListener('blur', function () {
    if (!this.value) {
      this.type = 'text';
      this.placeholder = 'Дата*';
    } else {
      const date = new Date(this.value);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      this.type = 'text';
      this.value = `${day}.${month}.${year}`;
      this.placeholder = 'Дата*';
    }
  });

  passportDateInput.addEventListener('blur', function () {
    if (!this.value) {
      this.type = 'text';
      this.placeholder = 'Дата*';
    } else {
      const date = new Date(this.value);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      this.type = 'text';
      this.value = `${day}.${month}.${year}`;
      this.placeholder = 'Дата*';
    }
  });

  // Функция валидации
  function validation() {
    let result = true;
    // Проверка гос-номера
    if (carNumberInput.value == "") {
      carNumberErrorInput.classList.add("visible");
      carNumberInput.classList.add("invalid");
      carNumberErrorInput.textContent = "Введите гос-номер"
      result = false;
    } else if (!regex.test(carNumberInput.value)) {
      carNumberErrorInput.classList.add("visible");
      carNumberInput.classList.add("invalid");
      carNumberErrorInput.textContent = "Введите правильный гос-номер";
      result = false;
    } else {
      carNumberErrorInput.classList.remove("visible");
      carNumberInput.classList.remove("invalid");
    }

    //Проверка валидномти названия транспортного средства
    if (carNameInput.value == "") {
      carNameErrorInput.classList.add("visible");
      carNameInput.classList.add("invalid");
      carNameErrorInput.textContent = "Введите название транспортного средства";
      result = false;
    } else {
      carNameErrorInput.classList.remove("visible");
      carNameInput.classList.remove("invalid");
    }

    //Проверка валидности ориентировочной даты прибытия покупателя
    if (!carDateArriveInput.value) {
      carDateArriveInputError.classList.add("visible");
      carDateArriveInput.classList.add("invalid");
      carDateArriveInputError.textContent = "Введите ориентировочную дату прибытия покупателя";
      result = false;
    } else {
      carDateArriveInputError.classList.remove("visible");
      carDateArriveInput.classList.remove("invalid");
    }

    // Проверка валидности ФИО
    if (FIOInput.value == "") {
      FIOErrorInput.classList.add("visible");
      FIOInput.classList.add("invalid");
      FIOErrorInput.textContent = "Введите ФИО";
      result = false
    } else if (!fioPattern.test(FIOInput.value)) {
      FIOErrorInput.classList.add("visible");
      FIOInput.classList.add("invalid");
      FIOErrorInput.textContent = "Введите корректное ФИО";
      result = false;
    } else {
      FIOErrorInput.classList.remove("visible");
      FIOInput.classList.remove("invalid");
    }

    //Проверка валидности серии и номера паспорта
    if (passportSeriesInput.value == "" || passportNumberInput.value == "") {
      pasportSeriesNumberErrorInput.classList.add("visible");
      passportSeriesInput.classList.add("invalid");
      passportNumberInput.classList.add("invalid");
      pasportSeriesNumberErrorInput.textContent = "Введите серию и номер паспорта";
      result = false;
    } else if ((passportSeriesInput.value.length !== 4) || (passportNumberInput.value.length !== 6)) {
      pasportSeriesNumberErrorInput.classList.add("visible");
      passportSeriesInput.classList.add("invalid");
      passportNumberInput.classList.add("invalid");
      pasportSeriesNumberErrorInput.textContent = "Введите правильную серию и номер паспорта";
      result = false;
    } else {
      pasportSeriesNumberErrorInput.classList.remove("visible");
      passportSeriesInput.classList.remove("invalid");
      passportNumberInput.classList.remove("invalid");
    }

    //Проверка валидности поля "Кем выдан"
    if (passportIssuedInput.value == "") {
      passportIssuedErrorInput.classList.add("visible");
      passportIssuedInput.classList.add("invalid");
      passportIssuedErrorInput.textContent = "Заполните кем выдан паспорт";
      result = false;
    } else {
      passportIssuedErrorInput.classList.remove("visible");
      passportIssuedInput.classList.remove("invalid");
    }

    //Проверка валидности поля "Кем выдан паспорт"
    if (!passportDateInput.value) {
      passportDateInputError.classList.add("visible");
      passportDateInput.classList.add("invalid");
      passportDateInputError.textContent = "Введите когда выдан паспорт";
      result = false;
    } else {
      passportDateInputError.classList.remove("visible");
      passportDateInput.classList.remove("invalid");
    }
    return result;
  }

  carNumberInput.addEventListener("input", function () {
    carNumberErrorInput.classList.remove("visible");
    carNumberInput.classList.remove("invalid");
  });

  carNameInput.addEventListener("input", function () {
    carNameErrorInput.classList.remove("visible");
    carNameInput.classList.remove("invalid");
  });

  carDateArriveInput.addEventListener("focus", function () {
    carDateArriveInputError.classList.remove("visible");
    carDateArriveInput.classList.remove("invalid");
  });

  FIOInput.addEventListener("input", function () {
    FIOErrorInput.classList.remove("visible");
    FIOInput.classList.remove("invalid");
  });

  passportSeriesInput.addEventListener("input", function () {
    pasportSeriesNumberErrorInput.classList.remove("visible");
    passportSeriesInput.classList.remove("invalid");
  });

  passportNumberInput.addEventListener("input", function () {
    pasportSeriesNumberErrorInput.classList.remove("visible");
    passportNumberInput.classList.remove("invalid");
  });

  passportIssuedInput.addEventListener("input", function () {
    passportIssuedErrorInput.classList.remove("visible");
    passportIssuedInput.classList.remove("invalid");
  });

  passportDateInput.addEventListener("focus", function () {
    passportDateInputError.classList.remove("visible");
    passportDateInput.classList.remove("invalid");
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validation()) {
      alert("Форма отправлена успешно")
      saveFormData();
    } else {
      alert("Форма не отпралена, проверьте заполнение полей");
    }
  });

  btnRight.addEventListener("click", function (event) {
    event.preventDefault();
    form.reset();
    carNumberInput.classList.remove("invalid");
    carNumberErrorInput.classList.remove("visible");
    carNameInput.classList.remove("invalid");
    carNameErrorInput.classList.remove("visible");
    carDateArriveInput.classList.remove("invalid");
    carDateArriveInputError.classList.remove("visible");
    carDateArriveInput.placeholder = "text";
    FIOInput.classList.remove("invalid");
    FIOErrorInput.classList.remove("visible");
    passportSeriesInput.classList.remove("invalid");
    passportNumberInput.classList.remove("invalid");
    pasportSeriesNumberErrorInput.classList.remove("visible");
    passportIssuedInput.classList.remove("invalid");
    passportIssuedErrorInput.classList.remove("visible");
    passportDateInput.classList.remove("invalid");
    passportDateInputError.classList.remove("visible");
    passportDateInput.placeholder = "text";
  })
});