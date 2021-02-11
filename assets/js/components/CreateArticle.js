import React, { useState } from 'react';
import ArticleApi from '../../services/ArticleApi';
import formService from '../../services/formService';
import 'react-notifications/dist/react-notifications';
import 'react-notifications/dist/react-notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const CreateArticle = ({history}) => {
    const createNotification = (type) => {
        switch (type) {
          case 'info':
            NotificationManager.info('Info message');
            break;
          case 'success':
              console.log(type)
            NotificationManager.success('Success message', 'Votre Article a bien été enregistré. Merci bien!');
            break;
          case 'warning':
            NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
            break;
          case 'error':
            NotificationManager.error('Error message', 'Votre enregistrement  a été échouée ', 5000, () => {
              alert('callback');
            });
            break;
        }
    }

    const [article, setArticle] = useState({
        author:"",
        date:"",
        title:"",
        subtitle:"",
        image:"",
        content:"",
        category:""
    });

    
    const [idPost,setIdPost]=useState([])
    const [error, setError] = useState('');

    const handleChange = (event) => formService.handleChange(event, article, setArticle);

    const handleSubmit = (event) => {
        event.preventDefault();

        ArticleApi.create(article).then((id) => {
            setIdPost(id)
            createNotification('success')
        }).catch((error)=>createNotification('error'))
    }

    return ( 
        <>
        <NotificationContainer /> 
            <h1 className="text-center my-5">Ajouter un article</h1>
         
              <form onSubmit={handleSubmit} className="container">
                <div className="row form-group">
                    <div className="col-md-6">
                        <label >Auteur </label>
                        <input 
                            value={article.author}
                            onChange={handleChange} 
                            type="text"
                            name="author"
                            id="auteur"
                            className={"form-control" + (error && "is-invalid")}
                            required/>
                        {error && <p className="invalid-feedback">{error}</p>}
                    </div>
                    <div className="col-md-6">
                    <label htmlFor="date">Date</label>
                                <input
                                    value={article.date}
                                    id="date"
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    name="date"
                                    onChange={handleChange}
                                    required />
                        </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-6">
                        <label >Titre </label>
                        <input 
                            value={article.title}
                            onChange={handleChange} 
                            type="text"
                            name="title"
                            className={"form-control" + (error && "is-invalid")}
                            required/>
                        {error && <p className="invalid-feedback">{error}</p>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="password">Sous-Titre</label>
                        <input 
                            value={article.subtile}
                            onChange={handleChange} 
                            type="text" 
                            name="subtile"
                            className="form-control"
                            required/>
                        </div>
                </div>
                
                <div className="row form-group">
                    <div className="col-md-6">
                        <label >Image </label>
                        <input 
                            value={article.image}
                            onChange={handleChange}  
                            type="text"
                            name="image"
                            className={"form-control" + (error && "is-invalid")}
                            required/>
                        {error && <p className="invalid-feedback">{error}</p>}
                    </div>
               
                </div>      
                
               <div className="form-group">
                    <label htmlFor="password">Contenu</label>
                    <textarea 
                        value={article.ccontent}
                        onChange={handleChange}  
                        name="content"
                        className="form-control"
                        rows="4"
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Categorie</label>
                    <textarea 
                        value={article.categorie}
                        onChange={handleChange} 
                        name="categorie"
                        className="form-control"
                        rows="4"
                        required />
                </div>
                
                 <center>      
                    <div className="form-group">
                        <button type="submit" className="btn btn-outline-info" >Valider</button> 
                    </div>
                </center>    
            </form>
            <div> </div>
           
        </> 
        );
}
 
export default CreateArticle;