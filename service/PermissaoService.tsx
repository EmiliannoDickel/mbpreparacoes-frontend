import { Projeto } from '@/types/projeto';
import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api"
});

export class PermissaoService {

    pegarPermissoesLista() {
        return axiosInstance.get('permissao/');
    }

    // buscarPorId(id: number) {
    //     return axiosInstance.get('cidade/' + id);
    // }

    criarPermissao(objeto: Projeto.Permissao) {
        return axiosInstance.post('permissao/', objeto);
    }

    atualizarPermissao(id: number, objeto: Projeto.Permissao) {
        return axiosInstance.put('permissao/' + id + objeto);
    }

    excluir(id: number) {
        return axiosInstance.delete('permissao/' + id);
    }

}

