import React, { useState } from 'react';
import ArticleApi from '../../services/ArticleApi';
import formService from '../../services/formService';
import 'react-notifications/dist/react-notifications';
import 'react-notifications/dist/react-notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';


export default CreateArticle;


const CreateArticle = ({ match, history }) => {
  const { id = "new" } = match.params;

   const [article, setArticle] = useState({
        author:"",
        date:"",
        title:"",
        subtitle:"",
        image:"",
        content:"",
        category:""
    });
  const [errors, setErrors] = useState({
        author:"",
        date:"",
        title:"",
        subtitle:"",
        image:"",
        content:"",
        category:""
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  
  const fetchArticle = async id => {
    try {
      const { author, date, title, subtitle, image, content, category } = await ArticlesAPI.find(
        id
      );
      setArticle({ author, date, title, subtitle, image, content, category });
      setLoading(false);
    } catch (error) {
      toast.error("L'article n'est pas pu chargé");
      history.replace("/articles");
    }
  };

  useEffect(() => {
    if (id !== "new") {
      setLoading(true);
      setEditing(true);
      fetchArticle(id);
    }
  }, [id]);

  
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setArticle({ ...article, [name]: value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async event => {
    event.preventDefault();

    try {
      setErrors({});

      if (editing) {
        await ArticlesAPI.update(id, article);
        toast.success("L'article a bien été modifié");
      } else {
        await ArticlesAPI.create(article);
        toast.success("L'artcile a bien été créé");
        history.replace("/articles");
      }
    } catch ({ response }) {
      const { violations } = response.data;

      if (violations) {
        const apiErrors = {};
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });

        setErrors(apiErrors);
        toast.error("Des erreurs dans votre formulaire !");
      }
    }
  };

  return (
    <>
      {(!editing && <h1>Création </h1>) || (
        <h1>Modification</h1>
      )}

      {loading && <FormContentLoader />}
      {!loading && (
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
      )}
    </>
  );
};

export default CustomerPage;
