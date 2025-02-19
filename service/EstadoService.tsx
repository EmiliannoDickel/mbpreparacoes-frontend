import { Projeto } from '@/types/projeto';
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api"
});

export class EstadoService {
    buscarTodos() {
        return axiosInstance.get('estado/');
    }

    buscarPorId(id: number) {
        return axiosInstance.get('estado/' + id);
    }

    inserir(objeto: Projeto.Estado) {
        return axiosInstance.post('estado/', objeto);
    }

    alterar(objeto: Projeto.Estado) {
        return axiosInstance.put('estado/', objeto);
    }

    excluir(id: number) {
        return axiosInstance.delete('estado/' + id);
    }
}
