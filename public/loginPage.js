'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
    const callbackForLogin = (response) => {
        if (response.success) {
            location.reload();
        }
        userForm.setLoginErrorMessage(response.error);
        return;
    }
    ApiConnector.login(data, callbackForLogin);
};
userForm.registerFormCallback = (data) => {
    const callbackForRegister = (response) => {
        if (response.success) {
            location.reload();
        }
        userForm.setRegisterErrorMessage(response.error);
        return
    }
    ApiConnector.register(data, callbackForRegister);
};


