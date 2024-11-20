//importo lo useState
import { useState } from "react";

//importo lo stile
import style from "./Form.module.css"

//importo i post
import posts from "../../data/posts";

//importo AddButton 
import AddButton from "../buttons/AddButton";

//importo la Card
import Card from "../card/Card";

//Creo il modello iniziale del post
const addedPost = {
    title: "",
    image: "",
    content: "",
    category: "",
    tags: [],
    published: false
}

//creo il componente Form
export default function Form() {
    const [formData, setFormData] = useState(addedPost)
    const [initialPosts, setInitialPosts] = useState(posts)


    //creo una funzione per aggiungere un titolo
    function addPost(e) {
        //Impedisco il comportamento predefinito del form
        e.preventDefault()

        //Creo un nuovo oggetto post combinando un ID univoco (Date.now()) con i dati del modulo
        const newItem = {
            id: Date.now(),
            ...formData
        }

        //Aggiorno la lista dei post aggiungendo il nuovo post in cima
        setInitialPosts([newItem, ...initialPosts])

        //Resetto il modulo al modello iniziale dopo l'invio
        setFormData(addedPost)

    }

    function handleFormField(e) {

        //Determino il valore del campo in base al tipo (checkbox o altri campi come input)
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

        //Aggiorno formData con setFormData usando il nome del campo (e.target.name) come chiave e il valore inserito
        setFormData({
            ...formData,
            [e.target.name]: value
        })
    }

    //creo una funzione per cancellare un titolo del post
    function eliminate(e) {

        //Ottengo l'indice del post da eliminare dal pulsante associato
        const deleteTitle = Number(e.target.getAttribute('data-index'))

        //Filtro la lista dei post, escludendo quello con l'indice specificato
        const newPost = initialPosts.filter((post, index) => index != deleteTitle)

        //Aggiorno lo stato con la lista filtrata
        setInitialPosts(newPost)

    }

    //eseguo il return
    return (
        <>
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

                    {/* Campo per il contenuto del post */}
                    <textarea name="content"
                        placeholder="Inserisci il contenuto"
                        id="content" rows="5"
                        className={style.placeholder}
                        value={formData.content}
                        onChange={handleFormField}>

                    </textarea>

                    {/* Selettore per impostare se il post è pubblicato */}
                    <select name="published"
                        id="category"
                        className={style.placeholder}
                        value={formData.published ? "published" : "notPublished"}
                        onChange={handleFormField}>
                        <option value="published">Published</option>
                        <option value="notPublished">not Published</option>
                    </select>

                    {/* Checkbox per i vari tag*/}
                    <div>
                        <input type="checkbox"
                            name="tags"
                            value={formData.tags}
                            onChange={handleFormField}
                        />html

                        <input type="checkbox"
                            name="tags"
                            value={formData.tags}
                            onChange={handleFormField}
                        />css

                        <input type="checkbox"
                            name="tags"
                            value={formData.tags}
                            onChange={handleFormField}
                        />js

                        <input type="checkbox"
                            name="tags"
                            value={formData.tags}
                            onChange={handleFormField}
                        />php

                    </div>



                    {/* Componente AddButton*/}
                    <AddButton />

                </form>


            </section>

            {initialPosts.map((post, index) => <Card key={post.id} cardPost={post} eliminatePost={eliminate} cardIndex={index}></Card>)}
        </>
    )
}