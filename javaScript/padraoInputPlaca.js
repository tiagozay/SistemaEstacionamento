export function configuraInputsDePlaca() {
    document.addEventListener('input', (event) => {
        var _a;
        let alvo = event.target;
        if (alvo.classList.contains('padraoInputPlaca')) {
            alvo.value = alvo.value.toUpperCase();
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