import { Projeto } from '@/types/projeto';
import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api"
});

export class PermissaoService {

    buscarTodas() {
        return axiosInstance.get('permissao/');
    }

    // buscarPorId(id: number) {
    //     return axiosInstance.get('cidade/' + id);
    // }

    inserir(objeto: Projeto.Permissao) {
        return axiosInstance.post('permissao/', objeto);
    }

    alterar(objeto: Projeto.Permissao) {
        return axiosInstance.put('permissao/', objeto);
    }

    excluir(id: number) {
        return axiosInstance.delete('permissao/' + id);
    }

}

