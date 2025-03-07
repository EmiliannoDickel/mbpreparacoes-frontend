import { Projeto } from '@/types/projeto';
import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api"
});

export class PessoaService {

    buscarTodas() {
        return axiosInstance.get('pessoa/');
    }

    // buscarPorId(id: number) {
    //     return axiosInstance.get('cidade/' + id);
    // }

    inserir(objeto: Projeto.Pessoa) {
        return axiosInstance.post('pessoa/', objeto);
    }

    alterar(id: number, pessoaAtualizada: Projeto.Pessoa) {
        return axiosInstance.put(`pessoa/${id}`, pessoaAtualizada);
    }

    excluir(id: number) {
        return axiosInstance.delete('pessoa/' + id);
    }

}

