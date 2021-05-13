'use strict';

const userForm = new UserForm();
// ??? Почему loginFormCallback и аналогичные свойства из других частей работы являются именно свойствами по заданию?
// Мне казалось, что если в свойство объекта записана функция, то это уже методом является. Мой вопрос скорее морфологический. Я как-то не так рассуждаю?

userForm.loginFormCallback = (data) => {
  console.log(this); // ??? Путаюсь с this. Почему он указывает на Window? Потому что я использую стрелочную функцию,да? 
  // Не стоило ли писать код с обычной функцией и обращаться к объекту userForm через this? 
  // P.s: Я попробовал использовать обычную функцию, в консоли выдался класс Userfom, а не экземпляр userform, как мне бы этого хотелось. Это правильно? 
  // Как бы мне поместить в this сам экземпляр?
  
  console.log(data); // Я оставлял по тексту работы выводы в консоль. Для удобства. Так как это черновая версия, думаю не страшно будет
  
  // login() возвращает распарсенный ответ благодаря методу parseResponseBody()
  ApiConnector.login(data, (response) => {
    console.log(response);
    // response.succes ? location.reload() : userForm.setLoginErrorMessage(response.error);

    if (response.success) {
      console.log(response.success);
      location.reload();
    } else {
      console.log(response.error);
      userForm.setLoginErrorMessage(response.error);        
    }
  });
}

userForm.registerFormCallback = (data) => {
  console.log(data);
  // login() возвращает распарсенный ответ благодаря методу parseResponseBody()
  ApiConnector.register(data, (response) => {
    console.log(response);
    // response.succes ? location.reload() : userForm.setRegisterErrorMessage(response.error);

    if (response.success) {
      console.log(response.success);
      location.reload();
    } else {
      console.log(response.error);
      userForm.setRegisterErrorMessage(response.error);        
    }
  });
}
