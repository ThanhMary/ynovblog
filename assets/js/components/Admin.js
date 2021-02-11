import React, {Component} from 'react';
 
class Admin extends Component {
    
    render() {
        return (
            <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <a class="navbar-brand" href="#">Bienvenue sur L'administration</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          
            <div class="collapse navbar-collapse" id="navbarColor01">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="/#/createArticle">Ajouter un Article
                    <span class="sr-only">(current)</span>
                  </a>
                </li>
                {/* <li class="nav-item">
                  <a class="nav-link" href="#">Supprimer un article</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Modifier un article</a>
                </li> */}
              </ul>
             
            </div>
          </nav>
       
          </div>
        )
    }
}
    
export default Admin;