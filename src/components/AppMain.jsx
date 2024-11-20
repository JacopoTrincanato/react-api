//importo il form
import Form from "./form/Form";

//importo l'array di post
import posts from "../data/posts";

//creo il componente main
export default function AppMain() {
    //ciclo all'interno dell'array posts per creare una sezione con i tag in modo che non si ripetano

    //creo un array vuoto
    const uniqueTags = [];

    //ciclo all'interno di post
    posts.forEach(post => {

        //ciclo all'interno dei tag
        post.tags.forEach(tag => {
            if (!uniqueTags.includes(tag)) {
                uniqueTags.push(tag);
            }
        })

    });

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