//importo lo useState e useEffect
import { useState, useEffect } from "react";

//importo lo stile
import style from "./Form.module.css"

//importo i post
//import posts from "../../data/posts";

//importo AddButton 
import AddButton from "../buttons/AddButton";

//importo la Card
import Card from "../card/Card";

//Creo il modello iniziale del post
const addedPost = {
    title: "",
    slug: "",
    image: "",
    content: "",
    category: "",
    tags: [],
    published: false
}

//creo il componente Form
export default function Form() {
    const [formData, setFormData] = useState(addedPost)
    //const [initialPosts, setInitialPosts] = useState([]) /*posts*/

    const [postsData, setPostsData] = useState([])

    //creo la funzione fetchData
    function fetchData(url = 'http://localhost:3002/posts') {
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                console.log(data.data);
                setPostsData(data.data)
            })
    }

    //creo la funzione handleClick
    function handleClick() {
        fetchData()
    }

    useEffect(fetchData, [])


    //creo una funzione per aggiungere un titolo
    function addPost(e) {
        //Impedisco il comportamento predefinito del form
        e.preventDefault()

        //Creo un nuovo oggetto post combinando un ID univoco e uno slug (Date.now()) con i dati del modulo
        const newItem = {
            id: Date.now(),
            ...formData
        }

        //Faccio una chiamata AJAX di tipo post per aggiungere un post
        fetch('http://localhost:3002/posts', {
            method: 'POST',
            body: JSON.stringify(newItem),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                console.log('Success:', response)
                setPostsData(response.data || [])

            })
            .catch(error => console.error('Error:', error));

        //Resetto il modulo al modello iniziale dopo l'invio
        setFormData(addedPost)

    }

    function handleFormField(e) {

        // Destrutturo gli attributi dell'evento target per ottenere name, value, type e checked
        const { name, value, type, checked } = e.target;

        // Controllo se il campo è un checkbox e se il nome è "tags"
        if (type === "checkbox" && name === "tags") {
            // Aggiorno lo stato dei tag nel formData.
            setFormData((prevState) => ({
                // Mantengo invariato il resto dei dati nel formData
                ...prevState,
                tags: checked

                    // Se il checkbox è selezionato, aggiungo il valore al campo tags
                    ? [...prevState.tags, value]

                    // Altrimenti, rimuovo il valore dal campo tags
                    : prevState.tags.filter((tag) => tag !== value),
            }));
        }
        // Per tutti gli altri campi
        else {
            setFormData({

                // Mantengo invariato il resto dei dati nel formData
                ...formData,

                // Aggiorno il campo corrispondente (name è la chiave del dato) con il valore inserito
                [name]: value,
            });
        }
    }

    //creo una funzione per cancellare un titolo del post
    function eliminate(e) {

        //Ottengo lo slug del post da eliminare dal pulsante associato
        const slug = e.target.getAttribute('data-slug')

        console.log(slug);

        //Faccio una chiamata AJAX di tipo delete per cancellare un post
        fetch('http://localhost:3002/posts/' + slug, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                console.log(response);
                //Aggiorno lo stato con la lista filtrata
                setPostsData(response.data)

            })




    }

    //eseguo il return
    return (
        <>

            <button type='button' onClick={handleClick} className={style.fetchBtn}>Fetch Posts</button>


            <section>
                <h2>Aggiungi un nuovo post utilizzando il form</h2>

                <form onSubmit={addPost}>

                    {/* Campo per il titolo del post */}
                    <input type="text"
                        placeholder="Inserisci il titolo"
                        className={style.placeholder}
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleFormField}
                    />

                    {/* Campo per il link all'immagine */}
                    <input type="text"
                        placeholder="Inserisci l'immagine"
                        className={style.placeholder}
                        name="image"
                        value={formData.image}
                        onChange={handleFormField} />

                    {/* Campo per lo slug del post */}
                    <input type="text"
                        placeholder="Inserisci lo slug"
                        className={style.placeholder}
                        name="slug"
                        value={formData.slug}
                        onChange={handleFormField} />

                    {/* Campo per il contenuto del post */}
                    <textarea name="content"
                        placeholder="Inserisci il contenuto"
                        id="content" rows="5"
                        className={style.placeholder}
                        value={formData.content}
                        onChange={handleFormField}>

                    </textarea>

                    {/* Checkbox per i vari tag*/}
                    <div>

                        <input type="checkbox"
                            name="tags"
                            value="Dolci"
                            onChange={handleFormField}
                        />Dolci

                        <input type="checkbox"
                            name="tags"
                            value="Torte"
                            onChange={handleFormField}
                        />Torte

                        <input type="checkbox"
                            name="tags"
                            value="Ricette vegetariane"
                            onChange={handleFormField}
                        />Ricette vegetariane

                        <input type="checkbox"
                            name="tags"
                            value="Ricette al forno"
                            onChange={handleFormField}
                        />Ricette al forno

                        <input type="checkbox"
                            name="tags"
                            value="Antipasti"
                            onChange={handleFormField}
                        />Antipasti

                        <input type="checkbox"
                            name="tags"
                            value="Primi piatti"
                            onChange={handleFormField}
                        />Primi piatti

                        <input type="checkbox"
                            name="tags"
                            value="Dolci veloci"
                            onChange={handleFormField}
                        />Dolci veloci

                        <input type="checkbox"
                            name="tags"
                            value="Ricette veloci"
                            onChange={handleFormField}
                        />Ricette veloci

                        <input type="checkbox"
                            name="tags"
                            value="Dolci al cioccolato"
                            onChange={handleFormField}
                        />Dolci al cioccolato

                    </div>



                    {/* Componente AddButton*/}
                    <AddButton />

                </form>


            </section>
            {/*postsData.map((post, slug) => <Card key={post.slug} cardPost={post} eliminatePost={eliminate} cardSlug={post.slug}></Card>)*/}

            {Array.isArray(postsData) ? postsData.map((post, slug) => <Card key={post.slug} cardPost={post} eliminatePost={eliminate} cardSlug={post.slug}></Card>) : <p>Nessun risultato</p>}
        </>
    )


}