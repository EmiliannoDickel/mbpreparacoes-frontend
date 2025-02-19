import { Projeto } from '@/types/projeto';
import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api"
});

export class ProdutoService {

    buscarTodos() {
        return axiosInstance.get('produto/');
    }

    // buscarPorId(id: number) {
    //     return axiosInstance.get('cidade/' + id);
    // }

    inserir(objeto: Projeto.Cidade) {
        return axiosInstance.post('produto/', objeto);
    }

    alterar(objeto: Projeto.Cidade) {
        return axiosInstance.put('produto/', objeto);
    }

    excluir(id: number) {
        return axiosInstance.delete('produto/' + id);
    }

}

