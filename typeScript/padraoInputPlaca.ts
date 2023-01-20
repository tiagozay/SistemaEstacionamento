export function configuraInputsDePlaca()
{
    document.addEventListener('input', (event: Event) => {

        let alvo = event.target as HTMLInputElement;
    
        if(alvo.classList.contains('padraoInputPlaca')){
    
            alvo.value = alvo.value.toUpperCase().trim();

            //Este if faz com que o limite de caracteres para a placa não seja atingido, fique em 7, desconsiderando o traço
            if(alvo.value.replace(/-/, '').length > 7){
                alvo.value = alvo.value.replace(/-/, '').substring(0, 7);
            }
    
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