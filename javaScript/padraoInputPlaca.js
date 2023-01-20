export function configuraInputsDePlaca() {
    document.addEventListener('input', (event) => {
        var _a;
        let alvo = event.target;
        if (alvo.classList.contains('padraoInputPlaca')) {
            alvo.value = alvo.value.toUpperCase();
            //Este if faz com que o limite de caracteres para a placa não seja atingido, fique em 7, desconsiderando o traço
            if (alvo.value.replace(/-/, '').trim().length > 7) {
                alvo.value = alvo.value.substring(0, 8);
            }
            if ((_a = alvo.value[4]) === null || _a === void 0 ? void 0 : _a.match(/[0-9]/)) {
                if (alvo.value.includes('-')) {
                    return;
                }
                let primeiraPartePlaca = alvo.value.substring(0, 3);
                let segunaParte = alvo.value.substring(3);
                alvo.value = `${primeiraPartePlaca}-${segunaParte}`;
            }
            else {
                alvo.value = alvo.value.replace(/-/, "");
            }
        }
    });
}
//# sourceMappingURL=padraoInputPlaca.js.map