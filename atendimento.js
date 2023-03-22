class Atendimento {
    constructor(nome, cpf, data, hora) {
        this.nome = nome;
        this.cpf = cpf;
        this.data = data;
        this.hora = hora;
    }

    equals(outroAtendimento) {
        return this.cpf === outroAtendimento.cpf;
    }
}  