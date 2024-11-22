//importo useState e useEffect da react
import { useState, useEffect } from "react";

//importo il form
import Form from "./form/Form";

//creo il componente main
export default function AppMain() {

    // Stato per i tag unici
    const [uniqueTags, setUniqueTags] = useState([]);

    // uso useEffect per fare la chiamata API
    useEffect(() => {
        fetch('http://localhost:3002/posts')
            .then(resp => resp.json())
            .then(data => {
                console.log(data.data);

                // Creazione di un array vuoto dove inserire i tag
                const newTags = [];

                data.data.forEach(post => {
                    post.tags.forEach(tag => newTags.push(tag));
                });

                // Aggiorno lo stato con i tag
                setUniqueTags(newTags);
            })
            .catch(err => console.error("Errore nella fetch:", err));
    }, []);

    //eseguo il return
    return (
        <main>

            {/* Componente Form */}
            <Form />

            <section>
                <h3>
                    {/* Mostra un elenco di tag unici. */}
                    Tag Utilizzati: {uniqueTags && uniqueTags.map((tag, index) => (
                        <span key={index}>
                            {/* Ogni tag è separato da una virgola, tranne l'ultimo elemento. */}
                            {tag}{index < uniqueTags.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                </h3>
            </section>
        </main>

    )
}