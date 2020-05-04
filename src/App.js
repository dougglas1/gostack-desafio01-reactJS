import React, { useState ,useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [Repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, [])

  // Adicionar repositório
  async function handleAddRepository() {
    // Efetuar requisição
    const response = await api.post('/repositories', {
      title: 'Douglas',
      url: 'https://github.com/dougglas1/',
      techs: ["Node.js", "ReactJS", "React Native", "C#"]
    });

    // Montar objeto
    const Repository = response.data;

    // Carregar lista dos repositórios
    setRepositories([...Repositories, Repository]);
  }

  // Remove repositório
  async function handleRemoveRepository(id) {
    // Efetuar requisição
    api.delete(`/repositories/${id}`);

    // Remover da lista o id removido
    const repositories = Repositories.filter(Repository => Repository.id !== id);

    // Carregar Repositórios
    setRepositories(repositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {Repositories.map(Repositories => (
          <li key={Repositories.id}>
            {Repositories.title}
            <button onClick={() => handleRemoveRepository(Repositories.id)}>Remover</button>
          </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
