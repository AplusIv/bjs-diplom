'use strict';

// Деавторизация
const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    }
  });
}

// Данные текущего пользователя
ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

// Получение текущих курсов
const ratesBoard = new RatesBoard();
function showStocks(board) {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      board.clearTable();
      board.fillTable(response.data);
    }
  });
}

showStocks(ratesBoard);
let timerID = setInterval(showStocks, 60000, ratesBoard);

// 
// Операции с деньгами
const moneyManager = new MoneyManager();

// Пополнение баланса
moneyManager.addMoneyCallback = ({currency, amount}) => {
  ApiConnector.addMoney({currency, amount}, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, 'Ваш баланс успешно обновлён'); // Значение успешности true
    } else {
      moneyManager.setMessage(response.success, response.error); // Значение успешности false
    }
  });
}

// Конвертация валюты
moneyManager.conversionMoneyCallback = ({fromCurrency, targetCurrency, fromAmount}) => {
  ApiConnector.convertMoney({fromCurrency, targetCurrency, fromAmount}, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, `Вы успешно конвертировали ${fromAmount} ${fromCurrency} в ${targetCurrency}`); // Значение успешности true
    } else {
      moneyManager.setMessage(response.success, response.error); // Значение успешности false
    }
  });
}

// Перевод валюты существующему пользователю
moneyManager.sendMoneyCallback = ({to, currency, amount}) => {
  ApiConnector.transferMoney({to, currency, amount}, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, `Вы успешно перевели ${amount} ${currency} пользователю с id ${to}`); // Значение успешности true
    } else {
      moneyManager.setMessage(response.success, response.error); // Значение успешности false
    }
  });
}

// Работа с избранным
const favoritesWidget = new FavoritesWidget();

// Начальный список избранного
ApiConnector.getFavorites((response) => {
  if (response) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data); // Заполняю данные о пользователях в избранное из успешного запроса ApiConnector.getFavorites((response)
    moneyManager.updateUsersList(response.data); // Заполняю выпадающий список для перевода денег 
  }
});

// Добавление пользователя в список избранных
favoritesWidget.addUserCallback = ({id, name}) => {
  ApiConnector.addUserToFavorites({id, name}, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data); // Заполняю данные о пользователях в избранное из успешного запроса ApiConnector.getFavorites((response)
      moneyManager.updateUsersList(response.data); // Заполняю выпадающий список для перевода денег 
      favoritesWidget.setMessage(response.success, `Пользователь ${name} с ID ${id} успешно добавлен в избранное`);
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  });
}

// Удаление пользователя из списка избранных
favoritesWidget.removeUserCallback = (id) => {
  ApiConnector.removeUserFromFavorites(id, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data); // Заполняю данные о пользователях в избранное из успешного запроса ApiConnector.getFavorites((response)
      moneyManager.updateUsersList(response.data); // Заполняю выпадающий список для перевода денег 
      favoritesWidget.setMessage(response.success, `Пользователь с ID ${id} успешно удалён из избранного`);
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  });
}

