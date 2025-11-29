'use strict';

const logoutButtton = new LogoutButton();

logoutButtton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });
};

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

getCourse();
setInterval(getCourse, 60000);
function getCourse() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        };
    });
};

const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

moneyManager.addMoneyCallback = (formAddMoney) => {
    ApiConnector.addMoney(formAddMoney, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            favoritesWidget.setMessage(true, "Операция успешна");
        } else {
            favoritesWidget.setMessage(false, response.error);
        };
    });
};

moneyManager.conversionMoneyCallback = (formForСonversion) => {
    ApiConnector.convertMoney(formForСonversion, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            favoritesWidget.setMessage(true, "Операция успешна");
        } else {
            favoritesWidget.setMessage(false, response.error);
        };
    });
};

moneyManager.sendMoneyCallback = (formForTransferMoney) => {
    ApiConnector.transferMoney(formForTransferMoney, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            favoritesWidget.setMessage(true, "Операция успешна");
        } else {
            favoritesWidget.setMessage(false, response.error);
        };
    });
};

ApiConnector.getFavorites(response => {
    if (response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = (dataUser) => {
    ApiConnector.addUserToFavorites(dataUser, response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь добавлен");
        } else {
            favoritesWidget.setMessage(false, response.error);
        };
    });
};

favoritesWidget.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь удален");
        } else {
            favoritesWidget.setMessage(false, response.error);
        };
    });
};