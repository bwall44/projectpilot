

import { Project } from "./Project";
import  PropTypes  from "prop-types";

function ProjectList({projects}: {projects: Project[]}) {
    return (
        <ul className="row">
            {projects.map(project => (
                <li key={project.id} className="col-md-4 mb-3">
                    <div className="card h-100">
                        {project.imageUrl && (  
                            <img
                                src={project.imageUrl}
                                className="card-img-top"    
                                alt={project.name}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                        )}
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{project.name}</h5>
                            <p className="card-text">{project.description}</p>
                            <p className="card-text mt-auto"><strong>Budget:</strong> ${project.budget.toLocaleString()}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired
};
export default ProjectList;