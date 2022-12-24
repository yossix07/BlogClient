const myServer = "localhost";
const myPort = 5146;
const urlPrefix = "http://" + myServer + ":" + myPort + "/api/";

export async function signUp(username, password, fullName) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "userName": username, "password": password, "full_Name": fullName })
  };
  try {
    const response = await fetch(urlPrefix + "Users/SignUp", requestOptions);
    return response.status;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logIn(username, password) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "userName": username, "password": password, "full_Name": "string"})
    };
    try {
      const response = await fetch("http://localhost:5146/api/Users/SignIn", requestOptions);
      return response.status;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  export async function getAllProjects(start_index) {
    // const requestOptions = {
    //     method: 'Get',
    //     headers: { 'Content-Type': 'application/json'},
    //     body: JSON.stringify({ "start_index": start_index })
    //   };
    
    //   const response = await fetch(urlPrefix + "/projects", requestOptions);
    
    //   if(response.ok) {
    //     const json = await response.json()
    //     return json;
    //   }
    //   return -1;

    return [
        { "id": 1, "name": "project_1", "homepage_url": "project_1.co.il", "repository_url": "git/project_1.com", "language": "English", "status": "In progress", "description": "Lorem ipsum dolor sit amet" },
        { "id": 2, "name": "project_2", "homepage_url": "project_2.com", "repository_url": "bitbucket/project_2.com", "language": "Hebrew", "status": "Done", "description": "Lorem ipsum dolor sit amet" },
        { "id": 3, "name": "project_3", "homepage_url": "project_3.org", "repository_url": "git/project_3.com", "language": "English", "status": "In progress", "description": "Lorem ipsum dolor sit amet" },
        { "id": 4, "name": "project_4", "homepage_url": "project_4.com", "repository_url": "bitbucket/project_4.com", "language": "English", "status": "In progress", "description": "Lorem ipsum dolor sit amet" },
        { "id": 5, "name": "project_5", "homepage_url": "project_5.com", "repository_url": "bitbucket/project_5.com", "language": "English", "status": "Done", "description": "Lorem ipsum dolor sit amet" },
        { "id": 6, "name": "project_6", "homepage_url": "project_6.org", "repository_url": "git/project_6.com", "language": "English", "status": "Done", "description": "Lorem ipsum dolor sit amet" },
        { "id": 7, "name": "project_7", "homepage_url": "project_7.co.il", "repository_url": "bitbucket/project_7.com", "language": "Hebrew", "status": "In progress", "description": "Lorem ipsum dolor sit amet" },
        { "id": 8, "name": "project_8", "homepage_url": "project_8.com", "repository_url": "git/project_8.com", "language": "English", "status": "Done", "description": "Lorem ipsum dolor sit amet" },
    ]
}

export async function getProjectInfo(id) {
    const requestOptions = {
        method: 'Get',
        headers: { 'Content-Type': 'application/json'}
    };
    
      const response = await fetch(urlPrefix + "/projects/" + id, requestOptions);
    
      if(response.ok) {
        const json = await response.json()
        return json;
      }
      return -1;
}

export async function getProjectLikesCounter(id) {
    const requestOptions = {
        method: 'Get',
        headers: { 'Content-Type': 'application/json'}
    };
    
      const response = await fetch(urlPrefix + "/likes/" + id, requestOptions);
    
      if(response.ok) {
        const json = await response.json()
        return json;
      }
      return -1;
}