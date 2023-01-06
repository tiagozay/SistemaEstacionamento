import { $, createDomElement } from "./lib/funcoesUtilitarias.js";
import { AcaoRegistro, CampoDosRegistros, ZayDataTable } from "./lib/ZayDataTable.js";
class Usuario {
    constructor(id, usuario, email, nome, perfilDeAcesso, ativo) {
        this.id = id;
        this.usuario = usuario;
        this.email = email;
        this.nome = nome;
        this.perfilDeAcesso = perfilDeAcesso;
        this.ativo = ativo;
    }
    formataParaEscita() {
        return {
            id: this.id,
            usuario: this.usuario,
            email: this.email,
            nome: this.nome,
            perfilDeAcesso: this.perfilDeAcesso,
            ativo: this.ativo ? "Sim" : "Não"
        };
    }
    static formataUsuariosParaListar(usuarios) {
        return usuarios.map(usuario => usuario.formataParaEscita());
    }
}
const usuarios = [
    new Usuario('1', 'tiagozay', 'tiagozay@gmail.com', 'Tiago zay', 'Administrador', true),
    new Usuario('2', 'pedromarques', 'pedromarques@gmail.com', 'Tiago zay', 'Operador', true),
    new Usuario('3', 'josesouza', 'josesouza@gmail.com', 'Jose souza', 'Operador', false),
];
const btnEditarUsuario = createDomElement("button", null, 'edit', 'material-icons', 'tabela__btnEditar');
const btnExcluirUsuario = createDomElement("button", null, 'delete', 'material-icons', 'tabela__btnExcluir');
const nomeTabela = 'listagemUsuarios';
export function listarUsuarios() {
    const dados = Usuario.formataUsuariosParaListar(usuarios);
    const zayDataTable__usuarios = new ZayDataTable(nomeTabela, $("#tabelaUsuarios"), [
        new CampoDosRegistros('Usuário', 'usuario'),
        new CampoDosRegistros('E-mail', 'email'),
        new CampoDosRegistros('Nome', 'nome'),
        new CampoDosRegistros('Perfil de acesso', 'perfilDeAcesso'),
        new CampoDosRegistros("Ativo", 'ativo', (ativo) => {
            if (ativo == "Sim") {
                return `
                        <p class="p_textoAtivo">
                            <i class="material-icons">lock_open</i>
                            Sim
                        </p>
                    `;
            }
            else if (ativo == "Não") {
                return `
                        <p class="p_textoInativo">
                            <i class="material-icons">lock</i>
                            Não
                        </p>
                    
                    `;
            }
            return ativo;
        }),
    ], 'id', dados, [
        new AcaoRegistro(btnEditarUsuario, () => { }),
        new AcaoRegistro(btnExcluirUsuario, () => { }),
    ], null, 5);
}
//# sourceMappingURL=listagemUsuarios.js.map