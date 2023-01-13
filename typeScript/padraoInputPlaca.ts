export function configuraInputsDePlaca()
{
    document.addEventListener('input', (event: Event) => {

        let alvo = event.target as HTMLInputElement;
    
        if(alvo.classList.contains('padraoInputPlaca')){
    
            alvo.value = alvo.value.toUpperCase();
    
            if(alvo.value[4]?.match(/[0-9]/)){
    
                if(alvo.value.includes('-')){
                    return;
                }
    
                let primeiraPartePlaca = alvo.value.substring(0, 3);
                let segunaParte = alvo.value.substring(3);
                alvo.value = `${primeiraPartePlaca}-${segunaParte}`;
            }else{
                alvo.value = alvo.value.replace(/-/, "");
            }
    
        }
    
    });
}