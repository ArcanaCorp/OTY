import { Suspense } from "react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

import Header from "./layout/header";
import Filter from "./components/Filter";
import List from "./components/List";

import './styles/home.css'

export default function Home () {

    const message = `Hola 👋\nQuisiera más información sobre los juguetes que ofrecen.`

    return (

        <>
        
            <Header/>

            <a className="__btn_float_wp" href={`https://wa.me/51995984231/?text=${encodeURIComponent(message)}`} rel="noreferrer" target="_blank"><IconBrandWhatsapp/></a>
            <main className="__main">
                <Filter/>
                <Suspense fallback={'Cargando...'}>
                    <List/>
                </Suspense>
            </main>

        </>

    )

}