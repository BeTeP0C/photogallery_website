exports.validation = () => {
  document.addEventListener("DOMContentLoaded", () => {


    const maillingInputs = document.querySelectorAll(".mailling__input");
    const applicationInputs = document.querySelectorAll(".application__input");

    const inputs = [];

    const collectInputs = () => {
      maillingInputs.forEach(input => {
        inputs.push(input);
      });

      applicationInputs.forEach(input => {
        inputs.push(input);
      });
    }

    collectInputs();

    const contactsValidate = new JustValidate('.application__form', {
      errorFieldCssClass: 'is-invalid',
      errorFieldStyle: {
        border: '1px solid red',
      },
      errorLabelCssClass: 'is-label-invalid',
      errorLabelStyle: {
        color: 'red',
        textDecoration: 'underlined',
      },
      focusInvalidField: true,
      lockForm: true,
    });

    const studioValidate = new JustValidate('.mailling__form', {
      errorFieldCssClass: 'is-invalid',
      errorFieldStyle: {
        border: '1px solid red',
      },
      errorLabelCssClass: 'is-label-invalid',
      errorLabelStyle: {
        color: 'red',
        textDecoration: 'underlined',
      },
      focusInvalidField: true,
      lockForm: true,
    });

    studioValidate
    .addField('#mailling', [
      {
        rule: 'minLength',
        value: 11,
        errorMessage: "Минимум 11 символа",
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: "Слишком много",
      },
      {
        rule: 'required',
        errorMessage: "Поле пустое",
      },
      {
        validator: (value) => {
          if (value.indexOf("@") === -1) {
            return false;
          }
          return true;
        },
        errorMessage: "Недопустимый формат",
      },
    ]);

    contactsValidate
    .addField('#name', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: "Минимум 3 символа",
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: "Слишком много",
      },
      {
        rule: 'required',
        errorMessage: "Поле пустое",
      },
      {
        validator: (value) => {
          for (let i = 0; i < value.length; i++) {
            if (parseInt(value[i]) ) {
              return false;
            }
          }
          return true;
        },
        errorMessage: "Недопустимый формат",
      },
    ])
    .addField('#Email', [
      {
        rule: 'minLength',
        value: 11,
        errorMessage: "Минимум 11 символа",
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: "Слишком много",
      },
      {
        rule: 'required',
        errorMessage: "Поле пустое",
      },
      {
        validator: (value) => {
          if (value.indexOf("@") === -1) {
            return false;
          }
          return true;
        },
        errorMessage: "Недопустимый формат",
      },
    ])

  });
}
