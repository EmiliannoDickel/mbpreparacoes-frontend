    'use client';
    import { Button } from 'primereact/button';
    import { Column } from 'primereact/column';
    import { DataTable } from 'primereact/datatable';
    import { Dialog } from 'primereact/dialog';
    import { FileUpload } from 'primereact/fileupload';
    import { InputText } from 'primereact/inputtext';
    import { Toast } from 'primereact/toast';
    import { Toolbar } from 'primereact/toolbar';
    import { classNames } from 'primereact/utils';
    import React, { useEffect, useRef, useState } from 'react';
    import { Projeto } from '@/types';
    import { MarcaService } from '@/service/MarcaService';


    const Marca = () => {
        const ObjetoNovo: Projeto.Marca = {  
            id: null,
            nome: ''
        };

    const [objetos, setObjetos] = useState<Projeto.Marca[]>([]);
    const [objetoDialog, setObjetoDialog] = useState<boolean>(false);  
    const [deleteObjetoDialog, setDeleteObjetoDialog] = useState<boolean>(false); 
    const [deleteObjetosDialog, setDeleteObjetosDialog] = useState<boolean>(false); 
    const [objeto, setObjeto] = useState<Projeto.Marca>(ObjetoNovo); 
    const [selectedObjetos, setSelectedObjetos] = useState<Projeto.Marca[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);  
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);  
    const dt = useRef<DataTable<any> | null>(null);  
    const objetoService = new MarcaService();  


    useEffect(() => {
        objetoService.buscarTodas()
            .then((response) => {
                setObjetos(response.data);  
            })
            .catch((error) => {
                console.error('Erro ao buscar marca:', error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Não foi possível carregar as marcas',
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

        const editObjeto = (objeto: Projeto.Marca) => { //editar
            setObjeto({ ...objeto });
            setObjetoDialog(true);
        };

        const confirmDeleteObjeto = (objeto: Projeto.Marca) => { //confirmar remocao
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

        const findIndexById = (id: string) => {
            let index = -1;
            for (let i = 0; i < (objetos as any)?.length; i++) {
                if ((objetos as any)[i].id === id) {
                    index = i;
                    break;
                }
            }

            return index;
        };
        
    
        
        const exportCSV = () => {
            dt.current?.exportCSV();
        };

        const confirmDeleteSelected = () => {
            if (selectedObjetos) {
                setDeleteObjetosDialog(true);
            }
        };
        

        const deleteSelectedObjetos = () => {
            if (selectedObjetos && selectedObjetos.length > 0) {
                const idsToDelete = selectedObjetos.map((item) => item.id);
                objetoService.excluir(idsToDelete)
                    .then(() => {
                        setObjetos(objetos.filter((item) => !idsToDelete.includes(item.id)));
                        toast.current?.show({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Deletado Com Sucesso',
                            life: 3000,                                                                                                                                             
                        });
                        setDeleteObjetosDialog(false);
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

        const idBodyTemplate = (rowData: Projeto.Marca) => {
            return (
                <>
                    <span className="p-column-title">ID</span>
                    {rowData.id}
                </>
            );
        };

        const nomeBodyTemplate = (rowData: Projeto.Marca) => {
            return (
                <>
                    <span className="p-column-title">Nome</span>
                    {rowData.nome}
                </>
            );
        };

        const actionBodyTemplate = (rowData: Projeto.Marca) => {
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
                <h5 className="m-0">Gerenciamento De Marcas</h5>
                <span className="block mt-2 md:mt-0 p-input-icon-left ">
                    <i className="pi pi-search" />
                    <InputText
                        type="search"
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value || '')} // Assegure que seja uma string
                        placeholder="Pesquisar por ID, Nome ou Sigla..."
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
                        globalFilter={globalFilter || ''} // Garantir que globalFilter seja uma string válida
                        emptyMessage="Nenhuma Marca Encontrado"
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
                            header="Nome" 
                            sortable 
                            filter
                            headerStyle={{ minWidth: '15rem' }}
                        ></Column>
                          <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                        <Dialog visible={objetoDialog} style={{ width: '450px' }} header="Detalhes Da Marca" modal className="p-fluid" footer={objetoDialogFooter} onHide={hideDialog}>
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
                                {submitted && !objeto.nome && <small className="p-invalid">Nome é necessário.</small>}
                            </div>

                        </Dialog>

                        <Dialog visible={deleteObjetoDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteObjetoDialogFooter} onHide={hideDeleteObjetoDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                {objeto && (
                                    <span>
                                    Você Realmente deseja excluir a Marca? <b>{objeto.nome}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>

                        <Dialog visible={deleteObjetosDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteObjetosDialogFooter} onHide={hideDeleteObjetosDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                {objeto && <span>Você Realmente deseja excluir as Marcas selecionados??</span>}
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        );
    };

    export default Marca;
