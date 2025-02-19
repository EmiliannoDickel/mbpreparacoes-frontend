    'use client';
    import { Button } from 'primereact/button';
    import { Column } from 'primereact/column';
    import { DataTable } from 'primereact/datatable';
    import { Dialog } from 'primereact/dialog';
    import { FileUpload } from 'primereact/fileupload';
    import { InputText } from 'primereact/inputtext';
    import { Dropdown } from 'primereact/dropdown';   
    import { Toast } from 'primereact/toast';
    import { Toolbar } from 'primereact/toolbar';
    import { classNames } from 'primereact/utils';
    import React, { useEffect, useRef, useState } from 'react';
    import { Projeto } from '@/types';
    import { InputTextarea } from 'primereact/inputtextarea';
    import { InputNumber } from 'primereact/inputnumber';
import { CidadeService } from '@/service/CidadeService';
import { PessoaService } from '@/service/PessoaService';


    const Pessoa = () => {
        const ObjetoNovo: Projeto.Pessoa = {  
            id: null,
            nome: '',
            cpf: '',
            email: '',
            endereco: '',
            cep: '',
            cidade: ''
        };

    const [objetos, setObjetos] = useState<Projeto.Pessoa[]>([]);
    const [cidades, setCidades] = useState(null);
    const [objetoDialog, setObjetoDialog] = useState<boolean>(false);  
    const [deleteObjetoDialog, setDeleteObjetoDialog] = useState<boolean>(false); 
    const [deleteObjetosDialog, setDeleteObjetosDialog] = useState<boolean>(false); 
    const [objeto, setObjeto] = useState<Projeto.Pessoa>(ObjetoNovo); 
    const [selectedObjetos, setSelectedObjetos] = useState<Projeto.Pessoa[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);  
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);  
    const dt = useRef<DataTable<any> | null>(null); 
    const objetoService = new PessoaService();
    const cidadeService = new CidadeService();

    useEffect(() => {
        cidadeService.buscarTodas()
        .then(res => {  
            setCidades(res.data)
        });
    }, []);

       useEffect(() => {
                objetoService.buscarTodas()
                    .then((response) => {
                        setObjetos(response.data);  
                    })
                    .catch((error) => {
                        console.error('Erro ao buscar Pessoa:', error);
                        toast.current?.show({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Não foi possível carregar as Pessoas',
                            life: 3000
                        });
                    });
            }, []);

        const openNew = () => { //abrir 
            setObjeto(ObjetoNovo);
            setSubmitted(false);
            setObjetoDialog(true);
        };

        const hideDialog = () => { //fechar 
            setSubmitted(false);
            setObjetoDialog(false);
        };

        const hideDeleteObjetoDialog = () => {
            setDeleteObjetoDialog(false);
        };

        const hideDeleteObjetosDialog = () => {
            setDeleteObjetosDialog(false);
        };

        const saveObjeto = () => {
            setSubmitted(true);
            if (!objeto.id) {
                objetoService.inserir(objeto)
                    .then((response) => {
                        setObjetoDialog(false);
                        setObjeto(ObjetoNovo);
                        toast.current?.show({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Criado Com Sucesso',
                            life: 3000
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        toast.current?.show({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Erro ao Criar',
                            life: 3000
                        });
                    }); 
            } 
            else {
                objetoService.alterar(objeto)
                    .then((response) => {
                        setObjetoDialog(false);
                        setObjeto(ObjetoNovo);
                        toast.current?.show({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Alterado Com Sucesso',
                            life: 3000
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        toast.current?.show({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Erro ao Alterar',
                            life: 3000
                        });
                    });
            }
        }; 

        const editObjeto = (objeto: Projeto.Pessoa) => { //editar
            setObjeto({ ...objeto });
            setObjetoDialog(true);
        };

        const confirmDeleteObjeto = (objeto: Projeto.Pessoa) => { //confirmar remocao
            setObjeto(objeto);
            setDeleteObjetoDialog(true);
        };

        const deleteObjeto = () => {
            if (objeto?.id) {
                objetoService.excluir(objeto.id)
                    .then(() => {
                        setObjetos(objetos.filter(item => item.id !== objeto.id));
                        toast.current?.show({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Deletado Com Sucesso',
                            life: 3000,
                        });
                        setDeleteObjetoDialog(false);
                    })
                    .catch((error) => {
                        console.error(error);
                        toast.current?.show({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Erro ao Deletar',
                            life: 3000,
                        });
                    });
            }
        };

        // const findIndexById = (id: string) => {
        //     let index = -1;
        //     for (let i = 0; i < (objetos as any)?.length; i++) {
        //         if ((objetos as any)[i].id === id) {
        //             index = i;
        //             break;
        //         }
        //     }

        //     return index;
        // };
        
    
        
        const exportCSV = () => {
            dt.current?.exportCSV();
        };

        const confirmDeleteSelected = () => {
            if (selectedObjetos) {
                setDeleteObjetosDialog(true);
            }
        };
        

         const deleteSelectedObjetos = () => { //espera um array de ids para delete
        //     if (selectedObjetos && selectedObjetos.length > 0) {
        //         const idsToDelete = selectedObjetos.map((item) => item.id);
        //         objetoService.excluir(idsToDelete)
        //             .then(() => {
        //                 setObjetos(objetos.filter((item) => !idsToDelete.includes(item.id)));
        //                 toast.current?.show({
        //                     severity: 'success',
        //                     summary: 'Sucesso',
        //                     detail: 'Deletado Com Sucesso',
        //                     life: 3000,                                                                                                                                             
        //                 });
        //                 setDeleteObjetosDialog(false);
        //             })
        //             .catch((error) => {
        //                 console.error(error);
        //                 toast.current?.show({
        //                     severity: 'error',
        //                     summary: 'Erro',
        //                     detail: 'Erro ao Deletar',
        //                     life: 3000,
        //                 });
        //             });
        //     }
         };

        const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
            const val = (e.target && e.target.value) || '';
            let _objeto = { ...objeto };
            _objeto[`${name}`] = val;
            setObjeto(_objeto);
        };
        

        const leftToolbarTemplate = () => {
            return (
                <React.Fragment>
                    <div className="my-2">
                        <Button label="Novo" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                        <Button label="Excluir" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedObjetos || !(selectedObjetos as any).length} />
                    </div>
                </React.Fragment>
            );
        };

        const rightToolbarTemplate = () => {
            return (
                <React.Fragment>
                    <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
                </React.Fragment>
            );
        };

        const idBodyTemplate = (rowData: Projeto.Pessoa) => {
            return (
                <>
                    <span className="p-column-title">ID</span>
                    {rowData.id}
                </>
            );
        };

        const nomeBodyTemplate = (rowData: Projeto.Pessoa) => {
            return (
                <>
                    <span className="p-column-title">Nome</span>
                    {rowData.nome}
                </>
            );
        }

        const cpfBodyTemplate = (rowData: Projeto.Pessoa) => {
            return (
                <>
                    <span className="p-column-title">CPF</span>
                    {rowData.cpf}
                </>
            );
        };

        const emailBodyTemplate = (rowData: Projeto.Pessoa) => {
            return (
                <>
                    <span className="p-column-title">Email</span>
                    {rowData.email}
                </>
            );
        };

        const enderecoBodyTemplate = (rowData: Projeto.Pessoa) => {
            return (
                <>
                    <span className="p-column-title">Endereço</span>
                    {rowData.endereco}
                </>
            );
        };

        const cepBodyTemplate = (rowData: Projeto.Pessoa) => {
            return (
                <>
                    <span className="p-column-title">CEP</span>
                    {rowData.cep}
                </>
            );
        };

        const cidadeBodyTemplate = (rowData: Projeto) => {
            return (
                <>
                    <span className="p-column-title">Cidade</span>
                    {rowData.cidade && (rowData.cidade.nome + '/' + rowData.cidade.estado.sigla)}
                </>
            );
        };

        const actionBodyTemplate = (rowData: Projeto.Pessoa) => {
            return (
                <>
                    <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editObjeto(rowData)} />
                    <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteObjeto(rowData)} />
                </>
            );
        };

        const clearSearch = () => {
            setGlobalFilter('');
        };
    
        const header = (
            <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                <h5 className="m-0">Gerenciamento De Pessoa</h5>
                <span className="block mt-2 md:mt-0 p-input-icon-left ">
                    <i className="pi pi-search" />
                    <InputText
                        type="search"
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value || '')}
                        placeholder="Pesquisar por ID, Nome ou Estado..."
                        
                    />
                </span>
            </div>
        );
        
        const objetoDialogFooter = (
            <>
                <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
                <Button label="Salvar" icon="pi pi-check" text onClick={saveObjeto} />
            </>
        );

        const deleteObjetoDialogFooter = (
            <>
                <Button label="Não" icon="pi pi-times" text onClick={hideDeleteObjetoDialog} />
                <Button label="Sim" icon="pi pi-check" text onClick={deleteObjeto} />
            </>
        );
        const deleteObjetosDialogFooter = (
            <>
                <Button label="Não" icon="pi pi-times" text onClick={hideDeleteObjetosDialog} />
                <Button label="Sim" icon="pi pi-check" text onClick={deleteSelectedObjetos} />
            </>
        );

        return (
            <div className="grid crud-demo">
                <div className="col-12">
                    <div className="card">
                    <Toast ref = {toast} />
                        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>   
                        <DataTable
                        ref={dt}
                        value={objetos}
                        selection={selectedObjetos}
                        onSelectionChange={(e) => setSelectedObjetos(e.value as any)}
                        dataKey="id"
                        paginator 
                        rows={10}
                        header={header}
                        rowsPerPageOptions={[5, 10, 25]}
                        selectionMode="multiple"
                        globalFilter={globalFilter }
                        emptyMessage="Nenhuma Pessoa Encontrado"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column 
                            field="id" 
                            header="Código" 
                            sortable
                            filter
                            headerStyle={{ minWidth: '15rem' }}
                        ></Column>
                         <Column 
                            field="nome" 
                            header="Nome Simples" 
                            sortable 
                            filter
                            body = {nomeBodyTemplate}
                        ></Column>
                        <Column 
                            field="cpf" 
                            header="CPF" 
                            body = {cpfBodyTemplate}
                            sortable 
                            filter
                            headerStyle={{ minWidth: '15rem' }} 
                        ></Column>
                        <Column 
                            field="email" 
                            header="Email" 
                            sortable 
                            filter
                            body = {emailBodyTemplate}
                            ></Column>
                            <Column 
                            field="endereco" 
                            header="Endereço" 
                            sortable 
                            filter
                            body = {enderecoBodyTemplate}
                            ></Column>
                        <Column 
                            field="cep" 
                            header="CEP" 
                            body = {cepBodyTemplate}
                            sortable 
                            filter 
                            headerStyle={{ minWidth: '15rem' }}
                            ></Column>
                            <Column 
                            field="cidade" 
                            header="Cidade" 
                            body = {cidadeBodyTemplate}
                            sortable
                            filter
                            ></Column>
                              <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                       
                    </DataTable>
                            

                            <Dialog visible={objetoDialog} style={{ width: '450px' }} header="Detalhes Da Pessoa" modal className="p-fluid" footer={objetoDialogFooter} onHide={hideDialog}>
                            <div className="field">
                                <label htmlFor="nome">Nome</label>
                                <InputText
                                    id="nome"
                                    value={objeto.nome}
                                    onChange={(e) => onInputChange(e, 'nome')}
                                    required
                                    autoFocus
                                    className={classNames({
                                        'p-invalid': submitted && !objeto.nome
                                    })}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="cpf">CPF</label>
                                <InputText
                                    id="cpf"
                                    value={objeto.cpf}
                                    onChange={(e) => onInputChange(e, 'cpf')}
                                    required
                                    autoFocus
                                    className={classNames({
                                        'p-invalid': submitted && !objeto.cpf
                                    })}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <InputText
                                    id="email"
                                    value={objeto.email}
                                    onChange={(e) => onInputChange(e, 'email')}
                                    required
                                    autoFocus
                                    className={classNames({
                                        'p-invalid': submitted && !objeto.email
                                    })}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="endereco">Endereço</label>
                                <InputText
                                    id="endereco"
                                    value={objeto.endereco}
                                    onChange={(e) => onInputChange(e, 'endereco')}
                                    required
                                    autoFocus
                                    className={classNames({
                                        'p-invalid': submitted && !objeto.endereco
                                    })}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="cep">CEP</label>
                                <InputText
                                    id="cep"
                                    value={objeto.cep}
                                    onChange={(e) => onInputChange(e, 'cep')}
                                    required
                                    autoFocus
                                    className={classNames({
                                        'p-invalid': submitted && !objeto.cep
                                    })}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="cidade">Cidade</label>
                                <Dropdown value={objeto.cidade} onChange={(e) => onInputChange(e, 'cidade')} options={cidades} filter optionLabel="nome" 
                                placeholder="Selecione uma Cidade" className="w-full md:w-14rem" />
                                {submitted && !objeto.cidade && <small className="p-invalid">Cidade é necessário.</small>}
                            </div>

                        </Dialog>

                        <Dialog visible={deleteObjetoDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteObjetoDialogFooter} onHide={hideDeleteObjetoDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                {objeto && (
                                    <span>
                                    Você Realmente deseja excluir a Pessoa? <b>{objeto.nome}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>

                        <Dialog visible={deleteObjetosDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteObjetosDialogFooter} onHide={hideDeleteObjetosDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                {objeto && <span>Você Realmente deseja excluir as Pessoas selecionados??</span>}
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        );
    };

    export default Pessoa;
