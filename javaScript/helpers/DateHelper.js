export class DateHelper {
    static formataData(data) {
        const dia = ("0" + data.getDate()).slice(-2);
        const mes = ("0" + (data.getMonth() + 1)).slice(-2);
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }
    static formataDataComHorario(data) {
        var dia = data.getDate();
        var mes = data.getMonth() + 1;
        var ano = data.getFullYear();
        var hora = data.getHours();
        var minuto = data.getMinutes();
        return `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano} ${hora < 10 ? '0' + hora : hora}:${minuto < 10 ? '0' + minuto : minuto}`;
    }
}
//# sourceMappingURL=DateHelper.js.map