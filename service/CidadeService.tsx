import { Projeto } from '@/types/projeto';
import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api"
});

export class CidadeService {

    buscarTodas() {
        return axiosInstance.get('cidade/');
    }

    // buscarPorId(id: number) {
    //     return axiosInstance.get('cidade/' + id);
    // }

    inserir(objeto: Projeto.Cidade) {
        return axiosInstance.post('cidade/', objeto);
    }

    alterar(objeto: Projeto.Cidade) {
        return axiosInstance.put('cidade/', objeto);
    }

    excluir(id: number) {
        return axiosInstance.delete('cidade/' + id);
    }

}

