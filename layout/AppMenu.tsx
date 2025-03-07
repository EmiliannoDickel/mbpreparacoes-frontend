/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [

        {
            label: 'Resumo',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/'},
                { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' }
            ]
        },
        {
            label: 'Páginas',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [
                {
                    label: 'Estado',
                    icon: 'pi pi-fw pi-map',
                    to: '/pages/estado'
                },
                {
                    label: 'Cidade',
                    icon: 'pi pi-fw pi-home',
                    to: '/pages/cidade'
                },
                {
                    label: 'Marca',
                    icon: 'pi pi-fw pi-apple',
                    to: '/pages/marca'
                },
                {
                    label: 'Pessoa',
                    icon: 'pi pi-fw pi-user',
                    to: '/pages/pessoa'
                },
                {
                    label: 'Produto',
                    icon: 'pi pi-fw pi-gift',
                    to: '/pages/produto'
                },
            ]
        },
        
       
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

        <Link href="https://www.instagram.com/mb.preparacoes/" target="_blank" style={{ cursor: 'pointer' }}>
            <img 
                alt="MB - Preparações" 
                className="w-full mt-3" 
                src={`/layout/images/logo${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png` } 
            />
        </Link>
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
