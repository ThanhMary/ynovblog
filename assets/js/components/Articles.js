import React, {Component} from 'react';
import axios from 'axios';
    
class Articles extends Component {
    constructor() {
        super();
        this.state = { articles: [], loading: true};
    }
    
    componentDidMount() {
        this.getArticles();
    }
    
        getArticles() {
        axios.get(`/api/articles`).then(articles => {
            // this.setState({ articles: articles.data['hydra:member'], loading: false});
            this.setState({ articles: articles.data, loading: false});
            console.log(articles);
             })
        }
     
    render() {
        const loading = this.state.loading;

        return (
            <div>
             
             <section className="row-section">
                <div className="container">
                    <div className="row">
                        <h2 className="text-center"><span>Liste des articles</span> </h2>
                    </div>
                        <div className={'row'}>
                            { this.state.articles.map(article =>
                                <div className="col-md-10 offset-md-1 row-block" key={article.id}>
                                    <div className="media">
                                        <div>
                                            <img src={article.image} width ="200px" />
                                        </div>
                                        <div className="media-body">
                                                <h4>{article.title}</h4>
                                                <p>Ecrit by {article.author}</p>
                                                <p><h6>{article.subtitle}</h6> </p>
                                                <br/> <p>{article.content}</p> 
                                                <br/><p>Catégorie de l'article: {article.category}</p> 
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                </div>
            </section>
        </div>
        
        )
    }
}

export default Articles;