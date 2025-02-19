declare namespace Projeto {
    
    export type Estado = {
        id?: number;
        nome: string;
        sigla: string;
    }
 
    
    export type Cidade = {
        id?: number;
        nome: string;
        estado: Estado;
    }

    export type Marca = {
        id?: number;
        nome: string;
    }

    export type Categoria = { 
        id?: number;
        nome: string;
    }

    export type Produto = {
        id?: number;
        descricaoSimples: string;
        descricao: string;
        precoCusto: number;
        precoVenda: number;
        marca: Marca;
        categoria: Categoria;
    }

    export type Pessoa = {
        id?: number;
        nome: string;
        cpf: string;
        email: string;
        endereco : string;
        cep: string;
        cidade: Cidade;

    }
}

export { Projeto };