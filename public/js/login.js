function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonsDisable();
    togglePasswordErrors();
}

function login() {
    showLoading();
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(() => {
        hideLoading();
        window.location.href = "C:\PlusFarma-1\ProjetoPlusFarma\index.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
    if (error.code == "auth/user-not-found") {
        return "Usuário nao encontrado";
    }
    if (error.code == "auth/wrong-password"){
        return "Senha incorreta";
    }
    if(error.code =="auth/internal-error"){
        return "É necessario inserir a senha";
    }
    if(error.code =="auth/invalid-email"){
        return "É necessario inserir um email ";
    }
    if(error.code =="auth/missing-email"){
        return "É necessario inserir um email ";
    }
    else{
        return "Email enviado com sucesso!"
    }
    return error.message;
}

function register() {
    window.location.href = "../ProjetoPlusFarma/register.html";
}

function recoverPassword() {
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then (() => {
        hideLoading();
        alert ("Email enviado com sucesso");
    }).catch(error => {
     hideLoading();
     alert(getErrorMessage(error));
    });
}

function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function togglePasswordErrors() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    form.recoverPasswordButton().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}

function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    return form.password().value ? true : false;
}

const form = {
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    loginButton: () => document.getElementById("login-button"),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    recoverPasswordButton: () => document.getElementById("recover-password-button"),
} 
function mostrarSenha(){
    var tipo = document.getElementById("password")
    if (tipo.type == "password") {
        tipo.type = "text";
    }else{
        tipo.type = "password";
    }
}