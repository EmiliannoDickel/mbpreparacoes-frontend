import { Projeto } from '@/types/projeto';
import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api"
});

export class CategoriaService {

    buscarTodas() {
        return axiosInstance.get('categoria/');
    }

    // buscarPorId(id: number) {
    //     return axiosInstance.get('cidade/' + id);
    // }

    inserir(objeto: Projeto.Cidade) {
        return axiosInstance.post('categoria/', objeto);
    }

    alterar(objeto: Projeto.Cidade) {
        return axiosInstance.put('categoria/', objeto);
    }

    excluir(id: number) {
        return axiosInstance.delete('categoria/' + id);
    }

}

