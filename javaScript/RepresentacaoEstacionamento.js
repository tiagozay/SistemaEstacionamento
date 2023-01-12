import { $, createDomElement } from './lib/funcoesUtilitarias.js';
export class RepresentacaoEstacionamento {
    static estacionarVeiculo(nomeVaga, placa) {
        const carro = RepresentacaoEstacionamento.criaUmNovoCarro(placa);
        let vaga = $(`#vaga_${nomeVaga}`);
        const pXVaga = Number(vaga.dataset.columnstart);
        const pYVaga = Number(vaga.dataset.rowstart);
        const interval = setInterval(() => {
            if (RepresentacaoEstacionamento.cordenadas.inicioX >= 0 && RepresentacaoEstacionamento.cordenadas.inicioY == 5) {
                RepresentacaoEstacionamento.cordenadas.inicioX--;
                RepresentacaoEstacionamento.cordenadas.fimX--;
                carro.style.transform = 'rotate(-91deg)';
            }
            if (RepresentacaoEstacionamento.cordenadas.inicioX == 0 && RepresentacaoEstacionamento.cordenadas.inicioY >= 2) {
                RepresentacaoEstacionamento.cordenadas.inicioY--;
                RepresentacaoEstacionamento.cordenadas.fimY--;
                carro.style.transform = 'rotate(0deg)';
            }
            if (RepresentacaoEstacionamento.cordenadas.inicioY == 2 && RepresentacaoEstacionamento.cordenadas.inicioX < 14) {
                RepresentacaoEstacionamento.cordenadas.inicioX++;
                RepresentacaoEstacionamento.cordenadas.fimX++;
                carro.style.transform = 'rotate(90deg)';
            }
            RepresentacaoEstacionamento.aplicaCordenadas(carro);
            const yMais1 = pYVaga + 1;
            const yMenos1 = pYVaga - 1;
            if (RepresentacaoEstacionamento.cordenadas.inicioX == pXVaga && (yMais1 == RepresentacaoEstacionamento.cordenadas.inicioY || yMenos1 == RepresentacaoEstacionamento.cordenadas.inicioY)) {
                clearInterval(interval);
                setTimeout(() => {
                    RepresentacaoEstacionamento.cordenadas.inicioY = pYVaga;
                    RepresentacaoEstacionamento.cordenadas.fimY = pYVaga;
                    carro.style.transform = 'rotate(0deg)';
                    if (pYVaga != 3) {
                        carro.classList.add("carroEstacionado");
                    }
                    RepresentacaoEstacionamento.aplicaCordenadas(carro);
                }, 500);
                return;
            }
        }, 300);
    }
    static removerVeiculo(placa) {
        const veiculo = $(`#carro_${placa}`);
        veiculo === null || veiculo === void 0 ? void 0 : veiculo.remove();
    }
    static aplicaCordenadas(carro) {
        carro.style.gridRowStart = `${RepresentacaoEstacionamento.cordenadas.inicioY}`;
        carro.style.gridRowEnd = `${RepresentacaoEstacionamento.cordenadas.fimY}`;
        carro.style.gridColumnStart = `${RepresentacaoEstacionamento.cordenadas.inicioX}`;
        carro.style.gridColumnEnd = `${RepresentacaoEstacionamento.cordenadas.fimX}`;
    }
    static criaUmNovoCarro(placa) {
        const carro = createDomElement("div", `carro_${placa}`, null, 'carro');
        carro.innerHTML = `
            <div id="carro_teto" class='teto'></div>
            <div id="carro_linhaLanternasTraseiras">
                <div class="lanterna"></div>
                <div class="lanterna"></div>
            </div>
        `;
        this.estacionamento.appendChild(carro);
        RepresentacaoEstacionamento.cordenadas = {
            inicioY: 5,
            fimY: 6,
            inicioX: 14,
            fimX: 15,
        };
        const balaoPlaca = $("#balaoPlacaVeiculo");
        carro.addEventListener('mousemove', (event) => {
            let target = event.target;
            if (target.classList.contains("teto")) {
                target = target.parentNode;
            }
            balaoPlaca.style.display = 'flex';
            balaoPlaca.style.top = `${target.offsetTop + 70}px`;
            balaoPlaca.style.left = `${target.offsetLeft - 11.29}px`;
        });
        carro.addEventListener('mouseout', () => {
            balaoPlaca.style.display = 'none';
        });
        return carro;
    }
}
RepresentacaoEstacionamento.estacionamento = $("#representacaoEstacionamento__estacionamento");
RepresentacaoEstacionamento.cordenadas = {
    inicioY: 5,
    fimY: 6,
    inicioX: 14,
    fimX: 15,
};
//# sourceMappingURL=RepresentacaoEstacionamento.js.map