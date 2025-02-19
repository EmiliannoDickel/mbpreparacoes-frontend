import { Projeto } from '@/types/projeto';
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api"
});

export class MarcaService {
    buscarTodas() {
        return axiosInstance.get('marca/');
    }

    // buscarPorId(id: number) {
    //     return axiosInstance.get('marca/' + id);
    // }

    inserir(objeto: Projeto.Estado) {
        return axiosInstance.post('marca/', objeto);
    }

    alterar(objeto: Projeto.Estado) {
        return axiosInstance.put('marca/', objeto);
    }

    excluir(id: number) {
        return axiosInstance.delete('marca/' + id);
    }
}
